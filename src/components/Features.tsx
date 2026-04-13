import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Target,
  FolderKanban,
  BookOpen,
  Users,
  Clock,
  Zap,
  Award,
  MessageCircle
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI-Powered Assessment",
      description: "Smart diagnostic quizzes that understand your current skill level and learning gaps.",
      badge: "Smart",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
      gradient: "bg-gradient-to-br from-blue-500 to-purple-600"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Personalized Learning Paths",
      description: "Custom roadmaps tailored to your goals, pace, and preferred learning style.",
      badge: "Adaptive",
      badgeColor: "bg-green-100 text-green-800 border-green-200",
      gradient: "bg-gradient-to-br from-green-500 to-cyan-500"
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Smart AI Chatbot",
      description: "An intelligent chatbot that helps learners by answering doubts, explaining concepts, and guiding them throughout the course.",
      badge: "Empathetic",
      badgeColor: "bg-red-100 text-red-800 border-red-200",
      gradient: "bg-gradient-to-br from-orange-500 to-red-500"
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Multi-Format Content",
      description: "Videos, articles, interactive exercises, and hands-on projects from top sources.",
      badge: "Diverse",
      badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-200",
      gradient: "bg-gradient-to-br from-cyan-500 to-blue-500"
    },

    {
      icon: <FolderKanban className="h-8 w-8" />,
      title: "Project Recommendations",
      description: "AI-recommended real-world projects based on your completed course, skill level, and certification performance.",
      badge: "Projects",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
      gradient: "bg-gradient-to-br from-blue-500 to-cyan-500",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Smart Scheduling",
      description: "Automated reminders and optimal study time suggestions based on your routine.",
      badge: "Efficient",
      badgeColor: "bg-yellow-100 text-yellow-800 border-yellow-200",
      gradient: "bg-gradient-to-br from-yellow-500 to-orange-500"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Dynamic Updates",
      description: "Learning paths evolve based on your performance and changing industry trends.",
      badge: "Real-time",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
      gradient: "bg-gradient-to-br from-blue-500 to-purple-600"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Skill Mastery Validation",
      description: "Certificates and projects that prove your expertise to employers and peers.",
      badge: "Certified",
      badgeColor: "bg-green-100 text-green-800 border-green-200",
      gradient: "bg-gradient-to-br from-green-500 to-cyan-500"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "AI-Powered Job Matching",
      description: "Discover relevant job roles aligned with your learning path and certification.",
      badge: "Social",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
      gradient: "bg-gradient-to-br from-purple-500 to-pink-500"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200 text-sm font-medium mb-4">
            🎯 Platform Features
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Everything You Need to
            <span className="bg-gradient-to-br from-blue-500 to-purple-600 bg-clip-text text-transparent"> Excel</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our comprehensive platform combines AI technology with proven learning science
            to create the most effective personalized education experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="relative group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-white border border-gray-200"
            >
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-lg ${feature.gradient} text-white shadow-lg`}>
                    {feature.icon}
                  </div>
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${feature.badgeColor}`}>
                    {feature.badge}
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-blue-500 transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;