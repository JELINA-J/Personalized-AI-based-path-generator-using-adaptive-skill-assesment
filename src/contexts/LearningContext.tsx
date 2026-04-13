import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { EvaluationResult } from '@/utils/hybridEvaluation';

export interface Course {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: 'career' | 'skill';
}

export interface QuizResult {
  courseId: string;
  score: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  completedAt: Date;
    openEndedEvaluations?: EvaluationResult[]; // Add this optional property

}

export interface Progress {
  courseId: string;
  completedTopics: string[];
  currentTopic: string;
  quizAttempts: number;
  timeSpent: number;
  feedback: Array<{ topic: string; feeling: 'easy' | 'frustrated' | 'confused' }>;
}

interface LearningContextType {
  courses: Course[];
  selectedCourse: Course | null;
  selectCourse: (course: Course) => void;
  quizResults: QuizResult[];
  saveQuizResult: (result: QuizResult) => void;
  progress: Progress | null;
  updateProgress: (update: Partial<Progress>) => void;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

const COURSES: Course[] = [
  {
    id: 'java_developer',
    name: 'Java Developer',
    icon: '☕',
    description: 'Backend development with Java, Spring Boot, SQL & APIs',
    category: 'career'
  },
  {
    id: 'full_stack',
    name: 'Full Stack Developer',
    icon: '🌐',
    description: 'Frontend + Backend development with real-world projects',
    category: 'career'
  },
  {
    id: 'frontend_developer',
    name: 'Frontend Developer',
    icon: '🎨',
    description: 'React, UI/UX, performance & accessibility',
    category: 'career'
  },
  {
    id: 'ai_engineer',
    name: 'AI / ML Engineer',
    icon: '🤖',
    description: 'Machine learning, Python, data science & AI projects',
    category: 'career'
  },
  {
    id: 'data_analyst',
    name: 'Data Analyst',
    icon: '📊',
    description: 'Data analysis, SQL, Python & visualization',
    category: 'career'
  },
  {
    id: 'sde',
    name: 'Software Development Engineer (SDE)',
    icon: '💻',
    description: 'DSA, system design & core CS for product companies',
    category: 'career'
  },
  {
    id: 'devops',
    name: 'DevOps Engineer',
    icon: '⚙️',
    description: 'CI/CD, cloud, Docker, Kubernetes & monitoring',
    category: 'career'
  },
  {
  id: 'cybersecurity',
  name: 'Cybersecurity Engineer',
  icon: '🔐',
  description: 'Network security, ethical hacking, SOC, and risk management',
  category: 'career'
},
{
  id: 'cloud_engineer',
  name: 'Cloud Engineer',
  icon: '☁️',
  description: 'AWS/Azure/GCP, cloud architecture, scalability & cost optimization',
  category: 'career'
},
{
  id: 'python_developer',
  name: 'Python Developer',
  icon: '🐍',
  description: 'Python, OOP, APIs, automation, and backend development',
  category: 'career'
},
{
  id: 'backend_developer',
  name: 'Backend Developer',
  icon: '🗄️',
  description: 'APIs, databases, authentication, scalability & server-side logic',
  category: 'career'
}

];

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [progress, setProgress] = useState<Progress | null>(null);

  useEffect(() => {
    if (user) {
      const storedResults = localStorage.getItem(`quizResults_${user.id}`);
      if (storedResults) {
        setQuizResults(JSON.parse(storedResults));
      }

      const storedProgress = localStorage.getItem(`progress_${user.id}`);
      if (storedProgress) {
        setProgress(JSON.parse(storedProgress));
      }
    }
  }, [user]);

  const selectCourse = (course: Course) => {
    setSelectedCourse(course);
  };

  const saveQuizResult = (result: QuizResult) => {
    if (user) {
      const updated = [...quizResults, result];
      setQuizResults(updated);
      localStorage.setItem(`quizResults_${user.id}`, JSON.stringify(updated));
    }
  };

  const updateProgress = (update: Partial<Progress>) => {
    if (user && selectedCourse) {
      const updated = progress 
        ? { ...progress, ...update }
        : { courseId: selectedCourse.id, completedTopics: [], currentTopic: '', quizAttempts: 0, timeSpent: 0, feedback: [], ...update };
      
      setProgress(updated);
      localStorage.setItem(`progress_${user.id}`, JSON.stringify(updated));
    }
  };

  return (
    <LearningContext.Provider value={{
      courses: COURSES,
      selectedCourse,
      selectCourse,
      quizResults,
      saveQuizResult,
      progress,
      updateProgress,
    }}>
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within LearningProvider');
  }
  return context;
};
