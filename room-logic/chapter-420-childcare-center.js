// Chapter 420: Childcare Development Center
// Childcare facilities for infants through school-age children

export const CHAPTER_420_CONFIG = {
    id: '420',
    name: 'Childcare Development Center',
    description: 'Childcare Facilities for Infants through School-Age Children',
    
    inputFields: [
        {
            id: 'infants',
            label: 'Number of Infants (6-26 weeks)',
            type: 'number',
            min: 0,
            max: 11,
            defaultValue: 4,
            helpText: 'Projected number of infants aged 6-26 weeks'
        },
        {
            id: 'pre_toddlers',
            label: 'Number of Pre-Toddlers (6-18 months)',
            type: 'number',
            min: 0,
            max: 34,
            defaultValue: 8,
            helpText: 'Projected number of pre-toddlers aged 6-18 months'
        },
        {
            id: 'toddlers',
            label: 'Number of Toddlers (18mo-3yrs)',
            type: 'number',
            min: 0,
            max: 45,
            defaultValue: 12,
            helpText: 'Projected number of toddlers aged 18 months to 3 years'
        },
        {
            id: 'preschoolers',
            label: 'Number of Preschoolers (3-5 years)',
            type: 'number',
            min: 0,
            max: 68,
            defaultValue: 20,
            helpText: 'Projected number of preschoolers aged 3-5 years'
        },
        {
            id: 'school_age',
            label: 'Number of School Age (6-10 years)',
            type: 'number',
            min: 0,
            max: 68,
            defaultValue: 15,
            helpText: 'Projected number of school-age children aged 6-10 years'
        }
    ],
    
    functionalAreas: [
        { number: '1', name: 'Reception Area' },
        { number: '2', name: 'Staff and Administrative Area' },
        { number: '3', name: 'Childcare Area' },
        { number: '4', name: 'Support Area' }
    ]
};

export function calculateRooms_420(inputs) {
    const rooms = [];
    const infants = inputs.infants || 0;
    const preToddlers = inputs.pre_toddlers || 0;
    const toddlers = inputs.toddlers || 0;
    const preschoolers = inputs.preschoolers || 0;
    const schoolAge = inputs.school_age || 0;
    
    const totalChildren = infants + preToddlers + toddlers + preschoolers + schoolAge;
    
    if (totalChildren < 1) return rooms;
    
    // FA1: RECEPTION AREA
    const FA1 = 'Reception Area';
    
    // Entry / Lobby
    let lobbyNSF = 80;
    if (totalChildren >= 46 && totalChildren <= 68) lobbyNSF = 120;
    else if (totalChildren >= 69 && totalChildren <= 91) lobbyNSF = 160;
    else if (totalChildren >= 92 && totalChildren <= 125) lobbyNSF = 200;
    else if (totalChildren >= 126 && totalChildren <= 159) lobbyNSF = 240;
    else if (totalChildren >= 160 && totalChildren <= 193) lobbyNSF = 280;
    else if (totalChildren >= 194) lobbyNSF = 340;
    
    rooms.push({
        room_code: 'SB108',
        room_name: 'Childcare Center Entry / Lobby',
        functional_area: FA1,
        nsf: lobbyNSF,
        quantity: 1
    });
    
    // Reception
    let receptionNSF = totalChildren >= 46 ? 260 : 85;
    rooms.push({
        room_code: 'SS221',
        room_name: 'Childcare Center Reception',
        functional_area: FA1,
        nsf: receptionNSF,
        quantity: 1
    });
    
    // FA2: STAFF AND ADMINISTRATIVE AREA
    const FA2 = 'Staff and Administrative Area';
    
    // Director Office
    rooms.push({
        room_code: 'SS204',
        room_name: 'Childcare Center Director Office',
        functional_area: FA2,
        nsf: 100,
        quantity: 1
    });
    
    // Administration Workstation
    let adminQty = totalChildren >= 46 ? 2 : 1;
    rooms.push({
        room_code: 'SS218',
        room_name: 'Childcare Center Admin Workstation',
        functional_area: FA2,
        nsf: 56,
        quantity: adminQty
    });
    
    // Staff Breakroom
    let breakroomNSF = 120;
    if (totalChildren >= 46 && totalChildren <= 192) breakroomNSF = 180;
    else if (totalChildren >= 193) breakroomNSF = 260;
    
    rooms.push({
        room_code: 'SS262',
        room_name: 'Childcare Center Staff Breakroom',
        functional_area: FA2,
        nsf: breakroomNSF,
        quantity: 1
    });
    
    // Staff Toilet
    rooms.push({
        room_code: 'SB191',
        room_name: 'Childcare Center Staff Toilet',
        functional_area: FA2,
        nsf: 60,
        quantity: 2
    });
    
    // Storage Alcove
    let storageQty = 1;
    if (totalChildren >= 29 && totalChildren <= 67) storageQty = 2;
    else if (totalChildren >= 68 && totalChildren <= 124) storageQty = 3;
    else if (totalChildren >= 125 && totalChildren <= 192) storageQty = 4;
    else if (totalChildren >= 193) storageQty = 5;
    
    rooms.push({
        room_code: 'SS001',
        room_name: 'Childcare Center Storage Alcove',
        functional_area: FA2,
        nsf: 40,
        quantity: storageQty
    });
    
    // FA3: CHILDCARE AREA
    const FA3 = 'Childcare Area';
    
    // Infant Activity / Support Room
    if (infants >= 1) {
        rooms.push({
            room_code: 'SS011',
            room_name: 'Infant Activity / Support Room',
            functional_area: FA3,
            nsf: 140,
            quantity: 1
        });
        
        // Infant Crib Area
        rooms.push({
            room_code: 'SS021',
            room_name: 'Infant Crib Area',
            functional_area: FA3,
            nsf: 80,
            quantity: 1
        });
    }
    
    // Pre-Toddler Activity / Support Room
    if (preToddlers >= 1) {
        let preToddlerNSF = preToddlers >= 18 ? 400 : 260;
        rooms.push({
            room_code: 'SS031',
            room_name: 'Pre-Toddler Activity / Support Room',
            functional_area: FA3,
            nsf: preToddlerNSF,
            quantity: 1
        });
        
        // Pre-Toddler Crib Area
        rooms.push({
            room_code: 'SS041',
            room_name: 'Pre-Toddler Crib Area',
            functional_area: FA3,
            nsf: 80,
            quantity: Math.ceil(preToddlers / 17)
        });
        
        // Pre-Toddler Toilet
        rooms.push({
            room_code: 'SB196',
            room_name: 'Pre-Toddler Toilet Room',
            functional_area: FA3,
            nsf: 60,
            quantity: 1
        });
    }
    
    // Toddler Activity / Support Room
    if (toddlers >= 1) {
        let toddlerNSF = 300;
        let toddlerQty = 1;
        if (toddlers >= 16 && toddlers <= 30) toddlerNSF = 500;
        else if (toddlers >= 31) { toddlerNSF = 500; toddlerQty = 2; }
        
        rooms.push({
            room_code: 'SS051',
            room_name: 'Toddler Activity / Support Room',
            functional_area: FA3,
            nsf: toddlerNSF,
            quantity: toddlerQty
        });
        
        // Toddler Toilet
        rooms.push({
            room_code: 'SB196',
            room_name: 'Toddler Toilet Room',
            functional_area: FA3,
            nsf: 80,
            quantity: toddlerQty
        });
        
        // Toddler Cot Area
        rooms.push({
            room_code: 'SS061',
            room_name: 'Toddler Cot Area',
            functional_area: FA3,
            nsf: 100,
            quantity: toddlerQty
        });
    }
    
    // Preschool Activity / Support Room
    if (preschoolers >= 1) {
        let preschoolNSF = 450;
        let preschoolQty = 1;
        if (preschoolers >= 23 && preschoolers <= 45) preschoolNSF = 700;
        else if (preschoolers >= 46) { preschoolNSF = 700; preschoolQty = 2; }
        
        rooms.push({
            room_code: 'SS071',
            room_name: 'Preschool Activity / Support Room',
            functional_area: FA3,
            nsf: preschoolNSF,
            quantity: preschoolQty
        });
        
        // Preschool Toilet
        rooms.push({
            room_code: 'SB196',
            room_name: 'Preschool Toilet Room',
            functional_area: FA3,
            nsf: 100,
            quantity: preschoolQty
        });
        
        // Preschool Cot Area
        rooms.push({
            room_code: 'SS081',
            room_name: 'Preschool Cot Area',
            functional_area: FA3,
            nsf: 140,
            quantity: preschoolQty
        });
    }
    
    // School Age Activity / Support Room
    if (schoolAge >= 1) {
        let schoolNSF = 400;
        let schoolQty = 1;
        if (schoolAge >= 23 && schoolAge <= 45) schoolNSF = 600;
        else if (schoolAge >= 46) { schoolNSF = 600; schoolQty = 2; }
        
        rooms.push({
            room_code: 'SS091',
            room_name: 'School Age Activity / Support Room',
            functional_area: FA3,
            nsf: schoolNSF,
            quantity: schoolQty
        });
        
        // School Age Toilet
        rooms.push({
            room_code: 'SB196',
            room_name: 'School Age Toilet Room',
            functional_area: FA3,
            nsf: 100,
            quantity: schoolQty
        });
    }
    
    // FA4: SUPPORT AREA
    const FA4 = 'Support Area';
    
    // Multi-purpose / Large Muscle Room
    let multiNSF = 300;
    if (totalChildren >= 46 && totalChildren <= 91) multiNSF = 500;
    else if (totalChildren >= 92 && totalChildren <= 159) multiNSF = 700;
    else if (totalChildren >= 160) multiNSF = 900;
    
    rooms.push({
        room_code: 'SS101',
        room_name: 'Multi-Purpose / Large Muscle Room',
        functional_area: FA4,
        nsf: multiNSF,
        quantity: 1
    });
    
    // Kitchen
    let kitchenNSF = 120;
    if (totalChildren >= 46 && totalChildren <= 125) kitchenNSF = 180;
    else if (totalChildren >= 126) kitchenNSF = 260;
    
    rooms.push({
        room_code: 'SV271',
        room_name: 'Childcare Center Kitchen',
        functional_area: FA4,
        nsf: kitchenNSF,
        quantity: 1
    });
    
    // Isolation Room (sick child)
    rooms.push({
        room_code: 'SS111',
        room_name: 'Childcare Center Isolation Room',
        functional_area: FA4,
        nsf: 80,
        quantity: 1
    });
    
    // Laundry Room
    rooms.push({
        room_code: 'SC450',
        room_name: 'Childcare Center Laundry Room',
        functional_area: FA4,
        nsf: 60,
        quantity: 1
    });
    
    // Outdoor Play Area (noted but not calculated as part of NSF)
    // This is typically handled as exterior space in the architectural program
    
    return rooms;
}

export const CHAPTER_420 = {
    ...CHAPTER_420_CONFIG,
    calculate: calculateRooms_420
};
