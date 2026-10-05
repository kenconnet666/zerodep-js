import { _component } from 'zerodep-js';
import { Router, type RouterInstance } from 'zerodep-use/router';

export const Workspace = _component(({ router }: { router: RouterInstance }) => (
  <Router
    router={router}
    pending={<p role="status">正在打开任务空间…</p>}
    notFound={
      <section>
        <h1>404 · 页面不存在</h1>
        <a href="/workspace/tasks">回到任务列表</a>
      </section>
    }
    error={(error, retry) => (
      <section role="alert">
        <h2>
          {error.status} · {error.message}
        </h2>
        <button onClick={retry}>重新加载页面</button>
        <a href="/workspace/tasks">回到任务列表</a>
      </section>
    )}
  />
));
