import { _component, _state } from 'zerodep-js';

/** 原生展开绑定的验收夹具，不提供 UI 组件封装。 */
export const DisclosureExample = _component(() => {
  let open = _state(false);
  let reject = _state(false);
  let last = _state('none');
  let left = _state(false);
  let right = _state(false);
  return (
    <section aria-label="原生展开绑定">
      <button
        data-details-toggle
        onClick={() => {
          open = !open;
        }}
      >
        切换展开状态
      </button>
      <label>
        <input type="checkbox" data-details-reject bind:checked={reject} />
        拒绝展开
      </label>
      <details
        data-details-bound
        bind:open={open}
        onToggle={() => {
          last = String(open);
          if (reject) open = false;
        }}
      >
        <summary>展开验收内容</summary>
        <p>原生内容</p>
      </details>
      <output data-details-model>{String(open)}</output>
      <output data-details-last>{last}</output>
      <details name="details-pair" data-details-left bind:open={left}>
        <summary>左侧</summary>
      </details>
      <details name="details-pair" data-details-right bind:open={right}>
        <summary>右侧</summary>
      </details>
      <output data-details-pair>{`${left}:${right}`}</output>
    </section>
  );
});
