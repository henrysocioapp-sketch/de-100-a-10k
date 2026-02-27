# Quiz API Documentation - de-100-a-10k

## Endpoints

### POST `/api/quiz/submit`

Envía respuestas del cuestionario y obtiene scores calculados.

#### Request Body

```json
{
  "respuestas": {
    "financiero": {
      "margen_bruto": 35,
      "flujo_caja": "positivo",
      "precios": "estructurados",
      "costos": "optimizeados"
    },
    "operacional": {
      "capacidad_entrega": 85,
      "calidad_procesos": "documentados",
      "clientes_satisfechos": 75
    },
    "marketing": {
      "tasa_retencion": 65,
      "canales": ["google_ads", "facebook", "email"],
      "ratio_ltv_cac": 2.5
    },
    "talento": {
      "productividad_empleado": 85000,
      "rotacion": 15,
      "cultura_score": 4
    }
  }
}
```

#### Response Success (200)

```json
{
  "success": true,
  "scores": {
    "financiero": 85,
    "operacional": 80,
    "marketing": 75,
    "talento": 70,
    "total": 78,
    "categoria": "Empresa estable",
    "descripcion": "Buena base, oportunidades de optimización."
  },
  "timestamp": "2026-02-27T22:15:00.000Z"
}
```

#### Response Error (400)

```json
{
  "error": "Validation failed",
  "details": [
    "financiero.margen_bruto: Debe ser un número entre 0 y 100",
    "marketing.canales: Debe ser un array de canales"
  ]
}
```

---

### GET `/api/quiz/scores/:empresaId`

Obtiene scores guardados previamente.

#### Response (Not yet implemented)

```json
{
  "empresaId": "emp-123",
  "scores": null,
  "message": "Not implemented yet - requires Supabase integration"
}
```

---

## Pilares y Scoring

| Pilar | Peso | Preguntas Clave |
|-------|------|-----------------|
| Financiero | 30% | Margen bruto, flujo de caja, precios, costos |
| Operacional | 25% | Capacidad de entrega, calidad procesos, satisfacción clientes |
| Marketing | 25% | Retención, canales de adquisición, ratio LTV/CAC |
| Talento | 20% | Productividad, rotación, cultura organizacional |

### Rangos de Score

| Score | Categoría | Acción |
|-------|-----------|--------|
| 80-100 | Empresa Sólida | Mantener y escalar |
| 60-79 | Empresa estable | Optimizar áreas débiles |
| 40-59 | Requiere atención | Plan de acción necesario |
| 0-39 | Empresa en riesgo | Intervención urgente |

---

## Validaciones

- **Campos vacíos**: No permitidos (null, undefined, '')
- **Strings vacíos**: No permitidos después de trim
- **Números negativos**: No permitidos
- **NaN**: No permitido
- **Margen bruto**: 0-100
- **Tasa retención**: 0-100
- **Rotación**: 0-100
- **Cultura score**: 1-5

---

## Edge Cases Identificados

1. **Campos vacíos** → Error 400 con mensaje específico
2. **Valores fuera de rango** → Error 400
3. **Tipos incorrectos** → Error 400 (array vs string, etc.)
4. **Pilares incompletos** → Se calcula con datos disponibles (0 si no hay datos)
