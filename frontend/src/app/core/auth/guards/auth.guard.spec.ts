import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { CredentialsService, MockCredentialsService } from '../services';

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
        { provide: CredentialsService, useClass: MockCredentialsService },
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
