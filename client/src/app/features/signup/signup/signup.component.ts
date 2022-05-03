import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { RecaptchaErrorParameters } from 'ng-recaptcha';
import { AuthService } from '../../../core/auth/auth.service';
import { UsersService } from '../../../features/admin/users/users.service';
import { UsernameCommService } from '../../login/username.comm.service';
import { CustomValidationService } from '../../../core/auth/custom-validation.service';
import { User } from '../../admin/users/user.model';
import { Token } from '../../../shared/interfaces/token.interface';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.scss']
})
export class SignupComponent implements OnInit {
  hide1: boolean = true;
  hide2: boolean = true;
  user: User;
  userRole: string;
  returnUrl: string;
  loading: boolean = false;
  registerForm: FormGroup;
  submitted = false;

  // recaptcha
  siteKey: string = "6Lf57HQaAAAAAPPcEnDe7TO4PVTyUjN1w3qd91EQ";
  recaptchaComplete: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private customValidator: CustomValidationService,
    private communicationService: UsernameCommService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(15)], this.customValidator.userNameValidator.bind(this.customValidator)],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email], this.customValidator.emailValidator.bind(this.customValidator)],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      confirm_password: ['', [Validators.required]]
    },
    { validators: this.customValidator.MatchPassword('password', 'confirm_password') }
    );

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      delete this.registerForm.value['confirm_password'];
      this.user = new User(this.registerForm.value);
      this.user.created_by = this.user.username;
      this.loading = true;
      this.saveUser();
    }
  }

  saveUser() {
    this.authService
      .createUser(this.user)
      .subscribe({
        next: (v) => {
          this.userRole = jwt_decode<Token>(v.auth_token).role;
          this.getUserPhoto(jwt_decode<Token>(v.auth_token).username),
          this.loading = false;
          this.router.navigate([this.returnUrl])
        },
        error: (e) => console.log(e)
      });
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