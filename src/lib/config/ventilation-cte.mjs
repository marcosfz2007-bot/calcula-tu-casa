export const VENTILATION_CTE=Object.freeze({
  standard:'CTE DB-HS 3 · Calidad del aire interior',
  method:'Ventilación de caudal constante · tabla 2.1',
  version:'DB-HS vigente consultado 2026-10-06',
  checkedAt:'2026-10-06',
  source:'https://www.codigotecnico.org/pdf/Documentos/HS/DBHS.pdf',
  kitchenSpecificExtractionLs:50,
  rows:Object.freeze({
    one:Object.freeze({label:'0 ó 1 dormitorios',mainBedroomLs:8,otherBedroomLs:0,livingLs:6,wetTotalLs:12,wetPerRoomLs:6}),
    two:Object.freeze({label:'2 dormitorios',mainBedroomLs:8,otherBedroomLs:4,livingLs:8,wetTotalLs:24,wetPerRoomLs:7}),
    threePlus:Object.freeze({label:'3 o más dormitorios',mainBedroomLs:8,otherBedroomLs:4,livingLs:10,wetTotalLs:33,wetPerRoomLs:8})
  })
});
