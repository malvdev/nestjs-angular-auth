import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ForgotPasswordContext } from '@core';

@Component({
  selector: 'app-forgot-form',
  templateUrl: './forgot-form.component.html',
  styleUrls: ['./forgot-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotFormComponent {
  forgotForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  @Input()
  isLoading: boolean = false;

  @Output()
  formSubmit: EventEmitter<ForgotPasswordContext> = new EventEmitter<ForgotPasswordContext>();

  get email(): AbstractControl | null {
    return this.forgotForm.get('email');
  }

  onSubmit(): void {
    if (this.forgotForm.valid) {
      this.formSubmit.emit(this.forgotForm.value as ForgotPasswordContext);
    }
  }
}
