import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectToken } from './auth.selectors';
import { AppState } from '../core.state';
import { Token } from '../../shared/interfaces/token.interface';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {
  private token: string;
  private role: string;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.pipe(select(selectToken)).subscribe((val) => this.token = val)

    if (this.token) {
      this.role = jwt_decode<Token>(this.token).role;
    }

    if (this.role) {
      // check if route is restricted by role
      if (route.data.roles && route.data.roles.indexOf(this.role) === -1) {
        // role not authorized so redirect to home page
        this.router.navigate(['/']);
        return false;
      }
      // user role is authorized
      return true;
    }
    // not logged in, redirect to login page with return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}