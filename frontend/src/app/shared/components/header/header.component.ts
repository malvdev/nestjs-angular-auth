import { Component, ChangeDetectionStrategy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '@core/auth';
import { DestroyService } from '@shared/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(
    private readonly _destroy$: DestroyService,
    private readonly _authService: AuthService
  ) {}

  logout(): void {
    this._authService.logout().pipe(takeUntil(this._destroy$)).subscribe();
  }
}
