export const CHAPTER_246 = {
  id: '246',
  name: 'Health Administration Service',
  
  inputs: [
    {
      id: 'totalFTE',
      label: 'How many FTE positions in total are authorized for this facility?',
      type: 'number',
      min: 1,
      max: 4000,
      default: 1000
    },
    {
      id: 'isCRUAuthorized',
      label: 'Is Health Benefits Section: Centralized Registration Unit (CRU) authorized?',
      type: 'boolean',
      default: false
    },
    {
      id: 'isOutpatientRegistrationAuthorized',
      label: 'Is Health Benefits Section: Outpatient Registration authorized?',
      type: 'boolean',
      default: false
    },
    {
      id: 'isHIMSAuthorized',
      label: 'Is Health Information Management Section (HIMS) authorized?',
      type: 'boolean',
      default: false
    },
    {
      id: 'isWASAuthorized',
      label: 'Is Ward Administration Section (WAS) authorized?',
      type: 'boolean',
      default: false
    },
    {
      id: 'isFeeServicesAuthorized',
      label: 'Is Fee Services (FS) Section authorized?',
      type: 'boolean',
      default: false
    }
  ],
  
  functionalAreas: [
    {
      name: 'FA 1: OFFICE OF THE CHIEF',
      rooms: [
        {
          name: 'HAS Director Office, Stff Sprt',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 4000) return { roomCount: 1, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS Health Benefits Chief Office, Stff Sprt',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 4000) return { roomCount: 1, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS Visitor Waiting, Bldg Sprt',
          code: 'SB003',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 4000) return { roomCount: 1, nsf: 80 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS Administration Support Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 1, nsf: 56 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 2, nsf: 56 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 3, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS Medical Administrative Assistant Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 1, nsf: 56 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 2, nsf: 56 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 3, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS Program Application Specialist (PAC) Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 2, nsf: 56 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 4, nsf: 56 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 6, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS Workroom, Stff Sprt',
          code: 'SS296',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 1, nsf: 80 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 1, nsf: 100 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 1, nsf: 120 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS Staff Conference Room, Educ Svc',
          code: 'SS101',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 1, nsf: 240 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 1, nsf: 300 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 1, nsf: 500 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS Staff Toilet, Bldg Sprt',
          code: 'SB191',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 4000) return { roomCount: 2, nsf: 60 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 2: HEALTH BENEFITS SECTION: CENTRALIZED REGISTRATION UNIT (CRU)',
      rooms: [
        {
          name: 'HAS CRU Visitor Waiting, Bldg Sprt',
          code: 'SB003',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isCRUAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 1, nsf: 130 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 1, nsf: 170 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 1, nsf: 215 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS CRU Reception, Stff Sprt',
          code: 'SS221',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isCRUAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 4000) return { roomCount: 1, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS CRU Health Benefits Supervisor Office, Stff Sprt',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isCRUAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 2, nsf: 100 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 4, nsf: 100 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 6, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS CRU Decedent Affairs Consult Room, Clncl Sprt',
          code: 'SC271',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isCRUAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 1, nsf: 120 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 2, nsf: 120 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 3, nsf: 120 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS CRU MCCR Section Clerk Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isCRUAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 2, nsf: 56 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 3, nsf: 56 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 4, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS CRU Eligibility Clerk Office, Stff Sprt',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isCRUAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 2, nsf: 100 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 4, nsf: 100 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 6, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS CRU Eligibility Interview Room, Clncl Sprt',
          code: 'SC174',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isCRUAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 1, nsf: 120 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 4000) return { roomCount: 2, nsf: 120 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS CRU Veteran Identification Card (VIC) Issue Workstation, Stff Sprt',
          code: 'SS219',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isCRUAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 1, nsf: 64 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 4000) return { roomCount: 2, nsf: 64 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS CRU Release of Information Clerk Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isCRUAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 2, nsf: 56 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 3, nsf: 56 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 4, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS CRU Program Support Clerk Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isCRUAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 2, nsf: 56 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 3, nsf: 56 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 4, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS CRU Bed Control Clerk Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isCRUAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 1, nsf: 56 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 2, nsf: 56 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 3, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS CRU Medical / Patient Support Assistant Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isCRUAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 2, nsf: 56 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 3, nsf: 56 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 4, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS CRU Lead Patient Services Assistant Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isCRUAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 1, nsf: 56 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 2, nsf: 56 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 3, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS CRU Patient Personal Belongings Storage Room, Lgstcs Svc',
          code: 'SB711',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isCRUAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 1, nsf: 240 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 1, nsf: 320 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 1, nsf: 400 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS CRU Outpatient Transfer Clerk Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isCRUAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 2, nsf: 56 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 3, nsf: 56 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 4, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS CRU Inpatient Transfer Clerk Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isCRUAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 1, nsf: 56 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 2, nsf: 56 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 3, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS CRU Supplemental Equipment Storage Room, Lgstcs Svc',
          code: 'SB776',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isCRUAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 1, nsf: 120 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 1, nsf: 180 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 1, nsf: 240 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 3: HEALTH BENEFITS SECTION: OUTPATIENT REGISTRATION',
      rooms: [
        {
          name: 'HAS OP Registration Supervisor Office, Stff Sprt',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isOutpatientRegistrationAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 2, nsf: 100 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 3, nsf: 100 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 4, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 4: HEALTH INFORMATION MANAGEMENT SECTION (HIMS)',
      rooms: [
        {
          name: 'HAS HIMS Chief Office, Stff Sprt',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isHIMSAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 4000) return { roomCount: 1, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS HIMS Benefits Chief Office, Stff Sprt',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isHIMSAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 2, nsf: 100 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 3, nsf: 100 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 4, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS HIMS File Room Supervisor Office, Stff Sprt',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isHIMSAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 1, nsf: 100 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 2, nsf: 100 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 3, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS HIMS Billing Clerk Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isHIMSAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 1, nsf: 56 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 2, nsf: 56 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 3, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS HIMS Coding Unit Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isHIMSAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 2, nsf: 56 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 3, nsf: 56 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 4, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS HIMS Tumor Registry Office, Stff Sprt',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isHIMSAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 4000) return { roomCount: 1, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS HIMS QA Technician Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isHIMSAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 1, nsf: 56 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 2, nsf: 56 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 3, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS HIMS Release of Information Clerk Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isHIMSAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 1, nsf: 56 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 2, nsf: 56 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 3, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS HIMS Transcription Coordinator Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isHIMSAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 1, nsf: 56 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 2, nsf: 56 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 3, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS HIMS Transcriptionist Health Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isHIMSAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 1, nsf: 56 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 2, nsf: 56 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 3, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS HIMS Transcription Equipment Storage Room, Lgstcs Svc',
          code: 'SB783',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isHIMSAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 4000) return { roomCount: 1, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS HIMS EPRP Technician Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isHIMSAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 1, nsf: 56 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 2, nsf: 56 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 3, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS HIMS Record Review Clerk Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isHIMSAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 1, nsf: 56 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 2, nsf: 56 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 3, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS HIMS Document Scanning Room, Stff Sprt',
          code: 'SS227',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isHIMSAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 4000) return { roomCount: 1, nsf: 80 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS HIMS Document Scanning Supply Room, Stff Sprt',
          code: 'SS228',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isHIMSAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 4000) return { roomCount: 1, nsf: 120 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS HIMS File Room, Clncl Sprt',
          code: 'SC176',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isHIMSAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 4000) return { roomCount: 1, nsf: 200 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 5: WARD ADMINISTRATION SECTION (WAS)',
      rooms: [
        {
          name: 'HAS WAS Supervisor Office, Stff Sprt',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isWASAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 4000) return { roomCount: 1, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS WAS Lead Clerk Office, Stff Sprt',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isWASAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 4000) return { roomCount: 1, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS WAS Ward Clerk Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isWASAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 1, nsf: 56 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 2, nsf: 56 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 3, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS WAS Alcove Storage, Lgstcs Svc',
          code: 'SB707',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isWASAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 4000) return { roomCount: 1, nsf: 20 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 6: FEE SERVICES (FS) SECTION',
      rooms: [
        {
          name: 'HAS FS Section Chief Office, Stff Sprt',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isFeeServicesAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 4000) return { roomCount: 1, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS FS Supervisor Office, Stff Sprt',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isFeeServicesAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 1, nsf: 100 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 2, nsf: 100 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 3, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS FS Reception, Stff Sprt',
          code: 'SS221',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isFeeServicesAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 4000) return { roomCount: 1, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS FS Administrative Support Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isFeeServicesAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 1, nsf: 56 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 2, nsf: 56 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 3, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS FS Interview Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isFeeServicesAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 2, nsf: 56 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 3, nsf: 56 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 4, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS FS Supplemental Equipment Storage Room, Lgstcs Svc',
          code: 'SB776',
          rules: [
            {
              calculate: (inputs) => {
                if (!inputs.isFeeServicesAuthorized) return { roomCount: 0, nsf: 0 };
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 1, nsf: 80 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 1, nsf: 100 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 1, nsf: 120 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 7: OFFICE OPERATIONS SECTION',
      rooms: [
        {
          name: 'HAS Mailroom, Lgstcs Svc',
          code: 'SB653',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 1, nsf: 250 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 1, nsf: 400 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 1, nsf: 550 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'HAS Telephone Switchboard Room, Bldg Sprt',
          code: 'SB275',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.totalFTE >= 1 && inputs.totalFTE <= 1000) return { roomCount: 1, nsf: 120 };
                if (inputs.totalFTE >= 1001 && inputs.totalFTE <= 3000) return { roomCount: 1, nsf: 180 };
                if (inputs.totalFTE >= 3001 && inputs.totalFTE <= 4000) return { roomCount: 1, nsf: 240 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
  ],
};
