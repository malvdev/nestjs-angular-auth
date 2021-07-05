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

export interface PasswordContext {
  id: string;
  password: string;
  passwordNew: string;
}

export interface ApiResponse {
  status?: string;
  success?: boolean;
  statusText?: string;
  data?: UserData;
  errors?: string[];
}

export interface AuthData {
  id?: string;
  accessToken: string;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  isActive?: string;
  roles?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthOptions {
  apiBase: string;
}
