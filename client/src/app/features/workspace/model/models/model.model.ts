export class Model {
    constructor(
      public group_id: number,
      public name: string,
      public _id?: number,
      public active?: boolean,
      public updated_at?: Date,
      public updated_by?: string,
      public created_at?: Date,
      public created_by?: string,
    ) { }
  }