// Chapter 400: Library Service
// Health Science Library and Patient Education Resource Center (PERC)

export const CHAPTER_400_CONFIG = {
    id: '400',
    name: 'Library Service',
    description: 'Health Science Library and Patient Education Resource Center (PERC)',
    
    inputFields: [
        {
            id: 'hcds_level',
            label: 'Health Care Delivery/Support (HCD/S) Staff Level',
            type: 'select',
            options: [
                { value: 'A', label: 'Level A (Small - 100-300 staff)' },
                { value: 'B', label: 'Level B (Medium - 301-600 staff)' },
                { value: 'C', label: 'Level C (Large - 601-1000 staff)' },
                { value: 'D', label: 'Level D (Major - 1001+ staff)' }
            ],
            defaultValue: 'B',
            helpText: 'Facility staff level based on total HCD/S FTEs'
        },
        {
            id: 'patient_library_authorized',
            label: 'Patient Library Authorized',
            type: 'boolean',
            defaultValue: true,
            helpText: 'Is a Patient Library/PERC authorized?'
        }
    ],
    
    functionalAreas: [
        { number: '1', name: 'Health Sciences Library Circulation Area' },
        { number: '2', name: 'Health Sciences Library Shelving Area' },
        { number: '3', name: 'Patient Library Area' },
        { number: '4', name: 'Staff and Administrative Area' }
    ]
};

export function calculateRooms_400(inputs) {
    const rooms = [];
    const level = inputs.hcds_level || 'B';
    const patientLibAuth = inputs.patient_library_authorized !== false;
    
    // FA1: HEALTH SCIENCES LIBRARY CIRCULATION AREA
    const FA1 = 'Health Sciences Library Circulation Area';
    
    // Circulation Desk Area
    rooms.push({
        room_code: 'SC501',
        room_name: 'Health Sciences Circulation Desk Area',
        functional_area: FA1,
        nsf: 180,
        quantity: 1
    });
    
    // Computer Reference Workstation
    let compRefQty = 5;
    if (level === 'B') compRefQty = 10;
    else if (level === 'C') compRefQty = 15;
    else if (level === 'D') compRefQty = 20;
    
    rooms.push({
        room_code: 'SC506',
        room_name: 'Health Sciences Computer Reference Workstation',
        functional_area: FA1,
        nsf: 24,
        quantity: compRefQty
    });
    
    // Card Catalog Area
    rooms.push({
        room_code: 'SC511',
        room_name: 'Health Sciences Card Catalog Area',
        functional_area: FA1,
        nsf: 50,
        quantity: 1
    });
    
    // Audiovisual Room
    let avNSF = 250;
    if (level === 'B') avNSF = 325;
    else if (level === 'C' || level === 'D') avNSF = 400;
    
    rooms.push({
        room_code: 'SC516',
        room_name: 'Health Sciences Audiovisual Room',
        functional_area: FA1,
        nsf: avNSF,
        quantity: 1
    });
    
    // Computer Training Room
    rooms.push({
        room_code: 'SS146',
        room_name: 'Library Health Sciences Computer Training Room',
        functional_area: FA1,
        nsf: 545,
        quantity: 1
    });
    
    // Conference Room
    let confNSF = (level === 'A' || level === 'B') ? 240 : 300;
    rooms.push({
        room_code: 'SS101',
        room_name: 'Library Health Sciences Conference Room',
        functional_area: FA1,
        nsf: confNSF,
        quantity: 1
    });
    
    // Microfilm / Print Room
    let printNSF = (level === 'A' || level === 'B') ? 80 : 100;
    rooms.push({
        room_code: 'SC521',
        room_name: 'Health Sciences Microfilm / Print Room',
        functional_area: FA1,
        nsf: printNSF,
        quantity: 1
    });
    
    // Seating Area
    let seatingNSF = 300;
    if (level === 'B') seatingNSF = 600;
    else if (level === 'C') seatingNSF = 900;
    else if (level === 'D') seatingNSF = 1200;
    
    rooms.push({
        room_code: 'SC524',
        room_name: 'Health Sciences Seating Area',
        functional_area: FA1,
        nsf: seatingNSF,
        quantity: 1
    });
    
    // FA2: HEALTH SCIENCES LIBRARY SHELVING AREA
    const FA2 = 'Health Sciences Library Shelving Area';
    
    // Current Periodicals Area
    let periodQty = 2;
    if (level === 'B') periodQty = 4;
    else if (level === 'C') periodQty = 6;
    else if (level === 'D') periodQty = 8;
    
    rooms.push({
        room_code: 'SC531',
        room_name: 'Health Sciences Current Periodicals Area',
        functional_area: FA2,
        nsf: 15,
        quantity: periodQty
    });
    
    // Bound Periodicals Area
    rooms.push({
        room_code: 'SC536',
        room_name: 'Health Sciences Bound Periodicals Area',
        functional_area: FA2,
        nsf: 30,
        quantity: periodQty
    });
    
    // Monograph Collection Area
    let monoQty = 2;
    if (level === 'B') monoQty = 4;
    else if (level === 'C') monoQty = 6;
    else if (level === 'D') monoQty = 8;
    
    rooms.push({
        room_code: 'SC541',
        room_name: 'Health Sciences Monograph Collection Area',
        functional_area: FA2,
        nsf: 30,
        quantity: monoQty
    });
    
    // Reference Collection Area
    rooms.push({
        room_code: 'SC546',
        room_name: 'Health Sciences Reference Collection Area',
        functional_area: FA2,
        nsf: 30,
        quantity: monoQty
    });
    
    // FA3: PATIENT LIBRARY AREA (if authorized)
    if (patientLibAuth) {
        const FA3 = 'Patient Library Area';
        
        // Patient Library Circulation Desk
        rooms.push({
            room_code: 'SC551',
            room_name: 'Patient Library Circulation Desk',
            functional_area: FA3,
            nsf: 100,
            quantity: 1
        });
        
        // Patient Library Seating Area
        let patSeatingNSF = 200;
        if (level === 'B') patSeatingNSF = 300;
        else if (level === 'C') patSeatingNSF = 400;
        else if (level === 'D') patSeatingNSF = 500;
        
        rooms.push({
            room_code: 'SC556',
            room_name: 'Patient Library Seating Area',
            functional_area: FA3,
            nsf: patSeatingNSF,
            quantity: 1
        });
        
        // Patient Library Collection Area
        let collectionNSF = 100;
        if (level === 'B') collectionNSF = 150;
        else if (level === 'C') collectionNSF = 200;
        else if (level === 'D') collectionNSF = 250;
        
        rooms.push({
            room_code: 'SC561',
            room_name: 'Patient Library Collection Area',
            functional_area: FA3,
            nsf: collectionNSF,
            quantity: 1
        });
        
        // Computer Workstations for Patients
        let patCompQty = 2;
        if (level === 'B') patCompQty = 4;
        else if (level === 'C') patCompQty = 6;
        else if (level === 'D') patCompQty = 8;
        
        rooms.push({
            room_code: 'SC566',
            room_name: 'Patient Library Computer Workstation',
            functional_area: FA3,
            nsf: 24,
            quantity: patCompQty
        });
    }
    
    // FA4: STAFF AND ADMINISTRATIVE AREA
    const FA4 = 'Staff and Administrative Area';
    
    // Librarian Office
    rooms.push({
        room_code: 'SS031',
        room_name: 'Librarian Office',
        functional_area: FA4,
        nsf: 120,
        quantity: 1
    });
    
    // Library Technician Workstations
    let techQty = 1;
    if (level === 'B') techQty = 2;
    else if (level === 'C') techQty = 3;
    else if (level === 'D') techQty = 4;
    
    rooms.push({
        room_code: 'SS218',
        room_name: 'Library Technician Workstation',
        functional_area: FA4,
        nsf: 48,
        quantity: techQty
    });
    
    // Work Room
    let workNSF = 100;
    if (level === 'B' || level === 'C') workNSF = 150;
    else if (level === 'D') workNSF = 200;
    
    rooms.push({
        room_code: 'SS301',
        room_name: 'Library Work Room',
        functional_area: FA4,
        nsf: workNSF,
        quantity: 1
    });
    
    // Storage Room
    let storageNSF = 60;
    if (level === 'B') storageNSF = 80;
    else if (level === 'C') storageNSF = 100;
    else if (level === 'D') storageNSF = 120;
    
    rooms.push({
        room_code: 'SB244',
        room_name: 'Library Storage Room',
        functional_area: FA4,
        nsf: storageNSF,
        quantity: 1
    });
    
    return rooms;
}

export const CHAPTER_400 = {
    ...CHAPTER_400_CONFIG,
    calculate: calculateRooms_400
};
