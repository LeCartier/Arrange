// Chapter 280: Service Organizations
// Provides office space for representatives of national service organizations

export function calculateRooms_280(inputs) {
    const rooms = [];
    const numOrgs = inputs.num_service_orgs || 0;

    // FA1: RECEPTION AREA
    const FA1_NAME = 'Reception Area';

    // Administration Waiting
    let waitingNSF;
    if (numOrgs >= 1 && numOrgs <= 2) waitingNSF = 80;
    else if (numOrgs >= 3 && numOrgs <= 4) waitingNSF = 100;
    else if (numOrgs >= 5 && numOrgs <= 6) waitingNSF = 110;
    else if (numOrgs >= 7 && numOrgs <= 8) waitingNSF = 130;
    else if (numOrgs >= 9 && numOrgs <= 10) waitingNSF = 150;
    else waitingNSF = 0;

    if (waitingNSF > 0) {
        rooms.push({
            room_code: 'WN001',
            room_name: 'Svc Org Administration Waiting',
            functional_area: FA1_NAME,
            nsf: waitingNSF,
            quantity: 1
        });
    }

    // Administration Support Workstation
    let supportQty;
    if (numOrgs >= 1 && numOrgs <= 4) supportQty = 1;
    else if (numOrgs >= 5 && numOrgs <= 7) supportQty = 2;
    else if (numOrgs >= 8 && numOrgs <= 10) supportQty = 3;
    else supportQty = 0;

    if (supportQty > 0) {
        rooms.push({
            room_code: 'SS218',
            room_name: 'Svc Org Administration Support Workstation',
            functional_area: FA1_NAME,
            nsf: 56,
            quantity: supportQty
        });
    }

    // FA2: STAFF AND ADMINISTRATIVE AREA
    const FA2_NAME = 'Staff and Administrative Area';

    // Service Representative Office - 1:1 with org count
    if (numOrgs >= 1 && numOrgs <= 10) {
        rooms.push({
            room_code: 'SS204',
            room_name: 'Svc Org Service Representative Office',
            functional_area: FA2_NAME,
            nsf: 100,
            quantity: numOrgs
        });
    }

    // FA3: SUPPORT AREA
    const FA3_NAME = 'Support Area';

    // Storage Room
    let storageNSF;
    if (numOrgs >= 1 && numOrgs <= 2) storageNSF = 80;
    else if (numOrgs >= 3 && numOrgs <= 4) storageNSF = 100;
    else if (numOrgs >= 5 && numOrgs <= 6) storageNSF = 120;
    else if (numOrgs >= 7 && numOrgs <= 8) storageNSF = 140;
    else if (numOrgs >= 9 && numOrgs <= 10) storageNSF = 160;
    else storageNSF = 0;

    if (storageNSF > 0) {
        rooms.push({
            room_code: 'SB773',
            room_name: 'Svc Org Storage Room',
            functional_area: FA3_NAME,
            nsf: storageNSF,
            quantity: 1
        });
    }

    return rooms;
}

export const CHAPTER_280_CONFIG = {
    chapter: '280',
    title: 'Service Organizations',
    ntdg_factor: 1.20,
    inputs: [
        {
            id: 'num_service_orgs',
            label: 'How many National Service Organizations are authorized?',
            type: 'number',
            min: 1,
            max: 10,
            default: 3
        }
    ]
};
