// Chapter 228: Radiology / Imaging Service
// Based on VA PG-18-9 Space Planning Criteria
// NTDG Factor: 1.35

export const CHAPTER_228 = {
  id: '228',
  name: 'Radiology / Imaging Service',
  ntdgFactor: 1.35,
  
  inputs: [
    {
      id: 'annual_procedures',
      label: 'Annual Radiology Procedures (in thousands)',
      type: 'number',
      min: 20,
      max: 200,
      default: 60,
      required: true
    },
    {
      id: 'has_xray',
      label: 'Provide General X-Ray (Radiographic)?',
      type: 'checkbox',
      default: true
    },
    {
      id: 'num_xray_rooms',
      label: 'How many General X-Ray Rooms?',
      type: 'number',
      min: 1,
      max: 6,
      default: 2,
      required: false,
      dependsOn: 'has_xray'
    },
    {
      id: 'has_fluoro',
      label: 'Provide Fluoroscopy (R/F)?',
      type: 'checkbox',
      default: true
    },
    {
      id: 'num_fluoro_rooms',
      label: 'How many Fluoroscopy Rooms?',
      type: 'number',
      min: 1,
      max: 3,
      default: 1,
      required: false,
      dependsOn: 'has_fluoro'
    },
    {
      id: 'has_ct',
      label: 'Provide CT (Computed Tomography)?',
      type: 'checkbox',
      default: true
    },
    {
      id: 'num_ct_scanners',
      label: 'How many CT Scanners?',
      type: 'number',
      min: 1,
      max: 4,
      default: 1,
      required: false,
      dependsOn: 'has_ct'
    },
    {
      id: 'has_mri',
      label: 'Provide MRI (Magnetic Resonance Imaging)?',
      type: 'checkbox',
      default: true
    },
    {
      id: 'num_mri_scanners',
      label: 'How many MRI Scanners?',
      type: 'number',
      min: 1,
      max: 3,
      default: 1,
      required: false,
      dependsOn: 'has_mri'
    },
    {
      id: 'has_ultrasound',
      label: 'Provide Ultrasound?',
      type: 'checkbox',
      default: true
    },
    {
      id: 'num_ultrasound_rooms',
      label: 'How many Ultrasound Rooms?',
      type: 'number',
      min: 1,
      max: 4,
      default: 2,
      required: false,
      dependsOn: 'has_ultrasound'
    },
    {
      id: 'has_mammography',
      label: 'Provide Mammography?',
      type: 'checkbox',
      default: true
    },
    {
      id: 'has_nuclear_med',
      label: 'Provide Nuclear Medicine?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'has_pet_ct',
      label: 'Provide PET/CT?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'has_interventional',
      label: 'Provide Interventional Radiology?',
      type: 'checkbox',
      default: false
    }
  ],

  // Helper function to calculate waiting area size
  calculateWaitingNSF(inputs) {
    const procedures = inputs.annual_procedures;
    if (procedures <= 30) return 200;
    if (procedures <= 60) return 300;
    if (procedures <= 100) return 400;
    if (procedures <= 150) return 500;
    return 600;
  },

  // Helper function to calculate total procedure rooms
  getTotalProcedureRooms(inputs) {
    let total = 0;
    if (inputs.has_xray) total += (inputs.num_xray_rooms || 2);
    if (inputs.has_fluoro) total += (inputs.num_fluoro_rooms || 1);
    if (inputs.has_ct) total += (inputs.num_ct_scanners || 1);
    if (inputs.has_mri) total += (inputs.num_mri_scanners || 1);
    if (inputs.has_ultrasound) total += (inputs.num_ultrasound_rooms || 2);
    if (inputs.has_mammography) total += 1;
    if (inputs.has_nuclear_med) total += 2;
    if (inputs.has_pet_ct) total += 1;
    if (inputs.has_interventional) total += 1;
    return total;
  },

  functionalAreas: [
    {
      id: 'FA1',
      name: 'Reception and Waiting Area',
      rooms: [
        {
          id: 'RAD-WAIT',
          name: 'Radiology Waiting Area',
          calculate: (inputs) => {
            const nsf = CHAPTER_228.calculateWaitingNSF(inputs);
            return [{ 
              roomCode: 'SB003', 
              roomName: 'Radiology Waiting Area', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'RAD-RECEPTION',
          name: 'Radiology Reception / Scheduling',
          calculate: (inputs) => {
            const procedures = inputs.annual_procedures;
            const quantity = procedures >= 100 ? 2 : 1;
            return [{ 
              roomCode: 'SS218', 
              roomName: 'Radiology Reception', 
              nsf: 56, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'RAD-TOILET-PUBLIC',
          name: 'Radiology Public Toilet',
          calculate: (inputs) => [{ 
            roomCode: 'SB191', 
            roomName: 'Radiology Public Toilet', 
            nsf: 60, 
            quantity: 2 
          }]
        }
      ]
    },

    {
      id: 'FA2',
      name: 'General Radiographic Area',
      rooms: [
        {
          id: 'RAD-XRAY',
          name: 'General X-Ray Room',
          calculate: (inputs) => {
            if (!inputs.has_xray) return [];
            const quantity = inputs.num_xray_rooms || 2;
            return [{ 
              roomCode: 'CI011', 
              roomName: 'Class 1 Radiology Imaging Room', 
              nsf: 325, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'RAD-XRAY-CONTROL',
          name: 'X-Ray Control Alcove',
          calculate: (inputs) => {
            if (!inputs.has_xray) return [];
            const quantity = inputs.num_xray_rooms || 2;
            return [{ 
              roomCode: 'CI012', 
              roomName: 'Class 1 Radiology Control Alcove', 
              nsf: 75, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'RAD-PORTABLE',
          name: 'Portable X-Ray Equipment Storage',
          calculate: (inputs) => {
            if (!inputs.has_xray) return [];
            return [{ 
              roomCode: 'SB745', 
              roomName: 'Portable X-Ray Storage', 
              nsf: 80, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'RAD-FLUORO',
          name: 'Fluoroscopy / R&F Room',
          calculate: (inputs) => {
            if (!inputs.has_fluoro) return [];
            const quantity = inputs.num_fluoro_rooms || 1;
            return [{ 
              roomCode: 'CI031', 
              roomName: 'Class 1 R/F Imaging Room', 
              nsf: 415, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'RAD-FLUORO-CONTROL',
          name: 'Fluoroscopy Control Room',
          calculate: (inputs) => {
            if (!inputs.has_fluoro) return [];
            const quantity = inputs.num_fluoro_rooms || 1;
            return [{ 
              roomCode: 'CI032', 
              roomName: 'Class 1 R/F Control Room', 
              nsf: 105, 
              quantity: quantity 
            }];
          }
        }
      ]
    },

    {
      id: 'FA3',
      name: 'Advanced Imaging - CT and MRI',
      rooms: [
        {
          id: 'RAD-CT',
          name: 'CT Scanner Room',
          calculate: (inputs) => {
            if (!inputs.has_ct) return [];
            const quantity = inputs.num_ct_scanners || 1;
            return [{ 
              roomCode: 'CI081', 
              roomName: 'Class 1 CT Scanning Room', 
              nsf: 560, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'RAD-CT-CONTROL',
          name: 'CT Control Room',
          calculate: (inputs) => {
            if (!inputs.has_ct) return [];
            const quantity = inputs.num_ct_scanners || 1;
            return [{ 
              roomCode: 'CI082', 
              roomName: 'Class 1 CT Control Room', 
              nsf: 210, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'RAD-CT-EQUIPMENT',
          name: 'CT Equipment / Computer Room',
          calculate: (inputs) => {
            if (!inputs.has_ct) return [];
            const quantity = inputs.num_ct_scanners || 1;
            return [{ 
              roomCode: 'CI083', 
              roomName: 'Class 1 CT System Component Room', 
              nsf: 105, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'RAD-MRI',
          name: 'MRI Scanner Room',
          calculate: (inputs) => {
            if (!inputs.has_mri) return [];
            const quantity = inputs.num_mri_scanners || 1;
            return [{ 
              roomCode: 'CI111', 
              roomName: 'Class 1 MRI Scanning Room', 
              nsf: 590, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'RAD-MRI-CONTROL',
          name: 'MRI Control Room',
          calculate: (inputs) => {
            if (!inputs.has_mri) return [];
            const quantity = inputs.num_mri_scanners || 1;
            return [{ 
              roomCode: 'CI112', 
              roomName: 'Class 1 MRI Control Room', 
              nsf: 200, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'RAD-MRI-EQUIPMENT',
          name: 'MRI Equipment Room',
          calculate: (inputs) => {
            if (!inputs.has_mri) return [];
            const quantity = inputs.num_mri_scanners || 1;
            return [{ 
              roomCode: 'CI113', 
              roomName: 'Class 1 MRI System Component Room', 
              nsf: 160, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'RAD-MRI-STORAGE',
          name: 'MRI Non-Magnetic Supply Storage',
          calculate: (inputs) => {
            if (!inputs.has_mri) return [];
            return [{ 
              roomCode: 'SB745', 
              roomName: 'MRI Non-Magnetic Storage', 
              nsf: 80, 
              quantity: 1 
            }];
          }
        }
      ]
    },

    {
      id: 'FA4',
      name: 'Ultrasound and Women\'s Imaging',
      rooms: [
        {
          id: 'RAD-ULTRASOUND',
          name: 'Ultrasound Room',
          calculate: (inputs) => {
            if (!inputs.has_ultrasound) return [];
            const quantity = inputs.num_ultrasound_rooms || 2;
            return [{ 
              roomCode: 'CI063', 
              roomName: 'Class 1 Ultrasound Scanning Room', 
              nsf: 255, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'RAD-MAMMOGRAPHY',
          name: 'Mammography Room',
          calculate: (inputs) => {
            if (!inputs.has_mammography) return [];
            return [{ 
              roomCode: 'CI056', 
              roomName: 'Class 2 Standing Breast Imaging Room', 
              nsf: 290, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'RAD-MAMMO-CONTROL',
          name: 'Mammography Control Alcove',
          calculate: (inputs) => {
            if (!inputs.has_mammography) return [];
            return [{ 
              roomCode: 'CI057', 
              roomName: 'Class 2 Standing Breast Imaging System Component Alcove', 
              nsf: 20, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'RAD-MAMMO-DRESSING',
          name: 'Mammography Dressing Room',
          calculate: (inputs) => {
            if (!inputs.has_mammography) return [];
            return [{ 
              roomCode: 'SB137', 
              roomName: 'Patient Dressing Cubicle', 
              nsf: 35, 
              quantity: 2 
            }];
          }
        }
      ]
    },

    {
      id: 'FA5',
      name: 'Nuclear Medicine and PET/CT',
      rooms: [
        {
          id: 'RAD-NMED-CAMERA',
          name: 'Nuclear Medicine Camera Room',
          calculate: (inputs) => {
            if (!inputs.has_nuclear_med) return [];
            return [{ 
              roomCode: 'CI211', 
              roomName: 'Class 1 NM Scanning Room', 
              nsf: 500, 
              quantity: 2 
            }];
          }
        },
        {
          id: 'RAD-NMED-CONTROL',
          name: 'Nuclear Medicine Control Room',
          calculate: (inputs) => {
            if (!inputs.has_nuclear_med) return [];
            return [{ 
              roomCode: 'CI216', 
              roomName: 'Class 1 SPECT/CT Control Room', 
              nsf: 210, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'RAD-NMED-UPTAKE',
          name: 'Nuclear Medicine Uptake Room',
          calculate: (inputs) => {
            if (!inputs.has_nuclear_med) return [];
            return [{ 
              roomCode: 'CI256', 
              roomName: 'PET/CT Uptake Room', 
              nsf: 145, 
              quantity: 2 
            }];
          }
        },
        {
          id: 'RAD-NMED-HOT-LAB',
          name: 'Nuclear Medicine Hot Lab',
          calculate: (inputs) => {
            if (!inputs.has_nuclear_med) return [];
            return [{ 
              roomCode: 'CI227', 
              roomName: 'NM Radiopharmacy / Hot Lab', 
              nsf: 240, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'RAD-NMED-DOSE',
          name: 'Nuclear Medicine Dose Preparation',
          calculate: (inputs) => {
            if (!inputs.has_nuclear_med) return [];
            return [{ 
              roomCode: 'CI531', 
              roomName: 'Imaging Medication Preparation', 
              nsf: 80, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'RAD-NMED-DECAY',
          name: 'Nuclear Medicine Decay Storage',
          calculate: (inputs) => {
            if (!inputs.has_nuclear_med) return [];
            return [{ 
              roomCode: 'CI228', 
              roomName: 'NM Radioactive Waste Decay Room', 
              nsf: 120, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'RAD-PET-CT',
          name: 'PET/CT Scanner Room',
          calculate: (inputs) => {
            if (!inputs.has_pet_ct) return [];
            return [{ 
              roomCode: 'CI242', 
              roomName: 'Class 1 PET/CT Scanning Room', 
              nsf: 600, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'RAD-PET-CONTROL',
          name: 'PET/CT Control Room',
          calculate: (inputs) => {
            if (!inputs.has_pet_ct) return [];
            return [{ 
              roomCode: 'CI243', 
              roomName: 'Class 1 PET/CT Control Room', 
              nsf: 210, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'RAD-PET-UPTAKE',
          name: 'PET/CT Uptake Room',
          calculate: (inputs) => {
            if (!inputs.has_pet_ct) return [];
            return [{ 
              roomCode: 'CI256', 
              roomName: 'PET/CT Uptake Room', 
              nsf: 145, 
              quantity: 2 
            }];
          }
        }
      ]
    },

    {
      id: 'FA6',
      name: 'Interventional Radiology',
      rooms: [
        {
          id: 'RAD-IR-SUITE',
          name: 'Interventional Radiology Suite',
          calculate: (inputs) => {
            if (!inputs.has_interventional) return [];
            return [{ 
              roomCode: 'CI041', 
              roomName: 'Class 2 Multipurpose R/F Imaging Room', 
              nsf: 490, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'RAD-IR-CONTROL',
          name: 'Interventional Radiology Control Room',
          calculate: (inputs) => {
            if (!inputs.has_interventional) return [];
            return [{ 
              roomCode: 'CI042', 
              roomName: 'Class 2 Multipurpose R/F Control Room', 
              nsf: 110, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'RAD-IR-PREP',
          name: 'Interventional Radiology Prep / Recovery',
          calculate: (inputs) => {
            if (!inputs.has_interventional) return [];
            return [{ 
              roomCode: 'SB001', 
              roomName: 'Gowned Imaging Patient Waiting', 
              nsf: 60, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'RAD-IR-SCRUB',
          name: 'Interventional Radiology Scrub Alcove',
          calculate: (inputs) => {
            if (!inputs.has_interventional) return [];
            return [{ 
              roomCode: 'CI521', 
              roomName: 'Lead Apron Alcove', 
              nsf: 15, 
              quantity: 1 
            }];
          }
        }
      ]
    },

    {
      id: 'FA7',
      name: 'Patient Support Area',
      rooms: [
        {
          id: 'RAD-DRESSING',
          name: 'Patient Dressing Room',
          calculate: (inputs) => {
            const totalRooms = CHAPTER_228.getTotalProcedureRooms(inputs);
            const quantity = Math.max(2, Math.ceil(totalRooms * 0.5));
            return [{ 
              roomCode: 'SB138', 
              roomName: 'Patient Dressing Room', 
              nsf: 60, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'RAD-HOLDING',
          name: 'Patient Holding / Pre-Procedure',
          calculate: (inputs) => {
            const procedures = inputs.annual_procedures;
            const quantity = procedures >= 100 ? 3 : 2;
            return [{ 
              roomCode: 'SB001', 
              roomName: 'Gowned Imaging Patient Waiting', 
              nsf: 60, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'RAD-STRETCHER',
          name: 'Stretcher / Wheelchair Alcove',
          calculate: (inputs) => {
            const totalRooms = CHAPTER_228.getTotalProcedureRooms(inputs);
            const nsf = totalRooms >= 10 ? 120 : 80;
            return [{ 
              roomCode: 'CI301', 
              roomName: 'Equipment Storage Room', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'RAD-TOILET-PATIENT',
          name: 'Patient Toilet',
          calculate: (inputs) => [{ 
            roomCode: 'SB191', 
            roomName: 'Radiology Patient Toilet', 
            nsf: 60, 
            quantity: 2 
          }]
        }
      ]
    },

    {
      id: 'FA8',
      name: 'Clinical Support Area',
      rooms: [
        {
          id: 'RAD-FILM-READING',
          name: 'Film Reading / Reporting Room',
          calculate: (inputs) => {
            const procedures = inputs.annual_procedures;
            const nsf = procedures >= 100 ? 200 : 150;
            return [{ 
              roomCode: 'CI401', 
              roomName: 'Imaging Physician Reading Room', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'RAD-PACS',
          name: 'PACS Computer / Server Room',
          calculate: (inputs) => {
            const procedures = inputs.annual_procedures;
            return procedures >= 50 ? [{ 
              roomCode: 'CI403', 
              roomName: 'PACS Digital Quality Control Workroom', 
              nsf: 150, 
              quantity: 1 
            }] : [];
          }
        },
        {
          id: 'RAD-DICTATION',
          name: 'Radiologist Dictation Booth',
          calculate: (inputs) => {
            const procedures = inputs.annual_procedures;
            const quantity = procedures >= 100 ? 3 : 2;
            return [{ 
              roomCode: 'CI405', 
              roomName: 'PACS 3D Workstation', 
              nsf: 56, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'RAD-CONTRAST',
          name: 'Contrast Media Preparation / Storage',
          calculate: (inputs) => [{ 
            roomCode: 'CI531', 
            roomName: 'CT Medication Preparation', 
            nsf: 80, 
            quantity: 1 
          }]
        },
        {
          id: 'RAD-CLEAN-UTILITY',
          name: 'Radiology Clean Utility',
          calculate: (inputs) => [{ 
            roomCode: 'SB655', 
            roomName: 'Radiology Clean Utility', 
            nsf: 80, 
            quantity: 1 
          }]
        },
        {
          id: 'RAD-SOILED-UTILITY',
          name: 'Radiology Soiled Utility',
          calculate: (inputs) => [{ 
            roomCode: 'SB656', 
            roomName: 'Radiology Soiled Utility', 
            nsf: 80, 
            quantity: 1 
          }]
        },
        {
          id: 'RAD-CRASH-CART',
          name: 'Emergency / Crash Cart Alcove',
          calculate: (inputs) => [{ 
            roomCode: 'CI151', 
            roomName: 'Equipment Storage Room', 
            nsf: 80, 
            quantity: 1 
          }]
        }
      ]
    },

    {
      id: 'FA9',
      name: 'Administrative and Staff Area',
      rooms: [
        {
          id: 'RAD-CHIEF-OFFICE',
          name: 'Radiology Chief Office',
          calculate: (inputs) => [{ 
            roomCode: 'SS204', 
            roomName: 'Radiology Chief Office', 
            nsf: 120, 
            quantity: 1 
          }]
        },
        {
          id: 'RAD-RADIOLOGIST-OFFICE',
          name: 'Radiologist Office',
          calculate: (inputs) => {
            const procedures = inputs.annual_procedures;
            const quantity = procedures >= 100 ? 3 : 2;
            return [{ 
              roomCode: 'SS204', 
              roomName: 'Radiologist Office', 
              nsf: 120, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'RAD-SUPERVISOR-OFFICE',
          name: 'Radiology Supervisor Office',
          calculate: (inputs) => [{ 
            roomCode: 'SS204', 
            roomName: 'Radiology Supervisor Office', 
            nsf: 100, 
            quantity: 1 
          }]
        },
        {
          id: 'RAD-TECH-WORKSTATION',
          name: 'Technologist Workstation',
          calculate: (inputs) => {
            const totalRooms = CHAPTER_228.getTotalProcedureRooms(inputs);
            const quantity = Math.ceil(totalRooms / 3);
            return [{ 
              roomCode: 'SS218', 
              roomName: 'Technologist Workstation', 
              nsf: 56, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'RAD-STAFF-LOUNGE',
          name: 'Radiology Staff Lounge',
          calculate: (inputs) => {
            const procedures = inputs.annual_procedures;
            const nsf = procedures >= 100 ? 150 : 120;
            return [{ 
              roomCode: 'SB152', 
              roomName: 'Radiology Staff Lounge', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'RAD-LOCKER',
          name: 'Radiology Staff Locker Room',
          calculate: (inputs) => {
            const procedures = inputs.annual_procedures;
            return procedures >= 80 ? [{ 
              roomCode: 'SB152', 
              roomName: 'Radiology Staff Locker Room', 
              nsf: 80, 
              quantity: 1 
            }] : [];
          }
        },
        {
          id: 'RAD-TOILET-STAFF',
          name: 'Radiology Staff Toilet',
          calculate: (inputs) => [{ 
            roomCode: 'SB191', 
            roomName: 'Radiology Staff Toilet', 
            nsf: 60, 
            quantity: 2 
          }]
        },
        {
          id: 'RAD-CONFERENCE',
          name: 'Radiology Conference Room',
          calculate: (inputs) => {
            const procedures = inputs.annual_procedures;
            const nsf = procedures >= 100 ? 240 : 180;
            return [{ 
              roomCode: 'SS101', 
              roomName: 'Radiology Conference Room', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        }
      ]
    },

    {
      id: 'FA10',
      name: 'Support Area',
      rooms: [
        {
          id: 'RAD-STORAGE-GENERAL',
          name: 'Radiology General Storage',
          calculate: (inputs) => {
            const totalRooms = CHAPTER_228.getTotalProcedureRooms(inputs);
            const nsf = totalRooms >= 10 ? 150 : 100;
            return [{ 
              roomCode: 'SB745', 
              roomName: 'Radiology General Storage', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'RAD-STORAGE-EQUIPMENT',
          name: 'Radiology Equipment Storage',
          calculate: (inputs) => {
            const totalRooms = CHAPTER_228.getTotalProcedureRooms(inputs);
            return totalRooms >= 8 ? [{ 
              roomCode: 'SB745', 
              roomName: 'Radiology Equipment Storage', 
              nsf: 120, 
              quantity: 1 
            }] : [];
          }
        },
        {
          id: 'RAD-LINEN',
          name: 'Radiology Linen Storage',
          calculate: (inputs) => [{ 
            roomCode: 'SB745', 
            roomName: 'Radiology Linen Storage', 
            nsf: 60, 
            quantity: 1 
          }]
        },
        {
          id: 'RAD-JANITOR',
          name: 'Radiology Janitor Closet',
          calculate: (inputs) => [{ 
            roomCode: 'SB773', 
            roomName: 'Radiology Janitor Closet', 
            nsf: 60, 
            quantity: 1 
          }]
        }
      ]
    }
  ]
};
