// Chapter 278: Research and Development (R&D)
// Based on VA PG-18-9 Space Planning Criteria (June 1, 2022)
// NTDG Factor: 1.30
// Canonical FA structure from Combined Space Criteria

export const CHAPTER_278 = {
  id: '278',
  name: 'Research and Development (R&D)',
  ntdgFactor: 1.30,
  
  inputs: [
    {
      id: 'num_pis_blrd',
      label: 'Number of Principal Investigators (PIs) in BLR&D Service',
      type: 'number',
      min: 0,
      max: 90,
      default: 10,
      required: true
    },
    {
      id: 'has_rrd',
      label: 'Is Rehabilitation Research and Development (RR&D) Service authorized?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'has_csrd',
      label: 'Is Clinical Science Research and Development (CSR&D) Service authorized?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'has_hsrd',
      label: 'Is Health Services Research and Development (HSR&D) Service authorized?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'has_nonprofit',
      label: 'Is R&D Non-Profit (N-P) authorized?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'nonprofit_size',
      label: 'R&D Non-Profit Size (1=Small, 2=Medium, 3=Large)',
      type: 'number',
      min: 1,
      max: 3,
      default: 1,
      dependsOn: 'has_nonprofit'
    },
    {
      id: 'has_vmu',
      label: 'Is Veterinary Medical Unit (VMU) authorized?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'vmu_small_animal_rooms',
      label: 'Number of VMU Small Animal Holding Rooms',
      type: 'number',
      min: 0,
      max: 20,
      default: 0,
      dependsOn: 'has_vmu'
    },
    {
      id: 'vmu_large_animal_rooms',
      label: 'Number of VMU Large Animal Holding Rooms',
      type: 'number',
      min: 0,
      max: 10,
      default: 0,
      dependsOn: 'has_vmu'
    }
  ],

  // Helper to calculate lab access rooms based on PIs
  calculateLabAccessRooms(pis) {
    if (pis < 1) return 0;
    if (pis <= 9) return 2;
    return 2 + Math.ceil((pis - 9) / 9);
  },

  // Helper to calculate bench units (3 per 3 PIs)
  calculateBenchUnits(pis) {
    if (pis < 1) return 0;
    if (pis <= 3) return 3;
    return 3 + Math.ceil((pis - 3) / 3) * 3;
  },

  functionalAreas: [
    // =========================================================================
    // FA 1: R&D RECEPTION AREA
    // =========================================================================
    {
      id: 'FA1',
      name: 'R&D Reception Area',
      rooms: [
        {
          code: 'SS222',
          name: 'R&D Waiting',
          baseNSF: 100,
          calculateQuantity: (inputs) => inputs.num_pis_blrd >= 1 ? 1 : 0,
          calculateNSF: (inputs) => {
            const pis = inputs.num_pis_blrd || 0;
            if (pis >= 61) return 170;
            if (pis >= 31) return 130;
            return 100;
          }
        },
        {
          code: 'SB091',
          name: 'R&D Contact / Information Station',
          baseNSF: 30,
          calculateQuantity: (inputs) => inputs.num_pis_blrd >= 1 ? 1 : 0
        },
        {
          code: 'SB191',
          name: 'R&D Visitor Universal Toilet',
          baseNSF: 60,
          calculateQuantity: (inputs) => {
            const pis = inputs.num_pis_blrd || 0;
            if (pis >= 31) return 2;
            if (pis >= 1) return 1;
            return 0;
          }
        },
        {
          code: 'SB851',
          name: 'R&D Security Station',
          baseNSF: 80,
          calculateQuantity: (inputs) => inputs.num_pis_blrd >= 1 ? 1 : 0,
          calculateNSF: (inputs) => inputs.num_pis_blrd >= 46 ? 100 : 80
        }
      ]
    },

    // =========================================================================
    // FA 2: BLR&D SERVICE RESEARCH AREA
    // =========================================================================
    {
      id: 'FA2',
      name: 'BLR&D Service Research Area',
      rooms: [
        {
          code: 'SC701',
          name: 'BLR&D Lab Access / Protocol Room',
          baseNSF: 165,
          calculateQuantity: (inputs) => {
            const pis = inputs.num_pis_blrd || 0;
            if (pis < 1) return 0;
            if (pis <= 9) return 2;
            return 2 + Math.ceil((pis - 9) / 9);
          }
        },
        {
          code: 'SC702',
          name: 'BLR&D Bench Unit',
          baseNSF: 500,
          calculateQuantity: (inputs) => {
            const pis = inputs.num_pis_blrd || 0;
            if (pis < 1) return 0;
            if (pis <= 3) return 3;
            return 3 + Math.ceil((pis - 3) / 3) * 3;
          }
        },
        {
          code: 'SC703',
          name: 'BLR&D Ghost Corridor',
          baseNSF: 135,
          calculateQuantity: (inputs) => {
            const pis = inputs.num_pis_blrd || 0;
            if (pis < 1) return 0;
            if (pis <= 3) return 3;
            return 3 + Math.ceil((pis - 3) / 3) * 3;
          }
        },
        {
          code: 'SC704',
          name: 'BLR&D Bench Support',
          baseNSF: 55,
          calculateQuantity: (inputs) => {
            const pis = inputs.num_pis_blrd || 0;
            if (pis < 1) return 0;
            if (pis <= 3) return 3;
            return 3 + Math.ceil((pis - 3) / 3) * 3;
          }
        }
      ]
    },

    // =========================================================================
    // FA 3: BLR&D SERVICE SUPPORT AREA
    // =========================================================================
    {
      id: 'FA3',
      name: 'BLR&D Service Support Area',
      rooms: [
        {
          code: 'SC711',
          name: 'BLR&D Core Room',
          baseNSF: 165,
          calculateQuantity: (inputs) => {
            const pis = inputs.num_pis_blrd || 0;
            if (pis < 1) return 0;
            if (pis <= 3) return 1;
            return 1 + Math.ceil((pis - 3) / 3);
          }
        },
        {
          code: 'SC712',
          name: 'BLR&D Microscopy Room',
          baseNSF: 165,
          calculateQuantity: (inputs) => {
            const pis = inputs.num_pis_blrd || 0;
            if (pis < 1) return 0;
            if (pis <= 18) return 1;
            return 1 + Math.ceil((pis - 18) / 18);
          }
        },
        {
          code: 'SC713',
          name: 'BLR&D Glassware Washing / Sterilization Room',
          baseNSF: 460,
          calculateQuantity: (inputs) => inputs.num_pis_blrd >= 1 ? 1 : 0,
          calculateNSF: (inputs) => {
            const pis = inputs.num_pis_blrd || 0;
            if (pis >= 61) return 580;
            if (pis >= 31) return 510;
            return 460;
          }
        },
        {
          code: 'SC714',
          name: 'BLR&D Walk-in Refrigerator / Cold Room',
          baseNSF: 165,
          calculateQuantity: (inputs) => {
            const pis = inputs.num_pis_blrd || 0;
            if (pis < 1) return 0;
            if (pis <= 18) return 1;
            return 1 + Math.ceil((pis - 18) / 18);
          }
        },
        {
          code: 'SC715',
          name: 'BLR&D Research Informatics Room',
          baseNSF: 160,
          calculateQuantity: (inputs) => {
            const pis = inputs.num_pis_blrd || 0;
            if (pis < 1) return 0;
            if (pis <= 18) return 1;
            return 1 + Math.ceil((pis - 18) / 18);
          }
        },
        {
          code: 'SC716',
          name: 'BLR&D General Storage Room',
          baseNSF: 165,
          calculateQuantity: (inputs) => {
            const pis = inputs.num_pis_blrd || 0;
            if (pis < 1) return 0;
            if (pis <= 3) return 1;
            return 1 + Math.ceil((pis - 3) / 3);
          }
        },
        {
          code: 'SC717',
          name: 'BLR&D Equipment Room',
          baseNSF: 165,
          calculateQuantity: (inputs) => {
            const pis = inputs.num_pis_blrd || 0;
            if (pis < 1) return 0;
            if (pis <= 3) return 1;
            return 1 + Math.ceil((pis - 3) / 3);
          }
        },
        {
          code: 'SC718',
          name: 'BLR&D Service Core',
          baseNSF: 330,
          calculateQuantity: (inputs) => {
            const pis = inputs.num_pis_blrd || 0;
            if (pis < 1) return 0;
            if (pis <= 6) return 3;
            return 3 + Math.ceil((pis - 6) / 6) * 3;
          }
        },
        {
          code: 'SC719',
          name: 'BLR&D Darkroom',
          baseNSF: 165,
          calculateQuantity: (inputs) => inputs.num_pis_blrd >= 1 ? 1 : 0
        },
        {
          code: 'SC721',
          name: 'BLR&D Tissue Culture Room',
          baseNSF: 165,
          calculateQuantity: (inputs) => {
            const pis = inputs.num_pis_blrd || 0;
            if (pis < 1) return 0;
            if (pis <= 6) return 1;
            return 1 + Math.ceil((pis - 6) / 12) * 2;
          }
        },
        {
          code: 'SC722',
          name: 'BLR&D Isotope Room',
          baseNSF: 165,
          calculateQuantity: (inputs) => inputs.num_pis_blrd >= 10 ? 1 : 0
        },
        {
          code: 'SC723',
          name: 'BLR&D Isotope Work and Storage Room',
          baseNSF: 165,
          calculateQuantity: (inputs) => {
            const pis = inputs.num_pis_blrd || 0;
            if (pis < 10) return 0;
            if (pis <= 27) return 1;
            return 1 + Math.ceil((pis - 27) / 18);
          }
        },
        {
          code: 'SC724',
          name: 'BLR&D Flow Cytometry',
          baseNSF: 165,
          calculateQuantity: (inputs) => inputs.num_pis_blrd >= 1 ? 1 : 0
        },
        {
          code: 'SC725',
          name: 'BLR&D Fume Hood Room',
          baseNSF: 165,
          calculateQuantity: (inputs) => {
            const pis = inputs.num_pis_blrd || 0;
            if (pis < 1) return 0;
            if (pis <= 6) return 2;
            return 2 + Math.ceil((pis - 6) / 3);
          }
        },
        {
          code: 'SB244',
          name: 'BLR&D Housekeeping Aides Closet (HAC)',
          baseNSF: 60,
          calculateQuantity: (inputs) => {
            const pis = inputs.num_pis_blrd || 0;
            if (pis < 1) return 0;
            if (pis <= 6) return 1;
            if (pis <= 18) return 2;
            if (pis <= 27) return 3;
            if (pis <= 36) return 4;
            if (pis <= 45) return 5;
            if (pis <= 54) return 6;
            if (pis <= 66) return 7;
            if (pis <= 78) return 8;
            if (pis <= 84) return 9;
            return 10;
          }
        }
      ]
    },

    // =========================================================================
    // FA 4: BLR&D SERVICE STAFF AREA
    // =========================================================================
    {
      id: 'FA4',
      name: 'BLR&D Service Staff Area',
      rooms: [
        {
          code: 'SS204',
          name: 'BLR&D PI Office',
          baseNSF: 100,
          calculateQuantity: (inputs) => inputs.num_pis_blrd || 0
        },
        {
          code: 'SS218',
          name: 'BLR&D Research Associate Workstation',
          baseNSF: 56,
          calculateQuantity: (inputs) => {
            const pis = inputs.num_pis_blrd || 0;
            if (pis < 1) return 0;
            if (pis <= 6) return 9;
            return 9 + Math.ceil((pis - 6) / 6) * 9;
          }
        },
        {
          code: 'SS212',
          name: 'BLR&D Collaboration Station',
          baseNSF: 60,
          calculateQuantity: (inputs) => {
            const pis = inputs.num_pis_blrd || 0;
            if (pis < 1) return 0;
            if (pis <= 6) return 1;
            return 1 + Math.ceil((pis - 6) / 6);
          }
        },
        {
          code: 'SS285',
          name: 'BLR&D Huddle Room',
          baseNSF: 120,
          calculateQuantity: (inputs) => {
            const pis = inputs.num_pis_blrd || 0;
            if (pis < 1) return 0;
            if (pis <= 12) return 1;
            return 1 + Math.ceil((pis - 12) / 12);
          }
        }
      ]
    },

    // =========================================================================
    // FA 5: RR&D SERVICE STAFF AREA
    // =========================================================================
    {
      id: 'FA5',
      name: 'RR&D Service Staff Area',
      rooms: [
        {
          code: 'SS204',
          name: 'RR&D PI Office',
          baseNSF: 100,
          calculateQuantity: (inputs) => inputs.has_rrd ? 4 : 0
        },
        {
          code: 'SS218',
          name: 'RR&D Research Associate Workstation',
          baseNSF: 56,
          calculateQuantity: (inputs) => inputs.has_rrd ? 8 : 0
        },
        {
          code: 'SS212',
          name: 'RR&D Collaboration Station',
          baseNSF: 60,
          calculateQuantity: (inputs) => inputs.has_rrd ? 2 : 0
        },
        {
          code: 'SS285',
          name: 'RR&D Huddle Room',
          baseNSF: 120,
          calculateQuantity: (inputs) => inputs.has_rrd ? 1 : 0
        }
      ]
    },

    // =========================================================================
    // FA 6: CSR&D SERVICE STAFF AREA
    // =========================================================================
    {
      id: 'FA6',
      name: 'CSR&D Service Staff Area',
      rooms: [
        {
          code: 'SS204',
          name: 'CSR&D PI Office',
          baseNSF: 100,
          calculateQuantity: (inputs) => inputs.has_csrd ? 4 : 0
        },
        {
          code: 'SS218',
          name: 'CSR&D Research Associate Workstation',
          baseNSF: 56,
          calculateQuantity: (inputs) => inputs.has_csrd ? 8 : 0
        },
        {
          code: 'SS212',
          name: 'CSR&D Collaboration Station',
          baseNSF: 60,
          calculateQuantity: (inputs) => inputs.has_csrd ? 2 : 0
        },
        {
          code: 'SS285',
          name: 'CSR&D Huddle Room',
          baseNSF: 120,
          calculateQuantity: (inputs) => inputs.has_csrd ? 1 : 0
        }
      ]
    },

    // =========================================================================
    // FA 7: HSR&D SERVICE STAFF AREA
    // =========================================================================
    {
      id: 'FA7',
      name: 'HSR&D Service Staff Area',
      rooms: [
        {
          code: 'SS204',
          name: 'HSR&D PI Office',
          baseNSF: 100,
          calculateQuantity: (inputs) => inputs.has_hsrd ? 4 : 0
        },
        {
          code: 'SS218',
          name: 'HSR&D Research Associate Workstation',
          baseNSF: 56,
          calculateQuantity: (inputs) => inputs.has_hsrd ? 8 : 0
        },
        {
          code: 'SS212',
          name: 'HSR&D Collaboration Station',
          baseNSF: 60,
          calculateQuantity: (inputs) => inputs.has_hsrd ? 2 : 0
        },
        {
          code: 'SS285',
          name: 'HSR&D Huddle Room',
          baseNSF: 120,
          calculateQuantity: (inputs) => inputs.has_hsrd ? 1 : 0
        }
      ]
    },

    // =========================================================================
    // FA 8: VMU TREATMENT AREA
    // =========================================================================
    {
      id: 'FA8',
      name: 'VMU Treatment Area',
      rooms: [
        {
          code: 'SC751',
          name: 'VMU Treatment / Procedure Room',
          baseNSF: 200,
          calculateQuantity: (inputs) => inputs.has_vmu ? 1 : 0
        },
        {
          code: 'SC752',
          name: 'VMU Prep / Recovery Room',
          baseNSF: 120,
          calculateQuantity: (inputs) => inputs.has_vmu ? 1 : 0
        }
      ]
    },

    // =========================================================================
    // FA 9: VMU SURGERY AREA
    // =========================================================================
    {
      id: 'FA9',
      name: 'VMU Surgery Area',
      rooms: [
        {
          code: 'SC761',
          name: 'VMU Surgery Room',
          baseNSF: 300,
          calculateQuantity: (inputs) => inputs.has_vmu ? 1 : 0
        },
        {
          code: 'SC762',
          name: 'VMU Scrub Room',
          baseNSF: 60,
          calculateQuantity: (inputs) => inputs.has_vmu ? 1 : 0
        }
      ]
    },

    // =========================================================================
    // FA 10: VMU IMAGING / BEHAVIORAL STUDY AREA
    // =========================================================================
    {
      id: 'FA10',
      name: 'VMU Imaging / Behavioral Study Area',
      rooms: [
        {
          code: 'SC771',
          name: 'VMU Imaging Room',
          baseNSF: 200,
          calculateQuantity: (inputs) => inputs.has_vmu ? 1 : 0
        },
        {
          code: 'SC772',
          name: 'VMU Behavioral Study Room',
          baseNSF: 165,
          calculateQuantity: (inputs) => inputs.has_vmu ? 1 : 0
        }
      ]
    },

    // =========================================================================
    // FA 11: VMU ANIMAL AREA
    // =========================================================================
    {
      id: 'FA11',
      name: 'VMU Animal Area',
      rooms: [
        {
          code: 'SC781',
          name: 'VMU Small Animal Holding Room',
          baseNSF: 200,
          calculateQuantity: (inputs) => inputs.vmu_small_animal_rooms || 0
        },
        {
          code: 'SC782',
          name: 'VMU Large Animal Holding Room',
          baseNSF: 400,
          calculateQuantity: (inputs) => inputs.vmu_large_animal_rooms || 0
        }
      ]
    },

    // =========================================================================
    // FA 12: VMU CAGEWASH AREA
    // =========================================================================
    {
      id: 'FA12',
      name: 'VMU Cagewash Area',
      rooms: [
        {
          code: 'SC791',
          name: 'VMU Cage Wash Room',
          baseNSF: 400,
          calculateQuantity: (inputs) => inputs.has_vmu ? 1 : 0
        },
        {
          code: 'SC792',
          name: 'VMU Cage Storage Room',
          baseNSF: 200,
          calculateQuantity: (inputs) => inputs.has_vmu ? 1 : 0
        }
      ]
    },

    // =========================================================================
    // FA 13: VMU SUPPORT AREA
    // =========================================================================
    {
      id: 'FA13',
      name: 'VMU Support Area',
      rooms: [
        {
          code: 'SC801',
          name: 'VMU Food Storage Room',
          baseNSF: 100,
          calculateQuantity: (inputs) => inputs.has_vmu ? 1 : 0
        },
        {
          code: 'SC802',
          name: 'VMU Bedding Storage Room',
          baseNSF: 100,
          calculateQuantity: (inputs) => inputs.has_vmu ? 1 : 0
        },
        {
          code: 'SB244',
          name: 'VMU Housekeeping Aides Closet',
          baseNSF: 60,
          calculateQuantity: (inputs) => inputs.has_vmu ? 1 : 0
        }
      ]
    },

    // =========================================================================
    // FA 14: VMU STAFF AREA
    // =========================================================================
    {
      id: 'FA14',
      name: 'VMU Staff Area',
      rooms: [
        {
          code: 'SS204',
          name: 'VMU Veterinarian Office',
          baseNSF: 100,
          calculateQuantity: (inputs) => inputs.has_vmu ? 1 : 0
        },
        {
          code: 'SS218',
          name: 'VMU Technician Workstation',
          baseNSF: 56,
          calculateQuantity: (inputs) => inputs.has_vmu ? 4 : 0
        },
        {
          code: 'SS251',
          name: 'VMU Locker Room',
          baseNSF: 120,
          calculateQuantity: (inputs) => inputs.has_vmu ? 1 : 0
        }
      ]
    },

    // =========================================================================
    // FA 15: R&D NON-PROFIT (N-P) STAFF AREA
    // =========================================================================
    {
      id: 'FA15',
      name: 'R&D Non-Profit (N-P) Staff Area',
      rooms: [
        {
          code: 'SS204',
          name: 'N-P Director Office',
          baseNSF: 100,
          calculateQuantity: (inputs) => inputs.has_nonprofit ? 1 : 0
        },
        {
          code: 'SS218',
          name: 'N-P Staff Workstation',
          baseNSF: 56,
          calculateQuantity: (inputs) => {
            if (!inputs.has_nonprofit) return 0;
            const size = inputs.nonprofit_size || 1;
            if (size === 1) return 4;
            if (size === 2) return 8;
            return 12;
          }
        },
        {
          code: 'SS285',
          name: 'N-P Huddle Room',
          baseNSF: 120,
          calculateQuantity: (inputs) => inputs.has_nonprofit ? 1 : 0
        }
      ]
    },

    // =========================================================================
    // FA 16: R&D STAFF AND ADMINISTRATIVE AREA
    // =========================================================================
    {
      id: 'FA16',
      name: 'R&D Staff and Administrative Area',
      rooms: [
        {
          code: 'SS201',
          name: 'R&D Associate Chief of Staff (ACOS) Office',
          baseNSF: 150,
          calculateQuantity: (inputs) => inputs.num_pis_blrd >= 1 ? 1 : 0
        },
        {
          code: 'SS204',
          name: 'R&D Administrative Officer (AO) Office',
          baseNSF: 100,
          calculateQuantity: (inputs) => inputs.num_pis_blrd >= 1 ? 1 : 0
        },
        {
          code: 'SS218',
          name: 'R&D Administrative Workstation',
          baseNSF: 56,
          calculateQuantity: (inputs) => {
            const pis = inputs.num_pis_blrd || 0;
            if (pis < 1) return 0;
            if (pis <= 30) return 2;
            if (pis <= 60) return 3;
            return 4;
          }
        },
        {
          code: 'SS287',
          name: 'R&D Conference Room',
          baseNSF: 300,
          calculateQuantity: (inputs) => inputs.num_pis_blrd >= 1 ? 1 : 0,
          calculateNSF: (inputs) => {
            const pis = inputs.num_pis_blrd || 0;
            if (pis >= 61) return 450;
            if (pis >= 31) return 375;
            return 300;
          }
        }
      ]
    },

    // =========================================================================
    // FA 17: R&D SUPPORT AREA
    // =========================================================================
    {
      id: 'FA17',
      name: 'R&D Support Area',
      rooms: [
        {
          code: 'SS241',
          name: 'R&D Staff Lounge / Break Room',
          baseNSF: 150,
          calculateQuantity: (inputs) => inputs.num_pis_blrd >= 1 ? 1 : 0,
          calculateNSF: (inputs) => {
            const pis = inputs.num_pis_blrd || 0;
            if (pis >= 61) return 250;
            if (pis >= 31) return 200;
            return 150;
          }
        },
        {
          code: 'SB003',
          name: 'R&D Multiuse Toilet Room (Male)',
          baseNSF: 65,
          calculateQuantity: (inputs) => inputs.num_pis_blrd >= 1 ? 1 : 0
        },
        {
          code: 'SB004',
          name: 'R&D Multiuse Toilet Room (Female)',
          baseNSF: 65,
          calculateQuantity: (inputs) => inputs.num_pis_blrd >= 1 ? 1 : 0
        },
        {
          code: 'SB244',
          name: 'R&D Housekeeping Aides Closet',
          baseNSF: 60,
          calculateQuantity: (inputs) => inputs.num_pis_blrd >= 1 ? 1 : 0
        },
        {
          code: 'SS214',
          name: 'R&D Copy / Print / Mail Room',
          baseNSF: 100,
          calculateQuantity: (inputs) => inputs.num_pis_blrd >= 1 ? 1 : 0
        },
        {
          code: 'SS231',
          name: 'R&D General Storage Room',
          baseNSF: 100,
          calculateQuantity: (inputs) => inputs.num_pis_blrd >= 1 ? 1 : 0
        }
      ]
    }
  ],

  // Calculate total NSF for the chapter
  calculateTotalNSF(inputs) {
    let totalNSF = 0;
    
    for (const fa of this.functionalAreas) {
      for (const room of fa.rooms) {
        const qty = room.calculateQuantity ? room.calculateQuantity(inputs) : 1;
        const nsf = room.calculateNSF ? room.calculateNSF(inputs) : room.baseNSF;
        totalNSF += qty * nsf;
      }
    }
    
    return totalNSF;
  },

  // Calculate DGSF (with DNTG factor)
  calculateDGSF(inputs) {
    return Math.round(this.calculateTotalNSF(inputs) * this.ntdgFactor);
  }
};

export default CHAPTER_278;
