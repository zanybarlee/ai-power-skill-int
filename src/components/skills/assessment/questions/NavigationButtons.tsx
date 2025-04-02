
import { Button } from "@/components/ui/button";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { NavigationButtonsProps } from "./types";

export const NavigationButtons = ({ 
  currentQuestionIndex, 
  totalQuestions, 
  onPrevious, 
  onCancel, 
  isSubmitDisabled, 
  isLastQuestion 
}: NavigationButtonsProps) => {
  return (
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
          onClick={onPrevious}
          disabled={currentQuestionIndex === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
      </div>
      
      <Button 
        type="submit"
        className="bg-aptiv hover:bg-aptiv-dark"
        disabled={isSubmitDisabled}
      >
        {isLastQuestion ? (
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
  );
};
