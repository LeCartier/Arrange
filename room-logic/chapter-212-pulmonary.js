// Chapter 212: Pulmonary Medicine Service
// Based on PG-18-9 Space Planning Criteria
// Supports: PFT Labs, Bronchoscopy Suite, Sleep Studies
// SPCM: 15 ranges organized in 3 modality groups (PFT, Bronch, Sleep)
// NTDG Factor: 1.50

export const CHAPTER_212 = {
  id: '212',
  name: 'Pulmonary Medicine Service',
  ntdgFactor: 1.50,
  
  inputs: [
    {
      id: 'annual_pft_clinic_stops',
      label: 'Annual Pulmonary Function Clinic Stops (Stop Code 104)',
      type: 'number',
      min: 960,
      max: 16000,
      default: 3200
    },
    {
      id: 'annual_bronch_clinic_stops',
      label: 'Annual Pulmonary/Chest Clinic Stops (Stop Code 312)',
      type: 'number',
      min: 240,
      max: 4000,
      default: 800
    },
    {
      id: 'annual_sleep_clinic_stops',
      label: 'Annual Sleep Medicine Clinic Stops (Stop Code 349)',
      type: 'number',
      min: 60,
      max: 1000,
      default: 200
    }
  ],

  // Helper function to calculate total exam/treatment rooms
  // Used for support room sizing calculations
  calculateTotalExamRooms(inputs) {
    const pftStops = inputs.annual_pft_clinic_stops || 0;
    const bronchStops = inputs.annual_bronch_clinic_stops || 0;
    const sleepStops = inputs.annual_sleep_clinic_stops || 0;
    
    // PFT Lab quantities
    let pftLabs = 0;
    if (pftStops >= 960 && pftStops <= 3200) pftLabs = 1;
    else if (pftStops >= 3201 && pftStops <= 6400) pftLabs = 2;
    else if (pftStops >= 6401 && pftStops <= 9600) pftLabs = 3;
    else if (pftStops >= 9601 && pftStops <= 12800) pftLabs = 4;
    else if (pftStops >= 12801 && pftStops <= 16000) pftLabs = 5;
    
    // Bronchoscopy Room quantities
    let bronchRooms = 0;
    if (bronchStops >= 240 && bronchStops <= 800) bronchRooms = 1;
    else if (bronchStops >= 801 && bronchStops <= 1600) bronchRooms = 2;
    else if (bronchStops >= 1601 && bronchStops <= 2400) bronchRooms = 3;
    else if (bronchStops >= 2401 && bronchStops <= 3200) bronchRooms = 4;
    else if (bronchStops >= 3201 && bronchStops <= 4000) bronchRooms = 5;
    
    // Sleep Study Room quantities
    let sleepRooms = 0;
    if (sleepStops >= 60 && sleepStops <= 200) sleepRooms = 1;
    else if (sleepStops >= 201 && sleepStops <= 400) sleepRooms = 2;
    else if (sleepStops >= 401 && sleepStops <= 600) sleepRooms = 3;
    else if (sleepStops >= 601 && sleepStops <= 800) sleepRooms = 4;
    else if (sleepStops >= 801 && sleepStops <= 1000) sleepRooms = 5;
    
    return pftLabs + bronchRooms + sleepRooms;
  },

  functionalAreas: [
    // FA1: Reception Area
    {
      id: 'fa1',
      name: 'Reception Area',
      calculate: (inputs) => {
        const totalExamRooms = CHAPTER_212.calculateTotalExamRooms(inputs);
        const rooms = [];
        
        // Waiting - 8-tier scaling based on total exam rooms
        let waitingNSF = 80;
        if (totalExamRooms >= 2) waitingNSF = 130;
        if (totalExamRooms >= 3) waitingNSF = 190;
        if (totalExamRooms >= 4) waitingNSF = 260;
        if (totalExamRooms >= 5) waitingNSF = 310;
        if (totalExamRooms >= 6) waitingNSF = 370;
        if (totalExamRooms >= 7) waitingNSF = 440;
        if (totalExamRooms >= 8) waitingNSF = 520;
        
        if (totalExamRooms >= 1) {
          rooms.push({
            name: 'Pulm Med Waiting',
            code: 'SB003',
            nsf: waitingNSF,
            quantity: 1
          });
        }
        
        // Reception - 2-tier scaling
        if (totalExamRooms >= 1 && totalExamRooms <= 5) {
          rooms.push({
            name: 'Pulm Med Reception',
            code: 'SC183',
            nsf: 85,
            quantity: 1
          });
        } else if (totalExamRooms >= 6) {
          rooms.push({
            name: 'Pulm Med Reception',
            code: 'SC183',
            nsf: 260,
            quantity: 1
          });
        }
        
        // Patient Education Kiosk - quantity based on total rooms
        if (totalExamRooms >= 1 && totalExamRooms <= 7) {
          rooms.push({
            name: 'Patient Education Kiosk',
            code: 'SC165',
            nsf: 40,
            quantity: 1
          });
        } else if (totalExamRooms >= 8) {
          rooms.push({
            name: 'Patient Education Kiosk',
            code: 'SC165',
            nsf: 40,
            quantity: 2
          });
        }
        
        // Patient Education Room - size varies
        if (totalExamRooms >= 1 && totalExamRooms <= 5) {
          rooms.push({
            name: 'Patient Education Room',
            code: 'SC171',
            nsf: 80,
            quantity: 1
          });
        } else if (totalExamRooms >= 6) {
          rooms.push({
            name: 'Patient Education Room',
            code: 'SC171',
            nsf: 100,
            quantity: 1
          });
        }
        
        // Family Toilet
        if (totalExamRooms >= 1) {
          rooms.push({
            name: 'Family Toilet',
            code: 'SB136',
            nsf: 80,
            quantity: 1
          });
        }
        
        // Visitor Toilet
        if (totalExamRooms >= 3) {
          rooms.push({
            name: 'Visitor Toilet',
            code: 'SB191',
            nsf: 60,
            quantity: 1
          });
        }
        
        return rooms;
      }
    },
    
    // FA2: Pulmonary Medicine / Respiratory Care Patient Area
    {
      id: 'fa2',
      name: 'Pulmonary Medicine / Respiratory Care Patient Area',
      calculate: (inputs) => {
        const pftStops = inputs.annual_pft_clinic_stops || 0;
        const rooms = [];
        
        // Pulmonary Function Testing Laboratory - quantity based on Stop Code 104
        let pftLabQty = 0;
        if (pftStops >= 960 && pftStops <= 3200) pftLabQty = 1;
        else if (pftStops >= 3201 && pftStops <= 6400) pftLabQty = 2;
        else if (pftStops >= 6401 && pftStops <= 9600) pftLabQty = 3;
        else if (pftStops >= 9601 && pftStops <= 12800) pftLabQty = 4;
        else if (pftStops >= 12801 && pftStops <= 16000) pftLabQty = 5;
        
        if (pftLabQty > 0) {
          rooms.push({
            name: 'Pulmonary Function Testing Laboratory',
            code: 'CPL01',
            nsf: 120,
            quantity: pftLabQty
          });
          
          // Extended PFT Lab - always 1 if any PFT workload
          rooms.push({
            name: 'Extended Pulmonary Function Testing Laboratory',
            code: 'CPL02',
            nsf: 120,
            quantity: 1
          });
          
          // Pulmonary Physiology Exercise Laboratory
          rooms.push({
            name: 'Pulmonary Physiology Exercise Laboratory',
            code: 'CPL03',
            nsf: 240,
            quantity: 1
          });
          
          // Consult Room
          rooms.push({
            name: 'Consult Room',
            code: 'SC057',
            nsf: 120,
            quantity: 1
          });
          
          // Patient Toilet
          rooms.push({
            name: 'Patient Toilet',
            code: 'SB201',
            nsf: 60,
            quantity: 1
          });
          
          // Patient Toilet/Shower
          rooms.push({
            name: 'Patient Toilet/Shower',
            code: 'SB214',
            nsf: 85,
            quantity: 1
          });
        }
        
        return rooms;
      }
    },
    
    // FA3: Bronchoscopy Patient Area
    {
      id: 'fa3',
      name: 'Bronchoscopy Patient Area',
      calculate: (inputs) => {
        const bronchStops = inputs.annual_bronch_clinic_stops || 0;
        const rooms = [];
        
        // Bronchoscopy Procedure Room - quantity based on Stop Code 312
        let bronchRoomQty = 0;
        if (bronchStops >= 240 && bronchStops <= 800) bronchRoomQty = 1;
        else if (bronchStops >= 801 && bronchStops <= 1600) bronchRoomQty = 2;
        else if (bronchStops >= 1601 && bronchStops <= 2400) bronchRoomQty = 3;
        else if (bronchStops >= 2401 && bronchStops <= 3200) bronchRoomQty = 4;
        else if (bronchStops >= 3201 && bronchStops <= 4000) bronchRoomQty = 5;
        
        if (bronchRoomQty > 0) {
          rooms.push({
            name: 'Bronchoscopy Procedure Room',
            code: 'CPL11',
            nsf: 300,
            quantity: bronchRoomQty
          });
          
          // Equipment Cleaning Room
          rooms.push({
            name: 'Equipment Cleaning Room',
            code: 'SC085',
            nsf: 80,
            quantity: 1
          });
          
          // Patient Toilet
          rooms.push({
            name: 'Patient Toilet',
            code: 'SB201',
            nsf: 60,
            quantity: 1
          });
        }
        
        return rooms;
      }
    },
    
    // FA4: Sleep Study Patient Area
    {
      id: 'fa4',
      name: 'Sleep Study Patient Area',
      calculate: (inputs) => {
        const sleepStops = inputs.annual_sleep_clinic_stops || 0;
        const rooms = [];
        
        // Sleep Study Room - quantity based on Stop Code 349
        let sleepRoomQty = 0;
        if (sleepStops >= 60 && sleepStops <= 200) sleepRoomQty = 1;
        else if (sleepStops >= 201 && sleepStops <= 400) sleepRoomQty = 2;
        else if (sleepStops >= 401 && sleepStops <= 600) sleepRoomQty = 3;
        else if (sleepStops >= 601 && sleepStops <= 800) sleepRoomQty = 4;
        else if (sleepStops >= 801 && sleepStops <= 1000) sleepRoomQty = 5;
        
        if (sleepRoomQty > 0) {
          rooms.push({
            name: 'Sleep Study Room',
            code: 'CPL21',
            nsf: 210,
            quantity: sleepRoomQty
          });
          
          // Patient Toilet/Shower
          rooms.push({
            name: 'Patient Toilet/Shower',
            code: 'SB214',
            nsf: 85,
            quantity: 1
          });
          
          // Sleep Study Monitoring Room
          rooms.push({
            name: 'Sleep Study Monitoring Room',
            code: 'CPL22',
            nsf: 150,
            quantity: 1
          });
          
          // Patient Prep Room
          rooms.push({
            name: 'Patient Prep Room',
            code: 'CPL23',
            nsf: 150,
            quantity: 1
          });
          
          // Nourishment Room
          rooms.push({
            name: 'Nourishment Room',
            code: 'SC321',
            nsf: 60,
            quantity: 1
          });
          
          // Clean Linen Alcove
          rooms.push({
            name: 'Clean Linen Alcove',
            code: 'SC467',
            nsf: 40,
            quantity: 1
          });
          
          // Staff Toilet
          rooms.push({
            name: 'Staff Toilet',
            code: 'SB202',
            nsf: 60,
            quantity: 1
          });
        }
        
        return rooms;
      }
    },
    
    // FA5: Prep and Recovery Patient Area (Bronchoscopy Support)
    {
      id: 'fa5',
      name: 'Prep and Recovery Patient Area',
      calculate: (inputs) => {
        const bronchStops = inputs.annual_bronch_clinic_stops || 0;
        const rooms = [];
        
        // Determine bronchoscopy procedure room count
        let bronchRoomQty = 0;
        if (bronchStops >= 240 && bronchStops <= 800) bronchRoomQty = 1;
        else if (bronchStops >= 801 && bronchStops <= 1600) bronchRoomQty = 2;
        else if (bronchStops >= 1601 && bronchStops <= 2400) bronchRoomQty = 3;
        else if (bronchStops >= 2401 && bronchStops <= 3200) bronchRoomQty = 4;
        else if (bronchStops >= 3201 && bronchStops <= 4000) bronchRoomQty = 5;
        
        if (bronchRoomQty > 0) {
          // Prep/Recovery Room - 2x multiplier of procedure rooms
          const prepRecoveryRoomQty = bronchRoomQty * 2;
          rooms.push({
            name: 'Prep / Recovery Room',
            code: 'CPL15',
            nsf: 120,
            quantity: prepRecoveryRoomQty
          });
          
          // Prep/Recovery Cubicle - 1x multiplier of procedure rooms
          const prepRecoveryCubicleQty = bronchRoomQty;
          rooms.push({
            name: 'Prep / Recovery Cubicle',
            code: 'CPL16',
            nsf: 120,
            quantity: prepRecoveryCubicleQty
          });
          
          // Patient Toilet - quantity based on total prep/recovery capacity
          const totalPrepRecoveryCapacity = prepRecoveryRoomQty + prepRecoveryCubicleQty;
          let patientToiletQty = 1;
          if (totalPrepRecoveryCapacity >= 7) patientToiletQty = 2;
          
          rooms.push({
            name: 'Patient Toilet',
            code: 'SB201',
            nsf: 60,
            quantity: patientToiletQty
          });
          
          // Nurse Station - scales with capacity
          let nurseStationNSF = 60;
          if (totalPrepRecoveryCapacity >= 5) nurseStationNSF = 90;
          if (totalPrepRecoveryCapacity >= 9) nurseStationNSF = 120;
          
          rooms.push({
            name: 'Nurse Station',
            code: 'SC324',
            nsf: nurseStationNSF,
            quantity: 1
          });
          
          // Medication Room
          rooms.push({
            name: 'Medication Room',
            code: 'SC313',
            nsf: 80,
            quantity: 1
          });
          
          // Refreshment Center Alcove
          rooms.push({
            name: 'Refreshment Center Alcove',
            code: 'SC348',
            nsf: 60,
            quantity: 1
          });
          
          // Clean Linen Alcove - scales with capacity
          let cleanLinenNSF = 60;
          if (totalPrepRecoveryCapacity >= 9) cleanLinenNSF = 100;
          
          rooms.push({
            name: 'Clean Linen Alcove',
            code: 'SC467',
            nsf: cleanLinenNSF,
            quantity: 1
          });
          
          // Clean Utility Room - scales with capacity
          let cleanUtilityNSF = 80;
          if (totalPrepRecoveryCapacity >= 5) cleanUtilityNSF = 100;
          if (totalPrepRecoveryCapacity >= 9) cleanUtilityNSF = 120;
          
          rooms.push({
            name: 'Clean Utility Room',
            code: 'SB737',
            nsf: cleanUtilityNSF,
            quantity: 1
          });
          
          // Soiled Utility Room - scales with capacity
          let soiledUtilityNSF = 80;
          if (totalPrepRecoveryCapacity >= 5) soiledUtilityNSF = 100;
          if (totalPrepRecoveryCapacity >= 9) soiledUtilityNSF = 120;
          
          rooms.push({
            name: 'Soiled Utility Room',
            code: 'SB743',
            nsf: soiledUtilityNSF,
            quantity: 1
          });
          
          // Crash Cart Alcove - quantity based on capacity
          let crashCartQty = 1;
          if (totalPrepRecoveryCapacity >= 9) crashCartQty = 2;
          
          rooms.push({
            name: 'Crash Cart Alcove',
            code: 'SC052',
            nsf: 20,
            quantity: crashCartQty
          });
          
          // Wheelchair/Stretcher Alcove - quantity based on capacity
          let wcStretcherQty = 1;
          if (totalPrepRecoveryCapacity >= 9) wcStretcherQty = 2;
          
          rooms.push({
            name: 'Wheelchair / Stretcher Alcove',
            code: 'SB252',
            nsf: 50,
            quantity: wcStretcherQty
          });
          
          // Housekeeping Aides Closet
          rooms.push({
            name: 'Housekeeping Aides Closet (HAC)',
            code: 'SB244',
            nsf: 60,
            quantity: 1
          });
        }
        
        return rooms;
      }
    },
    
    // FA6: Support Area
    {
      id: 'fa6',
      name: 'Support Area',
      calculate: (inputs) => {
        const totalExamRooms = CHAPTER_212.calculateTotalExamRooms(inputs);
        const rooms = [];
        
        if (totalExamRooms >= 1) {
          // Respiratory Therapy Room
          rooms.push({
            name: 'Respiratory Therapy Room',
            code: 'CPL31',
            nsf: 120,
            quantity: 1
          });
          
          // Medical Gas Storage
          rooms.push({
            name: 'Medical Gas Storage',
            code: 'SC304',
            nsf: 80,
            quantity: 1
          });
          
          // Ventilator Storage - scales with total rooms
          let ventilatorStorageNSF = 100;
          if (totalExamRooms >= 6) ventilatorStorageNSF = 140;
          if (totalExamRooms >= 11) ventilatorStorageNSF = 180;
          
          rooms.push({
            name: 'Ventilator Storage',
            code: 'CPL32',
            nsf: ventilatorStorageNSF,
            quantity: 1
          });
          
          // Clean Utility Room - scales with total rooms
          let cleanUtilityNSF = 80;
          if (totalExamRooms >= 6) cleanUtilityNSF = 100;
          if (totalExamRooms >= 11) cleanUtilityNSF = 120;
          
          rooms.push({
            name: 'Clean Utility Room',
            code: 'SB737',
            nsf: cleanUtilityNSF,
            quantity: 1
          });
          
          // Soiled Utility Room - scales with total rooms
          let soiledUtilityNSF = 80;
          if (totalExamRooms >= 6) soiledUtilityNSF = 100;
          if (totalExamRooms >= 11) soiledUtilityNSF = 120;
          
          rooms.push({
            name: 'Soiled Utility Room',
            code: 'SB743',
            nsf: soiledUtilityNSF,
            quantity: 1
          });
          
          // Equipment Storage - scales with total rooms
          let equipmentStorageNSF = 160;
          if (totalExamRooms >= 6) equipmentStorageNSF = 200;
          if (totalExamRooms >= 11) equipmentStorageNSF = 240;
          
          rooms.push({
            name: 'Equipment Storage',
            code: 'SC086',
            nsf: equipmentStorageNSF,
            quantity: 1
          });
          
          // Crash Cart Alcove
          rooms.push({
            name: 'Crash Cart Alcove',
            code: 'SC052',
            nsf: 20,
            quantity: 1
          });
          
          // Wheelchair/Stretcher Alcove - quantity scales with total rooms
          let wcStretcherQty = 1;
          if (totalExamRooms >= 6) wcStretcherQty = 2;
          if (totalExamRooms >= 11) wcStretcherQty = 3;
          
          rooms.push({
            name: 'Wheelchair / Stretcher Alcove',
            code: 'SB252',
            nsf: 50,
            quantity: wcStretcherQty
          });
          
          // Housekeeping Aides Closet
          rooms.push({
            name: 'Housekeeping Aides Closet (HAC)',
            code: 'SB244',
            nsf: 60,
            quantity: 1
          });
        }
        
        return rooms;
      }
    },
    
    // FA7: Staff and Administrative Area
    {
      id: 'fa7',
      name: 'Staff and Administrative Area',
      calculate: (inputs) => {
        const totalExamRooms = CHAPTER_212.calculateTotalExamRooms(inputs);
        const rooms = [];
        
        if (totalExamRooms >= 1) {
          // Respiratory Therapy Director Office
          rooms.push({
            name: 'Respiratory Therapy Director Office',
            code: 'SS204',
            nsf: 100,
            quantity: 1
          });
          
          // Administration Waiting
          rooms.push({
            name: 'Administration Waiting',
            code: 'SC036',
            nsf: 80,
            quantity: 1
          });
          
          // Administrative Support Workstation
          rooms.push({
            name: 'Administrative Support Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: 1
          });
          
          // Physician Workstation - quantity scales with total rooms
          let physicianWorkstationQty = 1;
          if (totalExamRooms >= 3) physicianWorkstationQty = 2;
          if (totalExamRooms >= 5) physicianWorkstationQty = 3;
          if (totalExamRooms >= 7) physicianWorkstationQty = 4;
          if (totalExamRooms >= 9) physicianWorkstationQty = 5;
          if (totalExamRooms >= 11) physicianWorkstationQty = 6;
          
          rooms.push({
            name: 'Physician Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: physicianWorkstationQty
          });
          
          // Nurse Manager Office - quantity scales with total rooms
          let nurseManagerQty = 1;
          if (totalExamRooms >= 9) nurseManagerQty = 2;
          
          rooms.push({
            name: 'Nurse Manager Office',
            code: 'SS204',
            nsf: 100,
            quantity: nurseManagerQty
          });
          
          // Technician Workstation - quantity scales with total rooms
          let technicianWorkstationQty = 1;
          if (totalExamRooms >= 6) technicianWorkstationQty = 2;
          
          rooms.push({
            name: 'Technician Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: technicianWorkstationQty
          });
          
          // Home Care Coordinator Workstation
          rooms.push({
            name: 'Home Care Coordinator Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: 1
          });
          
          // Polysomnographer Workstation - quantity scales with total rooms
          let polysomnographerQty = 1;
          if (totalExamRooms >= 6) polysomnographerQty = 2;
          
          rooms.push({
            name: 'Polysomnographer Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: polysomnographerQty
          });
          
          // Respiratory Therapist Workstation - quantity scales with total rooms
          let respTherapistQty = 1;
          if (totalExamRooms >= 4) respTherapistQty = 2;
          if (totalExamRooms >= 8) respTherapistQty = 3;
          
          rooms.push({
            name: 'Respiratory Therapist Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: respTherapistQty
          });
          
          // Admin Support Workstation - quantity scales with total rooms
          let adminSupportQty = 1;
          if (totalExamRooms >= 6) adminSupportQty = 2;
          
          rooms.push({
            name: 'Admin Support Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: adminSupportQty
          });
          
          // Copy/Supply Room
          rooms.push({
            name: 'Copy / Supply Room',
            code: 'SS070',
            nsf: 80,
            quantity: 1
          });
          
          // Staff Breakroom - scales with total rooms
          let breakroomNSF = 120;
          if (totalExamRooms >= 6) breakroomNSF = 180;
          if (totalExamRooms >= 11) breakroomNSF = 240;
          
          rooms.push({
            name: 'Staff Breakroom',
            code: 'SS262',
            nsf: breakroomNSF,
            quantity: 1
          });
          
          // Staff Locker Room - scales with total rooms
          let lockerRoomNSF = 100;
          if (totalExamRooms >= 5) lockerRoomNSF = 120;
          if (totalExamRooms >= 9) lockerRoomNSF = 160;
          
          rooms.push({
            name: 'Staff Locker Room',
            code: 'SS232',
            nsf: lockerRoomNSF,
            quantity: 1
          });
          
          // Staff Toilet - quantity scales with total rooms
          let staffToiletQty = 1;
          if (totalExamRooms >= 6) staffToiletQty = 2;
          
          rooms.push({
            name: 'Staff Toilet',
            code: 'SB202',
            nsf: 60,
            quantity: staffToiletQty
          });
        }
        
        return rooms;
      }
    },
    
    // FA8: Education Area
    {
      id: 'fa8',
      name: 'Education Area',
      calculate: (inputs) => {
        const totalExamRooms = CHAPTER_212.calculateTotalExamRooms(inputs);
        const rooms = [];
        
        if (totalExamRooms >= 5) {
          // Residency Program Director Office
          rooms.push({
            name: 'Residency Program Director Office',
            code: 'SS204',
            nsf: 100,
            quantity: 1
          });
          
          // Intern/Fellow Workstation - quantity scales with total rooms
          let internFellowQty = 2;
          if (totalExamRooms >= 8) internFellowQty = 4;
          if (totalExamRooms >= 12) internFellowQty = 6;
          
          rooms.push({
            name: 'Intern / Fellow Workstation',
            code: 'SS107',
            nsf: 48,
            quantity: internFellowQty
          });
          
          // Resident Conference Room - size scales with total rooms
          let conferenceRoomNSF = 240;
          if (totalExamRooms >= 9) conferenceRoomNSF = 300;
          
          rooms.push({
            name: 'Resident Conference Room',
            code: 'SS111',
            nsf: conferenceRoomNSF,
            quantity: 1
          });
        }
        
        return rooms;
      }
    }
  ]
};
