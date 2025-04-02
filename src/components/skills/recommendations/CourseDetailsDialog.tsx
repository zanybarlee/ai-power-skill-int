
import React from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { CourseDetailsHeader } from "./course-details/CourseDetailsHeader";
import { CourseContent } from "./course-details/CourseContent";
import { CourseActions } from "./course-details/CourseActions";
import { type CourseDetailsDialogProps } from "./course-details/types";

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
        <CourseDetailsHeader title={course.title} provider={course.provider} />
        <CourseContent course={course} />
        <CourseActions 
          onEnroll={onEnroll} 
          courseTitle={course.title} 
          onOpenChange={onOpenChange} 
        />
      </DialogContent>
    </Dialog>
  );
};
