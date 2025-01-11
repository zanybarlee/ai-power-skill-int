import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const ITSolutions = () => {
  const solutions = [
    {
      title: "Digital Transformation",
      description: "Comprehensive digital transformation strategies and implementation services to modernize your business operations.",
      features: [
        "Business Process Automation",
        "Cloud Migration Services",
        "Legacy System Modernization",
        "Digital Workflow Implementation"
      ]
    },
    {
      title: "Custom Software Development",
      description: "Tailored software solutions designed to meet your specific business needs and challenges.",
      features: [
        "Web Application Development",
        "Mobile App Development",
        "Enterprise Software Solutions",
        "API Integration Services"
      ]
    },
    {
      title: "IT Infrastructure Management",
      description: "End-to-end IT infrastructure solutions to ensure your business runs smoothly and securely.",
      features: [
        "Cloud Infrastructure Setup",
        "Network Security",
        "24/7 IT Support",
        "Disaster Recovery Planning"
      ]
    }
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-aptiv-gray-700 mb-8">IT Solutions Division</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-aptiv-gray-700 mb-4">{solution.title}</h2>
                <p className="text-aptiv-gray-600 mb-6">{solution.description}</p>
                <ul className="space-y-3">
                  {solution.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-aptiv mt-0.5 flex-shrink-0" />
                      <span className="text-aptiv-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ITSolutions;