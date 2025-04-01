
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TextInput } from "@/components/job-descriptions/text-input/TextInput";

interface JobTextTabProps {
  isProcessing: boolean;
  textInput: string;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (employerProfileId?: string) => Promise<void>;
}

export const JobTextTab = ({ isProcessing, textInput, onTextChange, onSubmit }: JobTextTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Paste Job Description</CardTitle>
        <CardDescription>
          Paste the job description text directly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TextInput
          isProcessing={isProcessing}
          textInput={textInput}
          onTextChange={onTextChange}
          onSubmit={onSubmit}
        />
      </CardContent>
    </Card>
  );
};
