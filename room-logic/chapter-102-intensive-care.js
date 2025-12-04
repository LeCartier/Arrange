// Chapter 102: Intensive Care Patient Care Unit (IC-PCU)
// Parsed from VA Space Planning Criteria Section 5

export const CHAPTER_102 = {
  chapter: "102",
  name: "Intensive Care Patient Care Unit (IC-PCU)",
  description: "Intensive Care Units (min 8 beds, max 15 beds per unit)",
  
  inputs: [
    {
      id: "icu_beds",
      label: "ICU beds projected",
      type: "number",
      min: 8,
      max: 45,
      helpText: "Total number of projected intensive care unit beds (minimum 8, maximum 45)"
    }
  ],
  
  functionalAreas: [
    {
      id: "FA1",
      name: "Intensive Care Patient Unit Calculation",
      description: "Determines number of IC-PCU units needed (min 8 beds, max 15 beds per unit)",
      rooms: [
        {
          id: "SC130",
          code: "SC130",
          name: "Number of IC PCU, Clncl Sprt",
          nsf: 0,
          type: "calculation",
          rules: [
            { condition: (inputs) => inputs.icu_beds >= 8 && inputs.icu_beds <= 15, quantity: 1 },
            { condition: (inputs) => inputs.icu_beds >= 16 && inputs.icu_beds <= 30, quantity: 2 },
            { condition: (inputs) => inputs.icu_beds >= 31 && inputs.icu_beds <= 45, quantity: 3 }
          ]
        }
      ]
    },
    {
      id: "FA2",
      name: "Intensive Care Patient Unit Reception Area",
      rooms: [
        {
          id: "SB003_IC",
          code: "SB003",
          name: "IC PCU Waiting, Bldg Sprt",
          nsf: 215,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC130 >= 1,
              quantity: (inputs, calc) => calc.SC130
            }
          ],
          notes: "Seating for 10 people. Visual connection to Nurse Station recommended."
        },
        {
          id: "SC271_IC",
          code: "SC271",
          name: "IC PCU Consult Room, Clncl Sprt",
          nsf: 120,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC130 >= 1,
              quantity: (inputs, calc) => calc.SC130
            }
          ],
          notes: "Privacy for grieving/counseling. Access from Waiting and corridor."
        },
        {
          id: "SB191_IC",
          code: "SB191",
          name: "IC PCU Visitor Toilet, Bldg Sprt",
          nsf: 60,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC130 >= 1,
              quantity: (inputs, calc) => calc.SC130
            }
          ]
        },
        {
          id: "SB136_IC",
          code: "SB136",
          name: "IC PCU Family Toilet, Bldg Sprt",
          nsf: 80,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC130 >= 1,
              quantity: (inputs, calc) => calc.SC130
            }
          ]
        },
        {
          id: "SB086_IC",
          code: "SB086",
          name: "IC PCU Family Lounge, Bldg Sprt",
          nsf: 120,
          rules: [
            { condition: (inputs, calc) => calc.SC130 >= 1 && calc.SC130 <= 2, quantity: 1 },
            { condition: (inputs, calc) => calc.SC130 === 3, quantity: 2 }
          ],
          notes: "Consider combining with Family Pantry. Consider sharing with adjacent IC units."
        },
        {
          id: "IIC11",
          code: "IIC11",
          name: "Family Pantry, IC PCU",
          nsf: 80,
          rules: [
            { condition: (inputs, calc) => calc.SC130 >= 1 && calc.SC130 <= 2, quantity: 1 },
            { condition: (inputs, calc) => calc.SC130 === 3, quantity: 2 }
          ],
          notes: "Consider combining with Family Lounge. Consider sharing with adjacent IC units."
        },
        {
          id: "SC172",
          code: "SC172",
          name: "IC PCU Patient Education Workstation, Clncl Sprt",
          nsf: 40,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC130 >= 1,
              quantity: (inputs, calc) => calc.SC130
            }
          ],
          notes: "For family/visitor education. Locate accessible to public waiting area."
        }
      ]
    },
    {
      id: "FA3",
      name: "Intensive Care Patient Unit Patient Area",
      rooms: [
        {
          id: "IIC21",
          code: "IIC21",
          name: "Patient Bedroom, IC PCU",
          nsf: 300,
          rules: [
            { condition: (inputs, calc) => calc.SC130 === 1, quantity: 13 },
            { condition: (inputs, calc) => calc.SC130 === 2, quantity: 25 },
            { condition: (inputs, calc) => calc.SC130 === 3, quantity: 37 }
          ]
        },
        {
          id: "SB201",
          code: "SB201",
          name: "IC PCU Patient Toilet, Bldg Sprt",
          nsf: 60,
          rules: [
            { 
              condition: (inputs, calc) => calc.IIC21 >= 1,
              quantity: (inputs, calc) => calc.IIC21
            }
          ],
          notes: "One per Patient Bedroom. Accessible toilet and wall-hung lavatory"
        },
        {
          id: "IIC26",
          code: "IIC26",
          name: "Airborne Infection Isolation (AII) Patient Bedroom, IC PCU",
          nsf: 300,
          rules: [
            { condition: (inputs, calc) => calc.SC130 === 1, quantity: 1 },
            { condition: (inputs, calc) => calc.SC130 === 2, quantity: 3 },
            { condition: (inputs, calc) => calc.SC130 === 3, quantity: 5 }
          ],
          notes: "Negative Pressure. Consider grouping IC rooms in pairs."
        },
        {
          id: "IIC27",
          code: "IIC27",
          name: "Airborne Infection Isolation (AII) Anteroom, IC PCU",
          nsf: 65,
          rules: [
            { 
              condition: (inputs, calc) => calc.IIC26 >= 1,
              quantity: (inputs, calc) => calc.IIC26
            }
          ]
        },
        {
          id: "IIC31",
          code: "IIC31",
          name: "Protective Environment Isolation Patient Bedroom, IC PCU",
          nsf: 300,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC130 >= 1,
              quantity: (inputs, calc) => calc.SC130
            }
          ],
          notes: "Positive Pressure"
        },
        {
          id: "IIC32",
          code: "IIC32",
          name: "Protective Environment Isolation Anteroom, IC PCU",
          nsf: 65,
          rules: [
            { 
              condition: (inputs, calc) => calc.IIC31 >= 1,
              quantity: (inputs, calc) => calc.IIC31
            }
          ]
        },
        {
          id: "SB167",
          code: "SB167",
          name: "IC PCU Universal Isolation Patient Toilet / Shower, Bldg Sprt",
          nsf: 70,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC130 >= 1,
              quantity: (inputs, calc) => calc.SC130
            }
          ],
          notes: "Accessible toilet, lavatory, shower with ABA clearances"
        },
        {
          id: "SC271_IC_patient",
          code: "SC271",
          name: "IC PCU Consult Room, Clncl Sprt",
          nsf: 120,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC130 >= 1,
              quantity: (inputs, calc) => calc.SC130
            }
          ]
        }
      ]
    },
    {
      id: "FA4",
      name: "Intensive Care Patient Unit Support Area",
      rooms: [
        {
          id: "SC152",
          code: "SC152",
          name: "IC PCU Nurse Station, Clncl Sprt",
          nsf: 240,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC130 >= 1,
              quantity: (inputs, calc) => calc.SC130
            }
          ]
        },
        {
          id: "IIC46",
          code: "IIC46",
          name: "Nurse Observation Alcove, IC PCU",
          nsf: 20,
          rules: [
            { condition: (inputs, calc) => calc.SC130 === 1, quantity: 8 },
            { condition: (inputs, calc) => calc.SC130 === 2, quantity: 15 },
            { condition: (inputs, calc) => calc.SC130 === 3, quantity: 23 }
          ],
          notes: "Located between pairs of Intensive Care Patient Rooms"
        },
        {
          id: "SV583",
          code: "SV583",
          name: "IC PCU Medication Room, Phrm Svc",
          nsf: 120,
          rules: [
            { condition: (inputs, calc) => calc.SC130 >= 1 && calc.SC130 <= 2, quantity: 1 },
            { condition: (inputs, calc) => calc.SC130 === 3, quantity: 2 }
          ]
        },
        {
          id: "IIC51",
          code: "IIC51",
          name: "Nourishment Station, IC PCU",
          nsf: 100,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC130 >= 1,
              quantity: (inputs, calc) => calc.SC130
            }
          ]
        },
        {
          id: "SC231",
          code: "SC231",
          name: "Nurse Workroom, Clncl Sprt",
          nsf: 120,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC130 >= 1,
              quantity: (inputs, calc) => calc.SC130
            }
          ]
        },
        {
          id: "SB737",
          code: "SB737",
          name: "IC PCU Clean Utility Room, Lgstcs Svc",
          nsf: 120,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC130 >= 1,
              quantity: (inputs, calc) => calc.SC130
            }
          ],
          notes: "Storage of sterile and non-sterile medical supplies"
        },
        {
          id: "SB743",
          code: "SB743",
          name: "IC PCU Soiled Utility Room, Lgstcs Svc",
          nsf: 120,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC130 >= 1,
              quantity: (inputs, calc) => calc.SC130
            }
          ],
          notes: "Cleanup of medical equipment and waste disposal"
        },
        {
          id: "SC471",
          code: "SC471",
          name: "IC PCU Clean Linen Room, EMS",
          nsf: 100,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC130 >= 1,
              quantity: (inputs, calc) => calc.SC130
            }
          ],
          notes: "Storage of clean linen on carts"
        },
        {
          id: "IIC61",
          code: "IIC61",
          name: "Equipment Storage Room, IC PCU",
          nsf: 220,
          rules: [
            { 
              condition: (inputs, calc) => calc.SC130 >= 1,
              quantity: (inputs, calc) => calc.SC130
            }
          ]
        }
      ]
    }
  ]
};
