import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { CoreModule } from '@core';
import { DestroyService } from '@shared/services';
import { SkeletonModule } from '@shared/components';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    ToastrModule.forRoot({
      timeOut: 5000,
    }),
    SkeletonModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
  providers: [DestroyService],
})
export class AppModule {}
