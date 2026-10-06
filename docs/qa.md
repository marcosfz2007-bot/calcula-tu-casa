# QA — expansion-calculadoras-03

Fecha de revisión técnica: 6 de octubre de 2026.

## Alcance

La rama parte del HEAD de `main` y añade exclusivamente estas diez herramientas:

- pintura;
- azulejos y baldosas;
- suelo laminado / tarima;
- rodapié;
- papel pintado;
- iluminación por lux;
- ahorro al sustituir bombillas por LED;
- consumo en standby;
- recarga doméstica de vehículo eléctrico;
- capacidad de batería solar.

El catálogo queda con **31 calculadoras reales** y mantiene los hubs Energía, Climatización, Aislamiento, Solar y Reformas indexables.

## Decisiones metodológicas

- No se precarga un rendimiento universal de pintura; procede de la ficha del producto.
- El desperdicio de cerámica, suelo y rodapié es editable.
- Azulejos permite piezas/caja o m²/caja como modos alternativos.
- Laminado admite varias estancias y superficie manual.
- Papel pintado se calcula por tiras y rapport, no solo por m².
- Iluminación usa la relación SI `1 lx = 1 lm/m²`; el objetivo de lux y los factores son manuales.
- LED y standby usan potencia × tiempo; no descargan tarifas.
- Recarga VE usa energía de red corregida por eficiencia y potencia efectiva limitada por cargador/vehículo cuando se indica.
- Batería solar separa capacidad (kWh) y potencia (kW); eficiencia round-trip afecta a la energía de carga.

## Fuentes principales

- Jotun: rendimiento por mano y factores que afectan al consumo de pintura.
- Marazzi: superficie, formato y porcentaje de residuo en colocación.
- Quick-Step: m² por paquete variables según colección y accesorios de acabado.
- Cole & Son: dimensiones del rollo, repeat y match de papel pintado.
- BIPM: lux como lumen por metro cuadrado.
- Reglamento (UE) 2023/826: contexto normativo de standby.
- Documentación técnica de recarga doméstica AC.
- NREL: potencia, energía, DoD y round-trip efficiency en almacenamiento.

## Tests reales

Workflow `Verify` sobre el código funcional previo al cierre documental:

```text
npm test
318 tests
318 aprobados
0 fallidos
```

Se conservan los **226 tests** existentes y se añaden regresiones para las diez nuevas herramientas. Cada calculadora cubre, como mínimo, caso normal, mínimo, máximo razonable, cero cuando aplica, negativo, vacío, decimal con coma y caso manual conocido.

Regresiones adicionales:

- pintura: envases y exigencia de al menos una superficie;
- azulejos: modo piezas/caja frente a m²/caja;
- laminado: suma de estancias y prioridad de superficie manual;
- rodapié: paquetes y rechazo de doble precio;
- papel pintado: rapport y rollo demasiado corto;
- lux: identidad `1 lx = 1 lm/m²`;
- LED: no forzar payback cuando no existe ahorro;
- standby: ranking y reducción parcial;
- VE: límite AC del vehículo y coherencia de SOC;
- batería: módulos, excedente insuficiente y separación kWh/kW;
- catálogo: exactamente 31 rutas y relacionados existentes;
- integración con main: AdSense verification meta, `ads.txt`, Search Console, legales y ausencia de scripts de Ads/Analytics/CMP.

## Builds reales

```text
npm ci
correcto
0 vulnerabilidades reportadas

npm run build
correcto
47 páginas generadas

SITE_URL=https://calcula-tu-casa.pages.dev npm run build
correcto
47 páginas generadas
sitemap-index.xml generado
```

## Preservación de main

La expansión no elimina ni sustituye:

- `google-adsense-account` del `<head>`;
- `public/ads.txt`;
- archivo de verificación de Google Search Console;
- configuración y variables actuales de Contacto, Aviso legal, Privacidad y Cookies;
- exclusión de páginas legales del sitemap;
- robots/sitemap existentes;
- la corrección de privacidad de PVGIS.

No se activan scripts de AdSense, Google Analytics ni CMP.

## Responsive / revisión visual

La estructura mantiene los breakpoints existentes. Las nuevas filas dinámicas usan una columna en móvil mediante los estilos generales y específicos añadidos; las tablas usan contenedor con scroll horizontal cuando procede.

Antes del merge conviene una revisión humana de la preview a 360 px y escritorio, especialmente:

- habitaciones dinámicas de laminado;
- equipos dinámicos de standby;
- modos batería/manual de recarga VE;
- selector piezas/caja vs m²/caja;
- legibilidad de unidades largas en inputs.

## Producción

La rama no modifica directamente `main`. El despliegue de producción depende de un merge manual.
