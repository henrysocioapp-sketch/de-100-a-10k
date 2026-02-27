/**
 * Input Validator - Middleware de validación
 * Maneja edge cases: campos vacíos, valores negativos, strings vacíos, tipos incorrectos
 * @module middleware/input-validator
 */

// Configuración
const VALID_PILLARS = ['growth', 'staff', 'systems'];
const VALID_VALUE_RANGE = { min: 1, max: 5 };

// Códigos de error
const ERRORS = {
  MISSING_BODY: { code: 'VALIDATION_MISSING_BODY', message: 'El cuerpo de la petición es requerido', status: 400 },
  EMPTY_ANSWERS: { code: 'VALIDATION_EMPTY_ANSWERS', message: 'Se requieren respuestas del quiz', status: 400 },
  INVALID_ANSWERS_TYPE: { code: 'VALIDATION_INVALID_ANSWERS_TYPE', message: 'Las respuestas deben ser un array', status: 400 },
  INVALID_ANSWER_FORMAT: { code: 'VALIDATION_INVALID_ANSWER_FORMAT', message: 'Formato de respuesta inválido', status: 400 },
  MISSING_QUESTION_ID: { code: 'VALIDATION_MISSING_QUESTION_ID', message: 'Se requiere questionId', status: 400 },
  MISSING_PILLAR: { code: 'VALIDATION_MISSING_PILLAR', message: 'Se requiere especificar el pilar', status: 400 },
  INVALID_PILLAR: { code: 'VALIDATION_INVALID_PILLAR', message: 'Pilar inválido', status: 400 },
  MISSING_VALUE: { code: 'VALIDATION_MISSING_VALUE', message: 'Se requiere el valor de respuesta', status: 400 },
  INVALID_VALUE_TYPE: { code: 'VALIDATION_INVALID_VALUE_TYPE', message: 'El valor debe ser numérico', status: 400 },
  NEGATIVE_VALUE: { code: 'VALIDATION_NEGATIVE_VALUE', message: 'No se permiten valores negativos', status: 400 },
  VALUE_OUT_OF_RANGE: { code: 'VALIDATION_VALUE_OUT_OF_RANGE', message: 'El valor debe estar entre 1 y 5', status: 400 },
  EMPTY_STRING_VALUE: { code: 'VALIDATION_EMPTY_STRING_VALUE', message: 'El valor no puede ser string vacío', status: 400 },
  INVALID_EMAIL: { code: 'VALIDATION_INVALID_EMAIL', message: 'Formato de email inválido', status: 400 }
};

/**
 * Middleware de validación principal para el quiz
 * Valida estructura completa de la petición POST
 */
function validateQuizSubmission(req, res, next) {
  const errors = [];

  // Edge case: body es null, undefined, o vacío
  if (!req.body) {
    errors.push(ERRORS.MISSING_BODY);
    req.validationErrors = errors;
    return next();
  }

  if (typeof req.body !== 'object') {
    errors.push({ ...ERRORS.MISSING_BODY, details: `Tipo recibido: ${typeof req.body}` });
    req.validationErrors = errors;
    return next();
  }

  const { answers, contactInfo } = req.body;

  // Validar answers
  const answerErrors = validateAnswers(answers);
  errors.push(...answerErrors);

  // Validar contactInfo si está presente (opcional)
  if (contactInfo !== undefined && contactInfo !== null) {
    const contactErrors = validateContactInfo(contactInfo);
    errors.push(...contactErrors);
  }

  req.validationErrors = errors;
  next();
}

/**
 * Valida el array de respuestas
 * Maneja: arrays vacíos, null, undefined, elementos inválidos
 */
function validateAnswers(answers) {
  const errors = [];

  // Edge case: answers undefined o null
  if (answers === undefined || answers === null) {
    errors.push(ERRORS.EMPTY_ANSWERS);
    return errors;
  }

  // Edge case: no es array
  if (!Array.isArray(answers)) {
    errors.push({ ...ERRORS.INVALID_ANSWERS_TYPE, details: `Tipo: ${typeof answers}` });
    return errors;
  }

  // Edge case: array vacío
  if (answers.length === 0) {
    errors.push(ERRORS.EMPTY_ANSWERS);
    return errors;
  }

  // Validar cada respuesta
  answers.forEach((answer, index) => {
    const answerError = validateSingleAnswer(answer, index);
    if (answerError) {
      errors.push(answerError);
    }
  });

  return errors;
}

/**
 * Valida una respuesta individual
 * Maneja: null, objetos vacíos, campos faltantes, tipos inválidos
 */
function validateSingleAnswer(answer, index) {
  // Edge case: null o undefined en el array
  if (answer === null || answer === undefined) {
    return {
      ...ERRORS.INVALID_ANSWER_FORMAT,
      details: `Respuesta en índice ${index} es null/undefined`
    };
  }

  // Edge case: no es objeto
  if (typeof answer !== 'object') {
    return {
      ...ERRORS.INVALID_ANSWER_FORMAT,
      details: `Respuesta ${index} debe ser objeto, recibido: ${typeof answer}`
    };
  }

  const { questionId, value, pilar } = answer;
  
  // Validar questionId
  if (questionId === undefined || questionId === null) {
    return { ...ERRORS.MISSING_QUESTION_ID, details: `Índice: ${index}` };
  }
  if (typeof questionId !== 'string') {
    return { ...ERRORS.MISSING_QUESTION_ID, details: `questionId debe ser string, recibido: ${typeof questionId}` };
  }
  // Edge case: string vacío
  if (String(questionId).trim() === '') {
    return { ...ERRORS.MISSING_QUESTION_ID, details: `questionId no puede ser string vacío` };
  }

  // Validar pilar
  if (pilar === undefined || pilar === null) {
    return { ...ERRORS.MISSING_PILLAR, details: `Índice: ${index}` };
  }
  if (typeof pilar !== 'string') {
    return { ...ERRORS.INVALID_PILLAR, details: `pilar debe ser string, recibido: ${typeof pilar}` };
  }
  // Edge case: string vacío
  const trimmedPilar = String(pilar).toLowerCase().trim();
  if (trimmedPilar === '') {
    return { ...ERRORS.MISSING_PILLAR, details: 'pilar no puede ser string vacío' };
  }
  if (!VALID_PILLARS.includes(trimmedPilar)) {
    return { ...ERRORS.INVALID_PILLAR, details: `${pilar} no es válido. Pilares: ${VALID_PILLARS.join(', ')}` };
  }

  // Validar value - maneja edge cases
  if (value === undefined || value === null) {
    return { ...ERRORS.MISSING_VALUE, details: `Índice: ${index}` };
  }

  // Edge case: string vacío
  if (typeof value === 'string' && value.trim() === '') {
    return { ...ERRORS.EMPTY_STRING_VALUE, details: `Índice: ${index}` };
  }

  let numericValue;
  if (typeof value === 'string') {
    // Edge case: string no numérico
    const parsed = parseInt(value.trim(), 10);
    if (isNaN(parsed)) {
      return { ...ERRORS.INVALID_VALUE_TYPE, details: `"${value}" no es un número válido` };
    }
    numericValue = parsed;
  } else if (typeof value === 'number') {
    // Edge case: NaN
    if (isNaN(value)) {
      return { ...ERRORS.INVALID_VALUE_TYPE, details: 'Valor es NaN' };
    }
    numericValue = value;
  } else {
    return { ...ERRORS.INVALID_VALUE_TYPE, details: `Tipo recibido: ${typeof value}` };
  }

  // Edge case: valor negativo
  if (numericValue < 0) {
    return { ...ERRORS.NEGATIVE_VALUE, details: `Valor: ${numericValue}` };
  }

  // Validar rango
  if (numericValue < VALID_VALUE_RANGE.min || numericValue > VALID_VALUE_RANGE.max) {
    return {
      ...ERRORS.VALUE_OUT_OF_RANGE,
      details: `Valor ${numericValue} fuera de rango [${VALID_VALUE_RANGE.min}-${VALID_VALUE_RANGE.max}]`
    };
  }

  return null; // Sin errores
}

/**
 * Valida información de contacto (opcional)
 * Maneja: emails inválidos, strings vacíos
 */
function validateContactInfo(contactInfo) {
  const errors = [];

  if (!contactInfo || typeof contactInfo !== 'object') {
    return errors;
  }

  const { name, email } = contactInfo;

  // Validar email si está presente
  if (email !== undefined && email !== null) {
    // Edge case: string vacío
    if (typeof email === 'string' && email.trim() === '') {
      errors.push({ ...ERRORS.INVALID_EMAIL, details: 'Email no puede ser string vacío' });
    } else if (typeof email === 'string') {
      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        errors.push({ ...ERRORS.INVALID_EMAIL, details: `Formato inválido: ${email}` });
      }
    }
  }

  // Validar name si está presente - solo verificar no sea string vacío
  if (name !== undefined && name !== null) {
    if (typeof name === 'string' && name.trim()