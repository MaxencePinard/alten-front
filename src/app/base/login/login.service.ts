import { Injectable } from '@angular/core';
import { User } from 'app/base/login/login.model';

@Injectable({
    providedIn: 'root'
})
export class LoginComponentService {

    private _isEmailValid = true;
    private _isUsernameValid = true;
    private _isPasswordValid = true;

    constructor() {

    }

    public getIsEmailValid(): boolean {
        return this._isEmailValid;
    }

    public getIsUsernameValid(): boolean {
        return this._isUsernameValid;
    }

    public getIsPasswordValid(): boolean {
        return this._isPasswordValid;
    }

    public resetValid(): void {
        this._isEmailValid = true;
        this._isUsernameValid = true;
        this._isPasswordValid = true;
    }

    public isUserValid(user: User): boolean {
      this.resetValid();
      let isValid = true;
      if (user.email.length === 0 || !this.validateEmail(user.email)) {
        isValid = false;
        this._isEmailValid = false;
      }
      if (user.username.length === 0){
        isValid = false;
        this._isUsernameValid = false;
      }
      if (user.password.length === 0){
        isValid = false;
        this._isPasswordValid = false;
      }
      return isValid;
    }

    public isEditUserValid(user: User): boolean {
      this.resetValid();
      let isValid = true;
      if (user.email.length === 0 || !this.validateEmail(user.email)) {
        isValid = false;
        this._isEmailValid = false;
      }
      if (user.username.length === 0){
        isValid = false;
        this._isUsernameValid = false;
      }
      return isValid;
    }

    validateEmail(email): boolean {
      return email.toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

}
