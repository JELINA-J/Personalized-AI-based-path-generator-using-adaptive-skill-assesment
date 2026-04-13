// src/utils/hybridEvaluation.ts
export interface EvaluationResult {
  score: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  feedback: string;
  matchedConcepts: string[];
}

export const evaluateAnswerHybrid = (
  questionIndex: number,
  topic: string,
  answer: string
): EvaluationResult => {
  const answerClean = answer.toLowerCase().replace(/[^\w\s]/g, ' ');
  const words = answerClean.split(/\s+/).filter(word => word.length > 2);
  
  // Concept maps for different topics
  const conceptMaps: Record<string, Record<number, any>> = {
    html: {
      0: { // div vs span
        basic: ['block', 'inline', 'layout', 'display'],
        intermediate: ['semantic', 'accessibility', 'container', 'text'],
        advanced: ['css', 'styling', 'positioning', 'flexbox', 'grid']
      },
      1: { // Semantic HTML
        basic: ['meaning', 'structure', 'tags'],
        intermediate: ['accessibility', 'seo', 'readability'],
        advanced: ['screen readers', 'html5', 'semantic elements']
      },
      2: { // Browser rendering
        basic: ['load', 'parse', 'display'],
        intermediate: ['dom', 'render tree', 'layout'],
        advanced: ['critical rendering path', 'optimization']
      }
    },
    css: {
      0: { // Box model
        basic: ['margin', 'padding', 'border', 'content'],
        intermediate: ['box-sizing', 'width calculation'],
        advanced: ['collapsing margins', 'inline vs block']
      },
      1: { // Display properties
        basic: ['none', 'hidden', 'visible'],
        intermediate: ['layout', 'space', 'accessibility'],
        advanced: ['render tree', 'performance impact']
      },
      2: { // CSS specificity
        basic: ['important', 'style', 'class', 'id'],
        intermediate: ['cascade', 'inheritance', 'weight'],
        advanced: ['selector performance', 'browser rendering']
      }
    },
    javascript: {
      0: { // let, const, var
        basic: ['scope', 'variable', 'declare'],
        intermediate: ['hoisting', 'block', 'function', 'global'],
        advanced: ['temporal dead zone', 'reassign', 'immutable']
      },
      1: { // Closures
        basic: ['function', 'access', 'scope'],
        intermediate: ['outer', 'inner', 'lexical', 'environment'],
        advanced: ['memory', 'private variables', 'module pattern']
      },
      2: { // Event loop
        basic: ['asynchronous', 'callback', 'queue'],
        intermediate: ['call stack', 'task queue', 'microtask'],
        advanced: ['browser APIs', 'promises', 'async/await']
      }
    },
    // Add more topics as needed
    default: {
      0: {
        basic: ['basic', 'fundamental', 'concept'],
        intermediate: ['advanced', 'detailed', 'complex'],
        advanced: ['expert', 'comprehensive', 'thorough']
      }
    }
  };
  
  const concepts = conceptMaps[topic]?.[questionIndex] || conceptMaps.default[0];
  
  let basicMatches = 0;
  let intermediateMatches = 0;
  let advancedMatches = 0;
  const matched: string[] = [];
  
  // Check for concept matches
  concepts.basic.forEach((concept: string) => {
    if (answerClean.includes(concept)) {
      basicMatches++;
      matched.push(concept);
    }
  });
  
  concepts.intermediate.forEach((concept: string) => {
    if (answerClean.includes(concept)) {
      intermediateMatches++;
      matched.push(concept);
    }
  });
  
  concepts.advanced.forEach((concept: string) => {
    if (answerClean.includes(concept)) {
      advancedMatches++;
      matched.push(concept);
    }
  });
  
  // Calculate score based on concept coverage
  const totalBasic = concepts.basic.length;
  const totalIntermediate = concepts.intermediate.length;
  const totalAdvanced = concepts.advanced.length;
  
  const basicScore = totalBasic > 0 ? (basicMatches / totalBasic) * 0.4 : 0;
  const intermediateScore = totalIntermediate > 0 ? (intermediateMatches / totalIntermediate) * 0.4 : 0;
  const advancedScore = totalAdvanced > 0 ? (advancedMatches / totalAdvanced) * 0.2 : 0;
  
  let score = basicScore + intermediateScore + advancedScore;
  let level: 'beginner' | 'intermediate' | 'advanced' = 'beginner';
  
  // Determine level based on concept coverage
  if (advancedMatches >= 2 || (intermediateMatches >= 3 && advancedMatches >= 1)) {
    level = 'advanced';
  } else if (intermediateMatches >= 2 || basicMatches >= (totalBasic * 0.8)) {
    level = 'intermediate';
  }
  
  // Generate feedback
  let feedback = '';
  if (score >= 0.8) {
    feedback = `Excellent understanding! You covered key concepts: ${matched.join(', ')}`;
  } else if (score >= 0.6) {
    feedback = `Good answer. You mentioned: ${matched.join(', ')}`;
  } else if (score >= 0.4) {
    const missingBasic = concepts.basic.filter((c: string) => !matched.includes(c));
    feedback = `Basic understanding. Consider mentioning: ${missingBasic.join(', ')}`;
  } else {
    feedback = `Focus on fundamental concepts: ${concepts.basic.join(', ')}`;
  }
  
  return {
    score: Math.min(1, Math.max(0, score)),
    level,
    feedback,
    matchedConcepts: matched
  };
};