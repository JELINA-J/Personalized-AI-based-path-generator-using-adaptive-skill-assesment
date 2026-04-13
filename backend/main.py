from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import SessionLocal, engine, Base
from models import LearningPath
from services.generator import generate_learning_path, chat_with_roadmap
from quiz import router as quiz_router
from projects import router as projects_router
from jobs.router import router as jobs_router
from roadmap_postprocess import attach_youtube_urls
import os
# ----------------------------------
# Database init
# ----------------------------------
Base.metadata.create_all(bind=engine)

# ----------------------------------
# App init
# ----------------------------------
app = FastAPI()

# ----------------------------------
# CORS (React ↔ FastAPI)
# ----------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(quiz_router)
app.include_router(projects_router)
app.include_router(jobs_router)


# ----------------------------------
# Health check
# ----------------------------------
@app.get("/")
def root():
    return {"status": "AI Learning Path Generator running"}

# ----------------------------------
# Generate roadmap
# ----------------------------------
@app.post("/generate")
def generate_path(data: dict):
    db = SessionLocal()

    try:
        cached = db.query(LearningPath).filter_by(
            topic=data["topic"],
            level=data["level"],
            duration=data["duration"]
        ).first()

        if cached:
            return cached.content

        roadmap = generate_learning_path(
            topic=data["topic"],
            level=data["level"],
            duration_weeks=data["duration"]
        )

        if isinstance(roadmap, dict) and "error" in roadmap:
            return roadmap
        roadmap = attach_youtube_urls(roadmap)

        
        db.add(
            LearningPath(
                topic=data["topic"],
                level=data["level"],
                duration=data["duration"],
                content=roadmap
            )
        )
        db.commit()

        return roadmap

    finally:
        db.close()

# ----------------------------------
# Chatbot (dynamic roadmap editor)
# ----------------------------------
@app.post("/chat")
def chat(data: dict):
    try:
        response = chat_with_roadmap(
            message=data["message"],
            roadmap=data["roadmap"],
            course=data["course"],
            level=data["level"]
        )

        # Normalize LLM response
        if isinstance(response, dict):
            reply = (
                response.get("reply")
                or response.get("response")
                or response.get("message")
                or response.get("explanation")
                or ""
            )

            return {
                "reply": reply,
                "updated_roadmap": response.get("updated_roadmap")
            }

        # Fallback safety
        return {
            "reply": str(response),
            "updated_roadmap": None
        }

    except Exception as e:
        print("CHAT ERROR:", e)
        return {
            "reply": "⚠️ Sorry, something went wrong while processing your request.",
            "updated_roadmap": None
        }
