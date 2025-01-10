import { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchTab } from "@/components/candidates/SearchTab";
import { CrawlTab } from "@/components/candidates/CrawlTab";
import { CandidateTable } from "@/components/candidates/CandidateTable";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { normalizeSkills } from "@/utils/candidateUtils";

const Candidates = () => {
  // Fetch initial candidates
  const { data: initialCandidates } = useQuery({
    queryKey: ['initialCandidates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cv_metadata')
        .select('id, name, experience, location, skills')
        .limit(10);

      if (error) throw error;

      return data.map((item) => ({
        id: item.id,
        name: item.name || 'Unknown',
        role: 'Not specified',
        experience: item.experience ? `${item.experience} years` : 'Not specified',
        location: item.location || 'Not specified',
        skills: normalizeSkills(item.skills),
        availability: 'Not specified'
      }));
    },
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-forest-light rounded-lg p-6 border border-mint/10">
          <h1 className="text-2xl font-semibold text-white mb-6">Candidate Search</h1>
          
          <Tabs defaultValue="search" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-forest-light border border-mint/20 rounded-lg p-1">
              <TabsTrigger 
                value="search" 
                className="data-[state=active]:bg-mint data-[state=active]:text-forest data-[state=active]:shadow-none text-mint hover:text-mint/80 px-8 py-2.5"
              >
                Search Talent
              </TabsTrigger>
              <TabsTrigger 
                value="crawl" 
                className="data-[state=active]:bg-mint data-[state=active]:text-forest data-[state=active]:shadow-none text-mint hover:text-mint/80 px-8 py-2.5"
              >
                Crawl CV
              </TabsTrigger>
            </TabsList>

            <TabsContent value="search" className="mt-6">
              <SearchTab />
            </TabsContent>

            <TabsContent value="crawl" className="mt-6">
              <CrawlTab />
            </TabsContent>
          </Tabs>

          <CandidateTable candidates={initialCandidates || []} />
        </div>
      </div>
    </Layout>
  );
};

export default Candidates;