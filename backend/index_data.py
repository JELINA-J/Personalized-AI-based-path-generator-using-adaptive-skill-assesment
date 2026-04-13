from rag import create_vector_db

with open("data/resources.txt", "r", encoding="utf-8") as f:
    texts = f.read().splitlines()

create_vector_db(texts)

print("✅ Vector DB created successfully")
