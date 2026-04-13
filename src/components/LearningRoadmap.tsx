import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, Play, CheckCircle, Star, Puzzle, BookOpen, Video } from 'lucide-react';

// Define the type for level
type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  level: SkillLevel;
  completed: boolean;
  locked: boolean;
  type: 'lesson' | 'practice' | 'project' | 'quiz';
  resources: {
    articles?: string[];
    videos?: string[];
  };
}

interface LearningRoadmapProps {
  course: string;
  level: SkillLevel; // Use the specific type
  preferences: {
    contentType: 'video' | 'article' | 'both';
    resources: string[];
  };
}

const LearningRoadmap = ({ course, level, preferences }: LearningRoadmapProps) => {
  const [roadmap, setRoadmap] = useState<RoadmapItem[]>(getInitialRoadmap());
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);

  function getInitialRoadmap(): RoadmapItem[] {
    // Define roadmap based on course and level
    const baseRoadmap: RoadmapItem[] = [
      {
        id: 'variables',
        title: 'Variables & Data Types',
        description: 'Learn about variables, data types, and basic operations',
        level: 'beginner',
        completed: false,
        locked: false,
        type: 'lesson',
        resources: {
          articles: ['https://www.w3schools.com/python/python_variables.asp'],
          videos: ['https://youtube.com/watch?v=example1']
        }
      },
    ];

    return baseRoadmap;
  }

  const unlockNextTopic = (completedId: string) => {
    setRoadmap(prev => prev.map(item => {
      if (item.id === completedId) {
        return { ...item, completed: true };
      }
      
      // Find the index of completed item
      const completedIndex = prev.findIndex(i => i.id === completedId);
      const nextIndex = completedIndex + 1;
      
      // Unlock the next item if it exists
      if (nextIndex < prev.length && prev[nextIndex].locked) {
        return { ...prev[nextIndex], locked: false };
      }
      
      return item;
    }));
  };

  const handleStartTopic = (topic: RoadmapItem) => {
    setCurrentTopic(topic.id);
  };

  const handleCompleteTopic = (topicId: string) => {
    unlockNextTopic(topicId);
    setCurrentTopic(null);
  };

  const getResourceLinks = (topic: RoadmapItem) => {
    const links = [];
    
    if (preferences.contentType !== 'video' && topic.resources.articles) {
      links.push(...topic.resources.articles.map(url => ({
        type: 'article' as const,
        url,
        name: getResourceName(url)
      })));
    }
    
    if (preferences.contentType !== 'article' && topic.resources.videos) {
      links.push(...topic.resources.videos.map(url => ({
        type: 'video' as const,
        url,
        name: 'Video Tutorial'
      })));
    }
    
    return links;
  };

  const getResourceName = (url: string) => {
    if (url.includes('w3schools')) return 'W3Schools Tutorial';
    if (url.includes('geeksforgeeks')) return 'GeeksforGeeks Article';
    if (url.includes('programiz')) return 'Programiz Guide';
    return 'Learning Resource';
  };

  if (currentTopic) {
    const topic = roadmap.find(t => t.id === currentTopic);
    if (!topic) return null;

    if (topic.type === 'practice') {
      return (
        <PuzzleGame 
          topic={topic}
          onComplete={() => handleCompleteTopic(topic.id)}
          onBack={() => setCurrentTopic(null)}
        />
      );
    }

    return (
      <TopicViewer
        topic={topic}
        resources={getResourceLinks(topic)}
        onComplete={() => handleCompleteTopic(topic.id)}
        onBack={() => setCurrentTopic(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {course} Learning Roadmap
          </h1>
          <p className="text-lg text-gray-600">
            Master {course} step by step. Complete topics to unlock new challenges!
          </p>
          <Badge variant="secondary" className="mt-2">
            {level.charAt(0).toUpperCase() + level.slice(1)} Level
          </Badge>
        </div>

        <div className="space-y-4">
          {roadmap.map((topic, index) => (
            <Card 
              key={topic.id}
              className={`relative transition-all duration-300 ${
                topic.completed 
                  ? 'border-green-500 bg-green-50' 
                  : topic.locked
                  ? 'border-gray-300 bg-gray-100'
                  : 'border-blue-500 bg-white hover:shadow-lg'
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {topic.completed ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : topic.locked ? (
                      <Lock className="w-6 h-6 text-gray-400" />
                    ) : topic.type === 'practice' ? (
                      <Puzzle className="w-6 h-6 text-purple-500" />
                    ) : (
                      <BookOpen className="w-6 h-6 text-blue-500" />
                    )}
                    
                    <div>
                      <CardTitle className="text-xl">{topic.title}</CardTitle>
                      <CardDescription>{topic.description}</CardDescription>
                    </div>
                  </div>
                  
                  <Badge variant={
                    topic.level === 'beginner' ? 'default' :
                    topic.level === 'intermediate' ? 'secondary' : 'destructive'
                  }>
                    {topic.level}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {preferences.contentType !== 'video' && topic.resources.articles && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        Articles
                      </Badge>
                    )}
                    {preferences.contentType !== 'article' && topic.resources.videos && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Video className="w-3 h-3" />
                        Videos
                      </Badge>
                    )}
                    {topic.type === 'practice' && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Puzzle className="w-3 h-3" />
                        Puzzle
                      </Badge>
                    )}
                  </div>
                  
                  <Button
                    onClick={() => handleStartTopic(topic)}
                    disabled={topic.locked}
                    variant={topic.type === 'practice' ? 'secondary' : 'default'}
                  >
                    {topic.type === 'practice' ? (
                      <>
                        <Puzzle className="w-4 h-4 mr-2" />
                        Start Puzzle
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Start Learning
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>

              {/* Progress connector */}
              {index < roadmap.length - 1 && (
                <div className={`absolute -bottom-4 left-8 w-0.5 h-4 ${
                  topic.completed ? 'bg-green-500' : 'bg-gray-300'
                }`} />
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Puzzle Game Component
const PuzzleGame = ({ topic, onComplete, onBack }: any) => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [score, setScore] = useState(0);

  const puzzles = [
    {
      question: "What is the output of: x = 5; print(x)",
      options: ["5", "x", "Error", "None"],
      correct: 0
    },
    {
      question: "Which keyword is used to define a variable in Python?",
      options: ["var", "let", "def", "No specific keyword"],
      correct: 3
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    if (answerIndex === puzzles[currentPuzzle].correct) {
      setScore(score + 1);
    }
    
    if (currentPuzzle < puzzles.length - 1) {
      setCurrentPuzzle(currentPuzzle + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Puzzle className="w-6 h-6 text-purple-600" />
            {topic.title}
          </CardTitle>
          <CardDescription>Solve the puzzle to continue your journey!</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-sm text-gray-600">Puzzle {currentPuzzle + 1} of {puzzles.length}</div>
            <div className="text-lg font-semibold mt-2">
              {puzzles[currentPuzzle].question}
            </div>
          </div>
          
          <div className="grid gap-3">
            {puzzles[currentPuzzle].options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start h-auto py-3 text-left"
                onClick={() => handleAnswer(index)}
              >
                {option}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={onBack}>
              Back to Roadmap
            </Button>
            <div className="flex-1" />
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>Score: {score}/{puzzles.length}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Topic Viewer Component
const TopicViewer = ({ topic, resources, onComplete, onBack }: any) => {
  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={onBack}>
            Back to Roadmap
          </Button>
          <h1 className="text-3xl font-bold">{topic.title}</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardDescription>{topic.description}</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Learning Resources</h3>
              <div className="grid gap-3">
                {resources.map((resource: any, index: number) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {resource.type === 'article' ? (
                          <BookOpen className="w-5 h-5 text-blue-600" />
                        ) : (
                          <Video className="w-5 h-5 text-red-600" />
                        )}
                        <span>{resource.name}</span>
                      </div>
                      <Button asChild variant="outline" size="sm">
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          Open
                        </a>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            <Button onClick={onComplete} className="w-full" size="lg">
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark as Complete
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LearningRoadmap;