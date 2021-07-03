import { Injectable } from '@angular/core';

@Injectable()
export class MemoryStorageService implements Storage {
  private _data: { [key: string]: string } = {};

  get length(): number {
    return Object.keys(this._data).length;
  }

  clear(): void {
    this._data = {};
  }

  getItem(key: string): string | null {
    return key in this._data ? this._data[key] : null;
  }

  key(index: number): string | null {
    const keys = Object.keys(this._data);

    return index >= 0 && keys.length < index ? keys[index] : null;
  }

  removeItem(key: string): void {
    delete this._data[key];
  }

  setItem(key: string, value: string): void {
    this._data[key] = value;
  }
}
