// Example Integration: How to use the room-logic system in your application
// This demonstrates the workflow for adding a department or creating a new project

import { getChapter, getAllChapters } from './room-logic/index.js';
import { evaluateChapter, formatForDisplay, exportResults } from './room-logic/engine.js';

// ========================================
// EXAMPLE 1: Department Selection UI
// ========================================

/**
 * Step 1: Show user a list of available departments (chapters)
 */
function showDepartmentSelector() {
  const chapters = getAllChapters();
  
  // Display in your UI (example data structure)
  return chapters.map(chapter => ({
    id: chapter.id,
    name: chapter.name,
    description: chapter.description
  }));
  
  // Example output:
  // [
  //   { id: '100', name: 'Medical / Surgical Patient Care Unit (MS-PCU)', ... },
  //   { id: '102', name: 'Intensive Care Patient Care Unit (IC-PCU)', ... }
  // ]
}

/**
 * Step 2: User selects a chapter, show input form
 */
function showInputForm(chapterId) {
  const chapter = getChapter(chapterId);
  
  if (!chapter) {
    throw new Error(`Chapter ${chapterId} not found`);
  }
  
  // Build form fields from chapter.inputs
  return chapter.inputs.map(input => ({
    id: input.id,
    label: input.label,
    type: input.type,
    min: input.min,
    helpText: input.helpText
  }));
  
  // Example output for Chapter 100:
  // [
  //   {
  //     id: 'acute_ms_beds',
  //     label: 'Acute Inpatient Medical/Surgical patient beds projected',
  //     type: 'number',
  //     min: 0,
  //     helpText: 'Total number of projected Med/Surg acute care beds...'
  //   }
  // ]
}

/**
 * Step 3: User fills out form, calculate room requirements
 */
function calculateRooms(chapterId, userInputs) {
  const chapter = getChapter(chapterId);
  
  if (!chapter) {
    throw new Error(`Chapter ${chapterId} not found`);
  }
  
  // Evaluate the chapter with user inputs
  const results = evaluateChapter(chapter, userInputs);
  
  // Check for errors
  if (results.errors.length > 0) {
    console.error('Calculation errors:', results.errors);
    // Handle errors in your UI
  }
  
  return results;
}

/**
 * Step 4: Display results to user
 */
function displayResults(results) {
  const formatted = formatForDisplay(results);
  
  // Example: formatted output ready for UI rendering
  // [
  //   { type: 'header', text: 'Medical / Surgical Inpatient Unit Calculation', ... },
  //   { type: 'calculation', text: 'Number of MS PCUs, Clncl Sprt: 2', ... },
  //   { type: 'header', text: 'Reception Area', ... },
  //   { type: 'room', code: 'SB003', name: 'MS PCU Waiting', quantity: 2, nsf: 330, totalNSF: 660, ... },
  //   ...
  // ]
  
  return formatted;
}

// ========================================
// EXAMPLE 2: Complete Workflow
// ========================================

/**
 * Complete workflow: User adds Medical/Surgical Department
 */
function exampleWorkflow() {
  // Step 1: User selects Chapter 100 from dropdown
  const chapterId = '100';
  
  // Step 2: Show input form
  const inputForm = showInputForm(chapterId);
  console.log('Input Form:', inputForm);
  
  // Step 3: User enters data (example: 50 beds)
  const userInputs = {
    acute_ms_beds: 50  // User entered 50 beds
  };
  
  // Step 4: Calculate room requirements
  const results = calculateRooms(chapterId, userInputs);
  console.log('Calculation Results:', results);
  
  // Results will show:
  // - 2 MS-PCU units (34-66 beds = 2 units)
  // - 2 waiting rooms (1 per unit)
  // - 4 consult rooms (2 per unit)
  // - 45 patient bedrooms
  // - etc.
  
  // Step 5: Format for display
  const displayData = displayResults(results);
  console.log('Display Data:', displayData);
  
  // Step 6: User confirms, add to their project
  return {
    department: results.name,
    rooms: results.functionalAreas,
    totalNSF: results.totalNSF
  };
}

// ========================================
// EXAMPLE 3: Save/Export Project
// ========================================

/**
 * Export department calculations for file sharing
 */
function exportDepartment(chapterId, userInputs, projectMetadata) {
  const chapter = getChapter(chapterId);
  const results = evaluateChapter(chapter, userInputs);
  
  const exportData = exportResults(results, userInputs, {
    projectName: projectMetadata.projectName || 'My Hospital Project',
    createdBy: projectMetadata.createdBy || 'User',
    location: projectMetadata.location,
    notes: projectMetadata.notes
  });
  
  // Save as JSON file
  const jsonString = JSON.stringify(exportData, null, 2);
  
  // In browser, trigger download:
  // const blob = new Blob([jsonString], { type: 'application/json' });
  // const url = URL.createObjectURL(blob);
  // const a = document.createElement('a');
  // a.href = url;
  // a.download = `${projectMetadata.projectName}-chapter-${chapterId}.json`;
  // a.click();
  
  return jsonString;
}

// ========================================
// EXAMPLE 4: New Project Workflow
// ========================================

/**
 * Multi-department project creation
 */
function createNewProject(projectName) {
  const project = {
    name: projectName,
    created: new Date().toISOString(),
    departments: []
  };
  
  // User adds multiple departments
  // Example: Add Med/Surg (100) and ICU (102)
  
  // Department 1: Medical/Surgical (50 beds)
  const medSurgResults = calculateRooms('100', { acute_ms_beds: 50 });
  project.departments.push({
    chapter: '100',
    name: medSurgResults.name,
    inputs: { acute_ms_beds: 50 },
    results: medSurgResults
  });
  
  // Department 2: ICU (20 beds)
  const icuResults = calculateRooms('102', { icu_beds: 20 });
  project.departments.push({
    chapter: '102',
    name: icuResults.name,
    inputs: { icu_beds: 20 },
    results: icuResults
  });
  
  // Calculate project totals
  project.totalNSF = project.departments.reduce((sum, dept) => sum + dept.results.totalNSF, 0);
  project.totalRooms = project.departments.reduce((sum, dept) => sum + dept.results.totalRooms, 0);
  
  return project;
}

// ========================================
// Usage Examples (for testing)
// ========================================

// Uncomment to test:
// const workflow = exampleWorkflow();
// console.log('Example Workflow Result:', workflow);

// const project = createNewProject('VA Hospital Expansion');
// console.log('New Project:', project);

export {
  showDepartmentSelector,
  showInputForm,
  calculateRooms,
  displayResults,
  exportDepartment,
  createNewProject
};
