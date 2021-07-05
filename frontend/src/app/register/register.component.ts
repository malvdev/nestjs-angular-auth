import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService, RegisterContext } from '@core/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _authService: AuthService,
    private readonly _toastr: ToastrService
  ) {}

  onSubmit(form: RegisterContext): void {
    this._authService.register(form).subscribe(
      (res) => {
        this._toastr.success('User registered successfully', 'Success');
        this._router.navigate(
          [this._route.snapshot.queryParams.redirect || '/'],
          { replaceUrl: true }
        );
      },
      ({ error }: HttpErrorResponse) => {
        this._toastr.error(error.message, 'Error');
      }
    );
  }
}
