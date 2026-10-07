import { _component, _state, _onMount } from 'zerodep-js';

export const ReferenceExample = _component(() => {
  let input = _state<HTMLInputElement | undefined>(undefined);
  let visible = _state(true);
  let key = _state(0);
  let circle = _state<SVGCircleElement | undefined>(undefined);
  let mounted = _state('');
  _onMount(() => {
    mounted = `${input?.isConnected}/${circle?.localName}`;
  });
  return (
    <section aria-label="元素引用">
      <h2>元素引用</h2>
      {visible ? <input key={key} data-reference-input bind:this={input} /> : null}
      <svg width="20" height="20" aria-label="引用图形">
        <circle bind:this={circle} cx={10} cy={10} r={8} />
      </svg>
      <button data-reference-focus onClick={() => input?.focus()}>
        聚焦输入框
      </button>
      <button
        data-reference-toggle
        onClick={() => {
          visible = !visible;
        }}
      >
        切换元素
      </button>
      <button
        data-reference-replace
        onClick={() => {
          key++;
        }}
      >
        替换元素
      </button>
      <output data-reference-current>{input?.localName ?? 'empty'}</output>
      <output data-reference-mounted>{mounted}</output>
    </section>
  );
});
