// Chapter 284: Logistics Service
// Provides receiving, storage, and distribution of medical and non-medical supplies

export const CHAPTER_284_CONFIG = {
    id: '284',
    name: 'Logistics Service',
    description: 'Receiving, Storage, and Distribution of Medical and Non-Medical Supplies',
    
    inputFields: [
        {
            id: 'patient_beds',
            label: 'Number of Patient Beds',
            type: 'number',
            min: 10,
            max: 500,
            defaultValue: 100,
            helpText: 'Total projected patient beds in facility'
        },
        {
            id: 'exam_procedure_rooms',
            label: 'Number of Exam/Procedure Rooms',
            type: 'number',
            min: 5,
            max: 200,
            defaultValue: 40,
            helpText: 'Total projected exam/procedure rooms in facility'
        },
        {
            id: 'operating_rooms',
            label: 'Number of Operating Rooms',
            type: 'number',
            min: 2,
            max: 20,
            defaultValue: 4,
            helpText: 'Total projected operating rooms in facility'
        },
        {
            id: 'postal_mail_authorized',
            label: 'Postal/Mail Service Authorized',
            type: 'boolean',
            defaultValue: true,
            helpText: 'Is Postal/Mail Service authorized?'
        }
    ],
    
    functionalAreas: [
        { number: '1', name: 'Calculation Area' },
        { number: '2', name: 'Loading Dock Area' },
        { number: '3', name: 'Warehouse Area' },
        { number: '4', name: 'Exchange Cart Replenishment Area' },
        { number: '5', name: 'Postal Service Area' },
        { number: '6', name: 'Staff and Administrative Area' }
    ]
};

// Helper function to determine storage tier based on total storage NSF
function getStorageTier(totalStorageNSF) {
    if (totalStorageNSF >= 2500 && totalStorageNSF <= 6000) return 1;
    if (totalStorageNSF >= 6001 && totalStorageNSF <= 12000) return 2;
    if (totalStorageNSF >= 12001 && totalStorageNSF <= 18000) return 3;
    if (totalStorageNSF >= 18001 && totalStorageNSF <= 24000) return 4;
    if (totalStorageNSF >= 24001 && totalStorageNSF <= 30000) return 5;
    return 0;
}

export function calculateRooms_284(inputs) {
    const rooms = [];
    const beds = inputs.patient_beds || 0;
    const examRooms = inputs.exam_procedure_rooms || 0;
    const orRooms = inputs.operating_rooms || 0;
    const postalAuth = inputs.postal_mail_authorized !== false;
    
    if (beds < 10 || examRooms < 5 || orRooms < 2) return rooms;
    
    // FA1: CALCULATION AREA (generates calculation spaces based on facility size)
    const FA1 = 'Calculation Area';
    
    // LUM Staging Area (patient beds)
    let lumBedNSF = 40;
    if (beds >= 101 && beds <= 200) lumBedNSF = 60;
    else if (beds >= 201 && beds <= 300) lumBedNSF = 80;
    else if (beds >= 301 && beds <= 400) lumBedNSF = 100;
    else if (beds >= 401 && beds <= 500) lumBedNSF = 120;
    
    rooms.push({
        room_code: 'SC101',
        room_name: 'LUM Staging Area (Patient Beds)',
        functional_area: FA1,
        nsf: lumBedNSF,
        quantity: 1
    });
    
    // LUM Staging Area (Exam/Procedure Rooms)
    let lumExamNSF = 40;
    if (examRooms >= 41 && examRooms <= 80) lumExamNSF = 60;
    else if (examRooms >= 81 && examRooms <= 120) lumExamNSF = 80;
    else if (examRooms >= 121 && examRooms <= 160) lumExamNSF = 100;
    else if (examRooms >= 161 && examRooms <= 200) lumExamNSF = 120;
    
    rooms.push({
        room_code: 'SC102',
        room_name: 'LUM Staging Area (Exam/Procedure Rooms)',
        functional_area: FA1,
        nsf: lumExamNSF,
        quantity: 1
    });
    
    // Bulk Items Storage Area (patient beds)
    let bulkBedNSF = 4500;
    if (beds >= 101 && beds <= 200) bulkBedNSF = 8500;
    else if (beds >= 201 && beds <= 300) bulkBedNSF = 12500;
    else if (beds >= 301 && beds <= 400) bulkBedNSF = 16500;
    else if (beds >= 401 && beds <= 500) bulkBedNSF = 20500;
    
    rooms.push({
        room_code: 'SC105',
        room_name: 'Bulk Items Storage Area (Patient Beds)',
        functional_area: FA1,
        nsf: bulkBedNSF,
        quantity: 1
    });
    
    // Bulk Items Storage Area (Exam/Procedure Rooms)
    let bulkExamNSF = 200;
    if (examRooms >= 41 && examRooms <= 80) bulkExamNSF = 400;
    else if (examRooms >= 81 && examRooms <= 120) bulkExamNSF = 600;
    else if (examRooms >= 121 && examRooms <= 160) bulkExamNSF = 800;
    else if (examRooms >= 161 && examRooms <= 200) bulkExamNSF = 1000;
    
    rooms.push({
        room_code: 'SC106',
        room_name: 'Bulk Items Storage Area (Exam/Procedure Rooms)',
        functional_area: FA1,
        nsf: bulkExamNSF,
        quantity: 1
    });
    
    // Bulk Items Storage Area (Operating Rooms)
    let bulkORNSF = 400;
    if (orRooms >= 5 && orRooms <= 8) bulkORNSF = 800;
    else if (orRooms >= 9 && orRooms <= 12) bulkORNSF = 1200;
    else if (orRooms >= 13 && orRooms <= 16) bulkORNSF = 1600;
    else if (orRooms >= 17 && orRooms <= 20) bulkORNSF = 2000;
    
    rooms.push({
        room_code: 'SC110',
        room_name: 'Bulk Items Storage Area (Operating Rooms)',
        functional_area: FA1,
        nsf: bulkORNSF,
        quantity: 1
    });
    
    // Unit Items Storage Area (patient beds)
    let unitBedNSF = 620;
    if (beds >= 101 && beds <= 200) unitBedNSF = 1120;
    else if (beds >= 201 && beds <= 300) unitBedNSF = 1620;
    else if (beds >= 301 && beds <= 400) unitBedNSF = 2120;
    else if (beds >= 401 && beds <= 500) unitBedNSF = 2620;
    
    rooms.push({
        room_code: 'SC108',
        room_name: 'Unit Items Storage Area (Patient Beds)',
        functional_area: FA1,
        nsf: unitBedNSF,
        quantity: 1
    });
    
    // Unit Items Storage Area (Exam/Procedure Rooms)
    let unitExamNSF = 80;
    if (examRooms >= 41 && examRooms <= 80) unitExamNSF = 160;
    else if (examRooms >= 81 && examRooms <= 120) unitExamNSF = 240;
    else if (examRooms >= 121 && examRooms <= 160) unitExamNSF = 320;
    else if (examRooms >= 161 && examRooms <= 200) unitExamNSF = 400;
    
    rooms.push({
        room_code: 'SC109',
        room_name: 'Unit Items Storage Area (Exam/Procedure Rooms)',
        functional_area: FA1,
        nsf: unitExamNSF,
        quantity: 1
    });
    
    // Unit Items Storage Area (Operating Rooms)
    let unitORNSF = 80;
    if (orRooms >= 5 && orRooms <= 8) unitORNSF = 160;
    else if (orRooms >= 9 && orRooms <= 12) unitORNSF = 240;
    else if (orRooms >= 13 && orRooms <= 16) unitORNSF = 320;
    else if (orRooms >= 17 && orRooms <= 20) unitORNSF = 400;
    
    rooms.push({
        room_code: 'SC128',
        room_name: 'Unit Items Storage Area (Operating Rooms)',
        functional_area: FA1,
        nsf: unitORNSF,
        quantity: 1
    });
    
    // Calculate total storage NSF for remaining calculations
    const totalStorageNSF = lumBedNSF + lumExamNSF + bulkBedNSF + bulkExamNSF + 
                           bulkORNSF + unitBedNSF + unitExamNSF + unitORNSF;
    const storageTier = getStorageTier(totalStorageNSF);
    
    if (storageTier === 0) return rooms;
    
    // FA2: LOADING DOCK AREA
    const FA2 = 'Loading Dock Area';
    
    // Clean Receiving Dock
    let cleanDockNSF = 200;
    if (storageTier >= 3 && storageTier <= 3) cleanDockNSF = 240;
    else if (storageTier >= 4) cleanDockNSF = 400;
    
    rooms.push({
        room_code: 'SB501',
        room_name: 'Clean Receiving Dock',
        functional_area: FA2,
        nsf: cleanDockNSF,
        quantity: 1
    });
    
    // Soiled Receiving Dock
    let soiledDockNSF = 200;
    if (storageTier === 3) soiledDockNSF = 280;
    else if (storageTier === 4) soiledDockNSF = 360;
    else if (storageTier === 5) soiledDockNSF = 440;
    
    rooms.push({
        room_code: 'SB511',
        room_name: 'Soiled Receiving Dock',
        functional_area: FA2,
        nsf: soiledDockNSF,
        quantity: 1
    });
    
    // Nutrition and Food Service Receiving Dock
    let nfsDockQty = storageTier >= 3 ? 2 : 1;
    rooms.push({
        room_code: 'SB517',
        room_name: 'Nutrition and Food Service Receiving Dock',
        functional_area: FA2,
        nsf: 100,
        quantity: nfsDockQty
    });
    
    // Breakdown Room
    let breakdownNSF = 360;
    if (storageTier >= 3 && storageTier <= 3) breakdownNSF = 720;
    else if (storageTier >= 4) breakdownNSF = 1080;
    
    rooms.push({
        room_code: 'SB522',
        room_name: 'Breakdown Room',
        functional_area: FA2,
        nsf: breakdownNSF,
        quantity: 1
    });
    
    // LUM Staging Room
    let lumStagingNSF = 100;
    if (storageTier === 2) lumStagingNSF = 120;
    else if (storageTier === 3) lumStagingNSF = 160;
    else if (storageTier === 4) lumStagingNSF = 200;
    else if (storageTier === 5) lumStagingNSF = 240;
    
    rooms.push({
        room_code: 'SB531',
        room_name: 'Logical Unit of Measure (LUM) Staging Room',
        functional_area: FA2,
        nsf: lumStagingNSF,
        quantity: 1
    });
    
    // Full Gas Cylinder Storage Room
    let fullGasNSF = 80;
    if (storageTier === 2) fullGasNSF = 120;
    else if (storageTier === 3) fullGasNSF = 160;
    else if (storageTier === 4) fullGasNSF = 200;
    else if (storageTier === 5) fullGasNSF = 240;
    
    rooms.push({
        room_code: 'SB541',
        room_name: 'Full Gas Cylinder Storage Room',
        functional_area: FA2,
        nsf: fullGasNSF,
        quantity: 1
    });
    
    // Empty Gas Cylinder Storage Room
    rooms.push({
        room_code: 'SB551',
        room_name: 'Empty Gas Cylinder Storage Room',
        functional_area: FA2,
        nsf: fullGasNSF,
        quantity: 1
    });
    
    // Flammable Storage Room
    let flammableNSF = 60;
    if (storageTier === 2) flammableNSF = 80;
    else if (storageTier === 3) flammableNSF = 100;
    else if (storageTier === 4) flammableNSF = 120;
    else if (storageTier === 5) flammableNSF = 140;
    
    rooms.push({
        room_code: 'SB561',
        room_name: 'Flammable Storage Room',
        functional_area: FA2,
        nsf: flammableNSF,
        quantity: 1
    });
    
    // Staff Toilet
    let staffToiletQty = storageTier >= 3 ? 2 : 1;
    rooms.push({
        room_code: 'SB191',
        room_name: 'Logistics Staff Toilet',
        functional_area: FA2,
        nsf: 60,
        quantity: staffToiletQty
    });
    
    // FA3: WAREHOUSE AREA
    const FA3 = 'Warehouse Area';
    
    // Receiving / Issue Room
    let receivingNSF = 400;
    if (storageTier === 2) receivingNSF = 500;
    else if (storageTier === 3) receivingNSF = 700;
    else if (storageTier >= 4) receivingNSF = 900;
    
    rooms.push({
        room_code: 'SB571',
        room_name: 'Receiving / Issue Room',
        functional_area: FA3,
        nsf: receivingNSF,
        quantity: 1
    });
    
    // Equipment Prep / Staging Storage Room
    let equipPrepNSF = 80;
    if (storageTier === 2) equipPrepNSF = 120;
    else if (storageTier === 3) equipPrepNSF = 200;
    else if (storageTier >= 4) equipPrepNSF = 280;
    
    rooms.push({
        room_code: 'SB581',
        room_name: 'Equipment Prep / Staging Storage Room',
        functional_area: FA3,
        nsf: equipPrepNSF,
        quantity: 1
    });
    
    // Flex Storage Room
    let flexStorageNSF = 80;
    if (storageTier === 2) flexStorageNSF = 160;
    else if (storageTier === 3) flexStorageNSF = 240;
    else if (storageTier === 4) flexStorageNSF = 320;
    else if (storageTier === 5) flexStorageNSF = 400;
    
    rooms.push({
        room_code: 'SB591',
        room_name: 'Flex Storage Room',
        functional_area: FA3,
        nsf: flexStorageNSF,
        quantity: 1
    });
    
    // Pandemic Storage Room
    let pandemicNSF = 200;
    if (storageTier === 2) pandemicNSF = 400;
    else if (storageTier === 3) pandemicNSF = 600;
    else if (storageTier === 4) pandemicNSF = 800;
    else if (storageTier === 5) pandemicNSF = 1000;
    
    rooms.push({
        room_code: 'SB601',
        room_name: 'Pandemic Storage Room',
        functional_area: FA3,
        nsf: pandemicNSF,
        quantity: 1
    });
    
    // Emergency Preparedness Storage Room
    let emergencyNSF = 200;
    if (storageTier === 2) emergencyNSF = 500;
    else if (storageTier === 3) emergencyNSF = 800;
    else if (storageTier === 4) emergencyNSF = 1100;
    else if (storageTier === 5) emergencyNSF = 1400;
    
    rooms.push({
        room_code: 'SB611',
        room_name: 'Emergency Preparedness Storage Room',
        functional_area: FA3,
        nsf: emergencyNSF,
        quantity: 1
    });
    
    // Bulk Items Storage Room (warehouse)
    let bulkWarehouseNSF = 5100;
    if (storageTier === 2) bulkWarehouseNSF = 9700;
    else if (storageTier === 3) bulkWarehouseNSF = 14300;
    else if (storageTier === 4) bulkWarehouseNSF = 18900;
    else if (storageTier === 5) bulkWarehouseNSF = 23500;
    
    rooms.push({
        room_code: 'SB621',
        room_name: 'Bulk Items Storage Room',
        functional_area: FA3,
        nsf: bulkWarehouseNSF,
        quantity: 1
    });
    
    // Unit Items Storage Room (warehouse)
    let unitWarehouseNSF = 780;
    if (storageTier === 2) unitWarehouseNSF = 1440;
    else if (storageTier === 3) unitWarehouseNSF = 2100;
    else if (storageTier === 4) unitWarehouseNSF = 2760;
    else if (storageTier === 5) unitWarehouseNSF = 3420;
    
    rooms.push({
        room_code: 'SB631',
        room_name: 'Unit Items Storage Room',
        functional_area: FA3,
        nsf: unitWarehouseNSF,
        quantity: 1
    });
    
    // Receiving Breakdown / Inspection Room
    let breakdownInspNSF = storageTier >= 4 ? 240 : 120;
    rooms.push({
        room_code: 'SB641',
        room_name: 'Receiving Breakdown / Inspection Room',
        functional_area: FA3,
        nsf: breakdownInspNSF,
        quantity: 1
    });
    
    // Sterile Consumables Storage Room
    let sterileNSF = 270;
    if (storageTier === 2) sterileNSF = 510;
    else if (storageTier === 3) sterileNSF = 750;
    else if (storageTier >= 4) sterileNSF = 990;
    
    rooms.push({
        room_code: 'SB644',
        room_name: 'Sterile Consumables (Soft Goods) Storage Room',
        functional_area: FA3,
        nsf: sterileNSF,
        quantity: 1
    });
    
    // FA4: EXCHANGE CART REPLENISHMENT AREA
    const FA4 = 'Exchange Cart Replenishment Area';
    
    // Exchange Cart Staging/Wash Room
    let cartWashNSF = 200;
    if (storageTier === 2) cartWashNSF = 300;
    else if (storageTier === 3) cartWashNSF = 400;
    else if (storageTier >= 4) cartWashNSF = 500;
    
    rooms.push({
        room_code: 'SB651',
        room_name: 'Exchange Cart Staging/Wash Room',
        functional_area: FA4,
        nsf: cartWashNSF,
        quantity: 1
    });
    
    // FA5: POSTAL SERVICE AREA (if authorized)
    if (postalAuth) {
        const FA5 = 'Postal Service Area';
        
        rooms.push({
            room_code: 'SB661',
            room_name: 'Mail Room',
            functional_area: FA5,
            nsf: 200,
            quantity: 1
        });
        
        rooms.push({
            room_code: 'SB662',
            room_name: 'Mail Staging Room',
            functional_area: FA5,
            nsf: 100,
            quantity: 1
        });
    }
    
    // FA6: STAFF AND ADMINISTRATIVE AREA
    const FA6 = 'Staff and Administrative Area';
    
    // Supervisor Office
    rooms.push({
        room_code: 'SS031',
        room_name: 'Logistics Supervisor Office',
        functional_area: FA6,
        nsf: 120,
        quantity: 1
    });
    
    // Staff Workstations
    let workstationQty = 2;
    if (storageTier === 2) workstationQty = 4;
    else if (storageTier === 3) workstationQty = 6;
    else if (storageTier === 4) workstationQty = 8;
    else if (storageTier === 5) workstationQty = 10;
    
    rooms.push({
        room_code: 'SS218',
        room_name: 'Logistics Staff Workstation',
        functional_area: FA6,
        nsf: 48,
        quantity: workstationQty
    });
    
    // Staff Break Room
    let breakNSF = 100;
    if (storageTier >= 3) breakNSF = 150;
    
    rooms.push({
        room_code: 'SS303',
        room_name: 'Logistics Staff Break Room',
        functional_area: FA6,
        nsf: breakNSF,
        quantity: 1
    });
    
    // Conference Room
    if (storageTier >= 2) {
        rooms.push({
            room_code: 'SS291',
            room_name: 'Logistics Conference Room',
            functional_area: FA6,
            nsf: 200,
            quantity: 1
        });
    }
    
    return rooms;
}

export const CHAPTER_284 = {
    ...CHAPTER_284_CONFIG,
    calculate: calculateRooms_284
};
