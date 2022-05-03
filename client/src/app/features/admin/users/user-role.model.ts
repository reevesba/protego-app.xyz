export class UserRole {
    constructor(
      public role_id: number,
      public user_id: number,
      public id?: number,
      public active?: boolean,
      public updated_at?: Date,
      public updated_by?: string,
      public created_at?: Date,
      public created_by?: string,
    ) { }
  }