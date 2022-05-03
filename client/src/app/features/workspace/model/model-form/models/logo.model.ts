export class OnlineLR {
  // Model Fields
  public group_id: number = 0;
  public algorithm: string = '';
  public name: string = null;
  public created_by?: string;

  // Hyperparameters
  public optimizer: any = null;
  public loss: any = null;
  public l2: number = 0.0;
  public intercept_init: number = 0.0;
  public intercept_lr_select: string = '0';
  public intercept_lr_float: number = 0.01;
  public intercept_lr_schdlr: string = null;
  public clip_gradient: number = 1000000000000.0;
  public initializer: any = null;

  public constructor(init?: Partial<OnlineLR>) {
    Object.assign(this, init);
  }
}