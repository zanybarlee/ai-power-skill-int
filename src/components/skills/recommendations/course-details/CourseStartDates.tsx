
import React from "react";

interface CourseStartDatesProps {
  startDates?: string[];
}

export const CourseStartDates = ({ startDates }: CourseStartDatesProps) => {
  if (!startDates || startDates.length === 0) return null;

  return (
    <div>
      <h3 className="text-lg font-medium text-aptiv-gray-700 mb-2">Upcoming Start Dates</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {startDates.map((date, index) => (
          <div key={index} className="bg-aptiv/5 p-2 rounded-md text-center">
            <p className="text-aptiv-gray-700">{date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
