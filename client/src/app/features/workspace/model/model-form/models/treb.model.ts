export class BatchTree {
  // Model Fields
  public group_id: number = 0;
  public algorithm: string = '';
  public name: string = null;
  public created_by?: string;

  // Hyperparameters
  public criterion: string = 'gini';
  public splitter: string = 'best';
  public max_depth: number = null;
  public min_samples_split: number = 2;
  public min_samples_leaf: number = 1;
  public min_weight_fraction_leaf: number = 0.0;
  public max_features: any = null;
  public random_state: number = null;
  public max_leaf_nodes: number = null;
  public min_impurity_decrease: number = 0.0;
  public class_weight: any = null;
  public ccp_alpha: number = 0.0;

  public constructor(init?: Partial<BatchTree>) {
    Object.assign(this, init);
  }
}