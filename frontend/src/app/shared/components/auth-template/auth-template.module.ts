import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthTemplateComponent } from './auth-template.component';
import { LogoModule } from '../logo';

@NgModule({
  declarations: [AuthTemplateComponent],
  imports: [CommonModule, LogoModule],
  exports: [AuthTemplateComponent],
})
export class AuthTemplateModule {}
