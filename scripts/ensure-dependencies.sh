#!/bin/zsh
set -e
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
if ! command -v npm >/dev/null 2>&1; then
  echo "Install Node.js, then double-click the shortcut again."
  exit 1
fi
dependency_hash=$(shasum -a 256 package-lock.json | cut -d ' ' -f 1)
previous_hash=$(cat node_modules/.portfolio-dependencies 2>/dev/null || true)
if [[ ! -x node_modules/.bin/vite || ! -x node_modules/.bin/tsc || "$dependency_hash" != "$previous_hash" ]]; then
  npm ci --no-audit --no-fund
  print -r -- "$dependency_hash" > node_modules/.portfolio-dependencies
fi
