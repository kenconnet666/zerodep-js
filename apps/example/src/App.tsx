import { component, $state, $derived, onCleanup, effect, type JSX } from '@zerodep-js/core';
import type { RenderMode } from '@zerodep-js/ssr';
import { ListExample } from './examples/ListExample.js';
import { ContextExample } from './examples/ContextExample.js';
import { BoundaryExample } from './examples/BoundaryExample.js';
import { NativeExample } from './examples/NativeExample.js';
import { FormExample } from './examples/FormExample.js';
import { AttributeExample } from './examples/AttributeExample.js';
import { PropertyExample } from './examples/PropertyExample.js';

const Button = component(
  ({ type = 'button', children, ...attrs }: JSX.IntrinsicElements['button']) => (
    <button {...attrs} type={type}>
      {children}
    </button>
  ),
);

const Counter = component(
  ({
    initial = 0,
    step = 1,
    onDispose,
    onRefDispose,
    onChange,
  }: {
    initial?: number;
    step?: number;
    onDispose?: () => void;
    onRefDispose?: () => void;
    onChange?: (value: number) => void;
  }) => {
    let count = $state(initial);
    const doubled = $derived(count * 2);
    onCleanup(() => onDispose?.());
    function increment(amount: number) {
      count += amount;
      onChange?.(count);
    }
    return (
      <section
        aria-label="框架计数器"
        ref={(node) => {
          node.dataset.refAttached = 'true';
          return () => onRefDispose?.();
        }}
      >
        <Button data-increment onClick={() => increment(1)}>
          增加计数
        </Button>
        <Button
          data-step-increment
          onClick={() => {
            increment(step);
          }}
        >
          按步长增加
        </Button>
        <output data-count aria-live="polite">
          {count}
        </output>
        <output data-double>{doubled}</output>
        <span data-step>步长 {step}</span>
      </section>
    );
  },
);

type AppProps = { mode?: RenderMode; onUnmount?: () => void };

export const App = component(({ mode = 'csr', onUnmount }: AppProps) => {
  let ready = $state(false);
  effect(() => {
    ready = true;
  });
  let step = $state(1);
  let initial = $state(0);
  let counterKey = $state(0);
  let visible = $state(true);
  let disposed = $state(0);
  let refDisposed = $state(0);
  let lastEvent = $state(0);
  let name = $state('访客');
  const attrs = $state<Record<string, string>>({ title: '初始标题' });

  return (
    <main style={{ '--step': step }}>
      <p class="eyebrow">框架运行验证</p>
      <h1>zerodep-js</h1>
      <p>
        当前首屏模式：<strong data-mode>{mode.toUpperCase()}</strong>
      </p>
      <nav aria-label="渲染模式">
        <a href="/?render=ssr" aria-current={mode === 'ssr' ? 'page' : undefined}>
          服务端渲染 SSR
        </a>
        <a href="/?render=csr" aria-current={mode === 'csr' ? 'page' : undefined}>
          客户端渲染 CSR
        </a>
      </nav>
      <section aria-label="组件输入">
        <Button
          data-reset-key
          onClick={() => {
            counterKey++;
          }}
        >
          更换实例 key
        </Button>
        <Button
          data-change-step
          onClick={() => {
            step = 2;
          }}
        >
          步长改为 2
        </Button>
        <Button
          data-change-initial
          onClick={() => {
            initial = 100;
          }}
        >
          初始值改为 100
        </Button>
        <Button
          data-toggle
          onClick={() => {
            visible = !visible;
          }}
        >
          切换计数器
        </Button>
        <Button
          {...attrs}
          data-forwarded
          onClick={() => {
            attrs.title = '更新标题';
          }}
        >
          转发属性
        </Button>
        <Button
          data-remove-title
          onClick={() => {
            delete attrs.title;
          }}
        >
          移除标题
        </Button>
      </section>
      {visible ? (
        <Counter
          key={counterKey}
          initial={initial}
          step={step}
          onDispose={() => {
            disposed++;
          }}
          onRefDispose={() => {
            refDisposed++;
          }}
          onChange={(value) => {
            lastEvent = value;
          }}
        />
      ) : (
        <p data-hidden>计数器已隐藏</p>
      )}
      <p>
        已清理实例：<output data-disposed>{disposed}</output>
        ，已释放 ref：<output data-ref-disposed>{refDisposed}</output>
        ，最近回调：<output data-last-event>{lastEvent}</output>
      </p>
      <svg viewBox="0 0 20 20" width="20" height="20" aria-label="状态图形">
        {visible ? (
          <circle cx={10} cy={10} r={8} fill="none" stroke="currentColor" strokeWidth={2} />
        ) : (
          <rect x={2} y={2} width={16} height={16} />
        )}
      </svg>
      <label>
        名字{' '}
        <input
          value={name}
          onInput={(event) => {
            name = event.currentTarget.value;
          }}
        />
      </label>
      <p data-greeting>你好，{name}</p>
      <ListExample />
      <ContextExample />
      <BoundaryExample />
      <NativeExample />
      <FormExample />
      <AttributeExample />
      <PropertyExample />
      <p data-client-status>{ready ? '客户端已接入' : '等待客户端接管'}</p>
      <p class="note">同一 App 验证客户端渲染与服务端渲染接管。</p>
      <button type="button" data-unmount onClick={() => onUnmount?.()}>
        卸载应用
      </button>
    </main>
  );
});
