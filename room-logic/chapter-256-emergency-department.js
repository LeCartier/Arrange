// Chapter 256: Emergency Department
// Based on VA PG-18-9 Space Planning Criteria
// NTDG Factor: 1.35

export const CHAPTER_256 = {
  id: '256',
  name: 'Emergency Department',
  ntdgFactor: 1.35,
  
  inputs: [
    {
      id: 'annual_visits',
      label: 'Annual Emergency Department Visits',
      type: 'number',
      min: 10000,
      max: 100000,
      default: 35000,
      required: true
    },
    {
      id: 'trauma_level',
      label: 'Trauma Center Designation',
      type: 'select',
      options: [
        { value: 'none', label: 'No Trauma Designation' },
        { value: 'level3', label: 'Level III Trauma Center' },
        { value: 'level2', label: 'Level II Trauma Center' },
        { value: 'level1', label: 'Level I Trauma Center' }
      ],
      default: 'none',
      required: true
    },
    {
      id: 'has_behavioral_health',
      label: 'Provide Behavioral Health Emergency Services?',
      type: 'checkbox',
      default: true
    },
    {
      id: 'has_decontamination',
      label: 'Provide Decontamination Capability?',
      type: 'checkbox',
      default: true
    },
    {
      id: 'has_fast_track',
      label: 'Provide Fast Track / Minor Care?',
      type: 'checkbox',
      default: true
    },
    {
      id: 'has_observation',
      label: 'Provide Observation Unit?',
      type: 'checkbox',
      default: true
    }
  ],

  // Helper function to calculate treatment bays
  calculateTreatmentBays(inputs) {
    const visits = inputs.annual_visits;
    if (visits <= 15000) return 8;
    if (visits <= 25000) return 12;
    if (visits <= 35000) return 16;
    if (visits <= 50000) return 20;
    if (visits <= 70000) return 24;
    return 28;
  },

  // Helper function to calculate trauma bays
  calculateTraumaBays(inputs) {
    if (inputs.trauma_level === 'none') return 1;
    if (inputs.trauma_level === 'level3') return 2;
    if (inputs.trauma_level === 'level2') return 3;
    if (inputs.trauma_level === 'level1') return 4;
    return 1;
  },

  // Helper function to calculate waiting area
  calculateWaitingNSF(inputs) {
    const visits = inputs.annual_visits;
    if (visits <= 20000) return 400;
    if (visits <= 35000) return 600;
    if (visits <= 50000) return 800;
    if (visits <= 70000) return 1000;
    return 1200;
  },

  functionalAreas: [
    {
      id: 'FA1',
      name: 'Public Entrance and Waiting Area',
      rooms: [
        {
          id: 'ED-WAIT',
          name: 'Emergency Department Waiting Area',
          calculate: (inputs) => {
            const nsf = CHAPTER_256.calculateWaitingNSF(inputs);
            return [{ 
              roomCode: 'SB003', 
              roomName: 'ED Waiting Area', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ED-TRIAGE',
          name: 'Triage Station',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            const quantity = visits >= 50000 ? 2 : 1;
            return [{ 
              roomCode: 'SE601', 
              roomName: 'Triage Station', 
              nsf: 100, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'ED-REGISTRATION',
          name: 'ED Registration / Admitting',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            let quantity = 1;
            if (visits > 35000) quantity = 2;
            if (visits > 60000) quantity = 3;
            return [{ 
              roomCode: 'SS218', 
              roomName: 'ED Registration', 
              nsf: 56, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'ED-TOILET-PUBLIC',
          name: 'ED Public Toilet (Accessible)',
          calculate: (inputs) => [{ 
            roomCode: 'SB191', 
            roomName: 'ED Public Toilet', 
            nsf: 80, 
            quantity: 2 
          }]
        },
        {
          id: 'ED-SECURITY',
          name: 'Security Office / Station',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            const nsf = visits >= 50000 ? 120 : 80;
            return [{ 
              roomCode: 'SE602', 
              roomName: 'ED Security Office', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        }
      ]
    },

    {
      id: 'FA2',
      name: 'Ambulance Entrance and Decontamination',
      rooms: [
        {
          id: 'ED-AMBULANCE-BAY',
          name: 'Ambulance Bay / Canopy',
          calculate: (inputs) => {
            const traumaBays = CHAPTER_256.calculateTraumaBays(inputs);
            const nsf = traumaBays >= 3 ? 800 : 600;
            return [{ 
              roomCode: 'SE603', 
              roomName: 'Ambulance Bay', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ED-AMBULANCE-CONTROL',
          name: 'Ambulance Control / Radio Room',
          calculate: (inputs) => [{ 
            roomCode: 'SE604', 
            roomName: 'Ambulance Control', 
            nsf: 80, 
            quantity: 1 
          }]
        },
        {
          id: 'ED-DECON-OUTDOOR',
          name: 'Outdoor Decontamination Area',
          calculate: (inputs) => {
            if (!inputs.has_decontamination) return [];
            return [{ 
              roomCode: 'SE605', 
              roomName: 'Outdoor Decontamination', 
              nsf: 400, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ED-DECON-INDOOR',
          name: 'Indoor Decontamination Room',
          calculate: (inputs) => {
            if (!inputs.has_decontamination) return [];
            return [{ 
              roomCode: 'SE606', 
              roomName: 'Indoor Decontamination', 
              nsf: 300, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ED-DECON-EQUIPMENT',
          name: 'Decontamination Equipment Storage',
          calculate: (inputs) => {
            if (!inputs.has_decontamination) return [];
            return [{ 
              roomCode: 'SB745', 
              roomName: 'Decon Equipment Storage', 
              nsf: 100, 
              quantity: 1 
            }];
          }
        }
      ]
    },

    {
      id: 'FA3',
      name: 'Trauma and Resuscitation Area',
      rooms: [
        {
          id: 'ED-TRAUMA',
          name: 'Trauma / Resuscitation Bay',
          calculate: (inputs) => {
            const quantity = CHAPTER_256.calculateTraumaBays(inputs);
            return [{ 
              roomCode: 'SE607', 
              roomName: 'Trauma Resuscitation Bay', 
              nsf: 400, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'ED-TRAUMA-CONTROL',
          name: 'Trauma Control Desk',
          calculate: (inputs) => {
            const traumaBays = CHAPTER_256.calculateTraumaBays(inputs);
            return traumaBays >= 3 ? [{ 
              roomCode: 'SS217', 
              roomName: 'Trauma Control Desk', 
              nsf: 100, 
              quantity: 1 
            }] : [];
          }
        },
        {
          id: 'ED-XRAY-TRAUMA',
          name: 'Trauma X-Ray Room',
          calculate: (inputs) => {
            return inputs.trauma_level !== 'none' ? [{ 
              roomCode: 'SE301', 
              roomName: 'Trauma X-Ray Room', 
              nsf: 300, 
              quantity: 1 
            }] : [];
          }
        },
        {
          id: 'ED-CT-TRAUMA',
          name: 'Trauma CT Scanner',
          calculate: (inputs) => {
            return (inputs.trauma_level === 'level1' || inputs.trauma_level === 'level2') ? [{ 
              roomCode: 'SE305', 
              roomName: 'Trauma CT Scanner', 
              nsf: 500, 
              quantity: 1 
            }] : [];
          }
        }
      ]
    },

    {
      id: 'FA4',
      name: 'Acute Care Treatment Area',
      rooms: [
        {
          id: 'ED-TREATMENT-BAY',
          name: 'Acute Treatment Bay',
          calculate: (inputs) => {
            const quantity = CHAPTER_256.calculateTreatmentBays(inputs);
            return [{ 
              roomCode: 'SE608', 
              roomName: 'ED Treatment Bay', 
              nsf: 150, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'ED-ISOLATION',
          name: 'Isolation Treatment Room (Negative Pressure)',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            let quantity = 2;
            if (visits > 50000) quantity = 3;
            if (visits > 75000) quantity = 4;
            return [{ 
              roomCode: 'SE609', 
              roomName: 'ED Isolation Room', 
              nsf: 150, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'ED-CARDIAC',
          name: 'Cardiac / Monitored Bay',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            let quantity = 4;
            if (visits > 35000) quantity = 6;
            if (visits > 60000) quantity = 8;
            return [{ 
              roomCode: 'SE610', 
              roomName: 'ED Cardiac Bay', 
              nsf: 150, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'ED-PROCEDURE',
          name: 'Procedure Room',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            const quantity = visits >= 40000 ? 2 : 1;
            return [{ 
              roomCode: 'SE201', 
              roomName: 'ED Procedure Room', 
              nsf: 200, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'ED-GYNECOLOGY',
          name: 'GYN Examination Room',
          calculate: (inputs) => [{ 
            roomCode: 'SE110', 
            roomName: 'ED GYN Exam Room', 
            nsf: 120, 
            quantity: 1 
          }]
        }
      ]
    },

    {
      id: 'FA5',
      name: 'Fast Track / Minor Care Area',
      rooms: [
        {
          id: 'ED-FASTTRACK',
          name: 'Fast Track Treatment Room',
          calculate: (inputs) => {
            if (!inputs.has_fast_track) return [];
            const visits = inputs.annual_visits;
            let quantity = 4;
            if (visits > 35000) quantity = 6;
            if (visits > 60000) quantity = 8;
            return [{ 
              roomCode: 'SE611', 
              roomName: 'Fast Track Treatment Room', 
              nsf: 100, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'ED-FASTTRACK-NURSE',
          name: 'Fast Track Nurse Station',
          calculate: (inputs) => {
            if (!inputs.has_fast_track) return [];
            return [{ 
              roomCode: 'SS217', 
              roomName: 'Fast Track Nurse Station', 
              nsf: 80, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ED-FASTTRACK-SPLINT',
          name: 'Fast Track Splint / Cast Room',
          calculate: (inputs) => {
            if (!inputs.has_fast_track) return [];
            return [{ 
              roomCode: 'SE612', 
              roomName: 'Splint/Cast Room', 
              nsf: 100, 
              quantity: 1 
            }];
          }
        }
      ]
    },

    {
      id: 'FA6',
      name: 'Behavioral Health Emergency Area',
      rooms: [
        {
          id: 'ED-PSYCH-EXAM',
          name: 'Behavioral Health Exam Room (Safe)',
          calculate: (inputs) => {
            if (!inputs.has_behavioral_health) return [];
            const visits = inputs.annual_visits;
            let quantity = 2;
            if (visits > 50000) quantity = 3;
            return [{ 
              roomCode: 'SE613', 
              roomName: 'Behavioral Health Exam Room', 
              nsf: 120, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'ED-PSYCH-SECLUSION',
          name: 'Seclusion Room',
          calculate: (inputs) => {
            if (!inputs.has_behavioral_health) return [];
            return [{ 
              roomCode: 'SE614', 
              roomName: 'Seclusion Room', 
              nsf: 120, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ED-PSYCH-CONSULT',
          name: 'Behavioral Health Consultation Room',
          calculate: (inputs) => {
            if (!inputs.has_behavioral_health) return [];
            return [{ 
              roomCode: 'SE116', 
              roomName: 'Behavioral Health Consult', 
              nsf: 100, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ED-PSYCH-TOILET',
          name: 'Behavioral Health Toilet (Safe)',
          calculate: (inputs) => {
            if (!inputs.has_behavioral_health) return [];
            return [{ 
              roomCode: 'SB191', 
              roomName: 'Behavioral Health Toilet', 
              nsf: 60, 
              quantity: 1 
            }];
          }
        }
      ]
    },

    {
      id: 'FA7',
      name: 'Observation Unit',
      rooms: [
        {
          id: 'ED-OBS-BED',
          name: 'Observation Bed / Room',
          calculate: (inputs) => {
            if (!inputs.has_observation) return [];
            const visits = inputs.annual_visits;
            let quantity = 6;
            if (visits > 35000) quantity = 8;
            if (visits > 60000) quantity = 12;
            return [{ 
              roomCode: 'SE615', 
              roomName: 'Observation Bed', 
              nsf: 120, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'ED-OBS-NURSE',
          name: 'Observation Nurse Station',
          calculate: (inputs) => {
            if (!inputs.has_observation) return [];
            return [{ 
              roomCode: 'SS217', 
              roomName: 'Observation Nurse Station', 
              nsf: 120, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ED-OBS-NOURISHMENT',
          name: 'Observation Nourishment Station',
          calculate: (inputs) => {
            if (!inputs.has_observation) return [];
            return [{ 
              roomCode: 'SB657', 
              roomName: 'Observation Nourishment', 
              nsf: 60, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ED-OBS-TOILET',
          name: 'Observation Patient Toilet',
          calculate: (inputs) => {
            if (!inputs.has_observation) return [];
            return [{ 
              roomCode: 'SB191', 
              roomName: 'Observation Toilet', 
              nsf: 60, 
              quantity: 2 
            }];
          }
        }
      ]
    },

    {
      id: 'FA8',
      name: 'Clinical Support Area',
      rooms: [
        {
          id: 'ED-NURSE-STATION',
          name: 'Main Nurse Station / Control Desk',
          calculate: (inputs) => {
            const bays = CHAPTER_256.calculateTreatmentBays(inputs);
            const nsf = bays >= 20 ? 200 : 150;
            return [{ 
              roomCode: 'SS217', 
              roomName: 'ED Main Nurse Station', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ED-MEDICATION',
          name: 'Medication Room / Pyxis',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            const quantity = visits >= 50000 ? 2 : 1;
            return [{ 
              roomCode: 'SE166', 
              roomName: 'ED Medication Room', 
              nsf: 100, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'ED-CLEAN-UTILITY',
          name: 'Clean Utility / Supply Room',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            const quantity = visits >= 50000 ? 2 : 1;
            return [{ 
              roomCode: 'SB655', 
              roomName: 'ED Clean Utility', 
              nsf: 100, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'ED-SOILED-UTILITY',
          name: 'Soiled Utility / Decontamination',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            const quantity = visits >= 50000 ? 2 : 1;
            return [{ 
              roomCode: 'SB656', 
              roomName: 'ED Soiled Utility', 
              nsf: 100, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'ED-LAB-PHLEBOTOMY',
          name: 'Laboratory / Phlebotomy Station',
          calculate: (inputs) => [{ 
            roomCode: 'SE159', 
            roomName: 'ED Lab/Phlebotomy', 
            nsf: 80, 
            quantity: 1 
          }]
        },
        {
          id: 'ED-POINT-OF-CARE',
          name: 'Point of Care Testing Room',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            return visits >= 40000 ? [{ 
              roomCode: 'SE616', 
              roomName: 'Point of Care Testing', 
              nsf: 100, 
              quantity: 1 
            }] : [];
          }
        },
        {
          id: 'ED-NOURISHMENT',
          name: 'Nourishment / Nutrition Station',
          calculate: (inputs) => [{ 
            roomCode: 'SB657', 
            roomName: 'ED Nourishment Station', 
            nsf: 80, 
            quantity: 1 
          }]
        },
        {
          id: 'ED-CRASH-CART',
          name: 'Crash Cart / Airway Alcove',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            const quantity = visits >= 50000 ? 2 : 1;
            return [{ 
              roomCode: 'SE335', 
              roomName: 'Crash Cart Alcove', 
              nsf: 40, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'ED-BLOOD-REFRIG',
          name: 'Blood Refrigerator Alcove',
          calculate: (inputs) => [{ 
            roomCode: 'SE518', 
            roomName: 'Blood Refrigerator', 
            nsf: 40, 
            quantity: 1 
          }]
        }
      ]
    },

    {
      id: 'FA9',
      name: 'Imaging and Diagnostic Area',
      rooms: [
        {
          id: 'ED-XRAY',
          name: 'ED X-Ray Room',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            let quantity = 1;
            if (visits > 35000) quantity = 2;
            if (visits > 60000) quantity = 3;
            return [{ 
              roomCode: 'SE301', 
              roomName: 'ED X-Ray Room', 
              nsf: 300, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'ED-XRAY-CONTROL',
          name: 'X-Ray Control Alcove',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            let quantity = 1;
            if (visits > 35000) quantity = 2;
            if (visits > 60000) quantity = 3;
            return [{ 
              roomCode: 'SE302', 
              roomName: 'X-Ray Control', 
              nsf: 50, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'ED-CT',
          name: 'ED CT Scanner',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            return visits >= 30000 ? [{ 
              roomCode: 'SE305', 
              roomName: 'ED CT Scanner', 
              nsf: 500, 
              quantity: 1 
            }] : [];
          }
        },
        {
          id: 'ED-CT-CONTROL',
          name: 'CT Control Room',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            return visits >= 30000 ? [{ 
              roomCode: 'SE306', 
              roomName: 'CT Control Room', 
              nsf: 100, 
              quantity: 1 
            }] : [];
          }
        },
        {
          id: 'ED-ULTRASOUND',
          name: 'ED Ultrasound Room',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            return visits >= 25000 ? [{ 
              roomCode: 'SE311', 
              roomName: 'ED Ultrasound Room', 
              nsf: 150, 
              quantity: 1 
            }] : [];
          }
        }
      ]
    },

    {
      id: 'FA10',
      name: 'Staff Support Area',
      rooms: [
        {
          id: 'ED-PHYSICIAN-WORKROOM',
          name: 'Physician Workroom / Charting',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            const nsf = visits >= 50000 ? 200 : 150;
            return [{ 
              roomCode: 'SS111', 
              roomName: 'Physician Workroom', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ED-NURSE-WORKROOM',
          name: 'Nurse Workroom / Report',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            const nsf = visits >= 50000 ? 150 : 120;
            return [{ 
              roomCode: 'SS111', 
              roomName: 'Nurse Workroom', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ED-STAFF-LOUNGE',
          name: 'Staff Lounge / Break Room',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            const nsf = visits >= 50000 ? 180 : 120;
            return [{ 
              roomCode: 'SB152', 
              roomName: 'ED Staff Lounge', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ED-LOCKER-MALE',
          name: 'Male Staff Locker Room',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            const nsf = visits >= 50000 ? 120 : 80;
            return [{ 
              roomCode: 'SB152', 
              roomName: 'Male Locker Room', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ED-LOCKER-FEMALE',
          name: 'Female Staff Locker Room',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            const nsf = visits >= 50000 ? 120 : 80;
            return [{ 
              roomCode: 'SB152', 
              roomName: 'Female Locker Room', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ED-TOILET-STAFF',
          name: 'Staff Toilet / Shower',
          calculate: (inputs) => [{ 
            roomCode: 'SB191', 
            roomName: 'Staff Toilet', 
            nsf: 60, 
            quantity: 2 
          }]
        },
        {
          id: 'ED-SLEEP-CALL',
          name: 'Sleep / On-Call Room',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            let quantity = 1;
            if (visits > 50000) quantity = 2;
            return [{ 
              roomCode: 'SB152', 
              roomName: 'On-Call Sleep Room', 
              nsf: 100, 
              quantity: quantity 
            }];
          }
        }
      ]
    },

    {
      id: 'FA11',
      name: 'Administrative Area',
      rooms: [
        {
          id: 'ED-DIRECTOR-OFFICE',
          name: 'ED Director / Medical Director Office',
          calculate: (inputs) => [{ 
            roomCode: 'SS204', 
            roomName: 'ED Director Office', 
            nsf: 120, 
            quantity: 1 
          }]
        },
        {
          id: 'ED-MANAGER-OFFICE',
          name: 'ED Nurse Manager Office',
          calculate: (inputs) => [{ 
            roomCode: 'SS204', 
            roomName: 'ED Nurse Manager Office', 
            nsf: 100, 
            quantity: 1 
          }]
        },
        {
          id: 'ED-SUPERVISOR-OFFICE',
          name: 'ED Supervisor Office',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            const quantity = visits >= 50000 ? 2 : 1;
            return [{ 
              roomCode: 'SS204', 
              roomName: 'ED Supervisor Office', 
              nsf: 100, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'ED-CONFERENCE',
          name: 'ED Conference / Education Room',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            const nsf = visits >= 50000 ? 240 : 180;
            return [{ 
              roomCode: 'SS101', 
              roomName: 'ED Conference Room', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ED-SOCIAL-WORK',
          name: 'Social Work / Case Management Office',
          calculate: (inputs) => [{ 
            roomCode: 'SS204', 
            roomName: 'ED Social Work Office', 
            nsf: 100, 
            quantity: 1 
          }]
        }
      ]
    },

    {
      id: 'FA12',
      name: 'Support and Storage Area',
      rooms: [
        {
          id: 'ED-EQUIPMENT-STORAGE',
          name: 'Equipment Storage',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            const nsf = visits >= 50000 ? 250 : 200;
            return [{ 
              roomCode: 'SB745', 
              roomName: 'ED Equipment Storage', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ED-LINEN-CLEAN',
          name: 'Clean Linen Storage',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            const nsf = visits >= 50000 ? 150 : 100;
            return [{ 
              roomCode: 'SB745', 
              roomName: 'Clean Linen Storage', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ED-LINEN-SOILED',
          name: 'Soiled Linen Holding',
          calculate: (inputs) => [{ 
            roomCode: 'SB745', 
            roomName: 'Soiled Linen Holding', 
            nsf: 80, 
            quantity: 1 
          }]
        },
        {
          id: 'ED-STRETCHER',
          name: 'Stretcher / Wheelchair Storage',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            const nsf = visits >= 50000 ? 150 : 100;
            return [{ 
              roomCode: 'SE330', 
              roomName: 'Stretcher Storage', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ED-GENERAL-STORAGE',
          name: 'General Storage',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            const nsf = visits >= 50000 ? 200 : 150;
            return [{ 
              roomCode: 'SB745', 
              roomName: 'General Storage', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'ED-JANITOR',
          name: 'Janitor Closet',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            const quantity = visits >= 50000 ? 2 : 1;
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
