// Chapter 279: Police Service
// Provides law enforcement operations and security for VA facilities

export function calculateRooms_279(inputs) {
    const rooms = [];
    const detectiveFTE = inputs.detective_fte || 0;
    const officerFTE = inputs.officer_fte || 0;
    const totalFTE = detectiveFTE + officerFTE;

    // FA1: DUTY AREA
    const FA1_NAME = 'Duty Area';

    // Operations Room - scales with total FTE
    let operationsNSF;
    if (totalFTE >= 2 && totalFTE <= 4) operationsNSF = 120;
    else if (totalFTE >= 5 && totalFTE <= 8) operationsNSF = 240;
    else if (totalFTE >= 9 && totalFTE <= 12) operationsNSF = 360;
    else operationsNSF = 0;

    if (operationsNSF > 0) {
        rooms.push({
            room_code: 'SB811',
            room_name: 'Police Svc Operations Room',
            functional_area: FA1_NAME,
            nsf: operationsNSF,
            quantity: 1
        });
    }

    // Holding Room
    if (totalFTE >= 2 && totalFTE <= 12) {
        rooms.push({
            room_code: 'SB816',
            room_name: 'Police Svc Holding Room',
            functional_area: FA1_NAME,
            nsf: 60,
            quantity: 1
        });
    }

    // Equipment / Evidence Room
    let evidenceNSF;
    if (totalFTE >= 2 && totalFTE <= 4) evidenceNSF = 80;
    else if (totalFTE >= 5 && totalFTE <= 8) evidenceNSF = 100;
    else if (totalFTE >= 9 && totalFTE <= 12) evidenceNSF = 120;
    else evidenceNSF = 0;

    if (evidenceNSF > 0) {
        rooms.push({
            room_code: 'SB821',
            room_name: 'Police Svc Equipment / Evidence Room',
            functional_area: FA1_NAME,
            nsf: evidenceNSF,
            quantity: 1
        });
    }

    // Armory / Weapons Storage Room
    if (totalFTE >= 2 && totalFTE <= 12) {
        rooms.push({
            room_code: 'SB831',
            room_name: 'Police Svc Armory / Weapons Storage Room',
            functional_area: FA1_NAME,
            nsf: 60,
            quantity: 1
        });
    }

    // Identification / Registration Issuance
    let idQty;
    if (totalFTE >= 2 && totalFTE <= 4) idQty = 1;
    else if (totalFTE >= 5 && totalFTE <= 8) idQty = 2;
    else if (totalFTE >= 9 && totalFTE <= 12) idQty = 3;
    else idQty = 0;

    if (idQty > 0) {
        rooms.push({
            room_code: 'SB841',
            room_name: 'Police Svc Identification / Registration Issuance',
            functional_area: FA1_NAME,
            nsf: 80,
            quantity: idQty
        });
    }

    // Staff Conference Room
    let conferenceNSF;
    if (totalFTE >= 2 && totalFTE <= 4) conferenceNSF = 240;
    else if (totalFTE >= 5 && totalFTE <= 12) conferenceNSF = 300;
    else conferenceNSF = 0;

    if (conferenceNSF > 0) {
        rooms.push({
            room_code: 'SS101',
            room_name: 'Police Svc Staff Conference Room',
            functional_area: FA1_NAME,
            nsf: conferenceNSF,
            quantity: 1
        });
    }

    // FA2: STAFF AND ADMINISTRATIVE AREA
    const FA2_NAME = 'Staff and Administrative Area';

    // Chief Office - only for FTE 5-12
    if (totalFTE >= 5 && totalFTE <= 12) {
        rooms.push({
            room_code: 'SS204',
            room_name: 'Police Svc Chief Office',
            functional_area: FA2_NAME,
            nsf: 100,
            quantity: 1
        });
    }

    // Assistant Chief Office
    if (totalFTE >= 2 && totalFTE <= 12) {
        rooms.push({
            room_code: 'SS204',
            room_name: 'Police Svc Assistant Chief Office',
            functional_area: FA2_NAME,
            nsf: 100,
            quantity: 1
        });
    }

    // Detective Workstation - only for detective FTE 5-12
    let detectiveWorkstationQty;
    if (detectiveFTE >= 5 && detectiveFTE <= 8) detectiveWorkstationQty = 2;
    else if (detectiveFTE >= 9 && detectiveFTE <= 12) detectiveWorkstationQty = 4;
    else detectiveWorkstationQty = 0;

    if (detectiveWorkstationQty > 0) {
        rooms.push({
            room_code: 'SS218',
            room_name: 'Police Svc Detective Workstation',
            functional_area: FA2_NAME,
            nsf: 56,
            quantity: detectiveWorkstationQty
        });
    }

    // Clerical Workstation
    let clericalQty;
    if (totalFTE >= 2 && totalFTE <= 4) clericalQty = 1;
    else if (totalFTE >= 5 && totalFTE <= 8) clericalQty = 2;
    else if (totalFTE >= 9 && totalFTE <= 12) clericalQty = 3;
    else clericalQty = 0;

    if (clericalQty > 0) {
        rooms.push({
            room_code: 'SS218',
            room_name: 'Police Svc Clerical Workstation',
            functional_area: FA2_NAME,
            nsf: 56,
            quantity: clericalQty
        });
    }

    // Staff Breakroom
    if (totalFTE >= 2 && totalFTE <= 12) {
        rooms.push({
            room_code: 'SS262',
            room_name: 'Police Svc Staff Breakroom',
            functional_area: FA2_NAME,
            nsf: 120,
            quantity: 1
        });
    }

    // Female Staff Locker Room
    if (totalFTE >= 2 && totalFTE <= 12) {
        rooms.push({
            room_code: 'SS232',
            room_name: 'Police Svc Female Staff Locker Room',
            functional_area: FA2_NAME,
            nsf: 80,
            quantity: 1
        });
    }

    // Female Staff Toilet / Shower
    if (totalFTE >= 2 && totalFTE <= 12) {
        rooms.push({
            room_code: 'SB173',
            room_name: 'Police Svc Female Staff Toilet / Shower',
            functional_area: FA2_NAME,
            nsf: 85,
            quantity: 1
        });
    }

    // Male Staff Locker Room
    let maleLockerNSF;
    if (totalFTE >= 2 && totalFTE <= 4) maleLockerNSF = 100;
    else if (totalFTE >= 5 && totalFTE <= 8) maleLockerNSF = 120;
    else if (totalFTE >= 9 && totalFTE <= 12) maleLockerNSF = 140;
    else maleLockerNSF = 0;

    if (maleLockerNSF > 0) {
        rooms.push({
            room_code: 'SS241',
            room_name: 'Police Svc Male Staff Locker Room',
            functional_area: FA2_NAME,
            nsf: maleLockerNSF,
            quantity: 1
        });
    }

    // Male Staff Toilet / Shower
    if (totalFTE >= 2 && totalFTE <= 12) {
        rooms.push({
            room_code: 'SB185',
            room_name: 'Police Svc Male Staff Toilet / Shower',
            functional_area: FA2_NAME,
            nsf: 85,
            quantity: 1
        });
    }

    return rooms;
}

export const CHAPTER_279_CONFIG = {
    chapter: '279',
    title: 'Police Service',
    ntdg_factor: 1.30,
    inputs: [
        {
            id: 'detective_fte',
            label: 'How many Detective FTE positions are authorized?',
            type: 'number',
            min: 1,
            max: 3,
            default: 1
        },
        {
            id: 'officer_fte',
            label: 'How many Police Officer FTE positions are authorized?',
            type: 'number',
            min: 1,
            max: 9,
            default: 3
        }
    ]
};
