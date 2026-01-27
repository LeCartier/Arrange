# Generate room data from finish data for rooms not in room_criteria.tsv
# This supplements ROOM_SIZES with basic info for legacy-only rooms

Write-Output "Loading existing ROOM_SIZES codes..."
$roomSizesContent = Get-Content "../room-sizes.js" -Raw
$matches = [regex]::Matches($roomSizesContent, 'id: "([^"]+)"')
$existingRoomCodes = $matches | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Output "Found $($existingRoomCodes.Count) rooms in ROOM_SIZES"

Write-Output "`nLoading room_finishes.tsv..."
$finishData = Get-Content "room_finishes.tsv" | Select-Object -Skip 1

$finishRooms = @{}
foreach ($line in $finishData) {
    $parts = $line -split "`t"
    if ($parts.Length -ge 6) {
        $roomCode = $parts[4].Trim()
        $roomName = $parts[5].Trim()
        
        if ($roomCode -and $roomName -and $roomCode -notin $existingRoomCodes) {
            if (-not $finishRooms.ContainsKey($roomCode)) {
                $finishRooms[$roomCode] = $roomName
            }
        }
    }
}

Write-Output "Found $($finishRooms.Count) room codes in finish data not in ROOM_SIZES"

# Generate JavaScript array entries
$output = @()
$output += "// Supplemental room data from finish data (room_finishes.tsv)"
$output += "// These rooms don't exist in room_criteria.tsv but have finish specifications"
$output += "// Generated on $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
$output += ""
$output += "const FINISH_ONLY_ROOMS = ["

foreach ($code in ($finishRooms.Keys | Sort-Object)) {
    $name = $finishRooms[$code]
    # Escape quotes in name
    $safeName = $name -replace '"', '\"'
    $output += "    { id: `"$code`", name: `"$safeName`", nsf: null, source: 'finish_data' },"
}

$output += "];"
$output += ""
$output += "// Export for use in main application"
$output += "if (typeof module !== 'undefined' && module.exports) {"
$output += "  module.exports = { FINISH_ONLY_ROOMS };"
$output += "}"

$outputPath = "finish-room-data.js"
$output | Out-File -FilePath $outputPath -Encoding utf8

Write-Output "`nGenerated $outputPath with $($finishRooms.Count) room entries"
Write-Output "Sample entries:"
$finishRooms.GetEnumerator() | Select-Object -First 5 | ForEach-Object { "  $($_.Key): $($_.Value)" }
