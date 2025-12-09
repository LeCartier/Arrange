# Generate equipment FA name to finish FA name mappings
# This analyzes which room codes appear under each equipment FA name,
# then looks up those room codes in finish data to find the corresponding finish FA

Write-Host "Loading crosswalk..."
$crosswalk = @{}
Get-Content "LegacyRC-Crosswalk.txt" | Select-Object -Skip 1 | ForEach-Object {
    $fields = ($_ -split "`t")
    if ($fields.Count -ge 3) {
        $varf = $fields[1].Trim()
        $legacy = $fields[2].Trim()
        if ($varf -and $legacy -and $legacy -ne 'n/a') {
            $crosswalk[$legacy] = $varf
        }
    }
}
Write-Host "Loaded $($crosswalk.Count) crosswalk entries"

Write-Host "Building finish data FA map..."
$finishFAMap = @{}
Get-Content "room_finishes.tsv" | Select-Object -Skip 1 | ForEach-Object {
    $fields = ($_ -split "`t")
    if ($fields.Count -ge 5 -and $fields[0] -match '^\d+') {
        $chapter = $fields[0].Trim()
        $faNum = $fields[1].Trim()
        $faName = $fields[2].Trim()
        $legacyCode = $fields[4].Trim()
        $varfCode = if ($crosswalk.ContainsKey($legacyCode)) { $crosswalk[$legacyCode] } else { $legacyCode }
        
        $key = "$chapter|$varfCode"
        if (-not $finishFAMap.ContainsKey($key)) {
            $finishFAMap[$key] = @{ FANum = $faNum; FAName = $faName }
        }
    }
}
Write-Host "Built finish FA map with $($finishFAMap.Count) chapter/room combinations"

Write-Host "Analyzing equipment FA names..."
$equipFAToFinishFA = @{}  # Map of chapter|equipFA to Map of finishFANum -> count
$lineCount = 0
$matchCount = 0

Get-Content "Equipment_Guide_parsed_v2.txt" | Select-Object -Skip 1 | ForEach-Object {
    $lineCount++
    $fields = ($_ -split "`t")
    if ($fields.Count -ge 3) {
        $dept = $fields[0]
        $equipFA = $fields[1]
        $roomField = $fields[2] -replace '^"|"$', ''
        
        if ($dept -match '^(\d+)') {
            $chapter = $matches[1]
            
            if ($equipFA -and $roomField -match ' - ([A-Z0-9]+) - ') {
                $roomCode = $matches[1]
                $matchCount++
                
                # Debug first 3 matches
                if ($matchCount -le 3) {
                    Write-Host "Match #${matchCount}: Chapter=$chapter, EquipFA=$equipFA, RoomCode=$roomCode"
                }
            
                # Look up this room code in finish data
                $lookupKey = "$chapter|$roomCode"
            if ($finishFAMap.ContainsKey($lookupKey)) {
                $faInfo = $finishFAMap[$lookupKey]
                $equipKey = "$chapter|$equipFA"
                
                if (-not $equipFAToFinishFA.ContainsKey($equipKey)) {
                    $equipFAToFinishFA[$equipKey] = @{}
                }
                
                $finishKey = "$($faInfo.FANum)|$($faInfo.FAName)"
                if ($equipFAToFinishFA[$equipKey].ContainsKey($finishKey)) {
                    $equipFAToFinishFA[$equipKey][$finishKey]++
                } else {
                    $equipFAToFinishFA[$equipKey][$finishKey] = 1
                }
                }
            }
        }
    }
}

Write-Host "Processed $lineCount equipment lines, matched $matchCount room codes"
Write-Host "Analyzed $($equipFAToFinishFA.Count) unique equipment chapter/FA combinations"

# For each equipment FA, find the most common finish FA
Write-Host "Generating mappings..."
$mappings = @()
foreach ($equipKey in $equipFAToFinishFA.Keys) {
    $finishFACounts = $equipFAToFinishFA[$equipKey]
    
    # Find the most common finish FA
    $mostCommon = $finishFACounts.GetEnumerator() | Sort-Object -Property Value -Descending | Select-Object -First 1
    
    if ($mostCommon) {
        $parts = $equipKey -split '\|'
        $chapter = $parts[0]
        $equipFAName = $parts[1]
        
        $finishParts = $mostCommon.Key -split '\|', 2
        $faNum = $finishParts[0]
        $faName = $finishParts[1]
        
        $mappings += [PSCustomObject]@{
            Chapter = $chapter
            FANumber = $faNum
            FAName = $faName
            EquipFAName = $equipFAName
            RoomCount = $mostCommon.Value
        }
    }
}

Write-Host "Generated $($mappings.Count) equipment FA mappings"

# Append to chapter-fa-mapping.tsv
$output = @()
foreach ($mapping in ($mappings | Sort-Object Chapter, { [int]$_.FANumber }, EquipFAName)) {
    $output += "$($mapping.Chapter)`t$($mapping.FANumber)`t$($mapping.FAName)`t$($mapping.EquipFAName)`tEQUIP_FA"
}

$output | Out-File -FilePath "../chapter-fa-mapping-equipment.tsv" -Encoding utf8
Write-Host "Saved equipment FA mappings to chapter-fa-mapping-equipment.tsv"
Write-Host "Sample mappings:"
$output | Select-Object -First 10 | ForEach-Object { Write-Host $_ }
