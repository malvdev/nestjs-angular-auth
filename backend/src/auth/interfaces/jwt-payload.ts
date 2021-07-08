import { UserRole } from '@user';

export interface IJwtPayload {
  userId: number;
  type: string;
  sub: () => string;
  email?: string;
  roles?: UserRole[];
}
