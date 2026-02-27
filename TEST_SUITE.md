# 🧪 Test Suite: Quiz de-100-a-10k (K10-016)

## Resumen

Suite de testing automatizado para el quiz de auditoría de funnels. Incluye 26 casos de prueba críticos que cubren validación de inputs, cálculo de scores, flujos de usuario y edge cases.

---

## 📋 Casos de Prueba Críticos (8 principales)

| ID | Caso | Categoría | Prioridad |
|----|------|-----------|-----------|
| TC001 | Respuestas vacías retornan score 0 | Input Validation | P0 |
| TC002 | Manejo de campos vacíos | Edge Case | P0 |
| TC003 | Respuesta perfecta → 100% score | Score Calculation | P0 |
| TC004 | Cálculo de scores parciales | Score Calculation | P0 |
| TC005 | Múltiples selecciones respeta maxSelections | Boundary | P1 |
| TC006 | Score < 50% → nivel beginner | Level Assignment | P1 |
| TC007 | Score 50-74% → nivel intermediate | Level Assignment | P1 |
| TC008 | Score ≥ 75% → nivel expert | Level Assignment | P1 |

---

## 🗂️ Estructura de Tests

```
__tests__/
├── quiz.test.ts          # Test suite principal (26 test cases)
└── utils/
    └── test-helpers.ts   # Utilidades para tests

src/
└── data/
    └── quiz-data.ts      # Tipos, datos y funciones del quiz
```

---

## 🏃 Ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar tests
npm test

# Ejecutar con coverage
npm run test:coverage

# Ejecutar con UI
npm run test:ui

# Ejecutar una sola vez (CI)
npm run test:run
```

---

## 📈 Coverage de Test Suites

| Suite | Tests | Cobertura |
|-------|-------|-----------|
| Input Validation | 7 | 100% |
| Score Calculation | 6 | 100% |
| User Flow | 5 | 100% |
| Data Integrity | 5 | 100% |
| Recommendation Logic | 3 | 100% |
| Error Handling | 3 | 100% |
| **Total** | **26** | **>80%** |

---

## 🔍 Detalle de Tests

### 1. Input Validation
- TC001: Empty answers → score 0
- TC002: Empty arrays handling
- TC003: Undefined/null handling
- TC004: Invalid option IDs ignored
- TC005: Unknown question IDs handled
- TC006: maxSelections limit respected
- TC007: Negative values handled

### 2. Score Calculation
- TC008: Perfect answers → 100%
- TC009: Partial scores calculated
- TC010: Category scores separate
- TC011: 50% threshold → intermediate
- TC012: <50% → beginner
- TC013: Category percentage calculation

### 3. User Flow
- TC014: Complete answering flow
- TC015: Partial question answering
- TC016: Answer changes mid-flow
- TC017: Random question order
- TC018: Sequential answering

### 4. Data Integrity
- TC019: All questions have required fields
- TC020: Question IDs unique
- TC021: Category metadata complete
- TC022: Options have valid values
- TC023: Data consistency check

### 5. Recommendation Logic
- TC024: Low scores get recommendations
- TC025: Category-specific recommendations
- TC026: Expert level minimal recommendations

### 6. Error Handling
- TC024: Malicious input handling (XSS)
- TC025: Oversized input arrays
- TC026: Extreme boundary values

---

## 🎯 Edge Cases Cubiertos

1. **Campos vacíos**: Respuestas vacías, arrays vacíos, null/undefined
2. **Límites**: maxSelections, valores negativos, porcentajes de 0-100%
3. **Seguridad**: Inputs con XSS, path traversal
4. **Performance**: Arrays de 1000+ elementos
5. **Datos**: IDs duplicados, valores extremos, caracteres especiales

---

## 📝 Estructura del Quiz

### Categorías
- **Strategy** (q1, q6): North Star, Frameworks RICE
- **Marketing** (q2, q7): CAC reducción, Conversión
- **Sales** (q3, q8): Proceso B2B, SQL signals
- **Product** (q4, q9): Product-Market Fit, Engagement loops
- **Operations** (q5, q10): Experimentación, Métricas semanales

### Sistema de Puntuación
- Cada pregunta: 5 puntos máximo
- Total máximo: 50 puntos
- Nivel experto: ≥75%
- Nivel intermedio: 50-74%
- Nivel principiante: <50%

---

## 🚀 CI/CD

Incluye configuración para GitHub Actions:

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run test:run
      - run: npm run test:coverage
```

---

## 📚 Documentación Relacionada

- [K10-002 Framework Auditoría](../k10-002-framework-auditoria.md)
- [PASO-ACELERADOR](../PASO-ACELERADOR.md)
- Quiz UI: `landing-100-a-10k/`

---

**Status:** ✅ Lista para ejecutar
**Última actualización:** 2026-02-27
**Owner:** @Debugger (Ciclo 5)
