
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff } from "lucide-react";

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

  const extractJobTitle = (jobDescription?: string): string => {
    if (!jobDescription) return 'Unknown Job';
    
    const dashIndex = jobDescription.indexOf('-');
    if (dashIndex > 0) {
      return jobDescription.substring(0, dashIndex).trim();
    } else {
      return jobDescription.length > 50 
        ? jobDescription.substring(0, 50) + '...' 
        : jobDescription;
    }
  };

  // Function to blind sensitive information
  const blindText = (text: string) => {
    if (!text) return '';
    
    // Blind email addresses
    let blinded = text.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL REDACTED]');
    
    // Blind phone numbers (various formats)
    blinded = blinded.replace(/(\+\d{1,3}[ -]?)?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}/g, '[PHONE REDACTED]');
    blinded = blinded.replace(/(\+\d{1,3}[ -]?)?\d{5,}/g, '[PHONE REDACTED]');
    
    // Blind addresses (simplistic approach)
    blinded = blinded.replace(/\d+\s+[A-Za-z]+\s+(Avenue|Ave|Street|St|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr|Court|Ct|Plaza|Plz|Terrace|Ter|Way)\b/gi, '[ADDRESS REDACTED]');
    
    // Blind names (this assumes the candidate's name is already known and is passed to this function)
    if (candidateDetails && candidateDetails.name) {
      const nameParts = candidateDetails.name.split(' ');
      for (const part of nameParts) {
        if (part.length > 2) { // Avoid replacing very short words that might be common
          const nameRegex = new RegExp(`\\b${part}\\b`, 'gi');
          blinded = blinded.replace(nameRegex, '[NAME REDACTED]');
        }
      }
    }
    
    return blinded;
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
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name:</p>
                  <p className="font-medium">
                    {showContact ? candidateDetails.name || 'Unknown' : '[NAME REDACTED]'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Role:</p>
                  <p className="font-medium">{candidateDetails.job_role || candidateDetails.role || 'Not specified'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Location:</p>
                  <p className="font-medium">
                    {showContact ? candidateDetails.location || 'Not specified' : '[LOCATION REDACTED]'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Experience:</p>
                  <p className="font-medium">{candidateDetails.experience ? `${candidateDetails.experience} years` : 'Not specified'}</p>
                </div>
              </div>
            </div>
            
            {/* Contact Information - conditionally displayed */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Contact Information</h3>
              {showContact ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Email:</p>
                    <p className="font-medium">{candidateDetails.email || 'Not provided'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Phone:</p>
                    <p className="font-medium">{candidateDetails.phone || 'Not provided'}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-2 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-yellow-700">
                    <EyeOff className="h-4 w-4 inline-block mr-2" />
                    Contact information is hidden for candidate privacy
                  </p>
                </div>
              )}
            </div>
            
            {/* Skills */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {candidateDetails.skills && Array.isArray(candidateDetails.skills) ? 
                  candidateDetails.skills.map((skill: string, i: number) => (
                    <Badge 
                      key={i} 
                      variant="outline" 
                      className="bg-aptiv/5 text-aptiv border-aptiv/20"
                    >
                      {skill}
                    </Badge>
                  )) : 
                  <p className="text-gray-500">No skills listed</p>
                }
              </div>
            </div>
            
            {/* CV Content */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">CV Content</h3>
              <div className="whitespace-pre-wrap text-gray-700 text-sm">
                {showContact ? 
                  candidateDetails.cv_content || 'No CV content available' : 
                  blindText(candidateDetails.cv_content) || 'No CV content available'
                }
              </div>
            </div>
            
            {/* Match Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Match Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Match Score:</p>
                  <p className="font-medium text-aptiv">{Math.round(candidateDetails.match_score || 0)}%</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Job Title:</p>
                  <p className="font-medium">{candidateDetails.job_title || 'Not specified'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Matched At:</p>
                  <p className="font-medium">
                    {candidateDetails.matched_at ? 
                      new Date(candidateDetails.matched_at).toLocaleDateString() : 
                      'Unknown'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
