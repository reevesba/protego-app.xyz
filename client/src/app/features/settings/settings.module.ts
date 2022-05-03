import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { SettingsContainerComponent } from './settings/settings-container.component';
import { SettingsRoutingModule } from './settings.routing.module';

@NgModule({
  declarations: [SettingsContainerComponent],
  imports: [CommonModule, SharedModule, SettingsRoutingModule]
})
export class SettingsModule {}