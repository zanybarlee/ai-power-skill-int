
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";
import { MatchedCandidate } from "@/hooks/shortlists/types";
import { ShareCVsForm } from "./components/ShareCVsForm";
import { useShareCVs } from "./hooks/useShareCVs";

interface ShareCVsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidates: MatchedCandidate[];
}

export function ShareCVsDialog({ open, onOpenChange, candidates }: ShareCVsDialogProps) {
  const {
    isSharing,
    recipientEmail,
    setRecipientEmail,
    subject,
    setSubject,
    message,
    setMessage,
    blindContactInfo,
    setBlindContactInfo,
    handleShare
  } = useShareCVs(candidates, onOpenChange);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Share Candidate CVs</DialogTitle>
          <DialogDescription>
            Share {candidates.length} candidate CVs with the employer
          </DialogDescription>
        </DialogHeader>
        
        <ShareCVsForm
          recipientEmail={recipientEmail}
          setRecipientEmail={setRecipientEmail}
          subject={subject}
          setSubject={setSubject}
          message={message}
          setMessage={setMessage}
          blindContactInfo={blindContactInfo}
          setBlindContactInfo={setBlindContactInfo}
          candidates={candidates}
        />
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSharing}
          >
            Cancel
          </Button>
          <Button
            variant="aptiv"
            onClick={handleShare}
            disabled={isSharing}
          >
            {isSharing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Share CVs
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
