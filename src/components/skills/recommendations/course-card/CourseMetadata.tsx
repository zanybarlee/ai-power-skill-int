
import React from "react";
import { Clock, GraduationCap, Users } from "lucide-react";

interface CourseMetadataProps {
  duration: string;
  level?: string;
  participants?: string;
  isTeamCourse: boolean;
}

export const CourseMetadata = ({ duration, level, participants, isTeamCourse }: CourseMetadataProps) => {
  return (
    <div className="grid grid-cols-2 gap-2 mb-3">
      <div className="flex items-center text-xs text-aptiv-gray-500">
        <Clock className="w-3.5 h-3.5 mr-1" />
        {duration}
      </div>
      <div className="flex items-center text-xs text-aptiv-gray-500">
        {isTeamCourse ? (
          <>
            <Users className="w-3.5 h-3.5 mr-1" />
            {participants}
          </>
        ) : (
          <>
            <GraduationCap className="w-3.5 h-3.5 mr-1" />
            {level}
          </>
        )}
      </div>
    </div>
  );
};
