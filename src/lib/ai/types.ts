export interface ReviewResult {
  score: number;
  summary: string;

  bugs: string[];

  security: string[];

  performance: string[];

  refactoring: string[];
}
