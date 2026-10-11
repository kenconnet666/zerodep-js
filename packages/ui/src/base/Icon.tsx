import type { UiTheme } from '../provider/theme/theme.js';
import { _component, _derived, type JSX, type Template, element } from 'zerodep-js';
import { css, type CssValue, bx } from 'zerodep-js-css';
import type { LucideIconData, LucideIconNode } from '@lucide/icons';
import { buildLucideIconNode } from '@lucide/icons/build';
import { useCss } from '../provider/context.js';
export type IconProps = Omit<JSX.IntrinsicElements['svg'], 'children' | 'color'> & {
  /** 静态导入的 Lucide 图标数据；不在运行时按名称下载图标。 */
  icon: LucideIconData;
  /** 当前主题颜色关键字或原始 CSS 颜色；省略时继承文字颜色。 */
  color?: CssValue<'color', UiTheme>;
  /** 对应 font-size，图标宽高为 1em；省略时继承周围字号，数字不自动补 px。 */
  size?: CssValue<'fontSize', UiTheme>;
  children?: never;
};

// 只构造框架模板，浏览器与 SSR 使用同一棵节点树；不提前创建 DOM 或拼接 SVG 字符串。
function renderNode([tag, attributes, children]: LucideIconNode): Template {
  return element(tag, {
    ...attributes,
    children: children?.map(renderNode),
  });
}
export const Icon = _component(({ icon, color, size, class: className, ...rest }: IconProps) => {
  const s = useCss();
  const svg = _derived.by(() => {
    const [, attributes, children = []] = buildLucideIconNode(icon, {
      size: '1em',
      includeDefaultClasses: false,
      attributeNames: {
        'stroke-width': 'strokeWidth',
        'stroke-linecap': 'strokeLinecap',
        'stroke-linejoin': 'strokeLinejoin',
      },
    });
    return {
      attributes,
      children: children.map(renderNode),
    };
  });
  const named = _derived(Boolean(rest['aria-label'] || rest['aria-labelledby']));

  return (
    <svg
      {...svg.attributes}
      focusable="false"
      role={named ? 'img' : undefined}
      aria-hidden={named ? undefined : true}
      {...rest}
      class={[
        css(() => {
          // 行内与文字居中对齐；放入 Flex 时保留图标占位，避免被长文本压扁。
          // SVG 本身的宽高仍由图标数据提供，默认 1em。
          s.display('inline-block').verticalAlign('middle').flexShrink(0);

          // 颜色与字号只在显式传入时覆盖；undefined 保留周围文字的继承值。
          // 只改字号即可让默认 1em 图标等比缩放，不重复写 width/height。
          s.color(bx(color)).fontSize(bx(size));
        }),
        className,
      ]}
    >
      {svg.children}
    </svg>
  );
});
