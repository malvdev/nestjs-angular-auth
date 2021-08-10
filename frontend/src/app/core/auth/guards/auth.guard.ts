import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { CredentialsService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly _router: Router,
    private readonly _credentialService: CredentialsService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this._credentialService.getAuthToken()) {
      return true;
    }

    this._router.navigate(['/auth/login'], {
      queryParams: { redirect: state.url },
      replaceUrl: true,
    });

    return false;
  }
}
