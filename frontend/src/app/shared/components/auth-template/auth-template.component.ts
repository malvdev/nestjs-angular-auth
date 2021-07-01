import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-auth-template',
  templateUrl: './auth-template.component.html',
  styleUrls: ['./auth-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthTemplateComponent {
  @Input()
  title: string;

  @HostBinding('class')
  readonly class: string = 'app-auth-template';
}
