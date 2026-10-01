import { describe, expect, it, vi } from 'vitest';
import { prop, props, restProps } from '../src/runtime/props.js';
import { reactive } from '../src/runtime/state.js';
import { _createRoot, _effect, _flushSync } from '../src/runtime/reactivity.js';

describe('组件输入视图', () => {
  it('默认值按实例缓存，依赖更新和显式覆盖保持一致', () => {
    const input = reactive<{ min?: number; max?: number | null }>({ min: 0 });
    const min = prop(input, 'min', () => 0);
    const fallback = vi.fn(() => Number(min()) + 10);
    const max = prop(input, 'max', fallback);
    expect(max()).toBe(10);
    expect(max()).toBe(10);
    expect(fallback).toHaveBeenCalledTimes(1);
    input.min = 20;
    expect(max()).toBe(30);
    input.max = 7;
    input.min = 40;
    expect(max()).toBe(7);
    delete input.max;
    expect(max()).toBe(50);
    input.max = null;
    expect(max()).toBeNull();
  });

  it('默认对象只建立一次，各实例隔离，默认函数不被调用', () => {
    const fallback = vi.fn(() => []);
    const a = prop({}, 'items', fallback);
    const b = prop({}, 'items', fallback);
    expect(a()).toBe(a());
    expect(a()).not.toBe(b());
    expect(fallback).toHaveBeenCalledTimes(2);
    const callback = vi.fn();
    expect(prop({}, 'callback', () => callback)()).toBe(callback);
    expect(callback).not.toHaveBeenCalled();
  });

  it('spread 支持增删、符号键、覆盖顺序和实时 rest', () => {
    const symbol = Symbol('扩展');
    const input = reactive<Record<PropertyKey, unknown>>({ title: 'A', id: 'first', [symbol]: 1 });
    const forwarded = props([
      { id: () => 'before' },
      () => input,
      { id: () => 'after', tone: () => 'primary' },
    ]);
    const rest = restProps(forwarded, ['tone']);
    expect({ ...rest }).toEqual({ title: 'A', id: 'after', [symbol]: 1 });
    delete input.title;
    input.disabled = true;
    expect({ ...rest }).toEqual({ id: 'after', disabled: true, [symbol]: 1 });
    expect('tone' in rest).toBe(false);
    expect(rest.tone).toBeUndefined();
    expect(() => {
      rest.id = 'bad';
    }).toThrow('只读');
    expect(() => {
      delete forwarded.id;
    }).toThrow('只读');
  });

  it('spread 中缺失属性新增后，使用默认值的读取会更新', () => {
    const input = reactive<Record<string, unknown>>({});
    const view = props([() => input]);
    const label = prop(view, 'label', () => '默认');
    const values: unknown[] = [];
    const dispose = _createRoot((stop) => {
      _effect(() => {
        values.push(label());
      });
      return stop;
    });
    try {
      _flushSync();
      _flushSync(() => {
        input.label = '新增';
      });
      _flushSync(() => {
        delete input.label;
      });
      expect(values).toEqual(['默认', '新增', '默认']);
    } finally {
      dispose();
    }
  });

  it('昂贵的显式表达式按依赖缓存，未使用的属性不求值', () => {
    const input = reactive({ value: 2 });
    const calculate = vi.fn(() => input.value * 2);
    const unused = vi.fn();
    const value = props([{ doubled: calculate, unused }]);
    expect(value.doubled).toBe(4);
    expect(value.doubled).toBe(4);
    expect(calculate).toHaveBeenCalledTimes(1);
    expect(unused).not.toHaveBeenCalled();
    input.value = 3;
    expect(value.doubled).toBe(6);
  });

  it('属性值的变化不会触发只依赖 rest 键枚举的 effect', () => {
    const input = reactive({ title: 'A' } as Record<string, string>);
    const view = restProps(props([() => input]), []);
    const keys = vi.fn(() => {
      Object.keys(view);
    });
    const dispose = _createRoot((stop) => {
      _effect(keys);
      return stop;
    });
    try {
      _flushSync();
      _flushSync(() => {
        input.title = 'B';
      });
      expect(keys).toHaveBeenCalledTimes(1);
      _flushSync(() => {
        input.id = 'new';
      });
      expect(keys).toHaveBeenCalledTimes(2);
    } finally {
      dispose();
    }
  });
});
