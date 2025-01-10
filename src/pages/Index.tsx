import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, Users, FileSearch, Star, Briefcase } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-white">Welcome to Aptiv8 AI Agent for CV</h1>
          <span className="text-mint/80">Last updated: {new Date().toLocaleDateString()}</span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-forest-light border-mint/10 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white/60 text-sm">Total Candidates</p>
                <p className="text-3xl font-bold text-white mt-2">1,234</p>
                <p className="text-mint text-sm mt-2 flex items-center">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  12% increase
                </p>
              </div>
              <div className="bg-mint/10 p-3 rounded-lg">
                <Users className="w-6 h-6 text-mint" />
              </div>
            </div>
          </Card>

          <Card className="bg-forest-light border-mint/10 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white/60 text-sm">CVs Processed</p>
                <p className="text-3xl font-bold text-white mt-2">856</p>
                <p className="text-mint text-sm mt-2 flex items-center">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  8% increase
                </p>
              </div>
              <div className="bg-mint/10 p-3 rounded-lg">
                <FileSearch className="w-6 h-6 text-mint" />
              </div>
            </div>
          </Card>

          <Card className="bg-forest-light border-mint/10 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white/60 text-sm">Matched Candidates</p>
                <p className="text-3xl font-bold text-white mt-2">342</p>
                <p className="text-mint text-sm mt-2 flex items-center">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  15% increase
                </p>
              </div>
              <div className="bg-mint/10 p-3 rounded-lg">
                <Star className="w-6 h-6 text-mint" />
              </div>
            </div>
          </Card>

          <Card className="bg-forest-light border-mint/10 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white/60 text-sm">Active Jobs</p>
                <p className="text-3xl font-bold text-white mt-2">28</p>
                <p className="text-mint text-sm mt-2 flex items-center">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  5% increase
                </p>
              </div>
              <div className="bg-mint/10 p-3 rounded-lg">
                <Briefcase className="w-6 h-6 text-mint" />
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-forest-light border-mint/10 p-6 mt-6">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-mint/10">
                <div className="flex items-center gap-4">
                  <div className="bg-mint/10 p-2 rounded-lg">
                    <FileSearch className="w-5 h-5 text-mint" />
                  </div>
                  <div>
                    <p className="text-white font-medium">New CV Processed</p>
                    <p className="text-white/60 text-sm">Senior React Developer</p>
                  </div>
                </div>
                <span className="text-white/60 text-sm">2 hours ago</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Index;