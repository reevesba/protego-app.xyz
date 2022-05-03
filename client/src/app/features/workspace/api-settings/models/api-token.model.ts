export class ApiToken {
    constructor(
      public group_id: number,
      public api_key: string,
      public expiration: Date,
      public _id?: number,
      public active?: boolean,
      public updated_at?: Date,
      public updated_by?: string,
      public created_at?: Date,
      public created_by?: string,
    ) { }
  }