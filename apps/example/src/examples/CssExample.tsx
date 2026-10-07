import { _component, _derived, _state, Portal } from 'zerodep-js';
import { Css, SystemKeywords, ColorKeywords } from 'zerodep-css';
import { css, _createCssContext } from 'zerodep-js/css';

const s = new Css();

class Colors extends ColorKeywords {
  readonly _primary: string;
  constructor(primary: string) {
    super();
    this._primary = primary;
  }
}
class Keywords extends SystemKeywords {
  override readonly color: Colors;
  constructor(primary: string) {
    super();
    this.color = new Colors(primary);
  }
}
const { provideCss, useCss } = _createCssContext<Css<Keywords>>();
const ThemeProbe = _component(({ location }: { location: string }) => {
  const author = useCss();
  return (
    <div data-css-theme={location} class={css(author.color._primary)}>
      主题作用域
    </div>
  );
});
const LocalThemeProbe = _component(() => {
  provideCss(new Css(new Keywords('purple')));
  return <ThemeProbe location="local" />;
});

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
      <div
        {...{ title: 'spread', style: { '--user-spread': 'kept' } }}
        data-css-spread={name}
        class={css(s.width.px(width))}
      >
        展开属性
      </div>
    </section>
  );
});

export const CssExample = _component(() => {
  let visible = _state(true);
  let keywords = _state.raw(new Keywords('blue'));
  provideCss(new Css(() => keywords));
  return (
    <section aria-label="原生 CSS 接入">
      <h2>原生 CSS 接入</h2>
      <button
        data-css-theme-toggle
        onClick={() => {
          keywords = new Keywords('green');
        }}
      >
        切换主题
      </button>
      <ThemeProbe location="outer" />
      <LocalThemeProbe />
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
          <ThemeProbe location="portal" />
        </div>
      </Portal>
    </section>
  );
});
