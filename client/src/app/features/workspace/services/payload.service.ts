import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as env } from '../../../../environments/environment';
import { Payload } from '../models/payload.model';

@Injectable()
export class PayloadService {
  private API_URL = env.apiUrl + '/payloads';

  constructor(private http: HttpClient) { }

  private static _handleError(err: HttpErrorResponse | any) {
    return throwError(() => err.message || 'Error: Unable to complete request.');
  }

  getGroupPayloads(groupId: number, pageIndex: number, pageSize: number): Observable<Payload[]> {
    return this.http.get<Payload[]>(`${this.API_URL}/${groupId}/${pageIndex}/${pageSize}`)
      .pipe(catchError(PayloadService._handleError));
  }

  loadPayloads(groupId: number): Observable<Payload[]> {
    return this.http.get<Payload[]>(`${this.API_URL}/loader/${groupId}`)
      .pipe(catchError(PayloadService._handleError));
  }

  updatePayload(payload: Payload, payloadId: number): Observable<any> {
    return this.http.put(`${this.API_URL}/${payloadId}`, payload)
      .pipe(catchError(PayloadService._handleError));
  }

  deletePayload(payloadId: number) {
    return this.http.delete(`${this.API_URL}/${payloadId}`)
      .pipe(catchError(PayloadService._handleError));
  }
}