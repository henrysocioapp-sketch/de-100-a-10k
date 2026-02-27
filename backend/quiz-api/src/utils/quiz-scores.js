/**
 * Quiz Scores - Cálculo de puntuaciones por pilar
 * @module utils/quiz-scores
 */

const PILLAR_CONFIG = {
  growth: { name: 'Crecimiento', maxScore: 20 },
  staff: { name: 'Equipo', maxScore: 20 },
  systems: { name: 'Sistemas', maxScore: 20 }
};

/**
 * Calcula las puntuaciones del quiz por pilar y totales
 * Maneja edge cases: campos vacíos, valores negativos, strings vacíos
 * @param {Array} answers - Array de respuestas
 * @returns {Object} Scores calculados
 */
function calculateScores(answers) {
  // Edge case: null/undefined
  if (!answers) {
    throw new Error('Se requieren respuestas (recibido null/undefined)');
  }

  // Edge case: no es array
  if (!Array.isArray(answers)) {
    throw new Error(`Las respuestas deben ser un array, recibido: ${typeof answers}`);
  }

  // Edge case: array vacío
  if (answers.length === 0) {
    throw new Error('Se requiere al menos una respuesta (array vacío)');
  }

  // Inicializar pilares
  const byPillar = {};
  Object.keys(PILLAR_CONFIG).forEach(p => {
    byPillar[p] = { score: 0, answered: 0, maxPossible: PILLAR_CONFIG[p].maxScore, name: PILLAR_CONFIG[p].name };
  });

  let totalScore = 0;
  let totalAnswered = 0;
  let invalidCount = 0;

  // Procesar respuestas
  answers.forEach((answer, idx) => {
    // Edge case: null/undefined en el array
    if (!answer) {
      invalidCount++;
      return;
    }

    // Edge case: no es objeto
    if (typeof answer !== 'object') {
      invalidCount++;
      return;
    }

    const { value, pilar } = answer;

    // Edge case: pilar vacío, null, o undefined
    if (pilar === null || pilar === undefined || pilar === '') {
      invalidCount++;
      return;
    }

    // Normalizar pilar
    const normalizedPilar = String(pilar).toLowerCase().trim();
    if (!PILLAR_CONFIG[normalizedPilar]) {
      invalidCount++;
      return;
    }

    // Normalizar valor - maneja strings vacíos, negativos, no numéricos
    const normalizedValue = normalizeValue(value);
    if (normalizedValue === null) {
      invalidCount++;
      return;
    }

    // Acumular scores
    byPillar[normalizedPilar].score += normalizedValue;
    byPillar[normalizedPilar].answered += 1;
    totalScore += normalizedValue;
    totalAnswered++;
  });

  // Calcular porcentajes por pilar
  Object.keys(byPillar).forEach(p => {
    const data = byPillar[p];
    if (data.answered > 0) {
      const maxForAnswered = data.answered * 5;
      data.percentage = Math.round((data.score / maxForAnswered) * 100);
    } else {
      data.percentage = 0;
    }
  });

  const globalMax = totalAnswered * 5;
  const percentage = globalMax > 0 ? Math.round((totalScore / globalMax) * 100) : 0;

  return {
    byPillar,
    total: totalScore,
    maxPossible: globalMax,
    average: totalAnswered > 0 ? Math.round(((totalScore / totalAnswered) / 5) * 100) : 0,
    percentage,
    answeredCount: totalAnswered,
    invalidCount,
    totalQuestions: answers.length
  };
}

/**
 * Normaliza un valor de respuesta
 * Maneja: strings vacíos, valores negativos, NaN
 * @param {*} value - Valor a normalizar
 * @returns {number|null} Valor 1-5 o null si inválido
 */
function normalizeValue(value) {
  // Edge case: null, undefined, o string vacío
  if (value === null || value === undefined || value === '') {
    return null;
  }

  let numericValue;

  if (typeof value === 'string') {
    // Edge case: string con solo espacios
    const trimmed = value.trim();
    if (trimmed === '') return null;

    numericValue = parseInt(trimmed, 10);
    if (isNaN(numericValue)) return null;
  } else if (typeof value === 'number') {
    // Edge case: NaN
    if (isNaN(value)) return null;
    numericValue = value;
  } else {
    return null;
  }

  // Edge case: valor negativo
  if (numericValue < 0) {
    return null;
  }

  // Clamp a rango 1-5
  return Math.max(1, Math.min(5, Math.round(numericValue)));
}

/**
 * Obtiene interpretación del score con recomendaciones
 * @param {Object} scoreData - Resultado de calculateScores()
 * @returns {Object} Interpretación completa
 */
function getScoreInterpretation(scoreData) {
  const percentage = scoreData?.percentage || 0;
  const byPillar = scoreData?.byPillar || {};

  // Determinar nivel
  let level = 'critical', emoji = '🔴', color = '#dc2626';
  if (percentage >= 76) { level = 'excellent'; emoji = '💎'; color = '#7c3aed'; }
  else if (percentage >= 61) { level = 'good'; emoji = '🟢'; color = '#16a34a'; }
  else if (percentage >= 46) { level = 'medium'; emoji = '🟡'; color = '#ca8a04'; }
  else if (percentage >= 31) { level = 'low'; emoji = '🟠'; color = '#ea580c'; }

  // Encontrar pilar débil y fuerte
  const weakest = findWeakestPillar(byPillar);
  const strongest = findStrongestPillar(byPillar);

  // Generar recomendaciones según nivel
  const recommendations = getRecommendationsForLevel(level, weakest?.name);

  return {
    level,
    levelEs: getLevelInSpanish(level),
    emoji,
    color,
    percentage,
    summary: getSummaryForLevel(level, percentage),
    focusArea: weakest,
    strengthArea: strongest,
    recommendations: recommendations.immediate,
    nextSteps: recommendations.nextSteps,
    estimatedTimeToNextLevel: recommendations.estimatedTime
  };
}

// Helpers
function findWeakestPillar(byPillar) {
  let weakest = null, minPct = Infinity;
  Object.entries(byPillar).forEach(([k, d]) => {
    if (d.answered > 0 && d.percentage < minPct) {
      minPct = d.percentage;
      weakest = { name: k, displayName: d.name, percentage: d.percentage };
    }
  });
  return weakest;
}

function findStrongestPillar(byPillar) {
  let strongest = null, maxPct = -1;
  Object.entries(byPillar).forEach(([k, d]) => {
    if (d.answered > 0 && d.percentage > maxPct) {
      maxPct = d.percentage;
      strongest = { name: k, displayName: d.name, percentage: d.percentage };
    }
  });
  return strongest;
}

function getLevelInSpanish(level) {
  const map = { critical: 'crítico', low: 'bajo', medium: 'medio', good: 'bueno', excellent: 'excelente' };
  return map[level] || level;
}

function getSummaryForLevel(level, pct) {
  const summaries = {
    critical: `Score ${pct}%: Necesitas estructura base urgente.`,
    low: `Score ${pct}%: Hay base pero falta sistematizar.`,
    medium: `Score ${pct}%: Funciona pero es inconsistente.`,
    good: `Score ${pct}%: Sólido, listo para escalar.`,
    excellent: `Score ${pct}%: Modelo reps y escalable.`
  };
  return summaries[level] || `Score: ${pct}%`;
}

function getRecommendationsForLevel(level, weakPilar) {
  const recs = {
    critical: {
      immediate: ['Definir objetivo de crecimiento claro', 'Elegir un canal de adquisición', 'Documentar un proceso clave'],
      nextSteps: ['Implementar tracking básico', 'Crear un dashboard simple'],
      estimatedTime: '3-6 meses'
    },
    low: {
      immediate: ['Sistematizar el canal que funciona', 'Crear plantillas y scripts'],
      nextSteps: ['Automatizar primeros procesos', 'Contratar/capacitar'],
      estimatedTime: '2-4 meses'
    },
    medium: {
      immediate: ['Optimizar lo que ya funciona', 'Reducir dependencia del fundador'],
      nextSteps: ['Estandarizar operaciones', 'Escalar equipos'],
      estimatedTime: '1-3 meses'
    },
    good: {
      immediate: ['Estrategia de duplicación', 'Replicar playbook'],
      nextSteps: ['Entrar nuevos canales', 'Implementar BI avanzado'],
      estimatedTime: '1-2 meses'
    },
    excellent: {
      immediate: ['Buscar nuevos mercados', 'Crear equipos autónomos'],
      nextSteps: ['Innovación y experimentación', 'Mentorear'],
      estimatedTime: 'Continuo'
    }
  };
  return recs[level] || recs.critical;
}

module.exports = {
  calculateScores,
  get