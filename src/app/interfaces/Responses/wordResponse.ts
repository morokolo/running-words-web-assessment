export interface Word {
  id: number;
  word_name: string;
  type: string;
  created_at: Date;
}

export interface Words {
  success: number;
  data: Word[];
}
