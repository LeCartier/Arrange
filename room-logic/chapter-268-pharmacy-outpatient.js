// Chapter 268: Pharmacy Service - Outpatient
// Based on VA PG-18-9 Space Planning Criteria
// NTDG Factor: 1.35

export const CHAPTER_268 = {
  id: '268',
  name: 'Pharmacy Service',
  ntdgFactor: 1.35,
  
  inputs: [
    {
      id: 'annual_prescriptions',
      label: 'Annual Outpatient Prescription Volume',
      type: 'number',
      min: 50000,
      max: 500000,
      default: 120000,
      required: true
    },
    {
      id: 'has_compounding',
      label: 'Does pharmacy provide compounding services?',
      type: 'checkbox',
      default: true
    },
    {
      id: 'has_oncology',
      label: 'Does pharmacy provide oncology/chemotherapy compounding?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'has_clinic_satellite',
      label: 'Are clinic satellite pharmacies included?',
      type: 'checkbox',
      default: false
    }
  ],

  // Helper function to calculate dispensing windows
  calculateDispensingWindows(inputs) {
    const rxVolume = inputs.annual_prescriptions;
    if (rxVolume >= 50000 && rxVolume <= 100000) return 2;
    if (rxVolume >= 100001 && rxVolume <= 150000) return 3;
    if (rxVolume >= 150001 && rxVolume <= 200000) return 4;
    if (rxVolume >= 200001 && rxVolume <= 300000) return 5;
    if (rxVolume >= 300001 && rxVolume <= 400000) return 6;
    if (rxVolume >= 400001) return 8;
    return 2;
  },

  // Helper function to calculate waiting area size
  calculateWaitingNSF(inputs) {
    const windows = CHAPTER_268.calculateDispensingWindows(inputs);
    return windows * 60; // 60 NSF per window
  },

  // Helper function to calculate pharmacist workstations
  calculatePharmacistStations(inputs) {
    const rxVolume = inputs.annual_prescriptions;
    if (rxVolume <= 100000) return 3;
    if (rxVolume <= 200000) return 5;
    if (rxVolume <= 300000) return 7;
    if (rxVolume <= 400000) return 9;
    return 12;
  },

  functionalAreas: [
    {
      id: 'FA1',
      name: 'Reception and Waiting Area',
      rooms: [
        {
          id: 'PH-WAIT',
          name: 'Pharmacy Waiting Area',
          calculate: (inputs) => {
            const nsf = CHAPTER_268.calculateWaitingNSF(inputs);
            return [{ 
              roomCode: 'SB003', 
              roomName: 'Pharmacy Waiting Area', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'PH-WINDOW',
          name: 'Pharmacy Dispensing Window',
          calculate: (inputs) => {
            const quantity = CHAPTER_268.calculateDispensingWindows(inputs);
            return [{ 
              roomCode: 'SV401', 
              roomName: 'Pharmacy Dispensing Window', 
              nsf: 50, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'PH-CONSULT',
          name: 'Pharmacy Consultation Room',
          calculate: (inputs) => {
            const rxVolume = inputs.annual_prescriptions;
            const quantity = rxVolume >= 150000 ? 2 : 1;
            return [{ 
              roomCode: 'SV422', 
              roomName: 'Pharmacy Consultation Room', 
              nsf: 100, 
              quantity: quantity 
            }];
          }
        }
      ]
    },

    {
      id: 'FA2',
      name: 'Dispensing and Preparation Area',
      rooms: [
        {
          id: 'PH-DISPENSING',
          name: 'Pharmacy Dispensing Area',
          calculate: (inputs) => {
            const rxVolume = inputs.annual_prescriptions;
            let nsf = 400;
            if (rxVolume > 100000) nsf = 600;
            if (rxVolume > 200000) nsf = 800;
            if (rxVolume > 300000) nsf = 1000;
            if (rxVolume > 400000) nsf = 1200;
            return [{ 
              roomCode: 'SV423', 
              roomName: 'Pharmacy Dispensing Area', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'PH-PHARMACIST-WS',
          name: 'Pharmacist Workstation',
          calculate: (inputs) => {
            const quantity = CHAPTER_268.calculatePharmacistStations(inputs);
            return [{ 
              roomCode: 'SS218', 
              roomName: 'Pharmacist Workstation', 
              nsf: 56, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'PH-ROBOT',
          name: 'Automated Dispensing System / Robot',
          calculate: (inputs) => {
            const rxVolume = inputs.annual_prescriptions;
            return rxVolume >= 200000 ? [{ 
              roomCode: 'SV431', 
              roomName: 'Automated Dispensing System', 
              nsf: 300, 
              quantity: 1 
            }] : [];
          }
        },
        {
          id: 'PH-UNIT-DOSE',
          name: 'Unit Dose Preparation Area',
          calculate: (inputs) => {
            const rxVolume = inputs.annual_prescriptions;
            const nsf = rxVolume >= 200000 ? 200 : 120;
            return [{ 
              roomCode: 'SV501', 
              roomName: 'Unit Dose Preparation Area', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'PH-COMPOUNDING',
          name: 'Non-Sterile Compounding Room',
          calculate: (inputs) => {
            return inputs.has_compounding ? [{ 
              roomCode: 'SV508', 
              roomName: 'Non-Sterile Compounding Room', 
              nsf: 150, 
              quantity: 1 
            }] : [];
          }
        },
        {
          id: 'PH-STERILE-COMP',
          name: 'Sterile Compounding Room (IV Room)',
          calculate: (inputs) => {
            return inputs.has_compounding ? [{ 
              roomCode: 'SV511', 
              roomName: 'Sterile Compounding Room', 
              nsf: 200, 
              quantity: 1 
            }] : [];
          }
        },
        {
          id: 'PH-STERILE-ANTE',
          name: 'Sterile Compounding Anteroom',
          calculate: (inputs) => {
            return inputs.has_compounding ? [{ 
              roomCode: 'SV548', 
              roomName: 'Sterile Compounding Anteroom', 
              nsf: 80, 
              quantity: 1 
            }] : [];
          }
        },
        {
          id: 'PH-ONCOLOGY-COMP',
          name: 'Oncology/Chemotherapy Compounding Room',
          calculate: (inputs) => {
            return inputs.has_oncology ? [{ 
              roomCode: 'SV521', 
              roomName: 'Oncology Compounding Room', 
              nsf: 250, 
              quantity: 1 
            }] : [];
          }
        },
        {
          id: 'PH-ONCOLOGY-ANTE',
          name: 'Oncology Compounding Anteroom',
          calculate: (inputs) => {
            return inputs.has_oncology ? [{ 
              roomCode: 'SV548', 
              roomName: 'Oncology Compounding Anteroom', 
              nsf: 80, 
              quantity: 1 
            }] : [];
          }
        }
      ]
    },

    {
      id: 'FA3',
      name: 'Storage and Inventory Area',
      rooms: [
        {
          id: 'PH-VAULT',
          name: 'Pharmacy Controlled Substance Vault',
          calculate: (inputs) => [{ 
            roomCode: 'SV433', 
            roomName: 'Controlled Substance Vault', 
            nsf: 120, 
            quantity: 1 
          }]
        },
        {
          id: 'PH-BULK-STORAGE',
          name: 'Pharmacy Bulk Storage',
          calculate: (inputs) => {
            const rxVolume = inputs.annual_prescriptions;
            let nsf = 300;
            if (rxVolume > 150000) nsf = 400;
            if (rxVolume > 250000) nsf = 500;
            if (rxVolume > 350000) nsf = 600;
            return [{ 
              roomCode: 'SV451', 
              roomName: 'Pharmacy Bulk Storage', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'PH-REFRIGERATOR',
          name: 'Pharmacy Refrigerator Storage',
          calculate: (inputs) => [{ 
            roomCode: 'SV541', 
            roomName: 'Pharmacy Refrigerator Storage', 
            nsf: 80, 
            quantity: 1 
          }]
        },
        {
          id: 'PH-RECEIVING',
          name: 'Pharmacy Receiving and Quarantine',
          calculate: (inputs) => {
            const rxVolume = inputs.annual_prescriptions;
            const nsf = rxVolume >= 200000 ? 150 : 100;
            return [{ 
              roomCode: 'SV443', 
              roomName: 'Pharmacy Receiving Area', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'PH-RETURNS',
          name: 'Pharmacy Returns and Outdates',
          calculate: (inputs) => [{ 
            roomCode: 'SV442', 
            roomName: 'Pharmacy Returns Area', 
            nsf: 80, 
            quantity: 1 
          }]
        }
      ]
    },

    {
      id: 'FA4',
      name: 'Administrative and Staff Area',
      rooms: [
        {
          id: 'PH-CHIEF-OFFICE',
          name: 'Chief Pharmacist Office',
          calculate: (inputs) => [{ 
            roomCode: 'SS204', 
            roomName: 'Chief Pharmacist Office', 
            nsf: 120, 
            quantity: 1 
          }]
        },
        {
          id: 'PH-SUPERVISOR-OFFICE',
          name: 'Pharmacy Supervisor Office',
          calculate: (inputs) => {
            const rxVolume = inputs.annual_prescriptions;
            const quantity = rxVolume >= 200000 ? 2 : 1;
            return [{ 
              roomCode: 'SS204', 
              roomName: 'Pharmacy Supervisor Office', 
              nsf: 100, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'PH-OFFICE-SHARED',
          name: 'Pharmacy Shared Office',
          calculate: (inputs) => {
            const rxVolume = inputs.annual_prescriptions;
            const quantity = rxVolume >= 150000 ? 1 : 0;
            return quantity > 0 ? [{ 
              roomCode: 'SS111', 
              roomName: 'Pharmacy Shared Office', 
              nsf: 120, 
              quantity: quantity 
            }] : [];
          }
        },
        {
          id: 'PH-WORKROOM',
          name: 'Pharmacy Staff Workroom',
          calculate: (inputs) => {
            const rxVolume = inputs.annual_prescriptions;
            const nsf = rxVolume >= 200000 ? 180 : 120;
            return [{ 
              roomCode: 'SS111', 
              roomName: 'Pharmacy Staff Workroom', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'PH-LOCKER',
          name: 'Pharmacy Staff Locker Room',
          calculate: (inputs) => {
            const rxVolume = inputs.annual_prescriptions;
            return rxVolume >= 150000 ? [{ 
              roomCode: 'SS251', 
              roomName: 'Pharmacy Staff Locker Room', 
              nsf: 80, 
              quantity: 1 
            }] : [];
          }
        },
        {
          id: 'PH-TOILET',
          name: 'Pharmacy Staff Toilet',
          calculate: (inputs) => [{ 
            roomCode: 'SB191', 
            roomName: 'Pharmacy Staff Toilet', 
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
          id: 'PH-CLEAN-UTILITY',
          name: 'Pharmacy Clean Utility',
          calculate: (inputs) => [{ 
            roomCode: 'SV531', 
            roomName: 'Pharmacy Clean Utility', 
            nsf: 80, 
            quantity: 1 
          }]
        },
        {
          id: 'PH-SOILED-UTILITY',
          name: 'Pharmacy Soiled Utility',
          calculate: (inputs) => [{ 
            roomCode: 'SV549', 
            roomName: 'Pharmacy Soiled Utility', 
            nsf: 80, 
            quantity: 1 
          }]
        },
        {
          id: 'PH-EQUIPMENT-CLEAN',
          name: 'Pharmacy Equipment Cleaning Room',
          calculate: (inputs) => {
            return inputs.has_compounding ? [{ 
              roomCode: 'SV547', 
              roomName: 'Pharmacy Equipment Cleaning', 
              nsf: 100, 
              quantity: 1 
            }] : [];
          }
        },
        {
          id: 'PH-JANITOR',
          name: 'Pharmacy Janitor Closet',
          calculate: (inputs) => [{ 
            roomCode: 'SB244', 
            roomName: 'Pharmacy Janitor Closet', 
            nsf: 60, 
            quantity: 1 
          }]
        },
        {
          id: 'PH-SATELLITE',
          name: 'Clinic Satellite Pharmacy',
          calculate: (inputs) => {
            return inputs.has_clinic_satellite ? [{ 
              roomCode: 'SV557', 
              roomName: 'Clinic Satellite Pharmacy', 
              nsf: 150, 
              quantity: 1 
            }] : [];
          }
        }
      ]
    }
  ]
};
