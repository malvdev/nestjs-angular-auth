import { TestBed } from '@angular/core/testing';

import { StoragesModule, CredentialsService } from '@core';

import { APP_CONFIG } from '../../tokens';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoragesModule],
      providers: [
        AuthInterceptor,
        CredentialsService,
        {
          provide: APP_CONFIG,
          useValue: {
            apiUrl: '',
          },
        },
      ],
    });
  });

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
