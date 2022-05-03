import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModelService } from '../../../services/model.service';
import { OnlineKNN } from '../../models/knno.model';
import { TokenService } from '../../../../../../shared/services/token.service';
import { DropDown } from '../../../../../../shared/interfaces/dropdown.interface';
import { CustomValidationService } from '../../../../../../core/auth/custom-validation.service';

@Component({
  selector: 'knno',
  templateUrl: 'knno.component.html',
  styleUrls: ['knno.component.scss']
})
export class OnlineKNNComponent implements OnInit {
  groupId: string;
  algorithm: string;
  username: string;
  modelId: number;
  modelForm: FormGroup;
  model: OnlineKNN = new OnlineKNN();
  errorMsg: string = null;
  isLoading: boolean = false;

  weightVals: DropDown[] = [
    {value: 'uniform', viewValue: 'Uniform'},
    {value: 'distance', viewValue: 'Distance'}
  ];

  algorithms: DropDown[] = [
    {value: 'auto', viewValue: 'Auto'},
    {value: 'ball_tree', viewValue: 'Ball Tree'},
    {value: 'kd_tree', viewValue: 'KD Tree'},
    {value: 'brute', viewValue: 'Brute'}
  ];

  ps: DropDown[] = [
    {value: '1', viewValue: 'Manhattan Distance'},
    {value: '2', viewValue: 'Euclidean Distance'}
  ];

  metrics: DropDown[] = [
    {value: 'minkowski', viewValue: 'Minkowski'}
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
      n_neighbors: [this.model.n_neighbors, [Validators.min(1), this.cv.isInt()]],
      window_size: [this.model.window_size, [Validators.min(1), this.cv.isInt()]],
      leaf_size: [this.model.leaf_size, [Validators.min(1), this.cv.isInt()]],
      p: [this.model.p, [Validators.min(1), this.cv.isInt()]]
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

  saveModel() {
    this.model = new OnlineKNN(this.modelForm.value);
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