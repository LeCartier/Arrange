// Department and Chapter Mapping
// Cross-reference between official VA chapters, equipment guide, and implemented logic chapters
// Generated from Equipment_Guide_parsed_v2.txt and spcIndex-2025-08.txt

export const DEPARTMENT_MAPPING = [
  // Patient Care Units
  { vaChapter: "100", equipGuide: "100", implemented: "100", name: "Medical/Surgical Patient Care Unit (MS PCU)", status: "complete" },
  { vaChapter: "102", equipGuide: "102", implemented: "102", name: "Intensive Care Patient Care Unit (IC PCU)", status: "complete" },
  { vaChapter: "104", equipGuide: "104", implemented: "104", name: "Spinal Cord Injury / Disorders Center (SCI/D)", status: "complete" },
  { vaChapter: "106", equipGuide: "106", implemented: "106", name: "Small House (SH) Model", status: "complete" },
  { vaChapter: "110", equipGuide: "110", implemented: "110", name: "Mental Health Patient Care Unit (MH PCU)", status: "complete" },
  { vaChapter: "111", equipGuide: "111", implemented: "111", name: "Polytrauma Rehabilitation Center (PRC)", status: "complete" },
  
  // Deleted/Merged Chapters
  { vaChapter: "202", equipGuide: null, implemented: "202", name: "DELETED - merged into Mental Health Clinic Chapter 260", status: "deleted", note: "Our Ch 202 is legacy Primary Care logic" },
  
  // Clinical Services
  { vaChapter: "204", equipGuide: "204", implemented: "204", name: "Audiology and Speech-Language Pathology (ASLP) Service", status: "pending", note: "Our Ch 204 is Pharmacy Outpatient (should be Ch 268)" },
  { vaChapter: "206", equipGuide: "206", implemented: "206", name: "Veterans Canteen Service (VCS)", status: "pending", note: "Our Ch 206 is Laboratory (should be Ch 240)" },
  { vaChapter: "208", equipGuide: "208", implemented: "208", name: "Chaplain Service", status: "complete" },
  { vaChapter: "210", equipGuide: "210", implemented: "210", name: "Cardiology Service", status: "complete" },
  { vaChapter: "212", equipGuide: "212", implemented: "212", name: "Pulmonary Medicine Service", status: "complete" },
  { vaChapter: "214", equipGuide: "214", implemented: "214", name: "Clinical Services Administration", status: "complete" },
  { vaChapter: "218", equipGuide: "218", implemented: "218", name: "Veterans Assistance Unit", status: "complete" },
  { vaChapter: "220", equipGuide: "220", implemented: "220", name: "Credit Union", status: "complete" },
  { vaChapter: "222", equipGuide: "222", implemented: "222", name: "Dental Service", status: "complete" },
  { vaChapter: "224", equipGuide: null, implemented: null, name: "Nutrition and Food Service", status: "under-revision" },
  { vaChapter: "226", equipGuide: "226", implemented: "226", name: "Electroencephalography (EEG) Laboratory", status: "complete" },
  
  // Facility Services & Infrastructure
  { vaChapter: "230", equipGuide: "230", implemented: "230", name: "Engineering Service", status: "pending", note: "Our Ch 230 is Emergency Department (should be Ch 256)" },
  { vaChapter: "232", equipGuide: null, implemented: null, name: "Telecommunications Facilities", status: "pending" },
  { vaChapter: "233", equipGuide: "233", implemented: null, name: "Eye Clinic: Ophthalmology and Optometry Services", status: "pending" },
  { vaChapter: "234", equipGuide: "234", implemented: "234", name: "Fiscal Service", status: "complete" },
  { vaChapter: "238", equipGuide: "238", implemented: "238", name: "Medical Center Director's Suite", status: "complete" },
  { vaChapter: "240", equipGuide: "240", implemented: null, name: "Pathology and Laboratory Medicine Service", status: "pending" },
  { vaChapter: "244", equipGuide: "244", implemented: "244", name: "Lobby", status: "complete" },
  { vaChapter: "246", equipGuide: "246", implemented: "246", name: "Health Administration Service", status: "complete" },
  { vaChapter: "248", equipGuide: "248", implemented: null, name: "Medical Media Service", status: "pending" },
  
  // Deleted Imaging Chapters (merged into 295)
  { vaChapter: "252", equipGuide: null, implemented: null, name: "DELETED - replaced by Imaging Service Chapter 295", status: "deleted" },
  
  { vaChapter: "254", equipGuide: "254", implemented: "254", name: "Nursing Service Administration", status: "complete" },
  { vaChapter: "256", equipGuide: "256", implemented: null, name: "Emergency Department (ED)", status: "pending", note: "Built as Ch 230" },
  { vaChapter: "257", equipGuide: "257", implemented: null, name: "Urgent Care", status: "pending" },
  { vaChapter: "258", equipGuide: "258", implemented: null, name: "Women Veterans Clinical Service (WVCS) (For Models 2 and 3)", status: "pending" },
  { vaChapter: "260", equipGuide: null, implemented: "260", name: "Mental Health Clinic", status: "under-revision", note: "Our Ch 260 is PM&R (should be Ch 270)" },
  
  // Deleted chapters merged into 260
  { vaChapter: "261", equipGuide: null, implemented: null, name: "DELETED - merged into Mental Health Clinic Chapter 260", status: "deleted" },
  { vaChapter: "262", equipGuide: null, implemented: null, name: "DELETED", status: "deleted" },
  
  { vaChapter: "263", equipGuide: "263", implemented: null, name: "Community Based Outpatient Clinic (PACT) Interim", status: "pending" },
  { vaChapter: "264", equipGuide: null, implemented: null, name: "DELETED", status: "deleted" },
  { vaChapter: "265", equipGuide: null, implemented: null, name: "Community Based Outpatient Clinic (CBOC) - ARCHIVED", status: "archived" },
  { vaChapter: "266", equipGuide: "266", implemented: "266", name: "Human Resources Management", status: "complete" },
  { vaChapter: "268", equipGuide: "268", implemented: null, name: "Pharmacy Service", status: "pending", note: "Built as Ch 204" },
  { vaChapter: "269", equipGuide: "269", implemented: null, name: "Recreation Therapy Service", status: "pending" },
  { vaChapter: "270", equipGuide: "270", implemented: null, name: "Physical Medicine and Rehabilitation Service", status: "pending", note: "Built as Ch 260" },
  
  // More deleted chapters
  { vaChapter: "272", equipGuide: null, implemented: null, name: "DELETED - merged into Mental Health Clinic Chapter 260", status: "deleted" },
  
  { vaChapter: "274", equipGuide: "274", implemented: "274", name: "Quarters On-Call", status: "complete" },
  { vaChapter: "275", equipGuide: null, implemented: null, name: "DELETED - replaced by Imaging Service Chapter 295", status: "deleted" },
  { vaChapter: "276", equipGuide: null, implemented: null, name: "DELETED - replaced by Imaging Service Chapter 295", status: "deleted" },
  { vaChapter: "277", equipGuide: "277", implemented: null, name: "Radiation Therapy Service", status: "pending" },
  { vaChapter: "278", equipGuide: "278", implemented: "278", name: "Research and Development (R&D)", status: "complete" },
  { vaChapter: "279", equipGuide: "279", implemented: "279", name: "Police Service", status: "complete" },
  { vaChapter: "280", equipGuide: "280", implemented: "280", name: "Service Organizations", status: "complete" },
  { vaChapter: "282", equipGuide: "282", implemented: "282", name: "Social Work Service", status: "complete" },
  { vaChapter: "284", equipGuide: "284", implemented: "284", name: "Logistics Service", status: "complete" },
  { vaChapter: "285", equipGuide: "285", implemented: null, name: "Sterile Processing Service", status: "pending" },
  { vaChapter: "286", equipGuide: "286", implemented: "286", name: "Surgical / Endovascular Services", status: "complete" },
  { vaChapter: "287", equipGuide: "287", implemented: null, name: "Gastrointestinal / Endoscopy Service", status: "pending" },
  { vaChapter: "290", equipGuide: "290", implemented: "290", name: "Voluntary Service", status: "complete" },
  { vaChapter: "295", equipGuide: "295", implemented: null, name: "Imaging Services", status: "pending", note: "Replaces Ch 252, 275, 276; may overlap with our Ch 228" },
  
  // Deleted chapter
  { vaChapter: "300", equipGuide: null, implemented: null, name: "DELETED - merged into Mental Health Clinic Chapter 260", status: "deleted" },
  
  // Specialty Services
  { vaChapter: "308", equipGuide: "308", implemented: null, name: "Prosthetics and Sensory Aids Service", status: "pending" },
  { vaChapter: "312", equipGuide: "312", implemented: null, name: "Mental Health Resident Care Unit (MH RCU)", status: "pending" },
  { vaChapter: "316", equipGuide: "316", implemented: null, name: "Dialysis Center", status: "pending" },
  
  // Educational & Support Services
  { vaChapter: "400", equipGuide: "400", implemented: null, name: "Library Service", status: "pending" },
  { vaChapter: "402", equipGuide: "402", implemented: "402", name: "Educational Facilities", status: "complete" },
  { vaChapter: "406", equipGuide: "406", implemented: "406", name: "Environmental Management Service (EMS) Administration", status: "complete" },
  { vaChapter: "408", equipGuide: "408", implemented: null, name: "Environmental Management Service (EMS) Laundry and Linen Operation", status: "pending" },
  { vaChapter: "410", equipGuide: "410", implemented: null, name: "Environmental Management Service (EMS) Lockers, Lounges, Toilets and Showers", status: "pending" },
  { vaChapter: "420", equipGuide: "420", implemented: null, name: "Childcare / Development Center", status: "pending" },
  { vaChapter: "421", equipGuide: null, implemented: null, name: "Drop-in Childcare Center", status: "pending" }
];

// Helper function to get mapping by any chapter number
export function getMappingByChapter(chapterNum) {
  return DEPARTMENT_MAPPING.find(m => 
    m.vaChapter === chapterNum || 
    m.equipGuide === chapterNum || 
    m.implemented === chapterNum
  );
}

// Get all complete chapters
export function getCompleteChapters() {
  return DEPARTMENT_MAPPING.filter(m => m.status === 'complete');
}

// Get all pending chapters
export function getPendingChapters() {
  return DEPARTMENT_MAPPING.filter(m => m.status === 'pending');
}

// Get chapters with numbering discrepancies
export function getChapterDiscrepancies() {
  return DEPARTMENT_MAPPING.filter(m => 
    m.implemented && m.vaChapter !== m.implemented
  );
}

// Summary statistics
export function getSummaryStats() {
  const total = DEPARTMENT_MAPPING.filter(m => m.status !== 'deleted' && m.status !== 'archived').length;
  const complete = DEPARTMENT_MAPPING.filter(m => m.status === 'complete').length;
  const pending = DEPARTMENT_MAPPING.filter(m => m.status === 'pending').length;
  const underRevision = DEPARTMENT_MAPPING.filter(m => m.status === 'under-revision').length;
  const discrepancies = getChapterDiscrepancies().length;
  
  return {
    totalActive: total,
    complete,
    pending,
    underRevision,
    discrepancies,
    percentComplete: ((complete / total) * 100).toFixed(1)
  };
}
