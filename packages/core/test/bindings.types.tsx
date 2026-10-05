import { _component, _state } from 'zerodep-js';

const Field = _component(
  (props: {
    value: string;
    onValueChange: (value: string) => void;
    checked: boolean;
    onCheckedChange: (value: boolean) => void;
    label: string;
  }) => <span>{props.label}</span>,
);

const UnionField = _component(
  (
    props:
      | { kind: 'text'; value: string; onValueChange: (value: string) => void }
      | { kind: 'number'; value: number; onValueChange: (value: number) => void },
  ) => <span>{props.value}</span>,
);

export const BindingTypes = _component(() => {
  let text = _state('');
  let flag = _state(false);
  let number = _state<number>();
  let selected = _state<string[]>([]);
  const input = <input bind:value={text} />;
  const numeric = <input type="number" bind:valueAsNumber={number} />;
  const boolean = <input type="checkbox" bind:checked={flag} />;
  const select = <select multiple bind:value={selected} />;
  const component = <Field label="字段" bind:value={text} bind:checked={flag} />;
  const union = <UnionField kind="text" bind:value={text} />;
  // @ts-expect-error 绑定不能破坏判别联合的 kind/value 对应关系。
  const wrongUnion = <UnionField kind="number" bind:value={text} />;
  const mixed = (
    <Field
      label="字段"
      bind:value={text}
      checked={flag}
      onCheckedChange={(next) => {
        flag = next;
      }}
    />
  );
  // @ts-expect-error bind 不能替代无关的必填 label。
  const missingLabel = <Field bind:value={text} bind:checked={flag} />;
  // @ts-expect-error value 和 bind:value 不能同时拥有同一字段。
  const duplicate = <Field label="字段" value="重复" bind:value={text} bind:checked={flag} />;
  // @ts-expect-error 必须提供普通 value/回调或对应 bind。
  const missingValue = <Field label="字段" bind:checked={flag} />;
  // @ts-expect-error 组件的 value 是 string。
  const wrong = <Field label="字段" bind:value={flag} bind:checked={flag} />;
  // @ts-expect-error 文本绑定不能写回 number。
  const wrongNative = <input bind:value={number} />;
  // @ts-expect-error checked 是 boolean。
  const wrongChecked = <input type="checkbox" bind:checked={text} />;
  // @ts-expect-error 非表单元素不提供 value 绑定。
  const wrongElement = <div bind:value={text} />;
  return [
    input,
    numeric,
    boolean,
    select,
    component,
    union,
    wrongUnion,
    mixed,
    missingLabel,
    duplicate,
    missingValue,
    wrong,
    wrongNative,
    wrongChecked,
    wrongElement,
  ];
});
