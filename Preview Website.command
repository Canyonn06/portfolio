#!/bin/zsh
set -e
cd -- "${0:A:h}"
trap 'echo "Preview failed. See the error above."; read "?Press Return to close."' ZERR
zsh scripts/ensure-dependencies.sh
echo "Your local preview will open in the browser. Keep this window open while editing."
echo "Press Control-C here when you are finished. Project apps require their own preview."
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort --open
