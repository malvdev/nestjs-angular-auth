import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService, CredentialsService } from './services';
import { AuthInterceptor, ErrorHandlerInterceptor } from './interceptors';
import { AuthGuard } from './guards';

@NgModule({
  providers: [
    AuthService,
    AuthGuard,
    CredentialsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule {
  constructor(@Optional() @SkipSelf() parentModule: AuthModule) {
    if (parentModule) {
      throw new Error(
        `${parentModule} has already been loaded. It should only be imported in your application's main module.`
      );
    }
  }
}
