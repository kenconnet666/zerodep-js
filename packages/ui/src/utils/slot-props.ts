export type SlotProps<P, S> = P | ((state: Readonly<S>) => P);

/** 在 JSX/派生计算中解析，以保留调用方状态读取；本工具不缓存快照。 */
export function _resolveSlotProps<P extends object, S>(
  source: SlotProps<P, S> | undefined,
  state: Readonly<S>,
): P | undefined {
  return typeof source === 'function' ? source(state) : source;
}
