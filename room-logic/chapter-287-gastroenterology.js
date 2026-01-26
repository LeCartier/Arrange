/**
 * Chapter 287: Gastroenterology/Endoscopy Service
 * VA PG-18-9 Space Planning Criteria
 * 
 * This chapter covers Gastroenterology/Endoscopy Service facilities including
 * procedure rooms for colonoscopy, EGD, ERCP, and other GI procedures.
 * 
 * Input Data:
 * - Annual Colonoscopy Clinic Stops (480-6,400)
 * - Annual EGD Clinic Stops (640-6,399)
 * - Annual Esophageal Manometry Clinic Stops (480-4,800)
 * - Annual Flexible Sigmoidoscopy Clinic Stops (960-9,600)
 * - Annual ERCP Clinic Stops (225-2,250)
 * - Annual Endoscopic Ultrasound Clinic Stops (225-3,000)
 */

export const CHAPTER_287_CONFIG = {
  id: '287',
  name: 'Gastroenterology/Endoscopy Service',
  description: 'Gastrointestinal and endoscopy procedure facilities including colonoscopy, EGD, and ERCP',
  inputFields: [
    {
      id: 'annual_colonoscopy',
      label: 'Annual Colonoscopy Clinic Stops (Stop Code 321)',
      type: 'number',
      min: 480,
      max: 6400,
      defaultValue: 1600,
      required: true
    },
    {
      id: 'annual_egd',
      label: 'Annual EGD Clinic Stops (Stop Code 321)',
      type: 'number',
      min: 640,
      max: 6399,
      defaultValue: 2133,
      required: true
    },
    {
      id: 'annual_esophageal',
      label: 'Annual Esophageal Manometry Clinic Stops (Stop Code 321)',
      type: 'number',
      min: 480,
      max: 4800,
      defaultValue: 1600,
      required: false
    },
    {
      id: 'annual_sigmoidoscopy',
      label: 'Annual Flexible Sigmoidoscopy Clinic Stops (Stop Code 321)',
      type: 'number',
      min: 960,
      max: 9600,
      defaultValue: 3200,
      required: false
    },
    {
      id: 'annual_ercp',
      label: 'Annual ERCP Clinic Stops (Stop Code 321)',
      type: 'number',
      min: 225,
      max: 2250,
      defaultValue: 750,
      required: false
    },
    {
      id: 'annual_eus',
      label: 'Annual Endoscopic Ultrasound Clinic Stops (Stop Code 321)',
      type: 'number',
      min: 225,
      max: 3000,
      defaultValue: 750,
      required: false
    }
  ],
  functionalAreas: [
    'Reception Area',
    'Patient Area',
    'Prep and Recovery Patient Area',
    'Support Area',
    'Staff and Administrative Area',
    'Education Area'
  ]
};

export function calculateRooms_287(inputs) {
  const rooms = [];
  
  // Parse inputs
  const colonoscopy = parseInt(inputs.annual_colonoscopy) || 1600;
  const egd = parseInt(inputs.annual_egd) || 2133;
  const esophageal = parseInt(inputs.annual_esophageal) || 0;
  const sigmoidoscopy = parseInt(inputs.annual_sigmoidoscopy) || 0;
  const ercp = parseInt(inputs.annual_ercp) || 0;
  const eus = parseInt(inputs.annual_eus) || 0;
  
  // Calculate combined procedure volumes
  const standardProcedures = colonoscopy + egd + esophageal + sigmoidoscopy;
  const ercpProcedures = ercp + eus;
  
  // Calculate number of Endoscopy Procedure Rooms (2,133 annual throughput per room)
  const endoscopyRooms = Math.max(1, Math.ceil(standardProcedures / 2133));
  
  // Calculate number of ERCP/EUS Procedure Rooms (750 annual throughput per room)
  const ercpRooms = ercpProcedures > 0 ? Math.max(1, Math.ceil(ercpProcedures / 750)) : 0;
  
  // Total patient care rooms
  const totalPatientCareRooms = endoscopyRooms + ercpRooms;

  // ===== FA 1: RECEPTION AREA =====
  
  // Waiting
  let waitingNsf = 80;
  if (totalPatientCareRooms >= 19) waitingNsf = 575;
  else if (totalPatientCareRooms >= 17) waitingNsf = 535;
  else if (totalPatientCareRooms >= 15) waitingNsf = 520;
  else if (totalPatientCareRooms >= 13) waitingNsf = 440;
  else if (totalPatientCareRooms >= 11) waitingNsf = 370;
  else if (totalPatientCareRooms >= 9) waitingNsf = 310;
  else if (totalPatientCareRooms >= 7) waitingNsf = 260;
  else if (totalPatientCareRooms >= 5) waitingNsf = 190;
  else if (totalPatientCareRooms >= 3) waitingNsf = 130;
  
  rooms.push({
    room_code: 'SB003',
    room_name: 'GI-Endo Svc Waiting',
    functional_area: 'Reception Area',
    nsf: waitingNsf,
    quantity: 1
  });

  // Reception
  rooms.push({
    room_code: 'SC183',
    room_name: 'GI-Endo Svc Reception',
    functional_area: 'Reception Area',
    nsf: totalPatientCareRooms <= 5 ? 85 : 260,
    quantity: 1
  });

  // Patient Check-in Kiosk
  rooms.push({
    room_code: 'SC165',
    room_name: 'GI-Endo Svc Patient Check-in Kiosk',
    functional_area: 'Reception Area',
    nsf: 55,
    quantity: totalPatientCareRooms <= 5 ? 1 : 2
  });

  // Patient Education Workstation
  rooms.push({
    room_code: 'SC172',
    room_name: 'GI-Endo Svc Patient Education Workstation',
    functional_area: 'Reception Area',
    nsf: 40,
    quantity: 2
  });

  // Patient Education Room (6+ rooms)
  if (totalPatientCareRooms >= 6) {
    rooms.push({
      room_code: 'SC171',
      room_name: 'GI-Endo Svc Patient Education Room',
      functional_area: 'Reception Area',
      nsf: 120,
      quantity: 1
    });
  }

  // Consult Room
  rooms.push({
    room_code: 'SC271',
    room_name: 'GI-Endo Svc Consult Room',
    functional_area: 'Reception Area',
    nsf: 120,
    quantity: totalPatientCareRooms <= 10 ? 1 : 2
  });

  // Visitor Toilet
  rooms.push({
    room_code: 'SB191',
    room_name: 'GI-Endo Svc Visitor Toilet',
    functional_area: 'Reception Area',
    nsf: 60,
    quantity: totalPatientCareRooms <= 10 ? 1 : 2
  });

  // ===== FA 2: PATIENT AREA =====
  
  // Endoscopy Procedure Room
  if (endoscopyRooms > 0) {
    rooms.push({
      room_code: 'CGE11',
      room_name: 'Endoscopy Procedure Room, GI-Endo Svc',
      functional_area: 'Patient Area',
      nsf: 300,
      quantity: Math.min(endoscopyRooms, 13) // Max 13 per criteria
    });
  }

  // ERCP / Endoscopic Ultrasound Procedure Room
  if (ercpRooms > 0) {
    rooms.push({
      room_code: 'CGE14',
      room_name: 'ERCP / Endoscopic Ultrasound Procedure Room, GI-Endo Svc',
      functional_area: 'Patient Area',
      nsf: 360,
      quantity: Math.min(ercpRooms, 7) // Max 7 per criteria
    });
  }

  // Assessment Room
  rooms.push({
    room_code: 'CGE17',
    room_name: 'Assessment Room, GI-Endo Svc',
    functional_area: 'Patient Area',
    nsf: 120,
    quantity: totalPatientCareRooms <= 10 ? 1 : 2
  });

  // Equipment Alcove
  const equipAlcoveQty = Math.ceil(totalPatientCareRooms / 4);
  rooms.push({
    room_code: 'SC079',
    room_name: 'GI-Endo Svc Equipment Alcove',
    functional_area: 'Patient Area',
    nsf: 30,
    quantity: Math.max(1, equipAlcoveQty)
  });

  // Crash Cart Alcove
  rooms.push({
    room_code: 'SC052',
    room_name: 'GI-Endo Svc Crash Cart Alcove',
    functional_area: 'Patient Area',
    nsf: 20,
    quantity: totalPatientCareRooms <= 10 ? 1 : 2
  });

  // Patient Toilet
  rooms.push({
    room_code: 'SB201',
    room_name: 'GI-Endo Svc Patient Toilet',
    functional_area: 'Patient Area',
    nsf: 60,
    quantity: totalPatientCareRooms <= 10 ? 1 : 2
  });

  // ===== FA 3: PREP AND RECOVERY PATIENT AREA =====
  
  // Patient Prep / Recovery Room (2 per procedure room)
  const prepRecoveryQty = totalPatientCareRooms * 2;
  rooms.push({
    room_code: 'CGE21',
    room_name: 'Patient Prep / Recovery Room, GI-Endo Svc',
    functional_area: 'Prep and Recovery Patient Area',
    nsf: 120,
    quantity: prepRecoveryQty
  });

  // Patient Prep / Recovery Cubicle (2 per procedure room)
  rooms.push({
    room_code: 'CGE26',
    room_name: 'Patient Prep / Recovery Cubicle, GI-Endo Svc',
    functional_area: 'Prep and Recovery Patient Area',
    nsf: 120,
    quantity: prepRecoveryQty
  });

  // Prep / Recovery Patient Toilet
  let prepToiletQty = 2;
  if (totalPatientCareRooms >= 13) prepToiletQty = 4;
  else if (totalPatientCareRooms >= 7) prepToiletQty = 3;
  
  rooms.push({
    room_code: 'SB201',
    room_name: 'GI-Endo Svc Prep / Recovery Patient Toilet',
    functional_area: 'Prep and Recovery Patient Area',
    nsf: 60,
    quantity: prepToiletQty
  });

  // Nurse Station
  let nurseNsf = 60;
  if (totalPatientCareRooms >= 17) nurseNsf = 300;
  else if (totalPatientCareRooms >= 13) nurseNsf = 240;
  else if (totalPatientCareRooms >= 9) nurseNsf = 180;
  else if (totalPatientCareRooms >= 5) nurseNsf = 120;
  
  rooms.push({
    room_code: 'SC152',
    room_name: 'GI-Endo Svc Nurse Station',
    functional_area: 'Prep and Recovery Patient Area',
    nsf: nurseNsf,
    quantity: 1
  });

  // Refreshment Alcove
  rooms.push({
    room_code: 'SV381',
    room_name: 'GI-Endo Svc Prep / Recovery Refreshment Alcove',
    functional_area: 'Prep and Recovery Patient Area',
    nsf: 60,
    quantity: totalPatientCareRooms <= 10 ? 1 : 2
  });

  // Prep / Recovery Crash Cart Alcove
  rooms.push({
    room_code: 'SC052',
    room_name: 'GI-Endo Svc Prep / Recovery Crash Cart Alcove',
    functional_area: 'Prep and Recovery Patient Area',
    nsf: 20,
    quantity: totalPatientCareRooms <= 10 ? 1 : 2
  });

  // Equipment Storage Room (Prep/Recovery)
  let prepEquipNsf = 100;
  if (totalPatientCareRooms >= 17) prepEquipNsf = 180;
  else if (totalPatientCareRooms >= 13) prepEquipNsf = 160;
  else if (totalPatientCareRooms >= 9) prepEquipNsf = 140;
  else if (totalPatientCareRooms >= 5) prepEquipNsf = 120;
  
  rooms.push({
    room_code: 'CGE31',
    room_name: 'Equipment Storage Room, GI-Endo Svc',
    functional_area: 'Prep and Recovery Patient Area',
    nsf: prepEquipNsf,
    quantity: 1
  });

  // ===== FA 4: SUPPORT AREA =====
  
  // Medication Room
  rooms.push({
    room_code: 'SV583',
    room_name: 'GI-Endo Svc Medication Room',
    functional_area: 'Support Area',
    nsf: totalPatientCareRooms <= 10 ? 80 : 100,
    quantity: 1
  });

  // Scope Decontamination Room
  rooms.push({
    room_code: 'CGE41',
    room_name: 'Scope Decontamination Room, GI-Endo Svc',
    functional_area: 'Support Area',
    nsf: totalPatientCareRooms <= 10 ? 120 : 180,
    quantity: 1
  });

  // Scope Reprocessing Room
  rooms.push({
    room_code: 'CGE46',
    room_name: 'Scope Reprocessing Room, GI-Endo Svc',
    functional_area: 'Support Area',
    nsf: totalPatientCareRooms <= 10 ? 120 : 180,
    quantity: 1
  });

  // Clean Scope Storage Room
  let scopeStorageNsf = 60;
  if (totalPatientCareRooms >= 16) scopeStorageNsf = 120;
  else if (totalPatientCareRooms >= 11) scopeStorageNsf = 100;
  else if (totalPatientCareRooms >= 6) scopeStorageNsf = 80;
  
  rooms.push({
    room_code: 'CGE51',
    room_name: 'Clean Scope Storage Room, GI-Endo Svc',
    functional_area: 'Support Area',
    nsf: scopeStorageNsf,
    quantity: 1
  });

  // Sterile Instruments Storage Room
  const sterileStorageQty = Math.ceil(totalPatientCareRooms / 5);
  rooms.push({
    room_code: 'CGE56',
    room_name: 'Sterile Instruments Storage Room, GI-Endo Svc',
    functional_area: 'Support Area',
    nsf: 80,
    quantity: Math.max(1, sterileStorageQty)
  });

  // Equipment Storage Room
  let equipStorageNsf = 200;
  if (totalPatientCareRooms >= 16) equipStorageNsf = 320;
  else if (totalPatientCareRooms >= 11) equipStorageNsf = 280;
  else if (totalPatientCareRooms >= 6) equipStorageNsf = 240;
  
  rooms.push({
    room_code: 'CGE61',
    room_name: 'Equipment Storage Room, GI-Endo Svc',
    functional_area: 'Support Area',
    nsf: equipStorageNsf,
    quantity: 1
  });

  // Clean Utility Room
  let cleanUtilNsf = 100;
  if (totalPatientCareRooms >= 16) cleanUtilNsf = 160;
  else if (totalPatientCareRooms >= 11) cleanUtilNsf = 140;
  else if (totalPatientCareRooms >= 6) cleanUtilNsf = 120;
  
  rooms.push({
    room_code: 'SB737',
    room_name: 'GI-Endo Svc Clean Utility Room',
    functional_area: 'Support Area',
    nsf: cleanUtilNsf,
    quantity: 1
  });

  // Soiled Utility Room
  let soiledUtilNsf = 80;
  if (totalPatientCareRooms >= 16) soiledUtilNsf = 140;
  else if (totalPatientCareRooms >= 11) soiledUtilNsf = 120;
  else if (totalPatientCareRooms >= 6) soiledUtilNsf = 100;
  
  rooms.push({
    room_code: 'SB743',
    room_name: 'GI-Endo Svc Soiled Utility Room',
    functional_area: 'Support Area',
    nsf: soiledUtilNsf,
    quantity: 1
  });

  // Clean Linen Alcove
  rooms.push({
    room_code: 'SC467',
    room_name: 'GI-Endo Svc Clean Linen Alcove',
    functional_area: 'Support Area',
    nsf: 40,
    quantity: totalPatientCareRooms <= 10 ? 1 : 2
  });

  // Wheelchair / Stretcher Alcove
  rooms.push({
    room_code: 'SB252',
    room_name: 'GI-Endo Svc Wheelchair / Stretcher Alcove',
    functional_area: 'Support Area',
    nsf: 50,
    quantity: totalPatientCareRooms <= 10 ? 1 : 2
  });

  // Housekeeping Aides Closet
  rooms.push({
    room_code: 'SB244',
    room_name: 'GI-Endo Svc Housekeeping Aides Closet (HAC)',
    functional_area: 'Support Area',
    nsf: 60,
    quantity: 1
  });

  // ===== FA 5: STAFF AND ADMINISTRATIVE AREA =====
  
  // GI-Endoscopy Service Chief Office
  rooms.push({
    room_code: 'SS204',
    room_name: 'GI-Endo Svc GI-Endoscopy Service Chief Office',
    functional_area: 'Staff and Administrative Area',
    nsf: 100,
    quantity: 1
  });

  // Visitor Waiting
  rooms.push({
    room_code: 'SB003',
    room_name: 'GI-Endo Svc Visitor Waiting',
    functional_area: 'Staff and Administrative Area',
    nsf: 80,
    quantity: 1
  });

  // Administrative Support Workstation
  rooms.push({
    room_code: 'SS218',
    room_name: 'GI-Endo Svc Administrative Support Workstation',
    functional_area: 'Staff and Administrative Area',
    nsf: 56,
    quantity: totalPatientCareRooms <= 10 ? 1 : 2
  });

  // Physician Workstation
  const physicianWsQty = Math.ceil(totalPatientCareRooms / 2);
  rooms.push({
    room_code: 'SS218',
    room_name: 'GI-Endo Svc Physician Workstation',
    functional_area: 'Staff and Administrative Area',
    nsf: 56,
    quantity: Math.max(1, physicianWsQty)
  });

  // Physician Assistant Workstation
  rooms.push({
    room_code: 'SS218',
    room_name: 'GI-Endo Svc Physician Assistant Workstation',
    functional_area: 'Staff and Administrative Area',
    nsf: 56,
    quantity: Math.max(1, physicianWsQty)
  });

  // Nurse Manager Office
  rooms.push({
    room_code: 'SS204',
    room_name: 'GI-Endo Svc Nurse Manager Office',
    functional_area: 'Staff and Administrative Area',
    nsf: 100,
    quantity: 1
  });

  // Nurse Practitioner Workstation
  rooms.push({
    room_code: 'SS218',
    room_name: 'GI-Endo Svc Nurse Practitioner Workstation',
    functional_area: 'Staff and Administrative Area',
    nsf: 56,
    quantity: totalPatientCareRooms <= 10 ? 1 : 2
  });

  // Administration Workstation
  rooms.push({
    room_code: 'SS218',
    room_name: 'GI-Endo Svc Administration Workstation',
    functional_area: 'Staff and Administrative Area',
    nsf: 56,
    quantity: totalPatientCareRooms <= 10 ? 1 : 2
  });

  // Copy / Supply Room
  rooms.push({
    room_code: 'SS272',
    room_name: 'GI-Endo Svc Copy / Supply Room',
    functional_area: 'Staff and Administrative Area',
    nsf: totalPatientCareRooms <= 10 ? 80 : 100,
    quantity: 1
  });

  // Staff Breakroom
  let breakNsf = 120;
  if (totalPatientCareRooms >= 16) breakNsf = 180;
  else if (totalPatientCareRooms >= 11) breakNsf = 160;
  else if (totalPatientCareRooms >= 6) breakNsf = 140;
  
  rooms.push({
    room_code: 'SS262',
    room_name: 'GI-Endo Svc Staff Breakroom',
    functional_area: 'Staff and Administrative Area',
    nsf: breakNsf,
    quantity: 1
  });

  // Female Staff Locker Room
  let femaleLockerNsf = 100;
  if (totalPatientCareRooms >= 16) femaleLockerNsf = 250;
  else if (totalPatientCareRooms >= 11) femaleLockerNsf = 150;
  
  rooms.push({
    room_code: 'SS282',
    room_name: 'GI-Endo Svc Female Staff Locker Room',
    functional_area: 'Staff and Administrative Area',
    nsf: femaleLockerNsf,
    quantity: 1
  });

  // Female Staff Toilet
  rooms.push({
    room_code: 'SB191',
    room_name: 'GI-Endo Svc Female Staff Toilet',
    functional_area: 'Staff and Administrative Area',
    nsf: 60,
    quantity: totalPatientCareRooms <= 10 ? 1 : 2
  });

  // Male Staff Locker Room
  let maleLockerNsf = 100;
  if (totalPatientCareRooms >= 6) maleLockerNsf = 150;
  
  rooms.push({
    room_code: 'SS282',
    room_name: 'GI-Endo Svc Male Staff Locker Room',
    functional_area: 'Staff and Administrative Area',
    nsf: maleLockerNsf,
    quantity: 1
  });

  // Male Staff Toilet
  rooms.push({
    room_code: 'SB191',
    room_name: 'GI-Endo Svc Male Staff Toilet',
    functional_area: 'Staff and Administrative Area',
    nsf: 60,
    quantity: totalPatientCareRooms <= 10 ? 1 : 2
  });

  // ===== FA 6: EDUCATION AREA =====
  
  // Residency Director Office
  rooms.push({
    room_code: 'SS204',
    room_name: 'GI-Endo Svc Residency Director Office',
    functional_area: 'Education Area',
    nsf: 100,
    quantity: 1
  });

  // Resident Workstation
  let residentWsQty = 2;
  if (totalPatientCareRooms >= 17) residentWsQty = 6;
  else if (totalPatientCareRooms >= 13) residentWsQty = 5;
  else if (totalPatientCareRooms >= 9) residentWsQty = 4;
  else if (totalPatientCareRooms >= 5) residentWsQty = 3;
  
  rooms.push({
    room_code: 'SS217',
    room_name: 'GI-Endo Svc Resident Workstation',
    functional_area: 'Education Area',
    nsf: 48,
    quantity: residentWsQty
  });

  // Resident Training Room
  let trainingNsf = 300;
  if (totalPatientCareRooms >= 16) trainingNsf = 630;
  else if (totalPatientCareRooms >= 11) trainingNsf = 590;
  else if (totalPatientCareRooms >= 6) trainingNsf = 545;
  
  rooms.push({
    room_code: 'SS111',
    room_name: 'GI-Endo Svc Resident Training Room',
    functional_area: 'Education Area',
    nsf: trainingNsf,
    quantity: 1
  });

  return rooms;
}

export const CHAPTER_287 = {
  ...CHAPTER_287_CONFIG,
  calculateRooms: calculateRooms_287
};
