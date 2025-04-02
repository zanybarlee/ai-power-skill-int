
import React from "react";
import { Card } from "@/components/ui/card";
import { CourseHeader } from "./course-card/CourseHeader";
import { CourseMetadata } from "./course-card/CourseMetadata";
import { CourseTags } from "./course-card/CourseTags";
import { CourseActions } from "./course-card/CourseActions";
import { CourseCardProps } from "./course-card/types";

export const RecommendedCourseCard = ({
  course,
  onEnroll,
  onViewDetails,
  isTeamCourse = false,
}: CourseCardProps) => {
  return (
    <Card key={course.id} className="p-5 border-aptiv/10">
      <CourseHeader title={course.title} provider={course.provider} />
      
      <p className="text-sm text-aptiv-gray-600 mb-3">{course.description}</p>
      
      <CourseMetadata 
        duration={course.duration} 
        level={course.level} 
        participants={course.participants}
        isTeamCourse={isTeamCourse}
      />
      
      <CourseTags tags={course.tags} />
      
      <CourseActions 
        onEnroll={() => isTeamCourse ? null : onEnroll(course.title)}
        onViewDetails={() => onViewDetails(course)}
        isTeamCourse={isTeamCourse}
      />
    </Card>
  );
};
