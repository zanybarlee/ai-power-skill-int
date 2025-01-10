import { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchTab } from "@/components/candidates/SearchTab";
import { CrawlTab } from "@/components/candidates/CrawlTab";
import { CandidateTable } from "@/components/candidates/CandidateTable";

const mockCandidates = [
  {
    id: "1",
    name: "John Doe",
    role: "Frontend Developer",
    experience: "5 years",
    location: "San Francisco, CA",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    availability: "Immediate"
  },
  {
    id: "2",
    name: "Jane Smith",
    role: "Backend Developer",
    experience: "3 years",
    location: "New York, NY",
    skills: ["Node.js", "Python", "PostgreSQL"],
    availability: "2 weeks"
  },
  {
    id: "3",
    name: "Mike Johnson",
    role: "Full Stack Developer",
    experience: "7 years",
    location: "Austin, TX",
    skills: ["React", "Node.js", "MongoDB"],
    availability: "1 month"
  }
];

const Candidates = () => {
  const [filteredCandidates] = useState(mockCandidates);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-forest-light rounded-lg p-6 border border-mint/10">
          <h1 className="text-2xl font-semibold text-white mb-6">Candidate Search</h1>
          
          <Tabs defaultValue="crawl" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-forest-light border border-mint/20 rounded-lg p-1">
              <TabsTrigger 
                value="crawl" 
                className="data-[state=active]:bg-mint data-[state=active]:text-forest data-[state=active]:shadow-none text-mint hover:text-mint/80 px-8 py-2.5"
              >
                Crawl CV
              </TabsTrigger>
              <TabsTrigger 
                value="search" 
                className="data-[state=active]:bg-mint data-[state=active]:text-forest data-[state=active]:shadow-none text-mint hover:text-mint/80 px-8 py-2.5"
              >
                Search Talent
              </TabsTrigger>
            </TabsList>

            <TabsContent value="crawl" className="mt-6">
              <CrawlTab />
            </TabsContent>

            <TabsContent value="search" className="mt-6">
              <SearchTab />
            </TabsContent>
          </Tabs>

          <CandidateTable candidates={filteredCandidates} />
        </div>
      </div>
    </Layout>
  );
};

export default Candidates;