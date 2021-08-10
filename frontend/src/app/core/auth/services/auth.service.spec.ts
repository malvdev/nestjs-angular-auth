import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import {
  ApiService,
  APP_CONFIG,
  AuthService,
  CredentialsService,
  MockCredentialsService,
} from '@core';

describe('AuthenticationService', () => {
  let authenticationService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        ApiService,
        AuthService,
        {
          provide: APP_CONFIG,
          useValue: {
            apiUrl: '',
          },
        },
        { provide: CredentialsService, useClass: MockCredentialsService },
      ],
    });

    authenticationService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(authenticationService).toBeTruthy();
  });
});
