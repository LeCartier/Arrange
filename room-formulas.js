// Room Calculation Formulas from VA TIL/MS Space Criteria
// Extracted from sections 4 and 5 of each chapter

const ROOM_FORMULAS = {
  // Example structure - to be populated from PDF sections 4 & 5
  // Each room code can have:
  // - minQty: minimum quantity formula or fixed number
  // - maxQty: maximum quantity formula or fixed number  
  // - qty: standard quantity formula (can reference project variables)
  // - nsf: net square footage (can be fixed or calculated)
  // - variables: list of project variables this room depends on
  
  // Example entries (these would come from actual PDF):
  /*
  "RMH23": {
    name: "16-Bed / 20-Bed RCU Community Room Kitchen, MH RCU",
    qty: { min: 1, max: 1, formula: "1 per RCU unit" },
    nsf: 200,
    variables: [],
    notes: "Section 4: One per RCU regardless of bed count"
  },
  
  "EXAM001": {
    name: "Example Exam Room",
    qty: { 
      min: 1, 
      max: 20,
      formula: "workload / 2000", // Formula would reference project workload
      description: "One room per 2,000 annual visits"
    },
    nsf: 120,
    variables: ["annualVisits"],
    notes: "Section 4: Calculate based on workload statistics"
  }
  */
};

// Project variables that formulas can reference
const PROJECT_VARIABLES = {
  // Demographics
  numBeds: { type: "number", description: "Number of operating beds", default: 0 },
  staffFTE: { type: "number", description: "Full-time equivalent staff", default: 0 },
  
  // Workload statistics
  annualDischarges: { type: "number", description: "Annual patient discharges", default: 0 },
  annualVisits: { type: "number", description: "Annual outpatient visits", default: 0 },
  annualSurgeries: { type: "number", description: "Annual surgical procedures", default: 0 },
  
  // Specialty flags
  hasMentalHealth: { type: "boolean", description: "Facility has mental health services", default: false },
  hasSCI: { type: "boolean", description: "Facility has spinal cord injury unit", default: false },
  hasPolytrauma: { type: "boolean", description: "Facility has polytrauma center", default: false },
  
  // Add more as needed from PDF formulas
};

// Utility function to evaluate a room formula given project data
function calculateRoomQuantity(roomCode, projectData) {
  const formula = ROOM_FORMULAS[roomCode];
  if (!formula || !formula.qty) {
    return { qty: 0, note: "No formula defined" };
  }
  
  // If it's a simple fixed quantity
  if (typeof formula.qty === 'number') {
    return { qty: formula.qty, note: "Fixed quantity" };
  }
  
  // If it has min/max/formula
  if (formula.qty.formula) {
    try {
      // This would need proper formula parsing
      // For now, return the formula description
      return {
        qty: formula.qty.min || 0,
        note: formula.qty.description || formula.qty.formula,
        requiresCalculation: true
      };
    } catch (e) {
      return { qty: formula.qty.min || 0, note: "Error evaluating formula", error: e.message };
    }
  }
  
  return { qty: 0, note: "Invalid formula structure" };
}

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ROOM_FORMULAS, PROJECT_VARIABLES, calculateRoomQuantity };
}
