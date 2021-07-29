import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService, ForgotPasswordContext } from '@core';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotComponent {
  constructor(
    private readonly _router: Router,
    private readonly _authService: AuthService,
    private readonly _toastr: ToastrService
  ) {}

  onSubmit(form: ForgotPasswordContext): void {
    this._authService.forgotPassword(form).subscribe(
      (res) => {
        this._toastr.success(res.message, 'Success');
        this._router.navigate(['/login'], { replaceUrl: true });
      },
      ({ error }: HttpErrorResponse) => {
        this._toastr.error(error.message, 'Error');
      }
    );
  }
}
