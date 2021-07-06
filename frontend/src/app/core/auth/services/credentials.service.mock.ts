import { AuthData } from '../models/auth.model';

export class MockCredentialsService {
  credentials: AuthData | null = {
    accessToken: 'accesstoken',
    refreshToken: 'refreshToken',
  };

  isAuth(): boolean {
    return !!this.credentials;
  }

  setCredentials(credentials?: AuthData, _remember?: boolean) {
    this.credentials = credentials || null;
  }
}
