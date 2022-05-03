import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ModelService } from '../../../services/model.service';
import { OnlineTree } from '../../models/treo.model';
import { TokenService } from '../../../../../../shared/services/token.service';
import { DropDown } from '../../../../../../shared/interfaces/dropdown.interface';
import { CustomValidationService } from '../../../../../../core/auth/custom-validation.service';

@Component({
  selector: 'treo',
  templateUrl: 'treo.component.html',
  styleUrls: ['treo.component.scss']
})
export class OnlineTreeComponent implements OnInit {
  groupId: string;
  algorithm: string;
  username: string;
  modelId: number;
  modelForm: FormGroup;
  model: OnlineTree = new OnlineTree();
  errorMsg: string = null;
  isLoading: boolean = false;

  splitters: DropDown[] = [
    {value: '0', viewValue: 'Exhaustive'},
    {value: '1', viewValue: 'Gaussian'},
    {value: '2', viewValue: 'Histogram'}
  ];

  criterions: DropDown[] = [
    {value: 'gini', viewValue: 'Gini'},
    {value: 'info_gain', viewValue: 'Information Gain'},
    {value: 'hellinger', viewValue: 'Hellinger Distance'}
  ]

  predictions: DropDown[] = [
    {value: 'mc', viewValue: 'Majority Class'},
    {value: 'nb', viewValue: 'Naive Bayes'},
    {value: 'nba', viewValue: 'Naive Bayes Adaptive'}
  ]

  constructor(
    private router: Router,
    private ar: ActivatedRoute,
    private fb: FormBuilder,
    private modelService: ModelService,
    private tokenService: TokenService,
    private cv: CustomValidationService
  ) {}

  ngOnInit() {
    this.modelForm = this.fb.group({
      name: [this.model.name, [Validators.required]],
      grace_period: [this.model.grace_period, [Validators.min(1), this.cv.isInt()]],
      max_depth: [this.model.max_depth, [Validators.min(1), this.cv.isInt()]],
      split_criterion: [this.model.split_criterion, []],
      split_confidence: [this.model.split_confidence, [Validators.min(0)]],
      tie_threshold: [this.model.tie_threshold, [Validators.min(0)]],
      leaf_prediction: [this.model.leaf_prediction, []],
      nb_threshold: [this.model.nb_threshold, [Validators.min(0), this.cv.isInt()]],
      nominal_attributes: [{value: this.model.nominal_attributes, disabled: true}, []],
      splitter: [this.model.splitter, []],
      bootstrap_sampling: [this.model.bootstrap_sampling, []],
      drift_window_threshold: [this.model.drift_window_threshold, [Validators.min(1), this.cv.isInt()]],
      adwin_confidence: [this.model.adwin_confidence, [Validators.min(0)]],
      binary_split: [this.model.binary_split, []],
      max_size: [this.model.max_size, [Validators.min(0), this.cv.isInt()]],
      memory_estimate_period: [this.model.memory_estimate_period, [Validators.min(0), this.cv.isInt()]],
      stop_mem_management: [this.model.stop_mem_management, []],
      remove_poor_attrs: [this.model.remove_poor_attrs, []],
      merit_preprune: [this.model.merit_preprune, []],
      seed: [this.model.seed, [Validators.min(0), this.cv.isInt()]]
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
    this.model = new OnlineTree(this.modelForm.value);
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