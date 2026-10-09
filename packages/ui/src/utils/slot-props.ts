import { _composeRefs, type DomRef, type Style } from 'zerodep-js';
import { styleText } from 'zerodep-js/internal';
import { _mergeClasses } from 'zerodep-js-css';
import { _composeEventHandlers } from './events.js';

export type SlotProps<P, S> = P | ((state: Readonly<S>) => P);

interface MergeableProps {
  class?: string | null | undefined;
  style?: Style | null | undefined;
  // never 只作为输入约束，允许具体 DOM 类型的 ref，调用仍由对应原生元素负责。
  ref?: DomRef<never> | null | undefined;
}

/** 在 JSX/派生计算中解析，以保留调用方状态读取；本工具不缓存快照。 */
export function _resolveSlotProps<P extends object, S>(
  source: SlotProps<P, S> | undefined,
  state: Readonly<S>,
): P | undefined {
  return typeof source === 'function' ? source(state) : source;
}

/** 两层浅合并；显式 undefined 撤销普通属性，事件只组合声明的键。 */
export function _mergeSlotProps<P extends object>(
  defaults: P & MergeableProps,
  override: (Partial<P> & MergeableProps) | undefined,
  events: readonly (keyof P)[] = [],
): P {
  if (!override) return defaults;
  const result = { ...defaults, ...override };
  for (const key of ['class', 'style', 'ref'] as const) {
    if (!Object.hasOwn(override, key)) continue;
    const before: unknown = Reflect.get(defaults, key);
    const after: unknown = Reflect.get(override, key);
    if (key === 'class')
      Reflect.set(
        result,
        key,
        _mergeClasses(before as string | undefined, after as string | undefined),
      );
    if (key === 'style')
      Reflect.set(
        result,
        key,
        [styleText(before as Style), styleText(after as Style)].filter(Boolean).join(';'),
      );
    if (key === 'ref')
      Reflect.set(
        result,
        key,
        before == null
          ? after
          : after == null
            ? before
            : _composeRefs(before as DomRef, after as DomRef),
      );
  }
  for (const key of events) {
    const before = Reflect.get(defaults, key),
      after = Reflect.get(override, key);
    if (typeof before === 'function' && typeof after === 'function') {
      Reflect.set(
        result,
        key,
        _composeEventHandlers(after as (event: Event) => void, before as (event: Event) => void),
      );
    }
  }
  return result;
}
