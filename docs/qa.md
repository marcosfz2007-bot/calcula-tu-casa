# QA — expansion-calculadoras-02

Fecha de revisión técnica: 6 de octubre de 2026.

## Alcance

La rama parte del HEAD actual de `main` y añade exclusivamente estas nueve herramientas:

- potencia y elementos de radiador;
- número de placas solares;
- comparador de costes de calefacción;
- presupuesto de reforma integral;
- reforma de baño;
- reforma de cocina;
- amortización solar;
- rentabilidad de aerotermia;
- comparador de reformas energéticas.

El catálogo queda con 21 rutas reales. Reformas pasa a indexable y entra en sitemap; Solar continúa indexable.

## Fuentes y datos externos

- Radiadores: potencia declarada por fabricante/UNE-EN 442; no se fija W/m³ universal.
- Solar: JRC/PVGIS 5.3 para producción específica y resultados fotovoltaicos.
- Bomba de calor: IDAE para conceptos de COP/SCOP y rehabilitación con bomba de calor.
- Pellet: IDAE como referencia técnica del PCI, manteniéndose editable.
- Reformas: BCCA de la Junta de Andalucía y normativa de presupuestos por precios unitarios como referencias metodológicas; no se importan precios nacionales automáticos.
- Reformas energéticas: CTE DB-HE para transmitancia y guía IDAE de rehabilitación/aislamiento; HDD manual.

## Hipótesis propias explícitas

- La calculadora de radiadores usa el factor térmico y corrección que introduce el usuario.
- La sensibilidad de aerotermia es un ±% editable sobre SCOP y no un intervalo estadístico.
- Las reformas usan los rangos unitarios del usuario; no existe corrección provincial.
- El comparador energético por HDD es una aproximación de transmisión térmica y trata las actuaciones por separado.
- El payback es simple/acumulado según la herramienta; no se implementa TIR.

## Tests

Ejecución real del workflow `Verify` previa al cierre documental:

```text
npm test
220 tests
220 aprobados
0 fallidos
```

Se conservan los 129 tests existentes y se añaden casos normales, mínimos, máximos razonables, cero cuando aplica, negativos, vacíos, decimales con coma y casos manuales para cada nueva calculadora, además de regresiones específicas:

- radiadores: `ceil`, potencia instalada ≥ demanda y potencia por elemento configurable;
- paneles: redondeo, superficie, PVGIS y distinción cobertura/autoconsumo;
- calefacción: mismo calor útil, SCOP, eficiencia, costes fijos, precio cero y orden;
- reformas: bajo ≤ central ≤ alto, suma, exclusiones, configuración versionada y ausencia de precio provincial automático;
- solar: excedentes, autoconsumo, degradación, mantenimiento y payback;
- aerotermia: rendimiento actual, SCOP, ayudas, ahorro negativo y payback;
- reformas energéticas: ΔU, HDD, conversión a energía comprada, payback y U no mejorada;
- catálogo: exactamente 21 rutas, relacionados válidos, hubs indexables, sitemap y contadores no obsoletos;
- privacidad: se mantiene la excepción explícita de PVGIS.

## Builds reales

```text
npm ci
correcto
0 vulnerabilidades reportadas

npm run build
correcto
37 páginas generadas

SITE_URL=https://calcula-tu-casa.pages.dev npm run build
correcto
37 páginas generadas
sitemap-index.xml generado
```

Los logs del build confirman la generación de las nueve nuevas rutas y de `/reformas/index.html`.

## Sitemap

La configuración incluye Solar y Reformas. Permanecen excluidas las páginas legales pendientes: contacto, aviso legal, privacidad y cookies.

Los tests de consistencia verifican que `/solar/` y `/reformas/` no están en `SITEMAP_EXCLUDED_PATHS`, mientras las páginas legales continúan excluidas.

## Responsive / revisión visual

Se ha revisado la estructura responsive del código para formularios largos, tablas y filas dinámicas: a ≤820 px las calculadoras pasan a una columna; los grupos triples de reformas pasan a una columna; las tablas se encapsulan en contenedores con scroll horizontal; y a ≤520 px se reducen paddings de filas dinámicas.

No se dispone en este entorno de un navegador gráfico contra una preview de la rama. Antes de fusionar se recomienda una revisión humana en 360 px y escritorio del PR/preview, especialmente de:
- tabla del comparador de calefacción;
- formularios de rangos de reformas;
- flujo de añadir/eliminar reformas energéticas;
- tabla año a año de amortización solar.

## Producción

La rama no modifica directamente producción. El despliegue continúa dependiendo del merge manual a `main`.
