from fastapi import APIRouter
from llm import generate_llm_response

router = APIRouter(prefix="/projects", tags=["Projects"])

@router.post("/generate")
def generate_projects(data: dict):
    prompt = f"""
You are a senior software career mentor.

Generate 3 real-world, resume-worthy project ideas.

Course / Role: {data['course']}
Skill Level: {data['level']}

Rules:
- Projects must match the skill level
- Beginner → simple CRUD & fundamentals
- Intermediate → APIs, state, auth
- Advanced → system design, performance, scalability

Return ONLY valid JSON.
No markdown.
No explanation.

Each project must contain:
- title
- description
- skills (array)
- difficulty
- estimatedTime

JSON array only.
"""
    return generate_llm_response(prompt)
