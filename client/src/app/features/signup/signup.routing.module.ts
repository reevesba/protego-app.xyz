import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { AuthGuardService } from '../../core/core.module';

const routes: Routes = [
  { path: '', component: SignupComponent, data: { title: 'protego.menu.signup' } },
  { path: 'confirm-email/:id', component: ConfirmEmailComponent, canActivate:[AuthGuardService], data: { title: 'protego.menu.confirm-email' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule {}