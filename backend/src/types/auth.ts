export type AuthUser = {
  userId: string;
  organizationId: string;
};

export type JwtPayload = AuthUser & {
  iat?: number;
  exp?: number;
};

