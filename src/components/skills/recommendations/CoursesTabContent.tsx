
import React from "react";
import { RecommendedCourseCard } from "./RecommendedCourseCard";

interface CoursesTabContentProps {
  courses: any[];
  onEnroll: (courseTitle: string) => void;
  onViewDetails: (course: any) => void;
  isTeamCourses?: boolean;
}

export const CoursesTabContent = ({
  courses,
  onEnroll,
  onViewDetails,
  isTeamCourses = false,
}: CoursesTabContentProps) => {
  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <RecommendedCourseCard
          key={course.id}
          course={course}
          onEnroll={onEnroll}
          onViewDetails={onViewDetails}
          isTeamCourse={isTeamCourses}
        />
      ))}
    </div>
  );
};
