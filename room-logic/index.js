// Chapter Registry
// Central index of all available chapters

import { CHAPTER_100 } from './chapter-100-medical-surgical.js';
import { CHAPTER_102 } from './chapter-102-intensive-care.js';
import { CHAPTER_104 } from './chapter-104-sci-acute-care.js';
import { CHAPTER_106 } from './chapter-106-small-house.js';
import { CHAPTER_110 } from './chapter-110-mental-health.js';
import { CHAPTER_111 } from './chapter-111-polytrauma.js';
// Chapter 202 - DELETED in VA index (merged into Mental Health Clinic Chapter 260)
// import { CHAPTER_202 } from './chapter-202-primary-care.js';
import { CHAPTER_204 } from './chapter-204-audiology.js';
import { CHAPTER_206 } from './chapter-206-canteen.js';
import { CHAPTER_208 } from './chapter-208-chaplain.js';
import CHAPTER_210 from './chapter-210-cardiology.js';
import { CHAPTER_212 } from './chapter-212-pulmonary.js';
import { CHAPTER_214 } from './chapter-214-clinical-services-admin.js';
import { CHAPTER_216 } from './chapter-216-ambulatory-surgery.js';
import { CHAPTER_218 } from './chapter-218-veterans-assistance.js';
import { CHAPTER_220 } from './chapter-220-credit-union.js';
import CHAPTER_222 from './chapter-222-dental.js';
import { CHAPTER_226 } from './chapter-226-eeg.js';
import { CHAPTER_228 } from './chapter-228-radiology.js';
import { CHAPTER_230 } from './chapter-230-engineering.js';
import { CHAPTER_232 } from './chapter-232-telecommunication.js';
import { CHAPTER_233 } from './chapter-233-eye-clinic.js';
import { CHAPTER_234 } from './chapter-234-fiscal-service.js';
import { CHAPTER_238 } from './chapter-238-director-suite.js';
import { CHAPTER_240 } from './chapter-240-laboratory.js';
import { CHAPTER_244 } from './chapter-244-lobby.js';
import { CHAPTER_246 } from './chapter-246-health-admin.js';
import { CHAPTER_248 } from './chapter-248-medical-media.js';
import { CHAPTER_254 } from './chapter-254-nursing-admin.js';
import { CHAPTER_256 } from './chapter-256-emergency-department.js';
import { CHAPTER_257 } from './chapter-257-urgent-care.js';
import { CHAPTER_258 } from './chapter-258-women-veterans.js';
import { CHAPTER_263 } from './chapter-263-cboc-pact.js';
import { CHAPTER_266 } from './chapter-266-human-resources.js';
import { CHAPTER_286 } from './chapter-286-surgical.js';
import { CHAPTER_268 } from './chapter-268-pharmacy-outpatient.js';
import { CHAPTER_270 } from './chapter-270-pmr.js';
import { CHAPTER_274_CONFIG } from './chapter-274-quarters-oncall.js';
import { CHAPTER_279_CONFIG } from './chapter-279-police.js';
import { CHAPTER_280_CONFIG } from './chapter-280-service-orgs.js';
import { CHAPTER_282_CONFIG } from './chapter-282-social-work.js';
import { CHAPTER_290_CONFIG } from './chapter-290-voluntary.js';

// Registry of all available chapters
export const CHAPTERS = {
  '100': CHAPTER_100,
  '102': CHAPTER_102,
  '104': CHAPTER_104,
  '106': CHAPTER_106,
  '110': CHAPTER_110,
  '111': CHAPTER_111,
  // '202': CHAPTER_202, // DELETED in VA index (merged into Chapter 260)
  '204': CHAPTER_204,
  '206': CHAPTER_206,
  '208': CHAPTER_208,
  '210': CHAPTER_210,
  '212': CHAPTER_212,
  '214': CHAPTER_214,
  '216': CHAPTER_216,
  '218': CHAPTER_218,
  '220': CHAPTER_220,
  '222': CHAPTER_222,
  '226': CHAPTER_226,
  '228': CHAPTER_228,
  '230': CHAPTER_230,
  '232': CHAPTER_232,
  '233': CHAPTER_233,
  '234': CHAPTER_234,
  '238': CHAPTER_238,
  '240': CHAPTER_240,
  '244': CHAPTER_244,
  '246': CHAPTER_246,
  '248': CHAPTER_248,
  '254': CHAPTER_254,
  '256': CHAPTER_256,
  '257': CHAPTER_257,
  '258': CHAPTER_258,
  '263': CHAPTER_263,
  '266': CHAPTER_266,
  '286': CHAPTER_286,
  '268': CHAPTER_268,
  '270': CHAPTER_270,
  '274': CHAPTER_274_CONFIG,
  '279': CHAPTER_279_CONFIG,
  '280': CHAPTER_280_CONFIG,
  '282': CHAPTER_282_CONFIG,
  '290': CHAPTER_290_CONFIG
};

/**
 * Get a chapter by ID
 * @param {string} chapterId - Chapter number (e.g., '100', '102')
 * @returns {Object|null} Chapter data or null if not found
 */
export function getChapter(chapterId) {
  return CHAPTERS[chapterId] || null;
}

/**
 * Get list of all available chapters
 * @returns {Array} Array of chapter metadata
 */
export function getAllChapters() {
  return Object.values(CHAPTERS).map(chapter => {
    // Handle both array-based and object-based functionalAreas
    let faCount = 0;
    if (Array.isArray(chapter.functionalAreas)) {
      faCount = chapter.functionalAreas.length;
    } else if (chapter.functionalAreas && typeof chapter.functionalAreas === 'object') {
      faCount = Object.keys(chapter.functionalAreas).length;
    }
    
    return {
      id: chapter.chapter,
      name: chapter.name,
      description: chapter.description,
      status: chapter.status || null,
      inputCount: chapter.inputs ? chapter.inputs.length : 0,
      functionalAreaCount: faCount
    };
  });
}

/**
 * Search chapters by name or description
 * @param {string} query - Search query
 * @returns {Array} Matching chapters
 */
export function searchChapters(query) {
  const lowerQuery = query.toLowerCase();
  return Object.values(CHAPTERS).filter(chapter =>
    chapter.name.toLowerCase().includes(lowerQuery) ||
    chapter.description.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get chapters by category (for future categorization)
 * @param {string} category - Category name
 * @returns {Array} Chapters in that category
 */
export function getChaptersByCategory(category) {
  // For now, return all chapters
  // In the future, chapters could have a 'category' property
  return Object.values(CHAPTERS);
}
