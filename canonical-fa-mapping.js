// Canonical Functional Area Definitions
// Source: Equipment Guide parsed v2 (from PG 18-9 Space Planning Criteria)
// 
// This file defines the authoritative FA structure per chapter based on the Equipment Guide.
// Additional FAs from other sources (Door & Finish Criteria PG 18-14)
// will be assigned letter suffixes (e.g., FA4a, FA4b) based on their mapping
// to these canonical FAs.
//
// Canonical FAs are extracted from Equipment_Guide_parsed_v2.txt during load
// The order of FAs is preserved from the Equipment Guide file
// Chapters not in the Equipment Guide exist only from extended sources and that's fine.

// This object will be populated from CANONICAL_FA_ORDER built in load-equipment.js
export const CANONICAL_FAS = {};

// Initialize canonical FAs from the pre-built FA order from load-equipment.js
let canonicalFAsInitialized = false;

/**
 * Initialize canonical FAs from the pre-built canonical FA order
 * This should be called after load-equipment.js has parsed the Equipment Guide
 */
export function initializeCanonicalFAsFromEquipment() {
  if (canonicalFAsInitialized) return;
  
  // Get the canonical FA order built during Equipment Guide parsing
  const canonicalFAOrder = window.CANONICAL_FA_ORDER;
  
  if (!canonicalFAOrder || Object.keys(canonicalFAOrder).length === 0) {
    console.warn('CANONICAL_FA_ORDER not available yet - will retry when data is ready');
    return false;
  }
  
  // Convert to CANONICAL_FAS structure
  for (const [chapterId, chapterData] of Object.entries(canonicalFAOrder)) {
    // Build functional areas array from the ordered FA list
    const functionalAreas = chapterData.faOrder.map((faName, index) => ({
      number: String(index + 1),
      name: faName
    }));
    
    // Extract chapter name from department name
    const nameMatch = chapterData.departmentName.match(/^\d+\s*\(([^)]+)\)/);
    const chapterName = nameMatch ? nameMatch[1] : chapterData.departmentName;
    
    CANONICAL_FAS[chapterId] = {
      name: chapterName,
      source: 'Equipment Guide (PG 18-9)',
      functionalAreas: functionalAreas,
      // Use the pre-built lookup for O(1) access
      faNameToNumber: chapterData.faNameToNumber,
      extendedMappings: {}
    };
  }
  
  canonicalFAsInitialized = true;
  console.log(`Initialized canonical FAs for ${Object.keys(CANONICAL_FAS).length} chapters from Equipment Guide`);
  return true;
}

/**
 * Register extended FA mappings for a chapter
 * Used to map FAs from PG 18-14 (Door & Finish) to canonical Equipment Guide FAs
 * @param {string} chapterId - Chapter number
 * @param {Object} mappings - { 'Extended FA Name': { canonicalFA: 'N', suffix: 'a' } }
 */
export function registerExtendedMappings(chapterId, mappings) {
  if (!CANONICAL_FAS[chapterId]) {
    // Chapter doesn't exist in Equipment Guide, create a placeholder
    CANONICAL_FAS[chapterId] = {
      name: `Chapter ${chapterId}`,
      source: 'Extended Sources Only',
      functionalAreas: [],
      faNameToNumber: {},
      extendedMappings: mappings
    };
  } else {
    Object.assign(CANONICAL_FAS[chapterId].extendedMappings, mappings);
  }
}

/**
 * Get the canonical FA number and suffix for a given chapter and FA name
 * @param {string} chapterId - Chapter number
 * @param {string} faName - Functional Area name from any source
 * @returns {Object} { canonicalNumber, suffix, displayNumber }
 */
export function getCanonicalFA(chapterId, faName) {
  const chapter = CANONICAL_FAS[chapterId];
  if (!chapter) {
    return { canonicalNumber: null, suffix: '', displayNumber: null };
  }
  
  // Check extended mappings first (for PG 18-14 FAs)
  if (chapter.extendedMappings && chapter.extendedMappings[faName]) {
    const mapping = chapter.extendedMappings[faName];
    return {
      canonicalNumber: mapping.canonicalFA,
      suffix: mapping.suffix,
      displayNumber: mapping.suffix ? `${mapping.canonicalFA}${mapping.suffix}` : mapping.canonicalFA,
      source: mapping.source || 'Extended'
    };
  }
  
  // Check direct lookup in faNameToNumber (Equipment Guide FAs)
  // The lookup stores exact FA names as they appear in Equipment Guide
  if (chapter.faNameToNumber && chapter.faNameToNumber[faName]) {
    return {
      canonicalNumber: chapter.faNameToNumber[faName],
      suffix: '',
      displayNumber: chapter.faNameToNumber[faName],
      source: 'Equipment Guide'
    };
  }
  
  // Try case-insensitive lookup
  if (chapter.faNameToNumber) {
    const faNameUpper = faName.toUpperCase();
    for (const [name, number] of Object.entries(chapter.faNameToNumber)) {
      if (name.toUpperCase() === faNameUpper) {
        return {
          canonicalNumber: number,
          suffix: '',
          displayNumber: number,
          source: 'Equipment Guide'
        };
      }
    }
  }
  
  // Check if it matches a canonical FA name (partial match for fuzzy matching)
  const canonical = chapter.functionalAreas.find(fa => 
    faName.toUpperCase() === fa.name.toUpperCase() ||
    faName.toUpperCase().includes(fa.name.toUpperCase()) ||
    fa.name.toUpperCase().includes(faName.toUpperCase())
  );
  
  if (canonical) {
    return {
      canonicalNumber: canonical.number,
      suffix: '',
      displayNumber: canonical.number,
      source: 'Equipment Guide'
    };
  }
  
  return { canonicalNumber: null, suffix: '', displayNumber: null };
}

/**
 * Check if a chapter has canonical FA definitions
 * @param {string} chapterId - Chapter number
 * @returns {boolean}
 */
export function hasCanonicalFAs(chapterId) {
  return !!CANONICAL_FAS[chapterId] && CANONICAL_FAS[chapterId].functionalAreas.length > 0;
}

/**
 * Get the canonical FA list for a chapter
 * @param {string} chapterId - Chapter number
 * @returns {Array} List of canonical FAs
 */
export function getCanonicalFAList(chapterId) {
  const chapter = CANONICAL_FAS[chapterId];
  return chapter ? chapter.functionalAreas : [];
}

/**
 * Check if canonical FAs have been initialized
 * @returns {boolean}
 */
export function isCanonicalFAsInitialized() {
  return Object.keys(CANONICAL_FAS).length > 0;
}
