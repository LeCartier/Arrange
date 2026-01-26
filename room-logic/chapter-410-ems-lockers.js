// Chapter 410: Environmental Management Service (EMS) Lockers, Lounges, Toilets and Showers
// Based on VA PG-18-9 Space Planning Criteria

export const CHAPTER_410_CONFIG = {
  id: 'chapter-410',
  name: 'Environmental Management Service (EMS) Lockers, Lounges, Toilets and Showers',
  description: 'Central facilities for hospital support staff including lockers, lounges, toilets, and showers not otherwise accounted for in departmental chapters.',
  
  inputFields: [
    {
      id: 'fte_positions',
      label: 'Total FTE Positions Authorized',
      type: 'number',
      min: 1,
      max: 400,
      defaultValue: 100,
      helpText: 'Total FTE positions authorized for EMS staff (1-400). Each range of 100 FTE scales space requirements.'
    }
  ],
  
  functionalAreas: [
    'FA 1: Locker Area',
    'FA 2: Lounge Area',
    'FA 3: Toilet and Shower Area'
  ]
};

export function calculateRooms_410(inputs) {
  const rooms = [];
  const fte = inputs.fte_positions || 100;
  
  // Determine FTE range (1-4 based on 100 per range)
  const range = Math.min(4, Math.max(1, Math.ceil(fte / 100)));
  
  // ==========================================
  // FA 1: LOCKER AREA
  // ==========================================
  
  // Female Staff Locker Room - size scales with FTE
  const femaleLockerNsfMap = { 1: 180, 2: 300, 3: 450, 4: 600 };
  rooms.push({
    room_code: 'SS282',
    room_name: 'EM Svcs Female Staff Locker Room',
    functional_area: 'FA 1: Locker Area',
    nsf: femaleLockerNsfMap[range],
    quantity: 1
  });
  
  // Male Staff Locker Room - size and quantity scales with FTE
  const maleLockerNsfMap = { 1: 120, 2: 200, 3: 300, 4: 400 };
  const maleLockerQtyMap = { 1: 1, 2: 1, 3: 2, 4: 2 };
  rooms.push({
    room_code: 'SS282',
    room_name: 'EM Svcs Male Staff Locker Room',
    functional_area: 'FA 1: Locker Area',
    nsf: maleLockerNsfMap[range],
    quantity: maleLockerQtyMap[range]
  });
  
  // Locker Room Vestibule - always 2
  rooms.push({
    room_code: 'SS238',
    room_name: 'EM Svcs Locker Room Vestibule',
    functional_area: 'FA 1: Locker Area',
    nsf: 40,
    quantity: 2
  });
  
  // ==========================================
  // FA 2: LOUNGE AREA
  // ==========================================
  
  // Staff Breakroom - quantity scales with FTE
  rooms.push({
    room_code: 'SS262',
    room_name: 'EM Svcs Staff Breakroom',
    functional_area: 'FA 2: Lounge Area',
    nsf: 300,
    quantity: range  // 1-4 based on FTE range
  });
  
  // ==========================================
  // FA 3: TOILET AND SHOWER AREA
  // ==========================================
  
  // Female Staff Toilet - 2 per 100 FTE
  rooms.push({
    room_code: 'SB191',
    room_name: 'EM Svcs Female Staff Toilet',
    functional_area: 'FA 3: Toilet and Shower Area',
    nsf: 60,
    quantity: range * 2
  });
  
  // Female Staff Shower - 2 per 100 FTE
  rooms.push({
    room_code: 'SB174',
    room_name: 'EM Svcs Female Staff Shower',
    functional_area: 'FA 3: Toilet and Shower Area',
    nsf: 70,
    quantity: range * 2
  });
  
  // Male Staff Toilet - 2 per 100 FTE
  rooms.push({
    room_code: 'SB191',
    room_name: 'EM Svcs Male Staff Toilet',
    functional_area: 'FA 3: Toilet and Shower Area',
    nsf: 60,
    quantity: range * 2
  });
  
  // Male Staff Shower - 2 per 100 FTE
  rooms.push({
    room_code: 'SB184',
    room_name: 'EM Svcs Male Staff Shower',
    functional_area: 'FA 3: Toilet and Shower Area',
    nsf: 70,
    quantity: range * 2
  });
  
  return rooms;
}
