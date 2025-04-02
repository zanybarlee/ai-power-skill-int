
import { Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { MatchedCandidate } from "@/hooks/shortlists/types";

interface ShareCVsFormProps {
  recipientEmail: string;
  setRecipientEmail: (value: string) => void;
  subject: string;
  setSubject: (value: string) => void;
  message: string;
  setMessage: (value: string) => void;
  blindContactInfo: boolean;
  setBlindContactInfo: (value: boolean) => void;
  candidates: MatchedCandidate[];
}

export function ShareCVsForm({
  recipientEmail,
  setRecipientEmail,
  subject,
  setSubject,
  message,
  setMessage,
  blindContactInfo,
  setBlindContactInfo,
  candidates
}: ShareCVsFormProps) {
  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="recipientEmail">Recipient Email</Label>
        <Input
          id="recipientEmail"
          placeholder="employer@company.com"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="blindContactInfo" 
          checked={blindContactInfo}
          onCheckedChange={(checked) => setBlindContactInfo(checked as boolean)}
        />
        <Label 
          htmlFor="blindContactInfo" 
          className="text-sm font-normal cursor-pointer flex items-center"
        >
          <Shield className="h-4 w-4 mr-2 text-amber-500" />
          Blind candidate personal information (name, address, phone, email)
        </Label>
      </div>
      
      <div className="bg-amber-50 p-3 rounded border border-amber-200">
        <p className="text-amber-800 text-sm">
          The following candidate CVs will be shared:
        </p>
        <ul className="mt-2 text-sm text-amber-700 list-disc pl-5">
          {candidates.map((candidate) => (
            <li key={candidate.id}>{candidate.name} - {candidate.role || candidate.job_role || "Not specified"}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
