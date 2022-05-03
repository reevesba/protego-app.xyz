import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { TokenService } from '../../../shared/services/token.service';
import { AuthService } from '../../../core/auth/auth.service';
import { selectConfirmed } from '../../../core/core.module';
import { NotificationService } from '../../../core/core.module';

@Component({
  selector: 'confirm-email',
  templateUrl: 'confirm-email.component.html',
  styleUrls: ['confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {
  isConfirmed$: Observable<boolean>;
  isConfirmed: boolean;
  isLoading: boolean = false;
  username: string;

  constructor(
    private store: Store,
    private ar: ActivatedRoute,
    private authService: AuthService,
    private tokenService: TokenService,
    private notificationService: NotificationService
    ) {}

  ngOnInit() {
    this.isConfirmed$ = this.store.pipe(select(selectConfirmed));
    this.username = this.tokenService.username;

    this.isConfirmed$.subscribe({
      next: (v) => this.isConfirmed = v,
      error: (e) => console.log(e)
    })

    if (!this.isConfirmed) {
      this.ar.params.subscribe(params => {
        if (params['id']) {
          this.confirmEmail(params['id']);
        }
      });
    }
  }

  confirmEmail(token: string) {
    this.authService
      .confirmEmail(token)
      .subscribe({
        next: () => { 
          this.authService
            .refreshToken()
            .subscribe({
              next: () => this.isConfirmed = true,
              error: (e) => console.log(e)
            })
        },
        error: (e) => console.log(e)
      });
  }

  resendEmail() {
    this.isLoading = true;
    this.authService
      .resendEmail(this.username)
      .subscribe({
        next: () => {
          this.notificationService.success('Confirmation Email Sent!'),
          this.isLoading = false
        },
        error: (e) => {
          console.log(e),
          this.isLoading = false
        }
      })
  }
}