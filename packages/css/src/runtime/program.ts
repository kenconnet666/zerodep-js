import { styleText, synchronous, type ClassSource, type ClassStyle } from 'zerodep-js';
import type { KeywordValues } from '../generated/keywords.js';
import { SystemKeywords, systemKeywords } from '../generated/keywords.js';
import type { CssValue } from '../util/author.js';
import { inlineValue } from '../util/values.js';
import { hash, type ServerCssHost } from './rules.js';

const BINDING = Symbol('CSS binding');
const PROGRAM = Symbol('CSS program');
const ANIMATION = Symbol('CSS animation');

/** 只保存本次输入；由属性方法解析 token 和选择安全输出，不独立订阅。 */
export interface CssBinding<T> {
  readonly [BINDING]: T;
}
export function bx<T extends string | number | undefined>(value: T): CssBinding<T> {
  return Object.freeze({
    [BINDING]: value,
    [Symbol.toPrimitive](): never {
      throw new Error('bx 接收完整属性值，不能嵌入字符串；请把完整表达式传给 bx。');
    },
  });
}

export type PropertyInput<K extends keyof KeywordValues, T extends SystemKeywords> =
  CssValue<K, T> | CssBinding<CssValue<K, T>> | (K extends 'animationName' ? CssAnimation : never);

interface Declaration {
  readonly path: readonly string[];
  readonly name: string;
  readonly value: string | CssAnimation;
  readonly variable: boolean;
  readonly inline: boolean;
}
interface Frame {
  kind: 'style' | 'animation';
  path: string[];
  declarations: Declaration[];
}
export interface CssProgram extends ClassSource {
  readonly [PROGRAM]: readonly Declaration[];
}
export interface CssAnimation {
  readonly [ANIMATION]: readonly Declaration[];
}
type Callback = () => void | CssAuthor;
export type ClassResolver = ClassSource['_resolveClass'];
let current: Frame | undefined;

function frame(): Frame {
  if (!current) throw new Error('CSS 属性方法必须在 css、select 或 keyframes 的同步回调中调用。');
  return current;
}
function collect(kind: Frame['kind'], build: Callback): readonly Declaration[] {
  if (build.constructor.name === 'AsyncFunction') throw new Error('CSS 收集回调不能是 async。');
  const previous = current;
  const next: Frame = { kind, path: [], declarations: [] };
  current = next;
  try {
    synchronous(build(), 'CSS 收集回调必须同步完成。');
    return Object.freeze(next.declarations);
  } finally {
    current = previous;
  }
}
export function collectCss(build: Callback, resolve: ClassResolver): CssProgram {
  return Object.freeze({ [PROGRAM]: collect('style', build), _resolveClass: resolve });
}
export function collectKeyframes(build: Callback): CssAnimation {
  return Object.freeze({ [ANIMATION]: collect('animation', build) });
}

/** 主题来源属于作者；声明属于当前收集范围，多份样式和多个作者不会共享可变声明。 */
export class CssAuthor<T extends SystemKeywords = SystemKeywords> {
  private readonly source: T | (() => T) | undefined;
  constructor(source?: T | (() => T)) {
    this.source = source;
  }
  get keywords(): T {
    return (
      typeof this.source === 'function' ? this.source() : (this.source ?? systemKeywords)
    ) as T;
  }

  /** 原生相对选择器与局部条件；keyframes 内只接受帧位置。 */
  select(selector: string, build: Callback): this {
    const active = frame();
    const value = selector.trim();
    if (!value || /[{};]/.test(value))
      throw new Error('select 需要一个完整选择器或局部条件，不接受声明块。');
    if (active.kind === 'animation') {
      if (
        active.path.length ||
        !value
          .split(',')
          .every(
            (part) =>
              /^(?:from|to|(?:\d+(?:\.\d+)?|\.\d+)%)$/.test(part.trim()) &&
              (!part.includes('%') || Number.parseFloat(part) <= 100),
          )
      )
        throw new Error('keyframes 的 select 只接受 from、to 或 0% 到 100%。');
    } else if (value.startsWith('@') && !/^@(media|supports|container)\s+\S/.test(value)) {
      throw new Error('select 只支持 @media、@supports、@container 局部条件。');
    }
    const previous = active.path;
    active.path = [...previous, value];
    try {
      if (build.constructor.name === 'AsyncFunction') throw new Error('select 回调不能是 async。');
      synchronous(build(), 'select 回调必须同步完成。');
    } finally {
      active.path = previous;
    }
    return this;
  }

  protected write(property: keyof KeywordValues, name: string, input: unknown): void {
    const active = frame();
    if (active.kind === 'animation' && !active.path.length)
      throw new Error('关键帧属性必须放在 select 帧位置中。');
    const bound = input !== null && typeof input === 'object' && BINDING in input;
    let value: unknown = bound ? (input as CssBinding<unknown>)[BINDING] : input;
    if (value === undefined) return;
    if (
      property === 'animationName' &&
      value !== null &&
      typeof value === 'object' &&
      ANIMATION in value
    ) {
      active.declarations.push(
        Object.freeze({
          path: Object.freeze([...active.path]),
          name,
          value: value as CssAnimation,
          variable: false,
          inline: false,
        }),
      );
      return;
    }
    let themeVariable: string | undefined;
    if (typeof value === 'string' && value.startsWith('_')) {
      const group = this.keywords[property];
      if (!Object.hasOwn(group, value)) throw new Error(`主题 ${property} 没有关键字 ${value}。`);
      const token = value;
      value = Reflect.get(group, token);
      if (value === undefined) return;
      if (inlineValue(property, 'raw', value) !== undefined)
        themeVariable = themeName(property, token);
    }
    if (typeof value !== 'string' && (typeof value !== 'number' || !Number.isFinite(value)))
      throw new Error(`CSS ${property} 需要字符串、有限数值或 undefined。`);
    // 复用 core 的声明边界检查，不能通过一个属性值插入其他声明。
    styleText({ [name]: value });
    const positionSafe =
      active.kind === 'animation' ||
      active.path.every(
        (part) => part.startsWith('@') || /^&(?:(?:::?[\w-]+)|(?:\[[^\]]+\]))*$/.test(part),
      );
    const safe =
      bound && !themeVariable && positionSafe ? inlineValue(property, 'raw', value) : undefined;
    active.declarations.push(
      Object.freeze({
        path: Object.freeze([...active.path]),
        name,
        value: themeVariable ? `var(${themeVariable})` : (safe ?? String(value)),
        variable: safe !== undefined,
        inline: false,
      }),
    );
  }
}

function themeName(property: string, token: string): string {
  return `--zt-${hash(`${property}:${token}`)}`;
}

/** Provider 的内部接线入口；使用相同的查表与安全分类，作者不手写变量。 */
export function themeDeclarations(author: CssAuthor): readonly Declaration[] {
  const result: Declaration[] = [];
  const theme = author.keywords;
  if (theme === systemKeywords) return Object.freeze(result);
  // 只读取用户覆写的主题组，避免枚举系统表时实例化全部属性的懒缓存。
  const properties = new Set<keyof KeywordValues>();
  for (
    let object: object | null = theme;
    object && object !== SystemKeywords.prototype;
    object = Object.getPrototypeOf(object)
  )
    for (const property of Object.getOwnPropertyNames(object))
      if (Object.hasOwn(systemKeywords, property)) properties.add(property as keyof KeywordValues);
  for (const property of properties) {
    const group = theme[property];
    if (!group || typeof group !== 'object') continue;
    for (const token of Object.keys(group)) {
      if (!token.startsWith('_')) continue;
      const value = Reflect.get(group, token);
      const safe = inlineValue(property, 'raw', value);
      if (safe !== undefined)
        result.push(
          Object.freeze({
            path: Object.freeze([]),
            name: themeName(property, token),
            value: safe,
            variable: false,
            inline: true,
          }),
        );
    }
  }
  return Object.freeze(result);
}
export function collectTheme(author: CssAuthor, resolve: ClassResolver): CssProgram {
  return Object.freeze({ [PROGRAM]: themeDeclarations(author), _resolveClass: resolve });
}

function merge(declarations: readonly Declaration[]): Declaration[] {
  const entries = new Map<string, Declaration>();
  for (const declaration of declarations) {
    const key = JSON.stringify([declaration.path, declaration.name]);
    entries.delete(key);
    entries.set(key, declaration);
  }
  return [...entries.values()];
}
function wrap(path: readonly string[], body: string): string {
  for (let index = path.length - 1; index >= 0; index--) body = `${path[index]}{${body}}`;
  return body;
}

function materialize(
  declarations: readonly Declaration[],
  host: ServerCssHost,
  namespace: string,
): { body: string; style: string } {
  const entries = merge(declarations);
  const shape = entries.map((entry) => [
    entry.path,
    entry.name,
    entry.inline ? 'inline' : entry.variable ? 'bound' : entry.value,
  ]);
  const prefix = `--zj-${hash(JSON.stringify(shape))}-${namespace}`;
  let body = '';
  const styles: string[] = [];
  for (const [index, entry] of entries.entries()) {
    if (entry.inline) {
      if (typeof entry.value !== 'string') throw new Error('主题变量不能是动画结果。');
      styles.push(`${entry.name}:${entry.value}`);
      continue;
    }
    let value = entry.value;
    if (typeof value === 'object') {
      const animation = materialize(value[ANIMATION], host, `${namespace}-${index}`);
      value = host.keyframes(animation.body);
      if (animation.style) styles.push(animation.style);
    } else if (entry.variable) {
      const name = `${prefix}-${index}`;
      styles.push(`${name}:${value}`);
      value = `var(${name})`;
    }
    body += wrap(entry.path, `${entry.name}:${value};`);
  }
  return { body, style: styles.join(';') };
}

export function resolvePrograms(sources: readonly ClassSource[], host: ServerCssHost): ClassStyle {
  const declarations = sources.flatMap((source) => {
    if (!(PROGRAM in source)) throw new Error('不是当前 CSS 作者创建的样式结果。');
    return (source as CssProgram)[PROGRAM];
  });
  const result = materialize(declarations, host, 'style');
  const registered = result.body ? host.css(result.body) : '';
  if (typeof registered !== 'string') throw new Error('CSS 宿主必须返回单个登记类名。');
  return { class: registered, style: result.style };
}

export function collectGlobal(build: Callback, host: ServerCssHost): string {
  const result = materialize(collect('style', build), host, 'global');
  if (result.style) throw new Error('globalCss 没有绑定元素，不支持 bx 或主题变量注入。');
  return result.body;
}
