import { jsdoc, unitDocumentation } from './css-author-docs.mjs';

// 生成器与模板缓存纯度检查共用这份单位表；只生成原生单位，不进行数值范围判断。
export const units = Object.fromEntries(
  [
    ...'px cm mm q in pt pc em rem ex rex ch rch cap rcap ic ric lh rlh'.split(' '),
    ...['', 's', 'l', 'd'].flatMap((prefix) =>
      ['vw', 'vh', 'vi', 'vb', 'vmin', 'vmax'].map((unit) => prefix + unit),
    ),
    ...'cqw cqh cqi cqb cqmin cqmax'.split(' '),
  ].map((unit) => [unit, unit]),
);

export const extraUnits = {
  percent: '%',
  ms: 'ms',
  s: 's',
  deg: 'deg',
  grad: 'grad',
  rad: 'rad',
  turn: 'turn',
};

/** Grid 函数仅生成到接受轨道尺寸的属性，不放进所有长度属性的基类。 */
export function gridMethods(property) {
  const explicit = property === 'gridTemplateColumns' || property === 'gridTemplateRows';
  if (!explicit && property !== 'gridAutoColumns' && property !== 'gridAutoRows') return {};
  const track = "'auto' | 'min-content' | 'max-content' | CssString | 0";
  return {
    ...(explicit
      ? {
          repeat: [
            jsdoc('重复一组网格轨道，生成当前轨道属性的完整声明。', {
              params: {
                count: '正整数次数，或 auto-fill/auto-fit；不在此处验证次数。',
                track: '第一条轨道的 CSS 值，长度须带单位；也可传 minmax(...) 字符串。',
                tracks: '其余轨道的 CSS 值，以空格连接。',
              },
              remarks:
                'auto-fit 会折叠空轨道，auto-fill 保留空轨道。函数参数接收裸 CSS 值，不接收其他属性方法生成的完整声明。',
              returns: '包含 repeat(...) 的完整属性声明。',
              examples: [`s.${property}.repeat(3, 'minmax(0, 1fr)')`],
            }),
            `repeat(count: number | 'auto-fill' | 'auto-fit' | CssString, track: ${track}, ...tracks: (${track})[]): string { return this.raw(\`repeat(\${count}, \${[track, ...tracks].join(' ')})\`); }`,
          ],
        }
      : {}),
    minmax: [
      jsdoc('以最小和最大尺寸限定一条网格轨道。', {
        params: {
          minimum: '轨道最小尺寸；不能使用 fr 作为最小值。',
          maximum: '轨道最大尺寸，可使用 fr；不能小于最小值以缩小该下限。',
        },
        remarks: '非零长度须带单位；嵌套在 repeat 中时应传 minmax(...) 裸字符串。',
        returns: '包含 minmax(...) 的完整属性声明。',
        examples: [`s.${property}.minmax(0, '1fr')`],
      }),
      `minmax(minimum: ${track}, maximum: ${track}): string { return this.raw(\`minmax(\${minimum}, \${maximum})\`); }`,
    ],
    fitContent: [
      jsdoc('在自动最小尺寸与最大内容尺寸之间，以给定上限约束轨道。', {
        params: { limit: '带单位的长度、百分比或 0，不接受 fr 作为上限。' },
        returns: '包含 fit-content(...) 的完整属性声明。',
        examples: [`s.${property}.fitContent('20rem')`],
      }),
      'fitContent(limit: CssString | 0): string { return this.raw(`fit-content(${limit})`); }',
    ],
  };
}

export function unitMethod(name, suffix, min = 1, max = 1, override = false, property) {
  if (max === 1)
    return [
      unitDocumentation(name, suffix, 1, property),
      `${name}(value: number): string { return this.declaration(\`\${value}${suffix}\`); }`,
    ];
  const declarations = [];
  for (let count = min; count <= max; count++)
    declarations.push(
      unitDocumentation(name, suffix, count, property, true),
      `${name}(${Array.from({ length: count }, (_, i) => `value${i + 1}: number`).join(', ')}): string;`,
    );
  return [
    ...declarations,
    `${override ? 'override ' : ''}${name}(...values: number[]): string { return this.declaration(values.map(value => \`\${value}${suffix}\`).join(' ')); }`,
  ];
}

export function valueMethods(type, color, math, property) {
  const lines = [];
  if (color)
    lines.push(
      jsdoc('用现代空格分隔语法生成 RGB 颜色声明。', {
        params: {
          red: '红通道，数值通常为 0–255，或带百分比/变量的 CSS 字符串。',
          green: '绿通道，数值通常为 0–255，或 CSS 字符串。',
          blue: '蓝通道，数值通常为 0–255，或 CSS 字符串。',
          alpha: '可选透明度，数值通常为 0–1，或百分比/变量字符串；0 不会被省略。',
        },
        remarks: '字符串原样输出；库不截断通道或校验 CSS。',
        returns: '当前属性的完整声明，不是可嵌套的颜色值。',
        examples: [`s.${property}.rgb(255, 0, 0, 0.5)`],
      }),
      "rgb(red: number | CssString, green: number | CssString, blue: number | CssString, alpha?: number | CssString): string { return this.raw(`rgb(${red} ${green} ${blue}${alpha === undefined ? '' : ` / ${alpha}`})`); }",
      jsdoc('生成 HSL 颜色声明，数值饱和度和明度自动添加百分号。', {
        params: {
          hue: '色相；无单位数值按度解释，也可传带角度单位的字符串。',
          saturation: '饱和度，数值 100 表示 100%；字符串保留原单位。',
          lightness: '明度，数值 50 表示 50%；字符串保留原单位。',
          alpha: '可选透明度，通常为 0–1 或 CSS 百分比/变量字符串。',
        },
        returns: '当前属性的完整声明；数值不做截断。',
        examples: [`s.${property}.hsl(210, 50, 40, 0.8)`],
      }),
      "hsl(hue: number | CssString, saturation: number | CssString, lightness: number | CssString, alpha?: number | CssString): string { return this.raw(`hsl(${hue} ${typeof saturation === 'number' ? saturation + '%' : saturation} ${typeof lightness === 'number' ? lightness + '%' : lightness}${alpha === undefined ? '' : ` / ${alpha}`})`); }",
    );
  if (color)
    lines.push(
      jsdoc('生成 OKLCH 颜色声明，通道按原生 CSS 语法输出。', {
        params: {
          lightness: '感知明度，数值通常为 0–1；也可传百分比字符串。',
          chroma: '色度，0 表示无彩色；可呈现范围随明度、色相和设备变化。',
          hue: '色相，数值按度解释，也可传角度或变量字符串。',
          alpha: '可选透明度，通常为 0–1 或 CSS 百分比/变量字符串。',
        },
        returns: '当前属性的完整声明；不自动添加百分号或裁切色域。',
        examples: [`s.${property}.oklch(0.7, 0.15, 250)`],
      }),
      "oklch(lightness: number | CssString, chroma: number | CssString, hue: number | CssString, alpha?: number | CssString): string { return this.raw(`oklch(${lightness} ${chroma} ${hue}${alpha === undefined ? '' : ` / ${alpha}`})`); }",
      jsdoc('生成 OKLab 颜色声明，通道按原生 CSS 语法输出。', {
        params: {
          lightness: '感知明度，数值通常为 0–1；也可传百分比字符串。',
          a: '绿到红的色轴，负值偏绿、正值偏红。',
          b: '蓝到黄的色轴，负值偏蓝、正值偏黄。',
          alpha: '可选透明度，通常为 0–1 或 CSS 百分比/变量字符串。',
        },
        returns: '当前属性的完整声明；不截断通道数值。',
        examples: [`s.${property}.oklab(0.7, 0.1, -0.1)`],
      }),
      "oklab(lightness: number | CssString, a: number | CssString, b: number | CssString, alpha?: number | CssString): string { return this.raw(`oklab(${lightness} ${a} ${b}${alpha === undefined ? '' : ` / ${alpha}`})`); }",
    );
  if (math) {
    // CSS 属性值只含字符串与数值；开放字符串已覆盖关键字，无需再用 Extract。
    const value = `Property.${type} | CssString`;
    lines.push(
      jsdoc('将数学表达式放入 CSS calc()，由浏览器计算。', {
        params: { expression: '不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。' },
        returns: '包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。',
        examples: [
          property === 'width'
            ? "s.width.calc('100% - 2rem')"
            : `s.${property}.calc('var(--value) * 2')`,
        ],
      }),
      'calc(expression: string): string { return this.raw(`calc(${expression})`); }',
    );
    for (const name of ['min', 'max'])
      lines.push(
        jsdoc(`生成 CSS ${name}()，从同维度的候选值中选择${name === 'min' ? '最小' : '最大'}值。`, {
          params: {
            value: '第一个 CSS 值；长度应带单位，不能传完整属性声明。',
            others: '其余同维度的 CSS 值；变量必须解析为当前属性允许的值。',
          },
          returns: `包含 ${name}(...) 的完整属性声明。`,
          examples: [
            property === 'width'
              ? `s.width.${name}('100%', '40rem')`
              : `s.${property}.${name}('var(--first)', 'var(--second)')`,
          ],
        }),
        `${name}(value: ${value}, ...others: (${value})[]): string { return this.raw(\`${name}(\${[value, ...others].join(', ')})\`); }`,
      );
    // join 避免 TypeScript 为三个大型关键字联合展开模板字面量的笛卡尔积。
    lines.push(
      jsdoc('生成 CSS clamp()，将首选值约束在下限和上限之间。', {
        params: {
          minimum: '下限 CSS 值；下限大于上限时以下限为准。',
          preferred: '首选 CSS 值，常用响应式长度或表达式。',
          maximum: '上限 CSS 值，须与其他参数维度兼容。',
        },
        remarks:
          '参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。',
        returns: '包含 clamp(...) 的完整属性声明。',
        examples: [
          property === 'width'
            ? "s.width.clamp('12rem', '50vw', '40rem')"
            : `s.${property}.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')`,
        ],
      }),
      `clamp(minimum: ${value}, preferred: ${value}, maximum: ${value}): string { return this.raw(\`clamp(\${[minimum, preferred, maximum].join(', ')})\`); }`,
    );
  }
  return lines;
}
