import { _component, _state, _onMount, _mount, _flushSync } from 'zerodep-js';

type Reference = (element: HTMLDivElement) => void | (() => void);
const ReferenceProbe = _component(({ reference }: { reference: Reference | undefined }) => (
  <div ref={reference} />
));

export const ReferenceExample = _component(() => {
  let input = _state<HTMLInputElement | undefined>(undefined);
  let visible = _state(true);
  let key = _state(0);
  let circle = _state<SVGCircleElement | undefined>(undefined);
  let mounted = _state('');
  let reference = _state<Reference | undefined>(undefined);
  let probeResult = _state('');
  function probe(kind: 'dispose' | 'async') {
    const target = document.createElement('div');
    target.dataset.referenceProbe = '';
    document.body.append(target);
    let cleaned = 0;
    const dispose = _mount(ReferenceProbe, {
      target,
      props: {
        get reference() {
          return reference;
        },
      },
    });
    try {
      if (kind === 'dispose')
        reference = () => {
          dispose();
          return () => {
            cleaned++;
          };
        };
      // 模拟 JS 调用方误传 async；正常 TS 作者会被 ref 的返回类型阻止。
      else
        reference = (async () => {
          throw new Error('late ref');
        }) as unknown as Reference;
      _flushSync();
      probeResult = String(cleaned);
    } catch (error) {
      probeResult = error instanceof Error ? error.message : String(error);
    } finally {
      dispose();
      target.remove();
      reference = undefined;
    }
  }
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
      <button data-reference-dispose onClick={() => probe('dispose')}>
        验证引用内卸载
      </button>
      <button data-reference-async onClick={() => probe('async')}>
        验证异步引用诊断
      </button>
      <output data-reference-probe-result>{probeResult}</output>
    </section>
  );
});
