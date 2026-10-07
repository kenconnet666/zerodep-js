import { _component, _state, _effect, ErrorBoundary, type TextRenderable } from 'zerodep-js';

type Mode = 'ok' | 'render' | 'effect' | 'promise' | 'promise-text';
const Risky = _component(({ mode }: { mode: Mode }) => {
  _effect(() => {
    if (mode === 'effect') throw new Error('副作用失败');
  });
  function label(): TextRenderable {
    if (mode === 'render') throw new Error('呈现失败');
    if (mode === 'promise' || mode === 'promise-text')
      return Promise.reject(new Error('late content')) as unknown as TextRenderable;
    return '工作正常';
  }
  return mode === 'promise-text' ? (
    <output data-working>{label()}</output>
  ) : (
    <p data-working>{label()}</p>
  );
});
const FailedSetup = _component(() => {
  throw new Error('初始化失败');
});
const FailedFallback = _component(() => {
  throw new Error('备用界面失败');
});
const ClientOnly = _component(() => {
  if (typeof document === 'undefined') throw new Error('该内容需要浏览器环境');
  return <p data-client-recovered>客户端局部重试成功</p>;
});

export const BoundaryExample = _component(() => {
  let mode = _state<Mode>('ok');
  let nested = _state(false);
  return (
    <section aria-label="错误恢复">
      <h2>错误恢复</h2>
      <ErrorBoundary fallback={() => <p data-server-fallback>服务端降级内容</p>}>
        <ClientOnly />
      </ErrorBoundary>
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
        data-promise-error
        onClick={() => {
          mode = 'promise';
        }}
      >
        验证异步内容诊断
      </button>
      <button
        type="button"
        data-promise-text-error
        onClick={() => {
          mode = 'promise-text';
        }}
      >
        验证异步文本诊断
      </button>
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
