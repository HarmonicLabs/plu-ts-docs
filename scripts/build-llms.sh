#!/usr/bin/env bash
# Regenerate static/llms-full.txt by concatenating every docs/*.md(x) file.
# Run from pebble-docs/. Wired into the build via `npm run llms`.
set -euo pipefail

cd "$(dirname "$0")/.."

OUT="static/llms-full.txt"

{
    echo "# Pebble — full docs corpus (v0.3.0)"
    echo ""
    echo "> This file is the concatenation of every public docs page. It exists for LLM ingestion. For a curated short index see llms.txt; for the rendered site see harmoniclabs.tech."
    echo ""
    echo "Generated: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
    echo ""
    echo "---"
    echo ""
    find docs -type f \( -name "*.md" -o -name "*.mdx" \) | sort | while read -r f; do
        rel="${f#docs/}"
        echo ""
        echo "=== $rel ==="
        echo ""
        cat "$f"
        echo ""
    done
} > "$OUT"

echo "Wrote $OUT ($(wc -l < "$OUT") lines)"
