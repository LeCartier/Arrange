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
          ]
        }
      ]
    }
  ]
};
