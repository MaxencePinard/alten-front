import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from 'app/data/services/data.service';
import { CookieService } from 'app/data/services/cookies.service';
import { TokenService } from 'app/data/services/token.service';
import { LoginService } from 'app/data/services/login.service';

@NgModule({
  declarations: [
    DataService,
    CookieService,
    TokenService,
    LoginService
  ],
  imports: [
    CommonModule
  ]
})
export class DataModule {}
