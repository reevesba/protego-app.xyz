export class OnlinePerceptron {
  // Model Fields
  public group_id: number = 0;
  public algorithm: string = '';
  public name: string = null;
  public created_by?: string;

  // Hyperparameters
  public l2: number = 0.0;
  public clip_gradient: number = 1000000000000.0;
  public initializer: any = null;

  public constructor(init?: Partial<OnlinePerceptron>) {
    Object.assign(this, init);
  }
}