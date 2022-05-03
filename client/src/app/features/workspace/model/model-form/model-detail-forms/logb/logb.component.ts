import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormInfoDialogBoxComponent } from '../form-info-dialog-box/form-info-dialog-box.component';
import { ModelService } from '../../../services/model.service';
import { BatchLR } from '../../models/logb.model';
import { TokenService } from '../../../../../../shared/services/token.service';
import { DropDown } from '../../../../../../shared/interfaces/dropdown.interface';
import { CustomValidationService } from '../../../../../../core/auth/custom-validation.service';

@Component({
  selector: 'logb',
  templateUrl: 'logb.component.html',
  styleUrls: ['logb.component.scss']
})
export class BatchLRComponent implements OnInit {
  groupId: string;
  algorithm: string;
  username: string;
  modelId: number;
  modelForm: FormGroup;
  model: BatchLR = new BatchLR();
  errorMsg: string = null;
  isLoading: boolean = false;

  // dialog
  header: string;
  body: string;

  penalties: DropDown[] = [
    {value: 'l1', viewValue: 'L1'},
    {value: 'l2', viewValue: 'L2'},
    {value: 'elasticnet', viewValue: 'Elastic Net'},
    {value: 'none', viewValue: 'None'}
  ];

  solvers: DropDown[] = [
    {value: 'newton-cg', viewValue: 'Newton-CG'},
    {value: 'lbfgs', viewValue: 'Limited-memory BFGS'},
    {value: 'liblinear', viewValue: 'Large Linear'},
    {value: 'sag', viewValue: 'Stochastic Avg Gradient'},
    {value: 'saga', viewValue: 'SAGA'}
  ];

  mc_options: DropDown[] = [
    {value: 'auto', viewValue: 'Auto'},
    {value: 'ovr', viewValue: 'One-vs-Rest'},
    {value: 'multinomial', viewValue: 'Multinomial'}
  ];

  bools: DropDown[]  =[
    {value: 'true', viewValue: 'True'},
    {value: 'false', viewValue: 'False'}
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
      dual: [this.model.dual, []],
      tol: [this.model.tol, [Validators.min(0)]],
      C: [this.model.C, [Validators.min(0)]],
      fit_intercept: [this.model.fit_intercept, []],
      intercept_scaling: [this.model.intercept_scaling, [Validators.min(0)]],
      class_weight: [this.model.class_weight, [this.cv.classWeightValid()]],
      random_state: [this.model.random_state, [Validators.min(0), this.cv.isInt()]],
      solver: [this.model.solver, []],
      max_iter: [this.model.max_iter, [Validators.min(0), this.cv.isInt()]],
      multi_class: [this.model.multi_class, []],
      verbose: [this.model.verbose, [Validators.min(0), this.cv.isInt()]],
      warm_start: [this.model.warm_start, []],
      n_jobs: [this.model.n_jobs, [Validators.min(1), this.cv.isInt()]],
      l1_ratio: [this.model.l1_ratio, [Validators.min(0)]],
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

  get solver(): any { return this.modelForm.get('solver') }

  setSolvers(event: any) {
    this.solver.reset();

    if (event.source.value == 'l1') {
      this.solvers = [
        {value: 'liblinear', viewValue: 'Large Linear'},
        {value: 'saga', viewValue: 'SAGA'}
      ]
    }

    if (event.source.value == 'l2') {
      this.solvers = [
        {value: 'newton-cg', viewValue: 'Newton-CG'},
        {value: 'lbfgs', viewValue: 'Limited-memory BFGS'},
        {value: 'liblinear', viewValue: 'Large Linear'},
        {value: 'sag', viewValue: 'Stochastic Avg Gradient'},
        {value: 'saga', viewValue: 'SAGA'}
      ]
    }

    if (event.source.value == 'elasticnet') {
      this.solvers = [
        {value: 'saga', viewValue: 'SAGA'}
      ]
    }

    if (event.source.value == 'none') {
      this.solvers = [
        {value: 'newton-cg', viewValue: 'Newton-CG'},
        {value: 'lbfgs', viewValue: 'Limited-memory BFGS'},
        {value: 'sag', viewValue: 'Stochastic Avg Gradient'},
        {value: 'saga', viewValue: 'SAGA'}
      ]
    }
  }

  saveModel() {
    this.model = new BatchLR(this.modelForm.value);
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