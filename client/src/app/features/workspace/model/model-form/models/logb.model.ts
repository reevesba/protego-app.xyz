export class BatchLR {
  // Model Fields
  public group_id: number = 0;
  public algorithm: string = '';
  public name: string = '';
  public created_by?: string;

  // Hyperparameters
  public penalty: string = 'l2';
  public dual: string = 'false';
  public tol: number = 1e-4;
  public C: number = 1.0
  public fit_intercept: string = 'true';
  public intercept_scaling: number = 1.0;
  public class_weight: any = null;
  public random_state: number = null;
  public solver: string = 'lbfgs';
  public max_iter: number = 100;
  public multi_class: string = 'auto';
  public verbose: number = 0;
  public warm_start: string = 'false';
  public n_jobs: number = null;
  public l1_ratio: number = null;

  public constructor(init?: Partial<BatchLR>) {
    Object.assign(this, init);
  }
}