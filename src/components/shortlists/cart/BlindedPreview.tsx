
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { BasicInformation } from "./preview/BasicInformation";
import { ContactInformation } from "./preview/ContactInformation";
import { SkillsSection } from "./preview/SkillsSection";
import { CVContent } from "./preview/CVContent";
import { MatchInformation } from "./preview/MatchInformation";
import { extractJobTitle } from "./utils/blindingUtils";

interface BlindedPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidateId: string;
}

export function BlindedPreview({ open, onOpenChange, candidateId }: BlindedPreviewProps) {
  const { toast } = useToast();
  const [candidateDetails, setCandidateDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    if (open && candidateId) {
      fetchCandidateDetails();
    }
  }, [open, candidateId]);

  const fetchCandidateDetails = async () => {
    try {
      setIsLoading(true);
      // First try to get from cv_match table (for shortlisted candidates)
      const { data: matchData, error: matchError } = await supabase
        .from('cv_match')
        .select('*, cv_metadata(*), job_description_id, job_description, job_role, user_id, status')
        .eq('id', candidateId)
        .maybeSingle();

      if (matchError) {
        throw matchError;
      }

      if (matchData) {
        const details = {
          ...matchData.cv_metadata,
          match_score: matchData.match_score,
          job_description: matchData.job_description,
          job_title: extractJobTitle(matchData.job_description),
          job_id: matchData.job_description_id,
          matched_at: matchData.matched_at,
          job_role: matchData.job_role,
          status: matchData.status || 'matched'
        };
        
        setCandidateDetails(details);
      }
    } catch (error) {
      console.error('Error fetching candidate details:', error);
      toast({
        title: "Error",
        description: "Failed to load candidate details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Loading candidate details...</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  if (!candidateDetails) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
          </DialogHeader>
          <p>Could not load candidate details. Please try again.</p>
        </DialogContent>
      </Dialog>
    );
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
            {/* Basic Information */}
            <BasicInformation 
              name={candidateDetails.name}
              role={candidateDetails.job_role || candidateDetails.role || 'Not specified'}
              location={candidateDetails.location}
              experience={candidateDetails.experience}
              showContact={showContact}
            />
            
            {/* Contact Information */}
            <ContactInformation 
              email={candidateDetails.email}
              phone={candidateDetails.phone}
              showContact={showContact}
            />
            
            {/* Skills */}
            <SkillsSection 
              skills={candidateDetails.skills && Array.isArray(candidateDetails.skills) 
                ? candidateDetails.skills 
                : []}
            />
            
            {/* CV Content */}
            <CVContent 
              content={candidateDetails.cv_content}
              showContact={showContact}
              candidateName={candidateDetails.name}
            />
            
            {/* Match Information */}
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
