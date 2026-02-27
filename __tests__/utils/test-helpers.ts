import { quizQuestions, QuizCategory } from '../../src/data/quiz-data';

export function generatePerfectAnswers(): Record<string, string[]> {
  const ans: Record<string, string[]> = {};
  quizQuestions.forEach(q => {
    ans[q.id] = q.options.filter(o => o.isCorrect)
      .sort((a, b) => b.value - a.value)
      .slice(0, q.maxSelections || 1)
      .map(o => o.id);
  });
  return ans;
}

export function generateWrongAnswers(): Record<string, string[]> {
  const ans: Record<string, string[]> = {};
  quizQuestions.forEach(q => {
    ans[q.id] = q.options.filter(o => !o.isCorrect).slice(0, 1).map(o => o.id);
  });
  return ans;
}

export function generateRandomAnswers(): Record<string, string[]> {
  const ans: Record<string, string[]> = {};
  quizQuestions.forEach(q => {
    const n = Math.floor(Math.random() * (q.maxSelections || 2)) + 1;
    const opts = [...q.options].sort(() => Math.random() - 0.5).slice(0, n);
    ans[q.id] = opts.map(o => o.id);
  });
  return ans;
}

export function generateEmptyAnswers(): Record<string, string[]> {
  const ans: Record<string, string[]> = {};
  quizQuestions.forEach(q => ans[q.id] = []);
  return ans;
}

export function getTotalMaxScore(): number {
  return quizQuestions.reduce((sum, q) => sum + q.points, 0);
}

export function validateQuizResult(result: any): boolean {
  return result && typeof result.score === 'number' &&
    typeof result.percentage === 'number' &&
    ['beginner', 'intermediate', 'expert'].includes(result.level);
}
