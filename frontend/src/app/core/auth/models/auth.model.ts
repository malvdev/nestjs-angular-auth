export interface LoginContext {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterContext {
  name: string;
  email: string;
  password: string;
  remember?: boolean;
}

export interface ForgotPasswordContext {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface AuthData {
  accessToken: string;
  refreshToken: string;
}

export type UserRole = 'user' | 'admin';

export interface UserData {
  id: number;
  name: string;
  email: string;
  password?: string;
  isActive?: boolean;
  roles?: UserRole[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthOptions {
  apiBase: string;
}
