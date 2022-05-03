import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ModelService } from '../../../services/model.service';
import { OnlinePerceptron } from '../../models/pero.model';
import { TokenService } from '../../../../../../shared/services/token.service';
import { DropDown } from '../../../../../../shared/interfaces/dropdown.interface';
import { CustomValidationService } from '../../../../../../core/auth/custom-validation.service';

@Component({
  selector: 'pero',
  templateUrl: 'pero.component.html',
  styleUrls: ['pero.component.scss']
})
export class OnlinePerceptronComponent implements OnInit {
  groupId: string;
  algorithm: string;
  username: string;
  modelId: number;
  modelForm: FormGroup;
  model: OnlinePerceptron = new OnlinePerceptron();
  errorMsg: string = null;
  isLoading: boolean = false;

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
    private tokenService: TokenService,
    private cv: CustomValidationService
  ) {}

  ngOnInit() {
    this.modelForm = this.fb.group({
      name: [this.model.name, [Validators.required]],
      l2: [this.model.l2, [Validators.min(0)]],
      clip_gradient: [this.model.clip_gradient, [Validators.min(0)]],
      initializer: [this.model.initializer, []]
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
    this.model = new OnlinePerceptron(this.modelForm.value);
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