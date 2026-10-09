/** 原生声明片段；条件空项省略，只读数组按顺序展开。 */
export type CssInput = string | false | null | undefined | readonly CssInput[];

/** 选择器、动画、全局块共用；只有 css() 会另外解析本宿主的样式类。 */
export function joinFragments(parts: readonly CssInput[]): string {
  let body = '';
  for (const part of parts) {
    if (typeof part === 'string') body += part;
    else if (part) body += joinFragments(part);
  }
  return body;
}
