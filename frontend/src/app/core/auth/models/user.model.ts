export type UserRole = 'user' | 'admin';

export type UserId = string;

export interface UserData {
  id: UserId;
  name: string;
  email: string;
  password?: string;
  isActive?: boolean;
  roles?: UserRole[];
  createdAt?: string;
  updatedAt?: string;
}
