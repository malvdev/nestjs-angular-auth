import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppConfig, APP_CONFIG } from '../../tokens';

@Injectable()
export class ApiService {
  get headers(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    return new HttpHeaders(headersConfig);
  }

  constructor(
    @Inject(APP_CONFIG) private readonly _appConfig: AppConfig,
    private readonly _http: HttpClient
  ) {}

  get<T>(url: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this._http.get<T>(`${this._appConfig.apiUrl}${url}`, {
      headers: this.headers,
      params,
    });
  }

  post<T, D>(url: string, data: D): Observable<T> {
    return this._http.post<T>(`${this._appConfig.apiUrl}${url}`, data, {
      headers: this.headers,
    });
  }

  put<T, D>(url: string, data: D): Observable<T> {
    return this._http.put<T>(`${this._appConfig.apiUrl}${url}`, data, {
      headers: this.headers,
    });
  }

  delete<T>(url: string): Observable<T> {
    return this._http.delete<T>(`${this._appConfig.apiUrl}${url}`, {
      headers: this.headers,
    });
  }
}
