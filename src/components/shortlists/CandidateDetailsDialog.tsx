
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CandidateContactInfo } from "./candidate-details/CandidateContactInfo";
import { CandidateSkills } from "./candidate-details/CandidateSkills";
import { CandidateExperienceEducation } from "./candidate-details/CandidateExperienceEducation";
import { CandidateCertifications } from "./candidate-details/CandidateCertifications";
import { CandidateAdditionalInfo } from "./candidate-details/CandidateAdditionalInfo";
import { CandidateContent } from "./candidate-details/CandidateContent";

interface CandidateDetails {
  name: string;
  email: string;
  phone: string;
  location: string;
  experience: number;
  skills: string[];
  education: string;
  certifications: string[];
  cv_content: string;
  match_score: number;
  job_description: string;
  matched_at: string;
  nationality?: string;
  current_salary?: number;
  expected_salary?: number;
  notice_period?: string;
}

interface CandidateDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: CandidateDetails | null;
}

export const CandidateDetailsDialog = ({
  isOpen,
  onClose,
  candidate,
}: CandidateDetailsDialogProps) => {
  if (!candidate) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden bg-white border border-aptiv/20 shadow-lg">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-semibold text-aptiv-gray-700">
            {candidate.name}
          </DialogTitle>
          <DialogDescription className="text-aptiv-gray-500">
            Match Score: {candidate.match_score}%
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-full max-h-[calc(80vh-140px)] pr-4">
          <div className="space-y-6">
            <CandidateContactInfo
              email={candidate.email}
              phone={candidate.phone}
              location={candidate.location}
              matched_at={candidate.matched_at}
            />

            <CandidateSkills skills={candidate.skills} />

            <CandidateExperienceEducation
              experience={candidate.experience}
              education={candidate.education}
            />

            <CandidateCertifications certifications={candidate.certifications} />

            <CandidateAdditionalInfo
              nationality={candidate.nationality}
              current_salary={candidate.current_salary}
              expected_salary={candidate.expected_salary}
              notice_period={candidate.notice_period}
            />

            <CandidateContent title="CV Content" content={candidate.cv_content} />
            
            <CandidateContent title="Job Description" content={candidate.job_description} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
