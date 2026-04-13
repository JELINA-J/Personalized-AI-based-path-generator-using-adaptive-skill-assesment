// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LearningProvider } from "@/contexts/LearningContext";
import Auth from "@/components/Auth";
import CourseSelection from "@/components/CourseSelection";
import Index from "./pages/Index";
import DiagnosticQuiz from "./components/DiagnosticQuiz";
import { useParams, useNavigate } from "react-router-dom";
import Assessment from "@/components/Assessment";
import Quiz from "./components/quiz";
import Certification from "./components/Certification";
import Jobs from "./components/jobs";
// Wrapper component to handle route parameters and props
const DiagnosticQuizWrapper = () => {
  const { course } = useParams<{ course: string }>();
  const navigate = useNavigate();

  const handleQuizComplete = (level: string, score: number) => {
    // The navigation to QuizResults is now handled within the DiagnosticQuiz component
    // This callback is for any additional logic you might need
    console.log('Quiz completed with:', { level, score });
  };

  if (!course) {
    return <div>Course not specified</div>;
  }

  return (
    <DiagnosticQuiz 
      course={course}
      contentType="diagnostic"
      onQuizComplete={handleQuizComplete}
    />
  );
};

const App = () => {
  return (
    <AuthProvider>
      <LearningProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/courses" element={<CourseSelection />} />
           <Route path="/assessment/:courseId" element={<Assessment />} />
            <Route path="/quiz/:course" element={<DiagnosticQuizWrapper />} />
        <Route path="/quiz" element={<Quiz />} />  {/* ✅ ADD THIS */}
  <Route path="/certification" element={<Certification />} />
<Route path="/jobs" element={<Jobs />} />

          </Routes>
        </BrowserRouter>
      </LearningProvider>
    </AuthProvider>
  );
};

export default App;