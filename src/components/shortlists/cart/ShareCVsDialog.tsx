
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Send, Loader2, Shield } from "lucide-react";
import { MatchedCandidate } from "@/hooks/shortlists/types";

interface ShareCVsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidates: MatchedCandidate[];
}

export function ShareCVsDialog({ open, onOpenChange, candidates }: ShareCVsDialogProps) {
  const { toast } = useToast();
  const { clearCart } = useCart();
  const [isSharing, setIsSharing] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [subject, setSubject] = useState("Candidate CVs for your review");
  const [message, setMessage] = useState(`Hello,\n\nI'm sharing ${candidates.length} candidate CVs for your consideration.\n\nBest regards,`);
  const [blindContactInfo, setBlindContactInfo] = useState(true);
  
  const handleShare = async () => {
    if (!recipientEmail) {
      toast({
        title: "Missing information",
        description: "Please enter a recipient email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSharing(true);
    
    try {
      // Here you would integrate with your email service or API
      // For now we'll just simulate a successful share
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update status of shared candidates in the database (mock for now)
      // In a real implementation, you would update the status in your database
      
      toast({
        title: "CVs shared successfully",
        description: `${candidates.length} candidate CVs have been shared with ${recipientEmail}.`,
      });
      
      // Close the dialog
      onOpenChange(false);
      
      // Clear the cart
      clearCart();
      
    } catch (error) {
      console.error("Error sharing CVs:", error);
      toast({
        title: "Error",
        description: "Failed to share candidate CVs. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Share Candidate CVs</DialogTitle>
          <DialogDescription>
            Share {candidates.length} candidate CVs with the employer
          </DialogDescription>
        </DialogHeader>
        
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
