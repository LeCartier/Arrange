// Chapter 238: Medical Center Director's Suite
// Based on VA PG-18-9 Space Planning Criteria

export const CHAPTER_238 = {
  chapter: '238',
  name: "Medical Center Director's Suite",
  description: 'Administrative areas for Director, Assistant Director, Chief of Staff, and immediate staffs',
  
  inputs: [
    {
      id: 'facility_fte',
      label: 'How many FTE positions in total are authorized for this facility?',
      type: 'number',
      min: 1,
      max: 4000,
      defaultValue: 500
    }
  ],
  
  functionalAreas: [
    {
      name: 'FA1: Reception Area',
      rooms: [
        {
          id: 'SB003_Dir',
          name: 'VAMC Director Reception Waiting',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 1 && inputs.facility_fte <= 1000, quantity: 1, nsf: 100 },
            { condition: (inputs) => inputs.facility_fte >= 1001 && inputs.facility_fte <= 3000, quantity: 1, nsf: 130 },
            { condition: (inputs) => inputs.facility_fte >= 3001 && inputs.facility_fte <= 4000, quantity: 1, nsf: 160 }
          ]
        }
      ]
    },
    
    {
      name: 'FA2: Staff and Administrative Area',
      rooms: [
        {
          id: 'SS208',
          name: 'VAMC Director Office',
          nsf: 240,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 1 && inputs.facility_fte <= 4000, quantity: 1 }
          ],
          comment: 'Private office accessible only through Secretary Workstation; controls visitors and confidentiality'
        },
        {
          id: 'SB191_Dir',
          name: 'VAMC Director Toilet',
          nsf: 60,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 1 && inputs.facility_fte <= 4000, quantity: 1 }
          ],
          comment: 'Accessible toilet, wall-hung lavatory, ABA clearances'
        },
        {
          id: 'SS207_Assoc',
          name: 'VAMC Associate Director Office',
          nsf: 150,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 1 && inputs.facility_fte <= 4000, quantity: 1 }
          ]
        },
        {
          id: 'SS204_Asst',
          name: 'VAMC Assistant Director Office',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 1001 && inputs.facility_fte <= 3000, quantity: 1 },
            { condition: (inputs) => inputs.facility_fte >= 3001 && inputs.facility_fte <= 4000, quantity: 2 }
          ]
        },
        {
          id: 'SS207_COS',
          name: 'VAMC Chief of Staff (COS) Office',
          nsf: 150,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 1 && inputs.facility_fte <= 4000, quantity: 1 }
          ]
        },
        {
          id: 'SB003_Exec',
          name: 'VAMC Director Executive Waiting',
          nsf: 60,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 1 && inputs.facility_fte <= 4000, quantity: 1 }
          ],
          comment: 'Accommodates 3 standard chairs, 1 bariatric chair, 1 accessible space; total 5 people'
        },
        {
          id: 'SS218_Dir_Admin',
          name: 'VAMC Director Administration Support Workstation',
          nsf: 56,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 1 && inputs.facility_fte <= 4000, quantity: 1 }
          ]
        },
        {
          id: 'SS218_Dir_AdminAsst',
          name: 'VAMC Director Administrative Assistant Workstation',
          nsf: 56,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 1 && inputs.facility_fte <= 1000, quantity: 2 },
            { condition: (inputs) => inputs.facility_fte >= 1001 && inputs.facility_fte <= 3000, quantity: 3 },
            { condition: (inputs) => inputs.facility_fte >= 3001 && inputs.facility_fte <= 4000, quantity: 4 }
          ]
        },
        {
          id: 'SS218_Dir_MgmtAsst',
          name: 'VAMC Director Management Assistant / Special Assistant Workstation',
          nsf: 56,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 1 && inputs.facility_fte <= 1000, quantity: 1 },
            { condition: (inputs) => inputs.facility_fte >= 1001 && inputs.facility_fte <= 3000, quantity: 2 },
            { condition: (inputs) => inputs.facility_fte >= 3001 && inputs.facility_fte <= 4000, quantity: 3 }
          ]
        },
        {
          id: 'SS268_Dir',
          name: 'VAMC Director Copy / Supply Alcove',
          nsf: 40,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 1 && inputs.facility_fte <= 1000, quantity: 1 }
          ],
          comment: 'Accommodates active file storage, office machines, worktables, etc.'
        },
        {
          id: 'SS272_Dir',
          name: 'VAMC Director Copy / Supply Room',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 1001 && inputs.facility_fte <= 3000, quantity: 1, nsf: 100 },
            { condition: (inputs) => inputs.facility_fte >= 3001 && inputs.facility_fte <= 4000, quantity: 1, nsf: 120 }
          ]
        },
        {
          id: 'SB191_Staff',
          name: 'VAMC Staff Toilet',
          nsf: 60,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 1 && inputs.facility_fte <= 1000, quantity: 2 },
            { condition: (inputs) => inputs.facility_fte >= 1001 && inputs.facility_fte <= 3000, quantity: 3 },
            { condition: (inputs) => inputs.facility_fte >= 3001 && inputs.facility_fte <= 4000, quantity: 4 }
          ]
        },
        {
          id: 'SS291',
          name: 'VAMC Conference Room',
          nsf: 300,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 1 && inputs.facility_fte <= 1000, quantity: 1, nsf: 300 },
            { condition: (inputs) => inputs.facility_fte >= 1001 && inputs.facility_fte <= 3000, quantity: 1, nsf: 500 },
            { condition: (inputs) => inputs.facility_fte >= 3001 && inputs.facility_fte <= 4000, quantity: 1, nsf: 675 }
          ],
          comment: 'Accommodates 10 conference chairs at table, 10 at perimeter, table, credenza; total 20 people'
        },
        {
          id: 'SS216',
          name: 'VAMC Director Student / Trainee Workstation',
          nsf: 36,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 1 && inputs.facility_fte <= 1000, quantity: 2 },
            { condition: (inputs) => inputs.facility_fte >= 1001 && inputs.facility_fte <= 3000, quantity: 3 },
            { condition: (inputs) => inputs.facility_fte >= 3001 && inputs.facility_fte <= 4000, quantity: 4 }
          ]
        },
        {
          id: 'SS101_Dir',
          name: 'VAMC Director Staff Conference Room',
          nsf: 240,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 1 && inputs.facility_fte <= 1000, quantity: 1, nsf: 240 },
            { condition: (inputs) => inputs.facility_fte >= 1001 && inputs.facility_fte <= 3000, quantity: 1, nsf: 360 },
            { condition: (inputs) => inputs.facility_fte >= 3001 && inputs.facility_fte <= 4000, quantity: 1, nsf: 480 }
          ]
        }
      ]
    },
    
    {
      name: 'FA3: Support Area',
      rooms: [
        {
          id: 'SB244_Dir',
          name: 'VAMC Director Housekeeping Aides Closet (HAC)',
          nsf: 60,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 3001 && inputs.facility_fte <= 4000, quantity: 1 }
          ]
        },
        {
          id: 'SS261',
          name: 'VAMC Director Executive Kitchenette',
          nsf: 80,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 1 && inputs.facility_fte <= 4000, quantity: 1 }
          ]
        }
      ]
    }
  ]
};
