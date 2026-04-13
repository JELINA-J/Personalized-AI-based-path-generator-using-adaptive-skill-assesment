import json
import re
import os
from dotenv import load_dotenv
from groq import Groq

# Load .env BEFORE creating client
load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def clean_llm_output(text: str) -> str:
    return re.sub(r"```json|```", "", text, flags=re.IGNORECASE).strip()

def safe_extract_json(text: str):
    text = clean_llm_output(text)

    start = text.find("{")
    if start == -1:
        raise ValueError("No JSON start found")

    for end in range(len(text), start, -1):
        try:
            return json.loads(text[start:end])
        except json.JSONDecodeError:
            continue

    raise ValueError("Invalid JSON")

def generate_llm_response(prompt: str):
    response = client.chat.completions.create(
       model="llama-3.1-8b-instant",  # or llama3-70b-8192
        messages=[
            {
                "role": "system",
                "content": "You are a strict JSON-only API. Respond ONLY with valid JSON."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0
    )

    content = response.choices[0].message.content

    try:
        return safe_extract_json(content)
    except Exception as e:
        return {
            "error": "Invalid JSON from Groq",
            "details": str(e),
            "raw_response": content[:1500]
        }
