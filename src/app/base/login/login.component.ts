import { Component, Input } from '@angular/core';
import { LoginService } from 'app/base/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @Input() isAuthenticated = false;
  showLoginDialog = false;
  showPassword = false;

  public userName: string = 'John Doe';

  constructor(public readonly loginService: LoginService) {}

  onShowLoginDialog(): void {
    if (!this.isAuthenticated) {
      this.showLoginDialog = true;
    }
  }

  onLogin(): void {
    this.showLoginDialog = false;
  }

  onShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

}
