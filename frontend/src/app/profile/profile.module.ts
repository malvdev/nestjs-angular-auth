import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsCardModule, HeaderModule } from '@shared/components';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileService } from './services/profile.service';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    HeaderModule,
    DetailsCardModule,
  ],
  providers: [ProfileService],
})
export class ProfileModule {}
