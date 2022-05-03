
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '../../../core/notifications/notification.service';
import { TokenService } from '../../../shared/services/token.service';
import { User } from './user.model';
import { Role } from '../roles/role.model';
import { UsersService } from './users.service';
import { RolesService } from '../roles/roles.service';
import { UserRole } from './user-role.model';

@Component({ 
    selector: 'users',
    templateUrl: 'users.component.html',
    styleUrls: ['users.component.scss'],
})
export class UsersComponent implements OnInit {
    users: User[];
    usersRoles: UserRole[];
    userColumns: string[];
    dataSource: MatTableDataSource<UserRole> = new MatTableDataSource();
    usersCount: number;
    username: string;
    roles: Role[];

    constructor(
      private usersService: UsersService,
      private rolesService: RolesService,
      private readonly notificationService: NotificationService,
      private tokenService: TokenService
    ) {}
  
    ngOnInit() {
      this.username = this.tokenService.username;
      this.getDisplayColumns(window.innerWidth);
      this.getUsersRoles();
      this.getRoles();
    }

    getDisplayColumns(innerWidth: number) {
      if (innerWidth < 750) {
        this.userColumns = ['username', 'email', 'role'];
      } else {
        this.userColumns = ['username', 'first_name', 'last_name', 'email', 'role'];
      }
    }
  
    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      this.getDisplayColumns(window.innerWidth);
    }

    getUsersRoles() {
      this.usersService
        .getUsersRoles()
        .subscribe({
          next: (v) => {
            this.usersRoles = v,
            this.dataSource = new MatTableDataSource(v),
            this.usersCount = v.length
          },
          error: (e) => console.log(e)
        });
    }

    getRoles() {
      this.rolesService
          .getRoles()
          .subscribe({
            next: (v) => this.roles = v,
            error: (e) => console.log(e)
          });
    }
    
    @ViewChild(MatSort) sort: MatSort;
    ngAfterViewChecked () {
      this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    updateUserRole(event: any, element: UserRole) {
      const elementIndex = this.dataSource.filteredData.indexOf(element);
      element.role_id = event.value;
      element.updated_by = this.username;
      this.dataSource[elementIndex] = element;
    }

    saveUsersRole()  {
      for(let i = 0; i < this.dataSource.data.length; i++) {
          const { user_id, role_id, updated_by } = this.dataSource.data[i];
          this.saveUserRole({ user_id, role_id, updated_by });
      }
      this.notificationService.success('Save Successful');
    }

    saveUserRole(userRole: UserRole) {
      this.usersService
        .saveUserRole(userRole)
        .subscribe(
          (error: any) => console.log(error)
        );
    }
  
    delete(userId: number) {
      this.usersService
        .deleteUser(userId)
        .subscribe({
          next: () => this.notificationService.success('Delete Successful'), 
          error: (e) => console.log(e)
        });
    }
  }