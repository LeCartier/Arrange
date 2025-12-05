// Chapter 222: Dental Service
// Complex chapter with multiple treatment room types, surgery suite, and dental laboratories

const CHAPTER_222 = {
  id: '222',
  name: 'Dental Service',
  
  inputs: [
    {
      id: 'dental_treatment_rooms',
      label: 'How many Multifunctional Dental Treatment Rooms (DTRs) are projected?',
      type: 'number',
      min: 2,
      max: 20,
      default: 4,
      required: true
    },
    {
      id: 'dental_surgery_authorized',
      label: 'Is a Dental Surgery Suite authorized?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'pan_ceph_authorized',
      label: 'Is a Panoramic / Cephalometric x-ray authorized?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'ct_cone_beam_authorized',
      label: 'Is a Computerized Tomography (CT) Cone-Beam Room authorized?',
      type: 'checkbox',
      default: false
    }
  ],

  functionalAreas: [
    {
      id: 'FA1',
      name: 'Reception Area',
      rooms: [
        {
          id: 'DENT-101',
          name: 'Dental Clinic Waiting',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            const nsfMap = {
              2: 100, 3: 130, 4: 170, 5: 215, 6: 260, 7: 290, 8: 330, 9: 370, 10: 415,
              11: 465, 12: 520, 13: 530, 14: 540, 15: 575, 16: 615, 17: 640, 18: 675, 19: 695, 20: 720
            };
            return [{
              code: 'SB003',
              name: 'Dental Clinic Waiting',
              nsf: nsfMap[dtr] || 100,
              quantity: 1
            }];
          }
        },
        {
          id: 'DENT-102',
          name: 'Dental Clinic Playroom',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            if (dtr >= 2 && dtr <= 10) {
              return [{ code: 'SS091', name: 'Dental Clinic Playroom, Childcare Center', nsf: 80, quantity: 1 }];
            } else if (dtr >= 11 && dtr <= 20) {
              return [{ code: 'SS091', name: 'Dental Clinic Playroom, Childcare Center', nsf: 100, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'DENT-103',
          name: 'Dental Clinic Reception',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            if (dtr >= 2 && dtr <= 5) {
              return [{ code: 'SC183', name: 'Dental Clinic Reception', nsf: 85, quantity: 1 }];
            } else if (dtr >= 6 && dtr <= 15) {
              return [{ code: 'SC183', name: 'Dental Clinic Reception', nsf: 260, quantity: 1 }];
            } else if (dtr >= 16 && dtr <= 20) {
              return [{ code: 'SC183', name: 'Dental Clinic Reception', nsf: 385, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'DENT-104',
          name: 'Patient Check-in Kiosk',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            let quantity = 1;
            if (dtr >= 2 && dtr <= 5) quantity = 1;
            else if (dtr >= 6 && dtr <= 15) quantity = 2;
            else if (dtr >= 16 && dtr <= 20) quantity = 3;
            return [{ code: 'SC165', name: 'Dental Clinic Patient Check-in Kiosk', nsf: 55, quantity }];
          }
        },
        {
          id: 'DENT-105',
          name: 'Patient Education Workstation',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            let quantity = 1;
            if (dtr >= 2 && dtr <= 5) quantity = 1;
            else if (dtr >= 6 && dtr <= 15) quantity = 2;
            else if (dtr >= 16 && dtr <= 20) quantity = 3;
            return [{ code: 'SC172', name: 'Dental Clinic Patient Education Workstation', nsf: 40, quantity }];
          }
        },
        {
          id: 'DENT-106',
          name: 'Wheelchair Alcove',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            if (dtr >= 2 && dtr <= 10) {
              return [{ code: 'SB262', name: 'Dental Clinic Wheelchair Alcove', nsf: 30, quantity: 1 }];
            } else if (dtr >= 11 && dtr <= 20) {
              return [{ code: 'SB262', name: 'Dental Clinic Wheelchair Alcove', nsf: 50, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'DENT-107',
          name: 'Visitor Toilet',
          calculate: (inputs) => {
            return [{ code: 'SB191', name: 'Dental Clinic Visitor Toilet', nsf: 60, quantity: 2 }];
          }
        }
      ]
    },
    {
      id: 'FA2',
      name: 'Dental Treatment Patient Area',
      rooms: [
        {
          id: 'DENT-201',
          name: 'Dental Treatment Patient Waiting',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            let quantity = 1;
            if (dtr >= 2 && dtr <= 5) quantity = 1;
            else if (dtr >= 6 && dtr <= 10) quantity = 2;
            else if (dtr >= 11 && dtr <= 15) quantity = 3;
            else if (dtr >= 16 && dtr <= 20) quantity = 4;
            return [{ code: 'SB003', name: 'Dental Clinic Dental Treatment Patient Waiting', nsf: 80, quantity }];
          }
        },
        {
          id: 'DENT-202',
          name: 'Consult Room',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            let quantity = 1;
            if (dtr >= 2 && dtr <= 10) quantity = 1;
            else if (dtr >= 11 && dtr <= 20) quantity = 2;
            return [{ code: 'SC271', name: 'Dental Clinic Consult Room', nsf: 120, quantity }];
          }
        },
        {
          id: 'DENT-203',
          name: 'Panoramic / Cephalometric X-Ray Room',
          calculate: (inputs) => {
            if (!inputs.pan_ceph_authorized) return [];
            const dtr = inputs.dental_treatment_rooms;
            let quantity = 1;
            if (dtr >= 2 && dtr <= 10) quantity = 1;
            else if (dtr >= 11 && dtr <= 20) quantity = 2;
            return [{ code: 'CDS03', name: 'Panoramic / Cephalometric X-Ray Room', nsf: 120, quantity }];
          }
        },
        {
          id: 'DENT-204',
          name: 'Dental Cone-Beam CT Room',
          calculate: (inputs) => {
            if (!inputs.ct_cone_beam_authorized) return [];
            const dtr = inputs.dental_treatment_rooms;
            let quantity = 1;
            if (dtr >= 2 && dtr <= 10) quantity = 1;
            else if (dtr >= 11 && dtr <= 20) quantity = 2;
            return [{ code: 'CDS05', name: 'Dental Cone-Beam CT Room', nsf: 120, quantity }];
          }
        },
        {
          id: 'DENT-205',
          name: 'Dental Cone-Beam CT Control Room',
          calculate: (inputs) => {
            if (!inputs.ct_cone_beam_authorized) return [];
            const dtr = inputs.dental_treatment_rooms;
            let quantity = 1;
            if (dtr >= 2 && dtr <= 10) quantity = 1;
            else if (dtr >= 11 && dtr <= 20) quantity = 2;
            return [{ code: 'CDS06', name: 'Dental Cone-Beam CT Control Room', nsf: 30, quantity }];
          }
        },
        {
          id: 'DENT-206',
          name: 'Multifunctional Dental Treatment Room (DTR)',
          calculate: (inputs) => {
            return [{ code: 'CDS11', name: 'Multifunctional Dental Treatment Room (DTR)', nsf: 120, quantity: inputs.dental_treatment_rooms }];
          }
        },
        {
          id: 'DENT-207',
          name: 'Special Needs Dental Treatment Room (DTR)',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            let quantity = 1;
            if (dtr >= 2 && dtr <= 10) quantity = 1;
            else if (dtr >= 11 && dtr <= 20) quantity = 2;
            return [{ code: 'CDS13', name: 'Special Needs Dental Treatment Room (DTR)', nsf: 150, quantity }];
          }
        },
        {
          id: 'DENT-208',
          name: 'Endodontics Dental Treatment Room (DTR)',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            let quantity = 1;
            if (dtr >= 2 && dtr <= 10) quantity = 1;
            else if (dtr >= 11 && dtr <= 20) quantity = 2;
            return [{ code: 'CDS15', name: 'Endodontics Dental Treatment Room (DTR)', nsf: 120, quantity }];
          }
        },
        {
          id: 'DENT-209',
          name: 'PACS Viewing Room',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            let quantity = 1;
            if (dtr >= 2 && dtr <= 10) quantity = 1;
            else if (dtr >= 11 && dtr <= 20) quantity = 2;
            return [{ code: 'CI501', name: 'Dental Clinic PACS Viewing Room', nsf: 120, quantity }];
          }
        },
        {
          id: 'DENT-210',
          name: 'Telehealth Room',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            let quantity = 1;
            if (dtr >= 2 && dtr <= 10) quantity = 1;
            else if (dtr >= 11 && dtr <= 20) quantity = 2;
            return [{ code: 'SC249', name: 'Dental Clinic Telehealth Room', nsf: 120, quantity }];
          }
        },
        {
          id: 'DENT-211',
          name: 'Team Room',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            if (dtr >= 2 && dtr <= 5) {
              return [{ code: 'SC243', name: 'Dental Clinic Team Room', nsf: 120, quantity: 1 }];
            } else if (dtr >= 6 && dtr <= 15) {
              return [{ code: 'SC243', name: 'Dental Clinic Team Room', nsf: 240, quantity: 1 }];
            } else if (dtr >= 16 && dtr <= 20) {
              return [{ code: 'SC243', name: 'Dental Clinic Team Room', nsf: 360, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'DENT-212',
          name: 'Crash Cart Alcove',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            let quantity = 1;
            if (dtr >= 2 && dtr <= 10) quantity = 1;
            else if (dtr >= 11 && dtr <= 20) quantity = 2;
            return [{ code: 'SC052', name: 'Dental Clinic Crash Cart Alcove', nsf: 20, quantity }];
          }
        },
        {
          id: 'DENT-213',
          name: 'Patient Toilet',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            let quantity = 1;
            if (dtr >= 2 && dtr <= 5) quantity = 1;
            else if (dtr >= 6 && dtr <= 20) quantity = 2;
            return [{ code: 'SB201', name: 'Dental Clinic Patient Toilet', nsf: 60, quantity }];
          }
        },
        {
          id: 'DENT-214',
          name: 'Medication Room',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            if (dtr >= 2 && dtr <= 5) {
              return [{ code: 'SV583', name: 'Dental Clinic Medication Room', nsf: 100, quantity: 1 }];
            } else if (dtr >= 6 && dtr <= 15) {
              return [{ code: 'SV583', name: 'Dental Clinic Medication Room', nsf: 120, quantity: 1 }];
            } else if (dtr >= 16 && dtr <= 20) {
              return [{ code: 'SV583', name: 'Dental Clinic Medication Room', nsf: 140, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'DENT-215',
          name: 'Clean Dental Supply Room',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            let quantity = 1;
            if (dtr >= 2 && dtr <= 5) quantity = 1;
            else if (dtr >= 6 && dtr <= 10) quantity = 2;
            else if (dtr >= 11 && dtr <= 15) quantity = 3;
            else if (dtr >= 16 && dtr <= 20) quantity = 4;
            return [{ code: 'CDS21', name: 'Clean Dental Supply Room', nsf: 120, quantity }];
          }
        },
        {
          id: 'DENT-216',
          name: 'Sterile Instruments Storage Room',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            let quantity = 1;
            if (dtr >= 2 && dtr <= 10) quantity = 1;
            else if (dtr >= 11 && dtr <= 20) quantity = 2;
            return [{ code: 'SC951', name: 'Sterile Instruments Storage Room', nsf: 100, quantity }];
          }
        },
        {
          id: 'DENT-217',
          name: 'Supply Storage Room',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            if (dtr >= 2 && dtr <= 5) {
              return [{ code: 'CDS26', name: 'Supply Storage Room', nsf: 100, quantity: 1 }];
            } else if (dtr >= 6 && dtr <= 10) {
              return [{ code: 'CDS26', name: 'Supply Storage Room', nsf: 120, quantity: 1 }];
            } else if (dtr >= 11 && dtr <= 15) {
              return [{ code: 'CDS26', name: 'Supply Storage Room', nsf: 140, quantity: 1 }];
            } else if (dtr >= 16 && dtr <= 20) {
              return [{ code: 'CDS26', name: 'Supply Storage Room', nsf: 160, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'DENT-218',
          name: 'Mobile Equipment Storage Room',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            if (dtr >= 2 && dtr <= 5) {
              return [{ code: 'SC092', name: 'Dental Clinic Mobile Equipment Storage Room', nsf: 80, quantity: 1 }];
            } else if (dtr >= 6 && dtr <= 10) {
              return [{ code: 'SC092', name: 'Dental Clinic Mobile Equipment Storage Room', nsf: 100, quantity: 1 }];
            } else if (dtr >= 11 && dtr <= 15) {
              return [{ code: 'SC092', name: 'Dental Clinic Mobile Equipment Storage Room', nsf: 120, quantity: 1 }];
            } else if (dtr >= 16 && dtr <= 20) {
              return [{ code: 'SC092', name: 'Dental Clinic Mobile Equipment Storage Room', nsf: 140, quantity: 1 }];
            }
            return [];
          }
        }
      ]
    },
    {
      id: 'FA3',
      name: 'Dental Surgery Suite Patient Area',
      condition: (inputs) => inputs.dental_surgery_authorized,
      rooms: [
        {
          id: 'DENT-301',
          name: 'Dental Surgery Patient Waiting',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            if (dtr >= 6 && dtr <= 15) {
              return [{ code: 'SB003', name: 'Dental Surgery Patient Waiting', nsf: 80, quantity: 1 }];
            } else if (dtr >= 16 && dtr <= 20) {
              return [{ code: 'SB003', name: 'Dental Surgery Patient Waiting', nsf: 130, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'DENT-302',
          name: 'Dental Surgery Patient Toilet',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            if (dtr >= 6 && dtr <= 20) {
              return [{ code: 'SB201', name: 'Dental Surgery Patient Toilet', nsf: 60, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'DENT-303',
          name: 'Dental Surgery Patient Prep / Recovery Room',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            let quantity = 0;
            if (dtr >= 6 && dtr <= 15) quantity = 2;
            else if (dtr >= 16 && dtr <= 20) quantity = 4;
            return quantity > 0 ? [{ code: 'CDS41', name: 'Dental Surgery Patient Prep / Recovery Room', nsf: 80, quantity }] : [];
          }
        },
        {
          id: 'DENT-304',
          name: 'Dental Surgery Scrub Area',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            let quantity = 0;
            if (dtr >= 6 && dtr <= 15) quantity = 1;
            else if (dtr >= 16 && dtr <= 20) quantity = 2;
            return quantity > 0 ? [{ code: 'CDS46', name: 'Dental Surgery Scrub Area', nsf: 60, quantity }] : [];
          }
        },
        {
          id: 'DENT-305',
          name: 'Dental Surgery Operating Room (OR)',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            let quantity = 0;
            if (dtr >= 6 && dtr <= 15) quantity = 1;
            else if (dtr >= 16 && dtr <= 20) quantity = 2;
            return quantity > 0 ? [{ code: 'CDS47', name: 'Dental Surgery Operating Room (OR)', nsf: 225, quantity }] : [];
          }
        },
        {
          id: 'DENT-306',
          name: 'Dental Surgery Staff Workroom',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            if (dtr >= 6 && dtr <= 15) {
              return [{ code: 'SC231', name: 'Dental Surgery Staff Workroom', nsf: 120, quantity: 1 }];
            } else if (dtr >= 16 && dtr <= 20) {
              return [{ code: 'SC231', name: 'Dental Surgery Staff Workroom', nsf: 160, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'DENT-307',
          name: 'Dental Surgery Equipment Storage Room',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            let quantity = 0;
            if (dtr >= 6 && dtr <= 15) quantity = 1;
            else if (dtr >= 16 && dtr <= 20) quantity = 2;
            return quantity > 0 ? [{ code: 'CDS49', name: 'Dental Surgery Equipment Storage Room', nsf: 120, quantity }] : [];
          }
        },
        {
          id: 'DENT-308',
          name: 'Dental Surgery Crash Cart Alcove',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            return dtr >= 6 && dtr <= 20 ? [{ code: 'SC052', name: 'Dental Surgery Crash Cart Alcove', nsf: 20, quantity: 1 }] : [];
          }
        },
        {
          id: 'DENT-309',
          name: 'Dental Surgery Blanket Warmer Alcove',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            return dtr >= 6 && dtr <= 20 ? [{ code: 'SC010', name: 'Dental Surgery Blanket Warmer Alcove', nsf: 20, quantity: 1 }] : [];
          }
        },
        {
          id: 'DENT-310',
          name: 'Dental Surgery Clean Utility Room',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            if (dtr >= 6 && dtr <= 15) {
              return [{ code: 'SB737', name: 'Dental Surgery Clean Utility Room', nsf: 120, quantity: 1 }];
            } else if (dtr >= 16 && dtr <= 20) {
              return [{ code: 'SB737', name: 'Dental Surgery Clean Utility Room', nsf: 180, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'DENT-311',
          name: 'Dental Surgery Soiled Utility Room',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            if (dtr >= 6 && dtr <= 15) {
              return [{ code: 'SB743', name: 'Dental Surgery Soiled Utility Room', nsf: 100, quantity: 1 }];
            } else if (dtr >= 16 && dtr <= 20) {
              return [{ code: 'SB743', name: 'Dental Surgery Soiled Utility Room', nsf: 180, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'DENT-312',
          name: 'Dental Surgery Clean Linen Room',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            if (dtr >= 6 && dtr <= 15) {
              return [{ code: 'SC471', name: 'Dental Surgery Clean Linen Room', nsf: 60, quantity: 1 }];
            } else if (dtr >= 16 && dtr <= 20) {
              return [{ code: 'SC471', name: 'Dental Surgery Clean Linen Room', nsf: 75, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'DENT-313',
          name: 'Dental Surgery Soiled Linen Room',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            if (dtr >= 6 && dtr <= 15) {
              return [{ code: 'SC452', name: 'Dental Surgery Soiled Linen Room', nsf: 60, quantity: 1 }];
            } else if (dtr >= 16 && dtr <= 20) {
              return [{ code: 'SC452', name: 'Dental Surgery Soiled Linen Room', nsf: 75, quantity: 1 }];
            }
            return [];
          }
        }
      ]
    },
    {
      id: 'FA4',
      name: 'Dental Laboratories',
      rooms: [
        {
          id: 'DENT-401',
          name: 'General Purpose Laboratory',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            if (dtr >= 6 && dtr <= 15) {
              return [{ code: 'CDS51', name: 'General Purpose Laboratory', nsf: 280, quantity: 1 }];
            } else if (dtr >= 16 && dtr <= 20) {
              return [{ code: 'CDS51', name: 'General Purpose Laboratory', nsf: 340, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'DENT-402',
          name: 'Porcelain / Ceramics Laboratory',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            if (dtr >= 6 && dtr <= 15) {
              return [{ code: 'CDS61', name: 'Porcelain / Ceramics Laboratory', nsf: 120, quantity: 1 }];
            } else if (dtr >= 16 && dtr <= 20) {
              return [{ code: 'CDS61', name: 'Porcelain / Ceramics Laboratory', nsf: 160, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'DENT-403',
          name: 'Maxillo-Facial Laboratory',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            if (dtr >= 6 && dtr <= 15) {
              return [{ code: 'CDS63', name: 'Maxillo-Facial Laboratory', nsf: 120, quantity: 1 }];
            } else if (dtr >= 16 && dtr <= 20) {
              return [{ code: 'CDS63', name: 'Maxillo-Facial Laboratory', nsf: 160, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'DENT-404',
          name: 'Machine Milled Restorations Laboratory',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            let quantity = 0;
            if (dtr >= 6 && dtr <= 15) quantity = 1;
            else if (dtr >= 16 && dtr <= 20) quantity = 2;
            return quantity > 0 ? [{ code: 'CDS65', name: 'Machine Milled Restorations Laboratory', nsf: 60, quantity }] : [];
          }
        },
        {
          id: 'DENT-405',
          name: 'Acrylic Processing Laboratory',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            let quantity = 0;
            if (dtr >= 6 && dtr <= 15) quantity = 1;
            else if (dtr >= 16 && dtr <= 20) quantity = 2;
            return quantity > 0 ? [{ code: 'CDS67', name: 'Acrylic Processing Laboratory', nsf: 50, quantity }] : [];
          }
        },
        {
          id: 'DENT-406',
          name: 'Acrylic Finishing Laboratory',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            let quantity = 0;
            if (dtr >= 6 && dtr <= 15) quantity = 1;
            else if (dtr >= 16 && dtr <= 20) quantity = 2;
            return quantity > 0 ? [{ code: 'CDS69', name: 'Acrylic Finishing Laboratory', nsf: 50, quantity }] : [];
          }
        },
        {
          id: 'DENT-407',
          name: 'Cast Metal Laboratory',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            let quantity = 0;
            if (dtr >= 6 && dtr <= 15) quantity = 1;
            else if (dtr >= 16 && dtr <= 20) quantity = 2;
            return quantity > 0 ? [{ code: 'CDS71', name: 'Cast Metal Laboratory', nsf: 60, quantity }] : [];
          }
        },
        {
          id: 'DENT-408',
          name: 'Laboratory Shipping / Receiving Room',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            return dtr >= 6 && dtr <= 20 ? [{ code: 'CDS73', name: 'Laboratory Shipping / Receiving Room', nsf: 180, quantity: 1 }] : [];
          }
        },
        {
          id: 'DENT-409',
          name: 'Expendable Laboratory Supplies Storage Room',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            if (dtr >= 6 && dtr <= 15) {
              return [{ code: 'CDS76', name: 'Expendable Laboratory Supplies Storage Room', nsf: 180, quantity: 1 }];
            } else if (dtr >= 16 && dtr <= 20) {
              return [{ code: 'CDS76', name: 'Expendable Laboratory Supplies Storage Room', nsf: 240, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'DENT-410',
          name: 'Laboratory Models Storage Room',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            if (dtr >= 6 && dtr <= 15) {
              return [{ code: 'CDS81', name: 'Laboratory Models Storage Room', nsf: 120, quantity: 1 }];
            } else if (dtr >= 16 && dtr <= 20) {
              return [{ code: 'CDS81', name: 'Laboratory Models Storage Room', nsf: 180, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'DENT-411',
          name: 'Precious Metals Storage Room',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            return dtr >= 6 && dtr <= 20 ? [{ code: 'CDS91', name: 'Precious Metals Storage Room', nsf: 15, quantity: 1 }] : [];
          }
        },
        {
          id: 'DENT-412',
          name: 'Dental Models Processing Workroom',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            if (dtr >= 6 && dtr <= 15) {
              return [{ code: 'CDS92', name: 'Dental Models Processing Workroom', nsf: 120, quantity: 1 }];
            } else if (dtr >= 16 && dtr <= 20) {
              return [{ code: 'CDS92', name: 'Dental Models Processing Workroom', nsf: 180, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'DENT-413',
          name: 'Laboratory Equipment Storage Room',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            if (dtr >= 6 && dtr <= 15) {
              return [{ code: 'CDS93', name: 'Laboratory Equipment Storage Room', nsf: 180, quantity: 1 }];
            } else if (dtr >= 16 && dtr <= 20) {
              return [{ code: 'CDS93', name: 'Laboratory Equipment Storage Room', nsf: 240, quantity: 1 }];
            }
            return [];
          }
        }
      ]
    },
    {
      id: 'FA5',
      name: 'Support Area',
      rooms: [
        {
          id: 'DENT-501',
          name: 'Receiving Workstation',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            let quantity = 1;
            if (dtr >= 2 && dtr <= 10) quantity = 1;
            else if (dtr >= 11 && dtr <= 20) quantity = 2;
            return [{ code: 'SS218', name: 'Dental Clinic Receiving Workstation', nsf: 56, quantity }];
          }
        },
        {
          id: 'DENT-502',
          name: 'Instrument Supply / Receiving',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            if (dtr >= 2 && dtr <= 10) {
              return [{ code: 'CDS94', name: 'Instrument Supply / Receiving', nsf: 90, quantity: 1 }];
            } else if (dtr >= 11 && dtr <= 20) {
              return [{ code: 'CDS94', name: 'Instrument Supply / Receiving', nsf: 120, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'DENT-503',
          name: 'Gas Cylinders Storage Room',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            if (dtr >= 2 && dtr <= 10) {
              return [{ code: 'SB541', name: 'Dental Clinic Gas Cylinders Storage Room', nsf: 80, quantity: 1 }];
            } else if (dtr >= 11 && dtr <= 20) {
              return [{ code: 'SB541', name: 'Dental Clinic Gas Cylinders Storage Room', nsf: 100, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'DENT-504',
          name: 'Wheelchair / Lift Storage Room',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            if (dtr >= 2 && dtr <= 10) {
              return [{ code: 'SB264', name: 'Dental Clinic Wheelchair / Lift Storage Room', nsf: 60, quantity: 1 }];
            } else if (dtr >= 11 && dtr <= 20) {
              return [{ code: 'SB264', name: 'Dental Clinic Wheelchair / Lift Storage Room', nsf: 100, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'DENT-505',
          name: 'CAD/CAM Alcove',
          calculate: (inputs) => {
            return [{ code: 'SC013', name: 'Dental Clinic CAD/CAM Alcove', nsf: 30, quantity: 1 }];
          }
        },
        {
          id: 'DENT-506',
          name: 'AED Alcove',
          calculate: (inputs) => {
            return [{ code: 'SC007', name: 'Dental Clinic AED Alcove', nsf: 15, quantity: 1 }];
          }
        },
        {
          id: 'DENT-507',
          name: 'Clean Utility Room',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            if (dtr >= 2 && dtr <= 5) {
              return [{ code: 'SB737', name: 'Dental Clinic Clean Utility Room', nsf: 100, quantity: 1 }];
            } else if (dtr >= 6 && dtr <= 10) {
              return [{ code: 'SB737', name: 'Dental Clinic Clean Utility Room', nsf: 130, quantity: 1 }];
            } else if (dtr >= 11 && dtr <= 15) {
              return [{ code: 'SB737', name: 'Dental Clinic Clean Utility Room', nsf: 160, quantity: 1 }];
            } else if (dtr >= 16 && dtr <= 20) {
              return [{ code: 'SB737', name: 'Dental Clinic Clean Utility Room', nsf: 190, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'DENT-508',
          name: 'Soiled Utility Room',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            if (dtr >= 2 && dtr <= 5) {
              return [{ code: 'SB743', name: 'Dental Clinic Soiled Utility Room', nsf: 100, quantity: 1 }];
            } else if (dtr >= 6 && dtr <= 10) {
              return [{ code: 'SB743', name: 'Dental Clinic Soiled Utility Room', nsf: 130, quantity: 1 }];
            } else if (dtr >= 11 && dtr <= 15) {
              return [{ code: 'SB743', name: 'Dental Clinic Soiled Utility Room', nsf: 160, quantity: 1 }];
            } else if (dtr >= 16 && dtr <= 20) {
              return [{ code: 'SB743', name: 'Dental Clinic Soiled Utility Room', nsf: 190, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'DENT-509',
          name: 'Dental Equipment Mechanical Room',
          calculate: (inputs) => {
            return [{ code: 'CDS95', name: 'Dental Equipment Mechanical Room', nsf: 120, quantity: 1 }];
          }
        },
        {
          id: 'DENT-510',
          name: 'Housekeeping Aides Closet (HAC)',
          calculate: (inputs) => {
            return [{ code: 'SB244', name: 'Dental Clinic Housekeeping Aides Closet (HAC)', nsf: 60, quantity: 1 }];
          }
        }
      ]
    },
    {
      id: 'FA6',
      name: 'Staff and Administrative Area',
      rooms: [
        {
          id: 'DENT-601',
          name: 'Chief Office',
          calculate: (inputs) => {
            return [{ code: 'SS204', name: 'Dental Clinic Chief Office', nsf: 100, quantity: 1 }];
          }
        },
        {
          id: 'DENT-602',
          name: 'Director Office',
          calculate: (inputs) => {
            return [{ code: 'SS204', name: 'Dental Clinic Director Office', nsf: 100, quantity: 1 }];
          }
        },
        {
          id: 'DENT-603',
          name: 'Administrative Officer (AO) Office',
          calculate: (inputs) => {
            return [{ code: 'SS204', name: 'Dental Clinic Administrative Officer (AO) Office', nsf: 100, quantity: 1 }];
          }
        },
        {
          id: 'DENT-604',
          name: 'Assistant Workstation',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            let quantity = 1;
            if (dtr >= 2 && dtr <= 5) quantity = 1;
            else if (dtr >= 6 && dtr <= 10) quantity = 2;
            else if (dtr >= 11 && dtr <= 15) quantity = 3;
            else if (dtr >= 16 && dtr <= 20) quantity = 4;
            return [{ code: 'SS218', name: 'Dental Clinic Assistant Workstation', nsf: 56, quantity }];
          }
        },
        {
          id: 'DENT-605',
          name: 'Staff Dentist Workstation',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            const quantityMap = { 2: 1, 3: 2, 4: 2, 5: 3, 6: 3, 7: 4, 8: 4, 9: 5, 10: 5, 11: 6, 12: 6, 13: 7, 14: 7, 15: 8, 16: 8, 17: 9, 18: 9, 19: 10, 20: 10 };
            return [{ code: 'SS218', name: 'Dental Clinic Staff Dentist Workstation', nsf: 56, quantity: quantityMap[dtr] || 1 }];
          }
        },
        {
          id: 'DENT-606',
          name: 'Staff Workstation',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            let quantity = 1;
            if (dtr >= 2 && dtr <= 5) quantity = 1;
            else if (dtr >= 6 && dtr <= 10) quantity = 2;
            else if (dtr >= 11 && dtr <= 15) quantity = 3;
            else if (dtr >= 16 && dtr <= 20) quantity = 4;
            return [{ code: 'SS218', name: 'Dental Clinic Staff Workstation', nsf: 56, quantity }];
          }
        },
        {
          id: 'DENT-607',
          name: 'Staff Conference Room',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            if (dtr >= 2 && dtr <= 5) {
              return [{ code: 'SS101', name: 'Dental Clinic Staff Conference Room', nsf: 240, quantity: 1 }];
            } else if (dtr >= 6 && dtr <= 10) {
              return [{ code: 'SS101', name: 'Dental Clinic Staff Conference Room', nsf: 300, quantity: 1 }];
            } else if (dtr >= 11 && dtr <= 15) {
              return [{ code: 'SS101', name: 'Dental Clinic Staff Conference Room', nsf: 500, quantity: 1 }];
            } else if (dtr >= 16 && dtr <= 20) {
              return [{ code: 'SS101', name: 'Dental Clinic Staff Conference Room', nsf: 675, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'DENT-608',
          name: 'Team Room',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            if (dtr >= 2 && dtr <= 4) {
              return [{ code: 'SC243', name: 'Dental Clinic Team Room', nsf: 240, quantity: 1 }];
            } else if (dtr >= 5 && dtr <= 10) {
              return [{ code: 'SC243', name: 'Dental Clinic Team Room', nsf: 360, quantity: 1 }];
            } else if (dtr >= 11 && dtr <= 15) {
              return [{ code: 'SC243', name: 'Dental Clinic Team Room', nsf: 240, quantity: 2 }];
            } else if (dtr >= 16 && dtr <= 20) {
              return [{ code: 'SC243', name: 'Dental Clinic Team Room', nsf: 360, quantity: 2 }];
            }
            return [];
          }
        },
        {
          id: 'DENT-609',
          name: 'Secure Documents Storage Room',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            if (dtr >= 2 && dtr <= 5) {
              return [{ code: 'SC195', name: 'Dental Clinic Secure Documents Storage Room', nsf: 80, quantity: 1 }];
            } else if (dtr >= 6 && dtr <= 15) {
              return [{ code: 'SC195', name: 'Dental Clinic Secure Documents Storage Room', nsf: 100, quantity: 1 }];
            } else if (dtr >= 16 && dtr <= 20) {
              return [{ code: 'SC195', name: 'Dental Clinic Secure Documents Storage Room', nsf: 120, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'DENT-610',
          name: 'Copy / Supply Room',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            let quantity = 1;
            if (dtr >= 2 && dtr <= 10) quantity = 1;
            else if (dtr >= 11 && dtr <= 20) quantity = 2;
            return [{ code: 'SS272', name: 'Dental Clinic Copy / Supply Room', nsf: 80, quantity }];
          }
        },
        {
          id: 'DENT-611',
          name: 'Staff Breakroom',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            if (dtr >= 2 && dtr <= 5) {
              return [{ code: 'SS262', name: 'Dental Clinic Staff Breakroom', nsf: 100, quantity: 1 }];
            } else if (dtr >= 6 && dtr <= 10) {
              return [{ code: 'SS262', name: 'Dental Clinic Staff Breakroom', nsf: 120, quantity: 1 }];
            } else if (dtr >= 11 && dtr <= 15) {
              return [{ code: 'SS262', name: 'Dental Clinic Staff Breakroom', nsf: 140, quantity: 1 }];
            } else if (dtr >= 16 && dtr <= 20) {
              return [{ code: 'SS262', name: 'Dental Clinic Staff Breakroom', nsf: 160, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'DENT-612',
          name: 'Female Staff Locker Room',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            if (dtr >= 2 && dtr <= 5) {
              return [{ code: 'SS232', name: 'Dental Clinic Female Staff Locker Room', nsf: 100, quantity: 1 }];
            } else if (dtr >= 6 && dtr <= 10) {
              return [{ code: 'SS232', name: 'Dental Clinic Female Staff Locker Room', nsf: 150, quantity: 1 }];
            } else if (dtr >= 11 && dtr <= 15) {
              return [{ code: 'SS232', name: 'Dental Clinic Female Staff Locker Room', nsf: 200, quantity: 1 }];
            } else if (dtr >= 16 && dtr <= 20) {
              return [{ code: 'SS232', name: 'Dental Clinic Female Staff Locker Room', nsf: 250, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'DENT-613',
          name: 'Male Staff Locker Room',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            if (dtr >= 2 && dtr <= 5) {
              return [{ code: 'SS241', name: 'Dental Clinic Male Staff Locker Room', nsf: 100, quantity: 1 }];
            } else if (dtr >= 6 && dtr <= 10) {
              return [{ code: 'SS241', name: 'Dental Clinic Male Staff Locker Room', nsf: 150, quantity: 1 }];
            } else if (dtr >= 11 && dtr <= 15) {
              return [{ code: 'SS241', name: 'Dental Clinic Male Staff Locker Room', nsf: 200, quantity: 1 }];
            } else if (dtr >= 16 && dtr <= 20) {
              return [{ code: 'SS241', name: 'Dental Clinic Male Staff Locker Room', nsf: 250, quantity: 1 }];
            }
            return [];
          }
        },
        {
          id: 'DENT-614',
          name: 'Staff Toilet',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            let quantity = 2;
            if (dtr >= 2 && dtr <= 10) quantity = 2;
            else if (dtr >= 6 && dtr <= 20) quantity = 4;
            return [{ code: 'SB191', name: 'Dental Clinic Staff Toilet', nsf: 60, quantity }];
          }
        },
        {
          id: 'DENT-615',
          name: 'Female Staff Shower',
          calculate: (inputs) => {
            return [{ code: 'SB173', name: 'Dental Clinic Staff Female Staff Shower', nsf: 85, quantity: 1 }];
          }
        },
        {
          id: 'DENT-616',
          name: 'Male Staff Shower',
          calculate: (inputs) => {
            return [{ code: 'SB184', name: 'Dental Clinic Staff Male Staff Shower', nsf: 85, quantity: 1 }];
          }
        }
      ]
    },
    {
      id: 'FA7',
      name: 'Education Area',
      rooms: [
        {
          id: 'DENT-701',
          name: 'Residency Director Office',
          calculate: (inputs) => {
            return [{ code: 'SS204', name: 'Dental Clinic Residency Director Office', nsf: 100, quantity: 1 }];
          }
        },
        {
          id: 'DENT-702',
          name: 'Auxiliary Training Coordinator Workstation',
          calculate: (inputs) => {
            return [{ code: 'SS218', name: 'Dental Clinic Auxiliary Training Coordinator Workstation', nsf: 56, quantity: 1 }];
          }
        },
        {
          id: 'DENT-703',
          name: 'Resident Team Room',
          calculate: (inputs) => {
            const dtr = inputs.dental_treatment_rooms;
            if (dtr >= 2 && dtr <= 5) {
              return [{ code: 'SC243', name: 'Dental Clinic Resident Team Room', nsf: 120, quantity: 1 }];
            } else if (dtr >= 6 && dtr <= 10) {
              return [{ code: 'SC243', name: 'Dental Clinic Resident Team Room', nsf: 240, quantity: 1 }];
            } else if (dtr >= 11 && dtr <= 15) {
              return [{ code: 'SC243', name: 'Dental Clinic Resident Team Room', nsf: 360, quantity: 1 }];
            } else if (dtr >= 16 && dtr <= 20) {
              return [{ code: 'SC243', name: 'Dental Clinic Resident Team Room', nsf: 480, quantity: 1 }];
            }
            return [];
          }
        }
      ]
    }
  ]
};

export default CHAPTER_222;
