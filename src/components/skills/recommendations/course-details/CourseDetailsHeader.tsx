
import React from "react";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface CourseDetailsHeaderProps {
  title: string;
  provider: string;
}

export const CourseDetailsHeader = ({
  title,
  provider,
}: CourseDetailsHeaderProps) => {
  return (
    <DialogHeader>
      <div className="flex items-center justify-between">
        <DialogTitle className="text-xl font-semibold text-aptiv-gray-700">
          {title}
        </DialogTitle>
        <DialogClose asChild>
          <Button variant="ghost" className="h-8 w-8 p-0" aria-label="Close">
            <X className="h-4 w-4" />
          </Button>
        </DialogClose>
      </div>
      <DialogDescription className="text-aptiv-gray-500">
        Provided by {provider}
      </DialogDescription>
    </DialogHeader>
  );
};
