import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  AuthData,
  AuthOptions,
  LoginContext,
  RegisterContext,
  PasswordContext,
} from '../models/auth.model';
import { CredentialsService } from './credentials.service';
import { AUTH_OPTIONS_TOKEN } from '../tokens/auth-options.token';

@Injectable()
export class AuthService {
  private readonly _options: AuthOptions;

  get apiBase() {
    return this._options.apiBase;
  }

  constructor(
    private readonly _http: HttpClient,
    private readonly _credentialsService: CredentialsService,
    @Inject(AUTH_OPTIONS_TOKEN) private readonly _authOptions: AuthOptions
  ) {
    const defaultOptions: AuthOptions = {
      apiBase: '',
    };

    this._options = Object.assign(defaultOptions, this._authOptions);
  }

  isAuth(): boolean {
    return this._credentialsService.isAuth();
  }

  getAuthToken(): string | undefined {
    return this._credentialsService.credentials?.accessToken;
  }

  getRefreshToken(): string | undefined {
    return this._credentialsService.credentials?.refreshToken;
  }

  register(context: RegisterContext): Observable<AuthData> {
    return this._http
      .post<AuthData>(`${this.apiBase}/auth/register`, {
        ...context,
      })
      .pipe(
        map((data) => {
          this._credentialsService.setCredentials(data, context.remember);
          return data;
        })
      );
  }

  login(context: LoginContext): Observable<AuthData> {
    return this._http
      .post<AuthData>(`${this.apiBase}/auth/login`, {
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
    return this._http
      .post<AuthData>(
        `${this.apiBase}/auth/refresh-token`,
        this._credentialsService.credentials as AuthData
      )
      .pipe(
        map((data) => {
          this._credentialsService.setCredentials(data, false);
          return data;
        })
      );
  }

  logout(): Observable<boolean> {
    this._credentialsService.setCredentials();
    return of(true);
  }

  forgotPassword(email: string): Observable<boolean> {
    return of(true);
  }

  updatePassword(id: string, context: PasswordContext): Observable<boolean> {
    return of(true);
  }
}
