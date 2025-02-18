
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface TextInputProps {
  isProcessing: boolean;
  textInput: string;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => Promise<void>;
}

export const TextInput = ({ isProcessing, textInput, onTextChange, onSubmit }: TextInputProps) => {
  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-500">Or enter job description text:</p>
      <Textarea
        placeholder="Enter job description here..."
        value={textInput}
        onChange={onTextChange}
        className="min-h-[200px]"
        disabled={isProcessing}
      />
      <Button
        onClick={onSubmit}
        disabled={isProcessing || !textInput.trim()}
        className="bg-aptiv hover:bg-aptiv/90 w-full sm:w-auto"
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
    </div>
  );
};
