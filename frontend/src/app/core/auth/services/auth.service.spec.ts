import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { CredentialsService } from './credentials.service';
import { MockCredentialsService } from './credentials.service.mock';
import { AUTH_OPTIONS_TOKEN } from '../tokens/auth-options.token';

describe('AuthenticationService', () => {
  let authenticationService: AuthService;
  let credentialsService: MockCredentialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: CredentialsService, useClass: MockCredentialsService },
        {
          provide: AUTH_OPTIONS_TOKEN,
          useValue: { apiBase: '' },
        },
        AuthService,
      ],
    });

    authenticationService = TestBed.inject(AuthService);
    credentialsService = TestBed.inject(CredentialsService);
  });

  it('should be created', () => {
    expect(authenticationService).toBeTruthy();
  });
});
