
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEmployerProfiles } from "./hooks/useEmployerProfiles";
import { useState } from "react";

interface TextInputProps {
  isProcessing: boolean;
  textInput: string;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (employerProfileId?: string) => Promise<void>;
}

export const TextInput = ({ isProcessing, textInput, onTextChange, onSubmit }: TextInputProps) => {
  const { profiles, isLoading: isLoadingProfiles } = useEmployerProfiles();
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
        <div className="w-full">
          <p className="text-xs text-gray-500 mb-1">Select Employer Profile</p>
          <Select 
            value={selectedEmployerProfileId} 
            onValueChange={setSelectedEmployerProfileId}
            disabled={isLoadingProfiles || isProcessing}
          >
            <SelectTrigger className="w-full bg-white border-aptiv/20">
              <SelectValue placeholder="Select employer profile" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {profiles?.map((profile) => (
                <SelectItem key={profile.id} value={profile.id}>
                  {profile.company_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button
          onClick={() => onSubmit(selectedEmployerProfileId)}
          disabled={isProcessing || !textInput.trim()}
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
      </div>
    </div>
  );
};
