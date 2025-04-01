
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { BarChart, PieChart, LineChart, Activity } from "lucide-react";

const Dashboard = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-aptiv-gray-700">Dashboard Overview</h1>
          <span className="text-aptiv-gray-500">{new Date().toLocaleDateString()}</span>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white border-aptiv/10 p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-aptiv-gray-500 text-sm">Job Postings</p>
                <p className="text-3xl font-bold text-aptiv-gray-700 mt-2">28</p>
                <p className="text-aptiv text-sm mt-2 flex items-center">
                  <span className="inline-block mr-1">↑</span>
                  5% increase
                </p>
              </div>
              <div className="bg-aptiv/10 p-3 rounded-lg">
                <BarChart className="w-6 h-6 text-aptiv" />
              </div>
            </div>
          </Card>

          <Card className="bg-white border-aptiv/10 p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-aptiv-gray-500 text-sm">Candidates</p>
                <p className="text-3xl font-bold text-aptiv-gray-700 mt-2">1,234</p>
                <p className="text-aptiv text-sm mt-2 flex items-center">
                  <span className="inline-block mr-1">↑</span>
                  12% increase
                </p>
              </div>
              <div className="bg-aptiv/10 p-3 rounded-lg">
                <PieChart className="w-6 h-6 text-aptiv" />
              </div>
            </div>
          </Card>

          <Card className="bg-white border-aptiv/10 p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-aptiv-gray-500 text-sm">Matches</p>
                <p className="text-3xl font-bold text-aptiv-gray-700 mt-2">342</p>
                <p className="text-aptiv text-sm mt-2 flex items-center">
                  <span className="inline-block mr-1">↑</span>
                  15% increase
                </p>
              </div>
              <div className="bg-aptiv/10 p-3 rounded-lg">
                <Activity className="w-6 h-6 text-aptiv" />
              </div>
            </div>
          </Card>

          <Card className="bg-white border-aptiv/10 p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-aptiv-gray-500 text-sm">Success Rate</p>
                <p className="text-3xl font-bold text-aptiv-gray-700 mt-2">78%</p>
                <p className="text-aptiv text-sm mt-2 flex items-center">
                  <span className="inline-block mr-1">↑</span>
                  3% increase
                </p>
              </div>
              <div className="bg-aptiv/10 p-3 rounded-lg">
                <LineChart className="w-6 h-6 text-aptiv" />
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-white border-aptiv/10 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-aptiv-gray-700 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-aptiv/10">
              <div className="flex items-center gap-4">
                <div className="bg-aptiv/10 p-2 rounded-lg">
                  <BarChart className="w-5 h-5 text-aptiv" />
                </div>
                <div>
                  <p className="text-aptiv-gray-700 font-medium">New Job Posted</p>
                  <p className="text-aptiv-gray-500 text-sm">Senior Software Engineer</p>
                </div>
              </div>
              <span className="text-aptiv-gray-500 text-sm">2 hours ago</span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-aptiv/10">
              <div className="flex items-center gap-4">
                <div className="bg-aptiv/10 p-2 rounded-lg">
                  <PieChart className="w-5 h-5 text-aptiv" />
                </div>
                <div>
                  <p className="text-aptiv-gray-700 font-medium">Candidate Match</p>
                  <p className="text-aptiv-gray-500 text-sm">Project Manager - 92% match</p>
                </div>
              </div>
              <span className="text-aptiv-gray-500 text-sm">5 hours ago</span>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-4">
                <div className="bg-aptiv/10 p-2 rounded-lg">
                  <Activity className="w-5 h-5 text-aptiv" />
                </div>
                <div>
                  <p className="text-aptiv-gray-700 font-medium">Interview Scheduled</p>
                  <p className="text-aptiv-gray-500 text-sm">Data Scientist - Tomorrow at 2PM</p>
                </div>
              </div>
              <span className="text-aptiv-gray-500 text-sm">Yesterday</span>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
