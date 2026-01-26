// Chapter 308: Prosthetics and Sensory Aids Service
// Based on VA PG-18-9 Space Planning Criteria

export const CHAPTER_308_CONFIG = {
  id: 'chapter-308',
  name: 'Prosthetics and Sensory Aids Service',
  description: 'Prosthetic/orthotic services providing artificial limbs, hearing aids, wheelchairs, orthopedic devices, and sensory aids for disabled veterans.',
  
  inputFields: [
    {
      id: 'annual_clinic_stops',
      label: 'Annual Clinic Stops Projected',
      type: 'number',
      min: 660,
      max: 32000,
      defaultValue: 3200,
      helpText: 'Total annual prosthetics clinic stops projected (660-32,000). Each range of 3,200 stops = 1 fitting/exam room.'
    }
  ],
  
  functionalAreas: [
    'FA 1: Reception Area',
    'FA 2: Patient Area',
    'FA 3: Support Area',
    'FA 4: Staff and Administrative Area'
  ]
};

export function calculateRooms_308(inputs) {
  const rooms = [];
  const stops = inputs.annual_clinic_stops || 3200;
  
  // Determine workload range (1-10 based on 3,200 per range)
  const range = Math.min(10, Math.max(1, Math.ceil(stops / 3200)));
  
  // ==========================================
  // FA 1: RECEPTION AREA
  // ==========================================
  
  // Waiting - size scales with workload
  let waitingNsf = 80;
  if (stops > 25600) waitingNsf = 240;
  else if (stops > 19200) waitingNsf = 190;
  else if (stops > 12800) waitingNsf = 150;
  else if (stops > 6400) waitingNsf = 110;
  
  rooms.push({
    room_code: 'SB003',
    room_name: 'Prsthcs Svc Waiting',
    functional_area: 'FA 1: Reception Area',
    nsf: waitingNsf,
    quantity: 1
  });
  
  // Reception - size increases at 16,001+
  rooms.push({
    room_code: 'SC183',
    room_name: 'Prsthcs Svc Reception',
    functional_area: 'FA 1: Reception Area',
    nsf: stops > 16000 ? 260 : 85,
    quantity: 1
  });
  
  // Patient Education Workstation
  rooms.push({
    room_code: 'SC172',
    room_name: 'Prsthcs Svc Patient Education Workstation',
    functional_area: 'FA 1: Reception Area',
    nsf: 40,
    quantity: stops > 16000 ? 2 : 1
  });
  
  // Visitor Toilets (male and female)
  rooms.push({
    room_code: 'SB191',
    room_name: 'Prsthcs Svc Visitor Toilet',
    functional_area: 'FA 1: Reception Area',
    nsf: 60,
    quantity: 2
  });
  
  // ==========================================
  // FA 2: PATIENT AREA
  // ==========================================
  
  // Soft Goods Fabrication Fitting/Exam Rooms - directly workload driven
  // 1 room per 3,200 stops
  rooms.push({
    room_code: 'CPR01',
    room_name: 'Fitting/Exam Room, Prsthtcs Svc (Soft Goods)',
    functional_area: 'FA 2: Patient Area',
    nsf: 120,
    quantity: range
  });
  
  // Custom Fabrication Fitting/Exam Room - 1 at lower volumes, 2 at higher
  rooms.push({
    room_code: 'CPR02',
    room_name: 'Fitting/Exam Room, Prsthtcs Svc (Custom)',
    functional_area: 'FA 2: Patient Area',
    nsf: 120,
    quantity: stops > 16000 ? 2 : 1
  });
  
  // Dynamic Alignment Room - always 1
  rooms.push({
    room_code: 'CPR04',
    room_name: 'Dynamic Alignment Room, Prsthtcs Svc',
    functional_area: 'FA 2: Patient Area',
    nsf: 150,
    quantity: 1
  });
  
  // Dressing Cubicle
  rooms.push({
    room_code: 'SB137',
    room_name: 'Prsthcs Svc Dressing Cubicle',
    functional_area: 'FA 2: Patient Area',
    nsf: 35,
    quantity: stops > 16000 ? 2 : 1
  });
  
  // Patient Toilet
  rooms.push({
    room_code: 'SB201',
    room_name: 'Prsthcs Svc Patient Toilet',
    functional_area: 'FA 2: Patient Area',
    nsf: 60,
    quantity: 1
  });
  
  // Eye Fitting Studio - always 1
  rooms.push({
    room_code: 'CPR05',
    room_name: 'Eye Fitting Studio, Prsthtcs Svc',
    functional_area: 'FA 2: Patient Area',
    nsf: 100,
    quantity: 1
  });
  
  // Facial/Body Fitting Studio - always 1
  rooms.push({
    room_code: 'CPR06',
    room_name: 'Facial/Body Fitting Studio, Prsthtcs Svc',
    functional_area: 'FA 2: Patient Area',
    nsf: 200,
    quantity: 1
  });
  
  // Restoration Laboratory - size scales
  let restorationLabNsf = 300;
  if (stops > 19200) restorationLabNsf = 400;
  else if (stops > 9600) restorationLabNsf = 350;
  
  rooms.push({
    room_code: 'CPR12',
    room_name: 'Restoration Laboratory, Prsthtcs Svc',
    functional_area: 'FA 2: Patient Area',
    nsf: restorationLabNsf,
    quantity: 1
  });
  
  // Team Evaluation/Multi-Purpose Room
  rooms.push({
    room_code: 'CPR16',
    room_name: 'Team Evaluation/Multi-Purpose Room, Prsthtcs Svc',
    functional_area: 'FA 2: Patient Area',
    nsf: stops > 9600 ? 300 : 240,
    quantity: 1
  });
  
  // Cast Room
  rooms.push({
    room_code: 'CPR17',
    room_name: 'Cast Room, Prsthtcs Svc',
    functional_area: 'FA 2: Patient Area',
    nsf: stops > 16000 ? 200 : 160,
    quantity: 1
  });
  
  // ==========================================
  // FA 3: SUPPORT AREA
  // ==========================================
  
  // Clean Utility Room
  rooms.push({
    room_code: 'SB737',
    room_name: 'Prsthcs Svc Clean Utility Room',
    functional_area: 'FA 3: Support Area',
    nsf: stops > 16000 ? 100 : 80,
    quantity: 1
  });
  
  // Soiled Utility Room
  rooms.push({
    room_code: 'SB743',
    room_name: 'Prsthcs Svc Soiled Utility Room',
    functional_area: 'FA 3: Support Area',
    nsf: stops > 16000 ? 100 : 80,
    quantity: 1
  });
  
  // Equipment Storage Room
  rooms.push({
    room_code: 'CPR18',
    room_name: 'Equipment Storage Room, Prsthtcs Svc',
    functional_area: 'FA 3: Support Area',
    nsf: stops > 16000 ? 140 : 120,
    quantity: 1
  });
  
  // Prosthetic/Orthotic Laboratory Fume Room
  rooms.push({
    room_code: 'CPR21',
    room_name: 'Prosthetic/Orthotic Laboratory Fume Room, Prsthtcs Svc',
    functional_area: 'FA 3: Support Area',
    nsf: stops > 16000 ? 240 : 200,
    quantity: 1
  });
  
  // Trash/Recycling Room
  rooms.push({
    room_code: 'SB267',
    room_name: 'Prsthcs Svc Trash/Recycling Room',
    functional_area: 'FA 3: Support Area',
    nsf: stops > 16000 ? 80 : 50,
    quantity: 1
  });
  
  // Prosthetic/Orthotic Laboratory Dust Room
  rooms.push({
    room_code: 'CPR22',
    room_name: 'Prosthetic/Orthotic Laboratory Dust Room, Prsthtcs Svc',
    functional_area: 'FA 3: Support Area',
    nsf: stops > 16000 ? 350 : 300,
    quantity: 1
  });
  
  // Prosthetic/Orthotic Laboratory Workstation
  rooms.push({
    room_code: 'CPR23',
    room_name: 'Prosthetic/Orthotic Laboratory Workstation, Prsthtcs Svc',
    functional_area: 'FA 3: Support Area',
    nsf: stops > 16000 ? 140 : 100,
    quantity: 1
  });
  
  // Prosthetic/Orthotic Laboratory Maintenance Room
  rooms.push({
    room_code: 'CPR24',
    room_name: 'Prosthetic/Orthotic Laboratory Maintenance Room, Prsthtcs Svc',
    functional_area: 'FA 3: Support Area',
    nsf: stops > 16000 ? 200 : 150,
    quantity: 1
  });
  
  // Shoe Modification Materials Storage Room
  rooms.push({
    room_code: 'CPR26',
    room_name: 'Shoe Modification Materials Storage Room, Prsthtcs Svc',
    functional_area: 'FA 3: Support Area',
    nsf: stops > 16000 ? 140 : 100,
    quantity: 1
  });
  
  // Wheelchair Repair Shop
  rooms.push({
    room_code: 'CPR31',
    room_name: 'Wheelchair Repair Shop, Prsthtcs Svc',
    functional_area: 'FA 3: Support Area',
    nsf: stops > 16000 ? 300 : 200,
    quantity: 1
  });
  
  // Wheelchair Active Storage Room
  rooms.push({
    room_code: 'CPR32',
    room_name: 'Wheelchair Active Storage Room, Prsthtcs Svc',
    functional_area: 'FA 3: Support Area',
    nsf: stops > 16000 ? 260 : 200,
    quantity: 1
  });
  
  // Dirty Wheelchair/DME Active Storage Room
  rooms.push({
    room_code: 'CPR34',
    room_name: 'Dirty Wheelchair/DME Active Storage Room, Prsthtcs Svc',
    functional_area: 'FA 3: Support Area',
    nsf: stops > 16000 ? 260 : 200,
    quantity: 1
  });
  
  // Wheelchair Parts Storage Room
  rooms.push({
    room_code: 'CPR36',
    room_name: 'Wheelchair Parts Storage Room, Prsthtcs Svc',
    functional_area: 'FA 3: Support Area',
    nsf: stops > 16000 ? 260 : 200,
    quantity: 1
  });
  
  // Computer Aided Design/CAM Room
  rooms.push({
    room_code: 'CPR41',
    room_name: 'Computer Aided Design/Computer Aided Manufacturing, Prsthtcs Svc',
    functional_area: 'FA 3: Support Area',
    nsf: stops > 16000 ? 120 : 80,
    quantity: 1
  });
  
  // Sewing Room
  rooms.push({
    room_code: 'CPR46',
    room_name: 'Sewing Room, Prsthtcs Svc',
    functional_area: 'FA 3: Support Area',
    nsf: stops > 16000 ? 160 : 120,
    quantity: 1
  });
  
  // Wheelchair/Stretcher Storage Room
  rooms.push({
    room_code: 'CPR51',
    room_name: 'Wheelchair/Stretcher Storage Room, Prsthtcs Svc',
    functional_area: 'FA 3: Support Area',
    nsf: stops > 16000 ? 80 : 40,
    quantity: 1
  });
  
  // Orthotics/Prosthetic Parts/Materials Storage Room
  rooms.push({
    room_code: 'CPR56',
    room_name: 'Orthotics/Prosthetic Parts/Materials Storage Room, Prsthtcs Svc',
    functional_area: 'FA 3: Support Area',
    nsf: stops > 16000 ? 140 : 100,
    quantity: 1
  });
  
  // Prosthetic Appliances Mailing Room
  rooms.push({
    room_code: 'CPR61',
    room_name: 'Prosthetic Appliances Mailing Room, Prsthtcs Svc',
    functional_area: 'FA 3: Support Area',
    nsf: stops > 16000 ? 100 : 80,
    quantity: 1
  });
  
  // Housekeeping Aides Closet
  rooms.push({
    room_code: 'SB244',
    room_name: 'Prsthcs Svc Housekeeping Aides Closet (HAC)',
    functional_area: 'FA 3: Support Area',
    nsf: stops > 16000 ? 80 : 60,
    quantity: 1
  });
  
  // ==========================================
  // FA 4: STAFF AND ADMINISTRATIVE AREA
  // ==========================================
  
  // Prosthetics Service Chief Office
  rooms.push({
    room_code: 'SS204',
    room_name: 'Prsthcs Svc Prosthetics Service Chief Office',
    functional_area: 'FA 4: Staff and Administrative Area',
    nsf: 100,
    quantity: 1
  });
  
  // Service Assistant Chief Office
  rooms.push({
    room_code: 'SS204',
    room_name: 'Prsthcs Svc Service Assistant Chief Office',
    functional_area: 'FA 4: Staff and Administrative Area',
    nsf: 100,
    quantity: 1
  });
  
  // Visitor Waiting (staff area)
  rooms.push({
    room_code: 'SS222',
    room_name: 'Prsthcs Svc Visitor Waiting',
    functional_area: 'FA 4: Staff and Administrative Area',
    nsf: 80,
    quantity: 1
  });
  
  // Administration Support Workstation
  rooms.push({
    room_code: 'SS218',
    room_name: 'Prsthcs Svc Administration Support Workstation',
    functional_area: 'FA 4: Staff and Administrative Area',
    nsf: 56,
    quantity: stops > 16000 ? 2 : 1
  });
  
  // Purchasing Agent Workstation
  rooms.push({
    room_code: 'SS218',
    room_name: 'Prsthcs Svc Purchasing Agent Workstation',
    functional_area: 'FA 4: Staff and Administrative Area',
    nsf: 56,
    quantity: stops > 16000 ? 2 : 1
  });
  
  // Restoration Clinic Workstation
  rooms.push({
    room_code: 'SS218',
    room_name: 'Prsthcs Svc Restoration Clinic Workstation',
    functional_area: 'FA 4: Staff and Administrative Area',
    nsf: 56,
    quantity: stops > 16000 ? 2 : 1
  });
  
  // Orthotic Lab Technician Workstation
  rooms.push({
    room_code: 'SS218',
    room_name: 'Prsthcs Svc Orthotic Lab Technician Workstation',
    functional_area: 'FA 4: Staff and Administrative Area',
    nsf: 56,
    quantity: stops > 16000 ? 2 : 1
  });
  
  // Staff Conference Room
  rooms.push({
    room_code: 'SS101',
    room_name: 'Prsthcs Svc Staff Conference Room',
    functional_area: 'FA 4: Staff and Administrative Area',
    nsf: stops > 16000 ? 300 : 240,
    quantity: 1
  });
  
  // Staff Breakroom - size scales with workload
  let breakroomNsf = 120;
  if (stops > 19200) breakroomNsf = 160;
  else if (stops > 9600) breakroomNsf = 140;
  
  rooms.push({
    room_code: 'SS262',
    room_name: 'Prsthcs Svc Staff Breakroom',
    functional_area: 'FA 4: Staff and Administrative Area',
    nsf: breakroomNsf,
    quantity: 1
  });
  
  // Female Staff Locker Room
  rooms.push({
    room_code: 'SS232',
    room_name: 'Prsthcs Svc Female Staff Locker Room',
    functional_area: 'FA 4: Staff and Administrative Area',
    nsf: stops > 16000 ? 140 : 100,
    quantity: 1
  });
  
  // Female Staff Toilet
  rooms.push({
    room_code: 'SB191',
    room_name: 'Prsthcs Svc Female Staff Toilet',
    functional_area: 'FA 4: Staff and Administrative Area',
    nsf: 60,
    quantity: stops > 16000 ? 2 : 1
  });
  
  // Male Staff Locker Room
  rooms.push({
    room_code: 'SS241',
    room_name: 'Prsthcs Svc Male Staff Locker Room',
    functional_area: 'FA 4: Staff and Administrative Area',
    nsf: stops > 16000 ? 140 : 100,
    quantity: 1
  });
  
  // Male Staff Toilet
  rooms.push({
    room_code: 'SB191',
    room_name: 'Prsthcs Svc Male Staff Toilet',
    functional_area: 'FA 4: Staff and Administrative Area',
    nsf: 60,
    quantity: stops > 16000 ? 2 : 1
  });
  
  return rooms;
}
