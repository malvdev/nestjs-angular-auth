import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthTemplateModule, FormFieldModule } from '@shared/components';

import { ForgotRoutingModule } from './forgot-routing.module';
import { ForgotComponent } from './forgot.component';
import { ForgotFormComponent } from './forgot-form';

@NgModule({
  declarations: [ForgotComponent, ForgotFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ForgotRoutingModule,
    AuthTemplateModule,
    FormFieldModule,
  ],
})
export class ForgotModule {}
