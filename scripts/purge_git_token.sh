#!/usr/bin/env bash
#
# purge_git_token.sh
# Purpose: Remove a literal token from git history using git-filter-repo.
# Usage:
#   1) cd to repository root
#   2) ./scripts/purge_git_token.sh 'THE_FULL_TOKEN_TO_REMOVE'
#
set -euo pipefail

TOKEN=${1:-}
if [ -z "$TOKEN" ]; then
  read -rp "Enter the full token to remove: " TOKEN
fi

if ! command -v git >/dev/null 2>&1; then
  echo "Git not found. Install Git and re-run."
  exit 1
fi

if [ ! -d .git ]; then
  echo "Not a git repository (no .git). Run from repo root." && exit 1
fi

git checkout -b backup-before-purge || true
git add -A
git commit -m "WIP: backup before history purge" || true

if ! command -v git-filter-repo >/dev/null 2>&1; then
  echo "git-filter-repo not found. Attempting to install via pip..."
  if command -v pip >/dev/null 2>&1; then
    pip install --user git-filter-repo
    export PATH="$PATH:$(python -m site --user-base)/bin"
  else
    echo "pip not found. Install git-filter-repo manually: https://github.com/newren/git-filter-repo" && exit 1
  fi
fi

if ! command -v git-filter-repo >/dev/null 2>&1; then
  echo "git-filter-repo still not available after install. Aborting." && exit 1
fi

TMPFILE=$(mktemp)
echo "literal:${TOKEN}==>[REDACTED]" > "$TMPFILE"

echo "Running git-filter-repo (this rewrites history)..."
git filter-repo --replace-text "$TMPFILE"

rm -f "$TMPFILE"
git reflog expire --expire=now --all
git gc --prune=now --aggressive

if git grep -F "$TOKEN" >/dev/null 2>&1; then
  echo "Token still found in repository (unexpected)."
else
  echo "No matches found for token. History rewritten."
fi

echo "When ready, force-push rewritten history:"
echo "  git push --force --all"
echo "  git push --force --tags"

echo "Remember to rotate the token in the Supercell portal immediately."
