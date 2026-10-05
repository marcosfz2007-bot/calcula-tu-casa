---
title: "Estrategia operativa, técnica y SEO — Multicalculadora Hogar, Energía, Reformas y Ahorro"
description: "Plan de ejecución para desarrollar y monetizar con Google AdSense una web española de herramientas interactivas para el hogar."
version: "1.0"
date: "2026-10-05"
market: "España"
stack: "Astro + Tailwind CSS + JavaScript Vanilla + Cloudflare Pages"
monetization: "Google AdSense"
---

# Estrategia operativa, técnica y SEO
## Proyecto multicalculadora: Hogar + Energía + Reformas + Ahorro

**Versión:** 1.0  
**Fecha:** 5 de octubre de 2026  
**Mercado principal:** España  
**Modelo de negocio inicial:** SEO orgánico + Google AdSense  
**Arquitectura técnica recomendada:** Astro + Tailwind compilado + JavaScript vanilla + Cloudflare Pages

---

# 0. Principios estratégicos del proyecto

El proyecto no se plantea como un blog tradicional ni como una fábrica de artículos generados mediante inteligencia artificial.

La propuesta es construir un sitio web especializado cuyo producto principal sean **herramientas y calculadoras útiles**, apoyadas por contenido técnico que explique:

- qué se está calculando;
- qué fórmulas se utilizan;
- qué datos se emplean;
- de dónde proceden esos datos;
- qué limitaciones tiene el cálculo;
- cómo interpretar el resultado;
- qué decisión práctica puede tomar el usuario después.

La estrategia se basa en seis principios.

### 1. Herramienta antes que artículo

El usuario que busca:

> calculadora frigorías 30 m²

debe poder empezar a calcular prácticamente inmediatamente.

La herramienta aparece antes que un artículo SEO largo.

---

### 2. Resultado inmediato

Nunca será obligatorio:

- registrarse;
- facilitar email;
- introducir un teléfono;
- solicitar presupuesto;
- crear una cuenta.

El resultado debe aparecer inmediatamente en pantalla.

---

### 3. Transparencia matemática

Cada calculadora debe permitir conocer:

- fórmula;
- variables;
- coeficientes;
- hipótesis;
- fuente;
- fecha de actualización.

Siempre que resulte razonable se incluirá:

> Ver cómo se calcula

---

### 4. Privacidad por diseño

Siempre que sea técnicamente posible:

> Los cálculos se realizan localmente en el navegador.

Los valores introducidos por el usuario no necesitan almacenarse ni enviarse al servidor.

---

### 5. Un ecosistema, no calculadoras aisladas

Cada cálculo debe conducir naturalmente a otro.

Ejemplo:

```text
Calculadora de frigorías
        ↓
Consumo del aire acondicionado
        ↓
Potencia eléctrica necesaria
        ↓
Simulador de factura eléctrica
        ↓
Autoconsumo fotovoltaico
```

El verdadero objetivo no es conseguir solamente tráfico.

El objetivo es aumentar:

- páginas por sesión;
- tiempo útil en el sitio;
- retorno del usuario;
- impresiones publicitarias por sesión;
- autoridad temática.

---

### 6. E-E-A-T mediante metodología, no mediante aparentar credenciales

Nunca se inventarán:

- expertos;
- ingenieros;
- autores;
- certificaciones;
- revisores;
- estudios;
- reseñas;
- testimonios.

La confianza se construirá mediante:

- fórmulas transparentes;
- fuentes primarias;
- fechas de revisión;
- metodología;
- historial de cambios;
- limitaciones claramente explicadas;
- capacidad de comunicar errores.

---

# 1. Roadmap priorizado de las primeras 20 calculadoras

La estrategia se divide en tres fases.

- **Fase 1 — Quick Wins:** herramientas relativamente sencillas que permiten lanzar rápidamente el proyecto.
- **Fase 2 — Alto tráfico:** herramientas con mayor demanda potencial.
- **Fase 3 — Alto valor comercial:** herramientas vinculadas a servicios donde existe elevada inversión publicitaria.

No debe interpretarse “Quick Win” como garantía de baja competencia.

La dificultad SEO concreta debe validarse antes de desarrollar cada página mediante:

- Google Keyword Planner;
- Search Console una vez exista tráfico;
- análisis manual de SERP;
- Google Trends;
- herramientas SEO si se dispone de ellas;
- análisis de intención de búsqueda;
- calidad de los diez primeros resultados.

---

# 1.1. Fase 1 — Quick Wins

## Calculadora 1 — Punto de rocío, condensación y riesgo de moho

### Intenciones principales

- calculadora punto de rocío;
- por qué tengo condensación;
- humedad condensación ventanas;
- riesgo de moho;
- temperatura pared condensación.

### Inputs

- temperatura interior en °C;
- humedad relativa en %;
- temperatura superficial de pared o ventana en °C;
- opcionalmente temperatura exterior;
- opcionalmente tipo de superficie.

### Fórmula base

Puede utilizarse una aproximación de Magnus:

```text
γ = ln(HR / 100) + (a × T) / (b + T)

Td = (b × γ) / (a - γ)
```

donde:

```text
T  = temperatura del aire
HR = humedad relativa
Td = punto de rocío
```

Los coeficientes utilizados deben estar documentados.

### Resultado

Mostrar:

- punto de rocío;
- margen entre superficie y punto de rocío;
- riesgo bajo / moderado / alto;
- explicación del resultado.

Ejemplo:

```text
Punto de rocío: 13,2 °C
Temperatura de la pared: 12,5 °C

Existe riesgo de condensación superficial.
```

### Interlinking

- aislamiento térmico;
- ventilación;
- calefacción;
- deshumidificación.

---

## Calculadora 2 — Aislamiento térmico: resistencia R, transmitancia U y espesor

### Intenciones

- calcular aislamiento;
- espesor aislamiento necesario;
- calcular transmitancia térmica;
- valor U pared;
- resistencia térmica aislante.

### Inputs

- material aislante;
- conductividad térmica λ;
- espesor;
- composición de capas;
- valor U objetivo;
- opcionalmente resistencias superficiales.

### Fórmulas

```text
R = d / λ
```

donde:

```text
R = resistencia térmica
d = espesor en metros
λ = conductividad térmica W/(m·K)
```

Para varias capas:

```text
Rtotal = Rsi + ΣRi + Rse
```

Transmitancia:

```text
U = 1 / Rtotal
```

Para determinar espesor objetivo se despeja `d`.

### Resultado

Mostrar:

- R de cada capa;
- R total;
- U estimada;
- espesor requerido para alcanzar un objetivo;
- comparación antes/después.

### Interlinking

- condensación;
- ahorro por aislamiento;
- SATE;
- calefacción;
- climatización.

---

## Calculadora 3 — Metros de tubo y circuitos de suelo radiante

### Intenciones

- metros tubo suelo radiante;
- calcular circuitos suelo radiante;
- separación tubos suelo radiante;
- metros de PEX por m².

### Inputs

- superficie útil;
- separación entre tubos;
- longitud de conexión al colector;
- longitud máxima admitida del circuito;
- porcentaje de superficie no calefactable;
- margen.

### Lógica aproximada

```text
Longitud base ≈ Área útil / separación
```

ajustando unidades.

Después:

```text
Longitud total =
longitud base
+ conexiones
+ margen
```

Circuitos:

```text
nº circuitos = ceil(longitud_total / longitud_máxima)
```

### Resultado

- metros aproximados de tubo;
- número mínimo de circuitos;
- metros por circuito;
- superficie cubierta por circuito;
- advertencias.

### Interlinking

- potencia calefacción;
- aerotermia;
- comparación sistemas de calefacción.

---

## Calculadora 4 — Tamaño de termo eléctrico y tiempo de calentamiento

### Intenciones

- termo para 2 personas;
- termo para 4 personas;
- cuánto tarda termo 100 litros;
- calcular tamaño termo eléctrico;
- consumo termo eléctrico.

### Inputs

- personas;
- duchas diarias;
- litros por ducha;
- temperatura del agua fría;
- temperatura del termo;
- potencia de la resistencia;
- volumen del termo.

### Fórmula energética

```text
E(kWh) = V × 0,001163 × ΔT
```

donde:

```text
V = litros
ΔT = diferencia de temperatura
```

Tiempo:

```text
horas = E / P
```

### Resultado

- volumen recomendado;
- energía necesaria;
- tiempo de calentamiento;
- coste aproximado;
- litros útiles mezclados.

### Interlinking

- consumo eléctrico;
- potencia contratada;
- factura eléctrica.

---

## Calculadora 5 — Consumo y coste de aire acondicionado

### Intenciones

- cuánto consume aire acondicionado;
- consumo aire acondicionado 8 horas;
- cuánto cuesta poner el aire acondicionado;
- consumo AC al mes.

### Inputs

- potencia eléctrica real del equipo;
- horas por día;
- días al mes;
- precio €/kWh;
- factor de utilización del compresor;
- número de equipos.

### Fórmula

```text
Consumo mensual =
Potencia eléctrica (kW)
× horas/día
× días
× factor de utilización
× número de equipos
```

Coste:

```text
Coste = kWh × precio €/kWh
```

### Resultado

- €/hora;
- €/día;
- €/mes;
- kWh mensuales;
- kWh anuales;
- escenarios de uso.

### Interlinking

Esta debe ser una de las primeras calculadoras porque enlaza perfectamente con:

```text
Frigorías
   ↓
Consumo aire acondicionado
   ↓
Potencia contratada
   ↓
Factura eléctrica
```

---

## Calculadora 6 — Consumo de radiador o calefactor eléctrico

### Intenciones

- cuánto gasta radiador 1500 W;
- coste calefactor por hora;
- cuánto cuesta calefacción eléctrica;
- consumo radiador eléctrico.

### Inputs

- potencia W;
- unidades;
- horas/día;
- días/mes;
- factor de termostato;
- precio electricidad.

### Fórmula

```text
kWh =
(W / 1000)
× horas
× días
× factor
× nº unidades
```

Coste:

```text
Coste = kWh × €/kWh
```

### Resultado

- €/hora;
- €/día;
- €/mes;
- consumo anual.

### Interlinking

- potencia eléctrica;
- factura;
- comparador calefacción;
- aerotermia.

---

## Calculadora 7 — Ventilación mínima de vivienda

### Intenciones

- ventilación mínima vivienda;
- cálculo ventilación CTE;
- caudal ventilación vivienda;
- ventilación cocina baño dormitorio.

### Inputs

Dependiendo de la metodología vigente:

- dormitorios;
- ocupación;
- baños;
- aseos;
- cocina;
- superficie;
- tipo de estancia.

### Lógica

No deben escribirse valores regulados dispersos directamente en JavaScript.

Debe existir un fichero versionado, por ejemplo:

```json
{
  "standard": "CTE DB-HS",
  "version": "...",
  "checkedAt": "2026-10-05",
  "source": "...",
  "values": {}
}
```

El motor aplica las reglas correspondientes a la versión normativa vigente.

### Resultado

- caudal mínimo por estancia;
- extracción;
- admisión;
- caudal total;
- explicación.

### Advertencia

Debe indicarse que una herramienta orientativa no sustituye proyecto, memoria o comprobación técnica exigible.

---

# 1.2. Fase 2 — Alto tráfico e interés

## Calculadora 8 — Frigorías y potencia del aire acondicionado

### Intenciones

- calculadora frigorías;
- frigorías por m²;
- aire acondicionado para 30 m²;
- potencia aire acondicionado;
- cuántos BTU necesito.

### Inputs

- superficie;
- altura;
- provincia o zona climática;
- orientación;
- aislamiento;
- ventanas;
- superficie acristalada;
- número de personas;
- cargas internas;
- planta/cubierta si resulta relevante.

### Lógica

No utilizar exclusivamente la regla simplista:

```text
100 frigorías por m²
```

La herramienta debe partir de:

```text
Volumen = superficie × altura
```

y aplicar factores de corrección por:

- clima;
- exposición solar;
- aislamiento;
- orientación;
- superficie acristalada;
- ocupación;
- cargas térmicas internas.

Conversión aproximada:

```text
1 frigoría/h ≈ 1,163 W
```

### Resultados

Mostrar simultáneamente:

- W térmicos;
- kW;
- frigorías/h;
- BTU/h.

Y un rango:

```text
Recomendación aproximada:
3,1–3,6 kW

Escenario central:
3,4 kW
```

### Interlinking

CTA prioritario:

> Calcula cuánto te costaría utilizar un equipo de esta potencia.

---

## Calculadora 9 — Potencia eléctrica que necesito contratar

### Intenciones

- qué potencia contratar;
- calcular potencia eléctrica;
- potencia contratada vivienda;
- necesito 3,45 o 4,6 kW.

### Inputs

- electrodomésticos;
- potencia individual;
- climatización;
- calefacción;
- vitro;
- horno;
- termo;
- lavadora;
- secadora;
- lavavajillas;
- cargador EV;
- simultaneidad.

### Lógica

Evitar:

```text
Potencia contratada = suma de todo
```

porque los equipos no suelen funcionar simultáneamente.

Modelo:

```text
Pescenario = Σ(Pi × fi)
```

donde:

```text
Pi = potencia nominal
fi = factor de simultaneidad
```

Se pueden crear tres escenarios:

- uso conservador;
- uso habitual;
- uso intensivo.

### Resultado

- pico probable;
- potencia mínima;
- potencia recomendada;
- margen;
- principales aparatos responsables.

### Interlinking

- factura eléctrica;
- electrodomésticos;
- aire acondicionado;
- coche eléctrico.

---

## Calculadora 10 — Consumo eléctrico de electrodomésticos

### Intenciones

- cuánto consume mi casa;
- consumo electrodomésticos;
- qué aparato consume más;
- consumo mensual electricidad.

### Inputs

Lista seleccionable de aparatos:

- frigorífico;
- horno;
- vitro;
- televisión;
- lavadora;
- secadora;
- lavavajillas;
- termo;
- aire acondicionado;
- calefacción;
- ordenador;
- etc.

Para cada uno:

- W;
- horas/día;

o:

- kWh/ciclo;
- ciclos/semana.

### Fórmula

Por aparato:

```text
Consumo = potencia × utilización
```

Para equipos por ciclo:

```text
Consumo mensual =
kWh/ciclo × ciclos/mes
```

### Resultado

- kWh por equipo;
- porcentaje del total;
- ranking;
- consumo mensual;
- consumo anual;
- coste.

### Interlinking

- factura;
- potencia;
- placas solares.

---

## Calculadora 11 — Simulador completo de factura eléctrica

### Intenciones

- calcular factura luz;
- simulador factura eléctrica;
- cuánto voy a pagar de luz;
- calcular factura PVPC.

### Inputs

- consumo por periodos si procede;
- potencia contratada;
- precios energía;
- precios potencia;
- alquiler contador;
- impuestos;
- IVA;
- otros elementos regulados.

### Fórmula conceptual

```text
Factura =
Término de potencia
+ Término de energía
+ alquiler
+ impuestos
+ IVA
```

### Requisito crítico

Todos los parámetros regulados deben estar fuera del código de cálculo.

Ejemplo:

```json
{
  "iva": {
    "value": 0,
    "validFrom": "...",
    "checkedAt": "...",
    "source": "..."
  }
}
```

### Resultado

Desglose exacto de cada término.

### Interlinking

- potencia contratada;
- autoconsumo;
- consumo electrodomésticos.

---

## Calculadora 12 — Potencia y elementos de radiador

### Intenciones

- cuántos elementos radiador necesito;
- potencia radiador por habitación;
- calcular radiadores.

### Inputs

- superficie;
- altura;
- ubicación/clima;
- aislamiento;
- orientación;
- uso de estancia;
- temperatura deseada;
- potencia por elemento.

### Lógica

Estimar demanda térmica:

```text
W necesarios = volumen × factor térmico corregido
```

Después:

```text
nº elementos =
ceil(W necesarios / W por elemento corregido)
```

### Resultado

- W;
- elementos;
- potencia instalada;
- escenarios.

---

## Calculadora 13 — Número de placas solares necesarias

### Intenciones

- cuántas placas solares necesito;
- placas solares para 5000 kWh;
- calcular instalación fotovoltaica;
- kWp necesarios vivienda.

### Inputs

- consumo anual;
- ubicación;
- orientación;
- inclinación;
- sombras;
- potencia de panel;
- superficie disponible;
- objetivo de cobertura.

### Lógica

Utilizar datos solares fiables.

Preferencia:

**PVGIS — Joint Research Centre de la Comisión Europea.**

Proceso:

```text
Consumo anual
      ↓
Objetivo de producción
      ↓
Producción específica PVGIS (kWh/kWp)
      ↓
kWp necesarios
      ↓
nº paneles
```

Fórmula:

```text
kWp = Producción objetivo / Producción específica
```

Número de paneles:

```text
nº paneles =
ceil(kWp necesarios / potencia_panel_kWp)
```

### Resultado

- paneles;
- kWp;
- superficie aproximada;
- producción anual;
- producción mensual.

---

## Calculadora 14 — Comparador de costes de calefacción

### Intenciones

- calefacción más barata;
- aerotermia vs gas;
- radiadores eléctricos vs gas;
- coste calefacción vivienda.

### Inputs

- demanda térmica anual;
- sistema;
- rendimiento;
- precio gas;
- precio electricidad;
- SCOP;
- pellet si se añade;
- costes fijos opcionales.

### Concepto fundamental

Comparar el **coste de producir la misma cantidad de calor útil**.

Gas:

```text
Energía comprada =
Calor útil / eficiencia
```

Bomba de calor:

```text
Electricidad =
Calor útil / SCOP
```

Coste:

```text
Coste =
energía comprada × precio
```

### Resultado

Tabla comparativa:

| Sistema | Energía comprada | Coste anual | Diferencia |
|---|---:|---:|---:|

---

# 1.3. Fase 3 — Alto CPC y valor comercial

## Calculadora 15 — Presupuesto de reforma integral

### Intenciones

- cuánto cuesta reformar un piso;
- reforma integral 90 m²;
- precio reforma integral;
- calculadora reforma vivienda.

### Inputs

- superficie;
- provincia;
- calidad;
- baños;
- cocina;
- instalaciones;
- redistribución;
- electricidad;
- fontanería;
- climatización;
- ventanas;
- suelos;
- pintura;
- demolición;
- gestión residuos.

### Lógica

Trabajar por partidas:

```text
Total =
demoliciones
+ albañilería
+ electricidad
+ fontanería
+ baños
+ cocina
+ suelo
+ pintura
+ carpintería
+ climatización
+ residuos
+ otros
```

Ajustar mediante factores:

```text
Coste ajustado =
Coste base
× factor geográfico
× factor calidad
```

### Nunca mostrar

> Tu reforma costará exactamente 23.417 €.

### Mostrar

```text
Escenario económico: 20.800 €
Escenario central:   24.100 €
Escenario alto:      27.600 €
```

### Interlinking

- reforma baño;
- reforma cocina;
- ventanas;
- aislamiento;
- climatización.

---

## Calculadora 16 — Reforma de baño

### Inputs

- superficie;
- superficie paredes;
- demolición;
- sanitarios;
- bañera/ducha;
- mampara;
- fontanería;
- electricidad;
- alicatado;
- suelo;
- calidad;
- provincia.

### Resultado

Desglose:

- demolición;
- residuos;
- revestimientos;
- instalaciones;
- sanitarios;
- mobiliario;
- mano de obra.

Mostrar rango bajo/medio/alto.

---

## Calculadora 17 — Reforma de cocina

### Inputs

- m²;
- metros lineales de muebles;
- calidad;
- encimera;
- electrodomésticos;
- fontanería;
- electricidad;
- suelo;
- revestimientos;
- pintura;
- provincia.

### Fórmula

```text
Total =
muebles por metro lineal
+ encimera
+ instalaciones
+ revestimientos
+ electrodomésticos
+ mano de obra
```

Mostrar rango.

---

## Calculadora 18 — Amortización y rentabilidad fotovoltaica

### Intenciones

- amortización placas solares;
- rentabilidad placas;
- años para amortizar solar;
- cuánto ahorro placas solares.

### Inputs

- coste instalación;
- ayudas si existen;
- producción PVGIS;
- consumo;
- autoconsumo;
- excedentes;
- precio electricidad;
- compensación excedentes;
- degradación panel;
- mantenimiento.

### Ahorro anual

```text
Ahorro =
energía autoconsumida × precio evitado
+ excedentes × compensación
- mantenimiento
```

Payback simple:

```text
Payback =
Inversión neta / ahorro anual
```

Puede añadirse:

- inflación energética;
- degradación;
- flujo de caja;
- VAN;
- TIR.

Estos cálculos avanzados deben ser opcionales y claramente explicados.

---

## Calculadora 19 — Rentabilidad de aerotermia

### Intenciones

- amortización aerotermia;
- aerotermia vs gas;
- cuánto ahorro con aerotermia;
- rentabilidad bomba calor.

### Inputs

- demanda térmica;
- consumo actual;
- combustible actual;
- eficiencia actual;
- precio combustible;
- SCOP;
- electricidad;
- inversión;
- mantenimiento;
- ACS.

### Fórmula

Calor útil actual:

```text
Q útil =
energía comprada × rendimiento
```

Con aerotermia:

```text
Electricidad aerotermia =
Q útil / SCOP
```

Ahorro:

```text
Ahorro anual =
Coste actual - coste aerotermia
```

Payback:

```text
Inversión / ahorro anual
```

---

## Calculadora 20 — ¿Qué reforma energética compensa más?

### Objetivo

Comparar:

- SATE;
- fachada;
- cubierta;
- ventanas;
- aislamiento interior;
- combinaciones.

### Inputs

- superficie del cerramiento;
- U inicial;
- U nueva;
- clima;
- grados día;
- sistema calefacción;
- eficiencia;
- coste energía;
- coste obra.

### Estimación térmica simplificada

```text
Ahorro térmico ≈
ΔU × A × HDD × 24 / 1000
```

donde:

```text
ΔU = diferencia de transmitancia
A  = superficie
HDD = grados-día de calefacción
```

Convertir posteriormente el calor ahorrado en energía comprada según sistema.

### Resultado

Tabla:

| Reforma | Inversión | Ahorro anual | Payback |
|---|---:|---:|---:|

### Advertencia

Debe calificarse como estimación simplificada.

No sustituye simulación energética oficial.

---

# 1.4. Backlog posterior

Una vez publicadas las herramientas prioritarias puede ampliarse con:

- pintura necesaria;
- litros de pintura;
- azulejos;
- suelo laminado;
- tarima;
- rodapié;
- papel pintado;
- hormigón;
- mortero;
- ladrillos;
- impermeabilización;
- consumo agua;
- deshumidificador;
- batería fotovoltaica;
- recarga de coche eléctrico;
- acumulador eléctrico;
- bomba de calor;
- ventanas;
- pérdida térmica simplificada;
- tamaño de depósito;
- recuperación inversión ventanas;
- iluminación por lux;
- potencia de LED;
- ahorro sustituyendo bombillas;
- coste de electrodomésticos en standby.

Estas herramientas pueden conseguir long-tail, pero no constituirán inicialmente la diferenciación principal del proyecto.

---

# 2. Análisis de oportunidades y huecos en España

## 2.1. Problema de muchas calculadoras comerciales

Una parte relevante de las herramientas de:

- fotovoltaica;
- aerotermia;
- ventanas;
- reformas;
- presupuestos;

no están diseñadas principalmente como utilidades independientes.

Funcionan como sistemas de captación de leads.

El flujo habitual es:

```text
Introduce tus datos
      ↓
Calculamos una estimación
      ↓
Introduce nombre
      ↓
Email
      ↓
Teléfono
      ↓
Recibe resultado / presupuesto
```

Nuestro modelo debe ser exactamente el contrario:

```text
Introduce variables técnicas
      ↓
CALCULAR
      ↓
Resultado inmediato
      ↓
Metodología
      ↓
Opcional: profundiza con otra herramienta
```

---

# 2.2. Propuesta de valor del producto

Mensaje conceptual:

> **Calcula primero. Decide después. Sin registro, sin llamadas y con la fórmula visible.**

O alternativamente:

> **Decisiones para tu casa basadas en números, no en opiniones.**

Principios visibles:

```text
✓ Resultado inmediato
✓ Sin registro
✓ Sin teléfono
✓ Cálculo privado
✓ Fórmula transparente
✓ Fuentes identificadas
✓ Datos actualizados
```

---

# 2.3. Diferenciadores

## Diferenciador 1 — No pedir datos personales

No pedir teléfono para saber:

- número de placas;
- amortización;
- coste de aerotermia;
- tamaño de aire acondicionado;
- presupuesto aproximado.

---

## Diferenciador 2 — Mostrar rango de incertidumbre

Evitar falsa precisión.

Malo:

```text
Tu reforma costará 24.182,73 €
```

Bueno:

```text
Estimación central: 24.200 €

Rango probable:
21.000–28.000 €
```

---

## Diferenciador 3 — Fórmula visible

Botón:

> Ver cómo se calcula

Mostrar:

- fórmula;
- unidades;
- fuentes;
- supuestos.

---

## Diferenciador 4 — Sensibilidad

Permitir responder:

> ¿Qué ocurre si cambia esta variable?

Ejemplo:

```text
Precio electricidad

-20 %   Actual   +20 %
```

o:

```text
SCOP
2,8   3,5   4,2
```

---

## Diferenciador 5 — Fuentes primarias

Prioridad:

- BOE;
- Código Técnico de la Edificación;
- IDAE;
- CNMC;
- Red Eléctrica;
- PVGIS / JRC;
- ministerios;
- normativa autonómica cuando proceda.

---

## Diferenciador 6 — Fecha de actualización

Ejemplo:

```text
Metodología: v1.3
Última revisión: 5 de octubre de 2026
Datos de electricidad comprobados: 4 de octubre de 2026
```

---

## Diferenciador 7 — Historial de cambios

Crear:

```text
/metodologia/changelog/
```

Ejemplo:

```text
v1.3 — 05/10/2026
Actualizado coeficiente X.

v1.2 — 14/08/2026
Añadido escenario de aislamiento alto.

v1.1 — 02/06/2026
Corrección de conversión W/frigorías.
```

---

## Diferenciador 8 — Privacidad técnica

Cuando todo ocurra localmente:

> Los datos introducidos en esta calculadora se procesan en tu navegador y no se envían a nuestros servidores.

Esto debe ser cierto antes de publicarlo.

---

# 3. Arquitectura visual de cada calculadora: SEO, E-E-A-T y AdSense

Todas las herramientas deben utilizar una plantilla común.

---

# 3.1. `<head>`

Cada página tendrá:

- title único;
- meta description;
- canonical;
- Open Graph;
- favicon;
- structured data;
- idioma;
- viewport;
- CSS compilado;
- scripts no bloqueantes.

Ejemplo:

```html
<title>Calculadora de frigorías: potencia según m², orientación y aislamiento</title>
```

Evitar títulos artificiales:

```text
Calculadora frigorías online gratis 2026 mejor calculador aire acondicionado
```

---

# 3.2. Breadcrumbs

Ejemplo:

```text
Inicio
› Climatización
› Calculadora de frigorías
```

Incluir `BreadcrumbList` en JSON-LD.

---

# 3.3. H1

```text
Calculadora de frigorías para aire acondicionado
```

Debajo:

> Calcula la potencia aproximada de aire acondicionado teniendo en cuenta superficie, altura, orientación, aislamiento, ventanas y clima. Resultado inmediato y sin registro.

---

# 3.4. Señales de confianza

Bloque discreto:

```text
Gratis · Sin registro · Cálculo local · Metodología visible

Última revisión: 05/10/2026
Metodología: v1.2
Fuentes: IDAE / CTE / ...
```

---

# 3.5. La calculadora debe aparecer muy arriba

Ejemplo:

```text
┌────────────────────────────────┐
│ Superficie              30 m²  │
│ Altura                 2,50 m  │
│ Provincia       Guadalajara ▼  │
│ Orientación              Sur ▼ │
│ Aislamiento            Medio ▼ │
│ Ventanas                  5 m² │
│ Personas                    2  │
│                                │
│          CALCULAR              │
└────────────────────────────────┘
```

Requisitos:

- `<label>` para cada input;
- unidades visibles;
- min/max;
- ayuda contextual;
- teclado apropiado;
- errores accesibles;
- mobile-first.

---

# 3.6. Resultado

Debe aparecer inmediatamente después del formulario.

Ejemplo:

```text
Potencia recomendada

3,1–3,6 kW

≈ 2.670–3.100 frigorías/h

Escenario central:
3,4 kW
```

Añadir:

- desglose;
- hipótesis;
- incertidumbre;
- factor que más influye;
- explicación.

---

# 3.7. Primer CTA interno

Antes del contenido largo:

> **¿Quieres saber cuánto costaría utilizar un equipo de esta potencia 6 horas al día?**

Botón:

```text
Calcular consumo del aire acondicionado →
```

Puede pasar parámetros:

```text
/consumo-aire-acondicionado/?potencia=3.4
```

pero la canonical será:

```text
/consumo-aire-acondicionado/
```

---

# 3.8. Primer anuncio

Solo después de:

- formulario;
- botón;
- resultado;
- CTA útil.

Nunca:

```text
[ CALCULAR ]
[ ANUNCIO ]
resultado
```

---

# 3.9. Sección "Cómo se calcula"

Debe explicar:

- fórmula;
- variables;
- unidades;
- coeficientes;
- supuestos;
- simplificaciones.

Ejemplo:

```text
Volumen = superficie × altura

Carga base = volumen × coeficiente térmico

Carga corregida =
carga base
× orientación
× aislamiento
× clima
+ cargas internas
```

---

# 3.10. Ejemplo práctico

Ejemplo:

```text
Habitación:
30 m²

Altura:
2,50 m

Orientación:
Sur

Aislamiento:
Medio

Resultado aproximado:
...
```

Esto ayuda a:

- usuarios;
- SEO;
- entendimiento;
- validación.

---

# 3.11. Tabla de referencia

Ejemplo:

| Variable | Escenario | Efecto |
|---|---|---|
| Aislamiento | Bueno | Menor demanda |
| Aislamiento | Medio | Demanda estándar |
| Aislamiento | Malo | Mayor demanda |
| Orientación | Norte | Menor ganancia solar |
| Orientación | Sur | Mayor ganancia solar |

Todas las tablas relevantes deben identificar:

- fuente;
- metodología;
- fecha.

---

# 3.12. Segundo anuncio

Después de:

- metodología;
- fórmula;
- ejemplo;
- tabla.

Nunca debe interrumpir una interacción.

---

# 3.13. Cómo interpretar el resultado

Ejemplo:

> Si la herramienta estima 2,9 kW, probablemente debas comparar equipos comerciales próximos a 3,0–3,5 kW.

> Si el resultado está en el límite entre dos tamaños y existen grandes ventanales, orientación desfavorable o aislamiento deficiente, conviene estudiar el escenario superior.

---

# 3.14. Limitaciones

Sección obligatoria:

## Cuándo esta calculadora no es suficiente

Ejemplo:

> Esta herramienta proporciona una estimación orientativa y no sustituye un cálculo profesional de cargas térmicas, un proyecto técnico, una certificación energética o cualquier comprobación exigida legalmente.

La limitación aumenta la confianza.

No la reduce.

---

# 3.15. Fuentes

Entre 2 y 5 fuentes principales siempre que sea posible.

Ejemplo:

```text
Fuentes consultadas

• Código Técnico de la Edificación
• IDAE
• Comisión Nacional de los Mercados y la Competencia
```

Mostrar:

```text
Última comprobación:
05/10/2026
```

---

# 3.16. Herramientas relacionadas

No usar:

> Quizá también te interese...

de manera genérica.

Usar lógica contextual:

> Con la potencia que acabamos de calcular, ahora puedes estimar cuánto consumirá el equipo.

Herramientas:

1. consumo aire acondicionado;
2. potencia contratada;
3. factura eléctrica.

---

# 3.17. FAQ

Entre 5 y 8 preguntas reales.

Ejemplo:

```text
¿Cuántas frigorías necesito para 30 m²?

¿Qué diferencia hay entre kW y frigorías?

¿Influye la orientación?

¿Necesito más potencia si tengo grandes ventanales?

¿Es mejor sobredimensionar un aire acondicionado?

¿La altura del techo cambia el cálculo?
```

No crear 30 FAQs solamente para incluir keywords.

---

# 3.18. `FAQPage`

Se puede incluir `FAQPage` si:

- las preguntas existen realmente;
- las respuestas están visibles;
- el marcado coincide exactamente con el contenido.

No debe asumirse que Google mostrará resultados enriquecidos FAQ para este tipo de sitio.

El Schema es principalmente semántico.

---

# 3.19. Autoría y mantenimiento

Bloque final:

```text
Cómo mantenemos esta herramienta

Metodología:
v1.2

Última revisión:
5 octubre 2026

Fuentes:
[...]

Historial de cambios →

¿Has detectado un error?
Informar →
```

---

# 4. Datos estructurados

## 4.1. WebApplication / SoftwareApplication

Plantilla:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": [
    "SoftwareApplication",
    "WebApplication"
  ],
  "name": "Calculadora de frigorías",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Any",
  "browserRequirements": "HTML5, JavaScript",
  "isAccessibleForFree": true,
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "url": "https://DOMINIO.es/climatizacion/calculadora-frigorias/",
  "description": "Calcula la potencia de aire acondicionado según superficie, orientación, aislamiento y clima.",
  "dateModified": "2026-10-05",
  "author": {
    "@type": "Organization",
    "name": "NOMBRE REAL DEL SITIO"
  }
}
</script>
```

Nunca añadir:

```text
AggregateRating
Review
ratingValue
```

si no existen datos reales que justifiquen esos elementos.

---

# 4.2. BreadcrumbList

Ejemplo:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://DOMINIO.es/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Climatización",
      "item": "https://DOMINIO.es/climatizacion/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Calculadora de frigorías",
      "item": "https://DOMINIO.es/climatizacion/calculadora-frigorias/"
    }
  ]
}
```

---

# 4.3. Validación

Antes de publicar:

- Schema Markup Validator;
- Google Rich Results Test cuando corresponda;
- inspección de URL en Search Console.

---

# 5. Estrategia de AdSense y UX

El objetivo no debe ser:

> maximizar clics publicitarios.

El objetivo económico real debe aproximarse a:

```text
RPM de sesión =
ingresos / sesiones × 1000
```

Un anuncio agresivo puede aumentar temporalmente CTR pero reducir:

- páginas por sesión;
- navegación;
- retorno;
- confianza;
- visibilidad;
- ingresos totales.

---

# 5.1. Layout publicitario recomendado

```text
H1
↓
INTRODUCCIÓN
↓
CALCULADORA
↓
RESULTADO
↓
CTA A OTRA CALCULADORA

[ SEPARACIÓN ]

──────────────
ANUNCIO 1
──────────────

CÓMO SE CALCULA
↓
FÓRMULA
↓
EJEMPLO
↓
TABLA

──────────────
ANUNCIO 2
──────────────

INTERPRETACIÓN
↓
LIMITACIONES
↓
FUENTES
↓
HERRAMIENTAS RELACIONADAS

──────────────
ANUNCIO 3 OPCIONAL
──────────────

FAQ
↓
AUTORÍA
↓
FOOTER
```

---

# 5.2. Zonas prohibidas

Nunca colocar publicidad:

- dentro del formulario;
- entre input y unidad;
- junto a desplegables;
- inmediatamente encima de "Calcular";
- inmediatamente debajo de "Calcular";
- entre el botón y su resultado;
- junto a "Siguiente herramienta";
- disfrazada de tarjeta de resultado;
- con apariencia de botón.

---

# 5.3. Primer formato: Responsive Display

Formato principal para páginas de herramientas.

Ventajas:

- adaptable;
- compatible con móvil;
- integración sencilla;
- menos necesidad de gestionar tamaños manualmente.

---

# 5.4. Auto Ads

Usarlos de manera controlada.

Inicialmente estudiar:

- side rails en escritorio;
- anchor ads;
- emplazamientos automáticos moderados.

No activar todo simultáneamente.

---

# 5.5. Vignette Ads

No los activaría inicialmente.

Motivo:

El modelo necesita que el usuario navegue:

```text
herramienta A
→ herramienta B
→ herramienta C
```

Un interstitial puede añadir fricción justo donde queremos favorecer navegación.

Después se puede realizar un experimento controlado.

---

# 5.6. In-feed

Sí usarlo en páginas de categoría.

Ejemplo:

```text
/calculadoras/energia/
```

Layout:

```text
Potencia eléctrica

Consumo de electrodomésticos

Factura eléctrica

Consumo de aire acondicionado

────────
IN-FEED
────────

Consumo de radiador

Termo eléctrico

Placas solares
```

No usar In-feed dentro del formulario.

---

# 5.7. Multiplex

Candidato para:

- final de páginas largas;
- hubs;
- páginas con muchas herramientas.

No es prioritario durante el lanzamiento.

---

# 5.8. Evitar CLS

Reservar espacio para publicidad cuando sea técnicamente apropiado.

Evitar:

```text
usuario va a pulsar
      ↓
se carga anuncio
      ↓
el botón cambia de posición
      ↓
clic accidental
```

Objetivo:

```text
CLS ≤ 0,1
```

---

# 6. Estrategia de interlinking

El interlinking debe responder a la siguiente pregunta natural del usuario.

---

# 6.1. Flujo climatización

Entrada desde Google:

```text
"calculadora frigorías 30 m²"
```

## Página 1

```text
Calculadora frigorías
```

Resultado:

```text
3,4 kW térmicos
```

CTA:

> ¿Cuánto costaría utilizar un equipo de esta potencia seis horas al día?

↓

## Página 2

```text
Consumo aire acondicionado
```

Prellenar cuando resulte posible.

Resultado:

```text
28 €/mes
```

CTA:

> ¿Tu potencia contratada soportará el aire acondicionado junto con horno, vitro y otros aparatos?

↓

## Página 3

```text
Calculadora de potencia
```

Resultado:

```text
Pico habitual:
4,8 kW
```

CTA:

> Simula cómo afectaría esta potencia a tu factura.

↓

## Página 4

```text
Simulador de factura
```

---

# 6.2. Flujo fotovoltaico

```text
¿Cuántas placas solares necesito?
        ↓
Producción fotovoltaica estimada
        ↓
Ahorro anual
        ↓
Amortización fotovoltaica
        ↓
¿Compensa añadir batería?
```

---

# 6.3. Flujo calefacción

```text
¿Cuántos radiadores necesito?
        ↓
¿Cuánto cuesta calentar mi vivienda?
        ↓
Comparador de sistemas
        ↓
Aerotermia vs sistema actual
        ↓
Amortización aerotermia
        ↓
¿Compensa aislar antes?
```

---

# 6.4. Flujo reforma

```text
Reforma integral
        ↓
Desglose por partidas
        ↓
Reforma de baño
        ↓
Reforma de cocina
        ↓
Rehabilitación energética
        ↓
Aislamiento / ventanas
```

---

# 6.5. Paso de variables entre herramientas

Ejemplo:

```text
/consumo-aire-acondicionado/?potencia=3.4
```

JavaScript lee:

```javascript
const params = new URLSearchParams(window.location.search);
```

y precompleta el valor.

La URL canonical será siempre:

```text
https://dominio.es/consumo-aire-acondicionado/
```

No indexar miles de combinaciones:

```text
?potencia=2.3
?potencia=2.4
?potencia=2.5
...
```

---

# 6.6. Objetivos de navegación

Objetivo inicial:

```text
≥ 2 páginas por sesión
```

Objetivo posterior:

```text
2,5–4 páginas por sesión
```

No intentar conseguirlo artificialmente.

Debe surgir de preguntas naturales.

---

# 7. Stack tecnológico recomendado

## Decisión

```text
Astro
+
Tailwind CSS compilado
+
JavaScript Vanilla
+
Cloudflare Pages
```

---

# 7.1. Por qué no WordPress

WordPress es válido para muchos proyectos.

Pero este proyecto necesita:

- muchísimas herramientas;
- JavaScript personalizado;
- rendimiento máximo;
- estructura repetible;
- control de HTML;
- pocos componentes;
- prácticamente ninguna base de datos.

WordPress introduciría:

- PHP;
- base de datos;
- actualizaciones;
- plugins;
- superficie de seguridad;
- cachés;
- optimizaciones adicionales.

Sin aportar una ventaja decisiva.

---

# 7.2. Por qué Astro

Astro permite:

- generar HTML estático;
- componentes reutilizables;
- escribir páginas rápidamente;
- evitar JavaScript innecesario;
- mantener SEO en el HTML inicial;
- incorporar JS solamente en componentes interactivos.

Ideal para:

```text
100 páginas
+
100 calculadoras
+
una misma plantilla
```

---

# 7.3. Estructura del proyecto

```text
/
├── src/
│   ├── components/
│   │   ├── CalculatorForm.astro
│   │   ├── ResultBox.astro
│   │   ├── AdSlot.astro
│   │   ├── Methodology.astro
│   │   ├── Sources.astro
│   │   ├── RelatedTools.astro
│   │   ├── FAQ.astro
│   │   └── Breadcrumbs.astro
│   │
│   ├── layouts/
│   │   └── CalculatorLayout.astro
│   │
│   ├── pages/
│   │   ├── energia/
│   │   ├── climatizacion/
│   │   ├── solar/
│   │   ├── reformas/
│   │   └── aislamiento/
│   │
│   ├── scripts/
│   │   ├── ac-consumption.js
│   │   ├── dew-point.js
│   │   └── ...
│   │
│   └── data/
│       ├── regulated/
│       │   ├── electricity.json
│       │   ├── taxes.json
│       │   └── cte.json
│       │
│       ├── climate/
│       │   └── ...
│       │
│       └── market/
│           └── renovation-prices.json
│
├── public/
│   ├── ads.txt
│   ├── robots.txt
│   └── ...
│
└── docs/
    └── estrategia-y-prompt-maestro.md
```

---

# 7.4. Datos versionados

Ejemplo:

```json
{
  "electricityTax": {
    "value": 0.00,
    "unit": "ratio",
    "validFrom": "YYYY-MM-DD",
    "checkedAt": "2026-10-05",
    "source": "URL/FUENTE"
  }
}
```

No escribir:

```javascript
const impuesto = 0.0511269632;
```

sin contexto.

---

# 7.5. APIs

No utilizar API si no es necesaria.

Si es necesaria:

```text
Browser
   ↓
Cloudflare Worker
   ↓
Cache
   ↓
API externa
```

Ejemplo:

PVGIS.

El Worker puede:

- evitar CORS;
- validar inputs;
- cachear resultados;
- limitar solicitudes;
- manejar errores.

---

# 7.6. Performance budget

Objetivos propios:

```text
HTML inicial:
< 100 KB comprimido

JS propio por herramienta:
ideal < 15 KB gzip

CSS:
ideal < 30 KB inicial

Librerías JS:
0 salvo necesidad real
```

Evitar:

- React;
- Vue;
- jQuery;
- Chart.js para gráficos triviales;
- sliders pesados;
- fuentes innecesarias;
- animaciones complejas;
- hero images gigantes.

---

# 7.7. Core Web Vitals

Objetivo:

```text
LCP ≤ 2,5 s

INP ≤ 200 ms

CLS ≤ 0,1
```

Medidos en usuarios reales y percentil 75 cuando existan datos suficientes.

No prometer:

> carga total inferior a un segundo

porque:

- CMP;
- AdSense;
- scripts externos;
- conexión;
- dispositivo;

no están completamente bajo nuestro control.

El objetivo sí debe ser que:

> formulario y contenido esencial aparezcan prácticamente de inmediato.

---

# 7.8. Cloudflare Pages

Ventajas para este proyecto:

- CDN;
- despliegue desde Git;
- HTTPS;
- estático;
- rendimiento;
- integración con Workers;
- costes iniciales bajos.

Alternativa válida:

```text
Vercel
```

Pero no necesitamos:

- Next.js;
- SSR complejo;
- infraestructura React.

---

# 8. PROMPT MAESTRO PARA CREAR CUALQUIER CALCULADORA

Guardar también individualmente en:

```text
/docs/calculator-master-prompt.md
```

## PROMPT MAESTRO

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

---

# 9. Checklist técnico y legal para España

# 9.1. CMP para AdSense

Para la primera versión utilizar:

**Google CMP integrada en AdSense**, siempre que siga siendo adecuada a los requisitos vigentes en el momento de lanzamiento.

Ruta habitual:

```text
AdSense
→ Privacy & messaging
→ European regulations
→ Create message
```

La CMP debe:

- estar certificada por Google;
- funcionar con el TCF aplicable;
- permitir consentimiento en el EEE;
- gestionar finalidades y proveedores;
- permitir modificar o revocar elecciones.

---

# 9.2. Diseño del consentimiento

Primera capa recomendada:

```text
┌──────────────────────────────────┐
│ Utilizamos cookies y tecnologías │
│ similares...                     │
│                                  │
│ [Rechazar] [Configurar] [Aceptar]│
└──────────────────────────────────┘
```

Evitar:

```text
[ ACEPTAR TODO ]

Configurar >
  ...
    ...
      Rechazar
```

Aceptar y rechazar deben presentarse con una experiencia coherente con los requisitos legales aplicables.

---

# 9.3. La calculadora debe funcionar sin consentimiento publicitario

Parte esencial:

```text
HTML
CSS
JavaScript propio de la calculadora
```

no debería requerir consentimiento de publicidad.

El usuario debe poder utilizar el producto aunque rechace tecnologías no necesarias.

---

# 9.4. Consent Mode

Si se integran herramientas de Google compatibles:

- `ad_storage`;
- `analytics_storage`;
- `ad_user_data`;
- `ad_personalization`;

configurar Consent Mode correctamente.

Consent Mode no sustituye el consentimiento.

Es un mecanismo complementario.

---

# 9.5. Revocación

El footer debe incluir permanentemente:

```text
Configurar privacidad y cookies
```

El usuario debe poder revisar su elección.

---

# 9.6. Test de consentimiento

Antes del lanzamiento monetizado probar:

## Escenario 1

```text
Primera visita
→ no elegir nada
```

Comprobar qué tecnologías se cargan.

## Escenario 2

```text
Rechazar
→ recargar
```

## Escenario 3

```text
Aceptar
→ recargar
```

## Escenario 4

```text
Configurar preferencias
```

## Escenario 5

```text
Retirar consentimiento
```

## Escenario 6

```text
Navegador móvil
```

Herramientas:

```text
Chrome DevTools
→ Application
→ Cookies
→ Local Storage

Chrome DevTools
→ Network
```

No basta con comprobar visualmente el banner.

---

# 9.7. `ads.txt`

Archivo:

```text
/public/ads.txt
```

Resultado:

```text
https://dominio.es/ads.txt
```

Utilizar exactamente la entrada facilitada por AdSense.

No inventar:

- publisher ID;
- seller ID.

---

# 10. Aviso legal

Ruta:

```text
/aviso-legal/
```

Debe contener, según corresponda:

```text
Titular:
[NOMBRE REAL / EMPRESA]

NIF/CIF:
[...]

Domicilio:
[...]

Correo electrónico:
[...]

Datos registrales:
[si proceden]

Dominio:
[...]

Actividad:
Herramientas y contenidos informativos relacionados con hogar,
energía, reformas, eficiencia energética y ahorro.
```

Además:

- condiciones de uso;
- propiedad intelectual;
- responsabilidad;
- enlaces;
- limitaciones de cálculos;
- legislación aplicable.

---

# 11. Política de privacidad

Ruta:

```text
/privacidad/
```

No afirmar:

> La web no recoge ningún dato personal.

si AdSense, CMP, analítica, servidor u otros proveedores procesan identificadores o datos técnicos.

Sí se puede afirmar, si es técnicamente cierto:

> Los valores introducidos en nuestras calculadoras se procesan localmente en el navegador y no son enviados a nuestros servidores, salvo que la propia herramienta indique expresamente lo contrario.

La política debe distinguir tratamientos.

Ejemplo:

| Tratamiento | Datos | Finalidad |
|---|---|---|
| Calculadoras | Variables técnicas | Cálculo local |
| CMP | Elecciones de privacidad | Gestionar consentimiento |
| Publicidad | Datos técnicos/identificadores según configuración | Mostrar/medir anuncios |
| Analítica | Según herramienta utilizada | Medición |
| Contacto | Email y mensaje | Responder consultas |
| Logs | Datos técnicos | Seguridad/operación |

Informar de:

- responsable;
- finalidad;
- base jurídica;
- destinatarios;
- transferencias cuando procedan;
- conservación;
- derechos;
- contacto;
- autoridad de control.

---

# 12. Política de cookies

Ruta:

```text
/cookies/
```

Debe explicar:

## Qué son las cookies

Explicación sencilla.

## Qué categorías se utilizan

Ejemplo:

| Categoría | Proveedor | Uso | Duración | Base |
|---|---|---|---|---|
| Consentimiento | CMP | Recordar preferencias | Variable | Necesaria para gestión |
| Publicidad | Google / partners | Publicidad | Variable | Consentimiento según finalidad |
| Analítica | Proveedor | Medición | Variable | Según configuración |
| Funcionales | Propias | Funciones | Variable | Según caso |

## Cómo aceptar/rechazar

Explicar el panel.

## Cómo modificar elección

Enlace:

> Cambiar preferencias de privacidad.

## Fecha de revisión

Visible.

---

# 13. Aviso en cada calculadora

Bloque breve:

> **Resultado orientativo.** Esta herramienta realiza una estimación basada en los datos introducidos y en las hipótesis descritas en la metodología. No constituye presupuesto profesional, proyecto técnico, certificación energética ni asesoramiento técnico individualizado.

Adaptar según calculadora.

---

# 14. Páginas de confianza del proyecto

Crear desde el principio:

```text
/sobre-nosotros/

/metodologia/

/fuentes/

/politica-editorial/

/contacto/

/aviso-legal/

/privacidad/

/cookies/
```

Opcional posteriormente:

```text
/correcciones/

/historial-de-cambios/
```

---

# 15. Arquitectura completa del sitio

```text
/
│
├── calculadoras/
│   │
│   ├── energia/
│   ├── climatizacion/
│   ├── solar/
│   ├── aislamiento/
│   └── reformas/
│
├── energia/
│   ├── potencia-electrica/
│   ├── consumo-electrodomesticos/
│   ├── factura-luz/
│   ├── consumo-radiador/
│   └── termo-electrico/
│
├── climatizacion/
│   ├── calculadora-frigorias/
│   ├── consumo-aire-acondicionado/
│   ├── radiadores/
│   └── ...
│
├── aislamiento/
│   ├── transmitancia-termica/
│   ├── condensacion-punto-rocio/
│   └── reforma-energetica/
│
├── solar/
│   ├── cuantas-placas-solares/
│   ├── produccion-fotovoltaica/
│   └── amortizacion-placas-solares/
│
├── reformas/
│   ├── reforma-integral/
│   ├── reforma-bano/
│   ├── reforma-cocina/
│   └── ...
│
├── sobre-nosotros/
├── metodologia/
├── fuentes/
├── politica-editorial/
├── contacto/
├── aviso-legal/
├── privacidad/
├── cookies/
│
├── robots.txt
├── sitemap-index.xml
└── ads.txt
```

---

# 16. SEO técnico

## URLs

Usar:

```text
/calculadora-frigorias/
```

o estructura temática:

```text
/climatizacion/calculadora-frigorias/
```

Elegir una estrategia y mantenerla.

No crear:

```text
/calculadora-frigorias-2026-gratis-online-mejor/
```

---

## Canonicals

Todas las calculadoras deben tener canonical absoluta.

Los parámetros no deben producir nuevas URLs indexables.

---

## Sitemap

Generar automáticamente.

Separación futura si el proyecto crece:

```text
sitemap-pages.xml
sitemap-tools.xml
sitemap-content.xml
```

No es imprescindible inicialmente.

---

## Robots

No bloquear:

- CSS;
- JS necesario;
- assets requeridos para renderizado.

---

## Search Console

Desde el lanzamiento:

- verificar dominio;
- enviar sitemap;
- inspeccionar páginas;
- revisar indexación;
- Core Web Vitals;
- enhancements;
- enlaces;
- consultas.

---

# 17. Metodología SEO para priorizar nuevas herramientas

Antes de desarrollar cada calculadora analizar:

### 1. Intención

¿El usuario quiere:

- saber;
- calcular;
- comparar;
- comprar;
- presupuestar?

Priorizar:

```text
calcular
comparar
simular
estimar
cuánto necesito
cuánto gasto
qué potencia
cuántos
```

---

### 2. Qué muestra Google

Analizar:

- AI Overview;
- featured snippet;
- calculadora integrada;
- páginas comerciales;
- foros;
- vídeos;
- webs débiles;
- herramientas interactivas.

---

### 3. ¿Puede Google responderlo con una línea?

Malo para nosotros:

> ¿Cuántos vatios son 2 kW?

Google responde directamente.

Mejor:

> ¿Qué potencia necesito para climatizar una habitación de 43 m², orientación oeste, techo de 2,8 m y aislamiento malo?

Necesita interacción.

---

### 4. Número de inputs útiles

Ideal:

```text
3–10 variables
```

Suficiente para que la herramienta aporte valor sin convertirse en un formulario interminable.

---

### 5. Siguiente pregunta natural

Antes de construir una herramienta hay que responder:

> ¿Qué calculará el usuario después?

Si no existe siguiente paso, el valor estratégico es menor.

---

# 18. Métricas

No medir solamente visitas.

## SEO

- impresiones;
- clics;
- CTR;
- posición;
- queries;
- páginas indexadas.

## Producto

- porcentaje que utiliza la calculadora;
- cálculos por visita;
- clics en siguiente herramienta;
- errores;
- abandonos.

## Navegación

- páginas/sesión;
- engagement;
- herramienta de entrada;
- segunda herramienta;
- rutas.

## AdSense

- RPM de página;
- RPM de sesión;
- impresiones;
- viewability;
- CTR con cautela;
- ingresos por categoría.

## Rendimiento

- LCP;
- INP;
- CLS;
- JS enviado;
- peso total.

---

# 19. Quality Gate antes de solicitar AdSense

Esto es una norma interna del proyecto, no una cifra oficial exigida por Google.

No solicitar monetización con:

```text
1 calculadora
+ 2 páginas vacías
```

Objetivo propio antes de solicitar AdSense:

```text
8–12 calculadoras completas
+
3 hubs de categoría
+
Sobre nosotros
+
Metodología
+
Fuentes
+
Contacto
+
Aviso legal
+
Privacidad
+
Cookies
+
Navegación completa
+
sitio móvil probado
```

---

# 20. Orden de ejecución

## Sprint 0 — Infraestructura

Crear:

```text
GitHub
Astro
Tailwind
Cloudflare Pages
estructura
layout
componentes
SEO base
```

Componentes:

```text
CalculatorLayout
CalculatorForm
ResultBox
Methodology
Sources
RelatedTools
AdSlot
FAQ
Breadcrumbs
```

---

## Sprint 1 — Validación de arquitectura

Construir primero:

### Calculadora 5

```text
Consumo aire acondicionado
```

Después:

### Calculadora 6

```text
Consumo radiador eléctrico
```

La matemática sencilla permite concentrarse en:

- diseño;
- responsive;
- accesibilidad;
- arquitectura;
- SEO;
- deploy;
- testing;
- metodología.

---

## Sprint 2 — Primer clúster Quick Win

Construir:

```text
Termo eléctrico
Condensación
Aislamiento
Suelo radiante
```

---

## Sprint 3 — Clúster climatización

Construir:

```text
Frigorías
Potencia eléctrica
```

Flujo completo:

```text
Google
 ↓
Frigorías
 ↓
Consumo AC
 ↓
Potencia
```

Este debe ser el primer embudo SEO importante.

---

## Sprint 4 — Energía

Construir:

```text
Electrodomésticos
Factura
Placas solares
Comparador calefacción
```

---

## Sprint 5 — Solar

Completar:

```text
Número de placas
Amortización
```

Posible fase posterior:

```text
Baterías
```

---

## Sprint 6 — Alto valor comercial

Construir:

```text
Reforma integral
Baño
Cocina
Aerotermia
Rehabilitación energética
```

---

# 21. Lo que NO debemos hacer

No crear varios dominios al principio.

No publicar miles de artículos escritos por IA.

No crear cientos de páginas:

```text
calculadora Madrid
calculadora Barcelona
calculadora Valencia
calculadora Guadalajara
...
```

cambiando únicamente la ciudad.

No crear páginas vacías alrededor de una fórmula de cinco líneas.

No publicar calculadoras sin metodología.

No inventar fuentes.

No inventar expertos.

No inventar valores de mercado.

No utilizar fórmulas no comprobadas.

No introducir parámetros normativos dispersos en JavaScript.

No poner anuncios encima del botón "Calcular".

No poner publicidad entre el botón y el resultado.

No pedir email para ver un resultado.

No pedir teléfono para calcular.

No instalar un framework JS pesado sin necesidad.

No utilizar Tailwind CDN en producción.

No utilizar React para operaciones simples.

No utilizar WordPress por defecto únicamente porque sea conocido.

No solicitar AdSense con un sitio inacabado.

No medir el éxito únicamente por número de artículos.

---

# 22. Posicionamiento de marca

No presentar el producto como:

> Una página de calculadoras online.

Posicionamiento recomendado:

> **Herramientas para tomar decisiones sobre tu casa con números, no con opiniones.**

Territorios coherentes:

```text
Hogar
+
Energía
+
Climatización
+
Aislamiento
+
Autoconsumo
+
Reformas
+
Ahorro
```

Todo responde a una misma necesidad:

> **¿Cuánto necesito, cuánto gasto, cuánto cuesta y cuánto puedo ahorrar en mi vivienda?**

---

# 23. Criterios para elegir nombre de marca

El dominio debe ser:

- corto;
- pronunciable;
- fácil de escribir;
- sin guiones;
- preferentemente `.es` o `.com`;
- no excesivamente SEO;
- suficientemente amplio para crecer.

Evitar nombres limitantes como:

```text
calculadoradefrigorias.es
```

porque impedirían una marca transversal.

Preferible un concepto que pueda abarcar:

```text
energía
reformas
costes
consumo
vivienda
```

---

# 24. Modelo económico a largo plazo

AdSense puede ser el primer modelo.

No tiene por qué ser el único.

Posibles fuentes futuras:

```text
AdSense
+
afiliación
+
comparadores
+
leads opcionales
+
patrocinios
+
herramientas premium
+
API
+
licencias B2B
```

Importante:

Los resultados gratuitos nunca deben convertirse en una excusa para obligar al usuario a ceder sus datos.

Si en el futuro existe captación de presupuestos:

```text
calcular
   ↓
obtener resultado completo
   ↓
OPCIONAL:
"¿Quieres recibir presupuestos?"
```

Nunca:

```text
calcular
   ↓
introduce teléfono
   ↓
resultado
```

---

# 25. Definición del producto mínimo viable

## MVP

No necesitamos 20 calculadoras para lanzar técnicamente.

MVP funcional:

```text
1. Consumo aire acondicionado
2. Consumo radiador
3. Termo eléctrico
4. Punto de rocío
5. Aislamiento
6. Frigorías
7. Potencia contratada
8. Electrodomésticos
```

Más:

```text
Home
Hubs
Sobre nosotros
Metodología
Fuentes
Contacto
Legales
```

Después:

```text
Search Console
medición
datos reales
iteración
```

---

# 26. Objetivo de la primera etapa

No es:

> ganar 1.000 € el primer mes.

Es:

```text
1. Google indexa correctamente.
2. Aparecen impresiones.
3. Descubrimos queries reales.
4. Detectamos qué herramientas crecen.
5. Construimos herramientas alrededor de esas queries.
6. Conseguimos sesiones multipágina.
7. Monetizamos el patrón que funciona.
```

Search Console debe convertirse en la principal fuente de ideas.

Ejemplo:

Creamos:

```text
Calculadora frigorías
```

y Search Console empieza a mostrar:

```text
frigorías habitación abuhardillada
frigorías orientación oeste
frigorías salón grandes ventanales
aire acondicionado techo 3 metros
```

Eso nos indica qué mejorar.

No necesitamos adivinar siempre los siguientes contenidos.

Los usuarios nos los mostrarán.

---

# 27. Regla editorial fundamental

Antes de publicar una herramienta debemos poder responder afirmativamente a estas preguntas:

```text
¿Resuelve un problema real?

¿Hace algo que una respuesta de dos líneas de Google no puede hacer igual?

¿El cálculo está matemáticamente justificado?

¿Las fuentes están identificadas?

¿Las hipótesis están visibles?

¿La herramienta funciona perfectamente en móvil?

¿El usuario obtiene el resultado sin registrarse?

¿Existe una siguiente herramienta útil?

¿El contenido aporta algo además de keywords?

¿Podemos mantenerla actualizada?
```

Si varias respuestas son "no":

> no publicar todavía.

---

# 28. Fuentes primarias que deberían formar la biblioteca del proyecto

Crear internamente una biblioteca de referencias.

## Energía

- CNMC.
- Red Eléctrica.
- BOE.
- IDAE.
- Ministerio competente.

## Edificación

- Código Técnico de la Edificación.
- documentos reconocidos;
- reglamentos de instalaciones.

## Solar

- PVGIS / Joint Research Centre.
- IDAE.

## Normativa

- BOE.
- normativa autonómica cuando proceda.

## Mercado

Para precios de reformas no existe necesariamente una única fuente oficial.

Se pueden construir rangos mediante:

- bases de precios;
- publicaciones sectoriales;
- múltiples presupuestos/fuentes;
- datasets propios.

Siempre identificándolo como:

> rango orientativo de mercado.

Nunca:

> precio oficial.

si no lo es.

---

# 29. Revisión periódica

## Mensual

Revisar:

- Search Console;
- errores;
- indexación;
- Core Web Vitals;
- AdSense;
- enlaces rotos.

## Trimestral

Revisar:

- costes orientativos;
- APIs;
- cambios técnicos;
- principales herramientas.

## Cuando cambie normativa

Actualizar inmediatamente:

- valores;
- fórmulas;
- textos;
- fecha;
- changelog.

---

# 30. Definition of Done de cada calculadora

Una herramienta no está terminada hasta cumplir:

```text
[ ] Fórmula validada
[ ] Fuentes identificadas
[ ] Inputs validados
[ ] Mobile 360 px probado
[ ] Teclado probado
[ ] Resultado accesible
[ ] Decimal con coma probado
[ ] Valores extremos probados
[ ] Caso manual comprobado
[ ] Metodología escrita
[ ] Limitaciones escritas
[ ] Ejemplo incluido
[ ] Fuentes visibles
[ ] Fecha visible
[ ] Schema validado
[ ] Canonical correcta
[ ] Title/meta únicos
[ ] CTA interno contextual
[ ] Ad slots seguros
[ ] Sin CLS evidente
[ ] Lighthouse revisado
[ ] Search Console preparada
```

---

# 31. Primer experimento recomendado

Construir primero:

> **Calculadora de consumo de aire acondicionado**

Porque tiene:

- lógica sencilla;
- interés doméstico evidente;
- posibilidad de búsqueda;
- conexión perfecta con frigorías;
- conexión con potencia eléctrica;
- conexión con factura;
- conexión futura con solar.

Inputs:

```text
Potencia eléctrica
Horas/día
Días/mes
Precio electricidad
Factor de uso
```

Outputs:

```text
€/hora
€/día
€/mes
kWh/mes
€/año
```

Con tres escenarios:

```text
Uso moderado
Uso habitual
Uso intensivo
```

Después crear:

> **Calculadora de frigorías**

Y conectar ambas.

---

# 32. Primera estructura de navegación

Header:

```text
LOGO

Calculadoras
Energía
Climatización
Solar
Reformas
Aislamiento
```

Móvil:

```text
☰
```

Home:

```text
H1:
Calculadoras para ahorrar y tomar mejores decisiones en tu hogar

[Buscar una herramienta]

Más utilizadas

Energía

Climatización

Solar

Reformas

Aislamiento
```

No utilizar una homepage llena de artículos genéricos.

El producto son las herramientas.

---

# 33. Resumen ejecutivo operativo

## Tecnología

```text
Astro
Tailwind compilado
JavaScript Vanilla
Cloudflare Pages
GitHub
```

## Primera calculadora

```text
Consumo aire acondicionado
```

## Primer clúster SEO estratégico

```text
Frigorías
   ↓
Consumo AC
   ↓
Potencia contratada
   ↓
Factura eléctrica
```

## Diferenciación

```text
Resultado inmediato
+
sin registro
+
privacidad
+
fórmula visible
+
fuentes españolas
+
rangos realistas
+
datos actualizados
```

## Monetización

```text
AdSense
```

inicialmente.

## Regla publicitaria

```text
Producto primero.
Anuncio después.
```

## Regla SEO

```text
Herramienta útil primero.
Contenido de apoyo después.
```

## Regla de IA

```text
Utilizar IA para acelerar el desarrollo,
no para fabricar contenido sin valor.
```

## Regla de crecimiento

```text
Publicar
→ medir
→ aprender de Search Console
→ ampliar las herramientas que reciben demanda
→ interconectar
→ monetizar
```

---

# 34. Objetivo final

Construir una web española que sea recordada como:

> **el lugar al que acudir cuando necesitas calcular cuánto necesitas, cuánto vas a gastar, cuánto cuesta una mejora o cuánto puedes ahorrar en tu casa.**

Ese posicionamiento permite crear cientos de utilidades futuras sin abandonar el foco temático.

La ventaja competitiva no será producir más textos que los demás.

Será combinar:

```text
SEO
+
utilidad real
+
velocidad
+
cálculos transparentes
+
privacidad
+
fuentes fiables
+
buen UX
+
interlinking inteligente
+
actualización continua
```

Ese es el núcleo del proyecto.
