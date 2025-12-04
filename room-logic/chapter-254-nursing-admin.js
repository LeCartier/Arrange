// Chapter 254: Nursing Service Administration
// Based on VA PG-18-9 Space Planning Criteria

export const CHAPTER_254 = {
  chapter: '254',
  name: 'Nursing Service Administration',
  description: 'Administrative areas for nursing service leadership and education',
  
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
          id: 'SS222_Nrsng',
          name: 'Nursing Service Administration Waiting',
          nsf: 80,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 2000, quantity: 1, nsf: 80 },
            { condition: (inputs) => inputs.facility_fte >= 2001 && inputs.facility_fte <= 4000, quantity: 1, nsf: 100 }
          ],
          comment: 'Accommodates 1 standard chair, 1 bariatric chair, 1 accessible space; total 3 people'
        },
        {
          id: 'SS221_Nrsng',
          name: 'Nursing Service Administration Reception',
          nsf: 56,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 2000, quantity: 1 },
            { condition: (inputs) => inputs.facility_fte >= 2001 && inputs.facility_fte <= 4000, quantity: 2 }
          ],
          comment: 'Accommodates one Receptionist FTE, patient privacy area, and circulation'
        },
        {
          id: 'SB191_Nrsng_Visitor',
          name: 'Nursing Service Administration Visitor Toilet',
          nsf: 60,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 4000, quantity: 1 }
          ],
          comment: 'Accessible toilet, wall-hung lavatory, ABA clearances'
        }
      ]
    },
    
    {
      name: 'FA2: Staff and Administrative Area',
      rooms: [
        {
          id: 'SS207_Nrsng',
          name: 'Nursing Service Administration Executive Chief Office',
          nsf: 150,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 4000, quantity: 1 }
          ]
        },
        {
          id: 'SS222_Nrsng_Exec',
          name: 'Nursing Service Administration Executive Waiting',
          nsf: 80,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 4000, quantity: 1 }
          ],
          comment: 'Accommodates 1 standard chair, 1 bariatric chair, 1 accessible space; total 3 people'
        },
        {
          id: 'SS218_Nrsng_Admin',
          name: 'Nursing Service Administration Administration Support Workstation',
          nsf: 56,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 2000, quantity: 1 },
            { condition: (inputs) => inputs.facility_fte >= 2001 && inputs.facility_fte <= 4000, quantity: 2 }
          ]
        },
        {
          id: 'SS204_Nrsng_AsstChief',
          name: 'Nursing Service Administration Assistant Chief Office',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 2000, quantity: 1 },
            { condition: (inputs) => inputs.facility_fte >= 2001 && inputs.facility_fte <= 4000, quantity: 2 }
          ]
        },
        {
          id: 'SS204_Nrsng_ClinSup',
          name: 'Nursing Service Administration Clinical Services Supervisor Office',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 2000, quantity: 1 },
            { condition: (inputs) => inputs.facility_fte >= 2001 && inputs.facility_fte <= 3000, quantity: 2 },
            { condition: (inputs) => inputs.facility_fte >= 3001 && inputs.facility_fte <= 4000, quantity: 4 }
          ]
        },
        {
          id: 'SS204_Nrsng_AO',
          name: 'Nursing Service Administration Administrative Officer (AO) Office',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 4000, quantity: 1 }
          ]
        },
        {
          id: 'SS101_Nrsng',
          name: 'Nursing Service Administration Staff Conference Room',
          nsf: 240,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 2000, quantity: 1, nsf: 240 },
            { condition: (inputs) => inputs.facility_fte >= 2001 && inputs.facility_fte <= 4000, quantity: 1, nsf: 300 }
          ],
          comment: 'Accommodates 6 conference chairs, two 5x2 tables, credenza; total 6 people'
        },
        {
          id: 'SS218_Nrsng_Clerical',
          name: 'Nursing Service Administration Clerical Workstation',
          nsf: 56,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 1000, quantity: 1 },
            { condition: (inputs) => inputs.facility_fte >= 1001 && inputs.facility_fte <= 2000, quantity: 2 },
            { condition: (inputs) => inputs.facility_fte >= 2001 && inputs.facility_fte <= 3000, quantity: 3 },
            { condition: (inputs) => inputs.facility_fte >= 3001 && inputs.facility_fte <= 4000, quantity: 4 }
          ]
        },
        {
          id: 'SS262_Nrsng',
          name: 'Nursing Service Administration Staff Breakroom',
          nsf: 120,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 1000, quantity: 1, nsf: 120 },
            { condition: (inputs) => inputs.facility_fte >= 1001 && inputs.facility_fte <= 2000, quantity: 1, nsf: 140 },
            { condition: (inputs) => inputs.facility_fte >= 2001 && inputs.facility_fte <= 3000, quantity: 1, nsf: 160 },
            { condition: (inputs) => inputs.facility_fte >= 3001 && inputs.facility_fte <= 4000, quantity: 1, nsf: 180 }
          ]
        },
        {
          id: 'SS282_Nrsng',
          name: 'Nursing Service Administration Staff Locker Room',
          nsf: 80,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 1000, quantity: 1, nsf: 80 },
            { condition: (inputs) => inputs.facility_fte >= 1001 && inputs.facility_fte <= 2000, quantity: 1, nsf: 100 },
            { condition: (inputs) => inputs.facility_fte >= 2001 && inputs.facility_fte <= 3000, quantity: 1, nsf: 120 },
            { condition: (inputs) => inputs.facility_fte >= 3001 && inputs.facility_fte <= 4000, quantity: 1, nsf: 140 }
          ],
          comment: 'Locker space only for FTEs without assigned office or workspace'
        },
        {
          id: 'SB191_Nrsng_Staff',
          name: 'Nursing Service Administration Staff Toilet',
          nsf: 60,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 2000, quantity: 1 },
            { condition: (inputs) => inputs.facility_fte >= 2001 && inputs.facility_fte <= 4000, quantity: 2 }
          ],
          comment: 'Accessible toilet, wall-hung lavatory, ABA clearances'
        }
      ]
    },
    
    {
      name: 'FA3: Education Area',
      rooms: [
        {
          id: 'SS204_Nrsng_EduChief',
          name: 'Nursing Service Administration Education Associate Chief Office',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 4000, quantity: 1 }
          ]
        },
        {
          id: 'SS222_Nrsng_Edu',
          name: 'Nursing Service Administration Waiting',
          nsf: 80,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 4000, quantity: 1 }
          ],
          comment: 'Accommodates 1 standard chair, 1 bariatric chair, 1 accessible space; total 3 people'
        },
        {
          id: 'SS218_Nrsng_EduAdmin',
          name: 'Nursing Service Administration Administrative Support Workstation',
          nsf: 56,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 4000, quantity: 1 }
          ]
        },
        {
          id: 'SS218_Nrsng_Instructor',
          name: 'Nursing Service Administration Instructor Workstation',
          nsf: 56,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 2000, quantity: 1 },
            { condition: (inputs) => inputs.facility_fte >= 2001 && inputs.facility_fte <= 4000, quantity: 2 }
          ]
        },
        {
          id: 'SS217_Nrsng',
          name: 'Nursing Service Administration Resident Workstation',
          nsf: 48,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 2000, quantity: 1 },
            { condition: (inputs) => inputs.facility_fte >= 2001 && inputs.facility_fte <= 4000, quantity: 2 }
          ],
          comment: 'Intern / Student workstation'
        },
        {
          id: 'SS111_Nrsng',
          name: 'Nursing Service Administration Staff Training Room',
          nsf: 545,
          rules: [
            { condition: (inputs) => inputs.facility_fte >= 50 && inputs.facility_fte <= 1000, quantity: 1, nsf: 545 },
            { condition: (inputs) => inputs.facility_fte >= 1001 && inputs.facility_fte <= 2000, quantity: 1, nsf: 590 },
            { condition: (inputs) => inputs.facility_fte >= 2001 && inputs.facility_fte <= 3000, quantity: 1, nsf: 630 },
            { condition: (inputs) => inputs.facility_fte >= 3001 && inputs.facility_fte <= 4000, quantity: 1, nsf: 675 }
          ],
          comment: 'For CPR training, mandatory classes (fire/safety, patient abuse, assaultive behavior)'
        }
      ]
    }
  ]
};
