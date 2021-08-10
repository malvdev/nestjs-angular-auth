import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ApiService } from '@core/api';

import {
  AuthData,
  LoginContext,
  RegisterContext,
  ForgotPasswordContext,
  ForgotPasswordResponse,
  UserData,
} from '../models';
import { CredentialsService } from './credentials.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly _apiService: ApiService,
    private readonly _router: Router,
    private readonly _credentialsService: CredentialsService
  ) {}

  register(context: RegisterContext): Observable<UserData> {
    return this._apiService.post<UserData, RegisterContext>('/auth/register', {
      ...context,
    });
  }

  login(context: LoginContext): Observable<AuthData> {
    return this._apiService
      .post<AuthData, LoginContext>('/auth/login', {
        ...context,
      })
      .pipe(
        map((data) => {
          this._credentialsService.setCredentials(data, context.remember);
          return data;
        })
      );
  }

  refreshToken(): Observable<AuthData> {
    return this._apiService
      .post<AuthData, AuthData | null>(
        '/auth/refresh-token',
        this._credentialsService.credentials
      )
      .pipe(
        map((data) => {
          this._credentialsService.setCredentials(data, false);
          return data;
        })
      );
  }

  forgotPassword(
    context: ForgotPasswordContext
  ): Observable<ForgotPasswordResponse> {
    return this._apiService.post<ForgotPasswordResponse, ForgotPasswordContext>(
      '/auth/forgot-password',
      {
        ...context,
      }
    );
  }

  logout(): Observable<boolean> {
    return of(true).pipe(
      tap(() => {
        this._credentialsService.removeItem();
        this._router.navigate(['/auth/login'], { replaceUrl: true });
      })
    );
  }
}
