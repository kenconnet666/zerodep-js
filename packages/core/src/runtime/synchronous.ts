/** 同步契约拒绝 Promise，但仍接住其拒绝，避免同一误用产生第二个无主错误。 */
export function synchronous<T>(value: T, message: string): T {
  if (
    value !== null &&
    (typeof value === 'object' || typeof value === 'function') &&
    typeof Reflect.get(value, 'then') === 'function'
  ) {
    void Promise.resolve(value).catch(() => {});
    throw new TypeError(message);
  }
  return value;
}
