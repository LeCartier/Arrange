// Chapter 263: Community Based Outpatient Clinic (PACT) Interim
// Parsed from VA Space Planning Criteria Section 4 & 5

export const CHAPTER_263 = {
  chapter: "263",
  name: "Community Based Outpatient Clinic (PACT) Interim",
  description: "Interim CBOC PACT planning criteria for community-based outpatient facilities",
  
  // Section 4: Input Data Statements
  inputs: [
    {
      id: "pact_modules",
      label: "How many PACT Modules are authorized?",
      type: "number",
      min: 1,
      max: 3,
      default: 1,
      helpText: "Number of Patient Aligned Care Team modules (1 to 3)"
    }
  ],
  
  // Section 5: Space Planning Criteria
  functionalAreas: [
    {
      id: "FA1",
      name: "Lobby / Reception Area",
      description: "Main entrance, waiting, reception, and visitor support spaces",
      rooms: [
        {
          id: "LOB02",
          code: "LOB02",
          name: "Vestibule",
          nsf: 200,
          rules: [
            { condition: (inputs) => inputs.pact_modules >= 1 && inputs.pact_modules <= 3, quantity: 1 }
          ]
        },
        {
          id: "SRLW1",
          code: "SRLW1",
          name: "Alcove, Wheelchair",
          nsf: 90,
          rules: [
            { condition: (inputs) => inputs.pact_modules >= 1 && inputs.pact_modules <= 2, quantity: 1, nsf: 90 },
            { condition: (inputs) => inputs.pact_modules === 3, quantity: 1, nsf: 120 }
          ]
        },
        {
          id: "WTPC1",
          code: "WTPC1",
          name: "Waiting, PACT 1",
          nsf: 1260,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 1, quantity: 1 }
          ],
          notes: "Accommodates 57 people total. Provides waiting for: General, Mental Health, PACT 1, and PLM Service"
        },
        {
          id: "WTPC2",
          code: "WTPC2",
          name: "Waiting, PACT 2",
          nsf: 4000,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 2, quantity: 1 }
          ],
          notes: "Accommodates 182 people total. Provides waiting for multiple clinics including PACT 1 and 2"
        },
        {
          id: "WTPC3",
          code: "WTPC3",
          name: "Waiting, PACT 3",
          nsf: 7200,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 3, quantity: 1 }
          ],
          notes: "Accommodates 328 people total. Provides waiting for all clinic services including PACT 1, 2, and 3"
        },
        {
          id: "WTF03",
          code: "WTF03",
          name: "Waiting, PACT Family",
          nsf: 225,
          rules: [
            { condition: (inputs) => inputs.pact_modules >= 1 && inputs.pact_modules <= 3, quantity: 1 }
          ],
          notes: "Accommodates 7 people including child table and chairs"
        },
        {
          id: "LAC01",
          code: "LAC01",
          name: "Lactation Room",
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.pact_modules >= 1 && inputs.pact_modules <= 3, quantity: 1 }
          ]
        },
        {
          id: "RCP03",
          code: "RCP03",
          name: "Reception",
          nsf: 385,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 1, quantity: 1 },
            { condition: (inputs) => inputs.pact_modules === 2, quantity: 2 },
            { condition: (inputs) => inputs.pact_modules === 3, quantity: 3 }
          ],
          notes: "Accommodates three Receptionist FTEs, patient privacy area, and circulation"
        },
        {
          id: "NCWD4",
          code: "NCWD4",
          name: "Alcove, Volunteer",
          nsf: 120,
          rules: [
            { condition: (inputs) => inputs.pact_modules >= 1 && inputs.pact_modules <= 3, quantity: 1 }
          ],
          notes: "Accommodates refreshment center, information board, etc."
        },
        {
          id: "CLSC2",
          code: "CLSC2",
          name: "Workstation, Patient Education",
          nsf: 30,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 1, quantity: 2 },
            { condition: (inputs) => inputs.pact_modules === 2, quantity: 4 },
            { condition: (inputs) => inputs.pact_modules === 3, quantity: 6 }
          ]
        },
        {
          id: "TNPFM",
          code: "TNPFM",
          name: "Toilet, Family",
          nsf: 80,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 1, quantity: 1 },
            { condition: (inputs) => inputs.pact_modules >= 2 && inputs.pact_modules <= 3, quantity: 2 }
          ]
        },
        {
          id: "TNPM1",
          code: "TNPM1",
          name: "Toilet, Male",
          nsf: 205,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 1, quantity: 1 }
          ]
        },
        {
          id: "TNPM2",
          code: "TNPM2",
          name: "Toilet, Male",
          nsf: 235,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 2, quantity: 1 }
          ]
        },
        {
          id: "TNPM3",
          code: "TNPM3",
          name: "Toilet, Male",
          nsf: 295,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 3, quantity: 1 }
          ]
        },
        {
          id: "TNPF1",
          code: "TNPF1",
          name: "Toilet, Female",
          nsf: 205,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 1, quantity: 1 }
          ]
        },
        {
          id: "TNPF2",
          code: "TNPF2",
          name: "Toilet, Female",
          nsf: 235,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 2, quantity: 1 }
          ]
        },
        {
          id: "TNPF3",
          code: "TNPF3",
          name: "Toilet, Female",
          nsf: 295,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 3, quantity: 1 }
          ]
        }
      ]
    },
    {
      id: "FA2",
      name: "Patient Aligned Care Team (PACT) Clinic 1",
      description: "First PACT module with exam rooms, procedures, and team areas",
      rooms: [
        {
          id: "PEHW2",
          code: "PEHW2",
          name: "Alcove, Height / Weight Accessible Station",
          nsf: 40,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 1, quantity: 1 }
          ]
        },
        {
          id: "OFDC2",
          code: "OFDC2",
          name: "Consult Room, Patient Aligned Care Team (PACT)",
          nsf: 125,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 1, quantity: 4 }
          ]
        },
        {
          id: "EXPA1",
          code: "EXPA1",
          name: "Exam Room, Patient Aligned Care Team (PACT)",
          nsf: 125,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 1, quantity: 8 }
          ]
        },
        {
          id: "TPG01",
          code: "TPG01",
          name: "Toilet, PACT Patient",
          nsf: 60,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 1, quantity: 1 }
          ]
        },
        {
          id: "EXW01",
          code: "EXW01",
          name: "Exam Room, Women's Health",
          nsf: 125,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 1, quantity: 2 }
          ]
        },
        {
          id: "TPG01_WH",
          code: "TPG01",
          name: "Toilet, Women's Health Exam Room Patient",
          nsf: 60,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 1, quantity: 1 }
          ]
        },
        {
          id: "TRPR1",
          code: "TRPR1",
          name: "Procedure Room, General",
          nsf: 180,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 1, quantity: 1 }
          ]
        },
        {
          id: "TPB01",
          code: "TPB01",
          name: "Toilet, General Procedure Room Patient",
          nsf: 75,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 1, quantity: 1 }
          ],
          notes: "Accommodates bariatric patients"
        },
        {
          id: "WRTM2",
          code: "WRTM2",
          name: "Tele-Health Room",
          nsf: 125,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 1, quantity: 1 }
          ]
        },
        {
          id: "WRTM3",
          code: "WRTM3",
          name: "Tele-Retinal Room",
          nsf: 125,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 1, quantity: 1 }
          ]
        },
        {
          id: "CLSC4",
          code: "CLSC4",
          name: "Shared Medical Appointment Room",
          nsf: 400,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 1, quantity: 1 }
          ]
        },
        {
          id: "SRE01",
          code: "SRE01",
          name: "Storage, Shared Medical Appointments",
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 1, quantity: 1 }
          ]
        },
        {
          id: "RCA06",
          code: "RCA06",
          name: "Alcove, Medication",
          nsf: 20,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 1, quantity: 1 }
          ]
        },
        {
          id: "RCA01",
          code: "RCA01",
          name: "Alcove, AED",
          nsf: 20,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 1, quantity: 1 }
          ]
        },
        {
          id: "WRTM1",
          code: "WRTM1",
          name: "Teamwork Area",
          nsf: 240,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 1, quantity: 4 }
          ],
          notes: "One Teamwork Area per Teamlet"
        },
        {
          id: "OFA07",
          code: "OFA07",
          name: "Workstation, Extended Team",
          nsf: 56,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 1, quantity: 4 }
          ],
          notes: "For Mental Health providers, Dieticians, Clinical Pharmacists, Social Workers, Whole Health Coach"
        },
        {
          id: "WKTM3",
          code: "WKTM3",
          name: "Workroom, Patient Aligned Care Team (PACT)",
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 1, quantity: 1 }
          ]
        },
        {
          id: "CFR01_TRAINING",
          code: "CFR01",
          name: "Training Room, Staff",
          nsf: 240,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 1, quantity: 1 }
          ],
          notes: "Accommodates 6 people"
        },
        {
          id: "OFA07_ADMIN",
          code: "OFA07",
          name: "Workstation, Administrative",
          nsf: 56,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 1, quantity: 1 }
          ]
        },
        {
          id: "CFR01_CONF",
          code: "CFR01",
          name: "Conference Room",
          nsf: 240,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 1, quantity: 1 }
          ],
          notes: "Accommodates 6 people"
        },
        {
          id: "UCCL1",
          code: "UCCL1",
          name: "Utility Room, Clean",
          nsf: 60,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 1, quantity: 1 }
          ]
        },
        {
          id: "SRE01_MED",
          code: "SRE01",
          name: "Storage, Medical Equipment",
          nsf: 120,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 1, quantity: 1 }
          ]
        },
        {
          id: "SL001",
          code: "SL001",
          name: "Lounge, Staff",
          nsf: 220,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 1, quantity: 1 }
          ]
        },
        {
          id: "LR001",
          code: "LR001",
          name: "Locker, Staff Personal Property",
          nsf: 60,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 1, quantity: 1 }
          ]
        },
        {
          id: "TNPG1",
          code: "TNPG1",
          name: "Toilet, Staff",
          nsf: 60,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 1, quantity: 2 }
          ]
        }
      ]
    },
    {
      id: "FA3",
      name: "Patient Aligned Care Team (PACT) Clinic 2",
      description: "Second PACT module (when 2 or more modules authorized)",
      condition: (inputs) => inputs.pact_modules >= 2,
      rooms: [
        {
          id: "PEHW2_2",
          code: "PEHW2",
          name: "Alcove, Height / Weight Accessible Station",
          nsf: 40,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 2, quantity: 2 }
          ]
        },
        {
          id: "OFDC2_2",
          code: "OFDC2",
          name: "Consult Room, Patient Aligned Care Team (PACT)",
          nsf: 125,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 2, quantity: 8 }
          ]
        },
        {
          id: "EXPA1_2",
          code: "EXPA1",
          name: "Exam Room, Patient Aligned Care Team (PACT)",
          nsf: 125,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 2, quantity: 16 }
          ]
        },
        {
          id: "TPG01_2",
          code: "TPG01",
          name: "Toilet, PACT Patient",
          nsf: 60,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 2, quantity: 2 }
          ]
        },
        {
          id: "EXW01_2",
          code: "EXW01",
          name: "Exam Room, Women's Health",
          nsf: 125,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 2, quantity: 4 }
          ]
        },
        {
          id: "TPG01_WH_2",
          code: "TPG01",
          name: "Toilet, Women's Health Exam Room Patient",
          nsf: 60,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 2, quantity: 4 }
          ]
        },
        {
          id: "TRPR1_2",
          code: "TRPR1",
          name: "Procedure Room, General",
          nsf: 180,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 2, quantity: 1 }
          ]
        },
        {
          id: "TPB01_2",
          code: "TPB01",
          name: "Toilet, General Procedure Room Patient",
          nsf: 75,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 2, quantity: 1 }
          ]
        },
        {
          id: "WRTM2_2",
          code: "WRTM2",
          name: "Tele-Health Room",
          nsf: 125,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 2, quantity: 1 }
          ]
        },
        {
          id: "WRTM3_2",
          code: "WRTM3",
          name: "Tele-Retinal Room",
          nsf: 125,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 2, quantity: 1 }
          ]
        },
        {
          id: "CLSC4_2",
          code: "CLSC4",
          name: "Shared Medical Appointment Room",
          nsf: 400,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 2, quantity: 2 }
          ]
        },
        {
          id: "SRE01_2",
          code: "SRE01",
          name: "Storage, Shared Medical Appointments",
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 2, quantity: 2 }
          ]
        },
        {
          id: "RCA06_2",
          code: "RCA06",
          name: "Alcove, Medication",
          nsf: 20,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 2, quantity: 2 }
          ]
        },
        {
          id: "RCA01_2",
          code: "RCA01",
          name: "Alcove, AED",
          nsf: 20,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 2, quantity: 2 }
          ]
        },
        {
          id: "WRTM1_2",
          code: "WRTM1",
          name: "Teamwork Area",
          nsf: 240,
          rules: [
            { condition: (inputs) => inputs.pact_modules === 2, quantity: 8 }
          ]
        }
      ]
    }
  ]
};
