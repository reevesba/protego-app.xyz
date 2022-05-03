import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormInfoDialogBoxComponent } from '../form-info-dialog-box/form-info-dialog-box.component';
import { ModelService } from '../../../services/model.service';
import { BatchPerceptron } from '../../models/perb.model';
import { TokenService } from '../../../../../../shared/services/token.service';
import { DropDown } from '../../../../../../shared/interfaces/dropdown.interface';
import { CustomValidationService } from '../../../../../../core/auth/custom-validation.service';

@Component({
  selector: 'perb',
  templateUrl: 'perb.component.html',
  styleUrls: ['perb.component.scss']
})
export class BatchPerceptronComponent implements OnInit {
  groupId: string;
  algorithm: string;
  username: string;
  modelId: number;
  modelForm: FormGroup;
  model: BatchPerceptron = new BatchPerceptron();
  errorMsg: string = null;
  isLoading: boolean = false;
  header: string;
  body: string;

  penalties: DropDown[] = [
    {value: 'l2', viewValue: 'L2'}, 
    {value: 'l1', viewValue: 'L1'},
    {value: 'elasticnet', viewValue: 'Elastic Net'},
  ]

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
      penalty: [this.model.penalty, []],
      alpha: [this.model.alpha, [Validators.min(0)]],
      l1_ratio: [this.model.l1_ratio, [Validators.min(0), Validators.max(1)]],
      fit_intercept: [this.model.fit_intercept, []],
      max_iter: [this.model.max_iter, [Validators.min(100), this.cv.isInt()]],
      tol: [this.model.tol, [Validators.min(0)]],
      shuffle: [this.model.shuffle, []],
      verbose: [this.model.verbose, [Validators.min(0), this.cv.isInt()]],
      eta0: [this.model.eta0, [Validators.min(0)]],
      n_jobs: [this.model.n_jobs, [Validators.min(1), this.cv.isInt()]],
      random_state: [this.model.random_state, [Validators.min(0), this.cv.isInt()]],
      early_stopping: [this.model.early_stopping, []],
      validation_fraction: [this.model.validation_fraction, [Validators.min(0), Validators.max(1)]],
      n_iter_no_change: [this.model.n_iter_no_change, [Validators.min(0), this.cv.isInt()]],
      class_weight: [this.model.class_weight, [this.cv.classWeightValid()]],
      warm_start: [this.model.warm_start, []]
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
    this.body = '<ul><li>balanced</li><li>{ "0": "1.0", "1": "0.01" }</li></ul>';
    this.openDialog();
  }

  get l1Ratio(): any { return this.modelForm.get('l1_ratio') };
  get penalty(): any { return this.modelForm.get('penalty') };
  get earlyStopping(): any { return this.modelForm.get('early_stopping') };
  get valFrac(): any { return this.modelForm.get('validation_fraction') };

  resetL1Ratio() {
    this.l1Ratio.reset();
  }

  resetValFrac() {
    this.valFrac.reset();
  }

  saveModel() {
    this.model = new BatchPerceptron(this.modelForm.value);
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