import { _component, _state, _id, _onCleanup, type JSX, _derived } from 'zerodep-js';
import { Css, css, bx } from 'zerodep-js-css';
const s = new Css();
type FieldProps<T> = Pick<JSX.IntrinsicElements['input'], 'class' | 'style' | 'placeholder'> & {
  value: T;
  onValueChange: (value: T) => void;
  format: (value: T) => string;
  parse: (text: string) => T;
  label?: string | undefined;
  field: string;
  title?: string | undefined;
  onDispose?: () => void;
};
const FieldInput = _component(
  <T,>({
    value,
    onValueChange,
    format,
    parse,
    label = '两层姓名',
    field,
    class: incoming,
    onDispose,
    ...attrs
  }: FieldProps<T>) => {
    const id = _id();
    const initial = format(value);
    _onCleanup(() => onDispose?.());
    const appearance = _derived([
      css(() => {
        s.padding('2px');
      }),
      incoming,
    ]);
    return (
      <label>
        <span>{label}</span>
        <input
          {...attrs}
          id={id}
          aria-label={label}
          data-layer-field={field}
          class={appearance}
          value={format(value)}
          onInput={(event) => onValueChange(parse(event.currentTarget.value))}
        />
        <span data-layer-initial={field}>{initial}</span>
      </label>
    );
  },
);

// 两层组件都直接解构 props。传递普通值与回调，不将参数伪装成可写引用。
const FieldShell = _component(<T,>({ value: model, onValueChange, ...rest }: FieldProps<T>) => {
  let edits = _state(0);
  return (
    <div data-field-shell={rest.field}>
      <FieldInput
        {...rest}
        value={model}
        onValueChange={(next) => {
          edits++;
          onValueChange(next);
        }}
      />
      <span data-layer-edits={rest.field}>{edits}</span>
    </div>
  );
});
export const LayeredFieldsExample = _component(() => {
  let form = _state<{
    name: string | undefined;
    amount: number | undefined;
    width: number;
  }>({
    name: '第一份',
    amount: 1,
    width: 160,
  });
  const original = form;
  const attributes = _state<{
    title?: string;
  }>({
    title: '初始提示',
  });
  let revision = _state('A');
  let callback = _state('');
  let visible = _state(true);
  let disposed = _state(0);
  const appearance = css(() => {
    s.width(bx(`${form.width}px`));
  });
  const first = () => {
    callback = `A:${form.name ?? '空'}`;
  };
  const second = () => {
    callback = `B:${form.name ?? '空'}`;
  };
  return (
    <section aria-label={'多层字段组件'}>
      <h2>两层包装仍保持输入与类型</h2>
      {visible && (
        <FieldShell<string | undefined>
          {...attributes}
          field={'name'}
          label={revision === 'A' ? undefined : '新的姓名'}
          class={appearance}
          bind:value={form.name}
          format={(value) => value ?? ''}
          parse={(text) => text || undefined}
          onValueChange={revision === 'A' ? first : second}
          onDispose={() => {
            disposed++;
          }}
        />
      )}
      <FieldShell<number | undefined>
        field={'amount'}
        label={'两层数字'}
        bind:value={form.amount}
        format={(value) => (value === undefined ? '' : String(value))}
        parse={(text) => (text === '' ? undefined : Number(text))}
      />
      <output data-layer-model>
        {form.name ?? '空'}/{form.amount ?? '空'}
      </output>
      <output data-layer-original>{original.name ?? '空'}</output>
      <output data-layer-callback>{callback}</output>
      <output data-layer-disposed>{disposed}</output>
      <button
        onClick={() => {
          form = {
            name: '第二份',
            amount: 2,
            width: 240,
          };
          revision = 'B';
          delete attributes.title;
        }}
      >
        替换多层表单
      </button>
      <button
        onClick={() => {
          visible = !visible;
        }}
      >
        切换姓名字段
      </button>
    </section>
  );
});
