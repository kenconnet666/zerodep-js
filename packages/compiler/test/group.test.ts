import { expect, it } from 'vitest';
import { execute } from './execute.js';
import { compile } from '../src/index.js';
import type { ElementTemplate } from '../../core/src/runtime/template.js';

function change(view: ElementTemplate, checked: boolean, value = 'tampered') {
  (view.props['on:change'] as (event: unknown) => void)({ currentTarget: { checked, value } });
}

it('checkbox 组按值增删，不修改原数组，重复事件不重复加入', () => {
  const result = execute(`
import { _state } from 'zerodep-js';
let selected = _state(['a']);
const calls = [];
const a = <input type="checkbox" value="a" bind:group={selected} />;
const b = <input type="checkbox" value="b" bind:group={selected} onChange={() => calls.push([...selected])} />;
const result = { a, b, calls, get selected(){return selected;} };`) as {
    a: ElementTemplate;
    b: ElementTemplate;
    calls: string[][];
    readonly selected: string[];
  };
  const old = result.selected;
  expect(result.a.props.checked).toBe(true);
  expect(result.b.props.checked).toBe(false);
  change(result.b, true);
  expect(result.selected).toEqual(['a', 'b']);
  expect(old).toEqual(['a']);
  const unchanged = result.selected;
  change(result.b, true);
  expect(result.selected).toBe(unchanged);
  change(result.a, false);
  expect(result.selected).toEqual(['b']);
  expect(result.calls).toEqual([
    ['a', 'b'],
    ['a', 'b'],
  ]);
});

it('radio 读取声明值而非 DOM 篡改值，未选中事件不清掉别的选项', () => {
  const result = execute(`
import { _state } from 'zerodep-js';
let selected = _state('a');
const a = <input type="RADIO" value="a" name="group" bind:group={selected} />;
const b = <input type="radio" value="b" name="group" bind:group={selected} />;
const result = {a,b,get selected(){return selected;}};`) as {
    a: ElementTemplate;
    b: ElementTemplate;
    readonly selected: string;
  };
  change(result.b, true, 'injected');
  expect(result.selected).toBe('b');
  expect(result.a.props.checked).toBe(false);
  expect(result.b.props.checked).toBe(true);
  change(result.a, false);
  expect(result.selected).toBe('b');
});

it('独立模型不串组，value 和外部数组替换会重新匹配', () => {
  const result = execute(`
import { _state } from 'zerodep-js';
function group() {
 let value = _state('a'); let selected = _state([]);
 const input = <input type={'checkbox'} value={value} bind:group={selected} />;
 return {input,get selected(){return selected;},setValue(next){value=next},setSelected(next){selected=next}};
}
const result = [group(),group()];`) as Array<{
    input: ElementTemplate;
    selected: string[];
    setValue(value: string): void;
    setSelected(value: string[]): void;
  }>;
  const [one, two] = result;
  change(one!.input, true);
  expect(two!.selected).toEqual([]);
  one!.setValue('b');
  expect(one!.input.props.checked).toBe(false);
  one!.setSelected(['b']);
  expect(one!.input.props.checked).toBe(true);
});

it('运行时拒绝错误组模型及非字符串选项，不把错误输入隐式转换', () => {
  const cases: [string, unknown, unknown][] = [
    ['radio', [], 'a'],
    ['checkbox', 'a', 'a'],
    ['checkbox', [1], 'a'],
    ['checkbox', new Array<string>(1), 'a'],
    ['radio', 'a', 1],
  ];
  for (const [type, model, value] of cases) {
    const view = execute(
      `let selected = initial; const result = <input type="${type}" value={option} bind:group={selected} />;`,
      { initial: model, option: value },
    ) as ElementTemplate;
    expect(() => view.props.checked).toThrow('bind:group');
  }
});

it('checkbox 每次校验只读取一次数组项，校验与写回使用同一个快照', () => {
  let reads = 0;
  const model = Object.defineProperty(['a'], '0', {
    get() {
      reads++;
      return reads === 1 ? 'a' : undefined;
    },
  });
  const result = execute(
    `let selected = initial; const view = <input type="checkbox" value="b" bind:group={selected} />;
     const result = {view, get selected(){return selected;}};`,
    { initial: model },
  ) as { view: ElementTemplate; selected: string[] };
  change(result.view, true);
  expect(reads).toBe(1);
  expect(result.selected).toEqual(['a', 'b']);
});

it('类型和值需明确且不被后续 spread 覆盖，checked 管理权不可冲突', () => {
  for (const input of [
    '<input type="text" value="a" bind:group={selected} />',
    '<input type={kind} value="a" bind:group={selected} />',
    '<input type="checkbox" bind:group={selected} />',
    '<input type="checkbox" value="a" {...attrs} bind:group={selected} />',
    '<input type="checkbox" value="a" checked bind:group={selected} />',
    '<input type="checkbox" value="a" defaultChecked bind:group={selected} />',
    '<input type="checkbox" value="a" bind:checked={checked} bind:group={selected} />',
  ])
    expect(() =>
      compile(
        `let selected=[];let checked=false;const kind='checkbox';const attrs={};const view=${input};`,
        'group.tsx',
      ),
    ).toThrow();
  expect(() =>
    compile(
      `let selected=[];const attrs={};const view=<input {...attrs} type="checkbox" value="a" bind:group={selected}/>;`,
      'group.tsx',
    ),
  ).not.toThrow();
});
