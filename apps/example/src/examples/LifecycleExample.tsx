import { _component, _state, _onMount, _onCleanup, _getAbortSignal, _snapshot } from 'zerodep-js';

const Mounted = _component(({ record }: { record: (message: string) => void }) => {
  let node: HTMLDivElement | undefined;
  let mounted = _state(false);
  const signal = _getAbortSignal();
  _onMount(() => {
    record(`mount:${node?.isConnected}`);
    mounted = true;
    return () => record('mount-cleanup');
  });
  _onCleanup(() => record(`cleanup:${signal.aborted}`));
  return (
    <div
      data-lifecycle-child
      ref={(element) => {
        node = element;
      }}
    >
      {mounted ? '已挂载' : '服务端初值'}
    </div>
  );
});

export const LifecycleExample = _component(() => {
  let active = _state(true);
  let events = _state('');
  const model = _state({ nested: { count: 1 } });
  let copied = _state(0);
  return (
    <section aria-label="生命周期与快照">
      <h2>生命周期与快照</h2>
      <button
        data-lifecycle-toggle
        onClick={() => {
          active = !active;
        }}
      >
        切换实例
      </button>
      {active ? (
        <Mounted
          record={(event) => {
            events += `${event};`;
          }}
        />
      ) : null}
      <output data-lifecycle-events>{events}</output>
      <button
        data-snapshot
        onClick={() => {
          const copy = _snapshot(model);
          copy.nested.count = 10;
          copied = structuredClone(copy).nested.count;
        }}
      >
        复制快照并修改
      </button>
      <output data-snapshot-state>
        {model.nested.count}/{copied}
      </output>
    </section>
  );
});
