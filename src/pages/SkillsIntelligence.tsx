
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrainCircuit, BookOpen, BarChart2, Users, TrendingUp, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SkillsOverview } from "@/components/skills/SkillsOverview";
import { SkillsAssessment } from "@/components/skills/SkillsAssessment";
import { SkillsGapAnalysis } from "@/components/skills/SkillsGapAnalysis";
import { SkillsRecommendations } from "@/components/skills/SkillsRecommendations";

const SkillsIntelligence = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const { data: userData } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    },
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-aptiv-gray-700">Skills Intelligence Module</h1>
          <span className="text-aptiv-gray-500">{new Date().toLocaleDateString()}</span>
        </div>

        <Card className="p-6 bg-white shadow-sm border-aptiv/10">
          <div className="mb-6">
            <h2 className="text-xl font-medium text-aptiv-gray-700">Welcome to Skills Intelligence</h2>
            <p className="text-aptiv-gray-500 mt-2">
              Leverage AI-powered insights to understand, analyze, and develop skills across your organization.
            </p>
          </div>

          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
              <TabsTrigger value="overview" className="data-[state=active]:bg-aptiv data-[state=active]:text-white">
                <BrainCircuit className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="assessment" className="data-[state=active]:bg-aptiv data-[state=active]:text-white">
                <BookOpen className="w-4 h-4 mr-2" />
                Assessment
              </TabsTrigger>
              <TabsTrigger value="gap-analysis" className="data-[state=active]:bg-aptiv data-[state=active]:text-white">
                <BarChart2 className="w-4 h-4 mr-2" />
                Gap Analysis
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="data-[state=active]:bg-aptiv data-[state=active]:text-white">
                <TrendingUp className="w-4 h-4 mr-2" />
                Recommendations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <SkillsOverview userId={userData?.id} />
            </TabsContent>
            
            <TabsContent value="assessment">
              <SkillsAssessment userId={userData?.id} />
            </TabsContent>
            
            <TabsContent value="gap-analysis">
              <SkillsGapAnalysis userId={userData?.id} />
            </TabsContent>
            
            <TabsContent value="recommendations">
              <SkillsRecommendations userId={userData?.id} />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </Layout>
  );
};

export default SkillsIntelligence;
