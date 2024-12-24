export type Status = "pending" | "in-progress" | "completed";

export interface Todo {
  id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
}
