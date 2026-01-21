/**
 * Equipment Database Import Script
 * 
 * This script imports/merges the detailed equipment data from equipment_database.json
 * into the EQUIPMENT_LIST format used by the application.
 * 
 * The equipment_database.json contains rich attribute data:
 * - nomenclature, meanPrice, priceDate
 * - category (VA/MHS acquisition codes)
 * - maxSize (dimensions in metric/american)
 * - maxPower (electrical requirements)
 * - maxHertz (BTU/frequency info)
 * - utilities
 * - cageRef (vendor/model information)
 * - criteriaSheet (spec sheet references)
 * 
 * Usage:
 *   node import-equipment-database.js
 * 
 * Output:
 *   - equipment-data-merged.js (updated EQUIPMENT_LIST with extended attributes)
 *   - equipment-attributes.js (standalone extended attributes lookup)
 */

const fs = require('fs');
const path = require('path');

// Paths
const SOURCE_JSON = path.join(__dirname, 'equipment_database.json');
const EXISTING_EQUIPMENT = path.join(__dirname, '..', 'equipment-data-part1.js');
const OUTPUT_MERGED = path.join(__dirname, '..', 'equipment-data-merged.js');
const OUTPUT_ATTRIBUTES = path.join(__dirname, '..', 'equipment-attributes.js');

/**
 * Parse existing EQUIPMENT_LIST from equipment-data-part1.js
 */
function parseExistingEquipmentList(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Extract the array content between [ and ];
  const match = content.match(/const\s+EQUIPMENT_LIST\s*=\s*\[([\s\S]*?)\];/);
  if (!match) {
    console.error('Could not parse EQUIPMENT_LIST from file');
    return new Map();
  }
  
  const equipmentMap = new Map();
  
  // Parse each equipment object - they're on individual lines
  const lines = content.split('\n');
  for (const line of lines) {
    // Match lines like: { jsn: "A1067", name: "Mirror,Float Glass,ADA Accessible", acqIns: "CC", description: "..." },
    const itemMatch = line.match(/\{\s*jsn:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*acqIns:\s*"([^"]+)",\s*description:\s*"(.*)"\s*\}/);
    if (itemMatch) {
      const [, jsn, name, acqIns, description] = itemMatch;
      equipmentMap.set(jsn, {
        jsn,
        name,
        acqIns,
        description: description.replace(/\\"/g, '"') // Unescape quotes
      });
    }
  }
  
  console.log(`Parsed ${equipmentMap.size} existing equipment items`);
  return equipmentMap;
}

/**
 * Convert VA category code to acqIns format
 */
function getAcqIns(category) {
  if (!category) return 'VV';
  
  // VA category takes precedence
  if (category.va) {
    return category.va;
  }
  
  // Fall back to MHS category mapping
  if (category.mhs) {
    switch (category.mhs) {
      case 'A': return 'CC';  // Category A = Contractor/Construction
      case 'B': return 'CC';
      case 'C': return 'VV';  // Category C = VA provided
      case 'D': return 'VV';
      default: return 'VV';
    }
  }
  
  return 'VV';
}

/**
 * Clean and format nomenclature as equipment name
 */
function formatName(nomenclature, jsn) {
  if (!nomenclature || nomenclature === jsn) {
    return jsn;
  }
  return nomenclature.trim();
}

/**
 * Extract extended attributes from equipment entry
 */
function extractExtendedAttributes(entry) {
  const attrs = {};
  
  // Pricing
  if (entry.meanPrice) {
    attrs.meanPrice = parseFloat(entry.meanPrice) || 0;
    attrs.priceDate = entry.priceDate || null;
  }
  
  // Unit of issue
  if (entry.unitIssue) {
    attrs.unitIssue = entry.unitIssue;
  }
  
  // Dimensions (maxSize)
  if (entry.maxSize) {
    const size = entry.maxSize;
    attrs.dimensions = {
      width: size.width?.american || 0,
      height: size.height?.american || 0,
      depth: size.depth?.american || 0,
      weight: size.weight?.american || 0,
      // Include metric as well
      widthMetric: size.width?.metric || 0,
      heightMetric: size.height?.metric || 0,
      depthMetric: size.depth?.metric || 0,
      weightMetric: size.weight?.metric || 0
    };
  }
  
  // Power requirements (maxPower)
  if (entry.maxPower && Array.isArray(entry.maxPower)) {
    const power = entry.maxPower.find(p => p && (p.amps > 0 || p.volts > 0 || p.watts > 0));
    if (power) {
      attrs.power = {
        amps: power.amps || 0,
        volts: power.volts || 0,
        watts: power.watts || 0,
        phase: power.phase || 0
      };
    }
  }
  
  // Hertz/BTU (maxHertz)
  if (entry.maxHertz) {
    const hz = entry.maxHertz;
    if (hz.hertz !== '0' || hz.btuPerHour > 0) {
      attrs.hertz = {
        frequency: hz.hertz || '0',
        btuPerHour: hz.btuPerHour || 0,
        dependent: hz.dependent || false,
        switchable: hz.switchable || false
      };
    }
  }
  
  // Utilities
  if (entry.utilities && Array.isArray(entry.utilities)) {
    const validUtils = entry.utilities.filter(u => u && u !== 'n/a');
    if (validUtils.length > 0) {
      attrs.utilities = validUtils;
    }
  }
  
  // Category codes
  if (entry.category) {
    attrs.category = {};
    if (entry.category.va) attrs.category.va = entry.category.va;
    if (entry.category.mhs) attrs.category.mhs = entry.category.mhs;
    if (entry.category.ihs) attrs.category.ihs = entry.category.ihs;
  }
  
  // Funding source
  if (entry.fundingSource) {
    attrs.fundingSource = {};
    if (entry.fundingSource.va) attrs.fundingSource.va = entry.fundingSource.va;
    if (entry.fundingSource.mhs) attrs.fundingSource.mhs = entry.fundingSource.mhs;
  }
  
  // Vendor/Model references (cageRef)
  if (entry.cageRef && Array.isArray(entry.cageRef)) {
    const validRefs = entry.cageRef.filter(ref => ref && (ref.id || ref.model));
    if (validRefs.length > 0) {
      attrs.vendors = validRefs.map(ref => ({
        cageId: ref.id || null,
        model: ref.model || null,
        cutsheet: ref.cutsheet || null,
        price: ref.price?.amount ? parseFloat(ref.price.amount) : null,
        priceDate: ref.price?.date || null
      })).filter(v => v.cageId || v.model);
    }
  }
  
  // Criteria sheet reference
  if (entry.criteriaSheet && entry.criteriaSheet.id) {
    attrs.criteriaSheet = {
      id: entry.criteriaSheet.id,
      code: entry.criteriaSheet.code || null,
      filename: entry.criteriaSheet.attachment?.filename || null
    };
  }
  
  // Review dates
  if (entry.dateApproved) attrs.dateApproved = entry.dateApproved;
  if (entry.lastModifiedDate) attrs.lastModifiedDate = entry.lastModifiedDate;
  if (entry.yearReview) attrs.yearReview = entry.yearReview;
  if (entry.frequencyReview) attrs.frequencyReview = entry.frequencyReview;
  
  // NSN
  if (entry.nsn && entry.nsn !== '0') {
    attrs.nsn = entry.nsn;
  }
  
  return attrs;
}

/**
 * Escape string for JavaScript output
 */
function escapeString(str) {
  if (!str) return '';
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
}

/**
 * Main import function
 */
async function importEquipmentDatabase() {
  console.log('Starting equipment database import...\n');
  
  // Load the new equipment database JSON
  console.log(`Loading: ${SOURCE_JSON}`);
  const rawData = fs.readFileSync(SOURCE_JSON, 'utf-8');
  const database = JSON.parse(rawData);
  
  console.log(`  Total equipment in database: ${database.metadata.total_equipment_count}`);
  console.log(`  Extraction date: ${database.metadata.extraction_date}`);
  console.log(`  Source files: ${database.metadata.source_files.length}\n`);
  
  // Load existing equipment list for descriptions
  console.log(`Loading existing equipment list: ${EXISTING_EQUIPMENT}`);
  const existingEquipment = parseExistingEquipmentList(EXISTING_EQUIPMENT);
  
  // Process all equipment from the new database
  const mergedEquipment = [];
  const extendedAttributes = {};
  let newCount = 0;
  let updatedCount = 0;
  let preservedDescriptions = 0;
  
  for (const [jsn, entry] of Object.entries(database.equipment)) {
    const existing = existingEquipment.get(jsn);
    
    // Build the merged equipment item
    const item = {
      jsn: jsn,
      name: formatName(entry.nomenclature, jsn),
      acqIns: getAcqIns(entry.category),
      // Preserve existing description if available, otherwise use nomenclature
      description: existing?.description || entry.nomenclature || ''
    };
    
    if (existing?.description) {
      preservedDescriptions++;
    }
    
    if (existing) {
      updatedCount++;
    } else {
      newCount++;
    }
    
    mergedEquipment.push(item);
    
    // Extract extended attributes
    const attrs = extractExtendedAttributes(entry);
    if (Object.keys(attrs).length > 0) {
      extendedAttributes[jsn] = attrs;
    }
  }
  
  // Also include any existing equipment not in the new database
  for (const [jsn, existing] of existingEquipment) {
    if (!database.equipment[jsn]) {
      mergedEquipment.push(existing);
      console.log(`  Preserved existing item not in new database: ${jsn}`);
    }
  }
  
  // Sort by JSN
  mergedEquipment.sort((a, b) => a.jsn.localeCompare(b.jsn));
  
  console.log(`\nProcessing complete:`);
  console.log(`  New equipment items: ${newCount}`);
  console.log(`  Updated equipment items: ${updatedCount}`);
  console.log(`  Preserved descriptions: ${preservedDescriptions}`);
  console.log(`  Total merged items: ${mergedEquipment.length}`);
  console.log(`  Items with extended attributes: ${Object.keys(extendedAttributes).length}`);
  
  // Generate merged equipment file
  console.log(`\nWriting: ${OUTPUT_MERGED}`);
  const mergedContent = generateMergedEquipmentFile(mergedEquipment);
  fs.writeFileSync(OUTPUT_MERGED, mergedContent, 'utf-8');
  
  // Generate extended attributes file
  console.log(`Writing: ${OUTPUT_ATTRIBUTES}`);
  const attributesContent = generateAttributesFile(extendedAttributes);
  fs.writeFileSync(OUTPUT_ATTRIBUTES, attributesContent, 'utf-8');
  
  console.log('\nImport complete!');
  console.log('\nNext steps:');
  console.log('  1. Review the generated files for accuracy');
  console.log('  2. Replace equipment-data-part1.js with equipment-data-merged.js');
  console.log('  3. Include equipment-attributes.js in index.html for extended data');
}

/**
 * Generate the merged EQUIPMENT_LIST file
 */
function generateMergedEquipmentFile(equipment) {
  const lines = [
    '// AUTO-GENERATED EQUIPMENT DATA',
    '// Generated from equipment_database.json',
    `// Generated: ${new Date().toISOString()}`,
    `// Total items: ${equipment.length}`,
    '',
    'const EQUIPMENT_LIST = ['
  ];
  
  for (const item of equipment) {
    const line = `  { jsn: "${escapeString(item.jsn)}", name: "${escapeString(item.name)}", acqIns: "${escapeString(item.acqIns)}", description: "${escapeString(item.description)}" },`;
    lines.push(line);
  }
  
  lines.push('];');
  lines.push('');
  
  return lines.join('\n');
}

/**
 * Generate the extended attributes file
 */
function generateAttributesFile(attributes) {
  const lines = [
    '// EQUIPMENT EXTENDED ATTRIBUTES',
    '// Generated from equipment_database.json',
    `// Generated: ${new Date().toISOString()}`,
    `// Total items with extended data: ${Object.keys(attributes).length}`,
    '',
    '/**',
    ' * Extended equipment attributes keyed by JSN.',
    ' * Contains detailed specifications from the MIL Standard database:',
    ' * - dimensions (width, height, depth, weight in inches/lbs and metric)',
    ' * - power (amps, volts, watts, phase)',
    ' * - hertz (frequency, BTU/hour)',
    ' * - meanPrice, priceDate',
    ' * - category (VA, MHS codes)',
    ' * - fundingSource',
    ' * - vendors (CAGE IDs, models, cutsheets)',
    ' * - criteriaSheet references',
    ' * - utilities requirements',
    ' */',
    'const EQUIPMENT_ATTRIBUTES = ' + JSON.stringify(attributes, null, 2) + ';',
    '',
    '/**',
    ' * Get extended attributes for an equipment item by JSN',
    ' * @param {string} jsn - The JSN code',
    ' * @returns {Object|null} Extended attributes or null if not found',
    ' */',
    'function getEquipmentAttributes(jsn) {',
    '  return EQUIPMENT_ATTRIBUTES[jsn] || null;',
    '}',
    '',
    '/**',
    ' * Get formatted dimensions string for an equipment item',
    ' * @param {string} jsn - The JSN code',
    ' * @returns {string} Formatted dimensions (e.g., "24\\"W x 36\\"H x 18\\"D") or empty string',
    ' */',
    'function getEquipmentDimensions(jsn) {',
    '  const attrs = EQUIPMENT_ATTRIBUTES[jsn];',
    '  if (!attrs || !attrs.dimensions) return "";',
    '  const d = attrs.dimensions;',
    '  if (!d.width && !d.height && !d.depth) return "";',
    '  const parts = [];',
    '  if (d.width) parts.push(d.width + `"W`);',
    '  if (d.height) parts.push(d.height + `"H`);',
    '  if (d.depth) parts.push(d.depth + `"D`);',
    '  return parts.join(" x ");',
    '}',
    '',
    '/**',
    ' * Get formatted power requirements string for an equipment item',
    ' * @param {string} jsn - The JSN code',
    ' * @returns {string} Formatted power (e.g., "120V/15A") or empty string',
    ' */',
    'function getEquipmentPower(jsn) {',
    '  const attrs = EQUIPMENT_ATTRIBUTES[jsn];',
    '  if (!attrs || !attrs.power) return "";',
    '  const p = attrs.power;',
    '  if (!p.volts && !p.amps) return "";',
    '  let result = "";',
    '  if (p.volts) result += p.volts + "V";',
    '  if (p.amps) result += (result ? "/" : "") + p.amps + "A";',
    '  if (p.phase && p.phase > 1) result += " " + p.phase + "ph";',
    '  return result;',
    '}',
    '',
    '// Make available globally',
    'if (typeof window !== "undefined") {',
    '  window.EQUIPMENT_ATTRIBUTES = EQUIPMENT_ATTRIBUTES;',
    '  window.getEquipmentAttributes = getEquipmentAttributes;',
    '  window.getEquipmentDimensions = getEquipmentDimensions;',
    '  window.getEquipmentPower = getEquipmentPower;',
    '}',
    ''
  ];
  
  return lines.join('\n');
}

// Run the import
importEquipmentDatabase().catch(err => {
  console.error('Import failed:', err);
  process.exit(1);
});
