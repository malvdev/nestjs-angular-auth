import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  @Output()
  formSubmit: EventEmitter<any> = new EventEmitter<any>();

  public registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  public isShowPassword: boolean = false;

  get email(): AbstractControl | null {
    return this.registerForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.registerForm.get('password');
  }

  public onToggleVisiblePassword(): void {
    this.isShowPassword = !this.isShowPassword;
  }

  public getPasswordType(): string {
    return this.isShowPassword ? 'text' : 'password';
  }

  public onSubmit(): void {
    if (this.registerForm.valid) {
      this.formSubmit.emit(this.registerForm.value as any);
    }
  }
}
