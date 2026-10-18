import { MemoryStore } from './lib/store.js'
import { buildTools } from './lib/tools.js'
import { MemoryRemoteService } from './lib/remote.js'

export const name = 'memory-local'
export const inject = ['tools', 'workingDirectory']

function userText(messages) {
  const parts = []
  for (const message of messages ?? []) {
    if (message?.role !== 'user') continue
    if (typeof message.content === 'string') {
      parts.push(message.content)
      continue
    }
    for (const block of message.content ?? []) {
      if (block?.type === 'text' && typeof block.text === 'string') parts.push(block.text)
    }
  }
  return parts.join('\n').trim()
}

export function apply(ctx, config = {}) {
  const store = new MemoryStore(config.storeDir)
  const lastUser = new Map()
  const projectByAgent = new Map()
  const sectionDisposers = new Map()

  for (const tool of buildTools(ctx, store)) {
    ctx.tools.register(tool)
  }

  ctx.plugin(MemoryRemoteService, { store })

  ctx.on('agent/created', async ({ agent, signal }) => {
    let cwd = ''
    try {
      cwd = await ctx.workingDirectory.ensure(agent, signal)
    } catch {}
    const project = store.ensureProject(cwd || process.cwd())
    projectByAgent.set(agent.id, project.id)

    const systemPrompt = agent.ctx?.systemPrompt ?? agent.ctx?.get?.('systemPrompt')
    if (!systemPrompt) return

    const dispose = systemPrompt.section({
      name: 'memory-local',
      order: 860,
      text: () => {
        const projectId = projectByAgent.get(agent.id)
        if (!projectId) return ''
        const result = store.renderInjection({
          projectId,
          query: lastUser.get(agent.id) || '',
        })
        return result.text
      },
    })
    sectionDisposers.set(agent.id, dispose)
  })

  ctx.on('agent/pre-step', (payload, next) => {
    const text = userText(payload.messages)
    if (text) lastUser.set(payload.agent.id, text)
    return next()
  })

  ctx.on('agent/disposed', ({ agent }) => {
    sectionDisposers.get(agent.id)?.()
    sectionDisposers.delete(agent.id)
    lastUser.delete(agent.id)
    projectByAgent.delete(agent.id)
  })

  ctx.effect(() => () => {
    for (const dispose of sectionDisposers.values()) dispose()
    sectionDisposers.clear()
    lastUser.clear()
    projectByAgent.clear()
  })
}
