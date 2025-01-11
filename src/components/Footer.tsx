import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={cn("bg-aptiv-gray-700 text-white py-8 w-full", className)}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About Us Section */}
          <div className="space-y-3">
            <h3 className="text-aptiv font-semibold text-lg mb-4">About Us</h3>
            <p className="text-aptiv-gray-200 text-sm leading-relaxed">
              Our company Aptiv8 Pte Ltd was established since the year of 2015. We are one of the fastest 
              growing IT solution provider that assist emerging markets and local markets on advance 
              technology services.
            </p>
          </div>

          {/* Connect With Us Section */}
          <div className="space-y-3">
            <h3 className="text-aptiv font-semibold text-lg mb-4">Connect With Us</h3>
            <div className="space-y-2 text-aptiv-gray-200 text-sm">
              <p>8 Burn Road, #04-08, TRIVEX, Singapore 369977</p>
              <p>Tel: +65 6908 0277</p>
              <p>Email: enquiry@aptiv8.com</p>
            </div>
          </div>

          {/* Company Section */}
          <div className="space-y-3">
            <h3 className="text-aptiv font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-aptiv-gray-200 hover:text-aptiv text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-aptiv-gray-200 hover:text-aptiv text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/it-solutions" className="text-aptiv-gray-200 hover:text-aptiv text-sm transition-colors">
                  IT Solutions Division
                </Link>
              </li>
              <li>
                <Link to="/ea" className="text-aptiv-gray-200 hover:text-aptiv text-sm transition-colors">
                  EA Division
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-aptiv-gray-200 hover:text-aptiv text-sm transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-aptiv-gray-200 hover:text-aptiv text-sm transition-colors">
                  Term of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyright Section */}
      <div className="border-t border-aptiv-gray-600 mt-8">
        <div className="container mx-auto px-4 pt-4">
          <p className="text-aptiv-gray-300 text-sm text-center">
            Copyright 2015 Aptiv8 Pte Ltd
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;