import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment as env } from '../../../environments/environment';
import { User } from '../../features/admin/users/user.model';
import { authLogin, authLogout } from '../../core/core.module';
import { Token } from '../../shared/interfaces/token.interface';
import jwt_decode from 'jwt-decode';

@Injectable()
export class AuthService {
  private API_URL = env.apiUrl + '/auth';

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store
  ) {}

  private static _handleError(err: HttpErrorResponse) {
    return throwError(() => err.message || 'Error: Unable to complete request.');
  }

  createUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/register`, user)
      .pipe(catchError(AuthService._handleError))
      .pipe(map(res => {
        this.setTokens(res);
        return res;
      }));
  }

  confirmEmail(token: string) {
    return this.http.post<any>(`${this.API_URL}/confirm-email/${token}`, {})
      .pipe(catchError(AuthService._handleError));
  }

  resendEmail(username: string) {
    return this.http.post<any>(`${this.API_URL}/resend-email`, { 'username': username })
    .pipe(catchError(AuthService._handleError));
  }

  validateRecaptcha(captchaResponse: string) {
    return this.http.post(`${this.API_URL}/validate-recaptcha`, { 'response': captchaResponse })
    .pipe(catchError(AuthService._handleError));
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/login`, user)
      .pipe(catchError(AuthService._handleError))
      .pipe(map(res => {
        this.setTokens(res);
        return res;
      }));
  }

  resetPassword(email: string) {
    return this.http.post<any>(`${this.API_URL}/reset-password`, { 'email': email })
    .pipe(catchError(AuthService._handleError));
  }

  updatePassword(resetObj: any) {
    return this.http.put<any>(`${this.API_URL}/update-password`, resetObj)
    .pipe(catchError(AuthService._handleError));
  }

  logout() {
    this.http.post(`${this.API_URL}/logout`, {})
      .pipe(catchError(AuthService._handleError))
      .subscribe();
    this.stopRefreshTokenTimer();
    this.store.dispatch(authLogout());
    this.router.navigate(['/login']);
  }

  refreshToken() {
    // get the current refresh token
    let refreshToken = (document.cookie.split(';').find(x => x.includes('refreshToken')) || '=').split('=')[1];
    let userId: number;
    
    if (refreshToken) { userId = jwt_decode<Token>(refreshToken).sub; }

    // get a new refresh token and restart timer
    return this.http.post<any>(`${this.API_URL}/refresh-token`, { 'refresh_token': refreshToken, 'user_id': userId })
      .pipe(map(res => {
        if (res.status !== 'fail') {
          this.setTokens(res);
        }
        return res;
      }));
  }

  usernameAvailable(username: string) {
    return this.http.get(`${this.API_URL}/username-available/${username}`)
    .pipe(catchError(AuthService._handleError));
  }

  emailAvailable(email: string) {
    return this.http.get(`${this.API_URL}/email-available/${email}`)
    .pipe(catchError(AuthService._handleError));
  }

  // helper methods

  private setTokens(res: any) {
    // store auth token in localStorage
    this.store.dispatch(authLogin({ token: res.auth_token, isConfirmed: res.is_confirmed }));

    // store refresh token as cookie
    const exp = new Date(jwt_decode<Token>(res.refresh_token).exp*1000).toUTCString();
    document.cookie = `refreshToken=${res.refresh_token}; expires=${exp}; path=/; SameSite=None; Secure=${true}`;

    // start timer
    this.startRefreshTokenTimer(res.auth_token);
  }

  private refreshTokenTimeout: NodeJS.Timeout;

  private startRefreshTokenTimer(token: string) {
    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwt_decode<Token>(token).exp*1000);
    const timeout = expires.getTime() - Date.now() - (60*1000);

    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
      clearTimeout(this.refreshTokenTimeout);
      this.revokeRefreshToken();
  }

  private revokeRefreshToken() {
    document.cookie = 'refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}