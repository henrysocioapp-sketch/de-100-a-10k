// Input Validator - de-100-a-10k
// Valida inputs del quiz antes de procesar

/**
 * Valida las respuestas del quiz
 * @param {Object} data - Datos enviados en el request
 * @returns {Object} { valid: boolean, errors: string[] }
 */
function validateQuizInput(data) {
  const errors = [];

  // Validar que existe data
  if (!data) {
    return { valid: false, errors: ['Request body is required'] };
  }

  // Validar que existe respuestas
  if (!data.respuestas) {
    return { valid: false, errors: ['Campo "respuestas" es requerido'] };
  }

  const { respuestas } = data;

  // Validar pilar financiero
  if (respuestas.financiero) {
    const f = respuestas.financiero;
    if (f.margen_bruto !== undefined && typeof f.margen_bruto === 'number') {
      if (f.margen_bruto < 0 || f.margen_bruto > 100) {
        errors.push('financiero.margen_bruto: Debe ser entre 0 y 100');
      }
    }
    if (f.flujo_caja && typeof f.flujo_caja === 'string') {
      const validos = ['positivo', 'negativo', 'neutral'];
      if (!validos.includes(f.flujo_caja)) {
        errors.push('financiero.flujo_caja: Valor inválido');
      }
    }
  }

  // Validar pilar operacional
  if (respuestas.operacional) {
    const o = respuestas.operacional;
    if (o.capacidad_entrega !== undefined) {
      if (o.capacidad_entrega < 0 || o.capacidad_entrega > 100) {
        errors.push('operacional.capacidad_entrega: Debe ser entre 0 y 100');
      }
    }
    if (o.clientes_satisfechos !== undefined) {
      if (o.clientes_satisfechos < 0 || o.clientes_satisfechos > 100) {
        errors.push('operacional.clientes_satisfechos: Debe ser entre 0 y 100');
      }
    }
  }

  // Validar pilar marketing
  if (respuestas.marketing) {
    const m = respuestas.marketing;
    if (m.tasa_retencion !== undefined) {
      if (m.tasa_retencion < 0 || m.tasa_retencion > 100) {
        errors.push('marketing.tasa_retencion: Debe ser entre 0 y 100');
      }
    }
    if (m.canales !== undefined && !Array.isArray(m.canales)) {
      errors.push('marketing.canales: Debe ser un array');
    }
    if (m.ratio_ltv_cac !== undefined && m.ratio_ltv_cac < 0) {
      errors.push('marketing.ratio_ltv_cac: No puede ser negativo');
    }
  }

  // Validar pilar talento
  if (respuestas.talento) {
    const t = respuestas.talento;
    if (t.rotacion !== undefined) {
      if (t.rotacion < 0 || t.rotacion > 100) {
        errors.push('talento.rotacion: Debe ser entre 0 y 100');
      }
    }
    if (t.cultura_score !== undefined) {
      if (t.cultura_score < 1 || t.cultura_score > 5) {
        errors.push('talento.cultura_score: Debe ser entre 1 y 5');
      }
    }
    if (t.productividad_empleado !== undefined && t.productividad_empleado < 0) {
      errors.push('talento.productividad_empleado: No puede ser negativo');
    }
  }

  return {
    valid: errors.length === 0,
    errors: errors
  };
}

module.exports = { validateQuizInput };