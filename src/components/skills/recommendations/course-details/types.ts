
export interface Course {
  id: string;
  title: string;
  provider: string;
  duration: string;
  level?: string;
  format: string;
  tags: string[];
  description: string;
  participants?: string;
  syllabus?: string[];
  startDates?: string[];
  prerequisites?: string[];
  learningOutcomes?: string[];
}

export interface CourseDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: Course | null;
  onEnroll: (courseTitle: string) => void;
}
