import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header.component';
import { LogoModule } from '../logo';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule, LogoModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
