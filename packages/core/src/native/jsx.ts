import type { Renderable, TextRenderable } from '../runtime/template.js';
import type { HtmlAttributeValues, SvgAttributeValues, NativeEventAliases } from './data.js';
import type { clientProperties, ownedProperties, formProperties } from './properties.js';
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
  ]?: K extends 'contentEditable' | 'download'
    ? string | boolean | null | undefined
    : K extends 'translate'
      ? boolean | 'yes' | 'no' | null | undefined
      : K extends 'draggable' | 'spellcheck'
        ? boolean | 'true' | 'false' | null | undefined
        : K extends `aria${string}`
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

type AllEvents = Events & {
  [
    K in keyof NativeEventAliases as K extends keyof Events
      ? never
      : NativeEventAliases[K] extends keyof GlobalEventHandlersEventMap
        ? K
        : never
  ]: NativeEventAliases[K] extends keyof GlobalEventHandlersEventMap
    ? GlobalEventHandlersEventMap[NativeEventAliases[K]]
    : never;
};
type EventProps<T> = {
  [K in keyof AllEvents]?: EventHandler<T, AllEvents[K]> | null | undefined;
} & {
  [K in keyof AllEvents as `${K}Capture`]?: EventHandler<T, AllEvents[K]> | null | undefined;
} & {
  [K in keyof GlobalEventHandlersEventMap as `on${K}`]?:
    | EventHandler<T, K extends 'input' ? NativeInputEvent : GlobalEventHandlersEventMap[K]>
    | null
    | undefined;
};
type InputValue = string | number | null | undefined;
type SelectValue = InputValue | readonly (string | number)[];
interface TextBindings {
  /** 双向文本绑定：输入时写回字符串。必须绑定可赋值的变量或对象属性。 */
  'bind:value'?: string | null | undefined;
}
interface InputBindings extends TextBindings {
  /** radio 写回所选字符串，checkbox 写回字符串数组；需明确 type 和字符串 value。 */
  'bind:group'?: string | readonly string[];
  /** checkbox/radio 的选中状态；输入时写回 boolean。 */
  'bind:checked'?: boolean;
  /** number/range 的数值；清空或无有效数字时写回 undefined。 */
  'bind:valueAsNumber'?: number | undefined;
}
interface SelectBindings {
  /** 单选写回字符串；multiple 多选写回字符串数组。 */
  'bind:value'?: string | readonly string[] | null | undefined;
}
interface DetailsBindings {
  /** 原生 details 展开状态，toggle 写回 boolean；接管前操作会保留。 */
  'bind:open'?: boolean;
}
type NativeBindings<T> = T extends HTMLInputElement
  ? InputBindings
  : T extends HTMLTextAreaElement
    ? TextBindings
    : T extends HTMLSelectElement
      ? SelectBindings
      : T extends HTMLDetailsElement
        ? DetailsBindings
        : {};

type ChangeName<K extends string> = `on${Capitalize<K>}Change`;
type FirstArgument<F> = F extends (...args: infer Args) => unknown
  ? Args extends [infer Value, ...unknown[]]
    ? Value
    : never
  : never;
type BindableKeys<P> = {
  [K in keyof P & string]: ChangeName<K> extends keyof P
    ? [FirstArgument<NonNullable<P[ChangeName<K>]>>] extends [never]
      ? never
      : FirstArgument<NonNullable<P[ChangeName<K>]>> extends P[K]
        ? K
        : never
    : never;
}[keyof P & string];
type BindingChoice<P, K extends keyof P & string> =
  | (Pick<P, K | Extract<ChangeName<K>, keyof P>> & { [B in `bind:${K}`]?: never })
  | ({
      // 重映射原属性以保留导航来源；绑定必须提供，值类型仍取原 P（包括 undefined）。
      -readonly [B in keyof Required<Pick<P, K>> as `bind:${B & string}`]: P[B];
    } & { [V in K]?: never } & Partial<Pick<P, Extract<ChangeName<K>, keyof P>>>);
// 每个可绑定属性保持“普通 props 或 bind”二选一；函数参数的逆变合并支持同时绑定多个属性。
type BindingConditions<P> = {
  [K in BindableKeys<P>]: (value: BindingChoice<P, K>) => void;
}[BindableKeys<P>];
// 同态键重映射保留模板索引下的显式必填成员（如 aria-label）；Omit 会丢失它们。
type UnboundProps<P> = {
  [K in keyof P as K extends BindableKeys<P> | ChangeName<BindableKeys<P>> ? never : K]: P[K];
};
export type ComponentBindings<P> = P extends unknown
  ? [BindableKeys<P>] extends [never]
    ? P
    : UnboundProps<P> &
        (BindingConditions<P> extends (value: infer Conditions) => void ? Conditions : never)
  : never;
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
        : T extends HTMLTemplateElement
          ? Extract<keyof T, `shadowRoot${string}`>
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
  NativeBindings<T> &
  Pick<HtmlAttributeValues, Extract<keyof HtmlAttributeValues, `aria-${string}`>> &
  AttributeLinks<T> & {
    children?: T extends HTMLOutputElement ? TextRenderable : Renderable;
    key?: string | number | symbol;
    class?: string | false | null | undefined;
    className?: string | null | undefined;
    style?: Style | null | undefined;
    /** 同步取得元素，可返回清理函数；回调内卸载时立即清理新返回的资源。 */
    ref?: ((element: T) => void | (() => void)) | undefined;
    /** DOM 引用写入可写变量，卸载后为 undefined；不支持组件实例或对象路径。 */
    'bind:this'?: T | undefined;
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
export type SvgAttributes = Omit<SvgAttributeValues, keyof SvgValues> & {
  [K in keyof SvgValues]?: SvgValues[K] | null | undefined;
};
type Booleanish = boolean | 'true' | 'false';
export type MathAttributes = {
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
export type NativeIndexProps = ExternalEvents & {
  key?: string | number | symbol;
  [key: `data-${string}`]: string | number | boolean | null | undefined;
  [key: `aria-${string}`]: string | number | boolean | null | undefined;
};
