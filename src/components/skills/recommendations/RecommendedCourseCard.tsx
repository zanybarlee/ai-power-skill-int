
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, GraduationCap, ExternalLink, Users } from "lucide-react";

interface CourseCardProps {
  course: any;
  onEnroll: (courseTitle: string) => void;
  onViewDetails: (course: any) => void;
  isTeamCourse?: boolean;
}

export const RecommendedCourseCard = ({
  course,
  onEnroll,
  onViewDetails,
  isTeamCourse = false,
}: CourseCardProps) => {
  return (
    <Card key={course.id} className="p-5 border-aptiv/10">
      <div className="mb-3">
        <h4 className="font-medium text-aptiv-gray-700">{course.title}</h4>
        <p className="text-sm text-aptiv-gray-500">by {course.provider}</p>
      </div>
      
      <p className="text-sm text-aptiv-gray-600 mb-3">{course.description}</p>
      
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="flex items-center text-xs text-aptiv-gray-500">
          <Clock className="w-3.5 h-3.5 mr-1" />
          {course.duration}
        </div>
        <div className="flex items-center text-xs text-aptiv-gray-500">
          {isTeamCourse ? (
            <>
              <Users className="w-3.5 h-3.5 mr-1" />
              {course.participants}
            </>
          ) : (
            <>
              <GraduationCap className="w-3.5 h-3.5 mr-1" />
              {course.level}
            </>
          )}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1 mb-4">
        {course.tags.map((tag: string, i: number) => (
          <span key={i} className="text-xs bg-aptiv/10 text-aptiv px-2 py-0.5 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex space-x-2">
        <Button 
          className="bg-aptiv hover:bg-aptiv-dark"
          onClick={() => isTeamCourse ? null : onEnroll(course.title)}
        >
          {isTeamCourse ? "Request for Team" : "Enroll Now"}
        </Button>
        <Button 
          variant="outline"
          onClick={() => onViewDetails(course)}
        >
          Learn More <ExternalLink className="w-3.5 h-3.5 ml-1" />
        </Button>
      </div>
    </Card>
  );
};
