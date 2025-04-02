
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CourseDetailsDialog } from "./recommendations/CourseDetailsDialog";
import { RecommendedCoursesCard } from "./recommendations/RecommendedCoursesCard";
import { UpcomingEventsCard } from "./recommendations/UpcomingEventsCard";
import { DevelopmentPlanCard } from "./recommendations/DevelopmentPlanCard";
import { 
  individualCourses, 
  teamCourses, 
  upcomingEvents 
} from "./recommendations/data/coursesData";

interface SkillsRecommendationsProps {
  userId?: string;
}

export const SkillsRecommendations = ({ userId }: SkillsRecommendationsProps) => {
  const { toast } = useToast();
  const [courseTab, setCourseTab] = useState("individual");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const handleEnroll = (courseName: string) => {
    toast({
      title: "Enrollment Successful",
      description: `You've enrolled in ${courseName}. Check your email for details.`,
    });
  };

  const handleViewDetails = (course: any) => {
    setSelectedCourse(course);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Training Recommendations */}
      <RecommendedCoursesCard
        courseTab={courseTab}
        setCourseTab={setCourseTab}
        individualCourses={individualCourses}
        teamCourses={teamCourses}
        onEnroll={handleEnroll}
        onViewDetails={handleViewDetails}
      />
      
      {/* Upcoming Events */}
      <UpcomingEventsCard events={upcomingEvents} />
      
      {/* Personalized Development Plan */}
      <DevelopmentPlanCard />
      
      {/* Course Details Dialog */}
      <CourseDetailsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        course={selectedCourse}
        onEnroll={handleEnroll}
      />
    </div>
  );
};
