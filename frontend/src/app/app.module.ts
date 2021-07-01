import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterModule } from './register';
import { LoginModule } from './login';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, RegisterModule, LoginModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
