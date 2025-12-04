// Chapter 106: Small House (SH) Model
// Based on VA PG-18-9 Space Planning Criteria

export const CHAPTER_106 = {
  chapter: '106',
  name: 'Small House (SH) Model',
  description: 'Residential environment for short or long term care of Veterans',
  
  inputs: [
    {
      id: 'houses_10',
      label: 'Number of 10-Resident Houses',
      type: 'number',
      min: 0,
      max: 12,
      defaultValue: 0
    },
    {
      id: 'houses_12',
      label: 'Number of 12-Resident Houses',
      type: 'number',
      min: 0,
      max: 10,
      defaultValue: 1
    },
    {
      id: 'houses_14',
      label: 'Number of 14-Resident Houses',
      type: 'number',
      min: 0,
      max: 9,
      defaultValue: 0
    },
    {
      id: 'community_center',
      label: 'Is a Community Center authorized?',
      type: 'boolean',
      defaultValue: false
    }
  ],
  
  functionalAreas: [
    {
      name: 'FA1: Calculation Area',
      rooms: [
        {
          id: 'SC147',
          name: 'Number of Neighborhood Centers',
          nsf: 0,
          rules: [
            { condition: (inputs) => {
              const totalHouses = inputs.houses_10 + inputs.houses_12 + inputs.houses_14;
              return totalHouses >= 3 && totalHouses <= 5;
            }, quantity: 1 },
            { condition: (inputs) => {
              const totalHouses = inputs.houses_10 + inputs.houses_12 + inputs.houses_14;
              return totalHouses >= 6 && totalHouses <= 8;
            }, quantity: 2 },
            { condition: (inputs) => {
              const totalHouses = inputs.houses_10 + inputs.houses_12 + inputs.houses_14;
              return totalHouses >= 9 && totalHouses <= 12;
            }, quantity: 3 }
          ]
        }
      ]
    },
    {
      name: 'FA2: House Reception Area',
      rooms: [
        {
          id: 'RSH01',
          name: 'House Front Porch',
          nsf: 0,
          rules: [
            { condition: (inputs) => (inputs.houses_10 + inputs.houses_12 + inputs.houses_14) >= 1, 
              quantity: (inputs) => inputs.houses_10 + inputs.houses_12 + inputs.houses_14 }
          ],
          comment: 'Outdoor space - connection to outdoors or anteroom from larger community'
        },
        {
          id: 'RSH02_10',
          name: '10-Resident House Vestibule',
          nsf: 140,
          rules: [
            { condition: (inputs) => inputs.houses_10 >= 1, quantity: (inputs) => inputs.houses_10 }
          ],
          comment: 'Weather barrier / transitional space from exterior to interior'
        },
        {
          id: 'RSH02_12',
          name: '12-Resident House Vestibule',
          nsf: 160,
          rules: [
            { condition: (inputs) => inputs.houses_12 >= 1, quantity: (inputs) => inputs.houses_12 }
          ],
          comment: 'Weather barrier / transitional space from exterior to interior'
        },
        {
          id: 'RSH02_14',
          name: '14-Resident House Vestibule',
          nsf: 180,
          rules: [
            { condition: (inputs) => inputs.houses_14 >= 1, quantity: (inputs) => inputs.houses_14 }
          ],
          comment: 'Weather barrier / transitional space from exterior to interior'
        },
        {
          id: 'RSH06',
          name: 'Foyer',
          nsf: 80,
          rules: [
            { condition: (inputs) => (inputs.houses_10 + inputs.houses_12 + inputs.houses_14) >= 1, 
              quantity: (inputs) => inputs.houses_10 + inputs.houses_12 + inputs.houses_14 }
          ],
          comment: 'Entry space at front door, main entrance to House'
        },
        {
          id: 'SB191_HOUSE',
          name: 'Visitor Toilet',
          nsf: 60,
          rules: [
            { condition: (inputs) => (inputs.houses_10 + inputs.houses_12 + inputs.houses_14) >= 1, 
              quantity: (inputs) => inputs.houses_10 + inputs.houses_12 + inputs.houses_14 }
          ]
        }
      ]
    },
    {
      name: 'FA3: House Resident Area',
      rooms: [
        {
          id: 'RSH11',
          name: 'House Resident Bedroom',
          nsf: 230,
          rules: [
            { condition: (inputs) => (inputs.houses_10 + inputs.houses_12 + inputs.houses_14) >= 1, 
              quantity: (inputs) => (inputs.houses_10 * 10) + (inputs.houses_12 * 12) + (inputs.houses_14 * 14) }
          ],
          comment: 'Sized for bariatric and special needs residents with mobility equipment clearances'
        },
        {
          id: 'SB201_BEDROOM',
          name: 'Resident Bedroom Toilet',
          nsf: 85,
          rules: [
            { condition: (results) => results.RSH11 > 0, quantity: (results) => results.RSH11 }
          ],
          comment: 'Equipped with walk-in shower, one per bedroom'
        },
        {
          id: 'RSH12',
          name: 'House Resident Closet',
          nsf: 8,
          rules: [
            { condition: (results) => results.RSH11 > 0, quantity: (results) => results.RSH11 }
          ]
        },
        {
          id: 'RSH16_10',
          name: '10-Resident House Sitting Alcove',
          nsf: 120,
          rules: [
            { condition: (inputs) => inputs.houses_10 >= 1, quantity: (inputs) => inputs.houses_10 * 3 }
          ],
          comment: 'Transitional social space between bedrooms and living/dining rooms'
        },
        {
          id: 'RSH16_12',
          name: '12-Resident House Sitting Alcove',
          nsf: 120,
          rules: [
            { condition: (inputs) => inputs.houses_12 >= 1, quantity: (inputs) => inputs.houses_12 * 4 }
          ],
          comment: 'Transitional social space between bedrooms and living/dining rooms'
        },
        {
          id: 'RSH16_14',
          name: '14-Resident House Sitting Alcove',
          nsf: 120,
          rules: [
            { condition: (inputs) => inputs.houses_14 >= 1, quantity: (inputs) => inputs.houses_14 * 5 }
          ],
          comment: 'Transitional social space between bedrooms and living/dining rooms'
        },
        {
          id: 'SC467_10',
          name: '10-Resident House Clean Linen Alcove',
          nsf: 15,
          rules: [
            { condition: (inputs) => inputs.houses_10 >= 1, quantity: (inputs) => inputs.houses_10 * 5 }
          ]
        },
        {
          id: 'SC467_12',
          name: '12-Resident House Clean Linen Alcove',
          nsf: 15,
          rules: [
            { condition: (inputs) => inputs.houses_12 >= 1, quantity: (inputs) => inputs.houses_12 * 6 }
          ]
        },
        {
          id: 'SC467_14',
          name: '14-Resident House Clean Linen Alcove',
          nsf: 15,
          rules: [
            { condition: (inputs) => inputs.houses_14 >= 1, quantity: (inputs) => inputs.houses_14 * 7 }
          ]
        },
        {
          id: 'SB158',
          name: 'Resident Bathing Room',
          nsf: 160,
          rules: [
            { condition: (inputs) => (inputs.houses_10 + inputs.houses_12 + inputs.houses_14) >= 1, 
              quantity: (inputs) => inputs.houses_10 + inputs.houses_12 + inputs.houses_14 }
          ],
          comment: 'Assisted bathing tub with adjacent toilet'
        },
        {
          id: 'SB201_HOUSE',
          name: 'Resident Toilet',
          nsf: 60,
          rules: [
            { condition: (inputs) => (inputs.houses_10 + inputs.houses_12 + inputs.houses_14) >= 1, 
              quantity: (inputs) => inputs.houses_10 + inputs.houses_12 + inputs.houses_14 }
          ]
        },
        {
          id: 'RSH21_10',
          name: '10-Resident House Living Room',
          nsf: 450,
          rules: [
            { condition: (inputs) => inputs.houses_10 >= 1, quantity: (inputs) => inputs.houses_10 }
          ]
        },
        {
          id: 'RSH21_12',
          name: '12-Resident House Living Room',
          nsf: 500,
          rules: [
            { condition: (inputs) => inputs.houses_12 >= 1, quantity: (inputs) => inputs.houses_12 }
          ]
        },
        {
          id: 'RSH21_14',
          name: '14-Resident House Living Room',
          nsf: 580,
          rules: [
            { condition: (inputs) => inputs.houses_14 >= 1, quantity: (inputs) => inputs.houses_14 }
          ]
        },
        {
          id: 'RSH26_10',
          name: '10-Resident House Resident Dining Room',
          nsf: 525,
          rules: [
            { condition: (inputs) => inputs.houses_10 >= 1, quantity: (inputs) => inputs.houses_10 }
          ]
        },
        {
          id: 'RSH26_12',
          name: '12-Resident House Resident Dining Room',
          nsf: 580,
          rules: [
            { condition: (inputs) => inputs.houses_12 >= 1, quantity: (inputs) => inputs.houses_12 }
          ]
        },
        {
          id: 'RSH26_14',
          name: '14-Resident House Resident Dining Room',
          nsf: 640,
          rules: [
            { condition: (inputs) => inputs.houses_14 >= 1, quantity: (inputs) => inputs.houses_14 }
          ]
        },
        {
          id: 'RSH31_10',
          name: '10-Resident House Resident Kitchen',
          nsf: 360,
          rules: [
            { condition: (inputs) => inputs.houses_10 >= 1, quantity: (inputs) => inputs.houses_10 }
          ],
          comment: 'Food preparation, storage, and staff work areas'
        },
        {
          id: 'RSH31_12',
          name: '12-Resident House Resident Kitchen',
          nsf: 400,
          rules: [
            { condition: (inputs) => inputs.houses_12 >= 1, quantity: (inputs) => inputs.houses_12 }
          ],
          comment: 'Food preparation, storage, and staff work areas'
        },
        {
          id: 'RSH31_14',
          name: '14-Resident House Resident Kitchen',
          nsf: 440,
          rules: [
            { condition: (inputs) => inputs.houses_14 >= 1, quantity: (inputs) => inputs.houses_14 }
          ],
          comment: 'Food preparation, storage, and staff work areas'
        },
        {
          id: 'RSH36_10_12',
          name: '10/12-Resident House Resident Pantry',
          nsf: 80,
          rules: [
            { condition: (inputs) => (inputs.houses_10 + inputs.houses_12) >= 1, 
              quantity: (inputs) => inputs.houses_10 + inputs.houses_12 }
          ],
          comment: 'Adjacent to Kitchen, near House receiving area'
        },
        {
          id: 'RSH36_14',
          name: '14-Resident House Resident Pantry',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.houses_14 >= 1, quantity: (inputs) => inputs.houses_14 }
          ],
          comment: 'Adjacent to Kitchen, near House receiving area'
        },
        {
          id: 'SC075_10_12',
          name: '10/12-Resident Kitchen Housekeeping Closet',
          nsf: 15,
          rules: [
            { condition: (inputs) => (inputs.houses_10 + inputs.houses_12) >= 1, 
              quantity: (inputs) => inputs.houses_10 + inputs.houses_12 }
          ],
          comment: 'Adjacent to Kitchen'
        },
        {
          id: 'SC075_14',
          name: '14-Resident Kitchen Housekeeping Closet',
          nsf: 20,
          rules: [
            { condition: (inputs) => inputs.houses_14 >= 1, quantity: (inputs) => inputs.houses_14 }
          ],
          comment: 'Adjacent to Kitchen'
        },
        {
          id: 'RSH38_10',
          name: '10-Resident House Den',
          nsf: 180,
          rules: [
            { condition: (inputs) => inputs.houses_10 >= 1, quantity: (inputs) => inputs.houses_10 }
          ],
          comment: 'Quiet activities, overnight visitors, family counseling, computer access, staff huddle'
        },
        {
          id: 'RSH38_12',
          name: '12-Resident House Den',
          nsf: 200,
          rules: [
            { condition: (inputs) => inputs.houses_12 >= 1, quantity: (inputs) => inputs.houses_12 }
          ],
          comment: 'Quiet activities, overnight visitors, family counseling, computer access, staff huddle'
        },
        {
          id: 'RSH38_14',
          name: '14-Resident House Den',
          nsf: 220,
          rules: [
            { condition: (inputs) => inputs.houses_14 >= 1, quantity: (inputs) => inputs.houses_14 }
          ],
          comment: 'Quiet activities, overnight visitors, family counseling, computer access, staff huddle'
        },
        {
          id: 'RSH41',
          name: 'House Resident Laundry Room',
          nsf: 140,
          rules: [
            { condition: (inputs) => (inputs.houses_10 + inputs.houses_12 + inputs.houses_14) >= 1, 
              quantity: (inputs) => inputs.houses_10 + inputs.houses_12 + inputs.houses_14 }
          ],
          comment: 'Two commercial washers, two dryers, laundry tub, folding area, detergent storage'
        },
        {
          id: 'RSH44',
          name: 'House Resident Balcony',
          nsf: 0,
          rules: [
            { condition: (inputs) => (inputs.houses_10 + inputs.houses_12 + inputs.houses_14) >= 1, 
              quantity: (inputs) => inputs.houses_10 + inputs.houses_12 + inputs.houses_14 }
          ],
          comment: 'Outdoor space'
        },
        {
          id: 'RSH45',
          name: 'House Resident Patio',
          nsf: 0,
          rules: [
            { condition: (inputs) => (inputs.houses_10 + inputs.houses_12 + inputs.houses_14) >= 1, 
              quantity: (inputs) => inputs.houses_10 + inputs.houses_12 + inputs.houses_14 }
          ],
          comment: 'Outdoor space'
        },
        {
          id: 'RSH46',
          name: 'House Resident Garden',
          nsf: 0,
          rules: [
            { condition: (inputs) => (inputs.houses_10 + inputs.houses_12 + inputs.houses_14) >= 1, 
              quantity: (inputs) => inputs.houses_10 + inputs.houses_12 + inputs.houses_14 }
          ],
          comment: 'Outdoor space'
        }
      ]
    },
    {
      name: 'FA4: House Support Area',
      rooms: [
        {
          id: 'SV583',
          name: 'Medication Room',
          nsf: 80,
          rules: [
            { condition: (inputs) => (inputs.houses_10 + inputs.houses_12 + inputs.houses_14) >= 1, 
              quantity: (inputs) => inputs.houses_10 + inputs.houses_12 + inputs.houses_14 }
          ],
          comment: 'Secure room for Pyxis, medication prep, cart storage; adjacent to Staff Office'
        },
        {
          id: 'SC052',
          name: 'Crash Cart Alcove',
          nsf: 20,
          rules: [
            { condition: (inputs) => (inputs.houses_10 + inputs.houses_12 + inputs.houses_14) >= 1, 
              quantity: (inputs) => inputs.houses_10 + inputs.houses_12 + inputs.houses_14 }
          ],
          comment: 'Near House Staff Office and/or Kitchen'
        },
        {
          id: 'SB737_10_12',
          name: '10/12-Resident House Clean Utility Room',
          nsf: 60,
          rules: [
            { condition: (inputs) => (inputs.houses_10 + inputs.houses_12) >= 1, 
              quantity: (inputs) => inputs.houses_10 + inputs.houses_12 }
          ],
          comment: 'Near off-stage support, particularly Garage or Receiving'
        },
        {
          id: 'SB737_14',
          name: '14-Resident House Clean Utility Room',
          nsf: 80,
          rules: [
            { condition: (inputs) => inputs.houses_14 >= 1, quantity: (inputs) => inputs.houses_14 }
          ],
          comment: 'Near off-stage support, particularly Garage or Receiving'
        },
        {
          id: 'SB743_10_12',
          name: '10/12-Resident House Soiled Utility Room',
          nsf: 80,
          rules: [
            { condition: (inputs) => (inputs.houses_10 + inputs.houses_12) >= 1, 
              quantity: (inputs) => inputs.houses_10 + inputs.houses_12 }
          ]
        },
        {
          id: 'SB743_14',
          name: '14-Resident House Soiled Utility Room',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.houses_14 >= 1, quantity: (inputs) => inputs.houses_14 }
          ]
        },
        {
          id: 'SC471_10_12',
          name: '10/12-Resident House Clean Linen Room',
          nsf: 60,
          rules: [
            { condition: (inputs) => (inputs.houses_10 + inputs.houses_12) >= 1, 
              quantity: (inputs) => inputs.houses_10 + inputs.houses_12 }
          ]
        },
        {
          id: 'SC471_14',
          name: '14-Resident House Clean Linen Room',
          nsf: 80,
          rules: [
            { condition: (inputs) => inputs.houses_14 >= 1, quantity: (inputs) => inputs.houses_14 }
          ]
        },
        {
          id: 'SB663_10',
          name: '10-Resident House General Storage Room',
          nsf: 200,
          rules: [
            { condition: (inputs) => inputs.houses_10 >= 1, quantity: (inputs) => inputs.houses_10 }
          ],
          comment: 'Home decorations, activity supplies, etc.'
        },
        {
          id: 'SB663_12',
          name: '12-Resident House General Storage Room',
          nsf: 220,
          rules: [
            { condition: (inputs) => inputs.houses_12 >= 1, quantity: (inputs) => inputs.houses_12 }
          ],
          comment: 'Home decorations, activity supplies, etc.'
        },
        {
          id: 'SB663_14',
          name: '14-Resident House General Storage Room',
          nsf: 240,
          rules: [
            { condition: (inputs) => inputs.houses_14 >= 1, quantity: (inputs) => inputs.houses_14 }
          ],
          comment: 'Home decorations, activity supplies, etc.'
        },
        {
          id: 'RSH51_10',
          name: '10-Resident House Specialty Storage Room',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.houses_10 >= 1, quantity: (inputs) => inputs.houses_10 }
          ],
          comment: 'Supplies and equipment for resident daily social activities'
        },
        {
          id: 'RSH51_12',
          name: '12-Resident House Specialty Storage Room',
          nsf: 120,
          rules: [
            { condition: (inputs) => inputs.houses_12 >= 1, quantity: (inputs) => inputs.houses_12 }
          ],
          comment: 'Supplies and equipment for resident daily social activities'
        },
        {
          id: 'RSH51_14',
          name: '14-Resident House Specialty Storage Room',
          nsf: 140,
          rules: [
            { condition: (inputs) => inputs.houses_14 >= 1, quantity: (inputs) => inputs.houses_14 }
          ],
          comment: 'Supplies and equipment for resident daily social activities'
        },
        {
          id: 'RSH54_10',
          name: '10-Resident House Equipment Storage Room',
          nsf: 120,
          rules: [
            { condition: (inputs) => inputs.houses_10 >= 1, quantity: (inputs) => inputs.houses_10 }
          ],
          comment: 'Portable lift, medical equipment, displaced bedroom furnishings'
        },
        {
          id: 'RSH54_12',
          name: '12-Resident House Equipment Storage Room',
          nsf: 140,
          rules: [
            { condition: (inputs) => inputs.houses_12 >= 1, quantity: (inputs) => inputs.houses_12 }
          ],
          comment: 'Portable lift, medical equipment, displaced bedroom furnishings'
        },
        {
          id: 'RSH54_14',
          name: '14-Resident House Equipment Storage Room',
          nsf: 160,
          rules: [
            { condition: (inputs) => inputs.houses_14 >= 1, quantity: (inputs) => inputs.houses_14 }
          ],
          comment: 'Portable lift, medical equipment, displaced bedroom furnishings'
        },
        {
          id: 'SB244',
          name: 'Housekeeping Aides Closet (HAC)',
          nsf: 60,
          rules: [
            { condition: (inputs) => (inputs.houses_10 + inputs.houses_12 + inputs.houses_14) >= 1, 
              quantity: (inputs) => inputs.houses_10 + inputs.houses_12 + inputs.houses_14 }
          ],
          comment: 'Near off-stage support areas and circulation'
        },
        {
          id: 'RSH57',
          name: 'House Garage / Receiving',
          nsf: 480,
          rules: [
            { condition: (inputs) => (inputs.houses_10 + inputs.houses_12 + inputs.houses_14) >= 1, 
              quantity: (inputs) => inputs.houses_10 + inputs.houses_12 + inputs.houses_14 }
          ],
          comment: 'Single car garage, loading/unloading and breakdown area'
        },
        {
          id: 'SB681_10_12',
          name: '10/12-Resident House Receiving / Breakdown Room',
          nsf: 100,
          rules: [
            { condition: (inputs) => (inputs.houses_10 + inputs.houses_12) >= 1, 
              quantity: (inputs) => inputs.houses_10 + inputs.houses_12 }
          ],
          comment: 'Temporary holding and break-down for incoming supplies'
        },
        {
          id: 'SB681_14',
          name: '14-Resident House Receiving / Breakdown Room',
          nsf: 120,
          rules: [
            { condition: (inputs) => inputs.houses_14 >= 1, quantity: (inputs) => inputs.houses_14 }
          ],
          comment: 'Temporary holding and break-down for incoming supplies'
        },
        {
          id: 'SB241',
          name: 'House Gas Manifold Room',
          nsf: 40,
          rules: [
            { condition: (inputs) => (inputs.houses_10 + inputs.houses_12 + inputs.houses_14) >= 1, 
              quantity: (inputs) => inputs.houses_10 + inputs.houses_12 + inputs.houses_14 }
          ],
          comment: 'Coordinate with mechanical equipment and piped gases location'
        }
      ]
    },
    {
      name: 'FA5: House Staff and Administrative Area',
      rooms: [
        {
          id: 'SS204',
          name: 'Staff Office',
          nsf: 100,
          rules: [
            { condition: (inputs) => (inputs.houses_10 + inputs.houses_12 + inputs.houses_14) >= 1, 
              quantity: (inputs) => inputs.houses_10 + inputs.houses_12 + inputs.houses_14 }
          ],
          comment: 'Nursing staff charting, records; adjacent to Kitchen with access to Foyer and Living/Dining'
        },
        {
          id: 'SS262_10',
          name: '10-Resident House Staff Breakroom',
          nsf: 160,
          rules: [
            { condition: (inputs) => inputs.houses_10 >= 1, quantity: (inputs) => inputs.houses_10 }
          ],
          comment: 'Off-stage break area for Staff'
        },
        {
          id: 'SS262_12',
          name: '12-Resident House Staff Breakroom',
          nsf: 180,
          rules: [
            { condition: (inputs) => inputs.houses_12 >= 1, quantity: (inputs) => inputs.houses_12 }
          ],
          comment: 'Off-stage break area for Staff'
        },
        {
          id: 'SS262_14',
          name: '14-Resident House Staff Breakroom',
          nsf: 200,
          rules: [
            { condition: (inputs) => inputs.houses_14 >= 1, quantity: (inputs) => inputs.houses_14 }
          ],
          comment: 'Off-stage break area for Staff'
        },
        {
          id: 'SS251',
          name: 'Staff Personal Property Locker Room',
          nsf: 80,
          rules: [
            { condition: (inputs) => (inputs.houses_10 + inputs.houses_12 + inputs.houses_14) >= 1, 
              quantity: (inputs) => inputs.houses_10 + inputs.houses_12 + inputs.houses_14 }
          ]
        },
        {
          id: 'SB202',
          name: 'Female Staff Toilet',
          nsf: 60,
          rules: [
            { condition: (inputs) => (inputs.houses_10 + inputs.houses_12 + inputs.houses_14) >= 1, 
              quantity: (inputs) => inputs.houses_10 + inputs.houses_12 + inputs.houses_14 }
          ]
        },
        {
          id: 'SB203',
          name: 'Male Staff Toilet',
          nsf: 60,
          rules: [
            { condition: (inputs) => (inputs.houses_10 + inputs.houses_12 + inputs.houses_14) >= 1, 
              quantity: (inputs) => inputs.houses_10 + inputs.houses_12 + inputs.houses_14 }
          ]
        }
      ]
    },
    {
      name: 'FA6: Neighborhood Center Reception Area',
      rooms: [
        {
          id: 'RSH61',
          name: 'Neighborhood Center Covered Entrance',
          nsf: 0,
          rules: [
            { condition: (results) => results.SC147 >= 1, quantity: (results) => results.SC147 }
          ],
          comment: 'Outdoor space'
        },
        {
          id: 'SB111',
          name: 'Neighborhood Center Lobby',
          nsf: 300,
          rules: [
            { condition: (results) => results.SC147 >= 1, quantity: (results) => results.SC147 }
          ]
        },
        {
          id: 'SB071_NC',
          name: 'Neighborhood Center Accessible Waiting',
          nsf: 220,
          rules: [
            { condition: (results) => results.SC147 >= 1, quantity: (results) => results.SC147 }
          ],
          comment: 'Accommodates 10 people (4 standard chairs, 1 bariatric chair, 5 accessible spaces)'
        },
        {
          id: 'SB051',
          name: 'Neighborhood Center Family Waiting',
          nsf: 125,
          rules: [
            { condition: (results) => results.SC147 >= 1, quantity: (results) => results.SC147 }
          ],
          comment: 'Accommodates 4 people (1 lounge chair, 1 2-seat sofa, 1 accessible space)'
        },
        {
          id: 'SB191_NC',
          name: 'Neighborhood Center Public Toilet',
          nsf: 60,
          rules: [
            { condition: (results) => results.SC147 >= 1, quantity: (results) => results.SC147 * 2 }
          ],
          comment: 'Near Multipurpose Activity Room'
        },
        {
          id: 'SB136',
          name: 'Neighborhood Center Family Toilet',
          nsf: 80,
          rules: [
            { condition: (results) => results.SC147 >= 1, quantity: (results) => results.SC147 }
          ],
          comment: 'Near Multipurpose Activity Room'
        }
      ]
    },
    {
      name: 'FA7: Neighborhood Center Resident Area',
      rooms: [
        {
          id: 'RSH62',
          name: 'Neighborhood Center Multipurpose Activity Room',
          nsf: 1100,
          rules: [
            { condition: (results) => results.SC147 >= 1, quantity: (results) => results.SC147 }
          ],
          comment: 'Large group activities: arts/crafts, bingo, games, fitness, sports viewing, training, religious activities'
        },
        {
          id: 'RSH66',
          name: 'Neighborhood Center Kitchenette',
          nsf: 140,
          rules: [
            { condition: (results) => results.SC147 >= 1, quantity: (results) => results.SC147 }
          ],
          comment: 'Adjacent to Multipurpose Activity Room'
        },
        {
          id: 'RSH68',
          name: 'Neighborhood Center Multipurpose / Activity Room Storage',
          nsf: 140,
          rules: [
            { condition: (results) => results.SC147 >= 1, quantity: (results) => results.SC147 }
          ],
          comment: 'Adjacent to Multipurpose Activity Room'
        },
        {
          id: 'RSH71',
          name: 'Neighborhood Center Snoezelen Sensory Therapy Room',
          nsf: 160,
          rules: [
            { condition: (results) => results.SC147 >= 1, quantity: (results) => results.SC147 }
          ],
          comment: 'High-stimuli therapeutic environment for residents with dementia'
        },
        {
          id: 'RSH73',
          name: 'Neighborhood Center Namaste Sensory Therapy Room',
          nsf: 160,
          rules: [
            { condition: (results) => results.SC147 >= 1, quantity: (results) => results.SC147 }
          ],
          comment: 'Soothing sounds, music, calming aromas similar to spa'
        },
        {
          id: 'SC052_NC',
          name: 'Neighborhood Center Crash Cart Alcove',
          nsf: 20,
          rules: [
            { condition: (results) => results.SC147 >= 1, quantity: (results) => results.SC147 }
          ],
          comment: 'Near Multipurpose Activity Room'
        }
      ]
    },
    {
      name: 'FA8: Neighborhood Center Support Area',
      rooms: [
        {
          id: 'SB682',
          name: 'Neighborhood Center Receiving / Breakdown Room',
          nsf: 280,
          rules: [
            { condition: (results) => results.SC147 >= 1, quantity: (results) => results.SC147 }
          ],
          comment: 'Adjacent to service entrance; receive/organize deliveries for distribution to Houses'
        },
        {
          id: 'SB743_NC',
          name: 'Neighborhood Center Soiled Utility Room',
          nsf: 140,
          rules: [
            { condition: (results) => results.SC147 >= 1, quantity: (results) => results.SC147 }
          ]
        },
        {
          id: 'SB663_NC',
          name: 'Neighborhood Center General Storage Room',
          nsf: 200,
          rules: [
            { condition: (results) => results.SC147 >= 1, quantity: (results) => results.SC147 }
          ]
        },
        {
          id: 'SC471_NC',
          name: 'Neighborhood Center Clean Linen Room',
          nsf: 120,
          rules: [
            { condition: (results) => results.SC147 >= 1, quantity: (results) => results.SC147 }
          ],
          comment: 'Central linen supply for all Houses; near Receiving/Breakdown Room'
        },
        {
          id: 'SC452',
          name: 'Neighborhood Center Soiled Linen Room',
          nsf: 120,
          rules: [
            { condition: (results) => results.SC147 >= 1, quantity: (results) => results.SC147 }
          ],
          comment: 'Central soiled linen collection; near Service Entrance'
        },
        {
          id: 'SB244_NC',
          name: 'Neighborhood Center Housekeeping Aides Closet (HAC)',
          nsf: 60,
          rules: [
            { condition: (results) => results.SC147 >= 1, quantity: (results) => results.SC147 }
          ],
          comment: 'Near off-stage support areas and circulation'
        },
        {
          id: 'SS101',
          name: 'Neighborhood Center Staff Conference Room',
          nsf: 300,
          rules: [
            { condition: (results) => results.SC147 >= 1, quantity: (results) => results.SC147 }
          ],
          comment: 'Accommodates 10 people for staff meetings and training'
        }
      ]
    },
    
    // FA9: Community Center Reception Area
    {
      name: 'FA9: Community Center Reception Area',
      rooms: [
        {
          id: 'RSH76',
          name: 'Community Center Covered Entrance',
          nsf: 0,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 1 }
          ]
        },
        {
          id: 'SB111_CC',
          name: 'Community Center Lobby',
          nsf: 420,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 1 }
          ],
          comment: 'Directly accessible from main entrance and Concierge Station'
        },
        {
          id: 'SB125',
          name: 'Community Center Concierge Station',
          nsf: 180,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 1 }
          ],
          comment: 'Adjacent to Lobby and Security Station; provides reception/support for Community Center'
        },
        {
          id: 'SB851',
          name: 'Community Center Security Station',
          nsf: 130,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 1 }
          ],
          comment: 'Near Lobby and adjacent to Concierge Station'
        },
        {
          id: 'SB071_CC',
          name: 'Community Center Accessible Waiting',
          nsf: 220,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 1 }
          ],
          comment: 'Accommodates 4 standard chairs, 1 bariatric chair, 5 accessible spaces; total 10 people'
        },
        {
          id: 'SB051_CC',
          name: 'Community Center Family Waiting',
          nsf: 125,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 1 }
          ],
          comment: 'Accommodates 1 lounge chair, 1 2-seat sofa, 1 accessible space; total 4 people'
        },
        {
          id: 'SC172_CC',
          name: 'Community Center Patient Education Workstation',
          nsf: 56,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 2 }
          ]
        },
        {
          id: 'SB191_CC_Public',
          name: 'Community Center Public Toilet',
          nsf: 60,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 2 }
          ],
          comment: 'Accessible toilet, wall-hung lavatory, ABA clearances'
        },
        {
          id: 'SB136',
          name: 'Community Center Family Toilet',
          nsf: 80,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 1 }
          ],
          comment: 'Accessible toilet, wall-hung lavatory, ABA clearances'
        },
        {
          id: 'SB262_CC',
          name: 'Community Center Patient Wheelchair Alcove',
          nsf: 30,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 2 }
          ]
        }
      ]
    },
    
    // FA10: Community Center Resident Area
    {
      name: 'FA10: Community Center Resident Area',
      rooms: [
        {
          id: 'SC271',
          name: 'Community Center Consult Room',
          nsf: 120,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 1 }
          ],
          comment: 'Near staff offices'
        },
        {
          id: 'RSH81',
          name: 'Community Center Exam Room',
          nsf: 125,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 1 }
          ]
        },
        {
          id: 'RSH83',
          name: 'Community Center PT/OT Exercise Gym',
          nsf: 500,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 1 }
          ],
          comment: 'Near Exam Room'
        },
        {
          id: 'RSH86',
          name: 'Community Center Great Room',
          nsf: 1400,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 1 }
          ],
          comment: 'Easily accessible through Lobby and from Neighborhood Centers'
        },
        {
          id: 'RSH91',
          name: 'Community Center Theater',
          nsf: 450,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 1 }
          ],
          comment: 'Dedicated space with projector, screen, sound system, and comfortable seating'
        },
        {
          id: 'SS183',
          name: 'Community Center Library',
          nsf: 300,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 1 }
          ],
          comment: 'Near Great Room; provides access for print and electronic media'
        },
        {
          id: 'RSH95',
          name: 'Community Center Hair Care Salon / Shop',
          nsf: 300,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 1 }
          ],
          comment: 'Hair care/barber stations, hair wash/dry, nail care for male and female residents'
        },
        {
          id: 'SV064',
          name: 'Community Center Chapel / Meditation Room',
          nsf: 300,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 1 }
          ],
          comment: 'Collocated with other resident spaces'
        },
        {
          id: 'SV614',
          name: 'Community Center Retail Store',
          nsf: 400,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 1 }
          ],
          comment: 'Near Lobby'
        },
        {
          id: 'SV698',
          name: 'Community Center Post Office',
          nsf: 400,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 1 }
          ],
          comment: 'Central mail collection/distribution; destination space for residents to socialize'
        },
        {
          id: 'SC052_CC',
          name: 'Community Center Crash Cart Alcove',
          nsf: 20,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 1 }
          ],
          comment: 'Near resident areas for easy access by staff'
        }
      ]
    },
    
    // FA11: Community Center Support Area
    {
      name: 'FA11: Community Center Support Area',
      rooms: [
        {
          id: 'SB680',
          name: 'Community Center Receiving / Loading',
          nsf: 500,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 1 }
          ],
          comment: 'Adjacent to service entrance/loading area'
        },
        {
          id: 'SB679',
          name: 'Community Center Hair Care Salon / Shop Storage Room',
          nsf: 60,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 1 }
          ],
          comment: 'Supplies and equipment to support Hair Care Salon/Shop'
        },
        {
          id: 'SB483',
          name: 'Community Center Maintenance Storage Room',
          nsf: 300,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 1 }
          ]
        },
        {
          id: 'SB244_CC',
          name: 'Community Center Housekeeping Aides Closet (HAC)',
          nsf: 60,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 1 }
          ]
        },
        {
          id: 'SB283',
          name: 'Community Center Trash Collection Room',
          nsf: 140,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 1 }
          ]
        }
      ]
    },
    
    // FA12: Community Center Staff and Administrative Area
    {
      name: 'FA12: Community Center Staff and Administrative Area',
      rooms: [
        {
          id: 'SS204_CC_Director',
          name: 'Community Center Director Office',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 1 }
          ]
        },
        {
          id: 'SS204_CC_Nurse',
          name: 'Community Center Nurse Leader Office',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 1 }
          ]
        },
        {
          id: 'SS204_CC_Medical',
          name: 'Community Center Medical Director Office',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 1 }
          ]
        },
        {
          id: 'SS204_CC_Social',
          name: 'Community Center Social Worker Office',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 1 }
          ]
        },
        {
          id: 'SS204_CC_Maint',
          name: 'Community Center Maintenance Office',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 1 }
          ]
        },
        {
          id: 'SS272',
          name: 'Community Center Copy / Supply Room',
          nsf: 80,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 1 }
          ]
        },
        {
          id: 'SC243',
          name: 'Community Center Team Room',
          nsf: 360,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 1 }
          ],
          comment: 'Accommodates 6 workstations'
        },
        {
          id: 'SS262',
          name: 'Community Center Staff Breakroom',
          nsf: 120,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 1 }
          ]
        },
        {
          id: 'SB191_CC_Staff',
          name: 'Community Center Staff Toilet',
          nsf: 60,
          rules: [
            { condition: (inputs) => inputs.community_center, quantity: 1 }
          ]
        }
      ]
    }
  ]
};
