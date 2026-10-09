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

export function validateKeywordDocs(name, keywords) {
  const values = new Set(keywords.map(([, value]) => value));
  for (const value of Object.keys(docs.keywords[name] ?? {}))
    assert(values.has(value), `${name}.${value} 不存在于生成关键字集合`);
  for (const value of docs.details[name]?.commonValues ?? []) {
    assert(values.has(value), `${name} 的常用值 ${value} 不存在`);
    assert(keywordDetail(name, value), `${name}.${value} 缺少常用值解释`);
  }
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

export function keywordDocumentation(name, cssName, value) {
  const detail = keywordDetail(name, value);
  if (!detail) return `/** CSS 声明：\`${cssName}:${value};\`。 */`;
  const facts = [
    detail.effect,
    detail.comparison && `区别：${detail.comparison}`,
    detail.usage && `适用场景：${detail.usage}`,
    detail.notes && `注意：${detail.notes}`,
    `CSS 声明：\`${cssName}:${value};\`。`,
  ].filter(Boolean);
  // 共享解释可用 $property 代表当前作者属性，避免在 height 提示中展示 width 示例。
  const examples = detail.examples?.map((example) => example.replaceAll('$property', name));
  return jsdoc(detail.summary, {
    remarks: facts.join('\n\n'),
    examples,
    ...(detail.examples
      ? { see: `https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/${cssName}` }
      : {}),
  });
}

const unitDescriptions = {
  px: 'CSS 像素，不等同于设备物理像素',
  cm: '厘米；CSS 绝对单位按固定比例换算',
  mm: '毫米；CSS 绝对单位按固定比例换算',
  q: '四分之一毫米',
  in: '英寸，1in 等于 96 CSS px',
  pt: '点，1pt 等于 1/72in',
  pc: '派卡，1pc 等于 12pt',
  em: '通常相对于当前元素字号；用于 font-size 时相对于继承字号',
  rem: '相对于根元素字号；用于根元素 font-size 时依据初始字号',
  ex: '相对于当前字体的小写 x 高度',
  rex: '相对于根元素字体的小写 x 高度',
  ch: '相对于当前字体数字 0 的字形前进宽度',
  rch: '相对于根元素字体数字 0 的字形前进宽度',
  cap: '相对于当前字体的大写字母高度',
  rcap: '相对于根元素字体的大写字母高度',
  ic: '相对于当前字体水字形的前进尺度',
  ric: '相对于根元素字体水字形的前进尺度',
  lh: '相对于当前元素的行高；用于行高自身等场景按 CSS 规则解析',
  rlh: '相对于根元素的行高',
  percent: '百分比，100 表示 100%；参照对象由具体属性决定',
  ms: '毫秒，1000ms 等于 1s',
  s: '秒，1s 等于 1000ms',
  deg: '角度，360deg 为一周',
  grad: '百分度，400grad 为一周',
  rad: '弧度，2πrad 为一周',
  turn: '周数，1turn 为一周',
};
const dimensions = {
  w: '宽度',
  h: '高度',
  i: '行内轴尺寸',
  b: '块轴尺寸',
  min: '宽高中的较小值',
  max: '宽高中的较大值',
};
for (const [prefix, viewport] of Object.entries({
  '': '大视口（默认视口单位）',
  s: '小视口',
  l: '大视口',
  d: '动态视口',
}))
  for (const [axis, label] of Object.entries(dimensions))
    unitDescriptions[`${prefix}v${axis}`] = `${viewport}${label}的 1%`;
for (const [axis, label] of Object.entries(dimensions))
  unitDescriptions[`cq${axis}`] = `符合条件的查询容器${label}的 1%；无合适容器时按小视口规则回退`;

// 同样的参数数量不表示同样的语义，例如 gap 与 border-spacing 顺序不同。
const pairLabels = {
  gap: ['行间距（row-gap）', '列间距（column-gap）'],
  borderSpacing: ['水平单元格间距', '垂直单元格间距'],
  backgroundPosition: ['水平位置', '垂直位置'],
  backgroundSize: ['图像宽度', '图像高度'],
  containIntrinsicSize: ['替代内部宽度', '替代内部高度'],
  viewTimelineInset: ['时间线可见范围起始侧内缩', '时间线可见范围结束侧内缩'],
};
const fourSides = new Set([
  'margin',
  'padding',
  'inset',
  'borderWidth',
  'borderImageOutset',
  'borderImageSlice',
  'borderImageWidth',
  'maskBorderOutset',
  'maskBorderWidth',
  'scrollMargin',
  'scrollPadding',
  'scrollSnapMargin',
]);

function argumentLabels(property, count) {
  if (fourSides.has(property))
    return [[], ['四边'], ['上、下', '左、右'], ['上', '左、右', '下'], ['上', '右', '下', '左']][
      count
    ];
  if (property === 'borderRadius')
    return [
      [],
      ['四角'],
      ['左上、右下', '右上、左下'],
      ['左上', '右上、左下', '右下'],
      ['左上', '右上', '右下', '左下'],
    ][count];
  if (/^border.+Radius$/.test(property))
    return count === 1 ? ['水平和垂直半径'] : ['水平半径', '垂直半径'];
  if (property === 'scale')
    return [[], ['X 和 Y 缩放'], ['X 缩放', 'Y 缩放'], ['X 缩放', 'Y 缩放', 'Z 缩放']][count];
  if (/(?:Block|Inline)(?:Width)?$/.test(property)) {
    const axis = property.includes('Block') ? '块轴' : '行内轴';
    return count === 1 ? [`逻辑${axis}两侧`] : [`逻辑${axis}起始侧`, `逻辑${axis}结束侧`];
  }
  const pair = pairLabels[property];
  if (pair) {
    if (count === 2) return pair;
    if (property === 'backgroundPosition') return ['水平位置；垂直方向默认居中'];
    if (property === 'backgroundSize') return ['图像宽度；高度保持 auto'];
    return [`${pair[0]}与${pair[1]}`];
  }
  return Array.from({ length: count }, (_, i) =>
    count === 1 ? '属性值' : `按 CSS 语法顺序排列的第 ${i + 1} 个值`,
  );
}

export function unitDocumentation(name, suffix, count = 1, property, overloaded = false) {
  assert(unitDescriptions[name], `缺少单位文档 ${name}`);
  const labels = argumentLabels(property, count);
  const values = Array.from({ length: count }, (_, i) => i + 1);
  const target = property ?? 'width';
  return jsdoc(`使用 ${suffix} 单位生成完整属性声明。${unitDescriptions[name]}。`, {
    remarks: '不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。',
    params: Object.fromEntries(
      labels.map((label, i) => [
        overloaded ? `value${i + 1}` : 'value',
        `${label}的数值，自动附加 ${suffix}。`,
      ]),
    ),
    returns: '当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。',
    examples: [`s.${target}.${name}(${values.join(', ')})`],
  });
}

export const selectorDescriptions = {
  _hover: '指针悬停时应用；触屏环境可能没有持续悬停状态。',
  _active: '用户正在激活元素时应用，例如按住鼠标按钮期间。',
  _focus: '元素自身获得焦点时应用。',
  _focusVisible: '元素获得焦点且浏览器判断应显示焦点指示时应用。',
  _focusWithin: '元素自身或其后代获得焦点时应用。',
  _disabled: '匹配原生禁用状态；仅设置 aria-disabled 不会匹配。',
  _checked: '匹配原生选中状态，例如复选框或单选框被选中。',
  _before: '设置元素前置伪元素；通常还需要 content 才会生成盒子。',
  _after: '设置元素后置伪元素；通常还需要 content 才会生成盒子。',
  _placeholder: '设置输入控件占位文字的样式，允许的属性受伪元素规则限制。',
};
