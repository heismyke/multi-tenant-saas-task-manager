import { api } from "./client";
import type { AuthResponse } from "../types";

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  organizationName: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export const registerUser = async (payload: RegisterInput) => {
  const { data } = await api.post<AuthResponse>("/auth/register", payload);
  return data;
};

export const loginUser = async (payload: LoginInput) => {
  const { data } = await api.post<AuthResponse>("/auth/login", payload);
  return data;
};

