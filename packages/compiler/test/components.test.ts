import { execute } from './execute.js';
import { describe, expect, it } from 'vitest';
import * as runtime from '../../core/dist/index.js';
import { _createRoot } from '../../core/dist/runtime/reactivity.js';
import { reactive } from '../../core/dist/runtime/state.js';
import { compile } from '../src/index.js';

describe('组件参数转换', () => {
  it('可选 props 参数仍接收实时只读对象，不丢失属性', () => {
    let read!: () => unknown;
    const View = execute(
      `
import { _component } from 'zerodep-js';
const result = _component((props?: { label?: string }) => {
  capture(() => props?.label ?? '默认');
  return null;
});`,
      {
        capture: (fn: () => unknown) => {
          read = fn;
        },
      },
    ) as Parameters<typeof runtime.setupComponent>[0];
    const input = reactive<{ label?: string }>({});
    const stop = _createRoot((dispose) => {
      runtime.setupComponent(View, input);
      return dispose;
    });
    try {
      expect(read()).toBe('默认');
      input.label = '更新';
      expect(read()).toBe('更新');
      delete input.label;
      expect(read()).toBe('默认');
    } finally {
      stop();
    }
  });

  it('命名参数可以读取原型 getter，但实时 rest 保持自有可枚举边界', () => {
    let read!: () => unknown;
    const View = execute(
      `
import { _component } from 'zerodep-js';
const result = _component(({ title = 'default', ...rest }) => {
  capture(() => [title, rest.visible, rest.hidden, rest.secret, Object.keys(rest)]);
  return null;
});`,
      {
        capture: (fn: () => unknown) => {
          read = fn;
        },
      },
    ) as Parameters<typeof runtime.setupComponent>[0];
    class Input {
      visible = 'A';
      get title() {
        return 'prototype title';
      }
      get hidden() {
        throw new Error('rest 不应读取原型 getter');
      }
    }
    const input = Object.defineProperty(new Input(), 'secret', { value: 'private' });
    const stop = _createRoot((dispose) => {
      runtime.setupComponent(View, input);
      return dispose;
    });
    try {
      expect(read()).toEqual(['prototype title', 'A', undefined, undefined, ['visible']]);
      input.visible = 'B';
      expect(read()).toEqual(['prototype title', 'B', undefined, undefined, ['visible']]);
    } finally {
      stop();
    }
  });

  it('直接解构读取最新 props，初始值变化不重置局部状态，事件调用最新回调', () => {
    let increment!: () => void;
    let read!: () => number[];
    const capture = (click: () => void, inspect: () => number[]) => {
      increment = click;
      read = inspect;
    };
    const Counter = execute(
      `
import { _component, _state } from 'zerodep-js';
const Counter = _component(({ initial = 0, step = 1, onChange }: {initial?: number;step?: number;onChange?: (n: number) => void;}) => {
  let count = _state(initial);
  capture(() => {count += step;onChange?.(count);}, () => [count, step]);
  return null;
});
const result = Counter;`,

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
    const dispose = _createRoot((stop) => {
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
import { _component as define } from 'zerodep-js';
const View = define(({ min = 0, max = min + 10, class: className = 'base', ...attrs }) => {
  capture(() => [min, max, className, { ...attrs }]);return null;
});
const result = View;`,

      {
        capture: (fn: () => unknown) => {
          read = fn;
        },
      },
    ) as Parameters<typeof runtime.setupComponent>[0];
    const input = reactive<Record<string, unknown>>({ min: 1, id: 'A' });
    const dispose = _createRoot((stop) => {
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
import { _component } from 'zerodep-js';
const Empty = _component(() => null);
const View = _component(function Named({ label = 'A' }) {
  function local(label: string) {return label + '!';}
  capture(() => [label, local('B')]);return null;
});
const result = View;`,

      {
        capture: (fn: () => unknown) => {
          read = fn;
        },
      },
    ) as Parameters<typeof runtime.setupComponent>[0];
    const dispose = _createRoot((stop) => {
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
import { _component } from 'zerodep-js';
const View = _component((props) => {capture(() => props.value);return null;});
const result = View;`,

      {
        capture: (fn: () => unknown) => {
          read = fn;
        },
      },
    ) as Parameters<typeof runtime.setupComponent>[0];
    const input = reactive({ value: 1 });
    const dispose = _createRoot((stop) => {
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
    ['参数赋值', '_component(({ value }) => {value++;return null;});', 'ZJ1203'],
    ['对象顶层写入', '_component((props) => {props.value = 1;return null;});', 'ZJ1203'],
    ['嵌套解构', '_component(({ user: { name } }) => null);', 'ZJ1204'],
    ['引用后序参数', '_component(({ a = b, b = 1 }) => a);', 'ZJ1205'],
    ['引用自身', '_component(({ a = a }) => a);', 'ZJ1205'],
    ['引用函数体变量', '_component(({ a = local }) => {const local = 1;return a;});', 'ZJ1205'],
    [
      '默认值被局部变量遮蔽',
      'const value = 1;_component(({ a = value }) => {const value = 2;return a;});',
      'ZJ1205',
    ],

    ['异步组件', '_component(async () => null);', 'ZJ1200'],
    ['间接标记', 'const alias = _component;', 'ZJ1206'],
    ['读取保留 key', '_component(({ key }) => key);', 'ZJ1207'],
    ['删除 props', '_component((props) => {delete props.title;return null;});', 'ZJ1203'],
    [
      '写入 rest',
      '_component(({ label, ...attrs }) => {attrs.title = label;return null;});',
      'ZJ1203',
    ],
  ])('明确诊断：%s', (_name, source, code) => {
    expect(() =>
      compile(`import { _component } from 'zerodep-js';${source};`, 'invalid.ts'),
    ).toThrow(code);
  });
});
