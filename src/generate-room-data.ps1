# Generate comprehensive room-sizes.js with all attributes
$rootPath = "c:\Users\carte\OneDrive - FFE Inc\Documents\Arrange"
$tsvPath = "$rootPath\src\room_criteria.tsv"
$finishesPath = "$rootPath\src\room_finishes.tsv"
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
                    $finishes[$code] = @{
                        faNumber = if ($fields.Count -gt 1) { $fields[1] } else { "" }
                        faName = if ($fields.Count -gt 2) { $fields[2] } else { "" }
                        floor = if ($fields.Count -gt 6) { $fields[6] } else { "" }
                        base = if ($fields.Count -gt 7) { $fields[7] } else { "" }
                        wall = if ($fields.Count -gt 8) { $fields[8] } else { "" }
                        wain = if ($fields.Count -gt 9) { $fields[9] } else { "" }
                        ceiling = if ($fields.Count -gt 10) { $fields[10] } else { "" }
                        door = if ($fields.Count -gt 11) { $fields[11] } else { "" }
                        hardware = if ($fields.Count -gt 12) { $fields[12] } else { "" }
                    }
                }
            }
        }
    }
    Write-Host "Loaded finishes for $($finishes.Count) rooms."
}

$tsvLines = Get-Content $tsvPath -Encoding UTF8
$headers = $tsvLines[0] -split "`t"

Write-Host "Processing $($headers.Count) columns from criteria..."

# Build JS content
$jsLines = @()
$jsLines += "// Room sizing and attributes data extracted from VA TIL/MS Space Criteria"
$jsLines += "// Generated on $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
$jsLines += "// Source: room_criteria.tsv + room_finishes.tsv"
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
