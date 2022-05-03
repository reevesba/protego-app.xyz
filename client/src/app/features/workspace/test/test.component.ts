import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { TokenService } from '../../../shared/services/token.service';
import { ModelService } from '../model/services/model.service';
import { GroupService } from '../api-settings/services/group.service';
import { Model } from '../model/models/model.model';
import { Group } from '../api-settings/models/group.model';
import { TestModel } from './test.model';
import { CustomValidationService } from '../../../core/auth/custom-validation.service';

@Component({
  selector: 'test',
  templateUrl: 'test.component.html',
  styleUrls: ['test.component.scss']
})
export class TestComponent implements OnInit {
  username: string;
  testForm: FormGroup;
  testModel: TestModel;
  groups: Group[];
  models: Model[];
  isLoading: boolean = false;
  selection: number = null;

  constructor(
    private fb: FormBuilder,
    private tokenService: TokenService,
    private groupService: GroupService,
    private modelService: ModelService,
    private cv: CustomValidationService
  ) { }

  ngOnInit() {
    this.testForm = this.fb.group({
      groupId: ['', [Validators.required]],
      modelId: ['', [Validators.required]],
      sampleMode: ['', [Validators.required]],
      sample: ['', []],
      testStart: ['', [this.cv.isInt()]],
      testEnd: ['', [this.cv.isInt()]],
      response: [{value: '', disabled: true}, []]
    });

    this.username = this.tokenService.username;
    this.getUserGroups();
  }

  getUserGroups() {
    this.groupService
      .getUserGroups(this.username)
      .subscribe({
        next: (v) => this.groups = v, 
        error: (e) => console.log(e)
      });
  }

  get testFormControl() {
    return this.testForm.controls;
  }

  setModels(event: any) {
    this.model.reset();
    this.resetForm();

    this.modelService
      .getGroupModels(event.source.value)
      .subscribe({
        next: (v) => this.models = v,
        error: (e) => console.log(e)
      });
  }

  // Used for resets
  get group(): any { return this.testForm.get('groupId') }
  get model(): any { return this.testForm.get('modelId'); }
  get mode(): any { return this.testForm.get('sampleMode'); }
  get sample(): any { return this.testForm.get('sample'); }
  get start(): any { return this.testForm.get('testStart'); }
  get end(): any { return this.testForm.get('testEnd'); }
  get resp(): any { return this.testForm.get('response'); }

  resetForm() {
    this.mode.reset();
    this.sample.reset();
    this.start.reset();
    this.end.reset();
    this.resp.reset();
    this.selection = null;
  }

  clearInput() {
    this.group.reset();
    this.model.reset();
    this.resetForm();
  }

  updateSelection(event: any) {
    this.selection = event.source.value;

    if (this.selection === 0) {
      this.start.reset();
      this.end.reset();
      this.testForm.controls['testStart'].clearValidators();
      this.testForm.controls['testEnd'].clearValidators();
      this.testForm.controls['sample'].setValidators([Validators.required]);
    }

    if (this.selection === 1) {
      this.sample.reset();
      this.testForm.controls['sample'].clearValidators();
      this.testForm.controls['testStart'].setValidators([Validators.required, this.cv.isInt()]);
      this.testForm.controls['testEnd'].setValidators([Validators.required, this.cv.isInt()]);
      this.testForm.controls['testEnd']
    }
    this.testForm.controls['sample'].updateValueAndValidity();
    this.testForm.controls['testStart'].updateValueAndValidity();
    this.testForm.controls['testEnd'].updateValueAndValidity();
  }

  test() {
    this.resp.reset();
    this.isLoading = true;
    this.testModel = new TestModel(this.testForm.value);
    
    this.modelService
      .testModel(this.testModel)
      .subscribe({
        next: (v) => {
          this.isLoading = false,
          this.testForm.controls.response.setValue(v.message)
        },
        error: (e) => {
          this.testForm.controls.response.setValue(e.error.message),
          this.isLoading = false
        }
      });
  }
}