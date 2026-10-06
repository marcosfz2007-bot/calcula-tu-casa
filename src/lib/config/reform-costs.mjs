export const REFORM_COSTS_META=Object.freeze({
  version:'1.0',
  checkedAt:'2026-10-06',
  unit:'EUR por unidad de cada partida',
  sources:Object.freeze([
    Object.freeze({
      label:'Junta de Andalucía · Base de Costes de la Construcción de Andalucía (BCCA), actualización enero 2024',
      url:'https://www.juntadeandalucia.es/organismos/viviendajuventudyordenaciondelterritorio/areas/vivienda-rehabilitacion/planes-instrumentos/paginas/bcca-ene-2024.html',
      note:'Base pública de referencia de ámbito andaluz. No se trasladan automáticamente sus importes a toda España.'
    }),
    Object.freeze({
      label:'BOE · Reglamento general de contratación, arts. 130-131',
      url:'https://www.boe.es/buscar/act.php?id=BOE-A-2001-19995',
      note:'Los presupuestos se construyen a partir de mediciones y precios unitarios; la herramienta sigue ese esquema sin inventar un precio nacional.'
    })
  ]),
  pricingPolicy:'Los precios unitarios bajo/central/alto son datos del usuario. El proyecto no precarga €/m² nacionales ni factores provinciales.'
});

const row=(key,label,quantityKey,unit,optional=false)=>Object.freeze({key,label,quantityKey,unit,optional});

export const REFORM_PRESETS=Object.freeze({
  'reform-integral':Object.freeze({
    title:'Partidas de reforma integral',
    globals:Object.freeze([
      Object.freeze({key:'area',label:'Superficie útil',unit:'m²',value:'90',min:1,max:1000}),
      Object.freeze({key:'bathrooms',label:'Número de baños',unit:'ud.',value:'1',min:0,max:20})
    ]),
    rows:Object.freeze([
      row('demolition','Demolición y desmontajes','area','m²'),
      row('partitions','Tabiquería / redistribución','fixed','partida',true),
      row('electricity','Instalación eléctrica','area','m²'),
      row('plumbing','Fontanería general','area','m²'),
      row('bathrooms','Reforma de baños','bathrooms','baño'),
      row('kitchen','Reforma de cocina','fixed','partida'),
      row('floors','Pavimentos','area','m²'),
      row('painting','Pintura','area','m²'),
      row('windows','Ventanas','fixed','partida',true),
      row('hvac','Climatización','fixed','partida',true),
      row('carpentry','Carpintería interior','fixed','partida',true),
      row('waste','Gestión de residuos','fixed','partida')
    ])
  }),
  'reform-bathroom':Object.freeze({
    title:'Partidas de reforma de baño',
    globals:Object.freeze([
      Object.freeze({key:'area',label:'Superficie de suelo',unit:'m²',value:'5',min:1,max:100}),
      Object.freeze({key:'wallArea',label:'Superficie de paredes a revestir',unit:'m²',value:'20',min:0,max:300})
    ]),
    rows:Object.freeze([
      row('demolition','Demolición','area','m²'),
      row('waste','Retirada y residuos','fixed','partida'),
      row('wallTiling','Alicatado / revestimiento','wallArea','m²'),
      row('flooring','Pavimento','area','m²'),
      row('plumbing','Fontanería','fixed','partida'),
      row('electricity','Electricidad','fixed','partida'),
      row('sanitary','Sanitarios','fixed','partida'),
      row('showerBath','Ducha o bañera','fixed','partida',true),
      row('screen','Mampara','fixed','partida',true),
      row('furniture','Mueble y lavabo','fixed','partida',true)
    ])
  }),
  'reform-kitchen':Object.freeze({
    title:'Partidas de reforma de cocina',
    globals:Object.freeze([
      Object.freeze({key:'area',label:'Superficie de suelo',unit:'m²',value:'10',min:1,max:200}),
      Object.freeze({key:'wallArea',label:'Superficie de paredes/revestimientos',unit:'m²',value:'20',min:0,max:500}),
      Object.freeze({key:'cabinetM',label:'Metros lineales de muebles',unit:'m',value:'5',min:0,max:50}),
      Object.freeze({key:'counterM',label:'Metros lineales de encimera',unit:'m',value:'4',min:0,max:50})
    ]),
    rows:Object.freeze([
      row('demolition','Demolición','area','m²'),
      row('waste','Retirada y residuos','fixed','partida'),
      row('cabinets','Mobiliario','cabinetM','m'),
      row('countertop','Encimera','counterM','m'),
      row('appliances','Electrodomésticos','fixed','partida',true),
      row('plumbing','Fontanería','fixed','partida'),
      row('electricity','Electricidad','fixed','partida'),
      row('flooring','Pavimento','area','m²'),
      row('wallCoverings','Revestimientos','wallArea','m²'),
      row('painting','Pintura','wallArea','m²',true)
    ])
  })
});
