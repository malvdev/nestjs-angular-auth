import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { UserData } from '@core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly _serverUrl: string = environment.serverUrl;

  constructor(protected _http: HttpClient) {}

  me(): Observable<UserData> {
    return this._http.get<UserData>(this._serverUrl + '/user/me');
  }

  users(): Observable<UserData> {
    return this._http.get<UserData>(this._serverUrl + '/user');
  }
}
