import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ApiResponse, AuthService } from '@core/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  constructor(
    private readonly _authService: AuthService,
    private readonly _toastr: ToastrService
  ) {}

  onSubmit(form: any): void {
    form.password_confirmation = form.password;
    this._authService.register(form).subscribe(
      (res) => {
        console.log('Res', res);

        // if (res.errors?.length) {
        //   this._toastr.error(res.errors.join(' '), 'Error');
        // }
      },
      (error: string) => {
        this._toastr.error('Error', error);
      }
    );
  }
}
