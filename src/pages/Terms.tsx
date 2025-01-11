import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";

const Terms = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-aptiv-gray-700 mb-8">Terms of Use</h1>
        
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6 text-aptiv-gray-600">
              <section>
                <h2 className="text-xl font-semibold text-aptiv-gray-700 mb-4">1. Acceptance of Terms</h2>
                <p className="leading-relaxed">
                  By accessing and using Aptiv8's website and services, you acknowledge that you have read, 
                  understood, and agree to be bound by these Terms of Use. If you do not agree to these terms, 
                  please do not use our services.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-aptiv-gray-700 mb-4">2. Use of Services</h2>
                <p className="leading-relaxed mb-4">
                  Our services are provided for business and professional use. You agree to use our services only 
                  for lawful purposes and in accordance with these Terms of Use.
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Maintain accurate and up-to-date information</li>
                  <li>Protect your account credentials</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Respect intellectual property rights</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-aptiv-gray-700 mb-4">3. Privacy Policy</h2>
                <p className="leading-relaxed">
                  Your use of our services is also governed by our Privacy Policy. Please review our Privacy Policy 
                  to understand our practices regarding the collection and use of your personal information.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-aptiv-gray-700 mb-4">4. Intellectual Property</h2>
                <p className="leading-relaxed">
                  All content, features, and functionality of our services, including but not limited to text, 
                  graphics, logos, and software, are the exclusive property of Aptiv8 and are protected by 
                  international copyright, trademark, and other intellectual property laws.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-aptiv-gray-700 mb-4">5. Limitation of Liability</h2>
                <p className="leading-relaxed">
                  Aptiv8 shall not be liable for any indirect, incidental, special, consequential, or punitive 
                  damages arising out of or relating to the use or inability to use our services.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-aptiv-gray-700 mb-4">6. Changes to Terms</h2>
                <p className="leading-relaxed">
                  We reserve the right to modify these Terms of Use at any time. We will notify users of any 
                  material changes by posting the new Terms of Use on this page and updating the "last modified" 
                  date.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-aptiv-gray-700 mb-4">7. Contact Information</h2>
                <p className="leading-relaxed">
                  If you have any questions about these Terms of Use, please contact us at enquiry@aptiv8.com.
                </p>
              </section>
              
              <p className="text-sm text-aptiv-gray-500 mt-8">
                Last modified: {new Date().toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Terms;