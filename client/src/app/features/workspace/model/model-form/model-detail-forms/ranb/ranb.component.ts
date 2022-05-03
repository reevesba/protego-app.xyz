import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormInfoDialogBoxComponent } from '../form-info-dialog-box/form-info-dialog-box.component';
import { ModelService } from '../../../services/model.service';
import { BatchRandomForest } from '../../models/ranb.model';
import { TokenService } from '../../../../../../shared/services/token.service';
import { DropDown } from '../../../../../../shared/interfaces/dropdown.interface';
import { CustomValidationService } from '../../../../../../core/auth/custom-validation.service';

@Component({
  selector: 'ranb',
  templateUrl: 'ranb.component.html',
  styleUrls: ['ranb.component.scss']
})
export class BatchRandomForestComponent implements OnInit {
  groupId: string;
  algorithm: string;
  username: string;
  modelId: number;
  modelForm: FormGroup;
  model: BatchRandomForest = new BatchRandomForest();
  errorMsg: string = null;
  isLoading: boolean = false;

  // dialog
  header: string;
  body: string;

  criterions: DropDown[] = [
    {value: 'gini', viewValue: 'Gini'},
    {value: 'entropy', viewValue: 'Entropy'}
  ];

  maxFeatures: DropDown[] = [
    {value: 'auto', viewValue: 'Square Root'},
    {value: 'sqrt', viewValue: 'Square Root'},
    {value: 'log2', viewValue: 'Log 2'}
  ];

  constructor(
    private router: Router,
    private ar: ActivatedRoute,
    private fb: FormBuilder,
    private modelService: ModelService,
    private tokenService: TokenService,
    private cv: CustomValidationService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.modelForm = this.fb.group({
      name: [this.model.name, [Validators.required]],
      n_estimators: [this.model.n_estimators, [Validators.min(1), this.cv.isInt()]],
      criterion: [this.model.criterion, []],
      max_depth: [this.model.max_depth, [Validators.min(1), this.cv.isInt()]],
      min_samples_split: [this.model.min_samples_split, [Validators.min(1)]],
      min_samples_leaf: [this.model.min_samples_leaf, [Validators.min(1)]],
      min_weight_fraction_leaf: [this.model.min_weight_fraction_leaf, [Validators.min(0)]],
      max_features: [this.model.max_features, [this.cv.maxFeaturesValid()]],
      max_leaf_nodes: [this.model.max_leaf_nodes, [Validators.min(1), this.cv.isInt()]],
      min_impurity_decrease: [this.model.min_impurity_decrease, [Validators.min(0)]],
      bootstrap: [this.model.bootstrap, []],
      oob_score: [this.model.oob_score, []],
      n_jobs: [this.model.n_jobs, [Validators.min(1), this.cv.isInt()]],
      random_state: [this.model.random_state, [Validators.min(1), this.cv.isInt()]],
      verbose: [this.model.verbose, [Validators.min(0), this.cv.isInt()]],
      warm_start: [this.model.warm_start, []],
      class_weight: [this.model.class_weight, [this.cv.classWeightValid()]],
      ccp_alpha: [this.model.ccp_alpha, [Validators.min(0)]],
      max_samples: [this.model.max_samples, [Validators.min(0)]]
    });

    this.username = this.tokenService.username;

    this.ar.params.subscribe(params => {
      this.groupId = params['groupId'];
    });

    this.algorithm = this.router.url.split("/")[2];
  }

  get modelFormControl() {
    return this.modelForm.controls;
  }

  openDialog( ) {
    const dialogRef = this.dialog.open(FormInfoDialogBoxComponent, {
      width: '300px',
      data: { header: this.header, body: this.body }
    });
  }

  classWeightDialog() {
    this.header = 'Class Weight Examples';
    this.body = '<ul><li>balanced</li><li>balanced_subsample</li><li>{ "0": "1.0", "1": "0.01" }</li></ul>';
    this.openDialog();
  }

  get bootstrap(): any { return this.modelForm.get('bootstrap') }
  get oobScore(): any { return this.modelForm.get('oob_score') }
  get maxSamples(): any { return this.modelForm.get('max_samples') }

  resetVals() {
    this.oobScore.reset();
    this.maxSamples.reset();
  }

  saveModel() {
    this.model = new BatchRandomForest(this.modelForm.value);
    this.model.group_id = +this.groupId;
    this.model.algorithm = this.algorithm;
    this.model.created_by = this.username;
    this.isLoading = true;

    if (this.modelForm.valid) {
      this.modelService
        .saveModel(this.model)
        .subscribe({
          next: () => {
            this.errorMsg = null,
            this.router.navigate(['model'], { relativeTo: this.ar.parent })
          },
          error: (e) => this.errorMsg = e.error.message
        });
    }
    this.isLoading = false;
  }
}