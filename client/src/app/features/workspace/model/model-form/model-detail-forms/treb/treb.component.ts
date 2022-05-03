import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormInfoDialogBoxComponent } from '../form-info-dialog-box/form-info-dialog-box.component';
import { ModelService } from '../../../services/model.service';
import { BatchTree } from '../../models/treb.model';
import { TokenService } from '../../../../../../shared/services/token.service';
import { DropDown } from '../../../../../../shared/interfaces/dropdown.interface';
import { CustomValidationService } from '../../../../../../core/auth/custom-validation.service';

@Component({
  selector: 'treb',
  templateUrl: 'treb.component.html',
  styleUrls: ['treb.component.scss']
})
export class BatchTreeComponent implements OnInit {
  groupId: string;
  algorithm: string;
  username: string;
  modelId: number;
  modelForm: FormGroup;
  model: BatchTree = new BatchTree();
  errorMsg: string = null;
  isLoading: boolean = false;

  // dialog
  header: string;
  body: string;

  criterions: DropDown[] = [
    {value: 'gini', viewValue: 'Gini'},
    {value: 'entropy', viewValue: 'Entropy'}
  ];

  splitters: DropDown[] = [
    {value: 'best', viewValue: 'Best'},
    {value: 'random', viewValue: 'Best Random'}
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
      criterion: [this.model.criterion, []],
      splitter: [this.model.splitter, []],
      max_depth: [this.model.max_depth, [Validators.min(1), this.cv.isInt()]],
      min_samples_split: [this.model.min_samples_split, [Validators.min(1)]],
      min_samples_leaf: [this.model.min_samples_leaf, [Validators.min(1)]],
      min_weight_fraction_leaf: [this.model.min_weight_fraction_leaf, [Validators.min(0), Validators.max(0.5)]],
      max_features: [this.model.max_features, [this.cv.maxFeaturesValid()]],
      random_state:[this.model.random_state, [Validators.min(0), this.cv.isInt()]],
      max_leaf_nodes: [this.model.max_leaf_nodes, [Validators.min(1), this.cv.isInt()]],
      min_impurity_decrease: [this.model.min_impurity_decrease, [Validators.min(0)]],
      class_weight: [this.model.class_weight, [this.cv.classWeightValid()]],
      ccp_alpha: [this.model.ccp_alpha, [Validators.min(0)]],
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

  saveModel() {
    this.model = new BatchTree(this.modelForm.value);
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