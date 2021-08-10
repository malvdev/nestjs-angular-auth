import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { AuthService, LoginContext } from '@core/auth';
import { DestroyService } from '@shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLoading: boolean = false;

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _authService: AuthService,
    private readonly _toastr: ToastrService,
    private readonly _destroy$: DestroyService
  ) {}

  onSubmit(form: LoginContext): void {
    this.isLoading = true;
    this._authService
      .login(form)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        takeUntil(this._destroy$)
      )
      .subscribe(
        () => {
          this._router.navigate(
            [this._route.snapshot.queryParams.redirect || '/profile'],
            { replaceUrl: true }
          );
        },
        ({ error }: HttpErrorResponse) => {
          this._toastr.error(error.message, 'Error');
        }
      );
  }
}
