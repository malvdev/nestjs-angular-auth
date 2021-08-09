import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { AuthService, RegisterContext } from '@core/auth';
import { DestroyService } from '@shared/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  isLoading: boolean = false;

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _authService: AuthService,
    private readonly _toastr: ToastrService,
    private readonly _destroy$: DestroyService
  ) {}

  onSubmit(form: RegisterContext): void {
    this.isLoading = true;
    this._authService
      .register(form)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        takeUntil(this._destroy$)
      )
      .subscribe(
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
