import test from 'node:test';
import assert from 'node:assert/strict';
import {calculatePaint} from '../src/lib/calculators/paint.mjs';
import {calculateTiles} from '../src/lib/calculators/tiles.mjs';
import {calculateLaminate} from '../src/lib/calculators/laminate.mjs';
import {calculateSkirting} from '../src/lib/calculators/skirting.mjs';
import {calculateWallpaper} from '../src/lib/calculators/wallpaper.mjs';
import {calculateLightingLux} from '../src/lib/calculators/lighting-lux.mjs';
import {calculateLedSavings} from '../src/lib/calculators/led-savings.mjs';
import {calculateStandby} from '../src/lib/calculators/standby.mjs';
import {calculateEvCharging} from '../src/lib/calculators/ev-charging.mjs';
import {calculateSolarBattery} from '../src/lib/calculators/solar-battery.mjs';

const near=(actual,expected,tolerance=1e-8)=>assert.ok(Math.abs(actual-expected)<=tolerance,`${actual} ≠ ${expected}`);

// 22. Pintura
const paint={length:5,width:4,height:'2,5',openingsArea:5,coats:2,coverage:10,marginPercent:10,canLitres:5,paintWalls:true,paintCeiling:false};
test('Pintura · normal',()=>{const r=calculatePaint(paint);near(r.wallsArea,45);near(r.netArea,40);near(r.theoreticalLitres,8);near(r.litres,8.8);assert.equal(r.cans,2);near(r.leftoverLitres,1.2);});
test('Pintura · mínimo',()=>assert.doesNotThrow(()=>calculatePaint({length:.1,width:.1,height:.1,openingsArea:0,coats:1,coverage:1000,marginPercent:0,canLitres:'',paintWalls:true,paintCeiling:false})));
test('Pintura · máximo razonable',()=>assert.doesNotThrow(()=>calculatePaint({length:1000,width:1000,height:100,openingsArea:0,coats:20,coverage:.01,marginPercent:200,canLitres:10000,paintWalls:true,paintCeiling:true})));
test('Pintura · cero margen y huecos',()=>{const r=calculatePaint({...paint,openingsArea:0,marginPercent:0});near(r.litres,9);});
test('Pintura · negativo',()=>assert.throws(()=>calculatePaint({...paint,length:-1}),RangeError));
test('Pintura · vacío',()=>assert.throws(()=>calculatePaint({...paint,coverage:''}),RangeError));
test('Pintura · decimal con coma',()=>near(calculatePaint({...paint,height:'2,5'}).wallsArea,45));
test('Pintura · manual techo 20 m2 una mano',()=>near(calculatePaint({length:5,width:4,height:2.5,openingsArea:0,coats:1,coverage:10,marginPercent:0,canLitres:'',paintWalls:false,paintCeiling:true}).litres,2));
test('Pintura · exige alguna superficie',()=>assert.throws(()=>calculatePaint({...paint,paintWalls:false,paintCeiling:false}),RangeError));

// 23. Azulejos
const tiles={surfaceM2:10,pieceWidthCm:30,pieceLengthCm:60,wastePercent:10,boxMode:'pieces',piecesPerBox:8,coveragePerBoxM2:'',pricePerBox:20};
test('Azulejos · normal',()=>{const r=calculateTiles(tiles);near(r.pieceAreaM2,.18);assert.equal(r.piecesToBuy,62);assert.equal(r.boxes,8);near(r.purchasedAreaM2,11.52);near(r.cost,160);});
test('Azulejos · mínimo',()=>assert.doesNotThrow(()=>calculateTiles({surfaceM2:0,pieceWidthCm:.1,pieceLengthCm:.1,wastePercent:0,boxMode:'pieces',piecesPerBox:1,pricePerBox:''})));
test('Azulejos · máximo razonable',()=>assert.doesNotThrow(()=>calculateTiles({surfaceM2:100000,pieceWidthCm:1000,pieceLengthCm:1000,wastePercent:200,boxMode:'coverage',coveragePerBoxM2:10000,pricePerBox:100000})));
test('Azulejos · cero desperdicio',()=>assert.equal(calculateTiles({...tiles,wastePercent:0}).piecesToBuy,56));
test('Azulejos · negativo',()=>assert.throws(()=>calculateTiles({...tiles,surfaceM2:-1}),RangeError));
test('Azulejos · vacío',()=>assert.throws(()=>calculateTiles({...tiles,pieceWidthCm:''}),RangeError));
test('Azulejos · decimal con coma',()=>near(calculateTiles({...tiles,pieceWidthCm:'30,0'}).pieceAreaM2,.18));
test('Azulejos · manual 1 m2 con piezas 50x50',()=>{const r=calculateTiles({surfaceM2:1,pieceWidthCm:50,pieceLengthCm:50,wastePercent:0,boxMode:'pieces',piecesPerBox:2,pricePerBox:''});assert.equal(r.piecesToBuy,4);assert.equal(r.boxes,2);});
test('Azulejos · modo m2 por caja alternativo',()=>{const r=calculateTiles({...tiles,boxMode:'coverage',coveragePerBoxM2:2,piecesPerBox:''});assert.equal(r.boxes,6);near(r.purchasedAreaM2,12);});

// 24. Laminado
const laminate={rooms:[{name:'A',length:5,width:4,area:''},{name:'B',length:'',width:'',area:10}],wastePercent:10,coveragePerBoxM2:2,pricePerBox:30};
test('Laminado · normal',()=>{const r=calculateLaminate(laminate);near(r.surfaceM2,30);near(r.purchaseTargetM2,33);assert.equal(r.boxes,17);near(r.purchasedM2,34);near(r.cost,510);});
test('Laminado · mínimo',()=>assert.doesNotThrow(()=>calculateLaminate({rooms:[{area:0,length:'',width:''}],wastePercent:0,coveragePerBoxM2:.001,pricePerBox:''})));
test('Laminado · máximo razonable',()=>assert.doesNotThrow(()=>calculateLaminate({rooms:[{area:100000,length:'',width:''}],wastePercent:200,coveragePerBoxM2:10000,pricePerBox:100000})));
test('Laminado · cero desperdicio',()=>assert.equal(calculateLaminate({...laminate,wastePercent:0}).boxes,15));
test('Laminado · negativo',()=>assert.throws(()=>calculateLaminate({...laminate,rooms:[{area:-1}]}),RangeError));
test('Laminado · vacío',()=>assert.throws(()=>calculateLaminate({...laminate,coveragePerBoxM2:''}),RangeError));
test('Laminado · decimal con coma',()=>near(calculateLaminate({...laminate,coveragePerBoxM2:'2,0'}).purchasedM2,34));
test('Laminado · superficie manual tiene prioridad',()=>near(calculateLaminate({rooms:[{length:100,width:100,area:12}],wastePercent:0,coveragePerBoxM2:2,pricePerBox:''}).surfaceM2,12));
test('Laminado · varias estancias se suman',()=>near(calculateLaminate({rooms:[{length:2,width:3,area:''},{length:4,width:5,area:''}],wastePercent:0,coveragePerBoxM2:2,pricePerBox:''}).surfaceM2,26));

// 25. Rodapié
const skirting={length:5,width:4,openingsM:'0,8',marginPercent:10,pieceLengthM:'2,4',piecesPerPack:4,pricePerPiece:'',pricePerPack:20};
test('Rodapié · normal',()=>{const r=calculateSkirting(skirting);near(r.perimeterM,18);near(r.netM,17.2);near(r.purchaseTargetM,18.92);assert.equal(r.pieces,8);assert.equal(r.packs,2);near(r.cost,40);});
test('Rodapié · mínimo',()=>assert.doesNotThrow(()=>calculateSkirting({length:0,width:0,openingsM:0,marginPercent:0,pieceLengthM:.01,piecesPerPack:'',pricePerPiece:'',pricePerPack:''})));
test('Rodapié · máximo razonable',()=>assert.doesNotThrow(()=>calculateSkirting({length:1000,width:1000,openingsM:0,marginPercent:200,pieceLengthM:100,piecesPerPack:10000,pricePerPiece:'',pricePerPack:100000})));
test('Rodapié · cero margen',()=>assert.equal(calculateSkirting({...skirting,marginPercent:0}).pieces,8));
test('Rodapié · negativo',()=>assert.throws(()=>calculateSkirting({...skirting,width:-1}),RangeError));
test('Rodapié · vacío',()=>assert.throws(()=>calculateSkirting({...skirting,pieceLengthM:''}),RangeError));
test('Rodapié · decimal con coma',()=>near(calculateSkirting({...skirting,pieceLengthM:'2,4'}).purchasedM,19.2));
test('Rodapié · manual perímetro 10m',()=>{const r=calculateSkirting({length:3,width:2,openingsM:0,marginPercent:0,pieceLengthM:2,piecesPerPack:'',pricePerPiece:'',pricePerPack:''});assert.equal(r.pieces,5);});
test('Rodapié · rechaza doble precio',()=>assert.throws(()=>calculateSkirting({...skirting,pricePerPiece:10,pricePerPack:20}),RangeError));

// 26. Papel pintado
const wallpaper={wallWidthM:5,heightM:'2,5',rollWidthM:'0,53',rollLengthM:10,repeatM:'0,53',trimMarginM:'0,1',extraPercent:0};
test('Papel pintado · normal',()=>{const r=calculateWallpaper(wallpaper);near(r.stripLengthM,2.65);assert.equal(r.baseStrips,10);assert.equal(r.stripsPerRoll,3);assert.equal(r.rolls,4);});
test('Papel pintado · mínimo',()=>assert.doesNotThrow(()=>calculateWallpaper({wallWidthM:0,heightM:.01,rollWidthM:.01,rollLengthM:.01,repeatM:0,trimMarginM:0,extraPercent:0})));
test('Papel pintado · máximo razonable',()=>assert.doesNotThrow(()=>calculateWallpaper({wallWidthM:10000,heightM:100,rollWidthM:10,rollLengthM:1000,repeatM:10,trimMarginM:10,extraPercent:200})));
test('Papel pintado · rapport cero',()=>near(calculateWallpaper({...wallpaper,repeatM:0}).stripLengthM,2.6));
test('Papel pintado · negativo',()=>assert.throws(()=>calculateWallpaper({...wallpaper,wallWidthM:-1}),RangeError));
test('Papel pintado · vacío',()=>assert.throws(()=>calculateWallpaper({...wallpaper,rollWidthM:''}),RangeError));
test('Papel pintado · decimal con coma',()=>near(calculateWallpaper({...wallpaper,heightM:'2,5'}).rawStripLength,2.6));
test('Papel pintado · manual sin rapport',()=>{const r=calculateWallpaper({wallWidthM:2,heightM:2,rollWidthM:.5,rollLengthM:10,repeatM:0,trimMarginM:0,extraPercent:0});assert.equal(r.stripsNeeded,4);assert.equal(r.stripsPerRoll,5);assert.equal(r.rolls,1);});
test('Papel pintado · rollo demasiado corto falla',()=>assert.throws(()=>calculateWallpaper({...wallpaper,rollLengthM:2}),RangeError));

// 27. Iluminación lux
const lux={areaM2:20,targetLux:300,lumensPerFixture:1000,utilizationFactor:'0,8',maintenanceFactor:'0,9'};
test('Lux · normal',()=>{const r=calculateLightingLux(lux);near(r.usefulLumensRequired,6000);near(r.effectiveLumensPerFixture,720);assert.equal(r.fixtures,9);near(r.estimatedLux,324);});
test('Lux · mínimo',()=>assert.doesNotThrow(()=>calculateLightingLux({areaM2:0,targetLux:0,lumensPerFixture:.01,utilizationFactor:.001,maintenanceFactor:.001})));
test('Lux · máximo razonable',()=>assert.doesNotThrow(()=>calculateLightingLux({areaM2:100000,targetLux:100000,lumensPerFixture:10000000,utilizationFactor:1,maintenanceFactor:1})));
test('Lux · cero objetivo',()=>assert.equal(calculateLightingLux({...lux,targetLux:0}).fixtures,0));
test('Lux · negativo',()=>assert.throws(()=>calculateLightingLux({...lux,targetLux:-1}),RangeError));
test('Lux · vacío',()=>assert.throws(()=>calculateLightingLux({...lux,lumensPerFixture:''}),RangeError));
test('Lux · decimal con coma',()=>near(calculateLightingLux({...lux,utilizationFactor:'0,8'}).effectiveLumensPerFixture,720));
test('Lux · manual 1 lx = 1 lm/m2',()=>{const r=calculateLightingLux({areaM2:10,targetLux:100,lumensPerFixture:1000,utilizationFactor:1,maintenanceFactor:1});near(r.usefulLumensRequired,1000);assert.equal(r.fixtures,1);});

// 28. LED
const led={bulbs:10,currentWatts:60,ledWatts:9,hoursPerDay:4,daysPerYear:365,price:'0,20',investment:100};
test('LED · normal',()=>{const r=calculateLedSavings(led);near(r.currentKwh,876);near(r.ledKwh,131.4);near(r.savingKwh,744.6);near(r.annualSaving,148.92);});
test('LED · mínimo',()=>assert.doesNotThrow(()=>calculateLedSavings({bulbs:0,currentWatts:0,ledWatts:0,hoursPerDay:0,daysPerYear:0,price:0,investment:''})));
test('LED · máximo razonable',()=>assert.doesNotThrow(()=>calculateLedSavings({bulbs:100000,currentWatts:100000,ledWatts:100000,hoursPerDay:24,daysPerYear:366,price:10,investment:1000000})));
test('LED · precio cero',()=>near(calculateLedSavings({...led,price:0}).annualSaving,0));
test('LED · negativo',()=>assert.throws(()=>calculateLedSavings({...led,ledWatts:-1}),RangeError));
test('LED · vacío',()=>assert.throws(()=>calculateLedSavings({...led,hoursPerDay:''}),RangeError));
test('LED · decimal con coma',()=>near(calculateLedSavings({...led,price:'0,20'}).annualSaving,148.92));
test('LED · manual 1 bombilla',()=>{const r=calculateLedSavings({bulbs:1,currentWatts:100,ledWatts:50,hoursPerDay:10,daysPerYear:100,price:1,investment:50});near(r.currentKwh,100);near(r.ledKwh,50);near(r.paybackYears,1);});
test('LED · sin ahorro no fuerza payback',()=>assert.equal(calculateLedSavings({...led,ledWatts:80}).paybackYears,null));

// 29. Standby
const standby={price:'0,20',reductionPercent:100,items:[{name:'TV',watts:2,units:1,hoursPerDay:24,daysPerYear:365},{name:'Router',watts:10,units:1,hoursPerDay:24,daysPerYear:365}]};
test('Standby · normal',()=>{const r=calculateStandby(standby);near(r.totalKwh,105.12);near(r.totalCost,21.024);assert.equal(r.items[0].name,'Router');});
test('Standby · mínimo',()=>assert.doesNotThrow(()=>calculateStandby({price:0,reductionPercent:0,items:[{watts:0,units:0,hoursPerDay:0,daysPerYear:0}]})));
test('Standby · máximo razonable',()=>assert.doesNotThrow(()=>calculateStandby({price:10,reductionPercent:100,items:[{watts:100000,units:100000,hoursPerDay:24,daysPerYear:366}]})));
test('Standby · precio cero',()=>near(calculateStandby({...standby,price:0}).totalCost,0));
test('Standby · negativo',()=>assert.throws(()=>calculateStandby({...standby,items:[{watts:-1,units:1,hoursPerDay:1,daysPerYear:1}]}),RangeError));
test('Standby · vacío',()=>assert.throws(()=>calculateStandby({...standby,items:[{watts:'',units:1,hoursPerDay:1,daysPerYear:1}]}),RangeError));
test('Standby · decimal con coma',()=>near(calculateStandby({...standby,price:'0,20'}).totalCost,21.024));
test('Standby · manual 2 W continuo',()=>near(calculateStandby({price:1,reductionPercent:100,items:[{watts:2,units:1,hoursPerDay:24,daysPerYear:365}]}).totalKwh,17.52));
test('Standby · reducción parcial',()=>near(calculateStandby({...standby,reductionPercent:50}).potentialSavingKwh,52.56));

// 30. Recarga VE
const ev={mode:'battery',batteryCapacityKwh:60,socInitial:20,socTarget:70,manualEnergyKwh:'',chargerPowerKw:'7,4',vehicleAcLimitKw:11,efficiencyPercent:90,price:'0,20',consumptionKwh100:15};
test('VE · normal',()=>{const r=calculateEvCharging(ev);near(r.storedEnergyKwh,30);near(r.gridEnergyKwh,33.333333333333336);near(r.effectivePowerKw,7.4);near(r.cost,6.666666666666668);near(r.rangeKm,200);});
test('VE · mínimo',()=>assert.doesNotThrow(()=>calculateEvCharging({mode:'manual',manualEnergyKwh:0,chargerPowerKw:.01,vehicleAcLimitKw:'',efficiencyPercent:.01,price:0,consumptionKwh100:''})));
test('VE · máximo razonable',()=>assert.doesNotThrow(()=>calculateEvCharging({mode:'manual',manualEnergyKwh:1000,chargerPowerKw:1000,vehicleAcLimitKw:1000,efficiencyPercent:100,price:10,consumptionKwh100:200})));
test('VE · precio cero',()=>near(calculateEvCharging({...ev,price:0}).cost,0));
test('VE · negativo',()=>assert.throws(()=>calculateEvCharging({...ev,chargerPowerKw:-1}),RangeError));
test('VE · vacío',()=>assert.throws(()=>calculateEvCharging({...ev,efficiencyPercent:''}),RangeError));
test('VE · decimal con coma',()=>near(calculateEvCharging({...ev,chargerPowerKw:'7,4'}).effectivePowerKw,7.4));
test('VE · manual energía / potencia',()=>{const r=calculateEvCharging({mode:'manual',manualEnergyKwh:20,chargerPowerKw:10,vehicleAcLimitKw:'',efficiencyPercent:100,price:1,consumptionKwh100:''});near(r.timeHours,2);near(r.cost,20);});
test('VE · limita por cargador AC del vehículo',()=>near(calculateEvCharging({...ev,chargerPowerKw:22,vehicleAcLimitKw:11}).effectivePowerKw,11));
test('VE · exige SOC objetivo mayor',()=>assert.throws(()=>calculateEvCharging({...ev,socTarget:20}),RangeError));

// 31. Batería solar
const battery={dailyShiftKwh:5,autonomyDays:1,usableFractionPercent:90,roundTripEfficiencyPercent:85,dailySurplusKwh:7,requiredPowerKw:3,moduleCapacityKwh:5};
test('Batería · normal',()=>{const r=calculateSolarBattery(battery);near(r.usefulTargetKwh,5);near(r.nominalCapacityKwh,5/0.9);near(r.chargeInputKwh,5/0.85);assert.equal(r.modules,2);assert.equal(r.surplusSufficient,true);});
test('Batería · mínimo',()=>assert.doesNotThrow(()=>calculateSolarBattery({dailyShiftKwh:0,autonomyDays:0,usableFractionPercent:.01,roundTripEfficiencyPercent:.01,dailySurplusKwh:'',requiredPowerKw:'',moduleCapacityKwh:''})));
test('Batería · máximo razonable',()=>assert.doesNotThrow(()=>calculateSolarBattery({dailyShiftKwh:10000,autonomyDays:30,usableFractionPercent:100,roundTripEfficiencyPercent:100,dailySurplusKwh:10000,requiredPowerKw:1000,moduleCapacityKwh:1000})));
test('Batería · cero energía',()=>near(calculateSolarBattery({...battery,dailyShiftKwh:0}).nominalCapacityKwh,0));
test('Batería · negativo',()=>assert.throws(()=>calculateSolarBattery({...battery,dailyShiftKwh:-1}),RangeError));
test('Batería · vacío',()=>assert.throws(()=>calculateSolarBattery({...battery,usableFractionPercent:''}),RangeError));
test('Batería · decimal con coma',()=>near(calculateSolarBattery({...battery,usableFractionPercent:'90,0'}).nominalCapacityKwh,5/0.9));
test('Batería · manual capacidad nominal',()=>near(calculateSolarBattery({dailyShiftKwh:8,autonomyDays:1,usableFractionPercent:80,roundTripEfficiencyPercent:100,dailySurplusKwh:'',requiredPowerKw:'',moduleCapacityKwh:''}).nominalCapacityKwh,10));
test('Batería · kW permanece independiente de kWh',()=>{const r=calculateSolarBattery(battery);near(r.requiredPowerKw,3);assert.notEqual(r.requiredPowerKw,r.nominalCapacityKwh);});
test('Batería · detecta excedente insuficiente',()=>{const r=calculateSolarBattery({...battery,dailySurplusKwh:2});assert.equal(r.surplusSufficient,false);assert.ok(r.surplusShortfallKwh>0);});
