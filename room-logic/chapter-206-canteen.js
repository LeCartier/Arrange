/**
 * Chapter 206: Veterans Canteen Service (VCS)
 * Last Updated: March 1, 2022
 * NTDG Factor: 1.20
 * 
 * VCS provides retail, food service, and personal services to enhance the comfort
 * and well-being of Veterans, employees, volunteers, and visitors.
 */

export const CHAPTER_206 = {
  chapter: '206',
  name: 'Veterans Canteen Service (VCS)',
  
  inputs: [
    {
      id: 'fte_positions',
      label: 'How many FTE positions in total are authorized for this facility?',
      type: 'number',
      min: 100,
      max: 5000,
      defaultValue: 500
    }
  ],
  
  functionalAreas: [
    {
      name: 'FA1: Coffee Shop Area',
      rooms: [
        {
          id: 'SV626',
          name: 'Coffee Shop, VC Svc',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 500, quantity: 1, nsf: 100 },
            { condition: (inputs) => inputs.fte_positions >= 501 && inputs.fte_positions <= 1000, quantity: 1, nsf: 200 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 1500, quantity: 1, nsf: 300 },
            { condition: (inputs) => inputs.fte_positions >= 1501 && inputs.fte_positions <= 2000, quantity: 1, nsf: 400 },
            { condition: (inputs) => inputs.fte_positions >= 2001 && inputs.fte_positions <= 2500, quantity: 1, nsf: 500 },
            { condition: (inputs) => inputs.fte_positions >= 2501 && inputs.fte_positions <= 3000, quantity: 1, nsf: 600 },
            { condition: (inputs) => inputs.fte_positions >= 3001 && inputs.fte_positions <= 3500, quantity: 1, nsf: 700 },
            { condition: (inputs) => inputs.fte_positions >= 3501 && inputs.fte_positions <= 4000, quantity: 1, nsf: 800 },
            { condition: (inputs) => inputs.fte_positions >= 4001 && inputs.fte_positions <= 4500, quantity: 1, nsf: 900 },
            { condition: (inputs) => inputs.fte_positions >= 4501 && inputs.fte_positions <= 5000, quantity: 1, nsf: 1000 }
          ]
        },
        {
          id: 'SV627',
          name: 'Coffee Shop Storage Room, VC Svc',
          nsf: 30,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 500, quantity: 1, nsf: 30 },
            { condition: (inputs) => inputs.fte_positions >= 501 && inputs.fte_positions <= 1000, quantity: 1, nsf: 60 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 1500, quantity: 1, nsf: 90 },
            { condition: (inputs) => inputs.fte_positions >= 1501 && inputs.fte_positions <= 2000, quantity: 1, nsf: 120 },
            { condition: (inputs) => inputs.fte_positions >= 2001 && inputs.fte_positions <= 2500, quantity: 1, nsf: 150 },
            { condition: (inputs) => inputs.fte_positions >= 2501 && inputs.fte_positions <= 3000, quantity: 1, nsf: 180 },
            { condition: (inputs) => inputs.fte_positions >= 3001 && inputs.fte_positions <= 3500, quantity: 1, nsf: 210 },
            { condition: (inputs) => inputs.fte_positions >= 3501 && inputs.fte_positions <= 4000, quantity: 1, nsf: 240 },
            { condition: (inputs) => inputs.fte_positions >= 4001 && inputs.fte_positions <= 4500, quantity: 1, nsf: 270 },
            { condition: (inputs) => inputs.fte_positions >= 4501 && inputs.fte_positions <= 5000, quantity: 1, nsf: 300 }
          ],
          comment: 'Storage for food and supplies to replenish only once daily'
        },
        {
          id: 'SV628',
          name: 'Coffee Shop Seating Area, VC Svc',
          nsf: 40,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 500, quantity: 1, nsf: 40 },
            { condition: (inputs) => inputs.fte_positions >= 501 && inputs.fte_positions <= 1000, quantity: 1, nsf: 80 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 1500, quantity: 1, nsf: 120 },
            { condition: (inputs) => inputs.fte_positions >= 1501 && inputs.fte_positions <= 2000, quantity: 1, nsf: 160 },
            { condition: (inputs) => inputs.fte_positions >= 2001 && inputs.fte_positions <= 2500, quantity: 1, nsf: 200 },
            { condition: (inputs) => inputs.fte_positions >= 2501 && inputs.fte_positions <= 3000, quantity: 1, nsf: 240 },
            { condition: (inputs) => inputs.fte_positions >= 3001 && inputs.fte_positions <= 3500, quantity: 1, nsf: 280 },
            { condition: (inputs) => inputs.fte_positions >= 3501 && inputs.fte_positions <= 4000, quantity: 1, nsf: 320 },
            { condition: (inputs) => inputs.fte_positions >= 4001 && inputs.fte_positions <= 4500, quantity: 1, nsf: 360 },
            { condition: (inputs) => inputs.fte_positions >= 4501 && inputs.fte_positions <= 5000, quantity: 1, nsf: 400 }
          ],
          comment: 'Located in high traffic areas, often remote from main VCS Food Court'
        }
      ]
    },
    {
      name: 'FA2: Optical Shop Area',
      rooms: [
        {
          id: 'CEY91',
          name: 'Eyeglass Fitting / Dispensing Room, Eye Clnc',
          nsf: 200,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 2500, quantity: 1 },
            { condition: (inputs) => inputs.fte_positions >= 2501 && inputs.fte_positions <= 5000, quantity: 2 }
          ],
          comment: 'Accommodates optical cabinet display, dispensing table, spectacle warmer, automated & manual lensometer'
        },
        {
          id: 'CEY93',
          name: 'Contact Lens Fitting / Dispensing, Eye Clnc',
          nsf: 160,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 5000, quantity: 1 }
          ],
          comment: 'Accommodates dispensing table, automated and manual lensometer. Provided within Optometry Patient Area'
        },
        {
          id: 'SS204_OPTICIAN',
          name: 'Optician / Technician Office, VC Svc',
          nsf: 120,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 2500, quantity: 1 },
            { condition: (inputs) => inputs.fte_positions >= 2501 && inputs.fte_positions <= 5000, quantity: 2 }
          ],
          comment: 'Space for clerical work, repair work and limited storage of product and materials'
        },
        {
          id: 'CEY95',
          name: 'Eyeglass Frame Storage Room, Eye Clnc',
          nsf: 80,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 2500, quantity: 1, nsf: 80 },
            { condition: (inputs) => inputs.fte_positions >= 2501 && inputs.fte_positions <= 5000, quantity: 1, nsf: 100 }
          ]
        },
        {
          id: 'CEY97',
          name: 'Contact Lens Storage Room, Eye Clnc',
          nsf: 80,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 5000, quantity: 1 }
          ],
          comment: 'May be placed within the Optometry Patient Area'
        }
      ]
    },
    {
      name: 'FA3: Barber / Beauty Shop',
      rooms: [
        {
          id: 'SV631',
          name: 'Barber / Beauty Shop, VC Svc',
          nsf: 200,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 2000, quantity: 1, nsf: 200 },
            { condition: (inputs) => inputs.fte_positions >= 2001 && inputs.fte_positions <= 4000, quantity: 1, nsf: 300 },
            { condition: (inputs) => inputs.fte_positions >= 4001 && inputs.fte_positions <= 5000, quantity: 1, nsf: 380 }
          ],
          comment: 'Provides waiting space, barber services, and equipment for long term care patients'
        }
      ]
    },
    {
      name: 'FA4: Vending Area',
      rooms: [
        {
          id: 'SV683',
          name: 'Vending Machines, VC Svc',
          nsf: 50,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 1000, quantity: 1, nsf: 50 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 2000, quantity: 1, nsf: 100 },
            { condition: (inputs) => inputs.fte_positions >= 2001 && inputs.fte_positions <= 3000, quantity: 1, nsf: 150 },
            { condition: (inputs) => inputs.fte_positions >= 3001 && inputs.fte_positions <= 4000, quantity: 1, nsf: 200 },
            { condition: (inputs) => inputs.fte_positions >= 4001 && inputs.fte_positions <= 5000, quantity: 1, nsf: 250 }
          ],
          comment: 'Randolph-Sheppard Act compliance mandatory for projects >15,000 NSF and 100 FTEs. Area should be divisible from Main Cafeteria and accessible 24/7'
        }
      ]
    },
    {
      name: 'FA5: Cafeteria Serving Area',
      rooms: [
        {
          id: 'SV674',
          name: 'Cafeteria Serving Area, VC Svc',
          nsf: 770,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 500, quantity: 1, nsf: 770 },
            { condition: (inputs) => inputs.fte_positions >= 501 && inputs.fte_positions <= 1000, quantity: 1, nsf: 1535 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 1500, quantity: 1, nsf: 2305 },
            { condition: (inputs) => inputs.fte_positions >= 1501 && inputs.fte_positions <= 2000, quantity: 1, nsf: 3070 },
            { condition: (inputs) => inputs.fte_positions >= 2001 && inputs.fte_positions <= 2500, quantity: 1, nsf: 3840 },
            { condition: (inputs) => inputs.fte_positions >= 2501 && inputs.fte_positions <= 3000, quantity: 1, nsf: 4605 },
            { condition: (inputs) => inputs.fte_positions >= 3001 && inputs.fte_positions <= 3500, quantity: 1, nsf: 5370 },
            { condition: (inputs) => inputs.fte_positions >= 3501 && inputs.fte_positions <= 4000, quantity: 1, nsf: 6140 },
            { condition: (inputs) => inputs.fte_positions >= 4001 && inputs.fte_positions <= 4500, quantity: 1, nsf: 6905 },
            { condition: (inputs) => inputs.fte_positions >= 4501 && inputs.fte_positions <= 5000, quantity: 1, nsf: 7675 }
          ],
          comment: 'Food shops/counters area. ~1200 NSF required for full-menu Food Court. Type and number of shops determined project-by-project'
        }
      ]
    },
    {
      name: 'FA6: Cafeteria Dining Area',
      rooms: [
        {
          id: 'SV678',
          name: 'Dining Area, VC Svc',
          nsf: 1165,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 500, quantity: 1, nsf: 1165 },
            { condition: (inputs) => inputs.fte_positions >= 501 && inputs.fte_positions <= 1000, quantity: 1, nsf: 2330 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 1500, quantity: 1, nsf: 3495 },
            { condition: (inputs) => inputs.fte_positions >= 1501 && inputs.fte_positions <= 2000, quantity: 1, nsf: 4660 },
            { condition: (inputs) => inputs.fte_positions >= 2001 && inputs.fte_positions <= 2500, quantity: 1, nsf: 5825 },
            { condition: (inputs) => inputs.fte_positions >= 2501 && inputs.fte_positions <= 3000, quantity: 1, nsf: 6990 },
            { condition: (inputs) => inputs.fte_positions >= 3001 && inputs.fte_positions <= 3500, quantity: 1, nsf: 8155 },
            { condition: (inputs) => inputs.fte_positions >= 3501 && inputs.fte_positions <= 4000, quantity: 1, nsf: 9315 },
            { condition: (inputs) => inputs.fte_positions >= 4001 && inputs.fte_positions <= 4500, quantity: 1, nsf: 10480 },
            { condition: (inputs) => inputs.fte_positions >= 4501 && inputs.fte_positions <= 5000, quantity: 1, nsf: 11645 }
          ],
          comment: 'Seating for patients, employees, volunteers, visitors, students. Adjacent to serving area and kitchen. Exterior views desirable. Tables/chairs preferred over fixed booths'
        }
      ]
    },
    {
      name: 'FA7: Food Court Support Area',
      rooms: [
        {
          id: 'SV635',
          name: 'Food Court Receiving, VC Svc',
          nsf: 65,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 500, quantity: 1, nsf: 65 },
            { condition: (inputs) => inputs.fte_positions >= 501 && inputs.fte_positions <= 1000, quantity: 1, nsf: 125 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 1500, quantity: 1, nsf: 190 },
            { condition: (inputs) => inputs.fte_positions >= 1501 && inputs.fte_positions <= 2000, quantity: 1, nsf: 255 },
            { condition: (inputs) => inputs.fte_positions >= 2001 && inputs.fte_positions <= 2500, quantity: 1, nsf: 315 },
            { condition: (inputs) => inputs.fte_positions >= 2501 && inputs.fte_positions <= 5000, quantity: 1, nsf: 380 }
          ],
          comment: 'Staging/receiving food and supplies, holding empty returns, used cooking oil, waste containers'
        },
        {
          id: 'SV639',
          name: 'Non-Food Storage Room, VC Svc',
          nsf: 30,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 500, quantity: 1, nsf: 30 },
            { condition: (inputs) => inputs.fte_positions >= 501 && inputs.fte_positions <= 1000, quantity: 1, nsf: 65 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 1500, quantity: 1, nsf: 95 },
            { condition: (inputs) => inputs.fte_positions >= 1501 && inputs.fte_positions <= 2000, quantity: 1, nsf: 125 },
            { condition: (inputs) => inputs.fte_positions >= 2001 && inputs.fte_positions <= 2500, quantity: 1, nsf: 160 },
            { condition: (inputs) => inputs.fte_positions >= 2501 && inputs.fte_positions <= 3000, quantity: 1, nsf: 190 },
            { condition: (inputs) => inputs.fte_positions >= 3001 && inputs.fte_positions <= 3500, quantity: 1, nsf: 220 },
            { condition: (inputs) => inputs.fte_positions >= 3501 && inputs.fte_positions <= 4000, quantity: 1, nsf: 255 },
            { condition: (inputs) => inputs.fte_positions >= 4001 && inputs.fte_positions <= 4500, quantity: 1, nsf: 285 },
            { condition: (inputs) => inputs.fte_positions >= 4501 && inputs.fte_positions <= 5000, quantity: 1, nsf: 315 }
          ],
          comment: 'Secured room for disposables, dishes, cups, cutlery, paper products, catering supplies, utensils, aprons, hats, gloves, seasonal displays'
        },
        {
          id: 'SV644',
          name: 'Dry-Food Storage Room, VC Svc',
          nsf: 65,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 500, quantity: 1, nsf: 65 },
            { condition: (inputs) => inputs.fte_positions >= 501 && inputs.fte_positions <= 1000, quantity: 1, nsf: 125 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 1500, quantity: 1, nsf: 190 },
            { condition: (inputs) => inputs.fte_positions >= 1501 && inputs.fte_positions <= 2000, quantity: 1, nsf: 255 },
            { condition: (inputs) => inputs.fte_positions >= 2001 && inputs.fte_positions <= 2500, quantity: 1, nsf: 315 },
            { condition: (inputs) => inputs.fte_positions >= 2501 && inputs.fte_positions <= 3000, quantity: 1, nsf: 380 },
            { condition: (inputs) => inputs.fte_positions >= 3001 && inputs.fte_positions <= 3500, quantity: 1, nsf: 445 },
            { condition: (inputs) => inputs.fte_positions >= 3501 && inputs.fte_positions <= 4000, quantity: 1, nsf: 505 },
            { condition: (inputs) => inputs.fte_positions >= 4001 && inputs.fte_positions <= 4500, quantity: 1, nsf: 570 },
            { condition: (inputs) => inputs.fte_positions >= 4501 && inputs.fte_positions <= 5000, quantity: 1, nsf: 635 }
          ],
          comment: 'Secured room for foods and bottled beverages not requiring refrigeration. Based on 3-day supply'
        },
        {
          id: 'SV648',
          name: 'Refrigerated / Frozen Food Storage Room, VC Svc',
          nsf: 65,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 500, quantity: 1, nsf: 65 },
            { condition: (inputs) => inputs.fte_positions >= 501 && inputs.fte_positions <= 1000, quantity: 1, nsf: 125 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 1500, quantity: 1, nsf: 190 },
            { condition: (inputs) => inputs.fte_positions >= 1501 && inputs.fte_positions <= 2000, quantity: 1, nsf: 255 },
            { condition: (inputs) => inputs.fte_positions >= 2001 && inputs.fte_positions <= 2500, quantity: 1, nsf: 315 },
            { condition: (inputs) => inputs.fte_positions >= 2501 && inputs.fte_positions <= 3000, quantity: 1, nsf: 380 },
            { condition: (inputs) => inputs.fte_positions >= 3001 && inputs.fte_positions <= 3500, quantity: 1, nsf: 445 },
            { condition: (inputs) => inputs.fte_positions >= 3501 && inputs.fte_positions <= 4000, quantity: 1, nsf: 505 },
            { condition: (inputs) => inputs.fte_positions >= 4001 && inputs.fte_positions <= 4500, quantity: 1, nsf: 570 },
            { condition: (inputs) => inputs.fte_positions >= 4501 && inputs.fte_positions <= 5000, quantity: 1, nsf: 635 }
          ],
          comment: 'Walk-in box area typically 50% refrigerator and 50% freezer. Ratio may be adjusted per facility needs'
        },
        {
          id: 'SV653',
          name: 'Food Preparation / Production, VC Svc',
          nsf: 80,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 500, quantity: 1, nsf: 80 },
            { condition: (inputs) => inputs.fte_positions >= 501 && inputs.fte_positions <= 1000, quantity: 1, nsf: 160 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 1500, quantity: 1, nsf: 240 },
            { condition: (inputs) => inputs.fte_positions >= 1501 && inputs.fte_positions <= 2000, quantity: 1, nsf: 320 },
            { condition: (inputs) => inputs.fte_positions >= 2001 && inputs.fte_positions <= 2500, quantity: 1, nsf: 395 },
            { condition: (inputs) => inputs.fte_positions >= 2501 && inputs.fte_positions <= 3000, quantity: 1, nsf: 475 },
            { condition: (inputs) => inputs.fte_positions >= 3001 && inputs.fte_positions <= 3500, quantity: 1, nsf: 555 },
            { condition: (inputs) => inputs.fte_positions >= 3501 && inputs.fte_positions <= 4000, quantity: 1, nsf: 635 },
            { condition: (inputs) => inputs.fte_positions >= 4001 && inputs.fte_positions <= 4500, quantity: 1, nsf: 715 },
            { condition: (inputs) => inputs.fte_positions >= 4501 && inputs.fte_positions <= 5000, quantity: 1, nsf: 795 }
          ],
          comment: 'Back-of-house food prep limited to slow cooking and pre-preparation of items assembled/cooked in Serving Area'
        },
        {
          id: 'SV657',
          name: 'Dining Utensils Washing Room, VC Svc',
          nsf: 340,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 500, quantity: 1, nsf: 340 },
            { condition: (inputs) => inputs.fte_positions >= 501 && inputs.fte_positions <= 1000, quantity: 1, nsf: 520 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 1500, quantity: 1, nsf: 780 },
            { condition: (inputs) => inputs.fte_positions >= 1501 && inputs.fte_positions <= 2000, quantity: 1, nsf: 940 },
            { condition: (inputs) => inputs.fte_positions >= 2001 && inputs.fte_positions <= 5000, quantity: 1, nsf: 1120 }
          ],
          comment: 'Includes soiled tray return area with conveyor belt'
        },
        {
          id: 'SV663',
          name: 'Pot Washing Room, VC Svc',
          nsf: 45,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 500, quantity: 1, nsf: 45 },
            { condition: (inputs) => inputs.fte_positions >= 501 && inputs.fte_positions <= 1000, quantity: 1, nsf: 90 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 1500, quantity: 1, nsf: 135 },
            { condition: (inputs) => inputs.fte_positions >= 1501 && inputs.fte_positions <= 2000, quantity: 1, nsf: 180 },
            { condition: (inputs) => inputs.fte_positions >= 2001 && inputs.fte_positions <= 2500, quantity: 1, nsf: 220 },
            { condition: (inputs) => inputs.fte_positions >= 2501 && inputs.fte_positions <= 3000, quantity: 1, nsf: 265 },
            { condition: (inputs) => inputs.fte_positions >= 3001 && inputs.fte_positions <= 3500, quantity: 1, nsf: 310 },
            { condition: (inputs) => inputs.fte_positions >= 3501 && inputs.fte_positions <= 5000, quantity: 1, nsf: 355 }
          ]
        },
        {
          id: 'SV667',
          name: 'Sanitation / Recycling Room, VC Svc',
          nsf: 65,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 500, quantity: 1, nsf: 65 },
            { condition: (inputs) => inputs.fte_positions >= 501 && inputs.fte_positions <= 1000, quantity: 1, nsf: 125 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 1500, quantity: 1, nsf: 190 },
            { condition: (inputs) => inputs.fte_positions >= 1501 && inputs.fte_positions <= 2000, quantity: 1, nsf: 255 },
            { condition: (inputs) => inputs.fte_positions >= 2001 && inputs.fte_positions <= 2500, quantity: 1, nsf: 315 },
            { condition: (inputs) => inputs.fte_positions >= 2501 && inputs.fte_positions <= 3000, quantity: 1, nsf: 380 },
            { condition: (inputs) => inputs.fte_positions >= 3001 && inputs.fte_positions <= 3500, quantity: 1, nsf: 445 },
            { condition: (inputs) => inputs.fte_positions >= 3501 && inputs.fte_positions <= 4000, quantity: 1, nsf: 505 },
            { condition: (inputs) => inputs.fte_positions >= 4001 && inputs.fte_positions <= 4500, quantity: 1, nsf: 570 },
            { condition: (inputs) => inputs.fte_positions >= 4501 && inputs.fte_positions <= 5000, quantity: 1, nsf: 635 }
          ],
          comment: 'Storage for hazardous chemicals, cleaning equipment, recycling materials, and trash holding'
        },
        {
          id: 'SV672',
          name: 'Trash Holding Refrigerated Room, VC Svc',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 1000, quantity: 1, nsf: 100 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 2000, quantity: 1, nsf: 120 },
            { condition: (inputs) => inputs.fte_positions >= 2001 && inputs.fte_positions <= 3000, quantity: 1, nsf: 140 },
            { condition: (inputs) => inputs.fte_positions >= 3001 && inputs.fte_positions <= 4000, quantity: 1, nsf: 160 },
            { condition: (inputs) => inputs.fte_positions >= 4001 && inputs.fte_positions <= 5000, quantity: 1, nsf: 180 }
          ]
        },
        {
          id: 'SV673',
          name: 'Waste Pulper System Room, VC Svc',
          nsf: 50,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 5000, quantity: 1 }
          ]
        },
        {
          id: 'SB244_FOOD',
          name: 'Housekeeping Aides Closet (HAC), Food Court',
          nsf: 60,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 1500, quantity: 1, nsf: 60 },
            { condition: (inputs) => inputs.fte_positions >= 1501 && inputs.fte_positions <= 5000, quantity: 1, nsf: 80 }
          ]
        }
      ]
    },
    {
      name: 'FA8: Retail Store Area',
      rooms: [
        {
          id: 'SV614',
          name: 'Retail Store, VC Svc',
          nsf: 150,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 500, quantity: 1, nsf: 150 },
            { condition: (inputs) => inputs.fte_positions >= 501 && inputs.fte_positions <= 1000, quantity: 1, nsf: 300 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 1500, quantity: 1, nsf: 450 },
            { condition: (inputs) => inputs.fte_positions >= 1501 && inputs.fte_positions <= 2000, quantity: 1, nsf: 600 },
            { condition: (inputs) => inputs.fte_positions >= 2001 && inputs.fte_positions <= 2500, quantity: 1, nsf: 750 },
            { condition: (inputs) => inputs.fte_positions >= 2501 && inputs.fte_positions <= 3000, quantity: 1, nsf: 900 },
            { condition: (inputs) => inputs.fte_positions >= 3001 && inputs.fte_positions <= 3500, quantity: 1, nsf: 1050 },
            { condition: (inputs) => inputs.fte_positions >= 3501 && inputs.fte_positions <= 4000, quantity: 1, nsf: 1200 },
            { condition: (inputs) => inputs.fte_positions >= 4001 && inputs.fte_positions <= 4500, quantity: 1, nsf: 1350 },
            { condition: (inputs) => inputs.fte_positions >= 4501 && inputs.fte_positions <= 5000, quantity: 1, nsf: 1500 }
          ],
          comment: 'Displays/sells retail merchandise: OTC medication, snacks, beverages, health/beauty aids, electronics, clothing'
        },
        {
          id: 'SV618',
          name: 'Secure Retail, VC Svc',
          nsf: 65,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 500, quantity: 1, nsf: 65 },
            { condition: (inputs) => inputs.fte_positions >= 501 && inputs.fte_positions <= 1000, quantity: 1, nsf: 125 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 1500, quantity: 1, nsf: 190 },
            { condition: (inputs) => inputs.fte_positions >= 1501 && inputs.fte_positions <= 2000, quantity: 1, nsf: 250 },
            { condition: (inputs) => inputs.fte_positions >= 2001 && inputs.fte_positions <= 2500, quantity: 1, nsf: 315 },
            { condition: (inputs) => inputs.fte_positions >= 2501 && inputs.fte_positions <= 3000, quantity: 1, nsf: 375 },
            { condition: (inputs) => inputs.fte_positions >= 3001 && inputs.fte_positions <= 3500, quantity: 1, nsf: 440 },
            { condition: (inputs) => inputs.fte_positions >= 3501 && inputs.fte_positions <= 4000, quantity: 1, nsf: 500 },
            { condition: (inputs) => inputs.fte_positions >= 4001 && inputs.fte_positions <= 4500, quantity: 1, nsf: 570 },
            { condition: (inputs) => inputs.fte_positions >= 4501 && inputs.fte_positions <= 5000, quantity: 1, nsf: 625 }
          ]
        },
        {
          id: 'SV601',
          name: 'Retail Store Storage Room, VC Svc',
          nsf: 40,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 500, quantity: 1, nsf: 40 },
            { condition: (inputs) => inputs.fte_positions >= 501 && inputs.fte_positions <= 1000, quantity: 1, nsf: 75 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 1500, quantity: 1, nsf: 115 },
            { condition: (inputs) => inputs.fte_positions >= 1501 && inputs.fte_positions <= 2000, quantity: 1, nsf: 150 },
            { condition: (inputs) => inputs.fte_positions >= 2001 && inputs.fte_positions <= 2500, quantity: 1, nsf: 190 },
            { condition: (inputs) => inputs.fte_positions >= 2501 && inputs.fte_positions <= 3000, quantity: 1, nsf: 225 },
            { condition: (inputs) => inputs.fte_positions >= 3001 && inputs.fte_positions <= 3500, quantity: 1, nsf: 265 },
            { condition: (inputs) => inputs.fte_positions >= 3501 && inputs.fte_positions <= 4000, quantity: 1, nsf: 300 },
            { condition: (inputs) => inputs.fte_positions >= 4001 && inputs.fte_positions <= 4500, quantity: 1, nsf: 340 },
            { condition: (inputs) => inputs.fte_positions >= 4501 && inputs.fte_positions <= 5000, quantity: 1, nsf: 375 }
          ],
          comment: 'Space for checking, marking, and storing items for Retail Area display'
        },
        {
          id: 'SV605',
          name: 'Retail Store Receiving, VC Svc',
          nsf: 10,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 500, quantity: 1, nsf: 10 },
            { condition: (inputs) => inputs.fte_positions >= 501 && inputs.fte_positions <= 1000, quantity: 1, nsf: 25 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 1500, quantity: 1, nsf: 35 },
            { condition: (inputs) => inputs.fte_positions >= 1501 && inputs.fte_positions <= 2000, quantity: 1, nsf: 45 },
            { condition: (inputs) => inputs.fte_positions >= 2001 && inputs.fte_positions <= 2500, quantity: 1, nsf: 55 },
            { condition: (inputs) => inputs.fte_positions >= 2501 && inputs.fte_positions <= 3000, quantity: 1, nsf: 70 },
            { condition: (inputs) => inputs.fte_positions >= 3001 && inputs.fte_positions <= 3500, quantity: 1, nsf: 80 },
            { condition: (inputs) => inputs.fte_positions >= 3501 && inputs.fte_positions <= 4000, quantity: 1, nsf: 90 },
            { condition: (inputs) => inputs.fte_positions >= 4001 && inputs.fte_positions <= 4500, quantity: 1, nsf: 100 },
            { condition: (inputs) => inputs.fte_positions >= 4501 && inputs.fte_positions <= 5000, quantity: 1, nsf: 115 }
          ],
          comment: 'Adjacent to Retail Storage with direct access to loading dock. Required even if VCS and NFS combined'
        },
        {
          id: 'SV609',
          name: 'Retail Store Remote Receiving Storage Room, Canteen',
          nsf: 10,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 500, quantity: 1, nsf: 10 },
            { condition: (inputs) => inputs.fte_positions >= 501 && inputs.fte_positions <= 1000, quantity: 1, nsf: 15 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 1500, quantity: 1, nsf: 25 },
            { condition: (inputs) => inputs.fte_positions >= 1501 && inputs.fte_positions <= 2000, quantity: 1, nsf: 30 },
            { condition: (inputs) => inputs.fte_positions >= 2001 && inputs.fte_positions <= 2500, quantity: 1, nsf: 40 },
            { condition: (inputs) => inputs.fte_positions >= 2501 && inputs.fte_positions <= 3000, quantity: 1, nsf: 45 },
            { condition: (inputs) => inputs.fte_positions >= 3001 && inputs.fte_positions <= 3500, quantity: 1, nsf: 55 },
            { condition: (inputs) => inputs.fte_positions >= 3501 && inputs.fte_positions <= 4000, quantity: 1, nsf: 60 },
            { condition: (inputs) => inputs.fte_positions >= 4001 && inputs.fte_positions <= 4500, quantity: 1, nsf: 70 },
            { condition: (inputs) => inputs.fte_positions >= 4501 && inputs.fte_positions <= 5000, quantity: 1, nsf: 75 }
          ],
          comment: 'Required if Retail Storage is remote from Retail Store'
        },
        {
          id: 'SB244_RETAIL',
          name: 'Housekeeping Aides Closet (HAC), Retail',
          nsf: 60,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 5000, quantity: 1 }
          ]
        }
      ]
    },
    {
      name: 'FA9: Retail Concession Area',
      rooms: [
        {
          id: 'SV623',
          name: 'Retail Store Concessions Display / Storage, VC Svc',
          nsf: 25,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 500, quantity: 1, nsf: 25 },
            { condition: (inputs) => inputs.fte_positions >= 501 && inputs.fte_positions <= 1000, quantity: 1, nsf: 45 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 1500, quantity: 1, nsf: 70 },
            { condition: (inputs) => inputs.fte_positions >= 1501 && inputs.fte_positions <= 2000, quantity: 1, nsf: 90 },
            { condition: (inputs) => inputs.fte_positions >= 2001 && inputs.fte_positions <= 2500, quantity: 1, nsf: 115 },
            { condition: (inputs) => inputs.fte_positions >= 2501 && inputs.fte_positions <= 3000, quantity: 1, nsf: 135 },
            { condition: (inputs) => inputs.fte_positions >= 3001 && inputs.fte_positions <= 3500, quantity: 1, nsf: 160 },
            { condition: (inputs) => inputs.fte_positions >= 3501 && inputs.fte_positions <= 4000, quantity: 1, nsf: 180 },
            { condition: (inputs) => inputs.fte_positions >= 4001 && inputs.fte_positions <= 4500, quantity: 1, nsf: 205 },
            { condition: (inputs) => inputs.fte_positions >= 4501 && inputs.fte_positions <= 5000, quantity: 1, nsf: 225 }
          ],
          comment: 'Separate lockable room adjacent to Retail Store or Cafeteria. Outside vendors lease space for display/sale of merchandise'
        }
      ]
    },
    {
      name: 'FA10: Staff and Administrative Area',
      rooms: [
        {
          id: 'SS204_VC_CHIEF',
          name: 'VC Service Chief Office',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 5000, quantity: 1 }
          ]
        },
        {
          id: 'SS204_FOOD_ASST',
          name: 'VC Food Section Assistant Chief Office',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 5000, quantity: 1 }
          ]
        },
        {
          id: 'SS204_RETAIL_ASST',
          name: 'VC Retail Assistant Chief Office',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 5000, quantity: 1 }
          ]
        },
        {
          id: 'SV696',
          name: 'Secure Money Handling Room, VC Svc',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 1000, quantity: 1, nsf: 100 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 5000, quantity: 1, nsf: 120 }
          ]
        },
        {
          id: 'SS218',
          name: 'Canteen Clerk Workstation',
          nsf: 56,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 1000, quantity: 2 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 2000, quantity: 3 },
            { condition: (inputs) => inputs.fte_positions >= 2001 && inputs.fte_positions <= 3000, quantity: 4 },
            { condition: (inputs) => inputs.fte_positions >= 3001 && inputs.fte_positions <= 5000, quantity: 5 }
          ],
          comment: 'Touch-down workstation'
        },
        {
          id: 'SS262',
          name: 'Staff Breakroom',
          nsf: 180,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 1000, quantity: 1, nsf: 180 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 2000, quantity: 1, nsf: 240 },
            { condition: (inputs) => inputs.fte_positions >= 2001 && inputs.fte_positions <= 3000, quantity: 1, nsf: 300 },
            { condition: (inputs) => inputs.fte_positions >= 3001 && inputs.fte_positions <= 4000, quantity: 1, nsf: 360 },
            { condition: (inputs) => inputs.fte_positions >= 4001 && inputs.fte_positions <= 5000, quantity: 1, nsf: 420 }
          ]
        },
        {
          id: 'SS232',
          name: 'Female Staff Locker Room',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 1000, quantity: 1, nsf: 100 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 2000, quantity: 1, nsf: 140 },
            { condition: (inputs) => inputs.fte_positions >= 2001 && inputs.fte_positions <= 3000, quantity: 1, nsf: 180 },
            { condition: (inputs) => inputs.fte_positions >= 3001 && inputs.fte_positions <= 4000, quantity: 1, nsf: 220 },
            { condition: (inputs) => inputs.fte_positions >= 4001 && inputs.fte_positions <= 5000, quantity: 1, nsf: 260 }
          ],
          comment: 'Provide locker space only for FTEs without assigned office or workspace'
        },
        {
          id: 'SS241',
          name: 'Male Staff Locker Room',
          nsf: 100,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 1000, quantity: 1, nsf: 100 },
            { condition: (inputs) => inputs.fte_positions >= 1001 && inputs.fte_positions <= 2000, quantity: 1, nsf: 140 },
            { condition: (inputs) => inputs.fte_positions >= 2001 && inputs.fte_positions <= 3000, quantity: 1, nsf: 180 },
            { condition: (inputs) => inputs.fte_positions >= 3001 && inputs.fte_positions <= 4000, quantity: 1, nsf: 220 },
            { condition: (inputs) => inputs.fte_positions >= 4001 && inputs.fte_positions <= 5000, quantity: 1, nsf: 260 }
          ]
        },
        {
          id: 'SB191_STAFF',
          name: 'Universal Staff Toilet',
          nsf: 60,
          rules: [
            { condition: (inputs) => inputs.fte_positions >= 100 && inputs.fte_positions <= 2500, quantity: 2 },
            { condition: (inputs) => inputs.fte_positions >= 2501 && inputs.fte_positions <= 5000, quantity: 3 }
          ]
        }
      ]
    }
  ]
};
