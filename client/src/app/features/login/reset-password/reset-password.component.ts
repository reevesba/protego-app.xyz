import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { UsersService } from '../../admin/users/users.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomValidationService } from '../../../core/auth/custom-validation.service';
import { NotificationService } from '../../../core/notifications/notification.service';

@Component({
  selector: 'reset-password',
  templateUrl: 'reset-password.component.html',
  styleUrls: ['reset-password.component.scss']
})
export class ResetPasswordComponent {
  username: string;
  token: string;
  passwordForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  hide1: boolean = true;
  hide2: boolean = true;

  constructor(
    private authApi: AuthService,
    private usersService: UsersService,
    private router: Router,
    private ar: ActivatedRoute,
    private fb: FormBuilder,
    private customValidator: CustomValidationService,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.ar.params.subscribe(params => {
      if (params['id']) {
        this.token = params['id'];
        this.getUsername(this.token);
      }
    });

    this.passwordForm = this.fb.group({
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      confirm_password: ['', [Validators.required]]
    },
    { validators: this.customValidator.MatchPassword('password', 'confirm_password') }
    );
  }

  get passwordFormControl() {
    return this.passwordForm.controls;
  }

  getUsername(emailToken: string) {
    this.usersService
      .getUsername(emailToken)
      .subscribe({
        next: (v) => this.username = v['username'],
        error: (e) => console.log(e)
      });
  }

  onSubmit(): void {
    if (this.passwordForm.valid) {
      this.loading = true;
      this.authApi
        .updatePassword({ 'token': this.token, 'password': this.passwordForm.controls['password'].value })
        .subscribe({
          next: () => {
            this.loading = false;
            this.submitted = true;
            this.notificationService.success('Password updated successfully'),
            this.router.navigate(['/login'])
          },
          error: (e) => console.log(e)
        });
    }
  }
}