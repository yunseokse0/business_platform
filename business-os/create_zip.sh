#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR"
PROJECT_NAME="$(basename "$PROJECT_DIR")"
OUTPUT_ZIP="$PROJECT_DIR/../$PROJECT_NAME.zip"

echo "Packaging $PROJECT_NAME into $OUTPUT_ZIP ..."

# Ensure node modules are not packaged
EXCLUDES=(
  "-x" "$PROJECT_NAME/node_modules/*"
  "-x" "$PROJECT_NAME/.next/*"
  "-x" "$PROJECT_NAME/.turbo/*"
  "-x" "$PROJECT_NAME/.git/*"
  "-x" "$PROJECT_NAME/.DS_Store"
)

cd "$PROJECT_DIR/.."
if command -v zip >/dev/null 2>&1; then
  zip -r "$OUTPUT_ZIP" "$PROJECT_NAME" "${EXCLUDES[@]}" >/dev/null
  echo "Created: $OUTPUT_ZIP"
else
  echo "zip command not found. Please install zip (or run via WSL/Git Bash on Windows)."
  exit 1
fi


