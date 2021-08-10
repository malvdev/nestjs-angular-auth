import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemoryStorageService } from './memory';
import { LocalStorageService } from './local';
import { SessionStorageService } from './session';

@NgModule({
  imports: [CommonModule],
  providers: [MemoryStorageService, LocalStorageService, SessionStorageService],
})
export class StoragesModule {}
