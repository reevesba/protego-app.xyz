export class TestModel {
    groupId: number = 0;
    modelId: number = 0;
    sampleMode: number = 0;
    sample: string = '';
    trainStart: number = 0;
    trainEnd: number = 0;
  
    public constructor(init?: Partial<TestModel>) {
      Object.assign(this, init);
    }
  }