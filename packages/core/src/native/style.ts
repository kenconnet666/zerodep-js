import { TokenType, tokenizer } from '@csstools/css-tokenizer';
import type { Properties, PropertiesHyphen } from 'csstype';
import { textValue } from './text.js';

type CssProperties = Properties &
  PropertiesHyphen & {
    cssFloat?: Properties['float'];
  } & {
    [
      K in keyof Properties as K extends `Webkit${string}` ? Uncapitalize<K> : never
    ]?: Properties[K];
  };

/** 类型来源于生成的 CSS 标准数据；数值只在单位无关属性和自定义变量中直接使用。 */
export type StyleObject = {
  [K in keyof CssProperties]?: CssProperties[K] | false | null | undefined;
} & { [K in `--${string}`]?: string | number | false | null | undefined };
export type Style = string | StyleObject | false;

function tokens(css: string, label: string) {
  return tokenizer(
    { css },
    {
      onParseError(error) {
        throw new Error(`style 的 ${label} 包含不完整或无效的 CSS 语法。`, { cause: error });
      },
    },
  );
}

function propertyName(key: string): { name: string; identity: string } {
  if (key === 'cssText') throw new Error('style 对象不接受 cssText，请直接使用 style 字符串。');
  const name = textValue(
    key === 'cssFloat'
      ? 'float'
      : key.startsWith('--') || key.includes('\\')
        ? key
        : key
            .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
            .replace(/^(webkit|moz|ms|o)-/, '-$1-'),
  );
  const reader = tokens(name, `属性名 ${key}`);
  const token = reader.nextToken();
  if (token[0] !== TokenType.Ident || reader.nextToken()[0] !== TokenType.EOF)
    throw new Error(`无效的 CSS 属性名：${key}`);
  const decoded = token[4].value;
  if (decoded === '--') throw new Error('CSS 自定义属性名不能只有 --。');
  return {
    name,
    identity: decoded.startsWith('--')
      ? decoded
      : decoded.replace(/[A-Z]/g, (letter) => letter.toLowerCase()),
  };
}

/** 只校验单个声明的边界；属性值的具体 CSS 语法仍由浏览器解释。 */
function declarationValue(value: string, name: string): void {
  const reader = tokens(value, name);
  const closing: TokenType[] = [];
  while (true) {
    const type = reader.nextToken()[0];
    if (type === TokenType.EOF) break;
    if (type === TokenType.Function || type === TokenType.OpenParen)
      closing.push(TokenType.CloseParen);
    else if (type === TokenType.OpenSquare) closing.push(TokenType.CloseSquare);
    else if (type === TokenType.OpenCurly) closing.push(TokenType.CloseCurly);
    else if (
      type === TokenType.CloseParen ||
      type === TokenType.CloseSquare ||
      type === TokenType.CloseCurly
    ) {
      if (closing.pop() !== type) throw new Error(`style 的 ${name} 包含不匹配的 CSS 括号。`);
    } else if (type === TokenType.Semicolon && !closing.length)
      throw new Error(`style 的 ${name} 只能包含一个声明值；多声明请使用 style 字符串。`);
  }
  if (closing.length) throw new Error(`style 的 ${name} 包含未闭合的 CSS 括号。`);
}

/** CSR 和 SSR 共用整段声明，避免 shorthand/important 与逐属性更新产生不同结果。 */
export function styleText(value: unknown): string {
  if (value == null || value === false) return '';
  if (typeof value === 'string') return textValue(value);
  if (typeof value !== 'object' || Array.isArray(value))
    throw new Error('style 使用 CSS 字符串或属性对象。');
  const entries = new Map<string, string>();
  for (const key of Object.keys(value)) {
    const { name, identity } = propertyName(key);
    const item: unknown = Reflect.get(value, key);
    // 规范化后的最后一个别名决定结果，也决定它相对于 shorthand 的声明顺序。
    entries.delete(identity);
    if (item == null || item === false) continue;
    if (typeof item !== 'string' && (typeof item !== 'number' || !Number.isFinite(item)))
      throw new Error(`style 的 ${key} 需要字符串、有限数值或空值。`);
    const text = textValue(item);
    declarationValue(text, key);
    entries.set(identity, `${name}:${text}`);
  }
  return [...entries.values()].join(';');
}
