import { BookOpen, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FooterProps {
  onGetStarted?: () => void;
}

const Footer = ({ onGetStarted }: FooterProps) => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">SmartPath</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Transform your learning journey with AI-powered personalization. 
              Master any skill at your own pace with intelligent recommendations and adaptive content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-gradient-to-br from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                size="lg" 
                onClick={onGetStarted}
              >
                Start Learning Free
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-gray-400 text-white hover:bg-gray-800"
              >
                Build Skills Now
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Platform</h3>
            <div className="space-y-3">
              <a href="#features" className="block text-gray-300 hover:text-white transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="block text-gray-300 hover:text-white transition-colors">
                How It Works
              </a>
              <a href="#pricing" className="block text-gray-300 hover:text-white transition-colors">
                Certification
              </a>
              <a href="#testimonials" className="block text-gray-300 hover:text-white transition-colors">
                Job Matching
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Company</h3>
            <div className="space-y-3">
              <a href="#about" className="block text-gray-300 hover:text-white transition-colors">
                About Us
              </a>
              <a href="#careers" className="block text-gray-300 hover:text-white transition-colors">
                Careers
              </a>
              <a href="#blog" className="block text-gray-300 hover:text-white transition-colors">
                Blog
              </a>
              <a href="#contact" className="block text-gray-300 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 SmartPath. All rights reserved. Built with AI for learners worldwide.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;