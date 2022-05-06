import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DocsRoutingModule } from './docs.routing.module';

import { DocsComponent } from './docs/docs.component';
import { OverviewComponent } from './overview/overview.component';
import { BaseComponent } from './base-class/base-class.component';
import { BaseBatchComponent } from './base-batch/base-batch.component';
import { BaseOnlineComponent } from './base-online/base-online.component';
import { KNNBComponent } from './knnb/knnb.component';
import { KNNOComponent } from './knno/knno.component';
import { LOGBComponent } from './logb/logb.component';
import { LOGOComponent } from './logo/logo.component';
import { MNBBComponent } from './mnbb/mnbb.component';
import { MNBOComponent } from './mnbo/mnbo.component';
import { PERBComponent } from './perb/perb.component';
import { PEROComponent } from './pero/pero.component';
import { RANBComponent } from './ranb/ranb.component';
import { RANOComponent } from './rano/rano.component';
import { TREBComponent } from './treb/treb.component';
import { TREOComponent } from './treo/treo.component';
import { DataLoaderComponent } from './data-loader/data-loader.component';
import { FeatureExtractorComponent } from './feature-extractor/feature-extractor.component';

@NgModule({
  declarations: [
    DocsComponent,
    OverviewComponent,
    BaseComponent,
    BaseBatchComponent,
    BaseOnlineComponent,
    KNNBComponent,
    KNNOComponent,
    LOGBComponent,
    LOGOComponent,
    MNBBComponent,
    MNBOComponent,
    PERBComponent,
    PEROComponent,
    RANBComponent,
    RANOComponent,
    TREBComponent,
    TREOComponent,
    DataLoaderComponent,
    FeatureExtractorComponent
  ],
  imports: [ 
    SharedModule, 
    DocsRoutingModule
  ]
})
export class DocsModule {}