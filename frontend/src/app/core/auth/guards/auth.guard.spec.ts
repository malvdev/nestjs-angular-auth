import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { CredentialsService } from '../services';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let credentialsService: CredentialsService;
  let mockRouter: unknown;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        CredentialsService,
        { provide: Router, useValue: mockRouter },
      ],
    });

    authGuard = TestBed.inject(AuthGuard);
    credentialsService = TestBed.inject(CredentialsService);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should have a canActivate method', () => {
    expect(typeof authGuard.canActivate).toBe('function');
  });
});
