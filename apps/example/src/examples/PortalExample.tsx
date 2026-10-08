import {
  _component,
  _state,
  _derived,
  _id,
  _createContext,
  _provideContext,
  _useContext,
  Portal,
  ErrorBoundary,
} from 'zerodep-js';

const Context = _createContext('没有父组件');
const fail = (): string => {
  throw new Error('外层内容出错');
};

const Panel = _component(
  ({ message, broken, close }: { message: string; broken: boolean; close: () => void }) => {
    const context = _useContext(Context);
    const id = _id();
    let count = _state(0);
    let draft = _state('草稿');
    return (
      <div data-portal-panel role="dialog" aria-label="外层内容">
        <span data-portal-context>{context}</span>
        <span data-portal-message>{broken ? fail() : message}</span>
        <label for={id}>外层草稿</label>
        <input id={id} bind:value={draft} />
        <button
          data-portal-count
          onClick={() => {
            count++;
          }}
        >
          {count}
        </button>
        <button data-portal-close onClick={close}>
          关闭外层内容
        </button>
        <Portal>
          <small data-portal-nested>跟随内容一起清理的提示</small>
        </Portal>
      </div>
    );
  },
);

export const PortalExample = _component(() => {
  _provideContext(Context, '来自原父组件');
  let opened = _state(true);
  let broken = _state(false);
  let message = _state('初始消息');
  let clicks = _state(0);
  let placement = _state<'body' | 'left' | 'right' | 'hidden'>('body');
  let left = _state<HTMLDivElement | undefined>(undefined);
  let right = _state<HTMLDivElement | undefined>(undefined);
  const target = _derived(
    placement === 'body'
      ? undefined
      : placement === 'left'
        ? left
        : placement === 'right'
          ? right
          : null,
  );
  return (
    <section
      data-portal-origin
      aria-label="Portal"
      onClick={() => {
        clicks++;
      }}
    >
      <h2>把内容放到页面外层</h2>
      <button
        data-portal-open
        onClick={() => {
          opened = !opened;
        }}
      >
        切换显示
      </button>
      <button
        data-portal-body
        onClick={() => {
          placement = 'body';
        }}
      >
        放到页面外层
      </button>
      <button
        data-portal-left
        onClick={() => {
          placement = 'left';
        }}
      >
        放到左边
      </button>
      <button
        data-portal-right
        onClick={() => {
          placement = 'right';
        }}
      >
        放到右边
      </button>
      <button
        data-portal-hide
        onClick={() => {
          placement = 'hidden';
        }}
      >
        暂不指定容器
      </button>
      <button
        data-portal-update
        onClick={() => {
          message = '更新消息';
        }}
      >
        更新消息
      </button>
      <button
        data-portal-fail
        onClick={() => {
          broken = true;
        }}
      >
        模拟错误
      </button>
      <output data-portal-origin-clicks>{clicks}</output>
      <div data-portal-left-target bind:this={left}>
        <span data-portal-existing-left>已有左侧内容</span>
      </div>
      <div data-portal-right-target bind:this={right}>
        <span data-portal-existing-right>已有右侧内容</span>
      </div>
      <ErrorBoundary
        fallback={(error, reset) => (
          <button
            data-portal-retry
            onClick={() => {
              broken = false;
              reset();
            }}
          >
            {error instanceof Error ? error.message : '发生错误'}，重试
          </button>
        )}
      >
        {opened ? (
          <Portal target={target}>
            <Panel
              message={message}
              broken={broken}
              close={() => {
                opened = false;
              }}
            />
          </Portal>
        ) : null}
      </ErrorBoundary>
    </section>
  );
});
