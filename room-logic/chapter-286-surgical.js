
export const CHAPTER_286 = {
  chapter: 286,
  name: "Surgical / Endovascular Services",
  inputs: [
    { 
      id: "complexityLevel", 
      label: "Surgical Complexity Level", 
      type: "select", 
      options: [
        "IP Standard", 
        "IP Intermediate", 
        "IP Complex", 
        "ASC Basic", 
        "ASC Advanced"
      ],
      default: "IP Standard"
    },
    { id: "numGeneralORs", label: "Number of General ORs", type: "number", default: 2 },
    { id: "numUrologyORs", label: "Number of Urology/Cystoscopy ORs", type: "number", default: 0 },
    { id: "numOrthopedicORs", label: "Number of Orthopedic ORs", type: "number", default: 0 },
    { id: "numCardiovascularORs", label: "Number of Cardiovascular ORs", type: "number", default: 0 },
    { id: "numNeurosurgicalORs", label: "Number of Neurosurgical ORs", type: "number", default: 0 }
  ],
  functionalAreas: [
    {
      id: "FA1",
      name: "Surgical Suite",
      rooms: [
        {
          id: "OR_GEN",
          name: "General Operating Room",
          nsf: 650,
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.numGeneralORs };
              }
            }
          ]
        },
        {
          id: "OR_URO",
          name: "Urology / Cystoscopy Operating Room",
          nsf: 650,
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.numUrologyORs };
              }
            }
          ]
        },
        {
          id: "OR_ORTHO",
          name: "Orthopedic Operating Room",
          nsf: 700,
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.numOrthopedicORs };
              }
            }
          ]
        },
        {
          id: "OR_CV",
          name: "Cardiovascular Operating Room",
          nsf: 800,
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.numCardiovascularORs };
              }
            }
          ]
        },
        {
          id: "OR_NEURO",
          name: "Neurosurgical Operating Room",
          nsf: 750,
          rules: [
            {
              calculate: (inputs) => {
                return { roomCount: inputs.numNeurosurgicalORs };
              }
            }
          ]
        },
        {
          id: "PACU_BAY",
          name: "PACU / Phase I Recovery Bay",
          nsf: 180,
          rules: [
            {
              calculate: (inputs) => {
                // Rule of thumb: 1.5 to 2 PACU bays per OR
                const totalORs = (inputs.numGeneralORs || 0) + 
                                 (inputs.numUrologyORs || 0) + 
                                 (inputs.numOrthopedicORs || 0) + 
                                 (inputs.numCardiovascularORs || 0) + 
                                 (inputs.numNeurosurgicalORs || 0);
                
                if (totalORs === 0) return { roomCount: 0 };
                
                // Simple calculation for now
                return { roomCount: Math.ceil(totalORs * 1.5) };
              }
            }
          ]
        },
        {
          id: "PRE_OP_BAY",
          name: "Pre-Operative Holding Bay",
          nsf: 140,
          rules: [
            {
              calculate: (inputs) => {
                const totalORs = (inputs.numGeneralORs || 0) + 
                                 (inputs.numUrologyORs || 0) + 
                                 (inputs.numOrthopedicORs || 0) + 
                                 (inputs.numCardiovascularORs || 0) + 
                                 (inputs.numNeurosurgicalORs || 0);
                
                if (totalORs === 0) return { roomCount: 0 };
                
                // Rule of thumb: 1 Pre-Op per OR
                return { roomCount: totalORs };
              }
            }
          ]
        },
        {
          id: "SCRUB_STATION",
          name: "Scrub Sink Station",
          nsf: 40,
          rules: [
            {
              calculate: (inputs) => {
                const totalORs = (inputs.numGeneralORs || 0) + 
                                 (inputs.numUrologyORs || 0) + 
                                 (inputs.numOrthopedicORs || 0) + 
                                 (inputs.numCardiovascularORs || 0) + 
                                 (inputs.numNeurosurgicalORs || 0);
                
                if (totalORs === 0) return { roomCount: 0 };
                
                // 2 scrub stations per OR usually, or shared
                return { roomCount: totalORs * 2 };
              }
            }
          ]
        },
        {
          id: "CONTROL_DESK",
          name: "Control Desk / Station",
          nsf: 120,
          rules: [
            {
              calculate: (inputs) => {
                const totalORs = (inputs.numGeneralORs || 0) + 
                                 (inputs.numUrologyORs || 0) + 
                                 (inputs.numOrthopedicORs || 0) + 
                                 (inputs.numCardiovascularORs || 0) + 
                                 (inputs.numNeurosurgicalORs || 0);
                
                if (totalORs > 0) return { roomCount: 1 };
                return { roomCount: 0 };
              }
            }
          ]
        }
      ]
    }
  ]
};
