import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { MemoryStorageService } from '../memory';

@Injectable()
export class SessionStorageService implements Storage {
  private readonly _storage: Storage;

  constructor(
    @Inject(PLATFORM_ID) private readonly _platformId: Object,
    private readonly _memoryStorage: MemoryStorageService
  ) {
    this._storage = isPlatformServer(this._platformId)
      ? this._memoryStorage
      : window.sessionStorage;
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
