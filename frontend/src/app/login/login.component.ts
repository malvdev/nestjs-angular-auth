import { HttpErrorResponse } from '@angular/common/http';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService, LoginContext } from '@core/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _authService: AuthService,
    private readonly _toastr: ToastrService
  ) {}

  onSubmit(form: LoginContext): void {
    this._authService.login(form).subscribe(
      (res) => {
        this._toastr.success('You are successfully logged in', 'Success');
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
