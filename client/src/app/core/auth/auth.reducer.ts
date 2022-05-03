import { AuthState } from './auth.model';
import { authLogin, authLogout } from './auth.actions';
import { createReducer, on, Action } from '@ngrx/store';

export const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  isConfirmed: false
};

const reducer = createReducer(
  initialState,
  on(authLogin, (state, auth) => ({ ...state, isAuthenticated: true, token: auth.token, isConfirmed: auth.isConfirmed })),
  on(authLogout, (state) => ({ ...state, isAuthenticated: false, token: null, isConfirmed: false }))
);

export function authReducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return reducer(state, action);
}