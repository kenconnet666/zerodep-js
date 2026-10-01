import { component, $state, createContext, provideContext, useContext } from 'zerodep-js';

const Theme = createContext<{ readonly color: string }>({ color: '默认' });
const Label = component(({ name }: { name: string }) => {
  const theme = useContext(Theme);
  return <output data-theme={name}>{theme.color}</output>;
});
const Nested = component(() => {
  provideContext(Theme, { color: '内层' });
  return <Label name="inner" />;
});
const Provider = component(() => {
  const theme = $state({ color: '蓝' });
  provideContext(Theme, theme);
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
export const ContextExample = component(() => (
  <section aria-label="上下文">
    <h2>上下文</h2>
    <Label name="default" />
    <Provider />
  </section>
));
