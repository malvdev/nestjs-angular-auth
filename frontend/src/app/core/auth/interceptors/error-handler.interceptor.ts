import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/environment';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private readonly _router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(catchError((error) => this.errorHandler(error)));
  }

  private errorHandler(response: any): Observable<any> {
    if (!environment.production) {
      console.error('Request error', response);
    }

    if (response.error.message === 'Token: jwt expired') {
      // TODO: need to refresh token
      this._router.navigate(['/auth/login']);
    }

    throw response;
  }
}
