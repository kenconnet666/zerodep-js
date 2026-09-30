import { component, $state, effect, ErrorBoundary } from '@zerodep-js/core';

const Risky = component(({ mode }: { mode: 'ok' | 'render' | 'effect' }) => {
  effect(() => {
    if (mode === 'effect') throw new Error('副作用失败');
  });
  function label() {
    if (mode === 'render') throw new Error('呈现失败');
    return '工作正常';
  }
  return <p data-working>{label()}</p>;
});
const FailedSetup = component(() => {
  throw new Error('初始化失败');
});
const FailedFallback = component(() => {
  throw new Error('备用界面失败');
});

export const BoundaryExample = component(() => {
  let mode = $state<'ok' | 'render' | 'effect'>('ok');
  let nested = $state(false);
  return (
    <section aria-label="错误恢复">
      <h2>错误恢复</h2>
      <button
        type="button"
        data-render-error
        onClick={() => {
          mode = 'render';
        }}
      >
        触发呈现错误
      </button>
      <button
        type="button"
        data-effect-error
        onClick={() => {
          mode = 'effect';
        }}
      >
        触发副作用错误
      </button>
      <ErrorBoundary
        fallback={(error, reset) => (
          <div data-boundary-error>
            <p role="alert">{String(error)}</p>
            <button
              type="button"
              data-recover
              onClick={() => {
                mode = 'ok';
                reset();
              }}
            >
              恢复
            </button>
          </div>
        )}
      >
        <Risky mode={mode} />
      </ErrorBoundary>
      <button
        type="button"
        data-nested-error
        onClick={() => {
          nested = true;
        }}
      >
        触发嵌套错误
      </button>
      <ErrorBoundary
        fallback={(error, reset) => (
          <div data-outer-error>
            <p role="alert">{String(error)}</p>
            <button
              type="button"
              data-recover-outer
              onClick={() => {
                nested = false;
                reset();
              }}
            >
              恢复外层
            </button>
          </div>
        )}
      >
        {nested ? (
          <ErrorBoundary fallback={() => <FailedFallback />}>
            <FailedSetup />
          </ErrorBoundary>
        ) : (
          <p data-nested-ok>外层正常</p>
        )}
      </ErrorBoundary>
    </section>
  );
});
