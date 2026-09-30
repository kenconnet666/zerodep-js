import type { AnyComponent } from './component.js';
import type { Renderable, Template } from './template.js';

type Equal<X, Y, Yes, No> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? Yes : No;
type WritableKeys<T> = {
  [K in keyof T]-?: Equal<{ [P in K]: T[K] }, { -readonly [P in K]: T[K] }, K, never>;
}[keyof T];
type NativeValues<T> = {
  [
    K in WritableKeys<T> as K extends string
      ? NonNullable<T[K]> extends string | number | boolean
        ? K
        : never
      : never
  ]?: T[K] | null;
};
export type EventHandler<T, E extends Event> = (event: E & { readonly currentTarget: T }) => void;

interface Events {
  onClick: MouseEvent;
  onDblClick: MouseEvent;
  onInput: InputEvent;
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
    EventHandler<T, GlobalEventHandlersEventMap[K]> | undefined;
};
export type Style =
  | string
  | ({
      [K in keyof CSSStyleDeclaration as CSSStyleDeclaration[K] extends string ? K : never]?:
        string | number | null | undefined;
    } & { [K in `--${string}`]?: string | number | null | undefined });

type InputValue = string | number | null | undefined;
type SelectValue = InputValue | readonly (string | number)[];
type ControlValues<T> = T extends HTMLSelectElement
  ? Omit<NativeValues<T>, 'value'> & { value?: SelectValue; defaultValue?: SelectValue }
  : T extends HTMLInputElement | HTMLTextAreaElement
    ? Omit<NativeValues<T>, 'value' | 'defaultValue'> & {
        value?: InputValue;
        defaultValue?: InputValue;
      }
    : NativeValues<T>;

export type NativeProps<T extends Element> = (T extends Element
  ? Omit<
      ControlValues<T>,
      'innerHTML' | 'outerHTML' | 'textContent' | 'innerText' | 'children' | 'style'
    >
  : never) &
  EventProps<T> & {
    children?: Renderable;
    class?: string | false | null | undefined;
    style?: Style | null | undefined;
    ref?: ((element: T) => void) | undefined;
    role?: string | null | undefined;
    [key: `data-${string}`]: string | number | boolean | null | undefined;
    [key: `aria-${string}`]: string | number | boolean | null | undefined;
  };

type SvgAttributes = {
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
};
type TagName = keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap;
type HtmlElement<K> = K extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[K] : never;
type SvgElement<K> = K extends keyof SVGElementTagNameMap ? SVGElementTagNameMap[K] : never;
type Elements = {
  [K in TagName]: NativeProps<HtmlElement<K> | SvgElement<K>> &
    (K extends keyof SVGElementTagNameMap ? SvgAttributes : {});
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
    [tag: `${string}-${string}`]: NativeProps<HTMLElement> & Record<string, unknown>;
  }
}
