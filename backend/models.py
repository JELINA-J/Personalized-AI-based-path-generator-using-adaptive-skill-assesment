from sqlalchemy import Column, Integer, String, JSON  # ✅ ADD JSON
from database import Base

class LearningPath(Base):
    __tablename__ = "learning_paths"

    id = Column(Integer, primary_key=True, index=True)
    topic = Column(String, index=True)
    level = Column(String)
    duration = Column(Integer)
    content = Column(JSON)   # FULL roadmap JSON
