export const CHAPTER_248 = {
  id: '248',
  name: 'Medical Media Service',
  
  inputs: [
    {
      id: 'isMMSAuthorized',
      label: 'Is Medical Media Service (MMS) authorized?',
      type: 'boolean',
      default: false
    },
    {
      id: 'mmsPhotographerFTE',
      label: 'How many MMS Photographer FTEs are authorized?',
      type: 'number',
      min: 0,
      max: 10,
      default: 0,
      displayCondition: 'isMMSAuthorized'
    },
    {
      id: 'mmsIllustratorFTE',
      label: 'How many MMS Illustrator FTEs are authorized?',
      type: 'number',
      min: 0,
      max: 10,
      default: 0,
      displayCondition: 'isMMSAuthorized'
    },
    {
      id: 'mmsAVSpecialistFTE',
      label: 'How many MMS Audiovisual Specialist FTEs are authorized?',
      type: 'number',
      min: 0,
      max: 10,
      default: 0,
      displayCondition: 'isMMSAuthorized'
    },
    {
      id: 'mmsCopyCenterTechFTE',
      label: 'How many MMS Copy Center Technician FTEs are authorized?',
      type: 'number',
      min: 0,
      max: 10,
      default: 0,
      displayCondition: 'isMMSAuthorized'
    },
    {
      id: 'isMMECAuthorized',
      label: 'Is Medical Media Production Service (MMEC) authorized?',
      type: 'boolean',
      default: false
    },
    {
      id: 'mmecPhotographerFTE',
      label: 'How many MMEC Photographer FTEs are authorized?',
      type: 'number',
      min: 0,
      max: 10,
      default: 0,
      displayCondition: 'isMMECAuthorized'
    },
    {
      id: 'mmecIllustratorFTE',
      label: 'How many MMEC Illustrator FTEs are authorized?',
      type: 'number',
      min: 0,
      max: 10,
      default: 0,
      displayCondition: 'isMMECAuthorized'
    },
    {
      id: 'mmecAVSpecialistFTE',
      label: 'How many MMEC Audiovisual Specialist FTEs are authorized?',
      type: 'number',
      min: 0,
      max: 10,
      default: 0,
      displayCondition: 'isMMECAuthorized'
    },
    {
      id: 'mmecCopyCenterTechFTE',
      label: 'How many MMEC Copy Center Technician FTEs are authorized?',
      type: 'number',
      min: 0,
      max: 10,
      default: 0,
      displayCondition: 'isMMECAuthorized'
    },
    {
      id: 'isMMVSSAuthorized',
      label: 'Is Medical Media Video Teleconferencing Support Services (MMVSS) authorized?',
      type: 'boolean',
      default: false
    },
    {
      id: 'mmvssClerkFTE',
      label: 'How many MMVSS Clerk FTEs are authorized?',
      type: 'number',
      min: 0,
      max: 10,
      default: 0,
      displayCondition: 'isMMVSSAuthorized'
    },
    {
      id: 'mmvssPhotographerFTE',
      label: 'How many MMVSS Photographer FTEs are authorized?',
      type: 'number',
      min: 0,
      max: 10,
      default: 0,
      displayCondition: 'isMMVSSAuthorized'
    },
    {
      id: 'mmvssIllustratorFTE',
      label: 'How many MMVSS Illustrator FTEs are authorized?',
      type: 'number',
      min: 0,
      max: 10,
      default: 0,
      displayCondition: 'isMMVSSAuthorized'
    },
    {
      id: 'mmvssAVSpecialistFTE',
      label: 'How many MMVSS Audiovisual Specialist FTEs are authorized?',
      type: 'number',
      min: 0,
      max: 10,
      default: 0,
      displayCondition: 'isMMVSSAuthorized'
    },
  ],
  
  functionalAreas: [
    {
      name: 'FA 1: RECEPTION AND ADMINISTRATION AREA',
      rooms: [
        {
          name: 'MMS Chief Office, Stff Sprt',
          code: 'SS204',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.isMMSAuthorized || inputs.isMMECAuthorized) return { roomCount: 1, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'MMS Secretary Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.isMMSAuthorized || inputs.isMMECAuthorized) return { roomCount: 1, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'MMS Visitor Waiting, Bldg Sprt',
          code: 'SB003',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.isMMSAuthorized || inputs.isMMECAuthorized) return { roomCount: 1, nsf: 80 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'MMS Files / Records Storage, Stff Sprt',
          code: 'SS272',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.isMMSAuthorized || inputs.isMMECAuthorized) return { roomCount: 1, nsf: 80 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'MMS Staff Conference Room, Educ Svc',
          code: 'SS101',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.isMMSAuthorized || inputs.isMMECAuthorized) return { roomCount: 1, nsf: 250 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'MMS Staff Breakroom, Stff Sprt',
          code: 'SS262',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.isMMSAuthorized || inputs.isMMECAuthorized) return { roomCount: 1, nsf: 120 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'MMS Staff Toilet, Bldg Sprt',
          code: 'SB191',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.isMMSAuthorized || inputs.isMMECAuthorized) return { roomCount: 1, nsf: 60 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 2: PHOTOGRAPHY SERVICE PRODUCTION AREA',
      rooms: [
        {
          name: 'MMS Photographer Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                let count = 0;
                if (inputs.isMMSAuthorized) count += (inputs.mmsPhotographerFTE || 0);
                if (inputs.isMMECAuthorized) count += (inputs.mmecPhotographerFTE || 0);
                return { roomCount: Math.ceil(count), nsf: 56 };
              },
            },
          ],
        },
        {
          name: 'MMS Photography Studio, Med Media',
          code: 'SM111',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.isMMSAuthorized || inputs.isMMECAuthorized) return { roomCount: 1, nsf: 450 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'MMS Patient Dressing Room, Clncl Sprt',
          code: 'SC243',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.isMMSAuthorized || inputs.isMMECAuthorized) return { roomCount: 1, nsf: 60 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'MMS Darkroom, Med Media',
          code: 'SM121',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.isMMSAuthorized || inputs.isMMECAuthorized) return { roomCount: 1, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'MMS Finishing Area, Med Media',
          code: 'SM131',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.isMMSAuthorized || inputs.isMMECAuthorized) return { roomCount: 1, nsf: 120 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'MMS Negative Files Storage, Med Media',
          code: 'SM141',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.isMMSAuthorized || inputs.isMMECAuthorized) return { roomCount: 1, nsf: 80 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'MMS Chemical Storage, Lgstcs Svc',
          code: 'SB734',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.isMMSAuthorized || inputs.isMMECAuthorized) return { roomCount: 1, nsf: 40 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 3: ILLUSTRATION SERVICE PRODUCTION AREA',
      rooms: [
        {
          name: 'MMS Illustrator Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                let count = 0;
                if (inputs.isMMSAuthorized) count += (inputs.mmsIllustratorFTE || 0);
                if (inputs.isMMECAuthorized) count += (inputs.mmecIllustratorFTE || 0);
                return { roomCount: Math.ceil(count), nsf: 56 };
              },
            },
          ],
        },
        {
          name: 'MMS Illustration Workroom, Med Media',
          code: 'SM211',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.isMMSAuthorized || inputs.isMMECAuthorized) return { roomCount: 1, nsf: 200 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'MMS Spray Booth, Med Media',
          code: 'SM221',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.isMMSAuthorized || inputs.isMMECAuthorized) return { roomCount: 1, nsf: 60 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 4: AUDIOVISUAL SERVICE PRODUCTION AREA',
      rooms: [
        {
          name: 'MMS AV Specialist Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                let count = 0;
                if (inputs.isMMSAuthorized) count += (inputs.mmsAVSpecialistFTE || 0);
                if (inputs.isMMECAuthorized) count += (inputs.mmecAVSpecialistFTE || 0);
                return { roomCount: Math.ceil(count), nsf: 56 };
              },
            },
          ],
        },
        {
          name: 'MMS AV Equipment Storage, Lgstcs Svc',
          code: 'SB744',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.isMMSAuthorized || inputs.isMMECAuthorized) return { roomCount: 1, nsf: 150 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'MMS Preview Room, Med Media',
          code: 'SM311',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.isMMSAuthorized || inputs.isMMECAuthorized) return { roomCount: 1, nsf: 200 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'MMS Editing Room, Med Media',
          code: 'SM321',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.isMMSAuthorized || inputs.isMMECAuthorized) return { roomCount: 1, nsf: 120 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'MMS Audio Recording Booth, Med Media',
          code: 'SM331',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.isMMSAuthorized || inputs.isMMECAuthorized) return { roomCount: 1, nsf: 80 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 5: CENTRAL COPY CENTER SERVICE PRODUCTION AREA',
      rooms: [
        {
          name: 'MMS Copy Center Technician Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                let count = 0;
                if (inputs.isMMSAuthorized) count += (inputs.mmsCopyCenterTechFTE || 0);
                if (inputs.isMMECAuthorized) count += (inputs.mmecCopyCenterTechFTE || 0);
                return { roomCount: Math.ceil(count), nsf: 56 };
              },
            },
          ],
        },
        {
          name: 'MMS Copy Center, Med Media',
          code: 'SM411',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.isMMSAuthorized || inputs.isMMECAuthorized) return { roomCount: 1, nsf: 300 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'MMS Paper Storage, Lgstcs Svc',
          code: 'SB745',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.isMMSAuthorized || inputs.isMMECAuthorized) return { roomCount: 1, nsf: 100 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 6: SUPPORT AREA',
      rooms: [
        {
          name: 'MMS Housekeeping Aides Closet (HAC), Bldg Sprt',
          code: 'SB135',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.isMMSAuthorized || inputs.isMMECAuthorized) return { roomCount: 1, nsf: 60 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 7: MMVSS RECEPTION AND ADMINISTRATION AREA',
      rooms: [
        {
          name: 'MMVSS Reception, Stff Sprt',
          code: 'SS221',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.isMMVSSAuthorized) return { roomCount: 1, nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'MMVSS Clerk Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.isMMVSSAuthorized) return { roomCount: Math.ceil(inputs.mmvssClerkFTE || 0), nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'MMVSS Visitor Waiting, Bldg Sprt',
          code: 'SB003',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.isMMVSSAuthorized) return { roomCount: 1, nsf: 80 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 8: MMVSS PHOTOGRAPHY PRODUCTION AREA',
      rooms: [
        {
          name: 'MMVSS Photographer Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.isMMVSSAuthorized) return { roomCount: Math.ceil(inputs.mmvssPhotographerFTE || 0), nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
        {
          name: 'MMVSS Photography Studio, Med Media',
          code: 'SM111',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.isMMVSSAuthorized) return { roomCount: 1, nsf: 250 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 9: MMVSS ILLUSTRATION SERVICE PRODUCTION AREA',
      rooms: [
        {
          name: 'MMVSS Illustrator Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.isMMVSSAuthorized) return { roomCount: Math.ceil(inputs.mmvssIllustratorFTE || 0), nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
    {
      name: 'FA 10: MMVSS AUDIOVISUAL SERVICE PRODUCTION AREA',
      rooms: [
        {
          name: 'MMVSS AV Specialist Workstation, Stff Sprt',
          code: 'SS218',
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.isMMVSSAuthorized) return { roomCount: Math.ceil(inputs.mmvssAVSpecialistFTE || 0), nsf: 56 };
                return { roomCount: 0, nsf: 0 };
              },
            },
          ],
        },
      ],
    },
  ],
};
