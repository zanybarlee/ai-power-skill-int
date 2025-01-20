import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Globe } from "@/components/ui/globe";
import { Bot, Filter, Clock } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Navigation */}
        <nav className="relative z-50 glass-nav">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <img 
                  src="/lovable-uploads/5d0792c7-11b1-4e59-af76-3c687201c682.png" 
                  alt="Aptiv8 Logo" 
                  className="h-8 w-auto"
                />
              </div>
              <div className="flex items-center space-x-4">
                <Link to="/auth" className="text-aptiv-gray-600 hover:text-aptiv transition-colors">
                  Sign in
                </Link>
                <Link to="/auth">
                  <Button className="bg-aptiv hover:bg-aptiv-dark text-white transition-colors">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Globe Background */}
        <div className="absolute inset-0 z-0">
          <Globe className="scale-[1.2]" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white/95" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 pt-20 pb-32 sm:pt-24 sm:pb-40 bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-aptiv-gray-700 mb-6">
                AI-Powered Talent Matching
              </h1>
              <p className="text-xl sm:text-2xl text-aptiv-gray-500 mb-10 max-w-3xl mx-auto">
                Save 80% on recruitment costs with our intelligent CV matching system
              </p>
              <Link to="/auth">
                <Button className="bg-aptiv hover:bg-aptiv-dark text-white text-lg px-8 py-6 rounded-lg transition-colors">
                  Start Hiring Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-aptiv-gray-700 mb-4">
              How does it work?
            </h2>
            <p className="text-lg text-aptiv-gray-500 max-w-2xl mx-auto">
              Our AI system connects and engages candidates directly, automating the entire process
              to reduce costs and improve efficiency.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Matching",
                description: "Advanced algorithms match candidates to your job requirements with high accuracy",
                icon: <Bot className="w-6 h-6 text-aptiv" />
              },
              {
                title: "Automated Screening",
                description: "Pre-screen candidates automatically based on your specific criteria",
                icon: <Filter className="w-6 h-6 text-aptiv" />
              },
              {
                title: "Quick Hiring",
                description: "Reduce time-to-hire with our streamlined recruitment process",
                icon: <Clock className="w-6 h-6 text-aptiv" />
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border border-aptiv/10"
              >
                <div className="w-12 h-12 bg-aptiv/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-aptiv-gray-700 mb-2">
                  {feature.title}
                </h3>
                <p className="text-aptiv-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-aptiv py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to transform your hiring process?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of companies already using our AI-powered recruitment solution
          </p>
          <Link to="/auth">
            <Button className="bg-white hover:bg-gray-100 text-aptiv text-lg px-8 py-6 rounded-lg transition-colors">
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;