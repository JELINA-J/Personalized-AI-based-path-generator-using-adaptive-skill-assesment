import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AlertCircle,
  Shield,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";
    // ✅ FIX
const TOTAL_TIME = 15 * 60; // 15 minutes
const MAX_VIOLATIONS = 1;
const PASS_MARK = 70;

const Quiz = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
const roadmap = state?.roadmap;
const course = state?.topic ?? "this course";
const user = state?.username ?? "Learner";   // ✅ FIX
const level = state?.level ?? "Beginner";
  
  const [quiz, setQuiz] = useState<any>(null);
  const [quizStarted, setQuizStarted] = useState(false);
const [grading, setGrading] = useState(false);

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [openAnswers, setOpenAnswers] = useState<string[]>([]);
  const [openResults, setOpenResults] = useState<any[]>([]);
  const [finished, setFinished] = useState(false);

  const [violated, setViolated] = useState(false);

  const submittedRef = useRef(false);

  // ---------------- FETCH QUIZ ----------------
  useEffect(() => {
    if (!roadmap) {
      navigate("/");
      return;
    }

    axios
      .post("http://localhost:8000/quiz/generate", { roadmap })
      .then(res => setQuiz(res.data))
      .catch(() => alert("Failed to load quiz"));
  }, []);

  // ---------------- TIMER ----------------
  useEffect(() => {
    if (!quizStarted || finished) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          submitQuiz(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, finished]);

  // ---------------- FULLSCREEN + TAB GUARD ----------------
  useEffect(() => {
    if (!quizStarted) return;

    const violationHandler = () => registerViolation();

    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement) violationHandler();
    });

    window.addEventListener("blur", violationHandler);

    return () => {
      window.removeEventListener("blur", violationHandler);
    };
  }, [quizStarted]);

  // ---------------- COPY / PASTE BLOCK ----------------
  useEffect(() => {
    if (!quizStarted) return;

    const block = (e: Event) => e.preventDefault();
    ["copy", "paste", "contextmenu", "cut"].forEach(ev =>
      document.addEventListener(ev, block)
    );

    return () =>
      ["copy", "paste", "contextmenu", "cut"].forEach(ev =>
        document.removeEventListener(ev, block)
      );
  }, [quizStarted]);

  // ---------------- VIOLATION ----------------
  const registerViolation = () => {
    if (submittedRef.current) return;
    setViolated(true);
    submitQuiz(true);
  };

  // ---------------- START QUIZ ----------------
  const startQuiz = async () => {
    try {
      await document.documentElement.requestFullscreen();
      setQuizStarted(true);
    } catch {
      alert("Fullscreen permission required");
    }
  };

  // ---------------- SUBMIT ----------------
  const submitQuiz = async (isViolation: boolean) => {
  if (submittedRef.current) return;
  submittedRef.current = true;

  setFinished(true);
  setGrading(true); // 👈 START GRADING

  try {
    await document.exitFullscreen();
  } catch {}

  if (quiz?.openEnded?.length) {
    const res = await axios.post(
      "http://localhost:8000/quiz/grade-open",
      {
        questions: quiz.openEnded,
        answers: quiz.openEnded.map(
          (_: any, i: number) => openAnswers[i] ?? ""
        )
      }
    );

    setOpenResults(res.data);
  }

  setGrading(false); // 👈 DONE GRADING
};

  // ---------------- LOADING ----------------
  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading quiz…</p>
      </div>
    );
  }

  // ---------------- START SCREEN ----------------
  if (!quizStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow space-y-6">
          <div className="text-center space-y-3">
            <Shield className="w-16 h-16 mx-auto text-blue-700" />
            <h1 className="text-3xl font-bold">Proctored Final Quiz</h1>
            <p className="text-gray-600">
              This quiz evaluates your readiness in <strong>{course}</strong>.
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 p-4 rounded space-y-2">
            <h2 className="font-semibold text-red-700 flex gap-2">
              <AlertCircle /> Strict Rules
            </h2>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• Fullscreen enforced</li>
              <li>• No tab switching</li>
              <li>• Copy / paste blocked</li>
              <li>• ONE violation → instant submissionviolations = auto submit</li>
            </ul>
          </div>

          <button
            onClick={startQuiz}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded text-lg flex items-center justify-center gap-2"
          >
            <Shield /> Start Proctored Quiz
          </button>
        </div>
      </div>
    );
  }


  // ---------------- RESULT SCREEN (SUPER UI) ----------------
 if (finished && grading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Clock className="animate-spin mr-2" />
        Evaluating answers…
      </div>
    );
  }
      
      // ---------------- FINAL RESULT ----------------
if (finished && !grading) {
  const mcqPercent = (score / quiz.mcqs.length) * 100;

  const openScore = openResults.reduce(
    (sum, r) => sum + (r.score ?? 0),
    0
  );

  const openPercent =
    quiz.openEnded.length > 0
      ? (openScore / (quiz.openEnded.length * 10)) * 100
      : 0;

  const totalScore = mcqPercent * 0.7 + openPercent * 0.3;
  const passed = totalScore >= PASS_MARK && !violated;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">

        {/* ---------- HEADER ---------- */}
        <div className="text-center space-y-2">
          {violated ? (
            <XCircle className="w-16 h-16 mx-auto text-red-600" />
          ) : (
            <CheckCircle className="w-16 h-16 mx-auto text-green-600" />
          )}

          <h2 className="text-3xl font-bold">
            {violated ? "Quiz Auto-Submitted" : "Quiz Completed"}
          </h2>

          <p className="text-gray-600">
            {violated
              ? "A proctoring violation was detected."
              : "Great job completing the quiz."}
          </p>
        </div>

        {/* ---------- SCORES ---------- */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-indigo-50 p-4 rounded-xl text-center">
            <p className="text-sm text-gray-500">MCQ Score</p>
            <p className="text-2xl font-bold">
              {score} / {quiz.mcqs.length}
            </p>
          </div>

          <div className="bg-indigo-50 p-4 rounded-xl text-center">
            <p className="text-sm text-gray-500">Open-ended</p>
            <p className="text-2xl font-bold">
              {openScore} / {quiz.openEnded.length * 10}
            </p>
          </div>
        </div>

        {/* ---------- TIME ---------- */}
        <div className="bg-gray-100 p-4 rounded-xl flex items-center gap-3">
          <Clock className="text-gray-600" />
          <p className="text-sm">
            Time Remaining: {Math.floor(timeLeft / 60)}:
            {String(timeLeft % 60).padStart(2, "0")}
          </p>
        </div>

        {/* ---------- ACTION ---------- */}
        <div className="pt-4 text-center">
          {passed ? (
            <button
              onClick={() =>
                navigate("/certification", {
                  state: {
                    username: user,
                    score: Math.round(totalScore),
                    course,
                    level
                  }
                })
              }
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg"
            >
              🎓 View Certificate
            </button>
          ) : (
            <button
              onClick={() => navigate("/")}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-lg"
            >
              Back to Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


  // ---------------- MCQs ----------------
  if (current < quiz.mcqs.length) {
  const q = quiz.mcqs[current];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 flex items-center justify-center p-8">

      {/* TIMER */}
      <div className="fixed top-6 right-6 bg-indigo-600 text-white px-6 py-3 rounded-full shadow-xl text-lg font-semibold flex items-center gap-2">
        <Clock className="w-5 h-5" />
        {Math.floor(timeLeft / 60)}:
        {String(timeLeft % 60).padStart(2, "0")}
      </div>

      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl p-10">

        {/* PROGRESS BAR */}
        <div className="mb-6">
          <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
            <span>Question {current + 1} of {quiz.mcqs.length}</span>
            <span>{Math.round((current / quiz.mcqs.length) * 100)}%</span>
          </div>

          <div className="w-full bg-gray-300 h-3 rounded-full">
            <div
              className="bg-indigo-600 h-3 rounded-full transition-all"
              style={{ width: `${(current / quiz.mcqs.length) * 100}%` }}
            />
          </div>
        </div>

        {/* QUESTION */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold text-indigo-900 leading-relaxed">
            {q.question}
          </h3>
        </div>

        {/* OPTIONS */}
        {q.options.map((o: string, i: number) => (
          <button
            key={i}
            onClick={() => {
              if (i === q.correctIndex) setScore(s => s + 1);
              setCurrent(c => c + 1);
            }}
            className="w-full text-left border-2 border-gray-300 bg-white 
                       p-4 my-3 rounded-xl text-lg
                       hover:bg-indigo-100 hover:border-indigo-500
                       transition-all duration-200 shadow-sm"
          >
            <span className="font-semibold text-indigo-700 mr-2">
              {String.fromCharCode(65 + i)}.
            </span>
            <span className="text-gray-800">{o}</span>
          </button>
        ))}

      </div>
    </div>
  );
}


  // ---------------- OPEN ENDED ----------------
  return (
      <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Open-ended Questions</h2>

      {quiz.openEnded.map((q: any, i: number) => (
        <div key={i} className="mb-4">
          <p className="font-medium">{q.question}</p>
          <textarea
            rows={4}
            className="w-full border p-2 rounded mt-2"
            onChange={e => {
              const c = [...openAnswers];
              c[i] = e.target.value;
              setOpenAnswers(c);
            }}
          />
        </div>
      ))}

      <button
        onClick={() => submitQuiz(false)}
        className="w-full bg-green-600 text-white p-3 rounded-xl text-lg"
      >
        Submit Quiz
      </button>
    </div>
  );
};

export default Quiz;