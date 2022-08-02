export interface Sentence {
  id: number;
  sentence: string;
  created_at: Date;
}

export interface SentenceList {
  success: number;
  data: Sentence[];
}
