import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserData } from '@core/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  profile$: Observable<UserData> = this._activatedRoute.data.pipe(
    map((data) => data.user)
  );

  constructor(private readonly _activatedRoute: ActivatedRoute) {}
}
