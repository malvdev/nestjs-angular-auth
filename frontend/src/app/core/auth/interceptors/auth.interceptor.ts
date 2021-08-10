import { Inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpInterceptor,
  HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { CredentialsService, AppConfig, APP_CONFIG } from '@core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    @Inject(APP_CONFIG) private readonly _appConfig: AppConfig,
    private readonly _credentialService: CredentialsService
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authToken = this._credentialService.getAuthToken();
    const isApiUrl = req.url.startsWith(this._appConfig.apiUrl);

    if (authToken && isApiUrl) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`),
      });

      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
