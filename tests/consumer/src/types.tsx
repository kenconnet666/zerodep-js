import { compile, type CompileResult } from 'zerodep-js-compiler';
import { Counter, Label } from '@zerodep-consumer/counter';
import { _mount, type ComponentProps } from 'zerodep-js';
import { _createScope, _snapshot } from 'zerodep-js';
import { _defineRoute, _defineRoutes, _createRouter, Link } from 'zerodep-use/router';
import { _persistLocal, _persistSession } from 'zerodep-use/storage';
import { _history } from 'zerodep-use/history';
import { _lazy } from 'zerodep-js';

let boundText = '';
let boundNumber = 123;
<input bind:value={boundText} />;
// @ts-expect-error 文本绑定不会把 number 偷换成 string。
<input bind:value={boundNumber} />;
_history({
  read: () => boundText,
  write: (next) => {
    boundText = next;
  },
}).undo();
const LazyCounter = _lazy(async () => Counter);
<LazyCounter label="按需" />;
// @ts-expect-error 按需包装保留原组件的必填 props。
<LazyCounter />;

const props: ComponentProps<typeof Counter> = { label: '声明消费', initial: 2 };
<button popoverTarget="help" />;
<svg>
  <feGaussianBlur stdDeviation="1 2" />
</svg>;
// @ts-expect-error 生成数据的声明随包提供，但不放宽元素对象类型。
<button popoverTarget={document.body} />;
<Counter {...props} />;
<Label value={{ id: 1 }}>{(value) => value.id}</Label>;
const result: CompileResult = compile('const answer: number = 42;', 'answer.ts');
result.map?.sources.forEach((source) => source?.toUpperCase());

// @ts-expect-error 已打包的组件仍要求必填 props。
<Counter />;
// @ts-expect-error 泛型 children 不会退化成 any。
<Label value={{ id: 1 }}>{(value) => value.missing}</Label>;
// @ts-expect-error 根挂载同样要求必填 props。
_mount(Counter, { target: document.body });
<textarea
  onInput={(event) => {
    event.currentTarget.value.toUpperCase();
    // @ts-expect-error 原生事件 target 仍是 textarea，不伪装成 input。
    event.currentTarget.checked = true;
  }}
/>;

const routes = _defineRoutes({
  item: _defineRoute('/items/:id', {
    load: ({ params }) => ({ id: params.id }),
  }),
});
const router = _createRouter(routes);
router.href(routes.item, { params: { id: '1' } });
// @ts-expect-error 独立安装仍保留命名参数类型。
router.href(routes.item, { params: { id: 1 } });
// @ts-expect-error 子入口泛型 Link 不丢失必填参数。
<Link to={routes.item} />;
const scope = _createScope();
export const signal: AbortSignal = scope.signal;
scope.dispose();
_snapshot({ n: 1 }).n.toFixed();
_persistLocal('typed', { read: () => 1, write: (value) => value.toFixed() });
_persistSession('typed-object', {
  read: () => ({ enabled: true }),
  write: (value) => {
    const enabled: boolean = value.enabled;
    void enabled;
  },
});
