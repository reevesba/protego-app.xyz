import { Component, ViewChild, AfterViewChecked, ChangeDetectorRef,ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MediaObserver } from "@angular/flex-layout";

@Component({
  selector: 'docs',
  templateUrl: 'docs.component.html',
  styleUrls: ['docs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DocsComponent implements AfterViewChecked {
  baseList: any[] = [
    { link: 'base-class', label: 'Base' },
    { link: 'base-batch', label: 'BaseBatch' },
    { link: 'base-online', label: 'BaseOnline' }
  ];
  btchList: any[] = [
    { link: 'treb', label: 'DecisionTree' },
    { link: 'knnb', label: 'KNeighbors' },
    { link: 'logb', label: 'LogisticRegressionClassifier' },
    { link: 'mnbb', label: 'NaiveBayes' },
    { link: 'perb', label: 'PerceptronClassifier' },
    { link: 'ranb', label: 'RandomForest' }
  ];
  onlnList: any[] = [
    { link: 'treo', label: 'HoeffdingAdaptiveTree' },
    { link: 'knno', label: 'KNNADWIN' },
    { link: 'logo', label: 'LogisticRegressionClassifier' },
    { link: 'mnbo', label: 'NaiveBayes' },
    { link: 'pero', label: 'PerceptronClassifier' },
    { link: 'rano', label: 'AdaptiveRandomForest' }
  ];

  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(
    public media: MediaObserver,
    private cdRef: ChangeDetectorRef
  ) {}

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}