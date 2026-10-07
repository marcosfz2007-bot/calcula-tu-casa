import test from 'node:test';
import assert from 'node:assert/strict';
import {calculateThermalLoss} from '../src/lib/calculators/thermal-loss.mjs';
import {calculateDehumidifier} from '../src/lib/calculators/dehumidifier.mjs';
import {calculateWindowSavings} from '../src/lib/calculators/window-savings.mjs';
import {calculateConcrete} from '../src/lib/calculators/concrete.mjs';
import {calculateMortar} from '../src/lib/calculators/mortar.mjs';
import {calculateMasonryUnits} from '../src/lib/calculators/masonry-units.mjs';
import {calculateWaterproofing} from '../src/lib/calculators/waterproofing.mjs';
import {calculateWaterTank} from '../src/lib/calculators/water-tank.mjs';

const near=(actual,expected,tolerance=1e-8)=>assert.ok(Math.abs(actual-expected)<=tolerance,`${actual} ≠ ${expected}`);

// 32. Pérdida térmica
const thermal={interiorTempC:20,exteriorTempC:0,elements:[{name:'Pared',areaM2:10,uValue:'0,5'},{name:'Ventana',areaM2:2,uValue:2}]};
test('Pérdida térmica · normal',()=>{const r=calculateThermalLoss(thermal);near(r.deltaT,20);near(r.totalW,180);near(r.totalKw,.18);assert.equal(r.elements[0].name,'Pared');near(r.elements[0].percentage,100/180*100);});
test('Pérdida térmica · mínimo razonable',()=>assert.doesNotThrow(()=>calculateThermalLoss({interiorTempC:0,exteriorTempC:0,elements:[{areaM2:0,uValue:.001}]})));
test('Pérdida térmica · máximo razonable',()=>assert.doesNotThrow(()=>calculateThermalLoss({interiorTempC:100,exteriorTempC:-100,elements:[{areaM2:100000,uValue:20}]})));
test('Pérdida térmica · delta T cero',()=>near(calculateThermalLoss({...thermal,exteriorTempC:20}).totalW,0));
test('Pérdida térmica · negativo',()=>assert.throws(()=>calculateThermalLoss({...thermal,elements:[{areaM2:-1,uValue:1}]}),RangeError));
test('Pérdida térmica · vacío',()=>assert.throws(()=>calculateThermalLoss({...thermal,elements:[{areaM2:1,uValue:''}]}),RangeError));
test('Pérdida térmica · inválido NaN',()=>assert.throws(()=>calculateThermalLoss({...thermal,interiorTempC:'abc'}),RangeError));
test('Pérdida térmica · decimal con coma',()=>near(calculateThermalLoss(thermal).elements.find(x=>x.name==='Pared').uValue,.5));
test('Pérdida térmica · decimal con punto',()=>near(calculateThermalLoss({...thermal,elements:[{name:'A',areaM2:'2.5',uValue:'0.4'}]}).totalW,20));
test('Pérdida térmica · manual U A delta T',()=>near(calculateThermalLoss({interiorTempC:20,exteriorTempC:10,elements:[{areaM2:5,uValue:2}]}).totalW,100));
test('Pérdida térmica · suma y ranking',()=>{const r=calculateThermalLoss({interiorTempC:20,exteriorTempC:10,elements:[{name:'A',areaM2:10,uValue:1},{name:'B',areaM2:2,uValue:2}]});near(r.totalW,140);assert.deepEqual(r.elements.map(x=>x.name),['A','B']);});
test('Pérdida térmica · rechazo exterior más caliente',()=>assert.throws(()=>calculateThermalLoss({...thermal,interiorTempC:10,exteriorTempC:20}),RangeError));

// 33. Deshumidificador
const dehum={powerW:300,hoursPerDay:5,daysPerMonth:20,daysPerYear:200,price:'0,20',nominalLitresPerDay:12};
test('Deshumidificador · normal',()=>{const r=calculateDehumidifier(dehum);near(r.dailyKwh,1.5);near(r.monthlyKwh,30);near(r.annualKwh,300);near(r.annualCost,60);near(r.nominalWhPerL,600);});
test('Deshumidificador · mínimo razonable',()=>assert.doesNotThrow(()=>calculateDehumidifier({powerW:0,hoursPerDay:0,daysPerMonth:0,daysPerYear:0,price:0,nominalLitresPerDay:''})));
test('Deshumidificador · máximo razonable',()=>assert.doesNotThrow(()=>calculateDehumidifier({powerW:100000,hoursPerDay:24,daysPerMonth:31,daysPerYear:366,price:10,nominalLitresPerDay:1000})));
test('Deshumidificador · horas cero',()=>near(calculateDehumidifier({...dehum,hoursPerDay:0}).annualKwh,0));
test('Deshumidificador · negativo',()=>assert.throws(()=>calculateDehumidifier({...dehum,powerW:-1}),RangeError));
test('Deshumidificador · vacío',()=>assert.throws(()=>calculateDehumidifier({...dehum,hoursPerDay:''}),RangeError));
test('Deshumidificador · inválido NaN',()=>assert.throws(()=>calculateDehumidifier({...dehum,price:'x'}),RangeError));
test('Deshumidificador · decimal con coma',()=>near(calculateDehumidifier({...dehum,hoursPerDay:'2,5'}).dailyKwh,.75));
test('Deshumidificador · decimal con punto',()=>near(calculateDehumidifier({...dehum,hoursPerDay:'2.5'}).dailyKwh,.75));
test('Deshumidificador · manual W a kWh y coste',()=>{const r=calculateDehumidifier({powerW:1000,hoursPerDay:2,daysPerMonth:10,daysPerYear:100,price:.5,nominalLitresPerDay:''});near(r.dailyKwh,2);near(r.monthlyKwh,20);near(r.annualKwh,200);near(r.annualCost,100);});

// 34. Ventanas
const windows={areaM2:10,currentU:3,newU:'1,5',interiorTempC:20,exteriorTempC:5,equivalentHours:1000,performance:'0,9',energyPrice:'0,10',replacementCost:1000};
test('Ventanas · normal',()=>{const r=calculateWindowSavings(windows);near(r.currentPowerW,450);near(r.newPowerW,225);near(r.thermalEnergySavedKwh,225);near(r.purchasedEnergySavedKwh,250);near(r.annualSaving,25);near(r.paybackYears,40);});
test('Ventanas · mínimo razonable',()=>assert.doesNotThrow(()=>calculateWindowSavings({areaM2:0,currentU:.001,newU:.001,interiorTempC:0,exteriorTempC:0,equivalentHours:0,performance:.01,energyPrice:0,replacementCost:''})));
test('Ventanas · máximo razonable',()=>assert.doesNotThrow(()=>calculateWindowSavings({areaM2:100000,currentU:20,newU:.001,interiorTempC:100,exteriorTempC:-100,equivalentHours:8760,performance:20,energyPrice:10,replacementCost:10000000})));
test('Ventanas · U igual ahorro cero',()=>near(calculateWindowSavings({...windows,newU:3}).annualSaving,0));
test('Ventanas · negativo',()=>assert.throws(()=>calculateWindowSavings({...windows,areaM2:-1}),RangeError));
test('Ventanas · vacío',()=>assert.throws(()=>calculateWindowSavings({...windows,currentU:''}),RangeError));
test('Ventanas · inválido NaN',()=>assert.throws(()=>calculateWindowSavings({...windows,performance:'abc'}),RangeError));
test('Ventanas · decimal con coma',()=>near(calculateWindowSavings(windows).newU,1.5));
test('Ventanas · decimal con punto',()=>near(calculateWindowSavings({...windows,newU:'1.5'}).newU,1.5));
test('Ventanas · manual transmisión',()=>{const r=calculateWindowSavings({areaM2:10,currentU:2,newU:1,interiorTempC:20,exteriorTempC:10,equivalentHours:1000,performance:1,energyPrice:1,replacementCost:''});near(r.avoidedPowerW,100);near(r.thermalEnergySavedKwh,100);near(r.annualSaving,100);});
test('Ventanas · U nueva peor no presenta ahorro',()=>{const r=calculateWindowSavings({...windows,newU:4});assert.equal(r.improves,false);near(r.avoidedPowerW,0);near(r.annualSaving,0);assert.equal(r.paybackYears,null);});
test('Ventanas · COP convierte energía comprada',()=>near(calculateWindowSavings({...windows,performance:4,replacementCost:''}).purchasedEnergySavedKwh,56.25));

// 35. Hormigón
const concrete={zones:[{name:'Losa',lengthM:4,widthM:3,thickness:10,thicknessUnit:'cm'}],marginPercent:10,yieldLitresPerBag:12,pricePerM3:'',pricePerBag:5};
test('Hormigón · normal',()=>{const r=calculateConcrete(concrete);near(r.theoreticalM3,1.2);near(r.purchaseM3,1.32);near(r.purchaseLitres,1320);assert.equal(r.bags,110);near(r.cost,550);});
test('Hormigón · mínimo razonable',()=>assert.doesNotThrow(()=>calculateConcrete({zones:[{lengthM:0,widthM:0,thickness:0,thicknessUnit:'cm'}],marginPercent:0,yieldLitresPerBag:'',pricePerM3:'',pricePerBag:''})));
test('Hormigón · máximo razonable',()=>assert.doesNotThrow(()=>calculateConcrete({zones:[{lengthM:10000,widthM:10000,thickness:10000,thicknessUnit:'m'}],marginPercent:200,yieldLitresPerBag:10000,pricePerM3:1000000,pricePerBag:''})));
test('Hormigón · margen cero',()=>near(calculateConcrete({...concrete,marginPercent:0}).purchaseM3,1.2));
test('Hormigón · negativo',()=>assert.throws(()=>calculateConcrete({...concrete,zones:[{lengthM:-1,widthM:1,thickness:1,thicknessUnit:'m'}]}),RangeError));
test('Hormigón · vacío',()=>assert.throws(()=>calculateConcrete({...concrete,zones:[{lengthM:1,widthM:1,thickness:'',thicknessUnit:'cm'}]}),RangeError));
test('Hormigón · inválido NaN',()=>assert.throws(()=>calculateConcrete({...concrete,marginPercent:'abc'}),RangeError));
test('Hormigón · decimal con coma',()=>near(calculateConcrete({...concrete,zones:[{lengthM:'4,0',widthM:3,thickness:10,thicknessUnit:'cm'}]}).theoreticalM3,1.2));
test('Hormigón · decimal con punto',()=>near(calculateConcrete({...concrete,zones:[{lengthM:'4.0',widthM:3,thickness:10,thicknessUnit:'cm'}]}).theoreticalM3,1.2));
test('Hormigón · manual cm a m',()=>near(calculateConcrete({zones:[{lengthM:2,widthM:5,thickness:20,thicknessUnit:'cm'}],marginPercent:0,yieldLitresPerBag:'',pricePerM3:'',pricePerBag:''}).theoreticalM3,2));
test('Hormigón · suma varias zonas',()=>near(calculateConcrete({zones:[{lengthM:1,widthM:1,thickness:1,thicknessUnit:'m'},{lengthM:2,widthM:1,thickness:50,thicknessUnit:'cm'}],marginPercent:0,yieldLitresPerBag:'',pricePerM3:'',pricePerBag:''}).theoreticalM3,2));
test('Hormigón · sacos usan ceil',()=>assert.equal(calculateConcrete({zones:[{lengthM:1,widthM:1,thickness:10,thicknessUnit:'cm'}],marginPercent:0,yieldLitresPerBag:12,pricePerM3:'',pricePerBag:''}).bags,9));
test('Hormigón · precios alternativos',()=>assert.throws(()=>calculateConcrete({...concrete,pricePerM3:100,pricePerBag:5}),RangeError));

// 36. Mortero
const mortar={areaM2:20,thicknessMm:10,marginPercent:10,yieldLitresPerBag:15,pricePerBag:5};
test('Mortero · normal',()=>{const r=calculateMortar(mortar);near(r.theoreticalM3,.2);near(r.theoreticalLitres,200);near(r.purchaseLitres,220);assert.equal(r.bags,15);near(r.cost,75);});
test('Mortero · mínimo razonable',()=>assert.doesNotThrow(()=>calculateMortar({areaM2:0,thicknessMm:0,marginPercent:0,yieldLitresPerBag:'',pricePerBag:''})));
test('Mortero · máximo razonable',()=>assert.doesNotThrow(()=>calculateMortar({areaM2:100000,thicknessMm:10000,marginPercent:200,yieldLitresPerBag:10000,pricePerBag:100000})));
test('Mortero · margen cero',()=>near(calculateMortar({...mortar,marginPercent:0}).purchaseLitres,200));
test('Mortero · negativo',()=>assert.throws(()=>calculateMortar({...mortar,thicknessMm:-1}),RangeError));
test('Mortero · vacío',()=>assert.throws(()=>calculateMortar({...mortar,areaM2:''}),RangeError));
test('Mortero · inválido NaN',()=>assert.throws(()=>calculateMortar({...mortar,marginPercent:'abc'}),RangeError));
test('Mortero · decimal con coma',()=>near(calculateMortar({...mortar,thicknessMm:'10,0'}).theoreticalLitres,200));
test('Mortero · decimal con punto',()=>near(calculateMortar({...mortar,thicknessMm:'10.0'}).theoreticalLitres,200));
test('Mortero · manual mm a m',()=>near(calculateMortar({areaM2:10,thicknessMm:20,marginPercent:0,yieldLitresPerBag:'',pricePerBag:''}).theoreticalM3,.2));
test('Mortero · sacos usan ceil',()=>assert.equal(calculateMortar({areaM2:1,thicknessMm:100,marginPercent:0,yieldLitresPerBag:12,pricePerBag:''}).bags,9));

// 37. Ladrillos y bloques
const masonry={wallWidthM:5,wallHeightM:3,openingsAreaM2:3,pieceLengthCm:24,pieceHeightCm:'11,5',horizontalJointMm:10,verticalJointMm:10,wastePercent:5,piecesPerPack:100,pricePerPiece:'',pricePerPack:50};
test('Ladrillos · normal',()=>{const r=calculateMasonryUnits(masonry);near(r.netAreaM2,12);near(r.moduleAreaM2,.03125);near(r.theoreticalPieces,384);assert.equal(r.pieces,404);assert.equal(r.packs,5);assert.equal(r.leftoverPieces,96);near(r.cost,250);});
test('Ladrillos · mínimo razonable',()=>assert.doesNotThrow(()=>calculateMasonryUnits({wallWidthM:0,wallHeightM:0,openingsAreaM2:0,pieceLengthCm:.01,pieceHeightCm:.01,horizontalJointMm:0,verticalJointMm:0,wastePercent:0,piecesPerPack:'',pricePerPiece:'',pricePerPack:''})));
test('Ladrillos · máximo razonable',()=>assert.doesNotThrow(()=>calculateMasonryUnits({wallWidthM:10000,wallHeightM:1000,openingsAreaM2:0,pieceLengthCm:1000,pieceHeightCm:1000,horizontalJointMm:1000,verticalJointMm:1000,wastePercent:200,piecesPerPack:100000,pricePerPiece:100000,pricePerPack:''})));
test('Ladrillos · desperdicio cero',()=>assert.equal(calculateMasonryUnits({...masonry,wastePercent:0}).pieces,384));
test('Ladrillos · negativo',()=>assert.throws(()=>calculateMasonryUnits({...masonry,verticalJointMm:-1}),RangeError));
test('Ladrillos · vacío',()=>assert.throws(()=>calculateMasonryUnits({...masonry,pieceLengthCm:''}),RangeError));
test('Ladrillos · inválido NaN',()=>assert.throws(()=>calculateMasonryUnits({...masonry,wastePercent:'abc'}),RangeError));
test('Ladrillos · decimal con coma',()=>near(calculateMasonryUnits(masonry).pieceHeightCm,11.5));
test('Ladrillos · decimal con punto',()=>near(calculateMasonryUnits({...masonry,pieceHeightCm:'11.5'}).pieceHeightCm,11.5));
test('Ladrillos · manual 1m2 piezas 50x50 sin junta',()=>assert.equal(calculateMasonryUnits({wallWidthM:1,wallHeightM:1,openingsAreaM2:0,pieceLengthCm:50,pieceHeightCm:50,horizontalJointMm:0,verticalJointMm:0,wastePercent:0,piecesPerPack:'',pricePerPiece:'',pricePerPack:''}).pieces,4));
test('Ladrillos · juntas alteran módulo',()=>{const a=calculateMasonryUnits({...masonry,horizontalJointMm:0,verticalJointMm:0,piecesPerPack:'',pricePerPack:''});const b=calculateMasonryUnits({...masonry,piecesPerPack:'',pricePerPack:''});assert.ok(b.moduleAreaM2>a.moduleAreaM2);assert.ok(b.theoreticalPieces<a.theoreticalPieces);});
test('Ladrillos · huecos no superan pared',()=>assert.throws(()=>calculateMasonryUnits({...masonry,openingsAreaM2:20}),RangeError));
test('Ladrillos · precios alternativos',()=>assert.throws(()=>calculateMasonryUnits({...masonry,pricePerPiece:1,pricePerPack:50}),RangeError));

// 38. Impermeabilización
const waterproofL={mode:'litres',areaM2:20,coats:2,marginPercent:10,coverageM2PerL:4,consumptionKgM2:'',kgBasis:'',containerSize:5,containerPrice:20};
test('Impermeabilización · normal litros',()=>{const r=calculateWaterproofing(waterproofL);near(r.theoreticalQuantity,10);near(r.purchaseQuantity,11);assert.equal(r.containers,3);near(r.leftoverQuantity,4);near(r.cost,60);});
test('Impermeabilización · mínimo razonable',()=>assert.doesNotThrow(()=>calculateWaterproofing({mode:'litres',areaM2:0,coats:1,marginPercent:0,coverageM2PerL:.001,containerSize:'',containerPrice:''})));
test('Impermeabilización · máximo razonable',()=>assert.doesNotThrow(()=>calculateWaterproofing({mode:'kg',areaM2:100000,coats:20,marginPercent:200,consumptionKgM2:100000,kgBasis:'per-coat',containerSize:100000,containerPrice:1000000})));
test('Impermeabilización · margen cero',()=>near(calculateWaterproofing({...waterproofL,marginPercent:0}).purchaseQuantity,10));
test('Impermeabilización · negativo',()=>assert.throws(()=>calculateWaterproofing({...waterproofL,areaM2:-1}),RangeError));
test('Impermeabilización · vacío',()=>assert.throws(()=>calculateWaterproofing({...waterproofL,coverageM2PerL:''}),RangeError));
test('Impermeabilización · inválido NaN',()=>assert.throws(()=>calculateWaterproofing({...waterproofL,coats:'abc'}),RangeError));
test('Impermeabilización · decimal con coma',()=>near(calculateWaterproofing({...waterproofL,coverageM2PerL:'4,0'}).theoreticalQuantity,10));
test('Impermeabilización · decimal con punto',()=>near(calculateWaterproofing({...waterproofL,coverageM2PerL:'4.0'}).theoreticalQuantity,10));
test('Impermeabilización · manual modo litros',()=>near(calculateWaterproofing({mode:'litres',areaM2:10,coats:2,marginPercent:0,coverageM2PerL:5,containerSize:'',containerPrice:''}).theoreticalQuantity,4));
test('Impermeabilización · modo kg por capa',()=>near(calculateWaterproofing({mode:'kg',areaM2:20,coats:2,marginPercent:0,consumptionKgM2:1.5,kgBasis:'per-coat',containerSize:'',containerPrice:''}).theoreticalQuantity,60));
test('Impermeabilización · modo kg total no multiplica capas',()=>near(calculateWaterproofing({mode:'kg',areaM2:20,coats:3,marginPercent:0,consumptionKgM2:1.5,kgBasis:'total',containerSize:'',containerPrice:''}).theoreticalQuantity,30));
test('Impermeabilización · obliga a elegir unidad y significado',()=>{assert.throws(()=>calculateWaterproofing({...waterproofL,mode:''}),RangeError);assert.throws(()=>calculateWaterproofing({mode:'kg',areaM2:10,coats:2,marginPercent:0,consumptionKgM2:1,kgBasis:'',containerSize:'',containerPrice:''}),RangeError);});

// 39. Depósito de agua
const tank={mode:'manual',dailyDemandLitres:300,persons:'',litresPerPersonDay:'',autonomyDays:2,reservePercent:10,usableFractionPercent:80,commercialTankLitres:500};
test('Depósito · normal',()=>{const r=calculateWaterTank(tank);near(r.baseDemandLitres,600);near(r.usefulTargetLitres,660);near(r.nominalCapacityLitres,825);near(r.nominalCapacityM3,.825);assert.equal(r.tanks,2);near(r.installedCapacityLitres,1000);});
test('Depósito · mínimo razonable',()=>assert.doesNotThrow(()=>calculateWaterTank({mode:'manual',dailyDemandLitres:0,autonomyDays:0,reservePercent:0,usableFractionPercent:'',commercialTankLitres:''})));
test('Depósito · máximo razonable',()=>assert.doesNotThrow(()=>calculateWaterTank({mode:'manual',dailyDemandLitres:100000000,autonomyDays:365,reservePercent:500,usableFractionPercent:.01,commercialTankLitres:100000000})));
test('Depósito · reserva cero',()=>near(calculateWaterTank({...tank,reservePercent:0}).usefulTargetLitres,600));
test('Depósito · negativo',()=>assert.throws(()=>calculateWaterTank({...tank,dailyDemandLitres:-1}),RangeError));
test('Depósito · vacío',()=>assert.throws(()=>calculateWaterTank({...tank,autonomyDays:''}),RangeError));
test('Depósito · inválido NaN',()=>assert.throws(()=>calculateWaterTank({...tank,reservePercent:'abc'}),RangeError));
test('Depósito · decimal con coma',()=>near(calculateWaterTank({...tank,autonomyDays:'2,5'}).baseDemandLitres,750));
test('Depósito · decimal con punto',()=>near(calculateWaterTank({...tank,autonomyDays:'2.5'}).baseDemandLitres,750));
test('Depósito · manual litros por autonomía',()=>near(calculateWaterTank({mode:'manual',dailyDemandLitres:100,autonomyDays:3,reservePercent:0,usableFractionPercent:'',commercialTankLitres:''}).nominalCapacityLitres,300));
test('Depósito · personas por consumo introducido',()=>{const r=calculateWaterTank({mode:'persons',persons:4,litresPerPersonDay:100,autonomyDays:2,reservePercent:0,usableFractionPercent:'',commercialTankLitres:''});near(r.dailyDemandLitres,400);near(r.nominalCapacityLitres,800);});
test('Depósito · fracción utilizable aumenta nominal',()=>near(calculateWaterTank({...tank,reservePercent:0,usableFractionPercent:75,commercialTankLitres:''}).nominalCapacityLitres,800));
test('Depósito · depósitos comerciales usan ceil',()=>assert.equal(calculateWaterTank({...tank,usableFractionPercent:'',commercialTankLitres:400}).tanks,2));
