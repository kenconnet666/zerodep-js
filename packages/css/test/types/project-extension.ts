import { Css, ColorCss, type CssInput } from '../../src/index.js';

class ProjectColor extends ColorCss {
  readonly _text = this.raw('var(--z-theme-text)');
}

/** 示例项目自己选择允许覆盖的主题键，不属于框架公共配置。 */
interface ProjectTheme {
  text?: string;
  surface?: string;
}

/** 项目按自己的约定扩展；这些方法不加入系统 Css 或主题预设入口。 */
class ProjectCss extends Css {
  override readonly color = new ProjectColor();
  _media(query: string, ...parts: CssInput[]): string {
    return this._selector(`@media ${query}`, parts);
  }

  _supports(condition: string, ...parts: CssInput[]): string {
    return this._selector(`@supports ${condition}`, parts);
  }

  _container(query: string, ...parts: CssInput[]): string {
    return this._selector(`@container ${query}`, parts);
  }

  theme(values: ProjectTheme): string {
    // 只声明本次提供的值；其他主题色沿原生 DOM 继承。
    return Object.entries(values)
      .filter(([, value]) => value !== undefined)
      .map(([name, value]) => `--z-theme-${name}:${value};`)
      .join('');
  }
}

const s = new ProjectCss();
s._media('(width >= 48rem)', [s.color.red, false, [s.width.rem(20)]]) satisfies string;
s._supports('(display: grid)', s.display.grid);
s._container('card (width >= 24rem)', s.padding.rem(2));
s.theme({ text: '#7c3aed', surface: 'var(--project-surface)' }) satisfies string;
s.color._text satisfies string;
// @ts-expect-error 系统作者没有项目的条件规则快捷方法
new Css()._media('(width >= 48rem)', s.color.red);
// @ts-expect-error 示例项目自行决定可覆盖的主题键
s.theme({ unknown: '#ffffff' });
