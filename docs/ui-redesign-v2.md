# Rediseño UI v2 — auditoría y dirección visual

Fecha: 6 de octubre de 2026  
Rama: `redesign-ui-v2`  
Baseline de `main`: `e47eede09fbb63d41b9375a3ea6995f4558a34d7`

## Auditoría previa

### Fortalezas conservadas

1. Arquitectura Astro estática y ligera.
2. Catálogo único con 31 calculadoras y rutas canónicas consistentes.
3. Formularios semánticos con labels, ayudas y resultados dinámicos accesibles.
4. Metodología, fuentes, limitaciones y FAQ ya presentes en HTML inicial.
5. Ausencia de frameworks JS pesados y separación clara entre lógica matemática y presentación.

### Mejoras prioritarias detectadas

1. La identidad visual era funcional pero demasiado plana y administrativa.
2. La home mostraba demasiado catálogo demasiado pronto y no priorizaba búsqueda.
3. Las tarjetas utilizaban símbolos heterogéneos y tenían poca diferenciación por categoría.
4. Faltaba un sistema explícito de tokens para color, superficies, radios y sombras.
5. Los formularios necesitaban más jerarquía, foco y separación visual entre grupos.
6. El resultado necesitaba ganar protagonismo frente al formulario.
7. La metodología debía seguir visible sin competir visualmente con la herramienta.
8. FAQ y fuentes necesitaban patrones más escaneables.
9. Header y footer podían comunicar mejor que el producto principal son las calculadoras.
10. Mobile requería targets, inputs y CTAs más cómodos sin aumentar JavaScript.

## Dirección visual

- Light theme luminoso y sobrio.
- Verde como identidad, combinado con neutros cálidos y acentos por categoría.
- Superficies blancas/tintadas, profundidad sutil y sombras ligeras.
- SVG inline propios; sin librería de iconos.
- Tipografía del sistema para evitar coste de fuentes externas.
- Radios moderados y jerarquía tipográfica más marcada.
- Microinteracciones CSS cortas con soporte de `prefers-reduced-motion`.
- Resultado con superficie diferenciada, cifra principal grande y desglose escaneable.

## Categorías

- Energía: acento cálido.
- Climatización: azul verdoso.
- Aislamiento: violeta grisáceo.
- Solar: amarillo dorado.
- Reformas: terracota.

El color nunca sustituye al texto de categoría ni a las etiquetas.

## Cambios estructurales

- Home: hero más claro, buscador protagonista, selección “Herramientas principales”, categorías y explicación del flujo.
- Directorio: búsqueda central y filtros de navegación por hub.
- Hubs: presentación de colección y navegación transversal entre categorías.
- Tarjetas: iconografía SVG, categoría, título, descripción y acción.
- Calculadoras: formularios con controles de 48 px, resultado visualmente prioritario y layout responsive.
- Metodología: interpretación primero y fórmula/ejemplo/hipótesis en `details/summary` semántico.
- Fuentes: lista estructurada y escaneable.
- FAQ: acordeones HTML nativos.
- Relacionadas: se mantienen contextuales y aparecen al final del recorrido explicativo.
- Header/footer: navegación simplificada y jerarquía profesional.

## No objetivos

No se cambian fórmulas, resultados, rutas, canonicals, publisher ID, `ads.txt`, verificación de Search Console, variables legales ni scripts de publicidad/analítica.

## Presupuesto técnico

No se añaden dependencias. El rediseño se resuelve con Astro, HTML, CSS y el JavaScript vanilla existente. La iconografía es SVG inline y las animaciones son CSS de corta duración.
