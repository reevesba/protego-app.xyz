import { Component } from '@angular/core';

@Component({
  selector: 'knno',
  templateUrl: 'knno.component.html',
  styleUrls: ['knno.component.scss']
})
export class KNNOComponent {
  showNumbers: boolean = true;

  constructor() {}

  toggleNumbers() {
    this.showNumbers = !this.showNumbers;
  }
}