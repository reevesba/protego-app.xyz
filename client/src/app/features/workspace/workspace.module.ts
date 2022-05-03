import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '../../../environments/environment';

import { SharedModule } from '../../shared/shared.module';
import { WorkspaceComponent } from './workspace/workspace.component';
import { WorkspaceRoutingModule } from './workspace.routing.module';
import { ApiSettingsComponent } from './api-settings/api-settings.component';
import { ModelComponent } from './model/model.component';
import { ModelFormComponent } from './model/model-form/model-form.component';
import { TrainComponent } from './train/train.component';
import { TestComponent } from './test/test.component';
import { DocsComponent } from './docs/docs.component';
import { LabelComponent } from './labels/labels.component';

// Models
import { BatchKNNComponent } from './model/model-form/model-detail-forms/knnb/knnb.component';
import { OnlineKNNComponent } from './model/model-form/model-detail-forms/knno/knno.component';
import { BatchLRComponent } from './model/model-form/model-detail-forms/logb/logb.component';
import { OnlineLRComponent } from './model/model-form/model-detail-forms/logo/logo.component';
import { BatchNBComponent } from './model/model-form/model-detail-forms/mnbb/mnbb.component';
import { OnlineNBComponent } from './model/model-form/model-detail-forms/mnbo/mnbo.component';
import { BatchPerceptronComponent } from './model/model-form/model-detail-forms/perb/perb.component';
import { OnlinePerceptronComponent } from './model/model-form/model-detail-forms/pero/pero.component';
import { BatchRandomForestComponent } from './model/model-form/model-detail-forms/ranb/ranb.component';
import { OnlineRandomForestComponent } from './model/model-form/model-detail-forms/rano/rano.component';
import { BatchTreeComponent } from './model/model-form/model-detail-forms/treb/treb.component';
import { OnlineTreeComponent } from './model/model-form/model-detail-forms/treo/treo.component';

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/`,
    '.json'
  );
}

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    WorkspaceComponent,
    ApiSettingsComponent,
    ModelComponent,
    ModelFormComponent,
    TrainComponent,
    TestComponent,
    DocsComponent,
    LabelComponent,
    BatchKNNComponent,
    OnlineKNNComponent,
    BatchLRComponent,
    OnlineLRComponent,
    BatchNBComponent,
    OnlineNBComponent,
    BatchPerceptronComponent,
    OnlinePerceptronComponent,
    BatchRandomForestComponent,
    OnlineRandomForestComponent,
    BatchTreeComponent,
    OnlineTreeComponent
  ],
  imports: [
    CommonModule,
    SharedModule, 
    WorkspaceRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      },
      extend: true
    }),
  ]
})
export class WorkspaceModule {}