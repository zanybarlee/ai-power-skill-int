import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-aptiv-gray-700 mb-8">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-aptiv-gray-700 mb-6">Get in Touch</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-aptiv mt-1" />
                  <div>
                    <p className="font-medium text-aptiv-gray-700">Office Address</p>
                    <p className="text-aptiv-gray-600">8 Burn Road, #04-08, TRIVEX,</p>
                    <p className="text-aptiv-gray-600">Singapore 369977</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-aptiv mt-1" />
                  <div>
                    <p className="font-medium text-aptiv-gray-700">Phone</p>
                    <p className="text-aptiv-gray-600">+65 6908 0277</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-aptiv mt-1" />
                  <div>
                    <p className="font-medium text-aptiv-gray-700">Email</p>
                    <p className="text-aptiv-gray-600">enquiry@aptiv8.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-aptiv mt-1" />
                  <div>
                    <p className="font-medium text-aptiv-gray-700">Business Hours</p>
                    <p className="text-aptiv-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-aptiv-gray-600">Saturday & Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-aptiv-gray-700 mb-6">Location Map</h2>
              <div className="aspect-square rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7772147921187!2d103.8558333!3d1.3333333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19c7c9c1c4a1%3A0x7f1d1c5c8a0b8b0a!2s8%20Burn%20Rd%2C%20Trivex%2C%20Singapore%20369977!5e0!3m2!1sen!2ssg!4v1620000000000!5m2!1sen!2ssg" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;