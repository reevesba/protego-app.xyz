import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ModelService } from '../../../services/model.service';
import { OnlineLR } from '../../models/logo.model';
import { TokenService } from '../../../../../../shared/services/token.service';
import { DropDown } from '../../../../../../shared/interfaces/dropdown.interface';

@Component({
  selector: 'logo',
  templateUrl: 'logo.component.html',
  styleUrls: ['logo.component.scss']
})
export class OnlineLRComponent implements OnInit {
  groupId: string;
  algorithm: string;
  username: string;
  modelId: number;
  modelForm: FormGroup;
  model: OnlineLR = new OnlineLR();
  errorMsg: string = null;
  isLoading: boolean = false;

  optimizers: DropDown[] = [
    {value: '0', viewValue: 'AMSGrad'},
    {value: '1', viewValue: 'AdaBound'},
    {value: '2', viewValue: 'AdaDelta'},
    {value: '3', viewValue: 'AdaGrad'},
    {value: '4', viewValue: 'AdaMax'},
    {value: '5', viewValue: 'Adam'},
    {value: '6', viewValue: 'Averager'},
    {value: '7', viewValue: 'FTRLProximal'},
    {value: '8', viewValue: 'Momentum'},
    {value: '9', viewValue: 'Nadam'},
    {value: '10', viewValue: 'NesterovMomentum'},
    {value: '11', viewValue: 'RMSProp'},
    {value: '12', viewValue: 'SGD'}
  ];

  losses: DropDown[] = [
    {value: '0', viewValue: 'BinaryFocalLoss'},
    {value: '1', viewValue: 'Hinge'},
    {value: '3', viewValue: 'Log'}
  ];

  schedulers: DropDown[] = [
    {value: '0', viewValue: 'Constant'},
    {value: '1', viewValue: 'InverseScaling'},
    {value: '2', viewValue: 'Optimal'}
  ];

  initializers: DropDown[] = [
    {value: '0', viewValue: 'Constant'},
    {value: '1', viewValue: 'Normal'},
    {value: '2', viewValue: 'Zeros'}
  ];

  constructor(
    private router: Router,
    private ar: ActivatedRoute,
    private fb: FormBuilder,
    private modelService: ModelService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.modelForm = this.fb.group({
      name: [this.model.name, [Validators.required]],
      optimizer: [this.model.optimizer, []],
      loss: [this.model.loss, []],
      l2: [this.model.l2, [Validators.min(0)]],
      intercept_init: [this.model.intercept_init, [Validators.min(0)]],
      intercept_lr_select: [this.model.intercept_lr_select, []],
      intercept_lr_float: [this.model.intercept_lr_float, [Validators.min(0)]],
      intercept_lr_schdlr: [this.model.intercept_lr_schdlr, []],
      clip_gradient: [this.model.clip_gradient, [Validators.min(0)]],
      initializer: [this.model.initializer, []]
    });

    this.username = this.tokenService.username;

    this.ar.params.subscribe(params => {
      this.groupId = params['groupId'];
    });

    this.algorithm = this.router.url.split("/")[2];
  }

  get modelFormControl() { return this.modelForm.controls; }
  get lr_select(): any { return this.modelForm.get('intercept_lr_select') }
  get lr_float(): any { return this.modelForm.get('intercept_lr_float') }
  get lr_schdlr(): any { return this.modelForm.get('intercept_lr_schdlr') }

  setSelect(event: any) {
    if (event.source.value == 0) {
      this.lr_schdlr.reset();
    }

    if (event.source.value == 1) {
      this.lr_float.reset();
    }
  }

  saveModel() {
    this.model = new OnlineLR(this.modelForm.value);
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