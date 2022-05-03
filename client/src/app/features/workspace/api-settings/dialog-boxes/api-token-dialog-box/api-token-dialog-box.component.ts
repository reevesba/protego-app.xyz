import { Component, Inject, Optional, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Data {
  id: number;
  label1: string;
  label2: string;
  value1: any;
  value2: any;
}

@Component({
  selector: 'api-token-dialog-box',
  templateUrl: 'api-token-dialog-box.component.html',
  styleUrls: ['api-token-dialog-box.component.css']
})
export class ApiTokenDialogBoxComponent implements OnInit {
  fg: FormGroup;
  submitted: boolean = false;

  label1: string;
  label2: string;
  action: string;
  localData: any;

  constructor(
    public dialogRef: MatDialogRef<ApiTokenDialogBoxComponent>,
    private fb: FormBuilder,

    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Data
    ) {
        this.localData = {...data};
        this.label1 = this.localData.label1;
        this.label2 = this.localData.label2;
        this.action = this.localData.action;
    }

  ngOnInit() {
    this.fg = this.fb.group({
      value1: ['', [Validators.required]],
      value2: ['', [Validators.required]]
    });

    this.fg.patchValue({
      value1: this.localData.value1
   });

   this.fg.controls['value1'].disable();
  }

  get formControl() {
    return this.fg.controls;
  }

  updateField1(event: any) {
    this.localData.value1 = event.target.value;
  }

  updateField2(event: any) {
    this.localData.value2 = event.target.value;
  }

  doAction() {
    if (this.fg.valid || this.action == 'Delete') {
      this.dialogRef.close({ event: this.action, data: this.localData });
    }
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}