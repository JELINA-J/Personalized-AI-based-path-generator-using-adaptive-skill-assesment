from database import engine, Base
from models import LearningPath  # IMPORTANT: import models

print("Creating database tables...")
Base.metadata.create_all(bind=engine)
print("Done.")
