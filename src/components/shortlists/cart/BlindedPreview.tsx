
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { BasicInformation } from "./preview/BasicInformation";
import { ContactInformation } from "./preview/ContactInformation";
import { SkillsSection } from "./preview/SkillsSection";
import { MatchInformation } from "./preview/MatchInformation";
import { LoadingState } from "./components/LoadingState";
import { ErrorState } from "./components/ErrorState";
import { CVContentWithLoading } from "./components/CVContentWithLoading";
import { useBlindedCandidate } from "./hooks/useBlindedCandidate";

interface BlindedPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidateId: string;
}

export function BlindedPreview({ open, onOpenChange, candidateId }: BlindedPreviewProps) {
  const [showContact, setShowContact] = useState(false);
  
  const {
    candidateDetails,
    isLoading,
    processedCVContent,
    isBlindingCV
  } = useBlindedCandidate(candidateId, open, showContact);

  if (isLoading) {
    return <LoadingState open={open} onOpenChange={onOpenChange} />;
  }

  if (!candidateDetails) {
    return <ErrorState open={open} onOpenChange={onOpenChange} />;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl">
            Blinded CV Preview: {showContact ? candidateDetails.name : '[NAME REDACTED]'}
          </DialogTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowContact(!showContact)}
            className="ml-auto"
          >
            {showContact ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Hide Contact Info
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Show Contact Info
              </>
            )}
          </Button>
        </DialogHeader>

        <ScrollArea className="h-[calc(80vh-150px)] pr-4">
          <div className="space-y-6">
            <BasicInformation 
              name={candidateDetails.name}
              role={candidateDetails.job_role || candidateDetails.role || 'Not specified'}
              location={candidateDetails.location}
              experience={candidateDetails.experience}
              showContact={showContact}
            />
            
            <ContactInformation 
              email={candidateDetails.email}
              phone={candidateDetails.phone}
              showContact={showContact}
            />
            
            <SkillsSection 
              skills={candidateDetails.skills && Array.isArray(candidateDetails.skills) 
                ? candidateDetails.skills 
                : []}
            />
            
            <CVContentWithLoading 
              content={processedCVContent} 
              isLoading={isBlindingCV} 
            />
            
            <MatchInformation 
              matchScore={candidateDetails.match_score}
              jobTitle={candidateDetails.job_title}
              matchedAt={candidateDetails.matched_at}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
