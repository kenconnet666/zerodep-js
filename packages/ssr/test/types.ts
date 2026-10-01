import { _component } from 'zerodep-js';
import { renderToString } from '../src/index.js';

const Required = _component(({ label }: { label: string }) => label);
const Optional = _component(({ label }: { label?: string }) => label ?? null);
renderToString(Required, { props: { label: '正确' } });
renderToString(Optional);
// @ts-expect-error 服务端入口不能省略必填 props。
renderToString(Required);
// @ts-expect-error 服务端入口保留属性类型。
renderToString(Required, { props: { label: 1 } });
