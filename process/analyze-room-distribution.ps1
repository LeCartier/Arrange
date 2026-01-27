# Script to analyze room distribution across departments and functional areas

$equipmentFile = "c:\Users\carte\OneDrive - FFE Inc\Documents\Arrange\src\Equipment_Guide_parsed_v2.txt"

Write-Host "=== Analyzing Room Distribution Patterns ===" -ForegroundColor Cyan
Write-Host ""

# Parse the equipment file
$lines = Get-Content $equipmentFile
$header = $lines[0]
$dataLines = $lines[1..($lines.Length - 1)]

# Create hashtables to track rooms
$roomToDepts = @{}
$roomToFAs = @{}
$roomToLocations = @{}
$deptStats = @{}
$faStats = @{}

Write-Host "Parsing $($dataLines.Count) data lines..." -ForegroundColor Yellow

foreach ($line in $dataLines) {
    if ([string]::IsNullOrWhiteSpace($line)) { continue }
    
    $fields = $line -split "`t"
    if ($fields.Count -lt 3) { continue }
    
    $dept = $fields[0].Trim()
    $fa = $fields[1].Trim()
    $roomName = $fields[2].Trim()
    
    if ([string]::IsNullOrWhiteSpace($roomName)) { continue }
    
    # Extract room code (the part between " - " and " - ")
    if ($roomName -match '^"?\d+\s*-\s*([A-Z0-9]+)\s*-') {
        $roomCode = $matches[1]
    } else {
        continue
    }
    
    # Track department associations
    if (-not $roomToDepts.ContainsKey($roomCode)) {
        $roomToDepts[$roomCode] = @()
    }
    if ($dept -notin $roomToDepts[$roomCode]) {
        $roomToDepts[$roomCode] += $dept
    }
    
    # Track FA associations
    if (-not $roomToFAs.ContainsKey($roomCode)) {
        $roomToFAs[$roomCode] = @()
    }
    if ($fa -notin $roomToFAs[$roomCode]) {
        $roomToFAs[$roomCode] += $fa
    }
    
    # Track full location (dept + FA) associations
    $location = "$dept | $fa"
    if (-not $roomToLocations.ContainsKey($roomCode)) {
        $roomToLocations[$roomCode] = @()
    }
    if ($location -notin $roomToLocations[$roomCode]) {
        $roomToLocations[$roomCode] += $location
    }
    
    # Count by department
    if (-not $deptStats.ContainsKey($dept)) {
        $deptStats[$dept] = 0
    }
    $deptStats[$dept]++
    
    # Count by FA
    if (-not $faStats.ContainsKey($fa)) {
        $faStats[$fa] = 0
    }
    $faStats[$fa]++
}

Write-Host ""
Write-Host "=== STATISTICS ===" -ForegroundColor Green
Write-Host ""

# Total unique rooms
$totalRooms = $roomToLocations.Keys.Count
Write-Host "Total unique room codes: $totalRooms"

# Rooms by number of locations
$singleLocation = ($roomToLocations.GetEnumerator() | Where-Object { $_.Value.Count -eq 1 }).Count
$multipleLocations = ($roomToLocations.GetEnumerator() | Where-Object { $_.Value.Count -gt 1 }).Count

Write-Host "Rooms in single location: $singleLocation ($([math]::Round($singleLocation/$totalRooms*100, 1))%)"
Write-Host "Rooms in multiple locations: $multipleLocations ($([math]::Round($multipleLocations/$totalRooms*100, 1))%)"
Write-Host ""

# Distribution of duplication
$duplicationDist = @{}
foreach ($room in $roomToLocations.GetEnumerator()) {
    $count = $room.Value.Count
    if (-not $duplicationDist.ContainsKey($count)) {
        $duplicationDist[$count] = 0
    }
    $duplicationDist[$count]++
}

Write-Host "Distribution by number of locations:"
foreach ($count in ($duplicationDist.Keys | Sort-Object -Descending)) {
    $rooms = $duplicationDist[$count]
    Write-Host "  $count locations: $rooms rooms"
}
Write-Host ""

# Rooms by department count
$singleDept = ($roomToDepts.GetEnumerator() | Where-Object { $_.Value.Count -eq 1 }).Count
$multiDept = ($roomToDepts.GetEnumerator() | Where-Object { $_.Value.Count -gt 1 }).Count

Write-Host "Rooms in single department: $singleDept ($([math]::Round($singleDept/$totalRooms*100, 1))%)"
Write-Host "Rooms in multiple departments: $multiDept ($([math]::Round($multiDept/$totalRooms*100, 1))%)"
Write-Host ""

# Rooms by FA count
$singleFA = ($roomToFAs.GetEnumerator() | Where-Object { $_.Value.Count -eq 1 }).Count
$multiFA = ($roomToFAs.GetEnumerator() | Where-Object { $_.Value.Count -gt 1 }).Count

Write-Host "Rooms in single FA: $singleFA ($([math]::Round($singleFA/$totalRooms*100, 1))%)"
Write-Host "Rooms in multiple FAs: $multiFA ($([math]::Round($multiFA/$totalRooms*100, 1))%)"
Write-Host ""

Write-Host "Total unique departments: $($deptStats.Keys.Count)"
Write-Host "Total unique FAs: $($faStats.Keys.Count)"
Write-Host ""

# Find top duplicated rooms
Write-Host "=== TOP 20 MOST DUPLICATED ROOMS ===" -ForegroundColor Green
Write-Host ""

$topDuplicates = $roomToLocations.GetEnumerator() | 
    Where-Object { $_.Value.Count -gt 1 } |
    Sort-Object { $_.Value.Count } -Descending |
    Select-Object -First 20

foreach ($room in $topDuplicates) {
    Write-Host "$($room.Key): appears in $($room.Value.Count) locations" -ForegroundColor Yellow
    Write-Host "  Departments: $($roomToDepts[$room.Key] -join ', ')"
    Write-Host "  FAs: $($roomToFAs[$room.Key] -join ', ')"
    Write-Host "  Locations:"
    foreach ($loc in ($room.Value | Sort-Object)) {
        Write-Host "    - $loc"
    }
    Write-Host ""
}

# Sample of single-location rooms
Write-Host "=== SAMPLE: 5 ROOMS WITH SINGLE LOCATION ===" -ForegroundColor Green
Write-Host ""

$singleLocationSample = $roomToLocations.GetEnumerator() | 
    Where-Object { $_.Value.Count -eq 1 } |
    Select-Object -First 5

foreach ($room in $singleLocationSample) {
    Write-Host "$($room.Key): $($room.Value[0])" -ForegroundColor Cyan
}
Write-Host ""

# Export detailed data for further analysis
$exportPath = "c:\Users\carte\OneDrive - FFE Inc\Documents\Arrange\room-distribution-analysis.csv"
$exportData = @()

foreach ($room in $roomToLocations.GetEnumerator()) {
    $exportData += [PSCustomObject]@{
        RoomCode = $room.Key
        LocationCount = $room.Value.Count
        DepartmentCount = $roomToDepts[$room.Key].Count
        FACount = $roomToFAs[$room.Key].Count
        Departments = ($roomToDepts[$room.Key] -join '; ')
        FAs = ($roomToFAs[$room.Key] -join '; ')
        Locations = ($room.Value -join '; ')
    }
}

$exportData | Export-Csv -Path $exportPath -NoTypeInformation
Write-Host "Detailed analysis exported to: $exportPath" -ForegroundColor Green
Write-Host ""

# Analyze FA numbers
Write-Host "=== FUNCTIONAL AREA ANALYSIS ===" -ForegroundColor Green
Write-Host ""
Write-Host "Sample of unique FAs (first 20):"
$faStats.Keys | Sort-Object | Select-Object -First 20 | ForEach-Object {
    Write-Host "  - $_"
}
Write-Host "  ... and $($faStats.Keys.Count - 20) more"
Write-Host ""
