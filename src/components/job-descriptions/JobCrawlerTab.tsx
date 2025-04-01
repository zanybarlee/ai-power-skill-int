
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { processJobDescription } from "@/services/jobDescriptionService";
import { WebsiteSelector } from "./crawler/WebsiteSelector";
import { CrawlButton } from "./crawler/CrawlButton";
import { CrawlProgress } from "./crawler/CrawlProgress";
import { JobListingCards } from "./crawler/JobListingCards";

interface JobCrawlerTabProps {
  isProcessing: boolean;
  onJobsImport: (employerProfileId?: string) => Promise<void>;
}

export const JobCrawlerTab = ({
  isProcessing,
  onJobsImport,
}: JobCrawlerTabProps) => {
  const [websiteSource, setWebsiteSource] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [industry, setIndustry] = useState("");
  const [crawlStatus, setCrawlStatus] = useState<"idle" | "crawling" | "processing" | "complete">("idle");
  const [progress, setProgress] = useState(0);
  const [crawledJobs, setCrawledJobs] = useState<any[]>([]);

  const handleCrawlWebsite = async () => {
    if (!websiteSource) {
      toast.error("Please select a website source to crawl");
      return;
    }

    try {
      setCrawlStatus("crawling");
      setProgress(25);
      
      // Get the URL to crawl
      const url = websiteSource === "other" ? customUrl : websiteSource;
      
      // Simulate crawling for now - in a real implementation, this would call a crawler service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock crawled data - now including industry information
      const mockCrawledData = [
        {
          title: "Software Engineer",
          description: "We are looking for a software engineer with 5+ years of experience in React and Node.js.",
          company: "Tech Solutions Inc",
          location: "Remote",
          industry: industry || "Technology",
        },
        {
          title: "Product Manager",
          description: "Experienced product manager needed to lead our SaaS platform development.",
          company: "Product Innovations",
          location: "New York, NY",
          industry: industry || "Technology",
        }
      ];
      
      setCrawledJobs(mockCrawledData);
      setProgress(50);
      setCrawlStatus("processing");
      
      // Process each job description
      for (let i = 0; i < mockCrawledData.length; i++) {
        const job = mockCrawledData[i];
        const processedData = await processJobDescription(job.description);
        
        // Insert into database with industry information
        const { error } = await supabase.from('job_descriptions').insert({
          original_text: job.description,
          job_title: job.title || processedData?.extractedRole?.title,
          company_name: job.company,
          location: job.location,
          industry: industry || job.industry,  // Use the specified industry or default
          status: 'processed'
        });
        
        if (error) {
          console.error("Error inserting crawled job:", error);
          toast.error(`Failed to process job: ${job.title}`);
        }
        
        setProgress(50 + ((i + 1) / mockCrawledData.length) * 50);
      }
      
      toast.success(`Successfully imported ${mockCrawledData.length} job descriptions`);
      setCrawlStatus("complete");
      setProgress(100);
      
      // Reset the form
      setTimeout(() => {
        setWebsiteSource("");
        setCustomUrl("");
        setIndustry("");
        setCrawledJobs([]);
        setCrawlStatus("idle");
        setProgress(0);
        
        // Trigger refresh of job descriptions
        onJobsImport();
      }, 2000);
      
    } catch (error) {
      console.error("Crawl error:", error);
      toast.error("Failed to crawl website. Please try again.");
      setCrawlStatus("idle");
      setProgress(0);
    }
  };

  const isCrawlButtonDisabled = crawlStatus !== "idle" || !websiteSource || (websiteSource === "other" && !customUrl);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Job Description Crawler</h2>
        <p className="text-gray-600 mb-4">
          Select a job board website to crawl for job descriptions. The system will automatically extract job details and import them.
        </p>
        
        <div className="space-y-4">
          <WebsiteSelector
            websiteSource={websiteSource}
            setWebsiteSource={setWebsiteSource}
            customUrl={customUrl}
            setCustomUrl={setCustomUrl}
            industry={industry}
            setIndustry={setIndustry}
            disabled={crawlStatus !== "idle"}
          />
          
          <div className="flex justify-end">
            <CrawlButton
              onClick={handleCrawlWebsite}
              disabled={isCrawlButtonDisabled}
              status={crawlStatus}
            />
          </div>
          
          <CrawlProgress 
            progress={progress}
            status={crawlStatus}
          />
        </div>
      </div>
      
      <JobListingCards jobs={crawledJobs} />
    </div>
  );
};
