import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthModule } from './auth';
import { ApiService } from './api';
import { StoragesModule } from './storages';
import { APP_CONFIG } from './tokens';
import { environment } from '../../environments/environment';

@NgModule({
  declarations: [],
  imports: [CommonModule, StoragesModule, AuthModule],
  providers: [ApiService, { provide: APP_CONFIG, useValue: environment }],
})
export class CoreModule {}
