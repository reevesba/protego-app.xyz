export class OnlineKNN {
  // Model Fields
  public group_id: number = 0;
  public algorithm: string = '';
  public name: string = '';
  public created_by?: string;

  // Hyperparameters
  public n_neighbors: number = 5;
  public window_size: number = 1000;
  public leaf_size: number = 30;
  public p: number = 2;

  public constructor(init?: Partial<OnlineKNN>) {
    Object.assign(this, init);
  }
}