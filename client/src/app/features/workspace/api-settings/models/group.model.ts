export class Group {
    constructor(
      public name: string,
      public description: string,
      public admin: string,
      public _id?: number,
      public active?: boolean,
      public updated_at?: Date,
      public updated_by?: string,
      public created_at?: Date,
      public created_by?: string,
    ) { }
  }