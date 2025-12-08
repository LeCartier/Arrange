
export const CHAPTER_257 = {
  chapter: 257,
  name: "Urgent Care",
  inputs: [
    { id: "ucLevel1", label: "Is Urgent Care Level I authorized?", type: "boolean", default: false },
    { id: "ucLevel2", label: "Is Urgent Care Level II authorized?", type: "boolean", default: false },
    { id: "ucLevel3", label: "Is Urgent Care Level III authorized?", type: "boolean", default: false },
    { id: "annualClinicStops", label: "Projected Annual Clinic Stops (Stop Code 131)", type: "number", min: 191, max: 19125, default: 191 }
  ],
  functionalAreas: [
    {
      id: "FA1",
      name: "Security / Police Area",
      rooms: [
        {
          id: "SB291",
          name: "UC Walk-in Vestibule, Bldg Sprt",
          nsf: 180,
          rules: [
            {
              calculate: (inputs) => {
                if ((inputs.ucLevel1 || inputs.ucLevel2 || inputs.ucLevel3) && inputs.annualClinicStops >= 191 && inputs.annualClinicStops <= 19125) {
                  return { roomCount: 1 };
                }
                return { roomCount: 0 };
              }
            }
          ]
        },
        {
          id: "SB853",
          name: "UC Metal Detector Station, Police Svc",
          nsf: 160,
          rules: [
            {
              calculate: (inputs) => {
                if ((inputs.ucLevel1 || inputs.ucLevel2 || inputs.ucLevel3) && inputs.annualClinicStops >= 191 && inputs.annualClinicStops <= 19125) {
                  return { roomCount: 1 };
                }
                return { roomCount: 0 };
              }
            }
          ]
        },
        {
          id: "SB854",
          name: "UC Private Search Room, Police Svc",
          nsf: 120,
          rules: [
            {
              calculate: (inputs) => {
                if ((inputs.ucLevel1 || inputs.ucLevel2 || inputs.ucLevel3) && inputs.annualClinicStops >= 191 && inputs.annualClinicStops <= 19125) {
                  return { roomCount: 1 };
                }
                return { roomCount: 0 };
              }
            }
          ]
        },
        {
          id: "SB711",
          name: "UC Patient Belongings Room, Lgstcs Svc",
          nsf: 80,
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.ucLevel1 || inputs.ucLevel2 || inputs.ucLevel3) {
                  if (inputs.annualClinicStops >= 191 && inputs.annualClinicStops <= 7650) return { roomCount: 1, nsf: 80 };
                  if (inputs.annualClinicStops >= 7651 && inputs.annualClinicStops <= 15300) return { roomCount: 1, nsf: 100 };
                  if (inputs.annualClinicStops >= 15301 && inputs.annualClinicStops <= 19125) return { roomCount: 1, nsf: 120 };
                }
                return { roomCount: 0 };
              }
            }
          ]
        },
        {
          id: "SB851",
          name: "UC Security Station, Police Svc",
          nsf: 100,
          rules: [
            {
              calculate: (inputs) => {
                if ((inputs.ucLevel2 || inputs.ucLevel3) && inputs.annualClinicStops >= 191 && inputs.annualClinicStops <= 19125) {
                  return { roomCount: 1 };
                }
                return { roomCount: 0 };
              }
            }
          ]
        },
        {
          id: "SB811",
          name: "UC Security Room, Police Svc",
          nsf: 120,
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.ucLevel1 && inputs.annualClinicStops >= 191 && inputs.annualClinicStops <= 19125) {
                  return { roomCount: 1 };
                }
                return { roomCount: 0 };
              }
            }
          ]
        },
        {
          id: "SB821",
          name: "UC Secure Evidence Room, Police Svc",
          nsf: 60,
          rules: [
            {
              calculate: (inputs) => {
                if ((inputs.ucLevel1 || inputs.ucLevel2 || inputs.ucLevel3) && inputs.annualClinicStops >= 191 && inputs.annualClinicStops <= 19125) {
                  return { roomCount: 1 };
                }
                return { roomCount: 0 };
              }
            }
          ]
        }
      ]
    },
    {
      id: "FA2",
      name: "Reception / Public Area",
      rooms: [
        {
          id: "SB003",
          name: "UC General Waiting, Bldg Sprt",
          nsf: 215,
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.ucLevel1 || inputs.ucLevel2 || inputs.ucLevel3) {
                  if (inputs.annualClinicStops >= 191 && inputs.annualClinicStops <= 4590) return { roomCount: 1, nsf: 215 };
                  if (inputs.annualClinicStops >= 4591 && inputs.annualClinicStops <= 8415) return { roomCount: 1, nsf: 415 };
                  if (inputs.annualClinicStops >= 8416 && inputs.annualClinicStops <= 12240) return { roomCount: 1, nsf: 575 };
                  if (inputs.annualClinicStops >= 12241 && inputs.annualClinicStops <= 19125) return { roomCount: 1, nsf: 720 };
                }
                return { roomCount: 0 };
              }
            }
          ]
        },
        {
          id: "SB051",
          name: "UC Family Waiting, Bldg Sprt",
          nsf: 125,
          rules: [
            {
              calculate: (inputs) => {
                if (inputs.ucLevel1 || inputs.ucLevel2 || inputs.ucLevel3) {
                  if (inputs.annualClinicStops >= 191 && inputs.annualClinicStops <= 8415) return { roomCount: 1, nsf: 125 };
                  if (inputs.annualClinicStops >= 8416 && inputs.annualClinicStops <= 19125) return { roomCount: 1, nsf: 200 };
                }
                return { roomCount: 0 };
              }
            }
          ]
        }
      ]
    },
    {
      id: "FA4",
      name: "Patient Area",
      rooms: [
        {
          id: "UC_GEN_ET",
          name: "General Exam / Treatment Room",
          nsf: 140, // Assumed standard size, need to verify
          rules: [
            {
              calculate: (inputs) => {
                const stops = inputs.annualClinicStops;
                if (stops < 191) return { roomCount: 0 };
                
                // Table 1 Logic for GEN rooms
                if (stops <= 765) return { roomCount: 1 };
                if (stops <= 1530) return { roomCount: 2 };
                if (stops <= 2295) return { roomCount: 2 };
                if (stops <= 3060) return { roomCount: 2 };
                if (stops <= 3825) return { roomCount: 2 };
                if (stops <= 4590) return { roomCount: 2 };
                if (stops <= 5355) return { roomCount: 3 };
                if (stops <= 6120) return { roomCount: 4 };
                if (stops <= 6885) return { roomCount: 5 };
                if (stops <= 7650) return { roomCount: 5 };
                if (stops <= 8415) return { roomCount: 5 };
                if (stops <= 9180) return { roomCount: 5 };
                if (stops <= 9945) return { roomCount: 5 };
                if (stops <= 10710) return { roomCount: 6 };
                if (stops <= 11475) return { roomCount: 7 };
                if (stops <= 12240) return { roomCount: 8 };
                if (stops <= 13005) return { roomCount: 8 };
                if (stops <= 13770) return { roomCount: 8 };
                if (stops <= 14535) return { roomCount: 8 };
                if (stops <= 15300) return { roomCount: 8 };
                if (stops <= 16065) return { roomCount: 9 };
                if (stops <= 16830) return { roomCount: 10 };
                if (stops <= 17595) return { roomCount: 11 };
                if (stops <= 18360) return { roomCount: 11 };
                if (stops <= 19125) return { roomCount: 12 };
                
                return { roomCount: 12 }; // Cap at max
              }
            }
          ]
        },
        {
          id: "UC_MH_ET",
          name: "Mental Health Exam / Treatment Room",
          nsf: 140,
          rules: [
            {
              calculate: (inputs) => {
                const stops = inputs.annualClinicStops;
                if (stops < 1531) return { roomCount: 0 };
                if (stops <= 6885) return { roomCount: 1 };
                if (stops <= 12240) return { roomCount: 2 };
                if (stops <= 15300) return { roomCount: 3 };
                if (stops <= 17595) return { roomCount: 4 };
                return { roomCount: 5 };
              }
            }
          ]
        },
        {
          id: "UC_AII_ET",
          name: "Airborne Infection Isolation Exam / Treatment Room",
          nsf: 180, // Assumed
          rules: [
            {
              calculate: (inputs) => {
                const stops = inputs.annualClinicStops;
                if (stops < 2296) return { roomCount: 0 };
                if (stops <= 7650) return { roomCount: 1 };
                if (stops <= 13005) return { roomCount: 2 };
                return { roomCount: 3 };
              }
            }
          ]
        },
        {
          id: "UC_GYN_ET",
          name: "Gynecology Exam / Treatment Room",
          nsf: 160, // Assumed
          rules: [
            {
              calculate: (inputs) => {
                const stops = inputs.annualClinicStops;
                if (stops < 3061) return { roomCount: 0 };
                if (stops <= 8415) return { roomCount: 1 };
                if (stops <= 13770) return { roomCount: 2 };
                return { roomCount: 3 };
              }
            }
          ]
        },
        {
          id: "UC_BAR_ET",
          name: "Bariatric Exam / Treatment Room",
          nsf: 200, // Assumed
          rules: [
            {
              calculate: (inputs) => {
                const stops = inputs.annualClinicStops;
                if (stops < 3826) return { roomCount: 0 };
                if (stops <= 9180) return { roomCount: 1 };
                return { roomCount: 2 };
              }
            }
          ]
        }
      ]
    }
  ]
};
