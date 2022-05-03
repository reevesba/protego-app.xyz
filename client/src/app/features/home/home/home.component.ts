import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectConfirmed } from '../../../core/core.module';
import { TokenService } from '../../../shared/services/token.service';
import { AuthService } from '../../../core/auth/auth.service';
import { NotificationService } from '../../../core/core.module';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit  {
  isConfirmed$: Observable<boolean>;
  username: string;
  loading: boolean = false;

  constructor(
    private store: Store,
    private tokenService: TokenService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.isConfirmed$ = this.store.pipe(select(selectConfirmed));
    this.username = this.tokenService.username;
  }

  resendEmail() {
    this.loading = true;
    this.authService
      .resendEmail(this.username)
      .subscribe({
        next: () => {
          this.notificationService.success('Confirmation Email Sent!'),
          this.loading = false
        },
        error: (e) => {
          console.log(e),
          this.loading = false
        }
      })
  }
}