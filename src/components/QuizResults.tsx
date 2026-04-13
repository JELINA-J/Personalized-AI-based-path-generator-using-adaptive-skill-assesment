// QuizResults.tsx
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Star, ArrowRight, Sparkles } from 'lucide-react';

// Define the type for level
type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

interface QuizResultsProps {
  score: number;
  level: SkillLevel; // Use the specific type
  course: string;
  onContinue: () => void;
}

const QuizResults = ({ score, level, course, onContinue }: QuizResultsProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    setShowConfetti(true);
    
    // Animate score counter
    let start = 0;
    const duration = 2000;
    const increment = score / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [score]);

  const getLevelColor = () => {
    switch (level) {
      case 'beginner': return 'from-blue-500 to-cyan-400';
      case 'intermediate': return 'from-purple-500 to-pink-500';
      case 'advanced': return 'from-orange-500 to-red-500';
      default: return 'from-blue-500 to-cyan-400';
    }
  };

  const getLevelIcon = () => {
    switch (level) {
      case 'beginner': return '🌱';
      case 'intermediate': return '🚀';
      case 'advanced': return '🏆';
      default: return '🌱';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </div>
          ))}
        </div>
      )}

      <Card className="w-full max-w-2xl bg-gradient-to-br from-slate-800/90 to-purple-800/90 backdrop-blur-sm border-purple-500/30 shadow-2xl transform animate-float">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Trophy className="w-20 h-20 text-yellow-400 animate-bounce" />
              <Star className="w-8 h-8 text-yellow-200 absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Quiz Completed!
          </CardTitle>
          <CardDescription className="text-lg text-cyan-200">
            Great job on completing the {course} assessment
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Score Display */}
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center p-6 bg-slate-700/50 rounded-2xl border border-cyan-500/30">
              <div className="text-cyan-300 text-sm mb-2">Your Score</div>
              <div className="text-4xl font-bold text-white animate-pulse">
                {animatedScore}%
              </div>
              <div className="w-full bg-slate-600 rounded-full h-3 mt-3">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 h-3 rounded-full transition-all duration-2000 ease-out"
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>

            <div className="text-center p-6 bg-slate-700/50 rounded-2xl border border-purple-500/30">
              <div className="text-purple-300 text-sm mb-2">Skill Level</div>
              <div className={`text-2xl font-bold bg-gradient-to-r ${getLevelColor()} bg-clip-text text-transparent`}>
                {getLevelIcon()} {level.charAt(0).toUpperCase() + level.slice(1)}
              </div>
              <div className="text-sm text-gray-300 mt-2">
                {level === 'beginner' && 'Perfect starting point!'}
                {level === 'intermediate' && 'Great foundation!'}
                {level === 'advanced' && 'Expert level achieved!'}
              </div>
            </div>
          </div>

          {/* Progress Message */}
          <div className="text-center p-6 bg-slate-700/30 rounded-2xl border border-slate-600">
            <h3 className="text-xl font-semibold text-white mb-3">
              {score >= 80 ? 'Outstanding! 🎉' : 
               score >= 60 ? 'Well Done! 👏' : 
               'Good Start! 💪'}
            </h3>
            <p className="text-cyan-100">
              {score >= 80 ? `You're ready for advanced ${course} concepts!` :
               score >= 60 ? `You have a solid foundation in ${course}!` :
               `Let's build your ${course} skills from the ground up!`}
            </p>
          </div>

          {/* Continue Button */}
          <Button 
            onClick={onContinue}
            className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white py-6 text-lg font-semibold rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/25"
            size="lg"
          >
            Set Learning Preferences
            <ArrowRight className="w-5 h-5 ml-2 animate-pulse" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizResults;