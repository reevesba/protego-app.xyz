import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as env } from '../../../../environments/environment';
import { Role } from './role.model';

@Injectable()
export class RolesService {
  private API_URL = env.apiUrl + '/roles';

  constructor(private http: HttpClient) { }

  private static _handleError(err: HttpErrorResponse | any) {
    return throwError(() => err.message || 'Error: Unable to complete request.');
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.API_URL}`)
      .pipe(catchError(RolesService._handleError));
  }

  saveRole(role: Role): Observable<any> {
    return this.http.post(`${this.API_URL}`, role)
      .pipe(catchError(RolesService._handleError));
  }

  updateRole(role: Role, roleId: number): Observable<any> {
    return this.http.put(`${this.API_URL}/${roleId}`, role)
      .pipe(catchError(RolesService._handleError));
  }

  deleteRole(roleId: number) {
    return this.http.delete(`${this.API_URL}/${roleId}`)
      .pipe(catchError(RolesService._handleError));
  }
}