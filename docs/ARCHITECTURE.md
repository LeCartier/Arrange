# Room Logic System Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    YOUR WEB APPLICATION                          │
│                  (index.html + JavaScript)                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ imports
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      ROOM LOGIC SYSTEM                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐       ┌──────────────┐                       │
│  │   index.js   │◄──────┤  Chapter     │                       │
│  │   Registry   │       │  Selector    │                       │
│  └──────────────┘       └──────────────┘                       │
│         │                                                        │
│         │ provides                                               │
│         ▼                                                        │
│  ┌──────────────────────────────────────────┐                  │
│  │         CHAPTER DATA FILES               │                  │
│  ├──────────────────────────────────────────┤                  │
│  │  chapter-100-medical-surgical.js         │                  │
│  │  chapter-102-intensive-care.js           │                  │
│  │  chapter-104-spinal-cord.js (future)     │                  │
│  │  ... (add more as needed)                │                  │
│  └──────────────────────────────────────────┘                  │
│                         │                                        │
│                         │ feeds into                             │
│                         ▼                                        │
│  ┌──────────────────────────────────────────┐                  │
│  │         EVALUATION ENGINE                │                  │
│  │         (engine.js)                      │                  │
│  ├──────────────────────────────────────────┤                  │
│  │  • Evaluates conditional rules           │                  │
│  │  • Calculates room quantities            │                  │
│  │  • Tracks dependencies                   │                  │
│  │  • Validates inputs                      │                  │
│  │  • Exports/imports projects              │                  │
│  └──────────────────────────────────────────┘                  │
│                         │                                        │
└─────────────────────────┼────────────────────────────────────────┘
                          │
                          │ returns
                          ▼
                   ┌──────────────┐
                   │   RESULTS    │
                   │   Object     │
                   └──────────────┘
```

## Data Flow: Add Department Workflow

```
User Action                    System Processing                   Output
─────────────────────────────────────────────────────────────────────────

[Click "Add Dept"]  ────────►  getAllChapters()
                               - Reads chapter registry
                               - Returns chapter list
                                                    ────────►  Chapter Selector UI
                                                              ┌─────────────────┐
                                                              │ ○ Med/Surg (100)│
                                                              │ ○ ICU (102)     │
                                                              │ ○ ...           │
                                                              └─────────────────┘

[Select Chapter 100] ───────►  getChapter('100')
                               - Loads chapter data
                               - Extracts inputs array
                                                    ────────►  Input Form
                                                              ┌─────────────────┐
                                                              │ Beds: [____]    │
                                                              │ [Calculate]     │
                                                              └─────────────────┘

[Enter: 50 beds]    ───────►  evaluateChapter(
[Click Calculate]              chapter100,
                               { acute_ms_beds: 50 }
                              )
                              
                              STEP 1: Evaluate FA1 (Unit Calc)
                              • Check rules for SC131
                              • 50 beds → 2 units
                              • Store: calc.SC131 = 2
                              
                              STEP 2: Evaluate FA2 (Reception)
                              • SB003 (Waiting)
                              • Rule: 1 per SC131
                              • calc.SC131 = 2
                              • Quantity = 2
                              • NSF = 2 × 330 = 660
                              
                              STEP 3: Evaluate FA3 (Patient Area)
                              • IMS21 (Bedrooms)
                              • Rule: if SC131 == 2, qty = 45
                              • Quantity = 45
                              • NSF = 45 × 280 = 12,600
                              
                              ... continues for all rooms ...
                                                    ────────►  Results Object
                                                              {
                                                                totalRooms: 105,
                                                                totalNSF: 25430,
                                                                functionalAreas: [...]
                                                              }

[Review Results]    ───────►  formatForDisplay(results)
                              - Converts to UI-friendly format
                                                    ────────►  Results Table
                                                              ┌─────────────────┐
                                                              │ ▶ Reception     │
                                                              │   Waiting x2    │
                                                              │   Consult x4    │
                                                              │ ▶ Patient Area  │
                                                              │   Bedroom x45   │
                                                              │   ...           │
                                                              └─────────────────┘

[Confirm]           ───────►  Add to project state
                              {
                                departments: [
                                  {
                                    id: '100',
                                    name: 'Med/Surg',
                                    rooms: [...],
                                    totalNSF: 25430
                                  }
                                ]
                              }
```

## Data Structure: Chapter Definition

```
CHAPTER_100
│
├── chapter: "100"
├── name: "Medical / Surgical Patient Care Unit"
├── description: "..."
│
├── inputs: [                           ◄─── What user must provide
│     {
│       id: "acute_ms_beds",
│       label: "Acute Inpatient Med/Surg beds",
│       type: "number",
│       min: 0
│     }
│   ]
│
└── functionalAreas: [
      │
      ├── FA1: Unit Calculation          ◄─── Virtual calculations
      │   └── rooms: [
      │         {
      │           id: "SC131",
      │           name: "Number of MS PCUs",
      │           nsf: 0,
      │           type: "calculation",
      │           rules: [
      │             {
      │               condition: (inputs) => inputs.acute_ms_beds >= 34 && <= 66,
      │               quantity: 2              ◄─── Returns 2 if 34-66 beds
      │             }
      │           ]
      │         }
      │       ]
      │
      ├── FA2: Reception Area             ◄─── Physical rooms
      │   └── rooms: [
      │         {
      │           id: "SB003",
      │           name: "MS PCU Waiting",
      │           nsf: 330,                  ◄─── Square footage per room
      │           rules: [
      │             {
      │               condition: (inputs, calc) => calc.SC131 >= 1,
      │               quantity: (inputs, calc) => calc.SC131    ◄─── References calc
      │             }
      │           ]
      │         }
      │       ]
      │
      └── FA3: Patient Area
          └── rooms: [
                {
                  id: "IMS21",
                  name: "Patient Bedroom",
                  nsf: 280,
                  rules: [
                    {
                      condition: (inputs, calc) => calc.SC131 === 2,
                      quantity: 45              ◄─── Lookup table logic
                    }
                  ]
                }
              ]
```

## Rule Evaluation Flow

```
Input: { acute_ms_beds: 50 }
│
├─► ROOM: SC131 (Number of Units)
│   ├─ Rule 1: if 17-33 beds → 1 unit ✗
│   ├─ Rule 2: if 34-66 beds → 2 units ✓  ◄─── MATCH!
│   └─ Result: calc.SC131 = 2
│
├─► ROOM: SB003 (Waiting)
│   ├─ Condition: calc.SC131 >= 1 ✓
│   ├─ Quantity: calc.SC131 → 2
│   └─ Result: 2 rooms × 330 NSF = 660 NSF
│
├─► ROOM: IMS21 (Patient Bedroom)
│   ├─ Rule 1: if SC131 === 1 → 24 beds ✗
│   ├─ Rule 2: if SC131 === 2 → 45 beds ✓  ◄─── MATCH!
│   └─ Result: 45 rooms × 280 NSF = 12,600 NSF
│
└─► Continue for all rooms...
    
Final Results:
{
  totalRooms: 105,
  totalNSF: 25,430,
  functionalAreas: [3 areas with detailed rooms]
}
```

## Export/Import Flow

```
EXPORT FLOW
─────────────

Project Data
    │
    ├─ Department 1 (Med/Surg)
    │   ├─ Inputs: { acute_ms_beds: 50 }
    │   └─ Results: { totalRooms: 105, ... }
    │
    ├─ Department 2 (ICU)
    │   ├─ Inputs: { icu_beds: 20 }
    │   └─ Results: { totalRooms: 67, ... }
    │
    └─► exportResults()
        └─► JSON File
            {
              "version": "1.0",
              "metadata": {
                "projectName": "VA Hospital",
                "createdBy": "User"
              },
              "departments": [...],
              "summary": {
                "totalRooms": 172,
                "totalNSF": 45000
              }
            }

IMPORT FLOW
─────────────

User opens .json file
    │
    └─► importResults(jsonData)
        ├─ Validates version
        ├─ Restores metadata
        ├─ Restores inputs
        └─► Returns project data
            └─► App state restored
```

## File Organization

```
Arrange/
│
├── index.html                  ◄─── Main application
├── room-formulas.js           ◄─── OLD (can deprecate)
├── test-room-logic.js         ◄─── Test runner
├── INTEGRATION-GUIDE.md       ◄─── You are here
│
└── room-logic/                ◄─── NEW SYSTEM
    ├── README.md              ◄─── Full documentation
    ├── index.js               ◄─── Chapter registry
    ├── engine.js              ◄─── Calculation engine
    ├── examples.js            ◄─── Usage examples
    ├── chapter-100-medical-surgical.js   ◄─── Med/Surg logic
    └── chapter-102-intensive-care.js     ◄─── ICU logic
```

## Key Concepts

### 1. Separation of Concerns
- **Chapter files** = Data (rules, inputs, room definitions)
- **Engine** = Logic (evaluation, validation, export)
- **Your app** = UI (forms, display, user interaction)

### 2. Rule-Based System
- Conditions evaluated as JavaScript functions
- Flexible: can be simple or complex
- Dependency tracking: rooms can reference other rooms

### 3. Type Safety
- Inputs validated before evaluation
- Errors collected and returned
- Results structured consistently

### 4. Extensibility
- Add new chapters by copying pattern
- No changes to engine needed
- Automatic registration in index.js
