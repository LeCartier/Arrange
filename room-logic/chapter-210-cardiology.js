// Chapter 210: Cardiology Service
// Complex chapter with multiple testing modalities and workload-driven exam rooms

const CHAPTER_210 = {
  id: '210',
  name: 'Cardiology Service',
  
  inputs: [
    {
      id: 'ekg_clinic_stops',
      label: 'How many annual EKG clinic stops (Stop Code 107) are projected?',
      type: 'number',
      min: 1440,
      max: 24000,
      default: 4800,
      required: true
    },
    {
      id: 'cardiology_clinic_stops',
      label: 'How many annual Cardiology clinic stops (Stop Code 303) are projected?',
      type: 'number',
      min: 640,
      max: 10665,
      default: 2133,
      required: true
    },
    {
      id: 'pacemaker_clinic_stops',
      label: 'How many annual Pacemaker clinic stops (Stop Code 311) are projected?',
      type: 'number',
      min: 960,
      max: 16000,
      default: 3200,
      required: true
    },
    {
      id: 'cardiac_stress_clinic_stops',
      label: 'How many annual Cardiac Stress Test clinic stops (Stop Code 334) are projected?',
      type: 'number',
      min: 384,
      max: 6400,
      default: 1280,
      required: true
    }
  ],

  // Helper function to calculate total exam/procedure/testing rooms
  calculateTotalRooms: (inputs) => {
    let total = 0;
    
    // EKG Testing Rooms
    const ekg = inputs.ekg_clinic_stops;
    if (ekg >= 1440 && ekg <= 4800) total += 1;
    else if (ekg >= 4801 && ekg <= 9600) total += 2;
    else if (ekg >= 9601 && ekg <= 14400) total += 3;
    else if (ekg >= 14401 && ekg <= 19200) total += 4;
    else if (ekg >= 19201 && ekg <= 24000) total += 5;
    
    // Exam Rooms
    const cardio = inputs.cardiology_clinic_stops;
    if (cardio >= 640 && cardio <= 2133) total += 1;
    else if (cardio >= 2134 && cardio <= 4266) total += 2;
    else if (cardio >= 4267 && cardio <= 6399) total += 3;
    else if (cardio >= 6400 && cardio <= 8532) total += 4;
    else if (cardio >= 8533 && cardio <= 10665) total += 5;
    
    // Pacemaker ICD Interrogation Rooms
    const pace = inputs.pacemaker_clinic_stops;
    if (pace >= 960 && pace <= 3200) total += 1;
    else if (pace >= 3201 && pace <= 6400) total += 2;
    else if (pace >= 6401 && pace <= 9600) total += 3;
    else if (pace >= 9601 && pace <= 12800) total += 4;
    else if (pace >= 12801 && pace <= 16000) total += 5;
    
    // Stress Testing Treadmill Rooms
    const stress = inputs.cardiac_stress_clinic_stops;
    if (stress >= 384 && stress <= 1280) total += 1;
    else if (stress >= 1281 && stress <= 2560) total += 2;
    else if (stress >= 2561 && stress <= 3840) total += 3;
    else if (stress >= 3841 && stress <= 5120) total += 4;
    else if (stress >= 5121 && stress <= 6400) total += 5;
    
    return total;
  },

  functionalAreas: [
    {
      id: 'FA1',
      name: 'Reception Area',
      rooms: [
        {
          id: 'CARD-101',
          name: 'Cardio Svc Waiting',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            const nsfMap = {
              1: 45, 2: 100, 3: 130, 4: 170, 5: 215, 6: 260, 7: 290, 8: 330, 9: 370, 10: 415,
              11: 465, 12: 520, 13: 530, 14: 540, 15: 575, 16: 615, 17: 640, 18: 675, 19: 695, 20: 720
            };
            return [{
              code: 'SB002',
              name: 'Cardio Svc Waiting',
              nsf: nsfMap[total] || 45,
              quantity: 1
            }];
          }
        },
        {
          id: 'CARD-102',
          name: 'Cardio Svc Reception',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            if (total >= 1 && total <= 5) {
              return [{ code: 'SC183', name: 'Cardio Svc Reception', nsf: 85, quantity: 1 }];
            } else if (total >= 6 && total <= 15) {
              return [{ code: 'SC183', name: 'Cardio Svc Reception', nsf: 260, quantity: 1 }];
            } else if (total >= 16 && total <= 20) {
              return [{ code: 'SC183', name: 'Cardio Svc Reception', nsf: 385, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'CARD-103',
          name: 'Patient Check-in Kiosk',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            let quantity = 2;
            if (total >= 1 && total <= 15) quantity = 2;
            else if (total >= 16 && total <= 20) quantity = 3;
            return [{ code: 'SC165', name: 'Cardio Svc Patient Check-in Kiosk', nsf: 55, quantity }];
          }
        },
        {
          id: 'CARD-104',
          name: 'Patient Education Workstation',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            let quantity = 1;
            if (total >= 1 && total <= 5) quantity = 1;
            else if (total >= 6 && total <= 15) quantity = 2;
            else if (total >= 16 && total <= 20) quantity = 3;
            return [{ code: 'SC170', name: 'Cardio Svc Patient Education Workstation', nsf: 40, quantity }];
          }
        },
        {
          id: 'CARD-105',
          name: 'Visitor Toilet',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            let quantity = 1;
            if (total >= 1 && total <= 5) quantity = 1;
            else if (total >= 6 && total <= 20) quantity = 2;
            return [{ code: 'SB191', name: 'Cardio Svc Visitor Toilet', nsf: 60, quantity }];
          }
        }
      ]
    },
    {
      id: 'FA2',
      name: 'Cardiology Patient Area',
      rooms: [
        {
          id: 'CARD-201',
          name: 'EKG Testing Room',
          calculate: (inputs) => {
            const ekg = inputs.ekg_clinic_stops;
            let quantity = 0;
            if (ekg >= 1440 && ekg <= 4800) quantity = 1;
            else if (ekg >= 4801 && ekg <= 9600) quantity = 2;
            else if (ekg >= 9601 && ekg <= 14400) quantity = 3;
            else if (ekg >= 14401 && ekg <= 19200) quantity = 4;
            else if (ekg >= 19201 && ekg <= 24000) quantity = 5;
            return quantity > 0 ? [{ code: 'CCD01', name: 'EKG Testing Room, Cardio Svc', nsf: 150, quantity }] : [];
          }
        },
        {
          id: 'CARD-202',
          name: 'Exam Room',
          calculate: (inputs) => {
            const cardio = inputs.cardiology_clinic_stops;
            let quantity = 0;
            if (cardio >= 640 && cardio <= 2133) quantity = 1;
            else if (cardio >= 2134 && cardio <= 4266) quantity = 2;
            else if (cardio >= 4267 && cardio <= 6399) quantity = 3;
            else if (cardio >= 6400 && cardio <= 8532) quantity = 4;
            else if (cardio >= 8533 && cardio <= 10665) quantity = 5;
            return quantity > 0 ? [{ code: 'CCD06', name: 'Exam Room, Cardio Svc', nsf: 120, quantity }] : [];
          }
        },
        {
          id: 'CARD-203',
          name: 'Pacemaker ICD Interrogation Room',
          calculate: (inputs) => {
            const pace = inputs.pacemaker_clinic_stops;
            let quantity = 0;
            if (pace >= 960 && pace <= 3200) quantity = 1;
            else if (pace >= 3201 && pace <= 6400) quantity = 2;
            else if (pace >= 6401 && pace <= 9600) quantity = 3;
            else if (pace >= 9601 && pace <= 12800) quantity = 4;
            else if (pace >= 12801 && pace <= 16000) quantity = 5;
            return quantity > 0 ? [{ code: 'CCD11', name: 'Pacemaker ICD Interrogation Room, Cardio Svc', nsf: 120, quantity }] : [];
          }
        },
        {
          id: 'CARD-204',
          name: 'Holter Monitor Room',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            let quantity = 1;
            if (total >= 1 && total <= 5) quantity = 1;
            else if (total >= 6 && total <= 15) quantity = 2;
            else if (total >= 16 && total <= 20) quantity = 3;
            return [{ code: 'CCD16', name: 'Holter Monitor Room, Cardio Svc', nsf: 150, quantity }];
          }
        },
        {
          id: 'CARD-205',
          name: 'Echocardiograph Room',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            let quantity = 1;
            if (total >= 1 && total <= 5) quantity = 1;
            else if (total >= 6 && total <= 15) quantity = 2;
            else if (total >= 16 && total <= 20) quantity = 3;
            return [{ code: 'CCD21', name: 'Echocardiograph Room, Cardio Svc', nsf: 150, quantity }];
          }
        },
        {
          id: 'CARD-206',
          name: 'Stress Echocardiograph Room',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            let quantity = 1;
            if (total >= 1 && total <= 5) quantity = 1;
            else if (total >= 6 && total <= 15) quantity = 2;
            else if (total >= 16 && total <= 20) quantity = 3;
            return [{ code: 'CCD26', name: 'Stress Echocardiograph Room, Cardio Svc', nsf: 300, quantity }];
          }
        },
        {
          id: 'CARD-207',
          name: 'Stress Testing Treadmill Room',
          calculate: (inputs) => {
            const stress = inputs.cardiac_stress_clinic_stops;
            let quantity = 0;
            if (stress >= 384 && stress <= 1280) quantity = 1;
            else if (stress >= 1281 && stress <= 2560) quantity = 2;
            else if (stress >= 2561 && stress <= 3840) quantity = 3;
            else if (stress >= 3841 && stress <= 5120) quantity = 4;
            else if (stress >= 5121 && stress <= 6400) quantity = 5;
            return quantity > 0 ? [{ code: 'CCD31', name: 'Stress Testing Treadmill Room, Cardio Svc', nsf: 300, quantity }] : [];
          }
        },
        {
          id: 'CARD-208',
          name: 'Tilt Table Testing Room',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            let quantity = 0;
            if (total >= 6 && total <= 15) quantity = 1;
            else if (total >= 16 && total <= 20) quantity = 2;
            return quantity > 0 ? [{ code: 'CCD36', name: 'Tilt Table Testing Room, Cardio Svc', nsf: 180, quantity }] : [];
          }
        },
        {
          id: 'CARD-209',
          name: 'Consult Room',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            let quantity = 1;
            if (total >= 1 && total <= 5) quantity = 1;
            else if (total >= 6 && total <= 20) quantity = 2;
            return [{ code: 'SC271', name: 'Cardio Svc Consult Room', nsf: 120, quantity }];
          }
        },
        {
          id: 'CARD-210',
          name: 'Echocardiograph Reading Room',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            if (total >= 1 && total <= 15) {
              return [{ code: 'CCD46', name: 'Echocardiograph Reading Room, Cardio Svc', nsf: 160, quantity: 1 }];
            } else if (total >= 16 && total <= 20) {
              return [{ code: 'CCD46', name: 'Echocardiograph Reading Room, Cardio Svc', nsf: 200, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'CARD-211',
          name: 'EKG Reading Room',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            return total >= 1 && total <= 5 ? [{ code: 'CCD51', name: 'EKG Reading Room, Cardio Svc', nsf: 120, quantity: 1 }] : [];
          }
        },
        {
          id: 'CARD-212',
          name: 'Patient Toilet',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            let quantity = 1;
            if (total >= 1 && total <= 10) quantity = 1;
            else if (total >= 11 && total <= 20) quantity = 2;
            return [{ code: 'SB201', name: 'Cardio Svc Patient Toilet', nsf: 60, quantity }];
          }
        }
      ]
    },
    {
      id: 'FA3',
      name: 'Cardiology Support Area',
      rooms: [
        {
          id: 'CARD-301',
          name: 'Clean Utility Room',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            if (total >= 1 && total <= 5) {
              return [{ code: 'SB737', name: 'Cardio Svc Clean Utility Room', nsf: 80, quantity: 1 }];
            } else if (total >= 6 && total <= 15) {
              return [{ code: 'SB737', name: 'Cardio Svc Clean Utility Room', nsf: 100, quantity: 1 }];
            } else if (total >= 16 && total <= 20) {
              return [{ code: 'SB737', name: 'Cardio Svc Clean Utility Room', nsf: 120, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'CARD-302',
          name: 'Soiled Utility Room',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            if (total >= 1 && total <= 5) {
              return [{ code: 'SB743', name: 'Cardio Svc Soiled Utility Room', nsf: 100, quantity: 1 }];
            } else if (total >= 6 && total <= 15) {
              return [{ code: 'SB743', name: 'Cardio Svc Soiled Utility Room', nsf: 120, quantity: 1 }];
            } else if (total >= 16 && total <= 20) {
              return [{ code: 'SB743', name: 'Cardio Svc Soiled Utility Room', nsf: 140, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'CARD-303',
          name: 'Event / Holter Monitor Workroom',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            if (total >= 1 && total <= 5) {
              return [{ code: 'CCD56', name: 'Cardio Svc Event / Holter Monitor Workroom', nsf: 160, quantity: 1 }];
            } else if (total >= 6 && total <= 10) {
              return [{ code: 'CCD56', name: 'Cardio Svc Event / Holter Monitor Workroom', nsf: 240, quantity: 1 }];
            } else if (total >= 11 && total <= 15) {
              return [{ code: 'CCD56', name: 'Cardio Svc Event / Holter Monitor Workroom', nsf: 320, quantity: 1 }];
            } else if (total >= 16 && total <= 20) {
              return [{ code: 'CCD56', name: 'Cardio Svc Event / Holter Monitor Workroom', nsf: 400, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'CARD-304',
          name: 'Storage Room',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            if (total >= 1 && total <= 5) {
              return [{ code: 'CCD61', name: 'Storage Room, Cardio Svc', nsf: 120, quantity: 1 }];
            } else if (total >= 6 && total <= 10) {
              return [{ code: 'CCD61', name: 'Storage Room, Cardio Svc', nsf: 160, quantity: 1 }];
            } else if (total >= 11 && total <= 15) {
              return [{ code: 'CCD61', name: 'Storage Room, Cardio Svc', nsf: 200, quantity: 1 }];
            } else if (total >= 16 && total <= 20) {
              return [{ code: 'CCD61', name: 'Storage Room, Cardio Svc', nsf: 240, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'CARD-305',
          name: 'ICD Equipment Storage Room',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            if (total >= 1 && total <= 5) {
              return [{ code: 'CCD71', name: 'ICD Equipment Storage Room, Cardio Svc', nsf: 120, quantity: 1 }];
            } else if (total >= 6 && total <= 10) {
              return [{ code: 'CCD71', name: 'ICD Equipment Storage Room, Cardio Svc', nsf: 160, quantity: 1 }];
            } else if (total >= 11 && total <= 15) {
              return [{ code: 'CCD71', name: 'ICD Equipment Storage Room, Cardio Svc', nsf: 200, quantity: 1 }];
            } else if (total >= 16 && total <= 20) {
              return [{ code: 'CCD71', name: 'ICD Equipment Storage Room, Cardio Svc', nsf: 240, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'CARD-306',
          name: 'Equipment Storage Room',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            if (total >= 1 && total <= 5) {
              return [{ code: 'CCD81', name: 'Equipment Storage Room, Cardio Svc', nsf: 160, quantity: 1 }];
            } else if (total >= 6 && total <= 10) {
              return [{ code: 'CCD81', name: 'Equipment Storage Room, Cardio Svc', nsf: 200, quantity: 1 }];
            } else if (total >= 11 && total <= 15) {
              return [{ code: 'CCD81', name: 'Equipment Storage Room, Cardio Svc', nsf: 240, quantity: 1 }];
            } else if (total >= 16 && total <= 20) {
              return [{ code: 'CCD81', name: 'Equipment Storage Room, Cardio Svc', nsf: 280, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'CARD-307',
          name: 'Crash Cart Alcove',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            let quantity = 1;
            if (total >= 1 && total <= 10) quantity = 1;
            else if (total >= 11 && total <= 20) quantity = 2;
            return [{ code: 'SC052', name: 'Cardio Svc Crash Cart Alcove', nsf: 20, quantity }];
          }
        },
        {
          id: 'CARD-308',
          name: 'Wheelchair / Stretcher Alcove',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            let quantity = 1;
            if (total >= 1 && total <= 10) quantity = 1;
            else if (total >= 11 && total <= 20) quantity = 2;
            return [{ code: 'SB252', name: 'Cardio Svc Wheelchair / Stretcher Alcove', nsf: 50, quantity }];
          }
        },
        {
          id: 'CARD-309',
          name: 'Housekeeping Aides Closet (HAC)',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            if (total >= 1 && total <= 10) {
              return [{ code: 'SB244', name: 'Cardio Svc Housekeeping Aides Closet (HAC)', nsf: 60, quantity: 1 }];
            } else if (total >= 11 && total <= 20) {
              return [{ code: 'SB244', name: 'Cardio Svc Housekeeping Aides Closet (HAC)', nsf: 80, quantity: 1 }];
            }
            return [];
          }
        }
      ]
    },
    {
      id: 'FA4',
      name: 'Staff and Administrative Area',
      rooms: [
        {
          id: 'CARD-401',
          name: 'Cardiovascular Service Chief Office',
          calculate: (inputs) => {
            return [{ code: 'SS204', name: 'Cardio Svc Cardiovascular Service Chief Office', nsf: 100, quantity: 1 }];
          }
        },
        {
          id: 'CARD-402',
          name: 'Service Chief Visitor Waiting',
          calculate: (inputs) => {
            return [{ code: 'SB003', name: 'Cardio Svc Service Chief Visitor Waiting', nsf: 80, quantity: 1 }];
          }
        },
        {
          id: 'CARD-403',
          name: 'Administration Support Workstation',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            let quantity = 1;
            if (total >= 1 && total <= 10) quantity = 1;
            else if (total >= 11 && total <= 20) quantity = 2;
            return [{ code: 'SS218', name: 'Cardio Svc Administration Support Workstation', nsf: 56, quantity }];
          }
        },
        {
          id: 'CARD-404',
          name: 'Physician Workstation',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            const quantityMap = { 1: 1, 2: 1, 3: 2, 4: 2, 5: 3, 6: 3, 7: 4, 8: 4, 9: 5, 10: 5, 11: 6, 12: 6, 13: 7, 14: 7, 15: 8, 16: 8, 17: 9, 18: 9, 19: 10, 20: 10 };
            return [{ code: 'SS218', name: 'Cardio Svc Physician Workstation', nsf: 56, quantity: quantityMap[total] || 1 }];
          }
        },
        {
          id: 'CARD-405',
          name: 'Nurse Manager Office',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            let quantity = 1;
            if (total >= 1 && total <= 10) quantity = 1;
            else if (total >= 11 && total <= 20) quantity = 2;
            return [{ code: 'SS204', name: 'Cardio Svc Nurse Manager Office', nsf: 100, quantity }];
          }
        },
        {
          id: 'CARD-406',
          name: 'Nurse Practitioner Workstation',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            let quantity = 0;
            if (total >= 3 && total <= 6) quantity = 1;
            else if (total >= 7 && total <= 10) quantity = 2;
            else if (total >= 11 && total <= 14) quantity = 3;
            else if (total >= 15 && total <= 18) quantity = 4;
            else if (total >= 19 && total <= 20) quantity = 5;
            return quantity > 0 ? [{ code: 'SS218', name: 'Cardio Svc Nurse Practitioner Workstation', nsf: 56, quantity }] : [];
          }
        },
        {
          id: 'CARD-407',
          name: 'Nurse Workstation',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            let quantity = 1;
            if (total >= 1 && total <= 4) quantity = 1;
            else if (total >= 5 && total <= 8) quantity = 2;
            else if (total >= 9 && total <= 12) quantity = 3;
            else if (total >= 13 && total <= 16) quantity = 4;
            else if (total >= 17 && total <= 20) quantity = 5;
            return [{ code: 'SS218', name: 'Cardio Svc Nurse Workstation', nsf: 56, quantity }];
          }
        },
        {
          id: 'CARD-408',
          name: 'Technician Workstation',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            let quantity = 1;
            if (total >= 1 && total <= 10) quantity = 1;
            else if (total >= 11 && total <= 20) quantity = 2;
            return [{ code: 'SS218', name: 'Cardio Svc Technician Workstation', nsf: 56, quantity }];
          }
        },
        {
          id: 'CARD-409',
          name: 'Administration Workstation',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            let quantity = 1;
            if (total >= 1 && total <= 10) quantity = 1;
            else if (total >= 11 && total <= 20) quantity = 2;
            return [{ code: 'SS218', name: 'Cardio Svc Administration Workstation', nsf: 56, quantity }];
          }
        },
        {
          id: 'CARD-410',
          name: 'Staff Conference Room',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            if (total >= 1 && total <= 5) {
              return [{ code: 'SS101', name: 'Cardio Svc Staff Conference Room', nsf: 240, quantity: 1 }];
            } else if (total >= 6 && total <= 15) {
              return [{ code: 'SS101', name: 'Cardio Svc Staff Conference Room', nsf: 300, quantity: 1 }];
            } else if (total >= 16 && total <= 20) {
              return [{ code: 'SS101', name: 'Cardio Svc Staff Conference Room', nsf: 500, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'CARD-411',
          name: 'Copy / Supply Room',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            if (total >= 1 && total <= 10) {
              return [{ code: 'SS272', name: 'Cardio Svc Copy / Supply Room', nsf: 80, quantity: 1 }];
            } else if (total >= 11 && total <= 20) {
              return [{ code: 'SS272', name: 'Cardio Svc Copy / Supply Room', nsf: 100, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'CARD-412',
          name: 'Staff Toilet',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            let quantity = 1;
            if (total >= 1 && total <= 5) quantity = 1;
            else if (total >= 6 && total <= 20) quantity = 2;
            return [{ code: 'SB191', name: 'Cardio Svc Staff Toilet', nsf: 60, quantity }];
          }
        }
      ]
    },
    {
      id: 'FA5',
      name: 'Education Area',
      rooms: [
        {
          id: 'CARD-501',
          name: 'Residency Director Office',
          calculate: (inputs) => {
            return [{ code: 'SS204', name: 'Cardio Svc Residency Director Office', nsf: 100, quantity: 1 }];
          }
        },
        {
          id: 'CARD-502',
          name: 'Intern / Fellow Workstation',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            let quantity = 2;
            if (total >= 1 && total <= 10) quantity = 2;
            else if (total >= 11 && total <= 20) quantity = 4;
            return [{ code: 'SS217', name: 'Cardio Svc Intern / Fellow Workstation', nsf: 48, quantity }];
          }
        },
        {
          id: 'CARD-503',
          name: 'Resident Conference Room',
          calculate: (inputs) => {
            const total = CHAPTER_210.calculateTotalRooms(inputs);
            if (total >= 1 && total <= 10) {
              return [{ code: 'SS101', name: 'Cardio Svc Resident Conference Room', nsf: 240, quantity: 1 }];
            } else if (total >= 11 && total <= 20) {
              return [{ code: 'SS101', name: 'Cardio Svc Resident Conference Room', nsf: 300, quantity: 1 }];
            }
            return [];
          }
        }
      ]
    }
  ]
};

export default CHAPTER_210;
