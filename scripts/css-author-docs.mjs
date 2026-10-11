import assert from 'node:assert/strict';
import docs from './css-author-docs.json' with { type: 'json' };

/** 文档只进入生成的源码与声明文件，不成为运行时元数据。 */
export function jsdoc(summary, { remarks, params = {}, returns, examples = [], see } = {}) {
  assert(typeof summary === 'string' && summary.trim(), 'JSDoc 必须有明确的用途说明');
  const lines = [summary];
  if (remarks) lines.push('', remarks);
  for (const [name, text] of Object.entries(params)) lines.push(`@param ${name} ${text}`);
  if (returns) lines.push(`@returns ${returns}`);
  for (const example of examples) lines.push('@example', example);
  if (see) lines.push(`@see ${see}`);
  // 防止未来引入的 CSS 示例意外终止注释，所有换行统一加 JSDoc 前缀。
  return (
    '/**\n' +
    lines
      .join('\n')
      .replaceAll('*/', '* /')
      .split('\n')
      .map((line) => ` * ${line}`.trimEnd())
      .join('\n') +
    '\n */'
  );
}

export function validatePropertyDocs(names) {
  const known = new Set(names);
  assert.deepEqual(
    Object.keys(docs.properties).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)),
    [...known].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)),
    '属性文档必须完整覆盖生成集合',
  );
  for (const [name, description] of Object.entries(docs.properties))
    assert(
      typeof description === 'string' && /[\u4e00-\u9fff]/.test(description),
      `${name} 缺少中文说明`,
    );
  for (const section of [docs.details, docs.keywords, docs.keywordAliases])
    for (const name of Object.keys(section)) assert(known.has(name), `未知属性文档 ${name}`);
  for (const target of Object.values(docs.keywordAliases))
    assert(Object.hasOwn(docs.keywords, target), `未知关键字文档引用 ${target}`);
  for (const [name, detail] of Object.entries(docs.details)) {
    validateDetail(detail, ['remarks', 'usage', 'examples', 'commonValues', 'see'], name);
    if (detail.commonValues) {
      assert(Array.isArray(detail.commonValues), `${name}.commonValues 必须是数组`);
      assert.equal(
        new Set(detail.commonValues).size,
        detail.commonValues.length,
        `${name} 常用值重复`,
      );
    }
  }
  for (const [name, entries] of Object.entries(docs.keywords))
    for (const [value, detail] of Object.entries(entries))
      if (typeof detail !== 'string') {
        assert(
          typeof detail.summary === 'string' && detail.summary.trim(),
          `${name}.${value} 缺少摘要`,
        );
        validateDetail(
          detail,
          ['summary', 'effect', 'comparison', 'usage', 'notes', 'examples'],
          `${name}.${value}`,
        );
      }
}

function validateDetail(detail, allowed, name) {
  for (const [key, value] of Object.entries(detail)) {
    assert(allowed.includes(key), `${name} 未知文档字段 ${key}`);
    if (key === 'commonValues' || key === 'examples')
      assert(
        Array.isArray(value) && value.every((item) => typeof item === 'string' && item.trim()),
        `${name}.${key} 必须是非空字符串数组`,
      );
    else assert(typeof value === 'string' && value.trim(), `${name}.${key} 必须是非空文本`);
  }
}

function keywordDetail(name, value) {
  const entry =
    docs.keywords[name]?.[value] ??
    docs.keywords[docs.keywordAliases[name]]?.[value] ??
    docs.globalKeywords[value] ??
    docs.valueKeywords[value];
  return typeof entry === 'string' ? { summary: entry } : entry;
}

/** 字符串值也需要可导航的声明；只生成类型文档，不添加运行时关键字对象。 */
export function keywordDocumentation(name, cssName, value) {
  const detail = keywordDetail(name, value);
  return jsdoc(detail?.summary ?? `原生 CSS 关键字 ${value}。`, {
    remarks: detail
      ? [
          detail.effect,
          detail.comparison && `区别：${detail.comparison}`,
          detail.usage && `适用场景：${detail.usage}`,
          detail.notes,
        ]
          .filter(Boolean)
          .join('\n\n')
      : `${docs.properties[name]}该值的具体行为见属性参考。`,
    // 不把单属性调用当示例；有教学价值的组合另行维护，不复用旧作者语法。
    see: `https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/${cssName}`,
  });
}

/** 全局关键字和命名颜色跨属性共用声明，避免为每个属性复制同一份文档。 */
export function commonKeywordDocumentation(value, group) {
  if (group === 'NamedColor')
    return jsdoc(`CSS 命名颜色 ${value}。`, {
      see: 'https://developer.mozilla.org/docs/Web/CSS/named-color',
    });
  if (group === 'SystemColor' || group === 'DeprecatedSystemColor')
    return jsdoc(`CSS 系统颜色 ${value}，具体颜色由浏览器和用户环境决定。`, {
      remarks:
        group === 'DeprecatedSystemColor'
          ? '历史系统颜色名称；新代码优先使用现代系统颜色。'
          : undefined,
      see: 'https://developer.mozilla.org/docs/Web/CSS/system-color',
    });
  return jsdoc(docs.globalKeywords[value] ?? 'Firefox 历史初始值关键字；新代码使用 initial。');
}

export function propertyDocumentation(name, cssName, upstream) {
  const initial = upstream.match(/\*\*Initial value\*\*: `([^`]+)`/)?.[1];
  const url = upstream.match(/@see (https:\/\/[^\s*]+)/)?.[1];
  const detail = docs.details[name] ?? {};
  const facts = [
    detail.remarks,
    detail.commonValues?.length &&
      '常用值：\n' +
        detail.commonValues
          .map((value) => `- \`${value}\`：${keywordDetail(name, value).summary}`)
          .join('\n'),
    detail.usage && `适用场景：${detail.usage}`,
    initial && `CSS 初始值：\`${initial}\`（不同于浏览器默认样式表）。`,
  ].filter(Boolean);
  return jsdoc(`${docs.properties[name]}（${cssName}）`, {
    remarks: facts.join('\n\n'),
    examples: detail.examples ?? [],
    // 完整形式语法留在参考文档；悬停优先解释效果和用法。
    see:
      detail.see ??
      url ??
      `https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/${cssName}`,
  });
}
