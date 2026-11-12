# dsh-memory-local

Local-only cross-session memory for DeepSeek Harness.

Current version: `0.1.1`, published on npm as `dsh-memory-local`.

- Agent tools: `memory_remember`, `memory_recall`, `memory_list`, `memory_forget`,
  `memory_inspect`.
- Relevant entries are injected into the system prompt as a bounded local-memory
  block (never as instructions).
- Settings → **Memory** lets you manage project and global memories: add, edit,
  pin, search, delete, and preview the next injection.

## Storage

Default: `~/.dsh/memory/`

- `global.json` — entries shared by all workspaces.
- `projects/<id>.json` — per-workspace entries.
- `index.json` — workspace path → project id.

No network, no embeddings, no cloud. `DSH_MEMORY_DIR` overrides the directory.

## Scope

- Default: project (current workspace).
- `scope: "global"` is opt-in, for stable user preferences that should follow every
  workspace.

## Safety

- Explicit writes only; conversations are not captured automatically.
- Credential-looking content (`npm_`, `ghp_`, `github_pat_`, `sk-`, Bearer) is
  rejected.
- Content is capped at 4 KiB; injection is capped at 8 entries / 2000 characters.
- `memory_forget` and `memory_inspect` are first-class; deletion is explicit.

## Install

```powershell
# install the local checkout into a profile
plugin_manager install_bundle <absolute path to this directory>
```

Then open Settings → Memory; the page is registered through `settings.section`.

## Notes

The Client half requires `@deepseek-ai/dsh-typert-protocol` for the Host↔Client
Remote bridge. The Host half remains usable without the settings page.
