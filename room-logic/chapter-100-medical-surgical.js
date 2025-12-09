// Chapter 100: Medical / Surgical Patient Care Unit (MS-PCU)
// Parsed from VA Space Planning Criteria Section 5

export const CHAPTER_100 = {
  chapter: "100",
  name: "Medical / Surgical Patient Care Unit (MS-PCU)",
  description: "Medical and Surgical Patient Care Units for acute inpatient care",
  
  // Section 4: Input Data Statements - what the user needs to provide
  inputs: [
    {
      id: "acute_ms_beds",
      label: "Acute Inpatient Medical/Surgical patient beds projected",
      type: "number",
      min: 17,
      max: 267,
      helpText: "Total number of projected Med/Surg acute care beds (minimum 17, maximum 267)"
    }
  ],
  
  // Section 5: Space Planning Criteria - the calculation logic
  functionalAreas: [
    {
      id: "FA1",
      name: "Medical / Surgical Inpatient Unit Calculation",
      description: "Determines number of MS-PCU units needed (min 17 beds, max 33 beds per unit)",
      rooms: [
        {
          id: "SC131",
          code: "SC131",
          name: "Number of MS PCUs, Clncl Sprt",
          nsf: 0,
          type: "calculation", // This is a calculated value, not a physical room
          rules: [
            { condition: (inputs) => inputs.acute_ms_beds >= 17 && inputs.acute_ms_beds <= 33, quantity: 1 },
            { condition: (inputs) => inputs.acute_ms_beds >= 34 && inputs.acute_ms_beds <= 66, quantity: 2 },
            { condition: (inputs) => inputs.acute_ms_beds >= 67 && inputs.acute_ms_beds <= 99, quantity: 3 },
            { condition: (inputs) => inputs.acute_ms_beds >= 100 && inputs.acute_ms_beds <= 132, quantity: 4 },
            { condition: (inputs) => inputs.acute_ms_beds >= 133 && inputs.acute_ms_beds <= 165, quantity: 5 },
            { condition: (inputs) => inputs.acute_ms_beds >= 166 && inputs.acute_ms_beds <= 198, quantity: 6 },
            { condition: (inputs) => inputs.acute_ms_beds >= 199 && inputs.acute_ms_beds <= 231, quantity: 7 },
            { condition: (inputs) => inputs.acute_ms_beds >= 232 && inputs.acute_ms_beds <= 267, quantity: 8 }
          ]
        }
      ]
    },
    {
      id: "FA2",
      name: "Medical / Surgical Inpatient Unit Reception Area",
      description: "Waiting areas, consult rooms, and family support spaces",
      rooms: [
        {
          id: "SB003",
          code: "SB003",
          name: "MS PCU Waiting, Bldg Sprt",
          nsf: 330,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1,
              quantity: (inputs, calc) => calc.SC131,
              multiplier: "per_unit"
            }
          ],
          notes: "Can be aggregated with waiting space for other similar adjacent units"
        },
        {
          id: "SC271",
          code: "SC271",
          name: "MS PCU Consult Room, Clncl Sprt",
          nsf: 120,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1,
              quantity: (inputs, calc) => calc.SC131 * 2
            }
          ],
          notes: "Provides privacy for grieving or counseling. Access from both Waiting and corridor."
        },
        {
          id: "SB086",
          code: "SB086",
          name: "MS PCU Family Lounge, Bldg Sprt",
          nsf: 120,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1,
              quantity: (inputs, calc) => calc.SC131
            }
          ],
          notes: "Consider combining with Family Pantry. Consider sharing with adjacent MS units."
        },
        {
          id: "IMS11",
          code: "IMS11",
          name: "Family Pantry, MS PCU",
          nsf: 80,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1,
              quantity: (inputs, calc) => calc.SC131
            }
          ],
          notes: "Consider combining with Family Lounge. Consider sharing with adjacent MS units."
        },
        {
          id: "SC170",
          code: "SC170",
          name: "MS PCU Patient Education Workstation, Clncl Sprt",
          nsf: 40,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1,
              quantity: (inputs, calc) => calc.SC131
            }
          ],
          notes: "For private patient education and medical information. Locate accessible to Waiting."
        },
        {
          id: "SB191",
          code: "SB191",
          name: "MS PCU Visitor Toilet, Bldg Sprt",
          nsf: 60,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1,
              quantity: (inputs, calc) => calc.SC131
            }
          ],
          notes: "One accessible toilet @ 25 NSF, one wall-hung lavatory @ 12 NSF, ABA clearances"
        },
        {
          id: "SB136",
          code: "SB136",
          name: "MS PCU Family Toilet, Bldg Sprt",
          nsf: 80,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1,
              quantity: (inputs, calc) => calc.SC131
            }
          ]
        }
      ]
    },
    {
      id: "FA3",
      name: "Medical / Surgical Inpatient Unit Patient Area",
      description: "Patient bedrooms and associated toilet/shower facilities",
      rooms: [
        {
          id: "IMS21",
          code: "IMS21",
          name: "Patient Bedroom, MS PCU",
          nsf: 280,
          rules: [
            { condition: (inputs, calc) => calc.SC131 === 1, quantity: 24 },
            { condition: (inputs, calc) => calc.SC131 === 2, quantity: 45 },
            { condition: (inputs, calc) => calc.SC131 === 3, quantity: 69 },
            { condition: (inputs, calc) => calc.SC131 === 4, quantity: 93 },
            { condition: (inputs, calc) => calc.SC131 === 5, quantity: 114 },
            { condition: (inputs, calc) => calc.SC131 === 6, quantity: 138 },
            { condition: (inputs, calc) => calc.SC131 === 7, quantity: 162 },
            { condition: (inputs, calc) => calc.SC131 === 8, quantity: 186 }
          ]
        },
        {
          id: "SB147_patient",
          code: "SB147",
          name: "MS PCU Patient Toilet / Shower, Bldg Sprt",
          nsf: 70,
          rules: [
            { 
              condition: (inputs, calc) => calc.IMS21 >= 1,
              quantity: (inputs, calc) => calc.IMS21
            }
          ],
          notes: "One per Patient Bedroom. Accessible toilet, lavatory, shower with ABA clearances"
        },
        {
          id: "IMS23",
          code: "IMS23",
          name: "Airborne Infection Isolation (AII) Bedroom, MS PCU",
          nsf: 240,
          rules: [
            { condition: (inputs, calc) => calc.SC131 === 1, quantity: 3 },
            { condition: (inputs, calc) => calc.SC131 === 2, quantity: 7 },
            { condition: (inputs, calc) => calc.SC131 === 3, quantity: 10 },
            { condition: (inputs, calc) => calc.SC131 === 4, quantity: 13 },
            { condition: (inputs, calc) => calc.SC131 === 5, quantity: 17 },
            { condition: (inputs, calc) => calc.SC131 === 6, quantity: 20 },
            { condition: (inputs, calc) => calc.SC131 === 7, quantity: 23 },
            { condition: (inputs, calc) => calc.SC131 === 8, quantity: 27 }
          ],
          notes: "Negative Pressure"
        },
        {
          id: "IMS24",
          code: "IMS24",
          name: "Airborne Infection Isolation (AII) Anteroom, MS PCU",
          nsf: 65,
          rules: [
            { 
              condition: (inputs, calc) => calc.IMS23 >= 1,
              quantity: (inputs, calc) => calc.IMS23
            }
          ]
        },
        {
          id: "IMS25",
          code: "IMS25",
          name: "Protective Environment Isolation Patient Bedroom, MS PCU",
          nsf: 240,
          rules: [
            { condition: (inputs, calc) => calc.SC131 === 1, quantity: 3 },
            { condition: (inputs, calc) => calc.SC131 === 2, quantity: 7 },
            { condition: (inputs, calc) => calc.SC131 === 3, quantity: 10 },
            { condition: (inputs, calc) => calc.SC131 === 4, quantity: 13 },
            { condition: (inputs, calc) => calc.SC131 === 5, quantity: 17 },
            { condition: (inputs, calc) => calc.SC131 === 6, quantity: 20 },
            { condition: (inputs, calc) => calc.SC131 === 7, quantity: 23 },
            { condition: (inputs, calc) => calc.SC131 === 8, quantity: 27 }
          ],
          notes: "Positive Pressure"
        },
        {
          id: "IMS26",
          code: "IMS26",
          name: "Protective Environment Isolation Anteroom, MS PCU",
          nsf: 65,
          rules: [
            { 
              condition: (inputs, calc) => calc.IMS25 >= 1,
              quantity: (inputs, calc) => calc.IMS25
            }
          ]
        },
        {
          id: "SB147_isolation",
          code: "SB147",
          name: "MS PCU Patient Isolation Toilet / Shower, Bldg Sprt",
          nsf: 70,
          rules: [
            { condition: (inputs, calc) => calc.SC131 === 1, quantity: 6 },
            { condition: (inputs, calc) => calc.SC131 === 2, quantity: 14 },
            { condition: (inputs, calc) => calc.SC131 === 3, quantity: 20 },
            { condition: (inputs, calc) => calc.SC131 === 4, quantity: 26 },
            { condition: (inputs, calc) => calc.SC131 === 5, quantity: 34 },
            { condition: (inputs, calc) => calc.SC131 === 6, quantity: 40 },
            { condition: (inputs, calc) => calc.SC131 === 7, quantity: 46 },
            { condition: (inputs, calc) => calc.SC131 === 8, quantity: 54 }
          ],
          notes: "Accessible toilet, lavatory, shower with ABA clearances"
        },
        {
          id: "IMS27",
          code: "IMS27",
          name: "Bariatric / Physical Disabilities Patient Bedroom, MS PCU",
          nsf: 280,
          rules: [
            { condition: (inputs, calc) => calc.SC131 === 1, quantity: 3 },
            { condition: (inputs, calc) => calc.SC131 === 2, quantity: 7 },
            { condition: (inputs, calc) => calc.SC131 === 3, quantity: 10 },
            { condition: (inputs, calc) => calc.SC131 === 4, quantity: 13 },
            { condition: (inputs, calc) => calc.SC131 === 5, quantity: 17 },
            { condition: (inputs, calc) => calc.SC131 === 6, quantity: 20 },
            { condition: (inputs, calc) => calc.SC131 === 7, quantity: 23 },
            { condition: (inputs, calc) => calc.SC131 === 8, quantity: 27 }
          ]
        },
        {
          id: "SB161",
          code: "SB161",
          name: "MS PCU Bariatric Toilet / Shower, Bldg Sprt",
          nsf: 85,
          rules: [
            { 
              condition: (inputs, calc) => calc.IMS27 >= 1,
              quantity: (inputs, calc) => calc.IMS27
            }
          ],
          notes: "Bariatric toilet, lavatory, shower with ABA clearances"
        },
        {
          id: "IMS31",
          code: "IMS31",
          name: "Dayroom, MS PCU",
          nsf: 240,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1,
              quantity: (inputs, calc) => calc.SC131
            }
          ],
          notes: "Used for veteran socialization and group education"
        }
      ]
    },
    {
      id: "FA4",
      name: "Medical / Surgical Inpatient Support Area",
      rooms: [
        {
          id: "SC152",
          code: "SC152",
          name: "MS PCU Nurse Station, Clncl Sprt",
          nsf: 160,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1,
              quantity: (inputs, calc) => calc.SC131
            }
          ],
          notes: "Allocated NSF can be decentralized to promote delivery of safe and efficient patient care"
        },
        {
          id: "IMS44",
          code: "IMS44",
          name: "Telemetry Monitoring Alcove, MS PCU",
          nsf: 80,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1,
              quantity: (inputs, calc) => calc.SC131
            }
          ]
        },
        {
          id: "SV583",
          code: "SV583",
          name: "MS PCU Medication Room, Phrm Svc",
          nsf: 100,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1,
              quantity: (inputs, calc) => calc.SC131
            }
          ],
          notes: "Allocated NSF can be decentralized to promote delivery of safe and efficient patient care"
        },
        {
          id: "SV272",
          code: "SV272",
          name: "MS PCU Nourishment Room, F&N Svc",
          nsf: 100,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1,
              quantity: (inputs, calc) => calc.SC131
            }
          ],
          notes: "Allocated NSF can be decentralized to promote delivery of safe and efficient patient care"
        },
        {
          id: "SC231",
          code: "SC231",
          name: "MS PCU Nurse Workroom, Clncl Sprt",
          nsf: 120,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1,
              quantity: (inputs, calc) => calc.SC131
            }
          ]
        },
        {
          id: "SB737",
          code: "SB737",
          name: "MS PCU Clean Utility Room, Lgstcs Svc",
          nsf: 120,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1,
              quantity: (inputs, calc) => calc.SC131
            }
          ],
          notes: "Used for storage of sterile and non-sterile medical supplies. Allocated NSF can be decentralized to promote delivery of safe and efficient patient care"
        },
        {
          id: "SB743",
          code: "SB743",
          name: "MS PCU Soiled Utility Room, Lgstcs Svc",
          nsf: 120,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1,
              quantity: (inputs, calc) => calc.SC131
            }
          ],
          notes: "Provides an area for pre-cleaning of medical equipment, instruments, and for disposal of waste material. Allocated NSF can be decentralized to reduce travel distances for staff"
        },
        {
          id: "SC471",
          code: "SC471",
          name: "MS PCU Clean Linen Room, EMS",
          nsf: 100,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1,
              quantity: (inputs, calc) => calc.SC131
            }
          ],
          notes: "Used for storage of clean linen. Allocated NSF can be decentralized to reduce travel distances for staff"
        },
        {
          id: "IMS81",
          code: "IMS81",
          name: "Equipment Storage Room, MS PCU",
          nsf: 180,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1,
              quantity: (inputs, calc) => calc.SC131
            }
          ],
          notes: "Allocated NSF can be decentralized to reduce travel distances for staff"
        },
        {
          id: "IMS83",
          code: "IMS83",
          name: "Medical Gas Storage Room, MS PCU",
          nsf: 50,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1,
              quantity: (inputs, calc) => calc.SC131
            }
          ],
          notes: "For storage of medical gas cylinders"
        },
        {
          id: "SC052",
          code: "SC052",
          name: "MS PCU Crash Cart Alcove, Clncl Sprt",
          nsf: 20,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1,
              quantity: (inputs, calc) => calc.SC131 * 2
            }
          ]
        },
        {
          id: "IMS85",
          code: "IMS85",
          name: "Mobile X-Ray Machine Alcove, MS PCU",
          nsf: 40,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1,
              quantity: (inputs, calc) => calc.SC131
            }
          ]
        },
        {
          id: "SB252",
          code: "SB252",
          name: "MS PCU Wheelchair / Stretcher Alcove, Bldg Sprt",
          nsf: 50,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1,
              quantity: (inputs, calc) => calc.SC131 * 2
            }
          ]
        },
        {
          id: "SB244",
          code: "SB244",
          name: "MS PCU Housekeeping Aides Closet (HAC), Bldg Sprt",
          nsf: 60,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1,
              quantity: (inputs, calc) => calc.SC131
            }
          ]
        }
      ]
    },
    {
      id: "FA5",
      name: "Medical / Surgical Inpatient Staff and Administrative Area",
      rooms: [
        {
          id: "SS204_manager",
          code: "SS204",
          name: "MS PCU Nurse Manager Office, Stff Sprt",
          nsf: 100,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1 && calc.SC131 <= 4,
              quantity: 1
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 5 && calc.SC131 <= 8,
              quantity: 2
            }
          ]
        },
        {
          id: "SS204_supervisor",
          code: "SS204",
          name: "MS PCU Nurse Supervisor Office, Stff Sprt",
          nsf: 100,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1 && calc.SC131 <= 2,
              quantity: 1
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 3 && calc.SC131 <= 4,
              quantity: 2
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 5 && calc.SC131 <= 6,
              quantity: 3
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 7 && calc.SC131 <= 8,
              quantity: 4
            }
          ]
        },
        {
          id: "SS218_social_worker",
          code: "SS218",
          name: "MS PCU Social Worker Workstation, Stff Sprt",
          nsf: 56,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1 && calc.SC131 <= 4,
              quantity: 1
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 5 && calc.SC131 <= 8,
              quantity: 2
            }
          ]
        },
        {
          id: "SS218_dietician",
          code: "SS218",
          name: "MS PCU Dietician Workstation, Stff Sprt",
          nsf: 56,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1 && calc.SC131 <= 4,
              quantity: 1
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 5 && calc.SC131 <= 8,
              quantity: 2
            }
          ]
        },
        {
          id: "SS218_ward_clerk",
          code: "SS218",
          name: "MS PCU Ward Clerk Workstation, Stff Sprt",
          nsf: 56,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1,
              quantity: (inputs, calc) => calc.SC131
            }
          ]
        },
        {
          id: "SS101",
          code: "SS101",
          name: "MS PCU Staff Conference Room, Educ Svc",
          nsf: 300,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1,
              quantity: (inputs, calc) => calc.SC131
            }
          ],
          notes: "Allocated NSF accommodates ten conference chairs @ 7.5 NSF each, four 5'-0\" x 2'0\" tables at 10 NSF each, one credenza @ 8 NSF, and circulation: total ten people"
        },
        {
          id: "SS272",
          code: "SS272",
          name: "MS PCU Copy / Supply Room, Stff Sprt",
          nsf: 80,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1,
              quantity: (inputs, calc) => calc.SC131
            }
          ]
        },
        {
          id: "SS262",
          code: "SS262",
          name: "MS PCU Staff Breakroom, Stff Sprt",
          nsf: 160,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1,
              quantity: (inputs, calc) => calc.SC131
            }
          ]
        },
        {
          id: "SS232",
          code: "SS232",
          name: "MS PCU Female Staff Locker Room, Stff Sprt",
          nsf: 100,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1,
              quantity: (inputs, calc) => calc.SC131
            }
          ]
        },
        {
          id: "SS241",
          code: "SS241",
          name: "MS PCU Male Staff Locker Room, Stff Sprt",
          nsf: 100,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1,
              quantity: (inputs, calc) => calc.SC131
            }
          ]
        },
        {
          id: "SB191_staff",
          code: "SB191",
          name: "MS PCU Staff Toilet, Bldg Sprt",
          nsf: 60,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1,
              quantity: (inputs, calc) => calc.SC131 * 2
            }
          ],
          notes: "Allocated NSF accommodates one accessible toilet @ 25 NSF, one wall-hung lavatory @ 12 NSF, ABA clearances, and circulation"
        }
      ]
    },
    {
      id: "FA6",
      name: "Common Support Area",
      rooms: [
        {
          id: "SB086_discharge",
          code: "SB086",
          name: "MS PCU Patient Discharge Lounge, Bldg Sprt",
          nsf: 200,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1 && calc.SC131 <= 4,
              quantity: 1
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 5 && calc.SC131 <= 8,
              quantity: 2
            }
          ]
        },
        {
          id: "SB695",
          code: "SB695",
          name: "MS PCU Clean Materials Handling Room, Lgstcs Svc",
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1 && calc.SC131 <= 2,
              quantity: 1,
              nsf: 80
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 3 && calc.SC131 <= 4,
              quantity: 1,
              nsf: 100
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 5 && calc.SC131 <= 6,
              quantity: 1,
              nsf: 120
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 7 && calc.SC131 <= 8,
              quantity: 1,
              nsf: 140
            }
          ],
          notes: "Space designated for access to the Clean Materials lift"
        },
        {
          id: "SB701",
          code: "SB701",
          name: "MS PCU Soiled Materials Handling Room, Lgstcs Svc",
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1 && calc.SC131 <= 2,
              quantity: 1,
              nsf: 80
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 3 && calc.SC131 <= 4,
              quantity: 1,
              nsf: 100
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 5 && calc.SC131 <= 6,
              quantity: 1,
              nsf: 120
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 7 && calc.SC131 <= 8,
              quantity: 1,
              nsf: 140
            }
          ],
          notes: "Space designated for access to the Soiled Materials lift"
        },
        {
          id: "SC257",
          code: "SC257",
          name: "MS PCU Waste Disposal Chute Room, Clncl Sprt",
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1 && calc.SC131 <= 2,
              quantity: 1,
              nsf: 40
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 3 && calc.SC131 <= 4,
              quantity: 1,
              nsf: 60
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 5 && calc.SC131 <= 6,
              quantity: 1,
              nsf: 80
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 7 && calc.SC131 <= 8,
              quantity: 1,
              nsf: 100
            }
          ]
        },
        {
          id: "SC213",
          code: "SC213",
          name: "MS PCU Soiled Linen Chute Room, Clncl Sprt",
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1 && calc.SC131 <= 2,
              quantity: 1,
              nsf: 40
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 3 && calc.SC131 <= 4,
              quantity: 1,
              nsf: 60
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 5 && calc.SC131 <= 6,
              quantity: 1,
              nsf: 80
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 7 && calc.SC131 <= 8,
              quantity: 1,
              nsf: 100
            }
          ]
        },
        {
          id: "IMS86",
          code: "IMS86",
          name: "Multipurpose / Specialty Storage Room, MS PCU",
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1 && calc.SC131 <= 2,
              quantity: 1,
              nsf: 160
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 3 && calc.SC131 <= 4,
              quantity: 1,
              nsf: 200
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 5 && calc.SC131 <= 6,
              quantity: 1,
              nsf: 240
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 7 && calc.SC131 <= 8,
              quantity: 1,
              nsf: 280
            }
          ]
        },
        {
          id: "SB212",
          code: "SB212",
          name: "MS PCU Environmental Management Service Storage Room, Bldg Sprt",
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1 && calc.SC131 <= 2,
              quantity: 1,
              nsf: 80
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 3 && calc.SC131 <= 4,
              quantity: 1,
              nsf: 100
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 5 && calc.SC131 <= 6,
              quantity: 1,
              nsf: 120
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 7 && calc.SC131 <= 8,
              quantity: 1,
              nsf: 140
            }
          ],
          notes: "This space provided for storing bulk supplies and large equipment used by Environmental Management Services"
        },
        {
          id: "SB267",
          code: "SB267",
          name: "MS PCU Recycling Room, Bldg Sprt",
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1 && calc.SC131 <= 2,
              quantity: 1,
              nsf: 80
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 3 && calc.SC131 <= 4,
              quantity: 1,
              nsf: 100
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 5 && calc.SC131 <= 6,
              quantity: 1,
              nsf: 120
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 7 && calc.SC131 <= 8,
              quantity: 1,
              nsf: 140
            }
          ]
        }
      ]
    },
    {
      id: "FA7",
      name: "Common Staff and Administrative Area",
      rooms: [
        {
          id: "SS218_physician",
          code: "SS218",
          name: "MS PCU Physician Workstation, Stff Sprt",
          nsf: 56,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1,
              quantity: (inputs, calc) => calc.SC131
            }
          ]
        },
        {
          id: "SS218_physician_assistant",
          code: "SS218",
          name: "MS PCU Physician Assistant Workstation, Stff Sprt",
          nsf: 56,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1,
              quantity: (inputs, calc) => calc.SC131
            }
          ]
        },
        {
          id: "SS218_nurse_clinician",
          code: "SS218",
          name: "MS PCU Nurse Clinician Workstation, Stff Sprt",
          nsf: 56,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1,
              quantity: (inputs, calc) => calc.SC131
            }
          ]
        },
        {
          id: "SS218_consultant",
          code: "SS218",
          name: "MS PCU Consultant Workstation, Stff Sprt",
          nsf: 56,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1 && calc.SC131 <= 2,
              quantity: 1
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 3 && calc.SC131 <= 4,
              quantity: 2
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 5 && calc.SC131 <= 6,
              quantity: 3
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 7 && calc.SC131 <= 8,
              quantity: 4
            }
          ]
        },
        {
          id: "SS218_clinical_researcher",
          code: "SS218",
          name: "MS PCU Clinical Researcher Workstation, Stff Sprt",
          nsf: 56,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1 && calc.SC131 <= 4,
              quantity: 1
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 5 && calc.SC131 <= 8,
              quantity: 2
            }
          ]
        },
        {
          id: "SS218_clinical_pharmacist",
          code: "SS218",
          name: "MS PCU Clinical Pharmacist Workstation, Stff Sprt",
          nsf: 56,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1 && calc.SC131 <= 2,
              quantity: 1
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 3 && calc.SC131 <= 4,
              quantity: 2
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 5 && calc.SC131 <= 6,
              quantity: 3
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 7 && calc.SC131 <= 8,
              quantity: 4
            }
          ]
        },
        {
          id: "SS218_administration",
          code: "SS218",
          name: "MS PCU Administration Workstation, Stff Sprt",
          nsf: 56,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1 && calc.SC131 <= 2,
              quantity: 1
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 3 && calc.SC131 <= 4,
              quantity: 2
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 5 && calc.SC131 <= 6,
              quantity: 3
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 7 && calc.SC131 <= 8,
              quantity: 4
            }
          ]
        }
      ]
    },
    {
      id: "FA8",
      name: "Education Area",
      rooms: [
        {
          id: "SS204_residency_director",
          code: "SS204",
          name: "MS PCU Residency Director Office, Stff Sprt",
          nsf: 100,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1 && calc.SC131 <= 8,
              quantity: 1
            }
          ]
        },
        {
          id: "SS217",
          code: "SS217",
          name: "MS PCU Intern / Fellow / Resident Workstation, Stff Sprt",
          nsf: 48,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1,
              quantity: (inputs, calc) => calc.SC131 * 2
            }
          ]
        },
        {
          id: "SS218_instructor",
          code: "SS218",
          name: "MS PCU Instructor Workstation, Stff Sprt",
          nsf: 56,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1 && calc.SC131 <= 4,
              quantity: 1
            },
            { 
              condition: (inputs, calc) => calc.SC131 >= 5 && calc.SC131 <= 8,
              quantity: 2
            }
          ]
        },
        {
          id: "SS111",
          code: "SS111",
          name: "MS PCU Resident Training Room, Educ Svc",
          nsf: 545,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC131 >= 1 && calc.SC131 <= 8,
              quantity: 1
            }
          ]
        }
      ]
    }
  ]
};
