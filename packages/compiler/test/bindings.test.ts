import { expect, it } from 'vitest';
import { execute } from './execute.js';

it('绑定写入也检查在闭包之后声明的只读派生', () => {
  expect(() =>
    compile(
      `import {_derived} from 'zerodep-js';
function view() { return <input bind:value={text}/>; }
let text = _derived('只读');`,
      'late.tsx',
    ),
  ).toThrow('ZJ1005');
});
import { compile } from '../src/index.js';
import type { ElementTemplate } from '../../core/src/runtime/template.js';

it('原生绑定生成读写关系，事件别名保留顺序，先更新状态再调用用户事件', () => {
  const result = execute(`
import { _state } from 'zerodep-js';
let value = _state('开始');
const calls = [];
const view = <input bind:value={value} onInput={() => calls.push(value)} on:input={() => calls.push('后:'+value)} />;
const result = { view, calls, get value(){return value;}, change(next){value=next;} };
`) as {
    view: ElementTemplate;
    calls: string[];
    readonly value: string;
    change(next: string): void;
  };
  expect(result.view.props.value).toBe('开始');
  const event = { currentTarget: { localName: 'input', value: '输入' } };
  (result.view.props['on:input'] as Function)(event);
  expect(result.value).toBe('输入');
  expect(result.calls).toEqual(['输入', '后:输入']);
  result.change('外部');
  expect(result.view.props.value).toBe('外部');
  expect(Object.keys(result.view.props)).not.toContain('bind:value');
});

it('数字空态和多选按明确的值类型写回', () => {
  const result = execute(`
import { _state } from 'zerodep-js';
let number = _state(1);
let items = _state([]);
const numeric = <input type="number" bind:valueAsNumber={number} />;
const multiple = <select multiple bind:value={items} />;
const result = { numeric, multiple, get number(){return number;}, get items(){return items;} };
`) as {
    numeric: ElementTemplate;
    multiple: ElementTemplate;
    number: number | undefined;
    items: string[];
  };
  (result.numeric.props['on:input'] as Function)({ currentTarget: { valueAsNumber: NaN } });
  expect(result.number).toBeUndefined();
  expect(result.numeric.props.value).toBe('');
  (result.multiple.props['on:change'] as Function)({
    currentTarget: {
      localName: 'select',
      multiple: true,
      selectedOptions: [{ value: 'a' }, { value: 'b' }],
    },
  });
  expect(result.items).toEqual(['a', 'b']);
});

it('details 的 toggle 写回 boolean，用户回调读取更新后的状态', () => {
  const result = execute(`
import { _state } from 'zerodep-js';
let open = _state(false); const calls = [];
const view = <details bind:open={open} onToggle={() => calls.push(open)} />;
const result = { view, calls, get open(){return open}, change(value){open=value} };`) as {
    view: ElementTemplate;
    calls: boolean[];
    open: boolean;
    change(value: boolean): void;
  };
  expect(result.view.props.open).toBe(false);
  (result.view.props['on:toggle'] as Function)({ currentTarget: { open: true } });
  expect(result.open).toBe(true);
  expect(result.calls).toEqual([true]);
  result.change(false);
  expect(result.view.props.open).toBe(false);
});

it('details 绑定拒绝错误标签、重复 open 和私有 SSR 标记', () => {
  for (const markup of [
    '<dialog bind:open={open} />',
    '<div bind:open={open} />',
    '<details open bind:open={open} />',
    '<details bind:open={open} data-zj-open="1" />',
  ])
    expect(() => compile(`let open = false; const view = ${markup};`, 'details.tsx')).toThrow();
});

it('拒绝不可写表达式、保留属性、重复绑定及冲突的原生值', () => {
  for (const source of [
    `let name=''; const view=<input bind:value={name.trim()} />;`,
    `const name=''; const view=<input bind:value={name} />;`,
    `let name=''; const view=<input bind:value={name} value="冲突" />;`,
    `let name=''; const view=<input bind:value={name} bind:value={name} />;`,
    `let name=''; const view=<div bind:value={name} />;`,
    `let name=''; const view=<Field bind:key={name} />;`,
    `import {_component} from 'zerodep-js';const Field=_component(({value})=><input bind:value={value}/>);`,
    `import {_state,_derived} from 'zerodep-js';let n=_state(1);const d=_derived(n);const view=<input bind:valueAsNumber={d}/>;`,
  ])
    expect(() => compile(source, 'binding.tsx')).toThrow();
});
