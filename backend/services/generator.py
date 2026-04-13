from llm import generate_llm_response
from rag import search_context
import json
from llm import generate_llm_response
from rag import search_context

def generate_learning_path(topic, level, duration_weeks):
    context = search_context(topic)

    if not context or len(context.strip()) < 50:
        context = f"General learning roadmap for {topic}"

    prompt = f"""
You are an expert career mentor.

Return ONLY valid JSON.
Do NOT use markdown.
Do NOT explain anything.
Do NOT include trailing commas.
Every string must be closed.

For EACH milestone:
- "resources" field is MANDATORY
- Include EXACTLY 3 resources
- Resource 1: Official documentation (real URL)
- Resource 2: Tutorial or article (real URL)
- Resource 3: YouTube video
- For YouTube: provide ONLY "search_query"
- DO NOT generate YouTube URLs
Role Interpretation Rules:
- Full Stack Developer → Frontend + Backend + Database + Deployment
- Frontend Developer → HTML, CSS, JS, React,Portfolio
- Backend Developer → APIs, Databases, Auth, Performance
- Java Developer → Core Java, OOP, Spring, REST
- Python Developer → Python, OOP, APIs, Automation
- Data Analyst → SQL, Python, Pandas, Visualization
- AI Engineer → ML, DL, Model Deployment
- AML Engineer → Compliance, Risk, Monitoring
- Cloud Engineer → AWS/GCP/Azure, Networking, Security
- DevOps Engineer → CI/CD, Docker, Kubernetes
- Cybersecurity → Networking, Security, Pentesting
-Software Development Engineer (SDE) → Programming + DSA + Core CS + System Design + Scalable Backend + Testing
MUST Do NOT default to Java unless explicitly required.
STRICT RULES:
- Role: {topic}
- Level: {level}
- Duration: {duration_weeks} weeks
- Generate EXACTLY {duration_weeks} milestones
- Weeks start from 1, sequential, never repeat
- Each week must have unique topics

JSON SCHEMA:
{{
  "title": "string",
  "duration_weeks": {duration_weeks},
  "milestones": [
    {{
      "week": 1,
      "title": "string",
      "topics": ["string"],
      "resources": [
        {{
          "title": "string",
          "url": "string",
          "search_query": "",
          "description": "string"
        }},
        {{
          "title": "string",
          "url": "string",
          "search_query": "",
          "description": "string"
        }},
        {{
          "title": "string",
          "url": "",
          "search_query": "string",
          "description": "string"
        }}
      ]
    }}
  ]
}}

    return generate_llm_response(prompt)
Topic: {topic}
Level: {level}
Duration: {duration_weeks} weeks

Context:
{context}
"""

    return generate_llm_response(prompt)
import json

def chat_with_roadmap(message, roadmap, course, level):
    prompt = f"""
You are an AI learning mentor.

Course: {course}
Level: {level}

Roadmap:
{roadmap}

User message:
{message}

Decide whether to:
- modify roadmap
- explain topic
- give guidance

Rules:
- The learning plan is divided into weeks (Week 1, Week 2, etc.)
- The user may ask about ANY week
- The user may ask to explain, modify, or expand topics
- Respond conversationally like a chatbot
- If the user asks to explain, explain clearly with examples
- If the user asks to change a week, update that week only
- If the user asks a general question, answer normally
- If user is stuck, suggest revision
- If user progresses fast, unlock advanced topics

TASK:
1. Detect user intent from this list:
   - EXPLAIN_TOPIC
   - MODIFY_WEEK
   - ADD_RESOURCES
   - USER_STUCK
   - FAST_PROGRESS
   - GENERAL_CHAT

2. Respond accordingly.

RULES:
- If EXPLAIN_TOPIC → explain clearly with examples
- If MODIFY_WEEK → return updated roadmap JSON
- If ADD_RESOURCES → add real learning resources
- If USER_STUCK → suggest revision resources
- If FAST_PROGRESS → unlock advanced topics
- Otherwise → normal chat
IMPORTANT:
- When intent is MODIFY_WEEK:
  - Identify the week number
  - Modify ONLY that week
  - Do NOT change other weeks
  - Return the FULL updated roadmap JSON

Return ONLY valid JSON in this format:
{{
  "intent": MODIFY_WEEK,
  "reply": "string",
  "updated_roadmap": null
}}
"""

    return generate_llm_response(prompt)

