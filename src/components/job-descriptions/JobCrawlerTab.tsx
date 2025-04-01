
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Globe, Briefcase } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { processJobDescription } from "@/services/jobDescriptionService";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Job Description Crawler</h2>
        <p className="text-gray-600 mb-4">
          Select a job board website to crawl for job descriptions. The system will automatically extract job details and import them.
        </p>
        
        <div className="space-y-4">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label htmlFor="website" className="block text-sm font-medium text-gray-600 mb-1">
                Website
              </label>
              <Select 
                value={websiteSource} 
                onValueChange={setWebsiteSource}
                disabled={crawlStatus !== "idle"}
              >
                <SelectTrigger id="website" className="w-full">
                  <SelectValue placeholder="Select a job board" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="https://www.mycareersfuture.gov.sg">MyCareerFuture</SelectItem>
                  <SelectItem value="https://www.jobstreet.com.sg">JobStreet.com</SelectItem>
                  <SelectItem value="https://sg.indeed.com">Indeed</SelectItem>
                  <SelectItem value="other">Other (specify URL)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {websiteSource === "other" && (
              <div className="flex-1">
                <label htmlFor="customUrl" className="block text-sm font-medium text-gray-600 mb-1">
                  Custom URL
                </label>
                <Input
                  id="customUrl"
                  type="url"
                  placeholder="https://example.com/careers"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  disabled={crawlStatus !== "idle"}
                  className="w-full"
                />
              </div>
            )}
            
            <div className="flex-1">
              <label htmlFor="industry" className="block text-sm font-medium text-gray-600 mb-1">
                Industry Field
              </label>
              <div className="relative">
                <Input
                  id="industry"
                  type="text"
                  placeholder="e.g. Technology, Healthcare"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  disabled={crawlStatus !== "idle"}
                  className="w-full pl-9"
                />
                <Briefcase className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <Button 
              onClick={handleCrawlWebsite}
              disabled={crawlStatus !== "idle" || !websiteSource || (websiteSource === "other" && !customUrl)}
              className="whitespace-nowrap"
            >
              {crawlStatus === "idle" ? (
                <>
                  <Globe className="mr-2 h-4 w-4" />
                  Start Crawling
                </>
              ) : (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {crawlStatus === "crawling" ? "Crawling..." : 
                   crawlStatus === "processing" ? "Processing..." : 
                   "Completed"}
                </>
              )}
            </Button>
          </div>
          
          {crawlStatus !== "idle" && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-gray-600">
                {crawlStatus === "crawling" ? "Crawling website for job listings..." :
                 crawlStatus === "processing" ? "Processing and storing job descriptions..." :
                 "Import complete!"}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {crawledJobs.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Found Job Listings ({crawledJobs.length})</h3>
          
          {crawledJobs.map((job, index) => (
            <Card key={index} className="p-4">
              <h4 className="font-medium">{job.title}</h4>
              <p className="text-sm text-gray-500">{job.company} • {job.location}</p>
              {job.industry && (
                <p className="text-sm text-gray-500"><span className="font-medium">Industry:</span> {job.industry}</p>
              )}
              <p className="text-sm mt-2 line-clamp-2">{job.description}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
