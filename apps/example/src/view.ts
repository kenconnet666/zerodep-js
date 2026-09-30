import type { RenderMode } from '@zerodep-js/ssr';

// 工程探针：框架 mount/hydrate 完成后替换此原生 DOM 示例。
export function renderExample(mode: RenderMode): string {
  return `
    <main>
      <p class="eyebrow">渲染工程验证</p>
      <h1>zerodep-js</h1>
      <p>当前首屏模式：<strong data-mode>${mode.toUpperCase()}</strong></p>
      <nav aria-label="渲染模式">
        <a href="/?render=ssr" ${mode === 'ssr' ? 'aria-current="page"' : ''}>服务端渲染 SSR</a>
        <a href="/?render=csr" ${mode === 'csr' ? 'aria-current="page"' : ''}>客户端渲染 CSR</a>
      </nav>
      <section aria-label="交互探针">
        <button type="button" data-increment disabled>增加计数</button>
        <output data-count aria-live="polite">0</output>
        <p data-client-status>等待客户端接入</p>
      </section>
      <p class="note">这是原生 DOM 工程探针。框架响应式、JSX 编译和通用 hydration 尚未实现。</p>
    </main>
  `;
}

export function attachExample(root: HTMLElement): () => void {
  const button = root.querySelector<HTMLButtonElement>('[data-increment]');
  const output = root.querySelector<HTMLOutputElement>('[data-count]');
  const status = root.querySelector<HTMLElement>('[data-client-status]');
  if (!button || !output || !status) throw new Error('Example markup is incomplete.');

  let count = 0;
  const increment = () => {
    output.textContent = String(++count);
  };
  button.disabled = false;
  button.addEventListener('click', increment);
  status.textContent = '客户端已接入';
  root.dataset.clientReady = 'true';

  return () => button.removeEventListener('click', increment);
}
