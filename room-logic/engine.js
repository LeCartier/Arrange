// Room Logic Evaluation Engine
// Processes chapter logic to calculate room quantities based on user inputs

/**
 * Evaluates room requirements for a given chapter based on user inputs
 * @param {Object} chapter - Chapter data (e.g., CHAPTER_100)
 * @param {Object} userInputs - User-provided input values
 * @returns {Object} Calculated room requirements with quantities and square footage
 */
export function evaluateChapter(chapter, userInputs) {
  const calculations = {}; // Stores intermediate calculation results
  const results = {
    chapter: chapter.chapter,
    name: chapter.name,
    functionalAreas: [],
    totalRooms: 0,
    totalNSF: 0,
    errors: []
  };

  // Validate inputs
  const missingInputs = chapter.inputs.filter(input => 
    userInputs[input.id] === undefined || userInputs[input.id] === null
  );
  
  if (missingInputs.length > 0) {
    results.errors.push({
      type: 'missing_inputs',
      message: `Missing required inputs: ${missingInputs.map(i => i.label).join(', ')}`
    });
    return results;
  }

  // Process each functional area
  for (const fa of chapter.functionalAreas) {
    const faResult = {
      id: fa.id,
      name: fa.name,
      description: fa.description,
      rooms: []
    };

    // Process each room in the functional area
    for (const room of fa.rooms) {
      try {
        const roomResult = evaluateRoom(room, userInputs, calculations);
        if (roomResult.quantity > 0) {
          faResult.rooms.push(roomResult);
          results.totalRooms += roomResult.quantity;
          results.totalNSF += roomResult.totalNSF;
        }
      } catch (error) {
        results.errors.push({
          type: 'room_evaluation_error',
          room: room.name,
          message: error.message
        });
      }
    }

    if (faResult.rooms.length > 0) {
      results.functionalAreas.push(faResult);
    }
  }

  return results;
}

/**
 * Evaluates a single room's requirements
 * @param {Object} room - Room definition from chapter
 * @param {Object} inputs - User inputs
 * @param {Object} calculations - Accumulated calculation results
 * @returns {Object} Room result with quantity and NSF
 */
function evaluateRoom(room, inputs, calculations) {
  let quantity = 0;

  // Evaluate each rule until one matches
  for (const rule of room.rules) {
    let conditionMet = false;

    // Evaluate condition (can be a function or simple value)
    if (typeof rule.condition === 'function') {
      conditionMet = rule.condition(inputs, calculations);
    } else if (typeof rule.condition === 'boolean') {
      conditionMet = rule.condition;
    }

    if (conditionMet) {
      // Calculate quantity based on rule
      if (typeof rule.quantity === 'function') {
        quantity = rule.quantity(inputs, calculations);
      } else if (typeof rule.quantity === 'number') {
        quantity = rule.quantity;
      }
      break; // Stop at first matching rule
    }
  }

  // Store calculation result for other rooms to reference
  calculations[room.id] = quantity;

  return {
    id: room.id,
    code: room.code || room.id, // Use id as code if code is not provided
    name: room.name,
    quantity: quantity,
    nsfPerRoom: room.nsf,
    totalNSF: quantity * room.nsf,
    type: room.type || 'room',
    notes: room.notes
  };
}

/**
 * Groups results by room code and aggregates quantities
 * Useful when multiple functional areas reference the same room code
 * @param {Object} results - Results from evaluateChapter
 * @returns {Object} Aggregated results by room code
 */
export function aggregateByRoomCode(results) {
  const aggregated = {};

  for (const fa of results.functionalAreas) {
    for (const room of fa.rooms) {
      if (!aggregated[room.code]) {
        aggregated[room.code] = {
          code: room.code,
          name: room.name,
          quantity: 0,
          nsfPerRoom: room.nsfPerRoom,
          totalNSF: 0,
          instances: []
        };
      }

      aggregated[room.code].quantity += room.quantity;
      aggregated[room.code].totalNSF += room.totalNSF;
      aggregated[room.code].instances.push({
        functionalArea: fa.name,
        quantity: room.quantity,
        notes: room.notes
      });
    }
  }

  return Object.values(aggregated);
}

/**
 * Formats evaluation results for display
 * @param {Object} results - Results from evaluateChapter
 * @returns {Array} Formatted room list for UI display
 */
export function formatForDisplay(results) {
  const formatted = [];

  for (const fa of results.functionalAreas) {
    formatted.push({
      type: 'header',
      text: `${fa.name}`,
      description: fa.description
    });

    for (const room of fa.rooms) {
      // Skip calculation-only rooms (type: 'calculation')
      if (room.type === 'calculation') {
        formatted.push({
          type: 'calculation',
          text: `${room.name}: ${room.quantity}`,
          notes: room.notes
        });
      } else {
        formatted.push({
          type: 'room',
          code: room.code,
          name: room.name,
          quantity: room.quantity,
          nsf: room.nsfPerRoom,
          totalNSF: room.totalNSF,
          notes: room.notes
        });
      }
    }
  }

  return formatted;
}

/**
 * Exports results as JSON for file saving/sharing
 * @param {Object} results - Results from evaluateChapter
 * @param {Object} userInputs - Original user inputs
 * @param {Object} metadata - Project metadata (name, date, etc.)
 * @returns {Object} Complete exportable data
 */
export function exportResults(results, userInputs, metadata = {}) {
  return {
    version: "1.0",
    exportDate: new Date().toISOString(),
    metadata: {
      projectName: metadata.projectName || "Untitled Project",
      createdBy: metadata.createdBy || "User",
      ...metadata
    },
    inputs: userInputs,
    results: results,
    summary: {
      totalRooms: results.totalRooms,
      totalNSF: results.totalNSF,
      functionalAreaCount: results.functionalAreas.length
    }
  };
}

/**
 * Imports previously exported results
 * @param {Object} exportedData - Data from exportResults
 * @returns {Object} Parsed data ready for use
 */
export function importResults(exportedData) {
  if (!exportedData.version || !exportedData.results) {
    throw new Error("Invalid export format");
  }

  return {
    metadata: exportedData.metadata,
    inputs: exportedData.inputs,
    results: exportedData.results,
    summary: exportedData.summary
  };
}
