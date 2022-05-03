export class OnlineTree {
  // Model Fields
  public group_id: number = 0;
  public algorithm: string = '';
  public name: string = null;
  public created_by?: string;

  // Hyperparameters
  public grace_period: number = 200;
  public max_depth: number = null;
  public split_criterion: string ='info_gain';
  public split_confidence: number = 1e-07;
  public tie_threshold: number = 0.05;
  public leaf_prediction: string = 'nba';
  public nb_threshold: number = 0;
  public nominal_attributes: any = null;
  public splitter: any = null;
  public bootstrap_sampling: string = 'true';
  public drift_window_threshold: number = 300;
  public adwin_confidence: number = 0.002;
  public binary_split: string = 'false';
  public max_size: number = 100;
  public memory_estimate_period: number = 1000000;
  public stop_mem_management: string = 'false';
  public remove_poor_attrs: string = 'false';
  public merit_preprune: string = 'true';
  public seed: number = null;

  public constructor(init?: Partial<OnlineTree>) {
    Object.assign(this, init);
  }
}