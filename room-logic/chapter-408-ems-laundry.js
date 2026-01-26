// Chapter 408: Environmental Management Service (EMS) Laundry and Linen Operation
// Based on VA PG-18-9 Space Planning Criteria

export const CHAPTER_408_CONFIG = {
  id: 'chapter-408',
  name: 'Environmental Management Service (EMS) Laundry and Linen Operation',
  description: 'Laundry and linen services including sorting, washing, drying, folding, mending, and distribution of clean linens.',
  
  inputFields: [
    {
      id: 'patient_beds',
      label: 'Total Patient Beds Projected',
      type: 'number',
      min: 1,
      max: 500,
      defaultValue: 100,
      helpText: 'Total patient beds projected for the facility (1-500). Scales space requirements.'
    }
  ],
  
  functionalAreas: [
    'FA 1: Staff and Administrative Area',
    'FA 2: Production Area',
    'FA 3: Medical Center Linen Support Area'
  ]
};

export function calculateRooms_408(inputs) {
  const rooms = [];
  const beds = inputs.patient_beds || 100;
  
  // Determine bed range (1-5 based on 100 beds per range)
  const range = Math.min(5, Math.max(1, Math.ceil(beds / 100)));
  
  // ==========================================
  // FA 1: STAFF AND ADMINISTRATIVE AREA
  // ==========================================
  
  // Plant Manager Office - always 1
  rooms.push({
    room_code: 'SS204',
    room_name: 'EM Svcs Plant Manager Office',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: 100,
    quantity: 1
  });
  
  // Assistant Plant Manager Office - always 1
  rooms.push({
    room_code: 'SS204',
    room_name: 'EM Svcs Assistant Plant Manager Office',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: 100,
    quantity: 1
  });
  
  // Administration Support Workstation
  rooms.push({
    room_code: 'SS218',
    room_name: 'EM Svcs Administration Support Workstation',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: 56,
    quantity: beds > 300 ? 2 : 1
  });
  
  // Vending Alcove
  rooms.push({
    room_code: 'SV692',
    room_name: 'EM Svcs Vending Alcove',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: beds > 300 ? 80 : 60,
    quantity: 1
  });
  
  // Staff Conference Room - size scales with beds
  let confNsf = 240;
  if (beds > 300) confNsf = 500;
  else if (beds > 100) confNsf = 300;
  
  rooms.push({
    room_code: 'SS101',
    room_name: 'EM Svcs Staff Conference Room',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: confNsf,
    quantity: 1
  });
  
  // Administration Storage Room - size scales with beds
  const adminStorageNsfMap = { 1: 100, 2: 140, 3: 180, 4: 200, 5: 220 };
  rooms.push({
    room_code: 'SB773',
    room_name: 'EM Svcs Administration Storage Room',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: adminStorageNsfMap[range],
    quantity: 1
  });
  
  // Staff Breakroom - size scales with beds
  const breakroomNsfMap = { 1: 120, 2: 140, 3: 180, 4: 200, 5: 220 };
  rooms.push({
    room_code: 'SS262',
    room_name: 'EM Svcs Staff Breakroom',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: breakroomNsfMap[range],
    quantity: 1
  });
  
  // Female Staff Locker Room - size scales with beds
  const femaleLockerNsfMap = { 1: 100, 2: 140, 3: 180, 4: 220, 5: 260 };
  rooms.push({
    room_code: 'SS232',
    room_name: 'EM Svcs Female Staff Locker Room',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: femaleLockerNsfMap[range],
    quantity: 1
  });
  
  // Female Staff Toilet
  rooms.push({
    room_code: 'SB202',
    room_name: 'EM Svcs Female Staff Toilet',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: 60,
    quantity: beds > 300 ? 2 : 1
  });
  
  // Female Staff Shower
  rooms.push({
    room_code: 'SB173',
    room_name: 'EM Svcs Female Staff Shower',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: 85,
    quantity: beds > 300 ? 2 : 1
  });
  
  // Male Staff Locker Room - size scales with beds
  const maleLockerNsfMap = { 1: 100, 2: 140, 3: 180, 4: 220, 5: 260 };
  rooms.push({
    room_code: 'SS241',
    room_name: 'EM Svcs Male Staff Locker Room',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: maleLockerNsfMap[range],
    quantity: 1
  });
  
  // Male Staff Toilet
  rooms.push({
    room_code: 'SB203',
    room_name: 'EM Svcs Male Staff Toilet',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: 60,
    quantity: beds > 300 ? 2 : 1
  });
  
  // Male Staff Shower
  rooms.push({
    room_code: 'SB184',
    room_name: 'EM Svcs Male Staff Shower',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: 85,
    quantity: beds > 300 ? 2 : 1
  });
  
  // Housekeeping Aides Closet (HAC)
  rooms.push({
    room_code: 'SB244',
    room_name: 'EM Svcs Housekeeping Aides Closet (HAC)',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: beds > 300 ? 80 : 60,
    quantity: 1
  });
  
  // ==========================================
  // FA 2: PRODUCTION AREA
  // ==========================================
  
  // Receiving Room - size scales with beds
  const receivingNsfMap = { 1: 300, 2: 600, 3: 900, 4: 1200, 5: 1500 };
  rooms.push({
    room_code: 'SC401',
    room_name: 'Receiving Room, EMS',
    functional_area: 'FA 2: Production Area',
    nsf: receivingNsfMap[range],
    quantity: 1
  });
  
  // Sorting/Washing Room
  rooms.push({
    room_code: 'SC407',
    room_name: 'Sorting/Washing Room, EMS',
    functional_area: 'FA 2: Production Area',
    nsf: beds > 200 ? 1000 : 800,
    quantity: 1
  });
  
  // Clean Linen Storage Room - size scales with beds
  const cleanLinenStorageNsfMap = { 1: 240, 2: 280, 3: 320, 4: 360, 5: 400 };
  rooms.push({
    room_code: 'SC413',
    room_name: 'Clean Linen Storage Room, EMS',
    functional_area: 'FA 2: Production Area',
    nsf: cleanLinenStorageNsfMap[range],
    quantity: 1
  });
  
  // Central Liquid Supply Room - always 200 NSF
  rooms.push({
    room_code: 'SC418',
    room_name: 'Central Liquid Supply Room, EMS',
    functional_area: 'FA 2: Production Area',
    nsf: 200,
    quantity: 1
  });
  
  // Cart Washer Room
  rooms.push({
    room_code: 'SC419',
    room_name: 'Cart Washer Room, EMS',
    functional_area: 'FA 2: Production Area',
    nsf: 140,
    quantity: beds > 200 ? 3 : 2
  });
  
  // Clean Linen Processing - size scales with beds
  const cleanProcessingNsfMap = { 1: 1000, 2: 1400, 3: 1800, 4: 2200, 5: 2600 };
  rooms.push({
    room_code: 'SC420',
    room_name: 'Clean Linen Processing, EMS',
    functional_area: 'FA 2: Production Area',
    nsf: cleanProcessingNsfMap[range],
    quantity: 1
  });
  
  // Clean Linen Holding/Assembly Room - size scales with beds
  const holdingAssemblyNsfMap = { 1: 300, 2: 400, 3: 500, 4: 600, 5: 700 };
  rooms.push({
    room_code: 'SC426',
    room_name: 'Clean Linen Holding/Assembly Room, EMS',
    functional_area: 'FA 2: Production Area',
    nsf: holdingAssemblyNsfMap[range],
    quantity: 1
  });
  
  // Distribution Cart Storage Room
  let distCartNsf = 200;
  if (beds > 400) distCartNsf = 400;
  else if (beds > 200) distCartNsf = 300;
  
  rooms.push({
    room_code: 'SC432',
    room_name: 'Distribution Cart Storage Room, EMS',
    functional_area: 'FA 2: Production Area',
    nsf: distCartNsf,
    quantity: 1
  });
  
  // Clean Linen Pack Preparation Room
  let packPrepNsf = 240;
  if (beds > 400) packPrepNsf = 300;
  else if (beds > 200) packPrepNsf = 280;
  
  rooms.push({
    room_code: 'SC438',
    room_name: 'Clean Linen Pack Preparation Room, EMS',
    functional_area: 'FA 2: Production Area',
    nsf: packPrepNsf,
    quantity: 1
  });
  
  // Linen Repair Room - size scales with beds
  const linenRepairNsfMap = { 1: 120, 2: 160, 3: 200, 4: 240, 5: 280 };
  rooms.push({
    room_code: 'SC439',
    room_name: 'Linen Repair Room, EMS',
    functional_area: 'FA 2: Production Area',
    nsf: linenRepairNsfMap[range],
    quantity: 1
  });
  
  // ==========================================
  // FA 3: MEDICAL CENTER LINEN SUPPORT AREA
  // ==========================================
  
  // Chute Room
  let chuteNsf = 100;
  if (beds > 400) chuteNsf = 200;
  else if (beds > 200) chuteNsf = 160;
  
  rooms.push({
    room_code: 'SC440',
    room_name: 'Chute Room, EMS',
    functional_area: 'FA 3: Medical Center Linen Support Area',
    nsf: chuteNsf,
    quantity: 1
  });
  
  // Soiled Cart Staging Room - size scales with beds
  const soiledCartNsfMap = { 1: 120, 2: 180, 3: 240, 4: 300, 5: 360 };
  rooms.push({
    room_code: 'SC441',
    room_name: 'Soiled Cart Staging Room, EMS',
    functional_area: 'FA 3: Medical Center Linen Support Area',
    nsf: soiledCartNsfMap[range],
    quantity: 1
  });
  
  // Clean Linen Cart Storage Room
  let cleanCartNsf = 120;
  if (beds > 400) cleanCartNsf = 200;
  else if (beds > 200) cleanCartNsf = 180;
  
  rooms.push({
    room_code: 'SC445',
    room_name: 'Clean Linen Cart Storage Room, EMS',
    functional_area: 'FA 3: Medical Center Linen Support Area',
    nsf: cleanCartNsf,
    quantity: 1
  });
  
  // Uniform Exchange
  let uniformNsf = 140;
  if (beds > 400) uniformNsf = 200;
  else if (beds > 200) uniformNsf = 180;
  
  rooms.push({
    room_code: 'SC446',
    room_name: 'Uniform Exchange, EMS',
    functional_area: 'FA 3: Medical Center Linen Support Area',
    nsf: uniformNsf,
    quantity: 1
  });
  
  return rooms;
}
