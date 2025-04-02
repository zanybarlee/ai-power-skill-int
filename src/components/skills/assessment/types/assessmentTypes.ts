
export interface Assessment {
  id: string;
  title: string;
  description: string;
  duration: string;
  questions: number;
  status: string;
}

export interface CompletedAssessment {
  id: string;
  title: string;
  completedDate: string;
  score: number;
  strengths: string[];
  improvements: string[];
}
