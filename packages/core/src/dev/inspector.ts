import {
  clearEvents,
  recordEvent,
  reset,
  snapshot,
  subscribe,
  type DebugSnapshot,
} from './runtime.js';

let installed = false;
export function installInspector(): void {
  if (installed || typeof window === 'undefined' || typeof document === 'undefined') return;
  installed = true;
  const controller = new AbortController();
  const signal = controller.signal;
  const bridge = Object.freeze({ snapshot, reset, clearEvents });
  Object.defineProperty(window, '__ZERODEP_DEVTOOLS__', { value: bridge, configurable: true });
  const host = document.createElement('div');
  host.setAttribute('data-zerodep-devtools', '');
  const shadow = host.attachShadow({ mode: 'open' });
  // 固定界面文字可用静态模板；组件名、状态与错误始终通过 textContent 写入。
  shadow.innerHTML = `<style>
    :host{all:initial;position:fixed;right:12px;bottom:12px;z-index:2147483647;font:13px/1.5 system-ui,sans-serif;color:#e5e7eb}
    button{font:inherit;color:inherit;background:#263449;border:1px solid #66758a;border-radius:5px;padding:5px 9px;cursor:pointer}
    button:focus-visible{outline:2px solid #60a5fa;outline-offset:2px}button:disabled{opacity:.5;cursor:default}
    aside{background:#101827;border:1px solid #526174;border-radius:9px;padding:12px;width:min(640px,calc(100vw - 48px));max-height:60vh;overflow:auto;margin-bottom:8px;box-shadow:0 4px 20px #0005}
    aside[hidden]{display:none}header,nav{display:flex;gap:8px;align-items:center;flex-wrap:wrap}header{justify-content:space-between}h2,h3{font-size:14px;margin:10px 0 5px}
    .tree{max-height:160px;overflow:auto;display:flex;flex-direction:column;align-items:stretch;gap:3px}.tree button{text-align:left}.tree button[aria-pressed=true]{background:#245591}
    pre{white-space:pre-wrap;overflow-wrap:anywhere;font:12px/1.55 ui-monospace,monospace;margin:5px 0;color:#dce9fa}.muted{color:#a8b9d1;font-size:12px}
    ol{padding-left:22px;max-height:160px;overflow:auto;font-size:12px}li{overflow-wrap:anywhere}
  </style>
  <aside hidden aria-label="zerodep 开发检查">
    <header><strong>zerodep 开发检查</strong><span class="count"></span></header>
    <p class="muted">只查看当前页面；状态在面板打开时采样，不是性能分析器。</p>
    <h2>组件</h2><nav class="tree" aria-label="组件列表"></nav>
    <h3 class="selected">选择一个组件</h3><pre class="source"></pre><pre class="state"></pre>
    <button class="reset" disabled>重新初始化此组件</button>
    <h3>最近事件（最多 200 条）</h3><button class="clear">清空事件</button><ol></ol>
  </aside><button class="toggle" aria-expanded="false">开发检查</button>`;
  const panel = shadow.querySelector('aside')!;
  const tree = shadow.querySelector('.tree')!;
  const state = shadow.querySelector('.state')!;
  const label = shadow.querySelector('.selected')!;
  const source = shadow.querySelector('.source')!;
  const count = shadow.querySelector('.count')!;
  const resetButton = shadow.querySelector<HTMLButtonElement>('.reset')!;
  const toggle = shadow.querySelector<HTMLButtonElement>('.toggle')!;
  const timeline = shadow.querySelector('ol')!;
  let selected: number | undefined;
  let timer: ReturnType<typeof setInterval> | undefined;
  let treeKey = '';
  let eventsKey = '';
  let previousValues = new Map<number, string>();

  function render(): void {
    if (panel.hidden) return;
    const data: DebugSnapshot = snapshot();
    count.textContent = `${data.components.length} 个实例`;
    if (!data.components.some((component) => component.id === selected))
      selected = data.components[0]?.id;
    const key =
      JSON.stringify(
        data.components.map((component) => [component.id, component.parent, component.name]),
      ) + selected;
    if (key !== treeKey) {
      treeKey = key;
      const nodes = data.components.map((component) => {
        const button = document.createElement('button');
        button.dataset.id = String(component.id);
        let depth = 0;
        let parent = component.parent;
        const seen = new Set<number>();
        while (parent !== undefined && !seen.has(parent)) {
          seen.add(parent);
          depth++;
          parent = data.components.find((item) => item.id === parent)?.parent;
        }
        button.style.paddingInlineStart = `${9 + depth * 14}px`;
        button.textContent = `${component.name} #${component.id}`;
        button.setAttribute('aria-pressed', String(component.id === selected));
        return button;
      });
      tree.replaceChildren(...nodes);
    }
    const current = data.components.find((component) => component.id === selected);
    label.textContent = current ? `${current.name} #${current.id}` : '没有已挂载组件';
    source.textContent = current ? `${current.file}:${current.line}` : '';
    state.textContent = current?.state.length
      ? current.state.map((item) => `${item.name} = ${item.value}`).join('\n')
      : '没有登记的本地状态（只登记组件直接声明的 _state）';
    resetButton.disabled = !current;
    const nextValues = new Map<number, string>();
    for (const component of data.components) {
      const value = JSON.stringify(component.state);
      const previous = previousValues.get(component.id);
      if (previous !== undefined && previous !== value)
        recordEvent('state', '本地状态发生变化（采样）', component.id);
      nextValues.set(component.id, value);
    }
    previousValues = nextValues;
    const historyKey = data.events.map((event) => event.id).join(',');
    if (historyKey !== eventsKey) {
      eventsKey = historyKey;
      timeline.replaceChildren(
        ...data.events
          .slice()
          .reverse()
          .map((event) => {
            const item = document.createElement('li');
            item.textContent = `${new Date(event.time).toLocaleTimeString()} [${event.type}]${event.component === undefined ? '' : ' #' + event.component} ${event.message}`;
            return item;
          }),
      );
    }
  }
  tree.addEventListener(
    'click',
    (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const id = target.closest('button')?.dataset.id;
      if (id) {
        selected = Number(id);
        render();
      }
    },
    { signal },
  );
  toggle.addEventListener(
    'click',
    () => {
      panel.hidden = !panel.hidden;
      toggle.setAttribute('aria-expanded', String(!panel.hidden));
      clearInterval(timer);
      previousValues.clear();
      if (!panel.hidden) {
        render();
        timer = setInterval(render, 500);
      }
    },
    { signal },
  );
  resetButton.addEventListener(
    'click',
    () => {
      if (selected !== undefined) reset(selected);
    },
    { signal },
  );
  shadow.querySelector('.clear')!.addEventListener(
    'click',
    () => {
      clearEvents();
      render();
    },
    { signal },
  );
  const unsubscribe = subscribe(render);
  window.addEventListener(
    'error',
    (event) => recordEvent('error', event.message || '浏览器执行异常'),
    { signal },
  );
  window.addEventListener(
    'unhandledrejection',
    (event) => {
      const failure: unknown = event.reason;
      recordEvent('error', failure instanceof Error ? failure.message : '未处理的异步异常');
    },
    { signal },
  );
  const attach = () => document.body?.append(host);
  if (document.body) attach();
  else document.addEventListener('DOMContentLoaded', attach, { once: true, signal });
  window.addEventListener(
    'pagehide',
    (event) => {
      if (event.persisted) return;
      clearInterval(timer);
      unsubscribe();
      controller.abort();
      host.remove();
      Reflect.deleteProperty(window, '__ZERODEP_DEVTOOLS__');
    },
    { signal },
  );
}
