import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@core/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(
    private readonly _router: Router,
    private readonly _authService: AuthService
  ) {}

  logout(): void {
    this._authService.logout().subscribe(() => {
      this._router.navigate(['/login'], { replaceUrl: true });
    });
  }
}
