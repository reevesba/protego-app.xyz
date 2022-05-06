import { Component } from '@angular/core';

@Component({
  selector: 'treo',
  templateUrl: 'treo.component.html',
  styleUrls: ['treo.component.scss']
})
export class TREOComponent {
  showNumbers: boolean = true;

  constructor() {}

  toggleNumbers() {
    this.showNumbers = !this.showNumbers;
  }
}