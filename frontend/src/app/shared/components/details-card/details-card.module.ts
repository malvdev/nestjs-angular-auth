import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsCardComponent } from './details-card.component';
import { DetailsCardRowComponent } from './details-card-row/details-card-row.component';

@NgModule({
  declarations: [DetailsCardComponent, DetailsCardRowComponent],
  imports: [CommonModule],
  exports: [DetailsCardComponent, DetailsCardRowComponent],
})
export class DetailsCardModule {}
