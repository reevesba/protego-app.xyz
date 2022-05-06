import { Component } from '@angular/core';

@Component({
  selector: 'rano',
  templateUrl: 'rano.component.html',
  styleUrls: ['rano.component.scss']
})
export class RANOComponent {
  showNumbers: boolean = true;

  constructor() {}

  toggleNumbers() {
    this.showNumbers = !this.showNumbers;
  }
}