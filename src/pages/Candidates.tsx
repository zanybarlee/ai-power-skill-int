
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchTab } from "@/components/candidates/SearchTab";
import { CrawlTab } from "@/components/candidates/CrawlTab";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { normalizeSkills } from "@/utils/candidateUtils";

const Candidates = () => {
  const { data: initialCandidates } = useQuery({
    queryKey: ['initialCandidates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cv_metadata')
        .select(`
          id, name, experience, location, skills, email, phone,
          education, cv_content, certifications, nationality,
          current_salary, expected_salary, notice_period
        `)
        .limit(10);

      if (error) throw error;

      return data.map((item) => ({
        id: item.id,
        name: item.name || 'Unknown',
        role: 'Not specified',
        experience: item.experience ? `${item.experience} years` : 'Not specified',
        location: item.location || 'Not specified',
        skills: normalizeSkills(item.skills),
        availability: 'Not specified',
        email: item.email || 'Not specified',
        phone: item.phone || 'Not specified',
        education: item.education || 'Not specified',
        cv_content: item.cv_content || 'Not available',
        certifications: normalizeSkills(item.certifications),
        nationality: item.nationality,
        current_salary: item.current_salary,
        expected_salary: item.expected_salary,
        notice_period: item.notice_period
      }));
    },
  });

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <div className="bg-white rounded-lg p-6 border border-aptiv/10">
          <h1 className="text-2xl font-semibold text-aptiv-gray-700 mb-6">Candidate Search (CV)</h1>
          
          <Tabs defaultValue="search" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white border border-aptiv/20 rounded-lg p-1">
              <TabsTrigger 
                value="search" 
                className="data-[state=active]:bg-aptiv data-[state=active]:text-white data-[state=active]:shadow-none text-aptiv-gray-600 hover:text-aptiv px-8 py-2.5"
              >
                Search Talent
              </TabsTrigger>
              <TabsTrigger 
                value="crawl" 
                className="data-[state=active]:bg-aptiv data-[state=active]:text-white data-[state=active]:shadow-none text-aptiv-gray-600 hover:text-aptiv px-8 py-2.5"
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
        </div>
      </div>
    </Layout>
  );
};

export default Candidates;
