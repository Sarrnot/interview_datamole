#!/usr/bin/env bash
# Stop hook: thorough whole-codebase typecheck after Claude finishes.
# tsc --noEmit runs over the entire client package, so it lives here rather
# than in the per-edit hook. Lint is already enforced per file on edit, so no
# full lint is needed here.
set -euo pipefail

input=$(cat)

# true when this Stop was itself triggered by a previous blocked Stop hook,
# i.e. Claude already had one attempt to fix the types.
active=$(printf '%s' "$input" | jq -r '.stop_hook_active // false')

root="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel)}"

# Types clean — let the stop proceed.
if output=$(cd "$root" && pnpm --filter ./client typecheck 2>&1); then
    exit 0
fi

# Types still broken. First time: block and feed back so Claude fixes (exit 2).
# Already retried once: do NOT block again (that loops forever) — surface the
# remaining errors to the user and allow the stop (exit 1).
if [ "$active" = "true" ]; then
    echo "Typecheck STILL failing after a fix attempt — allowing stop to avoid an infinite loop. Fix manually:" >&2
    echo "$output" >&2
    exit 1
fi

echo "Typecheck failed:" >&2
echo "$output" >&2
exit 2
