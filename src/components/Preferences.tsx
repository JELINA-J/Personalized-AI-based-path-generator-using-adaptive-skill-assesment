import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Video, FileText, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';

// Define the type for level
type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

interface PreferencesProps {
  course?: string;
  level?: SkillLevel;
  onPreferencesSet?: (preferences: {
    contentType: 'video' | 'article' | 'both';
    resources: string[];
  }) => void;
}

const Preferences = ({ course: propCourse, level: propLevel, onPreferencesSet }: PreferencesProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get data from props OR location state (route state takes priority)
  const routeState = location.state || {};
  const course = propCourse || routeState.course;
  const level = propLevel || routeState.level;
  const score = routeState.score;

  const [contentPreference, setContentPreference] = useState<'video' | 'article' | 'both'>('both');
  const [selectedResources, setSelectedResources] = useState<string[]>(['w3schools', 'geeksforgeeks']);

  const resources = [
    { id: 'w3schools', name: 'W3Schools', icon: '📚' },
    { id: 'geeksforgeeks', name: 'GeeksforGeeks', icon: '💻' },
    { id: 'programiz', name: 'Programiz', icon: '🐍' },
    { id: 'mdn', name: 'MDN Web Docs', icon: '🌐' },
  ];

  const toggleResource = (resourceId: string) => {
    setSelectedResources(prev =>
      prev.includes(resourceId)
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    );
  };

  const handleSubmit = () => {
    const preferences = {
      contentType: contentPreference,
      resources: selectedResources
    };

    // If onPreferencesSet prop is provided, use it
    if (onPreferencesSet) {
      onPreferencesSet(preferences);
    } else {
      // Default behavior: save to localStorage and navigate
      localStorage.setItem('learningPreferences', JSON.stringify({
        ...preferences,
        course,
        level,
        timestamp: new Date().toISOString()
      }));
      
      // Navigate to dashboard or next step
      navigate('/dashboard');
    }
  };

  // Show error if no course/level data is available
  if (!course || !level) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">No Quiz Data Found</CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Please complete a diagnostic quiz first to set your learning preferences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate('/courses')}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Take Diagnostic Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-2xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Customize Your Learning Path
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Personalize your {course} journey based on your {level} level
            {score && ` (Score: ${score}%)`}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Content Preference */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold text-gray-900">Learning Format</Label>
            <RadioGroup value={contentPreference} onValueChange={(value: 'video' | 'article' | 'both') => setContentPreference(value)}>
              <div className="grid gap-4 md:grid-cols-3">
                <Card 
                  className={`cursor-pointer transition-all duration-300 ${
                    contentPreference === "video" 
                      ? "border-blue-500 shadow-lg scale-105" 
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                  onClick={() => setContentPreference("video")}
                >
                  <CardContent className="flex items-center gap-4 p-6">
                    <RadioGroupItem value="video" id="video" checked={contentPreference === "video"} />
                    <Label htmlFor="video" className="flex items-center gap-3 cursor-pointer flex-1">
                      <Video className="w-6 h-6 text-blue-600" />
                      <div>
                        <div className="font-semibold text-gray-900">Video Only</div>
                        <div className="text-sm text-gray-600">YouTube tutorials and video content</div>
                      </div>
                    </Label>
                    {contentPreference === "video" && <CheckCircle className="w-5 h-5 text-green-500" />}
                  </CardContent>
                </Card>

                <Card 
                  className={`cursor-pointer transition-all duration-300 ${
                    contentPreference === "article" 
                      ? "border-green-500 shadow-lg scale-105" 
                      : "border-gray-200 hover:border-green-300"
                  }`}
                  onClick={() => setContentPreference("article")}
                >
                  <CardContent className="flex items-center gap-4 p-6">
                    <RadioGroupItem value="article" id="article" checked={contentPreference === "article"} />
                    <Label htmlFor="article" className="flex items-center gap-3 cursor-pointer flex-1">
                      <FileText className="w-6 h-6 text-green-600" />
                      <div>
                        <div className="font-semibold text-gray-900">Articles Only</div>
                        <div className="text-sm text-gray-600">GFG, W3Schools, Programiz articles</div>
                      </div>
                    </Label>
                    {contentPreference === "article" && <CheckCircle className="w-5 h-5 text-green-500" />}
                  </CardContent>
                </Card>

                <Card 
                  className={`cursor-pointer transition-all duration-300 ${
                    contentPreference === "both" 
                      ? "border-purple-500 shadow-lg scale-105" 
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                  onClick={() => setContentPreference("both")}
                >
                  <CardContent className="flex items-center gap-4 p-6">
                    <RadioGroupItem value="both" id="both" checked={contentPreference === "both"} />
                    <Label htmlFor="both" className="flex items-center gap-3 cursor-pointer flex-1">
                      <BookOpen className="w-6 h-6 text-purple-600" />
                      <div>
                        <div className="font-semibold text-gray-900">Both Formats</div>
                        <div className="text-sm text-gray-600">Videos and articles combined</div>
                      </div>
                    </Label>
                    {contentPreference === "both" && <CheckCircle className="w-5 h-5 text-green-500" />}
                  </CardContent>
                </Card>
              </div>
            </RadioGroup>
          </div>

          {/* Resource Selection */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold text-gray-900">Preferred Resources</Label>
            <div className="grid gap-3 md:grid-cols-2">
              {resources.map((resource) => (
                <Card
                  key={resource.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedResources.includes(resource.id)
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => toggleResource(resource.id)}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{resource.icon}</span>
                      <span className="font-medium text-gray-900">{resource.name}</span>
                    </div>
                    {selectedResources.includes(resource.id) && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Button 
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg font-semibold rounded-xl"
            size="lg"
          >
            Generate Learning Roadmap
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Preferences;