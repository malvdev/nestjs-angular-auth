import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { ErrorHandlerInterceptor } from './error-handler.interceptor';

describe('ErrorHandlerInterceptor', () => {
  let errorHandlerInterceptor: ErrorHandlerInterceptor;
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ErrorHandlerInterceptor],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    errorHandlerInterceptor = TestBed.inject(ErrorHandlerInterceptor);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should catch error and call error handler', () => {
    spyOn(
      ErrorHandlerInterceptor.prototype as any,
      'errorHandler'
    ).and.callThrough();

    http.get('/toto').subscribe(
      () => fail('should error'),
      () => {
        expect(
          ErrorHandlerInterceptor.prototype['errorHandler']
        ).toHaveBeenCalled();
      }
    );

    httpMock.expectOne({}).flush(null, {
      status: 404,
      statusText: 'error',
    });
  });
});
