import { callOllama } from "./ollamaClient.js";

export async function generateLearningPath(course, level, weakTopics) {
  const prompt = `
You are an AI tutor.

Generate a personalized learning path for:
Course: ${course}
Level: ${level}
Weak topics: ${weakTopics.join(", ")}

Return ONLY JSON.

{
 "course": "",
 "level": "",
 "path": [
   {
     "topic": "",
     "description": "",
     "resources": [
       "https://www.geeksforgeeks.org/...",
       "https://www.w3schools.com/..."
     ]
   }
 ]
}
`;

  const output = await callOllama(prompt);
  return JSON.parse(output.match(/\{[\s\S]*\}/)[0]);
}
