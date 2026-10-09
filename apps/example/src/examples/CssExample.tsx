import { _component, _derived, _state, _lazy, Portal } from 'zerodep-js';
import { Css } from 'zerodep-js-css';
import { css } from 'zerodep-js-css';
import { Keywords, provideCss, useCss } from './css-theme.js';

const s = new Css();

const keywordValues = [
  '#245fc5',
  'inherit',
  'initial',
  'unset',
  'revert',
  'revert-layer',
  'var(--external, inherit)',
  'not-a-color',
  '#ffffff',
];
const KeywordBindingProbe = _component(() => {
  let position = _state(0);
  let external = _state('#123456');
  const theme = _derived(new Keywords(keywordValues[position]!));
  const author = new Css(() => theme);
  const className = css(s.color.red, author.color._primary);
  return (
    <section style={{ color: 'rgb(20, 30, 40)', colorScheme: 'light', '--external': external }}>
      <button
        data-css-keyword-next
        onClick={() => {
          position = (position + 1) % keywordValues.length;
        }}
      >
        切换关键字值
      </button>
      <button
        data-css-keyword-external
        onClick={() => {
          external = '#654321';
        }}
      >
        更新用户变量
      </button>
      <div data-css-keyword class={className} style={{ '--user': 'kept' }}>
        {keywordValues[position]}
      </div>
    </section>
  );
});

const LazyThemeProbe = _lazy(() => import('./LazyThemeProbe.js'));
const ThemeProbe = _component(({ location }: { location: string }) => {
  const author = useCss();
  return (
    <div data-css-theme={location} class={css(author.color._primary)}>
      主题作用域
    </div>
  );
});
const LocalThemeProbe = _component(({ lazy }: { lazy: boolean }) => {
  provideCss(new Css(new Keywords('purple')));
  return (
    <>
      <ThemeProbe location="local" />
      {lazy && <LazyThemeProbe location="lazy-local" />}
    </>
  );
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
  let lazyVisible = _state(false);
  let keywords = _state.raw(new Keywords('blue'));
  provideCss(new Css(() => keywords));
  return (
    <section aria-label="原生 CSS 接入">
      <h2>原生 CSS 接入</h2>
      <KeywordBindingProbe />
      <button
        data-css-theme-toggle
        onClick={() => {
          keywords = new Keywords('green');
        }}
      >
        切换主题
      </button>
      <ThemeProbe location="outer" />
      <LocalThemeProbe lazy={lazyVisible} />
      <button
        data-css-lazy-toggle
        onClick={() => {
          lazyVisible = !lazyVisible;
        }}
      >
        切换按需主题
      </button>
      {lazyVisible && <LazyThemeProbe location="lazy" />}
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
          {lazyVisible && <LazyThemeProbe location="lazy-portal" />}
        </div>
      </Portal>
    </section>
  );
});
