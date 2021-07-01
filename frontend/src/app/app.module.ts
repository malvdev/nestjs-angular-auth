import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterModule } from './register';
import { LoginModule } from './login';
import { ForgotModule } from './forgot/forgot.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RegisterModule,
    LoginModule,
    ForgotModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
