// Chapter 226: Electroencephalography (EEG) Laboratory
// Based on PG-18-9 Space Planning Criteria
// Supports: EEG (Stop Code 106), Evoked Potential (Stop Code 126), 
//           Prolonged Video EEG (Stop Code 128), EMG (Stop Code 212)
// SPCM: 10 ranges, max 10 exam rooms
// NTDG Factor: 1.50

export const CHAPTER_226 = {
  id: '226',
  name: 'Electroencephalography (EEG) Laboratory',
  ntdgFactor: 1.50,
  
  inputs: [
    {
      id: 'annual_eeg_clinic_stops',
      label: 'Annual EEG Clinic Stops (Stop Code 106)',
      type: 'number',
      min: 300,
      max: 5000,
      default: 1000
    },
    {
      id: 'annual_evoked_potential_stops',
      label: 'Annual Evoked Potential Clinic Stops (Stop Code 126)',
      type: 'number',
      min: 300,
      max: 5000,
      default: 1000
    },
    {
      id: 'annual_prolonged_video_eeg_stops',
      label: 'Annual Prolonged Video EEG Clinic Stops (Stop Code 128)',
      type: 'number',
      min: 300,
      max: 5000,
      default: 1000
    },
    {
      id: 'annual_emg_clinic_stops',
      label: 'Annual EMG Clinic Stops (Stop Code 212)',
      type: 'number',
      min: 450,
      max: 7500,
      default: 1500
    }
  ],

  // Helper function to calculate total exam rooms
  // EEG, Evoked Potential, and Prolonged Video EEG share the same room count
  // EMG has separate rooms
  calculateTotalExamRooms(inputs) {
    const eegStops = inputs.annual_eeg_clinic_stops || 0;
    const evokedPotentialStops = inputs.annual_evoked_potential_stops || 0;
    const prolongedVideoStops = inputs.annual_prolonged_video_eeg_stops || 0;
    const emgStops = inputs.annual_emg_clinic_stops || 0;
    
    // Determine EEG Exam Room quantity - max of the three stop codes
    const maxEEGStops = Math.max(eegStops, evokedPotentialStops, prolongedVideoStops);
    let eegRoomQty = 0;
    if (maxEEGStops >= 300 && maxEEGStops <= 1000) eegRoomQty = 1;
    else if (maxEEGStops >= 1001 && maxEEGStops <= 2000) eegRoomQty = 2;
    else if (maxEEGStops >= 2001 && maxEEGStops <= 3000) eegRoomQty = 3;
    else if (maxEEGStops >= 3001 && maxEEGStops <= 4000) eegRoomQty = 4;
    else if (maxEEGStops >= 4001 && maxEEGStops <= 5000) eegRoomQty = 5;
    
    // Determine EMG Exam Room quantity
    let emgRoomQty = 0;
    if (emgStops >= 450 && emgStops <= 1500) emgRoomQty = 1;
    else if (emgStops >= 1501 && emgStops <= 3000) emgRoomQty = 2;
    else if (emgStops >= 3001 && emgStops <= 4500) emgRoomQty = 3;
    else if (emgStops >= 4501 && emgStops <= 6000) emgRoomQty = 4;
    else if (emgStops >= 6001 && emgStops <= 7500) emgRoomQty = 5;
    
    return eegRoomQty + emgRoomQty;
  },

  functionalAreas: [
    // FA1: Reception Area
    {
      id: 'fa1',
      name: 'Reception Area',
      calculate: (inputs) => {
        const totalExamRooms = CHAPTER_226.calculateTotalExamRooms(inputs);
        const rooms = [];
        
        // EEG Lab Waiting - 10-tier scaling based on total exam rooms
        let waitingNSF = 100;
        if (totalExamRooms >= 3) waitingNSF = 130;
        if (totalExamRooms >= 4) waitingNSF = 170;
        if (totalExamRooms >= 5) waitingNSF = 215;
        if (totalExamRooms >= 6) waitingNSF = 260;
        if (totalExamRooms >= 7) waitingNSF = 290;
        if (totalExamRooms >= 8) waitingNSF = 330;
        if (totalExamRooms >= 9) waitingNSF = 370;
        if (totalExamRooms >= 10) waitingNSF = 415;
        
        if (totalExamRooms >= 1) {
          rooms.push({
            name: 'EEG Lab Waiting',
            code: 'SB003',
            nsf: waitingNSF,
            quantity: 1
          });
        }
        
        // EEG Lab Reception - 2-tier scaling
        if (totalExamRooms >= 1 && totalExamRooms <= 4) {
          rooms.push({
            name: 'EEG Lab Reception',
            code: 'SC183',
            nsf: 85,
            quantity: 1
          });
        } else if (totalExamRooms >= 5) {
          rooms.push({
            name: 'EEG Lab Reception',
            code: 'SC183',
            nsf: 260,
            quantity: 1
          });
        }
        
        // Patient Check-in Kiosk - 2-tier scaling
        if (totalExamRooms >= 1 && totalExamRooms <= 4) {
          rooms.push({
            name: 'EEG Lab Patient Check-in Kiosk',
            code: 'SC165',
            nsf: 55,
            quantity: 1
          });
        } else if (totalExamRooms >= 5) {
          rooms.push({
            name: 'EEG Lab Patient Check-in Kiosk',
            code: 'SC165',
            nsf: 105,
            quantity: 1
          });
        }
        
        // Patient Education Workstation - quantity based on total rooms
        if (totalExamRooms >= 1 && totalExamRooms <= 4) {
          rooms.push({
            name: 'EEG Lab Patient Education Workstation',
            code: 'SC172',
            nsf: 40,
            quantity: 1
          });
        } else if (totalExamRooms >= 5) {
          rooms.push({
            name: 'EEG Lab Patient Education Workstation',
            code: 'SC172',
            nsf: 40,
            quantity: 2
          });
        }
        
        // Patient Education Room
        if (totalExamRooms >= 1) {
          rooms.push({
            name: 'EEG Lab Patient Education Room',
            code: 'SC171',
            nsf: 120,
            quantity: 1
          });
        }
        
        // Family Toilet
        if (totalExamRooms >= 1) {
          rooms.push({
            name: 'EEG Lab Family Toilet',
            code: 'SB136',
            nsf: 80,
            quantity: 1
          });
        }
        
        // Visitor Toilet
        if (totalExamRooms >= 5) {
          rooms.push({
            name: 'EEG Lab Visitor Toilet',
            code: 'SB191',
            nsf: 60,
            quantity: 1
          });
        }
        
        return rooms;
      }
    },
    
    // FA2: Patient Area
    {
      id: 'fa2',
      name: 'Patient Area',
      calculate: (inputs) => {
        const eegStops = inputs.annual_eeg_clinic_stops || 0;
        const evokedPotentialStops = inputs.annual_evoked_potential_stops || 0;
        const prolongedVideoStops = inputs.annual_prolonged_video_eeg_stops || 0;
        const emgStops = inputs.annual_emg_clinic_stops || 0;
        const totalExamRooms = CHAPTER_226.calculateTotalExamRooms(inputs);
        const rooms = [];
        
        // EEG Exam Room - quantity based on max of three stop codes
        const maxEEGStops = Math.max(eegStops, evokedPotentialStops, prolongedVideoStops);
        let eegRoomQty = 0;
        if (maxEEGStops >= 300 && maxEEGStops <= 1000) eegRoomQty = 1;
        else if (maxEEGStops >= 1001 && maxEEGStops <= 2000) eegRoomQty = 2;
        else if (maxEEGStops >= 2001 && maxEEGStops <= 3000) eegRoomQty = 3;
        else if (maxEEGStops >= 3001 && maxEEGStops <= 4000) eegRoomQty = 4;
        else if (maxEEGStops >= 4001 && maxEEGStops <= 5000) eegRoomQty = 5;
        
        if (eegRoomQty > 0) {
          rooms.push({
            name: 'EEG Exam Room',
            code: 'CEE01',
            nsf: 170,
            quantity: eegRoomQty
          });
        }
        
        // EMG Exam Room - quantity based on Stop Code 212
        let emgRoomQty = 0;
        if (emgStops >= 450 && emgStops <= 1500) emgRoomQty = 1;
        else if (emgStops >= 1501 && emgStops <= 3000) emgRoomQty = 2;
        else if (emgStops >= 3001 && emgStops <= 4500) emgRoomQty = 3;
        else if (emgStops >= 4501 && emgStops <= 6000) emgRoomQty = 4;
        else if (emgStops >= 6001 && emgStops <= 7500) emgRoomQty = 5;
        
        if (emgRoomQty > 0) {
          rooms.push({
            name: 'EMG Exam Room',
            code: 'CEE06',
            nsf: 170,
            quantity: emgRoomQty
          });
        }
        
        // Patient Preparation Room - quantity scales with total exam rooms
        if (totalExamRooms >= 1 && totalExamRooms <= 4) {
          rooms.push({
            name: 'Patient Preparation Room',
            code: 'CEE11',
            nsf: 120,
            quantity: 1
          });
        } else if (totalExamRooms >= 5 && totalExamRooms <= 8) {
          rooms.push({
            name: 'Patient Preparation Room',
            code: 'CEE11',
            nsf: 120,
            quantity: 2
          });
        } else if (totalExamRooms >= 9) {
          rooms.push({
            name: 'Patient Preparation Room',
            code: 'CEE11',
            nsf: 120,
            quantity: 3
          });
        }
        
        // EEG Lab Patient Toilet - quantity scales with total exam rooms
        if (totalExamRooms >= 1 && totalExamRooms <= 4) {
          rooms.push({
            name: 'EEG Lab Patient Toilet',
            code: 'SB201',
            nsf: 60,
            quantity: 1
          });
        } else if (totalExamRooms >= 5 && totalExamRooms <= 8) {
          rooms.push({
            name: 'EEG Lab Patient Toilet',
            code: 'SB201',
            nsf: 60,
            quantity: 2
          });
        } else if (totalExamRooms >= 9) {
          rooms.push({
            name: 'EEG Lab Patient Toilet',
            code: 'SB201',
            nsf: 60,
            quantity: 3
          });
        }
        
        return rooms;
      }
    },
    
    // FA3: Support Area
    {
      id: 'fa3',
      name: 'Support Area',
      calculate: (inputs) => {
        const totalExamRooms = CHAPTER_226.calculateTotalExamRooms(inputs);
        const rooms = [];
        
        if (totalExamRooms >= 1) {
          // EEG / EMG Reading Room - 2-tier scaling
          if (totalExamRooms >= 1 && totalExamRooms <= 4) {
            rooms.push({
              name: 'EEG / EMG Reading Room',
              code: 'CEE21',
              nsf: 120,
              quantity: 1
            });
          } else if (totalExamRooms >= 5) {
            rooms.push({
              name: 'EEG / EMG Reading Room',
              code: 'CEE21',
              nsf: 180,
              quantity: 1
            });
          }
          
          // EEG Lab EEG / EMG Workroom - 2-tier scaling
          if (totalExamRooms >= 1 && totalExamRooms <= 4) {
            rooms.push({
              name: 'EEG Lab EEG / EMG Workroom',
              code: 'SC231',
              nsf: 180,
              quantity: 1
            });
          } else if (totalExamRooms >= 5) {
            rooms.push({
              name: 'EEG Lab EEG / EMG Workroom',
              code: 'SC231',
              nsf: 220,
              quantity: 1
            });
          }
          
          // Clean Utility Room - 2-tier scaling
          if (totalExamRooms >= 1 && totalExamRooms <= 4) {
            rooms.push({
              name: 'EEG Lab Clean Utility Room',
              code: 'SB737',
              nsf: 80,
              quantity: 1
            });
          } else if (totalExamRooms >= 5) {
            rooms.push({
              name: 'EEG Lab Clean Utility Room',
              code: 'SB737',
              nsf: 120,
              quantity: 1
            });
          }
          
          // Soiled Utility Room - 2-tier scaling
          if (totalExamRooms >= 1 && totalExamRooms <= 4) {
            rooms.push({
              name: 'EEG Lab Soiled Utility Room',
              code: 'SB743',
              nsf: 80,
              quantity: 1
            });
          } else if (totalExamRooms >= 5) {
            rooms.push({
              name: 'EEG Lab Soiled Utility Room',
              code: 'SB743',
              nsf: 120,
              quantity: 1
            });
          }
          
          // Equipment Storage Room - 2-tier scaling
          if (totalExamRooms >= 1 && totalExamRooms <= 4) {
            rooms.push({
              name: 'Equipment Storage Room',
              code: 'CEE51',
              nsf: 100,
              quantity: 1
            });
          } else if (totalExamRooms >= 5) {
            rooms.push({
              name: 'Equipment Storage Room',
              code: 'CEE51',
              nsf: 140,
              quantity: 1
            });
          }
          
          // Clean Linen Alcove - 2-tier scaling
          if (totalExamRooms >= 1 && totalExamRooms <= 4) {
            rooms.push({
              name: 'EEG Lab Clean Linen Alcove',
              code: 'SC467',
              nsf: 40,
              quantity: 1
            });
          } else if (totalExamRooms >= 5) {
            rooms.push({
              name: 'EEG Lab Clean Linen Alcove',
              code: 'SC467',
              nsf: 80,
              quantity: 1
            });
          }
          
          // Crash Cart Alcove
          rooms.push({
            name: 'EEG Lab Crash Cart Alcove',
            code: 'SC052',
            nsf: 20,
            quantity: 1
          });
          
          // Wheelchair / Stretcher Alcove - quantity scales with total rooms
          if (totalExamRooms >= 1 && totalExamRooms <= 6) {
            rooms.push({
              name: 'EEG Lab Wheelchair / Stretcher Alcove',
              code: 'SB252',
              nsf: 50,
              quantity: 1
            });
          } else if (totalExamRooms >= 7) {
            rooms.push({
              name: 'EEG Lab Wheelchair / Stretcher Alcove',
              code: 'SB252',
              nsf: 50,
              quantity: 2
            });
          }
          
          // Housekeeping Aides Closet
          rooms.push({
            name: 'EEG Lab Housekeeping Aides Closet (HAC)',
            code: 'SB244',
            nsf: 60,
            quantity: 1
          });
        }
        
        return rooms;
      }
    },
    
    // FA4: Staff and Administrative Area
    {
      id: 'fa4',
      name: 'Staff and Administrative Area',
      calculate: (inputs) => {
        const totalExamRooms = CHAPTER_226.calculateTotalExamRooms(inputs);
        const rooms = [];
        
        if (totalExamRooms >= 1) {
          // EEG Lab Director Office
          rooms.push({
            name: 'EEG Lab Director Office',
            code: 'SS204',
            nsf: 100,
            quantity: 1
          });
          
          // EEG Lab Physician Workstation - quantity scales with total rooms
          let physicianWorkstationQty = 1;
          if (totalExamRooms >= 3) physicianWorkstationQty = 2;
          if (totalExamRooms >= 5) physicianWorkstationQty = 3;
          if (totalExamRooms >= 7) physicianWorkstationQty = 4;
          if (totalExamRooms >= 9) physicianWorkstationQty = 5;
          
          rooms.push({
            name: 'EEG Lab Physician Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: physicianWorkstationQty
          });
          
          // EEG Lab Nurse Manager Office - quantity scales with total rooms
          let nurseManagerQty = 1;
          if (totalExamRooms >= 6) nurseManagerQty = 2;
          
          rooms.push({
            name: 'EEG Lab Nurse Manager Office',
            code: 'SS204',
            nsf: 100,
            quantity: nurseManagerQty
          });
          
          // EEG Lab Chief Technician Workstation
          rooms.push({
            name: 'EEG Lab Chief Technician Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: 1
          });
          
          // EEG Lab Technician Workstation - quantity scales with total rooms
          let technicianWorkstationQty = 1;
          if (totalExamRooms >= 6) technicianWorkstationQty = 2;
          
          rooms.push({
            name: 'EEG Lab Technician Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: technicianWorkstationQty
          });
          
          // Staff Breakroom - 2-tier scaling
          if (totalExamRooms >= 1 && totalExamRooms <= 5) {
            rooms.push({
              name: 'EEG Lab Staff Breakroom',
              code: 'SS262',
              nsf: 120,
              quantity: 1
            });
          } else if (totalExamRooms >= 6) {
            rooms.push({
              name: 'EEG Lab Staff Breakroom',
              code: 'SS262',
              nsf: 160,
              quantity: 1
            });
          }
          
          // Female Staff Locker Room - 2-tier scaling
          if (totalExamRooms >= 1 && totalExamRooms <= 5) {
            rooms.push({
              name: 'EEG Female Lab Staff Locker Room',
              code: 'SS232',
              nsf: 100,
              quantity: 1
            });
          } else if (totalExamRooms >= 6) {
            rooms.push({
              name: 'EEG Female Lab Staff Locker Room',
              code: 'SS232',
              nsf: 140,
              quantity: 1
            });
          }
          
          // Male Staff Locker Room - 2-tier scaling
          if (totalExamRooms >= 1 && totalExamRooms <= 5) {
            rooms.push({
              name: 'EEG Male Lab Staff Locker Room',
              code: 'SS241',
              nsf: 100,
              quantity: 1
            });
          } else if (totalExamRooms >= 6) {
            rooms.push({
              name: 'EEG Male Lab Staff Locker Room',
              code: 'SS241',
              nsf: 140,
              quantity: 1
            });
          }
          
          // Female Staff Toilet - quantity scales with total rooms
          if (totalExamRooms >= 1 && totalExamRooms <= 5) {
            rooms.push({
              name: 'EEG Female Lab Staff Toilet',
              code: 'SB202',
              nsf: 60,
              quantity: 1
            });
          } else if (totalExamRooms >= 6) {
            rooms.push({
              name: 'EEG Female Lab Staff Toilet',
              code: 'SB202',
              nsf: 60,
              quantity: 2
            });
          }
          
          // Male Staff Toilet - quantity scales with total rooms
          if (totalExamRooms >= 1 && totalExamRooms <= 5) {
            rooms.push({
              name: 'EEG Male Lab Staff Toilet',
              code: 'SB203',
              nsf: 60,
              quantity: 1
            });
          } else if (totalExamRooms >= 6) {
            rooms.push({
              name: 'EEG Male Lab Staff Toilet',
              code: 'SB203',
              nsf: 60,
              quantity: 2
            });
          }
        }
        
        return rooms;
      }
    },
    
    // FA5: Education Area
    {
      id: 'fa5',
      name: 'Education Area',
      calculate: (inputs) => {
        const totalExamRooms = CHAPTER_226.calculateTotalExamRooms(inputs);
        const rooms = [];
        
        // Resident Training Room - provided for all sizes
        if (totalExamRooms >= 1) {
          rooms.push({
            name: 'EEG Lab Resident Training Room',
            code: 'SS111',
            nsf: 240,
            quantity: 1
          });
        }
        
        return rooms;
      }
    }
  ]
};
