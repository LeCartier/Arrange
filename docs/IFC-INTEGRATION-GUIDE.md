# IFC Integration Guide

## Overview

The Hospital Programming Workbench now includes an **IFC Model Checker** that validates Revit models against VA Space Planning Criteria. This enables architects and planners to verify that their BIM models conform to:

- **Room sizes** (PG 18-9 Space Planning Criteria)
- **Equipment requirements** (VA Equipment Guide)
- **Finish specifications** (PG 18-14 Room Finishes Schedule)

## Accessing the IFC Checker

### From the Main Application

1. Open the Hospital Programming Workbench (`index.html`)
2. Click the **🏗️ IFC Checker** button in the header (purple icon)
3. The IFC Checker modal opens

### Standalone Mode

Open `ifc-checker.html` directly for a dedicated IFC checking interface.

## Workflow

### Step 1: Export IFC from Revit

1. In Revit, go to **File → Export → IFC**
2. Configure export settings:
   - **IFC Version**: IFC4 or IFC2x3
   - **Include Spaces**: ✓ Enabled
   - **Space Boundaries**: 2nd Level
   - **Property Sets**: ✓ Export property sets
3. Click **Export**

### Step 2: Upload to IFC Checker

1. Open the IFC Checker
2. Drag and drop your `.ifc` file onto the upload zone
3. Wait for the file to parse (may take a moment for large models)
4. Review the model summary (spaces, equipment count)

### Step 3: Load Validation Criteria

Navigate to the **"Load Criteria"** tab:

#### Room Criteria
- Click **"Load from Workbench"** to use your current project program
- This loads room sizes and quantities from your workbench results

#### Equipment Criteria
- Click **"Load Equipment Database"** to load the VA Equipment Guide
- This enables JSN code validation

#### Finish Criteria
- Click **"Load Finish Specifications"** to load PG 18-14 requirements
- This enables floor, wall, and ceiling finish validation

### Step 4: Run Validation

1. Navigate to the **"Validate"** tab
2. Configure options:
   - ✓ Validate Room Sizes
   - ✓ Validate Equipment
   - ✓ Validate Finishes
   - Area Tolerance: 10% (adjustable)
3. Click **"🔍 Run Validation"**
4. Review the quick stats

### Step 5: Review Report

Navigate to the **"Report"** tab to see:

- **Summary**: Overall status and issue counts
- **Space Validation**: Room-by-room results
- **Equipment Validation**: Missing/extra equipment
- **Finish Validation**: Non-conforming finishes
- **Issue List**: All issues sorted by severity

### Step 6: Export Results

- **Export JSON**: Full structured report for further processing
- **Export CSV**: Issue list for spreadsheet analysis
- **Print Report**: Formatted HTML for documentation

## Revit Best Practices

### Room Parameter Setup

Add these parameters to your Revit rooms for best validation:

| Parameter Name | Type | Description |
|---------------|------|-------------|
| `VA_RoomCode` | Text | VARF/Legacy room code (e.g., "BRMS1", "EXRG1") |
| `VA_Department` | Text | Department assignment |
| `Floor_Finish` | Text | Floor finish code (e.g., "RSF", "CT") |
| `Wall_Finish` | Text | Wall finish code (e.g., "GWB-P", "VWC") |
| `Ceiling_Finish` | Text | Ceiling finish code (e.g., "AT", "GWB") |
| `Base_Finish` | Text | Base finish code (e.g., "RB", "CT") |

### Equipment Parameter Setup

Add these parameters to equipment families:

| Parameter Name | Type | Description |
|---------------|------|-------------|
| `VA_JSN` | Text | Equipment JSN code (e.g., "M7010", "A5077") |
| `Equipment_Name` | Text | Full equipment name |

### IFC Export Settings

Recommended Revit IFC export configuration:

```
Export Settings:
├── IFC Version: IFC4 Design Transfer View
├── Space boundaries: 2nd level
├── Include:
│   ├── IfcSpace (Rooms)
│   ├── IfcFurnishingElement (Furniture)
│   └── IfcBuildingElementProxy (Equipment)
└── Property Sets:
    ├── Export Revit property sets
    └── Export IFC common property sets
```

## Validation Categories

### Space Validation

| Issue Type | Severity | Description |
|-----------|----------|-------------|
| Missing Room Code | Warning | Space has no VA room code assigned |
| Undersized Room | Error | Room is >5% smaller than required |
| Oversized Room | Warning | Room is >10% larger than required |
| Unknown Room Code | Info | Room code not in VA criteria |
| Missing Room | Error | Expected room not found in model |

### Equipment Validation

| Issue Type | Severity | Description |
|-----------|----------|-------------|
| Missing Equipment | Error | Required equipment not in room |
| Unknown JSN | Warning | JSN code not recognized |
| Extra Equipment | Info | Equipment not in standard list |

### Finish Validation

| Issue Type | Severity | Description |
|-----------|----------|-------------|
| Floor Mismatch | Error | Floor finish doesn't match spec |
| Wall Mismatch | Error | Wall finish doesn't match spec |
| Ceiling Mismatch | Error | Ceiling finish doesn't match spec |
| Missing Finish | Warning | Finish not specified in model |

## Finish Code Reference

Common VA finish codes from PG 18-14:

### Floor Finishes
| Code | Description |
|------|-------------|
| RSF | Resilient Sheet Flooring (Chemically Welded) |
| LVT | Luxury Vinyl Tile |
| CT | Ceramic Tile |
| PT | Porcelain Tile |
| CPT | Carpet Tile |
| RES-3 | Resinous Medium Duty Chemical Resistant |
| RES-6A | Resinous Heavy Duty Climatic |

### Wall Finishes
| Code | Description |
|------|-------------|
| GWB-P | Gypsum Wallboard with Paint |
| VWC | Vinyl Wall Covering |
| RWC | Rigid Vinyl Wall Covering |
| CT | Ceramic Tile |
| RES-W | Resinous/Epoxy Wall |

### Ceiling Finishes
| Code | Description |
|------|-------------|
| AT | Acoustical Ceiling Tile |
| GWB | Gypsum Wallboard Ceiling |
| GWB-SC | GWB with Special Coating |

### Base Finishes
| Code | Description |
|------|-------------|
| RB | Resilient Base (Rubber/Vinyl) |
| CT | Ceramic Tile Base |
| PT | Porcelain Tile Base |

## Troubleshooting

### "Module not loading" error
The IFC Checker requires a web server. Start one with:
```bash
npx serve
# or
python -m http.server 8080
```

### Rooms not being matched
1. Verify room codes match VA format (2-5 letters + 1-2 digits)
2. Check that rooms are exported as IfcSpace elements
3. Ensure the `VA_RoomCode` parameter is filled in Revit

### Equipment not being validated
1. Verify JSN codes are in correct format (letter + 4 digits)
2. Ensure equipment is placed within room boundaries
3. Check that equipment exports as IfcFurnishingElement

### Large file performance
For models over 100MB:
1. Consider splitting by building/wing
2. Use area-based exports
3. Ensure adequate system memory

## Integration with BIM Workflows

### Clash Detection Follow-up
After validating with the IFC Checker:
1. Export the issue list as CSV
2. Import into Navisworks or BIM 360
3. Create clashes/issues for each validation error
4. Assign to responsible parties

### Model Coordination
Use the validation report in coordination meetings:
1. Review undersized rooms with architects
2. Verify missing equipment with equipment planners
3. Confirm finish specifications with interior designers

### QA/QC Process
Integrate into your QA workflow:
1. Run validation at design milestones (DD, CD)
2. Track issue resolution over time
3. Export final validation report for project records

## API Reference

For programmatic use, see the [IFC Checker README](../ifc-checker/README.md).

```javascript
import { initIFCChecker } from './ifc-checker/index.js';

const checker = await initIFCChecker({
  roomCriteria: myRoomData,
  equipmentCriteria: EQUIPMENT_LIST,
  finishCriteria: FINISH_CRITERIA
});

const report = await checker.validateFile(ifcFile);
console.log(report.overallSummary);
```
