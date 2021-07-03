import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { MockAuthService } from '../services/auth.service.mock';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let mockRouter: unknown;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should have a canActivate method', () => {
    expect(typeof authGuard.canActivate).toBe('function');
  });
});
