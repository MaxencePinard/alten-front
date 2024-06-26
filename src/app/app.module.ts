import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeEn from '@angular/common/locales/en';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'app/app-routing.module';
import { AppComponent } from 'app/app.component';
import { BaseModule } from 'app/base/base.module';
import { SharedModule } from 'app/shared/shared.module';
import { TokenService } from 'app/data/services/token.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    BaseModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: $localize.locale || 'en' },
    TokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeEn, 'en');
    registerLocaleData(localeFr, 'fr');
  }
}
