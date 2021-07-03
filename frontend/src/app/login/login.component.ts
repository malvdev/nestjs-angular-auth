import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '@core/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(private readonly _authService: AuthService) {}

  onSubmit(form: any): void {
    this._authService.login(form).subscribe(
      (res) => {
        console.log('login form res', res);
      },
      (error) => {
        console.log('login form error', error);
      }
    );
  }
}
