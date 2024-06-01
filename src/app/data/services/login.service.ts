import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'app/data/services/cookies.service';
import { TokenService } from 'app/data/services/token.service';
import { DataService } from 'app/data/services/data.service';

@Injectable({
  providedIn: 'root'
})
class PermissionsService {
  constructor(private router: Router, public loginService: LoginService) {}

  canActivate(next, state): boolean {
    this.loginService.isAdmin()
    if (!this.loginService.isLoggedIn()) {
      this.router.navigate(['']);
    }
    return true;
  }
  isAdmin(next, state): boolean {
    if (!this.loginService.isLoggedIn() || !this.loginService.isAdmin()) {
      this.router.navigate(['']);
    }
    return true;
  }
}

export const AuthGuard = (next, state): boolean => {
  return inject(PermissionsService).canActivate(next, state);
}

export const AdminGuard = (next, state): boolean => {
  return inject(PermissionsService).isAdmin(next, state);
}

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(public readonly cookieService: CookieService,
      public readonly tokenService: TokenService,
      public readonly dataService: DataService) {}

    public isLoggedIn(): boolean {
      const token = this.cookieService.get('authToken');
      if (!token) return false;
      this.tokenService.setToken(token);
      return !this.tokenService.isTokenExpired();
    }

    public isAdmin(): boolean {
      const role = this.cookieService.get('role');
      return role === 'admin';
    }

    public getUserId(): string {
      const token = this.cookieService.get('authToken');
      if (!token) return '';
      this.tokenService.setToken(token);
      return this.tokenService.getUserId();
    }
}
