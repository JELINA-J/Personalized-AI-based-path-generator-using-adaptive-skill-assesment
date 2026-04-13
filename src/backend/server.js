import express from "express";
import cors from "cors";
import { evaluateOpenEnded } from "./quizEvaluation.js";
import { generateLearningPath } from "./pathGenerator.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/analyze-quiz", async (req, res) => {
  const { course, mcqScore, totalMcqs, openQuestions, openAnswers } = req.body;

  // AI evaluation
  const openEval = await evaluateOpenEnded(course, openQuestions, openAnswers);

  // Final score
  const mcqPercent = mcqScore / totalMcqs;
  const openPercent = openEval.totalScore / (openQuestions.length * 5);

  const finalScore = Math.round((mcqPercent * 0.7 + openPercent * 0.3) * 100);

  let level =
    finalScore <= 40 ? "Beginner" :
    finalScore <= 70 ? "Intermediate" :
    "Advanced";

  // AI Path generation
  const learningPath = await generateLearningPath(course, level, openEval.weakTopics);

  res.json({
    score: finalScore,
    level,
    learningPath
  });
});

app.listen(5000, () =>
  console.log("🚀 AI Backend running on http://localhost:5000")
);
