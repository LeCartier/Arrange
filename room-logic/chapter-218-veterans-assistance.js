// Chapter 218: Veterans Assistance Unit
// Based on VA PG-18-9 Space Planning Criteria

export const CHAPTER_218 = {
  chapter: '218',
  name: 'Veterans Assistance Unit',
  description: 'Veterans benefits counselors providing information, advice and assistance on VA and other agency benefits',
  
  inputs: [
    {
      id: 'counselor_fte',
      label: 'How many Veterans Assistance Unit Benefits Counselor FTE positions are authorized?',
      type: 'number',
      min: 1,
      max: 10,
      defaultValue: 2
    }
  ],
  
  functionalAreas: [
    {
      name: 'FA1: Staff and Administrative Area',
      rooms: [
        {
          id: 'SS204_VA_Chief',
          name: 'Veterans Assistance Chief Office',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.counselor_fte >= 1 && inputs.counselor_fte <= 10, quantity: 1 }
          ]
        },
        {
          id: 'SB003',
          name: 'Veterans Assistance Waiting',
          nsf: 80,
          rules: [
            { condition: (inputs) => inputs.counselor_fte >= 1 && inputs.counselor_fte <= 10, quantity: 1 }
          ],
          comment: 'Accommodates 1 standard chair, 1 bariatric chair, 1 accessible space; total 3 people'
        },
        {
          id: 'SS218_VA_Admin',
          name: 'Veterans Assistance Administration Support Workstation',
          nsf: 56,
          rules: [
            { condition: (inputs) => inputs.counselor_fte >= 1 && inputs.counselor_fte <= 10, quantity: 1 }
          ]
        },
        {
          id: 'SS204_VA_Counselor',
          name: 'Veterans Assistance Veterans Benefits Counselor Office',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.counselor_fte >= 1 && inputs.counselor_fte <= 10, 
              quantity: (inputs) => Math.min(inputs.counselor_fte, 10) }
          ],
          comment: 'One per each Benefits Counselor FTE authorized (Maximum 10)'
        },
        {
          id: 'SS218_VA_Clerical',
          name: 'Veterans Assistance Clerical Workstation',
          nsf: 56,
          rules: [
            { condition: (inputs) => inputs.counselor_fte >= 1 && inputs.counselor_fte <= 2, quantity: 1 },
            { condition: (inputs) => inputs.counselor_fte >= 3 && inputs.counselor_fte <= 4, quantity: 2 },
            { condition: (inputs) => inputs.counselor_fte >= 5 && inputs.counselor_fte <= 6, quantity: 3 },
            { condition: (inputs) => inputs.counselor_fte >= 7 && inputs.counselor_fte <= 8, quantity: 4 },
            { condition: (inputs) => inputs.counselor_fte >= 9 && inputs.counselor_fte <= 10, quantity: 5 }
          ]
        }
      ]
    },
    
    {
      name: 'FA2: Support Area',
      rooms: [
        {
          id: 'SB773',
          name: 'Veterans Assistance Storage Room',
          nsf: 80,
          rules: [
            { condition: (inputs) => inputs.counselor_fte >= 1 && inputs.counselor_fte <= 3, quantity: 1, nsf: 80 },
            { condition: (inputs) => inputs.counselor_fte >= 4 && inputs.counselor_fte <= 7, quantity: 1, nsf: 100 },
            { condition: (inputs) => inputs.counselor_fte >= 8 && inputs.counselor_fte <= 10, quantity: 1, nsf: 120 }
          ]
        }
      ]
    }
  ]
};
