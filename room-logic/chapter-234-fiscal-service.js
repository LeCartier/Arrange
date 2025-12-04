// Chapter 234: Fiscal Service
// Based on VA PG-18-9 Space Planning Criteria

export const CHAPTER_234 = {
  chapter: '234',
  name: 'Fiscal Service',
  description: "Financial activities including budgets, cost control, statistical reports, disbursements and receipts",
  
  inputs: [
    {
      id: 'facility_fte',
      label: 'How many total FTE positions are authorized for this facility?',
      type: 'number',
      min: 50,
      max: 4000,
      defaultValue: 500
    }
  ],
  
  functionalAreas: [
    {
      name: 'FA1: Reception Area',
      rooms: [
        {
          id: 'SB003_Fiscal',
          name: 'Fiscal Service Waiting',
          nsf: 110,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 1500, quantity: 1, nsf: 110 },
            { condition: (inputs) => inputs.facility_fte >= 1501 && inputs.facility_fte <= 3000, quantity: 1, nsf: 130 },
            { condition: (inputs) => inputs.facility_fte >= 3001 && inputs.facility_fte <= 4000, quantity: 1, nsf: 150 }
          ]
        },
        {
          id: 'SB191_Fiscal_Public',
          name: 'Fiscal Service Public Toilet',
          nsf: 60,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 1500, quantity: 1 },
            { condition: (inputs) => inputs.facility_fte >= 1501 && inputs.facility_fte <= 4000, quantity: 2 }
          ],
          comment: 'Accessible toilet, wall-hung lavatory, ABA clearances'
        }
      ]
    },
    
    {
      name: 'FA2: Staff and Administrative Area',
      rooms: [
        {
          id: 'SS204_Fiscal_Chief',
          name: 'Fiscal Service Chief Office',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 4000, quantity: 1 }
          ],
          comment: 'Provide access through Receptionist/Secretary for control of visitors and confidentiality'
        },
        {
          id: 'SS204_Fiscal_AsstChief',
          name: 'Fiscal Service Assistant Chief Office',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 4000, quantity: 1 }
          ]
        },
        {
          id: 'SS221',
          name: 'Fiscal Service Reception / Information Desk',
          nsf: 85,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 4000, quantity: 1 }
          ],
          comment: 'Accommodates one Receptionist FTE, patient privacy area, and circulation'
        },
        {
          id: 'SS218_Fiscal_AdminSupport',
          name: 'Fiscal Service Administrative Support Workstation',
          nsf: 56,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 2000, quantity: 2 },
            { condition: (inputs) => inputs.facility_fte >= 2001 && inputs.facility_fte <= 4000, quantity: 4 }
          ]
        },
        {
          id: 'SS218_Fiscal_Budget',
          name: 'Fiscal Service Budget Analyst Workstation',
          nsf: 56,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 1000, quantity: 1 },
            { condition: (inputs) => inputs.facility_fte >= 1001 && inputs.facility_fte <= 2000, quantity: 2 },
            { condition: (inputs) => inputs.facility_fte >= 2001 && inputs.facility_fte <= 3000, quantity: 3 },
            { condition: (inputs) => inputs.facility_fte >= 3001 && inputs.facility_fte <= 4000, quantity: 4 }
          ]
        },
        {
          id: 'SS204_Fiscal_Auditor',
          name: 'Fiscal Service Auditor Office',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 1000, quantity: 1 },
            { condition: (inputs) => inputs.facility_fte >= 1001 && inputs.facility_fte <= 2000, quantity: 2 },
            { condition: (inputs) => inputs.facility_fte >= 2001 && inputs.facility_fte <= 3000, quantity: 3 },
            { condition: (inputs) => inputs.facility_fte >= 3001 && inputs.facility_fte <= 4000, quantity: 4 }
          ]
        },
        {
          id: 'SS204_Fiscal_AcctChief',
          name: 'Fiscal Service Accounting Chief Office',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 4000, quantity: 1 }
          ]
        },
        {
          id: 'SS218_Fiscal_Clerical',
          name: 'Fiscal Service Clerical / Technical Staff Workstation',
          nsf: 56,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 500, quantity: 3 },
            { condition: (inputs) => inputs.facility_fte >= 501 && inputs.facility_fte <= 1000, quantity: 4 },
            { condition: (inputs) => inputs.facility_fte >= 1001 && inputs.facility_fte <= 1500, quantity: 5 },
            { condition: (inputs) => inputs.facility_fte >= 1501 && inputs.facility_fte <= 2000, quantity: 6 },
            { condition: (inputs) => inputs.facility_fte >= 2001 && inputs.facility_fte <= 2500, quantity: 7 },
            { condition: (inputs) => inputs.facility_fte >= 2501 && inputs.facility_fte <= 3000, quantity: 8 },
            { condition: (inputs) => inputs.facility_fte >= 3001 && inputs.facility_fte <= 3500, quantity: 9 },
            { condition: (inputs) => inputs.facility_fte >= 3501 && inputs.facility_fte <= 4000, quantity: 10 }
          ]
        },
        {
          id: 'SS218_Fiscal_Travel',
          name: 'Fiscal Service Travel Clerk Workstation',
          nsf: 56,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 1000, quantity: 2 },
            { condition: (inputs) => inputs.facility_fte >= 1001 && inputs.facility_fte <= 2000, quantity: 3 },
            { condition: (inputs) => inputs.facility_fte >= 2001 && inputs.facility_fte <= 4000, quantity: 4 }
          ],
          comment: 'Responsible for beneficiary and employee travel; making arrangements, cash reimbursements'
        },
        {
          id: 'SS218_Fiscal_PatientFunds',
          name: 'Fiscal Service Patient Funds Clerk Workstation',
          nsf: 56,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 500, quantity: 2 },
            { condition: (inputs) => inputs.facility_fte >= 501 && inputs.facility_fte <= 1000, quantity: 3 },
            { condition: (inputs) => inputs.facility_fte >= 1001 && inputs.facility_fte <= 1500, quantity: 4 },
            { condition: (inputs) => inputs.facility_fte >= 1501 && inputs.facility_fte <= 2000, quantity: 5 },
            { condition: (inputs) => inputs.facility_fte >= 2001 && inputs.facility_fte <= 2500, quantity: 6 },
            { condition: (inputs) => inputs.facility_fte >= 2501 && inputs.facility_fte <= 3000, quantity: 7 },
            { condition: (inputs) => inputs.facility_fte >= 3001 && inputs.facility_fte <= 3500, quantity: 8 },
            { condition: (inputs) => inputs.facility_fte >= 3501 && inputs.facility_fte <= 4000, quantity: 9 }
          ],
          comment: 'Keeps records on patient funds/transactions; eligibility for indigent services; commitment records'
        },
        {
          id: 'SS201',
          name: 'Fiscal Service Agent Cashier Office',
          nsf: 120,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 2000, quantity: 1 },
            { condition: (inputs) => inputs.facility_fte >= 2001 && inputs.facility_fte <= 4000, quantity: 2 }
          ],
          comment: 'Space for approved cash transactions; should be adjacent to travel clerks office'
        },
        {
          id: 'SB191_Fiscal_Staff',
          name: 'Fiscal Service Staff Toilet',
          nsf: 60,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 1500, quantity: 1 },
            { condition: (inputs) => inputs.facility_fte >= 1501 && inputs.facility_fte <= 3000, quantity: 2 },
            { condition: (inputs) => inputs.facility_fte >= 3001 && inputs.facility_fte <= 4000, quantity: 3 }
          ],
          comment: 'Accessible toilet, wall-hung lavatory, ABA clearances'
        }
      ]
    },
    
    {
      name: 'FA3: Support Area',
      rooms: [
        {
          id: 'SS291_Fiscal',
          name: 'Fiscal Service Fiscal Conference Room',
          nsf: 240,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 1500, quantity: 1, nsf: 240 },
            { condition: (inputs) => inputs.facility_fte >= 1501 && inputs.facility_fte <= 3000, quantity: 1, nsf: 300 },
            { condition: (inputs) => inputs.facility_fte >= 3001 && inputs.facility_fte <= 4000, quantity: 1, nsf: 500 }
          ],
          comment: 'Accommodates active file storage, office machines, worktables etc.'
        },
        {
          id: 'SS268_Fiscal',
          name: 'Fiscal Service Copy / Supply Alcove',
          nsf: 40,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 1500, quantity: 1 }
          ]
        },
        {
          id: 'SS272_Fiscal',
          name: 'Fiscal Service Copy / Supply Room',
          nsf: 80,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 1501 && inputs.facility_fte <= 3000, quantity: 1, nsf: 80 },
            { condition: (inputs) => inputs.facility_fte >= 3001 && inputs.facility_fte <= 4000, quantity: 1, nsf: 100 }
          ]
        },
        {
          id: 'SS261_Fiscal',
          name: 'Fiscal Service Kitchenette',
          nsf: 80,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 1501 && inputs.facility_fte <= 4000, quantity: 1 }
          ]
        },
        {
          id: 'SB707',
          name: 'Fiscal Service Storage Room',
          nsf: 80,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 1500, quantity: 1, nsf: 80 },
            { condition: (inputs) => inputs.facility_fte >= 1501 && inputs.facility_fte <= 3000, quantity: 1, nsf: 100 },
            { condition: (inputs) => inputs.facility_fte >= 3001 && inputs.facility_fte <= 4000, quantity: 1, nsf: 120 }
          ]
        }
      ]
    }
  ]
};
