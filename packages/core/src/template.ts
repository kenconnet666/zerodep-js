import { Derived } from './reactivity.js';
import { COMPONENT, type AnyComponent } from './component.js';
import { restProps, type Props } from './props.js';

export const TEMPLATE = Symbol('zerodep.template');

export type Renderable =
  Template | string | number | bigint | boolean | null | undefined | readonly Renderable[];
export type Template = ElementTemplate | DynamicTemplate | FragmentTemplate;

export interface ElementTemplate {
  readonly [TEMPLATE]: true;
  readonly kind: 'element';
  readonly tag: string | AnyComponent;
  readonly props: Props;
}

export interface DynamicTemplate {
  readonly [TEMPLATE]: true;
  readonly kind: 'dynamic';
  readonly value: Derived<Renderable>;
}

export interface FragmentTemplate {
  readonly [TEMPLATE]: true;
  readonly kind: 'fragment';
  readonly children: readonly Renderable[];
}

/** 描述本身不创建实例；每次插入由渲染器建立独立作用域。 */
export function element(tag: string | AnyComponent, props: Props): ElementTemplate {
  if (typeof tag !== 'string' && typeof tag?.[COMPONENT] !== 'function') {
    throw new Error('JSX 标签必须是原生标签名或 component 声明的组件。');
  }
  return { [TEMPLATE]: true, kind: 'element', tag, props };
}

export function dynamic(read: () => Renderable): DynamicTemplate {
  return { [TEMPLATE]: true, kind: 'dynamic', value: new Derived(read) };
}

export function fragment(children: readonly Renderable[]): FragmentTemplate {
  return { [TEMPLATE]: true, kind: 'fragment', children };
}

/** 每个 JSX 位置持有稳定输入视图；仅标签或 key 改变才重新建立实例。 */
export function dynamicElement(
  readTag: () => string | AnyComponent,
  input: Props,
): DynamicTemplate {
  const attributes = restProps(input, ['key']);
  let previous: ElementTemplate | undefined;
  let previousKey: unknown;
  return dynamic(() => {
    const tag = readTag();
    const key = input.key;
    if (
      key !== undefined &&
      typeof key !== 'string' &&
      typeof key !== 'number' &&
      typeof key !== 'symbol'
    ) {
      throw new Error('JSX key 必须是字符串、数字或 symbol。');
    }
    if (!previous || previous.tag !== tag || !Object.is(previousKey, key)) {
      previous = element(tag, attributes);
      previousKey = key;
    }
    return previous;
  });
}
