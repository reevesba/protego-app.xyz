import { Component } from '@angular/core';

@Component({
  selector: 'knnb',
  templateUrl: 'knnb.component.html',
  styleUrls: ['knnb.component.scss']
})
export class KNNBComponent {
  showNumbers: boolean = true;

  constructor() {}

  toggleNumbers() {
    this.showNumbers = !this.showNumbers;
  }
}