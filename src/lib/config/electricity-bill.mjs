export const ELECTRICITY_BILL_REGULATION=Object.freeze({
  checkedAt:'2026-10-06',
  electricityTax:Object.freeze({
    valuePercent:5.11269632,
    minimumDomesticEuroPerMwh:1,
    applicablePeriod:'octubre de 2026',
    source:'https://www.boe.es/buscar/act.php?id=BOE-A-1992-28741',
    note:'Tipo general del artículo 99. Las salvaguardas extraordinarias del RDL 25/2026 se prevén para noviembre/diciembre si se cumplen sus condiciones.'
  }),
  vat:Object.freeze({
    valuePercent:21,
    applicablePeriod:'octubre de 2026',
    source:'https://www.boe.es/buscar/act.php?id=BOE-A-1992-28740',
    note:'Tipo general del artículo 90; la herramienta permite editarlo si la factura aplica otro tipo.'
  }),
  meterRentalReference:Object.freeze({
    monophaseSmartEuroPerMonth:0.81,
    validFrom:'2013-08-03',
    source:'https://www.boe.es/buscar/act.php?id=BOE-A-2013-8561',
    note:'Referencia regulada para contador electrónico monofásico con discriminación horaria y telegestión. Se introduce como importe del periodo, no se aplica automáticamente.'
  }),
  safeguards2026:Object.freeze({
    source:'https://www.boe.es/buscar/act.php?id=BOE-A-2026-20265',
    note:'RDL 25/2026: posibles tipos reducidos condicionados para noviembre y diciembre de 2026; no se aplican automáticamente a octubre.'
  })
});
