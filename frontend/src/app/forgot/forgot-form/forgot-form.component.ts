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
  selector: 'app-forgot-form',
  templateUrl: './forgot-form.component.html',
  styleUrls: ['./forgot-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotFormComponent {
  @Output() formSubmit = new EventEmitter<any>();

  public forgotForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  get email(): AbstractControl | null {
    return this.forgotForm.get('email');
  }

  onSubmit(): void {
    if (this.forgotForm.valid) {
      this.formSubmit.emit(this.forgotForm.value as any);
    }
  }
}
