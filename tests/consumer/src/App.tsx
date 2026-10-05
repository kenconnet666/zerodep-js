import {
  _component,
  _state,
  For,
  _onMount,
  _onCleanup,
  _getAbortSignal,
  _snapshot,
} from 'zerodep-js';
import { _persistLocal } from 'zerodep-use/storage';
import {
  _createRouter,
  _createMemoryHistory,
  _defineRoutes,
  _defineRoute,
  Router,
  Link,
  _useRoute,
} from 'zerodep-use/router';
import { Counter, Label } from '@zerodep-consumer/counter';

const PackedPage = _component(() => {
  const route = _useRoute();
  const initial = route.params.id;
  return (
    <section data-packed-page>
      <span data-route-id>{route.params.id}</span>
      <span data-route-initial>{initial}</span>
      <Link to={packedRoutes.page} params={{ id: 'next' }}>
        下一页
      </Link>
      <Link to={packedRoutes.keyed} params={{ id: 'one' }}>
        记录一
      </Link>
      <Link to={packedRoutes.keyed} params={{ id: 'two' }}>
        记录二
      </Link>
    </section>
  );
});
const packedRoutes = _defineRoutes({
  page: { path: '/packed/:id', component: PackedPage },
  keyed: _defineRoute('/keyed/:id', { component: PackedPage, key: ({ params }) => params.id }),
});

export const App = _component(({ title }: { title: string }) => {
  let message = _state('等待');
  let routed = _state(false);
  const router = _createRouter(packedRoutes, { history: _createMemoryHistory('/packed/start') });
  _onCleanup(() => router.dispose());
  _persistLocal(
    'package-message',
    {
      read: () => message,
      write: (value) => {
        message = value;
      },
    },
    {
      validate(value) {
        if (typeof value !== 'string') throw new Error('需要文本');
        return value;
      },
    },
  );
  const rows = _state([
    { id: 1, name: '甲' },
    { id: 2, name: '乙' },
  ]);
  _onMount(() => {
    const signal = _getAbortSignal();
    document.body.dataset.fixtureEffect = 'active';
    return () => {
      document.body.dataset.fixtureEffect = 'disposed';
      document.body.dataset.fixtureAborted = String(signal.aborted);
    };
  });
  return (
    <main
      style={{ containerType: 'inline-size', '--package-consumer': '1', color: 'black !important' }}
    >
      <h1>{title}</h1>
      <Counter label="打包" onCount={(value) => (message = String(value))} />
      <input
        aria-label="消息"
        value={message}
        onInput={(event) => (message = event.currentTarget.value)}
      />

      <output>{message}</output>
      <Label value={{ id: 3 }}>{(value) => value.id}</Label>
      <For each={rows} keyBy={(row) => row.id}>
        {(row) => <span data-row={row.id}>{row.name}</span>}
      </For>
      <button
        data-copy
        onClick={() => {
          const copied = _snapshot(rows);
          copied[0]!.name = '副本';
          message = `${copied[0]!.name}/${rows[0]!.name}`;
        }}
      >
        复制快照
      </button>
      <button
        data-open-router
        onClick={() => {
          routed = true;
        }}
      >
        打开路由
      </button>
      {routed ? <Router router={router} /> : null}
    </main>
  );
});
