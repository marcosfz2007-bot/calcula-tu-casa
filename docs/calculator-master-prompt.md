# Prompt maestro

```text
ACTÚA COMO:
Un desarrollador frontend senior especializado en herramientas web de cálculo,
SEO técnico, Core Web Vitals, accesibilidad WCAG, UX mobile-first y monetización
con Google AdSense.

Estoy desarrollando una web española de calculadoras de Hogar, Energía,
Reformas y Ahorro.

STACK DEL PROYECTO:
- HTML5 semántico prerenderizado.
- Astro como generador estático, aunque el código funcional de la calculadora
  debe poder funcionar también en HTML estático.
- Tailwind CSS compilado en producción.
- JavaScript puro/vanilla ES6+.
- Sin React.
- Sin Vue.
- Sin jQuery.
- Sin librerías externas salvo que yo las autorice expresamente.
- Hosting: Cloudflare Pages.
- Idioma y formatos: España / es-ES.
- Los cálculos deben ejecutarse localmente en el navegador siempre que sea posible.
- Ningún dato introducido por el usuario debe enviarse a servidores salvo que
  la especificación lo indique expresamente.

==================================================
ESPECIFICACIÓN DE ESTA CALCULADORA
==================================================

NOMBRE:
[NOMBRE DE LA CALCULADORA]

OBJETIVO:
[QUÉ PROBLEMA RESUELVE]

URL PREVISTA:
[URL]

INTENCIÓN DE BÚSQUEDA PRINCIPAL:
[KEYWORD/INTENCIÓN]

ENTRADAS DEL USUARIO:
- [INPUT 1 + unidad + mínimo/máximo]
- [INPUT 2]
- [INPUT 3]
...

FÓRMULA / LÓGICA:
[DESCRIBIR EXACTAMENTE LA FÓRMULA]

SALIDAS:
- [RESULTADO PRINCIPAL]
- [RESULTADO SECUNDARIO]
- [DESGLOSE]
- [RANGO/INCERTIDUMBRE SI PROCEDE]

HIPÓTESIS:
[HIPÓTESIS UTILIZADAS]

FUENTES PRIMARIAS:
- [FUENTE + URL + FECHA]
- [FUENTE + URL + FECHA]

LIMITACIONES:
[QUÉ NO PUEDE DETERMINAR LA CALCULADORA]

CALCULADORAS RELACIONADAS:
1. [NOMBRE + URL]
2. [NOMBRE + URL]
3. [NOMBRE + URL]

==================================================
REQUISITOS FUNCIONALES OBLIGATORIOS
==================================================

1. Genera una calculadora 100 % funcional.

2. El cálculo debe realizarse mediante JavaScript puro SIN recargar la página.

3. No utilices ninguna dependencia externa para realizar las operaciones
   matemáticas salvo autorización expresa.

4. Separa la lógica matemática de la manipulación del DOM:
   - funciones puras para los cálculos;
   - una capa independiente para lectura de inputs y renderizado.

5. Nunca introduzcas números mágicos.
   Todas las constantes deben:
   - tener un nombre descriptivo;
   - indicar su unidad;
   - señalar su fuente o que se trata de una hipótesis;
   - estar agrupadas al principio del módulo o venir de un objeto de configuración.

6. No inventes coeficientes.
   Si falta algún parámetro necesario para realizar un cálculo correcto:
   - indícalo claramente;
   - utiliza solo una aproximación técnicamente justificable;
   - identifica esa aproximación como tal.

7. Para parámetros que puedan cambiar por normativa, precio o año:
   NO los entierres dentro de la fórmula.
   Crea un objeto de configuración con:
   - value
   - validFrom
   - checkedAt
   - source

8. Acepta correctamente decimales españoles introducidos con coma o punto.

9. Utiliza Intl.NumberFormat('es-ES') para mostrar números y euros.

10. Implementa validación:
    - campos vacíos;
    - NaN;
    - valores negativos imposibles;
    - valores por debajo/encima de rangos razonables;
    - combinaciones incoherentes.

11. Nunca muestres NaN, Infinity, undefined o resultados absurdos.

12. El resultado debe incluir:
    - resultado principal claramente destacado;
    - rango cuando exista incertidumbre;
    - desglose;
    - hipótesis utilizadas;
    - explicación en lenguaje natural;
    - advertencia sobre las limitaciones.

13. Si tiene sentido, añade un pequeño análisis de sensibilidad:
    “escenario bajo / central / alto”
    o
    “qué ocurre si la variable principal cambia ±20 %”.

14. Incluye un botón "Restablecer".

15. No incluyas botón de registro, email ni teléfono.

16. No recopiles datos personales.

==================================================
UX / MOBILE FIRST
==================================================

Diseña primero para una pantalla de 360 px.

La calculadora debe:
- tener aspecto profesional y sobrio;
- integrarse en una web de hogar/energía;
- ser fácil de entender sin instrucciones previas;
- utilizar tarjetas y espaciado claro;
- evitar efectos visuales innecesarios;
- tener botones de al menos 44 px de altura;
- mostrar unidades junto a cada campo;
- agrupar inputs relacionados;
- utilizar select/radio/slider solo cuando realmente mejore la UX.

No utilices colores como única forma de transmitir información.

Los resultados positivos/advertencias deben incluir también texto o iconos accesibles.

==================================================
ACCESIBILIDAD
==================================================

Obligatorio:
- HTML semántico.
- <label> asociado a cada input.
- fieldset/legend cuando corresponda.
- aria-describedby para ayudas/errores.
- foco visible.
- utilización completa mediante teclado.
- aria-live="polite" en el resultado dinámico cuando proceda.
- contraste adecuado.
- no utilizar placeholders como sustituto de labels.

==================================================
SEO
==================================================

Todo el contenido SEO importante debe existir en el HTML inicial.
NO lo generes exclusivamente mediante JavaScript.

Incluye:

- <title> optimizado y natural.
- meta description.
- canonical con placeholder.
- H1 único.
- introducción de 2-3 frases.
- sección "Cómo se calcula".
- fórmula explicada.
- significado de variables.
- ejemplo práctico.
- tabla de referencia si procede.
- sección "Cómo interpretar el resultado".
- sección "Cuándo esta calculadora no es suficiente".
- fuentes y fecha de revisión.
- 5-7 FAQs útiles.
- enlaces contextuales a las calculadoras relacionadas.

No escribas texto SEO de relleno.
No repitas keywords artificialmente.

==================================================
E-E-A-T / TRANSPARENCIA
==================================================

Incluye claramente:

- versión de metodología;
- fecha de última revisión;
- fuente de cada dato regulado;
- hipótesis;
- limitaciones;
- advertencia de que se trata de una estimación cuando corresponda.

Nunca:
- inventes autor;
- inventes credenciales profesionales;
- inventes estudios;
- inventes estadísticas;
- inventes reseñas;
- inventes valoraciones.

==================================================
DATOS ESTRUCTURADOS
==================================================

Genera JSON-LD válido utilizando, cuando sea apropiado:

@type:
["SoftwareApplication", "WebApplication"]

Incluye únicamente información verdadera:
- name
- description
- url
- applicationCategory
- operatingSystem
- browserRequirements
- isAccessibleForFree
- offers con precio 0 EUR si procede
- dateModified
- author/organization como PLACEHOLDER

Genera también:
- BreadcrumbList.

Si incluyes FAQPage:
- todas las preguntas y respuestas deben ser visibles en la página;
- no inventes FAQ solo para SEO.

No generes AggregateRating ni Review.

==================================================
ADSENSE / PUBLICIDAD
==================================================

Diseña la página para AdSense, pero NO insertes un publisher ID ficticio.

Incluye únicamente placeholders como:

<div class="ad-slot" data-ad-position="after-result"></div>

Ubicaciones permitidas en esta plantilla:

1. DESPUÉS del bloque completo de resultados.
2. DESPUÉS de metodología/tablas.
3. Opcionalmente al final de contenido si la página es suficientemente larga.

PROHIBIDO:
- anuncios dentro del formulario;
- anuncio inmediatamente encima/debajo del botón "Calcular";
- anuncio entre "Calcular" y su resultado;
- anuncios que parezcan botones de la calculadora;
- anuncios mezclados visualmente con los resultados.

Deja suficiente separación visual entre controles interactivos y ad-slots.

Reserva espacio razonable para evitar layout shifts.

==================================================
PERFORMANCE
==================================================

Prioriza Core Web Vitals.

- JavaScript mínimo.
- Sin frameworks.
- Sin imágenes innecesarias.
- Sin animaciones pesadas.
- Sin CSS inline masivo.
- Sin scripts bloqueantes.
- Sin fuentes externas si no son necesarias.
- No uses Tailwind CDN en producción.

Asume que Tailwind está compilado y disponible como CSS del sitio.

==================================================
SEGURIDAD
==================================================

- No utilices eval().
- No uses innerHTML con contenido introducido por el usuario.
- Escapa/sanitiza cualquier texto dinámico cuando proceda.
- No confíes únicamente en atributos HTML para validar datos:
  valida también en JavaScript.
- Si existe llamada a una API externa, incluye:
  - manejo de errores;
  - timeout razonable;
  - estado de carga;
  - fallback claramente identificado.

==================================================
TESTS
==================================================

Antes de entregar, crea al menos 8 casos de prueba:

1. caso normal;
2. mínimo razonable;
3. máximo razonable;
4. cero;
5. negativo;
6. campo vacío;
7. decimal con coma;
8. un caso conocido calculado manualmente.

Muestra los resultados esperados.

Si la fórmula tiene diferentes ramas, añade tests para cada rama.

==================================================
FORMATO DE ENTREGA
==================================================

Entrégame exactamente:

1. Breve explicación de la arquitectura.
2. Código HTML5 completo.
3. Código JavaScript completo.
4. Cualquier CSS/Tailwind especial necesario.
5. JSON-LD.
6. Casos de prueba con resultado esperado.
7. Lista de constantes utilizadas con fuente/hipótesis.
8. Checklist final de QA.

Todo el código debe estar COMPLETO.
No uses pseudocódigo.
No escribas "// aquí va la lógica".
No omitas partes por brevedad.
Debe ser posible copiarlo directamente al proyecto y probarlo.

Antes de entregar, revisa mentalmente:
- fórmulas;
- unidades;
- conversiones;
- casos límite;
- accesibilidad;
- responsive 360 px;
- errores de JavaScript;
- contenido SEO;
- zonas AdSense;
- datos estructurados.

Si detectas que mi fórmula o mis premisas son técnicamente incorrectas,
NO las implementes ciegamente:
explícame el problema y proporciona la alternativa correcta.
```
