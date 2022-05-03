import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '../core.state';
import { selectConfirmed } from '../../core/core.module';

@Injectable({
  providedIn: 'root'
})
export class ConfirmedGuardService implements CanActivate {
  private isConfirmed: boolean;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.pipe(select(selectConfirmed)).subscribe((val) => this.isConfirmed = val)

    if (!this.isConfirmed) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}