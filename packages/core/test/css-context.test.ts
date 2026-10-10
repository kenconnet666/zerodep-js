import { describe, expect, it } from 'vitest';
import { Css, SystemKeywords, ColorKeywords } from 'zerodep-js-css';
import { createCssContext } from 'zerodep-js-css';
import { source, _createRoot, _effect, _flushSync } from 'zerodep-js';

class AppCss extends Css {
  readonly name = 'app';
}

describe('CSS 作者作用域', () => {
  it('保留作者对象身份和扩展类型，子域覆盖不影响父域', () => {
    const { provideCss, useCss } = createCssContext<AppCss>();
    const outer = new AppCss();
    const inner = new AppCss();
    _createRoot((dispose) => {
      try {
        expect(provideCss(outer)).toBe(outer);
        _createRoot((stop) => {
          try {
            expect(useCss()).toBe(outer);
            provideCss(inner);
            expect(useCss()).toBe(inner);
            expect(useCss().name).toBe('app');
          } finally {
            stop();
          }
        });
        expect(useCss()).toBe(outer);
      } finally {
        dispose();
      }
    });
  });

  it('不同根与不同工厂不串值，缺少作者和重复提供明确报错', () => {
    const one = createCssContext();
    const two = createCssContext();
    expect(() => one.useCss()).toThrow('作用域');
    _createRoot((dispose) => {
      try {
        one.provideCss(new Css());
        expect(() => two.useCss()).toThrow('没有 CSS 作者');
        expect(() => one.provideCss(new Css())).toThrow('重复');
      } finally {
        dispose();
      }
    });
    _createRoot((dispose) => {
      try {
        expect(() => one.useCss()).toThrow('没有 CSS 作者');
      } finally {
        dispose();
      }
    });
  });

  it('注入的主题 getter 保持追踪，销毁后不保留副作用', () => {
    class Colors extends ColorKeywords {
      override readonly red: string;
      constructor(value: string) {
        super();
        this.red = value;
      }
    }
    class Theme extends SystemKeywords {
      override readonly color: SystemKeywords['color'];
      constructor(primary: string) {
        super();
        this.color = new Colors(primary);
      }
    }
    const theme = source(new Theme('blue'));
    const { provideCss, useCss } = createCssContext();
    const seen: string[] = [];
    const dispose = _createRoot((stop) => {
      provideCss(new Css(() => theme.read()));
      _createRoot(() => {
        const s = useCss();
        _effect(() => {
          seen.push(s.color.red);
        });
      });
      return stop;
    });
    try {
      _flushSync();
      theme.write(new Theme('green'));
      _flushSync();
      expect(seen).toEqual(['color:blue;', 'color:green;']);
      dispose();
      theme.write(new Theme('purple'));
      _flushSync();
      expect(seen).toHaveLength(2);
    } finally {
      dispose();
    }
  });
});
