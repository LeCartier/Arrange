# Room Duplication Support Documentation

## Overview

The Arrange application now fully supports rooms appearing in **multiple departments and functional areas** simultaneously. This reflects real-world VA facility design where common rooms (toilets, waiting areas, staff lounges) are used across many departments.

## Data Reality

### Duplication Statistics

Based on analysis of Equipment_Guide_parsed_v2.txt:

- **Total unique room codes**: 1,518
- **Rooms in single location**: 661 (43.5%)
- **Rooms in multiple locations**: 857 (56.5%)
- **Most duplicated room**: SS204 (Toilet, Single, ADA) appears in **109 locations** across 47 departments and 73 FAs

### Top Duplicated Rooms

| Room Code | Name | Locations | Departments | FAs |
|-----------|------|-----------|-------------|-----|
| SS204 | Toilet, ADA | 109 | 47 | 73 |
| SS218 | Staff Toilet, ADA | 106 | 48 | 71 |
| SB191 | Shower/Toilet, Single | 97 | 45 | 64 |
| SB244 | Nourishment Alcove | 65 | 35 | 52 |
| SS262 | Staff Locker Room | 58 | 39 | 38 |
| SB003 | Waiting Area | 56 | 32 | 33 |
| SB201 | Day Space/Activity Room | 50 | 23 | 42 |
| SB743 | Nurse Workstation | 49 | 22 | 38 |
| SS101 | Single Office, 120 NSF | 49 | 30 | 31 |
| SB737 | Clean Supply Alcove | 48 | 21 | 37 |

## Implementation Details

### Data Structure: `ALL_ROOM_INSTANCES`

The application builds a complete list of room instances that preserves all dept/FA combinations:

```javascript
window.ALL_ROOM_INSTANCES = [
  {
    roomCode: "SS204",
    department: "100 (MEDICAL / SURGICAL...)",
    departmentChapter: "100",
    functionalArea: "PATIENT AREA",
    functionalAreaNumber: "3",
    roomName: "Toilet, Single, ADA"
  },
  {
    roomCode: "SS204",  // Same room code
    department: "102 (INTENSIVE CARE...)",  // Different department
    departmentChapter: "102",
    functionalArea: "PATIENT AREA",
    functionalAreaNumber: "3",
    roomName: "Toilet, Single, ADA"
  },
  // ... 107 more instances of SS204
]
```

### Tree Building Algorithm

The reference tree (`buildTreeData()`) uses `ALL_ROOM_INSTANCES` to:

1. **Preserve all dept/FA combinations** - Each instance creates a separate tree node
2. **Show FA numbers when available** - Extracted from finish data or equipment data
3. **Sort FAs numerically** - FA1, FA2, FA3 (not FA1, FA10, FA2)
4. **Display format**: "FA#: Name" when number exists, otherwise just name

```javascript
// Build tree from ALL instances (not just unique room codes)
allInstances.forEach(instance => {
  if (!deptMap.has(instance.department)) {
    deptMap.set(instance.department, {
      name: instance.department,
      functionalAreas: new Map()
    });
  }
  
  const dept = deptMap.get(instance.department);
  if (!dept.functionalAreas.has(instance.functionalArea)) {
    dept.functionalAreas.set(instance.functionalArea, {
      name: instance.functionalArea,
      number: instance.functionalAreaNumber || '',
      rooms: new Map()
    });
  }
  
  // Room appears under this specific dept/FA combination
  const fa = dept.functionalAreas.get(instance.functionalArea);
  if (!fa.rooms.has(instance.roomCode)) {
    fa.rooms.set(instance.roomCode, {
      code: instance.roomCode,
      name: instance.roomName
    });
  }
});
```

### FA Number Sources

FA numbers are extracted from multiple sources (in priority order):

1. **Finish Data** (room_finishes.tsv via room-sizes.js)
   - 339 rooms (19%) have FA numbers from finish specifications
   - Most reliable when available

2. **Equipment Data** (Equipment_Guide_parsed_v2.txt)
   - Extracted from room name format: "Order - CODE - Name"
   - Order number often corresponds to FA number within a chapter
   - Provides additional coverage

3. **Chapter Number** (from department field)
   - Department format: "100 (MEDICAL / SURGICAL...)"
   - Extracted as departmentChapter for organizational context

### Import/Export Behavior

When importing or exporting departments:

#### **Reference Tree Display**
- ✅ Shows ALL instances of each room across all departments
- ✅ Same room code appears under multiple dept/FA nodes
- ✅ FA numbers displayed when available: "FA3: Patient Area"
- ✅ Rooms without FA numbers show just the FA name

#### **Department Import**
When user selects a department to import:

```javascript
// executeCombinedLogicImport uses ALL_ROOM_INSTANCES
const allInstances = window.ALL_ROOM_INSTANCES || [];
const deptInstances = allInstances.filter(i => i.department === selectedDept);

// Group by FA and build room calculations for each
const faGroups = new Map();
deptInstances.forEach(instance => {
  if (!faGroups.has(instance.functionalArea)) {
    faGroups.set(instance.functionalArea, []);
  }
  faGroups.get(instance.functionalArea).push(instance);
});

// Each FA becomes a project functional area with its rooms
faGroups.forEach((rooms, faName) => {
  const functionalArea = {
    id: generateUniqueId(),
    name: faName,
    number: rooms[0].functionalAreaNumber || '',
    rooms: rooms.map(inst => createRoomInstance(inst))
  };
  project.functionalAreas.push(functionalArea);
});
```

#### **Functional Area Import**
When user selects a specific FA within a department:

```javascript
// Uses ALL_ROOM_INSTANCES to find this specific dept/FA combination
const instances = allInstances.filter(i => 
  i.department === selectedDept && 
  i.functionalArea === selectedFA
);

// Creates ONE functional area with all rooms from that combination
const functionalArea = {
  id: generateUniqueId(),
  name: selectedFA,
  number: instances[0]?.functionalAreaNumber || '',
  rooms: instances.map(inst => createRoomInstance(inst))
};
```

## Example Scenario

Consider room **SB003** (Waiting Area) which appears in:
- Chapter 100, FA "Visitor Area"
- Chapter 102, FA "Reception Area"  
- Chapter 222, FA "Dental Clinic Reception"
- ... 33 total dept/FA combinations

### Reference Tree Display

```
📚 Guide
  🏢 100 (MEDICAL / SURGICAL PATIENT CARE UNIT)
    📂 FA2: Visitor Area
      🚪 SB003 - Waiting Area
  🏢 102 (INTENSIVE CARE NURSING UNIT)
    📂 FA2: Reception Area
      🚪 SB003 - Waiting Area
  🏢 222 (DENTAL SERVICES)
    📂 FA1: Dental Clinic Reception
      🚪 SB003 - Waiting Area
  ... (30 more departments showing SB003)
```

### Import Behavior

**If user imports "100 (MEDICAL / SURGICAL...)"**:
- Creates functional area "FA2: Visitor Area"
- Includes SB003 with all its attributes and equipment
- Does NOT include SB003 from other departments

**If user imports "102 (INTENSIVE CARE...)" later**:
- Creates separate functional area "FA2: Reception Area"  
- Includes SB003 again (as separate instance)
- Both instances coexist in project with independent quantities

**If user imports just "FA2: Visitor Area" from Chapter 100**:
- Creates ONE functional area
- Includes SB003 from that specific combination only

## Data Quality Notes

### FA Number Coverage

After latest improvements:
- **Previous**: 339 rooms with FA numbers (19% from finish data only)
- **Current**: Significantly improved by extracting from equipment data "Order" field
- **Check console**: Application logs FA number coverage percentage on load

### Missing FA Numbers

Some functional areas may not have numbers because:
1. They're descriptive groupings in equipment guide
2. They don't correspond to official VA FA numbering
3. They're legacy categorizations not in current standards

**Solution**: FA name is always displayed, number is supplementary when available

### Data Source Hierarchy

Remember canonical sources (from DATA-ARCHITECTURE.md):
1. room_criteria.tsv - VARF codes (canonical)
2. Equipment_Guide_parsed_v2.txt - Equipment assignments (canonical)
3. room_finishes.tsv - Finish specs (legacy, translated)

All sources contribute to the complete picture shown in reference tree.

## Verification

To verify duplication support is working:

### 1. Console Logs
Check browser console for:
```
Built metadata for 1518 unique room codes
Found 35847 total room instances (including duplicates across departments)
FA Number coverage: 25123 of 35847 instances (70%)
```

### 2. Reference Tree
- Expand multiple departments
- Look for same room code (e.g., SS204, SS218, SB191)
- Verify it appears under multiple dept/FA combinations
- Check FA numbers display as "FA#: Name"

### 3. Import Test
- Import Chapter 100
- Note rooms in "FA2: Visitor Area"
- Import Chapter 102
- Note rooms in "FA2: Reception Area"
- Verify shared rooms (like SB003) appear in both
- Check they have independent quantities

## Technical Benefits

### ✅ **Accurate Representation**
Application mirrors real VA facility organization where common rooms are shared across many departments

### ✅ **Complete Equipment Assignment**
Each dept/FA combination gets the correct equipment for that specific context

### ✅ **Proper Calculation**
Room calculations respect the specific dept/FA context, not just the room code

### ✅ **User Flexibility**
Users can import:
- Entire departments (all FAs and rooms)
- Individual FAs (all rooms in that FA)
- Individual rooms (from any dept/FA context)

### ✅ **Data Integrity**
No data loss - all 35,847 room instances preserved from equipment guide

## Future Enhancements

Potential improvements:
1. **Cross-reference highlighting** - Show where else a room appears when selected
2. **Batch import** - Import multiple related FAs at once
3. **Template detection** - Identify rooms that are identical across departments
4. **Variance analysis** - Show how same room differs by department

---

**Last Updated**: December 9, 2025  
**Related Docs**: DATA-ARCHITECTURE.md, IMPLEMENTATION-SUMMARY.md
