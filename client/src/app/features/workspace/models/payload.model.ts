export class Payload {
  constructor(
    public group_id: number,
    public payload: string,
    public classification: string,
    public _id?: number,
    public active?: boolean,
    public updated_at?: Date,
    public updated_by?: string,
    public created_at?: Date,
    public created_by?: string,
  ) { }
}