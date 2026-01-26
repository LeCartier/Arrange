// Chapter 312: Mental Health Resident Care Unit (MH RCU)
// MHRRTP - Mental Health Residential Rehabilitation Treatment Program

export const CHAPTER_312_CONFIG = {
    id: '312',
    name: 'Mental Health Resident Care Unit (MH RCU)',
    description: 'Mental Health Residential Rehabilitation Treatment Program',
    
    inputFields: [
        {
            id: 'resident_beds',
            label: 'Number of Resident Beds',
            type: 'select',
            options: [
                { value: 16, label: '16 beds' },
                { value: 20, label: '20 beds' },
                { value: 24, label: '24 beds' },
                { value: 28, label: '28 beds' },
                { value: 32, label: '32 beds' },
                { value: 36, label: '36 beds' },
                { value: 40, label: '40 beds' },
                { value: 44, label: '44 beds' },
                { value: 48, label: '48 beds' },
                { value: 52, label: '52 beds' },
                { value: 56, label: '56 beds' },
                { value: 60, label: '60 beds' }
            ],
            defaultValue: 28,
            helpText: 'Total number of resident beds authorized (16-60 in increments of 4)'
        }
    ],
    
    functionalAreas: [
        { number: '1', name: 'Reception Area' },
        { number: '2', name: 'Common Resident Services Area' },
        { number: '3', name: 'Clinical Evaluation Area' },
        { number: '4', name: 'Resident Care Unit (RCU) Patient Area' },
        { number: '5', name: 'Resident Care Unit (RCU) Support Area' },
        { number: '6', name: 'Staff and Administrative Area' }
    ]
};

// Helper to get number of RCUs based on beds
function getRCUCount(beds) {
    if (beds <= 28) return 1;
    if (beds <= 56) return 2;
    return 3;
}

export function calculateRooms_312(inputs) {
    const rooms = [];
    const beds = inputs.resident_beds || 28;
    const rcuCount = getRCUCount(beds);
    
    // FA1: RECEPTION AREA
    const FA1 = 'Reception Area';
    
    // Vestibule
    rooms.push({
        room_code: 'SB291',
        room_name: 'MH RCU Vestibule',
        functional_area: FA1,
        nsf: 200,
        quantity: rcuCount
    });
    
    // Reception
    rooms.push({
        room_code: 'SC183',
        room_name: 'MH RCU Reception',
        functional_area: FA1,
        nsf: 85,
        quantity: rcuCount
    });
    
    // Public Waiting (varies by RCU size)
    let waitingNSF = 215;
    if (beds === 20) waitingNSF = 260;
    else if (beds === 24) waitingNSF = 290;
    else if (beds >= 28) waitingNSF = 330;
    
    rooms.push({
        room_code: 'SB071',
        room_name: 'MH RCU Public Waiting',
        functional_area: FA1,
        nsf: waitingNSF,
        quantity: rcuCount
    });
    
    // Public Toilet
    rooms.push({
        room_code: 'SB191',
        room_name: 'MH RCU Public Toilet',
        functional_area: FA1,
        nsf: 60,
        quantity: rcuCount * 2
    });
    
    // Family/Public Visitation Room
    rooms.push({
        room_code: 'RMH11',
        room_name: 'Family/Public Visitation Room',
        functional_area: FA1,
        nsf: 125,
        quantity: rcuCount * 2
    });
    
    // Personal Property Locker Alcove
    rooms.push({
        room_code: 'SB297',
        room_name: 'MH RCU Personal Property Locker Alcove',
        functional_area: FA1,
        nsf: 40,
        quantity: rcuCount
    });
    
    // FA2: COMMON RESIDENT SERVICES AREA
    const FA2 = 'Common Resident Services Area';
    
    // Community Room
    rooms.push({
        room_code: 'RMH21',
        room_name: 'MH RCU Community Room',
        functional_area: FA2,
        nsf: 820,
        quantity: rcuCount
    });
    
    // Community Room Kitchen
    let kitchenNSF = (beds <= 20 || (beds >= 32 && beds <= 48)) ? 200 : 260;
    rooms.push({
        room_code: 'RMH23',
        room_name: 'MH RCU Community Room Kitchen',
        functional_area: FA2,
        nsf: kitchenNSF,
        quantity: rcuCount
    });
    
    // Community Room Storage
    let storageNSF = 80;
    if (beds === 20) storageNSF = 100;
    else if (beds === 24) storageNSF = 120;
    else if (beds >= 28) storageNSF = 140;
    
    rooms.push({
        room_code: 'RMH26',
        room_name: 'MH RCU Community Room Storage',
        functional_area: FA2,
        nsf: storageNSF,
        quantity: rcuCount
    });
    
    // Vending Area
    let vendingNSF = (beds <= 20) ? 40 : 60;
    rooms.push({
        room_code: 'SV683',
        room_name: 'MH RCU Vending Area',
        functional_area: FA2,
        nsf: vendingNSF,
        quantity: rcuCount
    });
    
    // Exercise Room
    rooms.push({
        room_code: 'RMH31',
        room_name: 'MH RCU Exercise Room',
        functional_area: FA2,
        nsf: 300,
        quantity: rcuCount
    });
    
    // Recreation Therapy Room
    let rtNSF = (beds <= 20) ? 300 : 480;
    rooms.push({
        room_code: 'RMH34',
        room_name: 'MH RCU Recreation Therapy Room',
        functional_area: FA2,
        nsf: rtNSF,
        quantity: rcuCount
    });
    
    // Small Group Therapy Room
    rooms.push({
        room_code: 'RMH37',
        room_name: 'MH RCU Small Group Therapy Room',
        functional_area: FA2,
        nsf: 360,
        quantity: rcuCount
    });
    
    // Large Group Therapy Room / Classroom
    let classroomNSF = (beds <= 20) ? 960 : 1200;
    rooms.push({
        room_code: 'RMH38',
        room_name: 'MH RCU Large Group Therapy Room / Classroom',
        functional_area: FA2,
        nsf: classroomNSF,
        quantity: rcuCount
    });
    
    // Resident Computer Room
    rooms.push({
        room_code: 'RMH41',
        room_name: 'MH RCU Resident Computer Room',
        functional_area: FA2,
        nsf: 240,
        quantity: rcuCount
    });
    
    // Therapy Storage Room
    let therapyStorageNSF = 200;
    if (beds === 20) therapyStorageNSF = 240;
    else if (beds === 24) therapyStorageNSF = 280;
    else if (beds >= 28) therapyStorageNSF = 320;
    
    rooms.push({
        room_code: 'RMH45',
        room_name: 'MH RCU Therapy Storage Room',
        functional_area: FA2,
        nsf: therapyStorageNSF,
        quantity: rcuCount
    });
    
    // FA3: CLINICAL EVALUATION AREA
    const FA3 = 'Clinical Evaluation Area';
    
    // Consult Room
    let consultQty = 1;
    if (beds >= 24 && beds <= 36) consultQty = 2;
    else if (beds >= 40 && beds <= 48) consultQty = 3;
    else if (beds >= 52) consultQty = 4;
    
    rooms.push({
        room_code: 'SC271',
        room_name: 'MH RCU Consult Room',
        functional_area: FA3,
        nsf: 125,
        quantity: consultQty
    });
    
    // Intake Processing Room
    rooms.push({
        room_code: 'RMH51',
        room_name: 'MH RCU Intake Processing Room',
        functional_area: FA3,
        nsf: 140,
        quantity: rcuCount
    });
    
    // Resident Universal Toilet/Shower (Clinical)
    rooms.push({
        room_code: 'SB148',
        room_name: 'MH RCU Resident Universal Toilet/Shower',
        functional_area: FA3,
        nsf: 75,
        quantity: rcuCount
    });
    
    // Laundry Room
    let laundryNSF = (beds <= 20) ? 140 : 180;
    rooms.push({
        room_code: 'SC450',
        room_name: 'MH RCU Laundry Room',
        functional_area: FA3,
        nsf: laundryNSF,
        quantity: rcuCount
    });
    
    // Exam Room
    rooms.push({
        room_code: 'RMH54',
        room_name: 'MH RCU Exam Room',
        functional_area: FA3,
        nsf: 125,
        quantity: consultQty
    });
    
    // Medication Room (Clinical)
    rooms.push({
        room_code: 'SV583',
        room_name: 'MH RCU Clinical Medication Room',
        functional_area: FA3,
        nsf: 100,
        quantity: rcuCount
    });
    
    // Nurse Manager Office
    rooms.push({
        room_code: 'SS203',
        room_name: 'MH RCU Nurse Manager Office',
        functional_area: FA3,
        nsf: 130,
        quantity: rcuCount
    });
    
    // Evaluation Area Storage
    let evalStorageNSF = (beds <= 20) ? 80 : 100;
    rooms.push({
        room_code: 'RMH56',
        room_name: 'MH RCU Evaluation Area Storage',
        functional_area: FA3,
        nsf: evalStorageNSF,
        quantity: rcuCount
    });
    
    // FA4: RESIDENT CARE UNIT (RCU) PATIENT AREA
    const FA4 = 'Resident Care Unit (RCU) Patient Area';
    
    // Resident Lounge
    let loungeNSF = (beds <= 20) ? 400 : 480;
    rooms.push({
        room_code: 'SB086',
        room_name: 'MH RCU Resident Lounge',
        functional_area: FA4,
        nsf: loungeNSF,
        quantity: rcuCount
    });
    
    // Veteran Specific Population Resident Lounge
    rooms.push({
        room_code: 'SB086',
        room_name: 'MH RCU Veteran Specific Population Lounge',
        functional_area: FA4,
        nsf: 145,
        quantity: rcuCount
    });
    
    // One-Bed Universal Resident Bedroom
    let oneBedroomQty = 2;
    if (beds >= 24 && beds <= 36) oneBedroomQty = 4;
    else if (beds >= 40 && beds <= 48) oneBedroomQty = 6;
    else if (beds >= 52) oneBedroomQty = 8;
    
    rooms.push({
        room_code: 'RMH61',
        room_name: 'One-Bed Universal Resident Bedroom',
        functional_area: FA4,
        nsf: 185,
        quantity: oneBedroomQty
    });
    
    // Two-Bed Universal Resident Bedroom
    let twoBedroomQty = 7;
    if (beds === 20) twoBedroomQty = 9;
    else if (beds === 24) twoBedroomQty = 10;
    else if (beds === 28) twoBedroomQty = 12;
    else if (beds === 32) twoBedroomQty = 14;
    else if (beds === 36) twoBedroomQty = 16;
    else if (beds === 40) twoBedroomQty = 17;
    else if (beds === 44) twoBedroomQty = 19;
    else if (beds === 48) twoBedroomQty = 21;
    else if (beds === 52) twoBedroomQty = 22;
    else if (beds === 56) twoBedroomQty = 24;
    else if (beds === 60) twoBedroomQty = 26;
    
    rooms.push({
        room_code: 'RMH64',
        room_name: 'Two-Bed Universal Resident Bedroom',
        functional_area: FA4,
        nsf: 380,
        quantity: twoBedroomQty
    });
    
    // Resident Universal Toilet/Shower
    let residentToiletQty = 9;
    if (beds === 20) residentToiletQty = 11;
    else if (beds === 24) residentToiletQty = 14;
    else if (beds === 28) residentToiletQty = 16;
    else if (beds === 32) residentToiletQty = 18;
    else if (beds === 36) residentToiletQty = 20;
    else if (beds === 40) residentToiletQty = 23;
    else if (beds === 44) residentToiletQty = 25;
    else if (beds === 48) residentToiletQty = 27;
    else if (beds === 52) residentToiletQty = 30;
    else if (beds === 56) residentToiletQty = 32;
    else if (beds === 60) residentToiletQty = 34;
    
    rooms.push({
        room_code: 'SB148',
        room_name: 'MH RCU Resident Universal Toilet/Shower',
        functional_area: FA4,
        nsf: 60,
        quantity: residentToiletQty
    });
    
    // Kitchenette/Pantry
    rooms.push({
        room_code: 'SC164',
        room_name: 'MH RCU Kitchenette/Pantry',
        functional_area: FA4,
        nsf: 80,
        quantity: rcuCount
    });
    
    // Unit Laundry Room
    rooms.push({
        room_code: 'SC450',
        room_name: 'MH RCU Unit Laundry Room',
        functional_area: FA4,
        nsf: 80,
        quantity: rcuCount
    });
    
    // Women Veteran Resident Laundry Room
    rooms.push({
        room_code: 'SC450',
        room_name: 'MH RCU Women Veteran Laundry Room',
        functional_area: FA4,
        nsf: 80,
        quantity: rcuCount
    });
    
    // Resident Toilet
    rooms.push({
        room_code: 'SB191',
        room_name: 'MH RCU Resident Toilet',
        functional_area: FA4,
        nsf: 60,
        quantity: rcuCount
    });
    
    // Housekeeping Aids Closet
    let hacNSF = (beds <= 20) ? 60 : 80;
    rooms.push({
        room_code: 'SB244',
        room_name: 'MH RCU Housekeeping Aids Closet (HAC)',
        functional_area: FA4,
        nsf: hacNSF,
        quantity: rcuCount
    });
    
    // FA5: RESIDENT CARE UNIT (RCU) SUPPORT AREA
    const FA5 = 'Resident Care Unit (RCU) Support Area';
    
    // Staff Hub
    let hubNSF = (beds <= 20) ? 120 : 240;
    rooms.push({
        room_code: 'RMH71',
        room_name: 'MH RCU Staff Hub',
        functional_area: FA5,
        nsf: hubNSF,
        quantity: rcuCount
    });
    
    // Staff Workroom
    let workroomNSF = (beds <= 20) ? 175 : 300;
    rooms.push({
        room_code: 'SC231',
        room_name: 'MH RCU Staff Workroom',
        functional_area: FA5,
        nsf: workroomNSF,
        quantity: rcuCount
    });
    
    // Health Technician Workstation
    let techQty = 1;
    if (beds >= 24 && beds <= 36) techQty = 2;
    else if (beds >= 40 && beds <= 48) techQty = 3;
    else if (beds >= 52) techQty = 4;
    
    rooms.push({
        room_code: 'SS218',
        room_name: 'MH RCU Health Technician Workstation',
        functional_area: FA5,
        nsf: 56,
        quantity: techQty
    });
    
    // RCU Medication Room
    rooms.push({
        room_code: 'SV583',
        room_name: 'MH RCU Unit Medication Room',
        functional_area: FA5,
        nsf: 150,
        quantity: rcuCount
    });
    
    // Team Room
    let teamNSF = (beds <= 20) ? 320 : 380;
    rooms.push({
        room_code: 'SC243',
        room_name: 'MH RCU Team Room',
        functional_area: FA5,
        nsf: teamNSF,
        quantity: rcuCount
    });
    
    // Drug Screening Room
    rooms.push({
        room_code: 'RMH81',
        room_name: 'MH RCU Drug Screening Room',
        functional_area: FA5,
        nsf: 80,
        quantity: rcuCount
    });
    
    // RCU Storage Room
    let rcuStorageNSF = 120;
    if (beds === 20) rcuStorageNSF = 140;
    else if (beds === 24) rcuStorageNSF = 160;
    else if (beds >= 28) rcuStorageNSF = 180;
    
    rooms.push({
        room_code: 'SB663',
        room_name: 'MH RCU Storage Room',
        functional_area: FA5,
        nsf: rcuStorageNSF,
        quantity: rcuCount
    });
    
    // Resident Belongings Storage Room
    let belongingsNSF = 140;
    if (beds === 20) belongingsNSF = 180;
    else if (beds === 24) belongingsNSF = 220;
    else if (beds >= 28) belongingsNSF = 260;
    
    rooms.push({
        room_code: 'RMH84',
        room_name: 'MH RCU Resident Belongings Storage',
        functional_area: FA5,
        nsf: belongingsNSF,
        quantity: rcuCount
    });
    
    // Clean Linen Room
    let cleanLinenNSF = (beds <= 20) ? 60 : 80;
    rooms.push({
        room_code: 'SC471',
        room_name: 'MH RCU Clean Linen Room',
        functional_area: FA5,
        nsf: cleanLinenNSF,
        quantity: rcuCount
    });
    
    // Soiled Linen Room
    let soiledLinenNSF = (beds <= 20) ? 50 : 60;
    rooms.push({
        room_code: 'SC452',
        room_name: 'MH RCU Soiled Linen Room',
        functional_area: FA5,
        nsf: soiledLinenNSF,
        quantity: rcuCount
    });
    
    // FA6: STAFF AND ADMINISTRATIVE AREA
    const FA6 = 'Staff and Administrative Area';
    
    // Program Supervisor Office
    rooms.push({
        room_code: 'SS031',
        room_name: 'MH RCU Program Supervisor Office',
        functional_area: FA6,
        nsf: 120,
        quantity: 1
    });
    
    // Clinical Coordinator Office
    rooms.push({
        room_code: 'SS031',
        room_name: 'MH RCU Clinical Coordinator Office',
        functional_area: FA6,
        nsf: 100,
        quantity: Math.min(3, Math.ceil(beds / 20))
    });
    
    // Psychiatrist Office
    rooms.push({
        room_code: 'SS031',
        room_name: 'MH RCU Psychiatrist Office',
        functional_area: FA6,
        nsf: 120,
        quantity: Math.ceil(beds / 15)
    });
    
    // Psychologist Office
    rooms.push({
        room_code: 'SS031',
        room_name: 'MH RCU Psychologist Office',
        functional_area: FA6,
        nsf: 100,
        quantity: Math.ceil(beds / 8)
    });
    
    // Social Worker Office
    rooms.push({
        room_code: 'SS031',
        room_name: 'MH RCU Social Worker Office',
        functional_area: FA6,
        nsf: 100,
        quantity: Math.ceil(beds / 8)
    });
    
    // Conference Room
    rooms.push({
        room_code: 'SS101',
        room_name: 'MH RCU Conference Room',
        functional_area: FA6,
        nsf: 300,
        quantity: 1
    });
    
    // Staff Locker Room
    rooms.push({
        room_code: 'SB207',
        room_name: 'MH RCU Staff Locker Room',
        functional_area: FA6,
        nsf: 100,
        quantity: 1
    });
    
    // Staff Toilet
    rooms.push({
        room_code: 'SB191',
        room_name: 'MH RCU Staff Toilet',
        functional_area: FA6,
        nsf: 60,
        quantity: 2
    });
    
    return rooms;
}

export const CHAPTER_312 = {
    ...CHAPTER_312_CONFIG,
    calculate: calculateRooms_312
};
