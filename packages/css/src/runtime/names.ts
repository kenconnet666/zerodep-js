/** 两路 32 位累积完整 UTF-16 输入；内容确定命名，冲突仍由登记器检查。 */
export function hash(text: string): string {
  let left = 2166136261;
  let right = 0x9e3779b9;
  for (let index = 0; index < text.length; index++) {
    const code = text.charCodeAt(index);
    left = Math.imul(left ^ code, 16777619);
    right = Math.imul(right ^ code, 0x85ebca6b);
  }
  return (left >>> 0).toString(36).padStart(7, '0') + (right >>> 0).toString(36).padStart(7, '0');
}

/** 纯标记，不登记样式；可在模块顶层创建，名称由作者明确分组。 */
export function className(name: string): string {
  const label = name.replace(/[^a-zA-Z0-9_-]+/g, '-').slice(0, 48);
  return `zm-${label || 'part'}-${hash(name)}`;
}
