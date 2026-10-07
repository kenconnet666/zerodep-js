/** 不读取 Symbol.toStringTag；普通跨 realm 对象的原型同样终止于该 realm 的 Object.prototype。 */
export function isPlainObjectPrototype(prototype: object | null): boolean {
  if (prototype === null || prototype === Object.prototype) return true;
  const constructor = Object.getOwnPropertyDescriptor(prototype, 'constructor')?.value;
  return (
    Object.getPrototypeOf(prototype) === null &&
    typeof constructor === 'function' &&
    Function.prototype.toString.call(constructor) === Function.prototype.toString.call(Object)
  );
}
