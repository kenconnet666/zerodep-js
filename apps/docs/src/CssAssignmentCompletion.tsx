import type { CssValue, KeywordValues } from 'zerodep-js-css';
import type { UiTheme } from 'zerodep-js-ui';

/**
 * CSS 赋值语法补全试点，仅供编辑器体验；没有接入应用或实现 CSS/bx 运行时。
 *
 * 试用：把光标放入下面的空引号，输入 r / _ / _p，或手动触发“基本补全”。
 * 同时试一下 s. 的属性补全，以及悬停 color、width 查看现有属性的中文说明。
 * 空字符串只是补全输入位置，不表示正式 API 支持空声明。
 *
 * 原生 TS 7.1.0-dev.20261008.1 实测：赋值、bx 参数和 props 均有相应候选。
 * 已知限制：字符串 token 候选不携带主题成员的中文说明；属性说明仍来自现有生成数据。
 * WebStorm 的自动弹出、排序和键盘操作体验请在这里实际试用，不以 LSP 候选代替验收。
 */
export function tryCssAssignmentCompletion(): void {
  css((s) => {
    // 重点：颜色名称（red、blue）、CSS-wide（inherit）和主题（_primary、_text）。
    s.color = '';
    s.color = 'r';
    s.color = '_';

    // 不同属性应有自己的关键字/token，不能把所有主题名称混在一起。
    s.display = '';
    s.width = '';
    s.fontSize = '_';
    s.gap = '_';

    // 普通 CSS 字符串仍然能传入；这个候选类型以提示为主，不完整验证 CSS。
    s.width = 'calc(100% - 12px)';
    s.color = 'oklch(65% 0.2 250)';

    // 对照：加入 bx 后，参数引号里是否仍有同样的上下文补全。
    s.color = bx('');
    s.color = bx('_');
    s.width = bx('');
    s.opacity = bx(0.5);
  });
}

/** 对照现有 props：复用同一份属性类型，不要求调用者传绑定对象。 */
export function tryCssPropsCompletion(): void {
  const props: PilotProps = {
    color: '',
    width: '',
  };

  css((s) => {
    s.color = bx(props.color);
    s.width = bx(props.width);
  });
}

type PilotProps = {
  color?: CssValue<'color', UiTheme>;
  width?: CssValue<'width', UiTheme>;
};

// 下方只声明候选类型。复用现有全部 CSS 属性和真实 UI 主题，没有伪造补全候选。
type StyleDraft = {
  -readonly [K in keyof KeywordValues]?: CssValue<K, UiTheme> | CssBinding<CssValue<K, UiTheme>>;
};

declare const bindingValue: unique symbol;
type CssBinding<T> = { readonly [bindingValue]: T };

declare function css(build: (s: StyleDraft) => void): void;
declare function bx<T extends string | number | undefined>(value: T): CssBinding<T>;
