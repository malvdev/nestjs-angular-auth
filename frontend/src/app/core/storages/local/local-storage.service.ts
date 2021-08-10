import { Inject, Injectable } from '@angular/core';

import { IS_SERVER_PLATFORM } from '@core/tokens';

import { MemoryStorageService } from '../memory';

@Injectable()
export class LocalStorageService implements Storage {
  private readonly _storage: Storage;

  constructor(
    @Inject(IS_SERVER_PLATFORM) readonly isServer: boolean,
    private readonly _memoryStorage: MemoryStorageService
  ) {
    this._storage = isServer ? this._memoryStorage : window.localStorage;
  }

  [name: string]: unknown;

  length: number;

  clear(): void {
    this._storage.clear();
  }

  getItem(key: string): string | null {
    return this._storage.getItem(key);
  }

  key(index: number): string | null {
    return this._storage.key(index);
  }

  removeItem(key: string): void {
    return this._storage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    return this._storage.setItem(key, value);
  }
}
