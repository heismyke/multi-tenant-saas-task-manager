import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { type SignOptions } from "jsonwebtoken";
import { prisma } from "../config/prisma";
import { env } from "../config/env";

const signToken = (userId: string, organizationId: string) => {
  const options: SignOptions = {
    expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"]
  };

  return jwt.sign({ userId, organizationId }, env.jwtSecret, {
    ...options
  });
};

const publicUser = (user: {
  id: string;
  name: string;
  email: string;
  organizationId: string;
}) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  organizationId: user.organizationId
});

export const register = async (req: Request, res: Response) => {
  const { name, email, password, organizationName } = req.body as {
    name?: string;
    email?: string;
    password?: string;
    organizationName?: string;
  };

  if (!name || !email || !password || !organizationName) {
    return res.status(400).json({ message: "Name, email, password, and organizationName are required" });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: email.toLowerCase() }
  });

  if (existingUser) {
    return res.status(409).json({ message: "Email is already registered" });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const { user, organization } = await prisma.$transaction(async (tx) => {
    const createdOrganization = await tx.organization.create({
      data: { name: organizationName.trim() }
    });

    const createdUser = await tx.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        passwordHash,
        organizationId: createdOrganization.id
      }
    });

    return { user: createdUser, organization: createdOrganization };
  });

  const token = signToken(user.id, user.organizationId);

  return res.status(201).json({
    token,
    user: publicUser(user),
    organization
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as {
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() },
    include: { organization: true }
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken(user.id, user.organizationId);

  return res.json({
    token,
    user: publicUser(user),
    organization: user.organization
  });
};
