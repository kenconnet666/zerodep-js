import type { AnyComponent } from './runtime/component.js';
import type { Template } from './runtime/template.js';
import type {
  NativeProps,
  ComponentBindings,
  SvgAttributes,
  MathAttributes,
} from './native/jsx.js';
import type { HtmlAttributeValues, HtmlAttributeNames } from './native/data.js';
import type { NativeElements } from './jsx-elements.js';
export type { NativeProps, EventHandler } from './native/jsx.js';
export type { Style, StyleObject } from './native/style.js';

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
export declare namespace JSX {
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
