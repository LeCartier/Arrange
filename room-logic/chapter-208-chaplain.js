// Chapter 208: Chaplain Service
// Based on VA PG-18-9 Space Planning Criteria

export const CHAPTER_208 = {
  chapter: '208',
  name: 'Chaplain Service',
  description: 'Spiritual and religious support services for veterans',
  
  inputs: [
    {
      id: 'people_attending',
      label: 'How many people are projected to attend religious services?',
      type: 'number',
      min: 5,
      max: 60,
      defaultValue: 25
    },
    {
      id: 'chaplain_fte',
      label: 'How many Chaplain FTE positions are authorized?',
      type: 'number',
      min: 2,
      max: 20,
      defaultValue: 4
    },
    {
      id: 'student_fte',
      label: 'How many Chaplain Student FTE positions are authorized?',
      type: 'number',
      min: 0,
      max: 8,
      defaultValue: 0
    }
  ],
  
  functionalAreas: [
    {
      name: 'FA1: Pre-Assembly Area',
      rooms: [
        {
          id: 'SB003_Chap',
          name: 'Chaplain Service Waiting',
          nsf: 80,
          rules: [
            { condition: (inputs) => inputs.people_attending >= 5 && inputs.people_attending <= 60, quantity: 1 }
          ],
          comment: 'Accommodates 1 standard chair, 1 bariatric chair, 1 accessible space; total 3 people'
        },
        {
          id: 'SV032',
          name: 'Chaplain Service Vestibule',
          nsf: 60,
          rules: [
            { condition: (inputs) => inputs.people_attending >= 5 && inputs.people_attending <= 60, quantity: 1 }
          ]
        },
        {
          id: 'SV036',
          name: 'Chaplain Service Meditation Room',
          nsf: 80,
          rules: [
            { condition: (inputs) => inputs.people_attending >= 5 && inputs.people_attending <= 60, quantity: 1 }
          ],
          comment: 'Quiet space for private meditation and reflection'
        },
        {
          id: 'SB191_Chap',
          name: 'Chaplain Service Public Toilet',
          nsf: 60,
          rules: [
            { condition: (inputs) => inputs.people_attending >= 5 && inputs.people_attending <= 60, quantity: 2 }
          ],
          comment: 'Accessible toilet, wall-hung lavatory, ABA clearances'
        }
      ]
    },
    
    {
      name: 'FA2: Worship Area',
      rooms: [
        {
          id: 'SV061',
          name: 'Multi-Denominational Service Room',
          nsf: 160,
          rules: [
            { condition: (inputs) => inputs.people_attending >= 5 && inputs.people_attending <= 20, quantity: 1, nsf: 160 },
            { condition: (inputs) => inputs.people_attending >= 21 && inputs.people_attending <= 30, quantity: 1, nsf: 240 },
            { condition: (inputs) => inputs.people_attending >= 31 && inputs.people_attending <= 40, quantity: 1, nsf: 320 },
            { condition: (inputs) => inputs.people_attending >= 41 && inputs.people_attending <= 50, quantity: 1, nsf: 400 },
            { condition: (inputs) => inputs.people_attending >= 51 && inputs.people_attending <= 60, quantity: 1, nsf: 480 }
          ],
          comment: 'Main worship space; size varies with projected attendance'
        },
        {
          id: 'SV072',
          name: 'Chaplain Service Sacristy',
          nsf: 60,
          rules: [
            { condition: (inputs) => inputs.people_attending >= 5 && inputs.people_attending <= 60, quantity: 1 }
          ],
          comment: 'Storage for vestments, religious articles, and supplies'
        },
        {
          id: 'SV062',
          name: 'Chaplain Service Denominational Service Room',
          nsf: 80,
          rules: [
            { condition: (inputs) => inputs.people_attending >= 5 && inputs.people_attending <= 60, quantity: 2 }
          ],
          comment: 'Smaller rooms for specific denominational services'
        },
        {
          id: 'SV065',
          name: 'Chaplain Service Reconciliation Room',
          nsf: 60,
          rules: [
            { condition: (inputs) => inputs.people_attending >= 5 && inputs.people_attending <= 60, quantity: 1 }
          ],
          comment: 'Private space for counseling and confession'
        },
        {
          id: 'SV075',
          name: 'Chaplain Service Music Room',
          nsf: 120,
          rules: [
            { condition: (inputs) => inputs.people_attending >= 21 && inputs.people_attending <= 60, quantity: 1 }
          ],
          comment: 'Space for choir, instruments, and music storage'
        }
      ]
    },
    
    {
      name: 'FA3: Staff and Administrative Area',
      rooms: [
        {
          id: 'SS204_Chap_Chief',
          name: 'Chaplain Service Chief Office',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.chaplain_fte >= 2 && inputs.chaplain_fte <= 20, quantity: 1 }
          ]
        },
        {
          id: 'SS204_Chap',
          name: 'Chaplain Office',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.chaplain_fte >= 2 && inputs.chaplain_fte <= 3, quantity: 1 },
            { condition: (inputs) => inputs.chaplain_fte >= 4 && inputs.chaplain_fte <= 6, quantity: 2 },
            { condition: (inputs) => inputs.chaplain_fte >= 7 && inputs.chaplain_fte <= 10, quantity: 4 },
            { condition: (inputs) => inputs.chaplain_fte >= 11 && inputs.chaplain_fte <= 15, quantity: 6 },
            { condition: (inputs) => inputs.chaplain_fte >= 16 && inputs.chaplain_fte <= 20, quantity: 8 }
          ],
          comment: 'Private offices for chaplains; quantity based on FTE positions'
        },
        {
          id: 'SS218_Chap',
          name: 'Chaplain Service Administrative Workstation',
          nsf: 56,
          rules: [
            { condition: (inputs) => inputs.chaplain_fte >= 2 && inputs.chaplain_fte <= 20, quantity: 1 }
          ]
        },
        {
          id: 'SS101_Chap',
          name: 'Chaplain Service Conference Room',
          nsf: 240,
          rules: [
            { condition: (inputs) => inputs.chaplain_fte >= 2 && inputs.chaplain_fte <= 20, quantity: 1 }
          ],
          comment: 'For staff meetings and training'
        },
        {
          id: 'SS268_Chap',
          name: 'Chaplain Service Copy / Supply Alcove',
          nsf: 40,
          rules: [
            { condition: (inputs) => inputs.chaplain_fte >= 2 && inputs.chaplain_fte <= 20, quantity: 1 }
          ]
        }
      ]
    },
    
    {
      name: 'FA4: Support Area',
      rooms: [
        {
          id: 'SB679_Chap',
          name: 'Chaplain Service Storage Room',
          nsf: 120,
          rules: [
            { condition: (inputs) => inputs.chaplain_fte >= 2 && inputs.chaplain_fte <= 20, quantity: 1 }
          ]
        },
        {
          id: 'SB191_Chap_Staff',
          name: 'Chaplain Service Staff Toilet',
          nsf: 60,
          rules: [
            { condition: (inputs) => inputs.chaplain_fte >= 2 && inputs.chaplain_fte <= 20, quantity: 1 }
          ],
          comment: 'Accessible toilet, wall-hung lavatory, ABA clearances'
        }
      ]
    },
    
    {
      name: 'FA5: Education Area',
      rooms: [
        {
          id: 'SS217_Chap',
          name: 'Chaplain Student Workstation',
          nsf: 48,
          rules: [
            { condition: (inputs) => inputs.student_fte >= 1 && inputs.student_fte <= 2, quantity: 1 },
            { condition: (inputs) => inputs.student_fte >= 3 && inputs.student_fte <= 4, quantity: 2 },
            { condition: (inputs) => inputs.student_fte >= 5 && inputs.student_fte <= 8, quantity: 3 }
          ],
          comment: 'Workstations for chaplain students/interns'
        },
        {
          id: 'SS111_Chap',
          name: 'Chaplain Service Training Room',
          nsf: 240,
          rules: [
            { condition: (inputs) => inputs.student_fte >= 4 && inputs.student_fte <= 8, quantity: 1 }
          ],
          comment: 'Training space for chaplain education program'
        }
      ]
    }
  ]
};
