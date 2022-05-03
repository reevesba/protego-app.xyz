import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ModelService } from '../../../services/model.service';
import { OnlineNB } from '../../models/mnbo.model';
import { TokenService } from '../../../../../../shared/services/token.service';

@Component({
  selector: 'mnbo',
  templateUrl: 'mnbo.component.html',
  styleUrls: ['mnbo.component.scss']
})
export class OnlineNBComponent implements OnInit {
  groupId: string;
  algorithm: string;
  username: string;
  modelId: number;
  modelForm: FormGroup;
  model: OnlineNB = new OnlineNB();
  errorMsg: string = null;
  isLoading: boolean = false;
  header: string;
  body: string;

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
      alpha: [this.model.alpha, [Validators.min(0)]]
    });

    this.username = this.tokenService.username;

    this.ar.params.subscribe(params => {
      this.groupId = params['groupId'];
    });

    this.algorithm = this.router.url.split("/")[2];
  }

  get modelFormControl() { return this.modelForm.controls; }

  saveModel() {
    this.model = new OnlineNB(this.modelForm.value);
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