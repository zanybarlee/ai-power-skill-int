
export interface CourseCardProps {
  course: any;
  onEnroll: (courseTitle: string) => void;
  onViewDetails: (course: any) => void;
  isTeamCourse?: boolean;
}
