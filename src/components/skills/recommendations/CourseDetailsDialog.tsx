
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  X, 
  Clock, 
  GraduationCap, 
  Calendar, 
  Users, 
  CheckCircle, 
  ExternalLink 
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

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

interface CourseDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: Course | null;
  onEnroll: (courseTitle: string) => void;
}

export const CourseDetailsDialog = ({
  open,
  onOpenChange,
  course,
  onEnroll,
}: CourseDetailsDialogProps) => {
  if (!course) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-aptiv-gray-700">
              {course.title}
            </DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" className="h-8 w-8 p-0" aria-label="Close">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
          <DialogDescription className="text-aptiv-gray-500">
            Provided by {course.provider}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Course overview */}
          <div>
            <h3 className="text-lg font-medium text-aptiv-gray-700 mb-2">Course Overview</h3>
            <p className="text-aptiv-gray-600">{course.description}</p>
            
            <div className="flex flex-wrap gap-2 mt-3">
              {course.tags.map((tag, i) => (
                <Badge key={i} variant="outline" className="bg-aptiv/10 text-aptiv border-0">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <Separator />
          
          {/* Course details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-aptiv mr-2" />
              <div>
                <p className="text-sm font-medium text-aptiv-gray-700">Duration</p>
                <p className="text-aptiv-gray-500">{course.duration}</p>
              </div>
            </div>
            
            {course.level && (
              <div className="flex items-center">
                <GraduationCap className="w-5 h-5 text-aptiv mr-2" />
                <div>
                  <p className="text-sm font-medium text-aptiv-gray-700">Level</p>
                  <p className="text-aptiv-gray-500">{course.level}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-aptiv mr-2" />
              <div>
                <p className="text-sm font-medium text-aptiv-gray-700">Format</p>
                <p className="text-aptiv-gray-500">{course.format}</p>
              </div>
            </div>
            
            {course.participants && (
              <div className="flex items-center">
                <Users className="w-5 h-5 text-aptiv mr-2" />
                <div>
                  <p className="text-sm font-medium text-aptiv-gray-700">Participants</p>
                  <p className="text-aptiv-gray-500">{course.participants}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Course start dates if available */}
          {course.startDates && course.startDates.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-aptiv-gray-700 mb-2">Upcoming Start Dates</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {course.startDates.map((date, index) => (
                  <div key={index} className="bg-aptiv/5 p-2 rounded-md text-center">
                    <p className="text-aptiv-gray-700">{date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Prerequisites if available */}
          {course.prerequisites && course.prerequisites.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-aptiv-gray-700 mb-2">Prerequisites</h3>
              <ul className="list-disc pl-5 space-y-1">
                {course.prerequisites.map((prereq, index) => (
                  <li key={index} className="text-aptiv-gray-600">{prereq}</li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Course syllabus if available */}
          {course.syllabus && course.syllabus.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-aptiv-gray-700 mb-2">Course Syllabus</h3>
              <ul className="space-y-2">
                {course.syllabus.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-aptiv/10 text-aptiv flex items-center justify-center mr-2 text-xs">
                      {index + 1}
                    </span>
                    <span className="text-aptiv-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Learning outcomes if available */}
          {course.learningOutcomes && course.learningOutcomes.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-aptiv-gray-700 mb-2">Learning Outcomes</h3>
              <ul className="space-y-2">
                {course.learningOutcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-aptiv-gray-600">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button 
            variant="outline" 
            className="flex items-center"
            onClick={() => window.open("https://example.com/course-catalog", "_blank")}
          >
            Provider Website
            <ExternalLink className="ml-1 h-4 w-4" />
          </Button>
          <Button 
            className="bg-aptiv hover:bg-aptiv-dark"
            onClick={() => {
              onEnroll(course.title);
              onOpenChange(false);
            }}
          >
            Enroll Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
