# Room Distribution Analysis Report
**Date:** December 9, 2025  
**Analysis of:** Equipment_Guide_parsed_v2.txt and room-logic/ files

## Executive Summary

This analysis examined how rooms are distributed across departments and functional areas (FAs) in the VA Space Planning system. The data reveals **significant room duplication**, with many rooms appearing across multiple departments and FAs, indicating shared/reusable room types.

---

## Key Statistics

### Overall Room Distribution
- **Total unique room codes:** 1,518
- **Total data lines analyzed:** 35,141
- **Total unique departments:** 50+
- **Total unique functional areas:** 315+

### Duplication Patterns
- **Rooms in single location:** 661 (43.5%)
- **Rooms in multiple locations:** 857 (56.5%)

This means **more than half of all room types appear in multiple locations**, suggesting significant standardization across the VA facility design system.

### Distribution by Location Count
| Location Count | Number of Rooms | Percentage |
|----------------|-----------------|------------|
| 1 location | 661 | 43.5% |
| 2-5 locations | 503 | 33.1% |
| 6-10 locations | 194 | 12.8% |
| 11-20 locations | 104 | 6.9% |
| 21-30 locations | 35 | 2.3% |
| 31-50 locations | 13 | 0.9% |
| 51+ locations | 8 | 0.5% |

### Cross-Department Usage
- **Rooms in single department:** 848 (55.9%)
- **Rooms in multiple departments:** 670 (44.1%)

### Cross-FA Usage
- **Rooms in single FA:** 693 (45.7%)
- **Rooms in multiple FAs:** 825 (54.3%)

---

## Top 10 Most Duplicated Rooms

### 1. **SS204** - Appears in 109 locations
- **Room Type:** Toilet, Single, ADA
- **Departments:** 47 different departments
- **Functional Areas:** 73 different FAs
- **Analysis:** Universal bathroom fixture used throughout all facility types

### 2. **SS218** - Appears in 106 locations
- **Room Type:** Toilet, Staff, ADA
- **Departments:** 48 different departments
- **Functional Areas:** 71 different FAs
- **Analysis:** Standard staff restroom across all departments

### 3. **SB191** - Appears in 97 locations
- **Room Type:** Shower/Toilet, Single
- **Departments:** 45 different departments
- **Functional Areas:** 64 different FAs
- **Analysis:** Patient/resident bathing facility used in care units

### 4. **SB244** - Appears in 65 locations
- **Room Type:** Alcove, Nourishment
- **Departments:** 35 different departments
- **Functional Areas:** 52 different FAs
- **Analysis:** Standard pantry/nutrition support space

### 5. **SS262** - Appears in 58 locations
- **Room Type:** Locker Room, Staff
- **Departments:** 39 different departments
- **Functional Areas:** 38 different FAs
- **Analysis:** Staff changing/storage facility across clinical and administrative areas

### 6. **SB003** - Appears in 56 locations
- **Room Type:** Waiting Area
- **Departments:** 32 different departments
- **Functional Areas:** 33 different FAs
- **Analysis:** Standard reception/waiting space across clinical services

### 7. **SB201** - Appears in 50 locations
- **Room Type:** Day Space/Activity Room
- **Departments:** 23 different departments
- **Functional Areas:** 42 different FAs
- **Analysis:** Multi-purpose patient activity and therapy space

### 8. **SB743** - Appears in 49 locations
- **Room Type:** Workstation, Nurse/Clinical Staff
- **Departments:** 22 different departments
- **Functional Areas:** 38 different FAs
- **Analysis:** Standard clinical workstation across patient care areas

### 9. **SS101** - Appears in 49 locations
- **Room Type:** Office, Single, 120 NSF
- **Departments:** 30 different departments
- **Functional Areas:** 31 different FAs
- **Analysis:** Standard administrative office across all service lines

### 10. **SB737** - Appears in 48 locations
- **Room Type:** Alcove, Clean Supply
- **Departments:** 21 different departments
- **Functional Areas:** 37 different FAs
- **Analysis:** Clean supply storage across clinical areas

---

## Examples: Rooms Appearing in Multiple Departments/FAs

### Example 1: SC271 (Universal Consult Room)
**Appears in:** 31 locations across 22 departments

**Department Examples:**
- 100 (Medical/Surgical PCU)
- 102 (Intensive Care PCU)
- 210 (Cardiology Service)
- 256 (Emergency Department)
- 286 (Surgical Services)
- 295 (Imaging Services)

**FA Examples:**
- VISITOR AREA
- INTENSIVE CARE PATIENT UNIT RECEPTION AREA
- CARDIOLOGY PATIENT AREA
- RECEPTION / PUBLIC AREA
- AMBULATORY SURGERY CENTER RECEPTION AREA
- BREAST IMAGING AREA

**Analysis:** Demonstrates a standardized consult/exam room that works across inpatient, outpatient, and diagnostic areas.

### Example 2: SB003 (Waiting Area)
**Appears in:** 56 locations across 32 departments

**Cross-Department Usage:**
- Used in both clinical and administrative areas
- Spans inpatient (ICU, PCU), outpatient (Dental, Eye Clinic), diagnostic (Radiology, Lab), and support services
- Shows standardization of public waiting space design

### Example 3: SS262 (Staff Locker Room)
**Appears in:** 58 locations across 39 departments

**Notable FA Diversity:**
- Clinical Staff Areas (Medical/Surgical, ICU, SCI/D)
- Administrative Areas (Engineering, Police, Pharmacy)
- Support Areas (Sterile Processing, R&D, EMS)
- Multiple specialty areas (Dental, Ophthalmology, Surgical)

**Analysis:** Universal staff amenity required across all service types.

### Example 4: IMS21 (Single Universal Bedroom, MS PCU)
**Department:** 100 (Medical/Surgical Patient Care Unit)
**FA:** PATIENT AREA
**Locations:** 1 (unique to MS PCU patient area)

**Analysis:** Example of a highly specialized room that appears only in its specific context, unlike support/common rooms.

### Example 5: M7010 (Bed, Patient, Electric)
**Appears in:** Multiple patient care areas
- Medical/Surgical PCU
- Intensive Care PCU
- Airborne Infection Isolation rooms
- Various specialty care units

**Analysis:** Standard equipment appearing in room definitions, showing equipment standardization across patient care areas.

---

## Room Logic File Analysis

### Current Structure in room-logic/ files

**Example from chapter-100-medical-surgical.js:**
```javascript
functionalAreas: [
  {
    id: "FA2",
    name: "Medical / Surgical Inpatient Unit Reception Area",
    rooms: [
      {
        id: "SB003",
        code: "SB003",
        name: "MS PCU Waiting, Bldg Sprt",
        nsf: 330,
        rules: [...]
      },
      {
        id: "SC271",
        code: "SC271",
        name: "MS PCU Consult Room, Clncl Sprt",
        nsf: 120,
        rules: [...]
      }
    ]
  }
]
```

**Key Findings:**
1. ✅ **Room codes ARE reused across chapters** - The same room code (e.g., SB003, SC271) appears in multiple chapter files
2. ✅ **Each instance is independent** - Each chapter defines its own rules for when/how many of that room type to include
3. ✅ **Room attributes vary by context** - The same room code may have different NSF, quantities, or rules depending on the FA/department
4. ✅ **Logic already supports duplication** - The current architecture naturally allows rooms to appear in multiple FAs/departments

### Room Definition Patterns

**Pattern 1: Unique Specialized Rooms**
- Example: IMS21 (Single Universal Bedroom, MS PCU)
- Location: Single FA in single department
- Highly specialized to context

**Pattern 2: Department-Specific Standard Rooms**
- Example: Exam rooms, procedure rooms
- Appear across multiple FAs within a department
- Standardized within service line

**Pattern 3: Universal Support Rooms**
- Examples: SB003 (Waiting), SS204 (Toilet), SS262 (Locker Room)
- Appear across many departments and FAs
- True facility-wide standards

---

## FA Number Coverage Analysis

### FA Naming Patterns in Equipment_Guide_parsed_v2.txt

The data shows **descriptive FA names** rather than numeric codes:

**Examples:**
- "VISITOR AREA"
- "PATIENT AREA"
- "CLINICAL STAFF AREA"
- "INTENSIVE CARE PATIENT UNIT STAFF AND ADMINISTRATIVE AREA"
- "AMBULATORY SURGERY CENTER (ASC) RECEPTION AREA"
- "SCI/D CENTER ACUTE CARE (AC) STAFF AND ADMINISTRATIVE AREA"

### FA Structure Observations

**Hierarchical Naming:**
```
Department: 286 (SURGICAL / ENDOVASCULAR SERVICES)
  └─ FA: INPATIENT (IP) SURGICAL / ENDOVASCULAR STAFF AND ADMINISTRATIVE AREA
  └─ FA: AMBULATORY SURGERY CENTER (ASC) STAFF AND ADMINISTRATIVE AREA
  └─ FA: INPATIENT (IP) SURGICAL / ENDOVASCULAR RECEPTION AREA
  └─ FA: AMBULATORY SURGERY CENTER (ASC) RECEPTION AREA
```

**FA Categories Identified:**
1. **Patient/Resident Areas** - Direct care spaces
2. **Staff and Administrative Areas** - Clinical and non-clinical staff
3. **Reception/Public Areas** - Waiting and public-facing
4. **Support Areas** - Clean/soiled utility, storage, etc.
5. **Therapy/Treatment Areas** - Specialized clinical activities
6. **Education Areas** - Training and academic spaces

### Total FA Diversity
- **315+ unique FA designations** across all departments
- FAs are **descriptive, not numeric** in the source data
- Many departments have 5-15 distinct FAs
- Some departments (like Surgical Services, SCI/D) have 20+ FAs

---

## Implications for System Design

### 1. Room Reusability is Critical
- The system MUST support the same room appearing in multiple chapters/FAs
- Room definitions should be stored once and referenced, not duplicated
- Equipment lists, NSF values, and attributes should be consistent across uses

### 2. Context Matters
- The same room code may need different:
  - Quantities (based on workload formulas)
  - NSF allocations (based on department standards)
  - Equipment sets (based on functional requirements)
  - Rules for when it's included

### 3. FA Numbers Not in Source Data
- The Equipment Guide uses descriptive FA names, not FA numbers
- Any FA numbering system is a **downstream mapping**, not source data
- room-logic files currently use FA IDs like "FA1", "FA2" which are chapter-specific

### 4. Current Architecture is Sound
- The existing room-logic structure **already handles duplication correctly**
- Each chapter independently defines which rooms it needs
- Room codes serve as the linking mechanism across chapters

---

## Recommendations

### For Data Architecture
1. **Create a master room registry** with canonical definitions
2. **Allow context-specific overrides** in chapter files
3. **Maintain FA naming flexibility** - support both descriptive names and numeric codes
4. **Link Equipment Guide data** to room codes as the primary key

### For Logic Implementation
1. **Keep current chapter-based structure** - it's working well
2. **Consider room code validation** - ensure consistency across chapters
3. **Build FA mapping table** - connect descriptive names to any numbering systems
4. **Support room attribute inheritance** - default values with local overrides

### For Future Development
1. **Build room library UI** - browse all defined rooms and their uses
2. **Create duplication reports** - track where rooms are used
3. **Validate equipment consistency** - same room = same equipment across chapters
4. **Support NSF variance tracking** - understand when/why same room has different sizes

---

## Detailed Statistics Tables

### Rooms by Duplication Level

| Duplication Level | Count | % of Total | Example Rooms |
|-------------------|-------|------------|---------------|
| Unique (1) | 661 | 43.5% | IMS21, IPT85, CCD56 |
| 2-3 locations | 303 | 20.0% | Various specialty rooms |
| 4-5 locations | 200 | 13.2% | Department-specific support |
| 6-10 locations | 194 | 12.8% | Common clinical support |
| 11-20 locations | 104 | 6.9% | Multi-department standards |
| 21-30 locations | 35 | 2.3% | Facility-wide support |
| 31-50 locations | 13 | 0.9% | Universal amenities |
| 51+ locations | 8 | 0.5% | Toilets, staff facilities |

### Department Coverage Distribution

| Dept Count | Number of Rooms | Interpretation |
|------------|-----------------|----------------|
| 1 dept | 848 | Department-specific rooms |
| 2-5 depts | 449 | Related service areas |
| 6-10 depts | 126 | Cross-functional standards |
| 11-20 depts | 64 | Common clinical support |
| 21-30 depts | 19 | Facility-wide standards |
| 31+ depts | 12 | Universal amenities |

---

## Conclusion

The VA Space Planning system exhibits a **well-structured hierarchy of room standardization**:

1. **43.5% of rooms are unique** to specific contexts (specialized clinical spaces)
2. **56.5% of rooms are reused** across multiple locations (standardized support/amenity spaces)
3. **The most duplicated rooms are universal facilities** (toilets, waiting areas, staff amenities)
4. **The current room-logic architecture naturally supports this pattern** through independent chapter definitions
5. **FA organization is descriptive and hierarchical**, not rigidly numeric

This pattern reflects sound facility planning principles: specialize where necessary, standardize where possible. The system appropriately balances clinical specificity with operational efficiency.

---

## Appendix: Data Files

### Generated Analysis Files
- **room-distribution-analysis.csv** - Complete room-by-room breakdown with all department/FA associations
- **analyze-room-distribution.ps1** - PowerShell script used for analysis (reusable)

### Source Data
- **Equipment_Guide_parsed_v2.txt** - 35,141 lines of equipment/room data
- **room-logic/*.js** - 40+ chapter definition files

### Analysis Methodology
1. Parsed Equipment_Guide_parsed_v2.txt to extract room codes from room names
2. Tracked all department/FA combinations for each room code
3. Calculated duplication statistics and patterns
4. Examined room-logic files to understand implementation approach
5. Cross-referenced data structure with actual usage patterns
