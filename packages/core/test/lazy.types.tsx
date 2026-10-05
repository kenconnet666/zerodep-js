import { _component, _lazy } from 'zerodep-js';
const Card = _component(({ title }: { title: string }) => <p>{title}</p>);
const LazyCard = _lazy(async () => ({ default: Card }));
const Generic = _component(<T,>({ value, render }: { value: T; render: (value: T) => string }) => (
  <p>{render(value)}</p>
));
const LazyGeneric = _lazy(async () => Generic);
export const correct = <LazyCard title="加载" />;
export const generic = <LazyGeneric value={{ name: '示例' }} render={(item) => item.name} />;
// @ts-expect-error 必填属性在 lazy 后仍然必填。
export const missing = <LazyCard />;
// @ts-expect-error 原属性类型保持。
export const wrong = <LazyCard title={1} />;
export const wrongGeneric = (
  // @ts-expect-error 泛型上下文不能退化为 any。
  <LazyGeneric value={{ name: '示例' }} render={(item) => item.missing} />
);
