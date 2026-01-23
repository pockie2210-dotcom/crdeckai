$timestamp = Get-Date -Format "yyyyMMdd_HHmm"
$sourceDir = "c:\Users\User\Desktop\clash-royale-site"
$backupDir = "c:\Users\User\Desktop\clash-royale-site\backups"
$zipFile = "$backupDir\backup_$timestamp.zip"

if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir | Out-Null
}

$exclude = @("node_modules", ".git", "backups", "*.zip", "*.log")

Get-ChildItem -Path $sourceDir -Exclude $exclude | Compress-Archive -DestinationPath $zipFile -Force

Write-Host "Backup created at $zipFile"
