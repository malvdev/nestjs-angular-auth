import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpInterceptor,
  HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly _authService: AuthService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authToken = this._authService.getAuthToken();
    if (authToken) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`),
      });

      return next.handle(authReq);
    }

    return next.handle(req);
  }
}