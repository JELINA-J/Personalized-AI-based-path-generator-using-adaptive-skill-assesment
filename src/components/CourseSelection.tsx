import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLearning, Course } from "@/contexts/LearningContext";
import { useAuth } from "@/contexts/AuthContext";
import { Brain, LogOut } from "lucide-react";
import Footer from "@/components/Footer";

interface CourseSelectionProps {
  onCourseSelect?: (course: Course) => void;
}

const CourseSelection: React.FC<CourseSelectionProps> = ({ onCourseSelect }) => {
  const { courses, selectCourse } = useLearning();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSelectCourse = (course: Course) => {
    selectCourse(course);
    onCourseSelect?.(course);
    console.log('Course selected:', course);
    navigate(`/assessment/${course.id}`);

  };

  return (
    <div className="min-h-screen bg-cyan-100">
      {/* Navbar */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">SmartPath</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Welcome, {user?.name}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              <LogOut className="w-4 h-4 text-gray-600" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Choose Your Course</h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Select a course to start your personalized learning journey with AI-powered guidance
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course: Course) => (
            <Card
              key={course.id}
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border border-gray-200/60"
            >

              <CardHeader className="text-center pb-4">
                <div className="text-5xl mb-3">{course.icon}</div>
                <CardTitle className="text-xl text-gray-900">{course.name}</CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
                  onClick={() => handleSelectCourse(course)}
                >
                  Start Learning
                </Button>

              </CardContent>
            </Card>
          ))}
        </div>
      </main>
          <Footer/>

    </div>
  );
};

export default CourseSelection;