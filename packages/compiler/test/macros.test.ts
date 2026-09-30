import { runInNewContext } from 'node:vm';
import { TraceMap, originalPositionFor } from '@jridgewell/trace-mapping';
import { describe, expect, it } from 'vitest';
import * as runtime from '../../core/src/internal.js';
import { $derived, $state } from '../../core/src/macros.js';
import { CompileError, compile } from '../src/index.js';

function execute(source: string): unknown {
  const output = compile(source, 'example.ts', { runtimeModule: 'test-runtime' });
  // 只替换测试沙盒的模块接线，变量转换及其运行时均使用真实实现。
  const code = output.code.replace(
    /import \* as (\w+) from ["']test-runtime["'];?/,
    'const $1 = runtime;',
  );
  return runInNewContext(`${code}\nresult;`, { runtime });
}

describe('变量宏的绑定转换', () => {
  it('普通变量式读写、表达式派生和计算函数真实执行', () => {
    expect(
      execute(`
      import { $state, $derived } from '@zerodep-js/core';
      let count = $state(1);
      const doubled = $derived(count * 2);
      const label = $derived.by(() => '值:' + doubled);
      const before = label;
      count += 2;
      const result = [before, doubled, label];
    `),
    ).toEqual(['值:2', 6, '值:6']);
  });

  it('导入别名有效，同名局部参数和其他模块不被误改写', () => {
    expect(
      execute(`
      import { $state as state } from '@zerodep-js/core';
      let count = state(1);
      function calculate(count: number) { return ++count; }
      function ordinary(state: (value: number) => number) { return state(3); }
      count++;
      const result = [count, calculate(10), ordinary(x => x * 2)];
    `),
    ).toEqual([2, 11, 6]);
    expect(
      compile(`import { $state } from 'another-library'; let x = $state(1);`, 'other.ts').code,
    ).not.toContain('@zerodep-js/core/internal');
  });

  it('闭包在调用时读最新值，普通对象字面量与返回仍是快照', () => {
    expect(
      execute(`
      import { $state } from '@zerodep-js/core';
      function counter() {
        let count = $state(0);
        const saved = { count };
        return { get count() { return count; }, increment() { count++; }, saved };
      }
      const c = counter(); c.increment(); c.increment();
      const result = [c.count, c.saved.count];
    `),
    ).toEqual([2, 0]);
  });

  it('前后自增自减保留结果与 BigInt 行为', () => {
    expect(
      execute(`
      import { $state } from '@zerodep-js/core';
      let n = $state(1); let b = $state(2n);
      const result = [n++, ++n, n--, --n, n, b++, ++b, b];
    `),
    ).toEqual([1, 3, 3, 1, 1, 2n, 4n, 4n]);
  });

  it('复合赋值先读取左值，右侧只执行一次', () => {
    expect(
      execute(`
      import { $state } from '@zerodep-js/core';
      let n = $state(1); let calls = 0;
      function rhs() { calls++; n = 10; return 2; }
      n += rhs();
      n *= 3; n **= 2;
      const result = [n, calls];
    `),
    ).toEqual([81, 1]);
  });

  it('逻辑赋值保留短路和返回值', () => {
    expect(
      execute(`
      import { $state } from '@zerodep-js/core';
      let n = $state(0); let calls = 0;
      function rhs() { calls++; return 5; }
      const a = n &&= rhs(); const b = n ||= rhs(); const c = n ??= rhs();
      const result = [a, b, c, n, calls];
    `),
    ).toEqual([0, 5, 5, 5, 1]);
  });

  it('深对象、浅状态和赋值表达式保持规定的身份', () => {
    expect(
      execute(`
      import { $state } from '@zerodep-js/core';
      const original = { n: 1 };
      let deep = $state(original); let shallow = $state.raw(original);
      const returned = deep = original;
      deep.n = 2;
      const result = [deep !== original, shallow === original, returned === original, shallow.n];
    `),
    ).toEqual([true, true, true, 2]);
  });

  it('无初值、typeof、对象简写与类型位置均正确', () => {
    expect(
      execute(`
      import { $state } from '@zerodep-js/core';
      let count = $state<number>();
      type Count = typeof count;
      const empty = typeof count;
      count = 4;
      const result = [empty, { count }, typeof count];
    `),
    ).toEqual(['undefined', { count: 4 }, 'number']);
  });

  it('标记之前声明的闭包仍读到同一绑定', () => {
    expect(
      execute(`
      import { $state } from '@zerodep-js/core';
      function read() { return count; }
      let count = $state(1); count = 2;
      const result = read();
    `),
    ).toBe(2);
  });

  it('没有宏的普通模块只移除类型', () => {
    expect(execute('const x: number = 2; const result = x + 1;')).toBe(3);
  });

  it('不会捕获用户已有的 helper 名称或改写普通属性名', () => {
    expect(
      execute(`
      import { $state } from '@zerodep-js/core';
      let count = $state(2); const _zj = 10;
      const plain = { count: 7, [count]: 8 };
      const result = [plain.count, plain[2], _zj, count];
    `),
    ).toEqual([7, 8, 10, 2]);
  });

  it('空模块仍生成有效的空输出', () => {
    expect(compile('', 'empty.ts').code).toBe('');
  });

  it('保留源文件内容和有效位置映射', () => {
    const source = `import { $state } from '@zerodep-js/core';\nlet n = $state(1);\nn++;`;
    const result = compile(source, 'Counter.ts');
    expect(result.map?.sources).toContain('Counter.ts');
    expect(result.map?.sourcesContent).toContain(source);
    expect(result.map?.mappings).not.toBe('');
    const lines = result.code.split('\n');
    const line = lines.findIndex((text) => text.includes('.update('));
    const position = originalPositionFor(new TraceMap(result.map!), {
      line: line + 1,
      column: lines[line]!.indexOf('_zj'),
    });
    expect(position).toMatchObject({ source: 'Counter.ts', line: 3, column: 0 });
  });
});

describe('明确拒绝语义不成立的形式', () => {
  it.each([
    ['宏作为普通值', 'const alias = $state;', 'ZJ1009'],
    ['宏嵌入表达式', 'consume($state(1));', 'ZJ1002'],
    ['解构声明', 'let { n } = $state({ n: 1 });', 'ZJ1002'],
    ['派生写入', 'let n = $derived(1); n++;', 'ZJ1005'],
    ['const 写入', 'const n = $state(1); n = 2;', 'ZJ1005'],
    ['直接导出', 'export let n = $state(1);', 'ZJ1006'],
    ['导出列表', 'let n = $state(1); export { n };', 'ZJ1006'],
    ['解构赋值', 'let n = $state(1); ({ n } = { n: 2 });', 'ZJ1007'],
    ['循环目标', 'let n = $state(1); for (n of [1, 2]) {}', 'ZJ1007'],
    ['eval', 'let n = $state(1); eval("n = 2");', 'ZJ1008'],
    ['var', 'var n = $state(1);', 'ZJ1004'],
    ['展开参数', 'let n = $state(...[1]);', 'ZJ1003'],
    ['错误宏成员', 'let n = $state.magic(1);', 'ZJ1001'],
    ['尚未实现的 JSX', 'const element = <div />;', 'ZJ1100'],
  ])('%s', (_name, code, expected) => {
    const source = `import { $state, $derived } from '@zerodep-js/core';\n${code}`;
    try {
      compile(source, 'invalid.tsx');
      expect.unreachable();
    } catch (error) {
      expect(error).toBeInstanceOf(CompileError);
      const diagnostics = (error as CompileError).diagnostics;
      expect(diagnostics.some((item) => item.code === expected)).toBe(true);
      expect(diagnostics.every((item) => item.line >= 1 && item.column >= 1)).toBe(true);
    }
  });

  it('宏未编译时立即报错，不伪装成正常运行时函数', () => {
    expect(() => $state(1)).toThrow('编译器');
    expect(() => $state.raw({})).toThrow('编译器');
    expect(() => $derived(1)).toThrow('编译器');
    expect(() => $derived.by(() => 1)).toThrow('编译器');
  });

  it('语法错误统一携带文件名和原始位置', () => {
    try {
      compile('const = 1;', 'syntax.ts');
      expect.unreachable();
    } catch (error) {
      expect(error).toBeInstanceOf(CompileError);
      expect((error as CompileError).diagnostics[0]).toMatchObject({
        code: 'ZJ1000',
        filename: 'syntax.ts',
        line: 1,
      });
    }
  });
});
