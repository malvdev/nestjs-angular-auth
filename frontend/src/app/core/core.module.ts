import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from '@env/environment';
import { AuthModule } from './auth';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule.forRoot({
      apiBase: environment.serverUrl,
    }),
  ],
})
export class CoreModule {}
