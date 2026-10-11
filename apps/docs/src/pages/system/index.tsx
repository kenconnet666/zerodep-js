import { _component, _derived, _state } from 'zerodep-js';

// 参数解构直接读取最新 props；派生值用于表达由 props 计算出的结果。
const CounterSummary = _component(({ count }: { count: number }) => {
  const doubled = _derived(count * 2);
  return (
    <p role={'status'}>
      当前数量：<span data-docs-count>{count}</span>，双倍：
      <span data-docs-doubled>{doubled}</span>
    </p>
  );
});

export const SystemPage = _component(() => {
  let count = _state(0);
  return (
    <section id={'system'} aria-labelledby={'system-heading'}>
      <h2 id={'system-heading'}>框架文档</h2>
      <p>用 _state 声明状态，用 _derived 表达派生值。组件参数解构保持响应式，不需要 .value。</p>
      <div class={'framework-demo'}>
        <h3>父级状态 → 子组件 props → 派生值</h3>
        <CounterSummary count={count} />
        <div class={'demo-actions'}>
          <button
            type={'button'}
            onClick={() => {
              count++;
            }}
          >
            增加数量
          </button>
          <button
            type={'button'}
            disabled={count === 0}
            onClick={() => {
              count = 0;
            }}
          >
            重置数量
          </button>
        </div>
      </div>
      <pre>
        <code>{`const Summary = _component(({ count }: { count: number }) => {
  const doubled = _derived(count * 2);
  return <p>{count} / {doubled}</p>;
});

const Counter = _component(() => {
  let count = _state(0);
  return <>
    <button onClick={() => { count++; }}>增加数量</button>
    <Summary count={count} />
  </>;
});`}</code>
      </pre>
      <p>
        普通函数传参、普通局部解构仍按 JavaScript 取值。需要持续更新的计算使用
        _derived；事件回调里可以直接修改外层状态。
      </p>
      <ul>
        <li>
          <a href={'https://github.com/kenconnet666/zerodep-js#readme'}>开始使用</a>
        </li>
        <li>
          <a
            href={'https://github.com/kenconnet666/zerodep-js/tree/main/apps/example/src/examples'}
          >
            代码示例
          </a>
        </li>
      </ul>
    </section>
  );
});
