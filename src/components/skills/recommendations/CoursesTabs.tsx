
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Users } from "lucide-react";
import { CoursesTabContent } from "./CoursesTabContent";

interface CoursesTabsProps {
  courseTab: string;
  setCourseTab: (tab: string) => void;
  individualCourses: any[];
  teamCourses: any[];
  onEnroll: (courseTitle: string) => void;
  onViewDetails: (course: any) => void;
}

export const CoursesTabs = ({
  courseTab,
  setCourseTab,
  individualCourses,
  teamCourses,
  onEnroll,
  onViewDetails,
}: CoursesTabsProps) => {
  return (
    <Tabs defaultValue="individual" value={courseTab} onValueChange={setCourseTab}>
      <TabsList className="mb-4">
        <TabsTrigger value="individual" className="data-[state=active]:bg-aptiv data-[state=active]:text-white">
          <BookOpen className="w-4 h-4 mr-2" />
          Individual Courses
        </TabsTrigger>
        <TabsTrigger value="team" className="data-[state=active]:bg-aptiv data-[state=active]:text-white">
          <Users className="w-4 h-4 mr-2" />
          Team Programs
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="individual">
        <CoursesTabContent 
          courses={individualCourses} 
          onEnroll={onEnroll} 
          onViewDetails={onViewDetails} 
        />
      </TabsContent>
      
      <TabsContent value="team">
        <CoursesTabContent 
          courses={teamCourses} 
          onEnroll={onEnroll} 
          onViewDetails={onViewDetails} 
          isTeamCourses 
        />
      </TabsContent>
    </Tabs>
  );
};
