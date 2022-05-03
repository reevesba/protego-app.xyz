import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as env } from '../../../../../environments/environment';
import { Group } from '../models/group.model';
import { GroupMember } from '../models/group-member.model';

@Injectable()
export class GroupService {
  private API_URL = env.apiUrl + '/groups';

  constructor(private http: HttpClient) { }

  private static _handleError(err: HttpErrorResponse | any) {
    return throwError(() => err.message || 'Error: Unable to complete request.');
  }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.API_URL}`)
      .pipe(catchError(GroupService._handleError));
  }

  getUserGroups(username: string): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.API_URL}/user-groups/${username}`)
      .pipe(catchError(GroupService._handleError))
  }

  getGroupMembers(groupId: number): Observable<GroupMember[]> {
    return this.http.get<GroupMember[]>(`${this.API_URL}/group-members/${groupId}`)
      .pipe(catchError(GroupService._handleError))
  }

  saveGroup(group: Group): Observable<any> {
    return this.http.post(`${this.API_URL}`, group)
      .pipe(catchError(GroupService._handleError));
  }

  saveGroupMember(groupMember: GroupMember): Observable<any> {
    return this.http.post(`${this.API_URL}/group-members`, groupMember)
      .pipe(catchError(GroupService._handleError))
  }

  updateGroup(group: Group, groupId: number): Observable<any> {
    return this.http.put(`${this.API_URL}/${groupId}`, group)
      .pipe(catchError(GroupService._handleError));
  }

  updateGroupMember(groupMember: GroupMember, groupMemberId: number): Observable<any> {
    return this.http.put(`${this.API_URL}/group-members/${groupMemberId}`, groupMember)
      .pipe(catchError(GroupService._handleError));
  }

  deleteGroup(groupId: number) {
    return this.http.delete(`${this.API_URL}/${groupId}`)
      .pipe(catchError(GroupService._handleError));
  }

  deleteGroupMember(memberId: number) {
    return this.http.delete(`${this.API_URL}/group-members/${memberId}`)
      .pipe(catchError(GroupService._handleError));
  }
}