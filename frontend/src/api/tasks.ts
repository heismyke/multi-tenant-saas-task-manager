import { api } from "./client";
import type { Task } from "../types";

export const getTasks = async () => {
  const { data } = await api.get<{ tasks: Task[] }>("/tasks");
  return data.tasks;
};

export const createTask = async (title: string) => {
  const { data } = await api.post<{ task: Task }>("/tasks", { title });
  return data.task;
};

