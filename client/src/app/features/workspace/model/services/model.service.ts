import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as env } from '../../../../../environments/environment';
import { Model } from '../models/model.model';
import { TrainModel } from '../../train/train.model';
import { TestModel } from '../../test/test.model';

@Injectable()
export class ModelService {
  private API_URL = env.apiUrl + '/model';

  constructor(private http: HttpClient) { }

  private static _handleError(err: HttpErrorResponse | any) {
    return throwError(() => err || 'Error: Unable to complete request.');
  }

  getGroupModels(groupId: number): Observable<Model[]> {
    return this.http.get<Model[]>(`${this.API_URL}/${groupId}`)
      .pipe(catchError(ModelService._handleError));
  }

  getParameters(modelId: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/parameters/${modelId}`)
      .pipe(catchError(ModelService._handleError));
  }

  saveModel(model: any): Observable<any> {
    return this.http.post(`${this.API_URL}`, model)
      .pipe(catchError(ModelService._handleError));
  }

  trainModel(data: TrainModel): Observable<any> {
    return this.http.put(`${this.API_URL}/train`, data)
      .pipe(catchError(ModelService._handleError));
  }

  testModel(data: TestModel): Observable<any> {
    return this.http.put(`${this.API_URL}/test`, data)
      .pipe(catchError(ModelService._handleError));
  }

  deleteModel(modelId: number) {
    return this.http.delete(`${this.API_URL}/${modelId}`)
      .pipe(catchError(ModelService._handleError));
  }
}