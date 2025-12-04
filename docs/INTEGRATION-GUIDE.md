# Room Logic System - Integration Guide

## ✅ What's Been Created

### New Folder Structure
```
room-logic/
├── index.js                          # Chapter registry
├── engine.js                         # Calculation engine  
├── examples.js                       # Integration examples
├── README.md                         # Full documentation
├── chapter-100-medical-surgical.js   # Med/Surg units (COMPLETE)
└── chapter-102-intensive-care.js     # ICU units (COMPLETE)
```

### Key Components

1. **Chapter Files** - Parsed VA Space Planning Criteria logic
   - Chapter 100: Medical/Surgical (17-267 beds, 8 functional areas)
   - Chapter 102: Intensive Care (8-45 beds, 4 functional areas)

2. **Evaluation Engine** - Processes rules and calculates room quantities
   - Handles conditional logic
   - Supports dependent calculations
   - Validates inputs
   - Exports/imports JSON

3. **Integration Examples** - Ready-to-use workflows
   - Department selection
   - Input form generation
   - Room calculation
   - Results display
   - Project export/import

## 🎯 How to Use in Your Application

### Quick Start

```javascript
// 1. Import the system
import { getChapter } from './room-logic/index.js';
import { evaluateChapter } from './room-logic/engine.js';

// 2. Get a chapter
const chapter = getChapter('100'); // Medical/Surgical

// 3. User provides input
const userInput = {
  acute_ms_beds: 50  // User entered 50 beds
};

// 4. Calculate room requirements
const results = evaluateChapter(chapter, userInput);

// 5. Use the results
console.log(`Total rooms: ${results.totalRooms}`);
console.log(`Total NSF: ${results.totalNSF}`);
```

### Integration Points in Your App

**1. Add Department Workflow**
```javascript
// When user clicks "Add Department"
function addDepartment() {
  // Step 1: Show chapter selector
  const chapters = getAllChapters();
  showChapterPicker(chapters);
  
  // Step 2: User selects chapter, show input form
  const chapter = getChapter(selectedId);
  showInputForm(chapter.inputs);
  
  // Step 3: User enters data, calculate
  const results = evaluateChapter(chapter, userInputs);
  
  // Step 4: Add to project
  currentProject.departments.push({
    chapterId: chapter.chapter,
    name: chapter.name,
    inputs: userInputs,
    rooms: results.functionalAreas
  });
}
```

**2. New Project Creation**
```javascript
// Multi-department project
const project = {
  name: 'My Hospital',
  departments: []
};

// Add Med/Surg department
const medSurgResults = evaluateChapter(
  getChapter('100'),
  { acute_ms_beds: 50 }
);
project.departments.push(medSurgResults);

// Add ICU department
const icuResults = evaluateChapter(
  getChapter('102'),
  { icu_beds: 20 }
);
project.departments.push(icuResults);

// Calculate totals
project.totalNSF = project.departments.reduce(
  (sum, dept) => sum + dept.totalNSF, 0
);
```

**3. File Export/Import**
```javascript
// Export project
import { exportResults } from './room-logic/engine.js';

const exportData = exportResults(results, userInputs, {
  projectName: 'VA Hospital Expansion',
  createdBy: currentUser.name
});

// Save to file
const blob = new Blob([JSON.stringify(exportData, null, 2)], 
  { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = `${projectName}.json`;
a.click();

// Import project
const imported = importResults(JSON.parse(fileContent));
```

## 📊 Example Output

For **Chapter 100** with **50 beds**:

```
Medical / Surgical Patient Care Unit
- 2 MS-PCU units (34-66 beds = 2 units)
- 2 Waiting areas (660 NSF total)
- 4 Consult rooms (480 NSF total)
- 45 Patient bedrooms (12,600 NSF total)
- 45 Patient toilets/showers (3,150 NSF total)
- 7 AII isolation bedrooms (1,680 NSF total)
- 7 Protective isolation bedrooms (1,680 NSF total)
- ... and more

Total: 100+ rooms, ~25,000 NSF
```

## 🔧 Next Steps

### Immediate (To Use System Now)

1. **Add to your HTML:**
   ```html
   <script type="module" src="room-logic/index.js"></script>
   <script type="module" src="room-logic/engine.js"></script>
   ```

2. **Create UI for department selection:**
   - Dropdown or card grid showing available chapters
   - Input form generated from `chapter.inputs`
   - Results table showing calculated rooms

3. **Update your existing workflows:**
   - Replace `room-formulas.js` logic with new system
   - Add "Add Department" button that uses chapter selector
   - Add "Calculate Rooms" button in new project workflow

### Future Enhancements

1. **Parse more chapters** from Combined Space Criteria.txt
   - Chapter 104: Spinal Cord Injury
   - Chapter 106: Mental Health
   - Chapter 110: Emergency Department
   - etc. (pattern established, just copy structure)

2. **Advanced features:**
   - Visual formula explanation
   - "What-if" scenario comparison
   - Revit export format
   - Supabase integration for multi-user projects

## 🧪 Testing

Run the test file to see the system in action:

```bash
node test-room-logic.js
```

This will demonstrate:
- Listing available chapters
- Calculating Med/Surg unit with 50 beds
- Calculating ICU with 20 beds
- Exporting results
- Formatting for display

## 📝 Key Differences from Old System

**Old (`room-formulas.js`):**
- Empty template structure
- No actual formulas implemented
- Generic variable system
- Manual formula evaluation needed

**New (`room-logic/`):**
- **2 complete chapters** with real VA criteria
- **Automatic evaluation** via engine
- **Type-safe** input validation
- **Dependency tracking** (rooms can reference other rooms)
- **Export/import** built-in
- **Extensible** - easy to add new chapters

## 🎨 UI Integration Ideas

```html
<!-- Department Selector -->
<select id="chapterSelect">
  <option value="100">Med/Surg Patient Care Unit</option>
  <option value="102">Intensive Care Unit</option>
</select>

<!-- Dynamic Input Form (generated from chapter.inputs) -->
<div id="inputForm">
  <label>
    Acute Inpatient Med/Surg beds projected
    <input type="number" id="acute_ms_beds" min="0" />
  </label>
</div>

<!-- Calculate Button -->
<button onclick="calculateAndDisplay()">Calculate Rooms</button>

<!-- Results Display -->
<div id="results">
  <!-- Auto-generated from formatForDisplay() -->
</div>
```

## 💡 Summary

You now have:
- ✅ Systematic parsing of VA Space Planning Criteria
- ✅ Rule-based calculation engine
- ✅ 2 working chapters (100, 102) as templates
- ✅ Export/import for collaboration
- ✅ Integration examples and documentation
- ✅ Clear path to add remaining chapters

The logic is ready to plug into your **department selection** and **new project workflows**!
