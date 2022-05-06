import { Component } from '@angular/core';

@Component({
  selector: 'logb',
  templateUrl: 'logb.component.html',
  styleUrls: ['logb.component.scss']
})
export class LOGBComponent {
  showNumbers: boolean = true;

  constructor() {}

  toggleNumbers() {
    this.showNumbers = !this.showNumbers;
  }
}