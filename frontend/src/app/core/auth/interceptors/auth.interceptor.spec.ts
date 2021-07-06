import { TestBed } from '@angular/core/testing';

import { AuthService } from '../services/auth.service';
import { MockAuthService } from '../services/auth.service.mock';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthInterceptor,
        { provide: AuthService, useClass: MockAuthService },
      ],
    });
  });

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
