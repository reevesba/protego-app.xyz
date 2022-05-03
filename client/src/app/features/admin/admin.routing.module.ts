import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { AdminGuardService } from '../../core/core.module';

const routes: Routes = [
  { path: '', component: AdminComponent, canActivate:[AdminGuardService], data: { title: 'protego.menu.admin', roles: ['admin'] },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, canActivate:[AdminGuardService], data: { title: 'protego.menu.admin', roles: ['admin'] } },
      { path: 'users', component: UsersComponent, canActivate:[AdminGuardService], data: { title: 'protego.menu.users', roles: ['admin'] } },
      { path: 'roles', component: RolesComponent, canActivate:[AdminGuardService], data: { title: 'protego.menu.roles', roles: ['admin'] } }
    ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}