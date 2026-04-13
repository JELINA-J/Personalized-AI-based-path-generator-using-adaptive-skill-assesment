interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}
export const generateQuizFromRoadmap = (
  roadmap: any
): QuizQuestion[] => {
  const questions: QuizQuestion[] = [];

  roadmap.milestones.forEach((m: any) => {
    m.topics?.forEach((topic: string) => {
      questions.push({
        question: `What is ${topic}?`,
        options: [
          `Definition of ${topic}`,
          `Unrelated concept`,
          `Wrong explanation`,
          `None of the above`
        ],
        correctIndex: 0
      });
    });
  });

  return questions.slice(0, 10); // limit quiz size
};
