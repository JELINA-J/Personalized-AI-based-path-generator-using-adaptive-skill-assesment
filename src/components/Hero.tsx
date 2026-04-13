import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, TrendingUp, Users } from "lucide-react";
import heroImage from "@/assets/hero-learning.jpg";

interface HeroProps {
  onGetStarted?: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 py-20 lg:py-32">
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
              🚀 AI-Powered Learning Platform
            </Badge>

            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Your
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                {" "}Personalized{" "}
              </span>
              Learning Journey Starts Here
            </h1>

            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              SmartPath adapts to your learning style, pace, and goals. Get personalized recommendations,
              track your progress, and master any skill with AI-driven insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white animate-pulse"
                onClick={onGetStarted}
              >
                Start Learning Free
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20"
              >
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-8 mt-12 justify-center lg:justify-start">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50k+</div>
                <div className="text-white/80 text-sm">Learners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-white/80 text-sm">Skills</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">95%</div>
                <div className="text-white/80 text-sm">Success Rate</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-3xl"></div>
            <img 
  src={heroImage} 
  alt="SmartPath Learning Platform" 
  className="relative z-10 w-full h-auto rounded-2xl shadow-2xl animate-float"
/>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-green-500 p-3 rounded-full shadow-lg animate-bounce">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-blue-500 p-3 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '0.5s' }}>
              <Target className="h-6 w-6 text-white" />
            </div>
            <div className="absolute top-1/2 -right-8 bg-orange-500 p-3 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '1s' }}>
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;