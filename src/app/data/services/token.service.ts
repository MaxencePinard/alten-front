import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class TokenService {

    jwtToken: string;
    decodedToken;

    constructor() {
    }

    setToken(token: string) {
      if (token) {
        this.jwtToken = token;
      }
    }

    decodeToken() {
      if (this.jwtToken) {
      this.decodedToken = jwtDecode(this.jwtToken);
      }
    }

    getDecodeToken() {
      return jwtDecode(this.jwtToken);
    }

    getUserId() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken.userId : null;
    }

    getExpiryTime() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken.exp : null;
    }

    isTokenExpired(): boolean {
      const expiryTime: number = this.getExpiryTime();
      if (expiryTime) {
        return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
      } else {
        return false;
      }
    }
}
