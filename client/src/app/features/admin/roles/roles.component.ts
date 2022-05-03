 import { Component, OnInit, ViewChild } from '@angular/core'
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { Role } from './role.model';
import { RolesService } from './roles.service';
import { DialogBoxComponent } from '../../../shared/dialog-box/dialog-box.component';
import { NotificationService } from '../../../core/notifications/notification.service';
import { TokenService } from '../../../shared/services/token.service';

@Component({ 
    selector: 'roles',
    templateUrl: 'roles.component.html',
    styleUrls: ['roles.component.scss'],
})
export class RolesComponent implements OnInit {
  token$: Observable<string>;
  token: string;
  username: string;

  roles: Role[];
  roleColumns: string[] = ['name', 'description', 'updated_by', 'action']
  dataSource: MatTableDataSource<Role> = new MatTableDataSource();
  rolesCount: number;
  updatedRoles: number[] = new Array();
  
  constructor(
    private dialog: MatDialog,
    private rolesService: RolesService,
    private readonly notificationService: NotificationService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.username = this.tokenService.username;
    this.getRoles();
  }

  getRoles() {
    this.rolesService
      .getRoles()
      .subscribe({
        next: (v) => {
          this.roles = v,
          this.dataSource = new MatTableDataSource(v),
          this.rolesCount = v.length
        }, 
        error: (e) => console.log(e)
      });
  }

  openDialog(action: string, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '300px',
      data: { id: obj.id, label1: 'Name', label2: 'Description', value1: obj.name, value2: obj.description, action: action },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  @ViewChild(MatTable, {static: true}) table: MatTable<Role>;
  addRowData(row_obj: any) {
    this.dataSource.data.push({ name: row_obj.value1, description: row_obj.value2, created_by: this.username });
    this.dataSource.data = [...this.dataSource.data];
    this.rolesCount++;
    this.table.renderRows();
  }

  updateRowData(row_obj: any) {
    this.dataSource.data = this.dataSource.data.filter((value, _)=> {
      if (value['id'] == row_obj.id) {
        value['name'] = row_obj.value1;
        value['description'] = row_obj.value2;
        value['updated_by'] = this.username;
        this.updatedRoles.push(row_obj.id);
      }
      return true;
    });
  }

  deleteRowData(row_obj: any) {
    this.dataSource.data = this.dataSource.data.filter((value, _) => {
      return value['id'] != row_obj.id;
    });
    this.rolesCount--;
    this.deleteRole(row_obj.id);
  }
  
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewChecked () {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  saveRoles() {
    for(let i = 0; i < this.dataSource.data.length; i++) {
      // delete the action column
      delete this.dataSource.data[i]['action'];

      if (this.dataSource.data[i]['id'] == null) {
        // if role has no id, create it in the database
        this.saveRole(this.dataSource.data[i]);
      } else if (this.updatedRoles.indexOf(this.dataSource.data[i]['id']) > -1) {
        // otherwise, update existing role
        const { name, description, updated_by } = this.dataSource.data[i];
        this.updateRole({ name, description, updated_by }, this.dataSource.data[i]['id']);
      }
    }
    this.notificationService.success('Save Successful');
  }

  saveRole(role: Role) {
    this.rolesService
      .saveRole(role)
      .subscribe({
        next: () => this.getRoles(),
        error: (e) => console.log(e)
      });
  }

  updateRole(role: Role, roleId: number) {
    this.rolesService
      .updateRole(role, roleId)
      .subscribe({
        next: () => this.getRoles(),
        error: (e) => console.log(e)
      });
  }

 deleteRole(roleId: number) {
  this.rolesService
    .deleteRole(roleId)
    .subscribe({
      next: () => this.notificationService.success('Delete Successful'),
      error: (e) => console.log(e),
    });
}
}