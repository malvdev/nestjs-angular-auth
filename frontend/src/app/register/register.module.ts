import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthTemplateModule, FormFieldModule } from '@shared/components';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { RegisterFormComponent } from './register-form';

@NgModule({
  declarations: [RegisterComponent, RegisterFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegisterRoutingModule,
    AuthTemplateModule,
    FormFieldModule,
  ],
})
export class RegisterModule {}
