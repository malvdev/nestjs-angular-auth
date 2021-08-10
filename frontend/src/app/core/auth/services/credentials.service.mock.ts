import { AuthData } from '../models';

export class MockCredentialsService {
  credentials: AuthData | null = {
    accessToken: 'accesstoken',
    refreshToken: 'refreshToken',
  };

  getAuthToken(): string | undefined {
    return this.credentials?.accessToken;
  }

  setCredentials(credentials?: AuthData, _remember?: boolean) {
    this.credentials = credentials || null;
  }
}
