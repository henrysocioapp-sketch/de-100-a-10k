/**
 * Quiz Data: de-100-a-10k Assessment
 */

export type QuizCategory = 'strategy' | 'marketing' | 'sales' | 'product' | 'operations';
export type QuizDifficulty = 'basic' | 'intermediate' | 'advanced';

export interface QuizQuestion {
  id: string;
  category: QuizCategory;
  difficulty: QuizDifficulty;
  question: string;
  description?: string;
  icon: string;
  options: { id: string; label: string; value: number; isCorrect: boolean; explanation?: string }[];
  allowMultiple: boolean;
  maxSelections?: number;
  points: number;
}

export interface QuizResult {
  score: number;
  totalPoints: number;
  percentage: number;
  level: 'beginner' | 'intermediate' | 'expert';
  categoryScores: Record<QuizCategory, { score: number; total: number; percentage: number }>;
  recommendations: string[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1', category: 'strategy', difficulty: 'basic',
    question: '¿Cuáles son componentes clave de una North Star Metric?',
    description: 'Selecciona todas las que aplican', icon: '🎯',
    allowMultiple: true, maxSelections: 3, points: 5,
    options: [
      { id: 'q1-a', label: 'Representa el valor al cliente', value: 2, isCorrect: true },
      { id: 'q1-b', label: 'Es un KPI de corto plazo', value: -1, isCorrect: false },
      { id: 'q1-c', label: 'Tiene input metrics asociadas', value: 2, isCorrect: true },
      { id: 'q1-d', label: 'Refleja crecimiento sostenible', value: 2, isCorrect: true },
      { id: 'q1-e', label: 'Es fácilmente manipulable', value: -1, isCorrect: false },
    ],
  },
  {
    id: 'q2', category: 'marketing', difficulty: 'intermediate',
    question: '¿Qué estrategias reducen el CAC?',
    description: 'Selecciona las válidas', icon: '📢',
    allowMultiple: true, maxSelections: 3, points: 5,
    options: [
      { id: 'q2-a', label: 'Optimizar targeting', value: 2, isCorrect: true },
      { id: 'q2-b', label: 'Aumentar presupuesto sin cambios', value: -1, isCorrect: false },
      { id: 'q2-c', label: 'Mejorar conversión del funnel', value: 2, isCorrect: true },
      { id: 'q2-d', label: 'Programas de referral', value: 2, isCorrect: true },
      { id: 'q2-e', label: 'Reducir calidad del producto', value: -2, isCorrect: false },
    ],
  },
  {
    id: 'q3', category: 'sales', difficulty: 'basic',
    question: '¿Cuáles son etapas del proceso de ventas B2B?',
    description: 'Selecciona las estándar', icon: '🤝',
    allowMultiple: true, maxSelections: 4, points: 5,
    options: [
      { id: 'q3-a', label: 'Prospectar y calificar', value: 2, isCorrect: true },
      { id: 'q3-b', label: 'Descubrimiento de necesidades', value: 2, isCorrect: true },
      { id: 'q3-c', label: 'Presentación de propuesta', value: 2, isCorrect: true },
      { id: 'q3-d', label: 'Cierre y onboarding', value: 2, isCorrect: true },
      { id: 'q3-e', label: 'Ignorar follow-ups', value: -2, isCorrect: false },
    ],
  },
  {
    id: 'q4', category: 'product', difficulty: 'intermediate',
    question: '¿Qué métricas indican buen Product-Market Fit?',
    description: 'Selecciona las clave', icon: '📦',
    allowMultiple: true, maxSelections: 3, points: 5,
    options: [
      { id: 'q4-a', label: 'Retención a 30/60/90 días', value: 2, isCorrect: true },
      { id: 'q4-b', label: 'NPS positivo', value: 2, isCorrect: true },
      { id: 'q4-c', label: 'Bajo churn rate', value: 2, isCorrect: true },
      { id: 'q4-d', label: 'Alto bounce rate', value: -1, isCorrect: false },
      { id: 'q4-e', label: 'Usuarios gratuitos inactivos', value: -1, isCorrect: false },
    ],
  },
  {
    id: 'q5', category: 'operations', difficulty: 'advanced',
    question: '¿Cuáles son prácticas de experimentación científica?',
    description: 'Selecciona las válidas', icon: '🧪',
    allowMultiple: true, maxSelections: 3, points: 5,
    options: [
      { id: 'q5-a', label: 'Definir hipótesis antes', value: 2, isCorrect: true },
      { id: 'q5-b', label: 'Establecer métricas de éxito', value: 2, isCorrect: true },
      { id: 'q5-c', label: 'Cambiar múltiples variables', value: -1, isCorrect: false },
      { id: 'q5-d', label: 'Calcular sample size', value: 2, isCorrect: true },
      { id: 'q5-e', label: 'Ignorar resultados insignificantes', value: -1, isCorrect: false },
    ],
  },
  {
    id: 'q6', category: 'strategy', difficulty: 'intermediate',
    question: '¿Qué elementos incluye el framework RICE?',
    description: 'Selecciona los componentes', icon: '📊',
    allowMultiple: true, maxSelections: 4, points: 5,
    options: [
      { id: 'q6-a', label: 'Reach', value: 2, isCorrect: true },
      { id: 'q6-b', label: 'Impact', value: 2, isCorrect: true },
      { id: 'q6-c', label: 'Confidence', value: 2, isCorrect: true },
      { id: 'q6-d', label: 'Effort', value: 2, isCorrect: true },
      { id: 'q6-e', label: 'Random', value: -1, isCorrect: false },
    ],
  },
  {
    id: 'q7', category: 'marketing', difficulty: 'advanced',
    question: '¿Qué tácticas mejoran la conversión?',
    description: 'Selecciona las efectivas', icon: '🔄',
    allowMultiple: true, maxSelections: 3, points: 5,
    options: [
      { id: 'q7-a', label: 'Personalización por comportamiento', value: 2, isCorrect: true },
      { id: 'q7-b', label: 'A/B testing', value: 2, isCorrect: true },
      { id: 'q7-c', label: 'Optimizar velocidad', value: 2, isCorrect: true },
      { id: 'q7-d', label: 'Más campos en forms', value: -1, isCorrect: false },
      { id: 'q7-e', label: 'Sin CTAs', value: -2, isCorrect: false },
    ],
  },
  {
    id: 'q8', category: 'sales', difficulty: 'intermediate',
    question: '¿Cuáles son señales de SQL?',
    description: 'Selecciona las características', icon: '⭐',
    allowMultiple: true, maxSelections: 3, points: 5,
    options: [
      { id: 'q8-a', label: 'Tiene presupuesto', value: 2, isCorrect: true },
      { id: 'q8-b', label: 'Tiene autoridad', value: 2, isCorrect: true },
      { id: 'q8-c', label: 'Pidió demo', value: 2, isCorrect: true },
      { id: 'q8-d', label: 'Solo vio pricing', value: 0, isCorrect: false },
      { id: 'q8-e', label: 'Es competidor', value: -1, isCorrect: false },
    ],
  },
  {
    id: 'q9', category: 'product', difficulty: 'basic',
    question: '¿Qué son engagement loops?',
    description: 'Selecciona las definiciones', icon: '🎮',
    allowMultiple: true, maxSelections: 2, points: 5,
    options: [
      { id: 'q9-a', label: 'Ciclo acción-recompensa', value: 3, isCorrect: true },
      { id: 'q9-b', label: 'Aumentan retención', value: 2, isCorrect: true },
      { id: 'q9-c', label: 'Notificaciones push', value: -1, isCorrect: false },
    ],
  },
  {
    id: 'q10', category: 'operations', difficulty: 'intermediate',
    question: '¿Qué métricas revisar semanalmente?',
    description: 'Selecciona las esenciales', icon: '📈',
    allowMultiple: true, maxSelections: 3, points: 5,
    options: [
      { id: 'q10-a', label: 'North Star Metric', value: 2, isCorrect: true },
      { id: 'q10-b', label: 'Tasas de conversión', value: 2, isCorrect: true },
      { id: 'q10-c', label: 'CAC y LTV', value: 2, isCorrect: true },
      { id: 'q10-d', label: 'Ranking Alexa', value: -1, isCorrect: false },
      { id: 'q10-e', label: 'Seguidores redes', value: 0, isCorrect: false },
    ],
  },
];

export const categoryNames: Record<QuizCategory, string> = {
  strategy: 'Estrategia', marketing: 'Marketing', sales: 'Ventas',
  product: 'Producto', operations: 'Operaciones',
};

export const categoryIcons: Record<QuizCategory, string> = {
  strategy: '🎯', marketing: '📢', sales: '🤝', product: '📦', operations: '⚙️',
};

export function calculateQuizResult(answers: Record<string, string[]>): QuizResult {
  let totalScore = 0, totalPoints = 0;
  const categoryScores: Record<QuizCategory, { score: number; total: number; percentage: number }> = {
    strategy: { score: 0, total: 0, percentage: 0 },
    marketing: { score: 0, total: 0, percentage: 0 },
    sales: { score: 0, total: 0, percentage: 0 },
    product: { score: 0, total: 0, percentage: 0 },
    operations: { score: 0, total: 0, percentage: 0 },
  };

  for (const q of quizQuestions) {
    const selected = answers[q.id] || [];
    const rawScore = selected.reduce((sum, optId) => {
      const opt = q.options.find(o => o.id === optId);
      return sum + (opt?.value || 0);
    }, 0);

    const maxRawScore = q.options
      .filter(o => o.isCorrect)
      .sort((a, b) => b.value - a.value)
      .slice(0, q.maxSelections || 1)
      .reduce((sum, o) => sum + o.value, 0);

    // Normalize: convertir a escala 0-q.points
    const clampedScore = Math.max(0, Math.min(rawScore, maxRawScore));
    const earnedPoints = maxRawScore > 0 ? (clampedScore / maxRawScore) * q.points : 0;

    totalScore += earnedPoints;
    totalPoints += q.points;
    categoryScores[q.category].score += earnedPoints;
    categoryScores[q.category].total += q.points;
  }

  Object.keys(categoryScores).forEach(c => {
    const cc = categoryScores[c as QuizCategory];
    cc.percentage = cc.total > 0 ? Math.round((cc.score / cc.total) * 100) : 0;
  });

  const percentage = totalPoints > 0 ? Math.round((totalScore / totalPoints) * 100) : 0;
  const level = percentage >= 75 ? 'expert' : percentage >= 50 ? 'intermediate' : 'beginner';

  const recs: string[] = [];
  if (percentage < 50) recs.push('Revisa los fundamentos de growth');
  if (categoryScores.strategy.percentage < 60) recs.push('Fortalece tu North Star');
  if (categoryScores.marketing.percentage < 60) recs.push('Optimiza el funnel de conversión');
  if (categoryScores.sales.percentage < 60) recs.push('Estructura el proceso B2B');
  if (categoryScores.product.percentage < 60) recs.push('Mide Product-Market Fit');
  if (categoryScores.operations.percentage < 60) recs.push('Implementa experimentación');

  return {
    score: Math.round(totalScore), totalPoints, percentage, level,
    categoryScores, recommendations: recs,
  };
}

export function getCategoryColor(category: QuizCategory): string {
  const colors: Record<QuizCategory, string> = {
    strategy: 'bg-blue-500', marketing: 'bg-purple-500', sales: 'bg-green-500',
    product: 'bg-orange-500', operations: 'bg-pink-500',
  };
  return colors[category];
}
