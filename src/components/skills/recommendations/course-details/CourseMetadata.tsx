
import React from "react";
import { Clock, GraduationCap, Calendar, Users } from "lucide-react";

interface CourseMetadataProps {
  duration: string;
  level?: string;
  format: string;
  participants?: string;
}

export const CourseMetadata = ({
  duration,
  level,
  format,
  participants,
}: CourseMetadataProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex items-center">
        <Clock className="w-5 h-5 text-aptiv mr-2" />
        <div>
          <p className="text-sm font-medium text-aptiv-gray-700">Duration</p>
          <p className="text-aptiv-gray-500">{duration}</p>
        </div>
      </div>
      
      {level && (
        <div className="flex items-center">
          <GraduationCap className="w-5 h-5 text-aptiv mr-2" />
          <div>
            <p className="text-sm font-medium text-aptiv-gray-700">Level</p>
            <p className="text-aptiv-gray-500">{level}</p>
          </div>
        </div>
      )}
      
      <div className="flex items-center">
        <Calendar className="w-5 h-5 text-aptiv mr-2" />
        <div>
          <p className="text-sm font-medium text-aptiv-gray-700">Format</p>
          <p className="text-aptiv-gray-500">{format}</p>
        </div>
      </div>
      
      {participants && (
        <div className="flex items-center">
          <Users className="w-5 h-5 text-aptiv mr-2" />
          <div>
            <p className="text-sm font-medium text-aptiv-gray-700">Participants</p>
            <p className="text-aptiv-gray-500">{participants}</p>
          </div>
        </div>
      )}
    </div>
  );
};
