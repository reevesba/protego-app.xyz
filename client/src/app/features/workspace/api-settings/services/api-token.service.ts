import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as env } from '../../../../../environments/environment';
import { ApiToken } from '../models/api-token.model';

@Injectable()
export class ApiTokenService {
  private API_URL = env.apiUrl + '/api-token';

  constructor(private http: HttpClient) { }

  private static _handleError(err: HttpErrorResponse | any) {
    return throwError(() => err.message || 'Error: Unable to complete request.');
  }

  getApiTokens(groupId: number): Observable<ApiToken[]> {
    return this.http.get<ApiToken[]>(`${this.API_URL}/${groupId}`)
      .pipe(catchError(ApiTokenService._handleError));
  }

  saveApiToken(apiToken: ApiToken): Observable<any> {
    return this.http.post(`${this.API_URL}`, apiToken)
      .pipe(catchError(ApiTokenService._handleError));
  }

  updateApiToken(apiToken: ApiToken, apiTokenId: number): Observable<any> {
    return this.http.put(`${this.API_URL}/${apiTokenId}`, apiToken)
      .pipe(catchError(ApiTokenService._handleError));
  }

  deleteApiToken(apiTokenId: number) {
    return this.http.delete(`${this.API_URL}/${apiTokenId}`)
      .pipe(catchError(ApiTokenService._handleError));
  }
}