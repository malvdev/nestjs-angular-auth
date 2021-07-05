import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-details-card-row',
  templateUrl: './details-card-row.component.html',
  styleUrls: ['./details-card-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsCardRowComponent {
  @Input()
  rowTitle: string;
}
