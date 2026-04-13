import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  UserPlus,
  Target,
  Brain,
  BookOpen,
  TrendingUp,
  Award,
  ArrowRight,
  FolderKanban,
  Briefcase,
  CheckCircle
} from "lucide-react";

const HowItWorks = () => {
    const navigate = useNavigate();

  const steps = [
  {
    step: "01",
    icon: <UserPlus className="h-8 w-8" />,
    title: "Sign Up & Login",
    description: "Create an account to access personalized learning and career guidance.",
    features: ["Secure authentication", "User profile creation", "Learning history"],
    gradient: "bg-gradient-to-br from-blue-500 to-indigo-600",
  },
  {
    step: "02",
    icon: <BookOpen className="h-8 w-8" />,
    title: "Choose Your Course",
    description: "Select your desired course, skill level, and learning duration.",
    features: ["Role-based courses", "Beginner to advanced levels", "Flexible duration"],
    gradient: "bg-gradient-to-br from-purple-500 to-pink-500",
  },
  {
    step: "03",
    icon: <Brain className="h-8 w-8" />,
    title: "AI Learning Path",
    description: "Get a personalized, week-wise roadmap generated using AI.",
    features: ["Customized syllabus", "Curated resources", "Weekly milestones"],
    gradient: "bg-gradient-to-br from-green-500 to-teal-500",
  },
  {
    step: "04",
    icon: <Target className="h-8 w-8" />,
    title: "Learn & Practice",
    description: "Study concepts, practice tasks, and interact with the AI chatbot.",
    features: ["Hands-on practice", "AI chatbot support", "Concept clarification"],
    gradient: "bg-gradient-to-br from-cyan-500 to-blue-500",
  },
  {
    step: "05",
    icon: <TrendingUp className="h-8 w-8" />,
    title: "Attend Skill Assessment",
    description: "Take quizzes to evaluate your understanding and skill level.",
    features: ["Timed quizzes", "Performance evaluation", "Eligibility scoring"],
    gradient: "bg-gradient-to-br from-orange-500 to-red-500",
  },
  {
    step: "06",
    icon: <Award className="h-8 w-8" />,
    title: "Get Certified",
    description: "Earn a certificate by scoring 70% or above in the final assessment.",
    features: ["Skill-based certification", "Verified achievement", "Shareable certificate"],
    gradient: "bg-gradient-to-br from-yellow-500 to-orange-500",
  },
  {
    step: "07",
    icon: <FolderKanban className="h-8 w-8" />,
    title: "Project Recommendations",
    description: "Receive real-world projects to strengthen your resume.",
    features: ["Industry-level projects", "Skill-mapped tasks", "Portfolio building"],
    gradient: "bg-gradient-to-br from-blue-500 to-cyan-500",
  },
  {
    step: "08",
    icon: <Briefcase className="h-8 w-8" />,
    title: "Job Recommendations",
    description: "Get job roles recommended based on your certified skills.",
    features: ["Role-based job matching", "Location-based jobs", "Career guidance"],
    gradient: "bg-gradient-to-br from-purple-500 to-indigo-500",
  },
];


  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-800 border border-gray-300 text-sm font-medium mb-4">
            📋 Learning Process
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            How SmartPath
            <span className="bg-gradient-to-br from-green-500 to-cyan-500 bg-clip-text text-transparent"> Works</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our proven 6-step methodology ensures you reach your learning goals
            efficiently and effectively.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-lg ${step.gradient} text-white shadow-lg`}>
                      {step.icon}
                    </div>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-800 border border-gray-300 text-lg font-mono">
                      {step.step}
                    </div>
                  </div>
                  <CardTitle className="text-xl">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4 leading-relaxed text-gray-600">
                    {step.description}
                  </CardDescription>
                  <div className="space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Arrow for larger screens */}
              {index < steps.length - 1 && index % 2 === 0 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="bg-blue-500 rounded-full p-2 shadow-lg">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button className="bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg px-8 py-4 animate-pulse"
            size="xl"  onClick={() => navigate("/auth")}>
            Start Your Journey Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;