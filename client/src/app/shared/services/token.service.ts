import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Token } from '../interfaces/token.interface';
import jwt_decode from 'jwt-decode';
import { selectToken } from '../../core/core.module';

@Injectable()
export class TokenService {
  private token$: Observable<string>;
  private token: string;

  constructor (private store: Store) {
    this.token$ = this.store.pipe(select(selectToken));
    this.token$.subscribe(res => this.token = res);
  }

  public get username() {
    if (this.token === null || this.token === undefined) {
      return '';
    }
    return jwt_decode<Token>(this.token).username;
  }

  public get role() {
    if (this.token === null || this.token === undefined) {
      return '';
    }
    return jwt_decode<Token>(this.token).role;
  }
}