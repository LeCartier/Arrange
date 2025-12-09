import re
import csv
import os

def parse_finishes(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split into lines
    lines = content.split('\n')
    
    rooms = []
    current_room = {}
    buffer = []
    
    # Regex for Room ID (start of block) - e.g., "1016" or "1016 " at start of line
    # But be careful not to match "100" in "Chapter 100"
    # IDs seem to be 4 digits, starting with 1, 2, 3, 4?
    # Let's look at the file again. IDs are sequential numbers in the chapter?
    # 1015, 1016, 1017...
    
    id_pattern = re.compile(r'^\d{4}\s*$')
    # Regex for Chapter Header
    chapter_pattern = re.compile(r'^Chapter\s+(\d+)', re.IGNORECASE)
    # Regex for Functional Area Header (e.g., "FA1: Medical / Surgical Inpatient Unit Calculation")
    fa_pattern = re.compile(r'^FA(\d+):\s*(.+)', re.IGNORECASE)
    current_chapter = "Unknown"
    current_fa_number = ""
    current_fa_name = ""
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Check for Chapter Header
        chapter_match = chapter_pattern.match(line)
        if chapter_match:
            current_chapter = chapter_match.group(1)
            # Reset FA info when chapter changes
            current_fa_number = ""
            current_fa_name = ""
            continue
        
        # Check for Functional Area Header
        fa_match = fa_pattern.match(line)
        if fa_match:
            current_fa_number = fa_match.group(1)
            current_fa_name = fa_match.group(2).strip()
            continue
            
        # Check if line is a Room ID
        if id_pattern.match(line):
            # Process previous room buffer
            if current_room and buffer:
                process_room_buffer(current_room, buffer)
                rooms.append(current_room)
            
            # Start new room
            current_room = {
                'id': line, 
                'chapter': current_chapter,
                'fa_number': current_fa_number,
                'fa_name': current_fa_name
            }
            buffer = []
        else:
            if current_room:
                buffer.append(line)
    
    # Process last room
    if current_room and buffer:
        process_room_buffer(current_room, buffer)
        rooms.append(current_room)
        
    return rooms

def process_room_buffer(room, buffer):
    # Join buffer into a single string
    full_text = ' '.join(buffer)
    
    # Extract Room Code (5 chars usually, e.g., WRC01, TLTU1)
    # Sometimes followed by Space Name
    # Pattern: Start of string -> Code -> Space Name -> m:...
    
    # Regex to find the first "m:" or "hw:" to separate metadata from finishes
    match = re.search(r'\s(m:|hw:)', full_text)
    if match:
        meta_part = full_text[:match.start()]
        finish_part = full_text[match.start():]
    else:
        meta_part = full_text
        finish_part = ""
        
    # Parse Meta Part
    # First token is usually Room Code
    tokens = meta_part.strip().split()
    if tokens:
        room['code'] = tokens[0]
        room['name'] = ' '.join(tokens[1:])
    
    # Parse Finishes
    # We need to split by fields.
    # Fields: Floor, Base, Wall, Wain, Ceiling, Door, HW
    # This is hard because they all use "m:".
    # But we know the order: Floor -> Base -> Wall -> Wain -> Ceiling -> Door -> HW
    
    # Strategy: Tokenize by "m:" and "hw:"
    # But "m:" is a prefix.
    
    # Let's try to identify specific material types to guess the field
    # Floor: CPT, LVT, RES, SC, CT, ET, VCT, SV, RS, RT, AF, CN, EP, SC, TER
    # Base: RB, PRB, RES, CT, VB, W, TER
    # Wall: GWB, CMU, CT, WP, PL, GL, AWP
    # Wain: PT, CT, WP, PL, GL, AWP, RES (often has h: height)
    # Ceiling: AT, GWB, EXP, PL, GL, AWP
    # Door: Wood, HM, Alum, G, S, A
    
    # This is still ambiguous (e.g. CT is in Floor, Base, Wall, Wain).
    
    # Alternative: The text file layout might have preserved some order if we didn't join lines.
    # But lines were broken arbitrarily.
    
    # Let's look at the "hw:" part. That's definitely Hardware.
    hw_split = finish_part.split('hw:')
    if len(hw_split) > 1:
        room['hardware'] = 'hw:' + hw_split[1].strip()
        finish_part = hw_split[0]
    
    # Now we have Floor...Door
    # Let's try to split by "m:" but keep the "m:"
    parts = re.split(r'(m:)', finish_part)
    # parts = ['', 'm:', 'CPT [6] ', 'm:', 'LVT ', ...]
    
    # Reconstruct segments
    segments = []
    current_segment = ""
    for p in parts:
        if p == 'm:':
            if current_segment:
                segments.append(current_segment.strip())
            current_segment = "m:"
        else:
            current_segment += p
    if current_segment:
        segments.append(current_segment.strip())
        
    # Now we have a list of material specs. e.g. ['m:CPT [6]', 'm:LVT', 'm:PRB [8]', ...]
    # We need to bucket them into Floor, Base, Wall, Wain, Ceiling, Door.
    
    # Heuristics
    floor_mats = ['CPT', 'LVT', 'RES', 'SC', 'CT', 'ET', 'VCT', 'SV', 'RS', 'RT', 'AF', 'CN', 'EP', 'TER', 'PT'] # PT can be floor (Porcelain Tile)
    base_mats = ['RB', 'PRB', 'VB', 'W'] # CT, RES, TER can be base too
    wall_mats = ['GWB', 'CMU', 'WP', 'PL', 'GL', 'AWP'] # CT, RES can be wall
    ceil_mats = ['AT', 'EXP'] # GWB, PL, GL, AWP can be ceiling
    door_mats = ['Wood', 'HM', 'Alum', 'G', 'S', 'A']
    
    # We can also look for "f:" (Finish), "t:" (Type), "dg:" (Door Glazing), "s:" (Sound?), "h:" (Height)
    
    # Let's try to assign based on sequence and keywords.
    # Sequence: Floor -> Base -> Wall -> Wain -> Ceiling -> Door
    
    # State machine?
    # 0: Floor
    # 1: Base
    # 2: Wall
    # 3: Wain
    # 4: Ceiling
    # 5: Door
    
    current_state = 0
    
    room['floor'] = []
    room['base'] = []
    room['wall'] = []
    room['wain'] = []
    room['ceiling'] = []
    room['door'] = []
    
    for seg in segments:
        if not seg.strip():
            continue
            
        # Check for Door specific keys
        if 'dg:' in seg or 's:' in seg or 't:' in seg or any(dm in seg for dm in ['m:Wood', 'm:HM', 'm:Alum']):
            current_state = 5 # Jump to Door
        elif 'm:AT' in seg:
            current_state = 4 # Jump to Ceiling
        elif 'h:' in seg and current_state < 3:
             # Height usually implies Base or Wain
             # If we are in Floor (0), maybe it's Base (1)?
             # But Base usually has m:RB or m:PRB.
             pass
             
        # Refine state based on material
        mat_code = seg.split()[0].replace('m:', '')
        
        if current_state == 0: # Floor
            if mat_code in ['RB', 'PRB', 'VB']: # Definitely Base
                current_state = 1
            elif mat_code in ['GWB', 'CMU', 'WP', 'PL', 'GL', 'AWP'] and 'f:' in seg: # Likely Wall
                current_state = 2
            elif mat_code == 'AT': # Ceiling
                current_state = 4
                
        if current_state == 1: # Base
            if mat_code in ['GWB', 'CMU', 'WP', 'PL', 'GL', 'AWP']: # Wall
                current_state = 2
            elif mat_code == 'AT': # Ceiling
                current_state = 4
                
        if current_state == 2: # Wall
            # Wainscot is tricky, it often looks like Wall or Base materials (CT, RES) with height
            if 'h:' in seg and mat_code in ['PT', 'CT', 'RES', 'WP']:
                current_state = 3
            elif mat_code == 'AT':
                current_state = 4
                
        if current_state == 3: # Wain
            if mat_code == 'AT':
                current_state = 4
            elif mat_code in ['GWB'] and 'f:' in seg: # Back to Wall? Unlikely.
                pass
                
        if current_state == 4: # Ceiling
            if any(dm in seg for dm in ['m:Wood', 'm:HM', 'm:Alum']):
                current_state = 5
                
        # Assign to current state
        if current_state == 0: room['floor'].append(seg)
        elif current_state == 1: room['base'].append(seg)
        elif current_state == 2: room['wall'].append(seg)
        elif current_state == 3: room['wain'].append(seg)
        elif current_state == 4: room['ceiling'].append(seg)
        elif current_state == 5: room['door'].append(seg)

def main():
    input_file = r'c:\Users\carte\OneDrive - FFE Inc\Documents\Arrange\src\Door and Finish Criteria.txt'
    rooms = parse_finishes(input_file)
    
    print(f"Parsed {len(rooms)} rooms.")
    if rooms:
        print("Sample Room 1:", rooms[0])
        print("Sample Room 2:", rooms[1])
        
    # Write to new TSV
    output_path = r'c:\Users\carte\OneDrive - FFE Inc\Documents\Arrange\src\room_finishes.tsv'
    
    fieldnames = ['Chapter', 'FA Number', 'FA Name', 'Room ID', 'Room Code', 'Room Name', 'Floor', 'Base', 'Wall', 'Wain', 'Ceiling', 'Door', 'Hardware']
    
    with open(output_path, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, delimiter='\t')
        writer.writeheader()
        
        for room in rooms:
            row = {
                'Chapter': room.get('chapter', ''),
                'FA Number': room.get('fa_number', ''),
                'FA Name': room.get('fa_name', ''),
                'Room ID': room.get('id', ''),
                'Room Code': room.get('code', ''),
                'Room Name': room.get('name', ''),
                'Floor': ' '.join(room.get('floor', [])),
                'Base': ' '.join(room.get('base', [])),
                'Wall': ' '.join(room.get('wall', [])),
                'Wain': ' '.join(room.get('wain', [])),
                'Ceiling': ' '.join(room.get('ceiling', [])),
                'Door': ' '.join(room.get('door', [])),
                'Hardware': room.get('hardware', '')
            }
            writer.writerow(row)
            
    print(f"Wrote {len(rooms)} rooms to {output_path}")

if __name__ == '__main__':
    main()
