
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MatchedCandidate } from "@/hooks/shortlists/types";
import { useJobDetails } from "@/components/job-descriptions/job-details/hooks/useJobDetails";

export function useShareCVs(candidates: MatchedCandidate[], onOpenChange: (open: boolean) => void) {
  const { toast } = useToast();
  const { clearCart } = useCart();
  const [isSharing, setIsSharing] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [blindContactInfo, setBlindContactInfo] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  
  // Get job details if all candidates have the same job
  const jobId = candidates.length > 0 ? candidates[0].job_id : null;
  const jobRole = candidates.length > 0 ? candidates[0].job_role || candidates[0].role : null;
  const sameJob = candidates.every(c => c.job_id === jobId);
  
  // Get current user ID for job details lookup
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserId(data.user?.id || null);
    };
    getCurrentUser();
  }, []);
  
  const { job } = useJobDetails(jobId || "", sameJob, userId);
  
  // Populate form fields when job data is available
  useEffect(() => {
    if (job && job.employer_profiles) {
      // Use employer email if available
      if (job.employer_profiles.email) {
        setRecipientEmail(job.employer_profiles.email);
      }
      
      // Set subject with job role
      const roleText = jobRole || job.job_title || "position";
      setSubject(`Candidate CVs for ${roleText}`);
      
      // Set message with job details
      const jobInfo = job.job_title ? `job "${job.job_title}" (ID: ${jobId})` : `job (ID: ${jobId})`;
      const companyName = job.employer_profiles.company_name || "your company";
      
      setMessage(`Hello ${job.employer_profiles.contact_person || ""},\n\nI'm sharing ${candidates.length} candidate CVs for the ${jobInfo} at ${companyName}.\n\nBest regards,`);
    } else if (candidates.length > 0) {
      // Fallback if job details are not available
      const roleText = jobRole || "your position";
      setSubject(`Candidate CVs for ${roleText}`);
      
      const jobIdText = jobId ? ` (ID: ${jobId})` : "";
      setMessage(`Hello,\n\nI'm sharing ${candidates.length} candidate CVs for ${roleText}${jobIdText}.\n\nBest regards,`);
    }
  }, [job, jobId, jobRole, candidates.length]);

  const updateCandidateStatus = async (candidateIds: string[]) => {
    try {
      // Update all candidates to "shortlisted" status
      const { error } = await supabase
        .from('cv_match')
        .update({ status: 'shortlisted' })
        .in('id', candidateIds);
      
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error("Error updating candidate statuses:", error);
      return false;
    }
  };

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
      
      // Get all candidate IDs for status update
      const candidateIds = candidates.map(candidate => candidate.id);
      
      // Update status of shared candidates to "shortlisted"
      const statusUpdated = await updateCandidateStatus(candidateIds);
      
      toast({
        title: "CVs shared successfully",
        description: `${candidates.length} candidate CVs have been shared with ${recipientEmail} and ${statusUpdated ? 'updated to shortlisted status' : 'status update failed'}.`,
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

  return {
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
  };
}
