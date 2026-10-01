import { component, $state, onMount, onCleanup, getAbortSignal, snapshot } from 'zerodep-js';

const Mounted = component(({ record }: { record: (message: string) => void }) => {
  let node: HTMLDivElement | undefined;
  let mounted = $state(false);
  const signal = getAbortSignal();
  onMount(() => {
    record(`mount:${node?.isConnected}`);
    mounted = true;
    return () => record('mount-cleanup');
  });
  onCleanup(() => record(`cleanup:${signal.aborted}`));
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

export const LifecycleExample = component(() => {
  let active = $state(true);
  let events = $state('');
  const model = $state({ nested: { count: 1 } });
  let copied = $state(0);
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
          const copy = snapshot(model);
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
