/// <reference lib="dom" preserve="true" />
/// <reference lib="dom.iterable" preserve="true" />

// 根入口加载 JSX 类型，配合 jsx: preserve，无需额外 jsx-runtime 子入口。
// 保留 DOM 类型引用，使只在 Node 中消费 SSR 的项目也能读取完整的包声明。
import type { AnyComponent } from '../runtime/component.js';
import type { Template } from '../runtime/template.js';
import type { NativeProps, ComponentBindings, SvgAttributes, MathAttributes } from './jsx.js';
import type { HtmlAttributeValues, HtmlAttributeNames } from './data.js';
import type { NativeElements } from './elements.js';
export type { NativeProps, EventHandler } from './jsx.js';
export type { Style, StyleObject } from './style.js';

// 只为用户扩展的标签计算类型；固定平台声明在维护阶段生成。
type CustomElements = {
  [
    K in Exclude<
      keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap | keyof MathMLElementTagNameMap,
      keyof NativeElements
    >
  ]: NativeProps<
    | (K extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[K] : never)
    | (K extends keyof SVGElementTagNameMap ? SVGElementTagNameMap[K] : never)
    | (K extends keyof MathMLElementTagNameMap ? MathMLElementTagNameMap[K] : never)
  > &
    (K extends keyof HTMLElementTagNameMap
      ? Omit<
          Pick<
            HtmlAttributeValues,
            | HtmlAttributeNames['*']
            | (K extends keyof HtmlAttributeNames ? HtmlAttributeNames[K] : never)
          >,
          keyof NativeProps<HTMLElementTagNameMap[K]>
        >
      : {}) &
    (K extends keyof SVGElementTagNameMap ? SvgAttributes : {}) &
    (K extends keyof MathMLElementTagNameMap
      ? { [P in keyof MathAttributes]?: MathAttributes[P] | null | undefined }
      : {});
};
declare global {
  namespace JSX {
    type Element = Template;
    type ElementType = keyof IntrinsicElements | AnyComponent;
    type LibraryManagedAttributes<C, P> = C extends AnyComponent ? ComponentBindings<P> : P;
    interface ElementChildrenAttribute {
      children: unknown;
    }
    interface IntrinsicAttributes {
      key?: string | number | symbol;
    }
    interface IntrinsicElements extends NativeElements, CustomElements {
      [tag: `${string}-${string}`]: Record<string, unknown>;
    }
  }
}
export type { JSX };
