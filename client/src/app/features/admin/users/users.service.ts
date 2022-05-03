
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as env } from '../../../../environments/environment';
import { User } from './user.model';
import { UserRole } from './user-role.model';

@Injectable()
export class UsersService {
  private API_URL = env.apiUrl + '/users';

  constructor(private http: HttpClient) { }

  private static _handleError(err: HttpErrorResponse | any) {
    return throwError(() => err.message || 'Error: Unable to complete request.');
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}`)
      .pipe(catchError(UsersService._handleError));
  }

  getUser(username: string): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/${username}`)
      .pipe(catchError(UsersService._handleError));
  }

  getUsername(emailToken: string): Observable<string> {
    return this.http.get<string>(`${this.API_URL}/email/${emailToken}`)
      .pipe(catchError(UsersService._handleError));
  }

  getUserPhoto(username: string): Observable<any> {
    return this.http.get(`${this.API_URL}/photo/${username}`, { responseType: 'text' })
      .pipe(catchError(UsersService._handleError));
  }

  getUsersRoles(): Observable<UserRole[]> {
    return this.http.get<UserRole[]>(`${this.API_URL}/roles`)
      .pipe(catchError(UsersService._handleError));
  }

  saveUserRole(userRole: UserRole): Observable<any> {
    return this.http.post(`${this.API_URL}/roles`, userRole)
      .pipe(catchError(UsersService._handleError));
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.API_URL}`, user)
      .pipe(catchError(UsersService._handleError));
  }

  updateUserPhoto(username: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.API_URL}/photo/${username}`, formData)
      .pipe(catchError(UsersService._handleError));
  }

  deleteUser(userId: number) {
    return this.http.delete(`${this.API_URL}/${userId}`)
      .pipe(catchError(UsersService._handleError));
  }
}