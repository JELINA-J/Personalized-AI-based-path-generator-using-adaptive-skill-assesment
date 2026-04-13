// pages/Index.tsx
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext"; // Use AuthContext
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import Auth from "@/components/Auth";
import CourseSelection from "@/components/CourseSelection";
import DiagnosticQuiz from "@/components/DiagnosticQuiz";

const Index = () => {
  const { user } = useAuth(); // Use AuthContext instead of local state
  const [showAuth, setShowAuth] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [contentType, setContentType] = useState<string>('both');
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizResults, setQuizResults] = useState<{ level: string; score: number } | null>(null);

  const handleAuthSuccess = () => {
    setShowAuth(false);
  };

  const handleQuizComplete = (level: string, score: number) => {
    setQuizResults({ level, score });
    setShowQuiz(false);
  };

  // If showing diagnostic quiz
  if (user && showQuiz && selectedCourse) {
    return (
      <DiagnosticQuiz
        course={selectedCourse}
        contentType={contentType}
        onQuizComplete={handleQuizComplete}
      />
    );
  }

  // If user is authenticated, show course selection
  if (user) {
    return (
      <CourseSelection
        onCourseSelect={(course) => {
          setSelectedCourse(course.id);
          setContentType(course.category);
          setShowQuiz(true);
        }}
      />
    );
  }

  // If showing auth modal/page
  if (showAuth) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  // Default landing page
  return (
    <div className="min-h-screen bg-gray-50">
      <Header onGetStarted={() => setShowAuth(true)} />
      <Hero onGetStarted={() => setShowAuth(true)} />
      <Features />
      <HowItWorks />
      <Footer onGetStarted={() => setShowAuth(true)} />
    </div>
  );
};

export default Index;