# FA Structure Management Tools
# Validates and rebuilds chapter-fa-mapping.tsv against Combined Space Criteria
#
# Usage:
#   .\fa-structure-tools.ps1 -Action validate    # Compare TSV against canonical
#   .\fa-structure-tools.ps1 -Action rebuild     # Rebuild TSV from canonical + existing rooms
#   .\fa-structure-tools.ps1 -Action extract     # Extract canonical FA list only

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("validate", "rebuild", "extract")]
    [string]$Action
)

$spaceCriteriaPath = "c:\Users\carte\OneDrive - FFE Inc\Documents\Arrange\docs\Combined Space Criteria.txt"
$tsvPath = "c:\Users\carte\OneDrive - FFE Inc\Documents\Arrange\chapter-fa-mapping.tsv"
$canonicalPath = "c:\Users\carte\OneDrive - FFE Inc\Documents\Arrange\canonical-fa-structure.tsv"

# Common acronym fixes for Title Case conversion
$acronymFixes = @{
    '\bPmr\b' = 'PMR'; '\bSvc\b' = 'Svc'; '\bPt\b' = 'PT'; '\bKt\b' = 'KT'; '\bOt\b' = 'OT'
    '\bAtech\b' = 'ATech'; '\bAt\b' = 'AT'; '\bDt\b' = 'DT'; '\bCc\b' = 'CC'; '\bEd\b' = 'ED'
    '\bIcu\b' = 'ICU'; '\bPcu\b' = 'PCU'; '\bRcu\b' = 'RCU'; '\bPact\b' = 'PACT'; '\bCboc\b' = 'CBOC'
    '\bVcs\b' = 'VCS'; '\bMri\b' = 'MRI'; '\bCt\b' = 'CT'; '\bPet\b' = 'PET'; '\bNm\b' = 'NM'
    '\bEeg\b' = 'EEG'; '\bEkg\b' = 'EKG'; '\bVmu\b' = 'VMU'; '\bR&d\b' = 'R&D'; '\bSci/d\b' = 'SCI/D'
    '\bSci\b' = 'SCI'; '\bPrc\b' = 'PRC'; '\bPtrp\b' = 'PTRP'; '\bAsc\b' = 'ASC'; '\bPacu\b' = 'PACU'
    '\bIp\b' = 'IP'; '\bOp\b' = 'OP'; '\bWhc\b' = 'WHC'; '\bWvcs\b' = 'WVCS'; '\bMh\b' = 'MH'
    '\bMs\b' = 'MS'; '\bIc\b' = 'IC'; '\bLtc\b' = 'LTC'; '\bAc\b' = 'AC'; '\bAdl\b' = 'ADL'
    '\bHe\b' = 'HE'; '\bNc\b' = 'NC'; '\bHc\b' = 'HC'; '\bPm&r\b' = 'PM&R'; '\bEms\b' = 'EMS'
    '\bId\b' = 'ID'; '\bN-p\b' = 'N-P'; '\bMmvss\b' = 'MMVSS'; '\bAslp\b' = 'ASLP'
    '\bDtr\b' = 'DTR'; '\bDtrs\b' = 'DTRs'; '\bSh\b' = 'SH'; '\bBlr&d\b' = 'BLR&D'
    '\bRr&d\b' = 'RR&D'; '\bCsr&d\b' = 'CSR&D'; '\bHsr&d\b' = 'HSR&D'
}

function ConvertTo-TitleCaseWithAcronyms($text) {
    $result = (Get-Culture).TextInfo.ToTitleCase($text.ToLower())
    foreach ($pattern in $acronymFixes.Keys) {
        $result = $result -replace $pattern, $acronymFixes[$pattern]
    }
    return $result
}

function Get-CanonicalFAs {
    $content = Get-Content $spaceCriteriaPath
    $chapterPattern = "^CHAPTER (\d{3}):\s*(.+)$"
    $faPattern = "^([A-Z])\. FA (\d+):\s*(.+)$"
    
    $results = @{}
    $currentChapter = $null
    
    foreach ($line in $content) {
        if ($line -match $chapterPattern) {
            $currentChapter = $matches[1]
            $results[$currentChapter] = @{ Name = $matches[2].Trim(); FAs = @{} }
        }
        elseif ($line -match $faPattern -and $currentChapter) {
            $faNum = $matches[2]
            $faName = ConvertTo-TitleCaseWithAcronyms $matches[3].Trim()
            if (-not $results[$currentChapter].FAs.Contains($faNum)) {
                $results[$currentChapter].FAs[$faNum] = $faName
            }
        }
    }
    return $results
}

# === EXTRACT ACTION ===
if ($Action -eq "extract") {
    Write-Host "=== Extracting Canonical FA Structure ===" -ForegroundColor Cyan
    $canonicalFAs = Get-CanonicalFAs
    
    $lines = @("Chapter`tChapter Name`tFA Number`tFA Name")
    foreach ($chapter in ($canonicalFAs.Keys | Sort-Object { [int]$_ })) {
        $chapterData = $canonicalFAs[$chapter]
        foreach ($faNum in ($chapterData.FAs.Keys | Sort-Object { [int]$_ })) {
            $lines += "$chapter`t$($chapterData.Name)`t$faNum`t$($chapterData.FAs[$faNum])"
        }
    }
    $lines | Out-File $canonicalPath -Encoding UTF8
    
    $totalFAs = ($canonicalFAs.Values | ForEach-Object { $_.FAs.Count } | Measure-Object -Sum).Sum
    Write-Host "Extracted $totalFAs FAs from $($canonicalFAs.Count) chapters" -ForegroundColor Green
    Write-Host "Output: $canonicalPath"
}

# === VALIDATE ACTION ===
elseif ($Action -eq "validate") {
    Write-Host "=== FA Structure Validation ===" -ForegroundColor Cyan
    $canonicalFAs = Get-CanonicalFAs
    
    # Parse TSV
    $tsvFAs = @{}
    Get-Content $tsvPath | Select-Object -Skip 1 | ForEach-Object {
        if (-not $_.Trim()) { return }
        $parts = $_ -split "`t"
        if ($parts.Count -lt 3) { return }
        $chapter = $parts[0].Trim()
        $faNum = $parts[1].Trim()
        $faName = $parts[2].Trim()
        if (-not $tsvFAs.Contains($chapter)) { $tsvFAs[$chapter] = @{} }
        if (-not $tsvFAs[$chapter].Contains($faNum)) { $tsvFAs[$chapter][$faNum] = $faName }
    }
    
    Write-Host "Canonical: $($canonicalFAs.Count) chapters | TSV: $($tsvFAs.Count) chapters`n"
    
    $issueCount = 0
    foreach ($chapter in ($canonicalFAs.Keys | Sort-Object { [int]$_ })) {
        $canonical = $canonicalFAs[$chapter]
        $tsv = $tsvFAs[$chapter]
        $issues = @()
        
        if (-not $tsv) {
            $issues += "  [MISSING] Chapter not in TSV"
        } else {
            foreach ($faNum in ($canonical.FAs.Keys | Sort-Object { [int]$_ })) {
                if (-not $tsv.Contains($faNum)) {
                    $issues += "  [MISSING FA$faNum] $($canonical.FAs[$faNum])"
                }
            }
            foreach ($faNum in ($tsv.Keys | Sort-Object { [int]$_ })) {
                if (-not $canonical.FAs.Contains($faNum)) {
                    $issues += "  [EXTRA FA$faNum] $($tsv[$faNum])"
                }
            }
        }
        
        if ($issues.Count -gt 0) {
            $issueCount++
            Write-Host "Chapter $chapter - $($canonical.Name)" -ForegroundColor Yellow
            $issues | ForEach-Object { Write-Host $_ -ForegroundColor $(if ($_ -match "MISSING") { "Red" } else { "DarkYellow" }) }
            Write-Host ""
        }
    }
    
    # Extra chapters in TSV
    foreach ($chapter in ($tsvFAs.Keys | Sort-Object { [int]$_ })) {
        if (-not $canonicalFAs.Contains($chapter)) {
            $issueCount++
            Write-Host "Chapter $chapter" -ForegroundColor Yellow
            Write-Host "  [EXTRA CHAPTER] Not in Combined Space Criteria" -ForegroundColor DarkYellow
        }
    }
    
    Write-Host "`n=== Summary ===" -ForegroundColor Cyan
    Write-Host "Chapters OK: $($canonicalFAs.Count - $issueCount) | Issues: $issueCount"
}

# === REBUILD ACTION ===
elseif ($Action -eq "rebuild") {
    Write-Host "=== Rebuilding TSV from Canonical ===" -ForegroundColor Cyan
    
    # Backup
    $backupPath = $tsvPath -replace '\.tsv$', "-backup-$(Get-Date -Format 'yyyyMMdd-HHmmss').tsv"
    Copy-Item $tsvPath $backupPath
    Write-Host "Backed up to: $backupPath" -ForegroundColor Green
    
    $canonicalFAs = Get-CanonicalFAs
    
    # Load existing rooms
    $existingByChapter = @{}
    Get-Content $tsvPath | Select-Object -Skip 1 | ForEach-Object {
        if (-not $_.Trim()) { return }
        $parts = $_ -split "`t"
        if ($parts.Count -lt 4) { return }
        $chapter = $parts[0].Trim()
        if (-not $existingByChapter.Contains($chapter)) { $existingByChapter[$chapter] = @() }
        $existingByChapter[$chapter] += @{
            FA = $parts[1].Trim(); FAName = $parts[2].Trim()
            VARF = $parts[3].Trim(); Legacy = if ($parts.Count -ge 5) { $parts[4].Trim() } else { "" }
        }
    }
    
    # Build output
    $output = @("Chapter`tFA Number`tFunctional Area`tVARF Code`tLegacy Code")
    $roomsPreserved = 0
    
    foreach ($chapter in ($canonicalFAs.Keys | Sort-Object { [int]$_ })) {
        $chapterData = $canonicalFAs[$chapter]
        $existingRooms = $existingByChapter[$chapter]
        
        foreach ($faNum in ($chapterData.FAs.Keys | Sort-Object { [int]$_ })) {
            $faName = $chapterData.FAs[$faNum]
            $matchingRooms = if ($existingRooms) { $existingRooms | Where-Object { $_.FA -eq $faNum -and $_.VARF } } else { @() }
            
            if ($matchingRooms.Count -gt 0) {
                foreach ($room in $matchingRooms) {
                    $output += "$chapter`t$faNum`t$faName`t$($room.VARF)`t$($room.Legacy)"
                    $roomsPreserved++
                }
            } else {
                $output += "$chapter`t$faNum`t$faName`t`t"
            }
        }
    }
    
    # Add extra chapters from existing TSV
    foreach ($chapter in ($existingByChapter.Keys | Sort-Object { [int]$_ })) {
        if (-not $canonicalFAs.Contains($chapter)) {
            foreach ($room in $existingByChapter[$chapter]) {
                $output += "$chapter`t$($room.FA)`t$($room.FAName)`t$($room.VARF)`t$($room.Legacy)"
            }
        }
    }
    
    $output | Out-File $tsvPath -Encoding UTF8
    Write-Host "Created $($output.Count - 1) entries, $roomsPreserved rooms preserved" -ForegroundColor Green
}
