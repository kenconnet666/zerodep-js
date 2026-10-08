import { compile, type CompileResult } from 'zerodep-js-compiler';
import { Counter, Label } from '@zerodep-consumer/counter';
import { _component, _mount, type ComponentProps } from 'zerodep-js';
import { _createScope, _snapshot } from 'zerodep-js';
import { _defineRoute, _defineRoutes, _createRouter, Link } from 'zerodep-use/router';
import { _persistLocal, _persistSession } from 'zerodep-use/storage';
import { _history } from 'zerodep-use/history';
import { _lazy } from 'zerodep-js';
import { _createRoot, _id } from 'zerodep-js';
import { Css } from 'zerodep-css';
import { css, _createCssContext } from 'zerodep-js/css';
import { _head, type HeadData } from 'zerodep-js/head';
import { _render, type RenderResult } from 'zerodep-js-ssr';

const cssAuthor = new Css();
const styleClass: string = css(cssAuthor.width.px(12));
<div class={styleClass} />;
// @ts-expect-error CSS 作者类型跨 TS6/TS7 保持单位参数约束。
cssAuthor.width.px('12px');
class ProjectCss extends Css {
  readonly label = 'project';
}
const projectCss = _createCssContext<ProjectCss>();
_createRoot((dispose) => {
  projectCss.provideCss(new ProjectCss());
  projectCss.useCss().label satisfies string;
  // @ts-expect-error 工厂保留项目作者扩展，不接受缺少字段的普通 Css。
  projectCss.provideCss(new Css());
  dispose();
});

function headTypes() {
  _head(() => ({ title: 'title', description: undefined }));
  _head(() => false);
  // @ts-expect-error 元信息不隐式把数字变成标题。
  _head(() => ({ title: 123 }));
  // @ts-expect-error 不支持异步元信息 getter。
  _head(async () => ({ title: 'async' }));
  const head: HeadData = { title: 'x' };
  const rendered: RenderResult = _render(Counter, { props: { label: 'x' } });
  return [head, rendered];
}
void headTypes;

const idFactory: () => string = _id;
void idFactory;

let boundText = '';
let boundNumber = 123;
let expanded = false;
let selected: string[] = [];
<input type="checkbox" value="a" bind:group={selected} />;
// @ts-expect-error 分组模型不接受 boolean。
<input type="checkbox" value="a" bind:group={expanded} />;
<details bind:open={expanded} />;
// @ts-expect-error 展开状态需要 boolean，不能写回 string。
<details bind:open={boundText} />;
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
const OptionalParameter = _component((props?: { label?: string }) => props?.label ?? null);
const optionalProps: ComponentProps<typeof OptionalParameter> = { label: '可选参数' };
_mount(OptionalParameter, { target: document.body, props: optionalProps });
_render(OptionalParameter, { props: optionalProps });
// @ts-expect-error 包声明不能把可选参数中的属性类型放宽。
_render(OptionalParameter, { props: { label: 123 } });
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
const futureContent = Promise.resolve('稍后');
// @ts-expect-error 内容必须是已准备好的值，不把 Promise 当作可渲染节点。
<div children={futureContent} />;
// @ts-expect-error 文本输出同样不支持隐式等待。
<output children={futureContent} />;
// @ts-expect-error DOM ref 必须同步返回，异步资源显式启动并清理。
<div ref={async () => {}} />;
_persistLocal('typed', { read: () => 1, write: (value) => value.toFixed() });
_persistSession('typed-object', {
  read: () => ({ enabled: true }),
  write: (value) => {
    const enabled: boolean = value.enabled;
    void enabled;
  },
});
