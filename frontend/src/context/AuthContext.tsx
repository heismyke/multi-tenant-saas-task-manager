import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { AuthResponse, Organization, User } from "../types";

type AuthContextValue = {
  token: string | null;
  user: User | null;
  organization: Organization | null;
  isAuthenticated: boolean;
  setSession: (auth: AuthResponse) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const readJson = <T,>(key: string): T | null => {
  const value = localStorage.getItem(key);
  return value ? (JSON.parse(value) as T) : null;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>(() => readJson<User>("user"));
  const [organization, setOrganization] = useState<Organization | null>(() =>
    readJson<Organization>("organization")
  );

  const setSession = (auth: AuthResponse) => {
    localStorage.setItem("token", auth.token);
    localStorage.setItem("user", JSON.stringify(auth.user));
    localStorage.setItem("organization", JSON.stringify(auth.organization));
    setToken(auth.token);
    setUser(auth.user);
    setOrganization(auth.organization);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("organization");
    setToken(null);
    setUser(null);
    setOrganization(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      organization,
      isAuthenticated: Boolean(token),
      setSession,
      logout
    }),
    [token, user, organization]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};

