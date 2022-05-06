import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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

const routes: Routes = [
  { path: '', component: DocsComponent, data: { title: 'Docs' },
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewComponent, data: { title: 'Overview' } },
      { path: 'base-class', component: BaseComponent, data: { title: 'Base' } },
      { path: 'base-batch', component: BaseBatchComponent, data: { title: 'BaseBatch' } },
      { path: 'base-online', component: BaseOnlineComponent, data: { title: 'BaseOnline' } },
      { path: 'knnb', component: KNNBComponent, data: { title: 'KNeighbors' } },
      { path: 'knno', component: KNNOComponent, data: { title: 'KNNADWIN' } },
      { path: 'logb', component: LOGBComponent, data: { title: 'LogisticRegressionClassifier' } },
      { path: 'logo', component: LOGOComponent, data: { title: 'LogisticRegressionClassifier' } },
      { path: 'mnbb', component: MNBBComponent, data: { title: 'NaiveBayes' } },
      { path: 'mnbo', component: MNBOComponent, data: { title: 'NaiveBayes' } },
      { path: 'perb', component: PERBComponent, data: { title: 'PerceptronClassifier' } },
      { path: 'pero', component: PEROComponent, data: { title: 'PerceptronClassifier' } },
      { path: 'ranb', component: RANBComponent, data: { title: 'RandomForest' } },
      { path: 'rano', component: RANOComponent, data: { title: 'AdaptiveRandomForest' } },
      { path: 'treb', component: TREBComponent, data: { title: 'DecisionTree' } },
      { path: 'treo', component: TREOComponent, data: { title: 'HoeffdingAdaptiveTree' } },
      { path: 'data-loader', component: DataLoaderComponent, data: { title: 'DataLoader' } },
      { path: 'feature-extractor', component: FeatureExtractorComponent, data: { title: 'FeatureExtractor' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocsRoutingModule {}