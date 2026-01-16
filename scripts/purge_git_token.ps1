<#
PURPOSE:
  Safely remove a literal secret (token) from the repository history using git-filter-repo.

USAGE:
  1) Open PowerShell in the repository root (where .git is located).
 2) Run: .\scripts\purge_git_token.ps1 -Token 'THE_FULL_TOKEN_TO_REMOVE'
     Or run without -Token to be prompted.

NOTES:
  - This script prefers `git-filter-repo` (fast & safe). It will attempt to install it via pip if missing.
  - This rewrites history. After running you will likely need to force-push to remote and coordinate with collaborators.
  - Rotate/replace the exposed token in the Supercell portal immediately after cleaning history.
#>

param(
  [string]$Token
)

function Abort($msg){ Write-Error $msg; exit 1 }

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Abort "Git is not available in PATH. Install Git and re-run this script: https://git-scm.com/downloads"
}

Push-Location (Get-Location)

if (-not (Test-Path .git)) {
  Abort "This folder does not look like a git repository (no .git folder). Run the script from the repo root."
}

if (-not $Token) {
  $Token = Read-Host -Prompt 'Enter the full token string to remove from history'
}

if (-not $Token) { Abort 'No token provided.' }

Write-Output "Creating safety backup branch 'backup-before-purge'..."
git checkout -b backup-before-purge
git add -A
git commit -m "WIP: backup before history purge" || Write-Output "No changes to commit for backup branch."

# Check for git-filter-repo
$gf = Get-Command git-filter-repo -ErrorAction SilentlyContinue
if (-not $gf) {
  Write-Output "git-filter-repo not found. Attempting to install via pip. This requires Python and pip."
  if (Get-Command pip -ErrorAction SilentlyContinue) {
    pip install --user git-filter-repo
    $env:PATH += ";$env:USERPROFILE\AppData\Roaming\Python\Python39\Scripts"
  } else {
    Abort "pip not found. Install git-filter-repo manually (https://github.com/newren/git-filter-repo) or run the manual filter-branch instructions in the project README." 
  }
}

if (-not (Get-Command git-filter-repo -ErrorAction SilentlyContinue)) {
  Abort "git-filter-repo still not available after install. Please install it and re-run the script."
}

Write-Output "Preparing replace-text file..."
$tmp = [IO.Path]::GetTempFileName()
Set-Content -Path $tmp -Value "literal:$Token==>[REDACTED]"

Write-Output "Running git-filter-repo (this rewrites history)..."
git filter-repo --replace-text $tmp

Write-Output "Cleaning up and running garbage collection..."
Remove-Item $tmp -ErrorAction SilentlyContinue
git reflog expire --expire=now --all
git gc --prune=now --aggressive

Write-Output "Done. Search to confirm the token is removed:"
git grep "$Token" || Write-Output "No matches found (good)."

Write-Output "IMPORTANT: Rotate the exposed token in the Supercell portal and coordinate force-push with collaborators. To push rewritten history to origin run:"
Write-Output "  git push --force --all"
Write-Output "  git push --force --tags"

Pop-Location
