import { Component } from '@angular/core';

@Component({
  selector: 'pero',
  templateUrl: 'pero.component.html',
  styleUrls: ['pero.component.scss']
})
export class PEROComponent {
  showNumbers: boolean = true;

  constructor() {}

  toggleNumbers() {
    this.showNumbers = !this.showNumbers;
  }
}