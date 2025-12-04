// Chapter 104: Spinal Cord Injury / Disorders Center (SCI/D) - Acute Care
// Based on VA PG-18-9 Space Planning Criteria

export const CHAPTER_104 = {
  chapter: '104',
  name: 'Spinal Cord Injury / Disorders Center (SCI/D) - Acute Care',
  description: 'Acute care patient unit for spinal cord injury and disorders',
  
  inputs: [
    {
      id: 'ac_patient_beds',
      label: 'Number of SCI/D Acute Care (AC) Patient Beds',
      type: 'number',
      min: 1,
      max: 100,
      defaultValue: 10
    }
  ],
  
  functionalAreas: [
    {
      name: 'FA1: SCI/D Center Acute Care Patient Care Unit (AC-PCU) Calculation',
      rooms: [
        {
          id: 'SC145',
          name: 'Number of Acute Care Patient Care Units (AC-PCUs)',
          nsf: 0,
          rules: [
            { condition: (inputs) => inputs.ac_patient_beds >= 1 && inputs.ac_patient_beds <= 10, quantity: 1 },
            { condition: (inputs) => inputs.ac_patient_beds >= 11 && inputs.ac_patient_beds <= 20, quantity: 2 },
            { condition: (inputs) => inputs.ac_patient_beds >= 21 && inputs.ac_patient_beds <= 30, quantity: 3 },
            { condition: (inputs) => inputs.ac_patient_beds >= 31 && inputs.ac_patient_beds <= 40, quantity: 4 },
            { condition: (inputs) => inputs.ac_patient_beds >= 41 && inputs.ac_patient_beds <= 50, quantity: 5 },
            { condition: (inputs) => inputs.ac_patient_beds >= 51 && inputs.ac_patient_beds <= 60, quantity: 6 },
            { condition: (inputs) => inputs.ac_patient_beds >= 61 && inputs.ac_patient_beds <= 70, quantity: 7 },
            { condition: (inputs) => inputs.ac_patient_beds >= 71 && inputs.ac_patient_beds <= 80, quantity: 8 },
            { condition: (inputs) => inputs.ac_patient_beds >= 81 && inputs.ac_patient_beds <= 90, quantity: 9 },
            { condition: (inputs) => inputs.ac_patient_beds >= 91 && inputs.ac_patient_beds <= 100, quantity: 10 }
          ]
        }
      ]
    },
    {
      name: 'FA2: SCI/D Center Acute Care (AC) Reception Area',
      rooms: [
        {
          id: 'SB071',
          name: 'SCI AC Accessible Waiting',
          nsf: 220,
          rules: [
            { condition: (results) => results.SC145 <= 2, quantity: 1, nsf: 220 },
            { condition: (results) => results.SC145 === 3, quantity: 1, nsf: 345 },
            { condition: (results) => results.SC145 === 4, quantity: 1, nsf: 435 },
            { condition: (results) => results.SC145 === 5, quantity: 1, nsf: 565 },
            { condition: (results) => results.SC145 === 6, quantity: 1, nsf: 600 },
            { condition: (results) => results.SC145 === 7, quantity: 1, nsf: 705 },
            { condition: (results) => results.SC145 === 8, quantity: 1, nsf: 750 },
            { condition: (results) => results.SC145 > 8, quantity: 2, nsf: 565 }
          ]
        },
        {
          id: 'SB132',
          name: 'SCI AC Information Desk',
          nsf: 65,
          rules: [
            { condition: (results) => results.SC145 >= 1 && results.SC145 <= 3, quantity: 1, nsf: 65 },
            { condition: (results) => results.SC145 >= 4 && results.SC145 <= 6, quantity: 1, nsf: 130 },
            { condition: (results) => results.SC145 >= 7, quantity: 1, nsf: 180 }
          ]
        },
        {
          id: 'SC004',
          name: 'SCI AC Admissions / Discharge',
          nsf: 140,
          rules: [
            { condition: (results) => results.SC145 >= 1 && results.SC145 <= 3, quantity: 1, nsf: 140 },
            { condition: (results) => results.SC145 >= 4 && results.SC145 <= 6, quantity: 1, nsf: 220 },
            { condition: (results) => results.SC145 >= 7, quantity: 1, nsf: 300 }
          ]
        },
        {
          id: 'SB086',
          name: 'SCI AC Visitor Lounge',
          nsf: 160,
          rules: [
            { condition: (results) => results.SC145 >= 1 && results.SC145 <= 3, quantity: 1, nsf: 160 },
            { condition: (results) => results.SC145 >= 4 && results.SC145 <= 6, quantity: 1, nsf: 240 },
            { condition: (results) => results.SC145 >= 7, quantity: 1, nsf: 360 }
          ]
        },
        {
          id: 'SB191',
          name: 'SCI AC Public Toilet',
          nsf: 60,
          rules: [
            { condition: (results) => results.SC145 >= 1, quantity: 2 }
          ]
        }
      ]
    },
    {
      name: 'FA3: SCI/D Center Acute Care Patient Care Unit (AC-PCU) Patient Area',
      rooms: [
        {
          id: 'ISC05',
          name: 'AC Patient Bedroom, SCI',
          nsf: 350,
          rules: [
            { condition: (results) => results.SC145 >= 1, quantity: (results) => results.SC145 * 9 }
          ],
          comment: 'Patient Closet included in NSF'
        },
        {
          id: 'SB154',
          name: 'SCI AC Patient Toilet / Shower',
          nsf: 120,
          rules: [
            { condition: (results) => results.ISC05 > 0, quantity: (results) => results.ISC05 }
          ],
          comment: 'One per AC Single Patient Bedroom'
        },
        {
          id: 'ISC07',
          name: 'AC Airborne Infection Isolation (AII) Bedroom, SCI',
          nsf: 320,
          rules: [
            { condition: (results) => results.SC145 >= 1, quantity: (results) => results.SC145 }
          ],
          comment: 'Part of three-room AII suite'
        },
        {
          id: 'ISC08',
          name: 'AC Airborne Infection Isolation (AII) Anteroom, SCI',
          nsf: 115,
          rules: [
            { condition: (results) => results.SC145 >= 1, quantity: (results) => results.SC145 }
          ],
          comment: 'Part of three-room AII suite'
        },
        {
          id: 'SB142',
          name: 'SCI AC Airborne Infection Isolation Toilet / Shower',
          nsf: 150,
          rules: [
            { condition: (results) => results.SC145 >= 1, quantity: (results) => results.SC145 }
          ],
          comment: 'Part of three-room AII suite'
        },
        {
          id: 'SV272',
          name: 'SCI AC Nourishment Room',
          nsf: 60,
          rules: [
            { condition: (results) => results.SC145 >= 1, quantity: (results) => results.SC145 }
          ]
        },
        {
          id: 'ISC10',
          name: 'AC Laundry Room, SCI',
          nsf: 140,
          rules: [
            { condition: (results) => results.SC145 >= 1 && results.SC145 <= 2, quantity: 1 },
            { condition: (results) => results.SC145 >= 3 && results.SC145 <= 4, quantity: 2 },
            { condition: (results) => results.SC145 >= 5 && results.SC145 <= 6, quantity: 3 },
            { condition: (results) => results.SC145 >= 7 && results.SC145 <= 8, quantity: 4 },
            { condition: (results) => results.SC145 >= 9, quantity: 5 }
          ],
          comment: 'For patient and family member use'
        },
        {
          id: 'SB201',
          name: 'SCI AC Patient Toilet',
          nsf: 60,
          rules: [
            { condition: (results) => results.SC145 >= 1 && results.SC145 <= 2, quantity: 1 },
            { condition: (results) => results.SC145 >= 3 && results.SC145 <= 4, quantity: 2 },
            { condition: (results) => results.SC145 >= 5 && results.SC145 <= 6, quantity: 3 },
            { condition: (results) => results.SC145 >= 7 && results.SC145 <= 8, quantity: 4 },
            { condition: (results) => results.SC145 >= 9, quantity: 5 }
          ]
        }
      ]
    },
    {
      name: 'FA4: SCI/D Center Acute Care Patient Care Unit (AC-PCU) Support Area',
      rooms: [
        {
          id: 'SC152',
          name: 'SCI AC Nurse Station',
          nsf: 360,
          rules: [
            { condition: (results) => results.SC145 >= 1, quantity: (results) => results.SC145 }
          ]
        },
        {
          id: 'SS204',
          name: 'SCI AC Nurse Supervisor Office',
          nsf: 100,
          rules: [
            { condition: (results) => results.SC145 >= 1 && results.SC145 <= 2, quantity: 1 },
            { condition: (results) => results.SC145 >= 3 && results.SC145 <= 4, quantity: 2 },
            { condition: (results) => results.SC145 >= 5 && results.SC145 <= 6, quantity: 3 },
            { condition: (results) => results.SC145 >= 7 && results.SC145 <= 8, quantity: 4 },
            { condition: (results) => results.SC145 >= 9, quantity: 5 }
          ]
        },
        {
          id: 'SS218_CHART',
          name: 'SCI AC Charting Workstation',
          nsf: 56,
          rules: [
            { condition: (results) => results.SC145 >= 1 && results.SC145 <= 2, quantity: 1 },
            { condition: (results) => results.SC145 >= 3 && results.SC145 <= 4, quantity: 2 },
            { condition: (results) => results.SC145 >= 5 && results.SC145 <= 6, quantity: 3 },
            { condition: (results) => results.SC145 >= 7 && results.SC145 <= 8, quantity: 4 },
            { condition: (results) => results.SC145 >= 9, quantity: 5 }
          ]
        },
        {
          id: 'SS218_CLERK',
          name: 'SCI AC Clerk Workstation',
          nsf: 56,
          rules: [
            { condition: (results) => results.SC145 >= 1 && results.SC145 <= 3, quantity: 1 },
            { condition: (results) => results.SC145 >= 4 && results.SC145 <= 6, quantity: 2 },
            { condition: (results) => results.SC145 >= 7, quantity: 3 }
          ]
        },
        {
          id: 'SV583',
          name: 'SCI AC Medication Room',
          nsf: 100,
          rules: [
            { condition: (results) => results.SC145 >= 1 && results.SC145 <= 2, quantity: 1 },
            { condition: (results) => results.SC145 >= 3 && results.SC145 <= 4, quantity: 2 },
            { condition: (results) => results.SC145 >= 5 && results.SC145 <= 6, quantity: 3 },
            { condition: (results) => results.SC145 >= 7 && results.SC145 <= 8, quantity: 4 },
            { condition: (results) => results.SC145 >= 9, quantity: 5 }
          ]
        },
        {
          id: 'SB737',
          name: 'SCI AC Clean Utility Room',
          nsf: 80,
          rules: [
            { condition: (results) => results.SC145 >= 1 && results.SC145 <= 2, quantity: 1 },
            { condition: (results) => results.SC145 >= 3 && results.SC145 <= 4, quantity: 2 },
            { condition: (results) => results.SC145 >= 5 && results.SC145 <= 6, quantity: 3 },
            { condition: (results) => results.SC145 >= 7 && results.SC145 <= 8, quantity: 4 },
            { condition: (results) => results.SC145 >= 9, quantity: 5 }
          ]
        },
        {
          id: 'SB743',
          name: 'SCI AC Soiled Utility Room',
          nsf: 60,
          rules: [
            { condition: (results) => results.SC145 >= 1 && results.SC145 <= 2, quantity: 1 },
            { condition: (results) => results.SC145 >= 3 && results.SC145 <= 4, quantity: 2 },
            { condition: (results) => results.SC145 >= 5 && results.SC145 <= 6, quantity: 3 },
            { condition: (results) => results.SC145 >= 7 && results.SC145 <= 8, quantity: 4 },
            { condition: (results) => results.SC145 >= 9, quantity: 5 }
          ]
        },
        {
          id: 'ISC13',
          name: 'AC Evacuation Equipment Room, SCI',
          nsf: 100,
          rules: [
            { condition: (results) => results.SC145 >= 1 && results.SC145 <= 3, quantity: 1 },
            { condition: (results) => results.SC145 >= 4 && results.SC145 <= 6, quantity: 2 },
            { condition: (results) => results.SC145 >= 7, quantity: 3 }
          ]
        },
        {
          id: 'SC471',
          name: 'SCI AC Clean Linen Room',
          nsf: 60,
          rules: [
            { condition: (results) => results.SC145 >= 1, quantity: (results) => results.SC145 }
          ]
        },
        {
          id: 'SB780',
          name: 'SCI AC Transfer Equipment Room',
          nsf: 120,
          rules: [
            { condition: (results) => results.SC145 >= 1, quantity: (results) => results.SC145 }
          ]
        },
        {
          id: 'SB255',
          name: 'SCI AC Stretcher Room',
          nsf: 120,
          rules: [
            { condition: (results) => results.SC145 >= 1, quantity: (results) => results.SC145 }
          ]
        },
        {
          id: 'ISC17',
          name: 'AC Equipment Room, SCI',
          nsf: 120,
          rules: [
            { condition: (results) => results.SC145 >= 1, quantity: (results) => results.SC145 }
          ]
        },
        {
          id: 'SB711',
          name: 'SCI AC Patient Belongings Storage Room',
          nsf: 100,
          rules: [
            { condition: (results) => results.SC145 >= 1, quantity: (results) => results.SC145 }
          ]
        },
        {
          id: 'SB252',
          name: 'SCI AC Wheelchair / Stretcher Alcove',
          nsf: 90,
          rules: [
            { condition: (results) => results.SC145 >= 1 && results.SC145 <= 2, quantity: 1 },
            { condition: (results) => results.SC145 >= 3 && results.SC145 <= 4, quantity: 2 },
            { condition: (results) => results.SC145 >= 5 && results.SC145 <= 6, quantity: 3 },
            { condition: (results) => results.SC145 >= 7 && results.SC145 <= 8, quantity: 4 },
            { condition: (results) => results.SC145 >= 9, quantity: 5 }
          ]
        },
        {
          id: 'SB244',
          name: 'SCI AC Housekeeping Aides Closet (HAC)',
          nsf: 60,
          rules: [
            { condition: (results) => results.SC145 >= 1 && results.SC145 <= 2, quantity: 1 },
            { condition: (results) => results.SC145 >= 3 && results.SC145 <= 4, quantity: 2 },
            { condition: (results) => results.SC145 >= 5 && results.SC145 <= 6, quantity: 3 },
            { condition: (results) => results.SC145 >= 7 && results.SC145 <= 8, quantity: 4 },
            { condition: (results) => results.SC145 >= 9, quantity: 5 }
          ]
        }
      ]
    },
    {
      name: 'FA5: SCI/D Center Acute Care Patient Care Unit (AC-PCU) Common Area',
      rooms: [
        {
          id: 'SC267',
          name: 'SCI AC Consult Room',
          nsf: 140,
          rules: [
            { condition: (results) => results.SC145 >= 1 && results.SC145 <= 3, quantity: 1 },
            { condition: (results) => results.SC145 >= 4 && results.SC145 <= 6, quantity: 2 },
            { condition: (results) => results.SC145 >= 7, quantity: 3 }
          ]
        },
        {
          id: 'SC171',
          name: 'SCI AC Patient Education Room',
          nsf: 160,
          rules: [
            { condition: (results) => results.SC145 >= 1 && results.SC145 <= 5, quantity: 1 },
            { condition: (results) => results.SC145 >= 6, quantity: 2 }
          ]
        },
        {
          id: 'ISC23',
          name: 'AC Multipurpose Recreation Room, SCI',
          nsf: 1100,
          rules: [
            { condition: (results) => results.SC145 >= 1 && results.SC145 <= 3, quantity: 1, nsf: 1100 },
            { condition: (results) => results.SC145 >= 4 && results.SC145 <= 6, quantity: 1, nsf: 1800 },
            { condition: (results) => results.SC145 >= 7, quantity: 1, nsf: 2600 }
          ]
        },
        {
          id: 'ISC26',
          name: 'AC Recreation Therapist Treatment Station, SCI',
          nsf: 56,
          rules: [
            { condition: (results) => results.SC145 >= 1 && results.SC145 <= 3, quantity: 1 },
            { condition: (results) => results.SC145 >= 4 && results.SC145 <= 6, quantity: 2 },
            { condition: (results) => results.SC145 >= 7, quantity: 3 }
          ]
        },
        {
          id: 'ISC27',
          name: 'AC Dining Room, SCI',
          nsf: 1600,
          rules: [
            { condition: (results) => results.SC145 >= 1 && results.SC145 <= 5, quantity: 1 },
            { condition: (results) => results.SC145 >= 6, quantity: 2 }
          ]
        },
        {
          id: 'ISC28',
          name: 'AC Meditation Room, SCI',
          nsf: 100,
          rules: [
            { condition: (results) => results.SC145 >= 1, quantity: 1 }
          ]
        },
        {
          id: 'ISC29',
          name: 'AC Dayroom, SCI',
          nsf: 400,
          rules: [
            { condition: (results) => results.SC145 >= 1 && results.SC145 <= 3, quantity: 1 },
            { condition: (results) => results.SC145 >= 4 && results.SC145 <= 6, quantity: 2 },
            { condition: (results) => results.SC145 >= 7, quantity: 3 }
          ]
        },
        {
          id: 'SV697',
          name: 'SCI AC Internet Cafe',
          nsf: 360,
          rules: [
            { condition: (results) => results.SC145 >= 1 && results.SC145 <= 3, quantity: 1, nsf: 360 },
            { condition: (results) => results.SC145 >= 4 && results.SC145 <= 6, quantity: 1, nsf: 480 },
            { condition: (results) => results.SC145 >= 7, quantity: 1, nsf: 600 }
          ]
        },
        {
          id: 'SB201_COMMON',
          name: 'SCI AC Patient Toilet (Common)',
          nsf: 60,
          rules: [
            { condition: (results) => results.SC145 >= 1 && results.SC145 <= 2, quantity: 1 },
            { condition: (results) => results.SC145 >= 3 && results.SC145 <= 4, quantity: 2 },
            { condition: (results) => results.SC145 >= 5 && results.SC145 <= 6, quantity: 3 },
            { condition: (results) => results.SC145 >= 7 && results.SC145 <= 8, quantity: 4 },
            { condition: (results) => results.SC145 >= 9, quantity: 5 }
          ]
        },
        {
          id: 'SV388',
          name: 'SCI AC Food Service Retherm Room',
          nsf: 100,
          rules: [
            { condition: (results) => results.SC145 >= 1 && results.SC145 <= 5, quantity: 1 },
            { condition: (results) => results.SC145 >= 6, quantity: 2 }
          ],
          comment: 'For reheating food in carts from Food & Nutrition Services'
        },
        {
          id: 'SV387',
          name: 'SCI AC Food Cart (Hot / Cold Holding Room)',
          nsf: 60,
          rules: [
            { condition: (results) => results.SC145 >= 1 && results.SC145 <= 2, quantity: 1 },
            { condition: (results) => results.SC145 >= 3 && results.SC145 <= 4, quantity: 2 },
            { condition: (results) => results.SC145 >= 5 && results.SC145 <= 6, quantity: 3 },
            { condition: (results) => results.SC145 >= 7 && results.SC145 <= 8, quantity: 4 },
            { condition: (results) => results.SC145 >= 9, quantity: 5 }
          ]
        },
        {
          id: 'SC180',
          name: 'SCI AC Portable Imaging Equipment Alcove',
          nsf: 30,
          rules: [
            { condition: (results) => results.SC145 >= 1 && results.SC145 <= 2, quantity: 1 },
            { condition: (results) => results.SC145 >= 3 && results.SC145 <= 4, quantity: 2 },
            { condition: (results) => results.SC145 >= 5 && results.SC145 <= 6, quantity: 3 },
            { condition: (results) => results.SC145 >= 7 && results.SC145 <= 8, quantity: 4 },
            { condition: (results) => results.SC145 >= 9, quantity: 5 }
          ]
        },
        {
          id: 'SC052',
          name: 'SCI AC Crash Cart Alcove',
          nsf: 20,
          rules: [
            { condition: (results) => results.SC145 >= 1 && results.SC145 <= 2, quantity: 1 },
            { condition: (results) => results.SC145 >= 3 && results.SC145 <= 4, quantity: 2 },
            { condition: (results) => results.SC145 >= 5 && results.SC145 <= 6, quantity: 3 },
            { condition: (results) => results.SC145 >= 7 && results.SC145 <= 8, quantity: 4 },
            { condition: (results) => results.SC145 >= 9, quantity: 5 }
          ]
        },
        {
          id: 'SC072',
          name: 'SCI AC Isolation Cart / Wound Treatment Cart Alcove',
          nsf: 30,
          rules: [
            { condition: (results) => results.SC145 >= 1, quantity: (results) => results.SC145 }
          ]
        },
        {
          id: 'ISC37',
          name: 'AC Multipurpose Recreation Storage Room, SCI',
          nsf: 150,
          rules: [
            { condition: (results) => results.SC145 >= 1 && results.SC145 <= 3, quantity: 1, nsf: 150 },
            { condition: (results) => results.SC145 >= 4 && results.SC145 <= 6, quantity: 1, nsf: 500 },
            { condition: (results) => results.SC145 >= 7, quantity: 1, nsf: 700 }
          ]
        },
        {
          id: 'ISC41',
          name: 'AC Dining Storage Room, SCI',
          nsf: 120,
          rules: [
            { condition: (results) => results.SC145 >= 1 && results.SC145 <= 3, quantity: 1, nsf: 120 },
            { condition: (results) => results.SC145 >= 4 && results.SC145 <= 6, quantity: 1, nsf: 150 },
            { condition: (results) => results.SC145 >= 7, quantity: 1, nsf: 200 }
          ]
        }
      ]
    }
  ]
};
