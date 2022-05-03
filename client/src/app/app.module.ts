// angular imports
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER  } from '@angular/core';

// application imports
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app/app.component';

// service imports
import { UsersService } from './features/admin/users/users.service';
import { RolesService } from './features/admin/roles/roles.service';
import { AuthService } from './core/auth/auth.service';
import { CustomValidationService } from './core/auth/custom-validation.service';
import { TokenService } from './shared/services/token.service';
import { UsernameCommService } from './features/login/username.comm.service';
import { GroupService } from './features/workspace/api-settings/services/group.service';
import { ApiTokenService } from './features/workspace/api-settings/services/api-token.service';
import { ModelService } from './features/workspace/model/services/model.service';
import { PayloadService } from './features/workspace/services/payload.service';

// helper imports
import { appInitializer } from './core/app-initializer/app.initializer';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    AppRoutingModule
    ],
  declarations: [
    AppComponent
  ],
  providers: [
    UsersService,
    RolesService,
    AuthService,
    TokenService,
    CustomValidationService,
    UsernameCommService,
    GroupService,
    ApiTokenService,
    ModelService,
    PayloadService,
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthService] }
    ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}