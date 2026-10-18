import { Remote, TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol'
import { normalizeScope } from './store.js'

/**
 * Apply a Remote(name) marker without TypeScript decorator support.
 * @param {Function} serviceClass
 * @param {string} method
 * @param {string} [exportName]
 */
export function markRemoteMethod(serviceClass, method, exportName = method) {
  const instance = Object.create(serviceClass.prototype)
  const decorate = Remote(exportName)
  decorate(undefined, {
    kind: 'method',
    name: method,
    static: false,
    private: false,
    addInitializer(fn) {
      fn.call(instance)
    },
  })
}

function projectIdFor(store, scope, requested) {
  if (scope === 'global') return undefined
  const wanted = String(requested ?? '').trim()
  if (wanted) {
    const found = store.projects().projects.some((project) => project.id === wanted)
    if (!found) throw new Error(`unknown projectId: ${wanted}`)
    return wanted
  }
  const last = store.projects().lastActiveProjectId
  if (!last) throw new Error('no workspace memory yet; remember a project memory first')
  return last
}

export class MemoryRemoteService extends TypertRemoteService {
  static inject = []

  constructor(ctx, config = {}) {
    super(ctx, 'memory')
    if (!config.store) throw new Error('memory remote service requires a store')
    this.store = config.store
  }

  projects() {
    const projects = this.store.projects()
    const globalEntries = this.store.list('global', undefined)
    let totalCount = globalEntries.length
    let totalPinned = globalEntries.filter((entry) => entry.pinned === true).length
    for (const project of projects.projects) {
      const entries = this.store.list('project', project.id)
      totalCount += entries.length
      totalPinned += entries.filter((entry) => entry.pinned === true).length
    }
    const withEntries = projects.projects
      .filter((project) => project.count > 0)
      .sort((a, b) => b.lastActiveAt - a.lastActiveAt)
    const defaultProjectId = withEntries[0]?.id || projects.lastActiveProjectId || projects.projects[0]?.id || null
    return {
      ok: true,
      ...projects,
      globalCount: globalEntries.length,
      totalCount,
      totalPinned,
      defaultProjectId,
      storeDir: this.store.root,
    }
  }

  list(scope, projectId) {
    const normalized = normalizeScope(scope)
    const pid = projectIdFor(this.store, normalized, projectId)
    const entries = this.store.list(normalized, pid)
    const project = pid ? this.store.projects().projects.find((item) => item.id === pid) : null
    return { ok: true, scope: normalized, projectId: pid ?? null, project, entries }
  }

  save(id, content, tags, pinned, scope, projectId) {
    const normalized = normalizeScope(scope)
    const pid = projectIdFor(this.store, normalized, projectId)
    const entry = this.store.save(normalized, pid, {
      id: id || undefined,
      content,
      tags,
      pinned: pinned === true,
    })
    const project = pid ? this.store.projects().projects.find((item) => item.id === pid) : null
    return { ok: true, scope: normalized, projectId: pid ?? null, project, entry }
  }

  remove(id, scope, projectId) {
    const normalized = normalizeScope(scope)
    const pid = projectIdFor(this.store, normalized, projectId)
    if (!id) throw new Error('id is required')
    const removed = this.store.remove(normalized, pid, String(id))
    return { ok: true, scope: normalized, projectId: pid ?? null, removed, id }
  }

  inspect(query, scope, projectId) {
    const normalized = normalizeScope(scope)
    const pid = projectIdFor(this.store, normalized, projectId)
    const result = this.store.renderInjection({ projectId: pid, query })
    const project = pid ? this.store.projects().projects.find((item) => item.id === pid) : null
    return {
      ok: true,
      scope: normalized,
      projectId: pid ?? null,
      project,
      text: result.text,
      count: result.count,
      chars: result.chars,
      entries: result.entries,
    }
  }
}

markRemoteMethod(MemoryRemoteService, 'projects')
markRemoteMethod(MemoryRemoteService, 'list')
markRemoteMethod(MemoryRemoteService, 'save')
markRemoteMethod(MemoryRemoteService, 'remove')
markRemoteMethod(MemoryRemoteService, 'inspect')
