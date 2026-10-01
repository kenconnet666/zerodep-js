import { _component, _state, _createContext, _provideContext, _useContext } from 'zerodep-js';

const Theme = _createContext<{ readonly color: string }>({ color: '默认' });
const Label = _component(({ name }: { name: string }) => {
  const theme = _useContext(Theme);
  return <output data-theme={name}>{theme.color}</output>;
});
const Nested = _component(() => {
  _provideContext(Theme, { color: '内层' });
  return <Label name="inner" />;
});
const Provider = _component(() => {
  const theme = _state({ color: '蓝' });
  _provideContext(Theme, theme);
  return (
    <div>
      <button
        type="button"
        data-change-theme
        onClick={() => {
          theme.color = '紫';
        }}
      >
        更新上下文
      </button>
      <Label name="outer" />
      <Nested />
    </div>
  );
});
export const ContextExample = _component(() => (
  <section aria-label="上下文">
    <h2>上下文</h2>
    <Label name="default" />
    <Provider />
  </section>
));
