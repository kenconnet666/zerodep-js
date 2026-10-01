import { component, $state, For, effect } from '@zerodep-js/core';
import { Counter, Label } from '@zerodep-consumer/counter';

export const App = component(({ title }: { title: string }) => {
  let message = $state('等待');
  const rows = $state([
    { id: 1, name: '甲' },
    { id: 2, name: '乙' },
  ]);
  effect(() => {
    document.body.dataset.fixtureEffect = 'active';
    return () => {
      document.body.dataset.fixtureEffect = 'disposed';
    };
  });
  return (
    <main
      style={{ containerType: 'inline-size', '--package-consumer': '1', color: 'black !important' }}
    >
      <h1>{title}</h1>
      <Counter label="打包" onCount={(value) => (message = String(value))} />
      <input
        aria-label="消息"
        value={message}
        onInput={(event) => (message = event.currentTarget.value)}
      />
      <output>{message}</output>
      <Label value={{ id: 3 }}>{(value) => value.id}</Label>
      <For each={rows} keyBy={(row) => row.id}>
        {(row) => <span data-row={row.id}>{row.name}</span>}
      </For>
    </main>
  );
});
