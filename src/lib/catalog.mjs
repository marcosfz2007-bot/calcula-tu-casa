export const categories=[
 {slug:'energia',name:'Energía',indexable:true,description:'Calcula consumos, costes y demanda eléctrica con tus propios datos.',future:['Simulador de factura eléctrica','Comparador de calefacción']},
 {slug:'climatizacion',name:'Climatización',indexable:true,description:'Dimensiona de forma orientativa la refrigeración y estima su consumo.',future:['Potencia de radiadores','Comparador de sistemas de climatización']},
 {slug:'aislamiento',name:'Aislamiento',indexable:true,description:'Comprueba condensación y parámetros térmicos básicos de cerramientos.',future:['Ahorro por aislamiento','Puentes térmicos simplificados']},
 {slug:'solar',name:'Solar',indexable:false,description:'Hub preparado para futuras herramientas fotovoltaicas con datos verificables.',future:['Número de placas solares','Producción fotovoltaica','Amortización solar']},
 {slug:'reformas',name:'Reformas',indexable:false,description:'Hub preparado para estimadores por partidas, con rangos y fuentes.',future:['Reforma integral','Reforma de baño','Reforma de cocina']}
];
const commonFaq=[
 ['¿Se guardan los datos que introduzco?','No. En esta V1 los cálculos se ejecutan en el navegador y los valores del formulario no se envían ni se almacenan por el código de la calculadora.'],
 ['¿El resultado sustituye a un profesional?','No. Es una herramienta orientativa basada en las variables e hipótesis visibles. Cuando una decisión requiera proyecto, verificación reglamentaria o dimensionado profesional, debe hacerse esa comprobación aparte.']
];
export const tools=[
 {
  kind:'energy',path:'climatizacion/consumo-aire-acondicionado',keywords:['consumo aire acondicionado','coste aire','kWh aire','inverter'],category:'Climatización',categorySlug:'climatizacion',short:'Consumo del aire acondicionado',icon:'❄',
  title:'Calculadora de consumo del aire acondicionado',description:'Estima kWh y coste por hora, día, mes y temporada usando la potencia eléctrica real del equipo, su utilización y tu precio del kWh.',
  methodology:'1.2',formula:'kWh = (W ÷ 1.000) × tiempo × (utilización ÷ 100) × nº de equipos. Coste = kWh × €/kWh. La sensibilidad compara −20 %, escenario introducido y +20 % de horas (máximo 24 h/día).',
  limitations:'No convierte potencia térmica en consumo eléctrico ni predice la modulación real de un equipo inverter. Si conoces una potencia media medida, introdúcela y usa utilización del 100 %.',
  example:'1.000 W, 8 h/día, 30 días, 60 % de utilización y 0,20 €/kWh → 144 kWh/mes y 28,80 €/mes.',
  fields:[['watts','Potencia eléctrica','W','1000'],['hours','Horas al día','h/día','8'],['days','Días al mes','días','30'],['factor','Utilización media','%','60'],['units','Equipos iguales','ud.','1'],['months','Meses al año','meses','3'],['price','Precio de energía','€/kWh','0,20']],
  sources:[['Virginia Tech · Estimating Appliance and Home Electronic Energy Use','https://www.pubs.ext.vt.edu/2901/2901-9014/2901-9014.html']],
  related:['energia/potencia-electrica','energia/consumo-electrodomesticos','climatizacion/calculadora-frigorias'],
  faqs:[['¿Qué potencia debo introducir?','La potencia eléctrica absorbida en W, no la potencia frigorífica o térmica.'],['¿Qué significa utilización media?','Resume qué fracción de la potencia indicada se usa de media durante las horas introducidas. Es una hipótesis editable, no una característica universal del aparato.'],['¿Incluye toda mi factura?','No. Calcula el término variable que resulta de multiplicar kWh por el precio que indiques.'],['¿Cómo calcula el año?','Multiplica el patrón mensual definido por los meses de uso. No es una predicción meteorológica.'],['¿Por qué puede diferir del consumo real?','Por modulación inverter, temperatura exterior, consigna, aislamiento y hábitos.'],...commonFaq]
 },
 {
  kind:'energy',path:'energia/consumo-radiador-electrico',keywords:['consumo radiador','calefactor eléctrico','coste calefacción','kWh radiador'],category:'Energía',categorySlug:'energia',short:'Consumo de radiador eléctrico',icon:'♨',
  title:'Calculadora de consumo de radiador eléctrico',description:'Calcula el gasto de un radiador o calefactor de resistencia a partir de su potencia, horario, termostato y precio de electricidad.',
  methodology:'1.2',formula:'kWh = (W ÷ 1.000) × horas × días × (termostato ÷ 100) × unidades. Coste = kWh × €/kWh. La sensibilidad compara −20 %, escenario introducido y +20 % de horas (máximo 24 h/día).',
  limitations:'Sirve para equipos de resistencia eléctrica. No calcula radiadores de agua ni el rendimiento de bombas de calor y no dimensiona la potencia térmica necesaria de una estancia.',
  example:'1.500 W, 5 h/día, 30 días, 70 % de utilización y 0,20 €/kWh → 157,5 kWh/mes y 31,50 €/mes.',
  fields:[['watts','Potencia eléctrica','W','1500'],['hours','Horas al día','h/día','5'],['days','Días al mes','días','30'],['factor','Termostato activo','%','70'],['units','Radiadores iguales','ud.','1'],['months','Meses al año','meses','4'],['price','Precio de energía','€/kWh','0,20']],
  sources:[['Virginia Tech · Estimating Appliance and Home Electronic Energy Use','https://www.pubs.ext.vt.edu/2901/2901-9014/2901-9014.html']],
  related:['energia/potencia-electrica','energia/consumo-electrodomesticos','aislamiento/transmitancia-termica'],
  faqs:[['¿Qué potencia uso?','La potencia eléctrica nominal del radiador indicada por el fabricante.'],['¿Qué representa el porcentaje del termostato?','La fracción del tiempo de uso durante la que la resistencia entrega potencia.'],['¿Un radiador de 1.500 W consume siempre 1,5 kWh cada hora?','Solo si permanece una hora completa entregando su potencia nominal. Con termostato puede ser menos.'],['¿Incluye costes fijos?','No. Solo el coste variable según los kWh calculados y el precio introducido.'],['¿Sirve para una bomba de calor?','No: una bomba de calor requiere relacionar energía eléctrica y calor entregado mediante su rendimiento.'],...commonFaq]
 },
 {
  kind:'thermo',path:'energia/termo-electrico',keywords:['termo eléctrico','tiempo calentamiento','agua caliente','ACS'],category:'Energía',categorySlug:'energia',short:'Termo eléctrico',icon:'♨',
  title:'Calculadora de termo eléctrico: energía y tiempo de calentamiento',description:'Calcula la energía necesaria para calentar agua, el tiempo teórico de una resistencia y compara el volumen del termo con tus litros de ducha introducidos.',
  methodology:'1.1',formula:'Mezcla: Vcaliente = Vmezcla × (Tducha − Tfría) ÷ (Ttermo − Tfría). Volumen mezclado disponible = Vtermo × (Ttermo − Tfría) ÷ (Tducha − Tfría). Energía = V × (4,186/3600) × ΔT, usando 1 L ≈ 1 kg.',
  limitations:'Modelo teórico sin pérdidas, estratificación, histéresis ni rendimiento real. La cobertura usa exactamente las duchas, litros y temperaturas introducidos; no presupone un consumo universal por persona ni recomienda un tamaño comercial.',
  example:'Con agua fría a 15 °C, uso a 40 °C y termo a 60 °C, 150 L mezclados/día requieren ≈ 83,3 L equivalentes de agua caliente del termo. La energía ideal asociada al agua mezclada es ≈ 4,36 kWh/día.',
  fields:[['persons','Personas','personas','3'],['showers','Duchas diarias','duchas','3'],['litresPerShower','Litros mezclados por ducha','L','50'],['cold','Temperatura del agua fría','°C','15'],['showerTemp','Temperatura de uso/ducha (ejemplo editable)','°C','40'],['target','Temperatura del termo','°C','60'],['powerW','Potencia resistencia','W','2000'],['volume','Volumen del termo','L','100'],['price','Precio de energía (opcional)','€/kWh','']],
  methodologyDetails:[
   'Calor específico del agua: 4,186 kJ/(kg·K), valor técnico de referencia de NIST. Dividiendo por 3.600 se obtiene ≈ 0,001163 kWh/(kg·K).',
   'Aproximación doméstica explícita: 1 litro de agua ≈ 1 kg. No se corrige la variación de densidad con la temperatura.',
   'La demanda por persona se obtiene dividiendo únicamente los litros introducidos entre el número de personas; no se aplica ningún consumo universal por persona.',
   'El balance de mezcla exige T fría < T uso/ducha < T termo.'
  ],
  sources:[['NIST · Fire Fighting Properties (NISTIR 6191): calor específico típico del agua ≈ 4,186 kJ/(kg·K)','https://nvlpubs.nist.gov/nistpubs/Legacy/IR/nistir6191.pdf'],['Metodología y derivación energética del proyecto','/metodologia/']],
  related:['energia/potencia-electrica','energia/consumo-electrodomesticos','energia/consumo-radiador-electrico'],
  faqs:[['¿La calculadora recomienda un tamaño universal por persona?','No. Calcula la demanda que tú introduces y, si hay varias personas, muestra su reparto medio; no presupone litros diarios universales.'],['¿Qué significa 0,001163?','Se deriva de 4,186 kJ/(kg·K) ÷ 3.600 kJ/kWh ≈ 0,001163 kWh/(kg·K), aproximando 1 L de agua a 1 kg.'],['¿El tiempo calculado es exacto?','No. Es un tiempo teórico E/P y no incluye pérdidas, estratificación, histéresis ni control real del termo.'],['¿Puedo dejar vacío el precio del kWh?','Sí. El cálculo energético funciona y simplemente se omiten los resultados económicos.'],['¿Cómo se tiene en cuenta el agua mezclada?','Se calcula qué fracción del agua de ducha debe proceder del termo mediante balance térmico entre agua fría, temperatura de uso y temperatura del termo.'],...commonFaq]
 },
 {
  kind:'dew',path:'aislamiento/punto-de-rocio-moho',keywords:['punto de rocío','condensación','humedad','moho'],category:'Aislamiento',categorySlug:'aislamiento',short:'Punto de rocío y condensación',icon:'◌',
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
  kind:'transmittance',path:'aislamiento/transmitancia-termica',keywords:['transmitancia térmica','valor U','resistencia R','espesor aislamiento'],category:'Aislamiento',categorySlug:'aislamiento',short:'Transmitancia térmica R/U',icon:'▥',
  title:'Calculadora de transmitancia térmica U, resistencia R y espesor',description:'Añade capas de un cerramiento y calcula R por capa, R total y U. También estima el espesor adicional necesario para alcanzar una U objetivo.',
  methodology:'1.0',formula:'Ri = d/λ; Rtotal = Rsi + ΣRi + Rse; U = 1/Rtotal. Para una U objetivo se despeja la resistencia adicional y su espesor.',
  limitations:'Es un cálculo unidimensional simplificado. No sustituye la verificación completa del CTE: no modela puentes térmicos, heterogeneidades, cámaras de aire complejas ni todas las condiciones de contorno.',
  example:'Capa de 100 mm con λ=0,040 W/(m·K): R=2,5 m²K/W. En un cerramiento vertical, se añaden Rsi=0,13 y Rse=0,04 m²K/W.',
  sources:[['CTE · DA DB-HE/1 Cálculo de parámetros característicos de la envolvente','https://www.codigotecnico.org/DocumentosCTE/AhorroEnergia.html']],
  related:['aislamiento/punto-de-rocio-moho','climatizacion/calculadora-frigorias'],
  faqs:[['¿Qué es R?','La resistencia térmica de una capa; en una capa homogénea se obtiene dividiendo el espesor en metros entre la conductividad λ.'],['¿Qué es U?','La transmitancia térmica del conjunto, inversa de la resistencia térmica total en este modelo.'],['¿De dónde salen Rsi y Rse?','De los valores superficiales recogidos por el documento de apoyo del CTE para la dirección del flujo considerada.'],['¿Puedo añadir varias capas?','Sí. La herramienta suma sus resistencias térmicas.'],['¿El espesor objetivo garantiza cumplimiento CTE?','No. Solo despeja un espesor dentro del modelo simplificado; la comprobación reglamentaria completa puede exigir más condiciones.'],...commonFaq]
 },
 {
  kind:'cooling',path:'climatizacion/calculadora-frigorias',keywords:['frigorías','potencia aire acondicionado','BTU','kW térmicos'],category:'Climatización',categorySlug:'climatizacion',short:'Calculadora de frigorías',icon:'❄',
  title:'Calculadora de frigorías y potencia de aire acondicionado',description:'Estima un rango de potencia de refrigeración según superficie, altura, clima, orientación, aislamiento, acristalamiento, personas y cargas internas.',
  methodology:'1.1',formula:'Base = área × referencia base × 1,163 W/(frigoría/h) × factor de altura × orientación × aislamiento × acristalamiento; después se suman personas y cargas internas. El rango se construye alrededor del resultado central.',
  limitations:'No es un cálculo profesional de cargas térmicas. Daikin respalda el rango general 100–150 frigorías/h·m² y ajustes por orientación/aislamiento; el resto de interpolaciones y factores numéricos propios se declaran expresamente como hipótesis del simulador.',
  example:'El simulador parte de 100/125/150 frigorías/h·m², corrige altura, orientación, aislamiento y acristalamiento, suma 115 W por ocupante de actividad muy ligera y las cargas internas introducidas.',
  methodologyDetails:[
   'Base climática: 100, 125 y 150 frigorías/h·m². Daikin publica 100–150 como rango general en vivienda bien aislada y clima cálido; 125 es una interpolación central propia.',
   'Altura: factor = altura/2,5 m. La corrección lineal y la referencia 2,5 m son una hipótesis simplificada del simulador.',
   'Orientación: N 0,95; E 1,00; S 1,175; O 1,10. Daikin publica +15–20 % para sur/sureste y reducción ligera al norte; los valores discretos usados aquí son interpolaciones/hipótesis propias.',
   'Aislamiento: bueno 0,90; medio 1,00; deficiente 1,15. Daikin cita aproximadamente +15 % en vivienda antigua/ventana simple; la reducción del 10 % para buen aislamiento es hipótesis propia.',
   'Acristalamiento: factor = 1 + max(0, vidrio/suelo − 0,15) × 0,5. Es una hipótesis propia y no compara físicamente m² de ventana con un máximo de m² de suelo.',
   'Ocupación: 115 W/persona como carga total representativa de ASHRAE para actividad sentada muy ligera en oficinas/hoteles/apartamentos; la carga real depende de actividad y condiciones.',
   'Rango: ±(12 % + min(8 %, relación vidrio/suelo × 20 %)), por tanto entre ±12 % y ±20 %. Es una banda heurística propia, no un intervalo estadístico.'
  ],
  sources:[['Daikin · Cómo elegir aire acondicionado split por habitación','https://www.daikin.es/es_es/hogar/inspiracion/articulos/aire-acondicionado-split-por-habitacion.html'],['Daikin · Qué son las frigorías','https://www.daikin.es/es_es/hogar/inspiracion/articulos/que-son-las-frigorias.html'],['ASHRAE Handbook · Internal Heat Gains, People: representative heat gains by activity','https://handbook.ashrae.org/handbooks/F17/SI/f17_ch18/f17_ch18_si.aspx']],
  related:['climatizacion/consumo-aire-acondicionado','energia/potencia-electrica','energia/consumo-electrodomesticos'],
  faqs:[['¿Usa 100 frigorías/m² sin más?','No. Esa referencia es solo el punto de partida; se corrige por altura, clima, orientación, aislamiento, acristalamiento, ocupación y cargas internas.'],['¿Por qué muestra un rango?','Porque una estimación doméstica simplificada no conoce todos los parámetros necesarios para una carga térmica de proyecto.'],['¿Qué diferencia hay entre kW y frigorías/h?','La herramienta usa la conversión aproximada 1 frigoría/h = 1,163 W de potencia térmica.'],['¿Influye la orientación?','Sí. La fuente consultada indica que la exposición solar puede requerir elevar la estimación, especialmente en orientaciones soleadas.'],['¿Sirve para comprar directamente un equipo?','Sirve para acotar un rango; para situaciones críticas o complejas conviene un cálculo de cargas por un profesional.'],...commonFaq]
 },
 {
  kind:'power',path:'energia/potencia-electrica',keywords:['potencia contratar','simultaneidad','kW vivienda','potencia eléctrica'],category:'Energía',categorySlug:'energia',short:'Potencia eléctrica necesaria',icon:'⚡',
  title:'Calculadora de potencia eléctrica necesaria en una vivienda',description:'Suma la potencia nominal de los aparatos que selecciones y compara escenarios de simultaneidad moderado, habitual e intensivo.',
  methodology:'1.1',formula:'Pescenario = max(Pmáxima individual, ΣPi × f). En esta V1 f = 45 %, 65 % y 85 %; el suelo Pmáxima evita estimar menos potencia que la necesaria para hacer funcionar el mayor aparato seleccionado.',
  limitations:'Los factores 45/65/85 % son hipótesis del simulador, no coeficientes reglamentarios ni una recomendación contractual. El modelo solo garantiza que cada escenario no caiga por debajo de la carga individual máxima.',
  example:'Con un único aparato de 8 kW, los tres escenarios son como mínimo 8 kW. Con varios aparatos, se toma el mayor valor entre la carga individual máxima y la suma nominal multiplicada por el factor.',
  sources:[['Metodología e hipótesis del proyecto','/metodologia/']],
  related:['energia/consumo-electrodomesticos','climatizacion/consumo-aire-acondicionado','energia/termo-electrico'],
  faqs:[['¿Por qué no suma todo y recomienda esa cifra?','Porque muchos aparatos no funcionan a la vez. La suma nominal se muestra, pero además se calculan escenarios de simultaneidad.'],['¿Los factores 45/65/85 % son oficiales?','No. Son hipótesis transparentes de esta herramienta para comparar escenarios.'],['¿Puedo editar la potencia de cada aparato?','Sí. Debes usar la potencia de tus equipos, no un valor genérico.'],['¿Incluye un cargador de vehículo eléctrico?','Sí, como opción editable, igual que el resto de aparatos.'],['¿Qué significa margen?','La diferencia entre la suma nominal y el escenario habitual estimado; no es un margen contractual recomendado.'],...commonFaq]
 },
 {
  kind:'appliances',path:'energia/consumo-electrodomesticos',keywords:['consumo electrodomésticos','consumo vivienda','kWh ciclo','ranking consumo'],category:'Energía',categorySlug:'energia',short:'Consumo de electrodomésticos',icon:'▣',
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
