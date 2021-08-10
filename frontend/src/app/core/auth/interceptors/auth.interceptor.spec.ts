import { TestBed } from '@angular/core/testing';

import {
  StoragesModule,
  CredentialsService,
  APP_CONFIG,
  AuthInterceptor,
} from '@core';

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
