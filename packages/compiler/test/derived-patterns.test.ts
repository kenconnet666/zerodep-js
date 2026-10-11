import { expect, it } from 'vitest';
import { execute } from './execute.js';
import { compile, diagnose } from '../src/index.js';

it('普通业务函数参数解构、结果派生解构及根对象替换；普通别名仍是快照', () => {
  expect(
    execute(`
import { _state, _derived } from 'zerodep-js';
let order = _state({quantity:2,price:5});
function quote({quantity,price}) {return {subtotal:quantity*price,total:quantity*price*2};}
const {subtotal, total:amount} = _derived(quote(order));
const saved=amount;
const first=[subtotal,amount];
order={quantity:3,price:7};
const result=[first,subtotal,amount,saved];
`),
  ).toEqual([[10, 20], 21, 42, 20]);
});

it('嵌套、默认值、rest 与 getter 共用一次原生解构，默认值依赖能失效', () => {
  const calls: string[] = [];
  expect(
    execute(
      `
import { _state, _derived } from 'zerodep-js';
let fallback=_state(4), revision=_state(0);
const {a:first=fallback, nested:{b}, ...rest}=_derived.by(()=>{
 record('source'); revision;
 return {get a(){record('getter');return undefined;},nested:{b:2},extra:3};
});
const before=[first,b,rest.extra,first];
fallback=5;
const after=[first,b,rest.extra];
const result=[before,after];
`,
      { record: (name: string) => calls.push(name) },
    ),
  ).toEqual([
    [4, 2, 3, 4],
    [5, 2, 3],
  ]);
  expect(calls).toEqual(['source', 'getter', 'getter']);
});

it('by 的工厂参数在声明时取得一次，解构时复用原派生调用语义', () => {
  const calls: string[] = [];
  expect(
    execute(
      `
import {_state,_derived} from 'zerodep-js';
let n=_state(1);
const holder={get calculate(){record('factory');return ()=>({value:n});}};
const {value}=_derived.by(holder.calculate);
record('declared');
const first=value;n=2;
const result=[first,value];
`,
      { record: (value: string) => calls.push(value) },
    ),
  ).toEqual([1, 2]);
  expect(calls).toEqual(['factory', 'declared']);
});

it('数组空位、rest、前项默认值引用与同步函数调用保持求值顺序', () => {
  expect(
    execute(`
import {_derived as memo, _state} from 'zerodep-js';
let list=_state([2,undefined,9,10]);
const [a,b=a+1,,...rest]=memo(list);
const before=[a,b,rest];
list=[4,8,7,6];
const result=[before,a,b,rest];
`),
  ).toEqual([[2, 3, [10]], 4, 8, [6]]);
});

it('跨字段默认值、计算键和多声明保持绑定作用域', () => {
  expect(
    execute(`
import * as z from 'zerodep-js';
let key=z._state('a');
const earlier=3, {[key]:value, missing=earlier}=z._derived({a:1,b:2}), later=value+missing;
const before=[value,missing,later];
key='b';
const result=[before,value,missing,later];
`),
  ).toEqual([[1, 3, 4], 2, 3, 4]);
});

it('解构字段是只读派生，普通同名函数不转换', () => {
  expect(
    diagnose(`import {_derived} from 'zerodep-js';let {a}=_derived({a:1});a++;`, 'readonly.ts')[0]
      ?.code,
  ).toBe('ZJ1005');
  expect(
    diagnose(
      `import {_derived} from 'zerodep-js';const {a}=_derived({a:1});export {a};`,
      'export.ts',
    )[0]?.code,
  ).toBe('ZJ1006');
  expect(
    compile(`function _derived(x){return x;} const {a}=_derived({a:1});`, 'ordinary.ts').code,
  ).not.toContain('zerodep-js');
});

it('解构派生继续拒绝跨回调沿用外层收窄与纯计算内写状态', () => {
  expect(
    diagnose(
      `import {_derived} from 'zerodep-js';const {name}=_derived(read());if(name) register(()=>name.trim());`,
      'guard.ts',
    )[0]?.code,
  ).toBe('ZJ1501');
  expect(() =>
    execute(
      `import {_state,_derived} from 'zerodep-js';let n=_state(1);const {a}=_derived.by(()=>{n++;return {a:n};});const result=a;`,
    ),
  ).toThrow();
});

it('派生工厂里的局部派生解构也经过转换，复用业务函数时保持更新', () => {
  expect(
    execute(`
import {_state, _derived} from 'zerodep-js';
let quantity = _state(2);
const {total} = _derived.by(() => {
  const {price} = _derived({price: quantity * 5});
  return {total: price * 2};
});
const before = total;
quantity = 3;
const result = [before, total];
`),
  ).toEqual([20, 30]);
});
