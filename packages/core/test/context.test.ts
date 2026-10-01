import { describe, expect, it } from 'vitest';
import { _createContext, _provideContext, _useContext } from '../src/runtime/context.js';
import {
  Derived,
  Scope,
  Source,
  _createRoot,
  _effect,
  _flushSync,
  getScope,
  _onCleanup,
  unowned,
} from '../src/runtime/reactivity.js';

describe('作用域 context', () => {
  it('子作用域清理时仍能读取父级 context', () => {
    const key = _createContext('默认');
    const values: string[] = [];
    const dispose = _createRoot((stop) => {
      _provideContext(key, '父级');
      _createRoot(() => {
        _onCleanup(() => {
          values.push(_useContext(key));
        });
      });
      return stop;
    });
    dispose();
    expect(values).toEqual(['父级']);
  });
  it('读取最近提供者，独立根之间不共享数据', () => {
    const theme = _createContext('默认');
    _createRoot((dispose) => {
      try {
        _provideContext(theme, '外层');
        expect(_useContext(theme)).toBe('外层');
        _createRoot((stop) => {
          try {
            _provideContext(theme, '内层');
            expect(_useContext(theme)).toBe('内层');
          } finally {
            stop();
          }
        });
        expect(_useContext(theme)).toBe('外层');
      } finally {
        dispose();
      }
    });
    _createRoot((dispose) => {
      try {
        expect(_useContext(theme)).toBe('默认');
      } finally {
        dispose();
      }
    });
  });

  it('显式 undefined 覆盖默认值，重复提供和无所有者访问给出错误', () => {
    const key = _createContext<string | undefined>('默认');
    _createRoot((dispose) => {
      try {
        _provideContext(key, undefined);
        expect(_useContext(key)).toBeUndefined();
        expect(() => _provideContext(key, '第二次')).toThrow('重复');
      } finally {
        dispose();
      }
    });
    expect(() => _useContext(key)).toThrow('作用域');
    expect(() => _provideContext(key, '无所有者')).toThrow('作用域');
  });

  it('共享状态 getter 自然参与依赖，纯派生不能提供 context', () => {
    const count = new Source(0);
    const key = _createContext<{ readonly count: number }>();
    const seen: number[] = [];
    const dispose = _createRoot((stop) => {
      _provideContext(key, {
        get count() {
          return count.read();
        },
      });
      const model = _useContext(key)!;
      _effect(() => {
        seen.push(model.count);
      });
      const invalid = new Derived(() => {
        _provideContext(key, model);
        return 0;
      });
      expect(() => invalid.read()).toThrow('纯派生');
      return stop;
    });
    try {
      _flushSync();
      _flushSync(() => count.write(1));
      expect(seen).toEqual([0, 1]);
    } finally {
      dispose();
    }
  });

  it('unowned 不继承临时作用域，也不污染调用方的依赖', () => {
    const ignored = new Source(0);
    let calls = 0;
    const dispose = _createRoot((stop) => {
      _effect(() => {
        calls++;
        unowned(() => {
          expect(getScope()).toBeNull();
          ignored.read();
        });
      });
      return stop;
    });
    try {
      _flushSync();
      _flushSync(() => ignored.write(1));
      expect(calls).toBe(1);
    } finally {
      dispose();
    }
  });

  it('排队的 effect 错误由所有者处理，处理器失败交给外层', () => {
    const outer = new Scope(null);
    const seen: unknown[] = [];
    outer.onError = (error) => {
      seen.push(error);
    };
    outer.run(() => {
      const inner = new Scope();
      inner.onError = () => {
        throw new Error('fallback 错误');
      };
      inner.run(() =>
        _effect(() => {
          throw new Error('子错误');
        }),
      );
    });
    try {
      _flushSync();
      expect((seen[0] as Error).message).toBe('fallback 错误');
    } finally {
      outer.dispose();
    }
  });
});
