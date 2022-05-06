import { Component } from '@angular/core';

@Component({
  selector: 'logo',
  templateUrl: 'logo.component.html',
  styleUrls: ['logo.component.scss']
})
export class LOGOComponent {
  showNumbers: boolean = true;

  constructor() {}

  toggleNumbers() {
    this.showNumbers = !this.showNumbers;
  }
}