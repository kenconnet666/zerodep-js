import { _component, _derived, _state, Portal } from 'zerodep-js';
import { Css } from 'zerodep-css';
import { css } from 'zerodep-js/css';

const s = new Css();

const Card = _component(({ name, initial }: { name: string; initial: number }) => {
  let width = _state(initial);
  let active = _state(false);
  const height = _derived(24);
  // css 声明自动追踪；直接尺寸使用元素变量，颜色条件按普通 JS 重算。
  const className = css(
    s.width.px(width),
    s.height.px(height),
    s.color.raw(active ? 'red' : 'blue'),
  );
  return (
    <section data-css-card={name}>
      <button
        data-css-grow={name}
        onClick={() => {
          width += 10;
        }}
      >
        加宽
      </button>
      <button
        data-css-toggle={name}
        onClick={() => {
          active = !active;
        }}
      >
        换色
      </button>
      <div
        data-css-box={name}
        class={className}
        style={{ border: '1px solid currentColor', '--user': 'kept' }}
      >
        原生样式
      </div>
      <div data-css-inline={name} class={css(s.width.px(width))}>
        内联样式
      </div>
    </section>
  );
});

export const CssExample = _component(() => {
  let visible = _state(true);
  return (
    <section aria-label="原生 CSS 接入">
      <h2>原生 CSS 接入</h2>
      <button
        data-css-visible
        onClick={() => {
          visible = !visible;
        }}
      >
        切换样式示例
      </button>
      {visible && (
        <>
          <Card name="first" initial={120} />
          <Card name="second" initial={180} />
        </>
      )}
      <Portal>
        <div data-css-portal class={css(s.position.fixed, s.bottom.px(0), s.pointerEvents.none)}>
          CSS Portal
        </div>
      </Portal>
    </section>
  );
});
