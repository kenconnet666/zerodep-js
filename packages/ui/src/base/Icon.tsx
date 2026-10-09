import { _component, _derived, type JSX, type Template } from 'zerodep-js';
import { element } from 'zerodep-js/internal';
import { css } from 'zerodep-js-css';
import type { Css, UiTheme } from 'zerodep-js-css';
import type { LucideIconData, LucideIconNode } from '@lucide/icons';
import { buildLucideIconNode } from '@lucide/icons/build';
import { useCss } from '../provider/context.js';

export type IconProps = Omit<JSX.IntrinsicElements['svg'], 'children' | 'color'> & {
  /** 静态导入的 Lucide 图标数据；不在运行时按名称下载图标。 */
  icon: LucideIconData;
  /** 当前主题颜色关键字或原始 CSS 颜色；省略时继承文字颜色。 */
  color?: Parameters<Css<UiTheme>['color']['raw']>[0] | undefined;
  /** 对应 font-size，图标宽高为 1em；省略时继承周围字号，数字不自动补 px。 */
  size?: Parameters<Css<UiTheme>['fontSize']['raw']>[0] | undefined;
  children?: never;
};

// 只构造框架模板，浏览器与 SSR 使用同一棵节点树；不提前创建 DOM 或拼接 SVG 字符串。
function renderNode([tag, attributes, children]: LucideIconNode): Template {
  return element(tag, { ...attributes, children: children?.map(renderNode) });
}

export const Icon = _component(({ icon, color, size, class: className, ...rest }: IconProps) => {
  const s = useCss();
  const svg = _derived(
    buildLucideIconNode(icon, {
      size: '1em',
      includeDefaultClasses: false,
      attributeNames: {
        'stroke-width': 'strokeWidth',
        'stroke-linecap': 'strokeLinecap',
        'stroke-linejoin': 'strokeLinejoin',
      },
    }),
  );
  const named = _derived(Boolean(rest['aria-label'] || rest['aria-labelledby']));
  return (
    <svg
      {...svg[1]}
      focusable="false"
      role={named ? 'img' : undefined}
      aria-hidden={named ? undefined : true}
      {...rest}
      class={css(
        s.display.inlineBlock,
        s.verticalAlign.middle,
        s.flexShrink.raw(0),
        color !== undefined && s.color.raw(color),
        size !== undefined && s.fontSize.raw(size),
        className,
      )}
    >
      {svg[2]?.map(renderNode)}
    </svg>
  );
});
