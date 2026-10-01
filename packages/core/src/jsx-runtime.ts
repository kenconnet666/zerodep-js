import type { AnyComponent } from './component.js';
import type { Renderable, Template } from './template.js';
import type { svgAliases } from './native.js';
import type { clientProperties, ownedProperties, formProperties } from './dom-property-names.js';
import type { Style } from './style.js';

export type { Style, StyleObject } from './style.js';

type Equal<X, Y, Yes, No> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? Yes : No;
// form 的按名称查找等 DOM 索引签名不是任意 JSX 属性许可。
type DeclaredMembers<T> = {
  [
    K in keyof T as string extends K
      ? never
      : number extends K
        ? never
        : symbol extends K
          ? never
          : K
  ]: T[K];
};
type WritableKeys<T, N = DeclaredMembers<T>> = {
  [K in keyof N]-?: Equal<{ [P in K]: N[K] }, { -readonly [P in K]: N[K] }, K, never>;
}[keyof N] &
  keyof T;
type NativeValues<T> = {
  [
    K in Exclude<
      WritableKeys<T>,
      (typeof clientProperties)[number] | (typeof ownedProperties)[number] | keyof Node
    > as K extends string
      ? NonNullable<T[K]> extends string | number | boolean
        ? K
        : never
      : never
  ]?: K extends `aria${string}`
    ? string | number | boolean | null | undefined
    : T[K] | null | undefined;
};
export type EventHandler<T, E extends Event> = (event: E & { readonly currentTarget: T }) => void;
// 自定义事件的 detail 来自发送者约定，允许处理器显式声明其真实事件类型。
type ExternalEventHandler = { handle(event: Event): void }['handle'];
type ExternalEvents = {
  [name: `on:${string}` | `oncapture:${string}`]: ExternalEventHandler | null | undefined;
};
// checkbox 等控件可能派发普通 Event，InputEvent 的扩展字段不能无条件承诺存在。
type NativeInputEvent = Event & Partial<Omit<InputEvent, keyof Event>>;

interface Events {
  onClick: MouseEvent;
  onDblClick: MouseEvent;
  onInput: NativeInputEvent;
  onChange: Event;
  onFocus: FocusEvent;
  onBlur: FocusEvent;
  onFocusIn: FocusEvent;
  onFocusOut: FocusEvent;
  onKeyDown: KeyboardEvent;
  onKeyUp: KeyboardEvent;
  onPointerDown: PointerEvent;
  onPointerUp: PointerEvent;
  onPointerMove: PointerEvent;
  onPointerEnter: PointerEvent;
  onPointerLeave: PointerEvent;
  onPointerOver: PointerEvent;
  onPointerOut: PointerEvent;
  onPointerCancel: PointerEvent;
  onGotPointerCapture: PointerEvent;
  onLostPointerCapture: PointerEvent;
  onMouseDown: MouseEvent;
  onMouseUp: MouseEvent;
  onMouseMove: MouseEvent;
  onMouseEnter: MouseEvent;
  onMouseLeave: MouseEvent;
  onMouseOver: MouseEvent;
  onMouseOut: MouseEvent;
  onContextMenu: MouseEvent;
  onWheel: WheelEvent;
  onScroll: Event;
  onCompositionStart: CompositionEvent;
  onCompositionUpdate: CompositionEvent;
  onCompositionEnd: CompositionEvent;
  onSubmit: SubmitEvent;
  onReset: Event;
  onLoad: Event;
  onError: Event;
  onTouchStart: TouchEvent;
  onTouchMove: TouchEvent;
  onTouchEnd: TouchEvent;
  onTouchCancel: TouchEvent;
  onDrag: DragEvent;
  onDragStart: DragEvent;
  onDragEnd: DragEvent;
  onDragEnter: DragEvent;
  onDragLeave: DragEvent;
  onDragOver: DragEvent;
  onDrop: DragEvent;
  onAnimationStart: AnimationEvent;
  onAnimationEnd: AnimationEvent;
  onAnimationIteration: AnimationEvent;
  onTransitionEnd: TransitionEvent;
  onTransitionStart: TransitionEvent;
}

type EventProps<T> = { [K in keyof Events]?: EventHandler<T, Events[K]> | undefined } & {
  [K in keyof Events as `${K}Capture`]?: EventHandler<T, Events[K]> | undefined;
} & {
  [K in keyof GlobalEventHandlersEventMap as `on${K}`]?:
    | EventHandler<T, K extends 'input' ? NativeInputEvent : GlobalEventHandlersEventMap[K]>
    | undefined;
};
type InputValue = string | number | null | undefined;
type SelectValue = InputValue | readonly (string | number)[];
type ControlValues<T> = T extends HTMLSelectElement
  ? Omit<NativeValues<T>, 'value'> & { value?: SelectValue; defaultValue?: SelectValue }
  : T extends HTMLInputElement | HTMLTextAreaElement
    ? Omit<NativeValues<T>, 'value' | 'defaultValue'> & {
        value?: InputValue;
        defaultValue?: InputValue;
      }
    : T extends HTMLOptionElement | HTMLButtonElement
      ? Omit<NativeValues<T>, 'value'> & { value?: InputValue }
      : NativeValues<T>;

type ContentProperties<T> = T extends
  HTMLAnchorElement | HTMLScriptElement | HTMLTitleElement | HTMLOptionElement
  ? 'text'
  : T extends HTMLOutputElement
    ? 'value' | 'defaultValue'
    : T extends HTMLSelectElement
      ? 'length'
      : T extends HTMLTableElement
        ? 'caption' | 'tHead' | 'tFoot'
        : never;
// a、script 等标签可能来自不同命名空间；逐个元素推导，不能只取联合的共有成员。
type PropertyProps<T> = T extends Element
  ? {
      [
        K in Exclude<
          WritableKeys<T>,
          | (typeof ownedProperties)[number]
          | ContentProperties<T>
          | (T extends
              HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLOptionElement
              ? (typeof formProperties)[number]
              : never)
        > as K extends string ? `prop:${K}` : never
      ]?: T[K] | undefined;
    }
  : never;
type AttributeLinks<T> = (T extends
  | HTMLButtonElement
  | HTMLFieldSetElement
  | HTMLInputElement
  | HTMLObjectElement
  | HTMLOutputElement
  | HTMLSelectElement
  | HTMLTextAreaElement
  ? { form?: string | null | undefined }
  : {}) &
  (T extends HTMLInputElement ? { list?: string | null | undefined } : {}) &
  (T extends HTMLLabelElement | HTMLOutputElement
    ? { for?: string | null | undefined; htmlFor?: string | null | undefined }
    : {});

export type NativeProps<T extends Element> = (T extends Element
  ? Omit<ControlValues<T>, ContentProperties<T>>
  : never) &
  EventProps<T> &
  ExternalEvents &
  PropertyProps<T> &
  AttributeLinks<T> & {
    children?: Renderable;
    class?: string | false | null | undefined;
    className?: string | null | undefined;
    style?: Style | null | undefined;
    ref?: ((element: T) => void) | undefined;
    role?: string | null | undefined;
    [key: `data-${string}`]: string | number | boolean | null | undefined;
    [key: `aria-${string}`]: string | number | boolean | null | undefined;
  };

type SvgValues = {
  viewBox?: string;
  preserveAspectRatio?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: string | number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
  fillRule?: 'nonzero' | 'evenodd';
  d?: string;
  points?: string;
  transform?: string;
  xmlns?: string;
  x?: number | string;
  y?: number | string;
  cx?: number | string;
  cy?: number | string;
  r?: number | string;
  rx?: number | string;
  ry?: number | string;
  width?: number | string;
  height?: number | string;
  href?: string;
  xlinkHref?: string;
  xmlLang?: string;
  xmlSpace?: 'default' | 'preserve';
  xmlnsXlink?: string;
  opacity?: string | number;
  offset?: string | number;
  x1?: string | number;
  x2?: string | number;
  y1?: string | number;
  y2?: string | number;
  pathLength?: number;
  gradientUnits?: 'userSpaceOnUse' | 'objectBoundingBox';
  gradientTransform?: string;
  markerUnits?: 'userSpaceOnUse' | 'strokeWidth';
  markerWidth?: string | number;
  markerHeight?: string | number;
  refX?: string | number;
  refY?: string | number;
  orient?: string | number;
  clipPathUnits?: 'userSpaceOnUse' | 'objectBoundingBox';
  focusable?: boolean | 'auto' | 'true' | 'false';
  externalResourcesRequired?: boolean | 'true' | 'false';
};
type SvgAttributes = {
  [K in keyof SvgValues | keyof typeof svgAliases]?:
    (K extends keyof SvgValues ? SvgValues[K] : string | number) | null | undefined;
};
type Booleanish = boolean | 'true' | 'false';
type MathAttributes = {
  display?: 'block' | 'inline';
  displaystyle?: Booleanish;
  scriptlevel?: string | number;
  mathvariant?: string;
  mathsize?: string | number;
  mathcolor?: string;
  mathbackground?: string;
  encoding?: string;
  href?: string;
  xmlns?: string;
  xmlLang?: string;
  xmlSpace?: 'default' | 'preserve';
  stretchy?: Booleanish;
  symmetric?: Booleanish;
  fence?: Booleanish;
  separator?: Booleanish;
  largeop?: Booleanish;
  movablelimits?: Booleanish;
  accent?: Booleanish;
  accentunder?: Booleanish;
  linethickness?: string | number;
  columnalign?: string;
  columnspacing?: string;
  rowalign?: string;
  rowspacing?: string;
};
type TagName =
  keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap | keyof MathMLElementTagNameMap;
type HtmlElement<K> = K extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[K] : never;
type SvgElement<K> = K extends keyof SVGElementTagNameMap ? SVGElementTagNameMap[K] : never;
type MathElement<K> = K extends keyof MathMLElementTagNameMap ? MathMLElementTagNameMap[K] : never;
type Elements = {
  [K in TagName]: NativeProps<HtmlElement<K> | SvgElement<K> | MathElement<K>> &
    (K extends keyof SVGElementTagNameMap ? SvgAttributes : {}) &
    (K extends keyof MathMLElementTagNameMap
      ? { [P in keyof MathAttributes]?: MathAttributes[P] | null | undefined }
      : {});
};

export declare namespace JSX {
  type Element = Template;
  type ElementType = keyof IntrinsicElements | AnyComponent;
  interface ElementChildrenAttribute {
    children: unknown;
  }
  interface IntrinsicAttributes {
    key?: string | number | symbol;
  }
  interface IntrinsicElements extends Elements {
    // 已知自定义标签可扩展 HTMLElementTagNameMap；未知标签不假装知道其属性契约。
    [tag: `${string}-${string}`]: Record<string, unknown>;
  }
}
