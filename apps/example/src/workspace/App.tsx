import { _component, _state } from 'zerodep-js';
import { Router, type RouterInstance } from 'zerodep-use/router';

/** 浏览器/history 组合夹具，不封装页面组件或业务导航策略。 */
const HistoryProbe = _component(({ router }: { router: RouterInstance }) => {
  let result = _state('');
  let busy = _state(false);
  async function check(allow: boolean) {
    if (busy) return;
    busy = true;
    const step = (state: unknown) => (state as { historyProbe?: number } | undefined)?.historyProbe;
    const stopHistory = router.history.listen((event) => {
      if (step(event.location.state) === 1)
        router.history.replace('/workspace/preferences', { historyProbe: 2 });
    });
    const stopGuard = router.beforeEach(({ to }) => step(to.location.state) !== 2 || allow);
    try {
      const navigation = await router.navigate('/workspace/preferences', {
        state: { historyProbe: 1 },
      });
      await router.resolve();
      result = `${navigation.status}/${step(router.state.location.state) ?? 0}`;
    } catch (error) {
      result = String(error);
    } finally {
      stopGuard();
      stopHistory();
      busy = false;
    }
  }
  return (
    <aside aria-label="历史边界验证">
      <button
        disabled={busy}
        data-history-reenter-allow
        onClick={() => {
          void check(true);
        }}
      >
        允许历史改写
      </button>
      <button
        disabled={busy}
        data-history-reenter-deny
        onClick={() => {
          void check(false);
        }}
      >
        拒绝历史改写
      </button>
      <output data-history-probe>{result}</output>
    </aside>
  );
});

export const Workspace = _component(({ router }: { router: RouterInstance }) => (
  <>
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
    <HistoryProbe router={router} />
  </>
));
