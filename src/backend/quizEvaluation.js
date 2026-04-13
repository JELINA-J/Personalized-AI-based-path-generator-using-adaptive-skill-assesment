import { callOllama } from "./ollamaClient.js";

export async function evaluateOpenEnded(course, questions, answers) {
  const prompt = `
You are an expert ${course} evaluator.

Evaluate the following answers.
Score each answer from 0 to 5.
Identify weak topics.
Return ONLY JSON.

Format:
{
 "totalScore": number,
 "weakTopics": []
}

Questions & Answers:
${questions.map((q, i) => `
Q${i+1}: ${q}
A${i+1}: ${answers[i]}
`).join("\n")}
`;

  const output = await callOllama(prompt);
  return JSON.parse(output.match(/\{[\s\S]*\}/)[0]);
}
