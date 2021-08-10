import { Inject, Injectable } from '@angular/core';

import { IS_SERVER_PLATFORM } from '@core/tokens';

import { MemoryStorageService } from '../memory';

@Injectable()
export class SessionStorageService implements Storage {
  private readonly _storage: Storage;

  constructor(
    @Inject(IS_SERVER_PLATFORM) readonly isServer: boolean,
    private readonly _memoryStorage: MemoryStorageService
  ) {
    this._storage = isServer ? this._memoryStorage : window.sessionStorage;
  }

  get length(): number {
    return this._storage.length;
  }

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
    this._storage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    this._storage.setItem(key, value);
  }
}
