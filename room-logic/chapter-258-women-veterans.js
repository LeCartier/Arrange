// Chapter 258: Women Veterans Clinical Service (WVCS) (For Models 2 and 3)
// Parsed from VA Space Planning Criteria Section 4 & 5

export const CHAPTER_258 = {
  chapter: "258",
  name: "Women Veterans Clinical Service (WVCS) (For Models 2 and 3)",
  description: "Women Veterans health services supporting comprehensive primary care",
  
  // Section 4: Input Data Statements
  inputs: [
    {
      id: "satellite_lab_authorized",
      label: "Is a Satellite Laboratory authorized?",
      type: "boolean",
      helpText: "Determines if a satellite laboratory is required"
    },
    {
      id: "model_2_authorized",
      label: "Is Model 2 (Separate but shared space) authorized?",
      type: "boolean",
      helpText: "Model 2: Separate but shared space for women veterans services"
    },
    {
      id: "model_3_authorized",
      label: "Is Model 3 (Womens Health Center (WHC)) authorized?",
      type: "boolean",
      helpText: "Model 3: Women's Health Center for larger populations"
    },
    {
      id: "breast_ultrasound_authorized",
      label: "Is Breast Ultrasound authorized?",
      type: "boolean",
      helpText: "Only applicable if Model 3 is authorized",
      condition: (inputs) => inputs.model_3_authorized
    },
    {
      id: "mammography_authorized",
      label: "Is Mammography authorized?",
      type: "boolean",
      helpText: "Only applicable if Model 3 is authorized",
      condition: (inputs) => inputs.model_3_authorized
    },
    {
      id: "stereotactic_radiography_authorized",
      label: "Is Stereotactic Radiography authorized?",
      type: "boolean",
      helpText: "Only applicable if Model 3 is authorized",
      condition: (inputs) => inputs.model_3_authorized
    },
    {
      id: "bone_densitometry_authorized",
      label: "Is Bone Densitometry authorized?",
      type: "boolean",
      helpText: "Determines if bone density scanning is available"
    },
    {
      id: "womens_clinic_stops",
      label: "How many Womens Clinic annual clinic stops (Stop Code 322) are projected?",
      type: "number",
      min: 422,
      max: 8448,
      helpText: "Projected annual clinic stops for women's clinic services"
    },
    {
      id: "gynecology_stops",
      label: "How many Gynecology annual clinic stops (Stop Code 404) are projected?",
      type: "number",
      min: 370,
      max: 7392,
      helpText: "Projected annual clinic stops for gynecology services"
    },
    {
      id: "cancer_screening_stops",
      label: "How many Female Gender-specific Cancer Screening annual clinic stops (Stop Code 704) are projected?",
      type: "number",
      min: 370,
      max: 7392,
      helpText: "Projected annual clinic stops for cancer screening"
    }
  ],
  
  // Section 5: Space Planning Criteria
  functionalAreas: [
    {
      id: "FA1",
      name: "Reception Area",
      description: "Waiting, reception, and support spaces for Women Veterans services",
      condition: (inputs) => inputs.model_2_authorized || inputs.model_3_authorized,
      rooms: [
        {
          id: "SB003",
          code: "SB003",
          name: "Wm Vet Svc Waiting, Bldg Sprt",
          nsf: 80,
          rules: [
            { condition: (inputs, calc) => calc.number_of_patient_rooms === 1, quantity: 1, nsf: 80 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms === 2, quantity: 1, nsf: 130 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms === 3, quantity: 1, nsf: 190 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms === 4, quantity: 1, nsf: 260 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms === 5, quantity: 1, nsf: 310 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms === 6, quantity: 1, nsf: 370 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms === 7, quantity: 1, nsf: 440 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms === 8, quantity: 1, nsf: 520 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms === 9, quantity: 1, nsf: 535 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms === 10, quantity: 1, nsf: 575 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms === 11, quantity: 1, nsf: 595 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms === 12, quantity: 1, nsf: 615 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms === 13, quantity: 1, nsf: 625 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms === 14, quantity: 1, nsf: 640 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms === 15, quantity: 1, nsf: 660 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms === 16, quantity: 1, nsf: 675 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms === 17, quantity: 1, nsf: 680 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms === 18, quantity: 1, nsf: 695 }
          ],
          notes: "Patient rooms include Multipurpose Exam, Gynecology Exam, and Cancer Screening Exam rooms"
        },
        {
          id: "SB051",
          code: "SB051",
          name: "Wm Vet Svc Family Waiting, Bldg Sprt",
          nsf: 125,
          rules: [
            { condition: (inputs, calc) => calc.number_of_patient_rooms >= 1 && calc.number_of_patient_rooms <= 6, quantity: 1, nsf: 125 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms >= 7 && calc.number_of_patient_rooms <= 12, quantity: 1, nsf: 200 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms >= 13 && calc.number_of_patient_rooms <= 18, quantity: 1, nsf: 225 }
          ]
        },
        {
          id: "SC183",
          code: "SC183",
          name: "Wm Vet Svc Reception, Clncl Sprt",
          nsf: 260,
          rules: [
            { condition: (inputs, calc) => calc.number_of_patient_rooms >= 1 && calc.number_of_patient_rooms <= 9, quantity: 1, nsf: 260 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms >= 10 && calc.number_of_patient_rooms <= 18, quantity: 1, nsf: 385 }
          ]
        },
        {
          id: "SS268",
          code: "SS268",
          name: "Wm Vet Svc Copy / Supply Alcove, Stff Sprt",
          nsf: 40,
          rules: [
            { condition: (inputs, calc) => calc.number_of_patient_rooms >= 1 && calc.number_of_patient_rooms <= 6, quantity: 1, nsf: 40 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms >= 7 && calc.number_of_patient_rooms <= 12, quantity: 1, nsf: 60 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms >= 13 && calc.number_of_patient_rooms <= 18, quantity: 1, nsf: 80 }
          ],
          notes: "Locate adjacent to Reception"
        },
        {
          id: "SC271",
          code: "SC271",
          name: "Wm Vet Svc Interview / Consult Room, Clncl Sprt",
          nsf: 120,
          rules: [
            { condition: (inputs, calc) => calc.number_of_patient_rooms >= 1 && calc.number_of_patient_rooms <= 9, quantity: 1 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms >= 10 && calc.number_of_patient_rooms <= 18, quantity: 2 }
          ]
        },
        {
          id: "SB136",
          code: "SB136",
          name: "Wm Vet Svc Family Toilet, Bldg Sprt",
          nsf: 80,
          rules: [
            { condition: (inputs, calc) => calc.number_of_patient_rooms >= 1 && calc.number_of_patient_rooms <= 18, quantity: 1 }
          ],
          notes: "Locate adjacent to Public Toilet; provide baby changing station"
        },
        {
          id: "SB191",
          code: "SB191",
          name: "Wm Vet Svc Visitor Toilet, Bldg Sprt",
          nsf: 60,
          rules: [
            { condition: (inputs, calc) => calc.number_of_patient_rooms >= 1 && calc.number_of_patient_rooms <= 18, quantity: 1 }
          ],
          notes: "Allocate one for male, rest for female"
        },
        {
          id: "SV381",
          code: "SV381",
          name: "Wm Vet Svc Refreshment Center Alcove, F&N Svc",
          nsf: 40,
          rules: [
            { condition: (inputs, calc) => calc.number_of_patient_rooms >= 1 && calc.number_of_patient_rooms <= 6, quantity: 1, nsf: 40 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms >= 7 && calc.number_of_patient_rooms <= 12, quantity: 1, nsf: 60 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms >= 13 && calc.number_of_patient_rooms <= 18, quantity: 1, nsf: 80 }
          ]
        },
        {
          id: "SC165",
          code: "SC165",
          name: "Wm Vet Svc Patient Check-in Kiosk, Clncl Sprt",
          nsf: 105,
          rules: [
            { condition: (inputs, calc) => calc.number_of_patient_rooms >= 1 && calc.number_of_patient_rooms <= 13, quantity: 1 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms >= 14 && calc.number_of_patient_rooms <= 18, quantity: 2 }
          ]
        },
        {
          id: "SC172",
          code: "SC172",
          name: "Wm Vet Svc Patient Education Workstation, Clncl Sprt",
          nsf: 40,
          rules: [
            { condition: (inputs, calc) => calc.number_of_patient_rooms >= 1 && calc.number_of_patient_rooms <= 9, quantity: 1 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms >= 10 && calc.number_of_patient_rooms <= 18, quantity: 2 }
          ]
        },
        {
          id: "CWV11",
          code: "CWV11",
          name: "Lactation Room, Wm Vet Svc",
          nsf: 75,
          rules: [
            { condition: (inputs, calc) => calc.number_of_patient_rooms >= 1 && calc.number_of_patient_rooms <= 13, quantity: 1 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms >= 14 && calc.number_of_patient_rooms <= 18, quantity: 2 }
          ]
        },
        {
          id: "SB159",
          code: "SB159",
          name: "Wm Vet Svc Lactation Room Toilet, Bldg Sprt",
          nsf: 60,
          rules: [
            { condition: (inputs, calc) => calc.number_of_patient_rooms >= 1 && calc.number_of_patient_rooms <= 13, quantity: 1 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms >= 14 && calc.number_of_patient_rooms <= 18, quantity: 2 }
          ],
          notes: "Locate adjacent to the Lactation Room"
        }
      ]
    },
    {
      id: "FA2",
      name: "Patient Area",
      description: "Exam rooms and patient care spaces",
      condition: (inputs) => inputs.model_2_authorized || inputs.model_3_authorized,
      rooms: [
        {
          id: "CWV16",
          code: "CWV16",
          name: "Multipurpose Exam Room, Wm Vet Svc",
          nsf: 140,
          rules: [
            { condition: (inputs) => inputs.womens_clinic_stops >= 422 && inputs.womens_clinic_stops <= 1408, quantity: 1 },
            { condition: (inputs) => inputs.womens_clinic_stops >= 1409 && inputs.womens_clinic_stops <= 2816, quantity: 2 },
            { condition: (inputs) => inputs.womens_clinic_stops >= 2817 && inputs.womens_clinic_stops <= 4224, quantity: 3 },
            { condition: (inputs) => inputs.womens_clinic_stops >= 4225 && inputs.womens_clinic_stops <= 5632, quantity: 4 },
            { condition: (inputs) => inputs.womens_clinic_stops >= 5633 && inputs.womens_clinic_stops <= 7040, quantity: 5 },
            { condition: (inputs) => inputs.womens_clinic_stops >= 7041 && inputs.womens_clinic_stops <= 8448, quantity: 6 }
          ],
          notes: "Equipped for gender specific care, routine primary care, Gynecology and Cancer Screening"
        },
        {
          id: "CWV21",
          code: "CWV21",
          name: "Gynecology Exam Room, Wm Vet Svc",
          nsf: 140,
          rules: [
            { condition: (inputs) => inputs.gynecology_stops >= 370 && inputs.gynecology_stops <= 1232, quantity: 1 },
            { condition: (inputs) => inputs.gynecology_stops >= 1233 && inputs.gynecology_stops <= 2464, quantity: 2 },
            { condition: (inputs) => inputs.gynecology_stops >= 2465 && inputs.gynecology_stops <= 3696, quantity: 3 },
            { condition: (inputs) => inputs.gynecology_stops >= 3697 && inputs.gynecology_stops <= 4928, quantity: 4 },
            { condition: (inputs) => inputs.gynecology_stops >= 4929 && inputs.gynecology_stops <= 6160, quantity: 5 },
            { condition: (inputs) => inputs.gynecology_stops >= 6161 && inputs.gynecology_stops <= 7392, quantity: 6 }
          ],
          notes: "Equipped for GYN care; can also be used for routine Primary Care and Cancer Screening"
        },
        {
          id: "CWV26",
          code: "CWV26",
          name: "Cancer Screening Exam Room, Wm Vet Svc",
          nsf: 140,
          rules: [
            { condition: (inputs) => inputs.cancer_screening_stops >= 370 && inputs.cancer_screening_stops <= 1232, quantity: 1 },
            { condition: (inputs) => inputs.cancer_screening_stops >= 1233 && inputs.cancer_screening_stops <= 2464, quantity: 2 },
            { condition: (inputs) => inputs.cancer_screening_stops >= 2465 && inputs.cancer_screening_stops <= 3696, quantity: 3 },
            { condition: (inputs) => inputs.cancer_screening_stops >= 3697 && inputs.cancer_screening_stops <= 4928, quantity: 4 },
            { condition: (inputs) => inputs.cancer_screening_stops >= 4929 && inputs.cancer_screening_stops <= 6160, quantity: 5 },
            { condition: (inputs) => inputs.cancer_screening_stops >= 6161 && inputs.cancer_screening_stops <= 7392, quantity: 6 }
          ],
          notes: "Equipped for gender specific care, routine primary care including Gynecology"
        },
        {
          id: "CWV31",
          code: "CWV31",
          name: "Breast Clinic Exam Room, Wm Vet Svc",
          nsf: 140,
          rules: [
            { condition: (inputs, calc) => calc.number_of_patient_rooms >= 1 && calc.number_of_patient_rooms <= 18, quantity: 1 }
          ]
        },
        {
          id: "SB159_PATIENT",
          code: "SB159",
          name: "Wm Vet Svc Patient Toilet, Bldg Sprt",
          nsf: 60,
          rules: [
            { condition: (inputs, calc) => calc.number_of_patient_rooms >= 1 && calc.number_of_patient_rooms <= 3, quantity: 1 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms >= 4 && calc.number_of_patient_rooms <= 6, quantity: 2 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms >= 7 && calc.number_of_patient_rooms <= 9, quantity: 3 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms >= 10 && calc.number_of_patient_rooms <= 12, quantity: 4 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms >= 13 && calc.number_of_patient_rooms <= 15, quantity: 5 },
            { condition: (inputs, calc) => calc.number_of_patient_rooms >= 16 && calc.number_of_patient_rooms <= 18, quantity: 6 }
          ],
          notes: "Provide direct access from Exam Rooms"
        }
      ]
    }
  ],
  
  // Calculated values used in room rules
  calculations: {
    number_of_patient_rooms: (inputs) => {
      // Calculate total patient rooms based on workload
      let count = 0;
      
      // Count Multipurpose Exam Rooms
      if (inputs.womens_clinic_stops >= 422 && inputs.womens_clinic_stops <= 1408) count += 1;
      else if (inputs.womens_clinic_stops >= 1409 && inputs.womens_clinic_stops <= 2816) count += 2;
      else if (inputs.womens_clinic_stops >= 2817 && inputs.womens_clinic_stops <= 4224) count += 3;
      else if (inputs.womens_clinic_stops >= 4225 && inputs.womens_clinic_stops <= 5632) count += 4;
      else if (inputs.womens_clinic_stops >= 5633 && inputs.womens_clinic_stops <= 7040) count += 5;
      else if (inputs.womens_clinic_stops >= 7041 && inputs.womens_clinic_stops <= 8448) count += 6;
      
      // Count Gynecology Exam Rooms
      if (inputs.gynecology_stops >= 370 && inputs.gynecology_stops <= 1232) count += 1;
      else if (inputs.gynecology_stops >= 1233 && inputs.gynecology_stops <= 2464) count += 2;
      else if (inputs.gynecology_stops >= 2465 && inputs.gynecology_stops <= 3696) count += 3;
      else if (inputs.gynecology_stops >= 3697 && inputs.gynecology_stops <= 4928) count += 4;
      else if (inputs.gynecology_stops >= 4929 && inputs.gynecology_stops <= 6160) count += 5;
      else if (inputs.gynecology_stops >= 6161 && inputs.gynecology_stops <= 7392) count += 6;
      
      // Count Cancer Screening Exam Rooms
      if (inputs.cancer_screening_stops >= 370 && inputs.cancer_screening_stops <= 1232) count += 1;
      else if (inputs.cancer_screening_stops >= 1233 && inputs.cancer_screening_stops <= 2464) count += 2;
      else if (inputs.cancer_screening_stops >= 2465 && inputs.cancer_screening_stops <= 3696) count += 3;
      else if (inputs.cancer_screening_stops >= 3697 && inputs.cancer_screening_stops <= 4928) count += 4;
      else if (inputs.cancer_screening_stops >= 4929 && inputs.cancer_screening_stops <= 6160) count += 5;
      else if (inputs.cancer_screening_stops >= 6161 && inputs.cancer_screening_stops <= 7392) count += 6;
      
      return count;
    }
  }
};
