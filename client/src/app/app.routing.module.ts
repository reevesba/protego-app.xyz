import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

var routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule) },
    { path: 'workspace', loadChildren: () => import('./features/workspace/workspace.module').then((m) => m.WorkspaceModule) },
    { path: 'admin', loadChildren: () => import('./features/admin/admin.module').then((m) => m.AdminModule) },
    { path: 'settings', loadChildren: () => import('./features/settings/settings.module').then((m) => m.SettingsModule) },
    { path: 'profile', loadChildren: () => import('./features/profile/profile.module').then((m) => m.ProfileModule) },
    { path: 'login', loadChildren: () => import('./features/login/login.module').then((m) => m.LoginModule) },
    { path: 'signup', loadChildren: () => import('./features/signup/signup.module').then((m) => m.SignupModule) },

    // otherwise redirect to home
    { path: '**', redirectTo: '/' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [ 
        RouterModule
    ]
})
export class AppRoutingModule {}