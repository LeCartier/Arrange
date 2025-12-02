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
- Review room attributes (materials, HVAC, utilities, etc.)
- Search and explore the reference data

**To Switch Modes:**
- Use the **📚 Reference Mode** / **📝 Program Mode** button in the top navigation

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
- **📋 Duplicate Room**: Create a copy with all equipment
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

### Exporting Data

1. **Room Logic**: Click **📥 Export Logic** in Logic Portal
2. **Projects**: Currently stored in localStorage only

### Backup Recommendations

- Regularly export room logic from the Logic Portal
- Keep project data in localStorage but consider periodic browser data backups
- The reference library (room-sizes.js) is always available in the source files

## Data Sources

### Room Attributes (room-sizes.js)
- 1,764 rooms from VA TIL/MS Space Criteria
- 76 attributes per room including:
  - Materials (ceiling, wall, floor)
  - Door specifications
  - HVAC and environmental controls
  - Medical gases and utilities
  - Lighting and electrical requirements

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

- Duplicates include all equipment
- Room names get " (Copy)" suffix
- Edit the duplicate's NSF or equipment independently
- Useful for multiple exam rooms, patient rooms, etc.

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

## Technical Details

### File Structure

```
index.html                          Main application
room-sizes.js                       Room attributes database (1,764 rooms)
equipment-data-part1.js            Equipment library (part 1)
equipment-data-part2.js            Equipment library (part 2)
load-equipment.js                  Equipment data loader
room-formulas.js                   Room calculation formulas
README.md                          This file
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
- PDF report generation
- Cost estimation integration
- Multi-user collaboration
- Cloud storage options
- Advanced filtering and search
- Custom room creation
- Formula validation and testing

## Support & Credits

**Data Source**: VA TIL/MS Space Criteria
**Excel Source**: vatilms_room_criteria-12-01-2025_12_14.xlsx
**PDF Reference**: Combined Space Criteria.pdf (Sections 4 & 5)

## Version History

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
