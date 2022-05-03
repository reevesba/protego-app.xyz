import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  { path: '', component: LoginComponent, data: { title: 'protego.menu.login' } },
  { path: 'forgot-password', component: ForgotPasswordComponent, data: { title: 'protego.menu.forgot-password' } },
  { path: 'reset-password/:id', component: ResetPasswordComponent, data: { title: 'protego.menu.reset-password' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}