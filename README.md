# Hospital Programming Workbench

A comprehensive web-based tool for hospital space programming and equipment planning based on VA TIL/MS Space Criteria.

## Overview

The Hospital Programming Workbench helps you build and manage hospital programming projects by organizing spaces into departments, functional areas, and rooms with detailed equipment specifications and square footage calculations.

## Getting Started

### Opening the Application

1. Open `index.html` in a modern web browser (Chrome, Firefox, Edge, or Safari)
2. The application runs entirely in your browser - no server required
3. All data is saved locally in your browser's localStorage

### First Steps

1. **Create a New Project**
   - Click the **+ New Project** button
   - Enter a project name
   - Your project appears in the project list

2. **Open a Project**
   - Click on a project in the list to view its details
   - Click **📂 Open Project** to start working

## Application Layout

### Header Area
- **Title & Description**: Application branding and overview
- **⚙️ Logic Portal**: Persistent icon button (top-right) - Access admin portal for room formulas
- **🔄 Sync Data**: Persistent icon button (top-right) - Synchronize reference data from GitHub

### Navigation Area
- **← Projects**: Return to project list (appears in project mode, left of navigator title)
- **Mode Toggle**: Switch between Program Mode and Reference Mode
- **+ Add to Project**: Import rooms from reference library (program mode only)

### Main Layout
- **Left Panel**: Tree navigator showing project/reference hierarchy
- **Right Panel**: Detail view with room information, attributes, and equipment

## Application Modes

### Program Mode

Build your hospital program by importing and customizing rooms from the reference library.

**Key Features:**
- Import entire departments, functional areas, or individual rooms
- Edit room square footage (NSF)
- Duplicate rooms for multiple instances
- Add, remove, or modify equipment
- View real-time NSF rollups at room, functional area, department, and project levels

**Workflow:**
1. Click **+ Add to Project** button
2. Browse the import tree (departments → functional areas → rooms)
3. Select items using checkboxes
4. Click **Import Selected**
5. Items appear in your project tree on the left

### Reference Mode

Browse the complete VA equipment guide database without affecting your project.

**Key Features:**
- View all 1,764+ rooms organized by department and functional area
- Browse equipment specifications for each room
- Review all 76 room attributes (materials, HVAC, utilities, etc.) in organized two-column layout
- Read-only view prevents accidental changes to reference data
- Search and explore the reference data

**To Switch Modes:**
- Use the **📚 Reference Mode** / **📝 Program Mode** toggle button below the header

## Working with Your Project

### Project Structure

```
Project
└── Departments
    └── Functional Areas
        └── Rooms
            └── Equipment Items
```

### Managing Rooms

#### At the Room Level
When you select a room in the tree:
- **Edit NSF**: Change the square footage directly
- **Edit Room Attributes**: Modify all 76 room attributes (materials, HVAC, utilities, etc.) in a two-column layout
- **Edit Equipment Quantities**: Adjust equipment quantities using inline number inputs
- **📋 Duplicate Room**: Create a copy with all equipment and attributes (attributes include updated Room Name)
- **🔄 Reset to Default**: Restore room to original attributes and equipment from base template
- **➕ Add Equipment**: Add new equipment items (enter JSN code)
- **🗑️ Delete Equipment**: Remove individual equipment items

#### At the Functional Area Level
When you select a functional area:
- View all rooms in that area
- Edit NSF for any room inline
- Duplicate or delete rooms with one click
- See equipment counts per room

#### At the Department Level
When you select a department:
- View all rooms across all functional areas
- Quick access to edit, duplicate, or delete any room
- See which functional area each room belongs to
- Monitor total NSF and equipment counts

#### At the Project Level
When you select the project:
- View all rooms in the entire project
- See full hierarchy: Department → Functional Area → Room
- Manage any room from a single view
- Monitor project-wide statistics

### NSF Calculations

The application automatically calculates and displays Net Square Footage (NSF) at every level:

- **Room NSF**: Individual room square footage (editable)
- **Functional Area NSF**: Sum of all rooms in the area
- **Department NSF**: Sum of all functional areas
- **Project NSF**: Grand total of all departments

All calculations update in real-time as you edit room sizes.

## Logic Portal (Admin)

A password-protected portal for managing master room calculation formulas.

### Accessing the Logic Portal

1. Click the **⚙️ Logic Portal** button (purple, top of page)
2. Enter password: **CARTER**
3. Portal opens with all 1,764 rooms

### Managing Room Logic

For each room, you can define:

- **Min Quantity**: Minimum number of rooms required
- **Max Quantity**: Maximum number of rooms allowed
- **Quantity Formula**: JavaScript expression (e.g., `Math.ceil(numBeds / 20)`)
- **NSF Formula**: Square footage calculation (e.g., `100 + (staffFTE * 5)`)
- **Variables**: JSON array of project variables used
- **Notes**: Reference to PDF sections or calculation notes

### Available Project Variables

```javascript
numBeds, staffFTE, annualVisits, annualAdmissions, 
annualDischarges, avgLengthOfStay, operatingRooms, 
examRooms, treatmentRooms, clinicStations
```

### Saving Your Work

- **💾 Save All**: Saves to browser localStorage
- **📥 Export Logic**: Downloads JSON file backup
- **🔍 Search**: Filter rooms by code or name

### Logic Status Indicators

- 🟢 **Complete**: All required fields filled
- 🟡 **Partial**: Some fields filled
- ⚪ **Empty**: No logic defined

## Data Management

### Local Storage

- Projects are saved automatically to browser localStorage
- Room logic is stored separately as `roomLogicData`
- Data persists between browser sessions
- **Important**: Clearing browser data will delete all projects

### GitHub Data Synchronization

The application includes a client-side data synchronization system that fetches updated reference data directly from the GitHub repository.

#### Architecture

The sync system operates entirely in the browser without requiring a server:

1. **Source Files** live in the `src/` folder of the repository
2. **GitHub Raw URLs** provide direct access to file contents via HTTPS
3. **Client-side parsers** process TSV and text files into JavaScript objects
4. **In-memory updates** replace the working data arrays without page refresh

#### Synchronization Flow

When a sync is initiated:

1. **Backup Phase**: Current data is serialized to localStorage with a timestamp (optional)
2. **Fetch Phase**: Files are downloaded from GitHub using the raw content API:
   - `https://raw.githubusercontent.com/{repo}/{branch}/src/room_criteria.tsv`
   - `https://raw.githubusercontent.com/{repo}/{branch}/src/Equipment_Guide_parsed_v2.txt`
3. **Parse Phase**: Built-in parsers convert raw text into structured data
4. **Update Phase**: Global data arrays are replaced with newly parsed objects
5. **Refresh Phase**: UI re-renders to reflect updated reference library

#### Data Parsing

**TSV Parser (room_criteria.tsv):**
- Reads tab-separated values with headers in the first row
- Automatically detects and converts numeric values
- Creates room objects with properties matching column headers
- Handles empty cells as null values
- Outputs array of room specification objects

**Equipment Parser (Equipment_Guide_parsed_v2.txt):**
- Uses section markers (`EQUIPMENT:` and `MAPPINGS:`) to separate content
- Parses pipe-delimited (`|`) data within each section
- EQUIPMENT section: JSN code, name, description
- MAPPINGS section: room code, department, functional area, equipment JSN, quantity
- Outputs two arrays: equipment catalog and room-equipment relationships

#### File Format Specifications

**room_criteria.tsv Structure:**
```
roomCode	name	department	functionalArea	nsf	ceilingFinish	wallFinish
RM001	Exam Room	Clinic	Outpatient	120	ACT	VWC
```
- Tab characters (`\t`) separate columns
- First row defines property names
- Each subsequent row represents one room
- Numeric columns auto-convert to numbers

**Equipment_Guide_parsed_v2.txt Structure:**
```
EQUIPMENT:
JSN001|Equipment Name|Description text
JSN002|Another Item|More description

MAPPINGS:
RM001|Clinic|Outpatient|JSN001|2
RM001|Clinic|Outpatient|JSN002|1
```
- Sections divided by keyword markers
- Pipe characters (`|`) separate fields
- EQUIPMENT: 3 fields (JSN, name, description)
- MAPPINGS: 5 fields (room code, department, FA, JSN, quantity)

#### Data Isolation

The sync system maintains clear separation between reference data and user data:

- **Updated by Sync**: `ROOM_SIZES`, `EQUIPMENT_LIST`, `ROOM_EQUIPMENT_MAPPINGS` (reference library)
- **Never Modified**: User projects, room logic formulas, project settings
- **Backup Scope**: Only includes reference data, not user projects
- **Restore Process**: Manual restoration from localStorage backup entries

#### Implementation Details

- **No Authentication Required**: Uses public GitHub raw URLs
- **CORS-Friendly**: Raw content URLs support cross-origin requests
- **Stateless**: Each sync is independent, no session tracking
- **Client-Side Only**: All processing happens in the browser
- **Rate Limiting**: Subject to GitHub's unauthenticated API limits (~60 requests/hour)
- **Error Handling**: Fetch failures display in real-time status log

### Exporting Data

1. **Room Logic**: Click **📥 Export Logic** in Logic Portal
2. **Projects**: Currently stored in localStorage only
3. **Data Backups**: Created automatically during sync operations

### Backup Recommendations

- Enable "Create backup" option when syncing from GitHub
- Regularly export room logic from the Logic Portal
- Keep project data in localStorage but consider periodic browser data backups
- The reference library (room-sizes.js) is always available in the source files
- Source files in `src/` folder serve as version-controlled backups

## Data Sources

### Room Attributes (room-sizes.js)
- 1,764 rooms from VA TIL/MS Space Criteria
- 76 attributes per room including:
  - Room identification (Room Code, Room Name, NSF)
  - Materials (ceiling, wall, floor finishes)
  - Door specifications
  - HVAC and environmental controls (temperature, humidity, air changes, pressurization)
  - Medical gases and utilities (oxygen, vacuum, nitrogen, etc.)
  - Lighting and electrical requirements
  - Plumbing fixtures (sinks, eyewash, emergency shower)
  - Acoustic requirements
- **Editable in Program Mode**: All attributes can be customized per room instance
- **Two-Column Layout**: Organized by category for efficient editing and review

### Equipment Mappings (equipment-data-part1.js, part2.js)
- Complete equipment specifications
- Room-to-equipment relationships
- JSN codes and descriptions
- Acquisition/installation categories
- Organized by department and functional area

### Calculation Formulas (room-formulas.js)
- Structure for room quantity calculations
- NSF formula definitions
- Project variable mappings
- Managed via Logic Portal

## Tips & Best Practices

### Building a Project

1. Start with high-level imports (entire departments or functional areas)
2. Refine by removing unwanted rooms
3. Duplicate rooms when you need multiple instances
4. Adjust NSF values to match your specific requirements
5. Review equipment lists and add/remove as needed

### Managing Large Projects

- Use the hierarchical tree to collapse/expand sections
- Select departments or functional areas to see room summaries
- Use the project-level view to see everything at once
- Monitor NSF rollups to stay within budget targets

### Room Duplication

- Duplicates include all equipment with original quantities
- **Attributes are copied**: All 76 room attributes transfer to the duplicate
- **Room Name auto-updates**: The "Room Name" attribute matches the new name with " (Copy)" suffix
- Room names get " (Copy)" suffix automatically
- Edit the duplicate's NSF, attributes, or equipment independently
- Useful for multiple exam rooms, patient rooms, etc.

### Resetting Rooms to Default

- **Reset to Default** button restores original room template
- Clears all attribute customizations
- Resets equipment list to base room code specifications
- Useful when you want to start fresh with template values
- Confirmation prompt prevents accidental resets

### Reference Mode Exploration

- Browse before importing to understand room relationships
- Check equipment requirements before adding to project
- Review room attributes for planning purposes
- Use as a library reference during project development

## Keyboard Shortcuts

- **Click outside modals**: Close dialog boxes
- **Enter key**: Submit in password modal

## Browser Compatibility

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- Requires modern browser with ES6+ JavaScript support
- LocalStorage must be enabled

## Troubleshooting

### Page Won't Load
- Check browser console for errors
- Ensure all files are in the same directory
- Verify browser JavaScript is enabled

### Data Not Saving
- Check localStorage is not disabled
- Verify browser is not in private/incognito mode
- Check available storage space

### Import Not Working
- Ensure you've selected items in the import tree
- Check that checkboxes are marked
- Verify you clicked "Import Selected"

### Logic Portal Access
- Password is case-sensitive: **CARTER**
- Check that you clicked "Unlock" button
- Refresh page if portal doesn't open

## Performance Optimizations

The application includes several optimizations for handling large datasets efficiently:

### Lazy Loading & Pagination
- **Logic Portal**: Shows 50 rooms at a time with "Load More" button (1,764 total rooms)
- **Room Lists**: Project/department/functional area views display first 100 rooms max
- **Import Tree**: Only renders expanded nodes to minimize DOM operations

### Caching
- Department and functional area structures are cached to avoid rebuilding
- Reference data is loaded once at startup

### Debouncing
- Search inputs use 300ms debounce to prevent excessive re-renders
- Tree expansion uses requestAnimationFrame for smooth animations

### Smart Rendering
- Only affected components re-render (not full page refreshes)
- Node expansion toggles only update tree view, not detail panel
- Large lists automatically truncate with helpful messaging

### Best Practices for Performance
- Keep projects under 1,000 rooms for optimal performance  
- Use search filters in Logic Portal rather than scrolling all rooms
- Close unused import modals when not actively importing
- Export and backup data regularly to avoid localStorage bloat

## Technical Details

### File Structure

```
index.html                          Main application (single-page web app)
room-sizes.js                       Room attributes database (1,764 rooms)
equipment-data-part1.js            Equipment library (part 1)
equipment-data-part2.js            Equipment library (part 2)
load-equipment.js                  Equipment data loader
room-formulas.js                   Room calculation formulas
README.md                          Documentation
src/                               Source data files (for syncing)
  ├── room_criteria.tsv            Room specifications (tab-separated)
  ├── Equipment_Guide_parsed_v2.txt Equipment catalog (pipe-delimited)
  ├── vatilms_room_criteria.xlsx   Original VA TIL/MS data
  └── generate-room-data.ps1       Data processing script
```

### Data Storage

- **localStorage key**: `hospitalProjects`
- **localStorage key**: `roomLogicData`
- Maximum localStorage size: ~5-10MB (browser-dependent)

### Technology Stack

- Pure JavaScript (ES6+)
- No external dependencies
- CSS custom properties for theming
- LocalStorage API for persistence

## Future Enhancements

Potential features for future development:
- Project export/import (JSON)
- ~~PDF report generation~~ ✅ **Added** (Equipment & Room Attributes reports)
- Cost estimation integration
- Multi-user collaboration
- ~~Cloud storage options~~ ✅ **Added** (GitHub sync for reference data)
- Advanced filtering and search
- Custom room creation
- Formula validation and testing
- Real-time collaborative editing
- Template projects
- Version control for projects

## Chapter Logic Implementation Status

### Completed Chapters (28 of 51 Active Chapters - 55% Complete)

**Patient Care Units (6 chapters - 6 complete)**
- ✅ **Chapter 100**: Medical/Surgical Patient Care Unit (MS PCU) (3 FAs, ~90 rooms)
- ✅ **Chapter 102**: Intensive Care Patient Care Unit (IC PCU) (4 FAs, ~40 rooms)
- ✅ **Chapter 104**: Spinal Cord Injury / Disorders Center (SCI/D) (7 FAs, ~80 rooms)
- ✅ **Chapter 106**: Small House (SH) Model (10 FAs, ~150 rooms)
- ✅ **Chapter 110**: Mental Health Patient Care Unit (MH PCU)
- ✅ **Chapter 111**: Polytrauma Rehabilitation Center (PRC)

**Clinical Services (15 chapters - 10 complete)**
- 🗑️ **Chapter 202**: DELETED – merged into Mental Health Clinic Chapter 260
- ✅ **Chapter 204**: Audiology and Speech-Language Pathology (ASLP) Service
- ✅ **Chapter 208**: Chaplain Service (4 FAs, ~20 rooms)
- ✅ **Chapter 210**: Cardiology Service (6 FAs, ~60 rooms)
- ✅ **Chapter 212**: Pulmonary Medicine Service (6 FAs, ~50 rooms)
- ✅ **Chapter 214**: Clinical Services Administration (10 FAs, ~100 rooms)
- ✅ **Chapter 222**: Dental Service (7 FAs, ~80 rooms)
- ✅ **Chapter 226**: Electroencephalography (EEG) Laboratory (6 FAs, ~40 rooms)
- ⏳ **Chapter 233**: Eye Clinic: Ophthalmology and Optometry Services
- ✅ **Chapter 268**: Pharmacy Service
- ⏳ **Chapter 269**: Recreation Therapy Service
- ✅ **Chapter 270**: Physical Medicine and Rehabilitation Service (9 FAs, ~45 rooms)
- ⏳ **Chapter 285**: Sterile Processing Service
- ✅ **Chapter 286**: Surgical/Endovascular Service
- ⏳ **Chapter 287**: Gastroenterology/Endoscopy Service

**Administrative Services (8 chapters - 7 complete)**
- ✅ **Chapter 218**: Veterans Assistance Unit (2 FAs, ~8 rooms)
- ✅ **Chapter 220**: Credit Union (3 FAs, ~15 rooms)
- ✅ **Chapter 234**: Fiscal Service (3 FAs, ~30 rooms)
- ✅ **Chapter 238**: Medical Center Director Suite (3 FAs, ~20 rooms)
- ✅ **Chapter 246**: Health Administration Service
- ✅ **Chapter 254**: Nursing Service Administration (3 FAs, ~25 rooms)
- ✅ **Chapter 266**: Human Resources Management
- ✅ **Chapter 278**: Research and Development

**Facility Services (14 chapters - 5 complete)**
- ⏳ **Chapter 206**: Veterans Canteen Service (VCS)
- ⏳ **Chapter 230**: Engineering Service
- ⏳ **Chapter 232**: Telecommunications Facilities
- ✅ **Chapter 244**: Lobby (1 FA, ~15 rooms)
- ⏳ **Chapter 248**: Medical Media Service
- ✅ **Chapter 274**: Quarters, On-Call (1 FA, ~10 rooms)
- ✅ **Chapter 279**: Police Service (2 FAs, ~20 rooms)
- ✅ **Chapter 280**: Service Organizations (3 FAs, ~8 rooms)
- ⏳ **Chapter 282**: Social Work Service (4 FAs, ~15 rooms)
- ⏳ **Chapter 284**: Logistics Service
- ✅ **Chapter 290**: Voluntary Service (4 FAs, ~12 rooms)
- ⏳ **Chapter 400**: Library Service
- ✅ **Chapter 402**: Educational Facilities
- ✅ **Chapter 406**: Environmental Management Service (EMS) Administration

### Remaining Chapters (23 of 51 Active Chapters)

**Imaging & Diagnostics (4 chapters)**
- ⏳ **Chapter 228**: Radiology/Imaging (10 FAs, ~50 rooms) - **NOTE: May be replaced by Chapter 295**
- ✅ **Chapter 240**: Pathology and Laboratory Medicine Service (8 FAs, ~40 rooms)
- 🗑️ **Chapter 252**: DELETED - replaced by Imaging Service Chapter 295
- 🗑️ **Chapter 275**: DELETED - replaced by Imaging Service Chapter 295
- 🗑️ **Chapter 276**: DELETED - replaced by Imaging Service Chapter 295
- ⏳ **Chapter 295**: Imaging Service (consolidated imaging chapter)

**Emergency & Urgent Care (2 chapters)**
- ✅ **Chapter 256**: Emergency Department (ED) (12 FAs, ~60 rooms)
- ⏳ **Chapter 257**: Urgent Care Center

**Ambulatory Care (5 chapters)**
- ⏳ **Chapter 204**: Audiology and Speech-Language Pathology (ASLP) Service
- ✅ **Chapter 216**: Ambulatory Surgery Service (12 FAs, ~50 rooms)
- ⏳ **Chapter 258**: Women Veterans Clinical Service (WVCS) (For Models 2 and 3)
- ⏳ **Chapter 260**: Mental Health Clinic – UNDER REVISION
- 🗑️ **Chapter 261**: DELETED – merged into Mental Health Clinic Chapter 260
- ⏳ **Chapter 263**: Community Based Outpatient Clinic (PACT) Interim
- 🗑️ **Chapter 265**: Community Based Outpatient Clinic (CBOC) – ARCHIVED

**Pharmacy & Rehabilitation Services (2 chapters)**
- ✅ **Chapter 268**: Pharmacy Service (5 FAs, ~30 rooms)
- ✅ **Chapter 270**: Physical Medicine and Rehabilitation Service (9 FAs, ~45 rooms)

**Specialty Clinical Services (5 chapters)**
- ⏳ **Chapter 277**: Radiation Oncology
- ⏳ **Chapter 308**: Prosthetic and Sensory Aids Service
- ⏳ **Chapter 312**: Mental Health Residential Care Unit (MH RCU)
- ⏳ **Chapter 316**: Dialysis Center
- 🗑️ **Chapter 300**: DELETED – merged into Mental Health Clinic Chapter 260

**Support Services (6 chapters)**
- ⏳ **Chapter 408**: Environmental Management Service (EMS) Laundry and Linen Operation
- ⏳ **Chapter 410**: Environmental Management Service (EMS) Lockers, Lounges, Toilets and Showers
- ⏳ **Chapter 420**: Childcare Development Center
- ⏳ **Chapter 421**: Drop-in Childcare Center

**Under Revision (2 chapters)**
- ⏳ **Chapter 224**: Nutrition and Food Service – UNDER REVISION
- ⏳ **Chapter 260**: Mental Health Clinic – UNDER REVISION

**Deleted/Merged Chapters (9 total)**
- 🗑️ **Chapter 202**: DELETED – merged into Mental Health Clinic Chapter 260
- 🗑️ **Chapter 252**: DELETED - replaced by Imaging Service Chapter 295
- 🗑️ **Chapter 261**: DELETED – merged into Mental Health Clinic Chapter 260
- 🗑️ **Chapter 262**: DELETED
- 🗑️ **Chapter 264**: DELETED
- 🗑️ **Chapter 265**: Community Based Outpatient Clinic (CBOC) – ARCHIVED
- 🗑️ **Chapter 272**: DELETED – merged into Mental Health Clinic Chapter 260
- 🗑️ **Chapter 275**: DELETED - replaced by Imaging Service Chapter 295
- 🗑️ **Chapter 276**: DELETED - replaced by Imaging Service Chapter 295
- 🗑️ **Chapter 300**: DELETED – merged into Mental Health Clinic Chapter 260

### Implementation Notes

**Two Export Patterns in Use:**
- **Object Pattern** (22 chapters): Direct object export with `functionalAreas` array
- **Function Pattern** (6 chapters): Function-based export returning room arrays

**Statistics:**
- **Active VA Chapters**: 51 (excluding 9 deleted/archived)
- **Completed**: 28 chapters (55%)
- **Remaining**: 23 chapters (45%)
- **Total Functional Areas**: ~141
- **Total Room Definitions**: ~1105+
- All chapters feature multi-tier conditional logic and NSF calculations
- Helper functions used for complex room count calculations

**Chapter Alignment with VA Official Index:**

All implemented chapters now use official VA Space Planning Criteria Index numbering:
- ✅ **Chapter 240**: Pathology and Laboratory Medicine Service (corrected from 206)
- ✅ **Chapter 256**: Emergency Department (corrected from 230)
- ✅ **Chapter 268**: Pharmacy Service (corrected from 204)
- ✅ **Chapter 270**: Physical Medicine and Rehabilitation Service (corrected from 260)
- 🗑️ **Chapter 202**: Primary Care - Commented out (VA shows as DELETED, merged into Ch 260)

Chapter files have been renamed and all internal references updated to match the official VA numbering system. Chapter 202 logic is preserved in the codebase but excluded from the active registry.

## Support & Credits

**Data Source**: VA TIL/MS Space Criteria
**Excel Source**: vatilms_room_criteria-12-01-2025_12_14.xlsx
**PDF Reference**: Combined Space Criteria.pdf (Sections 4 & 5)

## Version History

- **v1.3** (December 2, 2025)
  - **UI Reorganization**: Moved Logic Portal and Sync buttons to persistent header icons
  - **Room Attributes**: Added comprehensive editable attribute display (76 fields in two-column layout)
  - **Equipment Editing**: Added inline quantity adjustment for equipment items
  - **Room Duplication**: Fixed attribute copying and Room Name synchronization
  - **Reset Feature**: Added "Reset to Default" button to restore rooms to base template
  - **Hierarchical Checkboxes**: Implemented indeterminate state for parent nodes in import tree
  - **Button Layout**: Reorganized buttons for better UX (Add Equipment in panel, compact Duplicate/Reset)

- **v1.2** (December 2, 2025)
  - Added PDF report generation (Equipment Focus & Room Attributes Focus)
  - Added GitHub data sync for reference library updates
  - Reorganized source files into `src/` folder
  - Added automated data parsing from TSV and text files
  - Improved data backup system with timestamps

- **v1.1** (December 2, 2025)
  - Added comprehensive room attribute display in reference mode
  - Performance optimizations (debouncing, pagination, caching)
  - Compact duplicate/delete buttons at FA/Dept levels
  - Enhanced documentation

- **v1.0** (December 2025)
  - Initial release
  - Program and Reference modes
  - Room import and management
  - NSF calculations
  - Equipment management
  - Logic Portal with password protection
  - Room-level duplicate/delete/edit
  - Aggregate views at FA/Dept/Project levels

---

**Last Updated**: December 2, 2025
