import { Component } from '@angular/core';

@Component({
  selector: 'treb',
  templateUrl: 'treb.component.html',
  styleUrls: ['treb.component.scss']
})
export class TREBComponent {
  showNumbers: boolean = true;

  constructor() {}

  toggleNumbers() {
    this.showNumbers = !this.showNumbers;
  }
}