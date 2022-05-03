import browser from 'browser-detect';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { routeAnimations, LocalStorageService, selectIsAuthenticated, selectSettingsStickyHeader, selectSettingsLanguage, selectEffectiveTheme } from '../core/core.module';
import { actionSettingsChangeAnimationsPageDisabled } from '../core/settings/settings.actions';
import { AuthService } from '../core/auth/auth.service';
import { UsernameCommService } from '../features/login/username.comm.service';
import { UsersService } from '../features/admin/users/users.service';
import { TokenService } from '../shared/services/token.service';
import { selectConfirmed } from '../core/core.module';

@Component({
  selector: 'protego-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations],
})
export class AppComponent implements OnInit {
  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logosrc = "../assets/logo.png";
  languages = ['en', 'de', 'sk', 'fr', 'es', 'pt-br', 'zh-cn'];
  navigation = [
    { link: 'home', label: 'protego.menu.home', auth: false, roles: ['member', 'admin', 'contributor'] },
    { link: 'workspace', label: 'protego.menu.workspace', auth: true, roles: ['member', 'admin', 'contributor'] },
    { link: 'admin', label: 'protego.menu.admin', auth: true, roles: ['admin'] },
  ];
  navigationSideMenu = [
    ...this.navigation,
    { link: 'settings', label: 'protego.menu.settings', auth: false, roles: ['member', 'admin', 'contributor'] }
  ];

  isAuthenticated$: Observable<boolean>;
  isConfirmed$: Observable<boolean>;
  stickyHeader$: Observable<boolean>;
  language$: Observable<string>;
  theme$: Observable<string>;

  username: string;
  role: string;
  profilePhoto: string;

  constructor(
    private store: Store,
    private storageService: LocalStorageService,
    private authService: AuthService,
    private router: Router,
    private communicationService: UsernameCommService,
    private tokenService: TokenService,
    private usersService: UsersService
  ) {}

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  ngOnInit(): void {
    this.username = this.tokenService.username;
    this.role = this.tokenService.role;

    if (this.username) { this.getUserPhoto(this.username); }

    this.communicationService.changeEmitted$.subscribe(data => {
      this.username = data.username;
      this.role = data.role;
      this.profilePhoto = data.profilePhoto;
    });

    this.storageService.testLocalStorage();
    if (AppComponent.isIEorEdgeOrSafari()) {
      this.store.dispatch(
        actionSettingsChangeAnimationsPageDisabled({
          pageAnimationsDisabled: true
        })
      );
    }

    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.isConfirmed$ = this.store.pipe(select(selectConfirmed));
    this.stickyHeader$ = this.store.pipe(select(selectSettingsStickyHeader));
    this.language$ = this.store.pipe(select(selectSettingsLanguage));
    this.theme$ = this.store.pipe(select(selectEffectiveTheme));
  }

  editProfile() {
    this.router.navigate(['/profile']);
  }

  getUserPhoto(username: string) {
    this.usersService
      .getUserPhoto(username)
      .subscribe({
        next: (v) => this.profilePhoto = 'data:image/gif;base64,' + v,
        error: (e) => console.log(e)
      });
  }

  logout() {    
    this.authService.logout();
    this.username = "";
    this.role = "";
  }
}