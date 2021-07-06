import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ErrorHandlerInterceptor } from './error-handler.interceptor';

describe('ErrorHandlerInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [ErrorHandlerInterceptor],
    });
  });

  it('should be created', () => {
    const interceptor: ErrorHandlerInterceptor = TestBed.inject(
      ErrorHandlerInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
