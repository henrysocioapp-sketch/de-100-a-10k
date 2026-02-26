# K10-002: Framework de Auditoría de Funnels

## Status: ✅ COMPLETADO (26 Feb 2026)

---

## 1. METODOLOGÍA: Los 5 Pilares del Funnel

Cada auditoría evalúa estos 5 pilares con score 0-100:

### Pilar 1: TRÁFICO (Traffic)
**Pregunta clave:** ¿Están llegando las personas correctas?

| Checkpoint | Cómo medir | Herramienta |
|------------|-----------|-------------|
| Fuentes de tráfico | % orgánico vs pagado vs referido | GA4 / Plausible |
| Calidad de tráfico | Bounce rate < 50% | GA4 |
| Intención | Pages/session > 2 | GA4 |
| Costo por visita | CAC estimado | Ads Manager |

**Red flags:**
- Bounce rate > 70%
- 80%+ tráfico de un solo canal
- Sin tracking de UTMs

---

### Pilar 2: CAPTURA (Lead Capture)
**Pregunta clave:** ¿Están convirtiendo visitantes en leads?

| Checkpoint | Benchmark | Qué revisar |
|------------|-----------|-------------|
| Landing page CVR | > 15% | Form views / submissions |
| Lead magnets | Relevancia | ¿Resuelve dolor #1? |
| Forms | Friction | Campos mínimos necesarios |
| Popup timing | No intrusivo | Delay 30s o scroll 50% |

**Red flags:**
- CVR < 5%
- Form con 5+ campos obligatorios
- Sin lead magnet
- No hay opt-in en homepage

---

### Pilar 3: NUTRICIÓN (Nurture)
**Pregunta clave:** ¿Están construyendo relacion antes de vender?

| Checkpoint | Qué buscar | Herramienta |
|------------|------------|-------------|
| Email welcome | Automático, < 5min | Mailchimp/ConvertKit |
| Sequence value | 5-7 emails antes de pitch | CRM |
| Seguimiento | Tagging por comportamiento | CRM |
| Re-engagement | Campaña 60d inactivos | CRM |

**Red flags:**
- No hay welcome sequence
- Pitch inmediato sin valor previo
- Sin segmentación
- Emails solo transaccionales

---

### Pilar 4: VENTAS (Conversion)
**Pregunta clave:** ¿Están cerrando los leads que califican?

| Checkpoint | Benchmark | Qué revisar |
|------------|-----------|-------------|
| Lead-to-call rate | > 20% | Booking / Calendly |
| Call-to-close rate | > 30% | CRM manual |
| Proposal-to-signature | > 60% | PandaDoc/DocuSign |
| Follow-up | 5+ touches promedio | CRM report |

**Red flags:**
- Sin proceso de sales definido
- Nadie hace follow-up
- Calls sin estructura
- Proposals genéricas

---

### Pilar 5: RETENCIÓN (Retention)
**Pregunta clave:** ¿Están reteniendo y expandiendo clientes?

| Checkpoint | Benchmark | Qué revisar |
|------------|-----------|-------------|
| Churn rate | < 5%/mes | Stripe/CRM |
| NPS | > 30 | Survey simple |
| Expansion revenue | > 20% | Stripe report |
| Referidos orgánicos | Tracking activo | CRM referral field |

**Red flags:**
- Churn > 10%
- No preguntan por referidos
- Sin upsell definido
- Más foco en nuevos que retención

---

## 2. PROCESO DE AUDITORÍA (3 fases)

### FASE A: Discovery (30 min)
**Antes de ver datos, entiendo el negocio:**

```
1. "Cuéntame tu modelo de negocio en 2 minutos"
   → ¿Servicios, productos, SaaS, marketplace?
   
2. "¿Cuál es tu producto estrella y a cuánto lo vendes?"
   → Precio, frecuencia, LTV estimado
   
3. "¿Cómo llegan tus clientes hoy?"
   → Canales activos, $ en ads, orgánico
   
4. "¿Dónde sientes que 'se pierde' gente?"
   → Auto-diagnóstico del cliente (insight valioso)
   
5. "¿Cuántos leads leads por mes y cuántos cierras?"
   → CVR funnel top-of-mind
```

### FASE B: Análisis Técnico (60-90 min)
**Revisión estructurada de los 5 pilares:**

| Actividad | Tiempo | Output |
|-----------|--------|--------|
| Revisar GA4/Analytics | 15 min | Screenshot métricas clave |
| Revisar funnel visual | 10 min | Nota fugas identificadas |
| Revisar CRM/Email flows | 20 min | Lista de gaps |
| Revisar site UX | 15 min | Notas quick wins |
| Competencia (3 rivales) | 15 min | Benchmark externo |
| Documentar hallazgos | 15 min | Raw notes → estructura |

### FASE C: Reporte + Presentación (30 min)
**Entregable estructurado:**

---

## 3. PLANTILLA DE REPORTE (Auditoría Express $497)

### FORMATO: PDF 5-7 páginas

**Página 1: Scorecard Ejecutivo**
```
┌─────────────────────────────────────┐
│  SCORECARD DE FUNNEL               │
│  Cliente: [Nombre]                 │
│  Fecha: [Fecha]                    │
│                                    │
│  TRÁFICO      [####____]  67/100  │
│  CAPTURA      [###_____]  45/100  │
│  NUTRICIÓN    [####____]  60/100  │
│  VENTAS       [##______]  30/100  │
│  RETENCIÓN    [#####___]  80/100  │
│                                    │
│  OVERALL      [####____]  56/100  │
│  Status: 🔴 CRÍTICO                │
└─────────────────────────────────────┘
```

**Página 2: Hallazgos Críticos (Top 3)**
| # | Problema | Impacto estimado | Quick fix |
|---|----------|----------------|----------|
| 1 | Landing page sin CTA arriba | -40% conversion | Agregar CTA hero |
| 2 | Email sequence de 2 emails | -60% nurture | Expandir a 7 |
| 3 | No tracking UTMs | Blind spot $ | Implementar GA4 |

**Página 3: Oportunidades Priorizadas**
```
OPORTUNIDAD #1: Alta + Rápida
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Problema: Bounce rate 75% en landing
Acción: Simplificar above-the-fold
Esperado: -20% bounce → +15% leads

OPORTUNIDAD #2: Alta + Media
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Problema: Sin email sequences
Acción: Setup welcome + nurture 5 emails
Esperado: +25% call bookings

OPORTUNIDAD #3: Media + Rápida
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Problema: Checkout no optimizado móvil
Acción: Responsive fixes
Esperado: +10% conversion checkout
```

**Página 4: Benchmark vs Competencia**
| Métrica | Cliente | Competidor A | Competidor B | Indústria avg |
|---------|---------|--------------|--------------|---------------|
| CVR Landing | 8% | 15% | 12% | 10% |
| Email open | 18% | 35% | 28% | 25% |
| Lead-to-close | 5% | 25% | 20% | 15% |

**Página 5: Roadmap Recomendado**
```
mes 1: Quick wins (2-4 semanas)
   → Fix landing CTA
   → Setup email sequence
   → UTM tracking

mes 2-3: Fundamentos (4-8 semanas)
   → CRM setup completo
   → Sales process documentado
   → A/B testing system

mes 3-6: Escala (8-20 semanas)
   → Nuevos canales
   → Automatizaciones
   → Expansion revenue
```

**Página 6/7: Anexos técnicos**
- Screenshots GA4
- Screenshots funnel visual
- Competencia screenshots
- Recursos recomendados

---

## 4. HERRAMIENTAS STACK

### Para auditar (yo):
| Uso | Tool | Costo |
|-----|------|-------|
| Analytics | GA4 + Plausible | Free / $9 |
| Screen capture | CleanShot / OBS | $29 una |
| PDF creation | Canva / Google Slides | Free |
| Notes | Notion / Obsidian | Free |

### Para recomendar (cliente):
| Uso | Tool | Costo mensual |
|-----|------|----------------|
| Landing | Carrd / Webflow | $19-39 |
| Email | ConvertKit / Mailchimp | Free tier |
| CRM | Notion / Airtable / HubSpot | Free tier |
| Calendar | Calendly | Free tier |
| Payments | Stripe | 2.9%+30¢ |

---

## 5. CHECKLIST PRE-VENTA

Antes de vender una auditoría, verificar:

- [ ] Tengo acceso a GA4 / Analytics
- [ ] Tengo acceso a CRM / Email tool
- [ ] Cliente puede hacer call de 30 min
- [ ] Cliente compartirá pantalla si es necesario
- [ ] Entiendo modelo de negocio básico

---

## 6. CHECKLIST POST-ENTREGA

Después de entregar reporte $497:

- [ ] Follow-up 48h: ¿Preguntas del reporte?
- [ ] Follow-up 7d: ¿Probaste alguna recomendación?
- [ ] Propuesta upsell $1,997 (si aplica)
- [ ] Pedir testimonial (con resultados)
- [ ] Preguntar: ¿Conoces a alguien más que necesite esto?

---

## 7. PRICING & ESCALAMIENTO

| Servicio | Precio | Tiempo | Incluye |
|----------|--------|--------|---------|
| **Express** | $497 | 2h | Scorecard + Top 3 |
| **Deep Dive** | $997 | 4h | Express + Competencia + Call 90min |
| **Implementación Light** | $1,997 | 2-3 sem | Fix top 5 issues |
| **Implementación Full** | $4,997 | 4-6 sem | Funnel completo rebuilt |

---

**Next Steps:**
- [