// Chapter 282: Social Work Service
// Provides offices and patient areas for social work services

export function calculateRooms_282(inputs) {
    const rooms = [];
    const socialWorkerFTE = inputs.social_worker_fte || 0;

    // FA1: RECEPTION AREA
    const FA1_NAME = 'Reception Area';

    // Waiting
    let waitingNSF;
    if (socialWorkerFTE >= 1 && socialWorkerFTE <= 2) waitingNSF = 80;
    else if (socialWorkerFTE >= 3 && socialWorkerFTE <= 4) waitingNSF = 110;
    else if (socialWorkerFTE >= 5 && socialWorkerFTE <= 6) waitingNSF = 150;
    else if (socialWorkerFTE >= 7 && socialWorkerFTE <= 8) waitingNSF = 190;
    else if (socialWorkerFTE >= 9 && socialWorkerFTE <= 10) waitingNSF = 240;
    else waitingNSF = 0;

    if (waitingNSF > 0) {
        rooms.push({
            room_code: 'WN001',
            room_name: 'SW Svc Waiting',
            functional_area: FA1_NAME,
            nsf: waitingNSF,
            quantity: 1
        });
    }

    // Patient Toilet
    let toiletQty;
    if (socialWorkerFTE >= 1 && socialWorkerFTE <= 6) toiletQty = 1;
    else if (socialWorkerFTE >= 7 && socialWorkerFTE <= 10) toiletQty = 2;
    else toiletQty = 0;

    if (toiletQty > 0) {
        rooms.push({
            room_code: 'SB153',
            room_name: 'SW Svc Patient Toilet',
            functional_area: FA1_NAME,
            nsf: 60,
            quantity: toiletQty
        });
    }

    // FA2: PATIENT AREA
    const FA2_NAME = 'Patient Area';

    // Staff Office - 1:1 with FTE
    if (socialWorkerFTE >= 1 && socialWorkerFTE <= 10) {
        rooms.push({
            room_code: 'SS204',
            room_name: 'SW Svc Staff Office',
            functional_area: FA2_NAME,
            nsf: 130,
            quantity: socialWorkerFTE
        });
    }

    // Associate Workstation
    let associateQty;
    if (socialWorkerFTE >= 1 && socialWorkerFTE <= 2) associateQty = 1;
    else if (socialWorkerFTE >= 3 && socialWorkerFTE <= 4) associateQty = 2;
    else if (socialWorkerFTE >= 5 && socialWorkerFTE <= 6) associateQty = 3;
    else if (socialWorkerFTE >= 7 && socialWorkerFTE <= 8) associateQty = 4;
    else if (socialWorkerFTE >= 9 && socialWorkerFTE <= 10) associateQty = 5;
    else associateQty = 0;

    if (associateQty > 0) {
        rooms.push({
            room_code: 'SS218',
            room_name: 'SW Svc Associate Workstation',
            functional_area: FA2_NAME,
            nsf: 56,
            quantity: associateQty
        });
    }

    // Intern Workstation
    let internQty;
    if (socialWorkerFTE >= 1 && socialWorkerFTE <= 4) internQty = 1;
    else if (socialWorkerFTE >= 5 && socialWorkerFTE <= 7) internQty = 2;
    else if (socialWorkerFTE >= 8 && socialWorkerFTE <= 10) internQty = 3;
    else internQty = 0;

    if (internQty > 0) {
        rooms.push({
            room_code: 'SS218',
            room_name: 'SW Svc Intern Workstation',
            functional_area: FA2_NAME,
            nsf: 56,
            quantity: internQty
        });
    }

    // FA3: STAFF AND ADMINISTRATIVE AREA
    const FA3_NAME = 'Staff and Administrative Area';

    // Chief Office
    if (socialWorkerFTE >= 1 && socialWorkerFTE <= 10) {
        rooms.push({
            room_code: 'SS204',
            room_name: 'SW Svc Chief Office',
            functional_area: FA3_NAME,
            nsf: 130,
            quantity: 1
        });
    }

    // Administration Waiting
    if (socialWorkerFTE >= 1 && socialWorkerFTE <= 10) {
        rooms.push({
            room_code: 'WN001',
            room_name: 'SW Svc Administration Waiting',
            functional_area: FA3_NAME,
            nsf: 80,
            quantity: 1
        });
    }

    // Administration Support Workstation
    let adminSupportQty;
    if (socialWorkerFTE >= 1 && socialWorkerFTE <= 5) adminSupportQty = 1;
    else if (socialWorkerFTE >= 6 && socialWorkerFTE <= 10) adminSupportQty = 2;
    else adminSupportQty = 0;

    if (adminSupportQty > 0) {
        rooms.push({
            room_code: 'SS218',
            room_name: 'SW Svc Administration Support Workstation',
            functional_area: FA3_NAME,
            nsf: 56,
            quantity: adminSupportQty
        });
    }

    // Clerical Workstation
    let clericalQty;
    if (socialWorkerFTE >= 1 && socialWorkerFTE <= 4) clericalQty = 1;
    else if (socialWorkerFTE >= 5 && socialWorkerFTE <= 7) clericalQty = 2;
    else if (socialWorkerFTE >= 8 && socialWorkerFTE <= 10) clericalQty = 3;
    else clericalQty = 0;

    if (clericalQty > 0) {
        rooms.push({
            room_code: 'SS218',
            room_name: 'SW Svc Clerical Workstation',
            functional_area: FA3_NAME,
            nsf: 56,
            quantity: clericalQty
        });
    }

    // Staff Training Room
    let trainingNSF;
    if (socialWorkerFTE >= 1 && socialWorkerFTE <= 4) trainingNSF = 240;
    else if (socialWorkerFTE >= 5 && socialWorkerFTE <= 6) trainingNSF = 300;
    else if (socialWorkerFTE >= 7 && socialWorkerFTE <= 8) trainingNSF = 500;
    else if (socialWorkerFTE >= 9 && socialWorkerFTE <= 10) trainingNSF = 675;
    else trainingNSF = 0;

    if (trainingNSF > 0) {
        rooms.push({
            room_code: 'SS101',
            room_name: 'SW Svc Staff Training Room',
            functional_area: FA3_NAME,
            nsf: trainingNSF,
            quantity: 1
        });
    }

    // Office Equipment Storage
    let storageNSF;
    if (socialWorkerFTE >= 1 && socialWorkerFTE <= 4) storageNSF = 80;
    else if (socialWorkerFTE >= 5 && socialWorkerFTE <= 6) storageNSF = 100;
    else if (socialWorkerFTE >= 7 && socialWorkerFTE <= 8) storageNSF = 120;
    else if (socialWorkerFTE >= 9 && socialWorkerFTE <= 10) storageNSF = 140;
    else storageNSF = 0;

    if (storageNSF > 0) {
        rooms.push({
            room_code: 'SB773',
            room_name: 'SW Svc Office Equipment Storage',
            functional_area: FA3_NAME,
            nsf: storageNSF,
            quantity: 1
        });
    }

    return rooms;
}

export const CHAPTER_282_CONFIG = {
    chapter: '282',
    title: 'Social Work Service',
    ntdg_factor: 1.30,
    inputs: [
        {
            id: 'social_worker_fte',
            label: 'How many Social Worker FTE positions are authorized?',
            type: 'number',
            min: 1,
            max: 10,
            default: 5
        }
    ]
};
