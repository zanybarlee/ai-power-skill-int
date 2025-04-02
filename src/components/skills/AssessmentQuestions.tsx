
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { useForm } from "react-hook-form";
import { CheckCircle, ChevronLeft, ChevronRight, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    value: number;
  }[];
}

interface AssessmentQuestionsProps {
  assessmentId: string;
  assessmentTitle: string;
  onComplete: (results: any) => void;
  onCancel: () => void;
}

export const AssessmentQuestions = ({
  assessmentId,
  assessmentTitle,
  onComplete,
  onCancel
}: AssessmentQuestionsProps) => {
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  // Mock questions based on assessment ID
  const questions: Question[] = [
    {
      id: "q1",
      text: "How would you rate your proficiency in designing scalable software architecture?",
      options: [
        { id: "a1", text: "Beginner - Basic understanding", value: 1 },
        { id: "a2", text: "Intermediate - Can implement with guidance", value: 2 },
        { id: "a3", text: "Advanced - Can implement independently", value: 3 },
        { id: "a4", text: "Expert - Can teach others and lead initiatives", value: 4 }
      ]
    },
    {
      id: "q2",
      text: "How comfortable are you with implementing CI/CD pipelines?",
      options: [
        { id: "a1", text: "Beginner - Familiar with concepts only", value: 1 },
        { id: "a2", text: "Intermediate - Have set up basic pipelines", value: 2 },
        { id: "a3", text: "Advanced - Regular implementation experience", value: 3 },
        { id: "a4", text: "Expert - Design and optimize complex pipelines", value: 4 }
      ]
    },
    {
      id: "q3",
      text: "Rate your experience with cloud-native application development:",
      options: [
        { id: "a1", text: "Beginner - Theoretical knowledge only", value: 1 },
        { id: "a2", text: "Intermediate - Some practical experience", value: 2 },
        { id: "a3", text: "Advanced - Multiple project implementations", value: 3 },
        { id: "a4", text: "Expert - Architect cloud solutions regularly", value: 4 }
      ]
    },
    {
      id: "q4",
      text: "How would you rate your ability to optimize application performance?",
      options: [
        { id: "a1", text: "Beginner - Aware of basic concepts", value: 1 },
        { id: "a2", text: "Intermediate - Can implement common optimizations", value: 2 },
        { id: "a3", text: "Advanced - Systematic approach to performance tuning", value: 3 },
        { id: "a4", text: "Expert - Deep understanding of all performance aspects", value: 4 }
      ]
    },
    {
      id: "q5",
      text: "How proficient are you with containerization technologies (Docker, Kubernetes)?",
      options: [
        { id: "a1", text: "Beginner - Familiar with concepts", value: 1 },
        { id: "a2", text: "Intermediate - Basic container deployment", value: 2 },
        { id: "a3", text: "Advanced - Orchestration and management", value: 3 },
        { id: "a4", text: "Expert - Complex deployments and custom configurations", value: 4 }
      ]
    }
  ];

  const form = useForm({
    defaultValues: {
      answer: ""
    }
  });

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleNext = (data: { answer: string }) => {
    // Save the answer
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: data.answer
    }));
    
    // Reset form for next question
    form.reset();
    
    // Move to next question or complete
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(current => current + 1);
    } else {
      // Calculate results
      const results = {
        assessmentId,
        score: calculateScore(),
        completedDate: new Date().toISOString().split('T')[0],
        answers
      };
      
      toast({
        title: "Assessment Completed",
        description: "Your assessment has been submitted successfully.",
      });
      
      onComplete(results);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(current => current - 1);
      // Pre-fill with previous answer if exists
      if (answers[questions[currentQuestionIndex - 1].id]) {
        form.setValue("answer", answers[questions[currentQuestionIndex - 1].id]);
      }
    }
  };
  
  const calculateScore = () => {
    let totalScore = 0;
    let maxPossibleScore = questions.length * 4; // Assuming max score per question is 4
    
    Object.entries(answers).forEach(([questionId, answerId]) => {
      const question = questions.find(q => q.id === questionId);
      if (question) {
        const selectedOption = question.options.find(o => o.id === answerId);
        if (selectedOption) {
          totalScore += selectedOption.value;
        }
      }
    });
    
    return Math.round((totalScore / maxPossibleScore) * 100);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white border-aptiv/10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-aptiv-gray-700">{assessmentTitle}</h3>
          <span className="text-sm text-aptiv-gray-500">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
        </div>
        
        <Progress value={progress} className="h-2 mb-6" />
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleNext)} className="space-y-6">
            <div className="mb-8">
              <h4 className="text-base font-medium mb-4 text-aptiv-gray-700">
                {currentQuestion.text}
              </h4>
              
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        className="space-y-3"
                      >
                        {currentQuestion.options.map((option) => (
                          <div key={option.id} className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-gray-50">
                            <RadioGroupItem value={option.id} id={option.id} />
                            <FormLabel htmlFor={option.id} className="w-full cursor-pointer font-normal">
                              {option.text}
                            </FormLabel>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-between">
              <div>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={onCancel}
                  className="mr-2"
                >
                  Cancel
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
              </div>
              
              <Button 
                type="submit"
                className="bg-aptiv hover:bg-aptiv-dark"
                disabled={!form.watch("answer")}
              >
                {currentQuestionIndex === questions.length - 1 ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};
