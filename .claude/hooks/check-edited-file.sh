#!/usr/bin/env bash
# PostToolUse hook: format + lint + test the single file Claude just edited.
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

# Mark that this session actually edited app code, so the Stop hook knows to run
# the whole-codebase checks. A dirty tree alone isn't enough — it can't tell a
# real code change from a pre-existing diff during a brainstorm-only turn.
# Lives in .git/ so it's never committed and never shows in `git status`.
touch "$root/.git/claude-needs-check"

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

# Finally, run only this file's colocated test. Edit a test => run itself; edit
# a source file => run its sibling "<name>.test.<ext>" if one exists. No test
# file => no-op (cross-file breakage is caught by the full suite in the Stop hook).
case "$file" in
    *.test.ts | *.test.tsx) test_file="$file" ;;
    *.ts) test_file="${file%.ts}.test.ts" ;;
    *.tsx) test_file="${file%.tsx}.test.tsx" ;;
    *) test_file="" ;;
esac

if [ -n "$test_file" ] && [ -f "$test_file" ]; then
    if ! output=$(cd "$root" && pnpm --filter ./client test "$test_file" 2>&1); then
        echo "Tests failed for $test_file:" >&2
        echo "$output" >&2
        exit 2
    fi
fi

exit 0
