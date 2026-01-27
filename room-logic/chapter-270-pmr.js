// Chapter 270: Physical Medicine & Rehabilitation Service
// Based on VA PG-18-9 Space Planning Criteria (September 1, 2022)
// NTDG Factor: 1.35
// Canonical FA structure from Combined Space Criteria

export const CHAPTER_270 = {
  id: '270',
  name: 'Physical Medicine & Rehabilitation Service',
  ntdgFactor: 1.35,
  
  inputs: [
    {
      id: 'annual_pt_stops',
      label: 'Annual Physical Therapy clinic stops (Stop Code 205)',
      type: 'number',
      min: 600,
      max: 63744,
      default: 8000,
      required: true
    },
    {
      id: 'annual_kt_stops',
      label: 'Annual Kinesiotherapy clinic stops (Stop Code 214)',
      type: 'number',
      min: 0,
      max: 19123,
      default: 0,
      required: false
    },
    {
      id: 'annual_ot_stops',
      label: 'Annual Occupational Therapy clinic stops (Stop Code 206)',
      type: 'number',
      min: 0,
      max: 25498,
      default: 3200,
      required: false
    },
    {
      id: 'annual_atech_stops',
      label: 'Annual Assistive Technology clinic stops (Stop Code 240)',
      type: 'number',
      min: 0,
      max: 7171,
      default: 0,
      required: false
    },
    {
      id: 'annual_cc_stops',
      label: 'Annual Chiropractic Care clinic stops (Stop Code 436)',
      type: 'number',
      min: 0,
      max: 18000,
      default: 0,
      required: false
    },
    {
      id: 'has_multifunction_room',
      label: 'Is Multi-function Room authorized?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'has_driver_training',
      label: 'Is Driver Training Center (DTC) authorized?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'has_aquatic_therapy',
      label: 'Is Aquatic Therapy (AT) authorized?',
      type: 'checkbox',
      default: false
    }
  ],

  // Helper function to calculate total ranges for all therapy specialties
  calculateTotalRanges(inputs) {
    let ranges = 0;
    
    // PT ranges (8 max)
    const ptStops = inputs.annual_pt_stops || 0;
    if (ptStops >= 600) {
      if (ptStops <= 7968) ranges += 1;
      else if (ptStops <= 15936) ranges += 2;
      else if (ptStops <= 23904) ranges += 3;
      else if (ptStops <= 31872) ranges += 4;
      else if (ptStops <= 39840) ranges += 5;
      else if (ptStops <= 47808) ranges += 6;
      else if (ptStops <= 55776) ranges += 7;
      else ranges += 8;
    }
    
    // KT ranges (4 max)
    const ktStops = inputs.annual_kt_stops || 0;
    if (ktStops >= 900) {
      if (ktStops <= 4781) ranges += 1;
      else if (ktStops <= 9562) ranges += 2;
      else if (ktStops <= 14342) ranges += 3;
      else ranges += 4;
    }
    
    // OT ranges (8 max)
    const otStops = inputs.annual_ot_stops || 0;
    if (otStops >= 800) {
      if (otStops <= 3187) ranges += 1;
      else if (otStops <= 6374) ranges += 2;
      else if (otStops <= 9562) ranges += 3;
      else if (otStops <= 12749) ranges += 4;
      else if (otStops <= 15936) ranges += 5;
      else if (otStops <= 19123) ranges += 6;
      else if (otStops <= 22310) ranges += 7;
      else ranges += 8;
    }
    
    // ATech ranges (4 max)
    const atechStops = inputs.annual_atech_stops || 0;
    if (atechStops >= 900) {
      if (atechStops <= 1793) ranges += 1;
      else if (atechStops <= 3586) ranges += 2;
      else if (atechStops <= 5378) ranges += 3;
      else ranges += 4;
    }
    
    // CC ranges (8 max)
    const ccStops = inputs.annual_cc_stops || 0;
    if (ccStops >= 100) {
      if (ccStops <= 2250) ranges += 1;
      else if (ccStops <= 4500) ranges += 2;
      else if (ccStops <= 6750) ranges += 3;
      else if (ccStops <= 9000) ranges += 4;
      else if (ccStops <= 11250) ranges += 5;
      else if (ccStops <= 13500) ranges += 6;
      else if (ccStops <= 15750) ranges += 7;
      else ranges += 8;
    }
    
    // DT range (1 if authorized)
    if (inputs.has_driver_training) ranges += 1;
    
    // AT range (1 if authorized)
    if (inputs.has_aquatic_therapy) ranges += 1;
    
    return ranges;
  },

  // Helper to calculate PT+KT+OT ranges combined
  calculatePTKTOTRanges(inputs) {
    let ranges = 0;
    
    const ptStops = inputs.annual_pt_stops || 0;
    if (ptStops >= 600) {
      if (ptStops <= 7968) ranges += 1;
      else if (ptStops <= 15936) ranges += 2;
      else if (ptStops <= 23904) ranges += 3;
      else if (ptStops <= 31872) ranges += 4;
      else if (ptStops <= 39840) ranges += 5;
      else if (ptStops <= 47808) ranges += 6;
      else if (ptStops <= 55776) ranges += 7;
      else ranges += 8;
    }
    
    const ktStops = inputs.annual_kt_stops || 0;
    if (ktStops >= 900) {
      if (ktStops <= 4781) ranges += 1;
      else if (ktStops <= 9562) ranges += 2;
      else if (ktStops <= 14342) ranges += 3;
      else ranges += 4;
    }
    
    const otStops = inputs.annual_ot_stops || 0;
    if (otStops >= 800) {
      if (otStops <= 3187) ranges += 1;
      else if (otStops <= 6374) ranges += 2;
      else if (otStops <= 9562) ranges += 3;
      else if (otStops <= 12749) ranges += 4;
      else if (otStops <= 15936) ranges += 5;
      else if (otStops <= 19123) ranges += 6;
      else if (otStops <= 22310) ranges += 7;
      else ranges += 8;
    }
    
    return ranges;
  },

  functionalAreas: [
    // =========================================================================
    // FA 1: PMR SVC RANGE CALCULATION (Meta - no physical rooms, 0 NSF)
    // =========================================================================
    {
      id: 'FA1',
      name: 'PMR Svc Range Calculation',
      rooms: [
        // Range calculation rooms have 0 NSF - they are used for logic only
        // SC133, SC134, SC135, SC136, SC137, SC138, SC139
      ]
    },

    // =========================================================================
    // FA 2: PMR SVC RECEPTION AREA
    // =========================================================================
    {
      id: 'FA2',
      name: 'PMR Svc Reception Area',
      rooms: [
        {
          // Room 1: PMR Svc General Waiting (SB003)
          id: 'PMR-FA2-01',
          name: 'PMR Svc General Waiting',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let nsf = 240;
            if (ranges >= 3 && ranges <= 4) nsf = 275;
            else if (ranges >= 5 && ranges <= 6) nsf = 310;
            else if (ranges >= 7 && ranges <= 8) nsf = 350;
            else if (ranges >= 9 && ranges <= 12) nsf = 415;
            else if (ranges >= 13 && ranges <= 16) nsf = 490;
            else if (ranges >= 17 && ranges <= 20) nsf = 530;
            else if (ranges >= 21 && ranges <= 24) nsf = 555;
            else if (ranges >= 25 && ranges <= 28) nsf = 615;
            else if (ranges >= 29 && ranges <= 32) nsf = 660;
            else if (ranges >= 33) nsf = 680;
            return [{ roomCode: 'SB003', roomName: 'PMR Svc General Waiting', nsf, quantity: 1 }];
          }
        },
        {
          // Room 2: PMR Svc Family Waiting (SB051)
          id: 'PMR-FA2-02',
          name: 'PMR Svc Family Waiting',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let nsf = 125;
            if (ranges >= 6 && ranges <= 17) nsf = 200;
            else if (ranges >= 18) nsf = 225;
            return [{ roomCode: 'SB051', roomName: 'PMR Svc Family Waiting', nsf, quantity: 1 }];
          }
        },
        {
          // Room 3: PMR Svc Veteran Electronic Check-in (SC165)
          id: 'PMR-FA2-03',
          name: 'PMR Svc Veteran Electronic Check-in',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let quantity = 1;
            if (ranges >= 6 && ranges <= 11) quantity = 2;
            else if (ranges >= 12 && ranges <= 17) quantity = 3;
            else if (ranges >= 18 && ranges <= 25) quantity = 4;
            else if (ranges >= 26) quantity = 5;
            return [{ roomCode: 'SC165', roomName: 'PMR Svc Veteran Electronic Check-in', nsf: 55, quantity }];
          }
        },
        {
          // Room 4: PMR Svc Reception (SC183)
          id: 'PMR-FA2-04',
          name: 'PMR Svc Reception',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let nsf = 85;
            if (ranges >= 6) nsf = 260;
            return [{ roomCode: 'SC183', roomName: 'PMR Svc Reception', nsf, quantity: 1 }];
          }
        },
        {
          // Room 5: PMR Svc Scheduling Workstation (SS218)
          id: 'PMR-FA2-05',
          name: 'PMR Svc Scheduling Workstation',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let quantity = 1;
            if (ranges >= 18) quantity = 2;
            return [{ roomCode: 'SS218', roomName: 'PMR Svc Scheduling Workstation', nsf: 56, quantity }];
          }
        },
        {
          // Room 6: PMR Svc Female Visitor Toilet (SB202)
          id: 'PMR-FA2-06',
          name: 'PMR Svc Female Visitor Toilet',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let quantity = 1;
            if (ranges >= 12) quantity = 2;
            return [{ roomCode: 'SB202', roomName: 'PMR Svc Female Visitor Toilet', nsf: 60, quantity }];
          }
        },
        {
          // Room 7: PMR Svc Male Visitor Toilet (SB203)
          id: 'PMR-FA2-07',
          name: 'PMR Svc Male Visitor Toilet',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let quantity = 1;
            if (ranges >= 12) quantity = 2;
            return [{ roomCode: 'SB203', roomName: 'PMR Svc Male Visitor Toilet', nsf: 60, quantity }];
          }
        },
        {
          // Room 8: PMR Svc Family Toilet (SB136)
          id: 'PMR-FA2-08',
          name: 'PMR Svc Family Toilet',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 6) return [];
            return [{ roomCode: 'SB136', roomName: 'PMR Svc Family Toilet', nsf: 80, quantity: 1 }];
          }
        },
        {
          // Room 9: PMR Svc Wheelchair Alcove (SB262)
          id: 'PMR-FA2-09',
          name: 'PMR Svc Wheelchair Alcove',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let quantity = 1;
            if (ranges >= 6 && ranges <= 11) quantity = 2;
            else if (ranges >= 12 && ranges <= 25) quantity = 3;
            else if (ranges >= 26) quantity = 4;
            return [{ roomCode: 'SB262', roomName: 'PMR Svc Wheelchair Alcove', nsf: 30, quantity }];
          }
        },
        {
          // Room 10: PMR Svc Water Fountain Alcove (SB122)
          id: 'PMR-FA2-10',
          name: 'PMR Svc Water Fountain Alcove',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let quantity = 1;
            if (ranges >= 18) quantity = 2;
            return [{ roomCode: 'SB122', roomName: 'PMR Svc Water Fountain Alcove', nsf: 20, quantity }];
          }
        }
      ]
    },

    // =========================================================================
    // FA 3: PMR SVC COMMON PATIENT AREA
    // =========================================================================
    {
      id: 'FA3',
      name: 'PMR Svc Common Patient Area',
      rooms: [
        {
          // Room 1: PMR Svc Patient Accessible Waiting (SB071)
          id: 'PMR-FA3-01',
          name: 'PMR Svc Patient Accessible Waiting',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let nsf = 105;
            if (ranges >= 18) nsf = 135;
            return [{ roomCode: 'SB071', roomName: 'PMR Svc Patient Accessible Waiting', nsf, quantity: 1 }];
          }
        },
        {
          // Room 2: PMR Svc Height/Weight Accessible Station Alcove (SC066)
          id: 'PMR-FA3-02',
          name: 'PMR Svc Height/Weight Accessible Station Alcove',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let quantity = 1;
            if (ranges >= 12) quantity = 2;
            return [{ roomCode: 'SC066', roomName: 'PMR Svc Height/Weight Accessible Station Alcove', nsf: 60, quantity }];
          }
        },
        {
          // Room 3: PMR Svc Veteran Electronic Check-out (SC165)
          id: 'PMR-FA3-03',
          name: 'PMR Svc Veteran Electronic Check-out',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let quantity = 1;
            if (ranges >= 12) quantity = 2;
            return [{ roomCode: 'SC165', roomName: 'PMR Svc Veteran Electronic Check-out', nsf: 55, quantity }];
          }
        },
        {
          // Room 4: Exam Room, PMR Svc (CT011)
          id: 'PMR-FA3-04',
          name: 'Exam Room, PMR Svc',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let quantity = 1;
            if (ranges >= 12) quantity = 2;
            return [{ roomCode: 'CT011', roomName: 'Exam Room, PMR Svc', nsf: 145, quantity }];
          }
        },
        {
          // Room 5: Bariatric Exam Room, PMR Svc (CT012)
          id: 'PMR-FA3-05',
          name: 'Bariatric Exam Room, PMR Svc',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            return [{ roomCode: 'CT012', roomName: 'Bariatric Exam Room, PMR Svc', nsf: 170, quantity: 1 }];
          }
        },
        {
          // Room 6: Procedure Room, PMR Svc (CT013)
          id: 'PMR-FA3-06',
          name: 'Procedure Room, PMR Svc',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 6) return [];
            return [{ roomCode: 'CT013', roomName: 'Procedure Room, PMR Svc', nsf: 200, quantity: 1 }];
          }
        },
        {
          // Room 7: General Treatment Room, PMR Svc (CT014)
          id: 'PMR-FA3-07',
          name: 'General Treatment Room, PMR Svc',
          calculate: (inputs) => {
            const ptktotRanges = CHAPTER_270.calculatePTKTOTRanges(inputs);
            if (ptktotRanges < 1) return [];
            let quantity = 1;
            if (ptktotRanges >= 4 && ptktotRanges <= 6) quantity = 2;
            else if (ptktotRanges >= 7 && ptktotRanges <= 9) quantity = 3;
            else if (ptktotRanges >= 10 && ptktotRanges <= 12) quantity = 4;
            else if (ptktotRanges >= 13 && ptktotRanges <= 15) quantity = 5;
            else if (ptktotRanges > 15) quantity = 6;
            return [{ roomCode: 'CT014', roomName: 'General Treatment Room, PMR Svc', nsf: 165, quantity }];
          }
        },
        {
          // Room 8: Specialty Treatment Room, PMR Svc (CT015)
          id: 'PMR-FA3-08',
          name: 'Specialty Treatment Room, PMR Svc',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let quantity = 1;
            if (ranges >= 16) quantity = 2;
            return [{ roomCode: 'CT015', roomName: 'Specialty Treatment Room, PMR Svc', nsf: 200, quantity }];
          }
        },
        {
          // Room 9: Specialty Care Exam Room, PMR Svc (CT018)
          id: 'PMR-FA3-09',
          name: 'Specialty Care Exam Room, PMR Svc',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let quantity = 1;
            if (ranges >= 12) quantity = 2;
            return [{ roomCode: 'CT018', roomName: 'Specialty Care Exam Room, PMR Svc', nsf: 175, quantity }];
          }
        },
        {
          // Room 10: PMR Svc Specialty Care Universal Patient Toilet (SB201)
          id: 'PMR-FA3-10',
          name: 'PMR Svc Specialty Care Universal Patient Toilet',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let quantity = 1;
            if (ranges >= 12) quantity = 2;
            return [{ roomCode: 'SB201', roomName: 'PMR Svc Specialty Care Universal Patient Toilet', nsf: 60, quantity }];
          }
        },
        {
          // Room 11: Specialty Care Exam Storage Room, PMR Svc (CT019)
          id: 'PMR-FA3-11',
          name: 'Specialty Care Exam Storage Room, PMR Svc',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let quantity = 1;
            if (ranges >= 12) quantity = 2;
            return [{ roomCode: 'CT019', roomName: 'Specialty Care Exam Storage Room, PMR Svc', nsf: 30, quantity }];
          }
        },
        {
          // Room 12: Cardiopulmonary Rehabilitation Room, PMR Svc (CT021)
          id: 'PMR-FA3-12',
          name: 'Cardiopulmonary Rehabilitation Room, PMR Svc',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 6) return [];
            return [{ roomCode: 'CT021', roomName: 'Cardiopulmonary Rehabilitation Room, PMR Svc', nsf: 400, quantity: 1 }];
          }
        },
        {
          // Room 13: PMR Svc Consult Room (SC267)
          id: 'PMR-FA3-13',
          name: 'PMR Svc Consult Room',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let quantity = 1;
            if (ranges >= 16) quantity = 2;
            return [{ roomCode: 'SC267', roomName: 'PMR Svc Consult Room', nsf: 125, quantity }];
          }
        },
        {
          // Room 14: PMR Svc Patient Universal Toilet (SB201)
          id: 'PMR-FA3-14',
          name: 'PMR Svc Patient Universal Toilet',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let quantity = 2;
            if (ranges >= 16) quantity = 3;
            return [{ roomCode: 'SB201', roomName: 'PMR Svc Patient Universal Toilet', nsf: 60, quantity }];
          }
        },
        {
          // Room 15: PMR Svc Bariatric Patient Toilet (SB163)
          id: 'PMR-FA3-15',
          name: 'PMR Svc Bariatric Patient Toilet',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            return [{ roomCode: 'SB163', roomName: 'PMR Svc Bariatric Patient Toilet', nsf: 75, quantity: 1 }];
          }
        },
        {
          // Room 16: PMR Svc Patient Personal Property Locker (SB139)
          id: 'PMR-FA3-16',
          name: 'PMR Svc Patient Personal Property Locker',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let quantity = 1;
            if (ranges >= 6 && ranges <= 15) quantity = 2;
            else if (ranges >= 16) quantity = 3;
            return [{ roomCode: 'SB139', roomName: 'PMR Svc Patient Personal Property Locker', nsf: 20, quantity }];
          }
        },
        {
          // Room 17: Multipurpose Group Room, PMR Svc (CT024)
          id: 'PMR-FA3-17',
          name: 'Multipurpose Group Room, PMR Svc',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let quantity = 1;
            if (ranges >= 6) quantity = 2;
            return [{ roomCode: 'CT024', roomName: 'Multipurpose Group Room, PMR Svc', nsf: 425, quantity }];
          }
        },
        {
          // Room 18: Multipurpose Group Room Storage Room, PMR Svc (CT025)
          id: 'PMR-FA3-18',
          name: 'Multipurpose Group Room Storage Room, PMR Svc',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let quantity = 1;
            if (ranges >= 6) quantity = 2;
            return [{ roomCode: 'CT025', roomName: 'Multipurpose Group Room Storage Room, PMR Svc', nsf: 100, quantity }];
          }
        },
        {
          // Room 19: Multi-function Room, PMR Svc (CT026)
          id: 'PMR-FA3-19',
          name: 'Multi-function Room, PMR Svc',
          calculate: (inputs) => {
            if (!inputs.has_multifunction_room) return [];
            return [{ roomCode: 'CT026', roomName: 'Multi-function Room, PMR Svc', nsf: 4700, quantity: 1 }];
          }
        },
        {
          // Room 20: Multi-function Storage Room, PMR Svc (CT027)
          id: 'PMR-FA3-20',
          name: 'Multi-function Storage Room, PMR Svc',
          calculate: (inputs) => {
            if (!inputs.has_multifunction_room) return [];
            return [{ roomCode: 'CT027', roomName: 'Multi-function Storage Room, PMR Svc', nsf: 200, quantity: 1 }];
          }
        },
        {
          // Room 21: PMR Svc Medication Alcove (SV581)
          id: 'PMR-FA3-21',
          name: 'PMR Svc Medication Alcove',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1 || ranges > 5) return [];
            return [{ roomCode: 'SV581', roomName: 'PMR Svc Medication Alcove', nsf: 40, quantity: 1 }];
          }
        },
        {
          // Room 22: PMR Svc Medication Room (SV583)
          id: 'PMR-FA3-22',
          name: 'PMR Svc Medication Room',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 6) return [];
            let nsf = 80;
            if (ranges >= 16) nsf = 100;
            return [{ roomCode: 'SV583', roomName: 'PMR Svc Medication Room', nsf, quantity: 1 }];
          }
        }
      ]
    },

    // =========================================================================
    // FA 4: PMR SVC COMMON CLINICAL STAFF AREA
    // =========================================================================
    {
      id: 'FA4',
      name: 'PMR Svc Common Clinical Staff Area',
      rooms: [
        {
          // Room 1: PMR Svc Physiatrist Team Room (SC243)
          id: 'PMR-FA4-01',
          name: 'PMR Svc Physiatrist Team Room',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let nsf = 120;
            if (ranges === 2) nsf = 180;
            else if (ranges === 3) nsf = 240;
            else if (ranges === 4) nsf = 300;
            else if (ranges === 5) nsf = 360;
            else if (ranges === 6) nsf = 420;
            else if (ranges === 7) nsf = 480;
            else if (ranges >= 8) nsf = 540;
            return [{ roomCode: 'SC243', roomName: 'PMR Svc Physiatrist Team Room', nsf, quantity: 1 }];
          }
        },
        {
          // Room 2: Therapist Workroom, PMR Svc (CT028)
          id: 'PMR-FA4-02',
          name: 'Therapist Workroom, PMR Svc',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let quantity = 1;
            if (ranges >= 3 && ranges <= 6) quantity = 2;
            else if (ranges >= 7 && ranges <= 9) quantity = 3;
            else if (ranges >= 10 && ranges <= 12) quantity = 4;
            else if (ranges >= 13 && ranges <= 16) quantity = 5;
            else if (ranges >= 17 && ranges <= 19) quantity = 6;
            else if (ranges >= 20 && ranges <= 22) quantity = 7;
            else if (ranges >= 23 && ranges <= 26) quantity = 8;
            else if (ranges >= 27 && ranges <= 29) quantity = 9;
            else if (ranges >= 30) quantity = 10;
            return [{ roomCode: 'CT028', roomName: 'Therapist Workroom, PMR Svc', nsf: 500, quantity }];
          }
        },
        {
          // Room 3: PMR Svc Clinical Supervisor Office (SS204)
          id: 'PMR-FA4-03',
          name: 'PMR Svc Clinical Supervisor Office',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let quantity = 1;
            if (ranges >= 16) quantity = 2;
            return [{ roomCode: 'SS204', roomName: 'PMR Svc Clinical Supervisor Office', nsf: 100, quantity }];
          }
        },
        {
          // Room 4: PMR Svc Single-User Tele-Therapy Room (SC249)
          id: 'PMR-FA4-04',
          name: 'PMR Svc Single-User Tele-Therapy Room',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let quantity = 1;
            if (ranges >= 9 && ranges <= 16) quantity = 2;
            else if (ranges >= 17 && ranges <= 24) quantity = 3;
            else if (ranges >= 25) quantity = 4;
            return [{ roomCode: 'SC249', roomName: 'PMR Svc Single-User Tele-Therapy Room', nsf: 120, quantity }];
          }
        },
        {
          // Room 5: PMR Svc Multi-Discipline Tele-Therapy Room (SC253)
          id: 'PMR-FA4-05',
          name: 'PMR Svc Multi-Discipline Tele-Therapy Room',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let quantity = 1;
            if (ranges >= 17) quantity = 2;
            return [{ roomCode: 'SC253', roomName: 'PMR Svc Multi-Discipline Tele-Therapy Room', nsf: 200, quantity }];
          }
        },
        {
          // Room 6: PMR Svc Copy/Supply Room (SS272)
          id: 'PMR-FA4-06',
          name: 'PMR Svc Copy/Supply Room',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let nsf = 60;
            if (ranges >= 5 && ranges <= 16) nsf = 80;
            else if (ranges >= 17) nsf = 100;
            return [{ roomCode: 'SS272', roomName: 'PMR Svc Copy/Supply Room', nsf, quantity: 1 }];
          }
        },
        {
          // Room 7: PMR Svc Universal Staff Toilet (SB191)
          id: 'PMR-FA4-07',
          name: 'PMR Svc Universal Staff Toilet',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let quantity = 1;
            if (ranges >= 5 && ranges <= 13) quantity = 2;
            else if (ranges >= 14 && ranges <= 22) quantity = 3;
            else if (ranges >= 23) quantity = 4;
            return [{ roomCode: 'SB191', roomName: 'PMR Svc Universal Staff Toilet', nsf: 60, quantity }];
          }
        }
      ]
    },

    // =========================================================================
    // FA 5: PHYSICAL THERAPY (PT) AREA
    // =========================================================================
    {
      id: 'FA5',
      name: 'Physical Therapy (PT) Area',
      rooms: [
        {
          // Room 1: PT Treatment Station A, PMR Svc (CT031) - 12 NSF
          id: 'PMR-FA5-01',
          name: 'PT Treatment Station A, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_pt_stops || 0;
            if (stops < 600) return [];
            let quantity = 10;
            if (stops >= 7969 && stops <= 15936) quantity = 12;
            else if (stops >= 15937 && stops <= 23904) quantity = 14;
            else if (stops >= 23905 && stops <= 39840) quantity = 16;
            else if (stops >= 39841) quantity = 18;
            return [{ roomCode: 'CT031', roomName: 'PT Treatment Station A, PMR Svc', nsf: 12, quantity }];
          }
        },
        {
          // Room 2: PT Treatment Station B, PMR Svc (CT032) - 24 NSF
          id: 'PMR-FA5-02',
          name: 'PT Treatment Station B, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_pt_stops || 0;
            if (stops < 600) return [];
            let quantity = 3;
            if (stops >= 15937 && stops <= 31872) quantity = 5;
            else if (stops >= 31873 && stops <= 47808) quantity = 6;
            else if (stops >= 47809) quantity = 8;
            return [{ roomCode: 'CT032', roomName: 'PT Treatment Station B, PMR Svc', nsf: 24, quantity }];
          }
        },
        {
          // Room 3: PT Treatment Station D, PMR Svc (CT034) - 60 NSF
          id: 'PMR-FA5-03',
          name: 'PT Treatment Station D, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_pt_stops || 0;
            if (stops < 600) return [];
            let quantity = 3;
            if (stops >= 7969 && stops <= 15936) quantity = 4;
            else if (stops >= 15937 && stops <= 31872) quantity = 6;
            else if (stops >= 31873 && stops <= 47808) quantity = 7;
            else if (stops >= 47809) quantity = 8;
            return [{ roomCode: 'CT034', roomName: 'PT Treatment Station D, PMR Svc', nsf: 60, quantity }];
          }
        },
        {
          // Room 4: PT Treatment Station E, PMR Svc (CT035) - 72 NSF
          id: 'PMR-FA5-04',
          name: 'PT Treatment Station E, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_pt_stops || 0;
            if (stops < 600) return [];
            let quantity = 3;
            if (stops >= 7969 && stops <= 15936) quantity = 4;
            else if (stops >= 15937 && stops <= 47808) quantity = 6;
            else if (stops >= 47809) quantity = 10;
            return [{ roomCode: 'CT035', roomName: 'PT Treatment Station E, PMR Svc', nsf: 72, quantity }];
          }
        },
        {
          // Room 5: PT Treatment Station F, PMR Svc (CT036) - 96 NSF
          id: 'PMR-FA5-05',
          name: 'PT Treatment Station F, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_pt_stops || 0;
            if (stops < 600) return [];
            let quantity = 3;
            if (stops >= 7969 && stops <= 15936) quantity = 4;
            else if (stops >= 15937 && stops <= 47808) quantity = 6;
            else if (stops >= 47809) quantity = 7;
            return [{ roomCode: 'CT036', roomName: 'PT Treatment Station F, PMR Svc', nsf: 96, quantity }];
          }
        },
        {
          // Room 6: PT Treatment Station G, PMR Svc (CT037) - 120 NSF
          id: 'PMR-FA5-06',
          name: 'PT Treatment Station G, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_pt_stops || 0;
            if (stops < 600) return [];
            let quantity = 1;
            if (stops >= 23905 && stops <= 47808) quantity = 2;
            else if (stops >= 47809) quantity = 3;
            return [{ roomCode: 'CT037', roomName: 'PT Treatment Station G, PMR Svc', nsf: 120, quantity }];
          }
        },
        {
          // Room 7: PT Treatment Station H, PMR Svc (CT038) - 216 NSF
          id: 'PMR-FA5-07',
          name: 'PT Treatment Station H, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_pt_stops || 0;
            if (stops < 600) return [];
            let quantity = 1;
            if (stops >= 23905 && stops <= 47808) quantity = 2;
            else if (stops >= 47809) quantity = 3;
            return [{ roomCode: 'CT038', roomName: 'PT Treatment Station H, PMR Svc', nsf: 216, quantity }];
          }
        },
        {
          // Room 8: PT Veteran Wellness Station, PMR Svc (CT043) - 12 NSF
          id: 'PMR-FA5-08',
          name: 'PT Veteran Wellness Station, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_pt_stops || 0;
            if (stops < 600) return [];
            let quantity = 2;
            if (stops >= 7969 && stops <= 15936) quantity = 3;
            else if (stops >= 15937 && stops <= 23904) quantity = 4;
            else if (stops >= 23905 && stops <= 31872) quantity = 5;
            else if (stops >= 31873) quantity = 6;
            return [{ roomCode: 'CT043', roomName: 'PT Veteran Wellness Station, PMR Svc', nsf: 12, quantity }];
          }
        },
        {
          // Room 9: PT Treatment Station Support, PMR Svc (CT048) - 60 NSF
          id: 'PMR-FA5-09',
          name: 'PT Treatment Station Support, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_pt_stops || 0;
            if (stops < 600) return [];
            let quantity = 4;
            if (stops >= 7969 && stops <= 15936) quantity = 5;
            else if (stops >= 15937 && stops <= 23904) quantity = 6;
            else if (stops >= 23905 && stops <= 31872) quantity = 7;
            else if (stops >= 31873 && stops <= 39840) quantity = 8;
            else if (stops >= 39841 && stops <= 47808) quantity = 9;
            else if (stops >= 47809 && stops <= 55776) quantity = 10;
            else if (stops >= 55777) quantity = 11;
            return [{ roomCode: 'CT048', roomName: 'PT Treatment Station Support, PMR Svc', nsf: 60, quantity }];
          }
        },
        {
          // Room 10: PT Racetrack Gait Lane, PMR Svc (CT042) - 1115 NSF base
          id: 'PMR-FA5-10',
          name: 'PT Racetrack Gait Lane, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_pt_stops || 0;
            if (stops < 23905) return [];
            let nsf = 1115;
            if (stops >= 31873 && stops <= 39840) nsf = 1245;
            else if (stops >= 39841 && stops <= 47808) nsf = 1360;
            else if (stops >= 47809 && stops <= 55776) nsf = 1475;
            else if (stops >= 55777) nsf = 1590;
            return [{ roomCode: 'CT042', roomName: 'PT Racetrack Gait Lane, PMR Svc', nsf, quantity: 1 }];
          }
        },
        {
          // Room 11: PT Straight Gait Lane, PMR Svc (CT049) - 330 NSF base
          id: 'PMR-FA5-11',
          name: 'PT Straight Gait Lane, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_pt_stops || 0;
            if (stops < 600 || stops > 23904) return [];
            let nsf = 330;
            if (stops >= 7969 && stops <= 15936) nsf = 395;
            else if (stops >= 15937 && stops <= 23904) nsf = 460;
            return [{ roomCode: 'CT049', roomName: 'PT Straight Gait Lane, PMR Svc', nsf, quantity: 1 }];
          }
        },
        {
          // Room 12: PT Treatment Cubicle, PMR Svc (CT041) - 150 NSF
          id: 'PMR-FA5-12',
          name: 'PT Treatment Cubicle, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_pt_stops || 0;
            if (stops < 600) return [];
            let quantity = 2;
            if (stops >= 15937 && stops <= 47808) quantity = 3;
            else if (stops >= 47809) quantity = 4;
            return [{ roomCode: 'CT041', roomName: 'PT Treatment Cubicle, PMR Svc', nsf: 150, quantity }];
          }
        },
        {
          // Room 13: PMR Svc PT Linen Alcove, EMS (SC467) - 15 NSF
          id: 'PMR-FA5-13',
          name: 'PMR Svc PT Linen Alcove',
          calculate: (inputs) => {
            const stops = inputs.annual_pt_stops || 0;
            if (stops < 600) return [];
            let quantity = 2;
            if (stops >= 31873 && stops <= 47808) quantity = 3;
            else if (stops >= 47809) quantity = 4;
            return [{ roomCode: 'SC467', roomName: 'PMR Svc PT Linen Alcove', nsf: 15, quantity }];
          }
        },
        {
          // Room 14: PT Equipment Storage Room, PMR Svc (CT044) - 250 NSF base
          id: 'PMR-FA5-14',
          name: 'PT Equipment Storage Room, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_pt_stops || 0;
            if (stops < 600) return [];
            let nsf = 250;
            if (stops >= 15937 && stops <= 31872) nsf = 300;
            else if (stops >= 31873 && stops <= 47808) nsf = 350;
            else if (stops >= 47809) nsf = 400;
            return [{ roomCode: 'CT044', roomName: 'PT Equipment Storage Room, PMR Svc', nsf, quantity: 1 }];
          }
        },
        {
          // Room 15: PT Supply Storage Room, PMR Svc (CT045) - 150 NSF base
          id: 'PMR-FA5-15',
          name: 'PT Supply Storage Room, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_pt_stops || 0;
            if (stops < 600) return [];
            let nsf = 150;
            if (stops >= 15937 && stops <= 31872) nsf = 200;
            else if (stops >= 31873 && stops <= 47808) nsf = 250;
            else if (stops >= 47809) nsf = 300;
            return [{ roomCode: 'CT045', roomName: 'PT Supply Storage Room, PMR Svc', nsf, quantity: 1 }];
          }
        },
        {
          // Room 16: PT Exoskeleton Storage Room, PMR Svc (CT047) - 150 NSF base
          id: 'PMR-FA5-16',
          name: 'PT Exoskeleton Storage Room, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_pt_stops || 0;
            if (stops < 600) return [];
            let nsf = 150;
            if (stops >= 31873) nsf = 200;
            return [{ roomCode: 'CT047', roomName: 'PT Exoskeleton Storage Room, PMR Svc', nsf, quantity: 1 }];
          }
        },
        {
          // Room 17: PT Prosthetic/Sensory Aids Supplies Storage Room, PMR Svc (CT046) - 150 NSF base
          id: 'PMR-FA5-17',
          name: 'PT Prosthetic/Sensory Aids Supplies Storage Room, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_pt_stops || 0;
            if (stops < 600) return [];
            let nsf = 150;
            if (stops >= 15937 && stops <= 47808) nsf = 200;
            else if (stops >= 47809) nsf = 250;
            return [{ roomCode: 'CT046', roomName: 'PT Prosthetic/Sensory Aids Supplies Storage Room, PMR Svc', nsf, quantity: 1 }];
          }
        },
        {
          // Room 18: PMR Svc PT Touch-down Workstation (SS215) - 50 NSF
          id: 'PMR-FA5-18',
          name: 'PMR Svc PT Touch-down Workstation',
          calculate: (inputs) => {
            const stops = inputs.annual_pt_stops || 0;
            if (stops < 600) return [];
            let quantity = 2;
            if (stops >= 31873) quantity = 3;
            return [{ roomCode: 'SS215', roomName: 'PMR Svc PT Touch-down Workstation', nsf: 50, quantity }];
          }
        },
        {
          // Room 19: PMR Svc PT Supervisor Office (SS204) - 100 NSF
          id: 'PMR-FA5-19',
          name: 'PMR Svc PT Supervisor Office',
          calculate: (inputs) => {
            const stops = inputs.annual_pt_stops || 0;
            if (stops < 600) return [];
            return [{ roomCode: 'SS204', roomName: 'PMR Svc PT Supervisor Office', nsf: 100, quantity: 1 }];
          }
        }
      ]
    },

    // =========================================================================
    // FA 6: KINESIOTHERAPY (KT) AREA
    // =========================================================================
    {
      id: 'FA6',
      name: 'Kinesiotherapy (KT) Area',
      rooms: [
        {
          // Room 1: KT Treatment Station A, PMR Svc (CT051) - 12 NSF
          id: 'PMR-FA6-01',
          name: 'KT Treatment Station A, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_kt_stops || 0;
            if (stops < 900) return [];
            let quantity = 6;
            if (stops >= 4782 && stops <= 9562) quantity = 8;
            else if (stops >= 9563 && stops <= 14342) quantity = 10;
            else if (stops >= 14343) quantity = 12;
            return [{ roomCode: 'CT051', roomName: 'KT Treatment Station A, PMR Svc', nsf: 12, quantity }];
          }
        },
        {
          // Room 2: KT Treatment Station B, PMR Svc (CT052) - 24 NSF
          id: 'PMR-FA6-02',
          name: 'KT Treatment Station B, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_kt_stops || 0;
            if (stops < 900) return [];
            let quantity = 3;
            if (stops >= 4782 && stops <= 14342) quantity = 5;
            else if (stops >= 14343) quantity = 7;
            return [{ roomCode: 'CT052', roomName: 'KT Treatment Station B, PMR Svc', nsf: 24, quantity }];
          }
        },
        {
          // Room 3: KT Treatment Station D, PMR Svc (CT054) - 60 NSF
          id: 'PMR-FA6-03',
          name: 'KT Treatment Station D, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_kt_stops || 0;
            if (stops < 900) return [];
            let quantity = 6;
            if (stops >= 4782 && stops <= 9562) quantity = 8;
            else if (stops >= 9563 && stops <= 14342) quantity = 9;
            else if (stops >= 14343) quantity = 10;
            return [{ roomCode: 'CT054', roomName: 'KT Treatment Station D, PMR Svc', nsf: 60, quantity }];
          }
        },
        {
          // Room 4: KT Treatment Station E, PMR Svc (CT055) - 72 NSF
          id: 'PMR-FA6-04',
          name: 'KT Treatment Station E, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_kt_stops || 0;
            if (stops < 900) return [];
            let quantity = 6;
            if (stops >= 4782 && stops <= 9562) quantity = 8;
            else if (stops >= 9563 && stops <= 14342) quantity = 9;
            else if (stops >= 14343) quantity = 10;
            return [{ roomCode: 'CT055', roomName: 'KT Treatment Station E, PMR Svc', nsf: 72, quantity }];
          }
        },
        {
          // Room 5: KT Treatment Station F, PMR Svc (CT056) - 96 NSF
          id: 'PMR-FA6-05',
          name: 'KT Treatment Station F, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_kt_stops || 0;
            if (stops < 900) return [];
            let quantity = 3;
            if (stops >= 4782 && stops <= 14342) quantity = 5;
            else if (stops >= 14343) quantity = 7;
            return [{ roomCode: 'CT056', roomName: 'KT Treatment Station F, PMR Svc', nsf: 96, quantity }];
          }
        },
        {
          // Room 6: KT Treatment Station G, PMR Svc (CT057) - 120 NSF
          id: 'PMR-FA6-06',
          name: 'KT Treatment Station G, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_kt_stops || 0;
            if (stops < 900) return [];
            let quantity = 1;
            if (stops >= 4782 && stops <= 9562) quantity = 2;
            else if (stops >= 9563 && stops <= 14342) quantity = 3;
            else if (stops >= 14343) quantity = 4;
            return [{ roomCode: 'CT057', roomName: 'KT Treatment Station G, PMR Svc', nsf: 120, quantity }];
          }
        },
        {
          // Room 7: KT Treatment Station H, PMR Svc (CT058) - 216 NSF
          id: 'PMR-FA6-07',
          name: 'KT Treatment Station H, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_kt_stops || 0;
            if (stops < 900) return [];
            return [{ roomCode: 'CT058', roomName: 'KT Treatment Station H, PMR Svc', nsf: 216, quantity: 2 }];
          }
        },
        {
          // Room 8: KT Treatment Station I, PMR Svc (CT059) - 240 NSF
          id: 'PMR-FA6-08',
          name: 'KT Treatment Station I, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_kt_stops || 0;
            if (stops < 900) return [];
            let quantity = 1;
            if (stops >= 4782 && stops <= 9562) quantity = 2;
            else if (stops >= 9563 && stops <= 14342) quantity = 3;
            else if (stops >= 14343) quantity = 4;
            return [{ roomCode: 'CT059', roomName: 'KT Treatment Station I, PMR Svc', nsf: 240, quantity }];
          }
        },
        {
          // Room 9: KT Veteran Wellness Station, PMR Svc (CT062) - 12 NSF
          id: 'PMR-FA6-09',
          name: 'KT Veteran Wellness Station, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_kt_stops || 0;
            if (stops < 900) return [];
            let quantity = 2;
            if (stops >= 4782 && stops <= 9562) quantity = 3;
            else if (stops >= 9563 && stops <= 14342) quantity = 4;
            else if (stops >= 14343) quantity = 5;
            return [{ roomCode: 'CT062', roomName: 'KT Veteran Wellness Station, PMR Svc', nsf: 12, quantity }];
          }
        },
        {
          // Room 10: KT Treatment Station Support, PMR Svc (CT067) - 60 NSF
          id: 'PMR-FA6-10',
          name: 'KT Treatment Station Support, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_kt_stops || 0;
            if (stops < 900) return [];
            let quantity = 6;
            if (stops >= 4782 && stops <= 9562) quantity = 9;
            else if (stops >= 9563 && stops <= 14342) quantity = 11;
            else if (stops >= 14343) quantity = 14;
            return [{ roomCode: 'CT067', roomName: 'KT Treatment Station Support, PMR Svc', nsf: 60, quantity }];
          }
        },
        {
          // Room 11: KT Treatment Cubicle, PMR Svc (CT068) - 150 NSF
          id: 'PMR-FA6-11',
          name: 'KT Treatment Cubicle, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_kt_stops || 0;
            if (stops < 900) return [];
            let quantity = 2;
            if (stops >= 4782) quantity = 3;
            return [{ roomCode: 'CT068', roomName: 'KT Treatment Cubicle, PMR Svc', nsf: 150, quantity }];
          }
        },
        {
          // Room 12: KT Group Room, PMR Svc (CT063) - 340 NSF
          id: 'PMR-FA6-12',
          name: 'KT Group Room, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_kt_stops || 0;
            if (stops < 900) return [];
            return [{ roomCode: 'CT063', roomName: 'KT Group Room, PMR Svc', nsf: 340, quantity: 1 }];
          }
        },
        {
          // Room 13: PMR Svc KT Linen Alcove (SC467) - 15 NSF
          id: 'PMR-FA6-13',
          name: 'PMR Svc KT Linen Alcove',
          calculate: (inputs) => {
            const stops = inputs.annual_kt_stops || 0;
            if (stops < 900) return [];
            let quantity = 1;
            if (stops >= 4782 && stops <= 14342) quantity = 2;
            else if (stops >= 14343) quantity = 3;
            return [{ roomCode: 'SC467', roomName: 'PMR Svc KT Linen Alcove', nsf: 15, quantity }];
          }
        },
        {
          // Room 14: KT Equipment Storage Room, PMR Svc (CT064) - 150 NSF base
          id: 'PMR-FA6-14',
          name: 'KT Equipment Storage Room, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_kt_stops || 0;
            if (stops < 900) return [];
            let nsf = 150;
            if (stops >= 4782 && stops <= 14342) nsf = 240;
            else if (stops >= 14343) nsf = 300;
            return [{ roomCode: 'CT064', roomName: 'KT Equipment Storage Room, PMR Svc', nsf, quantity: 1 }];
          }
        },
        {
          // Room 15: KT Supply Storage Room, PMR Svc (CT065) - 150 NSF base
          id: 'PMR-FA6-15',
          name: 'KT Supply Storage Room, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_kt_stops || 0;
            if (stops < 900) return [];
            let nsf = 150;
            if (stops >= 9563) nsf = 200;
            return [{ roomCode: 'CT065', roomName: 'KT Supply Storage Room, PMR Svc', nsf, quantity: 1 }];
          }
        },
        {
          // Room 16: KT Prosthetic/Sensory Aids Supplies Storage Room, PMR Svc (CT066) - 150 NSF base
          id: 'PMR-FA6-16',
          name: 'KT Prosthetic/Sensory Aids Supplies Storage Room, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_kt_stops || 0;
            if (stops < 900) return [];
            let nsf = 150;
            if (stops >= 9563) nsf = 200;
            return [{ roomCode: 'CT066', roomName: 'KT Prosthetic/Sensory Aids Supplies Storage Room, PMR Svc', nsf, quantity: 1 }];
          }
        },
        {
          // Room 17: PMR Svc KT Touch-down Workstation (SS215) - 50 NSF
          id: 'PMR-FA6-17',
          name: 'PMR Svc KT Touch-down Workstation',
          calculate: (inputs) => {
            const stops = inputs.annual_kt_stops || 0;
            if (stops < 900) return [];
            let quantity = 2;
            if (stops >= 9563) quantity = 3;
            return [{ roomCode: 'SS215', roomName: 'PMR Svc KT Touch-down Workstation', nsf: 50, quantity }];
          }
        },
        {
          // Room 18: PMR Svc KT Supervisor Office (SS204) - 100 NSF
          id: 'PMR-FA6-18',
          name: 'PMR Svc KT Supervisor Office',
          calculate: (inputs) => {
            const stops = inputs.annual_kt_stops || 0;
            if (stops < 900) return [];
            return [{ roomCode: 'SS204', roomName: 'PMR Svc KT Supervisor Office', nsf: 100, quantity: 1 }];
          }
        }
      ]
    },

    // =========================================================================
    // FA 7: OCCUPATIONAL THERAPY (OT) AREA
    // =========================================================================
    {
      id: 'FA7',
      name: 'Occupational Therapy (OT) Area',
      rooms: [
        {
          // Room 1: OT Treatment Station A, PMR Svc (CT081) - 90 NSF
          id: 'PMR-FA7-01',
          name: 'OT Treatment Station A, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_ot_stops || 0;
            if (stops < 800) return [];
            let quantity = 3;
            if (stops >= 3188 && stops <= 6374) quantity = 4;
            else if (stops >= 6375 && stops <= 9562) quantity = 5;
            else if (stops >= 9563 && stops <= 12749) quantity = 6;
            else if (stops >= 12750 && stops <= 15936) quantity = 7;
            else if (stops >= 15937 && stops <= 19123) quantity = 8;
            else if (stops >= 19124 && stops <= 22310) quantity = 9;
            else if (stops >= 22311) quantity = 10;
            return [{ roomCode: 'CT081', roomName: 'OT Treatment Station A, PMR Svc', nsf: 90, quantity }];
          }
        },
        {
          id: 'PMR-FA7-02',
          name: 'OT Treatment Cubicle, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_ot_stops || 0;
            if (stops < 800) return [];
            let quantity = 2;
            if (stops >= 6375 && stops <= 15936) quantity = 3;
            else if (stops >= 15937) quantity = 4;
            return [{ roomCode: 'CT091', roomName: 'OT Treatment Cubicle, PMR Svc', nsf: 150, quantity }];
          }
        },
        {
          id: 'PMR-FA7-03',
          name: 'OT ADL Kitchen, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_ot_stops || 0;
            if (stops < 800) return [];
            return [{ roomCode: 'CT111', roomName: 'OT ADL Kitchen, PMR Svc', nsf: 225, quantity: 1 }];
          }
        },
        {
          id: 'PMR-FA7-04',
          name: 'OT ADL Bathroom, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_ot_stops || 0;
            if (stops < 800) return [];
            return [{ roomCode: 'CT112', roomName: 'OT ADL Bathroom, PMR Svc', nsf: 100, quantity: 1 }];
          }
        },
        {
          id: 'PMR-FA7-05',
          name: 'OT Equipment Storage Room, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_ot_stops || 0;
            if (stops < 800) return [];
            let nsf = 150;
            if (stops >= 6375 && stops <= 15936) nsf = 200;
            else if (stops >= 15937) nsf = 250;
            return [{ roomCode: 'CT106', roomName: 'OT Equipment Storage Room, PMR Svc', nsf, quantity: 1 }];
          }
        },
        {
          id: 'PMR-FA7-06',
          name: 'PMR Svc OT Supervisor Office',
          calculate: (inputs) => {
            const stops = inputs.annual_ot_stops || 0;
            if (stops < 800) return [];
            return [{ roomCode: 'SS204', roomName: 'PMR Svc OT Supervisor Office', nsf: 100, quantity: 1 }];
          }
        }
      ]
    },

    // =========================================================================
    // FA 8: ASSISTIVE TECHNOLOGY (ATECH) AREA
    // =========================================================================
    {
      id: 'FA8',
      name: 'Assistive Technology (ATech) Area',
      rooms: [
        {
          id: 'PMR-FA8-01',
          name: 'ATech Assessment/Training Room, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_atech_stops || 0;
            if (stops < 900) return [];
            let quantity = 1;
            if (stops >= 1794 && stops <= 3586) quantity = 2;
            else if (stops >= 3587 && stops <= 5378) quantity = 3;
            else if (stops >= 5379) quantity = 4;
            return [{ roomCode: 'CT121', roomName: 'ATech Assessment/Training Room, PMR Svc', nsf: 200, quantity }];
          }
        },
        {
          id: 'PMR-FA8-02',
          name: 'ATech Equipment Storage Room, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_atech_stops || 0;
            if (stops < 900) return [];
            let nsf = 150;
            if (stops >= 3587) nsf = 200;
            return [{ roomCode: 'CT124', roomName: 'ATech Equipment Storage Room, PMR Svc', nsf, quantity: 1 }];
          }
        }
      ]
    },

    // =========================================================================
    // FA 9: CHIROPRACTIC CARE (CC) AREA
    // =========================================================================
    {
      id: 'FA9',
      name: 'Chiropractic Care (CC) Area',
      rooms: [
        {
          id: 'PMR-FA9-01',
          name: 'CC Exam Room, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_cc_stops || 0;
            if (stops < 100) return [];
            let quantity = 1;
            if (stops >= 2251 && stops <= 4500) quantity = 2;
            else if (stops >= 4501 && stops <= 6750) quantity = 3;
            else if (stops >= 6751 && stops <= 9000) quantity = 4;
            else if (stops >= 9001 && stops <= 11250) quantity = 5;
            else if (stops >= 11251 && stops <= 13500) quantity = 6;
            else if (stops >= 13501 && stops <= 15750) quantity = 7;
            else if (stops >= 15751) quantity = 8;
            return [{ roomCode: 'CT131', roomName: 'CC Exam Room, PMR Svc', nsf: 145, quantity }];
          }
        },
        {
          id: 'PMR-FA9-02',
          name: 'CC Treatment Room, PMR Svc',
          calculate: (inputs) => {
            const stops = inputs.annual_cc_stops || 0;
            if (stops < 100) return [];
            let quantity = 1;
            if (stops >= 4501 && stops <= 9000) quantity = 2;
            else if (stops >= 9001) quantity = 3;
            return [{ roomCode: 'CT132', roomName: 'CC Treatment Room, PMR Svc', nsf: 165, quantity }];
          }
        }
      ]
    },

    // =========================================================================
    // FA 10: DRIVER TRAINING (DT) AREA
    // =========================================================================
    {
      id: 'FA10',
      name: 'Driver Training (DT) Area',
      rooms: [
        {
          id: 'PMR-FA10-01',
          name: 'DTC Driving Simulator Station, PMR Svc',
          calculate: (inputs) => {
            if (!inputs.has_driver_training) return [];
            return [{ roomCode: 'CT182', roomName: 'DTC Driving Simulator Station, PMR Svc', nsf: 250, quantity: 2 }];
          }
        },
        {
          id: 'PMR-FA10-02',
          name: 'DTC Clinical Assessment Room, PMR Svc',
          calculate: (inputs) => {
            if (!inputs.has_driver_training) return [];
            return [{ roomCode: 'CT181', roomName: 'DTC Clinical Assessment Room, PMR Svc', nsf: 200, quantity: 1 }];
          }
        },
        {
          id: 'PMR-FA10-03',
          name: 'DTC Vehicle Storage, PMR Svc',
          calculate: (inputs) => {
            if (!inputs.has_driver_training) return [];
            return [{ roomCode: 'CT186', roomName: 'DTC Vehicle Storage, PMR Svc', nsf: 600, quantity: 1 }];
          }
        }
      ]
    },

    // =========================================================================
    // FA 11: AQUATIC THERAPY (AT) AREA
    // =========================================================================
    {
      id: 'FA11',
      name: 'Aquatic Therapy (AT) Area',
      rooms: [
        {
          id: 'PMR-FA11-01',
          name: 'AT Therapy Pool, PMR Svc',
          calculate: (inputs) => {
            if (!inputs.has_aquatic_therapy) return [];
            return [{ roomCode: 'CT171', roomName: 'AT Therapy Pool, PMR Svc', nsf: 3500, quantity: 1 }];
          }
        },
        {
          id: 'PMR-FA11-02',
          name: 'AT Treadmill Pool, PMR Svc',
          calculate: (inputs) => {
            if (!inputs.has_aquatic_therapy) return [];
            return [{ roomCode: 'CT172', roomName: 'AT Treadmill Pool, PMR Svc', nsf: 550, quantity: 1 }];
          }
        },
        {
          id: 'PMR-FA11-03',
          name: 'AT Pool Deck, PMR Svc',
          calculate: (inputs) => {
            if (!inputs.has_aquatic_therapy) return [];
            return [{ roomCode: 'CT175', roomName: 'AT Pool Deck, PMR Svc', nsf: 1150, quantity: 1 }];
          }
        },
        {
          id: 'PMR-FA11-04',
          name: 'AT Patient Locker Room, PMR Svc',
          calculate: (inputs) => {
            if (!inputs.has_aquatic_therapy) return [];
            return [{ roomCode: 'SB209', roomName: 'AT Patient Locker Room, PMR Svc', nsf: 325, quantity: 2 }];
          }
        },
        {
          id: 'PMR-FA11-05',
          name: 'AT Pool Mechanical Room, PMR Svc',
          calculate: (inputs) => {
            if (!inputs.has_aquatic_therapy) return [];
            return [{ roomCode: 'CT179', roomName: 'AT Pool Mechanical Room, PMR Svc', nsf: 500, quantity: 1 }];
          }
        }
      ]
    },

    // =========================================================================
    // FA 12: PMR SVC WHEELCHAIR CLINIC AREA
    // =========================================================================
    {
      id: 'FA12',
      name: 'PMR Svc Wheelchair Clinic Area',
      rooms: [
        {
          id: 'PMR-FA12-01',
          name: 'Wheelchair Evaluation/Fitting Room, PMR Svc',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let quantity = 1;
            if (ranges >= 12) quantity = 2;
            return [{ roomCode: 'CT201', roomName: 'Wheelchair Evaluation/Fitting Room, PMR Svc', nsf: 300, quantity }];
          }
        },
        {
          id: 'PMR-FA12-02',
          name: 'Wheelchair Repair Workroom, PMR Svc',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            return [{ roomCode: 'CT202', roomName: 'Wheelchair Repair Workroom, PMR Svc', nsf: 350, quantity: 1 }];
          }
        },
        {
          id: 'PMR-FA12-03',
          name: 'Wheelchair Parts Storage Room, PMR Svc',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let nsf = 200;
            if (ranges >= 12) nsf = 300;
            return [{ roomCode: 'CT203', roomName: 'Wheelchair Parts Storage Room, PMR Svc', nsf, quantity: 1 }];
          }
        }
      ]
    },

    // =========================================================================
    // FA 13: PMR SVC SUPPORT AREA
    // =========================================================================
    {
      id: 'FA13',
      name: 'PMR Svc Support Area',
      rooms: [
        {
          id: 'PMR-FA13-01',
          name: 'PMR Svc Clean Linen Room',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let nsf = 80;
            if (ranges >= 16) nsf = 100;
            return [{ roomCode: 'SC471', roomName: 'PMR Svc Clean Linen Room', nsf, quantity: 1 }];
          }
        },
        {
          id: 'PMR-FA13-02',
          name: 'PMR Svc Soiled Linen Room',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let nsf = 60;
            if (ranges >= 16) nsf = 80;
            return [{ roomCode: 'SC473', roomName: 'PMR Svc Soiled Linen Room', nsf, quantity: 1 }];
          }
        },
        {
          id: 'PMR-FA13-03',
          name: 'PMR Svc Housekeeping Room',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            return [{ roomCode: 'SB773', roomName: 'PMR Svc Housekeeping Room', nsf: 80, quantity: 1 }];
          }
        },
        {
          id: 'PMR-FA13-04',
          name: 'PMR Svc Equipment Cleaning/Sanitation Room',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 6) return [];
            return [{ roomCode: 'CT207', roomName: 'PMR Svc Equipment Cleaning/Sanitation Room', nsf: 120, quantity: 1 }];
          }
        },
        {
          id: 'PMR-FA13-05',
          name: 'PMR Svc General Storage Room',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let nsf = 150;
            if (ranges >= 12 && ranges <= 24) nsf = 200;
            else if (ranges >= 25) nsf = 250;
            return [{ roomCode: 'SC483', roomName: 'PMR Svc General Storage Room', nsf, quantity: 1 }];
          }
        }
      ]
    },

    // =========================================================================
    // FA 14: PMR SVC STAFF AND ADMINISTRATIVE AREA
    // =========================================================================
    {
      id: 'FA14',
      name: 'PMR Svc Staff and Administrative Area',
      rooms: [
        {
          id: 'PMR-FA14-01',
          name: 'PMR Svc Chief Office',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            return [{ roomCode: 'SS203', roomName: 'PMR Svc Chief Office', nsf: 150, quantity: 1 }];
          }
        },
        {
          id: 'PMR-FA14-02',
          name: 'PMR Svc Administrative Support Workstation',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let quantity = 1;
            if (ranges >= 6 && ranges <= 17) quantity = 2;
            else if (ranges >= 18) quantity = 3;
            return [{ roomCode: 'SS218', roomName: 'PMR Svc Administrative Support Workstation', nsf: 56, quantity }];
          }
        },
        {
          id: 'PMR-FA14-03',
          name: 'PMR Svc Conference Room',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 1) return [];
            let nsf = 200;
            if (ranges >= 12 && ranges <= 24) nsf = 300;
            else if (ranges >= 25) nsf = 400;
            return [{ roomCode: 'SS101', roomName: 'PMR Svc Conference Room', nsf, quantity: 1 }];
          }
        },
        {
          id: 'PMR-FA14-04',
          name: 'PMR Svc Staff Lounge',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 6) return [];
            let nsf = 150;
            if (ranges >= 18) nsf = 200;
            return [{ roomCode: 'SS231', roomName: 'PMR Svc Staff Lounge', nsf, quantity: 1 }];
          }
        },
        {
          id: 'PMR-FA14-05',
          name: 'PMR Svc Female Staff Locker Room',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 6) return [];
            let nsf = 100;
            if (ranges >= 18) nsf = 150;
            return [{ roomCode: 'SS232', roomName: 'PMR Svc Female Staff Locker Room', nsf, quantity: 1 }];
          }
        },
        {
          id: 'PMR-FA14-06',
          name: 'PMR Svc Male Staff Locker Room',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 6) return [];
            let nsf = 100;
            if (ranges >= 18) nsf = 150;
            return [{ roomCode: 'SS233', roomName: 'PMR Svc Male Staff Locker Room', nsf, quantity: 1 }];
          }
        }
      ]
    },

    // =========================================================================
    // FA 15: PMR SVC EDUCATION AREA
    // =========================================================================
    {
      id: 'FA15',
      name: 'PMR Svc Education Area',
      rooms: [
        {
          id: 'PMR-FA15-01',
          name: 'PMR Svc Classroom',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 12) return [];
            let nsf = 400;
            if (ranges >= 25) nsf = 600;
            return [{ roomCode: 'SS102', roomName: 'PMR Svc Classroom', nsf, quantity: 1 }];
          }
        },
        {
          id: 'PMR-FA15-02',
          name: 'PMR Svc Classroom Storage',
          calculate: (inputs) => {
            const ranges = CHAPTER_270.calculateTotalRanges(inputs);
            if (ranges < 12) return [];
            return [{ roomCode: 'SS103', roomName: 'PMR Svc Classroom Storage', nsf: 80, quantity: 1 }];
          }
        }
      ]
    }
  ]
};
