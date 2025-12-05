// WORKBENCH MODE - Retro Isometric Programming Vibe
// Build your space program with virtual blocks!

class IsometricWorkbench {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    
    // 3D projection parameters - straight-on elevated view (not rotated 45°)
    this.tileWidth = 80;  // Grid spacing X
    this.tileHeight = 80; // Grid spacing Y
    this.cubeDepth = 40;  // How much Y-axis shows in pixels (elevation tilt)
    this.cubeHeight = 60; // Height scale for Z-axis
    
    // View mode: 'elevation' or 'isometric'
    this.viewMode = 'elevation';
    
    // Zoom and pan
    this.zoom = 1.0;
    this.minZoom = 0.3;
    this.maxZoom = 2.0;
    
    // Camera offset (for elevated view looking down)
    this.offsetX = this.width / 2;
    this.offsetY = 250; // Much higher for top-down angle
    
    // Tabletop parameters (much larger and deeper)
    this.tableHeight = 300; // Pixel height of table surface above ground
    this.tableThickness = 15; // Thickness of tabletop
    this.tableWidth = 1200; // Much wider table
    this.tableDepth = 400;  // Much deeper to show more of the table surface
    
    // Grid and cubes
    this.gridSize = 20;
    this.cubes = [];
    this.selectedCube = null;
    this.hoveredCube = null;
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    
    // Pastel color palette for departments
    this.departmentColors = {
      'INPATIENT': { base: '#FFB3BA', highlight: '#FFD4D7', shadow: '#E89BA1' },
      'CLINICAL': { base: '#BAFFC9', highlight: '#D7FFE0', shadow: '#A1E8B0' },
      'SUPPORT': { base: '#BAE1FF', highlight: '#D7EEFF', shadow: '#A1C8E8' },
      'ADMIN': { base: '#FFFFBA', highlight: '#FFFFD7', shadow: '#E8E8A1' },
      'RESIDENTIAL': { base: '#FFDFBA', highlight: '#FFECDA', shadow: '#E8C6A1' },
      'IMAGING': { base: '#E0BBE4', highlight: '#EDD4F0', shadow: '#C7A2CB' },
      'SURGERY': { base: '#FFDAC1', highlight: '#FFE8D6', shadow: '#E8C1A8' },
      'EMERGENCY': { base: '#FF9AA2', highlight: '#FFB8BE', shadow: '#E68189' },
      'LABORATORY': { base: '#C7CEEA', highlight: '#DBDFF2', shadow: '#AEB5D1' },
      'PHARMACY': { base: '#B5EAD7', highlight: '#CFEEE3', shadow: '#9CD1BE' },
      'DEFAULT': { base: '#E2E2E2', highlight: '#F0F0F0', shadow: '#C9C9C9' }
    };
    
    // Hatch patterns for functional areas
    this.patterns = {
      'RECEPTION': 'dots',
      'PATIENT_AREA': 'diagonal',
      'TREATMENT': 'crosshatch',
      'STAFF_ADMIN': 'horizontal',
      'SUPPORT': 'vertical',
      'STORAGE': 'grid',
      'WAITING': 'dots-large',
      'EXAM': 'diagonal-dense',
      'PROCEDURE': 'crosshatch-dense',
      'DEFAULT': 'solid'
    };
    
    // Stats display
    this.stats = {
      totalNSF: 0,
      totalDGSF: 0,
      cubeCount: 0,
      selectedDept: null
    };
    
    this.init();
  }
  
  init() {
    // Resize canvas to fill container
    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvas.bind(this));
    
    // Bind events
    this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
    this.canvas.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
    
    // Touch support for pinch zoom
    this.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this));
    this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this));
    this.canvas.addEventListener('touchend', this.handleTouchEnd.bind(this));
    this.lastTouchDistance = null;
    
    // Add some demo cubes to show the system works
    this.addDemoCubes();
    
    // Start render loop
    this.render();
  }
  
  resizeCanvas() {
    const container = this.canvas.parentElement;
    this.canvas.width = container.clientWidth;
    this.canvas.height = container.clientHeight;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.offsetX = this.width / 2;
    this.offsetY = this.height / 3;
    this.render();
  }
  
  addDemoCubes() {
    // Add some demo cubes to show the system
    const demoRooms = [
      { room_code: 'DEMO1', room_name: 'Patient Room', functional_area: 'Patient Area', nsf: 150, quantity: 1 },
      { room_code: 'DEMO2', room_name: 'Exam Room', functional_area: 'Treatment', nsf: 120, quantity: 1 },
      { room_code: 'DEMO3', room_name: 'Waiting Area', functional_area: 'Reception', nsf: 200, quantity: 1 },
      { room_code: 'DEMO4', room_name: 'Staff Office', functional_area: 'Staff and Administrative Area', nsf: 100, quantity: 1 },
      { room_code: 'DEMO5', room_name: 'Storage', functional_area: 'Support', nsf: 80, quantity: 1 },
    ];
    
    demoRooms.forEach((room, i) => {
      this.addCube(room, 'DEMO DEPARTMENT', i * 2, 0);
    });
  }
  
  // Convert screen coordinates to grid position (straight-on view)
  screenToGrid(screenX, screenY) {
    const x = screenX - this.offsetX;
    const y = screenY - this.offsetY;
    
    // Simple orthographic projection (no rotation)
    const gridX = x / this.tileWidth;
    const gridY = y / this.cubeDepth; // Y shows depth (tilted up view)
    
    return { x: Math.round(gridX), y: Math.round(gridY) };
  }
  
  // Convert grid position to screen coordinates (straight-on elevated view)
  gridToScreen(gridX, gridY, height = 0) {
    // Straight on: X maps to X, Y shows as depth (tilted), Z is vertical
    const screenX = (gridX * this.tileWidth + this.offsetX) * this.zoom;
    const screenY = (gridY * this.cubeDepth + this.offsetY - height) * this.zoom;
    
    return { x: screenX, y: screenY };
  }
  
  // Add a cube from room data
  addCube(room, department, gridX, gridY, stackHeight = 0) {
    // Height varies by NSF - small rooms = 1-2 units, large rooms = 3-5 units
    const nsfValue = room.nsf || 100;
    const heightUnits = Math.max(1, Math.min(5, Math.ceil(nsfValue / 200)));
    
    const cube = {
      id: `cube_${Date.now()}_${Math.random()}`,
      room: room,
      department: department,
      gridX: gridX,
      gridY: gridY,
      stackHeight: stackHeight,
      width: 1.2, // Consistent width for clean grid
      depth: 1.2, // Consistent depth for clean grid
      height: heightUnits, // Varies by NSF
      color: this.getDepartmentColor(department),
      pattern: this.getFunctionalAreaPattern(room.functional_area)
    };
    
    this.cubes.push(cube);
    this.updateStats();
    return cube;
  }
  
  getDepartmentColor(department) {
    // Map department to color category
    const deptUpper = (department || '').toUpperCase();
    
    // Check for matches
    if (deptUpper.includes('PATIENT CARE') || deptUpper.includes('PCU') || deptUpper.includes('INPATIENT')) return this.departmentColors.INPATIENT;
    if (deptUpper.includes('CLINICAL') || deptUpper.includes('EXAM') || deptUpper.includes('CLINIC')) return this.departmentColors.CLINICAL;
    if (deptUpper.includes('SUPPORT') || deptUpper.includes('BUILDING') || deptUpper.includes('FACILITIES')) return this.departmentColors.SUPPORT;
    if (deptUpper.includes('ADMIN') || deptUpper.includes('DIRECTOR') || deptUpper.includes('OFFICE')) return this.departmentColors.ADMIN;
    if (deptUpper.includes('RESIDENTIAL') || deptUpper.includes('QUARTERS') || deptUpper.includes('HOUSING')) return this.departmentColors.RESIDENTIAL;
    if (deptUpper.includes('IMAGING') || deptUpper.includes('RADIOLOGY') || deptUpper.includes('X-RAY')) return this.departmentColors.IMAGING;
    if (deptUpper.includes('SURGERY') || deptUpper.includes('SURGICAL') || deptUpper.includes('OR')) return this.departmentColors.SURGERY;
    if (deptUpper.includes('EMERGENCY') || deptUpper.includes('ER') || deptUpper.includes('URGENT')) return this.departmentColors.EMERGENCY;
    if (deptUpper.includes('LAB') || deptUpper.includes('LABORATORY')) return this.departmentColors.LABORATORY;
    if (deptUpper.includes('PHARMACY') || deptUpper.includes('PHARM')) return this.departmentColors.PHARMACY;
    
    // Assign color based on first letter to ensure variety
    const firstChar = deptUpper.charAt(0);
    const colorKeys = Object.keys(this.departmentColors).filter(k => k !== 'DEFAULT');
    const index = firstChar.charCodeAt(0) % colorKeys.length;
    return this.departmentColors[colorKeys[index]] || this.departmentColors.DEFAULT;
  }
  
  getFunctionalAreaPattern(functionalArea) {
    const faUpper = (functionalArea || '').toUpperCase();
    
    if (faUpper.includes('RECEPTION') || faUpper.includes('LOBBY')) return this.patterns.RECEPTION;
    if (faUpper.includes('PATIENT') || faUpper.includes('BED')) return this.patterns.PATIENT_AREA;
    if (faUpper.includes('TREATMENT') || faUpper.includes('THERAPY')) return this.patterns.TREATMENT;
    if (faUpper.includes('STAFF') || faUpper.includes('ADMIN') || faUpper.includes('OFFICE')) return this.patterns.STAFF_ADMIN;
    if (faUpper.includes('SUPPORT') || faUpper.includes('UTILITY')) return this.patterns.SUPPORT;
    if (faUpper.includes('STORAGE') || faUpper.includes('SUPPLY')) return this.patterns.STORAGE;
    if (faUpper.includes('WAITING') || faUpper.includes('WAIT')) return this.patterns.WAITING;
    if (faUpper.includes('EXAM') || faUpper.includes('CONSULTATION')) return this.patterns.EXAM;
    if (faUpper.includes('PROCEDURE') || faUpper.includes('OPERATING')) return this.patterns.PROCEDURE;
    
    // Assign pattern based on first letter to ensure variety
    const firstChar = faUpper.charAt(0);
    const patternKeys = Object.keys(this.patterns).filter(k => k !== 'DEFAULT');
    const index = firstChar.charCodeAt(0) % patternKeys.length;
    return this.patterns[patternKeys[index]] || this.patterns.DEFAULT;
  }
  
  // Draw a cube in straight-on elevated view
  drawCube(cube, isHovered = false, isSelected = false) {
    const { x: baseX, y: baseY } = this.gridToScreen(cube.gridX, cube.gridY, cube.stackHeight * this.cubeHeight);
    
    const w = cube.width * this.tileWidth * 0.3 * this.zoom; // Cube width
    const h = cube.height * this.cubeHeight * 0.4 * this.zoom; // Cube height (vertical)
    const d = cube.depth * this.cubeDepth * 0.3 * this.zoom; // Cube depth (shows as tilt)
    
    const color = cube.color;
    
    this.ctx.save();
    
    // Draw back face (top edge, slightly visible due to tilt)
    this.ctx.beginPath();
    this.ctx.moveTo(baseX - w/2, baseY - h - d);
    this.ctx.lineTo(baseX + w/2, baseY - h - d);
    this.ctx.lineTo(baseX + w/2, baseY - h);
    this.ctx.lineTo(baseX - w/2, baseY - h);
    this.ctx.closePath();
    this.ctx.fillStyle = this.adjustBrightness(color.shadow, -15);
    this.ctx.fill();
    this.ctx.strokeStyle = isHovered ? '#000' : '#333';
    this.ctx.lineWidth = isHovered || isSelected ? 3 : 2;
    this.ctx.stroke();
    
    // Draw left face
    this.ctx.beginPath();
    this.ctx.moveTo(baseX - w/2, baseY - h);
    this.ctx.lineTo(baseX - w/2, baseY);
    this.ctx.lineTo(baseX - w/2, baseY - d);
    this.ctx.lineTo(baseX - w/2, baseY - h - d);
    this.ctx.closePath();
    this.ctx.fillStyle = color.shadow;
    this.ctx.fill();
    this.ctx.strokeStyle = isHovered ? '#000' : '#333';
    this.ctx.lineWidth = isHovered || isSelected ? 3 : 2;
    this.ctx.stroke();
    
    // Draw right face
    this.ctx.beginPath();
    this.ctx.moveTo(baseX + w/2, baseY - h);
    this.ctx.lineTo(baseX + w/2, baseY);
    this.ctx.lineTo(baseX + w/2, baseY - d);
    this.ctx.lineTo(baseX + w/2, baseY - h - d);
    this.ctx.closePath();
    this.ctx.fillStyle = this.adjustBrightness(color.shadow, -10);
    this.ctx.fill();
    this.ctx.strokeStyle = isHovered ? '#000' : '#333';
    this.ctx.lineWidth = isHovered || isSelected ? 3 : 2;
    this.ctx.stroke();
    
    // Draw front face (main visible face)
    this.ctx.beginPath();
    this.ctx.rect(baseX - w/2, baseY - h, w, h);
    this.ctx.fillStyle = isSelected ? color.highlight : color.base;
    this.ctx.fill();
    
    // Apply hatch pattern ONLY to front face with correct clipping
    this.ctx.save();
    // Clip to exact front face rectangle
    this.ctx.beginPath();
    this.ctx.rect(baseX - w/2, baseY - h, w, h);
    this.ctx.clip();
    this.applyHatchPatternToFace(cube, baseX - w/2, baseY - h, w, h);
    this.ctx.restore();
    
    // Outline front - emphasized
    this.ctx.strokeStyle = isHovered ? '#000' : '#333';
    this.ctx.lineWidth = isHovered || isSelected ? 3 : 2;
    this.ctx.stroke();
    
    this.ctx.restore();
    
    // Draw label if selected or hovered - positioned above cube with background
    if (isSelected || isHovered) {
      this.ctx.save();
      
      const labelY = baseY - h - d - 20;
      const roomName = cube.room.room_name;
      const nsfText = `${cube.room.nsf} NSF`;
      
      // Measure text for background
      this.ctx.font = '11px "Courier New", monospace';
      const nameWidth = this.ctx.measureText(roomName).width;
      this.ctx.font = '9px "Courier New", monospace';
      const nsfWidth = this.ctx.measureText(nsfText).width;
      const maxWidth = Math.max(nameWidth, nsfWidth);
      
      // Draw background box
      const padding = 6;
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      this.ctx.fillRect(baseX - maxWidth/2 - padding, labelY - 18, maxWidth + padding * 2, 28);
      this.ctx.strokeStyle = '#333';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(baseX - maxWidth/2 - padding, labelY - 18, maxWidth + padding * 2, 28);
      
      // Draw text
      this.ctx.fillStyle = '#000';
      this.ctx.textAlign = 'center';
      this.ctx.font = 'bold 11px "Courier New", monospace';
      this.ctx.fillText(roomName, baseX, labelY - 4);
      this.ctx.font = '9px "Courier New", monospace';
      this.ctx.fillText(nsfText, baseX, labelY + 8);
      
      this.ctx.restore();
    }
  }
  
  // Apply retro hatch patterns to a face (x, y are TOP-LEFT corner, not center)
  applyHatchPatternToFace(cube, x, y, w, h) {
    const pattern = cube.pattern;
    
    this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
    this.ctx.lineWidth = 1;
    
    const spacing = 8;
    
    switch(pattern) {
      case 'dots':
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        for(let dx = 0; dx < w; dx += spacing) {
          for(let dy = 0; dy < h; dy += spacing) {
            this.ctx.fillRect(x + dx, y + dy, 2, 2);
          }
        }
        break;
        
      case 'dots-large':
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        for(let dx = 0; dx < w; dx += spacing * 1.5) {
          for(let dy = 0; dy < h; dy += spacing * 1.5) {
            this.ctx.fillRect(x + dx, y + dy, 3, 3);
          }
        }
        break;
        
      case 'diagonal':
        // Draw with proper bounds
        for(let i = 0; i <= w + h; i += spacing) {
          this.ctx.beginPath();
          this.ctx.moveTo(x + Math.max(0, i - h), y + Math.max(0, h - i));
          this.ctx.lineTo(x + Math.min(w, i), y + Math.min(h, h - i + w));
          this.ctx.stroke();
        }
        break;
        
      case 'diagonal-dense':
        // Draw with proper bounds
        for(let i = 0; i <= w + h; i += spacing/2) {
          this.ctx.beginPath();
          this.ctx.moveTo(x + Math.max(0, i - h), y + Math.max(0, h - i));
          this.ctx.lineTo(x + Math.min(w, i), y + Math.min(h, h - i + w));
          this.ctx.stroke();
        }
        break;
        
      case 'crosshatch':
        for(let i = 0; i < w; i += spacing) {
          this.ctx.beginPath();
          this.ctx.moveTo(x + i, y);
          this.ctx.lineTo(x + i - h, y + h);
          this.ctx.stroke();
          
          this.ctx.beginPath();
          this.ctx.moveTo(x + i, y + h);
          this.ctx.lineTo(x + i - h, y);
          this.ctx.stroke();
        }
        break;
        
      case 'crosshatch-dense':
        for(let i = 0; i < w; i += spacing/2) {
          this.ctx.beginPath();
          this.ctx.moveTo(x + i, y);
          this.ctx.lineTo(x + i - h, y + h);
          this.ctx.stroke();
          
          this.ctx.beginPath();
          this.ctx.moveTo(x + i, y + h);
          this.ctx.lineTo(x + i - h, y);
          this.ctx.stroke();
        }
        break;
        
      case 'horizontal':
        for(let i = 0; i < h; i += spacing) {
          this.ctx.beginPath();
          this.ctx.moveTo(x, y + i);
          this.ctx.lineTo(x + w, y + i);
          this.ctx.stroke();
        }
        break;
        
      case 'vertical':
        for(let i = 0; i < w; i += spacing) {
          this.ctx.beginPath();
          this.ctx.moveTo(x + i, y);
          this.ctx.lineTo(x + i, y + h);
          this.ctx.stroke();
        }
        break;
        
      case 'grid':
        for(let i = 0; i < h; i += spacing) {
          this.ctx.beginPath();
          this.ctx.moveTo(x, y + i);
          this.ctx.lineTo(x + w, y + i);
          this.ctx.stroke();
        }
        for(let i = 0; i < w; i += spacing) {
          this.ctx.beginPath();
          this.ctx.moveTo(x + i, y);
          this.ctx.lineTo(x + i, y + h);
          this.ctx.stroke();
        }
        break;
    }
  }
  
  // Apply retro hatch patterns (for straight-on view) - DEPRECATED, keeping for compatibility
  applyHatchPatternStraight(cube, x, y, w, h) {
    const pattern = cube.pattern;
    
    this.ctx.save();
    
    // CRITICAL: Clip FIRST before any drawing to contain patterns
    this.ctx.beginPath();
    this.ctx.rect(x - w/2, y, w, h);
    this.ctx.clip();
    
    this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    this.ctx.lineWidth = 1;
    
    const spacing = 8;
    
    switch(pattern) {
      case 'dots':
        for(let dx = 0; dx < w; dx += spacing) {
          for(let dy = 0; dy < h; dy += spacing) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.fillRect(x - w/2 + dx, y + dy, 2, 2);
          }
        }
        break;
        
      case 'dots-large':
        for(let dx = 0; dx < w; dx += spacing * 1.5) {
          for(let dy = 0; dy < h; dy += spacing * 1.5) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.fillRect(x - w/2 + dx, y + dy, 3, 3);
          }
        }
        break;
        
      case 'diagonal':
        for(let i = -h; i < w + h; i += spacing) {
          this.ctx.beginPath();
          this.ctx.moveTo(x - w/2 + i, y);
          this.ctx.lineTo(x - w/2 + i - h, y + h);
          this.ctx.stroke();
        }
        break;
        
      case 'diagonal-dense':
        for(let i = -h; i < w + h; i += spacing/2) {
          this.ctx.beginPath();
          this.ctx.moveTo(x - w/2 + i, y);
          this.ctx.lineTo(x - w/2 + i - h, y + h);
          this.ctx.stroke();
        }
        break;
        
      case 'crosshatch':
        for(let i = -h; i < w + h; i += spacing) {
          this.ctx.beginPath();
          this.ctx.moveTo(x - w/2 + i, y);
          this.ctx.lineTo(x - w/2 + i - h, y + h);
          this.ctx.stroke();
          
          this.ctx.beginPath();
          this.ctx.moveTo(x - w/2 + i, y + h);
          this.ctx.lineTo(x - w/2 + i - h, y);
          this.ctx.stroke();
        }
        break;
        
      case 'crosshatch-dense':
        for(let i = -h; i < w + h; i += spacing/2) {
          this.ctx.beginPath();
          this.ctx.moveTo(x - w/2 + i, y);
          this.ctx.lineTo(x - w/2 + i - h, y + h);
          this.ctx.stroke();
          
          this.ctx.beginPath();
          this.ctx.moveTo(x - w/2 + i, y + h);
          this.ctx.lineTo(x - w/2 + i - h, y);
          this.ctx.stroke();
        }
        break;
        
      case 'horizontal':
        for(let i = 0; i < h; i += spacing) {
          this.ctx.beginPath();
          this.ctx.moveTo(x - w/2, y + i);
          this.ctx.lineTo(x + w/2, y + i);
          this.ctx.stroke();
        }
        break;
        
      case 'vertical':
        for(let i = 0; i < w; i += spacing) {
          this.ctx.beginPath();
          this.ctx.moveTo(x - w/2 + i, y);
          this.ctx.lineTo(x - w/2 + i, y + h);
          this.ctx.stroke();
        }
        break;
        
      case 'grid':
        for(let i = 0; i < h; i += spacing) {
          this.ctx.beginPath();
          this.ctx.moveTo(x - w/2, y + i);
          this.ctx.lineTo(x + w/2, y + i);
          this.ctx.stroke();
        }
        for(let i = 0; i < w; i += spacing) {
          this.ctx.beginPath();
          this.ctx.moveTo(x - w/2 + i, y);
          this.ctx.lineTo(x - w/2 + i, y + h);
          this.ctx.stroke();
        }
        break;
    }
    
    this.ctx.restore();
  }
  
  // Apply retro hatch patterns
  applyHatchPattern(cube, x, y, w, h) {
    const pattern = cube.pattern;
    
    this.ctx.save();
    this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    this.ctx.lineWidth = 1;
    
    const spacing = 8;
    
    // Clip to top face
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + w, y - w/2);
    this.ctx.lineTo(x, y - w);
    this.ctx.lineTo(x - w, y - w/2);
    this.ctx.closePath();
    this.ctx.clip();
    
    switch(pattern) {
      case 'dots':
        for(let dx = -w; dx < w; dx += spacing) {
          for(let dy = -w; dy < w; dy += spacing) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.fillRect(x + dx, y + dy, 2, 2);
          }
        }
        break;
        
      case 'dots-large':
        for(let dx = -w; dx < w; dx += spacing * 1.5) {
          for(let dy = -w; dy < w; dy += spacing * 1.5) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.fillRect(x + dx, y + dy, 3, 3);
          }
        }
        break;
        
      case 'diagonal':
        for(let i = -w*2; i < w*2; i += spacing) {
          this.ctx.beginPath();
          this.ctx.moveTo(x - w + i, y - w/2);
          this.ctx.lineTo(x + w + i, y + w/2);
          this.ctx.stroke();
        }
        break;
        
      case 'diagonal-dense':
        for(let i = -w*2; i < w*2; i += spacing/2) {
          this.ctx.beginPath();
          this.ctx.moveTo(x - w + i, y - w/2);
          this.ctx.lineTo(x + w + i, y + w/2);
          this.ctx.stroke();
        }
        break;
        
      case 'crosshatch':
        for(let i = -w*2; i < w*2; i += spacing) {
          this.ctx.beginPath();
          this.ctx.moveTo(x - w + i, y - w/2);
          this.ctx.lineTo(x + w + i, y + w/2);
          this.ctx.stroke();
          
          this.ctx.beginPath();
          this.ctx.moveTo(x - w + i, y + w/2);
          this.ctx.lineTo(x + w + i, y - w/2);
          this.ctx.stroke();
        }
        break;
        
      case 'crosshatch-dense':
        for(let i = -w*2; i < w*2; i += spacing/2) {
          this.ctx.beginPath();
          this.ctx.moveTo(x - w + i, y - w/2);
          this.ctx.lineTo(x + w + i, y + w/2);
          this.ctx.stroke();
          
          this.ctx.beginPath();
          this.ctx.moveTo(x - w + i, y + w/2);
          this.ctx.lineTo(x + w + i, y - w/2);
          this.ctx.stroke();
        }
        break;
        
      case 'horizontal':
        for(let i = -w; i < w; i += spacing) {
          this.ctx.beginPath();
          this.ctx.moveTo(x - w, y - w/2 + i);
          this.ctx.lineTo(x + w, y - w/2 + i);
          this.ctx.stroke();
        }
        break;
        
      case 'vertical':
        for(let i = -w; i < w; i += spacing) {
          this.ctx.beginPath();
          this.ctx.moveTo(x + i, y - w);
          this.ctx.lineTo(x + i, y);
          this.ctx.stroke();
        }
        break;
        
      case 'grid':
        for(let i = -w; i < w; i += spacing) {
          this.ctx.beginPath();
          this.ctx.moveTo(x - w, y - w/2 + i);
          this.ctx.lineTo(x + w, y - w/2 + i);
          this.ctx.stroke();
          
          this.ctx.beginPath();
          this.ctx.moveTo(x + i, y - w);
          this.ctx.lineTo(x + i, y);
          this.ctx.stroke();
        }
        break;
    }
    
    this.ctx.restore();
  }
  
  adjustBrightness(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255))
      .toString(16).slice(1);
  }
  
  // Get cube at screen position (straight-on view)
  getCubeAtPosition(screenX, screenY) {
    // Check from front to back (reverse order for proper z-sorting)
    for (let i = this.cubes.length - 1; i >= 0; i--) {
      const cube = this.cubes[i];
      const { x: baseX, y: baseY } = this.gridToScreen(cube.gridX, cube.gridY, cube.stackHeight * this.cubeHeight);
      
      const w = cube.width * this.tileWidth * 0.3;
      const h = cube.height * this.cubeHeight * 0.4;
      const d = cube.depth * this.cubeDepth * 0.3;
      
      // Simple bounding box check
      if (screenX >= baseX - w/2 && screenX <= baseX + w/2 &&
          screenY >= baseY - h - d && screenY <= baseY) {
        return cube;
      }
    }
    return null;
  }
  
  // Event handlers
  handleMouseDown(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const cube = this.getCubeAtPosition(x, y);
    
    if (cube) {
      this.selectedCube = cube;
      this.isDragging = true;
      this.dragStartX = x;
      this.dragStartY = y;
      this.canvas.style.cursor = 'grabbing';
    } else {
      this.selectedCube = null;
    }
    
    this.render();
  }
  
  handleMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (this.isDragging && this.selectedCube) {
      const dx = x - this.dragStartX;
      const dy = y - this.dragStartY;
      
      // Direct 1:1 mapping for straight-on view
      this.selectedCube.gridX += dx / this.tileWidth;
      this.selectedCube.gridY += dy / this.cubeDepth;
      
      this.dragStartX = x;
      this.dragStartY = y;
      
      this.render();
    } else {
      const cube = this.getCubeAtPosition(x, y);
      if (cube !== this.hoveredCube) {
        this.hoveredCube = cube;
        this.canvas.style.cursor = cube ? 'grab' : 'default';
        this.render();
      }
    }
  }
  
  handleMouseUp(e) {
    this.isDragging = false;
    this.canvas.style.cursor = this.hoveredCube ? 'grab' : 'default';
  }
  
  handleWheel(e) {
    e.preventDefault();
    
    // Calculate table center position
    const tableLeft = 80;
    const tableRight = this.width - 340;
    const tableW = (tableRight - tableLeft) / 2;
    const tableCenterX = tableLeft + tableW;
    const tableCenterY = this.height - 180 - this.tableDepth / 2;
    
    // Zoom factor
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.zoom * zoomFactor));
    
    // Zoom towards table center instead of mouse position
    const zoomRatio = newZoom / this.zoom;
    this.offsetX = tableCenterX - (tableCenterX - this.offsetX) * zoomRatio;
    this.offsetY = tableCenterY - (tableCenterY - this.offsetY) * zoomRatio;
    
    this.zoom = newZoom;
    this.render();
  }
  
  // Touch handlers for pinch zoom
  handleTouchStart(e) {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      this.lastTouchDistance = Math.sqrt(dx * dx + dy * dy);
    }
  }
  
  handleTouchMove(e) {
    if (e.touches.length === 2 && this.lastTouchDistance) {
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      const zoomFactor = distance / this.lastTouchDistance;
      this.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.zoom * zoomFactor));
      this.lastTouchDistance = distance;
      
      this.render();
    }
  }
  
  handleTouchEnd(e) {
    if (e.touches.length < 2) {
      this.lastTouchDistance = null;
    }
  }
  
  // Update statistics
  updateStats() {
    this.stats.cubeCount = this.cubes.length;
    this.stats.totalNSF = this.cubes.reduce((sum, cube) => sum + cube.room.nsf, 0);
    // DGSF calculated with NTDG factors would go here
  }
  
  // Draw the elevated tabletop workbench (straight-on elevated view)
  drawTable() {
    this.ctx.save();
    
    // Position table in bottom-left area, filling to legend and stats
    const tableLeft = 80;  // Leave margin on left
    const tableRight = this.width - 340; // Leave room for legend (300px + margin)
    const tableW = (tableRight - tableLeft) / 2;
    const centerX = tableLeft + tableW;
    
    const tableD = this.tableDepth;  // Much deeper visible surface
    const tableH = this.tableHeight;
    const thickness = this.tableThickness;
    
    // Position near bottom, leaving room for stats overlay at top
    const tableTop = this.height - 180;
    
    // Draw white wall background (behind everything)
    this.ctx.fillStyle = '#f5f5f0';
    this.ctx.fillRect(0, 0, this.width, tableTop);
    
    // Draw wood floor below table
    const floorGradient = this.ctx.createLinearGradient(0, tableTop, 0, this.height);
    floorGradient.addColorStop(0, '#5a4a3a');
    floorGradient.addColorStop(0.5, '#6b5646');
    floorGradient.addColorStop(1, '#4a3a2a');
    this.ctx.fillStyle = floorGradient;
    this.ctx.fillRect(0, tableTop, this.width, this.height - tableTop);
    
    // Floor wood planks (vertical)
    this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
    this.ctx.lineWidth = 2;
    for (let x = 80; x < this.width; x += 80) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, tableTop);
      this.ctx.lineTo(x, this.height);
      this.ctx.stroke();
    }
    
    // Draw table legs (4 corners, thick wooden style)
    const legWidth = 30; // Much thicker
    const legPositions = [
      { x: centerX - tableW + 50, y: tableTop },           // Front-left
      { x: centerX + tableW - 50, y: tableTop },           // Front-right
      { x: centerX - tableW + 50, y: tableTop - tableD },  // Back-left
      { x: centerX + tableW - 50, y: tableTop - tableD }   // Back-right
    ];
    
    legPositions.forEach(leg => {
      // Leg (wood color)
      this.ctx.fillStyle = '#8b6f47';
      this.ctx.fillRect(leg.x - legWidth/2, leg.y, legWidth, tableH - 150);
      
      // Leg highlight (left edge)
      this.ctx.fillStyle = '#a67c52';
      this.ctx.fillRect(leg.x - legWidth/2, leg.y, 6, tableH - 150);
      
      // Leg shadow (right edge)
      this.ctx.fillStyle = '#6b5535';
      this.ctx.fillRect(leg.x + legWidth/2 - 6, leg.y, 6, tableH - 150);
      
      // Wood grain on legs
      this.ctx.strokeStyle = 'rgba(107, 85, 53, 0.3)';
      this.ctx.lineWidth = 1;
      for (let i = 0; i < tableH - 150; i += 20) {
        this.ctx.beginPath();
        this.ctx.moveTo(leg.x - legWidth/2 + 5, leg.y + i);
        this.ctx.lineTo(leg.x + legWidth/2 - 5, leg.y + i);
        this.ctx.stroke();
      }
    });
    
    // Front face (thickness edge) - DRAW AFTER LEGS, BEFORE TABLETOP
    const cornerRadius = 20;
    const edgeHeight = 20; // How tall the visible edge is
    
    this.ctx.fillStyle = '#a67c52';
    this.ctx.beginPath();
    // Start at top-left (extends above to slip under)
    this.ctx.moveTo(centerX - tableW, tableTop - thickness - edgeHeight);
    // Curve at top-left (horizontal curve)
    this.ctx.arcTo(
      centerX - tableW, tableTop - thickness - edgeHeight + cornerRadius,
      centerX - tableW + cornerRadius, tableTop - thickness - edgeHeight + cornerRadius,
      cornerRadius
    );
    // Top edge (with curves)
    this.ctx.lineTo(centerX + tableW - cornerRadius, tableTop - thickness - edgeHeight + cornerRadius);
    // Curve at top-right (horizontal curve)
    this.ctx.arcTo(
      centerX + tableW, tableTop - thickness - edgeHeight + cornerRadius,
      centerX + tableW, tableTop - thickness - edgeHeight,
      cornerRadius
    );
    // Right side down to where bottom curve starts
    this.ctx.lineTo(centerX + tableW, tableTop - cornerRadius);
    // Curve at bottom-right (vertical curve)
    this.ctx.arcTo(
      centerX + tableW, tableTop,
      centerX + tableW - cornerRadius, tableTop,
      cornerRadius
    );
    // Bottom edge (hidden under table)
    this.ctx.lineTo(centerX - tableW + cornerRadius, tableTop);
    // Curve at bottom-left (vertical curve)
    this.ctx.arcTo(
      centerX - tableW, tableTop,
      centerX - tableW, tableTop - cornerRadius,
      cornerRadius
    );
    // Left side back up
    this.ctx.lineTo(centerX - tableW, tableTop - thickness - edgeHeight);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.strokeStyle = '#8b6f47';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    
    // Draw tabletop surface (straight-on elevated view)
    // Top face (deep rectangle showing more surface) - with rounded corners
    this.ctx.beginPath();
    
    // Top-left corner
    this.ctx.moveTo(centerX - tableW + cornerRadius, tableTop - thickness - tableD);
    this.ctx.arcTo(
      centerX - tableW, tableTop - thickness - tableD,
      centerX - tableW, tableTop - thickness - tableD + cornerRadius,
      cornerRadius
    );
    
    // Left edge to bottom-left corner
    this.ctx.lineTo(centerX - tableW, tableTop - thickness - cornerRadius);
    this.ctx.arcTo(
      centerX - tableW, tableTop - thickness,
      centerX - tableW + cornerRadius, tableTop - thickness,
      cornerRadius
    );
    
    // Bottom edge to bottom-right corner
    this.ctx.lineTo(centerX + tableW - cornerRadius, tableTop - thickness);
    this.ctx.arcTo(
      centerX + tableW, tableTop - thickness,
      centerX + tableW, tableTop - thickness - cornerRadius,
      cornerRadius
    );
    
    // Right edge to top-right corner
    this.ctx.lineTo(centerX + tableW, tableTop - thickness - tableD + cornerRadius);
    this.ctx.arcTo(
      centerX + tableW, tableTop - thickness - tableD,
      centerX + tableW - cornerRadius, tableTop - thickness - tableD,
      cornerRadius
    );
    
    // Top edge back to start
    this.ctx.lineTo(centerX - tableW + cornerRadius, tableTop - thickness - tableD);
    this.ctx.closePath();
    
    // Wood grain texture color
    const gradient = this.ctx.createLinearGradient(centerX - tableW/2, tableTop - tableD, centerX - tableW/2, tableTop);
    gradient.addColorStop(0, '#b88550');
    gradient.addColorStop(0.5, '#c9965f');
    gradient.addColorStop(1, '#d4a574');
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
    
    // Top edge outline
    this.ctx.strokeStyle = '#8b6f47';
    this.ctx.lineWidth = 3;
    this.ctx.stroke();
    
    // Wood plank details - simulate planks running horizontally (side to side)
    const plankDepth = 100; // Depth of each plank
    this.ctx.strokeStyle = 'rgba(139, 111, 71, 0.3)';
    this.ctx.lineWidth = 2;
    
    // Horizontal plank seams (running left to right)
    for (let i = plankDepth; i < tableD; i += plankDepth) {
      this.ctx.beginPath();
      this.ctx.moveTo(centerX - tableW + 10, tableTop - thickness - i);
      this.ctx.lineTo(centerX + tableW - 10, tableTop - thickness - i);
      this.ctx.stroke();
    }
    
    // Add subtle wood grain texture within planks
    this.ctx.strokeStyle = 'rgba(139, 111, 71, 0.15)';
    this.ctx.lineWidth = 1;
    for (let i = 0; i < tableD; i += plankDepth) {
      // Random grain lines in each plank
      for (let j = 0; j < 4; j++) {
        const offset = Math.random() * plankDepth;
        const grainX = centerX - tableW + 40 + j * (tableW * 2 - 80) / 4;
        this.ctx.beginPath();
        this.ctx.moveTo(grainX, tableTop - thickness - i - offset);
        this.ctx.lineTo(grainX + 30 + Math.random() * 20, tableTop - thickness - i - offset);
        this.ctx.stroke();
      }
    }
    
    // SCENE DECORATIONS
    
    // Houseplant ON THE TABLE (top-left/back-left corner)
    this.drawHouseplant(centerX - tableW + 80, tableTop - thickness - tableD + 60);
    
    // Draw floor lamp LAST (so it renders in front) - tall floor-standing lamp illuminating back-right
    this.drawFloorLamp(tableRight + 40, tableTop + 150, tableTop - tableD - 200);
    
    this.ctx.restore();
  }
  
  // Draw a saguaro cactus (desert cactus with arms)
  drawHouseplant(x, y) {
    this.ctx.save();
    
    // Pot (terracotta)
    this.ctx.fillStyle = '#d4704a';
    this.ctx.fillRect(x - 35, y, 70, 50);
    this.ctx.fillStyle = '#b85c3a';
    this.ctx.fillRect(x - 28, y + 8, 56, 35);
    
    // Pot rim
    this.ctx.fillStyle = '#e88060';
    this.ctx.fillRect(x - 38, y - 5, 76, 5);
    
    // Cactus color
    const cactusGreen = '#6b9b6e';
    const cactusHighlight = '#7fb082';
    const cactusShadow = '#5a8a5d';
    
    // Main trunk (tall cylinder)
    const trunkWidth = 30;
    const trunkHeight = 120;
    this.ctx.fillStyle = cactusGreen;
    this.ctx.fillRect(x - trunkWidth/2, y - trunkHeight, trunkWidth, trunkHeight);
    
    // Trunk highlights (vertical ridges)
    this.ctx.fillStyle = cactusHighlight;
    this.ctx.fillRect(x - trunkWidth/2 + 5, y - trunkHeight, 4, trunkHeight);
    this.ctx.fillRect(x + trunkWidth/2 - 9, y - trunkHeight, 4, trunkHeight);
    
    // Trunk shadows
    this.ctx.fillStyle = cactusShadow;
    this.ctx.fillRect(x - 2, y - trunkHeight, 4, trunkHeight);
    
    // Left arm (curves up from trunk)
    this.ctx.fillStyle = cactusGreen;
    // Horizontal part
    this.ctx.fillRect(x - trunkWidth/2 - 35, y - 70, 35, 20);
    // Vertical part
    this.ctx.fillRect(x - trunkWidth/2 - 35, y - 110, 20, 40);
    // Arm highlights
    this.ctx.fillStyle = cactusHighlight;
    this.ctx.fillRect(x - trunkWidth/2 - 32, y - 108, 4, 36);
    
    // Right arm (curves up from trunk)
    this.ctx.fillStyle = cactusGreen;
    // Horizontal part
    this.ctx.fillRect(x + trunkWidth/2, y - 50, 30, 18);
    // Vertical part  
    this.ctx.fillRect(x + trunkWidth/2 + 12, y - 90, 18, 40);
    // Arm highlights
    this.ctx.fillStyle = cactusHighlight;
    this.ctx.fillRect(x + trunkWidth/2 + 15, y - 88, 4, 36);
    
    // Add some spines (small white dots)
    this.ctx.fillStyle = '#f0f0e8';
    for (let i = 0; i < 20; i++) {
      const sx = x - trunkWidth/2 + Math.random() * trunkWidth;
      const sy = y - Math.random() * trunkHeight;
      this.ctx.fillRect(sx, sy, 2, 2);
    }
    
    this.ctx.restore();
  }
  
  // Draw a tall floor-standing lamp (like an architect's lamp)
  drawFloorLamp(x, floorY, lampHeadY) {
    this.ctx.save();
    
    // Base (pixel-art circular base using rectangles)
    const baseColor = '#2a2a3e';
    const baseHighlight = '#3a3a4e';
    const baseShadow = '#1a1a2e';
    
    // Base bottom layer (darkest)
    this.ctx.fillStyle = baseShadow;
    this.ctx.fillRect(x - 25, floorY + 5, 50, 8);
    
    // Base middle layer
    this.ctx.fillStyle = baseColor;
    this.ctx.fillRect(x - 30, floorY, 60, 5);
    this.ctx.fillRect(x - 20, floorY - 3, 40, 3);
    
    // Base top highlight
    this.ctx.fillStyle = baseHighlight;
    this.ctx.fillRect(x - 15, floorY - 5, 30, 2);
    
    // Main pole (pixel-art vertical column)
    const poleHeight = floorY - lampHeadY - 40;
    const poleWidth = 8;
    
    // Pole shadow side
    this.ctx.fillStyle = baseShadow;
    this.ctx.fillRect(x + 2, floorY - 5, 4, -poleHeight);
    
    // Pole main color
    this.ctx.fillStyle = baseColor;
    this.ctx.fillRect(x - 4, floorY - 5, 6, -poleHeight);
    
    // Pole highlight
    this.ctx.fillStyle = baseHighlight;
    this.ctx.fillRect(x - 4, floorY - 5, 2, -poleHeight);
    
    // Articulated arm - pixel style with segments
    const armY = lampHeadY + 40;
    const armWidth = 6;
    
    // Joint at pole top
    this.ctx.fillStyle = baseShadow;
    this.ctx.fillRect(x - 6, armY - 6, 12, 12);
    this.ctx.fillStyle = baseHighlight;
    this.ctx.fillRect(x - 4, armY - 4, 4, 4);
    
    // First arm segment (horizontal-ish)
    this.ctx.fillStyle = baseShadow;
    this.ctx.fillRect(x - 80, armY - 30 + 2, 80, armWidth);
    this.ctx.fillStyle = baseColor;
    this.ctx.fillRect(x - 80, armY - 30, 80, armWidth - 2);
    this.ctx.fillStyle = baseHighlight;
    this.ctx.fillRect(x - 80, armY - 30, 80, 2);
    
    // Middle joint
    this.ctx.fillStyle = baseShadow;
    this.ctx.fillRect(x - 86, armY - 36, 12, 12);
    this.ctx.fillStyle = baseHighlight;
    this.ctx.fillRect(x - 84, armY - 34, 4, 4);
    
    // Second arm segment (angled down to lamp head)
    const armEndX = x - 180;
    const armEndY = lampHeadY + 10;
    this.ctx.fillStyle = baseShadow;
    this.ctx.fillRect(armEndX, armY - 30 + 2, 100, armWidth);
    this.ctx.fillStyle = baseColor;
    this.ctx.fillRect(armEndX, armY - 30, 100, armWidth - 2);
    this.ctx.fillStyle = baseHighlight;
    this.ctx.fillRect(armEndX, armY - 30, 100, 2);
    
    // Lampshade connection joint
    this.ctx.fillStyle = baseShadow;
    this.ctx.fillRect(armEndX - 6, armEndY - 6, 12, 12);
    this.ctx.fillStyle = baseHighlight;
    this.ctx.fillRect(armEndX - 4, armEndY - 4, 4, 4);
    
    // Lampshade (pixel-art bell shape pointing down)
    const lampX = armEndX;
    const shadeColor = '#feca57';
    const shadeHighlight = '#ffe87c';
    const shadeShadow = '#e8b647';
    const shadeHeight = 80;
    
    // Shade top (narrow attachment point)
    this.ctx.fillStyle = shadeShadow;
    this.ctx.fillRect(lampX - 20, lampHeadY, 40, 8);
    this.ctx.fillStyle = shadeColor;
    this.ctx.fillRect(lampX - 18, lampHeadY + 2, 36, 4);
    
    // Shade upper section (expanding)
    this.ctx.fillStyle = shadeShadow;
    this.ctx.fillRect(lampX - 30, lampHeadY + 8, 60, 12);
    this.ctx.fillStyle = shadeColor;
    this.ctx.fillRect(lampX - 28, lampHeadY + 10, 56, 8);
    this.ctx.fillStyle = shadeHighlight;
    this.ctx.fillRect(lampX - 28, lampHeadY + 10, 8, 8);
    
    // Shade middle section
    this.ctx.fillStyle = shadeShadow;
    this.ctx.fillRect(lampX - 45, lampHeadY + 20, 90, 20);
    this.ctx.fillStyle = shadeColor;
    this.ctx.fillRect(lampX - 43, lampHeadY + 22, 86, 16);
    this.ctx.fillStyle = shadeHighlight;
    this.ctx.fillRect(lampX - 43, lampHeadY + 22, 12, 16);
    
    // Shade lower section
    this.ctx.fillStyle = shadeShadow;
    this.ctx.fillRect(lampX - 55, lampHeadY + 40, 110, 25);
    this.ctx.fillStyle = shadeColor;
    this.ctx.fillRect(lampX - 53, lampHeadY + 42, 106, 21);
    this.ctx.fillStyle = shadeHighlight;
    this.ctx.fillRect(lampX - 53, lampHeadY + 42, 14, 21);
    
    // Shade bottom opening (widest part)
    this.ctx.fillStyle = shadeShadow;
    this.ctx.fillRect(lampX - 65, lampHeadY + 65, 130, 15);
    this.ctx.fillStyle = shadeColor;
    this.ctx.fillRect(lampX - 63, lampHeadY + 67, 126, 11);
    
    // Bottom rim highlight (light spilling out)
    this.ctx.fillStyle = '#fff5d4';
    this.ctx.fillRect(lampX - 60, lampHeadY + 75, 120, 5);
    
    // Draw light glow (so it appears to come from the lamp) - wider and softer
    const lightCenterY = lampHeadY + 240;
    const gradient = this.ctx.createRadialGradient(lampX, lightCenterY, 0, lampX, lightCenterY, 450);
    gradient.addColorStop(0, 'rgba(254, 202, 87, 0.25)');
    gradient.addColorStop(0.3, 'rgba(254, 202, 87, 0.15)');
    gradient.addColorStop(1, 'rgba(254, 202, 87, 0)');
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(lampX, lightCenterY, 450, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Bright spot directly on table
    const spotGradient = this.ctx.createRadialGradient(lampX, lightCenterY, 0, lampX, lightCenterY, 150);
    spotGradient.addColorStop(0, 'rgba(254, 202, 87, 0.4)');
    spotGradient.addColorStop(1, 'rgba(254, 202, 87, 0)');
    this.ctx.fillStyle = spotGradient;
    this.ctx.beginPath();
    this.ctx.arc(lampX, lightCenterY, 150, 0, Math.PI * 2);
    this.ctx.fill();
    
    this.ctx.restore();
  }
  
  // Render everything
  render() {
    // Clear canvas with retro grid background
    this.ctx.fillStyle = '#1a1a2e';
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    // Draw the elevated workbench table
    this.drawTable();
    
    // Draw subtle grid on tabletop (not background)
    // this.drawGrid(); // Disabled - table surface is the grid now
    
    // Sort cubes by depth for proper rendering
    const sorted = [...this.cubes].sort((a, b) => {
      const depthA = a.gridX + a.gridY;
      const depthB = b.gridX + b.gridY;
      return depthA - depthB;
    });
    
    // Debug log
    if (sorted.length > 0 && !this.hasLoggedCubes) {
      console.log(`Rendering ${sorted.length} cubes`);
      console.log('First cube:', sorted[0]);
      this.hasLoggedCubes = true;
    }
    
    // Draw all cubes
    for (const cube of sorted) {
      const isHovered = cube === this.hoveredCube;
      const isSelected = cube === this.selectedCube;
      this.drawCube(cube, isHovered, isSelected);
    }
    
    // Draw stats overlay
    this.drawStatsOverlay();
  }
  
  drawGrid() {
    this.ctx.save();
    this.ctx.fillStyle = 'rgba(100, 200, 255, 0.1)';
    this.ctx.strokeStyle = 'rgba(100, 200, 255, 0.1)';
    this.ctx.lineWidth = 1;
    
    for (let i = -this.gridSize; i <= this.gridSize; i++) {
      for (let j = -this.gridSize; j <= this.gridSize; j++) {
        const { x, y } = this.isoToScreen(i, j);
        
        // Draw small grid markers
        this.ctx.beginPath();
        this.ctx.arc(x, y, 1, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }
    
    this.ctx.restore();
  }
  
  drawStatsOverlay() {
    this.ctx.save();
    
    // Retro terminal-style overlay
    const padding = 16;
    const boxWidth = 280;
    const boxHeight = 120;
    
    // Background
    this.ctx.fillStyle = 'rgba(26, 26, 46, 0.9)';
    this.ctx.fillRect(padding, padding, boxWidth, boxHeight);
    
    // Border
    this.ctx.strokeStyle = '#64c8ff';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(padding, padding, boxWidth, boxHeight);
    
    // Text
    this.ctx.fillStyle = '#64c8ff';
    this.ctx.font = '12px "Courier New", monospace';
    
    const lines = [
      '╔════════════════════════════╗',
      '║  WORKBENCH v1.0  [ACTIVE] ║',
      '╠════════════════════════════╣',
      `║  CUBES: ${this.stats.cubeCount.toString().padStart(4, ' ')}               ║`,
      `║  TOTAL NSF: ${this.stats.totalNSF.toLocaleString().padStart(10, ' ')}     ║`,
      '║                            ║',
      '║  [DRAG] Move  [CLICK] Info ║',
      '╚════════════════════════════╝'
    ];
    
    let yPos = padding + 20;
    for (const line of lines) {
      this.ctx.fillText(line, padding + 8, yPos);
      yPos += 14;
    }
    
    this.ctx.restore();
  }
  
  // Load rooms from current project
  loadFromProject(departments) {
    this.cubes = [];
    
    if (!departments || departments.length === 0) {
      console.log('No project data, showing demo cubes');
      this.addDemoCubes();
      this.render();
      return;
    }
    
    // Organize cubes by department and functional area
    let deptStartX = -8;
    let deptStartY = -8;
    
    departments.forEach((dept, deptIndex) => {
      if (!dept.rooms || dept.rooms.length === 0) return;
      
      // Group rooms by functional area
      const faGroups = {};
      dept.rooms.forEach(room => {
        const fa = room.functional_area || 'Other';
        if (!faGroups[fa]) faGroups[fa] = [];
        faGroups[fa].push(room);
      });
      
      // Layout functional areas within department
      let faX = deptStartX;
      let faY = deptStartY;
      let maxFAHeight = 0;
      
      Object.entries(faGroups).forEach(([faName, rooms]) => {
        let roomX = faX;
        let roomY = faY;
        let faMaxX = faX;
        
        // Place rooms in this functional area - touching sides
        rooms.forEach((room, idx) => {
          this.addCube(room, dept.name, roomX, roomY);
          
          roomX += 1; // Cubes touching side-by-side
          if (roomX - faX > 5) { // Max width per functional area
            roomX = faX;
            roomY += 1; // Cubes touching front-to-back
          }
          faMaxX = Math.max(faMaxX, roomX);
        });
        
        // Move to next functional area position
        faX = faMaxX + 1.5; // Small gap between functional areas
        maxFAHeight = Math.max(maxFAHeight, roomY - deptStartY);
        
        if (faX - deptStartX > 10) { // Wrap to next row of functional areas
          faX = deptStartX;
          faY += maxFAHeight + 1.5;
        }
      });
      
      // Move to next department position
      deptStartY += maxFAHeight + 3; // Gap between departments
    });
    
    console.log(`Loaded ${this.cubes.length} cubes from project`);
    this.render();
  }
  
  // Auto-arrange cubes by functional area
  autoArrange() {
    // Group by functional area
    const faGroups = {};
    
    this.cubes.forEach(cube => {
      const fa = cube.room.functional_area;
      if (!faGroups[fa]) faGroups[fa] = [];
      faGroups[fa].push(cube);
    });
    
    let gridX = -5; // Start more centered
    let gridY = 0;
    
    Object.keys(faGroups).forEach(fa => {
      faGroups[fa].forEach(cube => {
        cube.gridX = gridX;
        cube.gridY = gridY;
        gridX += 2;
        if (gridX > 10) {
          gridX = -5;
          gridY += 2;
        }
      });
      
      // Space between functional areas
      gridY += 3;
      gridX = -5;
    });
    
    this.zoomToFit();
    this.render();
  }
  
  // Zoom to fit all cubes on screen
  zoomToFit() {
    if (this.cubes.length === 0) {
      this.zoom = 1.0;
      return;
    }
    
    // Calculate bounding box
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    
    this.cubes.forEach(cube => {
      const { x, y } = this.gridToScreen(cube.gridX, cube.gridY, 0);
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    });
    
    // Add padding
    const padding = 100;
    const width = maxX - minX + padding * 2;
    const height = maxY - minY + padding * 2;
    
    // Calculate zoom to fit
    const scaleX = (this.width * 0.6) / width; // Leave room for UI
    const scaleY = (this.height * 0.6) / height;
    this.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, Math.min(scaleX, scaleY)));
  }
  // Toggle between elevation and isometric views
  toggleViewMode() {
    this.viewMode = this.viewMode === 'elevation' ? 'isometric' : 'elevation';
    
    if (this.viewMode === 'isometric') {
      // Switch to 45/45 isometric view
      this.tileWidth = 64;
      this.tileHeight = 32;
      this.cubeHeight = 48;
      this.cubeDepth = 32;
    } else {
      // Switch back to elevation view
      this.tileWidth = 80;
      this.tileHeight = 80;
      this.cubeDepth = 40;
      this.cubeHeight = 60;
    }
    
    this.render();
  }
}

// Export for use in main app
window.IsometricWorkbench = IsometricWorkbench;
