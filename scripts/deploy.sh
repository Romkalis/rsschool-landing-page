#!/usr/bin/env sh
# Builds the project and publishes dist to the gh-pages branch (GitHub Pages).
set -e

npm run build

remote=$(git remote get-url origin)
tmp=$(mktemp -d)

cp -R dist/. "$tmp"
# Tell GitHub Pages not to run Jekyll
touch "$tmp/.nojekyll"

cd "$tmp"
git init -q -b gh-pages
git add -A
git commit -q -m "deploy: $(date -u +%Y-%m-%dT%H:%MZ)"
git push -f "$remote" gh-pages

rm -rf "$tmp"
