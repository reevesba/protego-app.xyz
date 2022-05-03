import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfileRoutingModule } from './profile.routing.module';
import { PhotoDialogBoxComponent } from './dialog-box/dialog-box.component';

@NgModule({
  declarations: [
    ProfileComponent,
    PhotoDialogBoxComponent
  ],
  imports: [
    CommonModule, 
    SharedModule, 
    ProfileRoutingModule
  ]
})
export class ProfileModule {}