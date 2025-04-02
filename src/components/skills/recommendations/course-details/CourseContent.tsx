
import React from "react";
import { Separator } from "@/components/ui/separator";
import { CourseOverview } from "./CourseOverview";
import { CourseMetadata } from "./CourseMetadata";
import { CourseStartDates } from "./CourseStartDates";
import { CoursePrerequisites } from "./CoursePrerequisites";
import { CourseSyllabus } from "./CourseSyllabus";
import { CourseLearningOutcomes } from "./CourseLearningOutcomes";

interface Course {
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

interface CourseContentProps {
  course: Course;
}

export const CourseContent = ({ course }: CourseContentProps) => {
  return (
    <div className="space-y-6 py-4">
      <CourseOverview description={course.description} tags={course.tags} />
      
      <Separator />
      
      <CourseMetadata
        duration={course.duration}
        level={course.level}
        format={course.format}
        participants={course.participants}
      />
      
      <CourseStartDates startDates={course.startDates} />
      <CoursePrerequisites prerequisites={course.prerequisites} />
      <CourseSyllabus syllabus={course.syllabus} />
      <CourseLearningOutcomes learningOutcomes={course.learningOutcomes} />
    </div>
  );
};
