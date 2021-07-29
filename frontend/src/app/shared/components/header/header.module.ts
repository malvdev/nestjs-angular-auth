import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header.component';
import { LogoModule } from '../logo';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule, LogoModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
