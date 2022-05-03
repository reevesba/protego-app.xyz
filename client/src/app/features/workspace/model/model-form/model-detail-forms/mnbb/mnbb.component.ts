import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomValidationService } from '../../../../../../core/auth/custom-validation.service';
import { ModelService } from '../../../services/model.service';
import { BatchNB } from '../../models/mnbb.model';
import { TokenService } from '../../../../../../shared/services/token.service';
import { MatDialog } from '@angular/material/dialog';
import { FormInfoDialogBoxComponent } from '../form-info-dialog-box/form-info-dialog-box.component';

@Component({
  selector: 'mnbb',
  templateUrl: 'mnbb.component.html',
  styleUrls: ['mnbb.component.scss']
})
export class BatchNBComponent implements OnInit {
  groupId: string;
  algorithm: string;
  username: string;
  modelId: number;
  modelForm: FormGroup;
  model: BatchNB = new BatchNB();
  errorMsg: string = null;
  isLoading: boolean = false;
  header: string;
  body: string;

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
      alpha: [this.model.alpha, [Validators.min(0)]],
      fit_prior: [this.model.fit_prior, []],
      class_prior: [this.model.class_prior, [this.cv.classPriorValid()]]
    });

    this.username = this.tokenService.username;

    this.ar.params.subscribe(params => {
      this.groupId = params['groupId'];
    });

    this.algorithm = this.router.url.split("/")[2];
  }

  get modelFormControl() { return this.modelForm.controls; }

  openDialog( ) {
    const dialogRef = this.dialog.open(FormInfoDialogBoxComponent, {
      width: '300px',
      data: { header: this.header, body: this.body }
    });
  }

  classPriorDialog() {
    this.header = 'Class Prior';
    this.body = `<p>
                    Prior probabilites of the classes. If specified, the priors are not adjusted according to the data.</br></br>
                    Because this is a binary classification task, only two prior probabilites may be entered.</br></br>
                    <strong>Example:</strong>
                    <ul>
                      <li>0.25,0.5</li>
                    </ul>
                </p>`;
    this.openDialog();
  }

  saveModel() {
    this.model = new BatchNB(this.modelForm.value);
    this.model.group_id = +this.groupId;
    this.model.algorithm = this.algorithm;
    this.model.created_by = this.username;
    this.isLoading = true;

    // Strip whitespace from class prior
    if (this.model.class_prior != null) {
      this.model.class_prior = this.model.class_prior.replace(/\s/g, '');
    }

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