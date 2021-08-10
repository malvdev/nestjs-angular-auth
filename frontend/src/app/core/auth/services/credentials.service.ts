import { Injectable } from '@angular/core';

import { LocalStorageService, SessionStorageService, AuthData } from '@core';

export const CREDENTIALS_KEY = 'credentials';

@Injectable()
export class CredentialsService {
  private _storage: Storage;
  private _credentials: AuthData | null = null;

  constructor(
    private readonly _localStorage: LocalStorageService,
    private readonly _sessionStorage: SessionStorageService
  ) {
    this._storage = this._getStorage();
    this._setSavedItem();
  }

  get storage(): Storage {
    return this._storage;
  }

  get credentials(): AuthData | null {
    return this._credentials;
  }

  getAuthToken(): string | undefined {
    return this.credentials?.accessToken;
  }

  getRefreshToken(): string | undefined {
    return this.credentials?.refreshToken;
  }

  removeItem(): void {
    this._sessionStorage.removeItem(CREDENTIALS_KEY);
    this._localStorage.removeItem(CREDENTIALS_KEY);
  }

  setCredentials(credentials?: AuthData, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? this._localStorage : this._sessionStorage;
      storage.setItem(CREDENTIALS_KEY, JSON.stringify(credentials));
    }
  }

  private _getStorage(): Storage {
    return this._sessionStorage.getItem(CREDENTIALS_KEY)
      ? this._sessionStorage
      : this._localStorage;
  }

  private _setSavedItem(): void {
    const savedCredentials =
      this._sessionStorage.getItem(CREDENTIALS_KEY) ||
      this._localStorage.getItem(CREDENTIALS_KEY);

    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }
}
