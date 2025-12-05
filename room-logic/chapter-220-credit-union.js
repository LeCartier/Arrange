// Chapter 220: Credit Union
// Based on VA PG-18-9 Space Planning Criteria

export const CHAPTER_220 = {
  chapter: '220',
  name: 'Credit Union',
  description: 'Full service, Level 2, or Level 1 credit union for eligible members',
  
  inputs: [
    {
      id: 'level_1',
      label: 'Is a Level 1 Credit Union authorized?',
      type: 'checkbox',
      defaultValue: false
    },
    {
      id: 'level_2',
      label: 'Is a Level 2 Credit Union authorized?',
      type: 'checkbox',
      defaultValue: false
    },
    {
      id: 'full_service',
      label: 'Is a full service Credit Union authorized?',
      type: 'checkbox',
      defaultValue: true
    }
  ],
  
  functionalAreas: [
    {
      name: 'FA1: Lobby and Teller Area',
      rooms: [
        {
          id: 'SV111',
          name: 'Teller Window, Credit Union',
          nsf: 60,
          rules: [
            { condition: (inputs) => inputs.level_1, quantity: 2 },
            { condition: (inputs) => inputs.level_2, quantity: 3 },
            { condition: (inputs) => inputs.full_service, quantity: 4 }
          ],
          comment: 'Teller operating space plus common teller use area; includes safe, stool, service counter, cabinets'
        },
        {
          id: 'SV121',
          name: 'Teller Customer Area, Credit Union',
          nsf: 120,
          rules: [
            { condition: (inputs) => inputs.level_1, quantity: 1, nsf: 120 },
            { condition: (inputs) => inputs.level_2, quantity: 1, nsf: 180 },
            { condition: (inputs) => inputs.full_service, quantity: 1, nsf: 240 }
          ],
          comment: 'Queuing space, customer writing counter, casework for reference materials, study space'
        },
        {
          id: 'SV131',
          name: 'Automatic Teller Machine (ATM), Credit Union',
          nsf: 30,
          rules: [
            { condition: (inputs) => inputs.level_1 || inputs.level_2, quantity: 1 },
            { condition: (inputs) => inputs.full_service, quantity: 2 }
          ],
          comment: 'Space for machine, member queuing and circulation; can be reduced to 15 NSF if in alcove'
        }
      ]
    },
    
    {
      name: 'FA2: Staff and Administrative Area',
      rooms: [
        {
          id: 'SS204_CU_Manager',
          name: 'Credit Union Manager Office',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.level_1 || inputs.level_2 || inputs.full_service, quantity: 1 }
          ]
        },
        {
          id: 'SS204_CU_Supervisor',
          name: 'Credit Union Supervisor Office',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.level_1 || inputs.level_2 || inputs.full_service, quantity: 1 }
          ]
        },
        {
          id: 'SS218_CU_Loan',
          name: 'Credit Union Loan / Accounts Officer Workstation',
          nsf: 56,
          rules: [
            { condition: (inputs) => inputs.level_1, quantity: 1 },
            { condition: (inputs) => inputs.level_2 || inputs.full_service, quantity: 2 }
          ]
        },
        {
          id: 'SS218_CU_Clerical',
          name: 'Credit Union Clerical Workstation',
          nsf: 56,
          rules: [
            { condition: (inputs) => inputs.level_1 || inputs.level_2 || inputs.full_service, quantity: 1 }
          ]
        },
        {
          id: 'SS268',
          name: 'Credit Union Copy / Supply Alcove',
          nsf: 40,
          rules: [
            { condition: (inputs) => inputs.level_1 || inputs.level_2 || inputs.full_service, quantity: 1 }
          ],
          comment: 'Accommodates file cabinets, ADP space, printer, and reproduction equipment'
        }
      ]
    },
    
    {
      name: 'FA3: Support Area',
      rooms: [
        {
          id: 'SV141',
          name: 'Secure Vault, Credit Union',
          nsf: 80,
          rules: [
            { condition: (inputs) => inputs.full_service, quantity: 1 }
          ]
        },
        {
          id: 'SV151',
          name: 'Storage Room, Credit Union',
          nsf: 80,
          rules: [
            { condition: (inputs) => inputs.full_service, quantity: 1 }
          ]
        },
        {
          id: 'SB191_CU',
          name: 'Credit Union Staff Toilet',
          nsf: 60,
          rules: [
            { condition: (inputs) => inputs.full_service, quantity: 1 }
          ],
          comment: 'Accessible toilet, wall-hung lavatory, ABA clearances'
        }
      ]
    }
  ]
};
