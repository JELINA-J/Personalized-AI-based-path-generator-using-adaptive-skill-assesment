from openai import OpenAI

client = OpenAI(
    api_key="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"
)

response = client.responses.create(
    model="gpt-4.1-nano",
    input="Say hello"
)

print(response.output_text)
