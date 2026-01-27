// Chapter 295: Imaging Service
// Based on VA PG-18-9 Space Planning Criteria (March 1, 2022)
// NTDG Factor: 1.55
// Canonical FA structure from Combined Space Criteria

export const CHAPTER_295 = {
  id: '295',
  name: 'Imaging Service',
  ntdgFactor: 1.55,
  
  // Room throughput values (85% utilization)
  throughputValues: {
    generalRadiology: 6800,
    chestImaging: 6800,
    rfRoom: 3400,
    multipurposeRF: 1700,
    proneBreast: 1700,
    standingBreast: 3400,
    abus: 3400,
    ultrasound: 3400,
    boneDensitometry: 3400,
    ct: 3400,
    mri: 2125,
    nuclearMedicine: 2125,
    spectCT: 2125,
    thyroidProbe: 3400,
    petCT: 2125,
    petMRI: 1700
  },

  inputs: [
    // Mission questions
    {
      id: 'has_icu_or_ed',
      label: 'Does Facility provide Intensive Care (ICU) or Emergency (ED) Services?',
      type: 'checkbox',
      default: true
    },
    {
      id: 'has_class2_radiology',
      label: 'Is Class 2 Radiology authorized?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'has_class2_rf',
      label: 'Is Class 2 Radiology / Fluoroscopy (R/F) authorized?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'has_multipurpose_rf',
      label: 'Is Class 2 Multipurpose Radiology / Fluoroscopy (R/F) authorized?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'has_chest_imaging',
      label: 'Is Chest Imaging authorized?',
      type: 'checkbox',
      default: true
    },
    {
      id: 'has_breast_imaging',
      label: 'Is Breast Imaging authorized?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'has_breast_biopsy',
      label: 'Is facility authorized to perform breast biopsies?',
      type: 'checkbox',
      default: false,
      dependsOn: 'has_breast_imaging'
    },
    {
      id: 'has_abus',
      label: 'Is ABUS (Automated Breast Ultrasound) Scanning authorized?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'has_class2_ultrasound',
      label: 'Is Class 2 Ultrasound authorized?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'has_bone_densitometry',
      label: 'Is Bone Densitometry authorized?',
      type: 'checkbox',
      default: true
    },
    {
      id: 'has_class2_ct',
      label: 'Is Class 2 CT authorized?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'has_class2_mri',
      label: 'Is Class 2 MRI authorized?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'has_nuclear_medicine',
      label: 'Is Nuclear Medicine authorized?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'has_class2_spect_ct',
      label: 'Is Class 2 SPECT/CT authorized?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'has_thyroid_probe',
      label: 'Is Thyroid Probe Scanning authorized?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'has_pet_ct',
      label: 'Is PET/CT authorized?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'has_pet_mri',
      label: 'Is PET/MRI authorized?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'has_teleradiology',
      label: 'Is Tele-Radiology authorized?',
      type: 'checkbox',
      default: false
    },
    {
      id: 'has_oncall_bedroom',
      label: 'Is additional On-Call Bedroom authorized?',
      type: 'checkbox',
      default: false
    },
    // Workload questions
    {
      id: 'annual_general_radiology',
      label: 'Annual General Radiographic procedures projected',
      type: 'number',
      min: 0,
      max: 54400,
      default: 6800
    },
    {
      id: 'annual_chest_imaging',
      label: 'Annual Chest Imaging procedures projected',
      type: 'number',
      min: 0,
      max: 13600,
      default: 0
    },
    {
      id: 'annual_rf',
      label: 'Annual Radiographic / Fluoroscopic (RF) procedures projected',
      type: 'number',
      min: 0,
      max: 6800,
      default: 0
    },
    {
      id: 'annual_multipurpose_rf',
      label: 'Annual Multipurpose RF procedures projected',
      type: 'number',
      min: 0,
      max: 3400,
      default: 0
    },
    {
      id: 'annual_prone_breast',
      label: 'Annual Prone Breast Imaging procedures projected',
      type: 'number',
      min: 0,
      max: 1700,
      default: 0
    },
    {
      id: 'annual_standing_breast',
      label: 'Annual Standing Breast Imaging procedures projected',
      type: 'number',
      min: 0,
      max: 6800,
      default: 0
    },
    {
      id: 'annual_abus',
      label: 'Annual ABUS procedures projected',
      type: 'number',
      min: 0,
      max: 3400,
      default: 0
    },
    {
      id: 'annual_ultrasound',
      label: 'Annual Ultrasound procedures projected',
      type: 'number',
      min: 0,
      max: 20400,
      default: 3400
    },
    {
      id: 'annual_bone_densitometry',
      label: 'Annual Bone Densitometry procedures projected',
      type: 'number',
      min: 0,
      max: 3400,
      default: 1700
    },
    {
      id: 'annual_ct',
      label: 'Annual CT procedures projected',
      type: 'number',
      min: 0,
      max: 17000,
      default: 3400
    },
    {
      id: 'annual_mri',
      label: 'Annual MRI procedures projected',
      type: 'number',
      min: 0,
      max: 8500,
      default: 2125
    },
    {
      id: 'annual_nuclear_medicine',
      label: 'Annual Nuclear Medicine procedures projected',
      type: 'number',
      min: 0,
      max: 2125,
      default: 0
    },
    {
      id: 'annual_spect_ct',
      label: 'Annual SPECT/CT procedures projected',
      type: 'number',
      min: 0,
      max: 8500,
      default: 0
    },
    {
      id: 'annual_thyroid_probe',
      label: 'Annual Thyroid Probe procedures projected',
      type: 'number',
      min: 0,
      max: 3400,
      default: 0
    },
    {
      id: 'annual_pet_ct',
      label: 'Annual PET/CT procedures projected',
      type: 'number',
      min: 0,
      max: 4250,
      default: 0
    },
    {
      id: 'annual_pet_mri',
      label: 'Annual PET/MRI procedures projected',
      type: 'number',
      min: 0,
      max: 1700,
      default: 0
    },
    // Staffing questions
    {
      id: 'num_radiologists',
      label: 'Number of Radiologists',
      type: 'number',
      min: 1,
      max: 20,
      default: 2
    },
    {
      id: 'num_technologists',
      label: 'Number of Imaging Technologists',
      type: 'number',
      min: 1,
      max: 60,
      default: 6
    }
  ],

  // Helper to calculate rooms needed based on workload
  calculateRoomsFromWorkload(workload, throughput) {
    if (workload <= 0 || throughput <= 0) return 0;
    return Math.ceil(workload / throughput);
  },

  // Helper to get total imaging rooms for support calculations
  calculateTotalImagingRooms(inputs) {
    let total = 0;
    
    // General Radiology
    if (inputs.annual_general_radiology > 0) {
      total += Math.ceil(inputs.annual_general_radiology / 6800);
    }
    // Chest Imaging
    if (inputs.has_chest_imaging && inputs.annual_chest_imaging > 0) {
      total += Math.ceil(inputs.annual_chest_imaging / 6800);
    }
    // R/F
    if (inputs.annual_rf > 0) {
      total += Math.ceil(inputs.annual_rf / 3400);
    }
    // Multipurpose R/F
    if (inputs.has_multipurpose_rf && inputs.annual_multipurpose_rf > 0) {
      total += Math.ceil(inputs.annual_multipurpose_rf / 1700);
    }
    // Breast Imaging
    if (inputs.has_breast_imaging) {
      if (inputs.annual_prone_breast > 0) total += Math.ceil(inputs.annual_prone_breast / 1700);
      if (inputs.annual_standing_breast > 0) total += Math.ceil(inputs.annual_standing_breast / 3400);
    }
    // ABUS
    if (inputs.has_abus && inputs.annual_abus > 0) {
      total += Math.ceil(inputs.annual_abus / 3400);
    }
    // Ultrasound
    if (inputs.annual_ultrasound > 0) {
      total += Math.ceil(inputs.annual_ultrasound / 3400);
    }
    // Bone Densitometry
    if (inputs.has_bone_densitometry && inputs.annual_bone_densitometry > 0) {
      total += Math.ceil(inputs.annual_bone_densitometry / 3400);
    }
    // CT
    if (inputs.annual_ct > 0) {
      total += Math.ceil(inputs.annual_ct / 3400);
    }
    // MRI
    if (inputs.annual_mri > 0) {
      total += Math.ceil(inputs.annual_mri / 2125);
    }
    // Nuclear Medicine
    if (inputs.has_nuclear_medicine && inputs.annual_nuclear_medicine > 0) {
      total += Math.ceil(inputs.annual_nuclear_medicine / 2125);
    }
    // SPECT/CT
    if (inputs.annual_spect_ct > 0) {
      total += Math.ceil(inputs.annual_spect_ct / 2125);
    }
    // Thyroid Probe
    if (inputs.has_thyroid_probe && inputs.annual_thyroid_probe > 0) {
      total += Math.ceil(inputs.annual_thyroid_probe / 3400);
    }
    // PET/CT
    if (inputs.has_pet_ct && inputs.annual_pet_ct > 0) {
      total += Math.ceil(inputs.annual_pet_ct / 2125);
    }
    // PET/MRI
    if (inputs.has_pet_mri && inputs.annual_pet_mri > 0) {
      total += Math.ceil(inputs.annual_pet_mri / 1700);
    }
    
    return total;
  },

  functionalAreas: [
    // =========================================================================
    // FA 1: IMAGING / SCANNING ROOM CALCULATION (Meta - calculation only)
    // =========================================================================
    {
      id: 'FA1',
      name: 'Imaging & Scanning Room Calculation',
      rooms: []  // Calculation FA - no physical rooms
    },

    // =========================================================================
    // FA 2: IMAGING SERVICES RECEPTION AREA
    // =========================================================================
    {
      id: 'FA2',
      name: 'Imaging Services Reception Area',
      rooms: [
        {
          code: 'SS222',
          name: 'Imaging Services Waiting',
          baseNSF: 150,
          calculateQuantity: (inputs, chapter) => chapter.calculateTotalImagingRooms(inputs) >= 1 ? 1 : 0,
          calculateNSF: (inputs, chapter) => {
            const rooms = chapter.calculateTotalImagingRooms(inputs);
            if (rooms >= 31) return 400;
            if (rooms >= 21) return 300;
            if (rooms >= 11) return 225;
            return 150;
          }
        },
        {
          code: 'SS223',
          name: 'Imaging Services Sub-Waiting',
          baseNSF: 100,
          calculateQuantity: (inputs, chapter) => {
            const rooms = chapter.calculateTotalImagingRooms(inputs);
            if (rooms >= 31) return 4;
            if (rooms >= 21) return 3;
            if (rooms >= 11) return 2;
            if (rooms >= 1) return 1;
            return 0;
          }
        },
        {
          code: 'SB091',
          name: 'Imaging Services Reception / Check-in',
          baseNSF: 80,
          calculateQuantity: (inputs, chapter) => chapter.calculateTotalImagingRooms(inputs) >= 1 ? 1 : 0,
          calculateNSF: (inputs, chapter) => {
            const rooms = chapter.calculateTotalImagingRooms(inputs);
            if (rooms >= 21) return 120;
            return 80;
          }
        },
        {
          code: 'VB241',
          name: 'Patient Changing Room',
          baseNSF: 40,
          calculateQuantity: (inputs, chapter) => {
            const rooms = chapter.calculateTotalImagingRooms(inputs);
            if (rooms >= 31) return 8;
            if (rooms >= 21) return 6;
            if (rooms >= 11) return 4;
            if (rooms >= 1) return 2;
            return 0;
          }
        },
        {
          code: 'SB191',
          name: 'Imaging Services Patient Toilet',
          baseNSF: 60,
          calculateQuantity: (inputs, chapter) => {
            const rooms = chapter.calculateTotalImagingRooms(inputs);
            if (rooms >= 21) return 4;
            if (rooms >= 11) return 3;
            if (rooms >= 1) return 2;
            return 0;
          }
        }
      ]
    },

    // =========================================================================
    // FA 3: GENERAL RADIOLOGY AREA
    // =========================================================================
    {
      id: 'FA3',
      name: 'General Radiology Area',
      rooms: [
        {
          code: 'CG011',
          name: 'Class 1 General Radiology Room',
          baseNSF: 320,
          calculateQuantity: (inputs, chapter) => {
            if (!inputs.has_icu_or_ed) return 0;
            const total = Math.ceil((inputs.annual_general_radiology || 0) / 6800);
            // Class 1 rooms for lower acuity
            return Math.max(0, total - (inputs.has_class2_radiology ? 1 : 0));
          }
        },
        {
          code: 'CG012',
          name: 'Class 2 General Radiology Room',
          baseNSF: 400,
          calculateQuantity: (inputs) => {
            if (!inputs.has_class2_radiology && !inputs.has_icu_or_ed) return 0;
            return inputs.has_class2_radiology ? 1 : 0;
          }
        },
        {
          code: 'CG021',
          name: 'Chest Imaging Room',
          baseNSF: 280,
          calculateQuantity: (inputs) => {
            if (!inputs.has_chest_imaging) return 0;
            return Math.min(2, Math.ceil((inputs.annual_chest_imaging || 0) / 6800));
          }
        },
        {
          code: 'CG031',
          name: 'Class 1 Radiology / Fluoroscopy (R/F) Room',
          baseNSF: 500,
          calculateQuantity: (inputs) => {
            if (!inputs.has_icu_or_ed) return 0;
            const total = Math.ceil((inputs.annual_rf || 0) / 3400);
            return Math.max(0, total - (inputs.has_class2_rf ? 1 : 0));
          }
        },
        {
          code: 'CG032',
          name: 'Class 2 Radiology / Fluoroscopy (R/F) Room',
          baseNSF: 600,
          calculateQuantity: (inputs) => inputs.has_class2_rf ? 1 : 0
        },
        {
          code: 'CG041',
          name: 'Class 2 Multipurpose R/F Room',
          baseNSF: 700,
          calculateQuantity: (inputs) => {
            if (!inputs.has_multipurpose_rf) return 0;
            return Math.min(2, Math.ceil((inputs.annual_multipurpose_rf || 0) / 1700));
          }
        },
        {
          code: 'CS201',
          name: 'General Radiology Control Room',
          baseNSF: 80,
          calculateQuantity: (inputs, chapter) => {
            const genRadRooms = Math.ceil((inputs.annual_general_radiology || 0) / 6800);
            const rfRooms = Math.ceil((inputs.annual_rf || 0) / 3400);
            return genRadRooms + rfRooms;
          }
        }
      ]
    },

    // =========================================================================
    // FA 4: BREAST IMAGING AREA
    // =========================================================================
    {
      id: 'FA4',
      name: 'Breast Imaging Area',
      rooms: [
        {
          code: 'CG051',
          name: 'Class 2 Prone Breast Imaging Room',
          baseNSF: 300,
          calculateQuantity: (inputs) => {
            if (!inputs.has_breast_imaging) return 0;
            return Math.min(1, Math.ceil((inputs.annual_prone_breast || 0) / 1700));
          }
        },
        {
          code: 'CG052',
          name: 'Standing Breast Imaging Room',
          baseNSF: 200,
          calculateQuantity: (inputs) => {
            if (!inputs.has_breast_imaging) return 0;
            return Math.min(2, Math.ceil((inputs.annual_standing_breast || 0) / 3400));
          }
        },
        {
          code: 'CG053',
          name: 'ABUS Scanning Room',
          baseNSF: 200,
          calculateQuantity: (inputs) => {
            if (!inputs.has_abus) return 0;
            return Math.min(1, Math.ceil((inputs.annual_abus || 0) / 3400));
          }
        },
        {
          code: 'SS222',
          name: 'Breast Imaging Sub-Waiting',
          baseNSF: 80,
          calculateQuantity: (inputs) => inputs.has_breast_imaging ? 1 : 0
        }
      ]
    },

    // =========================================================================
    // FA 5: ULTRASOUND AREA
    // =========================================================================
    {
      id: 'FA5',
      name: 'Ultrasound Area',
      rooms: [
        {
          code: 'CG061',
          name: 'Class 1 Ultrasound Room',
          baseNSF: 200,
          calculateQuantity: (inputs) => {
            const total = Math.ceil((inputs.annual_ultrasound || 0) / 3400);
            return Math.max(0, total - (inputs.has_class2_ultrasound ? 1 : 0));
          }
        },
        {
          code: 'CG062',
          name: 'Class 2 Ultrasound Room',
          baseNSF: 280,
          calculateQuantity: (inputs) => inputs.has_class2_ultrasound ? 1 : 0
        }
      ]
    },

    // =========================================================================
    // FA 6: BONE DENSITOMETRY AREA
    // =========================================================================
    {
      id: 'FA6',
      name: 'Bone Densitometry Area',
      rooms: [
        {
          code: 'CG071',
          name: 'Bone Densitometry Room',
          baseNSF: 200,
          calculateQuantity: (inputs) => {
            if (!inputs.has_bone_densitometry) return 0;
            return Math.min(1, Math.ceil((inputs.annual_bone_densitometry || 0) / 3400));
          }
        }
      ]
    },

    // =========================================================================
    // FA 7: COMPUTED TOMOGRAPHY (CT) AREA
    // =========================================================================
    {
      id: 'FA7',
      name: 'Computed Tomography (CT) Area',
      rooms: [
        {
          code: 'CG081',
          name: 'Class 1 CT Scanning Room',
          baseNSF: 500,
          calculateQuantity: (inputs) => {
            const total = Math.ceil((inputs.annual_ct || 0) / 3400);
            return Math.max(0, total - (inputs.has_class2_ct ? 1 : 0));
          }
        },
        {
          code: 'CG082',
          name: 'Class 2 CT Scanning Room',
          baseNSF: 600,
          calculateQuantity: (inputs) => inputs.has_class2_ct ? 1 : 0
        },
        {
          code: 'CS202',
          name: 'CT Control Room',
          baseNSF: 100,
          calculateQuantity: (inputs) => Math.ceil((inputs.annual_ct || 0) / 3400)
        },
        {
          code: 'CS203',
          name: 'CT Equipment Room',
          baseNSF: 120,
          calculateQuantity: (inputs) => Math.ceil((inputs.annual_ct || 0) / 3400)
        }
      ]
    },

    // =========================================================================
    // FA 8: MAGNETIC RESONANCE IMAGING (MRI) AREA
    // =========================================================================
    {
      id: 'FA8',
      name: 'Magnetic Resonance Imaging (MRI) Area',
      rooms: [
        {
          code: 'CG091',
          name: 'Class 1 MRI Scanning Room',
          baseNSF: 600,
          calculateQuantity: (inputs) => {
            const total = Math.ceil((inputs.annual_mri || 0) / 2125);
            return Math.max(0, total - (inputs.has_class2_mri ? 1 : 0));
          }
        },
        {
          code: 'CG092',
          name: 'Class 2 MRI Scanning Room',
          baseNSF: 700,
          calculateQuantity: (inputs) => inputs.has_class2_mri ? 1 : 0
        },
        {
          code: 'CS204',
          name: 'MRI Control Room',
          baseNSF: 120,
          calculateQuantity: (inputs) => Math.ceil((inputs.annual_mri || 0) / 2125)
        },
        {
          code: 'CS205',
          name: 'MRI Equipment Room',
          baseNSF: 200,
          calculateQuantity: (inputs) => Math.ceil((inputs.annual_mri || 0) / 2125)
        },
        {
          code: 'CS206',
          name: 'MRI Patient Prep / Recovery',
          baseNSF: 120,
          calculateQuantity: (inputs) => Math.ceil((inputs.annual_mri || 0) / 2125)
        }
      ]
    },

    // =========================================================================
    // FA 9: NUCLEAR MEDICINE (NM) AREA
    // =========================================================================
    {
      id: 'FA9',
      name: 'Nuclear Medicine (NM) Area',
      rooms: [
        {
          code: 'CG101',
          name: 'Nuclear Medicine Scanning Room',
          baseNSF: 400,
          calculateQuantity: (inputs) => {
            if (!inputs.has_nuclear_medicine) return 0;
            return Math.min(1, Math.ceil((inputs.annual_nuclear_medicine || 0) / 2125));
          }
        },
        {
          code: 'CG102',
          name: 'Class 1 SPECT/CT Scanning Room',
          baseNSF: 500,
          calculateQuantity: (inputs) => {
            const total = Math.ceil((inputs.annual_spect_ct || 0) / 2125);
            return Math.max(0, total - (inputs.has_class2_spect_ct ? 1 : 0));
          }
        },
        {
          code: 'CG103',
          name: 'Class 2 SPECT/CT Scanning Room',
          baseNSF: 600,
          calculateQuantity: (inputs) => inputs.has_class2_spect_ct ? 1 : 0
        },
        {
          code: 'CG104',
          name: 'Thyroid Probe Scanning Room',
          baseNSF: 200,
          calculateQuantity: (inputs) => {
            if (!inputs.has_thyroid_probe) return 0;
            return Math.min(1, Math.ceil((inputs.annual_thyroid_probe || 0) / 3400));
          }
        },
        {
          code: 'CS211',
          name: 'Hot Lab / Radiopharmacy',
          baseNSF: 200,
          calculateQuantity: (inputs) => inputs.has_nuclear_medicine || inputs.annual_spect_ct > 0 ? 1 : 0
        },
        {
          code: 'SS222',
          name: 'Low-energy Isotope "Hot" Patient Waiting',
          baseNSF: 100,
          calculateQuantity: (inputs) => inputs.has_nuclear_medicine || inputs.annual_spect_ct > 0 ? 1 : 0
        }
      ]
    },

    // =========================================================================
    // FA 10: PET/CT AREA
    // =========================================================================
    {
      id: 'FA10',
      name: 'Positron Emission Tomography (PET) Computed Tomography (CT) - PET/CT Area',
      rooms: [
        {
          code: 'CG111',
          name: 'Class 1 PET/CT Scanning Room',
          baseNSF: 600,
          calculateQuantity: (inputs) => {
            if (!inputs.has_pet_ct) return 0;
            const total = Math.ceil((inputs.annual_pet_ct || 0) / 2125);
            return Math.max(0, total - (inputs.has_class2_ct ? 1 : 0));
          }
        },
        {
          code: 'CG112',
          name: 'Class 2 PET/CT Scanning Room',
          baseNSF: 700,
          calculateQuantity: (inputs) => inputs.has_pet_ct && inputs.has_class2_ct ? 1 : 0
        },
        {
          code: 'CS212',
          name: 'PET/CT Control Room',
          baseNSF: 120,
          calculateQuantity: (inputs) => {
            if (!inputs.has_pet_ct) return 0;
            return Math.ceil((inputs.annual_pet_ct || 0) / 2125);
          }
        },
        {
          code: 'CS213',
          name: 'PET/CT Uptake Room',
          baseNSF: 100,
          calculateQuantity: (inputs) => {
            if (!inputs.has_pet_ct) return 0;
            return Math.ceil((inputs.annual_pet_ct || 0) / 2125) * 2;  // 2 per scanner
          }
        }
      ]
    },

    // =========================================================================
    // FA 11: PET/MRI AREA
    // =========================================================================
    {
      id: 'FA11',
      name: 'Positron Emission Tomography (PET) Magnetic Resonance Imaging (MRI) - PET/MRI Area',
      rooms: [
        {
          code: 'CG121',
          name: 'Class 1 PET/MRI Scanning Room',
          baseNSF: 700,
          calculateQuantity: (inputs) => {
            if (!inputs.has_pet_mri) return 0;
            const total = Math.ceil((inputs.annual_pet_mri || 0) / 1700);
            return Math.max(0, total - (inputs.has_class2_mri ? 1 : 0));
          }
        },
        {
          code: 'CG122',
          name: 'Class 2 PET/MRI Scanning Room',
          baseNSF: 800,
          calculateQuantity: (inputs) => inputs.has_pet_mri && inputs.has_class2_mri ? 1 : 0
        },
        {
          code: 'CS214',
          name: 'PET/MRI Control Room',
          baseNSF: 140,
          calculateQuantity: (inputs) => {
            if (!inputs.has_pet_mri) return 0;
            return Math.ceil((inputs.annual_pet_mri || 0) / 1700);
          }
        },
        {
          code: 'CS215',
          name: 'PET/MRI Uptake Room',
          baseNSF: 100,
          calculateQuantity: (inputs) => {
            if (!inputs.has_pet_mri) return 0;
            return Math.ceil((inputs.annual_pet_mri || 0) / 1700) * 2;  // 2 per scanner
          }
        }
      ]
    },

    // =========================================================================
    // FA 12: IMAGING SERVICES SUPPORT AREA
    // =========================================================================
    {
      id: 'FA12',
      name: 'Imaging Services Support Area',
      rooms: [
        {
          code: 'CS221',
          name: 'Contrast Media Prep Room',
          baseNSF: 100,
          calculateQuantity: (inputs, chapter) => chapter.calculateTotalImagingRooms(inputs) >= 1 ? 1 : 0
        },
        {
          code: 'CS222',
          name: 'PACS Server Room',
          baseNSF: 150,
          calculateQuantity: (inputs, chapter) => chapter.calculateTotalImagingRooms(inputs) >= 1 ? 1 : 0
        },
        {
          code: 'CS231',
          name: 'Clean Utility / Supply',
          baseNSF: 100,
          calculateQuantity: (inputs, chapter) => {
            const rooms = chapter.calculateTotalImagingRooms(inputs);
            if (rooms >= 31) return 3;
            if (rooms >= 11) return 2;
            if (rooms >= 1) return 1;
            return 0;
          }
        },
        {
          code: 'CS232',
          name: 'Soiled Utility',
          baseNSF: 80,
          calculateQuantity: (inputs, chapter) => {
            const rooms = chapter.calculateTotalImagingRooms(inputs);
            if (rooms >= 31) return 2;
            if (rooms >= 11) return 2;
            if (rooms >= 1) return 1;
            return 0;
          }
        },
        {
          code: 'SS231',
          name: 'Imaging Services Equipment Storage',
          baseNSF: 120,
          calculateQuantity: (inputs, chapter) => chapter.calculateTotalImagingRooms(inputs) >= 1 ? 1 : 0,
          calculateNSF: (inputs, chapter) => {
            const rooms = chapter.calculateTotalImagingRooms(inputs);
            if (rooms >= 21) return 200;
            return 120;
          }
        },
        {
          code: 'SB244',
          name: 'Imaging Services Housekeeping Aides Closet',
          baseNSF: 60,
          calculateQuantity: (inputs, chapter) => {
            const rooms = chapter.calculateTotalImagingRooms(inputs);
            if (rooms >= 31) return 3;
            if (rooms >= 21) return 2;
            if (rooms >= 1) return 1;
            return 0;
          }
        }
      ]
    },

    // =========================================================================
    // FA 13: IMAGING SERVICES STAFF AND ADMINISTRATIVE AREA
    // =========================================================================
    {
      id: 'FA13',
      name: 'Imaging Services Staff and Administrative Area',
      rooms: [
        {
          code: 'SS201',
          name: 'Chief of Imaging Service Office',
          baseNSF: 150,
          calculateQuantity: (inputs, chapter) => chapter.calculateTotalImagingRooms(inputs) >= 1 ? 1 : 0
        },
        {
          code: 'SS204',
          name: 'Radiologist Office',
          baseNSF: 100,
          calculateQuantity: (inputs) => inputs.num_radiologists || 1
        },
        {
          code: 'SS205',
          name: 'Imaging Supervisor Office',
          baseNSF: 100,
          calculateQuantity: (inputs, chapter) => {
            const rooms = chapter.calculateTotalImagingRooms(inputs);
            if (rooms >= 21) return 2;
            if (rooms >= 1) return 1;
            return 0;
          }
        },
        {
          code: 'SS211',
          name: 'Reading Room / Interpretation Station',
          baseNSF: 80,
          calculateQuantity: (inputs) => Math.ceil((inputs.num_radiologists || 1) * 1.5)
        },
        {
          code: 'SS218',
          name: 'Technologist Workstation',
          baseNSF: 56,
          calculateQuantity: (inputs) => Math.ceil((inputs.num_technologists || 4) * 0.5)
        },
        {
          code: 'SS287',
          name: 'Imaging Services Conference Room',
          baseNSF: 200,
          calculateQuantity: (inputs, chapter) => chapter.calculateTotalImagingRooms(inputs) >= 11 ? 1 : 0,
          calculateNSF: (inputs, chapter) => {
            const rooms = chapter.calculateTotalImagingRooms(inputs);
            if (rooms >= 31) return 350;
            if (rooms >= 21) return 300;
            return 200;
          }
        },
        {
          code: 'SS241',
          name: 'Imaging Services Staff Lounge',
          baseNSF: 100,
          calculateQuantity: (inputs, chapter) => chapter.calculateTotalImagingRooms(inputs) >= 1 ? 1 : 0,
          calculateNSF: (inputs, chapter) => {
            const rooms = chapter.calculateTotalImagingRooms(inputs);
            if (rooms >= 31) return 200;
            if (rooms >= 21) return 150;
            return 100;
          }
        },
        {
          code: 'SS251',
          name: 'Staff Locker Room',
          baseNSF: 100,
          calculateQuantity: (inputs, chapter) => chapter.calculateTotalImagingRooms(inputs) >= 11 ? 2 : 0
        },
        {
          code: 'SS261',
          name: 'On-Call Bedroom',
          baseNSF: 120,
          calculateQuantity: (inputs, chapter) => {
            let qty = chapter.calculateTotalImagingRooms(inputs) >= 11 ? 1 : 0;
            if (inputs.has_oncall_bedroom) qty += 1;
            return qty;
          }
        },
        {
          code: 'SB003',
          name: 'Staff Toilet (Male)',
          baseNSF: 65,
          calculateQuantity: (inputs, chapter) => chapter.calculateTotalImagingRooms(inputs) >= 1 ? 1 : 0
        },
        {
          code: 'SB004',
          name: 'Staff Toilet (Female)',
          baseNSF: 65,
          calculateQuantity: (inputs, chapter) => chapter.calculateTotalImagingRooms(inputs) >= 1 ? 1 : 0
        }
      ]
    },

    // =========================================================================
    // FA 14: IMAGING SERVICES ACADEMIC EDUCATION AREA
    // =========================================================================
    {
      id: 'FA14',
      name: 'Imaging Services Academic Education Area',
      rooms: [
        {
          code: 'SS218',
          name: 'Trainee Workstation',
          baseNSF: 56,
          calculateQuantity: (inputs, chapter) => {
            const rooms = chapter.calculateTotalImagingRooms(inputs);
            if (rooms >= 31) return 6;
            if (rooms >= 21) return 4;
            if (rooms >= 11) return 2;
            return 0;
          }
        },
        {
          code: 'SS285',
          name: 'Trainee Huddle Room',
          baseNSF: 120,
          calculateQuantity: (inputs, chapter) => chapter.calculateTotalImagingRooms(inputs) >= 21 ? 1 : 0
        }
      ]
    }
  ],

  // Calculate total NSF for the chapter
  calculateTotalNSF(inputs) {
    let totalNSF = 0;
    
    for (const fa of this.functionalAreas) {
      for (const room of fa.rooms) {
        const qty = room.calculateQuantity ? room.calculateQuantity(inputs, this) : 1;
        const nsf = room.calculateNSF ? room.calculateNSF(inputs, this) : room.baseNSF;
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

export default CHAPTER_295;
