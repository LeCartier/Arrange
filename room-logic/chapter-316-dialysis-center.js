// Chapter 316: Dialysis Center
// Renal Dialysis treatment facilities for hemodialysis and peritoneal dialysis

export const CHAPTER_316_CONFIG = {
    id: '316',
    name: 'Dialysis Center',
    description: 'Renal Dialysis Center for Hemodialysis and Peritoneal Dialysis Treatment',
    
    inputFields: [
        {
            id: 'dialysis_stops',
            label: 'Annual Renal Dialysis Clinic Stops',
            type: 'number',
            min: 94,
            max: 11660,
            defaultValue: 2650,
            helpText: 'Annual projected clinic stops for Renal Dialysis (94-11,660)'
        }
    ],
    
    functionalAreas: [
        { number: '1', name: 'Reception Area' },
        { number: '2', name: 'Patient Area' },
        { number: '3', name: 'Support Area' },
        { number: '4', name: 'Water Treatment Area' },
        { number: '5', name: 'Staff and Administrative Area' }
    ]
};

// Helper to calculate number of dialysis stations from stops
function getDialysisStations(stops) {
    // Average throughput is 530 encounters per station per year
    return Math.ceil(stops / 530);
}

export function calculateRooms_316(inputs) {
    const rooms = [];
    const stops = inputs.dialysis_stops || 0;
    
    if (stops < 94) return rooms;
    
    const stations = getDialysisStations(stops);
    
    // FA1: RECEPTION AREA
    const FA1 = 'Reception Area';
    
    // Waiting Area
    let waitingNSF = 80;
    if (stations >= 4 && stations <= 5) waitingNSF = 110;
    else if (stations >= 6 && stations <= 7) waitingNSF = 150;
    else if (stations >= 8 && stations <= 9) waitingNSF = 190;
    else if (stations >= 10 && stations <= 11) waitingNSF = 240;
    else if (stations >= 12 && stations <= 13) waitingNSF = 275;
    else if (stations >= 14 && stations <= 15) waitingNSF = 310;
    else if (stations >= 16 && stations <= 17) waitingNSF = 350;
    else if (stations >= 18 && stations <= 19) waitingNSF = 395;
    else if (stations >= 20) waitingNSF = 415;
    
    rooms.push({
        room_code: 'SB003',
        room_name: 'Dialysis Center Waiting',
        functional_area: FA1,
        nsf: waitingNSF,
        quantity: 1
    });
    
    // Reception
    let receptionNSF = stations >= 11 ? 260 : 85;
    rooms.push({
        room_code: 'SC183',
        room_name: 'Dialysis Center Reception',
        functional_area: FA1,
        nsf: receptionNSF,
        quantity: 1
    });
    
    // Visitor Toilets
    rooms.push({
        room_code: 'SB191',
        room_name: 'Dialysis Center Visitor Toilet',
        functional_area: FA1,
        nsf: 60,
        quantity: 2
    });
    
    // FA2: PATIENT AREA
    const FA2 = 'Patient Area';
    
    // Private Bed Station
    let bedStationQty = stops >= 5301 ? 2 : 1;
    rooms.push({
        room_code: 'CDL01',
        room_name: 'Private Bed Station',
        functional_area: FA2,
        nsf: 150,
        quantity: bedStationQty
    });
    
    // Bed Station Patient Toilet
    rooms.push({
        room_code: 'SB201',
        room_name: 'Dialysis Bed Station Patient Toilet',
        functional_area: FA2,
        nsf: 60,
        quantity: bedStationQty
    });
    
    // Isolation Negative Pressure Bed Station
    let isoStationQty = stops >= 5301 ? 2 : 1;
    rooms.push({
        room_code: 'CDL03',
        room_name: 'Isolation Negative Pressure Bed Station',
        functional_area: FA2,
        nsf: 150,
        quantity: isoStationQty
    });
    
    // Isolation Bed Station Toilet
    rooms.push({
        room_code: 'SB201',
        room_name: 'Dialysis Isolation Bed Station Patient Toilet',
        functional_area: FA2,
        nsf: 60,
        quantity: isoStationQty
    });
    
    // Chair Station Cubicle
    let chairQty = 1;
    if (stops >= 2121 && stops <= 2650) chairQty = 2;
    else if (stops >= 2651 && stops <= 3180) chairQty = 3;
    else if (stops >= 3181 && stops <= 3710) chairQty = 4;
    else if (stops >= 3711 && stops <= 4240) chairQty = 5;
    else if (stops >= 4241 && stops <= 5300) chairQty = 6;
    else if (stops >= 5301 && stops <= 5830) chairQty = 5;
    else if (stops >= 5831 && stops <= 6360) chairQty = 6;
    else if (stops >= 6361 && stops <= 6890) chairQty = 7;
    else if (stops >= 6891 && stops <= 7420) chairQty = 8;
    else if (stops >= 7421 && stops <= 7950) chairQty = 9;
    else if (stops >= 7951 && stops <= 8480) chairQty = 10;
    else if (stops >= 8481 && stops <= 9010) chairQty = 11;
    else if (stops >= 9011 && stops <= 9540) chairQty = 12;
    else if (stops >= 9541 && stops <= 10070) chairQty = 13;
    else if (stops >= 10071 && stops <= 11130) chairQty = 14;
    else if (stops >= 11131) chairQty = 15;
    
    rooms.push({
        room_code: 'CDL05',
        room_name: 'Chair Station Cubicle',
        functional_area: FA2,
        nsf: 80,
        quantity: chairQty
    });
    
    // Bed Station Cubicle
    let bedCubicleQty = 1;
    if (stops >= 4771 && stops <= 10600) bedCubicleQty = 2;
    else if (stops >= 10601) bedCubicleQty = 3;
    
    rooms.push({
        room_code: 'CDL07',
        room_name: 'Bed Station Cubicle',
        functional_area: FA2,
        nsf: 100,
        quantity: bedCubicleQty
    });
    
    // Nurse Station
    let nurseQty = stations >= 11 ? 2 : 1;
    rooms.push({
        room_code: 'SC152',
        room_name: 'Dialysis Center Nurse Station',
        functional_area: FA2,
        nsf: 120,
        quantity: nurseQty
    });
    
    // Exam Room
    let examQty = stations >= 10 ? 2 : 1;
    rooms.push({
        room_code: 'CDL11',
        room_name: 'Dialysis Exam Room',
        functional_area: FA2,
        nsf: 120,
        quantity: examQty
    });
    
    // Renal Transplant Follow-up Exam Room
    let transplantQty = stations >= 16 ? 2 : 1;
    rooms.push({
        room_code: 'CDL13',
        room_name: 'Renal Transplant Follow-up Exam Room',
        functional_area: FA2,
        nsf: 120,
        quantity: transplantQty
    });
    
    // Consult Room
    let consultQty = stations >= 11 ? 2 : 1;
    rooms.push({
        room_code: 'SC271',
        room_name: 'Dialysis Center Consult Room',
        functional_area: FA2,
        nsf: 120,
        quantity: consultQty
    });
    
    // Staff Training Room
    let trainingQty = stations >= 11 ? 2 : 1;
    rooms.push({
        room_code: 'SS111',
        room_name: 'Dialysis Center Staff Training Room',
        functional_area: FA2,
        nsf: 100,
        quantity: trainingQty
    });
    
    // Patient Toilet
    let ptToiletQty = stations >= 11 ? 2 : 1;
    rooms.push({
        room_code: 'SB201',
        room_name: 'Dialysis Center Patient Toilet',
        functional_area: FA2,
        nsf: 60,
        quantity: ptToiletQty
    });
    
    // Patient Locker Room
    let lockerNSF = 100;
    if (stations >= 6 && stations <= 10) lockerNSF = 120;
    else if (stations >= 11 && stations <= 15) lockerNSF = 140;
    else if (stations >= 16) lockerNSF = 160;
    
    rooms.push({
        room_code: 'SB208',
        room_name: 'Dialysis Center Patient Locker Room',
        functional_area: FA2,
        nsf: lockerNSF,
        quantity: 1
    });
    
    // FA3: SUPPORT AREA
    const FA3 = 'Support Area';
    
    // Soiled Utility Room
    let soiledNSF = 80;
    if (stations >= 6 && stations <= 10) soiledNSF = 100;
    else if (stations >= 11 && stations <= 15) soiledNSF = 120;
    else if (stations >= 16) soiledNSF = 140;
    
    rooms.push({
        room_code: 'SB743',
        room_name: 'Dialysis Center Soiled Utility Room',
        functional_area: FA3,
        nsf: soiledNSF,
        quantity: 1
    });
    
    // Clean Utility Room
    let cleanNSF = 100;
    if (stations >= 6 && stations <= 10) cleanNSF = 120;
    else if (stations >= 11 && stations <= 15) cleanNSF = 140;
    else if (stations >= 16) cleanNSF = 180;
    
    rooms.push({
        room_code: 'SB737',
        room_name: 'Dialysis Center Clean Utility Room',
        functional_area: FA3,
        nsf: cleanNSF,
        quantity: 1
    });
    
    // Clean Supply Storage Room
    let cleanSupplyNSF = 80;
    if (stations >= 6 && stations <= 10) cleanSupplyNSF = 100;
    else if (stations >= 11 && stations <= 15) cleanSupplyNSF = 120;
    else if (stations >= 16) cleanSupplyNSF = 140;
    
    rooms.push({
        room_code: 'CDL21',
        room_name: 'Dialysis Clean Supply Storage Room',
        functional_area: FA3,
        nsf: cleanSupplyNSF,
        quantity: 1
    });
    
    // Sterile Supply Storage Room
    rooms.push({
        room_code: 'CDL28',
        room_name: 'Dialysis Sterile Supply Storage Room',
        functional_area: FA3,
        nsf: cleanSupplyNSF,
        quantity: 1
    });
    
    // Clean Linen Room
    let linenNSF = 60;
    if (stations >= 6 && stations <= 10) linenNSF = 70;
    else if (stations >= 11 && stations <= 15) linenNSF = 80;
    else if (stations >= 16) linenNSF = 90;
    
    rooms.push({
        room_code: 'SC471',
        room_name: 'Dialysis Center Clean Linen Room',
        functional_area: FA3,
        nsf: linenNSF,
        quantity: 1
    });
    
    // Equipment Storage Room
    let equipStorageNSF = 100;
    if (stations >= 6 && stations <= 10) equipStorageNSF = 120;
    else if (stations >= 11 && stations <= 15) equipStorageNSF = 140;
    else if (stations >= 16) equipStorageNSF = 160;
    
    rooms.push({
        room_code: 'CDL31',
        room_name: 'Dialysis Equipment Storage Room',
        functional_area: FA3,
        nsf: equipStorageNSF,
        quantity: 1
    });
    
    // Nourishment Room
    let nourishNSF = 80;
    if (stations >= 6 && stations <= 10) nourishNSF = 100;
    else if (stations >= 11 && stations <= 15) nourishNSF = 120;
    else if (stations >= 16) nourishNSF = 140;
    
    rooms.push({
        room_code: 'SV272',
        room_name: 'Dialysis Center Nourishment Room',
        functional_area: FA3,
        nsf: nourishNSF,
        quantity: 1
    });
    
    // Medication Room
    let medNSF = 80;
    if (stations >= 6 && stations <= 15) medNSF = 100;
    else if (stations >= 16) medNSF = 120;
    
    rooms.push({
        room_code: 'SV583',
        room_name: 'Dialysis Center Medication Room',
        functional_area: FA3,
        nsf: medNSF,
        quantity: 1
    });
    
    // Crash Cart Alcove
    let crashQty = stations >= 11 ? 2 : 1;
    rooms.push({
        room_code: 'SC052',
        room_name: 'Dialysis Center Crash Cart Alcove',
        functional_area: FA3,
        nsf: 20,
        quantity: crashQty
    });
    
    // Biochemistry Laboratory
    let labNSF = stations >= 11 ? 240 : 180;
    rooms.push({
        room_code: 'CDL41',
        room_name: 'Dialysis Biochemistry Laboratory',
        functional_area: FA3,
        nsf: labNSF,
        quantity: 1
    });
    
    // Venipuncture Laboratory
    let veniNSF = stations >= 11 ? 120 : 80;
    rooms.push({
        room_code: 'CDL46',
        room_name: 'Dialysis Venipuncture Laboratory',
        functional_area: FA3,
        nsf: veniNSF,
        quantity: 1
    });
    
    // Equipment Processing / Soiled Receiving
    let soiledProcNSF = stations >= 11 ? 200 : 150;
    rooms.push({
        room_code: 'CDL51',
        room_name: 'Equipment Processing / Soiled Receiving',
        functional_area: FA3,
        nsf: soiledProcNSF,
        quantity: 1
    });
    
    // Equipment Processing / Clean Preparation
    let cleanPrepNSF = stations >= 11 ? 240 : 200;
    rooms.push({
        room_code: 'CDL61',
        room_name: 'Equipment Processing / Clean Preparation',
        functional_area: FA3,
        nsf: cleanPrepNSF,
        quantity: 1
    });
    
    // Equipment Processing / Clean Storage
    let cleanStorNSF = stations >= 11 ? 280 : 200;
    rooms.push({
        room_code: 'CDL64',
        room_name: 'Equipment Processing / Clean Storage',
        functional_area: FA3,
        nsf: cleanStorNSF,
        quantity: 1
    });
    
    // FA4: WATER TREATMENT AREA
    const FA4 = 'Water Treatment Area';
    
    // Water Treatment Room
    let waterNSF = 200;
    if (stations >= 6 && stations <= 10) waterNSF = 300;
    else if (stations >= 11 && stations <= 15) waterNSF = 400;
    else if (stations >= 16) waterNSF = 500;
    
    rooms.push({
        room_code: 'CDL71',
        room_name: 'Water Treatment Room',
        functional_area: FA4,
        nsf: waterNSF,
        quantity: 1
    });
    
    // Dialysate Preparation Room
    let dialysateNSF = 100;
    if (stations >= 6 && stations <= 10) dialysateNSF = 150;
    else if (stations >= 11 && stations <= 15) dialysateNSF = 200;
    else if (stations >= 16) dialysateNSF = 250;
    
    rooms.push({
        room_code: 'CDL76',
        room_name: 'Dialysate Preparation Room',
        functional_area: FA4,
        nsf: dialysateNSF,
        quantity: 1
    });
    
    // FA5: STAFF AND ADMINISTRATIVE AREA
    const FA5 = 'Staff and Administrative Area';
    
    // Physician/Nephrologist Office
    rooms.push({
        room_code: 'SS031',
        room_name: 'Nephrologist Office',
        functional_area: FA5,
        nsf: 120,
        quantity: 1
    });
    
    // Nurse Manager Office
    rooms.push({
        room_code: 'SS031',
        room_name: 'Dialysis Nurse Manager Office',
        functional_area: FA5,
        nsf: 120,
        quantity: 1
    });
    
    // Staff Workstations
    let workstationQty = 2;
    if (stations >= 6 && stations <= 10) workstationQty = 4;
    else if (stations >= 11 && stations <= 15) workstationQty = 6;
    else if (stations >= 16) workstationQty = 8;
    
    rooms.push({
        room_code: 'SS218',
        room_name: 'Dialysis Staff Workstation',
        functional_area: FA5,
        nsf: 48,
        quantity: workstationQty
    });
    
    // Staff Locker Room
    rooms.push({
        room_code: 'SB207',
        room_name: 'Dialysis Staff Locker Room',
        functional_area: FA5,
        nsf: 100,
        quantity: 1
    });
    
    // Staff Toilet
    rooms.push({
        room_code: 'SB191',
        room_name: 'Dialysis Staff Toilet',
        functional_area: FA5,
        nsf: 60,
        quantity: 1
    });
    
    // Conference Room
    if (stations >= 6) {
        rooms.push({
            room_code: 'SS101',
            room_name: 'Dialysis Conference Room',
            functional_area: FA5,
            nsf: 200,
            quantity: 1
        });
    }
    
    return rooms;
}

export const CHAPTER_316 = {
    ...CHAPTER_316_CONFIG,
    calculate: calculateRooms_316
};
