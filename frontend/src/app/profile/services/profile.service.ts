import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService, UserData } from '@core';

@Injectable()
export class ProfileService {
  constructor(private readonly _apiService: ApiService) {}

  me(): Observable<UserData> {
    return this._apiService.get<UserData>('/user/me');
  }

  users(): Observable<UserData> {
    return this._apiService.get<UserData>('/user');
  }
}
