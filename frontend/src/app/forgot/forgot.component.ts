import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize, takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { AuthService, ForgotPasswordContext } from '@core';
import { DestroyService } from '@shared/services';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent {
  isLoading = false;

  constructor(
    private readonly _router: Router,
    private readonly _authService: AuthService,
    private readonly _toastr: ToastrService,
    private readonly _destroy$: DestroyService
  ) {}

  onSubmit(form: ForgotPasswordContext): void {
    this.isLoading = true;
    this._authService
      .forgotPassword(form)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        takeUntil(this._destroy$)
      )
      .subscribe(
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
