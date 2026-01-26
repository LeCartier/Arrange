// Chapter 269: Recreation Therapy Service
// Provides recreation therapy, creative arts therapy, and self-directed therapy areas

export const CHAPTER_269_CONFIG = {
    id: '269',
    name: 'Recreation Therapy Service',
    description: 'Recreation Therapy, Creative Arts Therapy, and Self-Directed Therapy',
    
    inputFields: [
        {
            id: 'rec_therapy_stops',
            label: 'Recreation Therapy Clinic Stops (Stop Code 202)',
            type: 'number',
            min: 600,
            max: 150000,
            defaultValue: 15000,
            helpText: 'Annual projected clinic stops for Recreation Therapy'
        }
    ],
    
    functionalAreas: [
        { number: '1', name: 'Reception Area' },
        { number: '2', name: 'Recreation / Creative Arts Therapy Area' },
        { number: '3', name: 'Self-Directed Therapy Area' },
        { number: '4', name: 'Aquatic Therapy Area' },
        { number: '5', name: 'Support Area' },
        { number: '6', name: 'Staff and Administrative Area' }
    ]
};

export function calculateRooms_269(inputs) {
    const rooms = [];
    const stops = inputs.rec_therapy_stops || 0;
    
    if (stops < 600) return rooms;
    
    // FA1: RECEPTION AREA
    const FA1 = 'Reception Area';
    
    // General Patient Waiting
    let waitingNSF = 0;
    if (stops >= 600 && stops <= 30000) waitingNSF = 80;
    else if (stops >= 30001 && stops <= 60000) waitingNSF = 100;
    else if (stops >= 60001 && stops <= 90000) waitingNSF = 120;
    else if (stops >= 90001 && stops <= 120000) waitingNSF = 140;
    else if (stops >= 120001 && stops <= 150000) waitingNSF = 160;
    
    if (waitingNSF > 0) {
        rooms.push({
            room_code: 'SB003',
            room_name: 'Rec Thrpy Svc General Patient Waiting',
            functional_area: FA1,
            nsf: waitingNSF,
            quantity: 1
        });
    }
    
    // FA2: RECREATION / CREATIVE ARTS THERAPY AREA
    const FA2 = 'Recreation / Creative Arts Therapy Area';
    
    // Consult Room
    let consultQty = 0;
    if (stops >= 600 && stops <= 75000) consultQty = 1;
    else if (stops >= 75001 && stops <= 150000) consultQty = 2;
    
    if (consultQty > 0) {
        rooms.push({
            room_code: 'SC271',
            room_name: 'Rec Thrpy Consult Room',
            functional_area: FA2,
            nsf: 120,
            quantity: consultQty
        });
    }
    
    // Assessment Room
    let assessQty = 0;
    if (stops >= 600 && stops <= 75000) assessQty = 1;
    else if (stops >= 75001 && stops <= 150000) assessQty = 2;
    
    if (assessQty > 0) {
        rooms.push({
            room_code: 'CT302',
            room_name: 'Assessment Room, Rec Thrpy Svc',
            functional_area: FA2,
            nsf: 140,
            quantity: assessQty
        });
    }
    
    // Group Room Small
    let groupSQty = 0;
    if (stops >= 600 && stops <= 75000) groupSQty = 1;
    else if (stops >= 75001 && stops <= 150000) groupSQty = 2;
    
    if (groupSQty > 0) {
        rooms.push({
            room_code: 'CT303',
            room_name: 'Group Room S, Rec Thrpy Svc',
            functional_area: FA2,
            nsf: 240,
            quantity: groupSQty
        });
        // Storage per group room
        rooms.push({
            room_code: 'CT307',
            room_name: 'Group Room S Storage Room',
            functional_area: FA2,
            nsf: 60,
            quantity: groupSQty
        });
    }
    
    // Group Room Medium
    let groupMQty = 0;
    if (stops >= 45001 && stops <= 105000) groupMQty = 1;
    else if (stops >= 105001 && stops <= 150000) groupMQty = 2;
    
    if (groupMQty > 0) {
        rooms.push({
            room_code: 'CT303',
            room_name: 'Group Room M, Rec Thrpy Svc',
            functional_area: FA2,
            nsf: 400,
            quantity: groupMQty
        });
        rooms.push({
            room_code: 'CT307',
            room_name: 'Group Room M Storage Room',
            functional_area: FA2,
            nsf: 60,
            quantity: groupMQty
        });
    }
    
    // Group Room Large
    if (stops >= 135001 && stops <= 150000) {
        rooms.push({
            room_code: 'CT303',
            room_name: 'Group Room L, Rec Thrpy Svc',
            functional_area: FA2,
            nsf: 800,
            quantity: 1
        });
        rooms.push({
            room_code: 'CT307',
            room_name: 'Group Room L Storage Room',
            functional_area: FA2,
            nsf: 60,
            quantity: 1
        });
    }
    
    // Group Room Monitoring Room
    let monitorQty = 0;
    if (stops >= 600 && stops <= 30000) monitorQty = 1;
    else if (stops >= 30001 && stops <= 60000) monitorQty = 2;
    else if (stops >= 60001 && stops <= 90000) monitorQty = 3;
    else if (stops >= 90001 && stops <= 120000) monitorQty = 4;
    else if (stops >= 120001 && stops <= 150000) monitorQty = 5;
    
    if (monitorQty > 0) {
        rooms.push({
            room_code: 'CT306',
            room_name: 'Group Room Monitoring Room',
            functional_area: FA2,
            nsf: 120,
            quantity: monitorQty
        });
    }
    
    // Dance Program Storage
    rooms.push({
        room_code: 'CT311',
        room_name: 'Dance Program Storage Room',
        functional_area: FA2,
        nsf: 60,
        quantity: 1
    });
    
    // Music Program Storage
    rooms.push({
        room_code: 'CT314',
        room_name: 'Music Program Storage Room',
        functional_area: FA2,
        nsf: 80,
        quantity: 1
    });
    
    // Therapy Assistant/Aide Workstation
    let aideQty = 0;
    if (stops >= 600 && stops <= 30000) aideQty = 2;
    else if (stops >= 30001 && stops <= 60000) aideQty = 3;
    else if (stops >= 60001 && stops <= 90000) aideQty = 4;
    else if (stops >= 90001 && stops <= 120000) aideQty = 5;
    else if (stops >= 120001 && stops <= 150000) aideQty = 6;
    
    if (aideQty > 0) {
        rooms.push({
            room_code: 'SS218',
            room_name: 'Therapy Assistant/Aide Workstation',
            functional_area: FA2,
            nsf: 56,
            quantity: aideQty
        });
    }
    
    // ADL Kitchen
    let adlKitchenQty = 0;
    if (stops >= 600 && stops <= 105000) adlKitchenQty = 1;
    else if (stops >= 105001 && stops <= 150000) adlKitchenQty = 2;
    
    if (adlKitchenQty > 0) {
        rooms.push({
            room_code: 'CT318',
            room_name: 'ADL Kitchen, Rec Thrpy Svc',
            functional_area: FA2,
            nsf: 240,
            quantity: adlKitchenQty
        });
        rooms.push({
            room_code: 'CT319',
            room_name: 'ADL Kitchen Storage Room',
            functional_area: FA2,
            nsf: 60,
            quantity: adlKitchenQty
        });
    }
    
    // Creative Arts Group Therapy Room Small
    let creativeArtsQty = 0;
    if (stops >= 600 && stops <= 75000) creativeArtsQty = 1;
    else if (stops >= 75001 && stops <= 150000) creativeArtsQty = 2;
    
    if (creativeArtsQty > 0) {
        rooms.push({
            room_code: 'CT321',
            room_name: 'Creative Arts Group Therapy Room S',
            functional_area: FA2,
            nsf: 200,
            quantity: creativeArtsQty
        });
        rooms.push({
            room_code: 'CT324',
            room_name: 'Creative Arts S Storage Room',
            functional_area: FA2,
            nsf: 60,
            quantity: creativeArtsQty
        });
    }
    
    // Creative Arts Group Therapy Room Medium
    let creativeArtsMQty = 0;
    if (stops >= 45001 && stops <= 105000) creativeArtsMQty = 1;
    else if (stops >= 105001 && stops <= 150000) creativeArtsMQty = 2;
    
    if (creativeArtsMQty > 0) {
        rooms.push({
            room_code: 'CT321',
            room_name: 'Creative Arts Group Therapy Room M',
            functional_area: FA2,
            nsf: 400,
            quantity: creativeArtsMQty
        });
        rooms.push({
            room_code: 'CT324',
            room_name: 'Creative Arts M Storage Room',
            functional_area: FA2,
            nsf: 120,
            quantity: creativeArtsMQty
        });
    }
    
    // Creative Arts Therapist Workstation
    let creativeTherapistQty = 0;
    if (stops >= 600 && stops <= 30000) creativeTherapistQty = 2;
    else if (stops >= 30001 && stops <= 60000) creativeTherapistQty = 3;
    else if (stops >= 60001 && stops <= 90000) creativeTherapistQty = 4;
    else if (stops >= 90001 && stops <= 120000) creativeTherapistQty = 5;
    else if (stops >= 120001 && stops <= 150000) creativeTherapistQty = 6;
    
    if (creativeTherapistQty > 0) {
        rooms.push({
            room_code: 'SS218',
            room_name: 'Creative Arts Therapist Workstation',
            functional_area: FA2,
            nsf: 56,
            quantity: creativeTherapistQty
        });
    }
    
    // Adaptive Technology Room Small
    let atRoomQty = 0;
    if (stops >= 600 && stops <= 75000) atRoomQty = 1;
    else if (stops >= 75001 && stops <= 150000) atRoomQty = 2;
    
    if (atRoomQty > 0) {
        rooms.push({
            room_code: 'CT331',
            room_name: 'Adaptive Technology (AT) S Room',
            functional_area: FA2,
            nsf: 400,
            quantity: atRoomQty
        });
        rooms.push({
            room_code: 'CT334',
            room_name: 'Adaptive Technology S Storage Room',
            functional_area: FA2,
            nsf: 180,
            quantity: atRoomQty
        });
    }
    
    // Patient Toilets
    let patientToiletQty = 0;
    if (stops >= 600 && stops <= 90000) patientToiletQty = 1;
    else if (stops >= 90001 && stops <= 150000) patientToiletQty = 2;
    
    if (patientToiletQty > 0) {
        rooms.push({
            room_code: 'SB201',
            room_name: 'Recreation/Creative Arts Patient Toilet',
            functional_area: FA2,
            nsf: 60,
            quantity: patientToiletQty
        });
        rooms.push({
            room_code: 'SB163',
            room_name: 'Recreation/Creative Arts Bariatric Patient Toilet',
            functional_area: FA2,
            nsf: 75,
            quantity: patientToiletQty
        });
    }
    
    // Staff Toilet
    rooms.push({
        room_code: 'SB191',
        room_name: 'Recreation/Creative Arts Staff Universal Toilet',
        functional_area: FA2,
        nsf: 60,
        quantity: 1
    });
    
    // Clean/Soiled Utility
    let utilityQty = 0;
    if (stops >= 600 && stops <= 75000) utilityQty = 1;
    else if (stops >= 75001 && stops <= 150000) utilityQty = 2;
    
    if (utilityQty > 0) {
        rooms.push({
            room_code: 'SB737',
            room_name: 'Recreation/Creative Arts Clean Utility Room',
            functional_area: FA2,
            nsf: 80,
            quantity: utilityQty
        });
        rooms.push({
            room_code: 'SB743',
            room_name: 'Recreation/Creative Arts Soiled Utility Room',
            functional_area: FA2,
            nsf: 80,
            quantity: utilityQty
        });
    }
    
    // HAC
    let hacNSF = 0;
    if (stops >= 600 && stops <= 75000) hacNSF = 60;
    else if (stops >= 75001 && stops <= 150000) hacNSF = 80;
    
    if (hacNSF > 0) {
        rooms.push({
            room_code: 'SB244',
            room_name: 'Recreation/Creative Arts HAC',
            functional_area: FA2,
            nsf: hacNSF,
            quantity: 1
        });
    }
    
    // FA3: SELF-DIRECTED THERAPY AREA
    const FA3 = 'Self-Directed Therapy Area';
    
    // Self Directed Therapy Waiting
    let sdWaitingNSF = 0;
    if (stops >= 600 && stops <= 30000) sdWaitingNSF = 100;
    else if (stops >= 30001 && stops <= 60000) sdWaitingNSF = 130;
    else if (stops >= 60001 && stops <= 90000) sdWaitingNSF = 150;
    else if (stops >= 90001 && stops <= 120000) sdWaitingNSF = 170;
    else if (stops >= 120001 && stops <= 150000) sdWaitingNSF = 190;
    
    if (sdWaitingNSF > 0) {
        rooms.push({
            room_code: 'SB003',
            room_name: 'Self Directed Therapy Waiting',
            functional_area: FA3,
            nsf: sdWaitingNSF,
            quantity: 1
        });
    }
    
    // Locker Rooms
    let lockerNSF = 0;
    if (stops >= 600 && stops <= 30000) lockerNSF = 100;
    else if (stops >= 30001 && stops <= 60000) lockerNSF = 140;
    else if (stops >= 60001 && stops <= 90000) lockerNSF = 180;
    else if (stops >= 90001 && stops <= 120000) lockerNSF = 220;
    else if (stops >= 120001 && stops <= 150000) lockerNSF = 260;
    
    if (lockerNSF > 0) {
        rooms.push({
            room_code: 'SB209',
            room_name: 'Gross Motor Activity Female Patient Locker Room',
            functional_area: FA3,
            nsf: lockerNSF,
            quantity: 1
        });
        rooms.push({
            room_code: 'SB210',
            room_name: 'Gross Motor Activity Male Patient Locker Room',
            functional_area: FA3,
            nsf: lockerNSF,
            quantity: 1
        });
    }
    
    // Universal Locker Room
    let univLockerNSF = 0;
    if (stops >= 600 && stops <= 75000) univLockerNSF = 100;
    else if (stops >= 75001 && stops <= 150000) univLockerNSF = 140;
    
    if (univLockerNSF > 0) {
        rooms.push({
            room_code: 'SB208',
            room_name: 'Gross Motor Activity Universal Patient Locker Room',
            functional_area: FA3,
            nsf: univLockerNSF,
            quantity: 1
        });
    }
    
    // Universal Patient Toilet
    let univToiletQty = 0;
    if (stops >= 600 && stops <= 75000) univToiletQty = 2;
    else if (stops >= 75001 && stops <= 150000) univToiletQty = 3;
    
    if (univToiletQty > 0) {
        rooms.push({
            room_code: 'SB201',
            room_name: 'Gross Motor Activity Universal Patient Toilet',
            functional_area: FA3,
            nsf: 60,
            quantity: univToiletQty
        });
    }
    
    // Gross Motor Activity Room
    let grossMotorQty = 0;
    if (stops >= 600 && stops <= 45000) grossMotorQty = 1;
    else if (stops >= 45001 && stops <= 105000) grossMotorQty = 2;
    else if (stops >= 105001 && stops <= 150000) grossMotorQty = 3;
    
    if (grossMotorQty > 0) {
        rooms.push({
            room_code: 'CT367',
            room_name: 'Gross Motor Activity Room',
            functional_area: FA3,
            nsf: 240,
            quantity: grossMotorQty
        });
        rooms.push({
            room_code: 'CT368',
            room_name: 'Gross Motor Activity Storage Room',
            functional_area: FA3,
            nsf: 80,
            quantity: grossMotorQty
        });
    }
    
    // Wellness Room
    let wellnessQty = 0;
    if (stops >= 600 && stops <= 45000) wellnessQty = 1;
    else if (stops >= 45001 && stops <= 105000) wellnessQty = 2;
    else if (stops >= 105001 && stops <= 150000) wellnessQty = 3;
    
    if (wellnessQty > 0) {
        rooms.push({
            room_code: 'CT361',
            room_name: 'Wellness Room',
            functional_area: FA3,
            nsf: 140,
            quantity: wellnessQty
        });
        rooms.push({
            room_code: 'CT364',
            room_name: 'Wellness Room Storage Room',
            functional_area: FA3,
            nsf: 80,
            quantity: wellnessQty
        });
    }
    
    // Gymnasium Locker Rooms
    let gymLockerNSF = 0;
    if (stops >= 600 && stops <= 75000) gymLockerNSF = 150;
    else if (stops >= 75001 && stops <= 150000) gymLockerNSF = 200;
    
    if (gymLockerNSF > 0) {
        rooms.push({
            room_code: 'SB209',
            room_name: 'Gymnasium Female Patient Locker Room',
            functional_area: FA3,
            nsf: gymLockerNSF,
            quantity: 1
        });
        rooms.push({
            room_code: 'SB210',
            room_name: 'Gymnasium Male Patient Locker Room',
            functional_area: FA3,
            nsf: gymLockerNSF,
            quantity: 1
        });
    }
    
    // Gymnasium Toilet/Shower
    let gymToiletQty = 0;
    if (stops >= 600 && stops <= 75000) gymToiletQty = 1;
    else if (stops >= 75001 && stops <= 150000) gymToiletQty = 2;
    
    if (gymToiletQty > 0) {
        rooms.push({
            room_code: 'SB176',
            room_name: 'Gymnasium Female Patient Toilet/Shower',
            functional_area: FA3,
            nsf: 85,
            quantity: gymToiletQty
        });
        rooms.push({
            room_code: 'SB176',
            room_name: 'Gymnasium Male Patient Toilet/Shower',
            functional_area: FA3,
            nsf: 85,
            quantity: gymToiletQty
        });
    }
    
    return rooms;
}

export const CHAPTER_269 = {
    ...CHAPTER_269_CONFIG,
    calculate: calculateRooms_269
};
