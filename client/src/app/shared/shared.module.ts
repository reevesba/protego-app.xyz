import { NgModule, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from "@angular/flex-layout";

import { MarkdownModule } from 'ngx-markdown';

// material imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPlus, faEdit, faTrash, faTimes, faCaretUp, faCaretDown, faExclamationTriangle, faFilter, faTasks, faCheck, faSquare, faLanguage, faPaintBrush, faLightbulb, faWindowMaximize, faStream, faBook } from '@fortawesome/free-solid-svg-icons';
import { faMediumM, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faBars, faCog, faRocket } from '@fortawesome/free-solid-svg-icons';
import { BigInputComponent } from './big-input/big-input/big-input.component';
import { BigInputActionComponent } from './big-input/big-input-action/big-input-action.component';
import { RtlSupportDirective } from './rtl-support/rtl-support.directive';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { GroupDialogBoxComponent } from '../features/workspace/api-settings/dialog-boxes/group-dialog-box/group-dialog-box.component';
import { MemberDialogBoxComponent } from '../features/workspace/api-settings/dialog-boxes/member-dialog-box/member-dialog-box.component';
import { ApiTokenDialogBoxComponent } from '../features/workspace/api-settings/dialog-boxes/api-token-dialog-box/api-token-dialog-box.component';
import { FormInfoDialogBoxComponent } from '../features/workspace/model/model-form/model-detail-forms/form-info-dialog-box/form-info-dialog-box.component';
import { BulkDialogBoxComponent } from '../features/workspace/labels/bulk-dialog-box/bulk-dialog-box.component';
import { FileUploadModule } from 'ng2-file-upload';
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatChipsModule,
    MatCardModule,
    MatCheckboxModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSidenavModule,
    MatSortModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FontAwesomeModule,
    NgxMatSelectSearchModule,
    FileUploadModule,
    RecaptchaModule,
    MarkdownModule.forRoot({ 
      sanitize: SecurityContext.NONE,
    })
  ],
  declarations: [
    BigInputComponent,
    BigInputActionComponent,
    RtlSupportDirective,
    DialogBoxComponent,
    GroupDialogBoxComponent,
    MemberDialogBoxComponent,
    ApiTokenDialogBoxComponent,
    FormInfoDialogBoxComponent,
    BulkDialogBoxComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatChipsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatCardModule,
    MatListModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSidenavModule,
    MatSortModule,
    MatDialogModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatRadioModule,
    FontAwesomeModule,
    BigInputComponent,
    BigInputActionComponent,
    RtlSupportDirective,
    DialogBoxComponent,
    GroupDialogBoxComponent,
    MemberDialogBoxComponent,
    ApiTokenDialogBoxComponent,
    FormInfoDialogBoxComponent,
    BulkDialogBoxComponent,
    NgxMatSelectSearchModule,
    FileUploadModule,
    RecaptchaModule,
    MarkdownModule
  ]
})
export class SharedModule {
  constructor(faIconLibrary: FaIconLibrary) {
    faIconLibrary.addIcons(
      faGithub,
      faMediumM,
      faLinkedin,
      faPlus,
      faEdit,
      faTrash,
      faTimes,
      faCaretUp,
      faCaretDown,
      faExclamationTriangle,
      faFilter,
      faTasks,
      faCheck,
      faSquare,
      faLanguage,
      faPaintBrush,
      faLightbulb,
      faWindowMaximize,
      faStream,
      faBook,
      faBars,
      faCog,
      faRocket
    );
  }
}