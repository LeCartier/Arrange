
const calculateOpExamRooms = (inputs) => {
  let opt11 = 0;
  if (inputs.numPolytraumaStops >= 384 && inputs.numPolytraumaStops <= 3840) opt11 = 2;
  else if (inputs.numPolytraumaStops > 3840 && inputs.numPolytraumaStops <= 5760) opt11 = 3;
  else if (inputs.numPolytraumaStops > 5760 && inputs.numPolytraumaStops <= 7680) opt11 = 4;
  else if (inputs.numPolytraumaStops > 7680 && inputs.numPolytraumaStops <= 9600) opt11 = 5;
  else if (inputs.numPolytraumaStops > 9600 && inputs.numPolytraumaStops <= 11520) opt11 = 6;

  let opt13 = 0;
  if (inputs.numEmgStops >= 320 && inputs.numEmgStops <= 1600) opt13 = 1;
  else if (inputs.numEmgStops > 1600 && inputs.numEmgStops <= 3200) opt13 = 2;
  else if (inputs.numEmgStops > 3200 && inputs.numEmgStops <= 4800) opt13 = 3;
  else if (inputs.numEmgStops > 4800 && inputs.numEmgStops <= 6400) opt13 = 4;

  let opt14 = 0;
  if (inputs.numChiropracticStops >= 427 && inputs.numChiropracticStops <= 2133) opt14 = 1;
  else if (inputs.numChiropracticStops > 2133 && inputs.numChiropracticStops <= 4266) opt14 = 2;
  else if (inputs.numChiropracticStops > 4266 && inputs.numChiropracticStops <= 6399) opt14 = 3;
  else if (inputs.numChiropracticStops > 6400 && inputs.numChiropracticStops <= 8532) opt14 = 4;

  return opt11 + opt13 + opt14;
};

export const CHAPTER_111 = {
  inputs: [
    { name: 'is18BedAuthorized', type: 'boolean', defaultValue: false },
    { name: 'areTwoResidentCareUnitsAuthorized', type: 'boolean', defaultValue: false },
    { name: 'numPolytraumaStops', type: 'number', defaultValue: 0 },
    { name: 'numEmgStops', type: 'number', defaultValue: 0 },
    { name: 'numChiropracticStops', type: 'number', defaultValue: 0 },
  ],
  functionalAreas: [
    {
      name: 'FA 1: PRC PATIENT CARE UNIT RECEPTION AREA',
      rooms: [
        {
          name: 'Polytrauma IP Lobby',
          code: 'SB111',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: 300 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma IP Reception',
          code: 'SC183',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: 260 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma IP Waiting',
          code: 'SB003',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: inputs.is18BedAuthorized ? 415 : 290 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma IP Family Waiting',
          code: 'SB051',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: 125 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma IP Bariatric Patient Toilet',
          code: 'SB163',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 2, nsf: 75 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 2: PRC PATIENT CARE UNIT PATIENT AREA',
      rooms: [
        {
          name: 'Polytrauma IP Bedroom, Standard',
          code: 'IPT01',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.is18BedAuthorized ? 14 : 10, nsf: 250 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma IP Bedroom, Isolation',
          code: 'IPT02',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 2, nsf: 260 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma IP Bedroom, Bariatric',
          code: 'IPT03',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 2, nsf: 320 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma IP Patient Toilet / Shower, Standard',
          code: 'SB136',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.is18BedAuthorized ? 14 : 10, nsf: 70 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma IP Patient Toilet / Shower, Isolation',
          code: 'SB141',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 2, nsf: 70 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma IP Patient Toilet / Shower, Bariatric',
          code: 'SB166',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 2, nsf: 95 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 3: PRC PATIENT CARE UNIT SUPPORT AREA',
      rooms: [
        {
          name: 'Polytrauma IP Nurse Station',
          code: 'SC152',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.is18BedAuthorized ? 2 : 1, nsf: 180 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma IP Ward Clerk Workstation',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.is18BedAuthorized ? 2 : 1, nsf: 56 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma IP Medication Room',
          code: 'SV583',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.is18BedAuthorized ? 2 : 1, nsf: 100 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma IP Clean Linen Room',
          code: 'SC471',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.is18BedAuthorized ? 2 : 1, nsf: 60 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma IP Clean Utility Room',
          code: 'SB737',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.is18BedAuthorized ? 2 : 1, nsf: 100 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma IP Soiled Utility Room',
          code: 'SB743',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.is18BedAuthorized ? 2 : 1, nsf: 80 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma IP Equipment Storage Room',
          code: 'IPT22',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.is18BedAuthorized ? 2 : 1, nsf: 200 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma IP Patient Equipment Storage Room',
          code: 'IPT23',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.is18BedAuthorized ? 2 : 1, nsf: 120 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma IP Crash Cart Alcove',
          code: 'SC052',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.is18BedAuthorized ? 2 : 1, nsf: 20 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma IP Housekeeping Aides Closet (HAC)',
          code: 'SB244',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.is18BedAuthorized ? 2 : 1, nsf: 60 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 4: PRC PATIENT CARE UNIT PATIENT AND FAMILY SUPPORT AREA',
      rooms: [
        {
          name: 'IP Living Room, Polytrauma',
          code: 'IPT31',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: inputs.is18BedAuthorized ? 600 : 400 };
              },
            },
          ],
        },
        {
          name: 'IP Dining Room, Polytrauma',
          code: 'IPT33',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: inputs.is18BedAuthorized ? 800 : 600 };
              },
            },
          ],
        },
        {
          name: 'IP Kitchen, Polytrauma',
          code: 'IPT35',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: inputs.is18BedAuthorized ? 400 : 360 };
              },
            },
          ],
        },
        {
          name: 'IP Laundry Room, Polytrauma',
          code: 'IPT37',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: inputs.is18BedAuthorized ? 220 : 160 };
              },
            },
          ],
        },
        {
          name: 'IP Family Bedroom, Polytrauma',
          code: 'IPT38',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.is18BedAuthorized ? 2 : 1, nsf: 250 };
              },
            },
          ],
        },
        {
          name: 'IP Family Toilet / Shower, Polytrauma',
          code: 'SB186',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.is18BedAuthorized ? 2 : 1, nsf: 60 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 5: PRC PATIENT CARE UNIT THERAPY AREA',
      rooms: [
        {
          name: 'IP Rehabilitation Therapy Room, Polytrauma',
          code: 'IPT41',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: inputs.is18BedAuthorized ? 1800 : 1500 };
              },
            },
          ],
        },
        {
          name: 'IP PT / OT Evaluation Room, Polytrauma',
          code: 'IPT43',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.is18BedAuthorized ? 4 : 2, nsf: 180 };
              },
            },
          ],
        },
        {
          name: 'IP Quiet Treatment Room, Polytrauma',
          code: 'IPT44',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.is18BedAuthorized ? 2 : 1, nsf: 140 };
              },
            },
          ],
        },
        {
          name: 'IP Cognitive Therapy / Counseling Room, Polytrauma',
          code: 'IPT45',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.is18BedAuthorized ? 2 : 1, nsf: 140 };
              },
            },
          ],
        },
        {
          name: 'IP Therapy Team Room, Polytrauma',
          code: 'SC243',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: inputs.is18BedAuthorized ? 240 : 180 };
              },
            },
          ],
        },
        {
          name: 'IP Therapy Consult Room, Polytrauma',
          code: 'IPT46',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 2, nsf: 140 };
              },
            },
          ],
        },
        {
          name: 'IP Recreation Therapy Room, Polytrauma',
          code: 'IPT51',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: inputs.is18BedAuthorized ? 1600 : 1400 };
              },
            },
          ],
        },
        {
          name: 'IP Recreation Therapy Storage Room, Polytrauma',
          code: 'IPT53',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: inputs.is18BedAuthorized ? 160 : 120 };
              },
            },
          ],
        },
        {
          name: 'IP Computer Room, Polytrauma',
          code: 'IPT55',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: inputs.is18BedAuthorized ? 300 : 200 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma IP Recreational Therapist Workstation',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: 56 };
              },
            },
          ],
        },
        {
          name: 'IP Apartment Living Skills Training Room, Polytrauma',
          code: 'IPT61',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: 650 };
              },
            },
          ],
        },
        {
          name: 'IP Neuropsychology Testing Laboratory, Polytrauma',
          code: 'IPT71',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: inputs.is18BedAuthorized ? 170 : 140 };
              },
            },
          ],
        },
        {
          name: 'IP BROS Treatment Room, Polytrauma',
          code: 'IPT73',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: inputs.is18BedAuthorized ? 670 : 520 };
              },
            },
          ],
        },
        {
          name: 'IP Assistive Technology Laboratory, Polytrauma',
          code: 'IPT81',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: 420 };
              },
            },
          ],
        },
        {
          name: 'IP Rehabilitation Engineering Room, Polytrauma',
          code: 'IPT83',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: 240 };
              },
            },
          ],
        },
        {
          name: 'IP Assistive Technology Storage Room, Polytrauma',
          code: 'IPT85',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: 240 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma IP Speech-Language Pathologist Office',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.is18BedAuthorized ? 2 : 1, nsf: 100 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma IP Housekeeping Aides Closet (HAC)',
          code: 'SB244',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: 60 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 6: PRC PATIENT CARE UNIT STAFF AND ADMINISTRATIVE AREA',
      rooms: [
        {
          name: 'Polytrauma IP Nurse Manager Office',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: 100 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma IP Nurse Educator Workstation',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.is18BedAuthorized ? 2 : 1, nsf: 56 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma IP Provider Office',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.is18BedAuthorized ? 8 : 5, nsf: 100 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma IP Clinical Pharmacist Workstation',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: 56 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma IP Clinical Dietician Workstation',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.is18BedAuthorized ? 2 : 1, nsf: 56 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma IP Military Liaison Workstation',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: 56 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma IP Team Room',
          code: 'SC243',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: inputs.is18BedAuthorized ? 240 : 180 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma IP Staff Conference Room',
          code: 'SS101',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: 300 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma IP Staff Breakroom',
          code: 'SS262',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: 200 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma IP Staff Locker Room',
          code: 'SS282',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: inputs.is18BedAuthorized ? 160 : 100 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma IP Staff Toilet',
          code: 'SB191',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.is18BedAuthorized ? 2 : 1, nsf: 60 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma IP Staff Shower',
          code: 'SB195',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: 70 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 7: PRC RESIDENT CARE UNIT RECEPTION AREA',
      rooms: [
        {
          name: 'Polytrauma Resident Lobby',
          code: 'SB111',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: 300 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma Resident Reception',
          code: 'SC183',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: 260 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma Resident Waiting',
          code: 'SB003',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: inputs.areTwoResidentCareUnitsAuthorized ? 415 : 290 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma Resident Family Waiting',
          code: 'SB051',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: 125 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma Resident Bariatric Patient Toilet',
          code: 'SB163',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 2, nsf: 75 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 8: PRC RESIDENT CARE UNIT RESIDENT UNIT AREA',
      rooms: [
        {
          name: 'Resident Bedroom, Polytrauma',
          code: 'RPT01',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.areTwoResidentCareUnitsAuthorized ? 20 : 10, nsf: 250 };
              },
            },
          ],
        },
        {
          name: 'Resident Bathroom, Polytrauma',
          code: 'RPT02',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.areTwoResidentCareUnitsAuthorized ? 10 : 5, nsf: 70 };
              },
            },
          ],
        },
        {
          name: 'Apartment Living Room, Polytrauma',
          code: 'RPT11',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.areTwoResidentCareUnitsAuthorized ? 4 : 2, nsf: 200 };
              },
            },
          ],
        },
        {
          name: 'Apartment Bedroom, Polytrauma',
          code: 'RPT12',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.areTwoResidentCareUnitsAuthorized ? 4 : 2, nsf: 175 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma Apartment Toilet / Shower',
          code: 'SB180',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.areTwoResidentCareUnitsAuthorized ? 4 : 2, nsf: 80 };
              },
            },
          ],
        },
        {
          name: 'Apartment Kitchenette / Laundry, Polytrauma',
          code: 'RPT14',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.areTwoResidentCareUnitsAuthorized ? 4 : 2, nsf: 180 };
              },
            },
          ],
        },
        {
          name: 'Apartment Storage Room, Polytrauma',
          code: 'RPT15',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.areTwoResidentCareUnitsAuthorized ? 4 : 2, nsf: 60 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 9: PRC RESIDENT CARE UNIT SUPPORT AREA',
      rooms: [
        {
          name: 'Polytrauma Nurse Station',
          code: 'SC152',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.areTwoResidentCareUnitsAuthorized ? 2 : 1, nsf: 180 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma Ward Clerk Workstation',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.areTwoResidentCareUnitsAuthorized ? 2 : 1, nsf: 56 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma Medication Room',
          code: 'SV583',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.areTwoResidentCareUnitsAuthorized ? 2 : 1, nsf: 100 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma Clean Linen Room',
          code: 'SC471',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.areTwoResidentCareUnitsAuthorized ? 2 : 1, nsf: 60 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma Clean Utility Room',
          code: 'SB737',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.areTwoResidentCareUnitsAuthorized ? 2 : 1, nsf: 100 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma Soiled Utility Room',
          code: 'SB743',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.areTwoResidentCareUnitsAuthorized ? 2 : 1, nsf: 80 };
              },
            },
          ],
        },
        {
          name: 'Equipment Storage Room, Polytrauma',
          code: 'RPT22',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.areTwoResidentCareUnitsAuthorized ? 2 : 1, nsf: 100 };
              },
            },
          ],
        },
        {
          name: 'Resident Equipment Storage Room, Polytrauma',
          code: 'RPT23',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.areTwoResidentCareUnitsAuthorized ? 2 : 1, nsf: 120 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma Crash Cart Alcove',
          code: 'SC052',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.areTwoResidentCareUnitsAuthorized ? 2 : 1, nsf: 20 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma Housekeeping Aides Closet (HAC)',
          code: 'SB244',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.areTwoResidentCareUnitsAuthorized ? 2 : 1, nsf: 60 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 10: PRC RESIDENT CARE UNIT RESIDENT AND FAMILY SUPPORT AREA',
      rooms: [
        {
          name: 'Resident Living Room, Polytrauma',
          code: 'RPT31',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: inputs.areTwoResidentCareUnitsAuthorized ? 600 : 400 };
              },
            },
          ],
        },
        {
          name: 'Resident Dining Room, Polytrauma',
          code: 'RPT33',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: inputs.areTwoResidentCareUnitsAuthorized ? 800 : 600 };
              },
            },
          ],
        },
        {
          name: 'Resident Kitchen, Polytrauma',
          code: 'RPT35',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: inputs.areTwoResidentCareUnitsAuthorized ? 400 : 360 };
              },
            },
          ],
        },
        {
          name: 'Resident Laundry Room, Polytrauma',
          code: 'RPT37',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: inputs.areTwoResidentCareUnitsAuthorized ? 220 : 160 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 11: PRC RESIDENT CARE UNIT THERAPY AREA',
      rooms: [
        {
          name: 'Resident Rehabilitation Therapy Room, Polytrauma',
          code: 'RPT41',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: inputs.areTwoResidentCareUnitsAuthorized ? 1800 : 1500 };
              },
            },
          ],
        },
        {
          name: 'Resident PT / OT Evaluation Room, Polytrauma',
          code: 'RPT43',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.areTwoResidentCareUnitsAuthorized ? 4 : 2, nsf: 180 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma Therapy Team Room',
          code: 'SC243',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: inputs.areTwoResidentCareUnitsAuthorized ? 240 : 180 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma Resident Therapy Consult Room',
          code: 'SC271',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.areTwoResidentCareUnitsAuthorized ? 2 : 1, nsf: 140 };
              },
            },
          ],
        },
        {
          name: 'Resident Recreational Computer Activity Room, Polytrauma',
          code: 'RPT52',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: inputs.areTwoResidentCareUnitsAuthorized ? 260 : 200 };
              },
            },
          ],
        },
        {
          name: 'Resident Assistive Technology Laboratory, Polytrauma',
          code: 'RPT54',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: inputs.areTwoResidentCareUnitsAuthorized ? 520 : 420 };
              },
            },
          ],
        },
        {
          name: 'Resident Assistive Technology Equipment Storage Room, Polytrauma',
          code: 'RPT61',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: inputs.areTwoResidentCareUnitsAuthorized ? 300 : 240 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 12: PRC RESIDENT CARE UNIT STAFF AND ADMINISTRATIVE AREA',
      rooms: [
        {
          name: 'Polytrauma Nurse Manager Office',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: 100 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma Psychiatrist Office',
          code: 'SS203',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.areTwoResidentCareUnitsAuthorized ? 2 : 1, nsf: 130 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma Provider Office',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.areTwoResidentCareUnitsAuthorized ? 8 : 5, nsf: 100 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma Speech-Language Pathologist Office',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.areTwoResidentCareUnitsAuthorized ? 2 : 1, nsf: 100 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma Staff Conference Room',
          code: 'SS101',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: 240 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma Staff Breakroom',
          code: 'SS262',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: inputs.areTwoResidentCareUnitsAuthorized ? 280 : 200 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma Staff Locker Room',
          code: 'SS282',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: inputs.areTwoResidentCareUnitsAuthorized ? 180 : 100 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma Female Staff Toilet',
          code: 'SB202',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.areTwoResidentCareUnitsAuthorized ? 4 : 2, nsf: 60 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma Male Staff Toilet',
          code: 'SB203',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.areTwoResidentCareUnitsAuthorized ? 4 : 2, nsf: 60 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 13: OUTPATIENT UNIT RECEPTION AREA',
      rooms: [
        {
          name: 'Polytrauma OP Reception',
          code: 'SC183',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 6) return { roomCount: 1, nsf: 85 };
                if (opExamRooms >= 7 && opExamRooms <= 14) return { roomCount: 1, nsf: 260 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma OP Patient Check-in Kiosk',
          code: 'SC165',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 6) return { roomCount: 1, nsf: 55 };
                if (opExamRooms >= 7 && opExamRooms <= 14) return { roomCount: 2, nsf: 55 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma OP Waiting',
          code: 'SB003',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 6) return { roomCount: 1, nsf: 100 };
                if (opExamRooms >= 7 && opExamRooms <= 8) return { roomCount: 1, nsf: 330 };
                if (opExamRooms >= 9 && opExamRooms <= 10) return { roomCount: 1, nsf: 415 };
                if (opExamRooms >= 11 && opExamRooms <= 12) return { roomCount: 1, nsf: 465 };
                if (opExamRooms >= 13 && opExamRooms <= 14) return { roomCount: 1, nsf: 540 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma OP Family Waiting',
          code: 'SB051',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 6) return { roomCount: 1, nsf: 125 };
                if (opExamRooms >= 7 && opExamRooms <= 14) return { roomCount: 1, nsf: 200 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OP Dayroom, Polytrauma',
          code: 'OPT01',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 6) return { roomCount: 1, nsf: 180 };
                if (opExamRooms >= 7 && opExamRooms <= 10) return { roomCount: 1, nsf: 200 };
                if (opExamRooms >= 11 && opExamRooms <= 14) return { roomCount: 1, nsf: 240 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma OP Bariatric Patient Toilet',
          code: 'SB163',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 6) return { roomCount: 1, nsf: 75 };
                if (opExamRooms >= 7 && opExamRooms <= 14) return { roomCount: 2, nsf: 75 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 14: OUTPATIENT UNIT PATIENT AREA',
      rooms: [
        {
          name: 'OP Exam Room, Polytrauma',
          code: 'OPT11',
          rules: [
            {
              calculate: (inputs) => {
                let count = 0;
                if (inputs.numPolytraumaStops >= 384 && inputs.numPolytraumaStops <= 3840) count = 2;
                else if (inputs.numPolytraumaStops > 3840 && inputs.numPolytraumaStops <= 5760) count = 3;
                else if (inputs.numPolytraumaStops > 5760 && inputs.numPolytraumaStops <= 7680) count = 4;
                else if (inputs.numPolytraumaStops > 7680 && inputs.numPolytraumaStops <= 9600) count = 5;
                else if (inputs.numPolytraumaStops > 9600 && inputs.numPolytraumaStops <= 11520) count = 6;
                return { roomCount: count, nsf: 140 };
              },
            },
          ],
        },
        {
          name: 'OP EMG Exam Room, Polytrauma',
          code: 'OPT13',
          rules: [
            {
              calculate: (inputs) => {
                let count = 0;
                if (inputs.numEmgStops >= 320 && inputs.numEmgStops <= 1600) count = 1;
                else if (inputs.numEmgStops > 1600 && inputs.numEmgStops <= 3200) count = 2;
                else if (inputs.numEmgStops > 3200 && inputs.numEmgStops <= 4800) count = 3;
                else if (inputs.numEmgStops > 4800 && inputs.numEmgStops <= 6400) count = 4;
                return { roomCount: count, nsf: 160 };
              },
            },
          ],
        },
        {
          name: 'OP Chiropractic Exam Room, Polytrauma',
          code: 'OPT14',
          rules: [
            {
              calculate: (inputs) => {
                let count = 0;
                if (inputs.numChiropracticStops >= 427 && inputs.numChiropracticStops <= 2133) count = 1;
                else if (inputs.numChiropracticStops > 2133 && inputs.numChiropracticStops <= 4266) count = 2;
                else if (inputs.numChiropracticStops > 4266 && inputs.numChiropracticStops <= 6399) count = 3;
                else if (inputs.numChiropracticStops > 6400 && inputs.numChiropracticStops <= 8532) count = 4;
                return { roomCount: count, nsf: 160 };
              },
            },
          ],
        },
        {
          name: 'OP Cognitive Therapy / Counseling Room, Polytrauma',
          code: 'OPT12',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 14) return { roomCount: 2, nsf: 140 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OP Procedure Room, Polytrauma',
          code: 'OPT15',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 14) return { roomCount: 1, nsf: 350 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OP Group Room, Polytrauma',
          code: 'OPT16',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 8) return { roomCount: 1, nsf: 240 };
                if (opExamRooms >= 9 && opExamRooms <= 14) return { roomCount: 2, nsf: 240 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OP Telehealth Room, Polytrauma',
          code: 'OPT17',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 8) return { roomCount: 1, nsf: 120 };
                if (opExamRooms >= 9 && opExamRooms <= 14) return { roomCount: 2, nsf: 120 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 15: OUTPATIENT UNIT SUPPORT AREA',
      rooms: [
        {
          name: 'Polytrauma OP Nurse Station',
          code: 'SC152',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms === 4) return { roomCount: 1, nsf: 120 };
                if (opExamRooms >= 5 && opExamRooms <= 8) return { roomCount: 1, nsf: 180 };
                if (opExamRooms >= 9 && opExamRooms <= 12) return { roomCount: 1, nsf: 240 };
                if (opExamRooms >= 13 && opExamRooms <= 14) return { roomCount: 1, nsf: 300 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma OP Medication Room',
          code: 'SV583',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 8) return { roomCount: 1, nsf: 80 };
                if (opExamRooms >= 9 && opExamRooms <= 14) return { roomCount: 1, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma OP Clean Linen Room',
          code: 'SC471',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 8) return { roomCount: 1, nsf: 80 };
                if (opExamRooms >= 9 && opExamRooms <= 14) return { roomCount: 1, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma OP Clean Utility Room',
          code: 'SB737',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 8) return { roomCount: 1, nsf: 80 };
                if (opExamRooms >= 9 && opExamRooms <= 14) return { roomCount: 1, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma OP Soiled Utility Room',
          code: 'SB743',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 8) return { roomCount: 1, nsf: 80 };
                if (opExamRooms >= 9 && opExamRooms <= 14) return { roomCount: 1, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OP Equipment Storage Room, Polytrauma',
          code: 'OPT22',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 8) return { roomCount: 1, nsf: 100 };
                if (opExamRooms >= 9 && opExamRooms <= 14) return { roomCount: 1, nsf: 120 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma OP Crash Cart Alcove',
          code: 'SC052',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 8) return { roomCount: 1, nsf: 20 };
                if (opExamRooms >= 9 && opExamRooms <= 14) return { roomCount: 2, nsf: 20 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma OP Housekeeping Aides Closet (HAC)',
          code: 'SB244',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 14) return { roomCount: 1, nsf: 60 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 16: OUTPATIENT UNIT THERAPY AREA',
      rooms: [
        {
          name: 'OP Driver Training Room, Polytrauma',
          code: 'OPT31',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 14) return { roomCount: 1, nsf: 460 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OP Living Skills Training Room, Polytrauma',
          code: 'OPT32',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 14) return { roomCount: 1, nsf: 300 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OP Gait Observation Laboratory, Polytrauma',
          code: 'OPT33',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 14) return { roomCount: 1, nsf: 600 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OP Gait Observation Storage Room, Polytrauma',
          code: 'OPT34',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 14) return { roomCount: 1, nsf: 200 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OP Gait Laboratory Exam Room, Polytrauma',
          code: 'OPT35',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 14) return { roomCount: 1, nsf: 160 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OP Rehabilitation Therapy Room, Polytrauma',
          code: 'OPT36',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 14) return { roomCount: 1, nsf: 3800 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OP PT / OT Evaluation Room, Polytrauma',
          code: 'OPT37',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 14) return { roomCount: 1, nsf: 180 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma OP PRC OP Team Room',
          code: 'SC243',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms === 4) return { roomCount: 1, nsf: 180 };
                if (opExamRooms >= 5 && opExamRooms <= 10) return { roomCount: 1, nsf: 240 };
                if (opExamRooms >= 11 && opExamRooms <= 14) return { roomCount: 1, nsf: 300 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma OP Therapy Consult Room',
          code: 'SC271',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 6) return { roomCount: 1, nsf: 140 };
                if (opExamRooms >= 7 && opExamRooms <= 14) return { roomCount: 2, nsf: 140 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OP Speech Therapy Laboratory, Polytrauma',
          code: 'OPT42',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 14) return { roomCount: 1, nsf: 300 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OP Patient Balance Testing Room, Polytrauma',
          code: 'OPT43',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 14) return { roomCount: 1, nsf: 200 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OP Vestibular Room, Polytrauma',
          code: 'OPT44',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 14) return { roomCount: 1, nsf: 200 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OP Recreational Therapy Room, Polytrauma',
          code: 'OPT45',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 14) return { roomCount: 1, nsf: 500 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OP Recreation Therapy Equipment Storage Room, Polytrauma',
          code: 'OPT46',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 14) return { roomCount: 1, nsf: 200 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OP Recreational Therapist Treatment Station, Polytrauma',
          code: 'OPT47',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 6) return { roomCount: 2, nsf: 56 };
                if (opExamRooms >= 7 && opExamRooms <= 10) return { roomCount: 3, nsf: 56 };
                if (opExamRooms >= 11 && opExamRooms <= 14) return { roomCount: 4, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'OP BROS Treatment / Office, Polytrauma',
          code: 'OPT48',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 14) return { roomCount: 1, nsf: 520 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 17: OUTPATIENT UNIT STAFF AND ADMINISTRATIVE AREA',
      rooms: [
        {
          name: 'Polytrauma OP Nurse Manager Office',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 14) return { roomCount: 1, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma OP Physiatrist Office',
          code: 'SS203',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 6) return { roomCount: 1, nsf: 130 };
                if (opExamRooms >= 7 && opExamRooms <= 14) return { roomCount: 2, nsf: 130 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma OP Provider Office',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms === 4) return { roomCount: 2, nsf: 100 };
                if (opExamRooms >= 5 && opExamRooms <= 6) return { roomCount: 3, nsf: 100 };
                if (opExamRooms >= 7 && opExamRooms <= 10) return { roomCount: 4, nsf: 100 };
                if (opExamRooms >= 11 && opExamRooms <= 14) return { roomCount: 5, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma OP Speech-Language Pathologist Office',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms === 4) return { roomCount: 1, nsf: 100 };
                if (opExamRooms >= 5 && opExamRooms <= 14) return { roomCount: 2, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma OP Nurse Case Manager Office',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 6) return { roomCount: 1, nsf: 100 };
                if (opExamRooms >= 7 && opExamRooms <= 14) return { roomCount: 2, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma OP Military Liaison Workstation',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 14) return { roomCount: 1, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma OP Staff Conference Room',
          code: 'SS101',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 6) return { roomCount: 1, nsf: 240 };
                if (opExamRooms >= 7 && opExamRooms <= 14) return { roomCount: 1, nsf: 300 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma OP Staff Breakroom',
          code: 'SS262',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 6) return { roomCount: 1, nsf: 200 };
                if (opExamRooms >= 7 && opExamRooms <= 14) return { roomCount: 1, nsf: 300 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma OP Female Staff Locker Room',
          code: 'SS232',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms === 4) return { roomCount: 1, nsf: 100 };
                if (opExamRooms >= 5 && opExamRooms <= 10) return { roomCount: 1, nsf: 140 };
                if (opExamRooms >= 11 && opExamRooms <= 14) return { roomCount: 1, nsf: 180 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma OP Female Staff Toilet',
          code: 'SB202',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 6) return { roomCount: 1, nsf: 60 };
                if (opExamRooms >= 7 && opExamRooms <= 14) return { roomCount: 2, nsf: 60 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma OP Male Staff Locker Room',
          code: 'SS241',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms === 4) return { roomCount: 1, nsf: 100 };
                if (opExamRooms >= 5 && opExamRooms <= 10) return { roomCount: 1, nsf: 140 };
                if (opExamRooms >= 11 && opExamRooms <= 14) return { roomCount: 1, nsf: 180 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma OP Male Staff Toilet',
          code: 'SB203',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 6) return { roomCount: 1, nsf: 60 };
                if (opExamRooms >= 7 && opExamRooms <= 14) return { roomCount: 2, nsf: 60 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 18: PRC STAFF AND ADMINISTRATIVE AREA',
      rooms: [
        {
          name: 'Polytrauma PRC Director Office',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: 100 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma PRC Administrative Officer (AO) Office',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: 100 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma PRC Administrative Assistant Workstation',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 6) return { roomCount: 1, nsf: 56 };
                if (opExamRooms >= 7 && opExamRooms <= 14) return { roomCount: 2, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma PRC Inpatient Medical Director Office',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: 100 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma PRC Inpatient Administrative Officer (AO) Office',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: 100 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma PRC Inpatient Program Assistant Workstation',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: 56 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma PRC PTRP Unit Director Office',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: 100 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma PRC PTRP Administrative Officer (AO) Office',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: 100 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma PRC PTRP Unit Program Assistant Workstation',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: 56 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma PRC Outpatient Medical Director Office',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: 100 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma PRC Outpatient Administrative Officer (AO) Office',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: 100 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma PRC Outpatient Program Assistant Workstation',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms >= 4 && opExamRooms <= 6) return { roomCount: 1, nsf: 56 };
                if (opExamRooms >= 7 && opExamRooms <= 14) return { roomCount: 2, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma PRC Copy Room / Mail Distribution',
          code: 'SB658',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms === 4) return { roomCount: 1, nsf: 100 };
                if (opExamRooms >= 5 && opExamRooms <= 14) return { roomCount: 1, nsf: 120 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma PRC Staff Conference Room',
          code: 'SS101',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms === 4) return { roomCount: 1, nsf: 300 };
                if (opExamRooms >= 5 && opExamRooms <= 6) return { roomCount: 1, nsf: 500 };
                if (opExamRooms >= 7 && opExamRooms <= 14) return { roomCount: 1, nsf: 675 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 19: EDUCATION AREA',
      rooms: [
        {
          name: 'Polytrauma PRC Residency Program Director Office',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: 1, nsf: 100 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma PRC Resident (Intern / Fellow) Workstation',
          code: 'SS217',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms === 4) return { roomCount: 4, nsf: 48 };
                if (opExamRooms >= 5 && opExamRooms <= 6) return { roomCount: 6, nsf: 48 };
                if (opExamRooms >= 7 && opExamRooms <= 14) return { roomCount: 7, nsf: 48 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Polytrauma PRC Resident Training Room',
          code: 'SS111',
          rules: [
            {
              calculate: (inputs) => {
                const opExamRooms = calculateOpExamRooms(inputs);
                if (opExamRooms === 4) return { roomCount: 1, nsf: 300 };
                if (opExamRooms >= 5 && opExamRooms <= 14) return { roomCount: 1, nsf: 545 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
  ],
};
