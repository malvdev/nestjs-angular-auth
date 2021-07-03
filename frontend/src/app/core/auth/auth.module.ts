import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthOptions } from './models/auth.model';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { CredentialsService } from './services/credentials.service';
import { AUTH_OPTIONS_TOKEN } from './tokens/auth-options.token';
import {
  LocalStorageService,
  MemoryStorageService,
  SessionStorageService,
} from '../storages';

@NgModule()
export class AuthModule {
  constructor(@Optional() @SkipSelf() parentModule: AuthModule) {
    if (parentModule) {
      throw new Error(
        `${parentModule} has already been loaded. It should only be imported in your application's main module.`
      );
    }
  }

  static forRoot(
    options: AuthOptions
  ): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        AuthGuard,
        CredentialsService,
        MemoryStorageService,
        LocalStorageService,
        SessionStorageService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
        {
          provide: AUTH_OPTIONS_TOKEN,
          useValue: options,
        },
      ],
    };
  }
}
