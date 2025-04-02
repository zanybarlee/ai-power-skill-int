import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Users, GraduationCap, ExternalLink, Clock, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CourseDetailsDialog } from "./recommendations/CourseDetailsDialog";

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

  const individualCourses = [
    {
      id: "course-1",
      title: "Cloud Architecture Fundamentals",
      provider: "AWS Training",
      duration: "4 weeks",
      level: "Intermediate",
      format: "Online, self-paced",
      tags: ["Technical", "Cloud", "Architecture"],
      description: "Learn the fundamental principles and best practices for designing scalable and reliable cloud solutions.",
      startDates: ["June 15, 2024", "July 1, 2024", "August 15, 2024"],
      prerequisites: [
        "Basic understanding of cloud computing concepts",
        "Familiarity with IT infrastructure components"
      ],
      syllabus: [
        "Introduction to Cloud Architecture",
        "AWS Core Services and Infrastructure",
        "Designing for High Availability",
        "Security Best Practices",
        "Cost Optimization Strategies",
        "Scalability and Performance"
      ],
      learningOutcomes: [
        "Design resilient and cost-effective cloud architectures",
        "Implement security controls for cloud deployments",
        "Optimize cloud resources for performance and cost",
        "Apply architectural patterns for common use cases"
      ]
    },
    {
      id: "course-2",
      title: "Kubernetes Certification Prep",
      provider: "Cloud Native Computing Foundation",
      duration: "6 weeks",
      level: "Advanced",
      format: "Online with labs",
      tags: ["Technical", "DevOps", "Kubernetes"],
      description: "Prepare for the Certified Kubernetes Administrator (CKA) exam with hands-on labs and expert guidance.",
      startDates: ["July 10, 2024", "August 5, 2024"],
      prerequisites: [
        "Experience with Linux command line",
        "Basic understanding of containerization",
        "Familiarity with YAML and networking concepts"
      ],
      syllabus: [
        "Kubernetes Architecture",
        "Cluster Installation and Configuration",
        "Workloads & Scheduling",
        "Services & Networking",
        "Storage",
        "Security",
        "Troubleshooting"
      ],
      learningOutcomes: [
        "Deploy and manage production-ready Kubernetes clusters",
        "Troubleshoot common cluster issues",
        "Implement security best practices",
        "Pass the CKA certification exam"
      ]
    },
    {
      id: "course-3",
      title: "Strategic Leadership for Managers",
      provider: "Harvard Business School Online",
      duration: "8 weeks",
      level: "Intermediate to Advanced",
      format: "Blended learning",
      tags: ["Leadership", "Strategy", "Management"],
      description: "Develop the strategic thinking skills needed to lead teams effectively and drive organizational success.",
      startDates: ["June 20, 2024", "September 1, 2024"],
      prerequisites: [
        "3+ years of management experience",
        "Basic understanding of organizational behavior"
      ],
      syllabus: [
        "Strategic Thinking Fundamentals",
        "Decision Making Under Uncertainty",
        "Leading Change and Innovation",
        "Building High-Performance Teams",
        "Effective Communication Strategies",
        "Organizational Alignment"
      ],
      learningOutcomes: [
        "Develop and implement organizational strategies",
        "Lead teams through change and uncertainty",
        "Make data-driven decisions for business growth",
        "Communicate vision effectively across the organization"
      ]
    }
  ];

  const teamCourses = [
    {
      id: "team-1",
      title: "Agile Team Development Workshop",
      provider: "Agile Transformation Institute",
      duration: "2 days",
      participants: "5-15 team members",
      format: "In-person or virtual",
      tags: ["Team", "Agile", "Collaboration"],
      description: "A collaborative workshop designed to enhance team dynamics and implement agile methodologies effectively.",
      startDates: ["July 25-26, 2024", "August 15-16, 2024"],
      syllabus: [
        "Agile Principles and Mindset",
        "Team Roles and Responsibilities",
        "Sprint Planning and Execution",
        "Retrospectives and Continuous Improvement",
        "Conflict Resolution in Agile Teams",
        "Measuring Team Performance"
      ],
      learningOutcomes: [
        "Implement Agile methodologies effectively as a team",
        "Improve team collaboration and communication",
        "Establish consistent sprint processes",
        "Develop a continuous improvement culture"
      ]
    },
    {
      id: "team-2",
      title: "Cloud Migration Strategy for Teams",
      provider: "Google Cloud Training",
      duration: "3 weeks",
      participants: "Engineering teams",
      format: "Virtual classroom",
      tags: ["Technical", "Cloud", "Team"],
      description: "A comprehensive program to upskill entire engineering teams on cloud migration strategies and best practices.",
      startDates: ["August 1, 2024", "September 15, 2024"],
      prerequisites: [
        "Basic cloud computing knowledge",
        "Experience with current system architecture"
      ],
      syllabus: [
        "Assessing Migration Readiness",
        "Planning the Migration Process",
        "Cloud Infrastructure Design",
        "Application Modernization",
        "Data Migration Strategies",
        "Post-Migration Optimization"
      ],
      learningOutcomes: [
        "Create comprehensive cloud migration plans",
        "Implement effective migration strategies",
        "Modernize applications for cloud environments",
        "Optimize post-migration performance and cost"
      ]
    }
  ];

  const upcomingEvents = [
    {
      id: "event-1",
      title: "AI in Enterprise: Practical Applications",
      type: "Webinar",
      date: "June 28, 2024",
      time: "2:00 PM - 3:30 PM",
      host: "Industry AI Leaders Panel"
    },
    {
      id: "event-2",
      title: "Leadership Summit 2024",
      type: "Conference",
      date: "July 15-16, 2024",
      time: "All day",
      host: "Executive Leadership Association"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Training Recommendations */}
      <Card className="p-6 bg-white border-aptiv/10">
        <h3 className="text-lg font-medium text-aptiv-gray-700 mb-4">Recommended Training</h3>
        
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
            <div className="space-y-4">
              {individualCourses.map((course) => (
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
                      <GraduationCap className="w-3.5 h-3.5 mr-1" />
                      {course.level}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {course.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-aptiv/10 text-aptiv px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      className="bg-aptiv hover:bg-aptiv-dark"
                      onClick={() => handleEnroll(course.title)}
                    >
                      Enroll Now
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleViewDetails(course)}
                    >
                      Learn More <ExternalLink className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="team">
            <div className="space-y-4">
              {teamCourses.map((course) => (
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
                      <Users className="w-3.5 h-3.5 mr-1" />
                      {course.participants}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {course.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-aptiv/10 text-aptiv px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button className="bg-aptiv hover:bg-aptiv-dark">
                      Request for Team
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleViewDetails(course)}
                    >
                      Learn More <ExternalLink className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
      
      {/* Upcoming Events */}
      <Card className="p-6 bg-white border-aptiv/10">
        <h3 className="text-lg font-medium text-aptiv-gray-700 mb-4">Upcoming Learning Events</h3>
        
        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="flex border-b border-aptiv/10 pb-3 last:border-0">
              <div className="bg-aptiv/10 text-aptiv p-2 rounded-lg mr-4 h-fit">
                <Calendar className="w-6 h-6" />
              </div>
              
              <div className="flex-1">
                <h4 className="font-medium text-aptiv-gray-700">{event.title}</h4>
                <p className="text-xs text-aptiv-gray-500">{event.type} | {event.host}</p>
                
                <div className="flex items-center mt-1 text-xs text-aptiv-gray-500">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  {event.date}, {event.time}
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="h-fit">
                Register
              </Button>
            </div>
          ))}
        </div>
      </Card>
      
      {/* Personalized Development Plan */}
      <Card className="p-6 bg-white border-aptiv/10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-medium text-aptiv-gray-700">Your Development Plan</h3>
            <p className="text-sm text-aptiv-gray-500">
              A customized learning path based on your skill gaps and career goals
            </p>
          </div>
          <Button variant="outline" size="sm">
            Edit Plan
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="border-l-4 border-aptiv pl-4">
            <h4 className="font-medium text-aptiv-gray-700">Short-term (1-3 months)</h4>
            <ul className="mt-2 space-y-2">
              <li className="text-sm text-aptiv-gray-600">Complete "Cloud Architecture Fundamentals" course</li>
              <li className="text-sm text-aptiv-gray-600">Participate in weekly hands-on lab sessions</li>
              <li className="text-sm text-aptiv-gray-600">Shadow senior architect on current project</li>
            </ul>
          </div>
          
          <div className="border-l-4 border-aptiv-gray-300 pl-4">
            <h4 className="font-medium text-aptiv-gray-700">Medium-term (3-6 months)</h4>
            <ul className="mt-2 space-y-2">
              <li className="text-sm text-aptiv-gray-600">Begin Kubernetes certification preparation</li>
              <li className="text-sm text-aptiv-gray-600">Attend Strategic Leadership workshop</li>
              <li className="text-sm text-aptiv-gray-600">Lead a small technical project applying new skills</li>
            </ul>
          </div>
          
          <div className="border-l-4 border-aptiv-gray-300 pl-4">
            <h4 className="font-medium text-aptiv-gray-700">Long-term (6-12 months)</h4>
            <ul className="mt-2 space-y-2">
              <li className="text-sm text-aptiv-gray-600">Obtain Kubernetes Administrator certification</li>
              <li className="text-sm text-aptiv-gray-600">Complete advanced cloud architecture coursework</li>
              <li className="text-sm text-aptiv-gray-600">Mentor junior team members in cloud technologies</li>
            </ul>
          </div>
        </div>
      </Card>
      
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
