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
import { _history } from 'zerodep-use/history';
import { _createStore } from 'zerodep-use/store';
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
import { Css, WidthCss, SystemKeywords, systemKeywords } from 'zerodep-css';
import { css } from 'zerodep-js/css';
import { _head } from 'zerodep-js/head';

const { provideStore: provideMessage, useStore: useMessage } = _createStore<{ message: string }>();
const StoreMessage = _component(() => {
  const messages = useMessage();
  return <span data-packed-store>{messages.message}</span>;
});

const s = new Css();
class OpacityWidth extends WidthCss {
  protected override readonly name = 'opacity';
}
class MappedCss extends Css {
  override readonly width = new OpacityWidth();
}
const mapped = new MappedCss();
class PackedTheme extends SystemKeywords {
  // oxlint-disable-next-line typescript/no-misused-spread -- 按主题契约复制原始颜色值。
  override readonly color = { ...systemKeywords.color, _primary: '' };
  constructor(value: string) {
    super();
    this.color._primary = value;
  }
}

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
  let mappedValue = _state('auto');
  let keyword = _state('#245fc5');
  const themed = new Css(() => new PackedTheme(keyword));
  const className = css(s.width.px(width));
  const inputId = _id();
  let input: HTMLInputElement | undefined = undefined;
  const messages = _state({ message: '等待' });
  let routed = _state(false);
  let lazyVisible = _state(false);
  const history = _history({
    read: () => messages.message,
    write: (next) => {
      messages.message = next;
    },
  });
  const router = _createRouter(packedRoutes, { history: _createMemoryHistory('/packed/start') });
  _onCleanup(() => router.dispose());
  provideMessage(messages, { persist: { key: 'package-message', pick: ['message'] } });
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
      <div
        data-packed-keyword
        class={css(themed.color._primary)}
        style={{ '--consumer-accent': '#663399' }}
      >
        主题变量
      </div>
      <button
        data-packed-keyword-update
        onClick={() => {
          keyword = keyword === '#245fc5' ? 'var(--consumer-accent, inherit)' : '#ffffff';
        }}
      >
        更新主题变量
      </button>
      <div
        data-packed-mapped-css
        class={css(mapped.width.raw('0.5'), mapped.width.raw(mappedValue))}
      >
        继承作者的无效值保留先前有效声明
      </div>
      <button
        data-packed-mapped-update
        onClick={() => {
          mappedValue = '0.8';
        }}
      >
        更新继承作者值
      </button>
      <Counter label="打包" onCount={(value) => (messages.message = String(value))} />
      <label for={inputId}>消息</label>
      <input id={inputId} aria-label="消息" bind:value={messages.message} bind:this={input} />
      <StoreMessage />
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

      <output>{messages.message}</output>
      <Label value={{ id: 3 }}>{(value) => value.id}</Label>
      <For each={rows} keyBy={(row) => row.id}>
        {(row) => <span data-row={row.id}>{row.name}</span>}
      </For>
      <button
        data-copy
        onClick={() => {
          const copied = _snapshot(rows);
          copied[0]!.name = '副本';
          messages.message = `${copied[0]!.name}/${rows[0]!.name}`;
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
