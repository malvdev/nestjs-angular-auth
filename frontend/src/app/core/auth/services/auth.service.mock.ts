export class MockAuthService {
  isAuth(): boolean {
    return true;
  }

  getAuthToken(): string {
    return 'accesstoken';
  }
}
