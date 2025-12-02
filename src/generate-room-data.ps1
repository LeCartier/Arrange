# Generate comprehensive room-sizes.js with all attributes
$tsvPath = "C:\Users\carte\Documents\Arrange\room_criteria.tsv"
$outputPath = "C:\Users\carte\Documents\Arrange\room-sizes.js"

$tsvLines = Get-Content $tsvPath
$headers = $tsvLines[0] -split "`t"

Write-Host "Processing $($headers.Count) columns..."

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

# Build JS content
$jsLines = @()
$jsLines += "// Room sizing and attributes data extracted from VA TIL/MS Space Criteria"
$jsLines += "// Generated on $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
$jsLines += "// Source: vatilms_room_criteria-12-01-2025_12_14..xlsx"
$jsLines += ""
$jsLines += "const ROOM_SIZES = ["

$roomCount = 0
for ($i = 1; $i -lt $tsvLines.Count; $i++) {
    $line = $tsvLines[$i]
    if ($line.Trim()) {
        $fields = $line -split "`t"
        
        # Build room object properties
        $props = @()
        
        for ($j = 0; $j -lt [Math]::Min($fields.Count, $headers.Count); $j++) {
            $header = $headers[$j]
            $value = if ($j -lt $fields.Count) { $fields[$j] } else { "" }
            $propName = ConvertTo-CamelCase $header
            
            # Handle special cases for first 3 columns
            if ($j -eq 0) { $propName = "id" }
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
            
            $props += "$propName`: $jsValue"
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
Write-Host "✓ Created room-sizes.js with $roomCount rooms"
Write-Host "✓ Attributes per room: $($headers.Count)"
Write-Host "✓ File: $outputPath"
Write-Host "✓ File size: $((Get-Item $outputPath).Length) bytes"
