import {
  _component,
  _state,
  For,
  _onMount,
  _getAbortSignal,
  _snapshot,
  _lazy,
  _id,
  Portal,
} from 'zerodep-js';
import { Counter, Label } from '@zerodep-consumer/counter';
import { Css, WidthCss, SystemKeywords, systemKeywords } from 'zerodep-js-css';
import { css } from 'zerodep-js-css';
import { _head } from 'zerodep-js/head';

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
  let lazyVisible = _state(false);
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
      <Portal>
        <span data-packed-portal>外层内容</span>
      </Portal>
      <button data-reference-focus onClick={() => input?.focus()}>
        聚焦消息
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
    </main>
  );
});
