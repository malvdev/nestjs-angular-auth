import { AuthData } from '../models/auth.model';

export class MockCredentialsService {
  credentials: AuthData | null = {
    accessToken: 'accesstoken',
  };

  isAuth(): boolean {
    return !!this.credentials;
  }

  setCredentials(credentials?: AuthData, _remember?: boolean) {
    this.credentials = credentials || null;
  }
}
