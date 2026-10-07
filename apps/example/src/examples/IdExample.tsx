import { _component, _id, _state, _mount, For } from 'zerodep-js';

const Field = _component(({ name }: { name: string }) => {
  const inputId = _id();
  const helpId = _id();
  return (
    <div data-id-field={name}>
      <label for={inputId}>{name}</label>
      <input id={inputId} aria-describedby={helpId} />
      <small id={helpId}>输入{name}</small>
    </div>
  );
});

export const IdExample = _component(() => {
  let rows = _state(['甲', '乙']);
  let shown = _state(true);
  return (
    <section aria-label="稳定组件 ID">
      <h2>组件 ID 与无障碍关联</h2>
      <button
        data-id-reverse
        onClick={() => {
          rows = [...rows].reverse();
        }}
      >
        调整顺序
      </button>
      <button
        data-id-toggle
        onClick={() => {
          shown = !shown;
        }}
      >
        切换字段
      </button>
      <For each={rows} keyBy={(name) => name}>
        {(name) => <Field name={name} />}
      </For>
      {shown ? <Field name="可选" /> : null}
      <div ref={(target) => _mount(Field, { target, props: { name: '独立根' } })} />
    </section>
  );
});
