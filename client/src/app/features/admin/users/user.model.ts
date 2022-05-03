export class User {
    first_name: string;
    last_name: string;
    email: string;
    username: string;
  
    // base entity fields
    id?: number;
    active?: boolean;
    updated_at?: Date;
    updated_by?: string;
    created_at?: Date ;
    created_by?: string;
  
    public constructor(init?: Partial<User>) {
      Object.assign(this, init);
    }
  }