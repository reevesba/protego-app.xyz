import { Component, Inject, Optional, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Data {
  id: number,
  header: string,
  body: string,
  name: string,
  action: string
};

@Component({
  selector: 'form-info-dialog-box',
  templateUrl: 'form-info-dialog-box.component.html',
  styleUrls: ['form-info-dialog-box.component.css']
})
export class FormInfoDialogBoxComponent {
  localData: Data;
  id: number;
  header: string;
  body: string;
  name: string;
  action: string;

  constructor(
    public dialogRef: MatDialogRef<FormInfoDialogBoxComponent>,

    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Data
  ) {
        this.localData = {...data};
        this.id = this.localData.id;
        this.header = this.localData.header;
        this.body = this.localData.body;
        this.name = this.localData.name;
        this.action = this.localData.action;
    }

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.localData });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}