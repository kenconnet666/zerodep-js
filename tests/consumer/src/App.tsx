import {
  _component,
  _state,
  For,
  _onMount,
  _onCleanup,
  _getAbortSignal,
  _snapshot,
  _lazy,
  _id,
  Portal,
} from 'zerodep-js';
import { _task } from 'zerodep-use/task';
import { _history } from 'zerodep-use/history';
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
import { Css } from 'zerodep-css';
import { css } from 'zerodep-js/css';
import { _head } from 'zerodep-js/head';

const s = new Css();

const LazyCounter = _lazy(() =>
  import('@zerodep-consumer/counter').then((module) => module.Counter),
);

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
  _head(() => ({ title, description: '独立包消费' }));
  let width = _state(120);
  const className = css(s.width.px(width));
  const inputId = _id();
  const task = _task((value: string) => Promise.resolve(value));
  let input: HTMLInputElement | undefined = undefined;
  let message = _state('等待');
  let routed = _state(false);
  let lazyVisible = _state(false);
  const history = _history({
    read: () => message,
    write: (next) => {
      message = next;
    },
  });
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
    void task.run('task-ready');
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
      <button
        data-packed-css-grow
        onClick={() => {
          width += 10;
        }}
      >
        加宽
      </button>
      <div data-packed-css class={className}>
        打包样式
      </div>
      <Counter label="打包" onCount={(value) => (message = String(value))} />
      <label for={inputId}>消息</label>
      <input id={inputId} aria-label="消息" bind:value={message} bind:this={input} />
      <span data-packed-task>{task.data}</span>
      <Portal>
        <span data-packed-portal>外层内容</span>
      </Portal>
      <button data-reference-focus onClick={() => input?.focus()}>
        聚焦消息
      </button>
      <button data-history-commit onClick={() => history.commit()}>
        记录消息
      </button>
      <button data-history-undo onClick={() => history.undo()}>
        撤销消息
      </button>
      <button data-history-redo onClick={() => history.redo()}>
        重做消息
      </button>
      <button
        data-lazy-open
        onClick={() => {
          lazyVisible = true;
        }}
      >
        加载打包组件
      </button>
      {lazyVisible && <LazyCounter label="按需打包" />}

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
