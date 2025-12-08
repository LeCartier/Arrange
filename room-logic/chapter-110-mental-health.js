// Chapter 110: Mental Health Patient Care Unit (MH PCU)
// Parsed from VA Space Planning Criteria Section 5

export const CHAPTER_110 = {
  chapter: "110",
  name: "Mental Health Patient Care Unit (MH PCU)",
  description: "Inpatient mental health program providing accommodations, health care, and support services.",
  
  // Section 4: Input Data Statements
  inputs: [
    {
      id: "num_beds",
      label: "How many MH PCU patient beds are authorized?",
      type: "number",
      options: [8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100],
      defaultValue: 8,
      helpText: "Total number of authorized MH PCU patient beds."
    },
    {
      id: "num_pa_fte",
      label: "How many MH PCU Physician Assistant FTE positions are authorized?",
      type: "number",
      min: 1,
      max: 9,
      defaultValue: 1
    },
    {
      id: "num_nurse_clinician_fte",
      label: "How many MH PCU Nurse Clinician FTE positions are authorized?",
      type: "number",
      min: 2,
      max: 15,
      defaultValue: 2
    },
    {
      id: "num_psychiatrist_fte",
      label: "How many MH PCU Psychiatrist FTE positions are authorized?",
      type: "number",
      min: 1,
      max: 10,
      defaultValue: 1
    },
    {
      id: "num_psychologist_fte",
      label: "How many MH PCU Psychologist FTE positions are authorized?",
      type: "number",
      min: 2,
      max: 11,
      defaultValue: 2
    },
    {
      id: "num_social_worker_fte",
      label: "How many MH PCU Social Worker FTE positions are authorized?",
      type: "number",
      min: 2,
      max: 14,
      defaultValue: 2
    },
    {
      id: "num_dietitian_fte",
      label: "How many MH PCU Dietitian FTE positions are authorized?",
      type: "number",
      min: 1,
      max: 10,
      defaultValue: 1
    },
    {
      id: "num_chaplain_fte",
      label: "How many MH PCU Chaplain FTE positions are authorized?",
      type: "number",
      min: 2,
      max: 10,
      defaultValue: 2
    },
    {
      id: "num_rehab_therapist_fte",
      label: "How many MH PCU Rehabilitation Medicine Therapist FTE positions are authorized?",
      type: "number",
      min: 2,
      max: 11,
      defaultValue: 2
    },
    {
      id: "num_rehab_tech_fte",
      label: "How many MH PCU Rehabilitation Technician FTE positions are authorized?",
      type: "number",
      min: 2,
      max: 14,
      defaultValue: 2
    },
    {
      id: "num_voc_rehab_fte",
      label: "How many MH PCU Vocational Rehabilitation Specialist FTE positions are authorized?",
      type: "number",
      min: 2,
      max: 14,
      defaultValue: 2
    },
    {
      id: "has_residency_program",
      label: "Is a MH PCU Residency Program authorized?",
      type: "boolean",
      defaultValue: false
    }
  ],
  
  // Section 5: Space Planning Criteria
  functionalAreas: [
    {
      id: "FA1",
      name: "Patient Care Unit (PCU) Reception Area",
      rooms: [
        {
          id: "SB071_8",
          code: "SB071",
          name: "8-Bed MH PCU Visitor Waiting, Bldg Sprt",
          nsf: 130,
          rules: [
            {
              condition: (inputs) => [8, 24, 28, 40, 48, 60, 64, 68, 80, 84, 100].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [36, 56, 76].includes(inputs.num_beds),
              quantity: 2
            }
          ]
        },
        {
          id: "SB071_12",
          code: "SB071",
          name: "12-Bed MH PCU Visitor Waiting, Bldg Sprt",
          nsf: 170,
          rules: [
            {
              condition: (inputs) => [12, 32, 40, 52, 60, 72, 80, 88, 92, 100].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => inputs.num_beds === 44,
              quantity: 2
            }
          ]
        },
        {
          id: "SB071_16",
          code: "SB071",
          name: "16-Bed MH PCU Visitor Waiting, Bldg Sprt",
          nsf: 215,
          rules: [
            {
              condition: (inputs) => [16, 24, 64, 84, 88, 96].includes(inputs.num_beds),
              quantity: 1
            }
          ]
        },
        {
          id: "SB071_20",
          code: "SB071",
          name: "20-Bed MH PCU Visitor Waiting, Bldg Sprt",
          nsf: 260,
          rules: [
            {
              condition: (inputs) => [20, 28, 32, 36, 40, 44].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [48, 52, 56, 60, 64].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [68, 72, 76, 80, 84, 88].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [92, 96, 100].includes(inputs.num_beds),
              quantity: 4
            }
          ]
        },
        {
          id: "SC183",
          code: "SC183",
          name: "MH PCU Reception, Bldg Sprt",
          nsf: 85,
          rules: [
            {
              condition: (inputs) => [8, 12, 16, 20].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [24, 28, 32].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [36, 40, 44, 48, 52].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [56, 60, 64, 68, 72].includes(inputs.num_beds),
              quantity: 4
            },
            {
              condition: (inputs) => [76, 80, 84, 88, 92, 96].includes(inputs.num_beds),
              quantity: 5
            },
            {
              condition: (inputs) => inputs.num_beds === 100,
              quantity: 6
            }
          ]
        },
        {
          id: "SB191_Visitor",
          code: "SB191",
          name: "MH PCU Visitor Toilet, Bldg Sprt",
          nsf: 60,
          rules: [
            {
              condition: (inputs) => [8, 12, 16, 20].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [24, 28, 32].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [36, 40, 44, 48, 52].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [56, 60, 64, 68, 72].includes(inputs.num_beds),
              quantity: 4
            },
            {
              condition: (inputs) => [76, 80, 84, 88, 92, 96].includes(inputs.num_beds),
              quantity: 5
            },
            {
              condition: (inputs) => inputs.num_beds === 100,
              quantity: 6
            }
          ]
        },
        {
          id: "SB297_8_12",
          code: "SB297",
          name: "8-Bed / 12-Bed MH PCU Visitor Personal Property Locker, Bldg Sprt",
          nsf: 60,
          rules: [
            {
              condition: (inputs) => [8, 12, 24, 28, 32, 48, 52, 64, 68, 72, 84, 88, 92].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [36, 40, 44, 56, 60, 76, 80, 100].includes(inputs.num_beds),
              quantity: 2
            }
          ]
        },
        {
          id: "SB297_16_20",
          code: "SB297",
          name: "16-Bed / 20-Bed MH PCU Visitor Personal Property Locker, Bldg Sprt",
          nsf: 80,
          rules: [
            {
              condition: (inputs) => [16, 20, 24, 28, 32, 36, 40, 44].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [48, 52, 56, 60].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [64, 68, 72, 76, 80].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [84, 88, 92, 100].includes(inputs.num_beds),
              quantity: 4
            },
            {
              condition: (inputs) => inputs.num_beds === 96,
              quantity: 5
            }
          ]
        }
      ]
    },
    {
      id: "FA2",
      name: "Patient Care Unit (PCU) Staff-Patient Area",
      rooms: [
        {
          id: "IMH11",
          code: "IMH11",
          name: "Sally Port, MH PCU",
          nsf: 125,
          rules: [
            {
              condition: (inputs) => [8, 12, 16, 20].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [24, 28, 32].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [36, 40, 44, 48, 52].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [56, 60, 64, 68, 72].includes(inputs.num_beds),
              quantity: 4
            },
            {
              condition: (inputs) => [76, 80, 84, 88, 92, 96].includes(inputs.num_beds),
              quantity: 5
            },
            {
              condition: (inputs) => inputs.num_beds === 100,
              quantity: 6
            }
          ]
        },
        {
          id: "IMH13",
          code: "IMH13",
          name: "Visitation Room, MH PCU",
          nsf: 125,
          rules: [
            {
              condition: (inputs) => [8, 12, 16, 20].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [24, 28, 32].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [36, 40, 44, 48, 52].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [56, 60, 64, 68, 72].includes(inputs.num_beds),
              quantity: 4
            },
            {
              condition: (inputs) => [76, 80, 84, 88, 92, 96].includes(inputs.num_beds),
              quantity: 5
            },
            {
              condition: (inputs) => inputs.num_beds === 100,
              quantity: 6
            }
          ]
        },
        {
          id: "IMH15",
          code: "IMH15",
          name: "Intake / Interview Room, MH PCU",
          nsf: 125,
          rules: [
            {
              condition: (inputs) => [8, 12, 16, 20].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [24, 28, 32].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [36, 40, 44, 48, 52].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [56, 60, 64, 68, 72].includes(inputs.num_beds),
              quantity: 4
            },
            {
              condition: (inputs) => [76, 80, 84, 88, 92, 96].includes(inputs.num_beds),
              quantity: 5
            },
            {
              condition: (inputs) => inputs.num_beds === 100,
              quantity: 6
            }
          ]
        },
        {
          id: "IMH17",
          code: "IMH17",
          name: "Exam Room, MH PCU",
          nsf: 125,
          rules: [
            {
              condition: (inputs) => [8, 12, 16, 20].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [24, 28, 32].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [36, 40, 44, 48, 52].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [56, 60, 64, 68, 72].includes(inputs.num_beds),
              quantity: 4
            },
            {
              condition: (inputs) => [76, 80, 84, 88, 92, 96].includes(inputs.num_beds),
              quantity: 5
            },
            {
              condition: (inputs) => inputs.num_beds === 100,
              quantity: 6
            }
          ]
        },
        {
          id: "SC271",
          code: "SC271",
          name: "MH PCU Consult Room, Clncl Sprt",
          nsf: 125,
          rules: [
            {
              condition: (inputs) => [8, 12, 16, 20].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [24, 28, 32].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [36, 40, 44, 48, 52].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [56, 60, 64, 68, 72].includes(inputs.num_beds),
              quantity: 4
            },
            {
              condition: (inputs) => [76, 80, 84, 88, 92, 96].includes(inputs.num_beds),
              quantity: 5
            },
            {
              condition: (inputs) => inputs.num_beds === 100,
              quantity: 6
            }
          ]
        },
        {
          id: "IMH18_8_12",
          code: "IMH18",
          name: "8-Bed / 12-Bed PCU Conference / Hearing Room, MH PCU",
          nsf: 240,
          rules: [
            {
              condition: (inputs) => [8, 12, 24, 28, 32, 48, 52, 64, 68, 72, 84, 88, 92].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [36, 40, 44, 56, 60, 76, 80, 100].includes(inputs.num_beds),
              quantity: 2
            }
          ]
        },
        {
          id: "IMH18_16_20",
          code: "IMH18",
          name: "16-Bed / 20-Bed PCU Conference / Hearing Room, MH PCU",
          nsf: 300,
          rules: [
            {
              condition: (inputs) => [16, 20, 24, 28, 32, 36, 40, 44].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [48, 52, 56, 60].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [64, 68, 72, 76, 80].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [84, 88, 92, 100].includes(inputs.num_beds),
              quantity: 4
            },
            {
              condition: (inputs) => inputs.num_beds === 96,
              quantity: 5
            }
          ]
        },
        {
          id: "IMH21",
          code: "IMH21",
          name: "Group Room, MH PCU",
          nsf: 270,
          rules: [
            {
              condition: (inputs) => [8, 12, 16, 20].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [24, 28, 32].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [36, 40, 44, 48, 52].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [56, 60, 64, 68, 72].includes(inputs.num_beds),
              quantity: 4
            },
            {
              condition: (inputs) => [76, 80, 84, 88, 92, 96].includes(inputs.num_beds),
              quantity: 5
            },
            {
              condition: (inputs) => inputs.num_beds === 100,
              quantity: 6
            }
          ]
        },
        {
          id: "SC450",
          code: "SC450",
          name: "MH PCU Patient Laundry Room, EMS",
          nsf: 90,
          rules: [
            {
              condition: (inputs) => [8, 12, 16, 20].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [24, 28, 32].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [36, 40, 44, 48, 52].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [56, 60, 64, 68, 72].includes(inputs.num_beds),
              quantity: 4
            },
            {
              condition: (inputs) => [76, 80, 84, 88, 92, 96].includes(inputs.num_beds),
              quantity: 5
            },
            {
              condition: (inputs) => inputs.num_beds === 100,
              quantity: 6
            }
          ]
        }
      ]
    },
    {
      id: "FA3",
      name: "Patient Care Unit (PCU) Patient Area",
      rooms: [
        {
          id: "IMH26",
          code: "IMH26",
          name: "One-Bed Universal Patient Room, MH PCU",
          nsf: 220,
          rules: [
            { condition: (inputs) => inputs.num_beds === 8, quantity: 4 },
            { condition: (inputs) => inputs.num_beds === 12, quantity: 6 },
            { condition: (inputs) => inputs.num_beds === 16, quantity: 8 },
            { condition: (inputs) => inputs.num_beds === 20, quantity: 10 },
            { condition: (inputs) => inputs.num_beds === 24, quantity: 12 },
            { condition: (inputs) => inputs.num_beds === 28, quantity: 14 },
            { condition: (inputs) => inputs.num_beds === 32, quantity: 16 },
            { condition: (inputs) => inputs.num_beds === 36, quantity: 18 },
            { condition: (inputs) => inputs.num_beds === 40, quantity: 20 },
            { condition: (inputs) => inputs.num_beds === 44, quantity: 22 },
            { condition: (inputs) => inputs.num_beds === 48, quantity: 24 },
            { condition: (inputs) => inputs.num_beds === 52, quantity: 26 },
            { condition: (inputs) => inputs.num_beds === 56, quantity: 28 },
            { condition: (inputs) => inputs.num_beds === 60, quantity: 30 },
            { condition: (inputs) => inputs.num_beds === 64, quantity: 32 },
            { condition: (inputs) => inputs.num_beds === 68, quantity: 34 },
            { condition: (inputs) => inputs.num_beds === 72, quantity: 36 },
            { condition: (inputs) => inputs.num_beds === 76, quantity: 38 },
            { condition: (inputs) => inputs.num_beds === 80, quantity: 40 },
            { condition: (inputs) => inputs.num_beds === 84, quantity: 42 },
            { condition: (inputs) => inputs.num_beds === 88, quantity: 44 },
            { condition: (inputs) => inputs.num_beds === 92, quantity: 46 },
            { condition: (inputs) => inputs.num_beds === 96, quantity: 48 },
            { condition: (inputs) => inputs.num_beds === 100, quantity: 50 }
          ]
        },
        {
          id: "IMH27",
          code: "IMH27",
          name: "Two-Bed Universal Patient Room, MH PCU",
          nsf: 440,
          rules: [
            { condition: (inputs) => inputs.num_beds === 8, quantity: 2 },
            { condition: (inputs) => inputs.num_beds === 12, quantity: 3 },
            { condition: (inputs) => inputs.num_beds === 16, quantity: 4 },
            { condition: (inputs) => inputs.num_beds === 20, quantity: 5 },
            { condition: (inputs) => inputs.num_beds === 24, quantity: 6 },
            { condition: (inputs) => inputs.num_beds === 28, quantity: 7 },
            { condition: (inputs) => inputs.num_beds === 32, quantity: 8 },
            { condition: (inputs) => inputs.num_beds === 36, quantity: 9 },
            { condition: (inputs) => inputs.num_beds === 40, quantity: 10 },
            { condition: (inputs) => inputs.num_beds === 44, quantity: 11 },
            { condition: (inputs) => inputs.num_beds === 48, quantity: 12 },
            { condition: (inputs) => inputs.num_beds === 52, quantity: 13 },
            { condition: (inputs) => inputs.num_beds === 56, quantity: 14 },
            { condition: (inputs) => inputs.num_beds === 60, quantity: 15 },
            { condition: (inputs) => inputs.num_beds === 64, quantity: 16 },
            { condition: (inputs) => inputs.num_beds === 68, quantity: 17 },
            { condition: (inputs) => inputs.num_beds === 72, quantity: 18 },
            { condition: (inputs) => inputs.num_beds === 76, quantity: 19 },
            { condition: (inputs) => inputs.num_beds === 80, quantity: 20 },
            { condition: (inputs) => inputs.num_beds === 84, quantity: 21 },
            { condition: (inputs) => inputs.num_beds === 88, quantity: 22 },
            { condition: (inputs) => inputs.num_beds === 92, quantity: 23 },
            { condition: (inputs) => inputs.num_beds === 96, quantity: 24 },
            { condition: (inputs) => inputs.num_beds === 100, quantity: 25 }
          ]
        },
        {
          id: "SB148_Patient",
          code: "SB148",
          name: "MH PCU Patient Universal Toilet / Shower, Bldg Sprt",
          nsf: 60,
          rules: [
            { condition: (inputs) => inputs.num_beds === 8, quantity: 6 },
            { condition: (inputs) => inputs.num_beds === 12, quantity: 9 },
            { condition: (inputs) => inputs.num_beds === 16, quantity: 12 },
            { condition: (inputs) => inputs.num_beds === 20, quantity: 15 },
            { condition: (inputs) => inputs.num_beds === 24, quantity: 18 },
            { condition: (inputs) => inputs.num_beds === 28, quantity: 21 },
            { condition: (inputs) => inputs.num_beds === 32, quantity: 24 },
            { condition: (inputs) => inputs.num_beds === 36, quantity: 27 },
            { condition: (inputs) => inputs.num_beds === 40, quantity: 30 },
            { condition: (inputs) => inputs.num_beds === 44, quantity: 33 },
            { condition: (inputs) => inputs.num_beds === 48, quantity: 36 },
            { condition: (inputs) => inputs.num_beds === 52, quantity: 39 },
            { condition: (inputs) => inputs.num_beds === 56, quantity: 42 },
            { condition: (inputs) => inputs.num_beds === 60, quantity: 45 },
            { condition: (inputs) => inputs.num_beds === 64, quantity: 48 },
            { condition: (inputs) => inputs.num_beds === 68, quantity: 51 },
            { condition: (inputs) => inputs.num_beds === 72, quantity: 54 },
            { condition: (inputs) => inputs.num_beds === 76, quantity: 57 },
            { condition: (inputs) => inputs.num_beds === 80, quantity: 60 },
            { condition: (inputs) => inputs.num_beds === 84, quantity: 63 },
            { condition: (inputs) => inputs.num_beds === 88, quantity: 66 },
            { condition: (inputs) => inputs.num_beds === 92, quantity: 69 },
            { condition: (inputs) => inputs.num_beds === 96, quantity: 72 },
            { condition: (inputs) => inputs.num_beds === 100, quantity: 75 }
          ]
        },
        {
          id: "IMH31",
          code: "IMH31",
          name: "Seclusion Room, MH PCU",
          nsf: 140,
          rules: [
            {
              condition: (inputs) => [8, 12, 16, 20].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [24, 28, 32].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [36, 40, 44, 48, 52].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [56, 60, 64, 68, 72].includes(inputs.num_beds),
              quantity: 4
            },
            {
              condition: (inputs) => [76, 80, 84, 88, 92, 96].includes(inputs.num_beds),
              quantity: 5
            },
            {
              condition: (inputs) => inputs.num_beds === 100,
              quantity: 6
            }
          ]
        },
        {
          id: "IMH32",
          code: "IMH32",
          name: "Seclusion Anteroom, MH PCU",
          nsf: 85,
          rules: [
            {
              condition: (inputs) => [8, 12, 16, 20].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [24, 28, 32].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [36, 40, 44, 48, 52].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [56, 60, 64, 68, 72].includes(inputs.num_beds),
              quantity: 4
            },
            {
              condition: (inputs) => [76, 80, 84, 88, 92, 96].includes(inputs.num_beds),
              quantity: 5
            },
            {
              condition: (inputs) => inputs.num_beds === 100,
              quantity: 6
            }
          ]
        },
        {
          id: "SB148_Seclusion",
          code: "SB148",
          name: "MH PCU Seclusion Patient Toilet / Shower, Bldg Sprt",
          nsf: 60,
          rules: [
            {
              condition: (inputs) => [8, 12, 16, 20].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [24, 28, 32].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [36, 40, 44, 48, 52].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [56, 60, 64, 68, 72].includes(inputs.num_beds),
              quantity: 4
            },
            {
              condition: (inputs) => [76, 80, 84, 88, 92, 96].includes(inputs.num_beds),
              quantity: 5
            },
            {
              condition: (inputs) => inputs.num_beds === 100,
              quantity: 6
            }
          ]
        }
      ]
    },
    {
      id: "FA4",
      name: "Patient Care Unit (PCU) Patient Common Area",
      rooms: [
        {
          id: "IMH41_8",
          code: "IMH41",
          name: "8-Bed PCU Day Room, MH PCU",
          nsf: 220,
          rules: [
            {
              condition: (inputs) => [8, 24, 28, 40, 48, 60, 64, 68, 80, 84, 100].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [36, 56, 76].includes(inputs.num_beds),
              quantity: 2
            }
          ]
        },
        {
          id: "IMH41_12",
          code: "IMH41",
          name: "12-Bed PCU Day Room, MH PCU",
          nsf: 300,
          rules: [
            {
              condition: (inputs) => [12, 32, 40, 52, 60, 72, 80, 88, 92, 100].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => inputs.num_beds === 44,
              quantity: 2
            }
          ]
        },
        {
          id: "IMH41_16",
          code: "IMH41",
          name: "16-Bed PCU Day Room, MH PCU",
          nsf: 360,
          rules: [
            {
              condition: (inputs) => [16, 24, 64, 84, 88, 96].includes(inputs.num_beds),
              quantity: 1
            }
          ]
        },
        {
          id: "IMH41_20",
          code: "IMH41",
          name: "20-Bed PCU Day Room, MH PCU",
          nsf: 480,
          rules: [
            {
              condition: (inputs) => [20, 28, 32, 36, 40, 44].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [48, 52, 56, 60, 64].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [68, 72, 76, 80, 84, 88].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [92, 96, 100].includes(inputs.num_beds),
              quantity: 4
            }
          ]
        },
        {
          id: "SV366_8",
          code: "SV366",
          name: "8-Bed MH PCU Dining Room A, F&N Svc",
          nsf: 250,
          rules: [
            {
              condition: (inputs) => [8, 24, 28, 40, 48, 60, 64, 68, 80, 84, 100].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [36, 56, 76].includes(inputs.num_beds),
              quantity: 2
            }
          ]
        },
        {
          id: "SV366_12",
          code: "SV366",
          name: "12-Bed MH PCU Dining Room, F&N Svc",
          nsf: 325,
          rules: [
            {
              condition: (inputs) => [12, 32, 40, 52, 60, 72, 80, 88, 92, 100].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => inputs.num_beds === 44,
              quantity: 2
            }
          ]
        },
        {
          id: "SV366_16",
          code: "SV366",
          name: "16-Bed MH PCU Dining Room, F&N Svc",
          nsf: 400,
          rules: [
            {
              condition: (inputs) => [16, 24, 64, 84, 88, 96].includes(inputs.num_beds),
              quantity: 1
            }
          ]
        },
        {
          id: "SV366_20",
          code: "SV366",
          name: "20-Bed MH PCU Dining Room, F&N Svc",
          nsf: 480,
          rules: [
            {
              condition: (inputs) => [20, 28, 32, 36, 40, 44].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [48, 52, 56, 60, 64].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [68, 72, 76, 80, 84, 88].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [92, 96, 100].includes(inputs.num_beds),
              quantity: 4
            }
          ]
        },
        {
          id: "SB086_8",
          code: "SB086",
          name: "8-Bed MH PCU Patient Lounge, Bldg Sprt",
          nsf: 250,
          rules: [
            {
              condition: (inputs) => [8, 24, 28, 40, 48, 60, 64, 68, 80, 84, 100].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [36, 56, 76].includes(inputs.num_beds),
              quantity: 2
            }
          ]
        },
        {
          id: "SB086_12",
          code: "SB086",
          name: "12-Bed MH PCU Patient Lounge, Bldg Sprt",
          nsf: 325,
          rules: [
            {
              condition: (inputs) => [12, 32, 40, 52, 60, 72, 80, 88, 92, 100].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => inputs.num_beds === 44,
              quantity: 2
            }
          ]
        },
        {
          id: "SB086_16",
          code: "SB086",
          name: "16-Bed MH PCU Patient Lounge, Bldg Sprt",
          nsf: 400,
          rules: [
            {
              condition: (inputs) => [16, 24, 64, 84, 88, 96].includes(inputs.num_beds),
              quantity: 1
            }
          ]
        },
        {
          id: "SB086_20",
          code: "SB086",
          name: "20-Bed MH PCU Patient Lounge, Bldg Sprt",
          nsf: 480,
          rules: [
            {
              condition: (inputs) => [20, 28, 32, 36, 40, 44].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [48, 52, 56, 60, 64].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [68, 72, 76, 80, 84, 88].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [92, 96, 100].includes(inputs.num_beds),
              quantity: 4
            }
          ]
        },
        {
          id: "IMH51",
          code: "IMH51",
          name: "Veteran Relaxation Room, MH PCU",
          nsf: 125,
          rules: [
            {
              condition: (inputs) => [8, 12, 16, 20].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [24, 28, 32].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [36, 40, 44, 48, 52].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [56, 60, 64, 68, 72].includes(inputs.num_beds),
              quantity: 4
            },
            {
              condition: (inputs) => [76, 80, 84, 88, 92, 96].includes(inputs.num_beds),
              quantity: 5
            },
            {
              condition: (inputs) => inputs.num_beds === 100,
              quantity: 6
            }
          ]
        },
        {
          id: "SB205_8",
          code: "SB205",
          name: "8-Bed MH PCU Enclosed Porch, Bldg Sprt",
          nsf: 240,
          rules: [
            {
              condition: (inputs) => [8, 24, 28, 40, 48, 60, 64, 68, 80, 84, 100].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [36, 56, 76].includes(inputs.num_beds),
              quantity: 2
            }
          ]
        },
        {
          id: "SB205_12",
          code: "SB205",
          name: "12-Bed MH PCU Enclosed Porch, Bldg Sprt",
          nsf: 320,
          rules: [
            {
              condition: (inputs) => [12, 32, 40, 52, 60, 72, 80, 88, 92, 100].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => inputs.num_beds === 44,
              quantity: 2
            }
          ]
        },
        {
          id: "SB205_16",
          code: "SB205",
          name: "16-Bed MH PCU Enclosed Porch, Bldg Sprt",
          nsf: 400,
          rules: [
            {
              condition: (inputs) => [16, 24, 64, 84, 88, 96].includes(inputs.num_beds),
              quantity: 1
            }
          ]
        },
        {
          id: "SB205_20",
          code: "SB205",
          name: "20-Bed MH PCU Enclosed Porch, Bldg Sprt",
          nsf: 480,
          rules: [
            {
              condition: (inputs) => [20, 28, 32, 36, 40, 44].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [48, 52, 56, 60, 64].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [68, 72, 76, 80, 84, 88].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [92, 96, 100].includes(inputs.num_beds),
              quantity: 4
            }
          ]
        },
        {
          id: "SB206",
          code: "SB206",
          name: "MH PCU Outdoor Courtyard, Bldg Sprt",
          nsf: 0,
          rules: [
            {
              condition: (inputs) => true,
              quantity: 1
            }
          ]
        },
        {
          id: "IMH81_8",
          code: "IMH81",
          name: "8-Bed PCU Storage Room, MH PCU",
          nsf: 100,
          rules: [
            {
              condition: (inputs) => [8, 24, 28, 40, 48, 60, 64, 68, 80, 84, 100].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [36, 56, 76].includes(inputs.num_beds),
              quantity: 2
            }
          ]
        },
        {
          id: "IMH81_12",
          code: "IMH81",
          name: "12-Bed PCU Storage Room, MH PCU",
          nsf: 140,
          rules: [
            {
              condition: (inputs) => [12, 32, 40, 52, 60, 72, 80, 88, 92, 100].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => inputs.num_beds === 44,
              quantity: 2
            }
          ]
        },
        {
          id: "IMH81_16",
          code: "IMH81",
          name: "16-Bed PCU Storage Room, MH PCU",
          nsf: 180,
          rules: [
            {
              condition: (inputs) => [16, 24, 64, 84, 88, 96].includes(inputs.num_beds),
              quantity: 1
            }
          ]
        },
        {
          id: "IMH81_20",
          code: "IMH81",
          name: "20-Bed PCU Storage Room, MH PCU",
          nsf: 220,
          rules: [
            {
              condition: (inputs) => [20, 28, 32, 36, 40, 44].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [48, 52, 56, 60, 64].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [68, 72, 76, 80, 84, 88].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [92, 96, 100].includes(inputs.num_beds),
              quantity: 4
            }
          ]
        },
        {
          id: "SB121",
          code: "SB121",
          name: "MH PCU Telephone Alcove, Bldg Sprt",
          nsf: 30,
          rules: [
            {
              condition: (inputs) => [8, 12].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [16, 20].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [24, 28, 32].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [36, 40, 44].includes(inputs.num_beds),
              quantity: 4
            },
            {
              condition: (inputs) => [48, 52].includes(inputs.num_beds),
              quantity: 5
            },
            {
              condition: (inputs) => [56, 60].includes(inputs.num_beds),
              quantity: 6
            },
            {
              condition: (inputs) => [64, 68, 72].includes(inputs.num_beds),
              quantity: 7
            },
            {
              condition: (inputs) => [76, 80].includes(inputs.num_beds),
              quantity: 8
            },
            {
              condition: (inputs) => [84, 88, 92].includes(inputs.num_beds),
              quantity: 9
            },
            {
              condition: (inputs) => [96, 100].includes(inputs.num_beds),
              quantity: 10
            }
          ]
        },
        {
          id: "SB201",
          code: "SB201",
          name: "MH PCU Patient Toilet, Bldg Sprt",
          nsf: 60,
          rules: [
            {
              condition: (inputs) => [8, 12, 16, 20].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [24, 28, 32].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [36, 40, 44, 48, 52].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [56, 60, 64, 68, 72].includes(inputs.num_beds),
              quantity: 4
            },
            {
              condition: (inputs) => [76, 80, 84, 88, 92, 96].includes(inputs.num_beds),
              quantity: 5
            },
            {
              condition: (inputs) => inputs.num_beds === 100,
              quantity: 6
            }
          ]
        }
      ]
    },
    {
      id: "FA5",
      name: "Patient Care Unit (PCU) Support Area",
      rooms: [
        {
          id: "SC051",
          code: "SC051",
          name: "MH PCU Crash Cart Alcove, Clncl Sprt",
          nsf: 20,
          rules: [
            {
              condition: (inputs) => [8, 12].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [16, 20].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [24, 28, 32].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [36, 40, 44].includes(inputs.num_beds),
              quantity: 4
            },
            {
              condition: (inputs) => [48, 52].includes(inputs.num_beds),
              quantity: 5
            },
            {
              condition: (inputs) => [56, 60].includes(inputs.num_beds),
              quantity: 6
            },
            {
              condition: (inputs) => [64, 68, 72].includes(inputs.num_beds),
              quantity: 7
            },
            {
              condition: (inputs) => [76, 80].includes(inputs.num_beds),
              quantity: 8
            },
            {
              condition: (inputs) => [84, 88, 92].includes(inputs.num_beds),
              quantity: 9
            },
            {
              condition: (inputs) => [96, 100].includes(inputs.num_beds),
              quantity: 10
            }
          ]
        },
        {
          id: "SB252",
          code: "SB252",
          name: "MH PCU Wheelchair / Stretcher Alcove, Bldg Sprt",
          nsf: 50,
          rules: [
            {
              condition: (inputs) => [8, 12].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [16, 20].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [24, 28, 32].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [36, 40, 44].includes(inputs.num_beds),
              quantity: 4
            },
            {
              condition: (inputs) => [48, 52].includes(inputs.num_beds),
              quantity: 5
            },
            {
              condition: (inputs) => [56, 60].includes(inputs.num_beds),
              quantity: 6
            },
            {
              condition: (inputs) => [64, 68, 72].includes(inputs.num_beds),
              quantity: 7
            },
            {
              condition: (inputs) => [76, 80].includes(inputs.num_beds),
              quantity: 8
            },
            {
              condition: (inputs) => [84, 88, 92].includes(inputs.num_beds),
              quantity: 9
            },
            {
              condition: (inputs) => [96, 100].includes(inputs.num_beds),
              quantity: 10
            }
          ]
        },
        {
          id: "SB244_8_12",
          code: "SB244",
          name: "8-Bed / 12-Bed MH PCU Housekeeping Aides Closet (HAC), Bldg Sprt",
          nsf: 60,
          rules: [
            {
              condition: (inputs) => [8, 12, 24, 28, 32, 48, 52, 64, 68, 72, 84, 88, 92].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [36, 40, 44, 56, 60, 76, 80, 100].includes(inputs.num_beds),
              quantity: 2
            }
          ]
        },
        {
          id: "SB244_16_20",
          code: "SB244",
          name: "16-Bed / 20-Bed MH PCU Housekeeping Aides Closet (HAC), Bldg Sprt",
          nsf: 80,
          rules: [
            {
              condition: (inputs) => [16, 20, 24, 28, 32, 36, 40, 44].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [48, 52, 56, 60].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [64, 68, 72, 76, 80].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [84, 88, 92, 100].includes(inputs.num_beds),
              quantity: 4
            },
            {
              condition: (inputs) => inputs.num_beds === 96,
              quantity: 5
            }
          ]
        },
        {
          id: "SC471_8",
          code: "SC471",
          name: "8-Bed MH PCU Clean Linen Room, EMS",
          nsf: 60,
          rules: [
            {
              condition: (inputs) => [8, 24, 28, 40, 48, 60, 64, 68, 80, 84, 100].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [36, 56, 76].includes(inputs.num_beds),
              quantity: 2
            }
          ]
        },
        {
          id: "SC471_12",
          code: "SC471",
          name: "12-Bed MH PCU Clean Linen Room, EMS",
          nsf: 80,
          rules: [
            {
              condition: (inputs) => [12, 32, 40, 52, 60, 72, 80, 88, 92, 100].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => inputs.num_beds === 44,
              quantity: 2
            }
          ]
        },
        {
          id: "SC471_16",
          code: "SC471",
          name: "16-Bed MH PCU Clean Linen Room, EMS",
          nsf: 100,
          rules: [
            {
              condition: (inputs) => [16, 24, 64, 84, 88, 96].includes(inputs.num_beds),
              quantity: 1
            }
          ]
        },
        {
          id: "SC471_20",
          code: "SC471",
          name: "20-Bed MH PCU Clean Linen Room, EMS",
          nsf: 120,
          rules: [
            {
              condition: (inputs) => [20, 28, 32, 36, 40, 44].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [48, 52, 56, 60, 64].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [68, 72, 76, 80, 84, 88].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [92, 96, 100].includes(inputs.num_beds),
              quantity: 4
            }
          ]
        },
        {
          id: "SC452_8",
          code: "SC452",
          name: "8-Bed MH PCU Soiled Linen Room, EMS",
          nsf: 50,
          rules: [
            {
              condition: (inputs) => [8, 24, 28, 40, 48, 60, 64, 68, 80, 84, 100].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [36, 56, 76].includes(inputs.num_beds),
              quantity: 2
            }
          ]
        },
        {
          id: "SC452_12",
          code: "SC452",
          name: "12-Bed MH PCU Soiled Linen Room, EMS",
          nsf: 60,
          rules: [
            {
              condition: (inputs) => [12, 32, 40, 52, 60, 72, 80, 88, 92, 100].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => inputs.num_beds === 44,
              quantity: 2
            }
          ]
        },
        {
          id: "SC452_16",
          code: "SC452",
          name: "16-Bed MH PCU Soiled Linen Room, EMS",
          nsf: 70,
          rules: [
            {
              condition: (inputs) => [16, 24, 64, 84, 88, 96].includes(inputs.num_beds),
              quantity: 1
            }
          ]
        },
        {
          id: "SC452_20",
          code: "SC452",
          name: "20-Bed MH PCU Soiled Linen Room, EMS",
          nsf: 80,
          rules: [
            {
              condition: (inputs) => [20, 28, 32, 36, 40, 44].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [48, 52, 56, 60, 64].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [68, 72, 76, 80, 84, 88].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [92, 96, 100].includes(inputs.num_beds),
              quantity: 4
            }
          ]
        },
        {
          id: "SB267_8_12",
          code: "SB267",
          name: "8-Bed / 12-Bed MH PCU Recycling Room, Bldg Sprt",
          nsf: 60,
          rules: [
            {
              condition: (inputs) => [8, 12, 24, 28, 32, 48, 52, 64, 68, 72, 84, 88, 92].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [36, 40, 44, 56, 60, 76, 80, 100].includes(inputs.num_beds),
              quantity: 2
            }
          ]
        },
        {
          id: "SB267_16_20",
          code: "SB267",
          name: "16-Bed / 20-Bed MH PCU Recycling Room, Bldg Sprt",
          nsf: 80,
          rules: [
            {
              condition: (inputs) => [16, 20, 24, 28, 32, 36, 40, 44].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [48, 52, 56, 60].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [64, 68, 72, 76, 80].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [84, 88, 92, 100].includes(inputs.num_beds),
              quantity: 4
            },
            {
              condition: (inputs) => inputs.num_beds === 96,
              quantity: 5
            }
          ]
        },
        {
          id: "IMH61_8",
          code: "IMH61",
          name: "8-Bed Equipment Storage Room, MH PCU",
          nsf: 100,
          rules: [
            {
              condition: (inputs) => [8, 24, 28, 40, 48, 60, 64, 68, 80, 84, 100].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [36, 56, 76].includes(inputs.num_beds),
              quantity: 2
            }
          ]
        },
        {
          id: "IMH61_12",
          code: "IMH61",
          name: "12-Bed Equipment Storage Room, MH PCU",
          nsf: 120,
          rules: [
            {
              condition: (inputs) => [12, 32, 40, 52, 60, 72, 80, 88, 92, 100].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => inputs.num_beds === 44,
              quantity: 2
            }
          ]
        },
        {
          id: "IMH61_16",
          code: "IMH61",
          name: "16-Bed Equipment Storage Room, MH PCU",
          nsf: 140,
          rules: [
            {
              condition: (inputs) => [16, 24, 64, 84, 88, 96].includes(inputs.num_beds),
              quantity: 1
            }
          ]
        },
        {
          id: "IMH61_20",
          code: "IMH61",
          name: "20-Bed Equipment Storage Room, MH PCU",
          nsf: 160,
          rules: [
            {
              condition: (inputs) => [20, 28, 32, 36, 40, 44].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [48, 52, 56, 60, 64].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [68, 72, 76, 80, 84, 88].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [92, 96, 100].includes(inputs.num_beds),
              quantity: 4
            }
          ]
        },
        {
          id: "SB663_8",
          code: "SB663",
          name: "8-Bed MH PCU General Storage Room, Lgstcs Svc",
          nsf: 120,
          rules: [
            {
              condition: (inputs) => [8, 24, 28, 40, 48, 60, 64, 68, 80, 84, 100].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [36, 56, 76].includes(inputs.num_beds),
              quantity: 2
            }
          ]
        },
        {
          id: "SB663_12",
          code: "SB663",
          name: "12-Bed MH PCU General Storage Room, Lgstcs Svc",
          nsf: 160,
          rules: [
            {
              condition: (inputs) => [12, 32, 40, 52, 60, 72, 80, 88, 92, 100].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => inputs.num_beds === 44,
              quantity: 2
            }
          ]
        },
        {
          id: "SB663_16",
          code: "SB663",
          name: "16-Bed MH PCU General Storage Room, Lgstcs Svc",
          nsf: 200,
          rules: [
            {
              condition: (inputs) => [16, 24, 64, 84, 88, 96].includes(inputs.num_beds),
              quantity: 1
            }
          ]
        },
        {
          id: "SB663_20",
          code: "SB663",
          name: "20-Bed MH PCU General Storage Room, Lgstcs Svc",
          nsf: 240,
          rules: [
            {
              condition: (inputs) => [20, 28, 32, 36, 40, 44].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [48, 52, 56, 60, 64].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [68, 72, 76, 80, 84, 88].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [92, 96, 100].includes(inputs.num_beds),
              quantity: 4
            }
          ]
        },
        {
          id: "IMH64_8",
          code: "IMH64",
          name: "8-Bed Patient Property Storage Room, MH PCU",
          nsf: 120,
          rules: [
            {
              condition: (inputs) => [8, 24, 28, 40, 48, 60, 64, 68, 80, 84, 100].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [36, 56, 76].includes(inputs.num_beds),
              quantity: 2
            }
          ]
        },
        {
          id: "IMH64_12",
          code: "IMH64",
          name: "12-Bed Patient Property Storage Room, MH PCU",
          nsf: 140,
          rules: [
            {
              condition: (inputs) => [12, 32, 40, 52, 60, 72, 80, 88, 92, 100].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => inputs.num_beds === 44,
              quantity: 2
            }
          ]
        },
        {
          id: "IMH64_16",
          code: "IMH64",
          name: "16-Bed Patient Property Storage Room, MH PCU",
          nsf: 160,
          rules: [
            {
              condition: (inputs) => [16, 24, 64, 84, 88, 96].includes(inputs.num_beds),
              quantity: 1
            }
          ]
        },
        {
          id: "IMH64_20",
          code: "IMH64",
          name: "20-Bed Patient Property Storage Room, MH PCU",
          nsf: 180,
          rules: [
            {
              condition: (inputs) => [20, 28, 32, 36, 40, 44].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [48, 52, 56, 60, 64].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [68, 72, 76, 80, 84, 88].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [92, 96, 100].includes(inputs.num_beds),
              quantity: 4
            }
          ]
        },
        {
          id: "SB737_8_12",
          code: "SB737",
          name: "8-Bed / 12-Bed MH PCU Clean Utility Room, Lgstcs Svc",
          nsf: 60,
          rules: [
            {
              condition: (inputs) => [8, 12, 24, 28, 32, 48, 52, 64, 68, 72, 84, 88, 92].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [36, 40, 44, 56, 60, 76, 80, 100].includes(inputs.num_beds),
              quantity: 2
            }
          ]
        },
        {
          id: "SB737_16_20",
          code: "SB737",
          name: "16-Bed / 20-Bed MH PCU Clean Utility Room, Lgstcs Svc",
          nsf: 80,
          rules: [
            {
              condition: (inputs) => [16, 20, 24, 28, 32, 36, 40, 44].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [48, 52, 56, 60].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [64, 68, 72, 76, 80].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [84, 88, 92, 100].includes(inputs.num_beds),
              quantity: 4
            },
            {
              condition: (inputs) => inputs.num_beds === 96,
              quantity: 5
            }
          ]
        },
        {
          id: "SB743_8_12",
          code: "SB743",
          name: "8-Bed / 12-Bed MH PCU Soiled Utility Room, Lgstcs Svc",
          nsf: 40,
          rules: [
            {
              condition: (inputs) => [8, 12, 24, 28, 32, 48, 52, 64, 68, 72, 84, 88, 92].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [36, 40, 44, 56, 60, 76, 80, 100].includes(inputs.num_beds),
              quantity: 2
            }
          ]
        },
        {
          id: "SB743_16_20",
          code: "SB743",
          name: "16-Bed / 20-Bed MH PCU Soiled Utility Room, Lgstcs Svc",
          nsf: 60,
          rules: [
            {
              condition: (inputs) => [16, 20, 24, 28, 32, 36, 40, 44].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [48, 52, 56, 60].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [64, 68, 72, 76, 80].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [84, 88, 92, 100].includes(inputs.num_beds),
              quantity: 4
            },
            {
              condition: (inputs) => inputs.num_beds === 96,
              quantity: 5
            }
          ]
        }
      ]
    },
    {
      id: "FA6",
      name: "Patient Care Unit (PCU) Clinical Staff Area",
      rooms: [
        {
          id: "SS203",
          code: "SS203",
          name: "MH PCU Nurse Manager Office, Stff Sprt",
          nsf: 130,
          rules: [
            {
              condition: (inputs) => [8, 12, 16, 20].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [24, 28, 32].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [36, 40, 44, 48, 52].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [56, 60, 64, 68, 72].includes(inputs.num_beds),
              quantity: 4
            },
            {
              condition: (inputs) => [76, 80, 84, 88, 92, 96].includes(inputs.num_beds),
              quantity: 5
            },
            {
              condition: (inputs) => inputs.num_beds === 100,
              quantity: 6
            }
          ]
        },
        {
          id: "SS205_AsstMgr",
          code: "SS205",
          name: "MH PCU Assistant Nurse Manager Office, Stff Sprt",
          nsf: 80,
          rules: [
            {
              condition: (inputs) => [8, 12, 16, 20].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [24, 28, 32].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [36, 40, 44, 48, 52].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [56, 60, 64, 68, 72].includes(inputs.num_beds),
              quantity: 4
            },
            {
              condition: (inputs) => [76, 80, 84, 88, 92, 96].includes(inputs.num_beds),
              quantity: 5
            },
            {
              condition: (inputs) => inputs.num_beds === 100,
              quantity: 6
            }
          ]
        },
        {
          id: "IMH91_8_12",
          code: "IMH91",
          name: "8-Bed / 12-Bed Nurse Station, MH PCU",
          nsf: 110,
          rules: [
            {
              condition: (inputs) => [8, 12, 24, 28, 32, 48, 52, 64, 68, 72, 84, 88, 92].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [36, 40, 44, 56, 60, 76, 80, 100].includes(inputs.num_beds),
              quantity: 2
            }
          ]
        },
        {
          id: "IMH91_16_20",
          code: "IMH91",
          name: "16-bed / 20-bed Nurse Station, MH PCU",
          nsf: 140,
          rules: [
            {
              condition: (inputs) => [16, 20, 24, 28, 32, 36, 40, 44].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [48, 52, 56, 60].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [64, 68, 72, 76, 80].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [84, 88, 92, 100].includes(inputs.num_beds),
              quantity: 4
            },
            {
              condition: (inputs) => inputs.num_beds === 96,
              quantity: 5
            }
          ]
        },
        {
          id: "SC231_8_12",
          code: "SC231",
          name: "8-Bed / 12-Bed MH PCU Nurse Workroom, Clncl Sprt",
          nsf: 175,
          rules: [
            {
              condition: (inputs) => [8, 12, 24, 28, 32, 48, 52, 64, 68, 72, 84, 88, 92].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [36, 40, 44, 56, 60, 76, 80, 100].includes(inputs.num_beds),
              quantity: 2
            }
          ]
        },
        {
          id: "SC231_16_20",
          code: "SC231",
          name: "16-Bed / 20-Bed MH PCU Nurse Workroom, Clncl Sprt",
          nsf: 275,
          rules: [
            {
              condition: (inputs) => [16, 20, 24, 28, 32, 36, 40, 44].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [48, 52, 56, 60].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [64, 68, 72, 76, 80].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [84, 88, 92, 100].includes(inputs.num_beds),
              quantity: 4
            },
            {
              condition: (inputs) => inputs.num_beds === 96,
              quantity: 5
            }
          ]
        },
        {
          id: "SV583",
          code: "SV583",
          name: "MH PCU Medication Room, Pharm Svc",
          nsf: 150,
          rules: [
            {
              condition: (inputs) => [8, 12, 16, 20].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [24, 28, 32].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [36, 40, 44, 48, 52].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [56, 60, 64, 68, 72].includes(inputs.num_beds),
              quantity: 4
            },
            {
              condition: (inputs) => [76, 80, 84, 88, 92, 96].includes(inputs.num_beds),
              quantity: 5
            },
            {
              condition: (inputs) => inputs.num_beds === 100,
              quantity: 6
            }
          ]
        },
        {
          id: "SC243_8_12",
          code: "SC243",
          name: "8-Bed / 12-Bed MH PCU Team Room, Clncl Sprt",
          nsf: 320,
          rules: [
            {
              condition: (inputs) => [8, 12, 24, 28, 32, 48, 52, 64, 68, 72, 84, 88, 92].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [36, 40, 44, 56, 60, 76, 80, 100].includes(inputs.num_beds),
              quantity: 2
            }
          ]
        },
        {
          id: "SC243_16_20",
          code: "SC243",
          name: "16-Bed / 20-Bed MH PCU Team Room, Clncl Sprt",
          nsf: 400,
          rules: [
            {
              condition: (inputs) => [16, 20, 24, 28, 32, 36, 40, 44].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [48, 52, 56, 60].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [64, 68, 72, 76, 80].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [84, 88, 92, 100].includes(inputs.num_beds),
              quantity: 4
            },
            {
              condition: (inputs) => inputs.num_beds === 96,
              quantity: 5
            }
          ]
        },
        {
          id: "SS205_UnitClerk",
          code: "SS205",
          name: "MH PCU Unit Clerk Office, Stff Sprt",
          nsf: 80,
          rules: [
            {
              condition: (inputs) => [8, 12, 16, 20].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [24, 28, 32].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [36, 40, 44, 48, 52].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [56, 60, 64, 68, 72].includes(inputs.num_beds),
              quantity: 4
            },
            {
              condition: (inputs) => [76, 80, 84, 88, 92, 96].includes(inputs.num_beds),
              quantity: 5
            },
            {
              condition: (inputs) => inputs.num_beds === 100,
              quantity: 6
            }
          ]
        },
        {
          id: "SS262_8",
          code: "SS262",
          name: "8-Bed MH PCU Clinical Staff Breakroom, Stff Sprt",
          nsf: 120,
          rules: [
            {
              condition: (inputs) => [8, 24, 28, 40, 48, 60, 64, 68, 80, 84, 100].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [36, 56, 76].includes(inputs.num_beds),
              quantity: 2
            }
          ]
        },
        {
          id: "SS262_12",
          code: "SS262",
          name: "12-Bed MH PCU Clinical Staff Breakroom, Stff Sprt",
          nsf: 160,
          rules: [
            {
              condition: (inputs) => [12, 32, 40, 52, 60, 72, 80, 88, 92, 100].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => inputs.num_beds === 44,
              quantity: 2
            }
          ]
        },
        {
          id: "SS262_16",
          code: "SS262",
          name: "16-Bed MH PCU Clinical Staff Breakroom, Stff Sprt",
          nsf: 200,
          rules: [
            {
              condition: (inputs) => [16, 24, 64, 84, 88, 96].includes(inputs.num_beds),
              quantity: 1
            }
          ]
        },
        {
          id: "SS262_20",
          code: "SS262",
          name: "20-Bed MH PCU Clinical Staff Breakroom, Stff Sprt",
          nsf: 240,
          rules: [
            {
              condition: (inputs) => [20, 28, 32, 36, 40, 44].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [48, 52, 56, 60, 64].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [68, 72, 76, 80, 84, 88].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [92, 96, 100].includes(inputs.num_beds),
              quantity: 4
            }
          ]
        },
        {
          id: "SS282_8",
          code: "SS282",
          name: "8-Bed MH PCU Clinical Staff Locker Room, Stff Sprt",
          nsf: 80,
          rules: [
            {
              condition: (inputs) => [8, 24, 28, 40, 48, 60, 64, 68, 80, 84, 100].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [36, 56, 76].includes(inputs.num_beds),
              quantity: 2
            }
          ]
        },
        {
          id: "SS282_12",
          code: "SS282",
          name: "12-Bed MH PCU Clinical Staff Locker Room, Stff Sprt",
          nsf: 120,
          rules: [
            {
              condition: (inputs) => [12, 32, 40, 52, 60, 72, 80, 88, 92, 100].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => inputs.num_beds === 44,
              quantity: 2
            }
          ]
        },
        {
          id: "SS282_16",
          code: "SS282",
          name: "16-Bed MH PCU Clinical Staff Locker Room, Stff Sprt",
          nsf: 160,
          rules: [
            {
              condition: (inputs) => [16, 24, 64, 84, 88, 96].includes(inputs.num_beds),
              quantity: 1
            }
          ]
        },
        {
          id: "SS282_20",
          code: "SS282",
          name: "20-Bed MH PCU Clinical Staff Locker Room, Stff Sprt",
          nsf: 200,
          rules: [
            {
              condition: (inputs) => [20, 28, 32, 36, 40, 44].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [48, 52, 56, 60, 64].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [68, 72, 76, 80, 84, 88].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [92, 96, 100].includes(inputs.num_beds),
              quantity: 4
            }
          ]
        },
        {
          id: "SB191_Staff",
          code: "SB191",
          name: "MH PCU Clinical Staff Toilet, Clncl Sprt",
          nsf: 60,
          rules: [
            {
              condition: (inputs) => [8, 12, 16, 20].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [24, 28, 32].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [36, 40, 44, 48, 52].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [56, 60, 64, 68, 72].includes(inputs.num_beds),
              quantity: 4
            },
            {
              condition: (inputs) => [76, 80, 84, 88, 92, 96].includes(inputs.num_beds),
              quantity: 5
            },
            {
              condition: (inputs) => inputs.num_beds === 100,
              quantity: 6
            }
          ]
        }
      ]
    },
    {
      id: "FA7",
      name: "Staff and Administrative Area",
      rooms: [
        {
          id: "SS218_PA",
          code: "SS218",
          name: "MH PCU Physician Assistant Workstation, Stff Sprt",
          nsf: 56,
          rules: [
            {
              condition: (inputs) => inputs.num_pa_fte > 0,
              quantity: (inputs) => inputs.num_pa_fte
            }
          ]
        },
        {
          id: "SS218_Nurse",
          code: "SS218",
          name: "MH PCU Nurse Clinician Workstation, Stff Sprt",
          nsf: 56,
          rules: [
            {
              condition: (inputs) => inputs.num_nurse_clinician_fte > 0,
              quantity: (inputs) => inputs.num_nurse_clinician_fte
            }
          ]
        },
        {
          id: "SS218_Psychiatrist",
          code: "SS218",
          name: "MH PCU Psychiatrist Workstation, Stff Sprt",
          nsf: 56,
          rules: [
            {
              condition: (inputs) => inputs.num_psychiatrist_fte > 0,
              quantity: (inputs) => inputs.num_psychiatrist_fte
            }
          ]
        },
        {
          id: "SS218_Psychologist",
          code: "SS218",
          name: "MH PCU Psychologist Workstation, Stff Sprt",
          nsf: 56,
          rules: [
            {
              condition: (inputs) => inputs.num_psychologist_fte > 0,
              quantity: (inputs) => inputs.num_psychologist_fte
            }
          ]
        },
        {
          id: "SS218_SocialWorker",
          code: "SS218",
          name: "MH PCU Social Worker Workstation, Stff Sprt",
          nsf: 56,
          rules: [
            {
              condition: (inputs) => inputs.num_social_worker_fte > 0,
              quantity: (inputs) => inputs.num_social_worker_fte
            }
          ]
        },
        {
          id: "SS218_Dietitian",
          code: "SS218",
          name: "MH PCU Dietician Workstation, Stff Sprt",
          nsf: 56,
          rules: [
            {
              condition: (inputs) => inputs.num_dietitian_fte > 0,
              quantity: (inputs) => inputs.num_dietitian_fte
            }
          ]
        },
        {
          id: "SS218_Chaplain",
          code: "SS218",
          name: "MH PCU Chaplain Workstation, Stff Sprt",
          nsf: 56,
          rules: [
            {
              condition: (inputs) => inputs.num_chaplain_fte > 0,
              quantity: (inputs) => inputs.num_chaplain_fte
            }
          ]
        },
        {
          id: "SS218_RehabTherapist",
          code: "SS218",
          name: "MH PCU Rehabilitation Medicine Therapist Workstation, Stff Sprt",
          nsf: 56,
          rules: [
            {
              condition: (inputs) => inputs.num_rehab_therapist_fte > 0,
              quantity: (inputs) => inputs.num_rehab_therapist_fte
            }
          ]
        },
        {
          id: "SS218_RehabTech",
          code: "SS218",
          name: "MH PCU Rehabilitation Technician Workstation, Stff Sprt",
          nsf: 56,
          rules: [
            {
              condition: (inputs) => inputs.num_rehab_tech_fte > 0,
              quantity: (inputs) => inputs.num_rehab_tech_fte
            }
          ]
        },
        {
          id: "SS218_VocRehab",
          code: "SS218",
          name: "MH PCU Vocational Rehabilitation Specialist Workstation, Stff Sprt",
          nsf: 56,
          rules: [
            {
              condition: (inputs) => inputs.num_voc_rehab_fte > 0,
              quantity: (inputs) => inputs.num_voc_rehab_fte
            }
          ]
        },
        {
          id: "SB191_AdminStaff",
          code: "SB191",
          name: "MH PCU Staff Toilet, Bldg Sprt",
          nsf: 60,
          rules: [
            {
              condition: (inputs) => [8, 12].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [16, 20].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [24, 28, 32].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [36, 40, 44].includes(inputs.num_beds),
              quantity: 4
            },
            {
              condition: (inputs) => [48, 52].includes(inputs.num_beds),
              quantity: 5
            },
            {
              condition: (inputs) => [56, 60].includes(inputs.num_beds),
              quantity: 6
            },
            {
              condition: (inputs) => [64, 68, 72].includes(inputs.num_beds),
              quantity: 7
            },
            {
              condition: (inputs) => [76, 80].includes(inputs.num_beds),
              quantity: 8
            },
            {
              condition: (inputs) => [84, 88, 92].includes(inputs.num_beds),
              quantity: 9
            },
            {
              condition: (inputs) => [96, 100].includes(inputs.num_beds),
              quantity: 10
            }
          ]
        }
      ]
    },
    {
      id: "FA8",
      name: "Academic Education Area",
      rooms: [
        {
          id: "SS205_Residency",
          code: "SS205",
          name: "MH PCU Residency Program Director Office, Stff Sprt",
          nsf: 80,
          rules: [
            {
              condition: (inputs) => inputs.has_residency_program,
              quantity: 1
            }
          ]
        },
        {
          id: "SS101_8_12",
          code: "SS101",
          name: "8-Bed / 12-Bed MH PCU Resident Conference Room, Educ Svc",
          nsf: 240,
          rules: [
            {
              condition: (inputs) => [8, 12, 24, 28, 32, 48, 52, 64, 68, 72, 84, 88, 92].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [36, 40, 44, 56, 60, 76, 80, 100].includes(inputs.num_beds),
              quantity: 2
            }
          ]
        },
        {
          id: "SS101_16_20",
          code: "SS101",
          name: "16-Bed / 20-Bed MH PCU Resident Conference Room, Educ Svc",
          nsf: 300,
          rules: [
            {
              condition: (inputs) => [16, 20, 24, 28, 32, 36, 40, 44].includes(inputs.num_beds),
              quantity: 1
            },
            {
              condition: (inputs) => [48, 52, 56, 60].includes(inputs.num_beds),
              quantity: 2
            },
            {
              condition: (inputs) => [64, 68, 72, 76, 80].includes(inputs.num_beds),
              quantity: 3
            },
            {
              condition: (inputs) => [84, 88, 92, 100].includes(inputs.num_beds),
              quantity: 4
            },
            {
              condition: (inputs) => inputs.num_beds === 96,
              quantity: 5
            }
          ]
        }
      ]
    }
  ]
};
