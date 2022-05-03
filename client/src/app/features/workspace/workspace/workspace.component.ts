import { Component, ViewChild, AfterViewChecked, ChangeDetectorRef  } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MediaObserver } from "@angular/flex-layout";
import { TranslateService } from '@ngx-translate/core';

@Component({ 
    templateUrl: 'workspace.component.html',
    styleUrls: ['workspace.component.scss']
  })
export class WorkspaceComponent implements AfterViewChecked {
  navList: any[];

  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(
    public media: MediaObserver,
    private cdRef: ChangeDetectorRef,
    private ts: TranslateService
  ) {
      this.navList = [
        { link: 'api-settings', label: 'protego.workspace.menu.api-settings', auth: true, roles: ['member', 'admin', 'contributor'] },
        { link: 'model', label: 'protego.workspace.menu.model', auth: true, roles: ['member', 'admin', 'contributor'] },
        { link: 'labels', label: 'protego.workspace.menu.label', auth: true, roles: ['member', 'admin', 'contributor'] },
        { link: 'train', label: 'protego.workspace.menu.train', auth: true, roles: ['member', 'admin', 'contributor'] },
        { link: 'test', label: 'protego.workspace.menu.test', auth: true, roles: ['member', 'admin', 'contributor'] },
        { link: 'docs', label: 'protego.workspace.menu.docs', auth: true, roles: ['member', 'admin', 'contributor'] }
      ];

      this.ts.getTranslation(this.ts.currentLang);
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}