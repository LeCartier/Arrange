// Chapter Registry
// Central index of all available chapters

import { CHAPTER_100 } from './chapter-100-medical-surgical.js';
import { CHAPTER_102 } from './chapter-102-intensive-care.js';
import { CHAPTER_104 } from './chapter-104-sci-acute-care.js';
import { CHAPTER_106 } from './chapter-106-small-house.js';
import { CHAPTER_208 } from './chapter-208-chaplain.js';
import CHAPTER_210 from './chapter-210-cardiology.js';
import { CHAPTER_212 } from './chapter-212-pulmonary.js';
import { CHAPTER_214 } from './chapter-214-clinical-services-admin.js';
import { CHAPTER_218 } from './chapter-218-veterans-assistance.js';
import { CHAPTER_220 } from './chapter-220-credit-union.js';
import CHAPTER_222 from './chapter-222-dental.js';
import { CHAPTER_226 } from './chapter-226-eeg.js';
import { CHAPTER_234 } from './chapter-234-fiscal-service.js';
import { CHAPTER_238 } from './chapter-238-director-suite.js';
import { CHAPTER_244 } from './chapter-244-lobby.js';
import { CHAPTER_254 } from './chapter-254-nursing-admin.js';
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
  '208': CHAPTER_208,
  '210': CHAPTER_210,
  '212': CHAPTER_212,
  '214': CHAPTER_214,
  '218': CHAPTER_218,
  '220': CHAPTER_220,
  '222': CHAPTER_222,
  '226': CHAPTER_226,
  '234': CHAPTER_234,
  '238': CHAPTER_238,
  '244': CHAPTER_244,
  '254': CHAPTER_254,
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
  return Object.values(CHAPTERS).map(chapter => ({
    id: chapter.chapter,
    name: chapter.name,
    description: chapter.description,
    inputCount: chapter.inputs.length,
    functionalAreaCount: chapter.functionalAreas.length
  }));
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
