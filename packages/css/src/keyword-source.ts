import type { KeywordValues, SystemKeywords } from './generated/keywords.js';

/** 主题提供原始 CSS 值；读取函数用于框架响应式主题替换。 */
export type KeywordSource<T> = T | (() => T);
/** 主题各成员读取后得到完整声明，保留成员名与成员文档。 */
export type KeywordDeclarations<T> = { readonly [K in keyof T]: string };
/** 复用成员名及中文说明，值类型仍由具体 CSS 属性决定，不能收窄为默认字面量。 */
export type KeywordValuesOf<T, V> = { readonly [K in keyof T]: V };
/** 保留原生方法文档与重载，为 raw 补充主题关键字候选。 */
export type KeywordAuthor<A extends { raw(value: never): string }, T> = A &
  // 原生成员沿用 A 的文档；只映射新增键，避免 hover 将两份原生说明拼接。
  KeywordDeclarations<Omit<T, keyof A>> & {
    /** 原始 CSS 值或当前主题关键字；_name 按当前作用域解析为实际值。 */
    raw(value: (keyof T & `_${string}`) | Parameters<A['raw']>[0]): string;
  };
/** 根据 CSS 属性检查自定义关键字的值，不引入开放的成员索引签名。 */
export type CheckedKeywords<T extends SystemKeywords> = {
  readonly [P in keyof KeywordValues & keyof T]: {
    readonly [K in keyof T[P]]: K extends keyof SystemKeywords[P] | `_${string}`
      ? KeywordValues[P]
      : never;
  };
};

// 状态属于作者自身；普通框架代理也能转发读取，不依赖代理前后的对象身份相同。
const sourceKey = Symbol('zerodep-css-keywords');
interface KeywordBinding {
  property: string;
  members: ReadonlySet<string>;
  raw: (value: never) => string;
  read(member: string): { value: string | number; declaration: string };
}
// 只登记本库创建并冻结的视图；未知作者和代理继续执行原成员读取。
const keywordBindings = new WeakMap<object, KeywordBinding>();
export function getKeywordBinding(target: object): KeywordBinding | undefined {
  return keywordBindings.get(target);
}
type SourceOwner = { [sourceKey]?: () => SystemKeywords };

export function setKeywordSource(author: object, source: KeywordSource<SystemKeywords>): void {
  Object.defineProperty(author, sourceKey, {
    value: typeof source === 'function' ? source : () => source,
  });
}
export function getKeywordSource(author: object): (() => SystemKeywords) | undefined {
  return (author as SourceOwner)[sourceKey];
}
export function hasKeywordSource(author: object): boolean {
  return getKeywordSource(author) !== undefined;
}

function keysOf(value: object): string[] {
  const keys = new Set<string>();
  for (
    let current: object | null = value;
    current && current !== Object.prototype;
    current = Object.getPrototypeOf(current)
  ) {
    // iframe/其他 realm 的 Object.prototype 与本地不同，但也不是主题成员来源。
    const constructor = Object.getOwnPropertyDescriptor(current, 'constructor')?.value;
    if (
      Object.getPrototypeOf(current) === null &&
      typeof constructor === 'function' &&
      Function.prototype.toString.call(constructor) === Function.prototype.toString.call(Object)
    )
      break;
    for (const key of Object.getOwnPropertyNames(current)) if (key !== 'constructor') keys.add(key);
  }
  return [...keys];
}

/** 每个作者只为访问过的属性创建一份视图，getter 始终读取当前作用域的值。 */
export function bindKeywords<A extends { raw(value: never): string }>(
  author: A,
  property: string,
  read: () => object,
): A {
  const initial = read();
  if (!initial || typeof initial !== 'object') throw new Error(`Invalid CSS keywords: ${property}`);
  // 必须保留原方法，调用时通过 call 显式传回作者作为 this。
  // oxlint-disable-next-line typescript/unbound-method
  const raw = author.raw;
  const readValue = (key: string): string | number => {
    const values = read() as Record<string, unknown>;
    const value = values[key];
    if (typeof value !== 'string' && typeof value !== 'number') {
      throw new Error(`Invalid CSS keyword value: ${property}.${key}`);
    }
    return value;
  };
  const members = new Set(keysOf(initial));
  const readKeyword = (key: string) => {
    const value = readValue(key);
    return { value, declaration: raw.call(author, value as never) };
  };
  for (const key of members) {
    // 系统字段是完整声明字符串；自定义成员只允许下划线名称，不能覆盖 raw/px 等方法。
    const existing = Object.getOwnPropertyDescriptor(author, key);
    if (
      key === 'name' ||
      (!(existing && typeof existing.value === 'string') && (!key.startsWith('_') || key in author))
    ) {
      throw new Error(`CSS keyword conflicts with author API: ${property}.${key}`);
    }
    Object.defineProperty(author, key, {
      enumerable: true,
      get: () => readKeyword(key).declaration,
    });
  }
  Object.defineProperty(author, 'raw', {
    value(value: unknown): string {
      // raw 的原生值保持原样；_name 是显式主题引用。
      return raw.call(
        author,
        (typeof value === 'string' && value.startsWith('_') && value in initial
          ? readValue(value)
          : value) as never,
      );
    },
  });
  keywordBindings.set(author, { property, members, raw, read: readKeyword });
  return Object.freeze(author);
}
