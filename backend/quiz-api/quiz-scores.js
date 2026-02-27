// Quiz Scores Calculator - de-100-a-10k
// Calcula scores por pilar y total

/**
 * Calcula scores por pilar basado en respuestas del quiz
 * @param {Object} respuestas - Respuestas del usuario
 * @returns {Object} Scores calculados por pilar
 */
function calculateScores(respuestas) {
  const scores = {
    financiero: 0,
    operacional: 0,
    marketing: 0,
    talento: 0,
    total: 0
  };

  // PILAR: FINANCIERO (0-100)
  // Preguntas esperadas: ingresos, gastos, margen, flujo_caja, precios, costos
  if (respuestas.financiero) {
    const f = respuestas.financiero;
    let scoreF = 0;
    
    // Margen bruto > 30% = puntaje alto
    if (f.margen_bruto >= 30) scoreF += 25;
    else if (f.margen_bruto >= 20) scoreF += 15;
    else if (f.margen_bruto >= 10) scoreF += 5;
    
    // Flujo de caja positivo
    if (f.flujo_caja === 'positivo') scoreF += 25;
    else if (f.flujo_caja === 'neutral') scoreF += 10;
    
    // Precios estratégicos
    if (f.precios === 'estructurados') scoreF += 25;
    else if (f.precios === 'calculados') scoreF += 15;
    
    // Costos controlados
    if (f.costos === 'optimizeados') scoreF += 25;
    else if (f.costos === 'monitoreados') scoreF += 15;
    
    scores.financiero = Math.min(100, scoreF);
  }

  // PILAR: OPERACIONAL (0-100)
  // Preguntas: capacidad_entrega, calidad_procesos, clientes_satisfechos, nps_clientes
  if (respuestas.operacional) {
    const o = respuestas.operacional;
    let scoreO = 0;
    
    // Capacidad de entrega por encima de 80%
    if (o.capacidad_entrega >= 90) scoreO += 35;
    else if (o.capacidad_entrega >= 80) scoreO += 25;
    else if (o.capacidad_entrega >= 70) scoreO += 15;
    
    // Calidad de procesos documentada
    if (o.calidad_procesos === 'documentados') scoreO += 35;
    else if (o.calidad_procesos === 'definidos') scoreO += 20;
    
    // Satisfacción de clientes
    if (o.clientes_satisfechos >= 80) scoreO += 30;
    else if (o.clientes_satisfechos >= 60) scoreO += 20;
    else if (o.clientes_satisfechos >= 40) scoreO += 10;
    
    scores.operacional = Math.min(100, scoreO);
  }

  // PILAR: MARKETING (0-100)
  // Preguntas: nro_clientes, tasa_retencion, canales_acquisicion, cac_ltv
  if (respuestas.marketing) {
    const m = respuestas.marketing;
    let scoreM = 0;
    
    // Tasa de retención > 60% es saludable
    if (m.tasa_retencion >= 70) scoreM += 30;
    else if (m.tasa_retencion >= 50) scoreM += 20;
    else if (m.tasa_retencion >= 30) scoreM += 10;
    
    // Canales de adquisición diversificados
    if (Array.isArray(m.canales) && m.canales.length >= 3) scoreM += 35;
    else if (Array.isArray(m.canales) && m.canales.length >= 2) scoreM += 20;
    else if (Array.isArray(m.canales) && m.canales.length === 1) scoreM += 10;
    
    // CAC vs LTV saludable (LTV > 3x CAC)
    if (m.ratio_ltv_cac >= 3) scoreM += 35;
    else if (m.ratio_ltv_cac >= 2) scoreM += 25;
    else if (m.ratio_ltv_cac >= 1) scoreM += 10;
    
    scores.marketing = Math.min(100, scoreM);
  }

  // PILAR: TALENTO (0-100)
  // Preguntas: nro_empleados, rotacion, productividad_empleado, cultura_score
  if (respuestas.talento) {
    const t = respuestas.talento;
    let scoreT = 0;
    
    // Productividad por empleado (ingreso/empleado/año)
    if (t.productividad_empleado >= 100000) scoreT += 30;
    else if (t.productividad_empleado >= 70000) scoreT += 20;
    else if (t.productividad_empleado >= 50000) scoreT += 10;
    
    // Baja rotación (< 10% anual es excelente)
    if (t.rotacion <= 10) scoreT += 35;
    else if (t.rotacion <= 20) scoreT += 25;
    else if (t.rotacion <= 30) scoreT += 10;
    
    // Cultura organizacional
    if (t.cultura_score >= 4) scoreT += 35;
    else if (t.cultura_score >= 3) scoreT += 20;
    else if (t.cultura_score >= 2) scoreT += 10;
    
    scores.talento = Math.min(100, scoreT);
  }

  // CALCULAR TOTAL (promedio ponderado)
  const weights = {
    financiero: 0.30,
    operacional: 0.25,
    marketing: 0.25,
    talento: 0.20
  };

  scores.total = Math.round(
    scores.financiero * weights.financiero +
    scores.operacional * weights.operacional +
    scores.marketing * weights.marketing +
    scores.talento * weights.talento
  );

  // Determinar categoría
  if (scores.total >= 80) {
    scores.categoria = 'Empresa Sólida';
    scores.descripcion = 'Excelente salud empresarial. Mantener y escalar.';
  } else if (scores.total >= 60) {
    scores.categoria = 'Empresa estable';
    scores.descripcion = 'Buena base, oportunidades de optimización.';
  } else if (scores.total >= 40) {
    scores.categoria = 'Requiere atención';
    scores.descripcion = 'Áreas críticas identificadas. Plan de acción necesario.';
  } else {
    scores.categoria = 'Empresa en riesgo';
    scores.descripcion = 'Intervención urgente recomendada.';
  }

  return scores;
}

module.exports = { calculateScores };
