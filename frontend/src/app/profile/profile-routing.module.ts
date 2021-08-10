import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@core/auth';
import { LoaderComponent } from '@shared/components';

import { ProfileResolverService } from './services/profile-resolver.service';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    resolve: {
      user: ProfileResolverService,
    },
    data: {
      skeleton: LoaderComponent,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProfileResolverService],
})
export class ProfileRoutingModule {}
