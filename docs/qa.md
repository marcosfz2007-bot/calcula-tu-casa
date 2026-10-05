# QA — entrega inicial, 5 de octubre de 2026

## Alcance

Sprints 0 y 1: dos calculadoras, portada, catálogo, dos hubs y contenido de metodología. Las páginas de contacto y legales son borradores expresamente identificados y no indexables. Las demás calculadoras del roadmap quedan pendientes.

## Verificado

- `npm test`: 23 pruebas aprobadas. Casos normales, mínimos, máximos, cero, negativos, vacío, coma y punto decimal, referencia manual y ramas de validación/sensibilidad.
- `npm run build`: 15 páginas HTML generadas, robots y sitemap.
- Compilación con SITE_URL de prueba: canonical absoluta en las páginas y JSON-LD válido en las dos calculadoras. Sin SITE_URL: noindex y sin URL ficticia.
- La interfaz usa etiquetas, unidades, errores asociados, foco en el primer error, aria-live y restablecimiento.
- No hay código de publicidad, analítica, cookies, localStorage ni envío de valores.

## Casos con resultados esperados

| Caso | Esperado |
| --- | --- |
| AC: 1000 W, 8 h, 30 días, 60 %, 1 equipo, 0,20 €/kWh | 144 kWh/mes; 28,80 €/mes |
| AC anterior durante 3 meses | 432 kWh; 86,40 € |
| Radiador: 1500 W, 5 h, 30 días, 70 %, 0,20 €/kWh | 157,5 kWh/mes; 31,50 €/mes |
| Radiador anterior durante 4 meses | 630 kWh; 126 € |
| 1000 W, 1 h, 1 día, 100 %, 0,20 €/kWh | 1 kWh; 0,20 € |
| Potencia, horas o utilización cero | Consumo y coste cero |
| Negativo, vacío, NaN o Infinity | Error de validación; no se calcula |
| Precio 0,25 y 0.25 | Mismo resultado |
| 31 días/mes × 12 meses | Error: excede 365 días |
| Máximo: 30000 W, 24 h, 30 días, 100 %, 20 equipos, 5 €/kWh, 12 meses | 25.920.000 €/año; escenario superior limitado a 24 h |

## Pendiente de verificación visual

La compilación y las pruebas matemáticas no acreditan una auditoría WCAG o Core Web Vitals. La descarga de Chromium en el entorno de trabajo no se pudo completar. Revisar en navegador real a 360 y 1280 px: ausencia de desbordamiento, teclado, mensajes, cálculos con coma y restablecimiento. Medir rendimiento en el alojamiento final.

## Antes del lanzamiento

1. Configurar dominio y contacto real.
2. Completar y revisar textos legales según titular y tratamiento real. Retirar noindex solo de las páginas terminadas.
3. Conectar Cloudflare Pages y comprobar producción, HTTPS, 404, sitemap y encabezados.
4. Completar más herramientas antes de solicitar monetización según el quality gate del documento.
5. Si se activa AdSense, integrar CMP y ads.txt reales y verificar aceptar, rechazar y revocar. No insertar identificadores ficticios.
