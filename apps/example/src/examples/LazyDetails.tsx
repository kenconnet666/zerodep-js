import { _component, _state } from 'zerodep-js';

export default _component(({ name }: { name: string }) => {
  let count = _state(0);
  return (
    <section data-lazy-details aria-label="已加载的按需组件">
      <p>
        这份代码在打开组件后才加载。当前姓名：<span data-lazy-name>{name}</span>
      </p>
      <button
        onClick={() => {
          count++;
        }}
      >
        按需组件计数：{count}
      </button>
    </section>
  );
});
