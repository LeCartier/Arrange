// Care Setting Mapping
// Defines which Functional Areas belong to CBOC vs In-Hospital settings
// This allows the reference tree to show setting type as an intermediate grouping

// Setting types
export const CARE_SETTINGS = {
  CBOC: 'CBOC (Community Outpatient)',
  HOSPITAL: 'In-Hospital',
  SHARED: 'Shared/Common'
};

// Default icons for care settings
export const CARE_SETTING_ICONS = {
  'CBOC (Community Outpatient)': '🏥',
  'In-Hospital': '🏨',
  'Shared/Common': '🔄'
};

// Pattern-based rules for determining care setting from FA names
// Priority: 1) Explicit mappings below, 2) Pattern matching, 3) Default to 'Shared/Common'
export const FA_SETTING_PATTERNS = [
  // CBOC patterns
  { pattern: /Basic Clinic/i, setting: CARE_SETTINGS.CBOC },
  { pattern: /\bCBOC\b/i, setting: CARE_SETTINGS.CBOC },
  { pattern: /^PACT\b/i, setting: CARE_SETTINGS.CBOC },
  { pattern: /Community Based/i, setting: CARE_SETTINGS.CBOC },
  { pattern: /Outpatient Unit/i, setting: CARE_SETTINGS.CBOC },
  
  // In-Hospital patterns
  { pattern: /Expanded Clinic/i, setting: CARE_SETTINGS.HOSPITAL },
  { pattern: /\bSCI\/D\b/i, setting: CARE_SETTINGS.HOSPITAL },
  { pattern: /Therapeutic Pool/i, setting: CARE_SETTINGS.HOSPITAL },
  { pattern: /Inpatient/i, setting: CARE_SETTINGS.HOSPITAL },
  { pattern: /Inpatient Unit/i, setting: CARE_SETTINGS.HOSPITAL },
  { pattern: /Patient Care Unit/i, setting: CARE_SETTINGS.HOSPITAL },
  { pattern: /Nursing Unit/i, setting: CARE_SETTINGS.HOSPITAL },
  { pattern: /Center$/i, setting: CARE_SETTINGS.HOSPITAL },  // e.g., "Driver Training Center", "Cardiopulmonary Rehabilitation Center"
];

// Explicit FA mappings for chapters where pattern matching isn't sufficient
// Format: { [chapterId]: { [faNumber]: settingType } }
// FAs not listed here will use pattern matching
export const EXPLICIT_FA_SETTINGS = {
  '270': {
    // PMRS Reception & Patient Area - shared between settings
    '1': CARE_SETTINGS.SHARED,   // Treatment Station Calculation
    '2': CARE_SETTINGS.SHARED,   // PMRS Reception Area
    '3': CARE_SETTINGS.SHARED,   // PMRS Patient Area
    
    // CBOC / Basic Clinic Functional Areas
    '4': CARE_SETTINGS.CBOC,     // Physical Therapy Basic Clinic (PTBC)
    '6': CARE_SETTINGS.CBOC,     // Kinesiotherapy Basic Clinic (KTBC)
    '8': CARE_SETTINGS.CBOC,     // Occupational Therapy Basic Clinic (OTBC)
    
    // In-Hospital / Expanded Clinic Functional Areas
    '5': CARE_SETTINGS.HOSPITAL,  // Physical Therapy Expanded Clinic (PTEC)
    '7': CARE_SETTINGS.HOSPITAL,  // Kinesiotherapy Expanded Clinic (KTEC)
    '9': CARE_SETTINGS.HOSPITAL,  // Occupational Therapy Expanded Clinic (OTEC)
    '10': CARE_SETTINGS.HOSPITAL, // Activities of Daily Living (ADL)
    '11': CARE_SETTINGS.HOSPITAL, // Chiropractic Care (CC)
    '12': CARE_SETTINGS.HOSPITAL, // Vocational Rehabilitation Therapy (VRT)
    '13': CARE_SETTINGS.HOSPITAL, // Educational Therapy (ET)
    '14': CARE_SETTINGS.HOSPITAL, // Driver Training Center (DTC)
    '15': CARE_SETTINGS.HOSPITAL, // Compensated Work Therapy Clinic (CWT)
    '16': CARE_SETTINGS.HOSPITAL, // Incentive Therapy Program (ITP)
    '17': CARE_SETTINGS.HOSPITAL, // Cardiopulmonary Rehabilitation Center
    '18': CARE_SETTINGS.HOSPITAL, // Work Evaluation Program (WEP)
    '19': CARE_SETTINGS.HOSPITAL, // Therapeutic Pool
    '20': CARE_SETTINGS.SHARED,   // PMRS Support Area
    '21': CARE_SETTINGS.SHARED,   // PMRS Staff and Administrative Area
    '22': CARE_SETTINGS.SHARED,   // Education Area
    
    // SCI/D Specific (In-Hospital)
    '23': CARE_SETTINGS.HOSPITAL, // SCI/D Physical Therapy (SCI/D PT)
    '24': CARE_SETTINGS.HOSPITAL, // SCI/D Kinesiotherapy (SCI/D KT)
    '25': CARE_SETTINGS.HOSPITAL, // SCI/D Combined PT & KT
    '26': CARE_SETTINGS.HOSPITAL, // SCI/D Occupational Therapy (SCI/D OT)
    '27': CARE_SETTINGS.HOSPITAL, // SCI/D Activities for Daily Living (SCI/D ADL)
  },
  
  // Chapter 204 - Audiology
  '204': {
    '1': CARE_SETTINGS.SHARED,    // Reception Area
    '2': CARE_SETTINGS.CBOC,      // Basic Clinic
    '3': CARE_SETTINGS.HOSPITAL,  // Expanded Clinic
    '4': CARE_SETTINGS.SHARED,    // Support Area
    '5': CARE_SETTINGS.SHARED,    // Staff Area
  },
  
  // Chapter 222 - Dental
  '222': {
    '1': CARE_SETTINGS.SHARED,    // Reception
    '2': CARE_SETTINGS.SHARED,    // Waiting
    '3': CARE_SETTINGS.CBOC,      // Basic Dental Clinic
    '4': CARE_SETTINGS.HOSPITAL,  // Expanded Dental Clinic
    '5': CARE_SETTINGS.HOSPITAL,  // Specialty Clinic
    '6': CARE_SETTINGS.SHARED,    // Support Area
    '7': CARE_SETTINGS.SHARED,    // Staff Area
  },
  
  // Chapter 268 - Pharmacy
  '268': {
    '1': CARE_SETTINGS.SHARED,    // Reception Area
    '2': CARE_SETTINGS.CBOC,      // Outpatient Pharmacy
    '3': CARE_SETTINGS.HOSPITAL,  // Inpatient Pharmacy Support
    '4': CARE_SETTINGS.SHARED,    // Staff Area
  },
  
  // Chapter 260 / 272 - Mental Health
  '260': {
    '1': CARE_SETTINGS.SHARED,    // Reception
    '2': CARE_SETTINGS.CBOC,      // Outpatient Mental Health
    '3': CARE_SETTINGS.HOSPITAL,  // Inpatient Mental Health Support
    '4': CARE_SETTINGS.SHARED,    // Staff Area
  },
  '272': {
    '1': CARE_SETTINGS.SHARED,    // Reception Area
    '2': CARE_SETTINGS.HOSPITAL,  // Patient Area (Recreation Therapy typically in-hospital)
    '3': CARE_SETTINGS.SHARED,    // Staff and Administrative Area
    '4': CARE_SETTINGS.SHARED,    // Education Area
  },
  
  // Chapter 111 - Polytrauma Rehabilitation Center
  '111': {
    // Inpatient Unit FAs (1-12)
    '1': CARE_SETTINGS.HOSPITAL,  // Inpatient Unit Calculation
    '2': CARE_SETTINGS.HOSPITAL,  // Inpatient Unit Reception Area
    '3': CARE_SETTINGS.HOSPITAL,  // Inpatient Unit Patient Area
    '4': CARE_SETTINGS.HOSPITAL,  // Inpatient Unit Support Area
    '5': CARE_SETTINGS.HOSPITAL,  // Inpatient Unit Therapy Area
    '6': CARE_SETTINGS.HOSPITAL,  // Inpatient Unit Staff Area
    '7': CARE_SETTINGS.HOSPITAL,  // Inpatient Unit Dining Area
    '8': CARE_SETTINGS.HOSPITAL,  // Inpatient Unit Family Area
    '9': CARE_SETTINGS.HOSPITAL,  // Inpatient Unit Living Area
    '10': CARE_SETTINGS.HOSPITAL, // Inpatient Unit PT/OT Area
    '11': CARE_SETTINGS.HOSPITAL, // Inpatient Unit ST Area
    '12': CARE_SETTINGS.HOSPITAL, // Inpatient Unit Psychology Area
    // Outpatient Unit FAs (13-17)
    '13': CARE_SETTINGS.CBOC,     // Outpatient Unit Reception Area
    '14': CARE_SETTINGS.CBOC,     // Outpatient Unit Patient Area
    '15': CARE_SETTINGS.CBOC,     // Outpatient Unit Support Area
    '16': CARE_SETTINGS.CBOC,     // Outpatient Unit Therapy Area
    '17': CARE_SETTINGS.CBOC,     // Outpatient Unit Staff and Administrative Area
    // Shared FAs (18+)
    '18': CARE_SETTINGS.SHARED,   // Administrative Area
    '19': CARE_SETTINGS.SHARED,   // Education Area
  },
};

// Chapters that should show care setting grouping
// Other chapters will show flat FA list (no intermediate grouping)
export const CHAPTERS_WITH_SETTING_GROUPING = new Set([
  '111', // Polytrauma Rehabilitation Center
  '204', // Audiology
  '222', // Dental
  '260', // Mental Health Clinic
  '268', // Pharmacy
  '270', // PMR
  '272', // Recreation Therapy
]);

/**
 * Determine the care setting for a given chapter and functional area
 * @param {string} chapterId - Chapter number (e.g., '270')
 * @param {string} faNumber - Functional Area number (e.g., '4')
 * @param {string} faName - Functional Area name for pattern matching
 * @returns {string} Care setting type
 */
export function getCareSettingForFA(chapterId, faNumber, faName) {
  // 1. Check explicit mappings first
  if (EXPLICIT_FA_SETTINGS[chapterId]?.[faNumber]) {
    return EXPLICIT_FA_SETTINGS[chapterId][faNumber];
  }
  
  // 2. Try pattern matching on FA name
  for (const rule of FA_SETTING_PATTERNS) {
    if (rule.pattern.test(faName)) {
      return rule.setting;
    }
  }
  
  // 3. Default to Shared/Common
  return CARE_SETTINGS.SHARED;
}

/**
 * Check if a chapter should show care setting grouping
 * @param {string} chapterId - Chapter number
 * @returns {boolean} Whether to show care setting grouping
 */
export function shouldShowSettingGrouping(chapterId) {
  return CHAPTERS_WITH_SETTING_GROUPING.has(chapterId);
}
