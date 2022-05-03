export class BatchRandomForest {
  // Model Fields
  public group_id: number = 0;
  public algorithm: string = '';
  public name: string = null;
  public created_by?: string;

  // Hyperparameters
  public n_estimators: number = 100;
  public criterion: string = 'gini';
  public max_depth: number = null;
  public min_samples_split: number = 2;
  public min_samples_leaf: number = 1;
  public min_weight_fraction_leaf: number = 0.0;
  public max_features: string = 'auto';
  public max_leaf_nodes: number = null;
  public min_impurity_decrease: number = 0.0;
  public bootstrap: string = 'true';
  public oob_score: string = 'false';
  public n_jobs: number = null;
  public random_state: number = null;
  public verbose: number = 0;
  public warm_start: string = 'false';
  public class_weight: any = null;
  public ccp_alpha: number = 0.0;
  public max_samples: number = null;

  public constructor(init?: Partial<BatchRandomForest>) {
    Object.assign(this, init);
  }
}