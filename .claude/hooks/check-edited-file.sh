#!/usr/bin/env bash
# PostToolUse hook: format + lint the single file Claude just edited.
# Fast, file-scoped checks. Typecheck runs over the whole codebase (too slow
# per edit) and is handled by the Stop hook instead.
#
# ESLint here is type-aware (parserOptions.project) and client/tsconfig.json
# only includes "src", so eslint is valid only on files under client/src.
# Anything else (server *.js, markdown, json, configs) is skipped.
set -euo pipefail

input=$(cat)
file=$(printf '%s' "$input" | jq -r '.tool_input.file_path // empty')

# Skip unless a TypeScript file under client/src.
case "$file" in
    */client/src/*.ts | */client/src/*.tsx) ;;
    *) exit 0 ;;
esac

root="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel)}"

# Format first — prettier owns style (eslint-config-prettier disables style rules).
if ! output=$(cd "$root" && pnpm --filter ./client format:file "$file" 2>&1); then
    echo "Format failed for $file:" >&2
    echo "$output" >&2
    exit 2
fi

# Then lint.
if ! output=$(cd "$root" && pnpm --filter ./client lint:file "$file" 2>&1); then
    echo "Lint failed for $file:" >&2
    echo "$output" >&2
    exit 2
fi

exit 0
