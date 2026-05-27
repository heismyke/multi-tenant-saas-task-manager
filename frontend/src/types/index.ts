export type User = {
  id: string;
  name: string;
  email: string;
  organizationId: string;
};

export type Organization = {
  id: string;
  name: string;
};

export type AuthResponse = {
  token: string;
  user: User;
  organization: Organization;
};

export type Task = {
  id: string;
  title: string;
  organizationId: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  creator: {
    id: string;
    name: string;
    email: string;
  };
};

