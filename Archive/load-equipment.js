// Equipment data loader
// This file coordinates loading of equipment data
//
// DATA SOURCE: Equipment_Guide_parsed_v2.txt (CURRENT/CANONICAL)
// - Paired with room_criteria.tsv as the authoritative equipment source
// - Uses current VARF room codes (extracted from room names)
// - Most maintained and up-to-date equipment specifications
//
// Room codes extracted from format: "Order - CODE - Name"
// These codes match the canonical VARF codes in room_criteria.tsv

// Will be populated by external files
let EQUIPMENT_LIST = [];
let ROOM_EQUIPMENT_MAPPINGS = [];

// Canonical FA structure built from Equipment Guide
// This preserves the exact order FAs appear in the file
let CANONICAL_FA_ORDER = {};

// Load equipment data from TSV
async function loadEquipmentData() {
  try {
    const response = await fetch('Equipment_Guide_parsed_v2.txt');
    const text = await response.text();
    const lines = text.split('\n');
    
    // Skip header
    const equipmentMap = new Map();
    const mappings = [];
    
    // Build canonical FA ordering as we parse - preserves Equipment Guide order
    // Structure: { 'chapterId': { faOrder: ['FA1 Name', 'FA2 Name', ...], faNameToNumber: { 'FA NAME': '1', ... } } }
    const canonicalFAOrder = {};
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const fields = line.split('\t');
      if (fields.length !== 8) continue;
      
      const [dept, funcArea, roomName, jsn, name, qty, acqIns, description] = fields;
      
      // Extract chapter number from department (format: "100 (MEDICAL / SURGICAL...)")
      const deptClean = dept.replace(/"/g, '').trim();
      const funcAreaClean = funcArea.replace(/"/g, '').trim();
      const chapterMatch = deptClean.match(/^(\d+)/);
      
      if (chapterMatch) {
        const chapterId = chapterMatch[1];
        
        // Initialize chapter if not seen
        if (!canonicalFAOrder[chapterId]) {
          canonicalFAOrder[chapterId] = {
            departmentName: deptClean,
            faOrder: [],
            faNameToNumber: {}
          };
        }
        
        // Add FA if not already in this chapter's list (first occurrence sets order)
        if (!canonicalFAOrder[chapterId].faNameToNumber[funcAreaClean]) {
          const faNumber = String(canonicalFAOrder[chapterId].faOrder.length + 1);
          canonicalFAOrder[chapterId].faOrder.push(funcAreaClean);
          canonicalFAOrder[chapterId].faNameToNumber[funcAreaClean] = faNumber;
        }
      }
      
      // Extract room code from room name (format: "Order - CODE - Name")
      const roomCodeMatch = roomName.match(/- ([A-Z0-9]+) -/);
      if (!roomCodeMatch) continue;
      
      const roomCode = roomCodeMatch[1];
      
      // Clean up room name (remove order number and code, keep just the name)
      const roomNameClean = roomName.split(' - ').slice(2).join(' - ').trim();
      
      // Add to equipment list if not already present
      if (!equipmentMap.has(jsn)) {
        equipmentMap.set(jsn, {
          jsn: jsn.replace(/"/g, '').trim(),
          name: name.replace(/"/g, '').trim(),
          acqIns: acqIns.replace(/"/g, '').trim(),
          description: description.replace(/"/g, '').trim()
        });
      }
      
      // Add room-equipment mapping with all fields
      mappings.push({
        department: deptClean,
        functionalArea: funcAreaClean,
        roomCode: roomCode,
        roomName: roomNameClean,
        jsn: jsn.replace(/"/g, '').trim(),
        equipmentJsn: jsn.replace(/"/g, '').trim(),
        quantity: parseInt(qty) || 1,
        acqIns: acqIns.replace(/"/g, '').trim()
      });
    }
    
    EQUIPMENT_LIST = Array.from(equipmentMap.values());
    ROOM_EQUIPMENT_MAPPINGS = mappings;
    CANONICAL_FA_ORDER = canonicalFAOrder;
    
    // Make canonical FA order available globally
    window.CANONICAL_FA_ORDER = canonicalFAOrder;
    
    console.log(`Loaded ${EQUIPMENT_LIST.length} equipment items and ${ROOM_EQUIPMENT_MAPPINGS.length} room mappings`);
    console.log(`Built canonical FA order for ${Object.keys(canonicalFAOrder).length} chapters`);
    
    // Log a few examples
    const exampleChapters = ['100', '270', '204'].filter(c => canonicalFAOrder[c]);
    exampleChapters.forEach(ch => {
      console.log(`Chapter ${ch} FAs (in order):`, canonicalFAOrder[ch].faOrder.map((fa, i) => `${i+1}:${fa}`).join(', '));
    });
    
    return true;
  } catch (error) {
    console.error('Error loading equipment data:', error);
    return false;
  }
}
