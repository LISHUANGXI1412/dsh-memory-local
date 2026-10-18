window.__ModuleLoader__.load({
  id: 'dsh-memory-local',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    const EN = {
      label: 'Memory',
      title: 'Local Memory',
      subtitle: 'Local files only. Nothing is uploaded.',
      project: 'Project',
      global: 'Global',
      add: 'Add memory',
      search: 'Search memories…',
      empty: 'No memories yet',
      emptyHint: 'Remember a stable preference, a decision, or a project gotcha. It will be available in later sessions.',
      noProjects: 'No workspace memory yet',
      noProjectsHint: 'Add a project memory from a session first. You can still manage global memory now.',
      noResults: 'No matches',
      noResultsHint: 'Try another keyword or clear the search.',
      content: 'Content',
      tags: 'Tags',
      tagsHint: 'Comma separated',
      pinned: 'Pinned',
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      confirmDelete: 'Delete this memory?',
      preview: 'Next injection',
      refresh: 'Refresh',
      entries: 'entries',
      chars: 'chars',
      pinnedCount: 'pinned',
      projectsCount: 'projects',
      globalCount: 'global',
      injectionEmpty: 'Nothing would be injected yet. Pinned and relevant entries appear here.',
      projectPath: 'Workspace',
      loading: 'Loading…',
      saved: 'Saved.',
      deleted: 'Deleted.',
      newMemory: 'New memory',
      editMemory: 'Edit memory',
      clear: 'Clear',
      total: 'Total',
      all: 'All',
    }
    const ZH = {
      label: '记忆',
      title: '本地记忆',
      subtitle: '只写入本地文件，不上传任何内容。',
      project: '项目',
      global: '全局',
      add: '添加记忆',
      search: '搜索记忆…',
      empty: '还没有记忆',
      emptyHint: '记下稳定的偏好、决策或项目坑点，之后的新会话会自动看到。',
      noProjects: '还没有项目记忆',
      noProjectsHint: '先在会话里添加一条项目记忆；现在仍然可以管理全局记忆。',
      noResults: '没有匹配项',
      noResultsHint: '换个关键词，或清空搜索。',
      content: '内容',
      tags: '标签',
      tagsHint: '逗号分隔',
      pinned: '置顶',
      save: '保存',
      cancel: '取消',
      edit: '编辑',
      delete: '删除',
      confirmDelete: '确定删除这条记忆？',
      preview: '下一次注入',
      refresh: '刷新',
      entries: '条',
      chars: '字符',
      pinnedCount: '置顶',
      projectsCount: '项目',
      globalCount: '全局',
      injectionEmpty: '目前不会注入任何内容。置顶和相关条目会出现在这里。',
      projectPath: '项目路径',
      loading: '加载中…',
      saved: '已保存。',
      deleted: '已删除。',
      newMemory: '新建记忆',
      editMemory: '编辑记忆',
      clear: '清空',
      total: '总计',
      all: '全部',
    }

    const CSS = `
.mem_page {
  --mem-bg: var(--dsw-alias-bg-base);
  --mem-layer: var(--dsw-alias-bg-layer-1);
  --mem-layer2: var(--dsw-alias-bg-layer-2);
  --mem-border: var(--dsw-alias-border-l1);
  --mem-border2: var(--dsw-alias-border-l2);
  --mem-text: var(--dsw-alias-label-primary);
  --mem-text2: var(--dsw-alias-label-secondary);
  --mem-brand: var(--dsw-alias-brand-primary);
  --mem-error: var(--dsw-alias-state-error-primary);
  --mem-success: var(--dsw-alias-state-success-primary);
  max-width: 920px;
  padding: 4px 2px 32px;
  color: var(--mem-text);
  font-family: inherit;
}
.mem_page *, .mem_page *::before, .mem_page *::after { box-sizing: border-box; }
.mem_page button, .mem_page input, .mem_page textarea, .mem_page select { font: inherit; color: inherit; }
.mem_page button { cursor: pointer; }
.mem_page button:disabled { cursor: default; opacity: .45; }
.mem_page :focus-visible { outline: 2px solid var(--mem-brand); outline-offset: 2px; }

.mem_header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 16px; }
.mem_brand { display: flex; align-items: center; gap: 12px; min-width: 0; }
.mem_logo {
  width: 42px; height: 42px; border-radius: 13px; display: grid; place-items: center;
  color: #fff; flex: none;
  background: linear-gradient(135deg, var(--mem-brand), color-mix(in srgb, var(--mem-brand) 52%, var(--mem-layer2)));
  box-shadow: 0 6px 18px color-mix(in srgb, var(--mem-brand) 28%, transparent);
}
.mem_heading { min-width: 0; }
.mem_title { margin: 0; font-size: 20px; font-weight: 660; letter-spacing: -.01em; }
.mem_sub { margin: 3px 0 0; font-size: 12px; color: var(--mem-text2); }
.mem_header_actions { display: flex; align-items: center; gap: 7px; flex: none; }

.mem_stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; margin-bottom: 14px; }
.mem_stat {
  border: 1px solid var(--mem-border); background: var(--mem-layer);
  border-radius: 11px; padding: 9px 11px; min-width: 0;
}
.mem_stat_value { font-size: 17px; font-weight: 650; line-height: 1.2; }
.mem_stat_label { margin-top: 2px; font-size: 10.5px; color: var(--mem-text2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.mem_tabs {
  display: inline-flex; gap: 3px; padding: 3px; margin-bottom: 14px;
  background: var(--mem-layer2); border: 1px solid var(--mem-border); border-radius: 10px;
}
.mem_tab {
  display: inline-flex; align-items: center; gap: 6px; border: 0; background: transparent;
  color: var(--mem-text2); padding: 6px 11px; border-radius: 7px; font-size: 12.5px;
}
.mem_tab:hover { color: var(--mem-text); }
.mem_tab.on { color: var(--mem-text); background: var(--mem-layer); box-shadow: 0 1px 4px rgba(0,0,0,.12); font-weight: 600; }
.mem_tab_count { font-size: 10.5px; color: var(--mem-text2); background: var(--mem-layer2); border-radius: 999px; padding: 1px 6px; min-width: 17px; text-align: center; }
.mem_tab.on .mem_tab_count { color: var(--mem-text); }

.mem_toolbar { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; }
.mem_select {
  appearance: none; min-width: 170px; max-width: 260px; flex: 0 1 240px;
  background: var(--mem-layer); border: 1px solid var(--mem-border); border-radius: 9px;
  padding: 8px 28px 8px 10px; font-size: 12.5px; color: var(--mem-text); cursor: pointer;
  background-image: linear-gradient(45deg, transparent 50%, var(--mem-text2) 50%), linear-gradient(135deg, var(--mem-text2) 50%, transparent 50%);
  background-position: calc(100% - 15px) 52%, calc(100% - 10px) 52%;
  background-size: 5px 5px, 5px 5px; background-repeat: no-repeat;
}
.mem_select:disabled { opacity: .55; }
.mem_search { position: relative; flex: 1 1 200px; min-width: 160px; }
.mem_search_icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: var(--mem-text2); pointer-events: none; display: grid; }
.mem_input {
  width: 100%; background: var(--mem-layer); border: 1px solid var(--mem-border);
  border-radius: 9px; padding: 8px 30px 8px 32px; font-size: 12.5px; color: var(--mem-text);
}
.mem_input::placeholder { color: var(--mem-text2); }
.mem_search_clear {
  position: absolute; right: 7px; top: 50%; transform: translateY(-50%);
  border: 0; background: transparent; color: var(--mem-text2); display: grid; place-items: center;
  width: 22px; height: 22px; border-radius: 6px;
}
.mem_search_clear:hover { background: var(--mem-layer2); color: var(--mem-text); }

.mem_btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  border: 1px solid var(--mem-border2); background: var(--mem-layer2); color: var(--mem-text);
  border-radius: 9px; padding: 7px 10px; font-size: 12.5px; white-space: nowrap;
  transition: background .12s ease, border-color .12s ease, transform .08s ease;
}
.mem_btn:hover:not(:disabled) { background: color-mix(in srgb, var(--mem-layer2) 82%, var(--mem-text) 8%); border-color: var(--mem-border2); }
.mem_btn:active:not(:disabled) { transform: translateY(1px); }
.mem_btn.primary {
  background: #1f5b56;
  background: color-mix(in srgb, var(--mem-brand) 45%, #0b1f1d);
  border-color: color-mix(in srgb, var(--mem-brand) 30%, #0b1f1d);
  color: #fff; font-weight: 650; text-shadow: 0 1px 1px rgba(0,0,0,.28);
}
.mem_btn.primary:hover:not(:disabled) {
  background: color-mix(in srgb, var(--mem-brand) 55%, #0b1f1d);
  filter: none;
}
.mem_btn.ghost { background: transparent; border-color: transparent; color: var(--mem-text2); }
.mem_btn.ghost:hover:not(:disabled) { background: var(--mem-layer2); color: var(--mem-text); }
.mem_btn.danger { color: var(--mem-error); border-color: color-mix(in srgb, var(--mem-error) 35%, var(--mem-border)); }
.mem_btn.danger:hover:not(:disabled) { background: color-mix(in srgb, var(--mem-error) 10%, transparent); }
.mem_icon_btn {
  width: 30px; height: 30px; display: grid; place-items: center;
  border: 1px solid transparent; border-radius: 8px; background: transparent; color: var(--mem-text2);
}
.mem_icon_btn:hover:not(:disabled) { background: var(--mem-layer2); color: var(--mem-text); }
.mem_icon_btn.on { color: var(--mem-brand); }
.mem_icon_btn.danger:hover:not(:disabled) { color: var(--mem-error); background: color-mix(in srgb, var(--mem-error) 10%, transparent); }

.mem_path {
  display: flex; align-items: center; gap: 6px; min-width: 0;
  margin: -3px 0 12px; padding: 0 2px; color: var(--mem-text2); font-size: 11px;
}
.mem_path span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.mem_notice { display: flex; align-items: flex-start; gap: 8px; margin: 8px 0 12px; padding: 8px 10px; border-radius: 9px; font-size: 12px; line-height: 1.45; }
.mem_notice.error { color: var(--mem-error); background: color-mix(in srgb, var(--mem-error) 9%, transparent); border: 1px solid color-mix(in srgb, var(--mem-error) 28%, transparent); }
.mem_notice.ok { color: var(--mem-success); background: color-mix(in srgb, var(--mem-success) 9%, transparent); border: 1px solid color-mix(in srgb, var(--mem-success) 28%, transparent); }
.mem_notice svg { flex: none; margin-top: 1px; }

.mem_list { display: flex; flex-direction: column; gap: 8px; }
.mem_card {
  position: relative; border: 1px solid var(--mem-border); background: var(--mem-layer);
  border-radius: 12px; padding: 11px 12px 9px; transition: border-color .12s ease, box-shadow .12s ease;
}
.mem_card:hover { border-color: var(--mem-border2); box-shadow: 0 3px 12px rgba(0,0,0,.10); }
.mem_card.pinned { border-left: 3px solid var(--mem-brand); padding-left: 10px; }
.mem_card_top { display: flex; align-items: flex-start; gap: 8px; }
.mem_content { flex: 1; min-width: 0; white-space: pre-wrap; word-break: break-word; font-size: 12.5px; line-height: 1.55; }
.mem_meta { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-top: 7px; color: var(--mem-text2); font-size: 10.5px; }
.mem_tag { display: inline-flex; align-items: center; gap: 3px; border: 1px solid var(--mem-border); background: var(--mem-layer2); border-radius: 999px; padding: 1px 7px; font-size: 10.5px; color: var(--mem-text2); }
.mem_tag.pin { color: var(--mem-brand); border-color: color-mix(in srgb, var(--mem-brand) 30%, var(--mem-border)); }
.mem_time { margin-left: auto; white-space: nowrap; }
.mem_actions { display: flex; align-items: center; gap: 1px; margin-left: 4px; opacity: .65; transition: opacity .12s ease; }
.mem_card:hover .mem_actions, .mem_actions:focus-within { opacity: 1; }
.mem_actions .mem_icon_btn { width: 26px; height: 26px; }
.mem_confirm { display: flex; align-items: center; gap: 6px; margin-top: 8px; padding-top: 8px; border-top: 1px dashed var(--mem-border); font-size: 11.5px; color: var(--mem-error); }
.mem_confirm .mem_btn { padding: 5px 8px; font-size: 11.5px; }

.mem_edit { border: 1px solid var(--mem-border2); background: var(--mem-layer2); border-radius: 12px; padding: 12px; margin: 12px 0; }
.mem_edit_head { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 9px; }
.mem_edit_title { font-size: 13px; font-weight: 650; }
.mem_textarea {
  width: 100%; min-height: 100px; resize: vertical; background: var(--mem-layer);
  border: 1px solid var(--mem-border); border-radius: 9px; padding: 9px 10px; font-size: 12.5px; line-height: 1.55;
}
.mem_edit_row { display: flex; align-items: center; gap: 10px; margin-top: 9px; flex-wrap: wrap; }
.mem_edit_row .mem_input { flex: 1 1 180px; padding-right: 10px; }
.mem_edit_footer { display: flex; justify-content: flex-end; gap: 7px; margin-top: 10px; }
.mem_switch { display: inline-flex; align-items: center; gap: 7px; font-size: 11.5px; color: var(--mem-text2); cursor: pointer; user-select: none; white-space: nowrap; }
.mem_switch input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.mem_switch_track { width: 30px; height: 17px; border-radius: 999px; background: var(--mem-border2); position: relative; transition: background .15s ease; flex: none; }
.mem_switch_knob { position: absolute; top: 2px; left: 2px; width: 13px; height: 13px; border-radius: 50%; background: var(--mem-layer); box-shadow: 0 1px 2px rgba(0,0,0,.25); transition: transform .15s ease; }
.mem_switch input:checked + .mem_switch_track { background: var(--mem-brand); }
.mem_switch input:checked + .mem_switch_track .mem_switch_knob { transform: translateX(13px); background: #fff; }
.mem_switch input:focus-visible + .mem_switch_track { outline: 2px solid var(--mem-brand); outline-offset: 2px; }

.mem_empty { text-align: center; padding: 34px 16px 30px; border: 1px dashed var(--mem-border); border-radius: 14px; background: color-mix(in srgb, var(--mem-layer) 55%, transparent); }
.mem_empty_icon { width: 44px; height: 44px; border-radius: 14px; margin: 0 auto 10px; display: grid; place-items: center; color: var(--mem-brand); background: color-mix(in srgb, var(--mem-brand) 12%, transparent); }
.mem_empty h3 { margin: 0; font-size: 13.5px; font-weight: 650; }
.mem_empty p { margin: 5px auto 0; max-width: 360px; color: var(--mem-text2); font-size: 11.5px; line-height: 1.55; }
.mem_empty .mem_btn { margin-top: 12px; }

.mem_preview { margin-top: 18px; border: 1px solid var(--mem-border); background: var(--mem-layer); border-radius: 12px; overflow: hidden; }
.mem_preview_head { display: flex; align-items: center; gap: 7px; padding: 9px 11px; border-bottom: 1px solid var(--mem-border); }
.mem_preview_title { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; }
.mem_preview_count { margin-left: auto; color: var(--mem-text2); font-size: 10.5px; }
.mem_preview pre {
  margin: 0; padding: 11px 12px; white-space: pre-wrap; word-break: break-word;
  font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace;
  font-size: 11px; line-height: 1.6; color: var(--mem-text2);
  background: var(--mem-layer2); max-height: 240px; overflow: auto;
}
.mem_preview pre.empty { color: var(--mem-text2); font-family: inherit; font-size: 11.5px; }
.mem_preview pre::-webkit-scrollbar { width: 8px; height: 8px; }
.mem_preview pre::-webkit-scrollbar-thumb { background: var(--mem-border2); border-radius: 8px; }

.mem_loading { display: inline-flex; align-items: center; gap: 6px; color: var(--mem-text2); font-size: 11.5px; padding: 8px 2px; }
.mem_spinner { width: 13px; height: 13px; border-radius: 50%; border: 2px solid var(--mem-border2); border-top-color: var(--mem-brand); animation: mem-spin .8s linear infinite; }
@keyframes mem-spin { to { transform: rotate(360deg); } }

@media (max-width: 640px) {
  .mem_header { flex-direction: column; }
  .mem_header_actions { width: 100%; justify-content: flex-end; }
  .mem_toolbar { align-items: stretch; }
  .mem_select { max-width: none; flex: 1 1 100%; }
  .mem_search { flex: 1 1 100%; }
  .mem_toolbar > .mem_btn { flex: 1 1 100%; }
}
`

    function makeT(ctx) {
      try {
        ctx.locale.register('memory', { en: EN, zh: ZH })
      } catch {}
      let bound
      try {
        bound = ctx.locale.bind('memory')
      } catch {}
      return function t(key, fallback) {
        try {
          if (typeof bound === 'function') {
            const value = bound(key)
            if (typeof value === 'string' && value) return value
          } else if (bound && typeof bound[key] === 'string') {
            return bound[key]
          }
        } catch {}
        let id = 'en'
        try { id = ctx.locale.getLocale().id } catch {}
        const dict = id === 'zh' ? ZH : EN
        return dict[key] || fallback || key
      }
    }

    function makeMemoryApi(ctx) {
      function call(method, args) {
        return ctx.connection.rpc.call('/api', `memory/${method}`, { args: args || {} }, undefined).then(function (response) {
          if (response && response.ok) return response.value
          const message = response && response.error ? response.error.message : 'memory remote call failed'
          const error = new Error(message)
          error.code = response && response.error ? response.error.code : 'REMOTE_FAILED'
          throw error
        })
      }
      return {
        projects: function () { return call('projects', {}) },
        list: function (args) {
          const input = args || {}
          return call('list', { scope: input.scope, projectId: input.projectId || '' })
        },
        save: function (args) {
          const input = args || {}
          return call('save', {
            id: input.id || '',
            content: input.content,
            tags: input.tags || [],
            pinned: input.pinned === true,
            scope: input.scope,
            projectId: input.projectId || '',
          })
        },
        remove: function (args) {
          const input = args || {}
          return call('remove', { id: input.id, scope: input.scope, projectId: input.projectId || '' })
        },
        inspect: function (args) {
          const input = args || {}
          return call('inspect', { query: input.query || '', scope: input.scope, projectId: input.projectId || '' })
        },
      }
    }

    function icon(children, size) {
      return h('svg', {
        width: size || 16, height: size || 16, viewBox: '0 0 24 24', fill: 'none',
        stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round',
        'aria-hidden': 'true',
      }, children)
    }
    function IconPlus(p) { return icon([h('path', { key: 'p', d: 'M12 5v14M5 12h14' })], p && p.size) }
    function IconRefresh(p) { return icon([
      h('path', { key: 'a', d: 'M20 11a8 8 0 1 0-2.3 5.7' }),
      h('path', { key: 'b', d: 'M20 4v7h-7' }),
    ], p && p.size) }
    function IconSearch(p) { return icon([
      h('circle', { key: 'c', cx: 11, cy: 11, r: 6.5 }),
      h('path', { key: 'l', d: 'M16 16l4.5 4.5' }),
    ], p && p.size) }
    function IconClose(p) { return icon([h('path', { key: 'x', d: 'M6 6l12 12M18 6L6 18' })], p && p.size) }
    function IconEdit(p) { return icon([
      h('path', { key: 'a', d: 'M4 20h4L19 9l-4-4L4 16v4Z' }),
      h('path', { key: 'b', d: 'M13.5 6.5l4 4' }),
    ], p && p.size) }
    function IconTrash(p) { return icon([
      h('path', { key: 'a', d: 'M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13' }),
      h('path', { key: 'b', d: 'M10 11v5M14 11v5' }),
    ], p && p.size) }
    function IconCheck(p) { return icon([h('path', { key: 'c', d: 'M5 12.5l4.5 4.5L19 7.5' })], p && p.size) }
    function IconStar(p) {
      return icon([h('path', {
        key: 's', d: 'M12 3.6l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.6Z',
        fill: p && p.filled ? 'currentColor' : 'none',
      })], (p && p.size) || 15)
    }
    function IconMemory(p) { return icon([
      h('path', { key: 'a', d: 'M9 4.5h6a3 3 0 0 1 3 3v13l-6-3-6 3v-13a3 3 0 0 1 3-3Z' }),
      h('circle', { key: 'b', cx: 10.5, cy: 10, r: 1 }),
      h('circle', { key: 'c', cx: 13.5, cy: 10, r: 1 }),
      h('path', { key: 'd', d: 'M10 13.2h4' }),
    ], p && p.size) }

    function formatTime(value) {
      try { return new Date(value).toLocaleString() } catch { return '' }
    }

    function IconButton(props) {
      return h('button', {
        type: 'button',
        className: 'mem_icon_btn' + (props.active ? ' on' : '') + (props.danger ? ' danger' : ''),
        title: props.label,
        'aria-label': props.label,
        onClick: props.onClick,
        disabled: props.disabled,
      }, props.children)
    }

    function Stat(props) {
      return h('div', { className: 'mem_stat' },
        h('div', { className: 'mem_stat_value' }, props.value),
        h('div', { className: 'mem_stat_label' }, props.label))
    }

    function MemoryPage(props) {
      const api = props.memory
      const t = props.t
      const [tab, setTab] = React.useState('project')
      const [projects, setProjects] = React.useState([])
      const [globalCount, setGlobalCount] = React.useState(0)
      const [totalCount, setTotalCount] = React.useState(0)
      const [totalPinned, setTotalPinned] = React.useState(0)
      const [projectId, setProjectId] = React.useState('')
      const [entries, setEntries] = React.useState([])
      const [query, setQuery] = React.useState('')
      const [editing, setEditing] = React.useState(null)
      const [confirmId, setConfirmId] = React.useState('')
      const [busy, setBusy] = React.useState(false)
      const [error, setError] = React.useState('')
      const [status, setStatus] = React.useState('')
      const [preview, setPreview] = React.useState(null)

      const scopeArgs = function () {
        return tab === 'project' ? { scope: 'project', projectId: projectId || undefined } : { scope: 'global' }
      }

      const refreshProjects = function () {
        return api.projects().then(function (value) {
          const list = value && Array.isArray(value.projects) ? value.projects : []
          setProjects(list)
          setGlobalCount(value && typeof value.globalCount === 'number' ? value.globalCount : 0)
          setTotalCount(value && typeof value.totalCount === 'number' ? value.totalCount : 0)
          setTotalPinned(value && typeof value.totalPinned === 'number' ? value.totalPinned : 0)
          setProjectId(function (current) {
            if (current && list.some(function (item) { return item.id === current })) return current
            return (value && value.defaultProjectId) || (value && value.lastActiveProjectId) || (list[0] && list[0].id) || ''
          })
        })
      }

      const refreshEntries = function () {
        setBusy(true)
        setError('')
        const args = scopeArgs()
        return Promise.all([api.list(args), api.inspect({ ...args, query: query || '' })])
          .then(function (values) {
            setEntries(values[0] && Array.isArray(values[0].entries) ? values[0].entries : [])
            setPreview(values[1] || null)
          })
          .catch(function (reason) {
            setError(reason && reason.message ? reason.message : String(reason))
          })
          .finally(function () { setBusy(false) })
      }

      React.useEffect(function () {
        refreshProjects().catch(function (reason) {
          setError(reason && reason.message ? reason.message : String(reason))
        })
      }, [])

      React.useEffect(function () {
        if (tab === 'project' && !projectId) return
        refreshEntries()
      }, [tab, projectId])

      React.useEffect(function () {
        if (tab === 'project' && !projectId) return
        const timer = setTimeout(function () {
          api.inspect({ ...scopeArgs(), query: query || '' }).then(function (value) {
            setPreview(value || null)
          }).catch(function () {})
        }, 280)
        return function () { clearTimeout(timer) }
      }, [query, tab, projectId])

      React.useEffect(function () {
        if (!status) return
        const timer = setTimeout(function () { setStatus('') }, 2400)
        return function () { clearTimeout(timer) }
      }, [status])

      const currentProject = projects.find(function (item) { return item.id === projectId })
      const q = query.trim().toLowerCase()
      const visible = entries.filter(function (entry) {
        if (!q) return true
        return `${entry.content} ${entry.tags.join(' ')}`.toLowerCase().includes(q)
      })
      const canAdd = tab === 'global' || Boolean(projectId)
      const emptyTitle = tab === 'project' && !projectId ? t('noProjects') : q ? t('noResults') : t('empty')
      const emptyHint = tab === 'project' && !projectId ? t('noProjectsHint') : q ? t('noResultsHint') : t('emptyHint')

      function startNew() {
        if (!canAdd) return
        setEditing({ id: '', content: '', tags: '', pinned: false })
        setStatus('')
        setError('')
      }

      function startEdit(entry) {
        setEditing({ id: entry.id, content: entry.content, tags: entry.tags.join(', '), pinned: entry.pinned === true })
        setStatus('')
        setError('')
      }

      function saveEdit() {
        if (!editing) return
        if (!editing.content.trim()) {
          setError(t('content') + ' is empty')
          return
        }
        const tags = editing.tags.split(',').map(function (tag) { return tag.trim() }).filter(Boolean)
        const payload = {
          ...scopeArgs(),
          content: editing.content,
          tags: tags,
          pinned: editing.pinned === true,
        }
        if (editing.id) payload.id = editing.id
        setBusy(true)
        setError('')
        api.save(payload).then(function () {
          setEditing(null)
          setStatus(t('saved'))
          return Promise.all([refreshProjects(), refreshEntries()])
        }).catch(function (reason) {
          setError(reason && reason.message ? reason.message : String(reason))
        }).finally(function () { setBusy(false) })
      }

      function removeEntry(id) {
        setBusy(true)
        setError('')
        api.remove({ ...scopeArgs(), id: id }).then(function () {
          setConfirmId('')
          setStatus(t('deleted'))
          return Promise.all([refreshProjects(), refreshEntries()])
        }).catch(function (reason) {
          setError(reason && reason.message ? reason.message : String(reason))
        }).finally(function () { setBusy(false) })
      }

      function togglePin(entry) {
        setBusy(true)
        setError('')
        api.save({ ...scopeArgs(), id: entry.id, content: entry.content, tags: entry.tags, pinned: entry.pinned !== true })
          .then(function () { return refreshEntries() })
          .catch(function (reason) {
            setError(reason && reason.message ? reason.message : String(reason))
          })
          .finally(function () { setBusy(false) })
      }

      function switchTab(id) {
        setTab(id)
        setEditing(null)
        setConfirmId('')
        setStatus('')
      }

      const tabButton = function (id, label, count) {
        return h('button', {
          type: 'button',
          className: 'mem_tab' + (tab === id ? ' on' : ''),
          onClick: function () { switchTab(id) },
        }, label, h('span', { className: 'mem_tab_count' }, count))
      }

      const projectOptions = projects.map(function (project) {
        return h('option', { key: project.id, value: project.id }, project.name + '  (' + project.count + ')')
      })

      return h('section', { className: 'mem_page' },
        h('header', { className: 'mem_header' },
          h('div', { className: 'mem_brand' },
            h('div', { className: 'mem_logo' }, IconMemory({ size: 21 })),
            h('div', { className: 'mem_heading' },
              h('h2', { className: 'mem_title' }, t('title')),
              h('p', { className: 'mem_sub' }, t('subtitle')))),
          h('div', { className: 'mem_header_actions' },
            h('button', { type: 'button', className: 'mem_btn ghost', onClick: refreshEntries, disabled: busy, title: t('refresh') },
              IconRefresh({ size: 14 }), t('refresh')),
            h('button', { type: 'button', className: 'mem_btn primary', onClick: startNew, disabled: busy || !canAdd },
              IconPlus({ size: 14 }), t('add')))),

        h('div', { className: 'mem_stats' },
          h(Stat, { value: totalCount, label: t('all') }),
          h(Stat, { value: totalPinned, label: t('pinnedCount') }),
          h(Stat, { value: projects.length, label: t('projectsCount') })),

        h('div', { className: 'mem_tabs' },
          tabButton('project', t('project'), projects.length),
          tabButton('global', t('global'), globalCount)),

        h('div', { className: 'mem_toolbar' },
          tab === 'project'
            ? h('select', {
                className: 'mem_select',
                value: projectId,
                onChange: function (event) { setProjectId(event.target.value); setEditing(null); setConfirmId('') },
                disabled: projects.length === 0,
              }, projects.length === 0 ? h('option', { value: '' }, t('noProjects')) : projectOptions)
            : h('div', { className: 'mem_tag', style: { padding: '7px 10px', fontSize: '11.5px' } }, t('global')),
          h('div', { className: 'mem_search' },
            h('span', { className: 'mem_search_icon' }, IconSearch({ size: 14 })),
            h('input', {
              className: 'mem_input',
              placeholder: t('search'),
              value: query,
              onChange: function (event) { setQuery(event.target.value) },
            }),
            query ? h('button', {
              type: 'button', className: 'mem_search_clear', title: t('clear'), 'aria-label': t('clear'),
              onClick: function () { setQuery('') },
            }, IconClose({ size: 13 })) : null)),

        tab === 'project' && currentProject ? h('div', { className: 'mem_path' },
          h('span', null, t('projectPath') + ' · ' + currentProject.path)) : null,

        error ? h('div', { className: 'mem_notice error' },
          h('span', null, IconClose({ size: 13 })), h('span', null, error)) : null,
        status ? h('div', { className: 'mem_notice ok' },
          h('span', null, IconCheck({ size: 13 })), h('span', null, status)) : null,

        editing ? h('div', { className: 'mem_edit' },
          h('div', { className: 'mem_edit_head' },
            h('div', { className: 'mem_edit_title' }, editing.id ? t('editMemory') : t('newMemory')),
            h(IconButton, { label: t('cancel'), onClick: function () { setEditing(null) } }, IconClose({ size: 14 }))),
          h('textarea', {
            className: 'mem_textarea',
            value: editing.content,
            placeholder: t('content'),
            maxLength: 4096,
            autoFocus: true,
            onChange: function (event) { setEditing({ ...editing, content: event.target.value }) },
          }),
          h('div', { className: 'mem_edit_row' },
            h('input', {
              className: 'mem_input',
              value: editing.tags,
              placeholder: t('tags') + ' · ' + t('tagsHint'),
              onChange: function (event) { setEditing({ ...editing, tags: event.target.value }) },
            }),
            h('label', { className: 'mem_switch' },
              h('input', {
                type: 'checkbox',
                checked: editing.pinned === true,
                onChange: function (event) { setEditing({ ...editing, pinned: event.target.checked }) },
              }),
              h('span', { className: 'mem_switch_track' }, h('span', { className: 'mem_switch_knob' })),
              h('span', null, t('pinned')))),
          h('div', { className: 'mem_edit_footer' },
            h('button', { type: 'button', className: 'mem_btn ghost', onClick: function () { setEditing(null) }, disabled: busy }, t('cancel')),
            h('button', { type: 'button', className: 'mem_btn primary', onClick: saveEdit, disabled: busy },
              IconCheck({ size: 14 }), t('save')))) : null,

        busy && visible.length === 0 ? h('div', { className: 'mem_loading' }, h('span', { className: 'mem_spinner' }), t('loading')) : null,

        visible.length > 0 ? h('div', { className: 'mem_list' },
          visible.map(function (entry) {
            return h('article', { className: 'mem_card' + (entry.pinned ? ' pinned' : ''), key: entry.id },
              h('div', { className: 'mem_card_top' },
                h('div', { className: 'mem_content' }, entry.content)),
              h('div', { className: 'mem_meta' },
                entry.pinned ? h('span', { className: 'mem_tag pin' }, IconStar({ filled: true, size: 11 }), t('pinned')) : null,
                entry.tags.map(function (tag) { return h('span', { className: 'mem_tag', key: tag }, tag) }),
                h('span', { className: 'mem_time' }, formatTime(entry.updatedAt)),
                h('span', { className: 'mem_actions' },
                  h(IconButton, {
                    label: entry.pinned ? 'Unpin' : t('pinned'),
                    active: entry.pinned,
                    onClick: function () { togglePin(entry) },
                    disabled: busy,
                  }, IconStar({ filled: entry.pinned, size: 15 })),
                  h(IconButton, { label: t('edit'), onClick: function () { startEdit(entry) }, disabled: busy }, IconEdit({ size: 14 })),
                  h(IconButton, {
                    label: t('delete'), danger: true,
                    onClick: function () { setConfirmId(entry.id) },
                    disabled: busy,
                  }, IconTrash({ size: 14 })))),
              confirmId === entry.id ? h('div', { className: 'mem_confirm' },
                h('span', null, t('confirmDelete')),
                h('button', { type: 'button', className: 'mem_btn ghost', onClick: function () { setConfirmId('') } }, t('cancel')),
                h('button', { type: 'button', className: 'mem_btn danger', onClick: function () { removeEntry(entry.id) }, disabled: busy }, t('delete'))) : null)
          })) : null,

        !busy && visible.length === 0 ? h('div', { className: 'mem_empty' },
          h('div', { className: 'mem_empty_icon' }, IconMemory({ size: 22 })),
          h('h3', null, emptyTitle),
          h('p', null, emptyHint),
          canAdd ? h('button', { type: 'button', className: 'mem_btn primary', onClick: startNew }, IconPlus({ size: 14 }), t('add')) : null) : null,

        h('section', { className: 'mem_preview' },
          h('div', { className: 'mem_preview_head' },
            h('div', { className: 'mem_preview_title' }, IconMemory({ size: 14 }), t('preview')),
            preview ? h('span', { className: 'mem_preview_count' }, preview.count + ' ' + t('entries') + ' · ' + preview.chars + ' ' + t('chars')) : null,
            h(IconButton, { label: t('refresh'), onClick: refreshEntries, disabled: busy }, IconRefresh({ size: 14 }))),
          h('pre', { className: preview && preview.text ? '' : 'empty' }, preview && preview.text ? preview.text : t('injectionEmpty'))))
    }

    return {
      inject: ['slots', 'connection', 'locale'],
      apply(ctx) {
        const style = document.createElement('style')
        style.dataset.plugin = 'dsh-memory-local'
        style.textContent = CSS
        document.head.appendChild(style)
        ctx.effect(function () {
          return function () { style.remove() }
        })

        const t = makeT(ctx)
        const memory = makeMemoryApi(ctx)
        ctx.slots.inject('settings.section', function () {
          return ctx.slots.register({
            name: 'settings.section',
            id: 'memory-local',
            order: 45,
            label: function () { return t('label', 'Memory') },
            inject: function () { return { memory: memory, t: t } },
          }, MemoryPage)
        })
      },
    }
  },
})
