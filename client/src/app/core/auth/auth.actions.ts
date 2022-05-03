import { createAction, props } from '@ngrx/store';

export const authLogin = createAction('[Auth] Login', props<{ token: string, isConfirmed: boolean }>());
export const authLogout = createAction('[Auth] Logout');