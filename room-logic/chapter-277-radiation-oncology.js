/**
 * Chapter 277: Radiation Oncology Service
 * VA PG-18-9 Space Planning Criteria
 * 
 * This chapter covers Radiation Oncology Service facilities including
 * linear accelerators (LINACs), simulators, and brachytherapy.
 * 
 * Input Data:
 * - Number of LINACs authorized (1-4)
 * - CT Simulator authorized (boolean)
 * - PET/CT Simulator authorized (boolean)
 * - MRI Simulator authorized (boolean)
 * - Brachytherapy authorized (boolean)
 */

export const CHAPTER_277_CONFIG = {
  id: '277',
  name: 'Radiation Oncology Service',
  description: 'Radiation therapy facilities including linear accelerators (LINACs), CT/PET/MRI simulation, and brachytherapy',
  inputFields: [
    {
      id: 'linacs_authorized',
      label: 'Number of Linear Accelerators (LINACs) Authorized',
      type: 'select',
      options: [
        { value: 1, label: '1 LINAC' },
        { value: 2, label: '2 LINACs' },
        { value: 3, label: '3 LINACs' },
        { value: 4, label: '4 LINACs' }
      ],
      defaultValue: 1,
      required: true
    },
    {
      id: 'ct_simulator',
      label: 'Is a CT Simulator authorized?',
      type: 'boolean',
      defaultValue: true
    },
    {
      id: 'petct_simulator',
      label: 'Is a PET/CT Simulator authorized?',
      type: 'boolean',
      defaultValue: false
    },
    {
      id: 'mri_simulator',
      label: 'Is an MRI Simulator authorized?',
      type: 'boolean',
      defaultValue: false
    },
    {
      id: 'brachytherapy',
      label: 'Is Brachytherapy authorized?',
      type: 'boolean',
      defaultValue: false
    }
  ],
  functionalAreas: [
    'Reception Area',
    'Patient Examination Area',
    'Simulation Area',
    'Treatment Planning Area',
    'Patient Treatment Area',
    'Clinical Support Area',
    'Clinical Staff Area',
    'Support Area',
    'Staff and Administrative Area',
    'Building Support Area'
  ]
};

export function calculateRooms_277(inputs) {
  const rooms = [];
  const linacs = parseInt(inputs.linacs_authorized) || 1;
  const ctSimulator = inputs.ct_simulator === true || inputs.ct_simulator === 'true';
  const petctSimulator = inputs.petct_simulator === true || inputs.petct_simulator === 'true';
  const mriSimulator = inputs.mri_simulator === true || inputs.mri_simulator === 'true';
  const brachytherapy = inputs.brachytherapy === true || inputs.brachytherapy === 'true';

  // ===== FA 1: RECEPTION AREA =====
  
  // Walk-in Vestibule (for standalone facilities)
  rooms.push({
    room_code: 'SB292',
    room_name: 'Rad Onc Walk-in Vestibule',
    functional_area: 'Reception Area',
    nsf: 180,
    quantity: 1
  });

  // Waiting
  let waitingNsf = 130;
  if (linacs === 2) {
    waitingNsf = 190;
  } else if (linacs >= 3) {
    waitingNsf = brachytherapy ? 260 : 250;
  }
  rooms.push({
    room_code: 'SB003',
    room_name: 'Rad Onc Waiting',
    functional_area: 'Reception Area',
    nsf: waitingNsf,
    quantity: 1
  });

  // Reception
  rooms.push({
    room_code: 'SC183',
    room_name: 'Rad Onc Reception',
    functional_area: 'Reception Area',
    nsf: linacs === 1 ? 85 : 105,
    quantity: 1
  });

  // Patient Education Workstation
  rooms.push({
    room_code: 'SC172',
    room_name: 'Rad Onc Patient Education Workstation',
    functional_area: 'Reception Area',
    nsf: 40,
    quantity: 1
  });

  // Refreshment Station
  rooms.push({
    room_code: 'SB293',
    room_name: 'Rad Onc Refreshment Station',
    functional_area: 'Reception Area',
    nsf: 20,
    quantity: 1
  });

  // Visitor Toilet
  rooms.push({
    room_code: 'SB191',
    room_name: 'Rad Onc Visitor Toilet',
    functional_area: 'Reception Area',
    nsf: 60,
    quantity: linacs <= 2 ? 1 : 2
  });

  // Wheelchair Alcove
  rooms.push({
    room_code: 'SB262',
    room_name: 'Rad Onc Wheelchair Alcove',
    functional_area: 'Reception Area',
    nsf: linacs <= 2 ? 20 : 40,
    quantity: 1
  });

  // ===== FA 2: PATIENT EXAMINATION AREA =====
  
  // Patient Consultation / Education
  rooms.push({
    room_code: 'SC171',
    room_name: 'Rad Onc Patient Consultation / Education',
    functional_area: 'Patient Examination Area',
    nsf: 140,
    quantity: 1
  });

  // Exam Room
  let examQty = 3;
  if (linacs === 2) examQty = 5;
  else if (linacs >= 3) examQty = 6;
  rooms.push({
    room_code: 'CRO11',
    room_name: 'Exam Room, Rad Onc Svc',
    functional_area: 'Patient Examination Area',
    nsf: 125,
    quantity: examQty
  });

  // Procedure Room
  rooms.push({
    room_code: 'CRO12',
    room_name: 'Procedure, Rad Onc Svc',
    functional_area: 'Patient Examination Area',
    nsf: 180,
    quantity: 1
  });

  // Nurse Station
  rooms.push({
    room_code: 'SC152',
    room_name: 'Nurse Station',
    functional_area: 'Patient Examination Area',
    nsf: linacs <= 2 ? 120 : 160,
    quantity: 1
  });

  // Patient Holding / Observation Bay
  rooms.push({
    room_code: 'SC291',
    room_name: 'Rad Onc Patient Holding / Observation Bay',
    functional_area: 'Patient Examination Area',
    nsf: 80,
    quantity: linacs === 1 ? 1 : 3
  });

  // Medication Room
  rooms.push({
    room_code: 'CRO13',
    room_name: 'Medication Room, Rad Onc Svc',
    functional_area: 'Patient Examination Area',
    nsf: 80,
    quantity: 1
  });

  // Nourishment Alcove
  rooms.push({
    room_code: 'SC296',
    room_name: 'Rad Onc Nourishment Alcove',
    functional_area: 'Patient Examination Area',
    nsf: 40,
    quantity: 1
  });

  // Crash Cart Alcove
  rooms.push({
    room_code: 'SC052',
    room_name: 'Rad Onc Crash Cart Alcove',
    functional_area: 'Patient Examination Area',
    nsf: 20,
    quantity: 1
  });

  // Clean Linen Alcove
  rooms.push({
    room_code: 'SC467',
    room_name: 'Rad Onc Clean Linen Alcove',
    functional_area: 'Patient Examination Area',
    nsf: linacs <= 2 ? 20 : 40,
    quantity: 1
  });

  // Soiled Utility / Holding Room
  rooms.push({
    room_code: 'SC206',
    room_name: 'Rad Onc Soiled Utility / Holding Room',
    functional_area: 'Patient Examination Area',
    nsf: 80,
    quantity: 1
  });

  // ===== FA 3: SIMULATION AREA =====
  
  // CT Simulator
  if (ctSimulator) {
    rooms.push({
      room_code: 'CRO16',
      room_name: 'CT Simulator Room, Rad Onc Svc',
      functional_area: 'Simulation Area',
      nsf: 500,
      quantity: 1
    });
    rooms.push({
      room_code: 'CRO17',
      room_name: 'CT Simulator Control Room, Rad Onc Svc',
      functional_area: 'Simulation Area',
      nsf: 150,
      quantity: 1
    });
    rooms.push({
      room_code: 'CRO18',
      room_name: 'CT Simulator System Component Room, Rad Onc Svc',
      functional_area: 'Simulation Area',
      nsf: 120,
      quantity: 1
    });
    rooms.push({
      room_code: 'CRO19',
      room_name: 'CT Simulator Equipment / Device Storage Room, Rad Onc Svc',
      functional_area: 'Simulation Area',
      nsf: 100,
      quantity: 1
    });
  }

  // PET/CT Simulator
  if (petctSimulator) {
    rooms.push({
      room_code: 'CRO23',
      room_name: 'PET/CT Simulator Room, Rad Onc Svc',
      functional_area: 'Simulation Area',
      nsf: 600,
      quantity: 1
    });
    rooms.push({
      room_code: 'CRO24',
      room_name: 'PET/CT Simulator Control Room, Rad Onc Svc',
      functional_area: 'Simulation Area',
      nsf: 150,
      quantity: 1
    });
    rooms.push({
      room_code: 'CRO25',
      room_name: 'PET/CT Simulator System Component Room, Rad Onc Svc',
      functional_area: 'Simulation Area',
      nsf: 110,
      quantity: 1
    });
    rooms.push({
      room_code: 'CRO26',
      room_name: 'PET/CT Simulator Equipment / Device Storage Room, Rad Onc Svc',
      functional_area: 'Simulation Area',
      nsf: 100,
      quantity: 1
    });
    rooms.push({
      room_code: 'CRO36',
      room_name: 'Patient Uptake Shielded Room, Rad Onc Svc',
      functional_area: 'Simulation Area',
      nsf: 100,
      quantity: 2
    });
    rooms.push({
      room_code: 'CRO39',
      room_name: '"Hot" Room, Rad Onc Svc',
      functional_area: 'Simulation Area',
      nsf: 80,
      quantity: 1
    });
    rooms.push({
      room_code: 'SB193',
      room_name: 'Rad Onc "Isotope Hot" Special Needs Patient Toilet',
      functional_area: 'Simulation Area',
      nsf: 75,
      quantity: 1
    });
  }

  // MRI Simulator
  if (mriSimulator) {
    rooms.push({
      room_code: 'CRO29',
      room_name: 'MRI Simulator Room, Rad Onc Svc',
      functional_area: 'Simulation Area',
      nsf: 630,
      quantity: 1
    });
    rooms.push({
      room_code: 'CRO31',
      room_name: 'MRI Simulator Control Room, Rad Onc Svc',
      functional_area: 'Simulation Area',
      nsf: 150,
      quantity: 1
    });
    rooms.push({
      room_code: 'CRO32',
      room_name: 'MRI Simulator System Component Room, Rad Onc Svc',
      functional_area: 'Simulation Area',
      nsf: 160,
      quantity: 1
    });
    rooms.push({
      room_code: 'CRO33',
      room_name: 'MRI Simulator Equipment / Device Storage Room, Rad Onc Svc',
      functional_area: 'Simulation Area',
      nsf: 100,
      quantity: 1
    });
  }

  // ===== FA 4: TREATMENT PLANNING AREA =====
  
  // Dosimetry / Treatment Planning
  rooms.push({
    room_code: 'CRO43',
    room_name: 'Dosimetry / Treatment Planning, Rad Onc Svc',
    functional_area: 'Treatment Planning Area',
    nsf: linacs <= 2 ? 250 : 300,
    quantity: 1
  });

  // Team Room
  rooms.push({
    room_code: 'SC243',
    room_name: 'Rad Onc Team Room',
    functional_area: 'Treatment Planning Area',
    nsf: linacs <= 2 ? 100 : 150,
    quantity: 1
  });

  // ===== FA 5: PATIENT TREATMENT AREA =====
  
  // Female Patient Changing / Dressing Room
  rooms.push({
    room_code: 'SB138',
    room_name: 'Rad Onc Female Patient Changing / Dressing Room',
    functional_area: 'Patient Treatment Area',
    nsf: 60,
    quantity: 1
  });

  // Female Patient Personal Property Locker Alcove
  rooms.push({
    room_code: 'SB139',
    room_name: 'Rad Onc Female Patient Personal Property Locker Alcove',
    functional_area: 'Patient Treatment Area',
    nsf: 20,
    quantity: 1
  });

  // Gowned Female Patient Waiting
  rooms.push({
    room_code: 'SB003',
    room_name: 'Rad Onc Gowned Female Patient Waiting',
    functional_area: 'Patient Treatment Area',
    nsf: 80,
    quantity: 1
  });

  // Male Patient Changing / Dressing Room
  rooms.push({
    room_code: 'SB138',
    room_name: 'Rad Onc Male Patient Changing / Dressing Room',
    functional_area: 'Patient Treatment Area',
    nsf: 60,
    quantity: linacs === 1 ? 2 : 3
  });

  // Male Patient Personal Property Locker Alcove
  rooms.push({
    room_code: 'SB139',
    room_name: 'Rad Onc Male Patient Personal Property Locker Alcove',
    functional_area: 'Patient Treatment Area',
    nsf: 40,
    quantity: 1
  });

  // Gowned Male Patient Waiting
  rooms.push({
    room_code: 'SB003',
    room_name: 'Rad Onc Gowned Male Patient Waiting',
    functional_area: 'Patient Treatment Area',
    nsf: linacs === 1 ? 120 : 140,
    quantity: 1
  });

  // Patient Toilet Room
  rooms.push({
    room_code: 'SB201',
    room_name: 'Rad Onc Patient Toilet Room',
    functional_area: 'Patient Treatment Area',
    nsf: 60,
    quantity: 2
  });

  // Special Needs Patient Toilet
  rooms.push({
    room_code: 'SB163',
    room_name: 'Rad Onc Special Needs Patient Toilet',
    functional_area: 'Patient Treatment Area',
    nsf: 75,
    quantity: 1
  });

  // Standard LINAC Room Aggregate (includes room, shielding, equipment)
  // 1 LINAC = 1 aggregate, 2-3 LINACs = 2 aggregates, 4 LINACs = 3 aggregates
  let standardLinacQty = 1;
  if (linacs === 2 || linacs === 3) standardLinacQty = 2;
  else if (linacs === 4) standardLinacQty = 3;
  
  rooms.push({
    room_code: 'CRO48',
    room_name: 'Standard Linear Accelerator (LINAC) Room Aggregate',
    functional_area: 'Patient Treatment Area',
    nsf: 1170,
    quantity: standardLinacQty
  });

  // Standard LINAC Control Room (one per LINAC aggregate)
  rooms.push({
    room_code: 'CRO49',
    room_name: 'Standard LINAC Control Room, Rad Onc Svc',
    functional_area: 'Patient Treatment Area',
    nsf: 220,
    quantity: standardLinacQty
  });

  // MRI LINAC (only if 3+ LINACs authorized)
  if (linacs >= 3) {
    rooms.push({
      room_code: 'CRO56',
      room_name: 'MRI Linear Accelerator (LINAC) Room Aggregate',
      functional_area: 'Patient Treatment Area',
      nsf: 1750,
      quantity: 1
    });
    rooms.push({
      room_code: 'CRO57',
      room_name: 'MRI LINAC Control Room, Rad Onc Svc',
      functional_area: 'Patient Treatment Area',
      nsf: 220,
      quantity: 1
    });
  }

  // LINAC Device Storage Room
  rooms.push({
    room_code: 'CRO61',
    room_name: 'Linac Device Storage Room, Rad Onc Svc',
    functional_area: 'Patient Treatment Area',
    nsf: 100,
    quantity: linacs
  });

  // Brachytherapy rooms
  if (brachytherapy) {
    rooms.push({
      room_code: 'CRO64',
      room_name: 'Brachytherapy Patient Prep / Procedure Room, Rad Onc Svc',
      functional_area: 'Patient Treatment Area',
      nsf: 180,
      quantity: 1
    });
    rooms.push({
      room_code: 'CRO67',
      room_name: 'Brachytherapy Treatment Room Aggregate, Rad Onc Svc',
      functional_area: 'Patient Treatment Area',
      nsf: 167,
      quantity: 1
    });
    rooms.push({
      room_code: 'CRO68',
      room_name: 'Brachytherapy Control Room, Rad Onc Svc',
      functional_area: 'Patient Treatment Area',
      nsf: 150,
      quantity: 1
    });
    
    // Scrub (if CT or MRI simulator authorized)
    if (ctSimulator || mriSimulator) {
      rooms.push({
        room_code: 'CRO69',
        room_name: 'Brachytherapy Scrub, Rad Onc Svc',
        functional_area: 'Patient Treatment Area',
        nsf: 30,
        quantity: 1
      });
      rooms.push({
        room_code: 'SB201',
        room_name: 'Rad Onc Brachytherapy Patient Toilet',
        functional_area: 'Patient Treatment Area',
        nsf: 75,
        quantity: 1
      });
    }
    
    rooms.push({
      room_code: 'CRO72',
      room_name: 'Brachytherapy Storage Room, Rad Onc Svc',
      functional_area: 'Patient Treatment Area',
      nsf: 100,
      quantity: 1
    });
  }

  // ===== FA 6: CLINICAL SUPPORT AREA =====
  
  let physicsStorageNsf = 300;
  if (linacs === 3) physicsStorageNsf = 350;
  else if (linacs === 4) physicsStorageNsf = 400;
  
  rooms.push({
    room_code: 'CRO78',
    room_name: 'Medical Physics Support / Storage, Rad Onc Svc',
    functional_area: 'Clinical Support Area',
    nsf: physicsStorageNsf,
    quantity: 1
  });

  // ===== FA 7: CLINICAL STAFF AREA =====
  
  // Chief Office
  rooms.push({
    room_code: 'SS204',
    room_name: 'Rad Onc Chief Office',
    functional_area: 'Clinical Staff Area',
    nsf: 100,
    quantity: 1
  });

  // Radiation Oncologist Office
  let oncologistQty = 1;
  if (linacs === 2) oncologistQty = 2;
  else if (linacs >= 3) oncologistQty = 3;
  rooms.push({
    room_code: 'SS205',
    room_name: 'Rad Onc Radiation Oncologist Office',
    functional_area: 'Clinical Staff Area',
    nsf: 80,
    quantity: oncologistQty
  });

  // Chief Therapeutic Medical Physicist Office
  rooms.push({
    room_code: 'SS204',
    room_name: 'Rad Onc Chief Therapeutic Medical Physicist (TMP) Office',
    functional_area: 'Clinical Staff Area',
    nsf: 100,
    quantity: 1
  });

  // Therapeutic Radiology Supervisor Office
  rooms.push({
    room_code: 'SS205',
    room_name: 'Rad Onc Therapeutic Radiology Supervisor Office',
    functional_area: 'Clinical Staff Area',
    nsf: 80,
    quantity: 1
  });

  // Psychologist Office
  rooms.push({
    room_code: 'SS205',
    room_name: 'Rad Onc Psychologist Office',
    functional_area: 'Clinical Staff Area',
    nsf: 80,
    quantity: 1
  });

  // Clinical Trials Coordinator Office
  rooms.push({
    room_code: 'SS205',
    room_name: 'Rad Onc Clinical Trials Coordinator Office',
    functional_area: 'Clinical Staff Area',
    nsf: 80,
    quantity: 1
  });

  // Navigator / Care Coordinator Office
  rooms.push({
    room_code: 'SS205',
    room_name: 'Rad Onc Navigator / Care Coordinator Office',
    functional_area: 'Clinical Staff Area',
    nsf: 80,
    quantity: linacs <= 2 ? 1 : 2
  });

  // PA Workstation
  rooms.push({
    room_code: 'SS215',
    room_name: 'Rad Onc Physician Assistant (PA) Workstation',
    functional_area: 'Clinical Staff Area',
    nsf: 56,
    quantity: linacs <= 2 ? 1 : 2
  });

  // Nurse Workstation
  let nurseWsQty = 1;
  if (linacs === 2) nurseWsQty = 2;
  else if (linacs >= 3) nurseWsQty = 3;
  rooms.push({
    room_code: 'SS215',
    room_name: 'Rad Onc Nurse Workstation',
    functional_area: 'Clinical Staff Area',
    nsf: 56,
    quantity: nurseWsQty
  });

  // Nurse Practitioner Workstation
  rooms.push({
    room_code: 'SS215',
    room_name: 'Rad Onc Nurse Practitioner Workstation',
    functional_area: 'Clinical Staff Area',
    nsf: 56,
    quantity: linacs <= 2 ? 1 : 2
  });

  // Social Worker Workstation
  rooms.push({
    room_code: 'SS215',
    room_name: 'Rad Onc Social Worker Workstation',
    functional_area: 'Clinical Staff Area',
    nsf: 56,
    quantity: 1
  });

  // Dietitian Workstation
  rooms.push({
    room_code: 'SS215',
    room_name: 'Rad Onc Dietitian Workstation',
    functional_area: 'Clinical Staff Area',
    nsf: 56,
    quantity: 1
  });

  // Resident Workstation
  rooms.push({
    room_code: 'SS215',
    room_name: 'Rad Onc Resident Workstation',
    functional_area: 'Clinical Staff Area',
    nsf: 56,
    quantity: linacs === 1 ? 1 : 2
  });

  // Touchdown Workstation
  rooms.push({
    room_code: 'SS215',
    room_name: 'Rad Onc Touchdown Workstation',
    functional_area: 'Clinical Staff Area',
    nsf: 56,
    quantity: 1
  });

  // Telehealth Room
  rooms.push({
    room_code: 'SC249',
    room_name: 'Rad Onc Telehealth Room',
    functional_area: 'Clinical Staff Area',
    nsf: 80,
    quantity: 1
  });

  // Staff Breakroom
  rooms.push({
    room_code: 'SS262',
    room_name: 'Rad Onc Staff Breakroom',
    functional_area: 'Clinical Staff Area',
    nsf: linacs <= 2 ? 160 : 200,
    quantity: 1
  });

  // Copy / Supply Room
  rooms.push({
    room_code: 'SS272',
    room_name: 'Rad Onc Copy / Supply Room',
    functional_area: 'Clinical Staff Area',
    nsf: linacs <= 2 ? 60 : 100,
    quantity: 1
  });

  // Female Staff Locker Room
  rooms.push({
    room_code: 'SS232',
    room_name: 'Rad Onc Female Staff Locker Room',
    functional_area: 'Clinical Staff Area',
    nsf: linacs <= 2 ? 100 : 140,
    quantity: 1
  });

  // Male Staff Locker Room
  rooms.push({
    room_code: 'SS241',
    room_name: 'Rad Onc Male Staff Locker Room',
    functional_area: 'Clinical Staff Area',
    nsf: linacs <= 2 ? 100 : 140,
    quantity: 1
  });

  // Staff Toilet (FA7)
  rooms.push({
    room_code: 'SB191',
    room_name: 'Rad Onc Staff Toilet',
    functional_area: 'Clinical Staff Area',
    nsf: 60,
    quantity: linacs <= 2 ? 2 : 3
  });

  // ===== FA 8: SUPPORT AREA =====
  
  // Clean Equipment Room
  rooms.push({
    room_code: 'CRO74',
    room_name: 'Clean Equipment Room, Rad Onc Svc',
    functional_area: 'Support Area',
    nsf: linacs <= 2 ? 120 : 200,
    quantity: 1
  });

  // Clean Supply Room
  rooms.push({
    room_code: 'CRO75',
    room_name: 'Clean Supply Room, Rad Onc Svc',
    functional_area: 'Support Area',
    nsf: linacs <= 2 ? 80 : 160,
    quantity: 1
  });

  // Full Gas Cylinder Storage Room
  rooms.push({
    room_code: 'SB541',
    room_name: 'Rad Onc Full Gas Cylinder Storage Room',
    functional_area: 'Support Area',
    nsf: 60,
    quantity: 1
  });

  // Empty Gas Cylinder Storage Room
  rooms.push({
    room_code: 'SB551',
    room_name: 'Rad Onc Empty Gas Cylinder Storage Room',
    functional_area: 'Support Area',
    nsf: 60,
    quantity: 1
  });

  // Service Entrance Vestibule
  rooms.push({
    room_code: 'SV224',
    room_name: 'Rad Onc Service Entrance Vestibule',
    functional_area: 'Support Area',
    nsf: 160,
    quantity: 1
  });

  // Housekeeping Aides Room
  rooms.push({
    room_code: 'SB245',
    room_name: 'Rad Onc Housekeeping Aides Room',
    functional_area: 'Support Area',
    nsf: 80,
    quantity: 1
  });

  // ===== FA 9: STAFF AND ADMINISTRATIVE AREA =====
  
  // HSS Office
  rooms.push({
    room_code: 'SS205',
    room_name: 'Rad Onc HSS Office',
    functional_area: 'Staff and Administrative Area',
    nsf: 80,
    quantity: 1
  });

  // AO Workstation
  rooms.push({
    room_code: 'SS215',
    room_name: 'Rad Onc AO Workstation',
    functional_area: 'Staff and Administrative Area',
    nsf: 56,
    quantity: 1
  });

  // Administrative Staff Workstation
  rooms.push({
    room_code: 'SS215',
    room_name: 'Rad Onc Administrative Staff Workstation',
    functional_area: 'Staff and Administrative Area',
    nsf: 56,
    quantity: 1
  });

  // Staff Conference Room
  rooms.push({
    room_code: 'SS101',
    room_name: 'Rad Onc Staff Conference Room',
    functional_area: 'Staff and Administrative Area',
    nsf: linacs <= 2 ? 240 : 300,
    quantity: 1
  });

  // Conference Room Storage Room
  rooms.push({
    room_code: 'SS106',
    room_name: 'Rad Onc Conference Room Storage Room',
    functional_area: 'Staff and Administrative Area',
    nsf: 60,
    quantity: 1
  });

  // Staff Toilet (FA9)
  rooms.push({
    room_code: 'SB191',
    room_name: 'Rad Onc Staff Toilet',
    functional_area: 'Staff and Administrative Area',
    nsf: 60,
    quantity: 1
  });

  // ===== FA 10: BUILDING SUPPORT AREA =====
  
  // Telecommunications Room
  rooms.push({
    room_code: 'SC391',
    room_name: 'Rad Onc Telecommunications Room (TR)',
    functional_area: 'Building Support Area',
    nsf: 170,
    quantity: 1
  });

  // Mechanical Room (0 NSF - included in BGSF)
  rooms.push({
    room_code: 'SB269',
    room_name: 'Rad Onc Mechanical Room',
    functional_area: 'Building Support Area',
    nsf: 0,
    quantity: 1
  });

  // Electrical Room (0 NSF - included in BGSF)
  rooms.push({
    room_code: 'SB277',
    room_name: 'Rad Onc Electrical Room',
    functional_area: 'Building Support Area',
    nsf: 0,
    quantity: 1
  });

  return rooms;
}

export const CHAPTER_277 = {
  ...CHAPTER_277_CONFIG,
  calculateRooms: calculateRooms_277
};
