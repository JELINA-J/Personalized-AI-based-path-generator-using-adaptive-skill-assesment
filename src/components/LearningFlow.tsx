// LearningFlow.tsx
import { useState } from 'react';
import QuizResults from './QuizResults';
import Preferences from './Preferences';
import LearningRoadmap from './LearningRoadmap';

// Define the type for level
type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

const LearningFlow = () => {
  const [currentStep, setCurrentStep] = useState<'results' | 'preferences' | 'roadmap'>('results');
  const [quizData, setQuizData] = useState<{ 
    score: number; 
    level: SkillLevel; // Use the specific type
    course: string; 
  }>({ 
    score: 85, 
    level: 'beginner', // This is now the correct type
    course: 'Python' 
  });
  const [preferences, setPreferences] = useState(null);

  const handleContinueFromResults = () => {
    setCurrentStep('preferences');
  };

  const handlePreferencesSet = (prefs: any) => {
    setPreferences(prefs);
    setCurrentStep('roadmap');
  };

  return (
    <>
      {currentStep === 'results' && (
        <QuizResults
          score={quizData.score}
          level={quizData.level} // Now this matches the expected type
          course={quizData.course}
          onContinue={handleContinueFromResults}
        />
      )}
      
      {currentStep === 'preferences' && (
        <Preferences
          course={quizData.course}
          level={quizData.level} // Now this matches the expected type
          onPreferencesSet={handlePreferencesSet}
        />
      )}
      
      {currentStep === 'roadmap' && preferences && (
        <LearningRoadmap
          course={quizData.course}
          level={quizData.level} // Now this matches the expected type
          preferences={preferences}
        />
      )}
    </>
  );
};

export default LearningFlow;