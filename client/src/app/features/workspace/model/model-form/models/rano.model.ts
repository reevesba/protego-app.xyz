export class OnlineRandomForest {
  // Model Fields
  public group_id: number = 0;
  public algorithm: string = '';
  public name: string = null;
  public created_by?: string;

  // Hyperparameters
  public n_models: number = 10;
  public max_features: any = 'sqrt';
  public lambda_value: number = 6;
  public metric: any = null;
  public disable_weighted_vote: string = 'false';
  public drift_detector: any = null;
  public warning_detector: any = null;
  public grace_period: number = 50;
  public max_depth: number = null;
  public split_criterion: string = 'info_gain';
  public split_confidence: number = 0.01;
  public tie_threshold: number = 0.05;
  public leaf_prediction: string = 'nba';
  public nb_threshold: number = 0;
  public nominal_attributes: any = null;
  public splitter: any = null;
  public binary_split: string = 'false';
  public max_size: number = 32;
  public memory_estimate_period: number = 2000000;
  public stop_mem_management: string = 'false';
  public remove_poor_attrs: string = 'false';
  public merit_preprune: string = 'true';
  public seed: number = null;

  public constructor(init?: Partial<OnlineRandomForest>) {
    Object.assign(this, init);
  }
}