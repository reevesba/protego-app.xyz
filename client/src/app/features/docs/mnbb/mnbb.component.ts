import { Component } from '@angular/core';

@Component({
  selector: 'mnbb',
  templateUrl: 'mnbb.component.html',
  styleUrls: ['mnbb.component.scss']
})
export class MNBBComponent {
  showNumbers: boolean = true;

  constructor() {}

  toggleNumbers() {
    this.showNumbers = !this.showNumbers;
  }
}