import { Component } from '@angular/core';

@Component({
  selector: 'ranb',
  templateUrl: 'ranb.component.html',
  styleUrls: ['ranb.component.scss']
})
export class RANBComponent {
  showNumbers: boolean = true;

  constructor() {}

  toggleNumbers() {
    this.showNumbers = !this.showNumbers;
  }
}