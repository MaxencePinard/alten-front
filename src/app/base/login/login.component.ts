import { Component, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { DataService } from 'app/data/services/data.service';
import { CookieService } from 'app/data/services/cookies.service';
import { Router } from '@angular/router';
import { LoginService } from 'app/data/services/login.service';
import { LoginComponentService } from 'app/base/login/login.service';
import { User } from 'app/base/login/login.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @Input() isAuthenticated = false;
  @ViewChild('menu') menu: ElementRef;
  @ViewChild('toggleButton') toggleButton: ElementRef;
  showLoginDialog = false;
  showSignupDialog = false;
  showProfileDialog = false;
  showPassword = false;
  loginError = false;
  email = '';
  password = '';
  items: [{label: 'Logout', icon: 'pi pi-sign-out'}];
  userMenuDisplayed = false;
  signupUser: User;
  dialogHeader: string = '';
  isLogin = true;

  public userName: string = '';

  constructor(private messageService: MessageService,
    public readonly dataService: DataService,
    public readonly cookieService: CookieService,
    public readonly loginService: LoginService,
    public readonly loginComponentService: LoginComponentService,
    private readonly router: Router,
    private renderer: Renderer2) {
      this.isAuthenticated = !!this.cookieService.get('authToken');
      this.renderer.listen('window', 'click',(e:Event)=>{
        if(this.userMenuDisplayed && !this.toggleButton.nativeElement.contains(e.target) && !this.menu.nativeElement.contains(e.target)) {
          this.userMenuDisplayed = false;
        }
      });
      this.signupUser = {
        username: '',
        email: '',
        password: ''
      }
  }

  ngOnInit(): void {
    if (this.isAuthenticated) {
      this.dataService.getUser(this.loginService.getUserId()).subscribe(
      (response) => {
        this.userName = response.username;
      },
      (error) => {
        console.error('Error handler:', error);
      })
    }
  }

  onShowLoginDialog(): void {
    this.dialogHeader = $localize`:@@logInForm:` || 'Log In';
    if (!this.isAuthenticated) {
      this.showLoginDialog = true;
    } else {
      this.userMenuDisplayed = !this.userMenuDisplayed;
    }
  }

  switchDialog(): void {
    this.showPassword = false;
    if (this.isLogin) {
      this.dialogHeader = $localize`:@@signUp:` || 'Sign Up';
    } else {
      this.dialogHeader = $localize`:@@logInForm:` || 'Log In';
    }
    this.isLogin = !this.isLogin;
  }

  onSignup(): void {
    if (this.loginComponentService.isUserValid(this.signupUser)) {
      this.dataService.signup(this.signupUser).subscribe(
        (response) => {
          this.email = this.signupUser.email;
          this.password = this.signupUser.password;
          this.onLogin();
        },
        (error) => {
          console.error('Error handler:', error);
          this.loginError = true;
        }
      );
    }
  }

  onLogin(): void {
    this.loginError = false;
    this.dataService.login(this.email, this.password).subscribe(
      (response) => {
        this.cookieService.set('authToken', response.token);
        this.cookieService.set('role', response.role);
        this.showLoginDialog = false;
        this.resetSignupUser();
        this.router.navigate(['']);
        window.location.reload();
      },
      (error) => {
        console.error('Error handler:', error);
        this.loginError = true;
      }
    );
  }

  onLogout(): void {
    this.cookieService.remove('authToken');
    this.cookieService.remove('role');
    this.userMenuDisplayed = false;
    this.router.navigate(['']);
    window.location.reload()
  }

  onProfile(): void {
    if (this.isAuthenticated) {
      this.showProfileDialog = true;
      this.dataService.getUser(this.loginService.getUserId()).subscribe(
      (response) => {
        this.signupUser = response;
      },
      (error) => {
        console.error('Error handler:', error);
      })
    }
  }

  onEditProfile(): void {
    if (this.loginComponentService.isEditUserValid(this.signupUser)) {
      this.dataService.editUser(this.signupUser).subscribe(
        (response) => {
          this.userName = this.signupUser.username;
          this.showProfileDialog = false;
          this.resetSignupUser();
        },
        (error) => {
          console.error('Error handler:', error);
          this.loginError = true;
        }
      );
    }
  }

  onCancelEdit(): void {
    this.showProfileDialog = false;
    this.resetSignupUser();
  }

  onShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  resetSignupUser(): void {
    this.signupUser = {
      username: '',
      email: '',
      password: ''
    }
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

}
