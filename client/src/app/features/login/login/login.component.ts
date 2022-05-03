import { Component } from '@angular/core';
import { RecaptchaErrorParameters } from 'ng-recaptcha';
import { User } from '../../admin/users/user.model';
import { AuthService } from '../../../core/auth/auth.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { UsernameCommService } from '../username.comm.service';
import { TokenService } from '../../../shared/services/token.service';
import { UsersService } from '../../../features/admin/users/users.service';
import { Token } from '../../../shared/interfaces/token.interface';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {
  user: User;
  userRole: string;
  loginForm: FormGroup;
  submitted: boolean = false;
  hide: boolean = true;
  returnUrl: string;

  // recaptcha
  siteKey: string = "6Lf57HQaAAAAAPPcEnDe7TO4PVTyUjN1w3qd91EQ";
  recaptchaComplete: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private communicationService: UsernameCommService,
    private usersService: UsersService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    if (this.tokenService.username) { this.router.navigate(['/home']); }
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  onLogin(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.user = new User(this.loginForm.value);
      this.authService
        .login(this.user)
        .subscribe({
          next: (v) => {
            this.userRole = jwt_decode<Token>(v.auth_token).role,
            this.getUserPhoto(jwt_decode<Token>(v.auth_token).username),
            this.router.navigate([this.returnUrl])
          },
          error: (e) => console.log(e)
        });
    }
  }

  getUserPhoto(username: string) {
    this.usersService
      .getUserPhoto(username)
      .subscribe({
        next: (v) => {
          this.communicationService.emitChange({
            username: username,
            role: this.userRole,
            profilePhoto: 'data:image/gif;base64,' + v
          });
        },
        error: (e) => console.log(e)
      });
  }

  // recaptcha helpers
  public resolved(captchaResponse: string): void {
    this.authService
      .validateRecaptcha(captchaResponse)
      .subscribe({
        next: (v) => {
          if (v['success']) {
            this.recaptchaComplete = true;
          }
        },
        error: (e) => console.log(e)
      });
  }

  public onError(errorDetails: RecaptchaErrorParameters): void {
    console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }
}