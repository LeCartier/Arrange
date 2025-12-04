// Chapter 244: Lobby
// Based on VA PG-18-9 Space Planning Criteria

export const CHAPTER_244 = {
  chapter: '244',
  name: 'Lobby',
  description: 'Main medical center entrance lobby space',
  
  inputs: [
    {
      id: 'patient_beds',
      label: 'How many patient beds in total are projected for this facility?',
      type: 'number',
      min: 1,
      max: 500,
      defaultValue: 100
    }
  ],
  
  functionalAreas: [
    {
      name: 'FA1: Lobby Area',
      rooms: [
        {
          id: 'SB111',
          name: 'Lobby',
          nsf: 300,
          rules: [
            { condition: (inputs) => inputs.patient_beds >= 1 && inputs.patient_beds <= 100, quantity: 1, nsf: 300 },
            { condition: (inputs) => inputs.patient_beds >= 101 && inputs.patient_beds <= 200, quantity: 1, nsf: 400 },
            { condition: (inputs) => inputs.patient_beds >= 201 && inputs.patient_beds <= 300, quantity: 1, nsf: 500 },
            { condition: (inputs) => inputs.patient_beds >= 301 && inputs.patient_beds <= 400, quantity: 1, nsf: 600 },
            { condition: (inputs) => inputs.patient_beds >= 401 && inputs.patient_beds <= 500, quantity: 1, nsf: 700 }
          ],
          comment: 'Dignified, cordial atmosphere with reception, information, waiting, and public conveniences'
        },
        {
          id: 'SB131',
          name: 'Lobby Information Desk',
          nsf: 140,
          rules: [
            { condition: (inputs) => inputs.patient_beds >= 1 && inputs.patient_beds <= 200, quantity: 1, nsf: 140 },
            { condition: (inputs) => inputs.patient_beds >= 201 && inputs.patient_beds <= 400, quantity: 1, nsf: 180 },
            { condition: (inputs) => inputs.patient_beds >= 401 && inputs.patient_beds <= 500, quantity: 1, nsf: 220 }
          ],
          comment: 'Accommodates two Information FTEs and patient privacy area'
        },
        {
          id: 'SB851',
          name: 'Lobby Security Station',
          nsf: 160,
          rules: [
            { condition: (inputs) => inputs.patient_beds >= 1 && inputs.patient_beds <= 500, quantity: 1 }
          ],
          comment: 'Accommodates Security Scanner, Walk-thru Metal Detector, and circulation'
        },
        {
          id: 'SB191_Lobby',
          name: 'Lobby Visitor Toilet',
          nsf: 60,
          rules: [
            { condition: (inputs) => inputs.patient_beds >= 1 && inputs.patient_beds <= 500, quantity: 1 }
          ],
          comment: 'Accessible toilet, wall-hung lavatory, ABA clearances'
        },
        {
          id: 'SB136',
          name: 'Lobby Family Toilet',
          nsf: 80,
          rules: [
            { condition: (inputs) => inputs.patient_beds >= 1 && inputs.patient_beds <= 500, quantity: 1 }
          ]
        },
        {
          id: 'SB177',
          name: 'Lobby Female Multi-Stall Toilet',
          nsf: 235,
          rules: [
            { condition: (inputs) => inputs.patient_beds >= 1 && inputs.patient_beds <= 200, quantity: 1, nsf: 235 },
            { condition: (inputs) => inputs.patient_beds >= 201 && inputs.patient_beds <= 400, quantity: 1, nsf: 295 },
            { condition: (inputs) => inputs.patient_beds >= 401 && inputs.patient_beds <= 500, quantity: 1, nsf: 365 }
          ]
        },
        {
          id: 'SB183',
          name: 'Lobby Male Multi-Stall Toilet',
          nsf: 250,
          rules: [
            { condition: (inputs) => inputs.patient_beds >= 1 && inputs.patient_beds <= 200, quantity: 1, nsf: 250 },
            { condition: (inputs) => inputs.patient_beds >= 201 && inputs.patient_beds <= 400, quantity: 1, nsf: 310 },
            { condition: (inputs) => inputs.patient_beds >= 401 && inputs.patient_beds <= 500, quantity: 1, nsf: 380 }
          ]
        },
        {
          id: 'SB123',
          name: 'Lobby Water Fountain',
          nsf: 30,
          rules: [
            { condition: (inputs) => inputs.patient_beds >= 1 && inputs.patient_beds <= 500, quantity: 1 }
          ]
        },
        {
          id: 'SB093',
          name: 'Lobby Wheelchair Storage Room',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.patient_beds >= 1 && inputs.patient_beds <= 100, quantity: 1, nsf: 100 },
            { condition: (inputs) => inputs.patient_beds >= 101 && inputs.patient_beds <= 200, quantity: 1, nsf: 140 },
            { condition: (inputs) => inputs.patient_beds >= 201 && inputs.patient_beds <= 300, quantity: 1, nsf: 180 },
            { condition: (inputs) => inputs.patient_beds >= 301 && inputs.patient_beds <= 400, quantity: 1, nsf: 220 },
            { condition: (inputs) => inputs.patient_beds >= 401 && inputs.patient_beds <= 500, quantity: 1, nsf: 260 }
          ],
          comment: 'Easily accessible by staff and volunteers; visibility screened'
        },
        {
          id: 'SB121',
          name: 'Lobby Public Telephone Alcove',
          nsf: 30,
          rules: [
            { condition: (inputs) => inputs.patient_beds >= 1 && inputs.patient_beds <= 500, quantity: 1 }
          ]
        },
        {
          id: 'SS218_Lobby',
          name: 'Lobby Volunteer Workstation',
          nsf: 56,
          rules: [
            { condition: (inputs) => inputs.patient_beds >= 1 && inputs.patient_beds <= 300, quantity: 2 },
            { condition: (inputs) => inputs.patient_beds >= 301 && inputs.patient_beds <= 500, quantity: 3 }
          ],
          comment: 'Final staging area for volunteers; in addition to separate Volunteer Service Chapter space'
        }
      ]
    }
  ]
};
