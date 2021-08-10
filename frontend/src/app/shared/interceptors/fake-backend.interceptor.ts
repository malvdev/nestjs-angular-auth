import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';

import { LocalStorageService, RegisterContext, UserData } from '@core';
import { environment } from '../../../environments/environment';

const apiUrl = environment.apiUrl;
const accessToken = 'fake-access-token';
const refreshToken = 'fake-refresh-token';

const urls = {
  register: `${apiUrl}/auth/register`,
  login: `${apiUrl}/auth/login`,
  forgotPassword: `${apiUrl}/auth/forgot-password`,
  me: `${apiUrl}/user/me`,
};

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  private _users: UserData[];

  constructor(private readonly _localStorage: LocalStorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const users = this._localStorage.getItem('users');
    this._users = users ? JSON.parse(users) : [];

    const { url, method } = request;

    return of(null)
      .pipe(
        mergeMap(() => {
          if (url === urls.register && method === 'POST') {
            return this.register(request);
          }

          if (url === urls.login && method === 'POST') {
            return this.login(request);
          }

          if (url === urls.forgotPassword && method === 'POST') {
            return this.forgotPassword(request);
          }

          if (url === urls.me && method === 'GET') {
            return this.me(request);
          }

          return next.handle(request);
        })
      )
      .pipe(materialize())
      .pipe(delay(700))
      .pipe(dematerialize());
  }

  register(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    const { name, email, password }: RegisterContext = request.body;

    if (email === null || password === null) {
      return this.throwError(
        'Please submit correct registration details in the request body'
      );
    }

    if (!this.isEmailValid(email)) {
      return this.throwError('Email is not valid');
    }

    if (this.findUserByEmail(email).length) {
      return this.throwError(`User already exists with email ${email}`);
    }

    const newUser: UserData = {
      id: `${this._users.length + 1}`,
      name: name || '',
      email: email,
      password: password,
      roles: ['user'],
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this._users.push(newUser);
    this._localStorage.setItem('users', JSON.stringify(this._users));

    return of(
      new HttpResponse<any>({
        status: HttpStatusCode.Ok,
        url: urls.register,
        body: newUser,
      })
    );
  }

  login(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    const { email, password }: RegisterContext = request.body;
    const filteredUsers = this.findUser(email, password);

    if (!filteredUsers.length) {
      return this.throwError('Invalid login credentials. Please try again');
    }

    return of(
      new HttpResponse<any>({
        status: HttpStatusCode.Ok,
        body: {
          accessToken: `${accessToken} ${email}`,
          refreshToken,
        },
      })
    );
  }

  forgotPassword(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    const { email }: RegisterContext = request.body;

    if (!this.isEmailValid(email)) {
      return this.throwError('Email is not valid');
    }

    if (!this.findUserByEmail(email).length) {
      return this.throwError(`User with ${email} email not found`);
    }

    return of(
      new HttpResponse<any>({
        status: HttpStatusCode.Ok,
        url: urls.forgotPassword,
        body: {
          message: 'New password sent to your email',
        },
      })
    );
  }

  me(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    const user = this.getAuthUser(request);

    if (!user) {
      return this.throwError('Token: jwt expired');
    }

    return of(
      new HttpResponse<any>({
        status: HttpStatusCode.Ok,
        body: user,
      })
    );
  }

  getAuthUser(request: HttpRequest<any>): UserData | undefined {
    const [bearer, token, email] =
      request.headers.get('Authorization')?.split(' ') || [];

    const filteredUsers = this._users.filter(
      (user: UserData) => user.email === email
    );

    if (filteredUsers.length && token) {
      return filteredUsers[0];
    }

    return undefined;
  }

  throwError(message: string) {
    return throwError({
      status: HttpStatusCode.BadRequest,
      error: {
        message,
      },
    });
  }

  findUser(email: string, password: string): UserData[] {
    return this._users.filter((user) => {
      return user.email === email && user.password === password;
    });
  }

  findUserByEmail(email: string): UserData[] {
    return this._users.filter((user: UserData) => {
      return user.email === email;
    });
  }

  isEmailValid(email: string): boolean {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  }
}

export const FakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
