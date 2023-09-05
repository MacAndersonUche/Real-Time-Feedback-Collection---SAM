export interface Feedback {
  id: string;
  author: string;
  email: string;
  feedbacktext: string;
  status: string;
}

export type SubmittedByUser = Omit<Feedback, "id" | "status">;

export interface genericJSON {
  [key: string]: any;
}
