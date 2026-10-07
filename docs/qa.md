# QA — expansion-calculadoras-04

Fecha de revisión técnica: 7 de octubre de 2026.

## Base y alcance

La rama se creó desde `main` en `15713b3a683e6dc48c9fedd495efe8207f74d5f1`, después de verificar 31 calculadoras, UI V2, tests, `ads.txt`, meta de AdSense, Search Console, sitemap, páginas legales y variables legales. No había ningún Pull Request abierto de expansión en ese momento.

Se añaden exactamente ocho herramientas:

- `/aislamiento/perdida-termica-vivienda/`;
- `/energia/consumo-deshumidificador/`;
- `/aislamiento/ahorro-cambio-ventanas/`;
- `/reformas/hormigon-necesario/`;
- `/reformas/mortero-necesario/`;
- `/reformas/ladrillos-bloques-necesarios/`;
- `/reformas/calculadora-impermeabilizacion/`;
- `/reformas/tamano-deposito-agua/`.

El catálogo contiene exactamente **39 calculadoras**.

## Metodología y fuentes

### Pérdida térmica

`Q = Σ(U × A × ΔT)`. Solo transmisión estacionaria. Fuente principal: CTE DB-HE y Catálogo de Elementos Constructivos. No se añaden infiltración, ventilación o puentes térmicos ocultos.

### Deshumidificador

`kWh = W / 1000 × horas × días`. Precio manual. La capacidad L/24 h, si se introduce, se trata como dato nominal condicionado por el ensayo del fabricante. Se usa una ficha oficial de De’Longhi como ejemplo de declaración a temperatura/humedad concretas.

### Cambio de ventanas

`ΔP = max(0,(U actual − U nueva) × A × ΔT)`; `kWh térmicos = ΔP × horas / 1000`; energía comprada evitada = térmica / rendimiento o COP. Fuentes: CTE DB-HE e IDAE. La amortización simple solo aparece con coste opcional y ahorro positivo.

### Hormigón y mortero

Son cálculos geométricos de volumen. No se inventan densidad, dosificación ni rendimiento. Cuando se solicitan sacos, los L/saco deben proceder de la ficha del producto. Las fichas Sika citadas sirven como ejemplos de que el rendimiento se declara por producto, no como valor universal.

### Ladrillos y bloques

La superficie neta se divide por el módulo de colocación formado por dimensión física + junta. Fuente: CTE DB-SE-F. La herramienta no calcula mortero ni verifica estabilidad estructural.

### Impermeabilización

Modo L: `L = superficie × capas / (m²/L·capa)`. Modo kg: `kg = superficie × kg/m²`, multiplicando por capas solo cuando el consumo declarado es por capa. Fuentes de fabricante oficiales muestran ambas formas de declarar rendimiento. No se convierte entre L y kg sin densidad del producto.

### Depósito de agua

Demanda × autonomía, reserva y fracción utilizable opcional. Es solo dimensionamiento volumétrico orientativo. CTE HS 4 y RD 487/2022 se citan para dejar claro que bombas, presiones, red, antirretornos, calidad del agua, legionela y demás requisitos sanitarios/instalación quedan fuera.

## Tests reales

Ejecución funcional previa a este cierre documental:

```text
npm ci
correcto
0 vulnerabilidades

npm test
424 tests
424 aprobados
0 fallidos

npm run build
correcto
55 páginas generadas

SITE_URL=https://calcula-tu-casa.pages.dev npm run build
correcto
55 páginas generadas
sitemap-index.xml generado
```

La suite nueva cubre para cada motor: caso normal, mínimo razonable, máximo razonable, cero cuando procede, negativo, vacío, valor inválido/NaN, decimal con coma, decimal con punto y caso manual. También cubre suma/ranking/ΔT 0, W→kWh, U peor/igual, COP, `ceil` de sacos, conversiones cm/mm, juntas, huecos, modos L/kg, capas, envases, demanda por personas, fracción utilizable y depósitos comerciales.

Existe una regresión explícita que exige `tools.length === 39` y otra que impide volver accidentalmente a 31.

## Incidencias detectadas durante QA

La primera ejecución ampliada detectó dos fallos nuevos y se corrigieron antes del cierre:

1. una coma ausente en el catálogo tras modificar interlinking;
2. precisión flotante en `ceil` de sacos de hormigón (1320 L representados como 1320.0000000000002), resuelta redondeando litros calculados antes del `ceil`.

No se modificó ninguna fórmula ni motor de las 31 calculadoras anteriores.

## UI V2 y responsive

Las nuevas interfaces reutilizan los patrones actuales `calculator`, `card`, `result`, `fields`, `dynamic-list`, `dynamic-row`, `reform-row`, `button`, metodología, fuentes, FAQ y relacionados. No se añaden dependencias ni un sistema visual paralelo.

Los tests de contrato verifican que las cuatro interfaces especializadas nuevas conservan los patrones UI V2. El CSS responsive existente hace que formularios y grids pasen a una columna en móvil.

## Preservación de main

No se modifican deliberadamente:

- `src/layouts/Base.astro` y la meta `google-adsense-account`;
- `public/ads.txt`;
- `public/google16f16c402ad0eb27.html`;
- páginas legales y contacto;
- `.env.example` y sus variables legales;
- configuración de sitemap/canonical;
- scripts de publicidad, Analytics o CMP.

Las regresiones existentes siguen comprobando estos contratos.

## Cierre de rama y Pull Request

Antes de abrir el PR se volvió a consultar `main`: continuaba en `15713b3a683e6dc48c9fedd495efe8207f74d5f1`, por lo que la rama estaba 0 commits por detrás y no requirió sincronización adicional.

Comparación `main` → `expansion-calculadoras-04`:

- 17 archivos añadidos;
- 8 archivos modificados;
- 0 archivos eliminados.

Se verificó byte a byte que permanecen idénticos a `main`: `.env.example`, `astro.config.mjs`, `public/ads.txt`, verificación de Search Console, `src/layouts/Base.astro`, `src/lib/seo.mjs`, `src/pages/[info].astro`, `src/pages/robots.txt.ts`, `src/styles/global.css` y `docs/ui-redesign-v2.md`.

PR abierto: **#6 — feat: ampliar Calcula tu Casa con herramientas de aislamiento y obra**.

La CI del evento `pull_request` terminó correctamente. GitHub marca el PR como mergeable y no se ha fusionado.

### Cloudflare Preview

La integración disponible no publicó una URL de preview en estados ni comentarios de GitHub y el alias de rama esperado no resolvió públicamente durante la comprobación. Por tanto no se inventa una URL de preview ni se afirma una revisión visual que no haya podido realizarse.

La estructura responsive sí queda protegida por UI V2 y por tests de contrato, pero la comprobación visual real a 360 px y escritorio de la preview queda como revisión humana previa al merge.
