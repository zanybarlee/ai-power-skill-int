import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";

const EADivision = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-aptiv-gray-700 mb-8">Employment Agency Division</h1>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-aptiv-gray-700 mb-4">Our EA Services</h2>
            <p className="text-aptiv-gray-600 leading-relaxed mb-6">
              As a licensed employment agency in Singapore, Aptiv8 specializes in connecting talented professionals 
              with leading organizations across various industries. Our EA division focuses on providing comprehensive 
              recruitment solutions tailored to meet the specific needs of both employers and job seekers.
            </p>
            
            <h2 className="text-xl font-semibold text-aptiv-gray-700 mb-4">Our Expertise</h2>
            <ul className="list-disc list-inside text-aptiv-gray-600 leading-relaxed space-y-2 mb-6">
              <li>IT & Technology Recruitment</li>
              <li>Executive Search & Selection</li>
              <li>Contract Staffing Solutions</li>
              <li>Foreign Talent Recruitment</li>
              <li>HR Consulting Services</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-aptiv-gray-700 mb-4">Why Choose Us</h2>
            <ul className="list-disc list-inside text-aptiv-gray-600 leading-relaxed space-y-2">
              <li>Licensed by Ministry of Manpower (MOM)</li>
              <li>Extensive network of qualified candidates</li>
              <li>Industry-specific expertise</li>
              <li>Comprehensive screening process</li>
              <li>Dedicated account management</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default EADivision;