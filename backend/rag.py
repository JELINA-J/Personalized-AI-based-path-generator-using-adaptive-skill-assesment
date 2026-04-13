from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_text_splitters import CharacterTextSplitter

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

def create_vector_db(texts):
    # ✅ REMOVE empty lines
    texts = [t.strip() for t in texts if t.strip()]

    splitter = CharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )

    docs = splitter.create_documents(texts)

    if not docs:
        raise ValueError("❌ No valid documents found to index")

    db = Chroma.from_documents(
        documents=docs,
        embedding=embeddings,
        persist_directory="./chroma"
    )

    return db

def search_context(query):
    db = Chroma(
        persist_directory="./chroma",
        embedding_function=embeddings
    )
    results = db.similarity_search(query, k=3)
    return "\n".join([r.page_content for r in results])
