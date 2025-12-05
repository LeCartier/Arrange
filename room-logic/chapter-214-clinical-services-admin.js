// Chapter 214: Clinical Services Administration
// Based on PG-18-9 Space Planning Criteria
// Administrative offices for 10 different clinical services
// SPCM: 10 ranges (one per service)
// NTDG Factor: 1.30

export const CHAPTER_214 = {
  id: '214',
  name: 'Clinical Services Administration',
  ntdgFactor: 1.30,
  
  inputs: [
    {
      id: 'medical_service',
      label: 'Is Medical Service authorized?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'hospital_medicine',
      label: 'Is Hospital Medicine authorized?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'endocrinology',
      label: 'Is Endocrinology Medicine authorized?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'rheumatology',
      label: 'Is Rheumatology Medicine authorized?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'infectious_disease',
      label: 'Is Infectious Disease authorized?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'homeless_cwt',
      label: 'Is Homeless / Compensated Work Therapy (CWT) authorized?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'neurology_service',
      label: 'Is Neurology Service authorized?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'dermatology_service',
      label: 'Is Dermatology Service authorized?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'geriatrics_hbpc',
      label: 'Is Geriatrics Home Based Primary Care (HBPC) authorized?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'oncology',
      label: 'Is Oncology authorized?',
      type: 'checkbox',
      default: false
    }
  ],

  functionalAreas: [
    // FA1: Medical Service Area
    {
      id: 'fa1',
      name: 'Medical Service Area',
      calculate: (inputs) => {
        if (!inputs.medical_service) return [];
        
        return [
          {
            name: 'Medical Service Patient Interview Room',
            code: 'SC174',
            nsf: 120,
            quantity: 4
          },
          {
            name: 'Medical Service Chief Office',
            code: 'SS204',
            nsf: 100,
            quantity: 1
          },
          {
            name: 'Medical Service Assistant Chief Office',
            code: 'SS204',
            nsf: 100,
            quantity: 1
          },
          {
            name: 'Medical Service Administrative Officer (AO) Office',
            code: 'SS204',
            nsf: 100,
            quantity: 1
          },
          {
            name: 'Medical Service Administration Support Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: 1
          },
          {
            name: 'Medical Service Clerical Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: 1
          },
          {
            name: 'Medical Service Staff Physician Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: 2
          },
          {
            name: 'Medical Service Resident Workstation',
            code: 'SS217',
            nsf: 48,
            quantity: 3
          },
          {
            name: 'Medical Service Staff Toilet',
            code: 'SB191',
            nsf: 60,
            quantity: 1
          },
          {
            name: 'Medical Service Storage Room',
            code: 'SB746',
            nsf: 80,
            quantity: 1
          }
        ];
      }
    },
    
    // FA2: Hospital Medicine Area
    {
      id: 'fa2',
      name: 'Hospital Medicine Area',
      calculate: (inputs) => {
        if (!inputs.hospital_medicine) return [];
        
        return [
          {
            name: 'Hospital Medicine Patient Interview Room',
            code: 'SC174',
            nsf: 120,
            quantity: 4
          },
          {
            name: 'Hospital Medicine Service Chief Office',
            code: 'SS204',
            nsf: 100,
            quantity: 1
          },
          {
            name: 'Hospital Medicine Assistant Chief Office',
            code: 'SS204',
            nsf: 100,
            quantity: 1
          },
          {
            name: 'Hospital Medicine Administrative Officer (AO) Office',
            code: 'SS204',
            nsf: 100,
            quantity: 1
          },
          {
            name: 'Hospital Medicine Administration Support Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: 1
          },
          {
            name: 'Hospital Medicine Clerical Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: 1
          },
          {
            name: 'Hospital Medicine Staff Physician Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: 2
          },
          {
            name: 'Hospital Medicine Resident Workstation',
            code: 'SS217',
            nsf: 48,
            quantity: 3
          },
          {
            name: 'Hospital Medicine Staff Toilet',
            code: 'SB191',
            nsf: 60,
            quantity: 1
          },
          {
            name: 'Hospital Medicine Storage Room',
            code: 'SB746',
            nsf: 80,
            quantity: 1
          }
        ];
      }
    },
    
    // FA3: Endocrinology Area
    {
      id: 'fa3',
      name: 'Endocrinology Area',
      calculate: (inputs) => {
        if (!inputs.endocrinology) return [];
        
        return [
          {
            name: 'Endocrinology Medicine Patient Interview Room',
            code: 'SC174',
            nsf: 120,
            quantity: 4
          },
          {
            name: 'Endocrinology Medicine Service Chief Office',
            code: 'SS204',
            nsf: 100,
            quantity: 1
          },
          {
            name: 'Endocrinology Medicine Assistant Chief Office',
            code: 'SS204',
            nsf: 100,
            quantity: 1
          },
          {
            name: 'Endocrinology Medicine Administration Support Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: 1
          },
          {
            name: 'Endocrinology Medicine Clerical Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: 1
          },
          {
            name: 'Endocrinology Medicine Staff Physician Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: 2
          },
          {
            name: 'Endocrinology Medicine Resident Workstation',
            code: 'SS217',
            nsf: 48,
            quantity: 3
          },
          {
            name: 'Endocrinology Medicine Staff Toilet',
            code: 'SB191',
            nsf: 60,
            quantity: 1
          },
          {
            name: 'Endocrinology Medicine Storage Room',
            code: 'SB746',
            nsf: 80,
            quantity: 1
          }
        ];
      }
    },
    
    // FA4: Rheumatology Area
    {
      id: 'fa4',
      name: 'Rheumatology Area',
      calculate: (inputs) => {
        if (!inputs.rheumatology) return [];
        
        return [
          {
            name: 'Rheumatology Medicine Patient Interview Room',
            code: 'SC174',
            nsf: 120,
            quantity: 4
          },
          {
            name: 'Rheumatology Medicine Service Chief Office',
            code: 'SS204',
            nsf: 100,
            quantity: 1
          },
          {
            name: 'Rheumatology Medicine Assistant Chief Office',
            code: 'SS204',
            nsf: 100,
            quantity: 1
          },
          {
            name: 'Rheumatology Medicine Administration Support Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: 1
          },
          {
            name: 'Rheumatology Medicine Clerical Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: 1
          },
          {
            name: 'Rheumatology Medicine Staff Physician Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: 2
          },
          {
            name: 'Rheumatology Medicine Resident Workstation',
            code: 'SS217',
            nsf: 48,
            quantity: 3
          },
          {
            name: 'Rheumatology Medicine Staff Toilet',
            code: 'SB191',
            nsf: 60,
            quantity: 1
          },
          {
            name: 'Rheumatology Medicine Storage Room',
            code: 'SB746',
            nsf: 80,
            quantity: 1
          }
        ];
      }
    },
    
    // FA5: Infectious Diseases Area
    {
      id: 'fa5',
      name: 'Infectious Diseases Area',
      calculate: (inputs) => {
        if (!inputs.infectious_disease) return [];
        
        return [
          {
            name: 'Infectious Diseases Patient Interview Room',
            code: 'SC174',
            nsf: 120,
            quantity: 4
          },
          {
            name: 'Infectious Diseases Service Chief Office',
            code: 'SS204',
            nsf: 100,
            quantity: 1
          },
          {
            name: 'Infectious Diseases Assistant Chief Office',
            code: 'SS204',
            nsf: 100,
            quantity: 1
          },
          {
            name: 'Infectious Diseases Administration Support Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: 1
          },
          {
            name: 'Infectious Diseases Clerical Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: 1
          },
          {
            name: 'Infectious Diseases Staff Physician Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: 2
          },
          {
            name: 'Infectious Diseases Resident Workstation',
            code: 'SS217',
            nsf: 48,
            quantity: 3
          },
          {
            name: 'Infectious Diseases Staff Toilet',
            code: 'SB191',
            nsf: 60,
            quantity: 1
          },
          {
            name: 'Infectious Diseases Storage Room',
            code: 'SB746',
            nsf: 80,
            quantity: 1
          }
        ];
      }
    },
    
    // FA6: Homeless / CWT Area
    {
      id: 'fa6',
      name: 'Homeless / Compensated Work Therapy (CWT) Area',
      calculate: (inputs) => {
        if (!inputs.homeless_cwt) return [];
        
        return [
          {
            name: 'Homeless / CWT Patient Interview Room',
            code: 'SC174',
            nsf: 120,
            quantity: 4
          },
          {
            name: 'Homeless / CWT Service Chief Office',
            code: 'SS204',
            nsf: 100,
            quantity: 1
          },
          {
            name: 'Homeless / CWT Assistant Chief Office',
            code: 'SS204',
            nsf: 100,
            quantity: 1
          },
          {
            name: 'Homeless / CWT Administration Support Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: 1
          },
          {
            name: 'Homeless / CWT Clerical Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: 1
          },
          {
            name: 'Homeless / CWT Staff Physician Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: 2
          },
          {
            name: 'Homeless / CWT Resident Workstation',
            code: 'SS217',
            nsf: 48,
            quantity: 3
          },
          {
            name: 'Homeless / CWT Staff Toilet',
            code: 'SB191',
            nsf: 60,
            quantity: 1
          },
          {
            name: 'Homeless / CWT Storage Room',
            code: 'SB746',
            nsf: 80,
            quantity: 1
          }
        ];
      }
    },
    
    // FA7: Neurology Service Area
    {
      id: 'fa7',
      name: 'Neurology Service Area',
      calculate: (inputs) => {
        if (!inputs.neurology_service) return [];
        
        return [
          {
            name: 'Neurology Service Patient Interview Room',
            code: 'SC174',
            nsf: 120,
            quantity: 4
          },
          {
            name: 'Neurology Service Chief Office',
            code: 'SS204',
            nsf: 100,
            quantity: 1
          },
          {
            name: 'Neurology Service Assistant Chief Office',
            code: 'SS204',
            nsf: 100,
            quantity: 1
          },
          {
            name: 'Neurology Service Administration Support Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: 1
          },
          {
            name: 'Neurology Service Clerical Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: 1
          },
          {
            name: 'Neurology Service Staff Physician Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: 2
          },
          {
            name: 'Neurology Service Resident Workstation',
            code: 'SS217',
            nsf: 48,
            quantity: 3
          },
          {
            name: 'Neurology Service Staff Toilet',
            code: 'SB191',
            nsf: 60,
            quantity: 1
          },
          {
            name: 'Neurology Service Storage Room',
            code: 'SB746',
            nsf: 80,
            quantity: 1
          }
        ];
      }
    },
    
    // FA8: Dermatology Service Area
    {
      id: 'fa8',
      name: 'Dermatology Service Area',
      calculate: (inputs) => {
        if (!inputs.dermatology_service) return [];
        
        return [
          {
            name: 'Dermatology Service Patient Interview Room',
            code: 'SC174',
            nsf: 120,
            quantity: 4
          },
          {
            name: 'Dermatology Service Chief Office',
            code: 'SS204',
            nsf: 100,
            quantity: 1
          },
          {
            name: 'Dermatology Service Assistant Chief Office',
            code: 'SS204',
            nsf: 100,
            quantity: 1
          },
          {
            name: 'Dermatology Service Administration Support Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: 1
          },
          {
            name: 'Dermatology Service Clerical Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: 1
          },
          {
            name: 'Dermatology Service Staff Physician Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: 2
          },
          {
            name: 'Dermatology Service Resident Workstation',
            code: 'SS217',
            nsf: 48,
            quantity: 3
          },
          {
            name: 'Dermatology Service Staff Toilet',
            code: 'SB191',
            nsf: 60,
            quantity: 1
          },
          {
            name: 'Dermatology Service Storage Room',
            code: 'SB746',
            nsf: 80,
            quantity: 1
          }
        ];
      }
    },
    
    // FA9: Geriatrics HBPC Area
    {
      id: 'fa9',
      name: 'Geriatrics Home Based Primary Care (HBPC) Area',
      calculate: (inputs) => {
        if (!inputs.geriatrics_hbpc) return [];
        
        return [
          {
            name: 'Geriatrics HBPC Service Patient Interview Room',
            code: 'SC174',
            nsf: 120,
            quantity: 4
          },
          {
            name: 'Geriatrics HBPC Service Chief Office',
            code: 'SS204',
            nsf: 100,
            quantity: 1
          },
          {
            name: 'Geriatrics HBPC Service Assistant Chief Office',
            code: 'SS204',
            nsf: 100,
            quantity: 1
          },
          {
            name: 'Geriatrics HBPC Service Administration Support Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: 1
          },
          {
            name: 'Geriatrics HBPC Service Clerical Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: 1
          },
          {
            name: 'Geriatrics HBPC Service Staff Physician Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: 2
          },
          {
            name: 'Geriatrics HBPC Service Resident Workstation',
            code: 'SS217',
            nsf: 48,
            quantity: 3
          },
          {
            name: 'Geriatrics HBPC Service Staff Toilet',
            code: 'SB191',
            nsf: 60,
            quantity: 1
          },
          {
            name: 'Geriatrics HBPC Service Storage Room',
            code: 'SB746',
            nsf: 80,
            quantity: 1
          }
        ];
      }
    },
    
    // FA10: Oncology Service Area
    {
      id: 'fa10',
      name: 'Oncology Service Area',
      calculate: (inputs) => {
        if (!inputs.oncology) return [];
        
        return [
          {
            name: 'Oncology Service Patient Interview Room',
            code: 'SC174',
            nsf: 120,
            quantity: 4
          },
          {
            name: 'Oncology Service Chief Office',
            code: 'SS204',
            nsf: 100,
            quantity: 1
          },
          {
            name: 'Oncology Service Assistant Chief Office',
            code: 'SS204',
            nsf: 100,
            quantity: 1
          },
          {
            name: 'Oncology Service Administration Support Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: 1
          },
          {
            name: 'Oncology Service Clerical Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: 1
          },
          {
            name: 'Oncology Service Staff Physician Workstation',
            code: 'SS218',
            nsf: 56,
            quantity: 2
          },
          {
            name: 'Oncology Service Resident Workstation',
            code: 'SS217',
            nsf: 48,
            quantity: 3
          },
          {
            name: 'Oncology Service Staff Toilet',
            code: 'SB191',
            nsf: 60,
            quantity: 1
          },
          {
            name: 'Oncology Service Storage Room',
            code: 'SB746',
            nsf: 80,
            quantity: 1
          }
        ];
      }
    }
  ]
};
