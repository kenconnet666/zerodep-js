import { type EventHandler } from 'zerodep-js';

interface TypedWidget extends HTMLElement {
  data: { label: string };
  format: (value: string) => string;
  readonly immutable: number;
}
declare global {
  interface HTMLElementTagNameMap {
    'zj-typed-widget': TypedWidget;
  }
}
const changed: EventHandler<TypedWidget, CustomEvent<{ label: string }>> = (event) => {
  event.currentTarget.data = event.detail;
  // @ts-expect-error 自定义 detail 保留真实约束。
  void event.detail.missing;
};
export const properties = (
  <>
    <div prop:scrollTop={40} />
    <video prop:volume={0.5} prop:srcObject={null} />
    <zj-typed-widget
      prop:data={{ label: '对象输入' }}
      prop:format={(value) => value.toUpperCase()}
      on:ValueChanged={changed}
      oncapture:ValueChanged={(event: CustomEvent<{ label: string }>) => {
        event.detail.label.toUpperCase();
      }}
      onInput={(event) => {
        event.currentTarget.data.label.toUpperCase();
      }}
    />
    <input form="form-id" list="suggestions" />
    <button form="form-id" />
    <label for="field-id">标签</label>
    <output for="field-id other-field" form="form-id">
      结果
    </output>
  </>
);
// @ts-expect-error 非反射 property 不能伪装成普通 attribute。
export const bareProperty = <div scrollTop={40} />;
// @ts-expect-error 只读 DOM property 不可写。
export const readonlyProperty = <div prop:offsetWidth={40} />;
// @ts-expect-error form 的动态索引不能把只读 property 放宽成 any。
export const readonlyFormProperty = <form prop:offsetWidth={40} />;
// @ts-expect-error select 的索引同样不能放宽标准属性类型。
export const wrongSelectProperty = <select prop:scrollTop="错误类型" />;
// @ts-expect-error 自定义只读成员也不可写。
export const readonlyCustom = <zj-typed-widget prop:immutable={1} />;
// @ts-expect-error property 数据不能退化为 any。
export const wrongData = <zj-typed-widget prop:data={{ label: 1 }} />;
// @ts-expect-error 已有模型语义继续使用普通 value。
export const bypassModel = <input prop:value="错误入口" />;
// @ts-expect-error output.value 会改写 JSX 子内容。
export const contentOwnership = <output value="错误入口" />;
// @ts-expect-error 无法通过 property 绕过 DOM 内容所有权。
export const rawHtml = <div prop:innerHTML="<b>原始内容</b>" />;
// @ts-expect-error select.length 会重写受框架管理的选项。
export const optionOwnership = <select prop:length={0} />;
// @ts-expect-error table.caption 会替换受管理的 DOM 子树。
export const tableOwnership = <table prop:caption={null} />;
// @ts-expect-error label.form 是关联结果，不是可指定的内容属性。
export const labelForm = <label form="并非内容属性" />;
