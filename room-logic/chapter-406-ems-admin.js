// Chapter 406: Environmental Management Service (EMS) Administration
// Based on VA PG-18-9 Space Planning Criteria

export const CHAPTER_406_CONFIG = {
  id: 'chapter-406',
  name: 'Environmental Management Service (EMS) Administration',
  description: 'EMS Administration including office/workspace, storage, linen handling areas, housekeeping closets, and facility support.',
  
  inputFields: [
    {
      id: 'project_level',
      label: 'Estimated Project Level',
      type: 'select',
      options: [
        { value: 1, label: 'Level 1 (1-100 beds)' },
        { value: 2, label: 'Level 2 (101-200 beds)' },
        { value: 3, label: 'Level 3 (201-300 beds)' },
        { value: 4, label: 'Level 4 (301-400 beds)' },
        { value: 5, label: 'Level 5 (401-500 beds)' }
      ],
      defaultValue: 2,
      helpText: 'Estimated project level for the facility based on patient bed count (1-5).'
    }
  ],
  
  functionalAreas: [
    'FA 1: Staff and Administrative Area',
    'FA 2: Support Area'
  ]
};

export function calculateRooms_406(inputs) {
  const rooms = [];
  const level = inputs.project_level || 2;
  
  // ==========================================
  // FA 1: STAFF AND ADMINISTRATIVE AREA
  // ==========================================
  
  // EM Svcs Chief Office - always 1
  rooms.push({
    room_code: 'SS204',
    room_name: 'EM Svcs Chief Office',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: 100,
    quantity: 1
  });
  
  // Waiting - always 1
  rooms.push({
    room_code: 'SB003',
    room_name: 'EM Svcs Waiting',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: 80,
    quantity: 1
  });
  
  // Assistant Chief Office - always 1
  rooms.push({
    room_code: 'SS204',
    room_name: 'EM Svcs Assistant Chief Office',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: 100,
    quantity: 1
  });
  
  // Supervisor Office - 1 for levels 1-2, 2 for levels 3-5
  rooms.push({
    room_code: 'SS204',
    room_name: 'EM Svcs Supervisor Office',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: 100,
    quantity: level >= 3 ? 2 : 1
  });
  
  // Administration Support Workstation - 1 for levels 1-2, 2 for levels 3-5
  rooms.push({
    room_code: 'SS218',
    room_name: 'EM Svcs Administration Support Workstation',
    functional_area: 'FA 1: Staff and Administrative Area',
    nsf: 56,
    quantity: level >= 3 ? 2 : 1
  });
  
  // ==========================================
  // FA 2: SUPPORT AREA
  // ==========================================
  
  // Supplies/Large Equipment Storage Room - size scales with level
  const suppliesStorageNsfMap = { 1: 200, 2: 400, 3: 800, 4: 1200, 5: 1600 };
  rooms.push({
    room_code: 'SC476',
    room_name: 'Supplies/Large Equipment Storage Room, EMS',
    functional_area: 'FA 2: Support Area',
    nsf: suppliesStorageNsfMap[level],
    quantity: 1
  });
  
  // Clean Linen Distribution Room - size scales with level
  const cleanLinenNsfMap = { 1: 240, 2: 290, 3: 340, 4: 390, 5: 440 };
  rooms.push({
    room_code: 'SC459',
    room_name: 'Clean Linen Distribution Room, EMS',
    functional_area: 'FA 2: Support Area',
    nsf: cleanLinenNsfMap[level],
    quantity: 1
  });
  
  // Soiled Linen Distribution Room
  let soiledLinenNsf = 120;
  if (level >= 5) soiledLinenNsf = 200;
  else if (level >= 3) soiledLinenNsf = 160;
  
  rooms.push({
    room_code: 'SC455',
    room_name: 'Soiled Linen Distribution Room, EMS',
    functional_area: 'FA 2: Support Area',
    nsf: soiledLinenNsf,
    quantity: 1
  });
  
  // Trash Collection Room
  let trashCollectionNsf = 200;
  if (level >= 5) trashCollectionNsf = 280;
  else if (level >= 3) trashCollectionNsf = 240;
  
  rooms.push({
    room_code: 'SC474',
    room_name: 'Trash Collection Room, EMS',
    functional_area: 'FA 2: Support Area',
    nsf: trashCollectionNsf,
    quantity: 1
  });
  
  // Patient Belongings Storage Room
  let patientBelongingsNsf = 300;
  if (level >= 5) patientBelongingsNsf = 400;
  else if (level >= 3) patientBelongingsNsf = 350;
  
  rooms.push({
    room_code: 'SC491',
    room_name: 'Patient Belongings Storage Room, EMS',
    functional_area: 'FA 2: Support Area',
    nsf: patientBelongingsNsf,
    quantity: 1
  });
  
  return rooms;
}
