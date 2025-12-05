/**
 * Chapter 204: Audiology and Speech-Language Pathology (ASLP) Service
 * Last Updated: March 1, 2022
 * NTDG Factor: 1.50
 */

export const CHAPTER_204 = {
  chapter: '204',
  name: 'Audiology and Speech-Language Pathology (ASLP) Service',
  
  inputs: [
    {
      id: 'audiology_authorized',
      label: 'Is Audiology Service authorized?',
      type: 'boolean',
      defaultValue: true
    },
    {
      id: 'annual_hearing_aid_repairs',
      label: 'How many annual Hearing Aid Repairs are projected?',
      type: 'number',
      min: 0,
      max: 19200,
      defaultValue: 0,
      condition: (inputs) => inputs.audiology_authorized
    },
    {
      id: 'annual_audiologic_assessment',
      label: 'How many annual Audiologic Assessment and Automated Audiometry procedures are projected?',
      type: 'number',
      min: 0,
      max: 25600,
      defaultValue: 0,
      condition: (inputs) => inputs.audiology_authorized
    },
    {
      id: 'separate_control_room',
      label: 'Audiometric Examination Rooms with a separate Control Room preferred? (If not, Audiometric Examination Rooms with a Control Room will be provided)',
      type: 'boolean',
      defaultValue: false,
      condition: (inputs) => inputs.audiology_authorized && inputs.annual_audiologic_assessment > 0
    },
    {
      id: 'annual_hearing_aid_fitting',
      label: 'How many annual Hearing Aid Fitting and Assessment procedures (CPTs) are projected?',
      type: 'number',
      min: 0,
      max: 17064,
      defaultValue: 0,
      condition: (inputs) => inputs.audiology_authorized
    },
    {
      id: 'annual_cerumen',
      label: 'How many annual Cerumen procedures are projected?',
      type: 'number',
      min: 0,
      max: 9600,
      defaultValue: 0,
      condition: (inputs) => inputs.audiology_authorized
    },
    {
      id: 'annual_electrophysiology',
      label: 'How many annual Electrophysiology procedures are projected?',
      type: 'number',
      min: 0,
      max: 6400,
      defaultValue: 0,
      condition: (inputs) => inputs.audiology_authorized
    },
    {
      id: 'slp_authorized',
      label: 'Is Speech-Language Pathology Service authorized?',
      type: 'boolean',
      defaultValue: false
    },
    {
      id: 'annual_voice_function',
      label: 'How many annual Voice Function procedures (CPTs) are projected?',
      type: 'number',
      min: 0,
      max: 2954,
      defaultValue: 0,
      condition: (inputs) => inputs.slp_authorized
    },
    {
      id: 'annual_swallow_function',
      label: 'How many annual Swallow Function procedures (CPTs) are projected?',
      type: 'number',
      min: 0,
      max: 1372,
      defaultValue: 0,
      condition: (inputs) => inputs.slp_authorized
    }
  ],
  
  // Helper function to calculate number of Audiology patient care rooms
  getAudiologyPatientCareRooms: (inputs) => {
    let count = 0;
    
    // Hearing Aid Repair rooms
    if (inputs.annual_hearing_aid_repairs >= 1 && inputs.annual_hearing_aid_repairs <= 4800) count += 1;
    else if (inputs.annual_hearing_aid_repairs >= 4801 && inputs.annual_hearing_aid_repairs <= 9600) count += 2;
    else if (inputs.annual_hearing_aid_repairs >= 9601 && inputs.annual_hearing_aid_repairs <= 14400) count += 3;
    else if (inputs.annual_hearing_aid_repairs >= 14401 && inputs.annual_hearing_aid_repairs <= 19200) count += 4;
    
    // Audiometric Examination rooms (with integrated control)
    if (!inputs.separate_control_room) {
      if (inputs.annual_audiologic_assessment >= 1 && inputs.annual_audiologic_assessment <= 3200) count += 1;
      else if (inputs.annual_audiologic_assessment >= 3201 && inputs.annual_audiologic_assessment <= 6400) count += 2;
      else if (inputs.annual_audiologic_assessment >= 6401 && inputs.annual_audiologic_assessment <= 9600) count += 3;
      else if (inputs.annual_audiologic_assessment >= 9601 && inputs.annual_audiologic_assessment <= 12800) count += 4;
      else if (inputs.annual_audiologic_assessment >= 12801 && inputs.annual_audiologic_assessment <= 16000) count += 5;
      else if (inputs.annual_audiologic_assessment >= 16001 && inputs.annual_audiologic_assessment <= 19200) count += 6;
      else if (inputs.annual_audiologic_assessment >= 19201 && inputs.annual_audiologic_assessment <= 22400) count += 7;
      else if (inputs.annual_audiologic_assessment >= 22401 && inputs.annual_audiologic_assessment <= 25600) count += 8;
    }
    
    // Audiometric Examination rooms (with separate control)
    if (inputs.separate_control_room) {
      if (inputs.annual_audiologic_assessment >= 1 && inputs.annual_audiologic_assessment <= 3200) count += 1;
      else if (inputs.annual_audiologic_assessment >= 3201 && inputs.annual_audiologic_assessment <= 6400) count += 2;
      else if (inputs.annual_audiologic_assessment >= 6401 && inputs.annual_audiologic_assessment <= 9600) count += 3;
      else if (inputs.annual_audiologic_assessment >= 9601 && inputs.annual_audiologic_assessment <= 12800) count += 4;
      else if (inputs.annual_audiologic_assessment >= 12801 && inputs.annual_audiologic_assessment <= 16000) count += 5;
      else if (inputs.annual_audiologic_assessment >= 16001 && inputs.annual_audiologic_assessment <= 19200) count += 6;
      else if (inputs.annual_audiologic_assessment >= 19201 && inputs.annual_audiologic_assessment <= 22400) count += 7;
      else if (inputs.annual_audiologic_assessment >= 22401 && inputs.annual_audiologic_assessment <= 25600) count += 8;
    }
    
    // Programming / Fitting rooms
    if (inputs.annual_hearing_aid_fitting >= 1 && inputs.annual_hearing_aid_fitting <= 2133) count += 1;
    else if (inputs.annual_hearing_aid_fitting >= 2134 && inputs.annual_hearing_aid_fitting <= 4266) count += 2;
    else if (inputs.annual_hearing_aid_fitting >= 4267 && inputs.annual_hearing_aid_fitting <= 6399) count += 3;
    else if (inputs.annual_hearing_aid_fitting >= 6400 && inputs.annual_hearing_aid_fitting <= 8532) count += 4;
    else if (inputs.annual_hearing_aid_fitting >= 8533 && inputs.annual_hearing_aid_fitting <= 10665) count += 5;
    else if (inputs.annual_hearing_aid_fitting >= 10666 && inputs.annual_hearing_aid_fitting <= 12798) count += 6;
    else if (inputs.annual_hearing_aid_fitting >= 12799 && inputs.annual_hearing_aid_fitting <= 14931) count += 7;
    else if (inputs.annual_hearing_aid_fitting >= 14932 && inputs.annual_hearing_aid_fitting <= 17064) count += 8;
    
    // Cerumen Management rooms
    if (inputs.annual_cerumen >= 1 && inputs.annual_cerumen <= 4800) count += 1;
    else if (inputs.annual_cerumen >= 4801 && inputs.annual_cerumen <= 9600) count += 2;
    
    // Electrophysiology rooms
    if (inputs.annual_electrophysiology >= 1 && inputs.annual_electrophysiology <= 3200) count += 1;
    else if (inputs.annual_electrophysiology >= 3201 && inputs.annual_electrophysiology <= 6400) count += 2;
    
    return count;
  },
  
  // Helper function to calculate number of SLP patient care rooms
  getSLPPatientCareRooms: (inputs) => {
    let count = 0;
    
    // Voice Treatment rooms
    if (inputs.annual_voice_function >= 1 && inputs.annual_voice_function <= 1477) count += 1;
    else if (inputs.annual_voice_function >= 1478 && inputs.annual_voice_function <= 2954) count += 2;
    
    // Procedure rooms
    if (inputs.annual_swallow_function >= 1 && inputs.annual_swallow_function <= 686) count += 1;
    else if (inputs.annual_swallow_function >= 687 && inputs.annual_swallow_function <= 1372) count += 2;
    
    return count;
  },
  
  functionalAreas: [
    {
      name: 'FA1: Reception Area',
      condition: (inputs) => inputs.audiology_authorized || inputs.slp_authorized,
      rooms: [
        {
          id: 'SB003',
          name: 'Waiting, ASLP Svc',
          nsf: 100,
          rules: [
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 1 && total <= 2;
              },
              quantity: 1,
              nsf: 100
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 3 && total <= 4;
              },
              quantity: 1,
              nsf: 140
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 5 && total <= 6;
              },
              quantity: 1,
              nsf: 180
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 7 && total <= 8;
              },
              quantity: 1,
              nsf: 220
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 9 && total <= 10;
              },
              quantity: 1,
              nsf: 260
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 11 && total <= 12;
              },
              quantity: 1,
              nsf: 300
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 13 && total <= 14;
              },
              quantity: 1,
              nsf: 340
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 15 && total <= 16;
              },
              quantity: 1,
              nsf: 380
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 17 && total <= 18;
              },
              quantity: 1,
              nsf: 420
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 19 && total <= 20;
              },
              quantity: 1,
              nsf: 460
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 21 && total <= 22;
              },
              quantity: 1,
              nsf: 480
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 23 && total <= 24;
              },
              quantity: 1,
              nsf: 500
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 25 && total <= 26;
              },
              quantity: 1,
              nsf: 520
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 27 && total <= 28;
              },
              quantity: 1,
              nsf: 540
            }
          ]
        },
        {
          id: 'SC183',
          name: 'Reception, ASLP Svc',
          nsf: 85,
          rules: [
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 1 && total <= 14;
              },
              quantity: 1,
              nsf: 85
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 15 && total <= 20;
              },
              quantity: 1,
              nsf: 120
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 21 && total <= 28;
              },
              quantity: 1,
              nsf: 385
            }
          ]
        },
        {
          id: 'SC165',
          name: 'Patient Check-In Kiosk, ASLP Svc',
          nsf: 55,
          rules: [
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 1 && total <= 14;
              },
              quantity: 1,
              nsf: 55
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 15 && total <= 20;
              },
              quantity: 1,
              nsf: 85
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 21 && total <= 28;
              },
              quantity: 2,
              nsf: 160
            }
          ]
        },
        {
          id: 'SC172',
          name: 'Patient Education Workstation, ASLP Svc',
          nsf: 60,
          rules: [
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 1 && total <= 14;
              },
              quantity: 1
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 15 && total <= 28;
              },
              quantity: 2
            }
          ]
        },
        {
          id: 'SB191',
          name: 'Public Toilet, ASLP Svc',
          nsf: 60,
          rules: [
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 1 && total <= 14;
              },
              quantity: 1
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 15 && total <= 28;
              },
              quantity: 2
            }
          ]
        },
        {
          id: 'SB262',
          name: 'Wheelchair Alcove, ASLP Svc',
          nsf: 30,
          rules: [
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 1 && total <= 14;
              },
              quantity: 1
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 15 && total <= 28;
              },
              quantity: 2
            }
          ]
        }
      ]
    },
    {
      name: 'FA2: Audiology Patient Area',
      condition: (inputs) => inputs.audiology_authorized,
      rooms: [
        {
          id: 'CAS01',
          name: 'Audiology Rehabilitation / Counseling Room, ASLP Svc',
          nsf: 140,
          rules: [
            {
              condition: (inputs) => {
                const audiologyRooms = CHAPTER_204.getAudiologyPatientCareRooms(inputs);
                return audiologyRooms >= 1 && audiologyRooms <= 12;
              },
              quantity: 1
            },
            {
              condition: (inputs) => {
                const audiologyRooms = CHAPTER_204.getAudiologyPatientCareRooms(inputs);
                return audiologyRooms >= 13 && audiologyRooms <= 24;
              },
              quantity: 2
            }
          ],
          comment: 'Room for post-diagnostic rehabilitation counseling'
        },
        {
          id: 'CAS21',
          name: 'Audiology Group Room, ASLP Svc',
          nsf: 240,
          rules: [
            {
              condition: (inputs) => {
                const audiologyRooms = CHAPTER_204.getAudiologyPatientCareRooms(inputs);
                return audiologyRooms >= 1 && audiologyRooms <= 8;
              },
              quantity: 1
            },
            {
              condition: (inputs) => {
                const audiologyRooms = CHAPTER_204.getAudiologyPatientCareRooms(inputs);
                return audiologyRooms >= 9 && audiologyRooms <= 16;
              },
              quantity: 2
            },
            {
              condition: (inputs) => {
                const audiologyRooms = CHAPTER_204.getAudiologyPatientCareRooms(inputs);
                return audiologyRooms >= 17 && audiologyRooms <= 24;
              },
              quantity: 3
            }
          ],
          comment: 'Space for group medical appointments'
        },
        {
          id: 'CAS06',
          name: 'Audiology Hearing Aid Repair Room, ASLP Svc',
          nsf: 160,
          rules: [
            {
              condition: (inputs) => inputs.annual_hearing_aid_repairs >= 1 && inputs.annual_hearing_aid_repairs <= 4800,
              quantity: 1
            },
            {
              condition: (inputs) => inputs.annual_hearing_aid_repairs >= 4801 && inputs.annual_hearing_aid_repairs <= 9600,
              quantity: 2
            },
            {
              condition: (inputs) => inputs.annual_hearing_aid_repairs >= 9601 && inputs.annual_hearing_aid_repairs <= 14400,
              quantity: 3
            },
            {
              condition: (inputs) => inputs.annual_hearing_aid_repairs >= 14401 && inputs.annual_hearing_aid_repairs <= 19200,
              quantity: 4
            }
          ]
        },
        {
          id: 'CAS11',
          name: 'Audiology Audiometric Examination Room w/Control Room, ASLP Svc',
          nsf: 300,
          rules: [
            {
              condition: (inputs) => inputs.annual_audiologic_assessment >= 1 && inputs.annual_audiologic_assessment <= 3200 && !inputs.separate_control_room,
              quantity: 1
            },
            {
              condition: (inputs) => inputs.annual_audiologic_assessment >= 3201 && inputs.annual_audiologic_assessment <= 6400 && !inputs.separate_control_room,
              quantity: 2
            },
            {
              condition: (inputs) => inputs.annual_audiologic_assessment >= 6401 && inputs.annual_audiologic_assessment <= 9600 && !inputs.separate_control_room,
              quantity: 3
            },
            {
              condition: (inputs) => inputs.annual_audiologic_assessment >= 9601 && inputs.annual_audiologic_assessment <= 12800 && !inputs.separate_control_room,
              quantity: 4
            },
            {
              condition: (inputs) => inputs.annual_audiologic_assessment >= 12801 && inputs.annual_audiologic_assessment <= 16000 && !inputs.separate_control_room,
              quantity: 5
            },
            {
              condition: (inputs) => inputs.annual_audiologic_assessment >= 16001 && inputs.annual_audiologic_assessment <= 19200 && !inputs.separate_control_room,
              quantity: 6
            },
            {
              condition: (inputs) => inputs.annual_audiologic_assessment >= 19201 && inputs.annual_audiologic_assessment <= 22400 && !inputs.separate_control_room,
              quantity: 7
            },
            {
              condition: (inputs) => inputs.annual_audiologic_assessment >= 22401 && inputs.annual_audiologic_assessment <= 25600 && !inputs.separate_control_room,
              quantity: 8
            }
          ],
          comment: 'Single Audiometric Examination - prefabricated sound booth with integrated control'
        },
        {
          id: 'CAS16',
          name: 'Audiology Audiometric Examination Room, ASLP Svc',
          nsf: 150,
          rules: [
            {
              condition: (inputs) => inputs.annual_audiologic_assessment >= 1 && inputs.annual_audiologic_assessment <= 3200 && inputs.separate_control_room,
              quantity: 1
            },
            {
              condition: (inputs) => inputs.annual_audiologic_assessment >= 3201 && inputs.annual_audiologic_assessment <= 6400 && inputs.separate_control_room,
              quantity: 2
            },
            {
              condition: (inputs) => inputs.annual_audiologic_assessment >= 6401 && inputs.annual_audiologic_assessment <= 9600 && inputs.separate_control_room,
              quantity: 3
            },
            {
              condition: (inputs) => inputs.annual_audiologic_assessment >= 9601 && inputs.annual_audiologic_assessment <= 12800 && inputs.separate_control_room,
              quantity: 4
            },
            {
              condition: (inputs) => inputs.annual_audiologic_assessment >= 12801 && inputs.annual_audiologic_assessment <= 16000 && inputs.separate_control_room,
              quantity: 5
            },
            {
              condition: (inputs) => inputs.annual_audiologic_assessment >= 16001 && inputs.annual_audiologic_assessment <= 19200 && inputs.separate_control_room,
              quantity: 6
            },
            {
              condition: (inputs) => inputs.annual_audiologic_assessment >= 19201 && inputs.annual_audiologic_assessment <= 22400 && inputs.separate_control_room,
              quantity: 7
            },
            {
              condition: (inputs) => inputs.annual_audiologic_assessment >= 22401 && inputs.annual_audiologic_assessment <= 25600 && inputs.separate_control_room,
              quantity: 8
            }
          ],
          comment: 'Double Audiometric Examination - prefabricated sound booth for exam only (control activities outside booth)'
        },
        {
          id: 'CAS17',
          name: 'Audiology Audiometric Examination Control Room, ASLP Svc',
          nsf: 150,
          rules: [
            {
              condition: (inputs) => {
                // One control room per CAS16 examination room
                if (!inputs.separate_control_room) return false;
                if (inputs.annual_audiologic_assessment >= 1 && inputs.annual_audiologic_assessment <= 3200) return true;
                return false;
              },
              quantity: 1
            },
            {
              condition: (inputs) => {
                if (!inputs.separate_control_room) return false;
                if (inputs.annual_audiologic_assessment >= 3201 && inputs.annual_audiologic_assessment <= 6400) return true;
                return false;
              },
              quantity: 2
            },
            {
              condition: (inputs) => {
                if (!inputs.separate_control_room) return false;
                if (inputs.annual_audiologic_assessment >= 6401 && inputs.annual_audiologic_assessment <= 9600) return true;
                return false;
              },
              quantity: 3
            },
            {
              condition: (inputs) => {
                if (!inputs.separate_control_room) return false;
                if (inputs.annual_audiologic_assessment >= 9601 && inputs.annual_audiologic_assessment <= 12800) return true;
                return false;
              },
              quantity: 4
            },
            {
              condition: (inputs) => {
                if (!inputs.separate_control_room) return false;
                if (inputs.annual_audiologic_assessment >= 12801 && inputs.annual_audiologic_assessment <= 16000) return true;
                return false;
              },
              quantity: 5
            },
            {
              condition: (inputs) => {
                if (!inputs.separate_control_room) return false;
                if (inputs.annual_audiologic_assessment >= 16001 && inputs.annual_audiologic_assessment <= 19200) return true;
                return false;
              },
              quantity: 6
            },
            {
              condition: (inputs) => {
                if (!inputs.separate_control_room) return false;
                if (inputs.annual_audiologic_assessment >= 19201 && inputs.annual_audiologic_assessment <= 22400) return true;
                return false;
              },
              quantity: 7
            },
            {
              condition: (inputs) => {
                if (!inputs.separate_control_room) return false;
                if (inputs.annual_audiologic_assessment >= 22401 && inputs.annual_audiologic_assessment <= 25600) return true;
                return false;
              },
              quantity: 8
            }
          ],
          comment: 'Provided one per each Audiometric Examination Room (CAS16)'
        },
        {
          id: 'CAS26',
          name: 'Audiology Programming / Fitting Room, ASLP Svc',
          nsf: 140,
          rules: [
            {
              condition: (inputs) => inputs.annual_hearing_aid_fitting >= 1 && inputs.annual_hearing_aid_fitting <= 2133,
              quantity: 1
            },
            {
              condition: (inputs) => inputs.annual_hearing_aid_fitting >= 2134 && inputs.annual_hearing_aid_fitting <= 4266,
              quantity: 2
            },
            {
              condition: (inputs) => inputs.annual_hearing_aid_fitting >= 4267 && inputs.annual_hearing_aid_fitting <= 6399,
              quantity: 3
            },
            {
              condition: (inputs) => inputs.annual_hearing_aid_fitting >= 6400 && inputs.annual_hearing_aid_fitting <= 8532,
              quantity: 4
            },
            {
              condition: (inputs) => inputs.annual_hearing_aid_fitting >= 8533 && inputs.annual_hearing_aid_fitting <= 10665,
              quantity: 5
            },
            {
              condition: (inputs) => inputs.annual_hearing_aid_fitting >= 10666 && inputs.annual_hearing_aid_fitting <= 12798,
              quantity: 6
            },
            {
              condition: (inputs) => inputs.annual_hearing_aid_fitting >= 12799 && inputs.annual_hearing_aid_fitting <= 14931,
              quantity: 7
            },
            {
              condition: (inputs) => inputs.annual_hearing_aid_fitting >= 14932 && inputs.annual_hearing_aid_fitting <= 17064,
              quantity: 8
            }
          ],
          comment: 'Room for programming and fitting digital hearing aids and bioelectric implants'
        },
        {
          id: 'CAS31',
          name: 'Audiology Cerumen Management Room, ASLP Svc',
          nsf: 160,
          rules: [
            {
              condition: (inputs) => inputs.annual_cerumen >= 1 && inputs.annual_cerumen <= 4800,
              quantity: 1
            },
            {
              condition: (inputs) => inputs.annual_cerumen >= 4801 && inputs.annual_cerumen <= 9600,
              quantity: 2
            }
          ],
          comment: 'Room for ear irrigations and cerumen management (ear wax removal)'
        },
        {
          id: 'CAS36',
          name: 'Audiology Electrophysiology Room, ASLP Svc',
          nsf: 140,
          rules: [
            {
              condition: (inputs) => inputs.annual_electrophysiology >= 1 && inputs.annual_electrophysiology <= 3200,
              quantity: 1
            },
            {
              condition: (inputs) => inputs.annual_electrophysiology >= 3201 && inputs.annual_electrophysiology <= 6400,
              quantity: 2
            }
          ],
          comment: 'Room for auditory evoked potentials, ABR, and ECOG diagnostic procedures'
        },
        {
          id: 'CAS41',
          name: 'Audiology Posturography Room, ASLP Svc',
          nsf: 200,
          rules: [
            {
              condition: (inputs) => {
                const audiologyRooms = CHAPTER_204.getAudiologyPatientCareRooms(inputs);
                return audiologyRooms >= 1 && audiologyRooms <= 24;
              },
              quantity: 1
            }
          ],
          comment: 'Room for evaluating balance disorders with moving platform device'
        },
        {
          id: 'CAS46',
          name: 'Audiology Vestibulography Room, ASLP Svc',
          nsf: 240,
          rules: [
            {
              condition: (inputs) => {
                const audiologyRooms = CHAPTER_204.getAudiologyPatientCareRooms(inputs);
                return audiologyRooms >= 1 && audiologyRooms <= 24;
              },
              quantity: 1
            }
          ],
          comment: 'Room for visual and vestibular systems testing (VNG) and BPPV treatments'
        },
        {
          id: 'SB201_VESTIB',
          name: 'ASLP Svc Audiology Vestibulography Patient Toilet',
          nsf: 60,
          rules: [
            {
              condition: (inputs) => {
                const audiologyRooms = CHAPTER_204.getAudiologyPatientCareRooms(inputs);
                return audiologyRooms >= 1 && audiologyRooms <= 24;
              },
              quantity: 1
            }
          ],
          comment: 'Patient toilet associated with Vestibulography'
        },
        {
          id: 'SB201',
          name: 'Audiology Patient Toilet',
          nsf: 60,
          rules: [
            {
              condition: (inputs) => {
                const audiologyRooms = CHAPTER_204.getAudiologyPatientCareRooms(inputs);
                return audiologyRooms >= 1 && audiologyRooms <= 12;
              },
              quantity: 1
            },
            {
              condition: (inputs) => {
                const audiologyRooms = CHAPTER_204.getAudiologyPatientCareRooms(inputs);
                return audiologyRooms >= 13 && audiologyRooms <= 24;
              },
              quantity: 2
            }
          ]
        }
      ]
    },
    {
      name: 'FA3: Audiology Support Area',
      condition: (inputs) => inputs.audiology_authorized,
      rooms: [
        {
          id: 'CAS67',
          name: 'Audiology Hearing Aid Lab, ASLP Svc',
          nsf: 180,
          rules: [
            {
              condition: (inputs) => {
                const audiologyRooms = CHAPTER_204.getAudiologyPatientCareRooms(inputs);
                return audiologyRooms >= 1 && audiologyRooms <= 12;
              },
              quantity: 1,
              nsf: 180
            },
            {
              condition: (inputs) => {
                const audiologyRooms = CHAPTER_204.getAudiologyPatientCareRooms(inputs);
                return audiologyRooms >= 13 && audiologyRooms <= 24;
              },
              quantity: 1,
              nsf: 240
            }
          ],
          comment: 'Support space for modifying custom hearing aids and ear molds'
        },
        {
          id: 'CAS71',
          name: 'Audiology Hearing Aid Processing, ASLP Svc',
          nsf: 180,
          rules: [
            {
              condition: (inputs) => {
                const audiologyRooms = CHAPTER_204.getAudiologyPatientCareRooms(inputs);
                return audiologyRooms >= 1 && audiologyRooms <= 12;
              },
              quantity: 1,
              nsf: 180
            },
            {
              condition: (inputs) => {
                const audiologyRooms = CHAPTER_204.getAudiologyPatientCareRooms(inputs);
                return audiologyRooms >= 13 && audiologyRooms <= 24;
              },
              quantity: 1,
              nsf: 240
            }
          ],
          comment: 'Secure room for shipping/receiving hearing aids and parts'
        },
        {
          id: 'SB743',
          name: 'Audiology Soiled Utility Room',
          nsf: 80,
          rules: [
            {
              condition: (inputs) => {
                const audiologyRooms = CHAPTER_204.getAudiologyPatientCareRooms(inputs);
                return audiologyRooms >= 1 && audiologyRooms <= 12;
              },
              quantity: 1
            },
            {
              condition: (inputs) => {
                const audiologyRooms = CHAPTER_204.getAudiologyPatientCareRooms(inputs);
                return audiologyRooms >= 13 && audiologyRooms <= 24;
              },
              quantity: 2
            }
          ],
          comment: 'Temporary holding of waste and soiled instruments'
        },
        {
          id: 'CAS76',
          name: 'Audiology Supply Storage Room, ASLP Svc',
          nsf: 80,
          rules: [
            {
              condition: (inputs) => {
                const audiologyRooms = CHAPTER_204.getAudiologyPatientCareRooms(inputs);
                return audiologyRooms >= 1 && audiologyRooms <= 12;
              },
              quantity: 1
            },
            {
              condition: (inputs) => {
                const audiologyRooms = CHAPTER_204.getAudiologyPatientCareRooms(inputs);
                return audiologyRooms >= 13 && audiologyRooms <= 24;
              },
              quantity: 2
            }
          ]
        },
        {
          id: 'CAS86',
          name: 'Audiology Equipment Storage Room, ASLP Svc',
          nsf: 120,
          rules: [
            {
              condition: (inputs) => {
                const audiologyRooms = CHAPTER_204.getAudiologyPatientCareRooms(inputs);
                return audiologyRooms >= 1 && audiologyRooms <= 12;
              },
              quantity: 1
            },
            {
              condition: (inputs) => {
                const audiologyRooms = CHAPTER_204.getAudiologyPatientCareRooms(inputs);
                return audiologyRooms >= 13 && audiologyRooms <= 24;
              },
              quantity: 2
            }
          ]
        },
        {
          id: 'SC471',
          name: 'Audiology Clean Linen Room',
          nsf: 60,
          rules: [
            {
              condition: (inputs) => {
                const audiologyRooms = CHAPTER_204.getAudiologyPatientCareRooms(inputs);
                return audiologyRooms >= 1 && audiologyRooms <= 8;
              },
              quantity: 1,
              nsf: 60
            },
            {
              condition: (inputs) => {
                const audiologyRooms = CHAPTER_204.getAudiologyPatientCareRooms(inputs);
                return audiologyRooms >= 9 && audiologyRooms <= 16;
              },
              quantity: 1,
              nsf: 100
            },
            {
              condition: (inputs) => {
                const audiologyRooms = CHAPTER_204.getAudiologyPatientCareRooms(inputs);
                return audiologyRooms >= 17 && audiologyRooms <= 24;
              },
              quantity: 1,
              nsf: 140
            }
          ]
        },
        {
          id: 'SB244',
          name: 'Audiology Housekeeping Aides Closet (HAC)',
          nsf: 60,
          rules: [
            {
              condition: (inputs) => {
                const audiologyRooms = CHAPTER_204.getAudiologyPatientCareRooms(inputs);
                return audiologyRooms >= 1 && audiologyRooms <= 24;
              },
              quantity: 1
            }
          ]
        }
      ]
    },
    {
      name: 'FA4: Speech-Language Pathology Patient Area',
      condition: (inputs) => inputs.slp_authorized,
      rooms: [
        {
          id: 'CAS51',
          name: 'Speech-Language Pathology Exam, ASLP Svc',
          nsf: 125,
          rules: [
            {
              condition: (inputs) => {
                const slpRooms = CHAPTER_204.getSLPPatientCareRooms(inputs);
                return slpRooms >= 1 && slpRooms <= 2;
              },
              quantity: 1
            },
            {
              condition: (inputs) => {
                const slpRooms = CHAPTER_204.getSLPPatientCareRooms(inputs);
                return slpRooms >= 3 && slpRooms <= 4;
              },
              quantity: 2
            }
          ],
          comment: 'Patient care space for evaluation and treatment of communication disorders'
        },
        {
          id: 'CAS54',
          name: 'Speech-Language Pathology Assistive Technology Room, ASLP Svc',
          nsf: 400,
          rules: [
            {
              condition: (inputs) => {
                const slpRooms = CHAPTER_204.getSLPPatientCareRooms(inputs);
                return slpRooms >= 1 && slpRooms <= 4;
              },
              quantity: 1
            }
          ],
          comment: 'Space for state-of-the-art assistive devices and equipment'
        },
        {
          id: 'CAS57',
          name: 'Speech-Language Pathology Voice Treatment Room, ASLP Svc',
          nsf: 240,
          rules: [
            {
              condition: (inputs) => inputs.annual_voice_function >= 1 && inputs.annual_voice_function <= 1477,
              quantity: 1
            },
            {
              condition: (inputs) => inputs.annual_voice_function >= 1478 && inputs.annual_voice_function <= 2954,
              quantity: 2
            }
          ],
          comment: 'Room for diagnosis and treatment of speech and voice disorders, including laryngeal communication'
        },
        {
          id: 'CAS61',
          name: 'Speech-Language Pathology Procedure Room, ASLP Svc',
          nsf: 300,
          rules: [
            {
              condition: (inputs) => inputs.annual_swallow_function >= 1 && inputs.annual_swallow_function <= 686,
              quantity: 1
            },
            {
              condition: (inputs) => inputs.annual_swallow_function >= 687 && inputs.annual_swallow_function <= 1372,
              quantity: 2
            }
          ],
          comment: 'Room for instrumental evaluation and treatment of voice and swallowing disorders (FEES, sEMG, etc.)'
        },
        {
          id: 'CAS64',
          name: 'Speech-Language Pathology Group Room, ASLP Svc',
          nsf: 240,
          rules: [
            {
              condition: (inputs) => {
                const slpRooms = CHAPTER_204.getSLPPatientCareRooms(inputs);
                return slpRooms >= 1 && slpRooms <= 4;
              },
              quantity: 1
            }
          ],
          comment: 'Space for group medical appointments of up to 12 veterans and staff'
        },
        {
          id: 'SB201_SLP',
          name: 'Speech-Language Pathology Patient Toilet',
          nsf: 60,
          rules: [
            {
              condition: (inputs) => {
                const slpRooms = CHAPTER_204.getSLPPatientCareRooms(inputs);
                return slpRooms >= 1 && slpRooms <= 4;
              },
              quantity: 1
            }
          ]
        }
      ]
    },
    {
      name: 'FA5: Speech-Language Pathology Support Area',
      condition: (inputs) => inputs.slp_authorized,
      rooms: [
        {
          id: 'SB743_SLP',
          name: 'Speech-Language Pathology Soiled Utility Room',
          nsf: 100,
          rules: [
            {
              condition: (inputs) => {
                const slpRooms = CHAPTER_204.getSLPPatientCareRooms(inputs);
                return slpRooms >= 1 && slpRooms <= 2;
              },
              quantity: 1,
              nsf: 100
            },
            {
              condition: (inputs) => {
                const slpRooms = CHAPTER_204.getSLPPatientCareRooms(inputs);
                return slpRooms >= 3 && slpRooms <= 4;
              },
              quantity: 1,
              nsf: 120
            }
          ],
          comment: 'Temporary holding of waste and soiled instruments, including scopes'
        },
        {
          id: 'CAS81',
          name: 'Speech-Language Pathology Supply Storage Room, ASLP Svc',
          nsf: 100,
          rules: [
            {
              condition: (inputs) => {
                const slpRooms = CHAPTER_204.getSLPPatientCareRooms(inputs);
                return slpRooms >= 1 && slpRooms <= 2;
              },
              quantity: 1,
              nsf: 100
            },
            {
              condition: (inputs) => {
                const slpRooms = CHAPTER_204.getSLPPatientCareRooms(inputs);
                return slpRooms >= 3 && slpRooms <= 4;
              },
              quantity: 1,
              nsf: 120
            }
          ]
        },
        {
          id: 'CAS91',
          name: 'Speech-Language Pathology Equipment Storage, ASLP Svc',
          nsf: 100,
          rules: [
            {
              condition: (inputs) => {
                const slpRooms = CHAPTER_204.getSLPPatientCareRooms(inputs);
                return slpRooms >= 1 && slpRooms <= 2;
              },
              quantity: 1,
              nsf: 100
            },
            {
              condition: (inputs) => {
                const slpRooms = CHAPTER_204.getSLPPatientCareRooms(inputs);
                return slpRooms >= 3 && slpRooms <= 4;
              },
              quantity: 1,
              nsf: 120
            }
          ]
        },
        {
          id: 'SC471_SLP',
          name: 'Speech-Language Pathology Clean Linen Room',
          nsf: 60,
          rules: [
            {
              condition: (inputs) => {
                const slpRooms = CHAPTER_204.getSLPPatientCareRooms(inputs);
                return slpRooms >= 1 && slpRooms <= 2;
              },
              quantity: 1,
              nsf: 60
            },
            {
              condition: (inputs) => {
                const slpRooms = CHAPTER_204.getSLPPatientCareRooms(inputs);
                return slpRooms >= 3 && slpRooms <= 4;
              },
              quantity: 1,
              nsf: 80
            }
          ]
        },
        {
          id: 'SB244_SLP',
          name: 'Speech-Language Pathology Housekeeping Aides Closet (HAC)',
          nsf: 60,
          rules: [
            {
              condition: (inputs) => inputs.slp_authorized,
              quantity: 1
            }
          ]
        }
      ]
    },
    {
      name: 'FA6: Audiology and Speech-Language Pathology Staff and Administrative Area',
      condition: (inputs) => inputs.audiology_authorized || inputs.slp_authorized,
      rooms: [
        {
          id: 'SS204_AUDIO_CHIEF',
          name: 'Audiology Chief Office',
          nsf: 100,
          rules: [
            {
              condition: (inputs) => inputs.audiology_authorized,
              quantity: 1
            }
          ]
        },
        {
          id: 'SS204_SLP_CHIEF',
          name: 'Speech-Language Pathology Chief Office',
          nsf: 100,
          rules: [
            {
              condition: (inputs) => inputs.slp_authorized,
              quantity: 1
            }
          ]
        },
        {
          id: 'SS204_ASST_CHIEF',
          name: 'ASLP Svc Assistant Service Chief Office',
          nsf: 100,
          rules: [
            {
              condition: (inputs) => inputs.audiology_authorized || inputs.slp_authorized,
              quantity: 1
            }
          ]
        },
        {
          id: 'SS204_SECTION_CHIEF',
          name: 'ASLP Svc Section Chief Office',
          nsf: 100,
          rules: [
            {
              condition: (inputs) => inputs.audiology_authorized || inputs.slp_authorized,
              quantity: 1
            }
          ]
        },
        {
          id: 'SS204_ADMIN_OFFICER',
          name: 'ASLP Svc Administrative Officer Office',
          nsf: 100,
          rules: [
            {
              condition: (inputs) => inputs.audiology_authorized || inputs.slp_authorized,
              quantity: 1
            }
          ]
        },
        {
          id: 'SS218',
          name: 'ASLP Svc Administrative Assistant Workstation',
          nsf: 56,
          rules: [
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 1 && total <= 14;
              },
              quantity: 1
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 15 && total <= 28;
              },
              quantity: 2
            }
          ]
        },
        {
          id: 'SS272',
          name: 'ASLP Svc Copy / Supply Room',
          nsf: 80,
          rules: [
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 1 && total <= 8;
              },
              quantity: 1,
              nsf: 80
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 9 && total <= 16;
              },
              quantity: 1,
              nsf: 100
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 17 && total <= 28;
              },
              quantity: 1,
              nsf: 120
            }
          ]
        },
        {
          id: 'SS262',
          name: 'ASLP Svc Staff Breakroom',
          nsf: 100,
          rules: [
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 1 && total <= 4;
              },
              quantity: 1,
              nsf: 100
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 5 && total <= 8;
              },
              quantity: 1,
              nsf: 120
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 9 && total <= 12;
              },
              quantity: 1,
              nsf: 140
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 13 && total <= 16;
              },
              quantity: 1,
              nsf: 160
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 17 && total <= 20;
              },
              quantity: 1,
              nsf: 180
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 21 && total <= 24;
              },
              quantity: 1,
              nsf: 200
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 25 && total <= 28;
              },
              quantity: 1,
              nsf: 240
            }
          ],
          comment: 'Shared staff respite area for lunch breaks with kitchen equipment'
        },
        {
          id: 'SS101',
          name: 'ASLP Svc Conference Room',
          nsf: 240,
          rules: [
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 1 && total <= 7;
              },
              quantity: 1,
              nsf: 240
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 8 && total <= 14;
              },
              quantity: 1,
              nsf: 300
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 15 && total <= 21;
              },
              quantity: 1,
              nsf: 500
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 21 && total <= 28;
              },
              quantity: 1,
              nsf: 675
            }
          ]
        },
        {
          id: 'SB191_STAFF',
          name: 'ASLP Svc Staff Toilet',
          nsf: 60,
          rules: [
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 1 && total <= 4;
              },
              quantity: 1
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 5 && total <= 28;
              },
              quantity: 2
            }
          ]
        },
        {
          id: 'SS251',
          name: 'ASLP Svc Staff Personal Property Locker',
          nsf: 60,
          rules: [
            {
              condition: (inputs) => inputs.audiology_authorized || inputs.slp_authorized,
              quantity: 2
            }
          ]
        }
      ]
    },
    {
      name: 'FA7: Audiology and Speech-Language Pathology Education Area',
      condition: (inputs) => inputs.audiology_authorized || inputs.slp_authorized,
      rooms: [
        {
          id: 'SC243',
          name: 'ASLP Svc Resident / Fellow Team Room',
          nsf: 240,
          rules: [
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 1 && total <= 14;
              },
              quantity: 1,
              nsf: 240
            },
            {
              condition: (inputs) => {
                const total = CHAPTER_204.getAudiologyPatientCareRooms(inputs) + CHAPTER_204.getSLPPatientCareRooms(inputs);
                return total >= 15 && total <= 28;
              },
              quantity: 1,
              nsf: 360
            }
          ],
          comment: 'Space for trainees for patient charting and consultation'
        }
      ]
    }
  ]
};
