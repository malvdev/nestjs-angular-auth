import { Optional } from '@angular/core';
import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';

import { FormFieldComponent } from '../form-field.component';

@Component({
  selector: 'app-form-field-error',
  templateUrl: './form-field-error.component.html',
  styleUrls: ['./form-field-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldErrorComponent {
  constructor(
    @Optional()
    @Inject(FormFieldComponent)
    private readonly _parent: FormFieldComponent
  ) {
    if (!this._parent) {
      throw new Error('Required parent FormFieldComponent not found.');
    }
  }
}
