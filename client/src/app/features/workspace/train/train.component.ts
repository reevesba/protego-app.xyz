import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { TokenService } from '../../../shared/services/token.service';
import { ModelService } from '../model/services/model.service';
import { GroupService } from '../api-settings/services/group.service';
import { Model } from '../model/models/model.model';
import { Group } from '../api-settings/models/group.model';
import { TrainModel } from './train.model';
import { CustomValidationService } from '../../../core/auth/custom-validation.service';

@Component({
  selector: 'train',
  templateUrl: 'train.component.html',
  styleUrls: ['train.component.scss']
})
export class TrainComponent implements OnInit {
  username: string;
  trainForm: FormGroup;
  trainModel: TrainModel;
  groups: Group[];
  models: Model[];
  isLoading: boolean = false;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private tokenService: TokenService,
    private groupService: GroupService,
    private modelService: ModelService,
    private cv: CustomValidationService
  ) { }

  ngOnInit() {
    this.trainForm = this.fb.group({
      groupId: ['', [Validators.required]],
      modelId: ['', [Validators.required]],
      trainStart: ['', [Validators.required, this.cv.isInt()]],
      trainEnd: ['', [Validators.required, this.cv.isInt()]],
      purgePayloads: ['', [Validators.required]],
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

  get trainFormControl() {
    return this.trainForm.controls;
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
  get group(): any { return this.trainForm.get('groupId') }
  get model(): any { return this.trainForm.get('modelId'); }
  get start(): any { return this.trainForm.get('trainStart'); }
  get end(): any { return this.trainForm.get('trainEnd'); }
  get purge(): any { return this.trainForm.get('purgePayloads'); }
  get resp(): any { return this.trainForm.get('response'); }

  resetForm() {
    this.start.reset();
    this.end.reset();
    this.purge.reset();
    this.resp.reset();
  }

  clearInput() {
    this.group.reset();
    this.model.reset();
    this.resetForm();
  }

  train() {
    this.submitted = true;
    this.resp.reset();
    this.isLoading = true;
    this.trainModel = new TrainModel(this.trainForm.value);
    this.trainModel.updated_by = this.username;
    
    this.modelService
      .trainModel(this.trainModel)
      .subscribe({
        next: (v) => {
          this.trainForm.controls.response.setValue(v.message)
          this.isLoading = false
        },
        error: (e) => {
          this.trainForm.controls.response.setValue(e.error.message),
          this.isLoading = false
        }
      });
  }
}