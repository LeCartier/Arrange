
const calculateOphExamRooms = (inputs) => {
  if (!inputs.isOphAuthorized) return 0;
  const stops = inputs.numOphStops;
  const affiliated = inputs.isOphAffiliated;

  if (!affiliated) {
    if (stops >= 563 && stops <= 4500) return 2;
    if (stops >= 4501 && stops <= 9000) return 4;
    if (stops >= 9001 && stops <= 13500) return 6;
    if (stops >= 13501 && stops <= 18000) return 8;
    if (stops >= 18001 && stops <= 22500) return 10;
    if (stops >= 22501 && stops <= 27000) return 12;
    if (stops >= 27001 && stops <= 31500) return 14;
    if (stops >= 31501 && stops <= 36000) return 16;
    if (stops >= 36001 && stops <= 40500) return 18;
    if (stops >= 40501 && stops <= 45000) return 20;
    if (stops >= 45001 && stops <= 49500) return 22;
    if (stops >= 49501 && stops <= 54000) return 24;
    if (stops >= 54001 && stops <= 58500) return 26;
    if (stops >= 58501 && stops <= 63000) return 28;
    if (stops >= 63001 && stops <= 67500) return 30;
  } else {
    if (stops >= 450 && stops <= 3600) return 2;
    if (stops >= 3601 && stops <= 7200) return 4;
    if (stops >= 7201 && stops <= 10800) return 6;
    if (stops >= 10801 && stops <= 14400) return 8;
    if (stops >= 14401 && stops <= 18000) return 10;
    if (stops >= 18001 && stops <= 21600) return 12;
    if (stops >= 21601 && stops <= 25200) return 14;
    if (stops >= 25201 && stops <= 28800) return 16;
    if (stops >= 28801 && stops <= 32400) return 18;
    if (stops >= 32401 && stops <= 36000) return 20;
    if (stops >= 36001 && stops <= 39600) return 22;
    if (stops >= 39601 && stops <= 43200) return 24;
    if (stops >= 43201 && stops <= 46800) return 26;
    if (stops >= 46801 && stops <= 50400) return 28;
    if (stops >= 50401 && stops <= 54000) return 30;
  }
  return 0;
};

const calculateOptExamRooms = (inputs) => {
  if (!inputs.isOptAuthorized) return 0;
  const stops = inputs.numOptStops;
  const affiliated = inputs.isOptAffiliated;

  if (!affiliated) {
    if (stops >= 480 && stops <= 4800) return 2;
    if (stops >= 4801 && stops <= 9600) return 4;
    if (stops >= 9601 && stops <= 14400) return 6;
    if (stops >= 14401 && stops <= 19200) return 8;
    if (stops >= 19201 && stops <= 24000) return 10;
    if (stops >= 24001 && stops <= 28800) return 12;
    if (stops >= 28801 && stops <= 33600) return 14;
    if (stops >= 33601 && stops <= 38400) return 16;
    if (stops >= 38401 && stops <= 43200) return 18;
    if (stops >= 43201 && stops <= 48000) return 20;
    if (stops >= 48001 && stops <= 52800) return 22;
    if (stops >= 52801 && stops <= 57600) return 24;
    if (stops >= 57601 && stops <= 62400) return 26;
    if (stops >= 62401 && stops <= 67200) return 28;
    if (stops >= 67201 && stops <= 72000) return 30;
  } else {
    if (stops >= 384 && stops <= 3840) return 2;
    if (stops >= 3841 && stops <= 7680) return 4;
    if (stops >= 7681 && stops <= 11520) return 6;
    if (stops >= 11521 && stops <= 15360) return 8;
    if (stops >= 15361 && stops <= 19200) return 10;
    if (stops >= 19201 && stops <= 23040) return 12;
    if (stops >= 23041 && stops <= 26880) return 14;
    if (stops >= 26881 && stops <= 30720) return 16;
    if (stops >= 30721 && stops <= 34560) return 18;
    if (stops >= 34561 && stops <= 38400) return 20;
    if (stops >= 38401 && stops <= 42240) return 22;
    if (stops >= 42241 && stops <= 46080) return 24;
    if (stops >= 46081 && stops <= 49920) return 26;
    if (stops >= 49921 && stops <= 53760) return 28;
    if (stops >= 53761 && stops <= 57600) return 30;
  }
  return 0;
};

export const CHAPTER_233 = {
  id: '233',
  name: 'Eye Clinic: Ophthalmology and Optometry Services',
  
  inputs: [
    {
      id: 'isOphAuthorized',
      label: 'Is Ophthalmology Service authorized?',
      type: 'boolean',
      default: false
    },
    {
      id: 'isOphAffiliated',
      label: 'Is the Ophthalmology Service affiliated with a residency program?',
      type: 'boolean',
      default: false,
      displayCondition: (inputs) => inputs.isOphAuthorized === true
    },
    {
      id: 'numOphStops',
      label: 'How many annual Ophthalmology clinic stops (Stop Code 407) are projected?',
      type: 'number',
      min: 0,
      max: 67500,
      default: 0,
      displayCondition: (inputs) => inputs.isOphAuthorized === true
    },
    {
      id: 'isOptAuthorized',
      label: 'Is Optometry Service authorized?',
      type: 'boolean',
      default: false
    },
    {
      id: 'isOptAffiliated',
      label: 'Is the Optometry Service affiliated with a residency program?',
      type: 'boolean',
      default: false,
      displayCondition: (inputs) => inputs.isOptAuthorized === true
    },
    {
      id: 'numOptStops',
      label: 'How many annual Optometry clinic stops (Stop Code 408) are projected?',
      type: 'number',
      min: 0,
      max: 72000,
      default: 0,
      displayCondition: (inputs) => inputs.isOptAuthorized === true
    },
    {
      id: 'isOpticalFittingAuthorized',
      label: 'Is Optical Fitting Area authorized?',
      type: 'boolean',
      default: false
    }
  ],
  
  functionalAreas: [
    {
      name: 'FA 1: OPHTHALMOLOGY SERVICE RECEPTION AREA',
      rooms: [
        {
          name: 'OPH Waiting, Bldg Sprt',
          code: 'SB003',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 2) return { roomCount: 1, nsf: 130 };
                if (ophRooms >= 3 && ophRooms <= 4) return { roomCount: 1, nsf: 260 };
                if (ophRooms >= 5 && ophRooms <= 6) return { roomCount: 1, nsf: 370 };
                if (ophRooms >= 7 && ophRooms <= 8) return { roomCount: 1, nsf: 520 };
                if (ophRooms >= 9 && ophRooms <= 10) return { roomCount: 1, nsf: 575 };
                if (ophRooms >= 11 && ophRooms <= 12) return { roomCount: 1, nsf: 675 };
                if (ophRooms >= 13 && ophRooms <= 14) return { roomCount: 2, nsf: 440 };
                if (ophRooms >= 15 && ophRooms <= 16) return { roomCount: 2, nsf: 520 };
                if (ophRooms >= 17 && ophRooms <= 18) return { roomCount: 2, nsf: 535 };
                if (ophRooms >= 19 && ophRooms <= 20) return { roomCount: 2, nsf: 575 };
                if (ophRooms >= 21 && ophRooms <= 22) return { roomCount: 2, nsf: 625 };
                if (ophRooms >= 23 && ophRooms <= 24) return { roomCount: 2, nsf: 675 };
                if (ophRooms >= 25 && ophRooms <= 26) return { roomCount: 2, nsf: 705 };
                if (ophRooms >= 27 && ophRooms <= 28) return { roomCount: 3, nsf: 540 };
                if (ophRooms >= 29 && ophRooms <= 30) return { roomCount: 3, nsf: 575 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Family Waiting, Bldg Sprt',
          code: 'SB051',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 30) return { roomCount: 1, nsf: 225 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Reception, Clncl Sprt',
          code: 'SC183',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 14) return { roomCount: 1, nsf: 85 };
                if (ophRooms >= 15 && ophRooms <= 30) return { roomCount: 1, nsf: 260 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Patient Check-in Kiosk, Clncl Sprt',
          code: 'SC165',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 14) return { roomCount: 1, nsf: 105 };
                if (ophRooms >= 15 && ophRooms <= 30) return { roomCount: 2, nsf: 105 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Patient Education / Resource Room, Clncl Sprt',
          code: 'SC171',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 14) return { roomCount: 1, nsf: 100 };
                if (ophRooms >= 15 && ophRooms <= 30) return { roomCount: 2, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Public Toilet, Bldg Sprt',
          code: 'SB191',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 14) return { roomCount: 1, nsf: 60 };
                if (ophRooms >= 15 && ophRooms <= 30) return { roomCount: 2, nsf: 60 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Wheelchair Alcove, Bldg Sprt',
          code: 'SB262',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 14) return { roomCount: 1, nsf: 30 };
                if (ophRooms >= 15 && ophRooms <= 30) return { roomCount: 2, nsf: 30 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 2: OPHTHALMOLOGY SERVICE PATIENT AREA',
      rooms: [
        {
          name: 'OPH Dilation Waiting, Bldg Sprt',
          code: 'SB002',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 2) return { roomCount: 1, nsf: 45 };
                if (ophRooms >= 3 && ophRooms <= 4) return { roomCount: 1, nsf: 100 };
                if (ophRooms >= 5 && ophRooms <= 6) return { roomCount: 1, nsf: 130 };
                if (ophRooms >= 7 && ophRooms <= 8) return { roomCount: 1, nsf: 170 };
                if (ophRooms >= 9 && ophRooms <= 10) return { roomCount: 1, nsf: 215 };
                if (ophRooms >= 11 && ophRooms <= 12) return { roomCount: 1, nsf: 260 };
                if (ophRooms >= 13 && ophRooms <= 14) return { roomCount: 1, nsf: 290 };
                if (ophRooms >= 15 && ophRooms <= 16) return { roomCount: 1, nsf: 330 };
                if (ophRooms >= 17 && ophRooms <= 18) return { roomCount: 1, nsf: 370 };
                if (ophRooms >= 19 && ophRooms <= 20) return { roomCount: 1, nsf: 415 };
                if (ophRooms >= 21 && ophRooms <= 22) return { roomCount: 1, nsf: 465 };
                if (ophRooms >= 23 && ophRooms <= 24) return { roomCount: 1, nsf: 520 };
                if (ophRooms >= 25 && ophRooms <= 26) return { roomCount: 1, nsf: 530 };
                if (ophRooms >= 27 && ophRooms <= 28) return { roomCount: 1, nsf: 540 };
                if (ophRooms >= 29 && ophRooms <= 30) return { roomCount: 1, nsf: 575 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Consult Room / Viewing Room, Eye Clnc',
          code: 'CEY01',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 16) return { roomCount: 1, nsf: 185 };
                if (ophRooms >= 17 && ophRooms <= 30) return { roomCount: 2, nsf: 185 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Pre-Testing / Intake Room, Eye Clnc',
          code: 'CEY02',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 4) return { roomCount: 1, nsf: 130 };
                if (ophRooms >= 5 && ophRooms <= 8) return { roomCount: 2, nsf: 130 };
                if (ophRooms >= 9 && ophRooms <= 12) return { roomCount: 3, nsf: 130 };
                if (ophRooms >= 13 && ophRooms <= 16) return { roomCount: 4, nsf: 130 };
                if (ophRooms >= 17 && ophRooms <= 20) return { roomCount: 5, nsf: 130 };
                if (ophRooms >= 21 && ophRooms <= 24) return { roomCount: 6, nsf: 130 };
                if (ophRooms >= 25 && ophRooms <= 28) return { roomCount: 7, nsf: 130 };
                if (ophRooms >= 29 && ophRooms <= 30) return { roomCount: 8, nsf: 130 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Exam / Treatment Room, Eye Clnc',
          code: 'CEY03',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms > 0) return { roomCount: ophRooms, nsf: 130 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH PA Exam Room, Eye Clnc',
          code: 'CEY04',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 10) return { roomCount: 1, nsf: 130 };
                if (ophRooms >= 11 && ophRooms <= 30) return { roomCount: 2, nsf: 130 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Procedure Room, Eye Clnc',
          code: 'CEY11',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 30) return { roomCount: 1, nsf: 225 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Visual Fields Room, Eye Clnc',
          code: 'CEY12',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 8) return { roomCount: 1, nsf: 130 };
                if (ophRooms >= 9 && ophRooms <= 16) return { roomCount: 2, nsf: 130 };
                if (ophRooms >= 17 && ophRooms <= 24) return { roomCount: 3, nsf: 130 };
                if (ophRooms >= 25 && ophRooms <= 30) return { roomCount: 4, nsf: 130 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Photography Room, Eye Clnc',
          code: 'CEY13',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 8) return { roomCount: 1, nsf: 185 };
                if (ophRooms >= 9 && ophRooms <= 16) return { roomCount: 2, nsf: 185 };
                if (ophRooms >= 17 && ophRooms <= 24) return { roomCount: 3, nsf: 185 };
                if (ophRooms >= 25 && ophRooms <= 30) return { roomCount: 4, nsf: 185 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Ultrasound Room, Eye Clnc',
          code: 'CEY14',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 8) return { roomCount: 1, nsf: 130 };
                if (ophRooms >= 9 && ophRooms <= 16) return { roomCount: 2, nsf: 130 };
                if (ophRooms >= 17 && ophRooms <= 24) return { roomCount: 3, nsf: 130 };
                if (ophRooms >= 25 && ophRooms <= 30) return { roomCount: 4, nsf: 130 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Tomography Room, Eye Clnc',
          code: 'CEY15',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 8) return { roomCount: 1, nsf: 130 };
                if (ophRooms >= 9 && ophRooms <= 16) return { roomCount: 2, nsf: 130 };
                if (ophRooms >= 17 && ophRooms <= 24) return { roomCount: 3, nsf: 130 };
                if (ophRooms >= 25 && ophRooms <= 30) return { roomCount: 4, nsf: 130 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Imaging Room, Eye Clnc',
          code: 'CEY16',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 13 && ophRooms <= 30) return { roomCount: 1, nsf: 130 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH YAG Laser Room, Eye Clnc',
          code: 'CEY21',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 30) return { roomCount: 1, nsf: 130 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Retinal Photocoagulation Laser Room, Eye Clnc',
          code: 'CEY22',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 30) return { roomCount: 1, nsf: 130 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH SLT Laser Room, Eye Clnc',
          code: 'CEY23',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 30) return { roomCount: 1, nsf: 130 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Electrodiagnostics Room, Eye Clnc',
          code: 'CEY24',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 30) return { roomCount: 1, nsf: 130 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Specialty Testing Room, Eye Clnc',
          code: 'CEY25',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 30) return { roomCount: 1, nsf: 130 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Low Vision / Polytrauma Training Room, Eye Clnc',
          code: 'CEY26',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 12) return { roomCount: 1, nsf: 185 };
                if (ophRooms >= 13 && ophRooms <= 30) return { roomCount: 2, nsf: 185 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Low Vision / Polytrauma Training Storage Room, Eye Clnc',
          code: 'CEY31',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 30) return { roomCount: 1, nsf: 130 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Patient Toilet, Bldg Sprt',
          code: 'SB201',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 12) return { roomCount: 1, nsf: 60 };
                if (ophRooms >= 13 && ophRooms <= 30) return { roomCount: 2, nsf: 60 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 3: OPHTHALMOLOGY SERVICE SUPPORT AREA',
      rooms: [
        {
          name: 'OPH Clean Utility Room, Lgstcs Svc',
          code: 'SB737',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 4) return { roomCount: 1, nsf: 80 };
                if (ophRooms >= 5 && ophRooms <= 8) return { roomCount: 1, nsf: 100 };
                if (ophRooms >= 9 && ophRooms <= 12) return { roomCount: 1, nsf: 120 };
                if (ophRooms >= 13 && ophRooms <= 16) return { roomCount: 1, nsf: 140 };
                if (ophRooms >= 17 && ophRooms <= 20) return { roomCount: 1, nsf: 160 };
                if (ophRooms >= 21 && ophRooms <= 24) return { roomCount: 1, nsf: 180 };
                if (ophRooms >= 25 && ophRooms <= 28) return { roomCount: 1, nsf: 200 };
                if (ophRooms >= 29 && ophRooms <= 30) return { roomCount: 1, nsf: 220 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Soiled Utility Room, Lgstcs Svc',
          code: 'SB743',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 10) return { roomCount: 1, nsf: 40 };
                if (ophRooms >= 11 && ophRooms <= 20) return { roomCount: 1, nsf: 60 };
                if (ophRooms >= 21 && ophRooms <= 30) return { roomCount: 1, nsf: 80 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Medication Room, Phrm Svc',
          code: 'SV583',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 6) return { roomCount: 1, nsf: 80 };
                if (ophRooms >= 7 && ophRooms <= 12) return { roomCount: 1, nsf: 100 };
                if (ophRooms >= 13 && ophRooms <= 18) return { roomCount: 1, nsf: 120 };
                if (ophRooms >= 19 && ophRooms <= 24) return { roomCount: 1, nsf: 140 };
                if (ophRooms >= 25 && ophRooms <= 30) return { roomCount: 1, nsf: 160 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Equipment Storage Room, Eye Clnc',
          code: 'CEY 34',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 4) return { roomCount: 1, nsf: 80 };
                if (ophRooms >= 5 && ophRooms <= 8) return { roomCount: 1, nsf: 100 };
                if (ophRooms >= 9 && ophRooms <= 12) return { roomCount: 1, nsf: 140 };
                if (ophRooms >= 13 && ophRooms <= 16) return { roomCount: 1, nsf: 180 };
                if (ophRooms >= 17 && ophRooms <= 20) return { roomCount: 1, nsf: 220 };
                if (ophRooms >= 21 && ophRooms <= 24) return { roomCount: 1, nsf: 260 };
                if (ophRooms >= 25 && ophRooms <= 28) return { roomCount: 1, nsf: 300 };
                if (ophRooms >= 29 && ophRooms <= 30) return { roomCount: 1, nsf: 340 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Equipment Alcove, Clncl Sprt',
          code: 'SC079',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 12) return { roomCount: 1, nsf: 30 };
                if (ophRooms >= 13 && ophRooms <= 30) return { roomCount: 2, nsf: 30 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Housekeeping Aides Closet (HAC), Bldg Sprt',
          code: 'SB244',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 30) return { roomCount: 1, nsf: 60 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Supply Storage Room, Eye Clnc',
          code: 'CEY41',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 4) return { roomCount: 1, nsf: 80 };
                if (ophRooms >= 5 && ophRooms <= 8) return { roomCount: 1, nsf: 100 };
                if (ophRooms >= 9 && ophRooms <= 12) return { roomCount: 1, nsf: 120 };
                if (ophRooms >= 13 && ophRooms <= 16) return { roomCount: 1, nsf: 140 };
                if (ophRooms >= 17 && ophRooms <= 20) return { roomCount: 1, nsf: 160 };
                if (ophRooms >= 21 && ophRooms <= 24) return { roomCount: 1, nsf: 180 };
                if (ophRooms >= 25 && ophRooms <= 28) return { roomCount: 1, nsf: 200 };
                if (ophRooms >= 29 && ophRooms <= 30) return { roomCount: 1, nsf: 220 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Reusable Medical Equipment (RME) Room, Eye Clnc',
          code: 'CEY48',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 30) return { roomCount: 1, nsf: 80 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 4: OPHTHALMOLOGY SERVICE STAFF AND ADMINISTRATIVE AREA',
      rooms: [
        {
          name: 'OPH Service Chief Office, Stff Sprt',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 30) return { roomCount: 1, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Assistant Chief Office, Stff Sprt',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 30) return { roomCount: 1, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Program Support Assistant Workstation, Ophthalmology',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 30) return { roomCount: 1, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Program Support Assistant Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 30) return { roomCount: 1, nsf: 80 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Provider Workarea, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 4) return { roomCount: 1, nsf: 65 };
                if (ophRooms >= 5 && ophRooms <= 8) return { roomCount: 2, nsf: 65 };
                if (ophRooms >= 9 && ophRooms <= 12) return { roomCount: 3, nsf: 65 };
                if (ophRooms >= 13 && ophRooms <= 16) return { roomCount: 4, nsf: 65 };
                if (ophRooms >= 17 && ophRooms <= 20) return { roomCount: 5, nsf: 65 };
                if (ophRooms >= 21 && ophRooms <= 24) return { roomCount: 6, nsf: 65 };
                if (ophRooms >= 25 && ophRooms <= 28) return { roomCount: 7, nsf: 65 };
                if (ophRooms >= 29 && ophRooms <= 30) return { roomCount: 8, nsf: 65 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Social Worker Office, Stff Sprt',
          code: 'SS203',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 30) return { roomCount: 1, nsf: 130 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Low Vision Provider Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 30) return { roomCount: 1, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Clinic Manager Office, Stff Sprt',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 30) return { roomCount: 1, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Administration Support Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 14) return { roomCount: 1, nsf: 56 };
                if (ophRooms >= 15 && ophRooms <= 30) return { roomCount: 2, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Support Equipment Room, Eye Clnc',
          code: 'CEY49',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 14) return { roomCount: 1, nsf: 120 };
                if (ophRooms >= 15 && ophRooms <= 30) return { roomCount: 1, nsf: 180 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Copy / Supply Room, Stff Sprt',
          code: 'SS272',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 30) return { roomCount: 1, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Staff Conference Room, Educ Svc',
          code: 'SS101',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 4) return { roomCount: 1, nsf: 240 };
                if (ophRooms >= 5 && ophRooms <= 12) return { roomCount: 1, nsf: 300 };
                if (ophRooms >= 13 && ophRooms <= 20) return { roomCount: 1, nsf: 500 };
                if (ophRooms >= 21 && ophRooms <= 30) return { roomCount: 1, nsf: 675 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Staff Breakroom, Stff Sprt',
          code: 'SS262',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 6) return { roomCount: 1, nsf: 120 };
                if (ophRooms >= 7 && ophRooms <= 12) return { roomCount: 1, nsf: 140 };
                if (ophRooms >= 13 && ophRooms <= 18) return { roomCount: 1, nsf: 160 };
                if (ophRooms >= 19 && ophRooms <= 24) return { roomCount: 1, nsf: 180 };
                if (ophRooms >= 25 && ophRooms <= 30) return { roomCount: 1, nsf: 200 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Staff Personal Property Locker Room, Stff Sprt',
          code: 'SS251',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 30) return { roomCount: 1, nsf: 60 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Staff Toilet, Bldg Sprt',
          code: 'SB191',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 30) return { roomCount: 2, nsf: 60 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 5: OPHTHALMOLOGY SERVICE EDUCATION AREA',
      rooms: [
        {
          name: 'OPH Residency Director Office, Stff Sprt',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 30) return { roomCount: 1, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Resident / Fellow Team Room, Clncl Sprt',
          code: 'SC243',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 30) return { roomCount: 1, nsf: 180 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPH Resident Training Room, Educ Svc',
          code: 'SS111',
          rules: [
            {
              calculate: (inputs) => {
                const ophRooms = calculateOphExamRooms(inputs);
                if (ophRooms >= 1 && ophRooms <= 30) return { roomCount: 1, nsf: 545 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 6: OPTOMETRY SERVICE RECEPTION AREA',
      rooms: [
        {
          name: 'OPT Waiting, Bldg Sprt',
          code: 'SB003',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 2) return { roomCount: 1, nsf: 130 };
                if (optRooms >= 3 && optRooms <= 4) return { roomCount: 1, nsf: 260 };
                if (optRooms >= 5 && optRooms <= 6) return { roomCount: 1, nsf: 370 };
                if (optRooms >= 7 && optRooms <= 8) return { roomCount: 1, nsf: 520 };
                if (optRooms >= 9 && optRooms <= 10) return { roomCount: 1, nsf: 575 };
                if (optRooms >= 11 && optRooms <= 12) return { roomCount: 1, nsf: 675 };
                if (optRooms >= 13 && optRooms <= 14) return { roomCount: 2, nsf: 440 };
                if (optRooms >= 15 && optRooms <= 16) return { roomCount: 2, nsf: 520 };
                if (optRooms >= 17 && optRooms <= 18) return { roomCount: 2, nsf: 535 };
                if (optRooms >= 19 && optRooms <= 20) return { roomCount: 2, nsf: 575 };
                if (optRooms >= 21 && optRooms <= 22) return { roomCount: 2, nsf: 625 };
                if (optRooms >= 23 && optRooms <= 24) return { roomCount: 2, nsf: 705 };
                if (optRooms >= 25 && optRooms <= 26) return { roomCount: 3, nsf: 540 };
                if (optRooms >= 27 && optRooms <= 30) return { roomCount: 3, nsf: 575 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Family Waiting, Bldg Sprt',
          code: 'SB051',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 30) return { roomCount: 1, nsf: 225 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Reception, Clncl Sprt',
          code: 'SC183',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 10) return { roomCount: 1, nsf: 85 };
                if (optRooms >= 11 && optRooms <= 30) return { roomCount: 1, nsf: 260 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Patient Check-in Kiosk, Clncl Sprt',
          code: 'SC165',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 14) return { roomCount: 1, nsf: 55 };
                if (optRooms >= 15 && optRooms <= 30) return { roomCount: 2, nsf: 55 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Patient Education / Resource Room, Clncl Sprt',
          code: 'SC171',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 14) return { roomCount: 1, nsf: 100 };
                if (optRooms >= 15 && optRooms <= 30) return { roomCount: 2, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Public Toilet, Bldg Sprt',
          code: 'SB191',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 30) return { roomCount: 2, nsf: 60 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Wheelchair Alcove, Bldg Sprt',
          code: 'SB262',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 30) return { roomCount: 2, nsf: 30 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 7: OPTOMETRY SERVICE PATIENT AREA',
      rooms: [
        {
          name: 'OPT Dilation Waiting, Bldg Sprt',
          code: 'SB002',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 4) return { roomCount: 1, nsf: 45 };
                if (optRooms >= 5 && optRooms <= 8) return { roomCount: 1, nsf: 100 };
                if (optRooms >= 9 && optRooms <= 12) return { roomCount: 1, nsf: 130 };
                if (optRooms >= 13 && optRooms <= 16) return { roomCount: 1, nsf: 170 };
                if (optRooms >= 17 && optRooms <= 20) return { roomCount: 1, nsf: 215 };
                if (optRooms >= 21 && optRooms <= 24) return { roomCount: 1, nsf: 260 };
                if (optRooms >= 25 && optRooms <= 28) return { roomCount: 1, nsf: 290 };
                if (optRooms >= 29 && optRooms <= 30) return { roomCount: 1, nsf: 330 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Consult Room / Viewing Room, Eye Clnc',
          code: 'CEY51',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 30) return { roomCount: 1, nsf: 185 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Pre-Testing / Intake Room, Eye Clnc',
          code: 'CEY52',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 4) return { roomCount: 1, nsf: 130 };
                if (optRooms >= 5 && optRooms <= 8) return { roomCount: 2, nsf: 130 };
                if (optRooms >= 9 && optRooms <= 12) return { roomCount: 3, nsf: 130 };
                if (optRooms >= 13 && optRooms <= 16) return { roomCount: 4, nsf: 130 };
                if (optRooms >= 17 && optRooms <= 20) return { roomCount: 5, nsf: 130 };
                if (optRooms >= 21 && optRooms <= 24) return { roomCount: 6, nsf: 130 };
                if (optRooms >= 25 && optRooms <= 28) return { roomCount: 7, nsf: 130 };
                if (optRooms >= 29 && optRooms <= 30) return { roomCount: 8, nsf: 130 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Exam / Treatment Room, Eye Clnc',
          code: 'CEY53',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms > 0) return { roomCount: optRooms, nsf: 130 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Visual Fields Room, Eye Clnc',
          code: 'CEY54',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 8) return { roomCount: 1, nsf: 130 };
                if (optRooms >= 9 && optRooms <= 16) return { roomCount: 2, nsf: 130 };
                if (optRooms >= 17 && optRooms <= 24) return { roomCount: 3, nsf: 130 };
                if (optRooms >= 25 && optRooms <= 30) return { roomCount: 4, nsf: 130 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Photography Room, Eye Clnc',
          code: 'CEY55',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 8) return { roomCount: 1, nsf: 185 };
                if (optRooms >= 9 && optRooms <= 16) return { roomCount: 2, nsf: 185 };
                if (optRooms >= 17 && optRooms <= 24) return { roomCount: 3, nsf: 185 };
                if (optRooms >= 25 && optRooms <= 30) return { roomCount: 4, nsf: 185 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Ultrasound Room, Eye Clnc',
          code: 'CEY56',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 12) return { roomCount: 1, nsf: 130 };
                if (optRooms >= 13 && optRooms <= 24) return { roomCount: 2, nsf: 130 };
                if (optRooms >= 25 && optRooms <= 30) return { roomCount: 3, nsf: 130 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Tomography Room, Eye Clnc',
          code: 'CEY61',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 8) return { roomCount: 1, nsf: 130 };
                if (optRooms >= 9 && optRooms <= 16) return { roomCount: 2, nsf: 130 };
                if (optRooms >= 17 && optRooms <= 24) return { roomCount: 3, nsf: 130 };
                if (optRooms >= 25 && optRooms <= 30) return { roomCount: 4, nsf: 130 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Imaging Room, Eye Clnc',
          code: 'CEY62',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 13 && optRooms <= 30) return { roomCount: 1, nsf: 130 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Electrodiagnostics Room, Eye Clnc',
          code: 'CEY63',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 30) return { roomCount: 1, nsf: 130 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Specialty Testing Room, Eye Clnc',
          code: 'CEY64',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 30) return { roomCount: 1, nsf: 185 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Low Vision Exam Room, Eye Clnc',
          code: 'CEY66',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 30) return { roomCount: 1, nsf: 185 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Low Vision Storage Room, Eye Clnc',
          code: 'CEY67',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 30) return { roomCount: 1, nsf: 80 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Low Vision / Polytrauma Training Room, Eye Clnc',
          code: 'CEY68',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 14) return { roomCount: 1, nsf: 185 };
                if (optRooms >= 15 && optRooms <= 30) return { roomCount: 2, nsf: 185 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Low Vision / Polytrauma Training Storage Room, Eye Clnc',
          code: 'CEY69',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 14) return { roomCount: 1, nsf: 80 };
                if (optRooms >= 15 && optRooms <= 30) return { roomCount: 2, nsf: 80 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT VIST Consult Room, Clncl Sprt',
          code: 'SC271',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 14) return { roomCount: 1, nsf: 130 };
                if (optRooms >= 15 && optRooms <= 30) return { roomCount: 2, nsf: 130 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT BROS Consult Room, Clncl Sprt',
          code: 'SC271',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 14) return { roomCount: 1, nsf: 130 };
                if (optRooms >= 15 && optRooms <= 30) return { roomCount: 2, nsf: 130 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT BROS Storage Room, Eye Clnc',
          code: 'CEY73',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 14) return { roomCount: 1, nsf: 80 };
                if (optRooms >= 15 && optRooms <= 30) return { roomCount: 2, nsf: 80 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Patient Toilet, Bldg Sprt',
          code: 'SB201',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 30) return { roomCount: 2, nsf: 60 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 8: OPTOMETRY SERVICE SUPPORT AREA',
      rooms: [
        {
          name: 'OPT Clean Utility Room, Lgstcs Svc',
          code: 'SB737',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 4) return { roomCount: 1, nsf: 80 };
                if (optRooms >= 5 && optRooms <= 8) return { roomCount: 1, nsf: 100 };
                if (optRooms >= 9 && optRooms <= 12) return { roomCount: 1, nsf: 120 };
                if (optRooms >= 13 && optRooms <= 16) return { roomCount: 1, nsf: 140 };
                if (optRooms >= 17 && optRooms <= 20) return { roomCount: 1, nsf: 160 };
                if (optRooms >= 21 && optRooms <= 24) return { roomCount: 1, nsf: 180 };
                if (optRooms >= 25 && optRooms <= 30) return { roomCount: 1, nsf: 200 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Soiled Utility Room, Lgstcs Svc',
          code: 'SB743',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 10) return { roomCount: 1, nsf: 40 };
                if (optRooms >= 11 && optRooms <= 20) return { roomCount: 1, nsf: 60 };
                if (optRooms >= 21 && optRooms <= 30) return { roomCount: 1, nsf: 80 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Medication Room, Phrm Svc',
          code: 'SV583',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 6) return { roomCount: 1, nsf: 80 };
                if (optRooms >= 7 && optRooms <= 12) return { roomCount: 1, nsf: 100 };
                if (optRooms >= 13 && optRooms <= 18) return { roomCount: 1, nsf: 120 };
                if (optRooms >= 19 && optRooms <= 24) return { roomCount: 1, nsf: 140 };
                if (optRooms >= 25 && optRooms <= 30) return { roomCount: 1, nsf: 160 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Equipment Storage Room, Eye Clnc',
          code: 'CEY74',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 4) return { roomCount: 1, nsf: 80 };
                if (optRooms >= 5 && optRooms <= 8) return { roomCount: 1, nsf: 100 };
                if (optRooms >= 9 && optRooms <= 12) return { roomCount: 1, nsf: 140 };
                if (optRooms >= 13 && optRooms <= 16) return { roomCount: 1, nsf: 180 };
                if (optRooms >= 17 && optRooms <= 20) return { roomCount: 1, nsf: 220 };
                if (optRooms >= 21 && optRooms <= 24) return { roomCount: 1, nsf: 260 };
                if (optRooms >= 25 && optRooms <= 30) return { roomCount: 1, nsf: 300 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Equipment Alcove, Clncl Sprt',
          code: 'SC079',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 12) return { roomCount: 1, nsf: 30 };
                if (optRooms >= 13 && optRooms <= 30) return { roomCount: 2, nsf: 30 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Wheelchair Alcove, Bldg Sprt',
          code: 'SB262',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 30) return { roomCount: 1, nsf: 30 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Housekeeping Aides Closet (HAC), Bldg Sprt',
          code: 'SB244',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 30) return { roomCount: 1, nsf: 60 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Supply Storage Room, Eye Clnc',
          code: 'CEY81',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 4) return { roomCount: 1, nsf: 80 };
                if (optRooms >= 5 && optRooms <= 8) return { roomCount: 1, nsf: 100 };
                if (optRooms >= 9 && optRooms <= 12) return { roomCount: 1, nsf: 120 };
                if (optRooms >= 13 && optRooms <= 16) return { roomCount: 1, nsf: 140 };
                if (optRooms >= 17 && optRooms <= 20) return { roomCount: 1, nsf: 160 };
                if (optRooms >= 21 && optRooms <= 24) return { roomCount: 1, nsf: 180 };
                if (optRooms >= 25 && optRooms <= 30) return { roomCount: 1, nsf: 200 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Reusable Equipment (RME) Room, Eye Clnc',
          code: 'CEY88',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 30) return { roomCount: 1, nsf: 80 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 9: OPTOMETRY SERVICE STAFF AND ADMINISTRATIVE AREA',
      rooms: [
        {
          name: 'OPT Service Chief Office, Stff Sprt',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 30) return { roomCount: 1, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Assistant Chief Office, Stff Sprt',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 30) return { roomCount: 1, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Program Support Assistant Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 30) return { roomCount: 1, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Visitor Waiting, Bldg Sprt',
          code: 'SB003',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 30) return { roomCount: 1, nsf: 80 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Provider Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 4) return { roomCount: 1, nsf: 56 };
                if (optRooms >= 5 && optRooms <= 8) return { roomCount: 2, nsf: 56 };
                if (optRooms >= 9 && optRooms <= 12) return { roomCount: 3, nsf: 56 };
                if (optRooms >= 13 && optRooms <= 16) return { roomCount: 4, nsf: 56 };
                if (optRooms >= 17 && optRooms <= 20) return { roomCount: 5, nsf: 56 };
                if (optRooms >= 21 && optRooms <= 24) return { roomCount: 6, nsf: 56 };
                if (optRooms >= 25 && optRooms <= 28) return { roomCount: 7, nsf: 56 };
                if (optRooms >= 29 && optRooms <= 30) return { roomCount: 8, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Touchdown Station, Clncl Sprt',
          code: 'SC256',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 8) return { roomCount: 1, nsf: 65 };
                if (optRooms >= 9 && optRooms <= 16) return { roomCount: 2, nsf: 65 };
                if (optRooms >= 17 && optRooms <= 24) return { roomCount: 3, nsf: 65 };
                if (optRooms >= 25 && optRooms <= 30) return { roomCount: 4, nsf: 65 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Social Worker Office, Stff Sprt',
          code: 'SS203',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 30) return { roomCount: 1, nsf: 130 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Low Vision Provider Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 14) return { roomCount: 1, nsf: 56 };
                if (optRooms >= 15 && optRooms <= 30) return { roomCount: 2, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Clinic Manager Office, Stff Sprt',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 30) return { roomCount: 1, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Administration Support Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 14) return { roomCount: 1, nsf: 56 };
                if (optRooms >= 15 && optRooms <= 30) return { roomCount: 2, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Support Equipment Room, Eye Clnc',
          code: 'CEY89',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 30) return { roomCount: 1, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Copy / Supply Room, Stff Sprt',
          code: 'SS272',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 30) return { roomCount: 1, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Staff Conference Room, Educ Svc',
          code: 'SS101',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 4) return { roomCount: 1, nsf: 240 };
                if (optRooms >= 5 && optRooms <= 12) return { roomCount: 1, nsf: 300 };
                if (optRooms >= 13 && optRooms <= 20) return { roomCount: 1, nsf: 500 };
                if (optRooms >= 21 && optRooms <= 30) return { roomCount: 1, nsf: 675 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Staff Breakroom, Stff Sprt',
          code: 'SS262',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 6) return { roomCount: 1, nsf: 120 };
                if (optRooms >= 7 && optRooms <= 12) return { roomCount: 1, nsf: 140 };
                if (optRooms >= 13 && optRooms <= 18) return { roomCount: 1, nsf: 160 };
                if (optRooms >= 19 && optRooms <= 24) return { roomCount: 1, nsf: 180 };
                if (optRooms >= 25 && optRooms <= 30) return { roomCount: 1, nsf: 200 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Staff Personal Property Locker Room, Stff Sprt',
          code: 'SS251',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 30) return { roomCount: 1, nsf: 60 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Staff Toilet, Bldg Sprt',
          code: 'SB191',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 14) return { roomCount: 1, nsf: 60 };
                if (optRooms >= 15 && optRooms <= 30) return { roomCount: 2, nsf: 60 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 10: OPTOMETRY SERVICE EDUCATION AREA',
      rooms: [
        {
          name: 'OPT Residency Director / Coordinator Office, Stff Sprt',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 30) return { roomCount: 1, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Externship Director / Coordinator Office, Stff Sprt',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 30) return { roomCount: 1, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Resident / Fellow Team Room, Clncl Sprt',
          code: 'SC243',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 30) return { roomCount: 1, nsf: 180 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OPT Resident Training Room, Educ Svc',
          code: 'SS111',
          rules: [
            {
              calculate: (inputs) => {
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 30) return { roomCount: 1, nsf: 300 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 11: OPTICAL FITTING AREA',
      rooms: [
        {
          name: 'Optical Fitting Area Eyeglass Fitting / Dispensing Room, Eye Clnc',
          code: 'CEY91',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isOpticalFittingAuthorized) return { roomCount: 0, nsf: 0 };
                const ophRooms = calculateOphExamRooms(inputs);
                const optRooms = calculateOptExamRooms(inputs);
                const totalRooms = ophRooms + optRooms;
                if (totalRooms >= 1 && totalRooms <= 16) return { roomCount: 1, nsf: 200 };
                if (totalRooms >= 17 && totalRooms <= 32) return { roomCount: 2, nsf: 200 };
                if (totalRooms >= 33 && totalRooms <= 48) return { roomCount: 3, nsf: 200 };
                if (totalRooms >= 49 && totalRooms <= 60) return { roomCount: 4, nsf: 200 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Optical Fitting Area Contact Lens Fitting / Dispensing, Eye Clnc',
          code: 'CEY93',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isOpticalFittingAuthorized) return { roomCount: 0, nsf: 0 };
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 30) return { roomCount: 1, nsf: 160 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Optical Fitting Area Eyeglass Frame Storage Room, Eye Clnc',
          code: 'CEY95',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isOpticalFittingAuthorized) return { roomCount: 0, nsf: 0 };
                const ophRooms = calculateOphExamRooms(inputs);
                const optRooms = calculateOptExamRooms(inputs);
                const totalRooms = ophRooms + optRooms;
                if (totalRooms >= 1 && totalRooms <= 60) return { roomCount: 1, nsf: 80 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Optical Fitting Area Contact Lens Storage Room, Eye Clnc',
          code: 'CEY97',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isOpticalFittingAuthorized) return { roomCount: 0, nsf: 0 };
                const optRooms = calculateOptExamRooms(inputs);
                if (optRooms >= 1 && optRooms <= 30) return { roomCount: 1, nsf: 80 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
  ],
};
