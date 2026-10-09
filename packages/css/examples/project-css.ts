import { Css, ColorCss, type CssInput } from 'zerodep-js-css';

class ProjectColor extends ColorCss {
  readonly _text = this.raw('var(--z-theme-text)');
}

/** 示例项目自己选择允许覆盖的主题键，不属于框架公共配置。 */
export interface ProjectTheme {
  text?: string;
  surface?: string;
}

/** 项目按自己的约定扩展；这些方法不加入系统 Css 或主题预设入口。 */
export class ProjectCss extends Css {
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
