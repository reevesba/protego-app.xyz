import { Injectable } from '@angular/core';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { authLogin, authLogout } from './auth.actions';

export const AUTH_KEY = 'AUTH';

@Injectable()
export class AuthEffects {
  login = createEffect(() =>
    this.actions$.pipe(ofType(authLogin), 
      tap(auth => {
        this.localStorageService
          .setItem(AUTH_KEY, { isAuthenticated: true, token: auth.token, isConfirmed: auth.isConfirmed });
      })),
    { dispatch: false }
  );

  logout = createEffect(
    () =>
      this.actions$.pipe(ofType(authLogout),
        tap(() => {
          this.localStorageService
            .setItem(AUTH_KEY, { isAuthenticated: false, token: null, isConfirmed: false });
        })),
      { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
  ) {}
}