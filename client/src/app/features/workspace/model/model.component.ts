import { Component, OnInit, ViewChild } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { Group } from '../api-settings/models/group.model';
import { Model } from './models/model.model';
import { GroupService } from '../api-settings/services/group.service';
import { ModelService } from './services/model.service';
import { FormInfoDialogBoxComponent } from './model-form/model-detail-forms/form-info-dialog-box/form-info-dialog-box.component';
import { NotificationService } from '../../../core/notifications/notification.service';
import { TokenService } from '../../../shared/services/token.service';

@Component({ 
    selector: 'model',
    templateUrl: 'model.component.html',
    styleUrls: ['model.component.scss'],
})
export class ModelComponent implements OnInit {
  token$: Observable<string>;
  token: string;
  username: string;
  currentGroup: number;
  currentGroupName: string;
  currentGroupAdmin: string;

  // Groups
  groups: Group[];

  // Models
  models: Model[];
  modelColumns: string[] = ['id', 'algorithm', 'name', 'created_by', 'action'];
  modelDataSource: MatTableDataSource<Model> = new MatTableDataSource();
  modelsCount: number = 0;

  // Stuff for dialog info
  header: string;
  body: string;
  modelName: string;

  constructor(
    private dialog: MatDialog,
    private groupService: GroupService,
    private modelService: ModelService,
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
          this.currentGroupAdmin = v.length <= 0 ? '' : v[0]['admin'],
          this.currentGroupName = v.length <= 0 ? '' : v[0]['name'],
          this.getGroupModels(this.currentGroup)
        }, 
        error: (e) => console.log(e)
      });
  }

  getGroupModels(groupId: number) {
    this.modelService
      .getGroupModels(groupId)
      .subscribe({
        next: (v) => {
          this.models = v,
          this.modelDataSource = new MatTableDataSource(v),
          this.modelsCount = v.length
        },
        error: (e) => console.log(e)
      });
  }

  htmlify(obj: any) {
    var result: string = '<p>';
    Object.keys(obj).forEach(key => {
      result = result.concat(`<strong>${key}</strong>: ${obj[key]}</br>`);
    })
    return result.concat('</p>');
  }

  getParameters(obj: any) {
    this.modelService
      .getParameters(obj.id)
      .subscribe({
        next: (v) => {
          this.header = 'Parameters: ',
          this.body = this.htmlify(v),
          this.modelName = obj.name;
          this.openModelDialog(null, obj)
        },
        error: (e) => console.log(e)
      });
  }

  openDeleteDialog(obj: Model) {
    this.header = 'Delete: ';
    this.modelName = obj.name;
    this.openModelDialog('Delete', obj)
  }

  groupFieldChange(groupId: number) {
    const group = this.findGroupById(groupId);

    this.currentGroup = group['id'];
    this.currentGroupAdmin = group['admin'];
    this.currentGroupName = group['name'];
    this.getGroupModels(this.currentGroup);
  }

  openModelDialog(action: string, obj: any) {
    const dialogRef = this.dialog.open(FormInfoDialogBoxComponent, {
      width: '350px',
      data: { id: obj.id, header: this.header, body: this.body, name: this.modelName, action: action },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Delete') {
          this.deleteModelRowData(result.data);
      }
    });
  }

  deleteModelRowData(row_obj: any) {
    this.modelDataSource.data = this.modelDataSource.data.filter((value, _) => {
      return value['id'] != row_obj.id;
    });
    this.modelsCount--;
    this.deleteModel(row_obj.id);
  }
  
  @ViewChild('modelTable', { read: MatSort, static: true }) sortA: MatSort;
  ngAfterViewChecked () {
    this.modelDataSource.sort = this.sortA;
  }

  findGroupById(groupId: number) {
    for(let i = 0; i < this.groups.length; i++) {
      if (this.groups[i]['id'] === groupId) {
        return this.groups[i];
      }
    }
    return null;
  }

  deleteModel(modelId: number) {
    this.modelService
      .deleteModel(modelId)
      .subscribe({
        next: () => {
          this.notificationService.success('Delete Successful');
          this.deleteFromArray(this.models, modelId);
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