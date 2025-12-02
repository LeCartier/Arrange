// Equipment data loader
// This file coordinates loading of equipment data

// Will be populated by external files
let EQUIPMENT_LIST = [];
let ROOM_EQUIPMENT_MAPPINGS = [];

// Load equipment data from TSV
async function loadEquipmentData() {
  try {
    const response = await fetch('Equipment_Guide_parsed_v2.txt');
    const text = await response.text();
    const lines = text.split('\n');
    
    // Skip header
    const equipmentMap = new Map();
    const mappings = [];
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const fields = line.split('\t');
      if (fields.length !== 8) continue;
      
      const [dept, funcArea, roomName, jsn, name, qty, acqIns, description] = fields;
      
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
        department: dept.replace(/"/g, '').trim(),
        functionalArea: funcArea.replace(/"/g, '').trim(),
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
    
    console.log(`Loaded ${EQUIPMENT_LIST.length} equipment items and ${ROOM_EQUIPMENT_MAPPINGS.length} room mappings`);
    return true;
  } catch (error) {
    console.error('Error loading equipment data:', error);
    return false;
  }
}
