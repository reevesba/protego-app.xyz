import { Component, Inject, Optional, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DropDown } from '../../../../shared/interfaces/dropdown.interface';

export interface Data {
  id: number;
  label1: string;
  value1: any;
}

@Component({
  selector: 'bulk-dialog-box',
  templateUrl: 'bulk-dialog-box.component.html',
  styleUrls: ['bulk-dialog-box.component.css']
})
export class BulkDialogBoxComponent implements OnInit {
  fg: FormGroup;
  submitted: boolean = false;

  label1: string;
  action: string;
  localData: any;

  classes: DropDown[] = [
    { value: "0", viewValue: "0 (benign)"},
    { value: "1", viewValue: "1 (malicious)"}
  ]

  constructor(
    public dialogRef: MatDialogRef<BulkDialogBoxComponent>,
    private fb: FormBuilder,

    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Data
    ) {
        this.localData = {...data};
        this.label1 = this.localData.label1;
        this.action = this.localData.action;
    }

  ngOnInit() {
    this.fg = this.fb.group({
      value1: ['', [Validators.required]]
    });
  }

  get formControl() {
    return this.fg.controls;
  }

  updateField1(event: any) {
    this.localData.value1 = event.source.value;
  }

  doAction() {
    if (this.fg.valid || this.action === 'Delete') {
      this.dialogRef.close({ event: this.action, data: this.localData });
    }
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}