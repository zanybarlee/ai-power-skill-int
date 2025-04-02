
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
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
  const [processedCVContent, setProcessedCVContent] = useState<string>('');
  const [isBlindingCV, setIsBlindingCV] = useState(false);

  useEffect(() => {
    if (open && candidateId) {
      fetchCandidateDetails();
    }
  }, [open, candidateId]);

  useEffect(() => {
    if (candidateDetails?.cv_content) {
      processCV();
    }
  }, [candidateDetails, showContact]);

  const fetchCandidateDetails = async () => {
    try {
      setIsLoading(true);
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

  const processCV = async () => {
    if (!candidateDetails.cv_content) {
      setProcessedCVContent('No CV content available');
      return;
    }
    
    if (showContact) {
      // If showing contact info, don't blind the CV
      setProcessedCVContent(candidateDetails.cv_content);
      return;
    }
    
    try {
      setIsBlindingCV(true);
      
      // Call the blind-cv API endpoint with the updated URL
      const response = await fetch('http://localhost:9000/blind-cv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cv_content: candidateDetails.cv_content
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to blind CV content');
      }
      
      const data = await response.json();
      setProcessedCVContent(data.blind_cv_content);
    } catch (error) {
      console.error('Error blinding CV content:', error);
      // Fallback message if API fails
      setProcessedCVContent('Error processing CV content. Some personal information may be visible.');
      toast({
        title: "Warning",
        description: "Could not properly blind the CV content.",
        variant: "destructive",
      });
    } finally {
      setIsBlindingCV(false);
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
            
            {isBlindingCV ? (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">CV Content</h3>
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-aptiv" />
                  <span className="ml-2 text-gray-600">Processing CV content...</span>
                </div>
              </div>
            ) : (
              <CVContent content={processedCVContent} />
            )}
            
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
