import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { SignupComponent } from './signup/signup.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { SignupRoutingModule } from './signup.routing.module';

@NgModule({
  declarations: [
    SignupComponent,
    ConfirmEmailComponent
  ],
  imports: [
    CommonModule, 
    SharedModule, 
    SignupRoutingModule
  ]
})
export class SignupModule {}