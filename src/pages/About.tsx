import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-aptiv-gray-700 mb-8">About Us</h1>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-aptiv-gray-700 mb-4">Our Story</h2>
            <p className="text-aptiv-gray-600 leading-relaxed mb-6">
              Established in 2015, Aptiv8 Pte Ltd has rapidly emerged as a leading IT solution provider in Singapore. 
              Our journey began with a vision to bridge the gap between emerging technologies and local businesses, 
              providing innovative solutions that drive growth and efficiency.
            </p>
            
            <h2 className="text-xl font-semibold text-aptiv-gray-700 mb-4">Our Mission</h2>
            <p className="text-aptiv-gray-600 leading-relaxed mb-6">
              We are committed to delivering cutting-edge technology solutions that empower businesses to thrive in 
              the digital age. Our mission is to be the catalyst for digital transformation, helping organizations 
              leverage technology to achieve their full potential.
            </p>
            
            <h2 className="text-xl font-semibold text-aptiv-gray-700 mb-4">Our Values</h2>
            <ul className="list-disc list-inside text-aptiv-gray-600 leading-relaxed space-y-2">
              <li>Innovation: Constantly pushing boundaries to deliver cutting-edge solutions</li>
              <li>Excellence: Maintaining the highest standards in everything we do</li>
              <li>Integrity: Building trust through honest and transparent relationships</li>
              <li>Collaboration: Working together to achieve exceptional results</li>
              <li>Customer Focus: Putting our clients' needs at the heart of our solutions</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default About;