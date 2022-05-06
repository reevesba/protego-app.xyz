import { Component } from '@angular/core';

@Component({
  selector: 'data-loader',
  templateUrl: 'data-loader.component.html',
  styleUrls: ['data-loader.component.scss']
})
export class DataLoaderComponent {
  showNumbers: boolean = true;

  constructor() {}

  toggleNumbers() {
    this.showNumbers = !this.showNumbers;
  }
}