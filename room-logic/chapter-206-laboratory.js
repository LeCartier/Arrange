// Chapter 206: Ambulatory Care - Laboratory Service
// Based on VA PG-18-9 Space Planning Criteria
// NTDG Factor: 1.35

export const CHAPTER_206 = {
  id: '206',
  name: 'Ambulatory Care - Laboratory Service',
  ntdgFactor: 1.35,
  
  inputs: [
    {
      id: 'annual_lab_tests',
      label: 'Annual Laboratory Test Volume (in thousands)',
      type: 'number',
      min: 50,
      max: 500,
      default: 150,
      required: true
    },
    {
      id: 'has_phlebotomy',
      label: 'Is Phlebotomy/Blood Draw provided?',
      type: 'checkbox',
      default: true
    },
    {
      id: 'has_microbiology',
      label: 'Is Microbiology provided?',
      type: 'checkbox',
      default: true
    },
    {
      id: 'has_blood_bank',
      label: 'Is Blood Bank provided?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'has_molecular',
      label: 'Is Molecular Diagnostics provided?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'has_anatomic_path',
      label: 'Is Anatomic Pathology provided?',
      type: 'checkbox',
      default: false
    }
  ],

  // Helper function to calculate phlebotomy stations
  calculatePhlebotomyStations(inputs) {
    const testVolume = inputs.annual_lab_tests;
    if (testVolume >= 50 && testVolume <= 100) return 2;
    if (testVolume >= 101 && testVolume <= 200) return 3;
    if (testVolume >= 201 && testVolume <= 300) return 4;
    if (testVolume >= 301 && testVolume <= 400) return 5;
    if (testVolume >= 401) return 6;
    return 2;
  },

  // Helper function to calculate core lab size
  calculateCoreLabNSF(inputs) {
    const testVolume = inputs.annual_lab_tests;
    if (testVolume <= 100) return 600;
    if (testVolume <= 200) return 900;
    if (testVolume <= 300) return 1200;
    if (testVolume <= 400) return 1500;
    return 1800;
  },

  functionalAreas: [
    {
      id: 'FA1',
      name: 'Specimen Collection Area',
      rooms: [
        {
          id: 'LAB-WAIT',
          name: 'Laboratory Waiting Area',
          calculate: (inputs) => {
            if (!inputs.has_phlebotomy) return [];
            const stations = CHAPTER_206.calculatePhlebotomyStations(inputs);
            const nsf = stations * 50;
            return [{ 
              roomCode: 'SB003', 
              roomName: 'Laboratory Waiting Area', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'LAB-PHLEB-STATION',
          name: 'Phlebotomy Station',
          calculate: (inputs) => {
            if (!inputs.has_phlebotomy) return [];
            const quantity = CHAPTER_206.calculatePhlebotomyStations(inputs);
            return [{ 
              roomCode: 'SE159', 
              roomName: 'Phlebotomy Station', 
              nsf: 50, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'LAB-TOILET-SPECIMEN',
          name: 'Specimen Collection Toilet',
          calculate: (inputs) => {
            if (!inputs.has_phlebotomy) return [];
            return [{ 
              roomCode: 'SB191', 
              roomName: 'Specimen Collection Toilet', 
              nsf: 60, 
              quantity: 2 
            }];
          }
        },
        {
          id: 'LAB-RECEPTION',
          name: 'Laboratory Reception',
          calculate: (inputs) => {
            if (!inputs.has_phlebotomy) return [];
            return [{ 
              roomCode: 'SS218', 
              roomName: 'Laboratory Reception', 
              nsf: 56, 
              quantity: 1 
            }];
          }
        }
      ]
    },

    {
      id: 'FA2',
      name: 'Core Laboratory Testing Area',
      rooms: [
        {
          id: 'LAB-CORE',
          name: 'Core Laboratory (Chemistry/Hematology)',
          calculate: (inputs) => {
            const nsf = CHAPTER_206.calculateCoreLabNSF(inputs);
            return [{ 
              roomCode: 'SR020', 
              roomName: 'Core Laboratory', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'LAB-AUTOMATED',
          name: 'Automated Analyzer Area',
          calculate: (inputs) => {
            const testVolume = inputs.annual_lab_tests;
            return testVolume >= 150 ? [{ 
              roomCode: 'SR021', 
              roomName: 'Automated Analyzer Area', 
              nsf: 200, 
              quantity: 1 
            }] : [];
          }
        },
        {
          id: 'LAB-SPECIMEN-PROC',
          name: 'Specimen Processing Area',
          calculate: (inputs) => {
            const testVolume = inputs.annual_lab_tests;
            const nsf = testVolume >= 200 ? 200 : 120;
            return [{ 
              roomCode: 'SR022', 
              roomName: 'Specimen Processing Area', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'LAB-URINALYSIS',
          name: 'Urinalysis Area',
          calculate: (inputs) => [{ 
            roomCode: 'SR023', 
            roomName: 'Urinalysis Area', 
            nsf: 100, 
            quantity: 1 
          }]
        },
        {
          id: 'LAB-COAGULATION',
          name: 'Coagulation Testing Area',
          calculate: (inputs) => {
            const testVolume = inputs.annual_lab_tests;
            return testVolume >= 150 ? [{ 
              roomCode: 'SR024', 
              roomName: 'Coagulation Testing Area', 
              nsf: 100, 
              quantity: 1 
            }] : [];
          }
        },
        {
          id: 'LAB-SPECIAL-CHEM',
          name: 'Special Chemistry Area',
          calculate: (inputs) => {
            const testVolume = inputs.annual_lab_tests;
            return testVolume >= 200 ? [{ 
              roomCode: 'SR025', 
              roomName: 'Special Chemistry Area', 
              nsf: 150, 
              quantity: 1 
            }] : [];
          }
        }
      ]
    },

    {
      id: 'FA3',
      name: 'Microbiology Area',
      rooms: [
        {
          id: 'LAB-MICRO',
          name: 'Microbiology Laboratory',
          calculate: (inputs) => {
            if (!inputs.has_microbiology) return [];
            const testVolume = inputs.annual_lab_tests;
            const nsf = testVolume >= 200 ? 400 : 300;
            return [{ 
              roomCode: 'SR026', 
              roomName: 'Microbiology Laboratory', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'LAB-MICRO-MEDIA',
          name: 'Microbiology Media Prep',
          calculate: (inputs) => {
            if (!inputs.has_microbiology) return [];
            return [{ 
              roomCode: 'SR027', 
              roomName: 'Microbiology Media Prep', 
              nsf: 100, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'LAB-MICRO-SEROLOGY',
          name: 'Serology/Immunology Area',
          calculate: (inputs) => {
            if (!inputs.has_microbiology) return [];
            const testVolume = inputs.annual_lab_tests;
            return testVolume >= 150 ? [{ 
              roomCode: 'SR028', 
              roomName: 'Serology/Immunology Area', 
              nsf: 150, 
              quantity: 1 
            }] : [];
          }
        },
        {
          id: 'LAB-MOLECULAR',
          name: 'Molecular Diagnostics Laboratory',
          calculate: (inputs) => {
            if (!inputs.has_molecular) return [];
            return [{ 
              roomCode: 'SR029', 
              roomName: 'Molecular Diagnostics Laboratory', 
              nsf: 300, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'LAB-PCR',
          name: 'PCR/Amplification Room',
          calculate: (inputs) => {
            if (!inputs.has_molecular) return [];
            return [{ 
              roomCode: 'SR030', 
              roomName: 'PCR Amplification Room', 
              nsf: 120, 
              quantity: 1 
            }];
          }
        }
      ]
    },

    {
      id: 'FA4',
      name: 'Blood Bank and Transfusion Service',
      rooms: [
        {
          id: 'LAB-BLOOD-BANK',
          name: 'Blood Bank Laboratory',
          calculate: (inputs) => {
            if (!inputs.has_blood_bank) return [];
            return [{ 
              roomCode: 'SR031', 
              roomName: 'Blood Bank Laboratory', 
              nsf: 300, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'LAB-BLOOD-STORAGE',
          name: 'Blood Product Refrigerator Storage',
          calculate: (inputs) => {
            if (!inputs.has_blood_bank) return [];
            return [{ 
              roomCode: 'SR032', 
              roomName: 'Blood Product Storage', 
              nsf: 100, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'LAB-APHERESIS',
          name: 'Apheresis Room',
          calculate: (inputs) => {
            if (!inputs.has_blood_bank) return [];
            const testVolume = inputs.annual_lab_tests;
            return testVolume >= 300 ? [{ 
              roomCode: 'SR033', 
              roomName: 'Apheresis Room', 
              nsf: 150, 
              quantity: 1 
            }] : [];
          }
        }
      ]
    },

    {
      id: 'FA5',
      name: 'Anatomic Pathology Area',
      rooms: [
        {
          id: 'LAB-GROSS',
          name: 'Gross Examination / Autopsy Room',
          calculate: (inputs) => {
            if (!inputs.has_anatomic_path) return [];
            return [{ 
              roomCode: 'SR034', 
              roomName: 'Gross Examination Room', 
              nsf: 300, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'LAB-HISTOLOGY',
          name: 'Histology Laboratory',
          calculate: (inputs) => {
            if (!inputs.has_anatomic_path) return [];
            return [{ 
              roomCode: 'SR035', 
              roomName: 'Histology Laboratory', 
              nsf: 250, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'LAB-CYTOLOGY',
          name: 'Cytology Laboratory',
          calculate: (inputs) => {
            if (!inputs.has_anatomic_path) return [];
            return [{ 
              roomCode: 'SR036', 
              roomName: 'Cytology Laboratory', 
              nsf: 200, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'LAB-FROZEN-SECTION',
          name: 'Frozen Section Room',
          calculate: (inputs) => {
            if (!inputs.has_anatomic_path) return [];
            return [{ 
              roomCode: 'SR037', 
              roomName: 'Frozen Section Room', 
              nsf: 120, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'LAB-MORGUE',
          name: 'Morgue / Body Storage',
          calculate: (inputs) => {
            if (!inputs.has_anatomic_path) return [];
            return [{ 
              roomCode: 'SR038', 
              roomName: 'Morgue', 
              nsf: 200, 
              quantity: 1 
            }];
          }
        }
      ]
    },

    {
      id: 'FA6',
      name: 'Laboratory Support Area',
      rooms: [
        {
          id: 'LAB-SPECIMEN-REFRIG',
          name: 'Specimen Refrigerator',
          calculate: (inputs) => {
            const testVolume = inputs.annual_lab_tests;
            const nsf = testVolume >= 200 ? 100 : 80;
            return [{ 
              roomCode: 'SR039', 
              roomName: 'Specimen Refrigerator', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'LAB-REAGENT-STORAGE',
          name: 'Reagent and Supply Storage',
          calculate: (inputs) => {
            const testVolume = inputs.annual_lab_tests;
            const nsf = testVolume >= 200 ? 150 : 100;
            return [{ 
              roomCode: 'SB745', 
              roomName: 'Reagent Storage', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'LAB-CLEAN-UTILITY',
          name: 'Laboratory Clean Utility',
          calculate: (inputs) => [{ 
            roomCode: 'SB655', 
            roomName: 'Laboratory Clean Utility', 
            nsf: 80, 
            quantity: 1 
          }]
        },
        {
          id: 'LAB-SOILED-UTILITY',
          name: 'Laboratory Soiled Utility',
          calculate: (inputs) => [{ 
            roomCode: 'SB656', 
            roomName: 'Laboratory Soiled Utility', 
            nsf: 80, 
            quantity: 1 
          }]
        },
        {
          id: 'LAB-GLASSWASH',
          name: 'Glassware Washing Room',
          calculate: (inputs) => {
            const testVolume = inputs.annual_lab_tests;
            return testVolume >= 150 ? [{ 
              roomCode: 'SR040', 
              roomName: 'Glassware Washing Room', 
              nsf: 100, 
              quantity: 1 
            }] : [];
          }
        },
        {
          id: 'LAB-HAZMAT',
          name: 'Hazardous Materials Storage',
          calculate: (inputs) => [{ 
            roomCode: 'SB745', 
            roomName: 'Hazardous Materials Storage', 
            nsf: 80, 
            quantity: 1 
          }]
        }
      ]
    },

    {
      id: 'FA7',
      name: 'Administrative and Staff Area',
      rooms: [
        {
          id: 'LAB-DIRECTOR-OFFICE',
          name: 'Laboratory Director Office',
          calculate: (inputs) => [{ 
            roomCode: 'SS204', 
            roomName: 'Laboratory Director Office', 
            nsf: 120, 
            quantity: 1 
          }]
        },
        {
          id: 'LAB-SUPERVISOR-OFFICE',
          name: 'Laboratory Supervisor Office',
          calculate: (inputs) => {
            const testVolume = inputs.annual_lab_tests;
            const quantity = testVolume >= 200 ? 2 : 1;
            return [{ 
              roomCode: 'SS204', 
              roomName: 'Laboratory Supervisor Office', 
              nsf: 100, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'LAB-PATHOLOGIST-OFFICE',
          name: 'Pathologist Office',
          calculate: (inputs) => {
            if (!inputs.has_anatomic_path) return [];
            return [{ 
              roomCode: 'SS204', 
              roomName: 'Pathologist Office', 
              nsf: 120, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'LAB-MICROSCOPY',
          name: 'Microscopy Room',
          calculate: (inputs) => {
            const testVolume = inputs.annual_lab_tests;
            const nsf = testVolume >= 200 ? 150 : 100;
            return [{ 
              roomCode: 'SR041', 
              roomName: 'Microscopy Room', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'LAB-STAFF-WORKROOM',
          name: 'Laboratory Staff Workroom',
          calculate: (inputs) => {
            const testVolume = inputs.annual_lab_tests;
            const nsf = testVolume >= 200 ? 150 : 120;
            return [{ 
              roomCode: 'SS111', 
              roomName: 'Laboratory Staff Workroom', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'LAB-LOCKER',
          name: 'Laboratory Staff Locker Room',
          calculate: (inputs) => {
            const testVolume = inputs.annual_lab_tests;
            return testVolume >= 150 ? [{ 
              roomCode: 'SB152', 
              roomName: 'Laboratory Staff Locker Room', 
              nsf: 80, 
              quantity: 1 
            }] : [];
          }
        },
        {
          id: 'LAB-TOILET',
          name: 'Laboratory Staff Toilet',
          calculate: (inputs) => [{ 
            roomCode: 'SB191', 
            roomName: 'Laboratory Staff Toilet', 
            nsf: 60, 
            quantity: 1 
          }]
        }
      ]
    },

    {
      id: 'FA8',
      name: 'Quality and Reference Area',
      rooms: [
        {
          id: 'LAB-QC',
          name: 'Quality Control Laboratory',
          calculate: (inputs) => {
            const testVolume = inputs.annual_lab_tests;
            return testVolume >= 200 ? [{ 
              roomCode: 'SR042', 
              roomName: 'Quality Control Laboratory', 
              nsf: 120, 
              quantity: 1 
            }] : [];
          }
        },
        {
          id: 'LAB-REFERENCE',
          name: 'Reference Testing Area',
          calculate: (inputs) => {
            const testVolume = inputs.annual_lab_tests;
            return testVolume >= 250 ? [{ 
              roomCode: 'SR043', 
              roomName: 'Reference Testing Area', 
              nsf: 150, 
              quantity: 1 
            }] : [];
          }
        },
        {
          id: 'LAB-EDUCATION',
          name: 'Laboratory Education Room',
          calculate: (inputs) => {
            const testVolume = inputs.annual_lab_tests;
            return testVolume >= 200 ? [{ 
              roomCode: 'SS101', 
              roomName: 'Laboratory Education Room', 
              nsf: 180, 
              quantity: 1 
            }] : [];
          }
        }
      ]
    }
  ]
};
