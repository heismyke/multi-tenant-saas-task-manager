import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import type { JwtPayload } from "../types/auth";

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.jwtSecret) as JwtPayload;

    if (!decoded.userId || !decoded.organizationId) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    req.user = {
      userId: decoded.userId,
      organizationId: decoded.organizationId
    };

    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

