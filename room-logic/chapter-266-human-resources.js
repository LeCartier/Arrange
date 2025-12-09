// Chapter 266: Human Resources Management
// Parsed from VA Space Planning Criteria Section 4 & 5

export const CHAPTER_266 = {
  chapter: "266",
  name: "Human Resources Management",
  description: "Personnel service areas for recruitment, placement, training, and HR administration",
  
  // Section 4: Input Data Statements
  inputs: [
    {
      id: "fte_positions",
      label: "How many FTE positions in total are authorized for this facility?",
      type: "number",
      min: 1,
      max: 5000,
      helpText: "Total number of Full-Time Equivalent positions authorized (1 to 5,000)"
    }
  ],
  
  // Section 5: Space Planning Criteria
  functionalAreas: [
    {
      id: "FA1",
      name: "Reception Area",
      description: "Visitor waiting and public toilet facilities",
      rooms: [
        {
          id: "SB003",
          code: "SB003",
          name: "HR Waiting, Bldg Sprt",
          nsf: 80,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 50 && inputs.fte_positions <= 1000, quantity: 1, nsf: 80 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 2000, quantity: 1, nsf: 100 },
            { condition: (inputs) => inputs.fte_positions >= 2001 && inputs.fte_positions <= 3000, quantity: 1, nsf: 110 },
            { condition: (inputs) => inputs.fte_positions >= 3001 && inputs.fte_positions <= 4000, quantity: 1, nsf: 130 },
            { condition: (inputs) => inputs.fte_positions >= 4001 && inputs.fte_positions <= 5000, quantity: 1, nsf: 150 }
          ],
          notes: "For visitors with appointments; should be adjacent to open office/work space. Wall storage for employment materials."
        },
        {
          id: "SB191",
          code: "SB191",
          name: "HR Public Toilet, Bldg Sprt",
          nsf: 60,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 50 && inputs.fte_positions <= 2000, quantity: 1 },
            { condition: (inputs) => inputs.fte_positions >= 2001 && inputs.fte_positions <= 5000, quantity: 2 }
          ],
          notes: "One for male and one for female"
        }
      ]
    },
    {
      id: "FA2",
      name: "Staff and Administrative Area",
      description: "Offices, workstations, and support spaces for HR personnel",
      rooms: [
        {
          id: "SS204_DIR",
          code: "SS204",
          name: "HR Human Resources Director Office, Stff Sprt",
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 50 && inputs.fte_positions <= 5000, quantity: 1 }
          ]
        },
        {
          id: "SS204_ASST",
          code: "SS204",
          name: "HR Assistant Service Chief Office, Stff Sprt",
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 50 && inputs.fte_positions <= 5000, quantity: 1 }
          ]
        },
        {
          id: "SS218_ADMIN",
          code: "SS218",
          name: "HR Administration Support Workstation, Stff Sprt",
          nsf: 56,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 50 && inputs.fte_positions <= 1000, quantity: 2 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 3000, quantity: 3 },
            { condition: (inputs) => inputs.fte_positions >= 3001 && inputs.fte_positions <= 5000, quantity: 4 }
          ]
        },
        {
          id: "SS204_SPEC",
          code: "SS204",
          name: "HR Personnel Management Specialist Office, Stff Sprt",
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 50 && inputs.fte_positions <= 1000, quantity: 1 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 2000, quantity: 2 },
            { condition: (inputs) => inputs.fte_positions >= 2001 && inputs.fte_positions <= 3000, quantity: 3 },
            { condition: (inputs) => inputs.fte_positions >= 3001 && inputs.fte_positions <= 4000, quantity: 4 },
            { condition: (inputs) => inputs.fte_positions >= 4001 && inputs.fte_positions <= 5000, quantity: 5 }
          ]
        },
        {
          id: "SS218_MGMT",
          code: "SS218",
          name: "HR Personnel Management Support Workstation, Stff Sprt",
          nsf: 56,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 50 && inputs.fte_positions <= 1000, quantity: 2 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 3000, quantity: 3 },
            { condition: (inputs) => inputs.fte_positions >= 3001 && inputs.fte_positions <= 4000, quantity: 4 },
            { condition: (inputs) => inputs.fte_positions >= 4001 && inputs.fte_positions <= 5000, quantity: 6 }
          ]
        },
        {
          id: "SS218_ASST",
          code: "SS218",
          name: "HR Personnel Assistant Workstation, Stff Sprt",
          nsf: 56,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 50 && inputs.fte_positions <= 1000, quantity: 1 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 2000, quantity: 2 },
            { condition: (inputs) => inputs.fte_positions >= 2001 && inputs.fte_positions <= 3000, quantity: 3 },
            { condition: (inputs) => inputs.fte_positions >= 3001 && inputs.fte_positions <= 4000, quantity: 4 },
            { condition: (inputs) => inputs.fte_positions >= 4001 && inputs.fte_positions <= 5000, quantity: 5 }
          ],
          notes: "Provide clerical, technical and administrative support; should be near Specialist offices"
        },
        {
          id: "SS272",
          code: "SS272",
          name: "HR Copy / Supply Room, Stff Sprt",
          nsf: 80,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 50 && inputs.fte_positions <= 1000, quantity: 1, nsf: 80 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 2000, quantity: 2, nsf: 80 },
            { condition: (inputs) => inputs.fte_positions >= 2001 && inputs.fte_positions <= 3000, quantity: 3, nsf: 100 },
            { condition: (inputs) => inputs.fte_positions >= 3001 && inputs.fte_positions <= 4000, quantity: 4, nsf: 100 },
            { condition: (inputs) => inputs.fte_positions >= 4001 && inputs.fte_positions <= 5000, quantity: 5, nsf: 120 }
          ]
        },
        {
          id: "SS294",
          code: "SS294",
          name: "HR Placement / Testing Conference Room, Stff Sprt",
          nsf: 240,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 50 && inputs.fte_positions <= 1000, quantity: 1, nsf: 240 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 3000, quantity: 1, nsf: 300 },
            { condition: (inputs) => inputs.fte_positions >= 3001 && inputs.fte_positions <= 5000, quantity: 2, nsf: 300 }
          ],
          notes: "Dual purpose for Personnel Conference and employee examinations. Should be near Specialist offices."
        },
        {
          id: "SB191_STAFF",
          code: "SB191",
          name: "HR Staff Universal Toilet, Bldg Sprt",
          nsf: 60,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 50 && inputs.fte_positions <= 5000, quantity: 2 }
          ]
        }
      ]
    },
    {
      id: "FA3",
      name: "Support Area",
      description: "Personnel records and file storage",
      rooms: [
        {
          id: "SS254",
          code: "SS254",
          name: "HR Personnel Records File Room, Stff Sprt",
          nsf: 120,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 50 && inputs.fte_positions <= 1000, quantity: 1, nsf: 120 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 2000, quantity: 1, nsf: 160 },
            { condition: (inputs) => inputs.fte_positions >= 2001 && inputs.fte_positions <= 3000, quantity: 1, nsf: 200 },
            { condition: (inputs) => inputs.fte_positions >= 3001 && inputs.fte_positions <= 4000, quantity: 1, nsf: 240 },
            { condition: (inputs) => inputs.fte_positions >= 4001 && inputs.fte_positions <= 5000, quantity: 1, nsf: 280 }
          ]
        }
      ]
    }
  ]
};
