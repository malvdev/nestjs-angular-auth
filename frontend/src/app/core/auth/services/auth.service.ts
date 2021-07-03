import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

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

  getStorage() {
    return this._credentialsService.storage;
  }

  getAuthToken(): string {
    return this._credentialsService.storage.token;
  }

  register(context: RegisterContext): Observable<AuthData> {
    return this._http
      .post<AuthData>(`${this.apiBase}/auth/register`, {
        ...context,
      })
      .pipe(
        map((data) => {
          console.log('data', data);
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
          console.log('login data', data)
          this._credentialsService.setCredentials(data, context.remember);
          return data;
        })
      );
  }

  logout(): Observable<AuthData> {
    return this._http.delete<AuthData>(`${this.apiBase}/auth/logout`).pipe(
      finalize(() => {
        this._credentialsService.setCredentials();
      })
    );
  }

  forgotPassword(email: string): Observable<AuthData> {
    return this._http.get<AuthData>(`${this.apiBase}/auth/forgot/${email}`);
  }

  updatePassword(id: string, context: PasswordContext): Observable<AuthData> {
    return this._http.put<AuthData>(
      `${this.apiBase}/auth/update-password/${id}`,
      { ...context }
    );
  }
}
