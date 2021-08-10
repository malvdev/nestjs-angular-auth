import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkeletonComponent } from './skeleton.component';

@NgModule({
  declarations: [SkeletonComponent],
  exports: [SkeletonComponent],
  imports: [CommonModule],
})
export class SkeletonModule {}
