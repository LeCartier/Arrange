export const CHAPTER_230 = {
  chapterNumber: '230',
  chapterTitle: 'Engineering Service',
  
  inputs: [
    {
      id: 'biomedical_authorized',
      label: 'Is a Biomedical Repair Shop authorized?',
      type: 'boolean',
      options: [
        { value: true, label: 'Yes' },
        { value: false, label: 'No' }
      ]
    },
    {
      id: 'biomedical_fte',
      label: 'How many Biomedical Research Technician FTE positions are authorized?',
      type: 'number',
      min: 1,
      max: 6,
      displayCondition: (inputs) => inputs.biomedical_authorized === true
    },
    {
      id: 'carpentry_authorized',
      label: 'Is a Carpentry Shop authorized?',
      type: 'boolean',
      options: [
        { value: true, label: 'Yes' },
        { value: false, label: 'No' }
      ]
    },
    {
      id: 'carpentry_fte',
      label: 'How many Technical Carpentry Shop FTE positions are authorized?',
      type: 'number',
      min: 1,
      max: 10,
      displayCondition: (inputs) => inputs.carpentry_authorized === true
    },
    {
      id: 'ac_authorized',
      label: 'Is an Air Conditioning Shop authorized?',
      type: 'boolean',
      options: [
        { value: true, label: 'Yes' },
        { value: false, label: 'No' }
      ]
    },
    {
      id: 'ac_fte',
      label: 'How many Technical Air Conditioning Shop FTE positions are authorized?',
      type: 'number',
      min: 1,
      max: 10,
      displayCondition: (inputs) => inputs.ac_authorized === true
    },
    {
      id: 'plumbing_authorized',
      label: 'Is a Plumbing Shop authorized?',
      type: 'boolean',
      options: [
        { value: true, label: 'Yes' },
        { value: false, label: 'No' }
      ]
    },
    {
      id: 'plumbing_fte',
      label: 'How many Technical Plumbing Shop FTE positions are authorized?',
      type: 'number',
      min: 1,
      max: 14,
      displayCondition: (inputs) => inputs.plumbing_authorized === true
    },
    {
      id: 'electrical_authorized',
      label: 'Is an Electrical Shop authorized?',
      type: 'boolean',
      options: [
        { value: true, label: 'Yes' },
        { value: false, label: 'No' }
      ]
    },
    {
      id: 'electrical_fte',
      label: 'How many Technical Electrical Shop FTE positions are authorized?',
      type: 'number',
      min: 1,
      max: 14,
      displayCondition: (inputs) => inputs.electrical_authorized === true
    },
    {
      id: 'paint_authorized',
      label: 'Is a Paint Shop authorized?',
      type: 'boolean',
      options: [
        { value: true, label: 'Yes' },
        { value: false, label: 'No' }
      ]
    },
    {
      id: 'paint_fte',
      label: 'How many Technical Paint Shop FTE positions are authorized?',
      type: 'number',
      min: 1,
      max: 8,
      displayCondition: (inputs) => inputs.paint_authorized === true
    },
    {
      id: 'mechanical_authorized',
      label: 'Is a Mechanical Shop authorized?',
      type: 'boolean',
      options: [
        { value: true, label: 'Yes' },
        { value: false, label: 'No' }
      ]
    },
    {
      id: 'mechanical_fte',
      label: 'How many Technical Mechanical Shop FTE positions are authorized?',
      type: 'number',
      min: 1,
      max: 10,
      displayCondition: (inputs) => inputs.mechanical_authorized === true
    },
    {
      id: 'mason_authorized',
      label: 'Is a Mason Shop authorized?',
      type: 'boolean',
      options: [
        { value: true, label: 'Yes' },
        { value: false, label: 'No' }
      ]
    },
    {
      id: 'mason_fte',
      label: 'How many Technical Mason Shop FTE positions are authorized?',
      type: 'number',
      min: 1,
      max: 6,
      displayCondition: (inputs) => inputs.mason_authorized === true
    },
    {
      id: 'grounds_authorized',
      label: 'Is a Grounds Maintenance Shop authorized?',
      type: 'boolean',
      options: [
        { value: true, label: 'Yes' },
        { value: false, label: 'No' }
      ]
    },
    {
      id: 'grounds_fte',
      label: 'How many Technical Grounds Maintenance Shop FTE positions are authorized?',
      type: 'number',
      min: 1,
      max: 12,
      displayCondition: (inputs) => inputs.grounds_authorized === true
    },
    {
      id: 'locksmith_authorized',
      label: 'Is a Locksmith Shop authorized?',
      type: 'boolean',
      options: [
        { value: true, label: 'Yes' },
        { value: false, label: 'No' }
      ]
    },
    {
      id: 'locksmith_fte',
      label: 'How many Locksmith FTE positions are authorized?',
      type: 'number',
      min: 1,
      max: 4,
      displayCondition: (inputs) => inputs.locksmith_authorized === true
    },
    {
      id: 'multiuse_authorized',
      label: 'Is a Multi-use Shop authorized?',
      type: 'boolean',
      options: [
        { value: true, label: 'Yes' },
        { value: false, label: 'No' }
      ]
    },
    {
      id: 'multiuse_fte',
      label: 'How many Multi-use Shop Technical FTE positions are authorized?',
      type: 'number',
      min: 1,
      max: 6,
      displayCondition: (inputs) => inputs.multiuse_authorized === true
    },
    {
      id: 'interior_design_fte',
      label: 'How many Interior Design (IT) FTE positions (based on the ID Staffing Tool) are authorized?',
      type: 'number',
      min: 1,
      max: 6
    },
    {
      id: 'eng_clerical_fte',
      label: 'How many Engineering Clerical FTE positions are authorized?',
      type: 'number',
      min: 1,
      max: 4
    },
    {
      id: 'industrial_hygienist_fte',
      label: 'How many Industrial Hygienist FTE positions are authorized?',
      type: 'number',
      min: 1,
      max: 2
    },
    {
      id: 'project_engineer_fte',
      label: 'How many Project Engineer FTE positions are authorized?',
      type: 'number',
      min: 1,
      max: 4
    },
    {
      id: 'technical_fte',
      label: 'How many Technical FTE positions are authorized?',
      type: 'number',
      min: 1,
      max: 6
    },
    {
      id: 'driver_dispatch_fte',
      label: 'How many Driver Dispatch FTE positions are authorized?',
      type: 'number',
      min: 1,
      max: 2
    },
    {
      id: 'shop_supervisor_fte',
      label: 'How many Shop Supervisor FTE positions are authorized?',
      type: 'number',
      min: 1,
      max: 4
    },
    {
      id: 'trainee_fte',
      label: 'How many Trainee FTE positions are authorized?',
      type: 'number',
      min: 1,
      max: 6
    },
    {
      id: 'draftsman_fte',
      label: 'How many Draftsman FTE positions are authorized?',
      type: 'number',
      min: 1,
      max: 4
    },
    {
      id: 'eng_technician_fte',
      label: 'How many Engineering Technician FTE positions are authorized?',
      type: 'number',
      min: 1,
      max: 4
    },
    {
      id: 'facility_total_nsf',
      label: 'What is the total NSF of this Facility?',
      type: 'number',
      min: 5000,
      max: 400000
    }
  ],

  getTotalFTE(inputs) {
    let total = 0;
    
    // Shop FTEs (only if shop is authorized)
    if (inputs.biomedical_authorized && inputs.biomedical_fte) total += inputs.biomedical_fte;
    if (inputs.carpentry_authorized && inputs.carpentry_fte) total += inputs.carpentry_fte;
    if (inputs.ac_authorized && inputs.ac_fte) total += inputs.ac_fte;
    if (inputs.plumbing_authorized && inputs.plumbing_fte) total += inputs.plumbing_fte;
    if (inputs.electrical_authorized && inputs.electrical_fte) total += inputs.electrical_fte;
    if (inputs.paint_authorized && inputs.paint_fte) total += inputs.paint_fte;
    if (inputs.mechanical_authorized && inputs.mechanical_fte) total += inputs.mechanical_fte;
    if (inputs.mason_authorized && inputs.mason_fte) total += inputs.mason_fte;
    if (inputs.grounds_authorized && inputs.grounds_fte) total += inputs.grounds_fte;
    if (inputs.locksmith_authorized && inputs.locksmith_fte) total += inputs.locksmith_fte;
    if (inputs.multiuse_authorized && inputs.multiuse_fte) total += inputs.multiuse_fte;
    
    // Administrative/Support FTEs
    if (inputs.interior_design_fte) total += inputs.interior_design_fte;
    if (inputs.eng_clerical_fte) total += inputs.eng_clerical_fte;
    if (inputs.industrial_hygienist_fte) total += inputs.industrial_hygienist_fte;
    if (inputs.project_engineer_fte) total += inputs.project_engineer_fte;
    if (inputs.technical_fte) total += inputs.technical_fte;
    if (inputs.driver_dispatch_fte) total += inputs.driver_dispatch_fte;
    if (inputs.shop_supervisor_fte) total += inputs.shop_supervisor_fte;
    if (inputs.trainee_fte) total += inputs.trainee_fte;
    if (inputs.draftsman_fte) total += inputs.draftsman_fte;
    if (inputs.eng_technician_fte) total += inputs.eng_technician_fte;
    
    return total;
  },

  functionalAreas: {
    FA1: {
      name: 'Reception Area',
      calculateRooms(inputs) {
        const totalFTE = this.getTotalFTE(inputs);
        const rooms = [];

        // 1. Eng Svc Reception / Waiting Room
        if (totalFTE >= 1) {
          let nsf = 60;
          if (totalFTE >= 17) nsf = 100;
          if (totalFTE >= 37) nsf = 140;
          if (totalFTE >= 57) nsf = 180;
          rooms.push({ id: 'SS222', name: 'Eng Svc Reception / Waiting Room', count: 1, nsf });
        }

        // 2. Eng Svc Reception / Waiting Toilet
        if (totalFTE >= 1) {
          let nsf = 60;
          if (totalFTE >= 17) nsf = 80;
          rooms.push({ id: 'SS221', name: 'Eng Svc Reception / Waiting Toilet', count: 1, nsf });
        }

        // 3. Eng Svc Alcove, Wheelchair Storage
        if (totalFTE >= 37) {
          rooms.push({ id: 'SB191', name: 'Eng Svc Alcove, Wheelchair Storage', count: 1, nsf: 20 });
        }

        return rooms;
      }
    },

    FA2: {
      name: 'Administrative and Operations Area',
      calculateRooms(inputs) {
        const totalFTE = this.getTotalFTE(inputs);
        const rooms = [];

        // 1. Eng Svc Office, Chief
        if (totalFTE >= 1) {
          rooms.push({ id: 'SS204', name: 'Eng Svc Office, Chief', count: 1, nsf: 120 });
        }

        // 2. Eng Svc Workspace, Administrative
        if (totalFTE >= 1) {
          let count = 1;
          if (totalFTE >= 17) count = 3;
          if (totalFTE >= 57) count = 5;
          if (totalFTE >= 97) count = 7;
          rooms.push({ id: 'SS218', name: 'Eng Svc Workspace, Administrative', count, nsf: 56 });
        }

        // 3. Eng Svc Workspace, Industrial Hygienist
        if (inputs.industrial_hygienist_fte >= 1) {
          rooms.push({ id: 'SS218', name: 'Eng Svc Workspace, Industrial Hygienist', count: 1, nsf: 56 });
        }

        // 4. Eng Svc Workspace, Project Engineer
        if (inputs.project_engineer_fte >= 1) {
          let count = 1;
          if (inputs.project_engineer_fte >= 3) count = 2;
          rooms.push({ id: 'SS218', name: 'Eng Svc Workspace, Project Engineer', count, nsf: 56 });
        }

        // 5. Eng Svc Workspace, Technical
        if (inputs.technical_fte >= 1) {
          let count = 1;
          if (inputs.technical_fte >= 4) count = 2;
          rooms.push({ id: 'SS218', name: 'Eng Svc Workspace, Technical', count, nsf: 56 });
        }

        // 6. Eng Svc Workspace, Draftsman
        if (inputs.draftsman_fte >= 1) {
          rooms.push({ id: 'SS218', name: 'Eng Svc Workspace, Draftsman', count: 1, nsf: 56 });
        }

        // 7. Eng Svc Workspace, Engineering Technician
        if (inputs.eng_technician_fte >= 1) {
          let count = 1;
          if (inputs.eng_technician_fte >= 3) count = 2;
          rooms.push({ id: 'SS218', name: 'Eng Svc Workspace, Engineering Technician', count, nsf: 56 });
        }

        // 8. Eng Svc Office, Conference Room
        if (totalFTE >= 1) {
          let nsf = 120;
          if (totalFTE >= 17) nsf = 180;
          if (totalFTE >= 37) nsf = 240;
          rooms.push({ id: 'SS101', name: 'Eng Svc Office, Conference Room', count: 1, nsf });
        }

        // 9. Eng Svc File Room, Active Files
        if (totalFTE >= 1) {
          let nsf = 80;
          if (totalFTE >= 17) nsf = 120;
          if (totalFTE >= 57) nsf = 180;
          rooms.push({ id: 'SB301', name: 'Eng Svc File Room, Active Files', count: 1, nsf });
        }

        // 10. Eng Svc Office Breakroom
        if (totalFTE >= 17) {
          rooms.push({ id: 'SS262', name: 'Eng Svc Office Breakroom', count: 1, nsf: 120 });
        }

        // 11. Eng Svc Alcove, Wheelchair Storage
        if (totalFTE >= 37) {
          rooms.push({ id: 'SB191', name: 'Eng Svc Alcove, Wheelchair Storage', count: 1, nsf: 20 });
        }

        return rooms;
      }
    },

    FA3: {
      name: 'Engineering Control Center',
      calculateRooms(inputs) {
        const totalFTE = this.getTotalFTE(inputs);
        const rooms = [];

        // 1. Eng Svc Engineering Control Center
        if (totalFTE >= 1) {
          let nsf = 120;
          if (totalFTE >= 17) nsf = 180;
          if (totalFTE >= 57) nsf = 240;
          if (totalFTE >= 97) nsf = 300;
          rooms.push({ id: 'SB316', name: 'Eng Svc Engineering Control Center', count: 1, nsf });
        }

        return rooms;
      }
    },

    FA4: {
      name: 'Interior Design Area',
      calculateRooms(inputs) {
        const rooms = [];
        const idFTE = inputs.interior_design_fte || 0;
        const facilityNSF = inputs.facility_total_nsf || 0;

        // 1. Eng Svc Office, Interior Designer
        if (idFTE >= 1) {
          rooms.push({ id: 'SS204', name: 'Eng Svc Office, Interior Designer', count: 1, nsf: 120 });
        }

        // 2. Eng Svc Workspace, Interior Designer
        if (idFTE >= 2) {
          let count = 1;
          if (idFTE >= 4) count = 2;
          rooms.push({ id: 'SS218', name: 'Eng Svc Workspace, Interior Designer', count, nsf: 56 });
        }

        // 3. Eng Svc Office, Conference Room
        if (idFTE >= 1) {
          rooms.push({ id: 'SS101', name: 'Eng Svc Office, Conference Room', count: 1, nsf: 180 });
        }

        // 4. Eng Svc Furniture Warehouse, Storage Room
        if (facilityNSF >= 5000) {
          let nsf = 120;
          if (facilityNSF >= 50001) nsf = 200;
          if (facilityNSF >= 100001) nsf = 280;
          if (facilityNSF >= 200001) nsf = 360;
          if (facilityNSF >= 300001) nsf = 440;
          if (facilityNSF >= 400001) nsf = 520;
          rooms.push({ id: 'SB311', name: 'Eng Svc Furniture Warehouse, Storage Room', count: 1, nsf });
        }

        // 5. Eng Svc Library, Print and Catalogs
        if (idFTE >= 1) {
          rooms.push({ id: 'SB313', name: 'Eng Svc Library, Print and Catalogs', count: 1, nsf: 120 });
        }

        // 6. Eng Svc Workspace, Interior Design Graphics
        if (idFTE >= 3) {
          rooms.push({ id: 'SS218', name: 'Eng Svc Workspace, Interior Design Graphics', count: 1, nsf: 56 });
        }

        return rooms;
      }
    },

    FA5: {
      name: 'Biomedical Engineering Repair Shop',
      calculateRooms(inputs) {
        const rooms = [];
        const bioAuth = inputs.biomedical_authorized;
        const bioFTE = inputs.biomedical_fte || 0;

        if (!bioAuth) return rooms;

        // 1. Biomedical Workspace
        if (bioFTE >= 1) {
          let count = 1;
          if (bioFTE >= 3) count = 2;
          rooms.push({ id: 'SS218', name: 'Biomedical Workspace', count, nsf: 56 });
        }

        // 2. Biomedical Equipment Repair Shop
        if (bioFTE >= 1) {
          let nsf = 180;
          if (bioFTE >= 3) nsf = 240;
          if (bioFTE >= 5) nsf = 300;
          rooms.push({ id: 'SB318', name: 'Biomedical Equipment Repair Shop', count: 1, nsf });
        }

        // 3. Biomedical Equipment Waiting / Holding Area
        if (bioFTE >= 1) {
          rooms.push({ id: 'SB321', name: 'Biomedical Equipment Waiting / Holding Area', count: 1, nsf: 80 });
        }

        // 4. Biomedical Test Equipment Storage
        if (bioFTE >= 1) {
          rooms.push({ id: 'SB327', name: 'Biomedical Test Equipment Storage', count: 1, nsf: 80 });
        }

        return rooms;
      }
    },

    FA6: {
      name: 'Shop Area',
      calculateRooms(inputs) {
        const rooms = [];

        // CARPENTRY SHOP
        if (inputs.carpentry_authorized) {
          const fte = inputs.carpentry_fte || 0;
          
          // 1. Carpentry Floor Mounted Tools / Equipment Shop
          if (fte >= 1) {
            let nsf = 360;
            if (fte >= 5) nsf = 600;
            if (fte >= 9) nsf = 900;
            if (fte >= 13) nsf = 1200;
            rooms.push({ id: 'SB341', name: 'Carpentry Floor Mounted Tools / Equipment Shop', count: 1, nsf });
          }

          // 2. Carpentry Workbench / Worktable Shop
          if (fte >= 1) {
            let nsf = 480;
            if (fte >= 5) nsf = 800;
            if (fte >= 9) nsf = 1200;
            if (fte >= 13) nsf = 1600;
            rooms.push({ id: 'SB342', name: 'Carpentry Workbench / Worktable Shop', count: 1, nsf });
          }

          // 3. Carpentry Storage Room
          if (fte >= 1) {
            let nsf = 180;
            if (fte >= 5) nsf = 300;
            if (fte >= 9) nsf = 450;
            if (fte >= 13) nsf = 600;
            rooms.push({ id: 'SB351', name: 'Carpentry Storage Room', count: 1, nsf });
          }
        }

        // AIR CONDITIONING SHOP
        if (inputs.ac_authorized) {
          const fte = inputs.ac_fte || 0;
          
          // 4. Air Conditioning Floor Mounted Tools / Equipment Shop
          if (fte >= 1) {
            let nsf = 240;
            if (fte >= 5) nsf = 400;
            if (fte >= 9) nsf = 600;
            if (fte >= 13) nsf = 800;
            rooms.push({ id: 'SB357', name: 'Air Conditioning Floor Mounted Tools / Equipment Shop', count: 1, nsf });
          }

          // 5. Air Conditioning Workbench / Worktable Shop
          if (fte >= 1) {
            let nsf = 320;
            if (fte >= 5) nsf = 533;
            if (fte >= 9) nsf = 800;
            if (fte >= 13) nsf = 1067;
            rooms.push({ id: 'SB358', name: 'Air Conditioning Workbench / Worktable Shop', count: 1, nsf });
          }

          // 6. Air Conditioning Storage Room
          if (fte >= 1) {
            let nsf = 120;
            if (fte >= 5) nsf = 200;
            if (fte >= 9) nsf = 300;
            if (fte >= 13) nsf = 400;
            rooms.push({ id: 'SB367', name: 'Air Conditioning Storage Room', count: 1, nsf });
          }
        }

        // PLUMBING SHOP
        if (inputs.plumbing_authorized) {
          const fte = inputs.plumbing_fte || 0;
          
          // 7. Plumbing Floor Mounted Tools / Equipment Shop
          if (fte >= 1) {
            let nsf = 240;
            if (fte >= 5) nsf = 400;
            if (fte >= 9) nsf = 600;
            if (fte >= 13) nsf = 800;
            rooms.push({ id: 'SB374', name: 'Plumbing Floor Mounted Tools / Equipment Shop', count: 1, nsf });
          }

          // 8. Plumbing Workbench / Worktable Shop
          if (fte >= 1) {
            let nsf = 320;
            if (fte >= 5) nsf = 533;
            if (fte >= 9) nsf = 800;
            if (fte >= 13) nsf = 1067;
            rooms.push({ id: 'SB375', name: 'Plumbing Workbench / Worktable Shop', count: 1, nsf });
          }

          // 9. Plumbing Storage Room
          if (fte >= 1) {
            let nsf = 120;
            if (fte >= 5) nsf = 200;
            if (fte >= 9) nsf = 300;
            if (fte >= 13) nsf = 400;
            rooms.push({ id: 'SB384', name: 'Plumbing Storage Room', count: 1, nsf });
          }
        }

        // ELECTRICAL SHOP
        if (inputs.electrical_authorized) {
          const fte = inputs.electrical_fte || 0;
          
          // 10. Electrical Floor Mounted Tools / Equipment Shop
          if (fte >= 1) {
            let nsf = 240;
            if (fte >= 5) nsf = 400;
            if (fte >= 9) nsf = 600;
            if (fte >= 13) nsf = 800;
            rooms.push({ id: 'SB391', name: 'Electrical Floor Mounted Tools / Equipment Shop', count: 1, nsf });
          }

          // 11. Electrical Workbench / Worktable Shop
          if (fte >= 1) {
            let nsf = 320;
            if (fte >= 5) nsf = 533;
            if (fte >= 9) nsf = 800;
            if (fte >= 13) nsf = 1067;
            rooms.push({ id: 'SB392', name: 'Electrical Workbench / Worktable Shop', count: 1, nsf });
          }

          // 12. Electrical Storage Room
          if (fte >= 1) {
            let nsf = 120;
            if (fte >= 5) nsf = 200;
            if (fte >= 9) nsf = 300;
            if (fte >= 13) nsf = 400;
            rooms.push({ id: 'SB401', name: 'Electrical Storage Room', count: 1, nsf });
          }
        }

        // PAINTING SHOP
        if (inputs.paint_authorized) {
          const fte = inputs.paint_fte || 0;
          
          // 13. Painting Floor Mounted Tools / Equipment Shop
          if (fte >= 1) {
            let nsf = 180;
            if (fte >= 5) nsf = 300;
            if (fte >= 9) nsf = 450;
            if (fte >= 13) nsf = 600;
            rooms.push({ id: 'SB407', name: 'Painting Floor Mounted Tools / Equipment Shop', count: 1, nsf });
          }

          // 14. Painting Workbench / Worktable Shop
          if (fte >= 1) {
            let nsf = 240;
            if (fte >= 5) nsf = 400;
            if (fte >= 9) nsf = 600;
            if (fte >= 13) nsf = 800;
            rooms.push({ id: 'SB408', name: 'Painting Workbench / Worktable Shop', count: 1, nsf });
          }

          // 15. Painting Storage Room
          if (fte >= 1) {
            let nsf = 90;
            if (fte >= 5) nsf = 150;
            if (fte >= 9) nsf = 225;
            if (fte >= 13) nsf = 300;
            rooms.push({ id: 'SB417', name: 'Painting Storage Room', count: 1, nsf });
          }

          // 16. Painting Shop (special room for controlled/isolated painting)
          if (fte >= 1) {
            let nsf = 180;
            if (fte >= 5) nsf = 300;
            if (fte >= 9) nsf = 450;
            if (fte >= 13) nsf = 600;
            rooms.push({ id: 'SB424', name: 'Painting Shop', count: 1, nsf });
          }
        }

        // MECHANICAL SHOP
        if (inputs.mechanical_authorized) {
          const fte = inputs.mechanical_fte || 0;
          
          // 17. Mechanical Floor Mounted Tools / Equipment Shop
          if (fte >= 1) {
            let nsf = 240;
            if (fte >= 5) nsf = 400;
            if (fte >= 9) nsf = 600;
            if (fte >= 13) nsf = 800;
            rooms.push({ id: 'SB425', name: 'Mechanical Floor Mounted Tools / Equipment Shop', count: 1, nsf });
          }

          // 18. Mechanical Workbench / Worktable Shop
          if (fte >= 1) {
            let nsf = 320;
            if (fte >= 5) nsf = 533;
            if (fte >= 9) nsf = 800;
            if (fte >= 13) nsf = 1067;
            rooms.push({ id: 'SB426', name: 'Mechanical Workbench / Worktable Shop', count: 1, nsf });
          }

          // 19. Mechanical Storage Room
          if (fte >= 1) {
            let nsf = 120;
            if (fte >= 5) nsf = 200;
            if (fte >= 9) nsf = 300;
            if (fte >= 13) nsf = 400;
            rooms.push({ id: 'SB435', name: 'Mechanical Storage Room', count: 1, nsf });
          }
        }

        // MASONRY SHOP
        if (inputs.mason_authorized) {
          const fte = inputs.mason_fte || 0;
          
          // 20. Masonry Workbench / Worktable Shop
          if (fte >= 1) {
            let nsf = 240;
            if (fte >= 5) nsf = 400;
            if (fte >= 9) nsf = 600;
            if (fte >= 13) nsf = 800;
            rooms.push({ id: 'SB443', name: 'Masonry Workbench / Worktable Shop', count: 1, nsf });
          }

          // 21. Masonry Storage Room
          if (fte >= 1) {
            let nsf = 90;
            if (fte >= 5) nsf = 150;
            if (fte >= 9) nsf = 225;
            if (fte >= 13) nsf = 300;
            rooms.push({ id: 'SB452', name: 'Masonry Storage Room', count: 1, nsf });
          }
        }

        // GROUNDS MAINTENANCE SHOP
        if (inputs.grounds_authorized) {
          const fte = inputs.grounds_fte || 0;
          
          // 22. Grounds Maintenance Workbench / Worktable Shop
          if (fte >= 1) {
            let nsf = 240;
            if (fte >= 5) nsf = 400;
            if (fte >= 9) nsf = 600;
            if (fte >= 13) nsf = 800;
            rooms.push({ id: 'SB458', name: 'Grounds Maintenance Workbench / Worktable Shop', count: 1, nsf });
          }

          // 23. Grounds Maintenance Storage Room
          if (fte >= 1) {
            let nsf = 120;
            if (fte >= 5) nsf = 200;
            if (fte >= 9) nsf = 300;
            if (fte >= 13) nsf = 400;
            rooms.push({ id: 'SB467', name: 'Grounds Maintenance Storage Room', count: 1, nsf });
          }

          // 24. Grounds Maintenance Covered Storage, Exterior
          if (fte >= 1) {
            let nsf = 180;
            if (fte >= 5) nsf = 300;
            if (fte >= 9) nsf = 450;
            if (fte >= 13) nsf = 600;
            rooms.push({ id: 'SB474', name: 'Grounds Maintenance Covered Storage, Exterior', count: 1, nsf });
          }
        }

        // LOCKSMITH SHOP
        if (inputs.locksmith_authorized) {
          const fte = inputs.locksmith_fte || 0;
          
          // 25. Locksmith Workbench / Worktable Shop
          if (fte >= 1) {
            rooms.push({ id: 'SB475', name: 'Locksmith Workbench / Worktable Shop', count: 1, nsf: 120 });
          }

          // 26. Locksmith Storage Room
          if (fte >= 1) {
            rooms.push({ id: 'SB477', name: 'Locksmith Storage Room', count: 1, nsf: 60 });
          }
        }

        // MULTI-USE SHOP
        if (inputs.multiuse_authorized) {
          const fte = inputs.multiuse_fte || 0;
          
          // 27. Multi-use Floor Mounted Tools / Equipment Shop
          if (fte >= 1) {
            let nsf = 180;
            if (fte >= 5) nsf = 300;
            if (fte >= 9) nsf = 450;
            if (fte >= 13) nsf = 600;
            rooms.push({ id: 'SB478', name: 'Multi-use Floor Mounted Tools / Equipment Shop', count: 1, nsf });
          }

          // 28. Multi-use Workbench / Worktable Shop
          if (fte >= 1) {
            let nsf = 240;
            if (fte >= 5) nsf = 400;
            if (fte >= 9) nsf = 600;
            if (fte >= 13) nsf = 800;
            rooms.push({ id: 'SB479', name: 'Multi-use Workbench / Worktable Shop', count: 1, nsf });
          }

          // 29. Multi-use Storage Room
          if (fte >= 1) {
            let nsf = 90;
            if (fte >= 5) nsf = 150;
            if (fte >= 9) nsf = 225;
            if (fte >= 13) nsf = 300;
            rooms.push({ id: 'SB481', name: 'Multi-use Storage Room', count: 1, nsf });
          }
        }

        return rooms;
      }
    },

    FA7: {
      name: 'Shop Support Area',
      calculateRooms(inputs) {
        const totalFTE = this.getTotalFTE(inputs);
        const rooms = [];

        // 1. Eng Svc Shop Staff Breakroom
        if (totalFTE >= 1) {
          let nsf = 120;
          if (totalFTE >= 6) nsf = 160;
          if (totalFTE >= 17) nsf = 200;
          if (totalFTE >= 37) nsf = 240;
          if (totalFTE >= 57) nsf = 280;
          if (totalFTE >= 77) nsf = 320;
          if (totalFTE >= 97) nsf = 360;
          if (totalFTE >= 117) nsf = 400;
          if (totalFTE >= 137) nsf = 440;
          if (totalFTE >= 157) nsf = 480;
          rooms.push({ id: 'SS262', name: 'Eng Svc Shop Staff Breakroom', count: 1, nsf });
        }

        // 2. Eng Svc Shop Female Staff Locker Room
        if (totalFTE >= 1) {
          let nsf = 60;
          if (totalFTE >= 6) nsf = 80;
          if (totalFTE >= 17) nsf = 100;
          if (totalFTE >= 37) nsf = 120;
          if (totalFTE >= 57) nsf = 140;
          if (totalFTE >= 77) nsf = 180;
          if (totalFTE >= 97) nsf = 200;
          if (totalFTE >= 117) nsf = 220;
          if (totalFTE >= 137) nsf = 240;
          if (totalFTE >= 157) nsf = 260;
          rooms.push({ id: 'SS232', name: 'Eng Svc Shop Female Staff Locker Room', count: 1, nsf });
        }

        // 3. Eng Svc Shop Male Staff Locker Room
        if (totalFTE >= 1) {
          let nsf = 60;
          if (totalFTE >= 6) nsf = 80;
          if (totalFTE >= 17) nsf = 100;
          if (totalFTE >= 37) nsf = 120;
          if (totalFTE >= 57) nsf = 140;
          if (totalFTE >= 77) nsf = 180;
          if (totalFTE >= 97) nsf = 200;
          if (totalFTE >= 117) nsf = 220;
          if (totalFTE >= 137) nsf = 240;
          if (totalFTE >= 157) nsf = 260;
          rooms.push({ id: 'SS241', name: 'Eng Svc Shop Male Staff Locker Room', count: 1, nsf });
        }

        // 4. Eng Svc Shop Staff Toilet
        if (totalFTE >= 1) {
          let count = 1;
          if (totalFTE >= 6) count = 2;
          if (totalFTE >= 57) count = 3;
          if (totalFTE >= 121) count = 4;
          rooms.push({ id: 'SB191', name: 'Eng Svc Shop Staff Toilet', count, nsf: 60 });
        }

        // 5. Eng Svc Shop Female Staff Shower
        if (totalFTE >= 1) {
          let count = 1;
          if (totalFTE >= 17) count = 2;
          if (totalFTE >= 57) count = 3;
          if (totalFTE >= 97) count = 4;
          rooms.push({ id: 'SB173', name: 'Eng Svc Shop Female Staff Shower', count, nsf: 60 });
        }

        // 6. Eng Svc Shop Male Staff Shower
        if (totalFTE >= 1) {
          let count = 1;
          if (totalFTE >= 17) count = 2;
          if (totalFTE >= 57) count = 3;
          if (totalFTE >= 97) count = 4;
          rooms.push({ id: 'SB184', name: 'Eng Svc Shop Male Staff Shower', count, nsf: 60 });
        }

        // 7. Multi-use Flammables Storage Room
        if (totalFTE >= 1) {
          let nsf = 100;
          if (totalFTE >= 33) nsf = 140;
          if (totalFTE >= 113) nsf = 160;
          rooms.push({ id: 'SB482', name: 'Multi-use Flammables Storage Room', count: 1, nsf });
        }

        // 8. Eng Svc Housekeeping Aides Closet (HAC)
        if (totalFTE >= 1) {
          let count = 1;
          let nsf = 60;
          if (totalFTE >= 6) nsf = 80;
          if (totalFTE >= 33) {
            count = 2;
            nsf = 60;
          }
          if (totalFTE >= 113) {
            count = 2;
            nsf = 80;
          }
          rooms.push({ id: 'SB244', name: 'Eng Svc Housekeeping Aides Closet (HAC)', count, nsf });
        }

        return rooms;
      }
    }
  },

  calculateRooms(inputs) {
    const allRooms = [];

    // Bind getTotalFTE to each functional area so they can use it
    const boundThis = {
      getTotalFTE: this.getTotalFTE.bind(this)
    };

    for (const [key, fa] of Object.entries(this.functionalAreas)) {
      const rooms = fa.calculateRooms.call(boundThis, inputs);
      allRooms.push(...rooms);
    }

    return allRooms;
  }
};
