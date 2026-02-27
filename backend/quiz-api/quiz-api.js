// Quiz API - de-100-a-10k
// Endpoints para el cuestionario de diagnóstico empresarial

const express = require('express');
const router = express.Router();
const { validateQuizInput } = require('./input-validator');
const { calculateScores } = require('./quiz-scores');

/**
 * POST /api/quiz/submit
 * Recibe respuestas del quiz y retorna scores por pilar
 * 
 * Body: {
 *   respuestas: {
 *     financiero: { ingresos: number, gastos: number, ... },
 *     operacional: { clientes: number, procesos: number, ... },
 *     marketing: { adquisicion: number, retencion: number, ... },
 *     talento: { equipo: number, productividad: number, ... }
 *   }
 * }
 */
router.post('/submit', async (req, res) => {
  try {
    // Validar inputs
    const validation = validateQuizInput(req.body);
    if (!validation.valid) {
      return res.status(400).json({
        error: 'Validation failed',
        details: validation.errors
      });
    }

    // Calcular scores
    const scores = calculateScores(req.body.respuestas);

    return res.json({
      success: true,
      scores: scores,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Quiz submit error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

/**
 * GET /api/quiz/scores/:empresaId
 * Obtiene scores guardados previamente
 */
router.get('/scores/:empresaId', async (req, res) => {
  try {
    const { empresaId } = req.params;
    
    // TODO: Implementar lectura desde Supabase
    // Por ahora retorna estructura vacía
    return res.json({
      empresaId: empresaId,
      scores: null,
      message: 'Not implemented yet - requires Supabase integration'
    });

  } catch (error) {
    console.error('Get scores error:', error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
