from config import COURSES
from services.generator import generate_learning_path
from database import SessionLocal
from models import LearningPath

def pre_generate_all():
    db = SessionLocal()

    for course in COURSES:
        exists = db.query(LearningPath).filter_by(
            topic=course,
            level="Beginner",
            duration=12
        ).first()

        if exists:
            print(f"✔ Cached: {course}")
            continue

        print(f"⏳ Generating {course}")
        roadmap = generate_learning_path(course, "Beginner", 12)

        db.add(LearningPath(
            topic=course,
            level="Beginner",
            duration=12,
            content=roadmap
        ))
        db.commit()

    db.close()
