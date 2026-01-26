/**
 * Chapter 285: Sterile Processing Service
 * VA PG-18-9 Space Planning Criteria
 * 
 * This chapter covers Sterile Processing Service (SPS) facilities for 
 * decontamination, sterilization, and storage of surgical instruments.
 * 
 * Input Data:
 * - Instrument sets projected to be reprocessed daily (10-500)
 * - Scopes projected to be processed daily (5-75)
 * - Number of Operating Rooms projected (2-20)
 * - Number of daily surgical procedures projected (10-500)
 */

export const CHAPTER_285_CONFIG = {
  id: '285',
  name: 'Sterile Processing Service',
  description: 'Decontamination, sterilization, and storage of surgical instruments and medical devices',
  inputFields: [
    {
      id: 'instrument_sets_daily',
      label: 'How many instrument sets are projected to be reprocessed daily?',
      type: 'number',
      min: 10,
      max: 500,
      defaultValue: 100,
      required: true
    },
    {
      id: 'scopes_daily',
      label: 'How many scopes are projected to be processed daily?',
      type: 'number',
      min: 5,
      max: 75,
      defaultValue: 20,
      required: true
    },
    {
      id: 'operating_rooms',
      label: 'How many Operating Rooms are projected?',
      type: 'number',
      min: 2,
      max: 20,
      defaultValue: 6,
      required: true
    },
    {
      id: 'daily_procedures',
      label: 'How many daily surgical procedures are projected?',
      type: 'number',
      min: 10,
      max: 500,
      defaultValue: 50,
      required: true
    }
  ],
  functionalAreas: [
    'Decontamination Area',
    'Scope Processing Area',
    'Preparation and Assembly Area',
    'Sterilization Area',
    'Receiving, Storage and Dispatch Area',
    'Staff and Administrative Area'
  ]
};

export function calculateRooms_285(inputs) {
  const rooms = [];
  const instrumentSets = parseInt(inputs.instrument_sets_daily) || 100;
  const scopesDaily = parseInt(inputs.scopes_daily) || 20;
  const operatingRooms = parseInt(inputs.operating_rooms) || 6;
  const dailyProcedures = parseInt(inputs.daily_procedures) || 50;

  // ===== FA 1: DECONTAMINATION AREA =====
  
  // Soiled Transition / Drop-off Anteroom
  let anteNsf = 120;
  if (instrumentSets > 400) anteNsf = 240;
  else if (instrumentSets > 300) anteNsf = 210;
  else if (instrumentSets > 200) anteNsf = 180;
  else if (instrumentSets > 100) anteNsf = 150;
  
  rooms.push({
    room_code: 'SC851',
    room_name: 'Soiled Transition / Drop-off Anteroom, SPS',
    functional_area: 'Decontamination Area',
    nsf: anteNsf,
    quantity: 1
  });

  // PPE Alcove
  rooms.push({
    room_code: 'SC856',
    room_name: 'PPE Alcove, SPS',
    functional_area: 'Decontamination Area',
    nsf: instrumentSets <= 200 ? 60 : 80,
    quantity: 1
  });

  // Decontamination Room
  let decontamNsf = 390;
  if (instrumentSets > 400) decontamNsf = 990;
  else if (instrumentSets > 200) decontamNsf = 690;
  
  rooms.push({
    room_code: 'SC861',
    room_name: 'Decontamination Room, SPS',
    functional_area: 'Decontamination Area',
    nsf: decontamNsf,
    quantity: 1
  });

  // Automated Cart Washer
  rooms.push({
    room_code: 'SC871',
    room_name: 'Automated Cart Washer, SPS',
    functional_area: 'Decontamination Area',
    nsf: 180,
    quantity: 1
  });

  // Manual Cart Washer
  rooms.push({
    room_code: 'SC872',
    room_name: 'Manual Cart Washer, SPS',
    functional_area: 'Decontamination Area',
    nsf: 140,
    quantity: 1
  });

  // Water Treatment / Detergent Storage Room
  rooms.push({
    room_code: 'SC873',
    room_name: 'Water Treatment / Detergent Storage Room, SPS',
    functional_area: 'Decontamination Area',
    nsf: instrumentSets <= 200 ? 120 : 150,
    quantity: 1
  });

  // Housekeeping Aides Closet (Decontamination)
  rooms.push({
    room_code: 'SB244',
    room_name: 'SPS Housekeeping Aides Closet (HAC)',
    functional_area: 'Decontamination Area',
    nsf: 60,
    quantity: 1
  });

  // ===== FA 2: SCOPE PROCESSING AREA =====
  
  // Scope Processing Anteroom
  rooms.push({
    room_code: 'SC881',
    room_name: 'Scope Processing Anteroom, SPS',
    functional_area: 'Scope Processing Area',
    nsf: 60,
    quantity: 1
  });

  // Scope Processing PPE Alcove
  rooms.push({
    room_code: 'SC882',
    room_name: 'Scope Processing PPE Alcove, SPS',
    functional_area: 'Scope Processing Area',
    nsf: 60,
    quantity: 1
  });

  // Scope Processing Decontamination Room
  rooms.push({
    room_code: 'SC883',
    room_name: 'Scope Processing Decontamination Room, SPS',
    functional_area: 'Scope Processing Area',
    nsf: scopesDaily <= 30 ? 120 : 200,
    quantity: 1
  });

  // Scope Processing Room
  let scopeNsf = 150;
  if (scopesDaily > 45) scopeNsf = 240;
  else if (scopesDaily > 30) scopeNsf = 210;
  else if (scopesDaily > 15) scopeNsf = 180;
  
  rooms.push({
    room_code: 'SC885',
    room_name: 'Scope Processing Room, SPS',
    functional_area: 'Scope Processing Area',
    nsf: scopeNsf,
    quantity: 1
  });

  // Scope Staging Room
  rooms.push({
    room_code: 'SC891',
    room_name: 'Scope Staging Room, SPS',
    functional_area: 'Scope Processing Area',
    nsf: scopesDaily <= 30 ? 80 : 120,
    quantity: 1
  });

  // ===== FA 3: PREPARATION AND ASSEMBLY AREA =====
  
  // Prep & Assembly Anteroom
  rooms.push({
    room_code: 'SC881',
    room_name: 'Prep & Assembly Anteroom, SPS',
    functional_area: 'Preparation and Assembly Area',
    nsf: 60,
    quantity: 1
  });

  // Prep & Assembly PPE Alcove
  rooms.push({
    room_code: 'SC882',
    room_name: 'Prep & Assembly PPE Alcove, SPS',
    functional_area: 'Preparation and Assembly Area',
    nsf: 60,
    quantity: 1
  });

  // Clean Instrument Set Assembly Workroom
  let assemblyNsf = 480;
  if (instrumentSets > 400) assemblyNsf = 1075;
  else if (instrumentSets > 200) assemblyNsf = 775;
  
  rooms.push({
    room_code: 'SC892',
    room_name: 'Clean Instrument Set Assembly Workroom, SPS',
    functional_area: 'Preparation and Assembly Area',
    nsf: assemblyNsf,
    quantity: 1
  });

  // Supplies Storage Room
  let suppliesNsf = 80;
  if (instrumentSets > 400) suppliesNsf = 120;
  else if (instrumentSets > 200) suppliesNsf = 100;
  
  rooms.push({
    room_code: 'SC901',
    room_name: 'Supplies Storage Room, SPS',
    functional_area: 'Preparation and Assembly Area',
    nsf: suppliesNsf,
    quantity: 1
  });

  // ===== FA 4: STERILIZATION AREA =====
  
  // Steam Sterilization Room
  let steamNsf = 200;
  if (instrumentSets > 400) steamNsf = 400;
  else if (instrumentSets > 200) steamNsf = 300;
  
  rooms.push({
    room_code: 'SC902',
    room_name: 'Steam Sterilization Room, SPS',
    functional_area: 'Sterilization Area',
    nsf: steamNsf,
    quantity: 1
  });

  // Low Temp Sterilization Room
  rooms.push({
    room_code: 'SC911',
    room_name: 'Low Temp Sterilization Room, SPS',
    functional_area: 'Sterilization Area',
    nsf: instrumentSets <= 200 ? 30 : 60,
    quantity: 1
  });

  // Ethylene Oxide (EtO) Gas Sterilization Room
  rooms.push({
    room_code: 'SC921',
    room_name: 'Ethylene Oxide (EtO) Gas Sterilization Room, SPS',
    functional_area: 'Sterilization Area',
    nsf: 100,
    quantity: 1
  });

  // Ethylene Oxide (EtO) Gas Sterilization Abator Room
  rooms.push({
    room_code: 'SC922',
    room_name: 'Ethylene Oxide (EtO) Gas Sterilization Abator Room, SPS',
    functional_area: 'Sterilization Area',
    nsf: 100,
    quantity: 1
  });

  // Cart Return Area
  rooms.push({
    room_code: 'SC923',
    room_name: 'Cart Return Area, SPS',
    functional_area: 'Sterilization Area',
    nsf: 30,
    quantity: 1
  });

  // Unloading / Cooling
  let coolingNsf = 60;
  if (instrumentSets > 400) coolingNsf = 90;
  else if (instrumentSets > 200) coolingNsf = 75;
  
  rooms.push({
    room_code: 'SC931',
    room_name: 'Unloading / Cooling, SPS',
    functional_area: 'Sterilization Area',
    nsf: coolingNsf,
    quantity: 1
  });

  // Steam Generator
  rooms.push({
    room_code: 'SC936',
    room_name: 'Steam Generator, SPS',
    functional_area: 'Sterilization Area',
    nsf: 60,
    quantity: 1
  });

  // ===== FA 5: RECEIVING, STORAGE AND DISPATCH AREA =====
  
  // Calculate Sterile Durables Storage and Case Cart Assembly NSF for dependent rooms
  let sterileStorageNsf = 120;
  if (operatingRooms >= 17) sterileStorageNsf = 400;
  else if (operatingRooms >= 13) sterileStorageNsf = 320;
  else if (operatingRooms >= 9) sterileStorageNsf = 260;
  else if (operatingRooms >= 5) sterileStorageNsf = 180;
  
  let caseCartNsf = 120;
  if (dailyProcedures > 400) caseCartNsf = 240;
  else if (dailyProcedures > 300) caseCartNsf = 210;
  else if (dailyProcedures > 200) caseCartNsf = 180;
  else if (dailyProcedures > 100) caseCartNsf = 150;
  
  const combinedStorageDispatch = sterileStorageNsf + caseCartNsf;

  // Vendor Drop-off / Pick-up Room
  rooms.push({
    room_code: 'SC937',
    room_name: 'Vendor Drop-off / Pick-up Room, SPS',
    functional_area: 'Receiving, Storage and Dispatch Area',
    nsf: 120,
    quantity: 1
  });

  // Dispatch Room
  let dispatchNsf = 80;
  if (combinedStorageDispatch > 320) dispatchNsf = 240;
  else if (combinedStorageDispatch > 180) dispatchNsf = 160;
  
  rooms.push({
    room_code: 'SC941',
    room_name: 'Dispatch Room, SPS',
    functional_area: 'Receiving, Storage and Dispatch Area',
    nsf: dispatchNsf,
    quantity: 1
  });

  // Case Cart Dispatch Workstation
  rooms.push({
    room_code: 'SC946',
    room_name: 'Case Cart Dispatch Workstation, SPS',
    functional_area: 'Receiving, Storage and Dispatch Area',
    nsf: 56,
    quantity: 1
  });

  // Sterile Durables (Sterile Instruments) Storage Room
  rooms.push({
    room_code: 'SC951',
    room_name: 'Sterile Durables (Sterile Instruments) Storage Room, SPS',
    functional_area: 'Receiving, Storage and Dispatch Area',
    nsf: sterileStorageNsf,
    quantity: 1
  });

  // Case Cart Assembly
  rooms.push({
    room_code: 'SC961',
    room_name: 'Case Cart Assembly, SPS',
    functional_area: 'Receiving, Storage and Dispatch Area',
    nsf: caseCartNsf,
    quantity: 1
  });

  // Housekeeping Aides Closet (Storage/Dispatch)
  rooms.push({
    room_code: 'SB244',
    room_name: 'SPS Housekeeping Aides Closet (HAC)',
    functional_area: 'Receiving, Storage and Dispatch Area',
    nsf: combinedStorageDispatch > 400 ? 80 : 60,
    quantity: 1
  });

  // ===== FA 6: STAFF AND ADMINISTRATIVE AREA =====
  
  // Calculate total Sterile Processing storage NSF for staff area calculations
  const waterTreatmentNsf = instrumentSets <= 200 ? 120 : 150;
  const scopeDecontamNsf = scopesDaily <= 30 ? 120 : 200;
  const totalStorageNsf = decontamNsf + waterTreatmentNsf + scopeDecontamNsf + 
                          assemblyNsf + steamNsf + sterileStorageNsf + caseCartNsf;

  // SPS Chief Office
  rooms.push({
    room_code: 'SS204',
    room_name: 'SPS Chief Office',
    functional_area: 'Staff and Administrative Area',
    nsf: 100,
    quantity: 1
  });

  // SPS Assistant Chief Office
  rooms.push({
    room_code: 'SS204',
    room_name: 'SPS Assistant Chief Office',
    functional_area: 'Staff and Administrative Area',
    nsf: 100,
    quantity: 1
  });

  // SPS Clerical Workstation
  rooms.push({
    room_code: 'SS218',
    room_name: 'SPS Clerical Workstation',
    functional_area: 'Staff and Administrative Area',
    nsf: 56,
    quantity: totalStorageNsf > 2615 ? 2 : 1
  });

  // SPS Staff Training Room
  let trainingNsf = 240;
  if (totalStorageNsf > 2815) trainingNsf = 545;
  else if (totalStorageNsf > 2615) trainingNsf = 300;
  
  rooms.push({
    room_code: 'SS111',
    room_name: 'SPS Staff Training Room',
    functional_area: 'Staff and Administrative Area',
    nsf: trainingNsf,
    quantity: 1
  });

  // SPS Copy / Supply Room
  rooms.push({
    room_code: 'SS272',
    room_name: 'SPS Copy / Supply Room',
    functional_area: 'Staff and Administrative Area',
    nsf: totalStorageNsf > 2615 ? 100 : 80,
    quantity: 1
  });

  // SPS Staff Breakroom
  let breakNsf = 120;
  if (totalStorageNsf > 3215) breakNsf = 180;
  else if (totalStorageNsf > 2815) breakNsf = 160;
  else if (totalStorageNsf > 2615) breakNsf = 140;
  
  rooms.push({
    room_code: 'SS262',
    room_name: 'SPS Staff Breakroom',
    functional_area: 'Staff and Administrative Area',
    nsf: breakNsf,
    quantity: 1
  });

  // SPS Staff Toilet
  rooms.push({
    room_code: 'SB191',
    room_name: 'SPS Staff Toilet',
    functional_area: 'Staff and Administrative Area',
    nsf: 60,
    quantity: totalStorageNsf > 2815 ? 3 : 2
  });

  // SPS Female Staff Locker Room
  let femaleLockerNsf = 100;
  if (totalStorageNsf > 3215) femaleLockerNsf = 250;
  else if (totalStorageNsf > 2815) femaleLockerNsf = 200;
  else if (totalStorageNsf > 2615) femaleLockerNsf = 150;
  
  rooms.push({
    room_code: 'SS232',
    room_name: 'SPS Female Staff Locker Room',
    functional_area: 'Staff and Administrative Area',
    nsf: femaleLockerNsf,
    quantity: 1
  });

  // SPS Female Staff Toilet / Shower
  rooms.push({
    room_code: 'SB174',
    room_name: 'SPS Female Staff Toilet / Shower',
    functional_area: 'Staff and Administrative Area',
    nsf: 85,
    quantity: totalStorageNsf > 2815 ? 2 : 1
  });

  // SPS Male Staff Locker Room
  let maleLockerNsf = 100;
  if (totalStorageNsf > 3215) maleLockerNsf = 250;
  else if (totalStorageNsf > 2815) maleLockerNsf = 200;
  else if (totalStorageNsf > 2615) maleLockerNsf = 150;
  
  rooms.push({
    room_code: 'SS241',
    room_name: 'SPS Male Staff Locker Room',
    functional_area: 'Staff and Administrative Area',
    nsf: maleLockerNsf,
    quantity: 1
  });

  // SPS Male Staff Toilet / Shower
  rooms.push({
    room_code: 'SB185',
    room_name: 'SPS Male Staff Toilet / Shower',
    functional_area: 'Staff and Administrative Area',
    nsf: 85,
    quantity: totalStorageNsf > 3215 ? 2 : 1
  });

  return rooms;
}

export const CHAPTER_285 = {
  ...CHAPTER_285_CONFIG,
  calculateRooms: calculateRooms_285
};
