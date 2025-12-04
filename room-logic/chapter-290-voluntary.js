// Chapter 290: Voluntary Service
// Provides office space and support for voluntary service organizations and volunteers

export function calculateRooms_290(inputs) {
    const rooms = [];
    const numOrgs = inputs.num_voluntary_orgs || 0;

    // FA1: RECEPTION AREA
    const FA1_NAME = 'Reception Area';

    // Voluntary Reception
    if (numOrgs >= 1 && numOrgs <= 20) {
        rooms.push({
            room_code: 'SS221',
            room_name: 'Voluntary Reception',
            functional_area: FA1_NAME,
            nsf: 85,
            quantity: 1
        });
    }

    // Volunteer Check-in Kiosk
    if (numOrgs >= 1 && numOrgs <= 20) {
        rooms.push({
            room_code: 'SC165',
            room_name: 'Voluntary Volunteer Check-in Kiosk',
            functional_area: FA1_NAME,
            nsf: 105,
            quantity: 1
        });
    }

    // FA2: STAFF AND ADMINISTRATIVE AREA
    const FA2_NAME = 'Staff and Administrative Area';

    // Chief Office
    if (numOrgs >= 1 && numOrgs <= 20) {
        rooms.push({
            room_code: 'SS204',
            room_name: 'Voluntary Chief Office',
            functional_area: FA2_NAME,
            nsf: 100,
            quantity: 1
        });
    }

    // Assistant Chief Office
    if (numOrgs >= 1 && numOrgs <= 20) {
        rooms.push({
            room_code: 'SS204',
            room_name: 'Voluntary Assistant Chief Office',
            functional_area: FA2_NAME,
            nsf: 100,
            quantity: 1
        });
    }

    // Officer Workstation
    let officerQty;
    if (numOrgs >= 1 && numOrgs <= 5) officerQty = 1;
    else if (numOrgs >= 6 && numOrgs <= 10) officerQty = 2;
    else if (numOrgs >= 11 && numOrgs <= 15) officerQty = 3;
    else if (numOrgs >= 16 && numOrgs <= 20) officerQty = 4;
    else officerQty = 0;

    if (officerQty > 0) {
        rooms.push({
            room_code: 'SS218',
            room_name: 'Voluntary Officer Workstation',
            functional_area: FA2_NAME,
            nsf: 56,
            quantity: officerQty
        });
    }

    // Clerical Workstation
    let clericalQty;
    if (numOrgs >= 1 && numOrgs <= 5) clericalQty = 1;
    else if (numOrgs >= 6 && numOrgs <= 10) clericalQty = 2;
    else if (numOrgs >= 11 && numOrgs <= 15) clericalQty = 3;
    else if (numOrgs >= 16 && numOrgs <= 20) clericalQty = 4;
    else clericalQty = 0;

    if (clericalQty > 0) {
        rooms.push({
            room_code: 'SS218',
            room_name: 'Voluntary Clerical Workstation',
            functional_area: FA2_NAME,
            nsf: 56,
            quantity: clericalQty
        });
    }

    // FA3: VOLUNTEER AREA
    const FA3_NAME = 'Volunteer Area';

    // Organization Workstation
    let orgWorkstationQty;
    if (numOrgs >= 1 && numOrgs <= 3) orgWorkstationQty = 2;
    else if (numOrgs >= 4 && numOrgs <= 10) orgWorkstationQty = 4;
    else if (numOrgs >= 11 && numOrgs <= 20) orgWorkstationQty = 8;
    else orgWorkstationQty = 0;

    if (orgWorkstationQty > 0) {
        rooms.push({
            room_code: 'SS218',
            room_name: 'Voluntary Organization Workstation',
            functional_area: FA3_NAME,
            nsf: 56,
            quantity: orgWorkstationQty
        });
    }

    // Team Room
    let teamRoomNSF;
    if (numOrgs >= 1 && numOrgs <= 5) teamRoomNSF = 240;
    else if (numOrgs >= 6 && numOrgs <= 10) teamRoomNSF = 300;
    else if (numOrgs >= 11 && numOrgs <= 15) teamRoomNSF = 360;
    else if (numOrgs >= 16 && numOrgs <= 20) teamRoomNSF = 420;
    else teamRoomNSF = 0;

    if (teamRoomNSF > 0) {
        rooms.push({
            room_code: 'SS291',
            room_name: 'Voluntary Team Room',
            functional_area: FA3_NAME,
            nsf: teamRoomNSF,
            quantity: 1
        });
    }

    // Volunteer Breakroom
    let breakroomNSF;
    if (numOrgs >= 1 && numOrgs <= 2) breakroomNSF = 100;
    else if (numOrgs >= 3 && numOrgs <= 5) breakroomNSF = 120;
    else if (numOrgs >= 6 && numOrgs <= 10) breakroomNSF = 180;
    else if (numOrgs >= 11 && numOrgs <= 15) breakroomNSF = 240;
    else if (numOrgs >= 16 && numOrgs <= 20) breakroomNSF = 300;
    else breakroomNSF = 0;

    if (breakroomNSF > 0) {
        rooms.push({
            room_code: 'SS262',
            room_name: 'Voluntary Volunteer Breakroom',
            functional_area: FA3_NAME,
            nsf: breakroomNSF,
            quantity: 1
        });
    }

    // FA4: SUPPORT AREA
    const FA4_NAME = 'Support Area';

    // Storage Room
    let storageNSF;
    if (numOrgs >= 1 && numOrgs <= 2) storageNSF = 80;
    else if (numOrgs >= 3 && numOrgs <= 5) storageNSF = 100;
    else if (numOrgs >= 6 && numOrgs <= 10) storageNSF = 120;
    else if (numOrgs >= 11 && numOrgs <= 15) storageNSF = 140;
    else if (numOrgs >= 16 && numOrgs <= 20) storageNSF = 160;
    else storageNSF = 0;

    if (storageNSF > 0) {
        rooms.push({
            room_code: 'SB773',
            room_name: 'Voluntary Storage Room',
            functional_area: FA4_NAME,
            nsf: storageNSF,
            quantity: 1
        });
    }

    return rooms;
}

export const CHAPTER_290_CONFIG = {
    chapter: '290',
    title: 'Voluntary Service',
    ntdg_factor: 1.20,
    inputs: [
        {
            id: 'num_voluntary_orgs',
            label: 'How many Voluntary Organizations are represented in the Voluntary Hospital Advisory Committee?',
            type: 'number',
            min: 1,
            max: 20,
            default: 5
        }
    ]
};
