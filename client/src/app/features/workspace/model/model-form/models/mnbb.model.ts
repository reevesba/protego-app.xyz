export class BatchNB {
  // Model Fields
  public group_id: number = 0;
  public algorithm: string = '';
  public name: string = null;
  public created_by?: string;

  // Hyperparameters
  public alpha: number = 1.0;
  public fit_prior: string = 'true';
  public class_prior: any = null;

  public constructor(init?: Partial<BatchNB>) {
    Object.assign(this, init);
  }
}