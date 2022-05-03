export class OnlineNB {
  // Model Fields
  public group_id: number = 0;
  public algorithm: string = '';
  public name: string = null;
  public created_by?: string;

  // Hyperparameters
  public alpha: number = 1.0;

  public constructor(init?: Partial<OnlineNB>) {
    Object.assign(this, init);
  }
}