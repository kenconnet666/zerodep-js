import type { CssValue, KeywordValues } from 'zerodep-js-css';
import type { UiTheme } from 'zerodep-js-ui';

/**
 * 真正的方法声明对照：请输入 s.co，选择 color 后按 Enter，检查是否自动插入括号。
 * 原来的映射类型是“函数值属性”，TS 返回 Property；这里声明的方法返回 Method。
 * 同时试链末尾的 . 和参数引号中的主题候选。
 *
 * 只试点下面 8 个常用方法，没有 CSS/bx 运行时，也不接入应用。
 * 原来的两个试点文件保持原样，方便比较；正式全属性版本应由生成器生成方法声明。
 */
export function tryDeclaredCssMethods(width = 120): void {
  css((s) => {
    s.color('_primary').width('120px').display('flex');
    s.color('').width('');
    s.backgroundColor('_').fontSize('_').gap('_');
    s.color(bx('')).width(bx(`${width}px`));
  });

  css((s) =>
    s
      .color('_text')
      .width(bx(`${width}px`))
      .opacity(0.5),
  );
}

type CssArgument<K extends keyof KeywordValues> =
  CssValue<K, UiTheme> | CssBinding<CssValue<K, UiTheme>>;

declare const bindingValue: unique symbol;
type CssBinding<T> = { readonly [bindingValue]: T };

// 使用真实方法语法，而不是 color: (value) => StyleMethods 这样的函数值属性。
declare class StyleMethods {
  /** 设置文字前景色；接受系统颜色、当前主题颜色 token 和 bx 绑定。 */
  color(value: CssArgument<'color'>): this;
  /** 设置宽度；字符串长度需要单位，也可以使用 auto 等系统关键字。 */
  width(value: CssArgument<'width'>): this;
  /** 设置布局方式，例如 flex、grid、none。 */
  display(value: CssArgument<'display'>): this;
  /** 设置背景颜色；主题颜色候选与文字颜色相同。 */
  backgroundColor(value: CssArgument<'backgroundColor'>): this;
  /** 设置字号；主题候选使用字号表中的 _sm、_md 等。 */
  fontSize(value: CssArgument<'fontSize'>): this;
  /** 设置布局间距；主题候选使用间距表中的 _sm、_md 等。 */
  gap(value: CssArgument<'gap'>): this;
  /** 设置不透明度，支持数值或绑定值。 */
  opacity(value: CssArgument<'opacity'>): this;
  /** 设置内边距；多个方向可使用完整 CSS 字符串。 */
  padding(value: CssArgument<'padding'>): this;
}

declare function css(build: (s: StyleMethods) => void): void;
declare function bx<T extends string | number | undefined>(value: T): CssBinding<T>;
