// Chapter 274: Quarters, On-Call
// Provides on-call sleeping quarters and amenities for resident physicians

export function calculateRooms_274(inputs) {
    const rooms = [];
    const affiliated = inputs.affiliated === 'Yes';
    const residentFTE = inputs.resident_fte || 0;

    // FA1: STAFF AREA
    const FA1_NAME = 'Staff Area';

    // Staff Bedroom - quantity depends on affiliation and FTE tiers
    let bedroomQty;
    if (!affiliated) {
        bedroomQty = 1; // Non-affiliated: always 1
    } else {
        // Affiliated: 12-tier scaling based on FTE ranges
        if (residentFTE >= 2 && residentFTE <= 4) bedroomQty = 2;
        else if (residentFTE >= 5 && residentFTE <= 9) bedroomQty = 4;
        else if (residentFTE >= 10 && residentFTE <= 14) bedroomQty = 6;
        else if (residentFTE >= 15 && residentFTE <= 19) bedroomQty = 10;
        else if (residentFTE >= 20 && residentFTE <= 24) bedroomQty = 12;
        else if (residentFTE >= 25 && residentFTE <= 29) bedroomQty = 14;
        else if (residentFTE >= 30 && residentFTE <= 39) bedroomQty = 16;
        else if (residentFTE >= 40 && residentFTE <= 69) bedroomQty = 18;
        else if (residentFTE >= 70 && residentFTE <= 99) bedroomQty = 20;
        else if (residentFTE >= 100 && residentFTE <= 124) bedroomQty = 22;
        else if (residentFTE >= 125 && residentFTE <= 175) bedroomQty = 24;
        else bedroomQty = 0;
    }
    if (bedroomQty > 0) {
        rooms.push({
            room_code: 'SS224',
            room_name: 'Qrtrs On-Call Staff Bedroom',
            functional_area: FA1_NAME,
            nsf: 90,
            quantity: bedroomQty
        });
    }

    // Staff Toilet/Shower - only for non-affiliated
    if (!affiliated) {
        rooms.push({
            room_code: 'SB171',
            room_name: 'Qrtrs On-Call Staff Toilet / Shower',
            functional_area: FA1_NAME,
            nsf: 85,
            quantity: 1
        });
    }

    // Staff Shared Toilet/Shower - only for affiliated, scales with FTE
    if (affiliated) {
        let toiletQty;
        if (residentFTE >= 2 && residentFTE <= 9) toiletQty = 1;
        else if (residentFTE >= 10 && residentFTE <= 24) toiletQty = 2;
        else if (residentFTE >= 25 && residentFTE <= 39) toiletQty = 3;
        else if (residentFTE >= 40 && residentFTE <= 69) toiletQty = 4;
        else if (residentFTE >= 70 && residentFTE <= 99) toiletQty = 5;
        else if (residentFTE >= 100 && residentFTE <= 175) toiletQty = 6;
        else toiletQty = 0;

        if (toiletQty > 0) {
            rooms.push({
                room_code: 'SB183',
                room_name: 'Qrtrs On-Call Staff Shared Toilet / Shower',
                functional_area: FA1_NAME,
                nsf: 85,
                quantity: toiletQty
            });
        }
    }

    // Staff Breakroom - only for affiliated, scales with FTE
    if (affiliated) {
        let breakroomNSF;
        if (residentFTE >= 2 && residentFTE <= 19) breakroomNSF = 140;
        else if (residentFTE >= 20 && residentFTE <= 39) breakroomNSF = 200;
        else if (residentFTE >= 40 && residentFTE <= 69) breakroomNSF = 260;
        else if (residentFTE >= 70 && residentFTE <= 175) breakroomNSF = 320;
        else breakroomNSF = 0;

        if (breakroomNSF > 0) {
            rooms.push({
                room_code: 'SS262',
                room_name: 'Qrtrs On-Call Staff Breakroom',
                functional_area: FA1_NAME,
                nsf: breakroomNSF,
                quantity: 1
            });
        }
    }

    // Breakroom Toilet - only for affiliated (all FTE ranges)
    if (affiliated && residentFTE >= 2 && residentFTE <= 175) {
        rooms.push({
            room_code: 'SB153',
            room_name: 'Qrtrs On-Call Staff Breakroom Toilet',
            functional_area: FA1_NAME,
            nsf: 60,
            quantity: 1
        });
    }

    // Linen Closet - only for affiliated with FTE >= 40
    if (affiliated && residentFTE >= 40 && residentFTE <= 175) {
        rooms.push({
            room_code: 'SC231',
            room_name: 'Qrtrs On-Call Linen Closet',
            functional_area: FA1_NAME,
            nsf: 20,
            quantity: 1
        });
    }

    return rooms;
}

export const CHAPTER_274_CONFIG = {
    chapter: '274',
    title: 'Quarters, On-Call',
    ntdg_factor: 1.30,
    inputs: [
        {
            id: 'affiliated',
            label: 'Is this an affiliated on-call quarters facility? (Select No if Non-Affiliated)',
            type: 'select',
            options: ['Yes', 'No'],
            default: 'Yes'
        },
        {
            id: 'resident_fte',
            label: 'How many Resident FTE positions are authorized?',
            type: 'number',
            min: 2,
            max: 175,
            default: 10
        }
    ]
};
