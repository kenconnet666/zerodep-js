import { runInNewContext } from 'node:vm';
import { describe, expect, it } from 'vitest';
import * as runtime from '../../core/src/internal.js';
import { createRoot } from '../../core/src/reactivity.js';
import { reactive } from '../../core/src/state.js';
import { compile } from '../src/index.js';

function execute(source: string, extra = {}): unknown {
  const output = compile(source, 'component.ts', { runtimeModule: 'test-runtime' });
  const code = output.code.replace(
    /import \* as (\w+) from ["']test-runtime["'];?/,
    'const $1 = runtime;',
  );
  return runInNewContext(`${code}\nresult;`, { runtime, ...extra });
}

describe('组件参数转换', () => {
  it('直接解构读取最新 props，初始值变化不重置局部状态，事件调用最新回调', () => {
    let increment!: () => void;
    let read!: () => number[];
    const capture = (click: () => void, inspect: () => number[]) => {
      increment = click;
      read = inspect;
    };
    const Counter = execute(
      `
      import { component, $state } from '@zerodep-js/core';
      const Counter = component(({ initial = 0, step = 1, onChange }: { initial?: number; step?: number; onChange?: (n: number) => void }) => {
        let count = $state(initial);
        capture(() => { count += step; onChange?.(count); }, () => [count, step]);
        return null;
      });
      const result = Counter;
    `,
      { capture },
    ) as Parameters<typeof runtime.setupComponent>[0];
    const events: string[] = [];
    const input = reactive({
      initial: 0,
      step: 1,
      onChange: (n: number) => {
        events.push(`旧:${n}`);
      },
    });
    const dispose = createRoot((stop) => {
      runtime.setupComponent(Counter, input);
      return stop;
    });
    try {
      increment();
      input.step = 2;
      input.initial = 100;
      input.onChange = (n: number) => {
        events.push(`新:${n}`);
      };
      increment();
      expect(read()).toEqual([3, 2]);
      expect(events).toEqual(['旧:1', '新:3']);
      expect(() => Counter(input as never)).toThrow('不能当普通函数');
    } finally {
      dispose();
    }
  });

  it('别名、前序默认值和 rest 都实时更新', () => {
    let read!: () => unknown;
    const View = execute(
      `
      import { component as define } from '@zerodep-js/core';
      const View = define(({ min = 0, max = min + 10, class: className = 'base', ...attrs }) => {
        capture(() => [min, max, className, { ...attrs }]); return null;
      });
      const result = View;
    `,
      {
        capture: (fn: () => unknown) => {
          read = fn;
        },
      },
    ) as Parameters<typeof runtime.setupComponent>[0];
    const input = reactive<Record<string, unknown>>({ min: 1, id: 'A' });
    const dispose = createRoot((stop) => {
      runtime.setupComponent(View, input);
      return stop;
    });
    try {
      expect(read()).toEqual([1, 11, 'base', { id: 'A' }]);
      input.min = 20;
      input.class = 'next';
      delete input.id;
      input.title = 'B';
      expect(read()).toEqual([20, 30, 'next', { title: 'B' }]);
    } finally {
      dispose();
    }
  });

  it('函数参数遮蔽不被改写，函数声明与无参数组件可用', () => {
    let read!: () => unknown;
    const View = execute(
      `
      import { component } from '@zerodep-js/core';
      const Empty = component(() => null);
      const View = component(function Named({ label = 'A' }) {
        function local(label: string) { return label + '!'; }
        capture(() => [label, local('B')]); return null;
      });
      const result = View;
    `,
      {
        capture: (fn: () => unknown) => {
          read = fn;
        },
      },
    ) as Parameters<typeof runtime.setupComponent>[0];
    const dispose = createRoot((stop) => {
      runtime.setupComponent(View, {});
      return stop;
    });
    try {
      expect(read()).toEqual(['A', 'B!']);
    } finally {
      dispose();
    }
  });

  it('props 对象入口保留 getter，外部传入对象不会被深度冻结', () => {
    let read!: () => unknown;
    const View = execute(
      `
      import { component } from '@zerodep-js/core';
      const View = component((props) => { capture(() => props.value); return null; });
      const result = View;
    `,
      {
        capture: (fn: () => unknown) => {
          read = fn;
        },
      },
    ) as Parameters<typeof runtime.setupComponent>[0];
    const input = reactive({ value: 1 });
    const dispose = createRoot((stop) => {
      runtime.setupComponent(View, input);
      return stop;
    });
    try {
      input.value = 2;
      expect(read()).toBe(2);
    } finally {
      dispose();
    }
  });

  it.each([
    ['参数赋值', 'component(({ value }) => { value++; return null; });', 'ZJ1203'],
    ['对象顶层写入', 'component((props) => { props.value = 1; return null; });', 'ZJ1203'],
    ['嵌套解构', 'component(({ user: { name } }) => null);', 'ZJ1204'],
    ['引用后序参数', 'component(({ a = b, b = 1 }) => a);', 'ZJ1205'],
    ['引用自身', 'component(({ a = a }) => a);', 'ZJ1205'],
    ['引用函数体变量', 'component(({ a = local }) => { const local = 1; return a; });', 'ZJ1205'],
    [
      '默认值被局部变量遮蔽',
      'const value = 1; component(({ a = value }) => { const value = 2; return a; });',
      'ZJ1205',
    ],
    ['异步组件', 'component(async () => null);', 'ZJ1200'],
    ['间接标记', 'const alias = component;', 'ZJ1206'],
  ])('明确诊断：%s', (_name, source, code) => {
    expect(() =>
      compile(`import { component } from '@zerodep-js/core'; ${source}`, 'invalid.ts'),
    ).toThrow(code);
  });
});
