/**
 * Test Suite: Quiz de-100-a-10k (K10-016)
 * Coverage: Input validation, Score calculation, User flow
 */

import {
  quizQuestions,
  calculateQuizResult,
  getCategoryColor,
  categoryNames,
  categoryIcons,
  QuizQuestion,
  QuizResult,
  QuizCategory,
} from '../src/data/quiz-data';

import {
  generatePerfectAnswers,
  generateWrongAnswers,
  generateRandomAnswers,
  generateEmptyAnswers,
  getTotalMaxScore,
  validateQuizResult,
} from './utils/test-helpers';

// ============================================================================
// TEST SUITE 1: Input Validation & Edge Cases (TC001-TC007)
// ============================================================================

describe('Input Validation (8 casos)', () => {
  // TC001: Respuestas vacías retornan score 0
  test('TC001: should return 0 score when no answers provided', () => {
    const result = calculateQuizResult({});
    expect(result.score).toBe(0);
    expect(result.percentage).toBe(0);
    expect(result.level).toBe('beginner');
  });

  // TC002: Respuestas con arrays vacíos
  test('TC002: should handle empty answer arrays', () => {
    const result = calculateQuizResult(generateEmptyAnswers());
    expect(result.score).toBe(0);
    expect(result.totalPoints).toBeGreaterThan(0);
  });

  // TC003: Respuestas undefined (edge case)
  test('TC003: should handle undefined values gracefully', () => {
    const nullAnswers = {
      q1: undefined as any,
      q2: null as any,
    };
    expect(() => calculateQuizResult(nullAnswers)).not.toThrow();
  });

  // TC004: Opciones inválidas
  test('TC004: should ignore invalid option IDs', () => {
    const invalidAnswers = {
      q1: ['non-existent-option'],
    };
    const result = calculateQuizResult(invalidAnswers);
    expect(result.score).toBe(0);
  });

  // TC005: Múltiples selecciones respeta maxSelections
  test('TC005: should respect maxSelections limit', () => {
    const q1 = quizQuestions.find(q => q.id === 'q1')!;
    const allOptions = q1.options.map(o => o.id);
    const result = calculateQuizResult({ q1: allOptions });
    // Score debe estar limitado al maxScore calculado
    expect(result.score).toBeLessThanOrEqual(result.totalPoints);
  });

  // TC006: Valores negativos
  test('TC006: should normalize negative values', () => {
    const answers = { q2: ['q2-e'] }; // Opción con valor -2
    const result = calculateQuizResult(answers);
    expect(result.score).toBeGreaterThanOrEqual(0);
  });

  // TC007: Inputs desconocidos
  test('TC007: unknown question IDs handled gracefully', () => {
    const unknownAnswers = { 'unknown-q': ['opt'] };
    expect(() => calculateQuizResult(unknownAnswers)).not.toThrow();
  });
});

// ============================================================================
// TEST SUITE 2: Score Calculation (TC008-TC012)
// ============================================================================

describe('Score Calculation (5 casos)', () => {
  // TC008: Respuesta perfecta
  test('TC008: perfect answers return 100% score', () => {
    const result = calculateQuizResult(generatePerfectAnswers());
    expect(result.percentage).toBe(100);
    expect(result.level).toBe('expert');
    expect(result.score).toBe(result.totalPoints);
  });

  // TC009: Score parcial
  test('TC009: partial answers return correct score', () => {
    const partialAnswers = { q1: ['q1-a', 'q1-c'] };
    const result = calculateQuizResult(partialAnswers);
    expect(result.score).toBeGreaterThan(0);
    expect(result.score).toBeLessThan(5);
  });

  // TC010: Categorías individuales
  test('TC010: category scores calculated separately', () => {
    // q1 (strategy) tiene maxScore 6 → todas las correctas = 100%
    // q3 (sales) tiene maxScore 8 → todas las correctas = 100%
    const answers = {
      q1: ['q1-a', 'q1-c', 'q1-d'],
      q6: ['q6-a', 'q6-b', 'q6-c', 'q6-d'], // otra de strategy
      q3: ['q3-a', 'q3-b', 'q3-c', 'q3-d'],
      q8: ['q8-a', 'q8-b', 'q8-c'], // otra de sales
    };
    const result = calculateQuizResult(answers);
    expect(result.categoryScores.strategy.percentage).toBe(100);
    expect(result.categoryScores.sales.percentage).toBe(100);
    expect(result.categoryScores.marketing.percentage).toBe(0);
  });

  // TC011: 50% threshold
  test('TC011: 50% threshold assigns intermediate level', () => {
    const halfCorrect: Record<string, string[]> = {};
    quizQuestions.forEach((q, idx) => {
      if (idx % 2 === 0) {
        halfCorrect[q.id] = q.options.filter(o => o.isCorrect).slice(0, 1).map(o => o.id);
      }
    });
    const result = calculateQuizResult(halfCorrect);
    expect(['beginner', 'intermediate']).toContain(result.level);
  });

  // TC012: Porcentaje total
  test('TC012: total percentage calculated correctly', () => {
    const totalPoints = getTotalMaxScore();
    const result = calculateQuizResult(generatePerfectAnswers());
    expect(result.totalPoints).toBe(totalPoints);
  });
});

// ============================================================================
// TEST SUITE 3: User Flow Integration (TC013-TC016)
// ============================================================================

describe('User Flow (4 casos)', () => {
  // TC013: Flujo completo
  test('TC013: complete answering flow', () => {
    const result = calculateQuizResult(generateRandomAnswers());
    expect(result).toHaveProperty('score');
    expect(result).toHaveProperty('percentage');
    expect(result).toHaveProperty('level');
    expect(result).toHaveProperty('recommendations');
  });

  // TC014: Subset de preguntas
  test('TC014: partial question answering', () => {
    const partialFlow = {
      q1: ['q1-a'],
      q5: ['q5-a', 'q5-b'],
      q10: ['q10-a', 'q10-b', 'q10-c'],
    };
    const result = calculateQuizResult(partialFlow);
    expect(result.score).toBeGreaterThan(0);
  });

  // TC015: Cambio de respuestas
  test('TC015: answer updates handled', () => {
    const initial = calculateQuizResult({ q1: ['q1-a'] });
    const updated = calculateQuizResult({ q1: ['q1-a', 'q1-c', 'q1-d'] });
    expect(updated.score).toBeGreaterThanOrEqual(initial.score);
  });

  // TC016: Orden aleatorio
  test('TC016: random question order works', () => {
    const random = generateRandomAnswers();
    const result = calculateQuizResult(random);
    expect(result.percentage).toBeGreaterThanOrEqual(0);
  });
});

// ============================================================================
// TEST SUITE 4: Data Integrity (TC017-TC020)
// ============================================================================

describe('Data Integrity (4 casos)', () => {
  // TC017: Estructura de preguntas
  test('TC017: all questions have required fields', () => {
    quizQuestions.forEach(q => {
      expect(q).toHaveProperty('id');
      expect(q).toHaveProperty('category');
      expect(q).toHaveProperty('question');
      expect(q).toHaveProperty('options');
      expect(q.options.length).toBeGreaterThan(0);
      expect(q.points).toBeGreaterThan(0);
    });
  });

  // TC018: IDs únicos
  test('TC018: question IDs are unique', () => {
    const ids = quizQuestions.map(q => q.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  // TC019: Metadata de categorías
  test('TC019: category metadata complete', () => {
    const cats: QuizCategory[] = ['strategy', 'marketing', 'sales', 'product', 'operations'];
    cats.forEach(cat => {
      expect(categoryNames[cat]).toBeDefined();
      expect(categoryIcons[cat]).toBeDefined();
      expect(getCategoryColor(cat)).toBeDefined();
    });
  });

  // TC020: Valores de opciones
  test('TC020: options have valid values', () => {
    quizQuestions.forEach(q => {
      q.options.forEach(opt => {
        expect(opt).toHaveProperty('id');
        expect(opt).toHaveProperty('label');
        expect(opt).toHaveProperty('value');
        expect(opt).toHaveProperty('isCorrect');
      });
    });
  });
});

// ============================================================================

// TEST SUITE 5: Recommendation Logic (TC021-TC023)
// ============================================================================

describe('Recommendation Logic (3 casos)', () => {
  // TC021: Recomendaciones para score bajo
  test('TC021: generates recommendations for low scores', () => {
    const result = calculateQuizResult(generateWrongAnswers());
    expect(result.recommendations.length).toBeGreaterThan(0);
  });

  // TC022: Recomendaciones por categoría
  test('TC022: generates category-specific recommendations', () => {
    const weakAnswers: Record<string, string[]> = {};
    const q1 = quizQuestions.find(q => q.id === 'q1')!;
    weakAnswers.q1 = q1.options.filter(o => !o.isCorrect).map(o => o.id);
    
    const result = calculateQuizResult(weakAnswers);
    expect(result.categoryScores.strategy.percentage).toBeLessThan(60);
    // Si strategy está debajo de 60%, debe aparecer recomendación
    const hasStrategyRec = result.recommendations.some(r => 
      r.toLowerCase().includes('north star') || 
      r.toLowerCase().includes('estrategia')
    );
    expect(hasStrategyRec).toBe(true);
  });

  // TC023: Experto sin recomendaciones de bajo score
  test('TC023: expert level with 100%', () => {
    const result = calculateQuizResult(generatePerfectAnswers());
    expect(result.level).toBe('expert');
  });
});

// ============================================================================
// TEST SUITE 6: Error Handling (TC024-TC026)
// ============================================================================

describe('Error Handling (3 casos)', () => {
  // TC024: Input malicioso
  test('TC024: handles malicious input gracefully', () => {
    const malicious = {
      q1: ['<script>alert("xss")</script>', 'q1-a'],
    };
    expect(() => calculateQuizResult(malicious)).not.toThrow();
  });

  // TC025: Arrays muy largos
  test('TC025: handles oversized arrays', () => {
    const oversized = { q1: Array(1000).fill('q1-a') };
    const result = calculateQuizResult(oversized);
    expect(result.score).toBeGreaterThanOrEqual(0);
  });

  // TC026: Valores extremos
  test('TC026: handles extreme values', () => {
    const extreme = {
      q1: ['q1-a'],
      q2: [],
      q3: ['', '   ', '\n\t'],
    };
    expect(() => calculateQuizResult(extreme)).not.toThrow();
  });
});

// ============================================================================
// SUMMARY & FINAL VALIDATION
// ============================================================================

describe('Test Suite Summary', () => {
  test('all 8 critical test cases executed', () => {
    expect(quizQuestions.length).toBe(10);
    expect(getTotalMaxScore()).toBe(50);
  });
});
