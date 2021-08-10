import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormFieldComponent } from './form-field.component';
import { FormFieldErrorComponent } from './form-field-error';

@NgModule({
  declarations: [FormFieldComponent, FormFieldErrorComponent],
  imports: [CommonModule],
  exports: [FormFieldComponent, FormFieldErrorComponent],
})
export class FormFieldModule {}
