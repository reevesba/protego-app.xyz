import { Component, Inject, Optional, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Data {
  id: number;
  label1: string;
  label2: string;
  label3: string;
  value1: any;
  value2: any;
  value3: any;
}

@Component({
  selector: 'member-dialog-box',
  templateUrl: 'member-dialog-box.component.html',
  styleUrls: ['member-dialog-box.component.css']
})
export class MemberDialogBoxComponent implements OnInit {
  fg: FormGroup;
  submitted: boolean = false;

  label1: string;
  label2: string;
  label3: string;
  action: string;
  localData: any;

  constructor(
    public dialogRef: MatDialogRef<MemberDialogBoxComponent>,
    private fb: FormBuilder,

    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Data
    ) {
        this.localData = {...data};
        this.label1 = this.localData.label1;
        this.label2 = this.localData.label2;
        this.label3 = this.localData.label3;
        this.action = this.localData.action;
    }

  ngOnInit() {
    this.fg = this.fb.group({
      value1: ['', [Validators.required]],
      value2: ['', [Validators.required]],
      value3: ['', [Validators.required]]
    });

    this.fg.patchValue({
      value1: this.localData.value1,
      value2: this.localData.value2,
      value3: this.localData.value3
   });

   this.fg.controls['value1'].disable();
   this.fg.controls['value2'].disable();
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

  updateField3(event: any) {
    this.localData.value3 = event.target.value;
  }

  doAction() {
    if (this.fg.valid) {
      this.dialogRef.close({ event: this.action, data: this.localData });
    }
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}