/** 用户处理器先执行；只对明确允许取消的默认行为检查 defaultPrevented。 */
export function _composeEventHandlers<E extends Event>(
  user: ((event: E) => void) | undefined,
  internal: ((event: E) => void) | undefined,
  options: { checkDefaultPrevented?: boolean } = {},
): (event: E) => void {
  return function (this: unknown, event) {
    const errors: unknown[] = [];
    try {
      user?.call(this, event);
    } catch (error) {
      errors.push(error);
    }
    if (!options.checkDefaultPrevented || (!errors.length && !event.defaultPrevented)) {
      try {
        internal?.call(this, event);
      } catch (error) {
        errors.push(error);
      }
    }
    if (errors.length === 1) throw errors[0];
    if (errors.length > 1) throw new AggregateError(errors, '事件处理与必要收尾均失败。');
  };
}
