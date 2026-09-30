import {
  component,
  mount,
  hydrate,
  For,
  ErrorBoundary,
  createContext,
  provideContext,
  type JSX,
  type Renderable,
} from '@zerodep-js/core';

const Required = component(({ label = '默认值' }: { label: string }) => <button>{label}</button>);
const Generic = component(
  <T,>({ item, children }: { item: T; children: (value: T) => Renderable }) => children(item),
);
const Button = component(({ type = 'button', ...attrs }: JSX.IntrinsicElements['button']) => (
  <button {...attrs} type={type} />
));

export const valid = (
  <>
    <Required label="确定" />
    <Generic item={{ id: 1 }}>{(item) => <span>{item.id}</span>}</Generic>
    <Button
      disabled
      onClick={(event) => {
        const button: HTMLButtonElement = event.currentTarget;
        button.focus();
      }}
    />
    <input
      onInput={(event) => {
        const input: HTMLInputElement = event.currentTarget;
        input.value = '输入';
        // @ts-expect-error currentTarget 不是 any，未知成员应报错。
        void event.currentTarget.missing;
      }}
    />
  </>
);

export const list = (
  <For each={[{ id: 1, name: 'A' }]} keyBy={(row) => row.id}>
    {(row, index) => (
      <span>
        {index}: {row.name}
      </span>
    )}
  </For>
);
export const boundary = (
  <ErrorBoundary fallback={(error, reset) => <button onClick={reset}>{String(error)}</button>}>
    <span />
  </ErrorBoundary>
);
export const numericOption = <option value={1}>数字选项</option>;
export const scalarAttributes = <div hidden="until-found" ariaHidden={false} translate={false} />;
export const optionalAttribute = <button disabled={undefined} />;
export const vector = (
  <svg className="图形" viewBox="0 0 10 10" focusable={false}>
    <path fillOpacity={0.5} strokeDasharray={undefined} />
  </svg>
);
export const mathematics = (
  <math
    displaystyle={false}
    ref={(element) => {
      const math: MathMLElement = element;
      void math;
      // @ts-expect-error MathML ref 不会伪装成 HTMLElement。
      const html: HTMLDivElement = element;
      void html;
    }}
  >
    <mtext>
      <span>类型正确</span>
    </mtext>
    <annotation-xml encoding="text/html">
      <div />
    </annotation-xml>
  </math>
);
// @ts-expect-error SVG presentation 值不接受任意对象。
export const invalidPresentation = <path strokeDasharray={{ values: [1, 2] }} />;
export const nativeInput = (
  <input
    type="checkbox"
    onInput={(event) => {
      const optional: boolean | undefined = event.isComposing;
      void optional;
      // @ts-expect-error 原生 input 事件不一定带有 InputEvent 扩展字段。
      const guaranteed: boolean = event.isComposing;
      void guaranteed;
    }}
  />
);
export const badList = (
  <For each={[{ id: 1 }]} keyBy={(row) => row.id}>
    {(row) => {
      // @ts-expect-error 列表泛型必须由 each 推断，不得变成 any。
      return row.missing;
    }}
  </For>
);
const nameContext = createContext<string>();
// @ts-expect-error provider 不能反向扩大已定义的 context 类型。
provideContext(nameContext, 123);

// @ts-expect-error 参数默认值不改变调用方必填契约。
export const missing = <Required />;
// @ts-expect-error 泛型回调的参数必须由 item 推断。
export const badGeneric = <Generic item={{ id: 1 }}>{(item) => item.missing}</Generic>;
// @ts-expect-error readonly DOM 属性不能当作可写的 JSX 属性。
export const readonlyAttribute = <button offsetWidth={1} />;
const Plain = () => <span />;
// @ts-expect-error 普通函数不冒充框架组件。
export const unmarked = <Plain />;
// @ts-expect-error 当前渲染协议不支持 Promise 组件。
export const asyncComponent = component(async () => '异步');

declare const target: HTMLDivElement;
mount(Required, { target, props: { label: '正确' } });
// @ts-expect-error 根入口同样要求必填 props。
mount(Required, { target });
// @ts-expect-error hydration 也不能省略必填 props。
hydrate(Required, { target });
