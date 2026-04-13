import { useState } from "react";
import { generatePath } from "../api";
import ChatbotWidget from "./chatbot";
import { useNavigate } from "react-router-dom";
 import { BookOpen, Target, Clock, Sparkles } from "lucide-react";


interface Resource {
  title: string;
  url: string;
  description: string;
}

interface Milestone {
  week: number;
  title: string;
  topics?: string[];
  resources?: Resource[];
}

interface Roadmap {
  title?: string;
  duration_weeks?: number;
  milestones?: Milestone[];
  error?: string;
  details?: string;
}

const durationOptions = [
  { label: "1 Week", weeks: 1 },
  { label: "2 Weeks", weeks: 2 },
  { label: "3 Weeks", weeks: 3 },
  { label: "1 Month", weeks: 4 },
  { label: "2 Months", weeks: 8 },
  { label: "3 Months", weeks: 12 },
  { label: "4 Months", weeks: 16 },
  { label: "5 Months", weeks: 20 },
  { label: "6 Months", weeks: 24 }
];

const Assessment = () => {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [durationWeeks, setDurationWeeks] = useState(12);
  const [durationLabel, setDurationLabel] = useState("3 Months");
  const [result, setResult] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(false);
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([]);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!topic) {
      alert("Please select a role");
      return;
    }

    setLoading(true);
    setResult(null);
    setCompletedWeeks([]);

    try {
      const data = await generatePath({
        topic,
        level,
        duration: durationWeeks
      });

      if (!data || data.error) {
        throw new Error(data?.error || "Invalid API response");
      }

      setResult(data);
    } catch (err) {
      console.error("Assessment error:", err);
      alert("Failed to generate learning path");
    } finally {
      setLoading(false);
    }
  };

  const toggleWeekCompletion = (week: number) => {
    setCompletedWeeks(prev =>
      prev.includes(week)
        ? prev.filter(w => w !== week)
        : [...prev, week]
    );
  };

  const totalWeeks = result?.milestones?.length || 0;
  const allWeeksCompleted = totalWeeks > 0 && completedWeeks.length === totalWeeks;

  return (
      <div className="relative min-h-screen overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50" />

      {/* Subtle Grid */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />

      {/* Floating Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative max-w-3xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div
            style={{
              display: "inline-flex",
              padding: 16,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              color: "white"
            }}
          >
            <Sparkles />
          </div>

          <h1 className="text-4xl font-bold mt-4">
            AI Learning Path Generator
          </h1>
          <p className="text-gray-600 mt-2 max-w-xl mx-auto">
            Personalized roadmap based on your role, skill level and timeline
          </p>
        </div>

      {/* FORM */}

<div
  style={{
    background: "linear-gradient(135deg, #eef2ff, #fdf4ff)",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  }}
  className="space-y-6 max-w-md mx-auto"
>
  {/* Role */}
  <div className="space-y-2">
    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
      <Target size={16} /> Select Role
    </label>
    <select
      value={topic}
      onChange={(e) => setTopic(e.target.value)}
      style={{
        padding: "12px",
        borderRadius: "10px",
        border: "1px solid #c7d2fe",
        backgroundColor: "white",
      }}
      className="w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
    >
      <option value="">Choose your career path</option>
      <option>Full Stack Developer</option>
      <option>Java Developer</option>
      <option>Data Analyst</option>
      <option>Frontend Developer</option>
      <option>Backend Developer</option>
      <option>Python Developer</option>
      <option>AI Engineer</option>
      <option>Cloud Engineer</option>
      <option>DevOps Engineer</option>
      <option>Cybersecurity</option>
      <option>Software Development Engineer (SDE)</option>
    </select>
  </div>

  {/* Level */}
  <div className="space-y-2">
    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
      <BookOpen size={16} /> Skill Level
    </label>
    <select
      value={level}
      onChange={(e) => setLevel(e.target.value)}
      style={{
        padding: "12px",
        borderRadius: "10px",
        border: "1px solid #c7d2fe",
        backgroundColor: "white",
      }}
      className="w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
    >
      <option>Beginner</option>
      <option>Intermediate</option>
      <option>Advanced</option>
    </select>
  </div>

  {/* Duration */}
  <div className="space-y-2">
    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
      <Clock size={16} /> Learning Duration
    </label>
    <select
      value={durationWeeks}
      onChange={(e) => {
        const selected = durationOptions.find(
          opt => opt.weeks === Number(e.target.value)
        );
        setDurationWeeks(Number(e.target.value));
        setDurationLabel(selected?.label || "");
      }}
      style={{
        padding: "12px",
        borderRadius: "10px",
        border: "1px solid #c7d2fe",
        backgroundColor: "white",
      }}
      className="w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
    >
      {durationOptions.map(opt => (
        <option key={opt.label} value={opt.weeks}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>

  {/* CTA */}
  <button
    onClick={handleSubmit}
    disabled={loading}
    style={{
      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
      borderRadius: "12px",
      padding: "14px",
      fontWeight: "600",
      boxShadow: "0 8px 20px rgba(99,102,241,0.35)",
    }}
    className="w-full text-white flex items-center justify-center gap-2 hover:opacity-95 transition disabled:opacity-60"
  >
    <Sparkles size={18} />
    {loading ? "Generating Path..." : "Generate Learning Path"}
  </button>
</div>

      {/* ROADMAP */}
      {result?.milestones && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            {topic} Roadmap ({durationLabel})
          </h2>

          {/* PROGRESS BAR */}
          <div className="mb-6">
            <div className="h-2 bg-gray-200 rounded">
              <div
                className="h-2 bg-green-500 rounded"
                style={{
                  width: `${(completedWeeks.length / totalWeeks) * 100}%`
                }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {completedWeeks.length} / {totalWeeks} weeks completed
            </p>
          </div>

          <div className="space-y-4">
            {result.milestones.map((m) => {
              const isCompleted = completedWeeks.includes(m.week);

              return (
                <div
                  key={m.week}
                  className={`p-4 border rounded-md ${isCompleted ? "bg-green-50 border-green-400" : ""
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">
                       {m.title}
                    </h3>

                    <button
                      onClick={() => toggleWeekCompletion(m.week)}
                      className={`px-3 py-1 text-sm rounded-md ${isCompleted
                          ? "bg-green-600 text-white"
                          : "bg-gray-200"
                        }`}
                    >
                      {isCompleted ? "Completed ✓" : "Mark Complete"}
                    </button>
                  </div>

                  {m.topics && (
                    <ul className="list-disc ml-5 mt-2">
                      {m.topics.map((t, i) => (
                        <li key={i}>{t}</li>
                      ))}
                    </ul>
                  )}

                  {m.resources && (
                    <div className="mt-3">
                      <h4 className="font-semibold">Resources</h4>
                      <ul className="space-y-2">
                        {m.resources.map((r, i) => (
                          <li key={i}>
                            <a
                              href={r.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 font-medium"
                            >
                              {r.title}
                            </a>
                            <p className="text-sm text-gray-600">
                              {r.description}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* QUIZ UNLOCK */}
          <div className="mt-8">
            {allWeeksCompleted ? (
              <button
                className="w-full p-3 bg-green-600 text-white rounded-md"
                onClick={() =>
                  navigate("/quiz", {
                    state: {
                      roadmap: result,
                      topic,
                      level
                    }
                  })
                }
                
              >
                Start Final Quiz
              </button>
            ) : (
              <p className="text-center text-gray-500">
                Complete all weeks to unlock the quiz
              </p>
            )}
          </div>
        </div>
      )}

      {/* CHATBOT */}
      {result && (
        <ChatbotWidget
          course={topic}
          level={level}
          roadmap={result}
          onRoadmapUpdate={setResult}
        />
      )}
    </div>
    </div>
  );
};

export default Assessment; 
