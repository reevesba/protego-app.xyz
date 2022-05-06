import { Component } from '@angular/core';

@Component({
  selector: 'feature-extractor',
  templateUrl: 'feature-extractor.component.html',
  styleUrls: ['feature-extractor.component.scss']
})
export class FeatureExtractorComponent {
  showNumbers: boolean = true;

  constructor() {}

  toggleNumbers() {
    this.showNumbers = !this.showNumbers;
  }
}