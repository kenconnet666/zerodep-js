// 没有运行时导入的 TSX 也应通过 tsconfig 的 types 读取根入口 JSX 类型。
export const view = (
  <button
    onClick={(event) => {
      event.currentTarget.disabled satisfies boolean;
      // @ts-expect-error 根入口仍保留 button 的准确 DOM 类型。
      void event.currentTarget.checked;
    }}
  >
    纯 JSX 类型消费
  </button>
);
// @ts-expect-error 普通属性仍检查类型，不能退化为任意属性。
export const invalid = <button disabled="yes" />;
