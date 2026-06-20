export interface Project {
  id: string;
  user_id: string;

  name: string;

  description: string | null;

  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;

  project_id: string;

  language: string;

  filename: string | null;

  code: string;

  score: number | null;

  ai_review: unknown;

  created_at: string;
}