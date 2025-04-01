
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { ProfileSelector } from "./ProfileSelector";
import { useState } from "react";

interface TextInputProps {
  isProcessing: boolean;
  textInput: string;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (employerProfileId?: string) => Promise<void>;
}

export const TextInput = ({ isProcessing, textInput, onTextChange, onSubmit }: TextInputProps) => {
  const [selectedEmployerProfileId, setSelectedEmployerProfileId] = useState<string | undefined>(undefined);

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">Or enter job description text:</p>
      <Textarea
        placeholder="Enter job description here..."
        value={textInput}
        onChange={onTextChange}
        className="min-h-[200px]"
        disabled={isProcessing}
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ProfileSelector 
          selectedEmployerProfileId={selectedEmployerProfileId}
          setSelectedEmployerProfileId={setSelectedEmployerProfileId}
          isDisabled={isProcessing}
        />
        
        <SubmitButton 
          onClick={() => onSubmit(selectedEmployerProfileId)}
          isProcessing={isProcessing}
          isDisabled={isProcessing || !textInput.trim()}
        />
      </div>
    </div>
  );
};

interface SubmitButtonProps {
  onClick: () => void;
  isProcessing: boolean;
  isDisabled: boolean;
}

const SubmitButton = ({ onClick, isProcessing, isDisabled }: SubmitButtonProps) => (
  <Button
    onClick={onClick}
    disabled={isDisabled}
    className="bg-aptiv hover:bg-aptiv/90 w-full"
  >
    {isProcessing ? (
      <>
        <Send className="mr-2 h-4 w-4 animate-spin" />
        Processing...
      </>
    ) : (
      <>
        <Send className="mr-2 h-4 w-4" />
        Process Text
      </>
    )}
  </Button>
);
