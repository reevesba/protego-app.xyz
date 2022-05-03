import { Component } from '@angular/core';
import { Tile } from '../../../shared/interfaces/tile.interface';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent {
  tileList: Tile[] = [
    { title: 'protego.admin.title1', subtitle: 'protego.admin.subtitle1', icon: 'person_search', link: '../users' },
    { title: 'protego.admin.title2', subtitle: 'protego.admin.subtitle2', icon: 'vpn_key', link: '../roles' }
  ];
}