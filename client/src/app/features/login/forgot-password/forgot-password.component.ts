import { Component } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'forgot-password',
  templateUrl: 'forgot-password.component.html',
  styleUrls: ['forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  passwordForm: FormGroup;
  linkSent: boolean = false;
  loading: boolean = false;

  constructor(
    private authApi: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.passwordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get passwordFormControl() {
    return this.passwordForm.controls;
  }

  onSubmit(): void {
    this.loading = true;
    if (this.passwordForm.valid) {
      this.authApi
        .resetPassword(this.passwordForm.controls['email'].value)
        .subscribe({
          next: () => {
            this.linkSent = true,
            this.loading = false
          },
          error: (e) => console.log(e)
        });
    }
  }
}