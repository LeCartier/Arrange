
export const CHAPTER_232 = {
  id: '232',
  name: 'Telecommunication Service',
  
  inputs: [
    {
      id: 'numEndUsers',
      label: 'How many End Users are projected?',
      type: 'number',
      min: 0,
      max: 10000,
      default: 0
    }
  ],
  
  functionalAreas: [
    {
      name: 'FA 1: CUSTOMER AREA',
      rooms: [
        {
          name: 'Waiting',
          code: 'SB003',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 701 && inputs.numEndUsers <= 5000) return { roomCount: 1, nsf: 80 };
                if (inputs.numEndUsers >= 5001 && inputs.numEndUsers <= 7500) return { roomCount: 1, nsf: 100 };
                if (inputs.numEndUsers >= 7501 && inputs.numEndUsers <= 10000) return { roomCount: 1, nsf: 120 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Reception',
          code: 'SS221',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 2501 && inputs.numEndUsers <= 10000) return { roomCount: 1, nsf: 85 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Customer Assistance, Telecom',
          code: 'SC302',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 201 && inputs.numEndUsers <= 5000) return { roomCount: 1, nsf: 60 };
                if (inputs.numEndUsers >= 5001 && inputs.numEndUsers <= 7500) return { roomCount: 2, nsf: 60 };
                if (inputs.numEndUsers >= 7501 && inputs.numEndUsers <= 10000) return { roomCount: 3, nsf: 60 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Universal Toilet',
          code: 'SB191',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 2501 && inputs.numEndUsers <= 10000) return { roomCount: 1, nsf: 60 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 2: EQUIPMENT AREA',
      rooms: [
        {
          name: 'Computer Room, Telecom',
          code: 'SC306',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 801 && inputs.numEndUsers <= 1000) return { roomCount: 1, nsf: 780 };
                if (inputs.numEndUsers >= 1001 && inputs.numEndUsers <= 5000) return { roomCount: 1, nsf: 1152 };
                if (inputs.numEndUsers >= 5001 && inputs.numEndUsers <= 10000) return { roomCount: 1, nsf: 1760 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Entrance Room, Telecom',
          code: 'SC309',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 801 && inputs.numEndUsers <= 10000) return { roomCount: 2, nsf: 170 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Antenna Entrance Room, Telecom',
          code: 'SC313',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 1001 && inputs.numEndUsers <= 10000) return { roomCount: 1, nsf: 305 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Network Support Center (NSC), Telecom',
          code: 'SC316',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 5 && inputs.numEndUsers <= 20) return { roomCount: 1, nsf: 100 };
                if (inputs.numEndUsers >= 21 && inputs.numEndUsers <= 50) return { roomCount: 1, nsf: 120 };
                if (inputs.numEndUsers >= 51 && inputs.numEndUsers <= 800) return { roomCount: 1, nsf: 170 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 3: STAFF AREA',
      rooms: [
        {
          name: 'Area Manager Office',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 1001 && inputs.numEndUsers <= 10000) return { roomCount: 1, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Supervisor Office',
          code: 'SS205',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 1001 && inputs.numEndUsers <= 10000) return { roomCount: 2, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Technician Station A, Telecom',
          code: 'SC323',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 1001 && inputs.numEndUsers <= 1500) return { roomCount: 3, nsf: 80 };
                if (inputs.numEndUsers >= 1501 && inputs.numEndUsers <= 2000) return { roomCount: 4, nsf: 80 };
                if (inputs.numEndUsers >= 2001 && inputs.numEndUsers <= 2500) return { roomCount: 5, nsf: 80 };
                if (inputs.numEndUsers >= 2501 && inputs.numEndUsers <= 3000) return { roomCount: 6, nsf: 80 };
                if (inputs.numEndUsers >= 3001 && inputs.numEndUsers <= 3500) return { roomCount: 7, nsf: 80 };
                if (inputs.numEndUsers >= 3501 && inputs.numEndUsers <= 4000) return { roomCount: 9, nsf: 80 };
                if (inputs.numEndUsers >= 4001 && inputs.numEndUsers <= 4500) return { roomCount: 10, nsf: 80 };
                if (inputs.numEndUsers >= 4501 && inputs.numEndUsers <= 5000) return { roomCount: 11, nsf: 80 };
                if (inputs.numEndUsers >= 5001 && inputs.numEndUsers <= 5500) return { roomCount: 12, nsf: 80 };
                if (inputs.numEndUsers >= 5501 && inputs.numEndUsers <= 6000) return { roomCount: 13, nsf: 80 };
                if (inputs.numEndUsers >= 6001 && inputs.numEndUsers <= 6500) return { roomCount: 14, nsf: 80 };
                if (inputs.numEndUsers >= 6501 && inputs.numEndUsers <= 7000) return { roomCount: 15, nsf: 80 };
                if (inputs.numEndUsers >= 7001 && inputs.numEndUsers <= 7500) return { roomCount: 16, nsf: 80 };
                if (inputs.numEndUsers >= 7501 && inputs.numEndUsers <= 10000) return { roomCount: 17, nsf: 80 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Technician Station B, Telecom',
          code: 'SC326',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 301 && inputs.numEndUsers <= 1000) return { roomCount: 1, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Imaging Workroom, Telecom',
          code: 'SC329',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 801 && inputs.numEndUsers <= 1000) return { roomCount: 1, nsf: 150 };
                if (inputs.numEndUsers >= 1001 && inputs.numEndUsers <= 1500) return { roomCount: 1, nsf: 200 };
                if (inputs.numEndUsers >= 1501 && inputs.numEndUsers <= 10000) return { roomCount: 1, nsf: 250 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Projects Workroom, Telecom',
          code: 'SC333',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 301 && inputs.numEndUsers <= 600) return { roomCount: 1, nsf: 100 };
                if (inputs.numEndUsers >= 601 && inputs.numEndUsers <= 1500) return { roomCount: 1, nsf: 200 };
                if (inputs.numEndUsers >= 1501 && inputs.numEndUsers <= 10000) return { roomCount: 1, nsf: 400 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Conference Room',
          code: 'SS101',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 301 && inputs.numEndUsers <= 900) return { roomCount: 1, nsf: 240 };
                if (inputs.numEndUsers >= 901 && inputs.numEndUsers <= 10000) return { roomCount: 1, nsf: 360 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Training Room, Telecom',
          code: 'SC336',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 2501 && inputs.numEndUsers <= 5000) return { roomCount: 1, nsf: 240 };
                if (inputs.numEndUsers >= 5001 && inputs.numEndUsers <= 7500) return { roomCount: 1, nsf: 300 };
                if (inputs.numEndUsers >= 7501 && inputs.numEndUsers <= 10000) return { roomCount: 1, nsf: 360 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Training Room Storage, Telecom',
          code: 'SC339',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 2501 && inputs.numEndUsers <= 5000) return { roomCount: 1, nsf: 60 };
                if (inputs.numEndUsers >= 5001 && inputs.numEndUsers <= 7500) return { roomCount: 1, nsf: 80 };
                if (inputs.numEndUsers >= 7501 && inputs.numEndUsers <= 10000) return { roomCount: 1, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Support Staff Station A, Telecom',
          code: 'SC343',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 1001 && inputs.numEndUsers <= 1500) return { roomCount: 4, nsf: 80 };
                if (inputs.numEndUsers >= 1501 && inputs.numEndUsers <= 2000) return { roomCount: 5, nsf: 80 };
                if (inputs.numEndUsers >= 2001 && inputs.numEndUsers <= 2500) return { roomCount: 6, nsf: 80 };
                if (inputs.numEndUsers >= 2501 && inputs.numEndUsers <= 3000) return { roomCount: 7, nsf: 80 };
                if (inputs.numEndUsers >= 3001 && inputs.numEndUsers <= 3500) return { roomCount: 8, nsf: 80 };
                if (inputs.numEndUsers >= 3501 && inputs.numEndUsers <= 4000) return { roomCount: 9, nsf: 80 };
                if (inputs.numEndUsers >= 4001 && inputs.numEndUsers <= 4500) return { roomCount: 10, nsf: 80 };
                if (inputs.numEndUsers >= 4501 && inputs.numEndUsers <= 5000) return { roomCount: 11, nsf: 80 };
                if (inputs.numEndUsers >= 5001 && inputs.numEndUsers <= 5500) return { roomCount: 12, nsf: 80 };
                if (inputs.numEndUsers >= 5501 && inputs.numEndUsers <= 6000) return { roomCount: 14, nsf: 80 };
                if (inputs.numEndUsers >= 6001 && inputs.numEndUsers <= 6500) return { roomCount: 15, nsf: 80 };
                if (inputs.numEndUsers >= 6501 && inputs.numEndUsers <= 7000) return { roomCount: 17, nsf: 80 };
                if (inputs.numEndUsers >= 7001 && inputs.numEndUsers <= 7500) return { roomCount: 18, nsf: 80 };
                if (inputs.numEndUsers >= 7501 && inputs.numEndUsers <= 8000) return { roomCount: 19, nsf: 80 };
                if (inputs.numEndUsers >= 8001 && inputs.numEndUsers <= 10000) return { roomCount: 20, nsf: 80 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Support Staff Station B, Telecom',
          code: 'SC346',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 501 && inputs.numEndUsers <= 700) return { roomCount: 1, nsf: 100 };
                if (inputs.numEndUsers >= 701 && inputs.numEndUsers <= 800) return { roomCount: 2, nsf: 100 };
                if (inputs.numEndUsers >= 801 && inputs.numEndUsers <= 900) return { roomCount: 3, nsf: 100 };
                if (inputs.numEndUsers >= 901 && inputs.numEndUsers <= 1000) return { roomCount: 4, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Staff Breakroom',
          code: 'SS264',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 1001 && inputs.numEndUsers <= 2500) return { roomCount: 1, nsf: 180 };
                if (inputs.numEndUsers >= 2501 && inputs.numEndUsers <= 5000) return { roomCount: 1, nsf: 200 };
                if (inputs.numEndUsers >= 5001 && inputs.numEndUsers <= 7500) return { roomCount: 1, nsf: 220 };
                if (inputs.numEndUsers >= 7501 && inputs.numEndUsers <= 10000) return { roomCount: 1, nsf: 240 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Staff Breakroom Storage',
          code: 'SS266',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 1001 && inputs.numEndUsers <= 2500) return { roomCount: 1, nsf: 40 };
                if (inputs.numEndUsers >= 2501 && inputs.numEndUsers <= 5000) return { roomCount: 1, nsf: 50 };
                if (inputs.numEndUsers >= 5001 && inputs.numEndUsers <= 7500) return { roomCount: 1, nsf: 60 };
                if (inputs.numEndUsers >= 7501 && inputs.numEndUsers <= 10000) return { roomCount: 1, nsf: 70 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Female Staff Toilet',
          code: 'SB202',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 2501 && inputs.numEndUsers <= 10000) return { roomCount: 1, nsf: 60 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Male Staff Toilet',
          code: 'SB203',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 2501 && inputs.numEndUsers <= 10000) return { roomCount: 1, nsf: 60 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 4: TELECOM SUPPORT AREA',
      rooms: [
        {
          name: 'IT Equipment Storage Room, Telecom',
          code: 'SC351',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 101 && inputs.numEndUsers <= 500) return { roomCount: 1, nsf: 125 };
                if (inputs.numEndUsers >= 501 && inputs.numEndUsers <= 600) return { roomCount: 1, nsf: 150 };
                if (inputs.numEndUsers >= 601 && inputs.numEndUsers <= 700) return { roomCount: 1, nsf: 175 };
                if (inputs.numEndUsers >= 701 && inputs.numEndUsers <= 800) return { roomCount: 1, nsf: 200 };
                if (inputs.numEndUsers >= 801 && inputs.numEndUsers <= 900) return { roomCount: 1, nsf: 225 };
                if (inputs.numEndUsers >= 901 && inputs.numEndUsers <= 1000) return { roomCount: 1, nsf: 250 };
                if (inputs.numEndUsers >= 1001 && inputs.numEndUsers <= 1500) return { roomCount: 1, nsf: 385 };
                if (inputs.numEndUsers >= 1501 && inputs.numEndUsers <= 2000) return { roomCount: 1, nsf: 530 };
                if (inputs.numEndUsers >= 2001 && inputs.numEndUsers <= 2500) return { roomCount: 1, nsf: 685 };
                if (inputs.numEndUsers >= 2501 && inputs.numEndUsers <= 3000) return { roomCount: 1, nsf: 855 };
                if (inputs.numEndUsers >= 3001 && inputs.numEndUsers <= 3500) return { roomCount: 1, nsf: 1050 };
                if (inputs.numEndUsers >= 3501 && inputs.numEndUsers <= 4000) return { roomCount: 1, nsf: 1235 };
                if (inputs.numEndUsers >= 4001 && inputs.numEndUsers <= 4500) return { roomCount: 1, nsf: 1410 };
                if (inputs.numEndUsers >= 4501 && inputs.numEndUsers <= 5000) return { roomCount: 1, nsf: 1575 };
                if (inputs.numEndUsers >= 5001 && inputs.numEndUsers <= 5500) return { roomCount: 1, nsf: 1730 };
                if (inputs.numEndUsers >= 5501 && inputs.numEndUsers <= 6000) return { roomCount: 1, nsf: 1875 };
                if (inputs.numEndUsers >= 6001 && inputs.numEndUsers <= 6500) return { roomCount: 1, nsf: 2010 };
                if (inputs.numEndUsers >= 6501 && inputs.numEndUsers <= 7000) return { roomCount: 1, nsf: 2135 };
                if (inputs.numEndUsers >= 7001 && inputs.numEndUsers <= 7500) return { roomCount: 1, nsf: 2245 };
                if (inputs.numEndUsers >= 7501 && inputs.numEndUsers <= 8000) return { roomCount: 1, nsf: 2340 };
                if (inputs.numEndUsers >= 8001 && inputs.numEndUsers <= 8500) return { roomCount: 1, nsf: 2420 };
                if (inputs.numEndUsers >= 8501 && inputs.numEndUsers <= 9000) return { roomCount: 1, nsf: 2480 };
                if (inputs.numEndUsers >= 9001 && inputs.numEndUsers <= 9500) return { roomCount: 1, nsf: 2515 };
                if (inputs.numEndUsers >= 9501 && inputs.numEndUsers <= 10000) return { roomCount: 1, nsf: 2520 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Telecom Equipment Storage Room, Telecom',
          code: 'SC354',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 401 && inputs.numEndUsers <= 500) return { roomCount: 1, nsf: 40 };
                if (inputs.numEndUsers >= 501 && inputs.numEndUsers <= 600) return { roomCount: 1, nsf: 50 };
                if (inputs.numEndUsers >= 601 && inputs.numEndUsers <= 700) return { roomCount: 1, nsf: 55 };
                if (inputs.numEndUsers >= 701 && inputs.numEndUsers <= 800) return { roomCount: 1, nsf: 60 };
                if (inputs.numEndUsers >= 801 && inputs.numEndUsers <= 900) return { roomCount: 1, nsf: 65 };
                if (inputs.numEndUsers >= 901 && inputs.numEndUsers <= 1000) return { roomCount: 1, nsf: 75 };
                if (inputs.numEndUsers >= 1001 && inputs.numEndUsers <= 1500) return { roomCount: 1, nsf: 115 };
                if (inputs.numEndUsers >= 1501 && inputs.numEndUsers <= 2000) return { roomCount: 1, nsf: 160 };
                if (inputs.numEndUsers >= 2001 && inputs.numEndUsers <= 2500) return { roomCount: 1, nsf: 205 };
                if (inputs.numEndUsers >= 2501 && inputs.numEndUsers <= 3000) return { roomCount: 1, nsf: 255 };
                if (inputs.numEndUsers >= 3001 && inputs.numEndUsers <= 3500) return { roomCount: 1, nsf: 315 };
                if (inputs.numEndUsers >= 3501 && inputs.numEndUsers <= 4000) return { roomCount: 1, nsf: 370 };
                if (inputs.numEndUsers >= 4001 && inputs.numEndUsers <= 4500) return { roomCount: 1, nsf: 425 };
                if (inputs.numEndUsers >= 4501 && inputs.numEndUsers <= 5000) return { roomCount: 1, nsf: 475 };
                if (inputs.numEndUsers >= 5001 && inputs.numEndUsers <= 5500) return { roomCount: 1, nsf: 520 };
                if (inputs.numEndUsers >= 5501 && inputs.numEndUsers <= 6000) return { roomCount: 1, nsf: 565 };
                if (inputs.numEndUsers >= 6001 && inputs.numEndUsers <= 6500) return { roomCount: 1, nsf: 605 };
                if (inputs.numEndUsers >= 6501 && inputs.numEndUsers <= 7000) return { roomCount: 1, nsf: 640 };
                if (inputs.numEndUsers >= 7001 && inputs.numEndUsers <= 7500) return { roomCount: 1, nsf: 675 };
                if (inputs.numEndUsers >= 7501 && inputs.numEndUsers <= 8000) return { roomCount: 1, nsf: 700 };
                if (inputs.numEndUsers >= 8001 && inputs.numEndUsers <= 8500) return { roomCount: 1, nsf: 725 };
                if (inputs.numEndUsers >= 8501 && inputs.numEndUsers <= 9000) return { roomCount: 1, nsf: 745 };
                if (inputs.numEndUsers >= 9001 && inputs.numEndUsers <= 10000) return { roomCount: 1, nsf: 755 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Secure Storage Room, Telecom',
          code: 'SC357',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 301 && inputs.numEndUsers <= 500) return { roomCount: 1, nsf: 50 };
                if (inputs.numEndUsers >= 501 && inputs.numEndUsers <= 600) return { roomCount: 1, nsf: 60 };
                if (inputs.numEndUsers >= 601 && inputs.numEndUsers <= 700) return { roomCount: 1, nsf: 70 };
                if (inputs.numEndUsers >= 701 && inputs.numEndUsers <= 800) return { roomCount: 1, nsf: 80 };
                if (inputs.numEndUsers >= 801 && inputs.numEndUsers <= 900) return { roomCount: 1, nsf: 90 };
                if (inputs.numEndUsers >= 901 && inputs.numEndUsers <= 1000) return { roomCount: 1, nsf: 100 };
                if (inputs.numEndUsers >= 1001 && inputs.numEndUsers <= 1500) return { roomCount: 1, nsf: 155 };
                if (inputs.numEndUsers >= 1501 && inputs.numEndUsers <= 2000) return { roomCount: 1, nsf: 210 };
                if (inputs.numEndUsers >= 2001 && inputs.numEndUsers <= 2500) return { roomCount: 1, nsf: 275 };
                if (inputs.numEndUsers >= 2501 && inputs.numEndUsers <= 3000) return { roomCount: 1, nsf: 340 };
                if (inputs.numEndUsers >= 3001 && inputs.numEndUsers <= 3500) return { roomCount: 1, nsf: 420 };
                if (inputs.numEndUsers >= 3501 && inputs.numEndUsers <= 4000) return { roomCount: 1, nsf: 495 };
                if (inputs.numEndUsers >= 4001 && inputs.numEndUsers <= 4500) return { roomCount: 1, nsf: 565 };
                if (inputs.numEndUsers >= 4501 && inputs.numEndUsers <= 5000) return { roomCount: 1, nsf: 630 };
                if (inputs.numEndUsers >= 5001 && inputs.numEndUsers <= 5500) return { roomCount: 1, nsf: 690 };
                if (inputs.numEndUsers >= 5501 && inputs.numEndUsers <= 6000) return { roomCount: 1, nsf: 750 };
                if (inputs.numEndUsers >= 6001 && inputs.numEndUsers <= 6500) return { roomCount: 1, nsf: 805 };
                if (inputs.numEndUsers >= 6501 && inputs.numEndUsers <= 7000) return { roomCount: 1, nsf: 855 };
                if (inputs.numEndUsers >= 7001 && inputs.numEndUsers <= 7500) return { roomCount: 1, nsf: 900 };
                if (inputs.numEndUsers >= 7501 && inputs.numEndUsers <= 8000) return { roomCount: 1, nsf: 935 };
                if (inputs.numEndUsers >= 8001 && inputs.numEndUsers <= 8500) return { roomCount: 1, nsf: 970 };
                if (inputs.numEndUsers >= 8501 && inputs.numEndUsers <= 9000) return { roomCount: 1, nsf: 990 };
                if (inputs.numEndUsers >= 9001 && inputs.numEndUsers <= 9500) return { roomCount: 1, nsf: 1005 };
                if (inputs.numEndUsers >= 9501 && inputs.numEndUsers <= 10000) return { roomCount: 1, nsf: 1010 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Supply Storage Room, Telecom',
          code: 'SC361',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 401 && inputs.numEndUsers <= 500) return { roomCount: 1, nsf: 40 };
                if (inputs.numEndUsers >= 501 && inputs.numEndUsers <= 600) return { roomCount: 1, nsf: 50 };
                if (inputs.numEndUsers >= 601 && inputs.numEndUsers <= 700) return { roomCount: 1, nsf: 55 };
                if (inputs.numEndUsers >= 701 && inputs.numEndUsers <= 800) return { roomCount: 1, nsf: 60 };
                if (inputs.numEndUsers >= 801 && inputs.numEndUsers <= 900) return { roomCount: 1, nsf: 65 };
                if (inputs.numEndUsers >= 901 && inputs.numEndUsers <= 1000) return { roomCount: 1, nsf: 75 };
                if (inputs.numEndUsers >= 1001 && inputs.numEndUsers <= 1500) return { roomCount: 1, nsf: 115 };
                if (inputs.numEndUsers >= 1501 && inputs.numEndUsers <= 2000) return { roomCount: 1, nsf: 160 };
                if (inputs.numEndUsers >= 2001 && inputs.numEndUsers <= 2500) return { roomCount: 1, nsf: 205 };
                if (inputs.numEndUsers >= 2501 && inputs.numEndUsers <= 3000) return { roomCount: 1, nsf: 255 };
                if (inputs.numEndUsers >= 3001 && inputs.numEndUsers <= 3500) return { roomCount: 1, nsf: 315 };
                if (inputs.numEndUsers >= 3501 && inputs.numEndUsers <= 4000) return { roomCount: 1, nsf: 370 };
                if (inputs.numEndUsers >= 4001 && inputs.numEndUsers <= 4500) return { roomCount: 1, nsf: 425 };
                if (inputs.numEndUsers >= 4501 && inputs.numEndUsers <= 5000) return { roomCount: 1, nsf: 475 };
                if (inputs.numEndUsers >= 5001 && inputs.numEndUsers <= 5500) return { roomCount: 1, nsf: 520 };
                if (inputs.numEndUsers >= 5501 && inputs.numEndUsers <= 6000) return { roomCount: 1, nsf: 565 };
                if (inputs.numEndUsers >= 6001 && inputs.numEndUsers <= 6500) return { roomCount: 1, nsf: 605 };
                if (inputs.numEndUsers >= 6501 && inputs.numEndUsers <= 7000) return { roomCount: 1, nsf: 640 };
                if (inputs.numEndUsers >= 7001 && inputs.numEndUsers <= 7500) return { roomCount: 1, nsf: 675 };
                if (inputs.numEndUsers >= 7501 && inputs.numEndUsers <= 8000) return { roomCount: 1, nsf: 700 };
                if (inputs.numEndUsers >= 8001 && inputs.numEndUsers <= 8500) return { roomCount: 1, nsf: 725 };
                if (inputs.numEndUsers >= 8501 && inputs.numEndUsers <= 9000) return { roomCount: 1, nsf: 745 };
                if (inputs.numEndUsers >= 9001 && inputs.numEndUsers <= 10000) return { roomCount: 1, nsf: 755 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 5: BUILDING SUPPORT AREA',
      rooms: [
        {
          name: 'Receiving Dock',
          code: 'SB501',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 1001 && inputs.numEndUsers <= 10000) return { roomCount: 1, nsf: 200 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Breakdown Room',
          code: 'SB522',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 1001 && inputs.numEndUsers <= 10000) return { roomCount: 1, nsf: 360 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Equipment Prep / Staging Room',
          code: 'SB581',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 1001 && inputs.numEndUsers <= 10000) return { roomCount: 1, nsf: 200 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Housekeeping Aides Room',
          code: 'SB245',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 1001 && inputs.numEndUsers <= 10000) return { roomCount: 1, nsf: 80 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Mechanical Room',
          code: 'SB269',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 1001 && inputs.numEndUsers <= 10000) return { roomCount: 1, nsf: 200 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Electrical Distribution Room',
          code: 'SB278',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 1001 && inputs.numEndUsers <= 10000) return { roomCount: 1, nsf: 200 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Generator Room',
          code: 'SB279',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 1001 && inputs.numEndUsers <= 10000) return { roomCount: 1, nsf: 1600 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 6: REMOTE AREA',
      rooms: [
        {
          name: 'Telecommunications Room (TR), Telecom',
          code: 'SC391',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 5 && inputs.numEndUsers <= 10000) return { roomCount: 1, nsf: 0 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'Telecommunications Enclosure (TE) Alcove, Telecom',
          code: 'SC368',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.numEndUsers >= 5 && inputs.numEndUsers <= 10000) return { roomCount: 1, nsf: 0 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
  ],
};
