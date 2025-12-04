# User Guide: Adding Departments with Room Logic

## 🎯 Overview

The Hospital Programming Workbench now includes **automated room calculation** for select departments. Instead of manually selecting rooms, you can provide key project parameters (like number of beds) and the system automatically calculates all required rooms with correct quantities and square footage based on VA Space Planning Criteria.

## 🔍 Identifying Logic-Enabled Departments

### Visual Indicators

When you open the **"Add to Project"** modal, departments are visually distinguished:

**Logic-Enabled Departments** (Automated):
```
▶ □ MEDICAL / SURGICAL PATIENT CARE UNIT ⚡ LOGIC [⚡ Calculate]
   └─ Green left border
   └─ Green "⚡ LOGIC" badge
   └─ "⚡ Calculate" button available
```

**Manual Departments** (Traditional):
```
▶ □ EMERGENCY DEPARTMENT MANUAL
   └─ No border
   └─ Gray "MANUAL" badge
   └─ No calculate button
```

## 📋 How to Add a Department with Logic

### Method 1: From Import Modal

1. **Open Import Modal**
   - Click "+ Add to Project" button in the tree navigator

2. **Find Logic-Enabled Department**
   - Look for departments with the green <span style="background: linear-gradient(135deg, #00b894 0%, #00cec9 100%); color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.7rem;">⚡ LOGIC</span> badge

3. **Click "⚡ Calculate" Button**
   - Appears inline next to the department name
   - Opens the logic workflow modal

4. **Enter Project Inputs**
   - Fill in required values (e.g., "How many beds?")
   - See real-time preview of results

5. **Review Preview**
   - Shows total rooms, square footage, and functional areas
   - Updates instantly as you change inputs

6. **Add to Project**
   - Click "Calculate & Add to Project"
   - Department added with all calculated rooms

### Method 2: Browse All Logic Departments

1. **Open Import Modal**
   - Click "+ Add to Project"

2. **Click "⚡ Add with Logic" Button**
   - Located next to the search box at the top

3. **Select a Chapter**
   - Shows all available logic-enabled departments
   - Each card shows:
     - Chapter number and name
     - Description
     - Number of inputs required
     - Number of functional areas

4. **Enter Inputs & Add**
   - Same workflow as Method 1

## 💡 Example: Adding Medical/Surgical Unit

### Scenario
You need to add a Medical/Surgical Patient Care Unit for **50 beds**.

### Steps

1. **Open "Add to Project"** modal

2. **Locate Department**
   ```
   ▶ MEDICAL / SURGICAL PATIENT CARE UNIT (MS-PCU) ⚡ LOGIC
   ```

3. **Click "⚡ Calculate"** button

4. **Enter Input**
   - **Label:** "Acute Inpatient Medical/Surgical patient beds projected"
   - **Your Input:** `50`
   - **Hint:** Total number of projected Med/Surg acute care beds

5. **See Preview**
   ```
   📊 Calculation Preview
   Total Rooms: 105
   Total NSF: 25,430 sq ft
   Functional Areas: 3
   ```

6. **Add to Project**
   - Click "Calculate & Add to Project"
   - Success message shows rooms added

### Result
Your project now contains:
- **Department:** Medical / Surgical Patient Care Unit (MS-PCU)
- **Functional Areas:** 3
  - Unit Calculation (virtual)
  - Reception Area (waiting, consult rooms, etc.)
  - Patient Area (bedrooms, toilets, etc.)
- **Total Rooms:** 105 physical rooms
- **Total NSF:** 25,430 square feet

## 📊 Understanding the Results

### Calculation Types

**Calculation Rooms** (Virtual):
- Not physical rooms
- Used to determine other quantities
- Example: "Number of MS PCUs" = 2 units

**Physical Rooms**:
- Actual spaces with square footage
- Based on calculation results
- Example: "Patient Bedroom" = 45 rooms × 280 NSF = 12,600 NSF

### Result Structure

```
Chapter 100: Medical / Surgical Patient Care Unit
├─ FA1: Unit Calculation
│  └─ [CALC] Number of MS PCUs: 2
│
├─ FA2: Reception Area
│  ├─ MS PCU Waiting (2 rooms, 660 NSF total)
│  ├─ Consult Room (4 rooms, 480 NSF total)
│  ├─ Family Lounge (2 rooms, 240 NSF total)
│  └─ ...
│
└─ FA3: Patient Area
   ├─ Patient Bedroom (45 rooms, 12,600 NSF total)
   ├─ Patient Toilet/Shower (45 rooms, 3,150 NSF total)
   ├─ AII Bedroom (7 rooms, 1,680 NSF total)
   └─ ...
```

## 🔧 Currently Available Logic Departments

### Chapter 100: Medical / Surgical Patient Care Unit (MS-PCU)
- **Input Required:** Number of acute inpatient Med/Surg beds (17-267)
- **Outputs:** 100+ rooms across 3 functional areas
- **Use For:** General medical and surgical inpatient units

### Chapter 102: Intensive Care Patient Care Unit (IC-PCU)
- **Input Required:** Number of ICU beds (8-45)
- **Outputs:** 60+ rooms across 4 functional areas
- **Use For:** Intensive care units

## ❓ FAQ

### Can I still add departments manually?
**Yes!** The traditional checkbox method still works:
1. Expand departments
2. Check boxes for functional areas or individual rooms
3. Click "Add Selected"

### What if I made a mistake in my inputs?
You can:
1. Delete the department from your project
2. Re-add with correct inputs
3. Or manually adjust room quantities after adding

### Can I edit logic-generated rooms?
**Yes!** Once added, logic-generated rooms behave like any other room:
- Add/remove equipment
- Change quantities
- Modify square footage
- Add notes

### How do I know which rooms were logic-generated?
Logic-generated rooms have a `logicGenerated: true` flag in their data (visible in export/JSON).

### Can I mix logic and manual rooms in the same department?
**Not recommended.** Choose one method per department to avoid conflicts. If you need custom rooms, add them to a separate custom department.

### What happens if I enter values outside the range?
The system may show errors or warnings. Follow the guidance (min/max values) shown in the input fields.

## 🚀 Coming Soon

More chapters with automated logic:
- Chapter 104: Spinal Cord Injury PCU
- Chapter 110: Emergency Department
- Chapter 210: Surgery
- Chapter 256: Imaging
- And more...

## 💾 Saving & Sharing

Logic-generated departments can be:
- **Saved** in your project (uses browser localStorage)
- **Exported** as JSON files
- **Shared** with team members
- **Imported** into other projects

The export includes:
- All inputs you provided
- All calculated rooms and quantities
- Complete square footage totals

## 🎨 Quick Reference

| Feature | Description |
|---------|-------------|
| <span style="background: linear-gradient(135deg, #00b894 0%, #00cec9 100%); color: white; padding: 2px 8px; border-radius: 12px;">⚡ LOGIC</span> | Department has automated calculation |
| <span style="background: #333; color: #aaa; padding: 2px 8px; border-radius: 12px;">MANUAL</span> | Department requires manual selection |
| **⚡ Calculate** button | Opens logic workflow for that department |
| **⚡ Add with Logic** button | Browse all logic-enabled departments |
| Green left border | Visual indicator for logic-enabled items |
| Real-time preview | See results before adding to project |

---

**Need Help?** The system shows helpful hints for each input field, including valid ranges and descriptions of what each parameter means.
