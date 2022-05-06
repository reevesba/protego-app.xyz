import { Component } from '@angular/core';

@Component({
  selector: 'mnbo',
  templateUrl: 'mnbo.component.html',
  styleUrls: ['mnbo.component.scss']
})
export class MNBOComponent {
  showNumbers: boolean = true;

  constructor() {}

  toggleNumbers() {
    this.showNumbers = !this.showNumbers;
  }
}