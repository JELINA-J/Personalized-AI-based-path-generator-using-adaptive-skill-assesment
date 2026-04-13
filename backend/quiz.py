from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any

from llm import generate_llm_response

# ---------------------------------
# ROUTER (THIS WAS MISSING)
# ---------------------------------
router = APIRouter(prefix="/quiz", tags=["Quiz"])


# ---------------------------------
# REQUEST MODELS (THIS WAS MISSING)
# ---------------------------------
class QuizGenerateRequest(BaseModel):
    roadmap: Dict[str, Any]


class GradeOpenRequest(BaseModel):
    questions: List[Dict[str, Any]]
    answers: List[str]


# ---------------------------------
# PROMPT BUILDER
# ---------------------------------
def build_quiz_prompt(topics: str) -> str:
    return f"""
You are an expert technical interviewer.

Generate a strict JSON quiz using ONLY the given topics.

Rules:
- 5 multiple choice questions
- Each MCQ has exactly 4 options
- Include Code output prediction question 
- Exactly ONE correct option
- Questions must test understanding and reasoning
- 3 open-ended questions
- Open-ended questions must include 3-5 key evaluation points
- NO markdown
- NO explanations
- NO text outside JSON

Topics:
{topics}

Return JSON in EXACT format:
{{
  "mcqs": [
    {{
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctIndex": number
    }}
  ],
  "openEnded": [
    {{
      "question": "string",
      "keyPoints": ["string", "string", "string"]
    }}
  ]
}}
"""


# ---------------------------------
# GENERATE QUIZ
# ---------------------------------
@router.post("/generate")
def generate_quiz(req: QuizGenerateRequest):
    roadmap = req.roadmap

    if "milestones" not in roadmap:
        raise HTTPException(status_code=400, detail="Invalid roadmap")

    topics = []
    for m in roadmap["milestones"]:
        topics.extend(m.get("topics", []))

    prompt = build_quiz_prompt(", ".join(set(topics)))
    quiz = generate_llm_response(prompt)

    return quiz


# ---------------------------------
# GRADE OPEN-ENDED QUESTIONS
# ---------------------------------
@router.post("/grade-open")
def grade_open(req: GradeOpenRequest):
    results = []

    if len(req.questions) != len(req.answers):
        raise HTTPException(
            status_code=400,
            detail="Questions and answers length mismatch"
        )

    for q, ans in zip(req.questions, req.answers):
        prompt = f"""
You are a strict examiner.

Question:
{q['question']}

Expected key points:
{q['keyPoints']}

Student answer:
{ans or "No answer provided"}

Rules:
- Score out of 10
- Mention missing key points
- Be concise
- Evaluate based on MEANING, not exact wording

Return ONLY JSON:
{{
  "score": number,
  "feedback": "string"
}}
"""
        grade = generate_llm_response(prompt)

        # 🔐 SAFETY
        if not isinstance(grade, dict) or "score" not in grade:
            grade = {"score": 0, "feedback": "Invalid evaluation"}

        results.append(grade)

    return results
