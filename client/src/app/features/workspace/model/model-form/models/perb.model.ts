export class BatchPerceptron {
  // Model Fields
  public group_id: number = 0;
  public algorithm: string = '';
  public name: string = null;
  public created_by?: string;

  // Hyperparameters
  public penalty: string = null;
  public alpha: number = 0.0001;
  public l1_ratio: number = 0.15;
  public fit_intercept: string = 'true';
  public max_iter: number = 1000;
  public tol: number = 1e-3;
  public shuffle: string = 'true';
  public verbose: number = 0;
  public eta0: number = 1;
  public n_jobs: number = null;
  public random_state: number = null;
  public early_stopping: string = 'false';
  public validation_fraction: number = 0.1;
  public n_iter_no_change: number = 5;
  public class_weight: any = null;
  public warm_start: string = 'false';

  public constructor(init?: Partial<BatchPerceptron>) {
    Object.assign(this, init);
  }
}