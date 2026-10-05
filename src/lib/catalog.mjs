export const categories=[
 {slug:'energia',name:'Energía',description:'Calcula consumos, costes y demanda eléctrica con tus propios datos.',future:['Simulador de factura eléctrica','Comparador de calefacción']},
 {slug:'climatizacion',name:'Climatización',description:'Dimensiona de forma orientativa la refrigeración y estima su consumo.',future:['Potencia de radiadores','Comparador de sistemas de climatización']},
 {slug:'aislamiento',name:'Aislamiento',description:'Comprueba condensación y parámetros térmicos básicos de cerramientos.',future:['Ahorro por aislamiento','Puentes térmicos simplificados']},
 {slug:'solar',name:'Solar',description:'Hub preparado para futuras herramientas fotovoltaicas con datos verificables.',future:['Número de placas solares','Producción fotovoltaica','Amortización solar']},
 {slug:'reformas',name:'Reformas',description:'Hub preparado para estimadores por partidas, con rangos y fuentes.',future:['Reforma integral','Reforma de baño','Reforma de cocina']}
];
const commonFaq=[
 ['¿Se guardan los datos que introduzco?','No. En esta V1 los cálculos se ejecutan en el navegador y los valores del formulario no se envían ni se almacenan por el código de la calculadora.'],
 ['¿El resultado sustituye a un profesional?','No. Es una herramienta orientativa basada en las variables e hipótesis visibles. Cuando una decisión requiera proyecto, verificación reglamentaria o dimensionado profesional, debe hacerse esa comprobación aparte.']
];
export const tools=[
 {
  kind:'energy',path:'climatizacion/consumo-aire-acondicionado',category:'Climatización',categorySlug:'climatizacion',short:'Consumo del aire acondicionado',icon:'❄',
  title:'Calculadora de consumo del aire acondicionado',description:'Estima kWh y coste por hora, día, mes y temporada usando la potencia eléctrica real del equipo, su utilización y tu precio del kWh.',
  methodology:'1.1',formula:'kWh = (W ÷ 1.000) × tiempo × (utilización ÷ 100) × nº de equipos. Coste = kWh × €/kWh.',
  limitations:'No convierte potencia térmica en consumo eléctrico ni predice la modulación real de un equipo inverter. Si conoces una potencia media medida, introdúcela y usa utilización del 100 %.',
  example:'1.000 W, 8 h/día, 30 días, 60 % de utilización y 0,20 €/kWh → 144 kWh/mes y 28,80 €/mes.',
  fields:[['watts','Potencia eléctrica','W','1000'],['hours','Horas al día','h/día','8'],['days','Días al mes','días','30'],['factor','Utilización media','%','60'],['units','Equipos iguales','ud.','1'],['months','Meses al año','meses','3'],['price','Precio de energía','€/kWh','0,20']],
  sources:[['Virginia Tech · Estimating Appliance and Home Electronic Energy Use','https://www.pubs.ext.vt.edu/2901/2901-9014/2901-9014.html']],
  related:['climatizacion/calculadora-frigorias','energia/potencia-electrica','energia/consumo-electrodomesticos'],
  faqs:[['¿Qué potencia debo introducir?','La potencia eléctrica absorbida en W, no la potencia frigorífica o térmica.'],['¿Qué significa utilización media?','Resume qué fracción de la potencia indicada se usa de media durante las horas introducidas. Es una hipótesis editable, no una característica universal del aparato.'],['¿Incluye toda mi factura?','No. Calcula el término variable que resulta de multiplicar kWh por el precio que indiques.'],['¿Cómo calcula el año?','Multiplica el patrón mensual definido por los meses de uso. No es una predicción meteorológica.'],['¿Por qué puede diferir del consumo real?','Por modulación inverter, temperatura exterior, consigna, aislamiento y hábitos.'],...commonFaq]
 },
 {
  kind:'energy',path:'energia/consumo-radiador-electrico',category:'Energía',categorySlug:'energia',short:'Consumo de radiador eléctrico',icon:'♨',
  title:'Calculadora de consumo de radiador eléctrico',description:'Calcula el gasto de un radiador o calefactor de resistencia a partir de su potencia, horario, termostato y precio de electricidad.',
  methodology:'1.1',formula:'kWh = (W ÷ 1.000) × horas × días × (termostato ÷ 100) × unidades. Coste = kWh × €/kWh.',
  limitations:'Sirve para equipos de resistencia eléctrica. No calcula radiadores de agua ni el rendimiento de bombas de calor y no dimensiona la potencia térmica necesaria de una estancia.',
  example:'1.500 W, 5 h/día, 30 días, 70 % de utilización y 0,20 €/kWh → 157,5 kWh/mes y 31,50 €/mes.',
  fields:[['watts','Potencia eléctrica','W','1500'],['hours','Horas al día','h/día','5'],['days','Días al mes','días','30'],['factor','Termostato activo','%','70'],['units','Radiadores iguales','ud.','1'],['months','Meses al año','meses','4'],['price','Precio de energía','€/kWh','0,20']],
  sources:[['Virginia Tech · Estimating Appliance and Home Electronic Energy Use','https://www.pubs.ext.vt.edu/2901/2901-9014/2901-9014.html']],
  related:['energia/potencia-electrica','energia/consumo-electrodomesticos','aislamiento/transmitancia-termica'],
  faqs:[['¿Qué potencia uso?','La potencia eléctrica nominal del radiador indicada por el fabricante.'],['¿Qué representa el porcentaje del termostato?','La fracción del tiempo de uso durante la que la resistencia entrega potencia.'],['¿Un radiador de 1.500 W consume siempre 1,5 kWh cada hora?','Solo si permanece una hora completa entregando su potencia nominal. Con termostato puede ser menos.'],['¿Incluye costes fijos?','No. Solo el coste variable según los kWh calculados y el precio introducido.'],['¿Sirve para una bomba de calor?','No: una bomba de calor requiere relacionar energía eléctrica y calor entregado mediante su rendimiento.'],...commonFaq]
 },
 {
  kind:'thermo',path:'energia/termo-electrico',category:'Energía',categorySlug:'energia',short:'Termo eléctrico',icon:'♨',
  title:'Calculadora de termo eléctrico: energía y tiempo de calentamiento',description:'Calcula la energía necesaria para calentar agua, el tiempo teórico de una resistencia y compara el volumen del termo con tus litros de ducha introducidos.',
  methodology:'1.0',formula:'E (kWh) = V × 0,001163 × ΔT. Tiempo (h) = E ÷ potencia (kW).',
  limitations:'El tiempo es teórico: no incorpora pérdidas del depósito, histéresis, estratificación ni rendimiento real. La cobertura compara volumen nominal con los litros de ducha que tú introduces; no presupone un consumo universal por persona.',
  example:'100 L desde 15 °C hasta 60 °C requieren ≈ 5,23 kWh. Con una resistencia de 2.000 W, el tiempo teórico es ≈ 2,62 h.',
  fields:[['persons','Personas','personas','3'],['showers','Duchas diarias','duchas','3'],['litresPerShower','Litros por ducha','L','50'],['cold','Agua fría','°C','15'],['target','Temperatura objetivo','°C','60'],['powerW','Potencia resistencia','W','2000'],['volume','Volumen del termo','L','100'],['price','Precio de energía','€/kWh','0,20']],
  sources:[['NIST · SI unit relationships and thermophysical reference data','https://www.nist.gov/pml/owm/si-units-temperature'],['Definición energética empleada en la estrategia del proyecto','/metodologia/']],
  related:['energia/potencia-electrica','energia/consumo-electrodomesticos','energia/consumo-radiador-electrico'],
  faqs:[['¿La calculadora recomienda un tamaño universal por persona?','No. Compara el volumen con los litros de ducha que introduzcas, porque el consumo real depende de hábitos y caudales.'],['¿Qué significa 0,001163?','Es el factor energético usado para elevar un litro de agua un kelvin, expresado en kWh por litro y kelvin en este modelo.'],['¿El tiempo calculado es exacto?','No. Es E/P y no incluye pérdidas ni control real del termo.'],['¿Puedo introducir mi precio del kWh?','Sí. Es opcional en el sentido económico: si usas 0, el cálculo energético sigue siendo válido y el coste será 0.'],['¿Cuenta agua mezclada en la ducha?','No estima automáticamente litros útiles mezclados porque exigiría conocer la temperatura de mezcla y más supuestos.'],...commonFaq]
 },
 {
  kind:'dew',path:'aislamiento/punto-de-rocio-moho',category:'Aislamiento',categorySlug:'aislamiento',short:'Punto de rocío y condensación',icon:'◌',
  title:'Calculadora de punto de rocío y condensación superficial',description:'Calcula el punto de rocío con Magnus y compara la temperatura superficial para saber si existe posibilidad física de condensación.',
  methodology:'1.0',formula:'γ = ln(HR/100) + (17,62 × T)/(243,12 + T); Td = (243,12 × γ)/(17,62 − γ).',
  limitations:'Indica posibilidad física de condensación cuando la superficie está en o por debajo del punto de rocío. No diagnostica moho, salud ni la causa constructiva de una humedad.',
  example:'Con 20 °C y 60 % HR, el punto de rocío es aproximadamente 12 °C. Una superficie a 11 °C está por debajo de ese valor y puede condensar.',
  fields:[['temperature','Temperatura interior','°C','20'],['humidity','Humedad relativa','%','60'],['surface','Temperatura superficial','°C','11'],['exterior','Temperatura exterior (opcional)','°C','']],
  sources:[['Magnus-Tetens/Sonntag: coeficientes 17,62 y 243,12 °C, rango −45 a 60 °C','https://digitalarchive.library.bogazici.edu.tr/bitstreams/d677e348-5d14-4b64-979d-de3815e49dfb/download'],['CTE · DA DB-HE/2 Condensaciones','https://www.codigotecnico.org/DocumentosCTE/AhorroEnergia.html']],
  related:['aislamiento/transmitancia-termica','energia/consumo-radiador-electrico'],
  faqs:[['¿Qué es el punto de rocío?','La temperatura a la que el aire, manteniendo su contenido de vapor, alcanza saturación y puede empezar a condensar sobre una superficie suficientemente fría.'],['¿Qué coeficientes utiliza?','17,62 y 243,12 °C para la aproximación de Magnus sobre agua.'],['¿Cuál es el rango documentado?','La referencia utilizada documenta aproximadamente −45 °C a 60 °C para la temperatura del aire.'],['¿Si la pared está por debajo del punto de rocío habrá agua visible?','Existe posibilidad física de condensación, pero el resultado no modela duración, transferencia de humedad ni acabados.'],['¿Calcula riesgo médico por moho?','No. No realiza diagnósticos médicos ni microbiológicos.'],...commonFaq]
 },
 {
  kind:'transmittance',path:'aislamiento/transmitancia-termica',category:'Aislamiento',categorySlug:'aislamiento',short:'Transmitancia térmica R/U',icon:'▥',
  title:'Calculadora de transmitancia térmica U, resistencia R y espesor',description:'Añade capas de un cerramiento y calcula R por capa, R total y U. También estima el espesor adicional necesario para alcanzar una U objetivo.',
  methodology:'1.0',formula:'Ri = d/λ; Rtotal = Rsi + ΣRi + Rse; U = 1/Rtotal. Para una U objetivo se despeja la resistencia adicional y su espesor.',
  limitations:'Es un cálculo unidimensional simplificado. No sustituye la verificación completa del CTE: no modela puentes térmicos, heterogeneidades, cámaras de aire complejas ni todas las condiciones de contorno.',
  example:'Capa de 100 mm con λ=0,040 W/(m·K): R=2,5 m²K/W. En un cerramiento vertical, se añaden Rsi=0,13 y Rse=0,04 m²K/W.',
  sources:[['CTE · DA DB-HE/1 Cálculo de parámetros característicos de la envolvente','https://www.codigotecnico.org/DocumentosCTE/AhorroEnergia.html']],
  related:['aislamiento/punto-de-rocio-moho','climatizacion/calculadora-frigorias'],
  faqs:[['¿Qué es R?','La resistencia térmica de una capa; en una capa homogénea se obtiene dividiendo el espesor en metros entre la conductividad λ.'],['¿Qué es U?','La transmitancia térmica del conjunto, inversa de la resistencia térmica total en este modelo.'],['¿De dónde salen Rsi y Rse?','De los valores superficiales recogidos por el documento de apoyo del CTE para la dirección del flujo considerada.'],['¿Puedo añadir varias capas?','Sí. La herramienta suma sus resistencias térmicas.'],['¿El espesor objetivo garantiza cumplimiento CTE?','No. Solo despeja un espesor dentro del modelo simplificado; la comprobación reglamentaria completa puede exigir más condiciones.'],...commonFaq]
 },
 {
  kind:'cooling',path:'climatizacion/calculadora-frigorias',category:'Climatización',categorySlug:'climatizacion',short:'Calculadora de frigorías',icon:'❄',
  title:'Calculadora de frigorías y potencia de aire acondicionado',description:'Estima un rango de potencia de refrigeración según superficie, altura, clima, orientación, aislamiento, acristalamiento, personas y cargas internas.',
  methodology:'1.0',formula:'Base = área × referencia climática × 1,163 W/(frigoría/h), corregida por altura, orientación, aislamiento y acristalamiento; se añaden ocupantes y cargas internas. Se muestra un rango orientativo.',
  limitations:'No es un cálculo profesional de cargas térmicas. La base 100–150 frigorías/m² y las correcciones publicadas son orientativas; el factor de acristalamiento y la amplitud del rango son hipótesis declaradas del simulador para evitar falsa precisión.',
  example:'Para una estancia se parte de superficie × altura relativa y una referencia climática editable por zona cualitativa; después se corrigen exposición, aislamiento y cargas internas.',
  sources:[['Daikin · Cómo elegir aire acondicionado split por habitación','https://www.daikin.es/es_es/hogar/inspiracion/articulos/aire-acondicionado-split-por-habitacion.html'],['Daikin · Qué son las frigorías','https://www.daikin.es/es_es/hogar/inspiracion/articulos/que-son-las-frigorias.html']],
  related:['climatizacion/consumo-aire-acondicionado','energia/potencia-electrica','energia/consumo-electrodomesticos'],
  faqs:[['¿Usa 100 frigorías/m² sin más?','No. Esa referencia es solo el punto de partida; se corrige por altura, clima, orientación, aislamiento, acristalamiento, ocupación y cargas internas.'],['¿Por qué muestra un rango?','Porque una estimación doméstica simplificada no conoce todos los parámetros necesarios para una carga térmica de proyecto.'],['¿Qué diferencia hay entre kW y frigorías/h?','La herramienta usa la conversión aproximada 1 frigoría/h = 1,163 W de potencia térmica.'],['¿Influye la orientación?','Sí. La fuente consultada indica que la exposición solar puede requerir elevar la estimación, especialmente en orientaciones soleadas.'],['¿Sirve para comprar directamente un equipo?','Sirve para acotar un rango; para situaciones críticas o complejas conviene un cálculo de cargas por un profesional.'],...commonFaq]
 },
 {
  kind:'power',path:'energia/potencia-electrica',category:'Energía',categorySlug:'energia',short:'Potencia eléctrica necesaria',icon:'⚡',
  title:'Calculadora de potencia eléctrica necesaria en una vivienda',description:'Suma la potencia nominal de los aparatos que selecciones y compara escenarios de simultaneidad moderado, habitual e intensivo.',
  methodology:'1.0',formula:'Pescenario = ΣPi × f. En esta V1 f = 45 %, 65 % y 85 % para los escenarios del simulador.',
  limitations:'Los factores de simultaneidad son hipótesis del simulador, no coeficientes reglamentarios ni una recomendación contractual. La potencia real depende de qué equipos coincidan y de sus ciclos de funcionamiento.',
  example:'Si seleccionas aparatos que suman 8 kW nominales, el escenario habitual del simulador (65 %) muestra 5,2 kW simultáneos estimados.',
  sources:[['Metodología e hipótesis del proyecto','/metodologia/']],
  related:['energia/consumo-electrodomesticos','climatizacion/consumo-aire-acondicionado','energia/termo-electrico'],
  faqs:[['¿Por qué no suma todo y recomienda esa cifra?','Porque muchos aparatos no funcionan a la vez. La suma nominal se muestra, pero además se calculan escenarios de simultaneidad.'],['¿Los factores 45/65/85 % son oficiales?','No. Son hipótesis transparentes de esta herramienta para comparar escenarios.'],['¿Puedo editar la potencia de cada aparato?','Sí. Debes usar la potencia de tus equipos, no un valor genérico.'],['¿Incluye un cargador de vehículo eléctrico?','Sí, como opción editable, igual que el resto de aparatos.'],['¿Qué significa margen?','La diferencia entre la suma nominal y el escenario habitual estimado; no es un margen contractual recomendado.'],...commonFaq]
 },
 {
  kind:'appliances',path:'energia/consumo-electrodomesticos',category:'Energía',categorySlug:'energia',short:'Consumo de electrodomésticos',icon:'▣',
  title:'Calculadora de consumo de electrodomésticos de la vivienda',description:'Añade aparatos por potencia y horas o por kWh/ciclo y ciclos/semana. Obtén consumo, coste, porcentaje y ranking de toda la vivienda.',
  methodology:'1.0',formula:'Modo horas: kWh/año = W/1.000 × h/día × 365. Modo ciclos: kWh/año = kWh/ciclo × ciclos/semana × 52.',
  limitations:'No aporta consumos típicos ocultos: debes introducir la etiqueta, ficha técnica o medición de cada aparato. El uso anual supone que el patrón diario o semanal se mantiene.',
  example:'Un aparato de 100 W usado 5 h/día → 182,5 kWh/año. Un aparato de 1 kWh/ciclo usado 4 veces/semana → 208 kWh/año.',
  sources:[['Virginia Tech · Estimating Appliance and Home Electronic Energy Use','https://www.pubs.ext.vt.edu/2901/2901-9014/2901-9014.html']],
  related:['energia/potencia-electrica','energia/termo-electrico','climatizacion/consumo-aire-acondicionado'],
  faqs:[['¿Qué modo elijo?','Usa potencia y horas para aparatos cuyo uso se describe bien por tiempo; usa kWh/ciclo cuando el fabricante o una medición te da energía por ciclo.'],['¿De dónde saco los W o kWh/ciclo?','De la etiqueta, ficha técnica o una medición. La herramienta no impone consumos genéricos.'],['¿Cómo calcula el porcentaje?','Divide el consumo anual de cada aparato entre el total de los aparatos introducidos.'],['¿El ranking es por coste o por energía?','Se ordena por kWh/año; con un único precio del kWh el orden de coste es el mismo.'],['¿Puedo añadir y eliminar aparatos?','Sí. Las filas se gestionan localmente en el navegador.'],...commonFaq]
 }
];
export const toolByPath=new Map(tools.map(t=>[t.path,t]));
export const infoPages=['sobre-nosotros','metodologia','fuentes','politica-editorial','contacto','aviso-legal','privacidad','cookies'];
