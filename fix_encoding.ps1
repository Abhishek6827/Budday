# Read the file as raw bytes
$bytes = [System.IO.File]::ReadAllBytes('d:\Budday\index.html')

# Check for BOM and strip it
if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
    Write-Host "UTF-8 BOM detected, stripping..."
    $bytes = $bytes[3..($bytes.Length-1)]
}

# Decode the bytes as Latin-1 (ISO-8859-1) to recover the original UTF-8 byte sequences
$content = [System.Text.Encoding]::GetEncoding('iso-8859-1').GetString($bytes)

# Write properly as UTF-8 without BOM
$utf8NoBOM = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText('d:\Budday\index.html', $content, $utf8NoBOM)

Write-Host "Encoding fixed!"
