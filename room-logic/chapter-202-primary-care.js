// Chapter 202: Ambulatory Care - Primary Care Clinic
// Based on VA PG-18-9 Space Planning Criteria
// NTDG Factor: 1.35

export const CHAPTER_202 = {
  id: '202',
  name: 'Ambulatory Care - Primary Care Clinic',
  status: '⚠️ NOTE: VA Chapter 202 was DELETED and merged into Mental Health Clinic Chapter 260. This logic represents legacy Primary Care planning.',
  ntdgFactor: 1.35,
  
  inputs: [
    {
      id: 'annual_clinic_stops',
      label: 'Annual Primary Care Clinic Stops (Stop Code 323)',
      type: 'number',
      min: 2400,
      max: 40000,
      default: 8000,
      required: true
    },
    {
      id: 'provider_fte',
      label: 'How many Primary Care Provider FTE positions are authorized?',
      type: 'number',
      min: 2,
      max: 30,
      default: 6,
      required: true
    },
    {
      id: 'has_womens_health',
      label: 'Is Women\'s Health Clinic co-located?',
      type: 'checkbox',
      default: false
    }
  ],

  // Helper function to calculate number of exam rooms
  calculateExamRooms(inputs) {
    const stops = inputs.annual_clinic_stops;
    if (stops >= 2400 && stops <= 8000) return 4;
    if (stops >= 8001 && stops <= 12000) return 6;
    if (stops >= 12001 && stops <= 16000) return 8;
    if (stops >= 16001 && stops <= 20000) return 10;
    if (stops >= 20001 && stops <= 24000) return 12;
    if (stops >= 24001 && stops <= 28000) return 14;
    if (stops >= 28001 && stops <= 32000) return 16;
    if (stops >= 32001 && stops <= 36000) return 18;
    if (stops >= 36001 && stops <= 40000) return 20;
    return 4;
  },

  // Helper function to calculate waiting area size
  calculateWaitingNSF(inputs) {
    const examRooms = CHAPTER_202.calculateExamRooms(inputs);
    if (examRooms <= 4) return 120;
    if (examRooms <= 6) return 180;
    if (examRooms <= 8) return 240;
    if (examRooms <= 10) return 300;
    if (examRooms <= 12) return 360;
    if (examRooms <= 14) return 420;
    if (examRooms <= 16) return 480;
    if (examRooms <= 18) return 540;
    return 600;
  },

  functionalAreas: [
    {
      id: 'FA1',
      name: 'Reception Area',
      rooms: [
        {
          id: 'PC-WAIT',
          name: 'Primary Care Waiting',
          calculate: (inputs) => {
            const nsf = CHAPTER_202.calculateWaitingNSF(inputs);
            return [{ 
              roomCode: 'SB003', 
              roomName: 'Primary Care Waiting', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'PC-RECEPTION',
          name: 'Primary Care Reception / Intake',
          calculate: (inputs) => {
            const examRooms = CHAPTER_202.calculateExamRooms(inputs);
            const quantity = Math.ceil(examRooms / 6);
            return [{ 
              roomCode: 'SS218', 
              roomName: 'Primary Care Reception Workstation', 
              nsf: 56, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'PC-TOILET-PUBLIC',
          name: 'Primary Care Public Toilet',
          calculate: (inputs) => [{ 
            roomCode: 'SB191', 
            roomName: 'Primary Care Public Toilet', 
            nsf: 60, 
            quantity: 2 
          }]
        }
      ]
    },

    {
      id: 'FA2',
      name: 'Examination and Treatment Area',
      rooms: [
        {
          id: 'PC-EXAM',
          name: 'Primary Care Examination Room',
          calculate: (inputs) => {
            const quantity = CHAPTER_202.calculateExamRooms(inputs);
            return [{ 
              roomCode: 'SE101', 
              roomName: 'Primary Care Examination Room', 
              nsf: 120, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'PC-EXAM-BARIATRIC',
          name: 'Primary Care Examination Room, Bariatric',
          calculate: (inputs) => {
            const examRooms = CHAPTER_202.calculateExamRooms(inputs);
            const quantity = examRooms >= 8 ? 1 : 0;
            return quantity > 0 ? [{ 
              roomCode: 'SE102', 
              roomName: 'Primary Care Examination Room, Bariatric', 
              nsf: 150, 
              quantity: quantity 
            }] : [];
          }
        },
        {
          id: 'PC-PROCEDURE',
          name: 'Primary Care Procedure Room',
          calculate: (inputs) => {
            const examRooms = CHAPTER_202.calculateExamRooms(inputs);
            const quantity = examRooms >= 6 ? 1 : 0;
            return quantity > 0 ? [{ 
              roomCode: 'SE201', 
              roomName: 'Primary Care Procedure Room', 
              nsf: 150, 
              quantity: quantity 
            }] : [];
          }
        },
        {
          id: 'PC-CONSULT',
          name: 'Primary Care Consultation Room',
          calculate: (inputs) => [{ 
            roomCode: 'SE116', 
            roomName: 'Primary Care Consultation Room', 
            nsf: 120, 
            quantity: 1 
          }]
        },
        {
          id: 'PC-VITAL-SIGNS',
          name: 'Primary Care Vital Signs Alcove',
          calculate: (inputs) => {
            const examRooms = CHAPTER_202.calculateExamRooms(inputs);
            const quantity = Math.ceil(examRooms / 8);
            return [{ 
              roomCode: 'SE159', 
              roomName: 'Primary Care Vital Signs Alcove', 
              nsf: 40, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'PC-WOMENS-EXAM',
          name: 'Women\'s Health Examination Room',
          calculate: (inputs) => {
            return inputs.has_womens_health ? [{ 
              roomCode: 'SE110', 
              roomName: 'Women\'s Health Examination Room', 
              nsf: 120, 
              quantity: 2 
            }] : [];
          }
        }
      ]
    },

    {
      id: 'FA3',
      name: 'Clinical Support Area',
      rooms: [
        {
          id: 'PC-CLEAN-UTILITY',
          name: 'Primary Care Clean Utility Room',
          calculate: (inputs) => [{ 
            roomCode: 'SB655', 
            roomName: 'Primary Care Clean Utility Room', 
            nsf: 80, 
            quantity: 1 
          }]
        },
        {
          id: 'PC-SOILED-UTILITY',
          name: 'Primary Care Soiled Utility Room',
          calculate: (inputs) => [{ 
            roomCode: 'SB656', 
            roomName: 'Primary Care Soiled Utility Room', 
            nsf: 80, 
            quantity: 1 
          }]
        },
        {
          id: 'PC-MED-PREP',
          name: 'Primary Care Medication Prep / Clean-up Alcove',
          calculate: (inputs) => {
            const examRooms = CHAPTER_202.calculateExamRooms(inputs);
            const quantity = Math.ceil(examRooms / 10);
            return [{ 
              roomCode: 'SE166', 
              roomName: 'Primary Care Medication Prep Alcove', 
              nsf: 40, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'PC-NURSE-STATION',
          name: 'Primary Care Nurse Station',
          calculate: (inputs) => {
            const examRooms = CHAPTER_202.calculateExamRooms(inputs);
            const quantity = Math.ceil(examRooms / 12);
            return [{ 
              roomCode: 'SS217', 
              roomName: 'Primary Care Nurse Station', 
              nsf: 120, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'PC-NOURISHMENT',
          name: 'Primary Care Nourishment Station',
          calculate: (inputs) => {
            const examRooms = CHAPTER_202.calculateExamRooms(inputs);
            return examRooms >= 10 ? [{ 
              roomCode: 'SB657', 
              roomName: 'Primary Care Nourishment Station', 
              nsf: 60, 
              quantity: 1 
            }] : [];
          }
        }
      ]
    },

    {
      id: 'FA4',
      name: 'Staff and Administrative Area',
      rooms: [
        {
          id: 'PC-CHIEF-OFFICE',
          name: 'Primary Care Chief Office',
          calculate: (inputs) => [{ 
            roomCode: 'SS204', 
            roomName: 'Primary Care Chief Office', 
            nsf: 120, 
            quantity: 1 
          }]
        },
        {
          id: 'PC-PROVIDER-OFFICE',
          name: 'Primary Care Provider Office',
          calculate: (inputs) => {
            const providers = inputs.provider_fte;
            const quantity = Math.max(1, Math.ceil(providers * 0.5));
            return [{ 
              roomCode: 'SS204', 
              roomName: 'Primary Care Provider Office', 
              nsf: 120, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'PC-PROVIDER-WORKROOM',
          name: 'Primary Care Provider Workroom',
          calculate: (inputs) => {
            const examRooms = CHAPTER_202.calculateExamRooms(inputs);
            const nsf = examRooms <= 8 ? 120 : 180;
            return [{ 
              roomCode: 'SS111', 
              roomName: 'Primary Care Provider Workroom', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'PC-NURSE-MANAGER',
          name: 'Primary Care Nurse Manager Office',
          calculate: (inputs) => [{ 
            roomCode: 'SS204', 
            roomName: 'Primary Care Nurse Manager Office', 
            nsf: 100, 
            quantity: 1 
          }]
        },
        {
          id: 'PC-ADMIN-WORKSTATION',
          name: 'Primary Care Administrative Workstation',
          calculate: (inputs) => {
            const examRooms = CHAPTER_202.calculateExamRooms(inputs);
            const quantity = Math.ceil(examRooms / 8);
            return [{ 
              roomCode: 'SS218', 
              roomName: 'Primary Care Admin Workstation', 
              nsf: 56, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'PC-CONFERENCE',
          name: 'Primary Care Conference Room',
          calculate: (inputs) => {
            const providers = inputs.provider_fte;
            const nsf = providers <= 10 ? 180 : 240;
            return [{ 
              roomCode: 'SS101', 
              roomName: 'Primary Care Conference Room', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'PC-STAFF-LOUNGE',
          name: 'Primary Care Staff Lounge',
          calculate: (inputs) => {
            const examRooms = CHAPTER_202.calculateExamRooms(inputs);
            return examRooms >= 8 ? [{ 
              roomCode: 'SB152', 
              roomName: 'Primary Care Staff Lounge', 
              nsf: 120, 
              quantity: 1 
            }] : [];
          }
        },
        {
          id: 'PC-STAFF-TOILET',
          name: 'Primary Care Staff Toilet',
          calculate: (inputs) => [{ 
            roomCode: 'SB191', 
            roomName: 'Primary Care Staff Toilet', 
            nsf: 60, 
            quantity: 1 
          }]
        }
      ]
    },

    {
      id: 'FA5',
      name: 'Support Area',
      rooms: [
        {
          id: 'PC-STORAGE-GENERAL',
          name: 'Primary Care General Storage',
          calculate: (inputs) => {
            const examRooms = CHAPTER_202.calculateExamRooms(inputs);
            const nsf = examRooms <= 6 ? 80 : (examRooms <= 12 ? 120 : 160);
            return [{ 
              roomCode: 'SB773', 
              roomName: 'Primary Care General Storage', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'PC-STORAGE-EQUIPMENT',
          name: 'Primary Care Equipment Storage',
          calculate: (inputs) => {
            const examRooms = CHAPTER_202.calculateExamRooms(inputs);
            return examRooms >= 10 ? [{ 
              roomCode: 'SB745', 
              roomName: 'Primary Care Equipment Storage', 
              nsf: 80, 
              quantity: 1 
            }] : [];
          }
        },
        {
          id: 'PC-JANITOR-CLOSET',
          name: 'Primary Care Janitor Closet',
          calculate: (inputs) => [{ 
            roomCode: 'SB773', 
            roomName: 'Primary Care Janitor Closet', 
            nsf: 60, 
            quantity: 1 
          }]
        }
      ]
    }
  ]
};
