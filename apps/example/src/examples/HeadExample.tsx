import { _component, _state, _mount, _onCleanup, _flushSync, ErrorBoundary } from 'zerodep-js';
import { _head } from 'zerodep-js/head';

const ChildHead = _component(({ fail }: { fail: boolean }) => {
  _head(() => {
    if (fail) throw new Error('head probe');
    return { title: '子区域标题' };
  });
  return <span data-head-child>子区域</span>;
});
const OtherRoot = _component(() => {
  _head(() => ({ title: '另一个根', description: '另一个根的说明' }));
  return <span>独立根</span>;
});

/** 元信息生命周期夹具，覆盖动态、错误边界和不同文档，不封装页面组件。 */
export const HeadExample = _component(() => {
  let title = _state('zerodep-js example');
  let child = _state(false);
  let fail = _state(false);
  let host = _state<HTMLDivElement | undefined>(undefined);
  let foreignTitle = _state('');
  let stop: (() => void) | undefined;
  let stopForeign: (() => void) | undefined;
  _head(() => ({ title }));
  _onCleanup(() => {
    stop?.();
    stopForeign?.();
  });
  return (
    <section aria-label="页面元信息">
      <button
        data-head-change
        onClick={() => {
          title = '更新后的标题';
        }}
      >
        更新标题
      </button>
      <button
        data-head-child-toggle
        onClick={() => {
          child = !child;
        }}
      >
        切换子区域
      </button>
      <button
        data-head-fail
        onClick={() => {
          fail = true;
        }}
      >
        触发元信息错误
      </button>
      <button
        data-head-second
        onClick={() => {
          if (stop) {
            stop();
            stop = undefined;
          } else if (host) stop = _mount(OtherRoot, { target: host });
        }}
      >
        切换独立根
      </button>
      <button
        data-head-foreign
        onClick={() => {
          stopForeign?.();
          const document = window.document.implementation.createHTMLDocument('外部原标题');
          stopForeign = _mount(OtherRoot, { target: document.body });
          _flushSync();
          foreignTitle = document.title;
          stopForeign();
          stopForeign = undefined;
          foreignTitle += '/' + document.title;
        }}
      >
        验证文档归属
      </button>
      <output data-head-foreign-result>{foreignTitle}</output>
      <div bind:this={host} />
      {child && (
        <ErrorBoundary
          fallback={(_error, reset) => (
            <button
              data-head-retry
              onClick={() => {
                fail = false;
                reset();
              }}
            >
              恢复元信息
            </button>
          )}
        >
          <ChildHead fail={fail} />
        </ErrorBoundary>
      )}
    </section>
  );
});
