import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { TokenService } from '../../../../shared/services/token.service';
import { DropDown } from '../../../../shared/interfaces/dropdown.interface';

@Component({
  selector: 'model-form',
  templateUrl: 'model-form.component.html',
  styleUrls: ['model-form.component.scss']
})
export class ModelFormComponent implements OnInit {
  groupId: string;
  username: string;
  routing: string = "../../";
  modelForm: FormGroup;
  algorithms: DropDown[];

  paradigms: DropDown[] = [
    { value: 'onl', viewValue: 'Online' },
    { value: 'bat', viewValue: 'Batch' }
  ];

  onlineAlgorithms: DropDown[] = [
    { value: 'treo', viewValue: 'Hoeffding Adaptive Tree' },
    { value: 'knno', viewValue: 'KNN ADWIN' },
    { value: 'logo', viewValue: 'Logistic Regression' },
    { value: 'pero', viewValue: 'Perceptron' },
    { value: 'mnbo', viewValue: 'Multinomial NB' },
    { value: 'rano', viewValue: 'Adaptive Random Forest' }
  ];

  batchAlgorithms: DropDown[] = [
    { value: 'treb', viewValue: 'Decision Tree' },
    { value: 'knnb', viewValue: 'KNN' },
    { value: 'logb', viewValue: 'Logistic Regression' },
    { value: 'perb', viewValue: 'Perceptron' },
    { value: 'mnbb', viewValue: 'Multinomial NB' },
    { value: 'ranb', viewValue: 'Random Forest' }
  ];

  constructor(
    private ar: ActivatedRoute,
    private fb: FormBuilder,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.modelForm = this.fb.group({
      paradigm: ['', [Validators.required]],
      algorithm: ['', [Validators.required]]
    });

    this.username = this.tokenService.username;

    this.ar.params.subscribe(params => {
      this.groupId = params['groupId'];
    });
  }

  get modelFormControl() {
    return this.modelForm.controls;
  }

  setAlgorithms(event: any) {
    if (event.source.value === 'onl') {
      this.algorithms = this.onlineAlgorithms;
    } else if (event.source.value === 'bat') {
      this.algorithms = this.batchAlgorithms;
    } else {
      this.algorithms = [];
    }
  }

  setRouting(event: any) {
    this.routing = this.routing.concat(event.source.value);
  }
}