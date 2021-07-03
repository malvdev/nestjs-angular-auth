import { Injectable } from '@angular/core';

import { LocalStorageService, SessionStorageService } from '../../storages';
import { AuthData } from '../models/auth.model';

export const CREDENTIALS_KEY = 'credentials';

@Injectable()
export class CredentialsService {
  private _storage: Storage;
  private _credentials: AuthData | null = null;

  constructor(
    private readonly _localStorage: LocalStorageService,
    private readonly _sessionStorage: SessionStorageService
  ) {
    this._storage = this._sessionStorage.getItem(CREDENTIALS_KEY)
      ? this._sessionStorage
      : this._localStorage;

    const savedCredentials =
      this._sessionStorage.getItem(CREDENTIALS_KEY) ||
      this._localStorage.getItem(CREDENTIALS_KEY);

    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  get storage(): Storage {
    return this._storage;
  }

  get credentials(): AuthData | null {
    return this._credentials;
  }

  isAuth(): boolean {
    return !!this.credentials?.accessToken;
  }

  setCredentials(credentials?: AuthData, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? this._localStorage : this._sessionStorage;
      storage.setItem(CREDENTIALS_KEY, JSON.stringify(credentials));
    } else {
      this._sessionStorage.removeItem(CREDENTIALS_KEY);
      this._localStorage.removeItem(CREDENTIALS_KEY);
    }
  }
}
