import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkspaceComponent } from './workspace/workspace.component';
import { ConfirmedGuardService } from '../../core/core.module';
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

const routes: Routes = [
  { path: '', component: WorkspaceComponent, canActivate:[ConfirmedGuardService], data: { title: 'protego.menu.workspace', roles: ['member', 'admin'] },
    children: [
      { path: '', redirectTo: 'api-settings', pathMatch: 'full' },
      { path: 'api-settings', component: ApiSettingsComponent, canActivate: [ConfirmedGuardService], data: { title: 'protego.workspace.menu.api-settings', roles: ['member', 'admin'] } },
      { path: 'model', component: ModelComponent, canActivate: [ConfirmedGuardService], data: { title: 'protego.workspace.menu.model', roles: ['member', 'admin'] } },
      { path: 'model-form/:groupId', component: ModelFormComponent, canActivate: [ConfirmedGuardService], data: { title: 'protego.workspace.menu.model-form', roles: ['member', 'admin'] } },
      { path: 'knnb/:groupId', component: BatchKNNComponent, canActivate: [ConfirmedGuardService], data: { title: 'protego.workspace.menu.knnb', roles: ['member', 'admin'] } },
      { path: 'knno/:groupId', component: OnlineKNNComponent, canActivate: [ConfirmedGuardService], data: { title: 'protego.workspace.menu.knno', roles: ['member', 'admin'] } },
      { path: 'logb/:groupId', component: BatchLRComponent, canActivate: [ConfirmedGuardService], data: { title: 'protego.workspace.menu.logb', roles: ['member', 'admin'] } },
      { path: 'logo/:groupId', component: OnlineLRComponent, canActivate: [ConfirmedGuardService], data: { title: 'protego.workspace.menu.logo', roles: ['member', 'admin'] } },
      { path: 'mnbb/:groupId', component: BatchNBComponent, canActivate: [ConfirmedGuardService], data: { title: 'protego.workspace.menu.mnbb', roles: ['member', 'admin'] } },
      { path: 'mnbo/:groupId', component: OnlineNBComponent, canActivate: [ConfirmedGuardService], data: { title: 'protego.workspace.menu.mnbo', roles: ['member', 'admin'] } },
      { path: 'perb/:groupId', component: BatchPerceptronComponent, canActivate: [ConfirmedGuardService], data: { title: 'protego.workspace.menu.perb', roles: ['member', 'admin'] } },
      { path: 'pero/:groupId', component: OnlinePerceptronComponent, canActivate: [ConfirmedGuardService], data: { title: 'protego.workspace.menu.pero', roles: ['member', 'admin'] } },
      { path: 'ranb/:groupId', component: BatchRandomForestComponent, canActivate: [ConfirmedGuardService], data: { title: 'protego.workspace.menu.ranb', roles: ['member', 'admin'] } },
      { path: 'rano/:groupId', component: OnlineRandomForestComponent, canActivate: [ConfirmedGuardService], data: { title: 'protego.workspace.menu.rano', roles: ['member', 'admin'] } },
      { path: 'treb/:groupId', component: BatchTreeComponent, canActivate: [ConfirmedGuardService], data: { title: 'protego.workspace.menu.treb', roles: ['member', 'admin'] } },
      { path: 'treo/:groupId', component: OnlineTreeComponent, canActivate: [ConfirmedGuardService], data: { title: 'protego.workspace.menu.treo', roles: ['member', 'admin'] } },
      { path: 'labels', component: LabelComponent, canActivate: [ConfirmedGuardService], data: { title: 'protego.workspace.menu.label', roles: ['member', 'admin'] } },
      { path: 'train', component: TrainComponent, canActivate: [ConfirmedGuardService], data: { title: 'protego.workspace.menu.train', roles: ['member', 'admin'] } },
      { path: 'test', component: TestComponent, canActivate: [ConfirmedGuardService], data: { title: 'protego.workspace.menu.test', roles: ['member', 'admin'] } },
      { path: 'docs', component: DocsComponent, canActivate: [ConfirmedGuardService], data: { title: 'protego.workspace.menu.docs', roles: ['member', 'admin'] } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule {}