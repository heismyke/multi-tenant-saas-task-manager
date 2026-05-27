import type { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const getTasks = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const tasks = await prisma.task.findMany({
    where: {
      organizationId: req.user.organizationId
    },
    include: {
      creator: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return res.json({ tasks });
};

export const createTask = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const { title } = req.body as { title?: string };

  if (!title?.trim()) {
    return res.status(400).json({ message: "Title is required" });
  }

  const task = await prisma.task.create({
    data: {
      title: title.trim(),
      organizationId: req.user.organizationId,
      createdBy: req.user.userId
    },
    include: {
      creator: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });

  return res.status(201).json({ task });
};

