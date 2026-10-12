const PRESENTATION={
'climatizacion/consumo-aire-acondicionado':{question:'¿Cuánto consume mi aire acondicionado?',result:'kWh, coste y escenarios de uso',variant:'economic'},
'energia/consumo-radiador-electrico':{question:'¿Cuánto gasta mi radiador eléctrico?',result:'kWh y coste por periodo',variant:'economic'},
'energia/termo-electrico':{question:'¿Qué consumo y capacidad necesito para el agua caliente?',result:'energía, litros, tiempo y coste',variant:'breakdown'},
'aislamiento/punto-de-rocio-moho':{question:'¿Existe riesgo de condensación en esta superficie?',result:'punto de rocío y margen térmico',variant:'status'},
'aislamiento/transmitancia-termica':{question:'¿Cómo transmite calor este cerramiento?',result:'U, R y resistencia por capas',variant:'technical'},
'climatizacion/calculadora-frigorias':{question:'¿Qué aire acondicionado necesito?',result:'rango en kW, frigorías y BTU/h',variant:'range'},
'energia/potencia-electrica':{question:'¿Qué potencia eléctrica pueden requerir mis aparatos?',result:'escenarios de demanda simultánea',variant:'comparison'},
'energia/consumo-electrodomesticos':{question:'¿Qué electrodomésticos consumen más?',result:'consumo, coste y ranking',variant:'ranking'},
'climatizacion/suelo-radiante-tubo-circuitos':{question:'¿Cuánto tubo y cuántos circuitos necesito?',result:'longitud y circuitos orientativos',variant:'materials'},
'energia/ventilacion-vivienda':{question:'¿Qué caudal de ventilación necesita mi vivienda?',result:'caudales de admisión y extracción',variant:'technical'},
'energia/simulador-factura-electrica':{question:'¿Cuánto pagaré de electricidad?',result:'total y desglose de la factura',variant:'economic'},
'solar/produccion-placas-solares':{question:'¿Cuánta energía pueden producir mis placas?',result:'producción fotovoltaica con PVGIS',variant:'solar'},
'climatizacion/potencia-radiadores-elementos':{question:'¿Cuántos elementos de radiador necesito?',result:'potencia y número de elementos',variant:'materials'},
'solar/numero-placas-solares':{question:'¿Cuántas placas solares necesito?',result:'paneles, potencia y cobertura',variant:'solar'},
'energia/comparador-coste-calefaccion':{question:'¿Qué sistema de calefacción me cuesta menos?',result:'comparativa anual de alternativas',variant:'comparison'},
'reformas/presupuesto-reforma-integral':{question:'¿Cuánto puede costar una reforma integral?',result:'escenarios y desglose de partidas',variant:'range-economic'},
'reformas/reforma-bano':{question:'¿Cuánto puede costar reformar el baño?',result:'escenarios y partidas del baño',variant:'range-economic'},
'reformas/reforma-cocina':{question:'¿Cuánto puede costar reformar la cocina?',result:'escenarios y partidas de cocina',variant:'range-economic'},
'solar/amortizacion-placas-solares':{question:'¿Cuándo recuperaré la inversión solar?',result:'payback, ahorro, flujos y VAN',variant:'payback'},
'energia/rentabilidad-aerotermia':{question:'¿Me compensa económicamente la aerotermia?',result:'ahorro, payback y sensibilidad',variant:'payback'},
'reformas/comparador-reformas-energeticas':{question:'¿Qué mejora energética ofrece mejor retorno?',result:'ahorro y payback por actuación',variant:'comparison'},
'reformas/calculadora-pintura':{question:'¿Cuánta pintura necesito?',result:'litros, envases y superficie',variant:'materials'},
'reformas/calculadora-azulejos-baldosas':{question:'¿Cuántos azulejos o baldosas necesito?',result:'piezas, cajas y sobrante',variant:'materials'},
'reformas/suelo-laminado-tarima':{question:'¿Cuánto suelo laminado o tarima necesito?',result:'m², cajas, sobrante y coste',variant:'materials'},
'reformas/calculadora-rodapie':{question:'¿Cuántos metros y piezas de rodapié necesito?',result:'piezas, paquetes, sobrante y coste',variant:'materials'},
'reformas/calculadora-papel-pintado':{question:'¿Cuántos rollos de papel pintado necesito?',result:'rollos, tiras y sobrante',variant:'materials'},
'energia/calculadora-iluminacion-lux':{question:'¿Cuántas luminarias necesito para alcanzar mis lux?',result:'lúmenes, luminarias y lux',variant:'technical'},
'energia/ahorro-bombillas-led':{question:'¿Cuánto ahorro al pasarme a LED?',result:'kWh, euros y amortización',variant:'savings'},
'energia/consumo-standby':{question:'¿Cuánto me cuesta el consumo fantasma?',result:'consumo, coste y ranking',variant:'ranking'},
'energia/recarga-coche-electrico':{question:'¿Cuánto tarda y cuesta cargar mi coche eléctrico?',result:'tiempo, energía, pérdidas y coste',variant:'economic'},
'solar/bateria-solar':{question:'¿Qué capacidad de batería solar necesito?',result:'capacidad, módulos y suficiencia',variant:'solar'},
'aislamiento/perdida-termica-vivienda':{question:'¿Por dónde pierde calor mi vivienda?',result:'potencia perdida y reparto por elementos',variant:'breakdown'},
'energia/consumo-deshumidificador':{question:'¿Cuánto consume mi deshumidificador?',result:'kWh, coste y rendimiento nominal',variant:'economic'},
'aislamiento/ahorro-cambio-ventanas':{question:'¿Cuánto podría ahorrar al cambiar las ventanas?',result:'energía evitada, ahorro y payback',variant:'savings'},
'reformas/hormigon-necesario':{question:'¿Cuánto hormigón necesito?',result:'m³, litros, sacos y coste',variant:'materials'},
'reformas/mortero-necesario':{question:'¿Cuánto mortero necesito?',result:'volumen, litros, sacos y coste',variant:'materials'},
'reformas/ladrillos-bloques-necesarios':{question:'¿Cuántos ladrillos o bloques necesito?',result:'piezas, paquetes, sobrante y coste',variant:'materials'},
'reformas/calculadora-impermeabilizacion':{question:'¿Cuánto impermeabilizante necesito?',result:'cantidad, envases, sobrante y coste',variant:'materials'},
'reformas/tamano-deposito-agua':{question:'¿Qué tamaño de depósito de agua necesito?',result:'litros útiles y capacidad nominal',variant:'materials'}
};

export const getToolPresentation=(tool)=>PRESENTATION[tool.path]||{question:tool.short,result:'estimación detallada',variant:'default'};

export const NEXT_DECISIONS={
'climatizacion/calculadora-frigorias':{path:'climatizacion/consumo-aire-acondicionado',question:'¿Cuánto te costaría utilizar ese aire acondicionado?',text:'Ya conoces la potencia orientativa. Ahora puedes estimar su consumo eléctrico con los datos reales del equipo.'},
'climatizacion/consumo-aire-acondicionado':{path:'energia/simulador-factura-electrica',question:'¿Cómo encaja ese consumo en tu factura?',text:'Tras estimar los kWh del equipo, puedes incorporarlos a un escenario completo de factura eléctrica.'},
'energia/consumo-radiador-electrico':{path:'energia/comparador-coste-calefaccion',question:'¿Cómo se compara con otras formas de calefacción?',text:'Compara el coste anual de diferentes sistemas para el mismo calor útil.'},
'energia/termo-electrico':{path:'energia/simulador-factura-electrica',question:'¿Qué efecto puede tener este consumo en tu factura?',text:'Utiliza el consumo estimado para construir un escenario más completo de electricidad.'},
'energia/potencia-electrica':{path:'energia/simulador-factura-electrica',question:'¿Cuánto puede costarte tu escenario eléctrico?',text:'La potencia es solo una parte de la decisión: simula también energía, impuestos y otros conceptos.'},
'energia/consumo-electrodomesticos':{path:'energia/simulador-factura-electrica',question:'¿Cómo se traduce este consumo en una factura?',text:'Lleva el consumo de tus aparatos a un escenario completo de coste eléctrico.'},
'energia/ventilacion-vivienda':{path:'energia/rentabilidad-aerotermia',question:'¿Estás estudiando también el sistema térmico de la vivienda?',text:'Si valoras una mejora global, puedes comparar el retorno económico de la aerotermia con tus propias hipótesis.'},
'energia/simulador-factura-electrica':{path:'energia/consumo-standby',question:'¿Qué parte del consumo podrías reducir sin cambiar hábitos de uso?',text:'Revisa el consumo fantasma de los equipos que permanecen conectados.'},
'climatizacion/suelo-radiante-tubo-circuitos':{path:'energia/rentabilidad-aerotermia',question:'¿Quieres estimar el retorno de una solución con aerotermia?',text:'Si estás valorando un sistema térmico completo, compara inversión y ahorro con tus propios datos.'},
'climatizacion/potencia-radiadores-elementos':{path:'energia/comparador-coste-calefaccion',question:'¿Cuánto cuesta producir el calor que necesitas?',text:'Compara sistemas de calefacción usando una demanda anual común.'},
'solar/numero-placas-solares':{path:'solar/produccion-placas-solares',question:'¿Cuánto podrían producir esos paneles en tu ubicación?',text:'Utiliza datos oficiales de PVGIS para estimar la producción fotovoltaica.'},
'solar/produccion-placas-solares':{path:'solar/amortizacion-placas-solares',question:'¿Cuándo recuperarías la inversión de la instalación?',text:'Convierte la producción estimada en un escenario económico de ahorro y amortización.'},
'solar/amortizacion-placas-solares':{path:'solar/bateria-solar',question:'¿Qué capacidad de batería encajaría con la energía que quieres desplazar?',text:'Dimensiona una capacidad orientativa sin confundir energía almacenada y potencia.'},
'solar/bateria-solar':{path:'solar/numero-placas-solares',question:'¿Cuántos paneles necesitas para tu objetivo anual?',text:'Relaciona tu consumo objetivo con producción específica y potencia fotovoltaica.'},
'energia/comparador-coste-calefaccion':{path:'energia/rentabilidad-aerotermia',question:'¿Quieres estudiar específicamente la inversión en aerotermia?',text:'Pasa de la comparación anual a un escenario de ahorro y plazo de recuperación.'},
'energia/rentabilidad-aerotermia':{path:'reformas/comparador-reformas-energeticas',question:'¿Qué otras mejoras energéticas podrías comparar?',text:'Contrasta varias actuaciones bajo una misma lógica de ahorro y payback simple.'},
'aislamiento/transmitancia-termica':{path:'aislamiento/perdida-termica-vivienda',question:'¿Cuánta potencia térmica se pierde a través de tus cerramientos?',text:'Utiliza superficies y valores U para estimar pérdidas por transmisión.'},
'aislamiento/perdida-termica-vivienda':{path:'aislamiento/ahorro-cambio-ventanas',question:'¿Qué cambiaría si mejoras las ventanas?',text:'Compara el escenario actual y uno nuevo mediante sus transmitancias.'},
'aislamiento/ahorro-cambio-ventanas':{path:'reformas/comparador-reformas-energeticas',question:'¿Cómo se compara cambiar ventanas con otras reformas energéticas?',text:'Contrasta inversión, ahorro y retorno de varias actuaciones.'},
'aislamiento/punto-de-rocio-moho':{path:'aislamiento/transmitancia-termica',question:'¿Quieres analizar también el comportamiento térmico del cerramiento?',text:'Calcula R y U a partir de las capas y conductividades del cerramiento.'},
'reformas/presupuesto-reforma-integral':{path:'reformas/comparador-reformas-energeticas',question:'¿Qué mejoras energéticas merece la pena incluir en la reforma?',text:'Compara actuaciones por inversión, ahorro y plazo de recuperación.'},
'reformas/reforma-bano':{path:'reformas/calculadora-azulejos-baldosas',question:'¿Cuántos azulejos o baldosas necesitarías?',text:'Pasa del presupuesto global a la medición concreta de material.'},
'reformas/reforma-cocina':{path:'reformas/calculadora-azulejos-baldosas',question:'¿Cuántos revestimientos necesitas para la cocina?',text:'Calcula piezas, cajas y sobrante a partir de tus medidas.'},
'reformas/comparador-reformas-energeticas':{path:'aislamiento/ahorro-cambio-ventanas',question:'¿Quieres detallar el caso concreto de las ventanas?',text:'Estima ahorro energético y payback con transmitancias y superficie.'},
'reformas/calculadora-pintura':{path:'reformas/calculadora-rodapie',question:'¿También necesitas medir el rodapié de las estancias?',text:'Calcula longitud, piezas, paquetes y sobrante.'},
'reformas/calculadora-azulejos-baldosas':{path:'reformas/mortero-necesario',question:'¿Necesitas estimar también el mortero?',text:'Calcula volumen, litros y sacos usando el rendimiento de la ficha técnica.'},
'reformas/suelo-laminado-tarima':{path:'reformas/calculadora-rodapie',question:'¿Cuánto rodapié necesitas para completar el suelo?',text:'Calcula metros, piezas y paquetes a partir del perímetro.'},
'reformas/calculadora-rodapie':{path:'reformas/suelo-laminado-tarima',question:'¿También vas a calcular el suelo laminado o la tarima?',text:'Estima m², cajas, sobrante y coste para las mismas estancias.'},
'reformas/calculadora-papel-pintado':{path:'reformas/calculadora-pintura',question:'¿Quieres comparar con la cantidad de pintura necesaria?',text:'Calcula superficie, manos, rendimiento y litros de pintura.'},
'energia/calculadora-iluminacion-lux':{path:'energia/ahorro-bombillas-led',question:'¿Cuánto podrías ahorrar usando LED?',text:'Compara potencia actual y LED para estimar consumo, ahorro y payback.'},
'energia/ahorro-bombillas-led':{path:'energia/consumo-standby',question:'¿Qué otros pequeños consumos puedes revisar?',text:'Estima el coste anual de equipos que permanecen en standby.'},
'energia/consumo-standby':{path:'energia/consumo-electrodomesticos',question:'¿Qué aparatos explican el resto del consumo doméstico?',text:'Construye un ranking de consumo y coste de tus electrodomésticos.'},
'energia/recarga-coche-electrico':{path:'energia/simulador-factura-electrica',question:'¿Cómo encaja la recarga en el coste eléctrico del hogar?',text:'Incorpora el consumo de recarga a un escenario de factura completa.'},
'energia/consumo-deshumidificador':{path:'aislamiento/punto-de-rocio-moho',question:'¿Quieres revisar también las condiciones de condensación?',text:'Compara temperatura superficial, humedad y punto de rocío.'},
'reformas/hormigon-necesario':{path:'reformas/mortero-necesario',question:'¿Necesitas calcular también mortero para la obra?',text:'Estima volumen y sacos a partir del área, espesor y rendimiento.'},
'reformas/mortero-necesario':{path:'reformas/ladrillos-bloques-necesarios',question:'¿Cuántas piezas de fábrica necesitas?',text:'Calcula ladrillos o bloques teniendo en cuenta huecos, juntas y desperdicio.'},
'reformas/ladrillos-bloques-necesarios':{path:'reformas/mortero-necesario',question:'¿Cuánto mortero necesitas para continuar la medición?',text:'Completa la estimación de materiales con volumen y rendimiento por saco.'},
'reformas/calculadora-impermeabilizacion':{path:'reformas/hormigon-necesario',question:'¿También necesitas medir una base o losa de hormigón?',text:'Calcula volumen, margen, sacos y coste con tus dimensiones.'},
'reformas/tamano-deposito-agua':{path:'solar/numero-placas-solares',question:'¿También estás dimensionando otras soluciones domésticas?',text:'Continúa con una herramienta de dimensionado energético si forma parte de tu proyecto.'}
};

export const getNextDecision=(tool)=>NEXT_DECISIONS[tool.path]||null;


const FORM_GROUPS={
'climatizacion/consumo-aire-acondicionado':[
 {title:'Equipo y uso',keys:['watts','units','hours','days','factor','months']},
 {title:'Coste de energía',keys:['price']}
],
'energia/consumo-radiador-electrico':[
 {title:'Radiadores y uso',keys:['watts','units','hours','days','factor','months']},
 {title:'Coste de energía',keys:['price']}
],
'energia/termo-electrico':[
 {title:'Demanda de agua caliente',keys:['persons','showers','litresPerShower']},
 {title:'Temperaturas',keys:['cold','showerTemp','target']},
 {title:'Equipo y coste',keys:['powerW','volume','price']}
],
'aislamiento/punto-de-rocio-moho':[
 {title:'Ambiente interior',keys:['temperature','humidity']},
 {title:'Superficies y exterior',keys:['surface','exterior']}
],
'energia/simulador-factura-electrica':[
 {title:'Consumo y energía',keys:['consumptionKwh','energyPrice','days']},
 {title:'Potencia contratada',keys:['powerKw','powerPriceKwDay']},
 {title:'Impuestos',keys:['electricityTaxPercent','electricityTaxMinimumEuroPerMwh','vatPercent']},
 {title:'Otros conceptos',keys:['meterRental','otherBeforeVat','otherAfterVat']}
],
'climatizacion/potencia-radiadores-elementos':[
 {title:'Estancia y demanda',keys:['area','height','thermalFactor']},
 {title:'Emisor y margen',keys:['elementPowerW','correctionFactor','marginPercent']}
],
'energia/comparador-coste-calefaccion':[
 {title:'Demanda y electricidad',keys:['usefulHeatKwh','electricityPrice','resistanceFixed']},
 {title:'Bomba de calor',keys:['scop','heatPumpFixed']},
 {title:'Gas',keys:['gasPrice','gasEfficiencyPercent','gasFixed']},
 {title:'Pellet',keys:['pelletPriceKg','pelletPciKwhKg','pelletEfficiencyPercent','pelletFixed']}
],
'solar/amortizacion-placas-solares':[
 {title:'Inversión',keys:['installationCost','aid']},
 {title:'Producción y autoconsumo',keys:['annualProductionKwh','annualConsumptionKwh','selfConsumptionPercent']},
 {title:'Valor de la energía',keys:['avoidedPrice','surplusCompensation','annualMaintenance']},
 {title:'Horizonte financiero',keys:['degradationPercent','horizonYears','energyPriceGrowthPercent','discountRatePercent']}
],
'energia/rentabilidad-aerotermia':[
 {title:'Sistema actual',keys:['usefulHeatKwh','currentFuelPrice','currentEfficiencyPercent','currentMaintenance']},
 {title:'Aerotermia',keys:['scop','electricityPrice','aerothermalMaintenance','sensitivityPercent']},
 {title:'Inversión',keys:['investment','aid']}
],
'reformas/calculadora-rodapie':[
 {title:'Geometría de la estancia',keys:['length','width','openingsM','marginPercent']},
 {title:'Formato de compra',keys:['pieceLengthM','piecesPerPack']},
 {title:'Precio opcional',keys:['pricePerPiece','pricePerPack']}
],
'reformas/calculadora-papel-pintado':[
 {title:'Pared',keys:['wallWidthM','heightM']},
 {title:'Rollo y patrón',keys:['rollWidthM','rollLengthM','repeatM']},
 {title:'Margen',keys:['trimMarginM','extraPercent']}
],
'energia/calculadora-iluminacion-lux':[
 {title:'Espacio y objetivo',keys:['areaM2','targetLux']},
 {title:'Luminaria y factores',keys:['lumensPerFixture','utilizationFactor','maintenanceFactor']}
],
'energia/ahorro-bombillas-led':[
 {title:'Instalación actual y LED',keys:['bulbs','currentWatts','ledWatts']},
 {title:'Uso y energía',keys:['hoursPerDay','daysPerYear','price']},
 {title:'Inversión opcional',keys:['investment']}
],
'solar/bateria-solar':[
 {title:'Energía objetivo',keys:['dailyShiftKwh','autonomyDays']},
 {title:'Batería',keys:['usableFractionPercent','roundTripEfficiencyPercent','moduleCapacityKwh']},
 {title:'Comprobaciones opcionales',keys:['dailySurplusKwh','requiredPowerKw']}
],
'energia/consumo-deshumidificador':[
 {title:'Uso y consumo',keys:['powerW','hoursPerDay','daysPerMonth','daysPerYear','price']},
 {title:'Dato nominal opcional',keys:['nominalLitresPerDay']}
],
'aislamiento/ahorro-cambio-ventanas':[
 {title:'Ventanas actual y nueva',keys:['areaM2','currentU','newU']},
 {title:'Escenario térmico',keys:['interiorTempC','exteriorTempC','equivalentHours','performance']},
 {title:'Economía',keys:['energyPrice','replacementCost']}
],
'reformas/mortero-necesario':[
 {title:'Geometría',keys:['areaM2','thicknessMm','marginPercent']},
 {title:'Producto y coste',keys:['yieldLitresPerBag','pricePerBag']}
],
'reformas/ladrillos-bloques-necesarios':[
 {title:'Pared y huecos',keys:['wallWidthM','wallHeightM','openingsAreaM2']},
 {title:'Pieza y juntas',keys:['pieceLengthCm','pieceHeightCm','horizontalJointMm','verticalJointMm','wastePercent']},
 {title:'Compra opcional',keys:['piecesPerPack','pricePerPiece','pricePerPack']}
]
};

export const getFormGroups=(tool)=>{
 const requested=FORM_GROUPS[tool.path];
 if(!requested)return [{title:'Variables del cálculo',keys:tool.fields.map(([key])=>key)}];
 const known=new Set(tool.fields.map(([key])=>key));
 const groups=requested.map(group=>({...group,keys:group.keys.filter(key=>known.has(key))})).filter(group=>group.keys.length);
 const assigned=new Set(groups.flatMap(group=>group.keys));
 const remaining=tool.fields.map(([key])=>key).filter(key=>!assigned.has(key));
 if(remaining.length)groups.push({title:'Otros datos',keys:remaining});
 return groups;
};
