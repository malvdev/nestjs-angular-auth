import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private readonly _router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(catchError((error) => this._errorHandler(error)));
  }

  private _errorHandler(response: any): Observable<any> {
    const statusCode = response.error.statusCode;

    if (
      statusCode === HttpStatusCode.Unauthorized ||
      statusCode === HttpStatusCode.Forbidden
    ) {
      this._router.navigate(['/auth/login']);
    }

    throw response;
  }
}
