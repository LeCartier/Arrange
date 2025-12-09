# Data Architecture & Source Hierarchy

This document explains how the various VA data sources are integrated and which sources are considered authoritative.

## Data Source Hierarchy (Newest → Oldest)

### 1. **CANONICAL/CURRENT SOURCES** 
These are the most maintained and authoritative:

#### `room_criteria.tsv`
- **Status**: Primary canonical source
- **Code System**: VARF Room Codes (current standard)
- **Content**: Comprehensive room specifications including:
  - Room ID (VARF code), name, NSF (net square footage)
  - Materials: ceiling, wall, floor, door
  - Finishes and hardware specifications
  - Environmental: HVAC, lighting, electrical, plumbing
  - Medical gases and special requirements
- **Generated**: 1,764 rooms with 76 attributes each
- **Paired with**: Equipment_Guide_parsed_v2.txt

#### `Equipment_Guide_parsed_v2.txt`
- **Status**: Current equipment specification source
- **Code System**: VARF Room Codes (extracted from room names)
- **Content**: Equipment specifications per room including:
  - Department and Functional Area assignments
  - JSN (equipment catalog numbers)
  - Quantities and acquisition/installation requirements
  - Detailed descriptions
- **Format**: Tab-separated with room format "Order - VARF_CODE - Name"
- **Integration**: Room codes match canonical VARF codes in room_criteria.tsv

---

### 2. **TRANSLATION LAYER**

#### `LegacyRC-Crosswalk.txt`
- **Status**: Authoritative mapping between old and new coding systems
- **Created**: Between legacy and current system updates
- **Purpose**: Enable integration of historical data sources
- **Format**: Tab-separated mapping
  - Column 1: # (sequence)
  - Column 2: VARF RC (current code)
  - Column 3: LEGACY RC (old code)
  - Column 4: Master Room Name
  - Column 5: NSF
- **Coverage**: 1,549 bidirectional mappings
- **Usage**: Translates legacy codes → VARF codes during build process

---

### 3. **LEGACY BUT RELEVANT SOURCES**

#### `room_finishes.tsv`
- **Status**: Legacy finish specifications (still valuable)
- **Code System**: Mix of Legacy RC codes and some VARF codes
- **Source**: Parsed from "Door and Finish Criteria.txt" (VA historical document)
- **Content**: Detailed finish specifications including:
  - Chapter and Functional Area information
  - FA Number and FA Name
  - Floor, Base, Wall, Wainscot, Ceiling finishes
  - Door and Hardware specifications
- **Generated**: 3,304 rows covering 550 unique room codes
- **Integration**: Legacy codes translated via crosswalk to merge with canonical data

#### `Door and Finish Criteria.txt`
- **Status**: Original unstructured source document
- **Format**: Text document with inconsistent formatting
- **Purpose**: Source for room_finishes.tsv (parsing input)
- **Code System**: Legacy RC codes

---

## Build Process

The `generate-room-data.ps1` script orchestrates data integration:

### Step 1: Load Translation Layer
```powershell
# Load crosswalk creating bidirectional mappings
$legacyToVarf = @{}  # Legacy → VARF
$varfToLegacy = @{}  # VARF → Legacy
```

### Step 2: Load & Translate Legacy Finishes
```powershell
# For each finish record with legacy code:
if ($legacyToVarf.ContainsKey($code)) {
    $varfCode = $legacyToVarf[$code]
    # Store finish data under VARF code
    # Track translation metadata
}
```

### Step 3: Merge with Canonical Data
```powershell
# For each room in room_criteria.tsv:
#   - Use VARF code as primary key
#   - Merge finish attributes if available
#   - Add provenance metadata:
#     - finishDataSource: "current" | "legacy-translated"
#     - legacyRoomCode: original code if translated
```

### Output: `room-sizes.js`
- **Format**: JavaScript constant array
- **Code System**: All VARF codes (canonical)
- **Content**: Merged attributes from all sources
- **Metadata**: Tracks data provenance
- **Coverage**: 1,764 rooms with finish data for 339 (19%)

---

## Data Provenance Metadata

Each room in the generated output includes metadata to track where finish data originated:

### For Directly Matched Rooms
```javascript
finishDataSource: "current"
// No legacyRoomCode field
```

### For Translated Rooms
```javascript
finishDataSource: "legacy-translated",
legacyRoomCode: "OFA07"  // Original legacy code before translation
```

---

## Coverage Statistics

| Metric | Value | Percentage |
|--------|-------|------------|
| Total rooms (VARF) | 1,764 | 100% |
| Rooms with finish data (direct) | 111 | 6.3% |
| Rooms with finish data (translated) | 228 | 12.9% |
| **Total rooms with finishes** | **339** | **19.2%** |
| Legacy codes in finishes | 550 | - |
| Crosswalk mappings | 1,549 | - |

---

## Code System Relationship

```
VA Historical Documents (Pre-2010s)
        ↓ uses
    Legacy RC Codes (e.g., OFA07, WRC01, CALC1)
        ↓ mapped by
    LegacyRC-Crosswalk.txt
        ↓ translates to
    VARF RC Codes (e.g., SS218, SB003, SC148)
        ↓ used in
    Current VA TIL/MS Standards
```

---

## Application Alignment

The Arrange application is aligned with this hierarchy as follows:

### Primary Data (`room-sizes.js`)
- Uses VARF codes exclusively as room identifiers
- All user-facing room codes are canonical VARF codes
- Legacy codes preserved only in metadata for debugging/reference

### Equipment Integration (`load-equipment.js`)
- Extracts VARF codes from Equipment_Guide_parsed_v2.txt
- Direct matching with canonical room codes
- No translation needed (already uses current codes)

### Logic/Calculations (`room-logic/`)
- Chapter-based organization matching current VA structure
- Room calculations reference VARF codes
- Functional Area numbers from finish data (when available)

---

## File Cleanup Recommendations

### Keep (Essential)
- ✅ `room_criteria.tsv` - Canonical source
- ✅ `Equipment_Guide_parsed_v2.txt` - Current equipment specs
- ✅ `LegacyRC-Crosswalk.txt` - Translation layer
- ✅ `room_finishes.tsv` - Intermediate parsed data
- ✅ `Door and Finish Criteria.txt` - Original source document
- ✅ `generate-room-data.ps1` - Build script
- ✅ `parse_finishes.py` - Parser utility
- ✅ `spcIndex-2025-08.txt` - Reference data

### Optional (Archive or Remove)
- ⚠️ `Equipment_Guide_parsed_v2_backup.txt` - Backup (safe to remove)
- ⚠️ `LegacyRC-Crosswalk.xlsx` - Excel source (keep if original)
- ⚠️ `vatilms_room_criteria-*.xlsx` - Excel source (keep if original)

---

## Maintenance Guidelines

### When VA Updates Space Criteria
1. Update `room_criteria.tsv` with new data
2. Update `Equipment_Guide_parsed_v2.txt` if equipment changes
3. Run `generate-room-data.ps1` to rebuild
4. No changes needed to crosswalk (unless VA changes code system)

### When New Legacy Documents Are Found
1. Parse into TSV format matching `room_finishes.tsv` structure
2. Verify codes exist in crosswalk
3. Add new crosswalk mappings if needed
4. Regenerate with updated finishes

### When Code Systems Change
1. Create new crosswalk file for new translation
2. Update `generate-room-data.ps1` to use new crosswalk
3. Update this documentation

---

## Questions & Answers

**Q: Why not convert everything to legacy codes?**  
A: VARF codes are the current VA standard. All new VA facilities and updates use VARF codes. Using them as canonical ensures compatibility with future VA updates.

**Q: Why keep legacy data at all?**  
A: The legacy finish specifications contain valuable detail not yet fully captured in current documentation. The crosswalk allows us to benefit from both old and new data sources.

**Q: What if a room has both legacy and current finish data?**  
A: Current (direct VARF) data takes precedence. The build process only merges legacy finishes for rooms that don't already have current data.

**Q: Can I trust the translated legacy data?**  
A: The crosswalk is the official VA mapping. Rooms with `finishDataSource: "legacy-translated"` have been properly mapped. However, always verify critical specifications against current VA standards.

---

**Last Updated**: December 9, 2025  
**Maintained By**: Project Team  
**Related Files**: `IMPLEMENTATION-SUMMARY.md`, `ARCHITECTURE.md`
