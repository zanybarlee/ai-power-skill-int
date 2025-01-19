import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from 'react-markdown';

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
            <div className="grid grid-cols-2 gap-4 p-4 bg-aptiv/5 rounded-lg">
              <div className="space-y-2">
                <h3 className="font-medium text-aptiv-gray-700">Contact Information</h3>
                <p className="text-sm text-aptiv-gray-600">Email: {candidate.email}</p>
                <p className="text-sm text-aptiv-gray-600">Phone: {candidate.phone}</p>
                <p className="text-sm text-aptiv-gray-600">Location: {candidate.location}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-aptiv-gray-700">Match Details</h3>
                <p className="text-sm text-aptiv-gray-600">
                  Matched At: {new Date(candidate.matched_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="space-y-2 p-4 bg-white rounded-lg border border-aptiv/10">
              <h3 className="font-medium text-aptiv-gray-700">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-aptiv border-aptiv/20 bg-aptiv/5"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2 p-4 bg-white rounded-lg border border-aptiv/10">
              <h3 className="font-medium text-aptiv-gray-700">Experience & Education</h3>
              <div className="text-sm text-aptiv-gray-600">
                <p>Experience: {candidate.experience} years</p>
                <div className="prose prose-sm max-w-none mt-2">
                  <ReactMarkdown>{candidate.education}</ReactMarkdown>
                </div>
              </div>
            </div>

            {candidate.certifications && candidate.certifications.length > 0 && (
              <div className="space-y-2 p-4 bg-white rounded-lg border border-aptiv/10">
                <h3 className="font-medium text-aptiv-gray-700">Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {candidate.certifications.map((cert, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-aptiv border-aptiv/20 bg-aptiv/5"
                    >
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2 p-4 bg-white rounded-lg border border-aptiv/10">
              <h3 className="font-medium text-aptiv-gray-700">Additional Information</h3>
              {candidate.nationality && (
                <p className="text-sm text-aptiv-gray-600">
                  Nationality: {candidate.nationality}
                </p>
              )}
              {candidate.current_salary && (
                <p className="text-sm text-aptiv-gray-600">
                  Current Salary: ${candidate.current_salary.toLocaleString()}
                </p>
              )}
              {candidate.expected_salary && (
                <p className="text-sm text-aptiv-gray-600">
                  Expected Salary: ${candidate.expected_salary.toLocaleString()}
                </p>
              )}
              {candidate.notice_period && (
                <p className="text-sm text-aptiv-gray-600">
                  Notice Period: {candidate.notice_period}
                </p>
              )}
            </div>

            <div className="space-y-2 p-4 bg-white rounded-lg border border-aptiv/10">
              <h3 className="font-medium text-aptiv-gray-700">CV Content</h3>
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown>{candidate.cv_content}</ReactMarkdown>
              </div>
            </div>

            <div className="space-y-2 p-4 bg-white rounded-lg border border-aptiv/10">
              <h3 className="font-medium text-aptiv-gray-700">Job Description</h3>
              <p className="text-sm text-aptiv-gray-600 whitespace-pre-wrap">
                {candidate.job_description}
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};