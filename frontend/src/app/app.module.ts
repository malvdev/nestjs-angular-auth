import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AuthModule } from '@core/auth';
import { environment } from '@env/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterModule } from './register';
import { LoginModule } from './login';
import { ForgotModule } from './forgot/forgot.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthModule.forRoot({
      apiBase: environment.serverUrl,
    }),
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
    }),
    RegisterModule,
    LoginModule,
    ForgotModule,
    AppRoutingModule,
    AuthModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
