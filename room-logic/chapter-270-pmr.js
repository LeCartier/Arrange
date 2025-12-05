// Chapter 270: Physical Medicine & Rehabilitation Service
// Based on VA PG-18-9 Space Planning Criteria
// NTDG Factor: 1.35

export const CHAPTER_270 = {
  id: '270',
  name: 'Physical Medicine & Rehabilitation Service',
  ntdgFactor: 1.35,
  
  inputs: [
    {
      id: 'annual_visits',
      label: 'Annual PM&R Patient Visits (in thousands)',
      type: 'number',
      min: 5,
      max: 100,
      default: 20,
      required: true
    },
    {
      id: 'has_physical_therapy',
      label: 'Provide Physical Therapy?',
      type: 'checkbox',
      default: true
    },
    {
      id: 'has_occupational_therapy',
      label: 'Provide Occupational Therapy?',
      type: 'checkbox',
      default: true
    },
    {
      id: 'has_speech_therapy',
      label: 'Provide Speech/Language Therapy?',
      type: 'checkbox',
      default: true
    },
    {
      id: 'has_prosthetics',
      label: 'Provide Prosthetics & Orthotics?',
      type: 'checkbox',
      default: true
    },
    {
      id: 'has_aquatic',
      label: 'Provide Aquatic Therapy (Pool)?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'has_driver_eval',
      label: 'Provide Driver Evaluation & Training?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'has_kinesiotherapy',
      label: 'Provide Kinesiotherapy?',
      type: 'checkbox',
      default: true
    }
  ],

  // Helper function to calculate PT treatment stations
  calculatePTStations(inputs) {
    const visits = inputs.annual_visits;
    if (visits <= 10) return 4;
    if (visits <= 20) return 6;
    if (visits <= 30) return 8;
    if (visits <= 50) return 10;
    if (visits <= 75) return 12;
    return 14;
  },

  // Helper function to calculate waiting area size
  calculateWaitingNSF(inputs) {
    const visits = inputs.annual_visits;
    if (visits <= 15) return 200;
    if (visits <= 30) return 300;
    if (visits <= 50) return 400;
    if (visits <= 75) return 500;
    return 600;
  },

  functionalAreas: [
    {
      id: 'FA1',
      name: 'Reception and Waiting Area',
      rooms: [
        {
          id: 'PMR-WAIT',
          name: 'PM&R Waiting Area',
          calculate: (inputs) => {
            const nsf = CHAPTER_270.calculateWaitingNSF(inputs);
            return [{ 
              roomCode: 'SB003', 
              roomName: 'PM&R Waiting Area', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'PMR-RECEPTION',
          name: 'PM&R Reception / Scheduling',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            const quantity = visits >= 50 ? 2 : 1;
            return [{ 
              roomCode: 'SS218', 
              roomName: 'PM&R Reception', 
              nsf: 56, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'PMR-TOILET-PUBLIC',
          name: 'PM&R Public Toilet (Accessible)',
          calculate: (inputs) => [{ 
            roomCode: 'SB191', 
            roomName: 'PM&R Public Toilet', 
            nsf: 80, 
            quantity: 2 
          }]
        }
      ]
    },

    {
      id: 'FA2',
      name: 'Physical Therapy Area',
      rooms: [
        {
          id: 'PMR-PT-GYM',
          name: 'Physical Therapy Gymnasium / Exercise Area',
          calculate: (inputs) => {
            if (!inputs.has_physical_therapy) return [];
            const visits = inputs.annual_visits;
            let nsf = 800;
            if (visits > 20) nsf = 1200;
            if (visits > 40) nsf = 1600;
            if (visits > 60) nsf = 2000;
            return [{ 
              roomCode: 'SE401', 
              roomName: 'PT Gymnasium', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'PMR-PT-TREATMENT',
          name: 'PT Treatment Cubicle / Station',
          calculate: (inputs) => {
            if (!inputs.has_physical_therapy) return [];
            const quantity = CHAPTER_270.calculatePTStations(inputs);
            return [{ 
              roomCode: 'SE402', 
              roomName: 'PT Treatment Station', 
              nsf: 80, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'PMR-PT-PRIVATE',
          name: 'PT Private Treatment Room',
          calculate: (inputs) => {
            if (!inputs.has_physical_therapy) return [];
            const visits = inputs.annual_visits;
            const quantity = visits >= 30 ? 2 : 1;
            return [{ 
              roomCode: 'SE403', 
              roomName: 'PT Private Treatment Room', 
              nsf: 120, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'PMR-PT-HYDRO',
          name: 'PT Hydrotherapy / Whirlpool Room',
          calculate: (inputs) => {
            if (!inputs.has_physical_therapy) return [];
            return [{ 
              roomCode: 'SE404', 
              roomName: 'PT Hydrotherapy Room', 
              nsf: 150, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'PMR-PT-GAIT',
          name: 'PT Gait Training Area',
          calculate: (inputs) => {
            if (!inputs.has_physical_therapy) return [];
            const visits = inputs.annual_visits;
            const nsf = visits >= 40 ? 300 : 200;
            return [{ 
              roomCode: 'SE405', 
              roomName: 'PT Gait Training Area', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'PMR-PT-STORAGE',
          name: 'PT Equipment Storage',
          calculate: (inputs) => {
            if (!inputs.has_physical_therapy) return [];
            const visits = inputs.annual_visits;
            const nsf = visits >= 40 ? 200 : 150;
            return [{ 
              roomCode: 'SB745', 
              roomName: 'PT Equipment Storage', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        }
      ]
    },

    {
      id: 'FA3',
      name: 'Occupational Therapy Area',
      rooms: [
        {
          id: 'PMR-OT-CLINIC',
          name: 'Occupational Therapy Clinic',
          calculate: (inputs) => {
            if (!inputs.has_occupational_therapy) return [];
            const visits = inputs.annual_visits;
            let nsf = 600;
            if (visits > 20) nsf = 800;
            if (visits > 40) nsf = 1000;
            if (visits > 60) nsf = 1200;
            return [{ 
              roomCode: 'SE406', 
              roomName: 'OT Clinic', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'PMR-OT-TREATMENT',
          name: 'OT Treatment Cubicle / Station',
          calculate: (inputs) => {
            if (!inputs.has_occupational_therapy) return [];
            const visits = inputs.annual_visits;
            let quantity = 3;
            if (visits > 20) quantity = 4;
            if (visits > 40) quantity = 6;
            if (visits > 60) quantity = 8;
            return [{ 
              roomCode: 'SE407', 
              roomName: 'OT Treatment Station', 
              nsf: 80, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'PMR-OT-ADL',
          name: 'OT Activities of Daily Living (ADL) Area',
          calculate: (inputs) => {
            if (!inputs.has_occupational_therapy) return [];
            return [{ 
              roomCode: 'SE408', 
              roomName: 'OT ADL Training Area', 
              nsf: 300, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'PMR-OT-KITCHEN',
          name: 'OT Training Kitchen',
          calculate: (inputs) => {
            if (!inputs.has_occupational_therapy) return [];
            return [{ 
              roomCode: 'SE409', 
              roomName: 'OT Training Kitchen', 
              nsf: 200, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'PMR-OT-SPLINT',
          name: 'OT Splint Fabrication Room',
          calculate: (inputs) => {
            if (!inputs.has_occupational_therapy) return [];
            return [{ 
              roomCode: 'SE410', 
              roomName: 'OT Splint Fabrication', 
              nsf: 120, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'PMR-OT-STORAGE',
          name: 'OT Equipment Storage',
          calculate: (inputs) => {
            if (!inputs.has_occupational_therapy) return [];
            const visits = inputs.annual_visits;
            const nsf = visits >= 40 ? 180 : 120;
            return [{ 
              roomCode: 'SB745', 
              roomName: 'OT Equipment Storage', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        }
      ]
    },

    {
      id: 'FA4',
      name: 'Speech and Language Therapy Area',
      rooms: [
        {
          id: 'PMR-SPEECH-TREATMENT',
          name: 'Speech/Language Treatment Room',
          calculate: (inputs) => {
            if (!inputs.has_speech_therapy) return [];
            const visits = inputs.annual_visits;
            let quantity = 2;
            if (visits > 30) quantity = 3;
            if (visits > 60) quantity = 4;
            return [{ 
              roomCode: 'SE411', 
              roomName: 'Speech Treatment Room', 
              nsf: 100, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'PMR-SPEECH-AUDIO',
          name: 'Speech Audiology Booth',
          calculate: (inputs) => {
            if (!inputs.has_speech_therapy) return [];
            return [{ 
              roomCode: 'SE412', 
              roomName: 'Audiology Booth', 
              nsf: 80, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'PMR-SPEECH-STORAGE',
          name: 'Speech Therapy Equipment Storage',
          calculate: (inputs) => {
            if (!inputs.has_speech_therapy) return [];
            return [{ 
              roomCode: 'SB745', 
              roomName: 'Speech Equipment Storage', 
              nsf: 80, 
              quantity: 1 
            }];
          }
        }
      ]
    },

    {
      id: 'FA5',
      name: 'Prosthetics and Orthotics Area',
      rooms: [
        {
          id: 'PMR-PROS-CLINIC',
          name: 'Prosthetics Clinic / Fitting Room',
          calculate: (inputs) => {
            if (!inputs.has_prosthetics) return [];
            const visits = inputs.annual_visits;
            const quantity = visits >= 40 ? 2 : 1;
            return [{ 
              roomCode: 'SE413', 
              roomName: 'Prosthetics Fitting Room', 
              nsf: 150, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'PMR-PROS-WORKSHOP',
          name: 'Prosthetics Fabrication Workshop',
          calculate: (inputs) => {
            if (!inputs.has_prosthetics) return [];
            return [{ 
              roomCode: 'SE414', 
              roomName: 'Prosthetics Workshop', 
              nsf: 300, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'PMR-PROS-GAIT',
          name: 'Prosthetics Gait Training / Walking Area',
          calculate: (inputs) => {
            if (!inputs.has_prosthetics) return [];
            return [{ 
              roomCode: 'SE415', 
              roomName: 'Prosthetics Gait Training', 
              nsf: 200, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'PMR-PROS-STORAGE',
          name: 'Prosthetics Storage',
          calculate: (inputs) => {
            if (!inputs.has_prosthetics) return [];
            return [{ 
              roomCode: 'SB745', 
              roomName: 'Prosthetics Storage', 
              nsf: 150, 
              quantity: 1 
            }];
          }
        }
      ]
    },

    {
      id: 'FA6',
      name: 'Specialized Therapy Areas',
      rooms: [
        {
          id: 'PMR-AQUATIC-POOL',
          name: 'Aquatic Therapy Pool',
          calculate: (inputs) => {
            if (!inputs.has_aquatic) return [];
            return [{ 
              roomCode: 'SE416', 
              roomName: 'Aquatic Therapy Pool', 
              nsf: 1200, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'PMR-AQUATIC-DECK',
          name: 'Pool Deck Area',
          calculate: (inputs) => {
            if (!inputs.has_aquatic) return [];
            return [{ 
              roomCode: 'SE417', 
              roomName: 'Pool Deck', 
              nsf: 400, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'PMR-AQUATIC-LOCKER',
          name: 'Pool Locker Room (Accessible)',
          calculate: (inputs) => {
            if (!inputs.has_aquatic) return [];
            return [{ 
              roomCode: 'SB152', 
              roomName: 'Pool Locker Room', 
              nsf: 200, 
              quantity: 2 
            }];
          }
        },
        {
          id: 'PMR-AQUATIC-MECHANICAL',
          name: 'Pool Mechanical / Equipment Room',
          calculate: (inputs) => {
            if (!inputs.has_aquatic) return [];
            return [{ 
              roomCode: 'SE418', 
              roomName: 'Pool Mechanical Room', 
              nsf: 300, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'PMR-DRIVER-CLASSROOM',
          name: 'Driver Evaluation Classroom',
          calculate: (inputs) => {
            if (!inputs.has_driver_eval) return [];
            return [{ 
              roomCode: 'SS101', 
              roomName: 'Driver Evaluation Classroom', 
              nsf: 300, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'PMR-DRIVER-SIMULATOR',
          name: 'Driver Simulator Room',
          calculate: (inputs) => {
            if (!inputs.has_driver_eval) return [];
            return [{ 
              roomCode: 'SE419', 
              roomName: 'Driver Simulator Room', 
              nsf: 200, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'PMR-KINESIO',
          name: 'Kinesiotherapy Exercise Area',
          calculate: (inputs) => {
            if (!inputs.has_kinesiotherapy) return [];
            const visits = inputs.annual_visits;
            const nsf = visits >= 40 ? 600 : 400;
            return [{ 
              roomCode: 'SE420', 
              roomName: 'Kinesiotherapy Area', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        }
      ]
    },

    {
      id: 'FA7',
      name: 'Clinical Support Area',
      rooms: [
        {
          id: 'PMR-EXAM',
          name: 'PM&R Examination Room',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            let quantity = 2;
            if (visits > 30) quantity = 3;
            if (visits > 60) quantity = 4;
            return [{ 
              roomCode: 'SE101', 
              roomName: 'PM&R Examination Room', 
              nsf: 120, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'PMR-CONSULT',
          name: 'PM&R Consultation Room',
          calculate: (inputs) => [{ 
            roomCode: 'SE116', 
            roomName: 'PM&R Consultation Room', 
            nsf: 120, 
            quantity: 1 
          }]
        },
        {
          id: 'PMR-CLEAN-UTILITY',
          name: 'PM&R Clean Utility',
          calculate: (inputs) => [{ 
            roomCode: 'SB655', 
            roomName: 'PM&R Clean Utility', 
            nsf: 80, 
            quantity: 1 
          }]
        },
        {
          id: 'PMR-SOILED-UTILITY',
          name: 'PM&R Soiled Utility',
          calculate: (inputs) => [{ 
            roomCode: 'SB656', 
            roomName: 'PM&R Soiled Utility', 
            nsf: 80, 
            quantity: 1 
          }]
        },
        {
          id: 'PMR-MEDICATION',
          name: 'PM&R Medication Room',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            return visits >= 40 ? [{ 
              roomCode: 'SE166', 
              roomName: 'PM&R Medication Room', 
              nsf: 80, 
              quantity: 1 
            }] : [];
          }
        },
        {
          id: 'PMR-WHEELCHAIR',
          name: 'Wheelchair / Mobility Device Storage',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            const nsf = visits >= 40 ? 150 : 100;
            return [{ 
              roomCode: 'SB745', 
              roomName: 'Wheelchair Storage', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        }
      ]
    },

    {
      id: 'FA8',
      name: 'Administrative and Staff Area',
      rooms: [
        {
          id: 'PMR-CHIEF-OFFICE',
          name: 'PM&R Chief / Physiatrist Office',
          calculate: (inputs) => [{ 
            roomCode: 'SS204', 
            roomName: 'PM&R Chief Office', 
            nsf: 120, 
            quantity: 1 
          }]
        },
        {
          id: 'PMR-SUPERVISOR-OFFICE',
          name: 'PM&R Supervisor Office',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            const quantity = visits >= 50 ? 2 : 1;
            return [{ 
              roomCode: 'SS204', 
              roomName: 'PM&R Supervisor Office', 
              nsf: 100, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'PMR-THERAPIST-OFFICE',
          name: 'Therapist Shared Office',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            let quantity = 1;
            if (visits > 30) quantity = 2;
            if (visits > 60) quantity = 3;
            return [{ 
              roomCode: 'SS111', 
              roomName: 'Therapist Shared Office', 
              nsf: 120, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'PMR-WORKSTATION',
          name: 'Therapist Workstation / Charting',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            let quantity = 3;
            if (visits > 30) quantity = 5;
            if (visits > 60) quantity = 8;
            return [{ 
              roomCode: 'SS218', 
              roomName: 'Therapist Workstation', 
              nsf: 56, 
              quantity: quantity 
            }];
          }
        },
        {
          id: 'PMR-STAFF-LOUNGE',
          name: 'PM&R Staff Lounge',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            const nsf = visits >= 50 ? 180 : 120;
            return [{ 
              roomCode: 'SB152', 
              roomName: 'PM&R Staff Lounge', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'PMR-LOCKER',
          name: 'PM&R Staff Locker Room',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            return visits >= 40 ? [{ 
              roomCode: 'SB152', 
              roomName: 'PM&R Staff Locker Room', 
              nsf: 80, 
              quantity: 1 
            }] : [];
          }
        },
        {
          id: 'PMR-TOILET-STAFF',
          name: 'PM&R Staff Toilet',
          calculate: (inputs) => [{ 
            roomCode: 'SB191', 
            roomName: 'PM&R Staff Toilet', 
            nsf: 60, 
            quantity: 2 
          }]
        },
        {
          id: 'PMR-CONFERENCE',
          name: 'PM&R Conference / Team Room',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            const nsf = visits >= 50 ? 240 : 180;
            return [{ 
              roomCode: 'SS101', 
              roomName: 'PM&R Conference Room', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        }
      ]
    },

    {
      id: 'FA9',
      name: 'Support Area',
      rooms: [
        {
          id: 'PMR-STORAGE-GENERAL',
          name: 'PM&R General Storage',
          calculate: (inputs) => {
            const visits = inputs.annual_visits;
            let nsf = 150;
            if (visits > 30) nsf = 200;
            if (visits > 60) nsf = 250;
            return [{ 
              roomCode: 'SB745', 
              roomName: 'PM&R General Storage', 
              nsf: nsf, 
              quantity: 1 
            }];
          }
        },
        {
          id: 'PMR-LINEN',
          name: 'PM&R Linen Storage',
          calculate: (inputs) => [{ 
            roomCode: 'SB745', 
            roomName: 'PM&R Linen Storage', 
            nsf: 80, 
            quantity: 1 
          }]
        },
        {
          id: 'PMR-JANITOR',
          name: 'PM&R Janitor Closet',
          calculate: (inputs) => [{ 
            roomCode: 'SB773', 
            roomName: 'PM&R Janitor Closet', 
            nsf: 60, 
            quantity: 1 
          }]
        }
      ]
    }
  ]
};
