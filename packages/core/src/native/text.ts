/** HTML 传输会替换 NUL 和孤立代理项；客户端使用相同文本，保留完整 Unicode 字符。 */
export function textValue(value: unknown): string {
  return String(value).replace(/[\0\uD800-\uDFFF]/gu, '\ufffd');
}
