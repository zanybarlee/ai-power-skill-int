
export interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    value: number;
  }[];
}

export interface AssessmentQuestionsProps {
  assessmentId: string;
  assessmentTitle: string;
  onComplete: (results: any) => void;
  onCancel: () => void;
}

export interface ProgressHeaderProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  assessmentTitle: string;
  progress: number;
}

export interface QuestionOptionProps {
  option: {
    id: string;
    text: string;
    value: number;
  };
}

export interface NavigationButtonsProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  onPrevious: () => void;
  onCancel: () => void;
  isSubmitDisabled: boolean;
  isLastQuestion: boolean;
}
