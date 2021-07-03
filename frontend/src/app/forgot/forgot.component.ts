import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotComponent {
  onSubmit(form: any): void {
    console.log('forgot form', form);
  }
}
