export class BatchKNN {
  // Model Fields
  public group_id: number = 0;
  public algorithm: string = '';
  public name: string = '';
  public created_by?: string;

  // Hyperparameters
  public n_neighbors: number = 5;
  public weights: string = 'uniform';
  public algorithm_knn: string = 'auto';
  public leaf_size: number = 30;
  public p: string = '2';
  public metric: string = 'minkowski';
  public metric_params: any = null;
  public n_jobs: number = null;

  public constructor(init?: Partial<BatchKNN>) {
    Object.assign(this, init);
  }
}