# Generate comprehensive room-sizes.js with all attributes
#
# DATA SOURCE HIERARCHY (newest to oldest):
# 1. room_criteria.tsv - CANONICAL/CURRENT (VARF RC codes)
#    - Most maintained, authoritative source for room data
#    - Uses current VARF room codes
#    - Paired with Equipment_Guide_parsed_v2.txt for equipment
#
# 2. LegacyRC-Crosswalk.txt - TRANSLATION LAYER (created between updates)
#    - Maps legacy room codes -> current VARF codes
#    - Enables integration of historical finish data
#
# 3. room_finishes.tsv - LEGACY BUT RELEVANT (Legacy RC codes)
#    - Parsed from "Door and Finish Criteria" document
#    - Uses older legacy room codes
#    - Translated via crosswalk to merge with canonical data
#
# OUTPUT: room-sizes.js with canonical VARF codes + translated finish data
#
$rootPath = "c:\Users\carte\OneDrive - FFE Inc\Documents\Arrange"
$tsvPath = "$rootPath\src\room_criteria.tsv"
$finishesPath = "$rootPath\src\room_finishes.tsv"
$crosswalkPath = "$rootPath\src\LegacyRC-Crosswalk.txt"
$outputPath = "$rootPath\room-sizes.js"

# Helper function to escape JavaScript strings
function Escape-JsString($str) {
    if ([string]::IsNullOrEmpty($str)) { return "" }
    $str = $str.Trim() -replace '^"', '' -replace '"$', ''
    $str = $str -replace '\\', '\\\\' -replace '"', '\"' -replace "`r", '' -replace "`n", '\n' -replace "`t", '\t'
    return $str
}

# Helper function to convert header to camelCase property name
function ConvertTo-CamelCase($str) {
    $str = $str -replace '[^a-zA-Z0-9\s%]', '' -replace '\s+', ' '
    $words = $str.Trim() -split '\s+'
    if ($words.Count -eq 0) { return "unknown" }
    $result = $words[0].ToLower()
    for ($i = 1; $i -lt $words.Count; $i++) {
        $word = $words[$i]
        if ($word.Length -gt 0) {
            $result += $word.Substring(0,1).ToUpper() + $word.Substring(1).ToLower()
        }
    }
    return $result
}

# Helper function to check if property name needs quotes
function Needs-Quotes($propName) {
    return $propName -match '[^a-zA-Z0-9_$]'
}

# Load Crosswalk (Legacy RC -> VARF RC mapping)
$legacyToVarf = @{}
$varfToLegacy = @{}
if (Test-Path $crosswalkPath) {
    Write-Host "Loading crosswalk from $crosswalkPath..."
    $crosswalkLines = Get-Content $crosswalkPath -Encoding UTF8
    # Headers: #, VARF RC, LEGACY RC, MASTER ROOM NAME, NSF
    
    for ($i = 1; $i -lt $crosswalkLines.Count; $i++) {
        $line = $crosswalkLines[$i]
        if ($line.Trim()) {
            $fields = $line -split "`t"
            if ($fields.Count -gt 2) {
                $varfCode = $fields[1].Trim()
                $legacyCode = $fields[2].Trim()
                
                if ($varfCode -and $legacyCode -and $legacyCode -ne "n/a") {
                    $legacyToVarf[$legacyCode] = $varfCode
                    $varfToLegacy[$varfCode] = $legacyCode
                }
            }
        }
    }
    Write-Host "Loaded $($legacyToVarf.Count) crosswalk mappings (Legacy -> VARF)."
}

# Load Finishes
$finishes = @{}
if (Test-Path $finishesPath) {
    Write-Host "Loading finishes from $finishesPath..."
    $finishLines = Get-Content $finishesPath -Encoding UTF8
    # Headers: Chapter, FA Number, FA Name, Room ID, Room Code, Room Name, Floor, Base, Wall, Wain, Ceiling, Door, Hardware
    
    for ($i = 1; $i -lt $finishLines.Count; $i++) {
        $line = $finishLines[$i]
        if ($line.Trim()) {
            $fields = $line -split "`t"
            # Map by Room Code (index 4 now)
            if ($fields.Count -gt 4) {
                $code = $fields[4].Trim()
                if ($code -and $code -ne "Room Code") {
                    # Try to translate legacy code to VARF code if needed
                    $varfCode = $code
                    if ($legacyToVarf.ContainsKey($code)) {
                        $varfCode = $legacyToVarf[$code]
                        Write-Host "  Translated legacy code $code -> $varfCode"
                    }
                    
                    $finishes[$varfCode] = @{
                        faNumber = if ($fields.Count -gt 1) { $fields[1] } else { "" }
                        faName = if ($fields.Count -gt 2) { $fields[2] } else { "" }
                        floor = if ($fields.Count -gt 6) { $fields[6] } else { "" }
                        base = if ($fields.Count -gt 7) { $fields[7] } else { "" }
                        wall = if ($fields.Count -gt 8) { $fields[8] } else { "" }
                        wain = if ($fields.Count -gt 9) { $fields[9] } else { "" }
                        ceiling = if ($fields.Count -gt 10) { $fields[10] } else { "" }
                        door = if ($fields.Count -gt 11) { $fields[11] } else { "" }
                        hardware = if ($fields.Count -gt 12) { $fields[12] } else { "" }
                        wasTranslated = ($code -ne $varfCode)  # Flag if code was translated
                        legacyCode = if ($code -ne $varfCode) { $code } else { "" }  # Original legacy code if different
                    }
                }
            }
        }
    }
    Write-Host "Loaded finishes for $($finishes.Count) rooms (after crosswalk translation)."
}

$tsvLines = Get-Content $tsvPath -Encoding UTF8
$headers = $tsvLines[0] -split "`t"

Write-Host "Processing $($headers.Count) columns from criteria..."

# Build JS content
$jsLines = @()
$jsLines += "// Room sizing and attributes data extracted from VA TIL/MS Space Criteria"
$jsLines += "// Generated on $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
$jsLines += ""
$jsLines += "// DATA SOURCE HIERARCHY:"
$jsLines += "// - room_criteria.tsv: CANONICAL/CURRENT source (VARF room codes)"
$jsLines += "// - Equipment_Guide_parsed_v2.txt: CURRENT equipment data (paired with room_criteria.tsv)"
$jsLines += "// - LegacyRC-Crosswalk.txt: Translation layer (Legacy RC -> VARF RC)"
$jsLines += "// - room_finishes.tsv: LEGACY finish data (translated via crosswalk)"
$jsLines += ""
$jsLines += "// All room codes in this file are VARF codes (canonical)."
$jsLines += "// Legacy codes preserved in 'legacyRoomCode' field where applicable."
$jsLines += ""
$jsLines += "const ROOM_SIZES = ["

$roomCount = 0
for ($i = 1; $i -lt $tsvLines.Count; $i++) {
    $line = $tsvLines[$i]
    if ($line.Trim()) {
        $fields = $line -split "`t"
        
        # Build room object properties
        $props = @()
        $roomCode = ""
        
        for ($j = 0; $j -lt [Math]::Min($fields.Count, $headers.Count); $j++) {
            $header = $headers[$j]
            $value = if ($j -lt $fields.Count) { $fields[$j] } else { "" }
            $propName = ConvertTo-CamelCase $header
            
            # Handle special cases for first 3 columns
            if ($j -eq 0) { 
                $propName = "id" 
                $roomCode = $value.Trim()
            }
            if ($j -eq 1) { $propName = "name" }
            if ($j -eq 2) { $propName = "nsf" }
            
            $cleanValue = Escape-JsString $value
            
            # Determine value type
            if ([string]::IsNullOrWhiteSpace($cleanValue)) {
                $jsValue = "null"
            }
            elseif ($cleanValue -match '^\d+$') {
                $jsValue = $cleanValue
            }
            elseif ($cleanValue -match '^\d+\.\d+$') {
                $jsValue = $cleanValue
            }
            else {
                $jsValue = "`"$cleanValue`""
            }
            
            # Quote property name if it contains special characters
            if (Needs-Quotes $propName) {
                $props += "`"$propName`": $jsValue"
            } else {
                $props += "$propName`: $jsValue"
            }
        }
        
        # Merge Finishes if available
        if ($roomCode -and $finishes.ContainsKey($roomCode)) {
            $fin = $finishes[$roomCode]
            
            $props += "functionalAreaNumber: `"$(Escape-JsString $fin.faNumber)`""
            $props += "functionalAreaName: `"$(Escape-JsString $fin.faName)`""
            $props += "finishFloor: `"$(Escape-JsString $fin.floor)`""
            $props += "finishBase: `"$(Escape-JsString $fin.base)`""
            $props += "finishWall: `"$(Escape-JsString $fin.wall)`""
            $props += "finishWain: `"$(Escape-JsString $fin.wain)`""
            $props += "finishCeiling: `"$(Escape-JsString $fin.ceiling)`""
            $props += "finishDoor: `"$(Escape-JsString $fin.door)`""
            $props += "finishHardware: `"$(Escape-JsString $fin.hardware)`""
            
            # Add metadata about data provenance
            if ($fin.wasTranslated -and $fin.legacyCode) {
                $props += "finishDataSource: `"legacy-translated`""
                $props += "legacyRoomCode: `"$(Escape-JsString $fin.legacyCode)`""
            } elseif ($fin.faNumber -or $fin.floor) {
                $props += "finishDataSource: `"current`""
            }
        }
        
        $jsLines += "    { $($props -join ', ') },"
        $roomCount++
    }
}

$jsLines += "];"
$jsLines += ""
$jsLines += "// Total rooms: $roomCount"
$jsLines += "// Total attributes per room: $($headers.Count)"

# Write file
$jsLines | Out-File -FilePath $outputPath -Encoding UTF8

Write-Host ""
Write-Host " Created room-sizes.js with $roomCount rooms"
Write-Host " Attributes per room: $($headers.Count)"
Write-Host " File: $outputPath"
Write-Host " File size: $((Get-Item $outputPath).Length) bytes"
