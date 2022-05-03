import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { selectToken } from '../auth/auth.selectors';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../core/core.state';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    token: string;

    constructor(
        private store: Store<AppState>
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.includes('arxiv') || request.url.includes('algolia') || request.url.includes('github')){
            return next.handle(request);
        }

        // add auth header with jwt if user is logged in and request is to api url
        this.store.pipe(select(selectToken)).subscribe(res => this.token = res)
        if (this.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.token}`
                }
            });
        }
        return next.handle(request);
    }
}