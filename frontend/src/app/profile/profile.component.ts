import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService, UserData } from '@core/auth';
import { ProfileService } from '@shared';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile: UserData;
  constructor(
    private readonly _router: Router,
    private readonly _authService: AuthService,
    private readonly _profileService: ProfileService,
    private readonly _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._profileService.me().subscribe(
      (data: UserData) => {
        this.profile = data;
      },
      ({ error }: HttpErrorResponse) => {
        this._toastr.error(error.message, 'Error');
      }
    );
  }

  logout(): void {
    this._authService.logout().subscribe(() => {
      this._router.navigate(['/login'], { replaceUrl: true });
    });
  }
}
