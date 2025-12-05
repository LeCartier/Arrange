// Chapter 216: Ambulatory Surgery Service
// Based on VA PG-18-9 Space Planning Criteria
// NTDG Factor: 1.35

export const CHAPTER_216 = {
  id: '216',
  name: 'Ambulatory Surgery Service',
  ntdgFactor: 1.35,
  
  inputs: [
    {
      id: 'annual_cases',
      label: 'Annual Ambulatory Surgery Cases',
      type: 'number',
      min: 500,
      max: 5000,
      default: 1500,
      required: true
    },
    {
      id: 'num_or_rooms',
      label: 'How many Operating Rooms?',
      type: 'number',
      min: 2,
      max: 8,
      default: 3,
      required: true
    },
    {
      id: 'has_endoscopy',
      label: 'Provide Endoscopy (GI) Services?',
      type: 'checkbox',
      default: true
    },
    {
      id: 'num_endo_rooms',
      label: 'How many Endoscopy Procedure Rooms?',
      type: 'number',
      min: 1,
      max: 4,
      default: 2,
      required: false,
      dependsOn: 'has_endoscopy'
    },
    {
      id: 'has_cystoscopy',
      label: 'Provide Cystoscopy (Urology) Services?',
      type: 'checkbox',
      default: true
    },
    {
      id: 'has_ophthalmology',
      label: 'Provide Ophthalmology (Eye) Surgery?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'has_podiatry',
      label: 'Provide Podiatry (Foot) Surgery?',
      type: 'checkbox',
      default: false
    }
  ],

  // Helper function to calculate total procedure rooms
  getTotalProcedureRooms(inputs) {
    let total = inputs.num_or_rooms || 3;
    if (inputs.has_endoscopy) total += (inputs.num_endo_rooms || 2);
    if (inputs.has_cystoscopy) total += 1;
    if (inputs.has_ophthalmology) total += 1;
    if (inputs.has_podiatry) total += 1;
    return total;
  },

  // Helper function to calculate pre-op bays
  calculatePreOpBays(inputs) {
    const totalRooms = CHAPTER_216.getTotalProcedureRooms(inputs);
    return Math.max(4, totalRooms * 2);
  },

  // Helper function to calculate PACU bays
  calculatePACUBays(inputs) {
    const totalRooms = CHAPTER_216.getTotalProcedureRooms(inputs);
    return Math.max(4, Math.ceil(totalRooms * 1.5));
  },

  // Helper function to calculate waiting area
  calculateWaitingNSF(inputs) {
    const cases = inputs.annual_cases;
    if (cases <= 1000) return 300;
    if (cases <= 2000) return 400;
    if (cases <= 3000) return 500;
    if (cases <= 4000) return 600;
    return 700;
  },

  functionalAreas: [
    {
      id: 'FA1',
      name: 'Reception and Waiting Area',
      rooms: [
        {
          id: 'ASU-WAIT',
          name: 'Ambulatory Surgery Waiting Area',
          calculate: (inputs) => {
            const nsf = CHAPTER_216.calculateWaitingNSF(inputs);
            return [{ 
              roomCode: 'SB003', 
              roomName: 'Ambulatory Surgery Waiting', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ASU-FAMILY-WAIT',
          name: 'Family Waiting / Consultation',
          calculate: (inputs) => {
            const cases = inputs.annual_cases;
            const nsf = cases >= 2500 ? 300 : 200;
            return [{ 
              roomCode: 'SB003', 
              roomName: 'Family Waiting Area', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ASU-RECEPTION',
          name: 'Ambulatory Surgery Reception / Registration',
          calculate: (inputs) => {
            const cases = inputs.annual_cases;
            const quantity = cases >= 2500 ? 2 : 1;
            return [{ 
              roomCode: 'SS218', 
              roomName: 'Ambulatory Surgery Reception', 
              nsf: 56, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'ASU-TOILET-PUBLIC',
          name: 'Ambulatory Surgery Public Toilet',
          calculate: (inputs) => [{ 
            roomCode: 'SB191', 
            roomName: 'Ambulatory Surgery Public Toilet', 
            nsf: 60, 
            quantity: 2 
          }]
        }
      ]
    },

    {
      id: 'FA2',
      name: 'Pre-Operative Area',
      rooms: [
        {
          id: 'ASU-PREOP-BAY',
          name: 'Pre-Op Patient Bay',
          calculate: (inputs) => {
            const quantity = CHAPTER_216.calculatePreOpBays(inputs);
            return [{ 
              roomCode: 'SE501', 
              roomName: 'Pre-Op Patient Bay', 
              nsf: 100, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'ASU-PREOP-NURSE',
          name: 'Pre-Op Nurse Station',
          calculate: (inputs) => {
            const bays = CHAPTER_216.calculatePreOpBays(inputs);
            const quantity = Math.ceil(bays / 8);
            return [{ 
              roomCode: 'SS217', 
              roomName: 'Pre-Op Nurse Station', 
              nsf: 120, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'ASU-PREOP-INTERVIEW',
          name: 'Pre-Op Anesthesia Interview Room',
          calculate: (inputs) => {
            const orRooms = inputs.num_or_rooms;
            const quantity = orRooms >= 5 ? 2 : 1;
            return [{ 
              roomCode: 'SE116', 
              roomName: 'Anesthesia Interview Room', 
              nsf: 100, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'ASU-PREOP-TOILET',
          name: 'Pre-Op Patient Toilet',
          calculate: (inputs) => {
            const bays = CHAPTER_216.calculatePreOpBays(inputs);
            const quantity = Math.ceil(bays / 4);
            return [{ 
              roomCode: 'SB191', 
              roomName: 'Pre-Op Patient Toilet', 
              nsf: 60, 
              quantity: quantity 
            }];
          }
        }
      ]
    },

    {
      id: 'FA3',
      name: 'Operating Room Suite',
      rooms: [
        {
          id: 'ASU-OR',
          name: 'Operating Room',
          calculate: (inputs) => {
            const quantity = inputs.num_or_rooms || 3;
            return [{ 
              roomCode: 'SE502', 
              roomName: 'Operating Room', 
              nsf: 400, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'ASU-SCRUB',
          name: 'Scrub / Prep Alcove',
          calculate: (inputs) => {
            const quantity = inputs.num_or_rooms || 3;
            return [{ 
              roomCode: 'SE503', 
              roomName: 'Scrub Alcove', 
              nsf: 50, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'ASU-OR-CONTROL',
          name: 'OR Control / Scheduling Desk',
          calculate: (inputs) => [{ 
            roomCode: 'SS217', 
            roomName: 'OR Control Desk', 
            nsf: 100, 
            quantity: 1 
          }]
        },
        {
          id: 'ASU-SUBSTERILE',
          name: 'Sub-Sterile Room',
          calculate: (inputs) => {
            const orRooms = inputs.num_or_rooms || 3;
            const quantity = Math.ceil(orRooms / 2);
            return [{ 
              roomCode: 'SE504', 
              roomName: 'Sub-Sterile Room', 
              nsf: 80, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'ASU-ANESTHESIA-WORK',
          name: 'Anesthesia Workroom',
          calculate: (inputs) => [{ 
            roomCode: 'SE505', 
            roomName: 'Anesthesia Workroom', 
            nsf: 150, 
            quantity: 1 
          }]
        },
        {
          id: 'ASU-ANESTHESIA-STORAGE',
          name: 'Anesthesia Storage',
          calculate: (inputs) => [{ 
            roomCode: 'SB745', 
            roomName: 'Anesthesia Storage', 
            nsf: 100, 
            quantity: 1 
          }]
        }
      ]
    },

    {
      id: 'FA4',
      name: 'Endoscopy Suite',
      rooms: [
        {
          id: 'ASU-ENDO',
          name: 'Endoscopy Procedure Room',
          calculate: (inputs) => {
            if (!inputs.has_endoscopy) return [];
            const quantity = inputs.num_endo_rooms || 2;
            return [{ 
              roomCode: 'SE506', 
              roomName: 'Endoscopy Procedure Room', 
              nsf: 300, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'ASU-ENDO-CLEAN',
          name: 'Endoscopy Equipment Cleaning / Disinfection',
          calculate: (inputs) => {
            if (!inputs.has_endoscopy) return [];
            return [{ 
              roomCode: 'SE507', 
              roomName: 'Endoscopy Equipment Cleaning', 
              nsf: 150, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ASU-ENDO-STORAGE',
          name: 'Endoscopy Equipment Storage',
          calculate: (inputs) => {
            if (!inputs.has_endoscopy) return [];
            return [{ 
              roomCode: 'SB745', 
              roomName: 'Endoscopy Equipment Storage', 
              nsf: 100, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ASU-CYSTO',
          name: 'Cystoscopy Procedure Room',
          calculate: (inputs) => {
            if (!inputs.has_cystoscopy) return [];
            return [{ 
              roomCode: 'SE508', 
              roomName: 'Cystoscopy Procedure Room', 
              nsf: 250, 
              quantity: 1 
            }];
          }
        }
      ]
    },

    {
      id: 'FA5',
      name: 'Specialty Procedure Rooms',
      rooms: [
        {
          id: 'ASU-OPHTHAL',
          name: 'Ophthalmology Procedure Room',
          calculate: (inputs) => {
            if (!inputs.has_ophthalmology) return [];
            return [{ 
              roomCode: 'SE509', 
              roomName: 'Ophthalmology Procedure Room', 
              nsf: 300, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ASU-OPHTHAL-PREP',
          name: 'Ophthalmology Pre-Op Area',
          calculate: (inputs) => {
            if (!inputs.has_ophthalmology) return [];
            return [{ 
              roomCode: 'SE510', 
              roomName: 'Ophthalmology Pre-Op', 
              nsf: 100, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ASU-PODIATRY',
          name: 'Podiatry Procedure Room',
          calculate: (inputs) => {
            if (!inputs.has_podiatry) return [];
            return [{ 
              roomCode: 'SE511', 
              roomName: 'Podiatry Procedure Room', 
              nsf: 250, 
              quantity: 1 
            }];
          }
        }
      ]
    },

    {
      id: 'FA6',
      name: 'Post-Anesthesia Care Unit (PACU)',
      rooms: [
        {
          id: 'ASU-PACU-BAY',
          name: 'PACU Patient Bay',
          calculate: (inputs) => {
            const quantity = CHAPTER_216.calculatePACUBays(inputs);
            return [{ 
              roomCode: 'SE512', 
              roomName: 'PACU Patient Bay', 
              nsf: 120, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'ASU-PACU-ISOLATION',
          name: 'PACU Isolation Bay',
          calculate: (inputs) => [{ 
            roomCode: 'SE513', 
            roomName: 'PACU Isolation Bay', 
            nsf: 150, 
            quantity: 1 
          }]
        },
        {
          id: 'ASU-PACU-NURSE',
          name: 'PACU Nurse Station',
          calculate: (inputs) => {
            const bays = CHAPTER_216.calculatePACUBays(inputs);
            const quantity = Math.ceil(bays / 8);
            return [{ 
              roomCode: 'SS217', 
              roomName: 'PACU Nurse Station', 
              nsf: 120, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'ASU-PACU-NOURISHMENT',
          name: 'PACU Nourishment Station',
          calculate: (inputs) => [{ 
            roomCode: 'SB657', 
            roomName: 'PACU Nourishment Station', 
            nsf: 60, 
            quantity: 1 
          }]
        },
        {
          id: 'ASU-PACU-TOILET',
          name: 'PACU Patient Toilet',
          calculate: (inputs) => [{ 
            roomCode: 'SB191', 
            roomName: 'PACU Patient Toilet', 
            nsf: 60, 
            quantity: 2 
          }]
        }
      ]
    },

    {
      id: 'FA7',
      name: 'Phase II Recovery / Discharge',
      rooms: [
        {
          id: 'ASU-PHASE2-BAY',
          name: 'Phase II Recovery Bay / Recliner',
          calculate: (inputs) => {
            const pacuBays = CHAPTER_216.calculatePACUBays(inputs);
            const quantity = Math.ceil(pacuBays * 0.75);
            return [{ 
              roomCode: 'SE514', 
              roomName: 'Phase II Recovery Bay', 
              nsf: 80, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'ASU-DISCHARGE-NURSE',
          name: 'Discharge Nurse Station',
          calculate: (inputs) => [{ 
            roomCode: 'SS218', 
            roomName: 'Discharge Nurse Station', 
            nsf: 56, 
            quantity: 1 
          }]
        },
        {
          id: 'ASU-DISCHARGE-TOILET',
          name: 'Discharge Area Toilet',
          calculate: (inputs) => [{ 
            roomCode: 'SB191', 
            roomName: 'Discharge Toilet', 
            nsf: 60, 
            quantity: 2 
          }]
        }
      ]
    },

    {
      id: 'FA8',
      name: 'Sterile Processing and Supply',
      rooms: [
        {
          id: 'ASU-STERILE-CORE',
          name: 'Sterile Supply / Core Storage',
          calculate: (inputs) => {
            const orRooms = inputs.num_or_rooms || 3;
            const nsf = orRooms >= 5 ? 300 : 200;
            return [{ 
              roomCode: 'SE515', 
              roomName: 'Sterile Supply Core', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ASU-CLEAN-UTILITY',
          name: 'Clean Utility Room',
          calculate: (inputs) => {
            const totalRooms = CHAPTER_216.getTotalProcedureRooms(inputs);
            const quantity = Math.ceil(totalRooms / 5);
            return [{ 
              roomCode: 'SB655', 
              roomName: 'Clean Utility Room', 
              nsf: 80, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'ASU-SOILED-UTILITY',
          name: 'Soiled Utility Room',
          calculate: (inputs) => {
            const totalRooms = CHAPTER_216.getTotalProcedureRooms(inputs);
            const quantity = Math.ceil(totalRooms / 5);
            return [{ 
              roomCode: 'SB656', 
              roomName: 'Soiled Utility Room', 
              nsf: 80, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'ASU-DECONTAM',
          name: 'Decontamination Room',
          calculate: (inputs) => {
            const totalRooms = CHAPTER_216.getTotalProcedureRooms(inputs);
            return totalRooms >= 6 ? [{ 
              roomCode: 'SE516', 
              roomName: 'Decontamination Room', 
              nsf: 120, 
              quantity: 1 
            }] : [];
          }
        },
        {
          id: 'ASU-CART-HOLD',
          name: 'Case Cart Holding / Staging',
          calculate: (inputs) => {
            const orRooms = inputs.num_or_rooms || 3;
            const nsf = orRooms >= 5 ? 200 : 150;
            return [{ 
              roomCode: 'SE517', 
              roomName: 'Case Cart Holding', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        }
      ]
    },

    {
      id: 'FA9',
      name: 'Clinical Support Area',
      rooms: [
        {
          id: 'ASU-LAB-ALCOVE',
          name: 'Laboratory Draw / Point of Care',
          calculate: (inputs) => [{ 
            roomCode: 'SE159', 
            roomName: 'Lab Draw Alcove', 
            nsf: 60, 
            quantity: 1 
          }]
        },
        {
          id: 'ASU-MEDICATION',
          name: 'Medication Room',
          calculate: (inputs) => [{ 
            roomCode: 'SE166', 
            roomName: 'Medication Room', 
            nsf: 100, 
            quantity: 1 
          }]
        },
        {
          id: 'ASU-BLOOD-WARMER',
          name: 'Blood Warmer / Refrigerator',
          calculate: (inputs) => [{ 
            roomCode: 'SE518', 
            roomName: 'Blood Warmer Alcove', 
            nsf: 40, 
            quantity: 1 
          }]
        },
        {
          id: 'ASU-CRASH-CART',
          name: 'Emergency / Crash Cart Alcove',
          calculate: (inputs) => {
            const totalRooms = CHAPTER_216.getTotalProcedureRooms(inputs);
            const quantity = Math.ceil(totalRooms / 4);
            return [{ 
              roomCode: 'SE335', 
              roomName: 'Crash Cart Alcove', 
              nsf: 40, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'ASU-STRETCHER',
          name: 'Stretcher / Wheelchair Alcove',
          calculate: (inputs) => {
            const totalRooms = CHAPTER_216.getTotalProcedureRooms(inputs);
            const nsf = totalRooms >= 6 ? 120 : 80;
            return [{ 
              roomCode: 'SE330', 
              roomName: 'Stretcher Alcove', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        }
      ]
    },

    {
      id: 'FA10',
      name: 'Staff Support Area',
      rooms: [
        {
          id: 'ASU-LOCKER-MALE',
          name: 'Male Staff Locker / Changing Room',
          calculate: (inputs) => {
            const orRooms = inputs.num_or_rooms || 3;
            const nsf = orRooms >= 5 ? 150 : 100;
            return [{ 
              roomCode: 'SB152', 
              roomName: 'Male Staff Locker Room', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ASU-LOCKER-FEMALE',
          name: 'Female Staff Locker / Changing Room',
          calculate: (inputs) => {
            const orRooms = inputs.num_or_rooms || 3;
            const nsf = orRooms >= 5 ? 150 : 100;
            return [{ 
              roomCode: 'SB152', 
              roomName: 'Female Staff Locker Room', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ASU-TOILET-STAFF',
          name: 'Staff Toilet / Shower',
          calculate: (inputs) => [{ 
            roomCode: 'SB191', 
            roomName: 'Staff Toilet', 
            nsf: 60, 
            quantity: 2 
          }]
        },
        {
          id: 'ASU-STAFF-LOUNGE',
          name: 'Staff Lounge / Break Room',
          calculate: (inputs) => {
            const orRooms = inputs.num_or_rooms || 3;
            const nsf = orRooms >= 5 ? 180 : 120;
            return [{ 
              roomCode: 'SB152', 
              roomName: 'Staff Lounge', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ASU-PHYSICIAN-LOUNGE',
          name: 'Physician / Surgeon Lounge',
          calculate: (inputs) => {
            const orRooms = inputs.num_or_rooms || 3;
            return orRooms >= 4 ? [{ 
              roomCode: 'SB152', 
              roomName: 'Physician Lounge', 
              nsf: 150, 
              quantity: 1 
            }] : [];
          }
        },
        {
          id: 'ASU-SLEEP-CALL',
          name: 'Sleep / On-Call Room',
          calculate: (inputs) => {
            const cases = inputs.annual_cases;
            return cases >= 2500 ? [{ 
              roomCode: 'SB152', 
              roomName: 'On-Call Sleep Room', 
              nsf: 100, 
              quantity: 1 
            }] : [];
          }
        }
      ]
    },

    {
      id: 'FA11',
      name: 'Administrative Area',
      rooms: [
        {
          id: 'ASU-MANAGER-OFFICE',
          name: 'Ambulatory Surgery Manager Office',
          calculate: (inputs) => [{ 
            roomCode: 'SS204', 
            roomName: 'Ambulatory Surgery Manager Office', 
            nsf: 120, 
            quantity: 1 
          }]
        },
        {
          id: 'ASU-SUPERVISOR-OFFICE',
          name: 'Nurse Supervisor Office',
          calculate: (inputs) => {
            const orRooms = inputs.num_or_rooms || 3;
            const quantity = orRooms >= 5 ? 2 : 1;
            return [{ 
              roomCode: 'SS204', 
              roomName: 'Nurse Supervisor Office', 
              nsf: 100, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'ASU-WORKROOM',
          name: 'Staff Workroom / Charting',
          calculate: (inputs) => {
            const totalRooms = CHAPTER_216.getTotalProcedureRooms(inputs);
            const nsf = totalRooms >= 6 ? 150 : 120;
            return [{ 
              roomCode: 'SS111', 
              roomName: 'Staff Workroom', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ASU-CONFERENCE',
          name: 'Conference / Education Room',
          calculate: (inputs) => {
            const orRooms = inputs.num_or_rooms || 3;
            const nsf = orRooms >= 5 ? 240 : 180;
            return [{ 
              roomCode: 'SS101', 
              roomName: 'Conference Room', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        }
      ]
    },

    {
      id: 'FA12',
      name: 'Support and Storage Area',
      rooms: [
        {
          id: 'ASU-EQUIPMENT-STORAGE',
          name: 'Equipment Storage',
          calculate: (inputs) => {
            const totalRooms = CHAPTER_216.getTotalProcedureRooms(inputs);
            const nsf = totalRooms >= 6 ? 200 : 150;
            return [{ 
              roomCode: 'SB745', 
              roomName: 'Equipment Storage', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ASU-LINEN-CLEAN',
          name: 'Clean Linen Storage',
          calculate: (inputs) => {
            const orRooms = inputs.num_or_rooms || 3;
            const nsf = orRooms >= 5 ? 120 : 80;
            return [{ 
              roomCode: 'SB745', 
              roomName: 'Clean Linen Storage', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ASU-LINEN-SOILED',
          name: 'Soiled Linen Holding',
          calculate: (inputs) => [{ 
            roomCode: 'SB745', 
            roomName: 'Soiled Linen Holding', 
            nsf: 60, 
            quantity: 1 
          }]
        },
        {
          id: 'ASU-GENERAL-STORAGE',
          name: 'General Storage',
          calculate: (inputs) => {
            const totalRooms = CHAPTER_216.getTotalProcedureRooms(inputs);
            const nsf = totalRooms >= 6 ? 150 : 100;
            return [{ 
              roomCode: 'SB745', 
              roomName: 'General Storage', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ASU-JANITOR',
          name: 'Janitor Closet',
          calculate: (inputs) => {
            const totalRooms = CHAPTER_216.getTotalProcedureRooms(inputs);
            const quantity = Math.ceil(totalRooms / 5);
            return [{ 
              roomCode: 'SB773', 
              roomName: 'Janitor Closet', 
              nsf: 60, 
              quantity: quantity 
            }];
          }
        }
      ]
    }
  ]
};
