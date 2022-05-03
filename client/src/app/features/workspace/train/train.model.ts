export class TrainModel {
    groupId: number = 0;
    modelId: number = 0;
    trainStart: number = 0;
    trainEnd: number = 0;
    purgePayloads: number = 0;
    updated_by: string = '';
  
    public constructor(init?: Partial<TrainModel>) {
      Object.assign(this, init);
    }
  }