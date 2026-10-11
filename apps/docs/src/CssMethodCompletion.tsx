import type { CssValue, KeywordValues } from 'zerodep-js-css';
import type { UiTheme } from 'zerodep-js-ui';

/**
 * CSS 方法与链式补全试点，仅有类型声明，没有接入应用或实现 CSS/bx 运行时。
 * 与 CssAssignmentCompletion.tsx 对照，不改变赋值版试点。
 *
 * 试用：在引号里输入 _p / r，在调用结束后输入 .，并查看参数提示。
 * 重点比较：下一段链的方法补全、各属性自己的字符串候选、bx 参数的上下文类型。
 * 空字符串只用来试补全；中文属性说明来自现有生成数据，示例仍可能是旧 API。
 */
export function tryCssMethodCompletion(
  width = 120,
  disabled = false,
  color: CssValue<'color', UiTheme> = '_primary',
): void {
  css((s) => {
    // 连续写在一行：每次调用都返回同一个样式构建器的类型。
    s.color('').width('');
    s.color('_primary').width('120px').display('flex');

    // 与一行链完全相同；长样式可以自行换行。
    s.color('_').backgroundColor('_').fontSize('_').gap('_');

    // 仍可逐条写，不强制所有调用都放进同一条链。
    s.color('r');
    s.width('');

    // 属性类型与现有 props 共用；检查 bx 内部是否保留字符串补全。
    s.color(bx('')).width(bx(''));
    s.color(bx(color)).width(bx(`${width}px`));

    if (disabled) {
      s.color('_disabled').opacity(0.5);
    }

    // 候选语义：同属性最后一次调用覆盖前一次；这里尚未实现运行时。
    s.color('red').color('_primary');
  });

  // 没有分支时也能省略回调的大括号；最终样式仍由 css 收集。
  css((s) =>
    s
      .color('_primary')
      .width(bx(`${width}px`))
      .gap('_sm'),
  );
}

// 直接映射现有 502 个属性及真实主题；不复制一份关键字表，不伪造补全候选。
type StyleMethods = {
  readonly [K in keyof KeywordValues]: (
    value: CssValue<K, UiTheme> | CssBinding<CssValue<K, UiTheme>>,
  ) => StyleMethods;
};

declare const bindingValue: unique symbol;
type CssBinding<T> = { readonly [bindingValue]: T };

declare function css(build: (s: StyleMethods) => void): void;
declare function bx<T extends string | number | undefined>(value: T): CssBinding<T>;
