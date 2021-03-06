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

import { RegisterContext } from '@core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  isShowPassword: boolean = false;

  @Input()
  isLoading: boolean = false;

  @Output()
  formSubmit: EventEmitter<RegisterContext> = new EventEmitter<RegisterContext>();

  get email(): AbstractControl | null {
    return this.registerForm.get('email');
  }

  get name(): AbstractControl | null {
    return this.registerForm.get('name');
  }

  get password(): AbstractControl | null {
    return this.registerForm.get('password');
  }

  onToggleVisiblePassword(): void {
    this.isShowPassword = !this.isShowPassword;
  }

  getPasswordType(): string {
    return this.isShowPassword ? 'text' : 'password';
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.formSubmit.emit(this.registerForm.value as RegisterContext);
    }
  }
}
