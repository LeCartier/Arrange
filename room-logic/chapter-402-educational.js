// Chapter 402: Educational Facilities
// Based on VA PG-18-9 Space Planning Criteria

export const CHAPTER_402_CONFIG = {
  id: 'chapter-402',
  name: 'Educational Facilities',
  description: 'Centralized educational facilities including administration, auditoriums, simulation areas, and training classrooms for VA medical facility staff and trainees.',
  
  inputFields: [
    {
      id: 'total_facility_fte',
      label: 'Total Facility FTE Positions Authorized',
      type: 'number',
      min: 50,
      max: 2000,
      defaultValue: 400,
      helpText: 'Total FTE positions authorized for the facility (50-2,000). Each range of 400 FTE scales space requirements.'
    }
  ],
  
  functionalAreas: [
    'FA 1: Staff and Administrative Area',
    'FA 2: Nursing Education and Training Area',
    'FA 3: Education Auditorium Area',
    'FA 4: Education Laboratory Area'
  ]
};

export function calculateRooms_402(inputs) {
  const rooms = [];
  const fte = inputs.total_facility_fte || 400;
  
  // Determine FTE range (1-5 based on 400 per range)
  const range = Math.min(5, Math.max(1, Math.ceil(fte / 400)));
  
  // ==========================================
  // FA 1: STAFF AND ADMINISTRATIVE AREA
  // ==========================================
  
  // Designated Learning Officer (DLO) Workstation - scales with FTE
  rooms.push({
    room_code: 'SS218',
    room_name: 'Educ Svc Designated Learning Officer (DLO) Workstation',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: 56,
    quantity: range  // 1 per 400 FTE, max 5
  });
  
  // Associate Chief of Staff (ACOS) Office - always 1
  rooms.push({
    room_code: 'SS204',
    room_name: 'Educ Svc Associate Chief of Staff (ACOS) Office',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: 100,
    quantity: 1
  });
  
  // Employee Education Director Office - always 1
  rooms.push({
    room_code: 'SS204',
    room_name: 'Educ Svc Employee Education Director Office',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: 100,
    quantity: 1
  });
  
  // Administrative Assistant Workstation
  rooms.push({
    room_code: 'SS218',
    room_name: 'Educ Svc Administrative Assistant Workstation',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: 56,
    quantity: fte > 800 ? 2 : 1
  });
  
  // Waiting
  rooms.push({
    room_code: 'SB003',
    room_name: 'Educ Svc Waiting',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: 80,
    quantity: 1
  });
  
  // Administration Support Workstation - scales with FTE
  rooms.push({
    room_code: 'SS218',
    room_name: 'Educ Svc Administration Support Workstation',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: 56,
    quantity: range  // 1 per 400 FTE
  });
  
  // Educator/Instructor Workstation - starts at 2, +1 per range
  rooms.push({
    room_code: 'SS218',
    room_name: 'Educ Svc Educator/Instructor Workstation',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: 56,
    quantity: range + 1  // 2-6 based on range
  });
  
  // Workforce Development Coordinator Workstation
  rooms.push({
    room_code: 'SS218',
    room_name: 'Educ Svc Workforce Development Coordinator Workstation',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: 56,
    quantity: fte > 800 ? 2 : 1
  });
  
  // High Performance Development Coordinator (HPDM) Workstation
  rooms.push({
    room_code: 'SS218',
    room_name: 'Educ Svc High Performance Development Coordinator (HPDM) Workstation',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: 56,
    quantity: fte > 800 ? 2 : 1
  });
  
  // Education Technician Workstation
  rooms.push({
    room_code: 'SS218',
    room_name: 'Educ Svc Education Technician Workstation',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: 56,
    quantity: fte > 800 ? 3 : 2
  });
  
  // Staff Conference Room - size scales with FTE
  let staffConfNsf = 240;
  if (fte > 1600) staffConfNsf = 500;
  else if (fte > 400) staffConfNsf = 300;
  
  rooms.push({
    room_code: 'SS101',
    room_name: 'Staff Conference Room, Educ Svc',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: staffConfNsf,
    quantity: 1
  });
  
  // Storage Room - size scales with FTE
  const storageNsfMap = { 1: 80, 2: 100, 3: 120, 4: 140, 5: 160 };
  rooms.push({
    room_code: 'SS186',
    room_name: 'Storage Room, Educ Svc',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: storageNsfMap[range],
    quantity: 1
  });
  
  // Staff Breakroom - size scales with FTE
  const breakroomNsfMap = { 1: 120, 2: 140, 3: 160, 4: 180, 5: 200 };
  rooms.push({
    room_code: 'SS262',
    room_name: 'Educ Svc Staff Breakroom',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: breakroomNsfMap[range],
    quantity: 1
  });
  
  // Female Staff Locker Room - size scales with FTE
  const femaleLockerNsfMap = { 1: 100, 2: 120, 3: 140, 4: 160, 5: 180 };
  rooms.push({
    room_code: 'SS282',
    room_name: 'Educ Svc Female Staff Locker Room',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: femaleLockerNsfMap[range],
    quantity: 1
  });
  
  // Female Staff Toilet - always 1
  rooms.push({
    room_code: 'SB191',
    room_name: 'Educ Svc Female Staff Toilet',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: 60,
    quantity: 1
  });
  
  // Male Staff Locker Room - size scales with FTE
  const maleLockerNsfMap = { 1: 100, 2: 120, 3: 140, 4: 160, 5: 180 };
  rooms.push({
    room_code: 'SS282',
    room_name: 'Educ Svc Male Staff Locker Room',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: maleLockerNsfMap[range],
    quantity: 1
  });
  
  // Male Staff Toilet - always 1
  rooms.push({
    room_code: 'SB191',
    room_name: 'Educ Svc Male Staff Toilet',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: 60,
    quantity: 1
  });
  
  // ==========================================
  // FA 2: NURSING EDUCATION AND TRAINING AREA
  // ==========================================
  
  // Nursing Education Associate Chief Office - always 1
  rooms.push({
    room_code: 'SS204',
    room_name: 'Nursing Education Associate Chief Office',
    functional_area: 'FA 2: Nursing Education and Training Area',
    nsf: 100,
    quantity: 1
  });
  
  // Nursing Education Public Waiting
  rooms.push({
    room_code: 'SB003',
    room_name: 'Nursing Education Public Waiting',
    functional_area: 'FA 2: Nursing Education and Training Area',
    nsf: 80,
    quantity: 1
  });
  
  // Nursing Education Administration Support Workstation
  let nursingAdminWs = 1;
  if (fte > 1600) nursingAdminWs = 3;
  else if (fte > 800) nursingAdminWs = 2;
  
  rooms.push({
    room_code: 'SS218',
    room_name: 'Nursing Education Administration Support Workstation',
    functional_area: 'FA 2: Nursing Education and Training Area',
    nsf: 56,
    quantity: nursingAdminWs
  });
  
  // Nursing Education Instructor Workstation
  let nursingInstructorWs = 2;
  if (fte > 1600) nursingInstructorWs = 4;
  else if (fte > 800) nursingInstructorWs = 3;
  
  rooms.push({
    room_code: 'SS218',
    room_name: 'Nursing Education Instructor Workstation',
    functional_area: 'FA 2: Nursing Education and Training Area',
    nsf: 56,
    quantity: nursingInstructorWs
  });
  
  // Multipurpose Classroom/Staff Training Room - size scales
  let trainingRoomNsf = 545;
  if (fte > 1600) trainingRoomNsf = 630;
  else if (fte > 800) trainingRoomNsf = 590;
  
  rooms.push({
    room_code: 'SS111',
    room_name: 'Multipurpose Classroom/Staff Training Room, Educ Svc',
    functional_area: 'FA 2: Nursing Education and Training Area',
    nsf: trainingRoomNsf,
    quantity: 1
  });
  
  // Nursing Education Storage Room - size scales with FTE
  const nursingStorageNsfMap = { 1: 100, 2: 120, 3: 140, 4: 160, 5: 180 };
  rooms.push({
    room_code: 'SS190',
    room_name: 'Nursing Education Storage Room, Educ Svc',
    functional_area: 'FA 2: Nursing Education and Training Area',
    nsf: nursingStorageNsfMap[range],
    quantity: 1
  });
  
  // ==========================================
  // FA 3: EDUCATION AUDITORIUM AREA
  // ==========================================
  
  // Auditorium Seating Area - size scales with FTE
  const auditoriumSeatingNsfMap = { 1: 1000, 2: 1200, 3: 1400, 4: 1600, 5: 1800 };
  rooms.push({
    room_code: 'SS121',
    room_name: 'Auditorium Seating Area, Educ Svc',
    functional_area: 'FA 3: Education Auditorium Area',
    nsf: auditoriumSeatingNsfMap[range],
    quantity: 1
  });
  
  // Auditorium Stage/Instruction Area - size scales with FTE
  const auditoriumStageNsfMap = { 1: 200, 2: 240, 3: 280, 4: 320, 5: 360 };
  rooms.push({
    room_code: 'SS131',
    room_name: 'Auditorium Stage/Instruction Area, Educ Svc',
    functional_area: 'FA 3: Education Auditorium Area',
    nsf: auditoriumStageNsfMap[range],
    quantity: 1
  });
  
  // Auditorium Media Control Room - always 1
  rooms.push({
    room_code: 'SS141',
    room_name: 'Auditorium Media Control Room, Educ Svc',
    functional_area: 'FA 3: Education Auditorium Area',
    nsf: 50,
    quantity: 1
  });
  
  // Auditorium Equipment Storage Room - size scales with FTE
  const audEquipStorageNsfMap = { 1: 120, 2: 140, 3: 180, 4: 200, 5: 220 };
  rooms.push({
    room_code: 'SS126',
    room_name: 'Auditorium Equipment Storage Room, Educ Svc',
    functional_area: 'FA 3: Education Auditorium Area',
    nsf: audEquipStorageNsfMap[range],
    quantity: 1
  });
  
  // Auditorium Moveable Furniture Storage Room - size scales with FTE
  const audFurnitureStorageNsfMap = { 1: 240, 2: 300, 3: 360, 4: 420, 5: 480 };
  rooms.push({
    room_code: 'SS136',
    room_name: 'Auditorium Moveable Furniture Storage Room, Educ Svc',
    functional_area: 'FA 3: Education Auditorium Area',
    nsf: audFurnitureStorageNsfMap[range],
    quantity: 1
  });
  
  // Auditorium Multipurpose Room - size scales with FTE
  const audMultipurposeNsfMap = { 1: 630, 2: 675, 3: 715, 4: 755, 5: 795 };
  rooms.push({
    room_code: 'SS111',
    room_name: 'Auditorium Multipurpose Room, Educ Svc',
    functional_area: 'FA 3: Education Auditorium Area',
    nsf: audMultipurposeNsfMap[range],
    quantity: 1
  });
  
  // Auditorium Male Toilet - size scales with FTE
  let audMaleToiletNsf = 205;
  if (fte > 1200) audMaleToiletNsf = 365;
  else if (fte > 800) audMaleToiletNsf = 295;
  else if (fte > 400) audMaleToiletNsf = 235;
  
  rooms.push({
    room_code: 'SB203',
    room_name: 'Educ Svc Auditorium Male Toilet',
    functional_area: 'FA 3: Education Auditorium Area',
    nsf: audMaleToiletNsf,
    quantity: 1
  });
  
  // Auditorium Female Toilet - size scales with FTE
  let audFemaleToiletNsf = 205;
  if (fte > 1200) audFemaleToiletNsf = 365;
  else if (fte > 800) audFemaleToiletNsf = 295;
  else if (fte > 400) audFemaleToiletNsf = 235;
  
  rooms.push({
    room_code: 'SB202',
    room_name: 'Educ Svc Auditorium Female Toilet',
    functional_area: 'FA 3: Education Auditorium Area',
    nsf: audFemaleToiletNsf,
    quantity: 1
  });
  
  // Auditorium Housekeeping Aides Closet (HAC) - always 1
  rooms.push({
    room_code: 'SB244',
    room_name: 'Educ Svc Auditorium Housekeeping Aides Closet (HAC)',
    functional_area: 'FA 3: Education Auditorium Area',
    nsf: 80,
    quantity: 1
  });
  
  // ==========================================
  // FA 4: EDUCATION LABORATORY AREA
  // ==========================================
  
  // Computer Training Room - size scales at 801+ FTE
  rooms.push({
    room_code: 'SS146',
    room_name: 'Computer Training Room, Educ Svc',
    functional_area: 'FA 4: Education Laboratory Area',
    nsf: fte > 800 ? 715 : 545,
    quantity: 1
  });
  
  // Conference Room - size scales at 801+ FTE
  rooms.push({
    room_code: 'SS101',
    room_name: 'Conference Room, Educ Svc',
    functional_area: 'FA 4: Education Laboratory Area',
    nsf: fte > 800 ? 500 : 300,
    quantity: 1
  });
  
  // Simulation Room - size scales at 801+ FTE
  rooms.push({
    room_code: 'SS151',
    room_name: 'Simulation Room, Educ Svc',
    functional_area: 'FA 4: Education Laboratory Area',
    nsf: fte > 800 ? 600 : 400,
    quantity: 1
  });
  
  return rooms;
}
