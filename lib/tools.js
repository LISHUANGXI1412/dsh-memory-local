import { normalizeScope } from './store.js'

const SCOPE_SCHEMA = {
  type: 'string',
  enum: ['project', 'global'],
  description: 'project (current workspace) or global (all workspaces). Default: project.',
}

function textOutput() {
  return {
    schema: { type: 'string' },
    render: (_args, value) => [{ type: 'text', text: String(value) }],
  }
}

function json(value) {
  return JSON.stringify(value, null, 2)
}

async function projectFor(ctx, store, exec) {
  let cwd = ''
  if (exec.agent && ctx.workingDirectory) {
    try {
      cwd = await ctx.workingDirectory.ensure(exec.agent, exec.signal)
    } catch {}
  }
  const project = store.ensureProject(cwd || process.cwd())
  return { cwd: project.path, project }
}

function scopeOf(args) {
  return normalizeScope(args.scope)
}

function limitOf(args, fallback = 20) {
  const value = Math.floor(Number(args.limit))
  if (!Number.isFinite(value)) return fallback
  return Math.max(1, Math.min(value, 100))
}

function queryMatch(entry, query) {
  const q = String(query ?? '').trim().toLowerCase()
  if (!q) return true
  return `${entry.content} ${entry.tags.join(' ')}`.toLowerCase().includes(q)
}

export function buildTools(ctx, store) {
  return [
    {
      name: 'memory_remember',
      description:
        'Remember one local long-term note. Defaults to the current workspace; scope="global" stores it for every workspace. ' +
        'Use for stable preferences, decisions, project facts, and gotchas. Do not store credentials, tokens, or transient chatter.',
      parameters: {
        type: 'object',
        properties: {
          content: { type: 'string', description: 'The fact or decision to remember (max 4096 chars).' },
          tags: { type: 'array', items: { type: 'string' }, description: 'Optional lowercase tags.' },
          scope: SCOPE_SCHEMA,
          pinned: { type: 'boolean', description: 'Pinned memories are always injected first.' },
        },
        required: ['content'],
      },
      output: textOutput(),
      timeoutMs: 15000,
      isConcurrencySafe: () => false,
      async execute(args, exec) {
        const scope = scopeOf(args)
        const { cwd, project } = await projectFor(ctx, store, exec)
        const entry = store.save(scope, scope === 'project' ? project.id : undefined, {
          content: args.content,
          tags: args.tags,
          pinned: args.pinned,
          sourceSessionId: exec.agent?.id,
        })
        return json({ ok: true, scope, project: scope === 'project' ? { id: project.id, path: cwd } : null, entry })
      },
    },
    {
      name: 'memory_recall',
      description:
        'Search local long-term memory by text and/or tags. Returns matching entries; does not inject them. ' +
        'Use memory_inspect to see exactly what the next prompt would include.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Text to match against content and tags.' },
          tags: { type: 'array', items: { type: 'string' }, description: 'Only entries containing every tag.' },
          scope: SCOPE_SCHEMA,
          limit: { type: 'number', description: 'Max entries (1-100, default 20).' },
        },
      },
      output: textOutput(),
      timeoutMs: 15000,
      isConcurrencySafe: () => true,
      async execute(args, exec) {
        const scope = scopeOf(args)
        const { project } = await projectFor(ctx, store, exec)
        const tags = Array.isArray(args.tags) ? args.tags.map((tag) => String(tag).toLowerCase()) : []
        const entries = store
          .list(scope, scope === 'project' ? project.id : undefined)
          .filter((entry) => queryMatch(entry, args.query))
          .filter((entry) => tags.every((tag) => entry.tags.includes(tag)))
          .slice(0, limitOf(args))
        return json({ ok: true, scope, project: scope === 'project' ? { id: project.id, path: project.path } : null, entries })
      },
    },
    {
      name: 'memory_list',
      description: 'List local long-term memories for the current workspace or global scope.',
      parameters: {
        type: 'object',
        properties: {
          scope: SCOPE_SCHEMA,
          limit: { type: 'number', description: 'Max entries (1-100, default 50).' },
        },
      },
      output: textOutput(),
      timeoutMs: 15000,
      isConcurrencySafe: () => true,
      async execute(args, exec) {
        const scope = scopeOf(args)
        const { project } = await projectFor(ctx, store, exec)
        const entries = store.list(scope, scope === 'project' ? project.id : undefined).slice(0, limitOf(args, 50))
        return json({ ok: true, scope, project: scope === 'project' ? { id: project.id, path: project.path } : null, entries })
      },
    },
    {
      name: 'memory_forget',
      description: 'Delete one local memory by id. Requires the id returned by memory_list or memory_recall.',
      parameters: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Memory id, for example mem_...' },
          scope: SCOPE_SCHEMA,
        },
        required: ['id'],
      },
      output: textOutput(),
      timeoutMs: 15000,
      isConcurrencySafe: () => false,
      async execute(args, exec) {
        const scope = scopeOf(args)
        const { project } = await projectFor(ctx, store, exec)
        const removed = store.remove(scope, scope === 'project' ? project.id : undefined, String(args.id))
        return json({ ok: true, removed, id: args.id, scope })
      },
    },
    {
      name: 'memory_inspect',
      description:
        'Show the exact local-memory block that would be injected into the next system prompt for a query, with count and character budget. ' +
        'Use after remembering or deleting to verify the effect.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'The user text to match; omit to inspect pinned/recent entries.' },
          scope: SCOPE_SCHEMA,
        },
      },
      output: textOutput(),
      timeoutMs: 15000,
      isConcurrencySafe: () => true,
      async execute(args, exec) {
        const scope = scopeOf(args)
        const { project } = await projectFor(ctx, store, exec)
        const result = store.renderInjection({
          projectId: scope === 'project' ? project.id : undefined,
          query: args.query,
        })
        return json({
          ok: true,
          scope,
          project: scope === 'project' ? { id: project.id, path: project.path } : null,
          text: result.text,
          count: result.count,
          chars: result.chars,
          entries: result.entries,
        })
      },
    },
  ]
}
