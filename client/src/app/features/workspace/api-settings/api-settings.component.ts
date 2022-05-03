import { Component, OnInit, ViewChild } from '@angular/core'
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { Group } from './models/group.model';
import { GroupMember } from './models/group-member.model';
import { ApiToken } from './models/api-token.model';
import { GroupService } from './services/group.service';
import { ApiTokenService } from './services/api-token.service';
import { GroupDialogBoxComponent } from './dialog-boxes/group-dialog-box/group-dialog-box.component';
import { MemberDialogBoxComponent } from './dialog-boxes/member-dialog-box/member-dialog-box.component';
import { ApiTokenDialogBoxComponent } from './dialog-boxes/api-token-dialog-box/api-token-dialog-box.component';
import { NotificationService } from '../../../core/notifications/notification.service';
import { TokenService } from '../../../shared/services/token.service';

@Component({ 
    selector: 'api-settings',
    templateUrl: 'api-settings.component.html',
    styleUrls: ['api-settings.component.scss'],
})
export class ApiSettingsComponent implements OnInit {
  token$: Observable<string>;
  token: string;
  username: string;
  currentGroup: number;
  currentGroup2: number;
  currentGroupAdmin: string;
  currentGroupAdmin2: string;
  isLoading: boolean = false;

  // Groups
  groups: Group[];
  groupColumns: string[] = ['id', 'name', 'description', 'admin', 'action']
  groupDataSource: MatTableDataSource<Group> = new MatTableDataSource();
  groupsCount: number = 0;
  updatedGroups: number[] = new Array();

  // Group Members
  members: GroupMember[];
  memberColumns: string[] = ['id', 'username', 'admin', 'action'];
  memberDataSource: MatTableDataSource<GroupMember> = new MatTableDataSource();
  membersCount: number = 0;
  updatedMembers: number[] = new Array();

  // Api Tokens
  apiTokens: ApiToken[];
  apiTokenColumns: string[] = ['id', 'api_key', 'expiration', 'action']
  apiTokenDataSource: MatTableDataSource<ApiToken> = new MatTableDataSource();
  apiTokensCount: number = 0;
  updatedApiTokens: number[] = new Array();
  
  constructor(
    private dialog: MatDialog,
    private groupService: GroupService,
    private apiTokenService: ApiTokenService,
    private readonly notificationService: NotificationService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.username = this.tokenService.username;
    this.getUserGroups();
  }

  getUserGroups() {
    this.groupService
      .getUserGroups(this.username)
      .subscribe({
        next: (v) => {
          this.groups = v,
          this.currentGroup = v.length <= 0 ? 0 : v[0]['id'],
          this.currentGroup2 = v.length <= 0 ? 0 : v[0]['id'],
          this.currentGroupAdmin = v.length <= 0 ? '' : v[0]['admin'],
          this.currentGroupAdmin2 = this.currentGroupAdmin,
          this.getGroupMembers(this.currentGroup),
          this.getApiTokens(this.currentGroup2);
          this.groupDataSource = new MatTableDataSource(v),
          this.groupsCount = v.length
        }, 
        error: (e) => console.log(e)
      });
  }

  getGroupMembers(groupId: number) {
    this.groupService
      .getGroupMembers(groupId)
      .subscribe({
        next: (v) => {
          this.members = v,
          this.memberDataSource = new MatTableDataSource(v),
          this.membersCount = v.length
        },
        error: (e) => console.log(e)
      });
  }

  getApiTokens(groupId: number) {
    this.apiTokenService
      .getApiTokens(groupId)
      .subscribe({
        next: (v) => {
          this.apiTokens = v,
          this.apiTokenDataSource = new MatTableDataSource(v),
          this.apiTokensCount = v.length
        }, 
        error: (e) => console.log(e)
      });
  }

  openUserGroupDialog(action: string, obj: any) {
    obj.action = action;
    obj.admin = this.username;
    const dialogRef = this.dialog.open(GroupDialogBoxComponent, {
      width: '300px',
      data: { id: obj.id, label1: 'Name', label2: 'Description', label3: 'Admin', value1: obj.name, value2: obj.description, value3: obj.admin, action: action },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addGroupRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateGroupRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteGroupRowData(result.data);
      }
    });
  }

  openGroupMemberDialog(action: string, obj: any) {
    obj.action = action;
    obj.group_id = this.currentGroup;
    obj.admin = this.username;
    const dialogRef = this.dialog.open(MemberDialogBoxComponent, {
      width: '300px',
      data: { id: obj.id, label1: 'Group Id', label2: 'Admin', label3: 'Username', value1: obj.group_id, value2: obj.admin, value3: obj.username, action: action },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addGroupMemberRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateGroupMemberRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteGroupMemberRowData(result.data);
      }
    });
  }

  openApiTokenDialog(action: string, obj: any) {
    obj.action = action;
    obj.group_id = this.currentGroup2;

    const dialogRef = this.dialog.open(ApiTokenDialogBoxComponent, {
      width: '315px',
      data: { id: obj.id, label1: 'Group Id', label2: 'Expiration', value1: obj.group_id, value2: obj.expiration, action: action },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addApiTokenRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateApiTokenRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteApiTokenRowData(result.data);
      }
    });
  }

  @ViewChild(MatTable, {static: true}) groupTable: MatTable<Group>;
  addGroupRowData(row_obj: any) {
    this.groupDataSource.data.push({ name: row_obj.value1, description: row_obj.value2, admin: row_obj.value3, created_by: this.username });
    this.groupDataSource.data = [...this.groupDataSource.data];
    this.groupsCount++;
    this.groupTable.renderRows();
  }

  @ViewChild(MatTable, {static: true}) memberTable: MatTable<GroupMember>;
  addGroupMemberRowData(row_obj: any) {
    this.memberDataSource.data.push({ group_id: row_obj.value1, admin: row_obj.value2, username: row_obj.value3, created_by: this.username });
    this.memberDataSource.data = [...this.memberDataSource.data];
    this.membersCount++;
    this.memberTable.renderRows();
  }

  @ViewChild(MatTable, {static: true}) apiTable: MatTable<ApiToken>;
  addApiTokenRowData(row_obj: any) {
    this.apiTokenDataSource.data.push({ group_id: row_obj.value1, expiration: row_obj.value2, api_key: row_obj.value3, created_by: this.username });
    this.apiTokenDataSource.data = [...this.apiTokenDataSource.data];
    this.apiTokensCount++;
    this.apiTable.renderRows();
  }

  updateGroupRowData(row_obj: any) {
    this.groupDataSource.data = this.groupDataSource.data.filter((value, _)=> {
      if (value['id'] == row_obj.id) {
        value['name'] = row_obj.value1;
        value['description'] = row_obj.value2;
        value['admin'] = row_obj.value3;
        value['updated_by'] = this.username;
        this.updatedGroups.push(row_obj.id);
      }
      return true;
    });
  }

  updateGroupMemberRowData(row_obj: any) {
    this.memberDataSource.data = this.memberDataSource.data.filter((value, _)=> {
      if (value['id'] == row_obj.id) {
        value['group_id'] = row_obj.value1;
        value['admin'] = row_obj.value2;
        value['username'] = row_obj.value3;
        value['updated_by'] = this.username;
        this.updatedMembers.push(row_obj.id);
      }
      return true;
    });
  }

  updateApiTokenRowData(row_obj: any) {
    this.apiTokenDataSource.data = this.apiTokenDataSource.data.filter((value, _)=> {
      if (value['id'] == row_obj.id) {
        value['group_id'] = row_obj.value1;
        value['expiration'] = row_obj.value2;
        value['updated_by'] = this.username;
        this.updatedGroups.push(row_obj.id);
      }
      return true;
    });
  }

  deleteGroupRowData(row_obj: any) {
    this.groupDataSource.data = this.groupDataSource.data.filter((value, _) => {
      return value['id'] != row_obj.id;
    });
    this.groupsCount--;
    this.deleteGroup(row_obj.id);
  }

  deleteGroupMemberRowData(row_obj: any) {
    this.memberDataSource.data = this.memberDataSource.data.filter((value, _) => {
      return value['id'] != row_obj.id;
    });
    this.membersCount--;
    this.deleteGroupMember(row_obj.id);
  }

  deleteApiTokenRowData(row_obj: any) {
    this.apiTokenDataSource.data = this.apiTokenDataSource.data.filter((value, _) => {
      return value['id'] != row_obj.id;
    });
    this.apiTokensCount--;
    this.deleteApiToken(row_obj.id);
  }
  
  @ViewChild('groupTable', { read: MatSort, static: true }) sortA: MatSort;
  @ViewChild('memberTable', { read: MatSort, static: true }) sortB: MatSort;
  @ViewChild('apiTable', { read: MatSort, static: true }) sortC: MatSort;
  ngAfterViewChecked () {
    this.groupDataSource.sort = this.sortA;
    this.memberDataSource.sort = this.sortB;
    this.apiTokenDataSource.sort = this.sortC;
  }

  applyGroupFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.groupDataSource.filter = filterValue.trim().toLowerCase();
  }

  findGroupById(value: number) {
    for(let i = 0; i < this.groupDataSource.data.length; i++) {
      if (this.groupDataSource.data[i]['id'] === value) {
        return this.groupDataSource.data[i];
      }
    }
    return null;
  }

  groupFieldChange(value: number) {
    if (value != 0) {
      this.currentGroup = value;
      this.currentGroupAdmin = this.findGroupById(value).admin;
    }
    this.getGroupMembers(this.currentGroup);
  }

  groupFieldChange2(value: number) {
    if (value != 0) {
      this.currentGroup2 = value;
      this.currentGroupAdmin2 = this.findGroupById(value).admin;
    }
    this.getApiTokens(this.currentGroup2);
  }

  saveGroups() {
    for(let i = 0; i < this.groupDataSource.data.length; i++) {
      // delete the action column
      delete this.groupDataSource.data[i]['action'];

      if (this.groupDataSource.data[i]['id'] == null) {
        // if group has no id, create it in the database
        this.saveGroup(this.groupDataSource.data[i]);
      } else if (this.updatedGroups.indexOf(this.groupDataSource.data[i]['id']) > -1) {
        // otherwise, update existing role
        const { name, description, admin, updated_by } = this.groupDataSource.data[i];
        this.updateGroup({ name, description, admin, updated_by }, this.groupDataSource.data[i]['id']);
      }
    }
    this.notificationService.success('Save Successful');
  }

  saveGroupMembers() {
    for(let i = 0; i < this.memberDataSource.data.length; i++) {
      // delete the action column
      delete this.memberDataSource.data[i]['action'];

      if (this.memberDataSource.data[i]['id'] == null) {
        // if role has no id, create it in the database
        this.saveGroupMember(this.memberDataSource.data[i]);
      } else if (this.updatedMembers.indexOf(this.memberDataSource.data[i]['id']) > -1) {
        // otherwise, update existing role
        const { group_id, admin, username, updated_by } = this.memberDataSource.data[i];
        this.updateGroupMember({ group_id, admin, username, updated_by }, this.memberDataSource.data[i]['id']);
      }
    }
    this.notificationService.success('Save Successful');
  }

  saveApiTokens() {
    for(let i = 0; i < this.apiTokenDataSource.data.length; i++) {
      // delete the action column
      delete this.apiTokenDataSource.data[i]['action'];

      if (this.apiTokenDataSource.data[i]['id'] == null) {
        // if role has no id, create it in the database
        this.saveApiToken(this.apiTokenDataSource.data[i]);
      } else if (this.updatedApiTokens.indexOf(this.apiTokenDataSource.data[i]['id']) > -1) {
        // otherwise, update existing role
        const { group_id, expiration, api_key, updated_by } = this.apiTokenDataSource.data[i];
        this.updateApiToken({ group_id, expiration, api_key, updated_by }, this.apiTokenDataSource.data[i]['id']);
      }
    }
    this.notificationService.success('Save Successful');
  }

  saveGroup(group: Group) {
    this.groupService
      .saveGroup(group)
      .subscribe({
        next: (v) => this.getUserGroups(),
        error: (e) => console.log(e)
      });
  }

  saveGroupMember(groupMember: GroupMember) {
    this.groupService
      .saveGroupMember(groupMember)
      .subscribe({
        next: () => this.getGroupMembers(this.currentGroup),
        error: (e) => console.log(e)
      });
  }

  saveApiToken(apiToken: ApiToken) {
    apiToken.api_key = 'placeholder';
    this.apiTokenService
      .saveApiToken(apiToken)
      .subscribe({
        next: () => this.getApiTokens(this.currentGroup2),
        error: (e) => console.log(e)
      });
  }

  updateGroup(group: Group, groupId: number) {
    this.groupService
      .updateGroup(group, groupId)
      .subscribe({
        next: () => this.getUserGroups(),
        error: (e) => console.log(e)
      });
  }

  updateGroupMember(groupMember: GroupMember, groupMemberId: number) {
    this.groupService
      .updateGroupMember(groupMember, groupMemberId)
      .subscribe({
        next: () => this.getGroupMembers(this.currentGroup),
        error: (e) => console.log(e)
      });
  }

  updateApiToken(apiToken: ApiToken, apiTokenId: number) {
    this.apiTokenService
      .updateApiToken(apiToken, apiTokenId)
      .subscribe({
        next: () => this.getApiTokens(this.currentGroup2),
        error: (e) => console.log(e)
      });
  }

  deleteGroup(groupId: number) {
    this.isLoading = true;

    this.groupService
      .deleteGroup(groupId)
      .subscribe({
        next: () => {
          this.notificationService.success('Delete Successful');
          this.deleteFromArray(this.groups, groupId);

          if(this.currentGroup === groupId) {
            this.currentGroup = this.groups.length <= 0 ? 0 : this.groups[0]['id']
            this.groupFieldChange(this.currentGroup);
          };

          if(this.currentGroup2 === groupId) {
            this.currentGroup2 = this.groups.length <= 0 ? 0 : this.groups[0]['id']
            this.groupFieldChange2(this.currentGroup2);
          };

          this.isLoading = false;
        },
        error: (e) => {
          console.log(e),
          this.isLoading = false
        }
      });
  }

  deleteGroupMember(groupMemberId: number) {
    this.groupService
      .deleteGroupMember(groupMemberId)
      .subscribe({
        next: () => this.notificationService.success('Delete Successful'),
        error: (e) => console.log(e),
      });
  }

  deleteApiToken(apiTokenId: number) {
    this.apiTokenService
      .deleteApiToken(apiTokenId)
      .subscribe({
        next: () => this.notificationService.success('Delete Successful'),
        error: (e) => console.log(e),
      });
  }

  deleteFromArray(array: Array<any>, key: number) {
    array.forEach((value, index) => {
      if(value.id === key) array.splice(index, 1);
    });
  }
}