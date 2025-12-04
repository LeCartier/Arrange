# Room Logic System

This folder contains the parsed VA Space Planning Criteria logic for calculating room requirements based on project inputs.

## Structure

```
room-logic/
├── index.js                          # Chapter registry and lookup functions
├── engine.js                         # Rule evaluation engine
├── examples.js                       # Integration examples and workflows
├── chapter-100-medical-surgical.js   # Chapter 100: Med/Surg Units
├── chapter-102-intensive-care.js     # Chapter 102: ICU Units
└── ... (more chapters to be added)
```

## How It Works

### 1. Chapter Definition

Each chapter file contains:
- **Metadata**: Chapter number, name, description
- **Inputs**: What data the user needs to provide (e.g., number of beds)
- **Functional Areas**: Grouped room categories
- **Rooms**: Individual room types with calculation rules

Example structure:
```javascript
{
  chapter: "100",
  name: "Medical / Surgical Patient Care Unit",
  inputs: [
    { id: "acute_ms_beds", label: "Acute Inpatient Med/Surg beds projected", type: "number" }
  ],
  functionalAreas: [
    {
      id: "FA1",
      name: "Unit Calculation",
      rooms: [
        {
          id: "SC131",
          name: "Number of MS PCUs",
          nsf: 0,
          type: "calculation",
          rules: [
            { condition: (inputs) => inputs.acute_ms_beds >= 17 && inputs.acute_ms_beds <= 33, quantity: 1 }
          ]
        }
      ]
    }
  ]
}
```

### 2. Rule Logic

Rules use functions to evaluate conditions and calculate quantities:

```javascript
// Simple range check
{ 
  condition: (inputs) => inputs.acute_ms_beds >= 34 && inputs.acute_ms_beds <= 66,
  quantity: 2 
}

// Reference to another room's calculated value
{
  condition: (inputs, calc) => calc.SC131 >= 1,
  quantity: (inputs, calc) => calc.SC131
}

// Complex conditional
{
  condition: (inputs, calc) => calc.SC131 >= 1 && calc.SC131 <= 2,
  quantity: 1
}
```

### 3. Evaluation Engine

The engine (`engine.js`) processes chapters:

```javascript
import { evaluateChapter } from './room-logic/engine.js';
import { CHAPTER_100 } from './room-logic/chapter-100-medical-surgical.js';

const results = evaluateChapter(CHAPTER_100, { acute_ms_beds: 50 });

// Results include:
// - functionalAreas: grouped rooms with quantities
// - totalRooms: total number of rooms
// - totalNSF: total net square footage
// - errors: any calculation errors
```

## Integration with Application

### Workflow 1: Adding a Department

1. User clicks "Add Department"
2. Show list of available chapters (from `getAllChapters()`)
3. User selects a chapter (e.g., "Medical/Surgical Unit")
4. Show input form (from `chapter.inputs`)
5. User enters data (e.g., 50 beds)
6. Calculate rooms (via `evaluateChapter()`)
7. Display results to user
8. User confirms, rooms added to project

### Workflow 2: New Project Creation

1. User clicks "New Project"
2. Enter project name/metadata
3. Add departments one by one (see Workflow 1)
4. System calculates totals across all departments
5. User can export entire project as JSON

### Workflow 3: File Export/Import

```javascript
// Export
import { exportResults } from './room-logic/engine.js';
const exportData = exportResults(results, userInputs, { projectName: "My Hospital" });
const json = JSON.stringify(exportData, null, 2);
// Download as .json file

// Import
import { importResults } from './room-logic/engine.js';
const imported = importResults(JSON.parse(jsonString));
// Use imported.results to restore project state
```

## Adding New Chapters

To add a new chapter:

1. Create `chapter-XXX-name.js` file
2. Parse Section 5 from the VA criteria document
3. Define inputs, functional areas, and room rules
4. Add to `index.js` registry:
   ```javascript
   import { CHAPTER_XXX } from './chapter-XXX-name.js';
   export const CHAPTERS = {
     '100': CHAPTER_100,
     '102': CHAPTER_102,
     'XXX': CHAPTER_XXX  // Add here
   };
   ```

## Room Types

- **calculation**: Virtual room for intermediate calculations (e.g., "Number of units")
- **room**: Physical room with NSF (default type)

## Data Flow

```
User Input
    ↓
evaluateChapter()
    ↓
Evaluate each room's rules sequentially
    ↓
Store calculations for dependent rooms
    ↓
Return results with quantities & NSF
    ↓
formatForDisplay() → UI
exportResults() → JSON file
```

## Testing

See `examples.js` for complete workflow examples:
- `exampleWorkflow()`: Single department calculation
- `createNewProject()`: Multi-department project

## Future Enhancements

- [ ] Parse remaining chapters from Combined Space Criteria.txt
- [ ] Add chapter categories/grouping
- [ ] Support for conditional inputs (show/hide based on previous answers)
- [ ] Formula debugging/explanation mode
- [ ] Visual formula builder/editor
- [ ] Import from CSV/Excel
- [ ] Generate Revit-compatible output format
