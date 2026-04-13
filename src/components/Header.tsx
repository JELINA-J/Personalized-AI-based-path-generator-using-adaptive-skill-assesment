import { Button } from "@/components/ui/button";
import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onGetStarted?: () => void;
}

const Header = ({ onGetStarted }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 bg-clip-text text-transparent">
            SmartPath
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-700 hover:text-blue-500 transition-colors font-medium">
            Features
          </a>
          <a href="#how-it-works" className="text-gray-700 hover:text-blue-500 transition-colors font-medium">
            How It Works
          </a>
          <a href="#about" className="text-gray-700 hover:text-blue-500 transition-colors font-medium">
            About
          </a>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className="text-gray-700 hover:text-blue-500"      onClick={() => navigate("/auth")}
>
            Sign in
          </Button>
          <Button 
            className="bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-md"
            size="lg" 
           onClick={() => navigate("/auth")}
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <a 
              href="#features" 
              className="text-gray-700 hover:text-blue-500 transition-colors py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-gray-700 hover:text-blue-500 transition-colors py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#about" 
              className="text-gray-700 hover:text-blue-500 transition-colors py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
              <Button variant="ghost" className="justify-start text-gray-700">Sign In</Button>
              <Button 
                className="bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                onClick={onGetStarted}
              >
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;