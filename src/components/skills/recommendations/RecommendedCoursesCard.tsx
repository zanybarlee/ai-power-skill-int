
import React from "react";
import { Card } from "@/components/ui/card";
import { CoursesTabs } from "./CoursesTabs";

interface RecommendedCoursesCardProps {
  courseTab: string;
  setCourseTab: (tab: string) => void;
  individualCourses: any[];
  teamCourses: any[];
  onEnroll: (courseTitle: string) => void;
  onViewDetails: (course: any) => void;
}

export const RecommendedCoursesCard = ({
  courseTab,
  setCourseTab,
  individualCourses,
  teamCourses,
  onEnroll,
  onViewDetails,
}: RecommendedCoursesCardProps) => {
  return (
    <Card className="p-6 bg-white border-aptiv/10">
      <h3 className="text-lg font-medium text-aptiv-gray-700 mb-4">Recommended Training</h3>
      
      <CoursesTabs 
        courseTab={courseTab}
        setCourseTab={setCourseTab}
        individualCourses={individualCourses}
        teamCourses={teamCourses}
        onEnroll={onEnroll}
        onViewDetails={onViewDetails}
      />
    </Card>
  );
};
