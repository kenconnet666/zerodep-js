import { _component, renderToString } from 'zerodep-js';

const Required = _component(({ label }: { label: string }) => label);
const Optional = _component(({ label }: { label?: string }) => label ?? null);
const OptionalParameter = _component((props?: { label?: string }) => props?.label ?? null);
renderToString(OptionalParameter);
renderToString(OptionalParameter, { props: { label: '正确' } });
// @ts-expect-error 可选参数的字段约束在服务端入口同样保留。
renderToString(OptionalParameter, { props: { label: 1 } });
renderToString(Required, { props: { label: '正确' } });
renderToString(Optional);
// @ts-expect-error 服务端入口不能省略必填 props。
renderToString(Required);
// @ts-expect-error 服务端入口保留属性类型。
renderToString(Required, { props: { label: 1 } });
