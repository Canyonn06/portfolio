#!/bin/zsh
set -e
cd -- "${0:A:h}"
trap 'echo "Build failed. No website upload was made. Fix the error above and try again."; read "?Press Return to close."' ZERR
zsh scripts/ensure-dependencies.sh
npm run release
open "$PWD/upload/portfolio"
echo "Build complete. Upload this folder's contents into the website root in Cyberduck."
echo "Merge assets first; upload index.html last. Leave projects alone."
read "?Press Return to close."
