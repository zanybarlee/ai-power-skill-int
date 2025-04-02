
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { AssessmentQuestionsProps, Question } from "./types";
import { ProgressHeader } from "./ProgressHeader";
import { QuestionCard } from "./QuestionCard";
import { NavigationButtons } from "./NavigationButtons";

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
        <ProgressHeader 
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          assessmentTitle={assessmentTitle}
          progress={progress}
        />
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleNext)} className="space-y-6">
            <QuestionCard 
              question={currentQuestion}
              form={form}
            />
            
            <NavigationButtons 
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              onPrevious={handlePrevious}
              onCancel={onCancel}
              isSubmitDisabled={!form.watch("answer")}
              isLastQuestion={currentQuestionIndex === questions.length - 1}
            />
          </form>
        </Form>
      </Card>
    </div>
  );
};
