import { Component, HostListener, OnInit, ViewChild } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Group } from '../api-settings/models/group.model';
import { Payload } from '../models/payload.model';
import { GroupService } from '../api-settings/services/group.service';
import { PayloadService } from '../services/payload.service';
import { DialogBoxComponent } from '../../../shared/dialog-box/dialog-box.component';
import { BulkDialogBoxComponent } from './bulk-dialog-box/bulk-dialog-box.component';
import { NotificationService } from '../../../core/notifications/notification.service';
import { TokenService } from '../../../shared/services/token.service';

@Component({ 
    selector: 'labels',
    templateUrl: 'labels.component.html',
    styleUrls: ['labels.component.scss'],
})
export class LabelComponent implements OnInit {
  token$: Observable<string>;
  token: string;
  username: string;
  currentGroup: number;
  currentGroupName: string;
  currentGroupAdmin: string;

  // Groups
  groups: Group[];

  // Payloads
  payloads: Payload[];
  payloadColumns: string[];
  payloadDataSource: MatTableDataSource<Payload> = new MatTableDataSource();
  selection = new SelectionModel<Payload>(true, []);
  updatedPayloads: number[] = new Array();

  // Stuff for dialog info
  header: string;
  body: string;

  // Paginator
  isLoading: boolean = false;
  totalRows: number = 0;
  pageIndex: number = 0;
  pageSizeOptions: number[] = [5, 10, 100, 1000];
  pageSize: number = this.pageSizeOptions[0];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private groupService: GroupService,
    private payloadService: PayloadService,
    private readonly notificationService: NotificationService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.username = this.tokenService.username;
    this.getDisplayColumns(window.innerWidth);
    this.getUserGroups();
  }

  getDisplayColumns(innerWidth: number) {
    if (innerWidth >= 750) {
      this.payloadColumns = ['select', 'id', 'payload', 'classification', 'created_by', 'updated_by', 'action'];
    } else {
      this.payloadColumns = ['select', 'id', 'payload', 'classification', 'action'];
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.getDisplayColumns(window.innerWidth);
  }

  getUserGroups() {
    this.groupService
      .getUserGroups(this.username)
      .subscribe({
        next: (v) => {
          this.groups = v,
          this.currentGroup = v.length <= 0 ? 0 : v[0]['id'],
          this.currentGroupAdmin = v.length <= 0 ? '' : v[0]['admin'],
          this.currentGroupName = v.length <= 0 ? '' : v[0]['name']
          this.getGroupPayloads(this.currentGroup)
        }, 
        error: (e) => console.log(e)
      });
  }

  getGroupPayloads(groupId: number) {
    this.isLoading = true;
    this.payloadService
      .getGroupPayloads(groupId, this.pageSize, this.pageIndex)
      .subscribe({
        next: (v) => {
          this.totalRows = +v.pop(),
          this.payloads = v,
          this.payloadDataSource = new MatTableDataSource(v),
          this.paginator.pageIndex = this.pageIndex,
          this.paginator.pageSize = this.pageSize,
          this.paginator.length = this.totalRows,
          this.isLoading = false
        },
        error: (e) => console.log(e)
      });
  }

  loadPayloads() {
    this.isLoading = true
    this.payloadService
      .loadPayloads(this.currentGroup)
      .subscribe({
        next: () => {
          this.getGroupPayloads(this.currentGroup),
          this.isLoading = false
        },
        error: (e) => console.log(e)
      });
  }

  pageChanged(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getGroupPayloads(this.currentGroup)
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.payloadDataSource.data.length;
    return numSelected === numRows;
  }

  isAnySelected() {
    const numSelected = this.selection.selected.length;
    return numSelected > 0;
  }

  masterToggle() {
    this.isAllSelected() || this.isAnySelected() ?
    this.selection.clear() :
    this.payloadDataSource.data.forEach(row => this.selection.select(row));
  }

  openDeleteDialog(obj: Payload) {
    this.header = 'Delete: ';
    this.openPayloadDialog('Delete', obj);
  }

  groupFieldChange(groupId: number) {
    const group = this.findGroupById(groupId);

    this.currentGroup = group['id'];
    this.currentGroupAdmin = group['admin'];
    this.currentGroupName = group['name'];
    this.selection.selected.length = 0;
    this.selection.clear();
    this.getGroupPayloads(this.currentGroup);
  }

  openPayloadDialog(action: string, obj: any) {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '350px',
      data: { id: obj.id, label1: 'Payload', label2: 'Classification', value1: obj.payload, value2: obj.classification, action: action },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Delete') {
          this.deletePayloadRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      }
    });
  }

  openBulkActionDialog(action: string) {
    const dialogRef = this.dialog.open(BulkDialogBoxComponent, {
      width: '350px',
      data: { label1: 'Classification', value1: '', action: action },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Delete') {
        this.selection.selected.forEach((value, _) => {
          this.deletePayloadRowData(value);
        });
        this.selection.clear();
      } else if (result.event == 'Update') {
        this.selection.selected.forEach((payload, _) => {
          payload.classification = result.data.value1;
          this.bulkUpdateRowData(payload);
        });
        this.selection.clear();
      }
    });
  }

  deletePayloadRowData(row_obj: any) {
    this.payloadDataSource.data = this.payloadDataSource.data.filter((value, _) => {
      return value['id'] != row_obj.id;
    });
    this.totalRows--;
    this.deletePayload(row_obj.id);
  }

  bulkUpdateRowData(payload: Payload) {
    this.updatePayload(
      { "payload": payload.payload, "classification": payload.classification, "updated_by": this.username }, payload['id']
    );
  }

  updateRowData(row_obj: any) {
    this.payloadDataSource.data = this.payloadDataSource.data.filter((value, _)=> {
      if (value['id'] == row_obj.id) {
        value['payload'] = row_obj.value1;
        value['classification'] = row_obj.value2;
        value['updated_by'] = this.username;

        this.updatePayload(
          { "payload": row_obj.value1, "classification": row_obj.value2, "updated_by": this.username }, row_obj.id
        );
      }
      return true;
    });
  }
  
  @ViewChild('payloadTable', { read: MatSort, static: true }) sortA: MatSort;
  ngAfterViewChecked () {
    this.payloadDataSource.sort = this.sortA;
  }

  findGroupById(groupId: number) {
    for(let i = 0; i < this.groups.length; i++) {
      if (this.groups[i]['id'] === groupId) {
        return this.groups[i];
      }
    }
    return null;
  }

  updatePayload(payload: any, payloadId: number) {
    this.payloadService
      .updatePayload(payload, payloadId)
      .subscribe({
        next: () => this.getGroupPayloads(this.currentGroup),
        error: (e) => console.log(e)
      });
  }

  deletePayload(payloadId: number) {
    this.payloadService
      .deletePayload(payloadId)
      .subscribe({
        next: () => {
          this.deleteFromArray(this.payloads, payloadId),
          this.getGroupPayloads(this.currentGroup)
        },
        error: (e) => console.log(e)
      });
  }

  deleteFromArray(array: Array<any>, key: number) {
    array.forEach((value, index) => {
      if(value.id === key) array.splice(index, 1);
    });
  }
}