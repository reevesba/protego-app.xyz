import { Component } from '@angular/core';

@Component({
  selector: 'perb',
  templateUrl: 'perb.component.html',
  styleUrls: ['perb.component.scss']
})
export class PERBComponent {
  showNumbers: boolean = true;

  constructor() {}

  toggleNumbers() {
    this.showNumbers = !this.showNumbers;
  }
}