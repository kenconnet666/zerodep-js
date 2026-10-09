import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { resolve } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { root } from './environment.mjs';
import { service, closeService } from './language-client.mjs';
import { removeProbes } from './probe-files.mjs';

const { values } = parseArgs({
  args: process.argv.slice(3),
  options: { binary: { type: 'string' }, case: { type: 'string' } },
});
const header = `import { _state, _derived, _component, For } from 'zerodep-js';
let text = _state('');
let checked = _state(false);
let count = _state(1);
const rows = [{ id: 1, title: 'row' }];
`;
const control = `const Field = _component((props: { value: string; onValueChange: (value: string) => void; label?: string }) => <span>{props.value}</span>);\n`;
const cases = [
  ...[
    ['columns', 'subgrid'],
    ['autoFlow', 'row'],
    ['justifyItems', 'stretch'],
    ['gap', '_md'],
  ].map(([property, member]) => ({
    name: `Grid属性-${property}`,
    directory: 'apps/docs/src',
    source: `import { Grid } from 'zerodep-js-ui'; const view = <Grid ${property}="${member.slice(0, -1)}¦" />;`,
    expected: member,
    word: member.slice(0, -1),
  })),
  ...[
    ['Button', 'variant', 'outline'],
    ['Button', 'color', '_primary'],
    ['IconButton', 'size', '_lg'],
    ['LinkButton', 'backgroundColor', '_surface'],
    ['Flex', 'alignItems', 'center'],
  ].map(([component, property, member]) => ({
    name: `按钮属性-${component}.${property}`,
    directory: 'apps/docs/src',
    source: `import { ${component} } from 'zerodep-js-ui'; import { Search } from '@lucide/icons'; const view = <${component} ${component === 'IconButton' ? 'icon={Search} aria-label="搜索"' : component === 'LinkButton' ? 'href="/docs"' : ''} ${property}="${member.slice(0, -1)}¦" />;`,
    expected: member,
    word: member.slice(0, -1),
  })),
  {
    name: '按钮属性-Toggle槽状态',
    directory: 'apps/docs/src',
    source:
      "import { ToggleButton } from 'zerodep-js-ui'; const view = <ToggleButton pressed={false} onPressedChange={() => {}} slotSpinner={state => ({ color: state.pres¦ ? '_primary' : 'currentColor' })} />;",
    expected: 'pressed',
    word: 'pres',
  },
  ...[
    ['Text', 'color', '_muted'],
    ['Text', 'weight', '_semibold'],
    ['Ripple', 'color', '_primary'],
    ['ButtonBase', 'size', '_md'],
    ['Provider', 'size', '_md'],
  ].map(([component, property, member]) => ({
    name: `基础属性-${component}.${property}`,
    directory: 'apps/docs/src',
    source: `import { ${component} } from 'zerodep-js-ui'; const view = <${component} ${property}="${member.slice(0, -1)}¦" />;`,
    expected: member,
    word: member.slice(0, -1),
  })),
  {
    name: '基础属性-slotRipple状态',
    directory: 'apps/docs/src',
    source:
      "import { ButtonBase } from 'zerodep-js-ui'; const view = <ButtonBase slotRipple={state => ({color: state.dis¦ ? '_disabled' : '_primary'})} />;",
    expected: 'disabled',
    word: 'dis',
  },
  ...[
    ['color', '_primary'],
    ['size', '_lg'],
  ].map(([property, member]) => ({
    name: `Icon属性-${property}`,
    directory: 'apps/docs/src',
    source: `import { Icon } from 'zerodep-js-ui'; import { Search } from '@lucide/icons'; const view = <Icon icon={Search} ${property}="${member.slice(0, -1)}¦" />;`,
    expected: member,
    word: member.slice(0, -1),
  })),
  ...['useCss', 'useLang', 'useLocale'].map((hook) => ({
    name: 'UI调用跳转-' + hook,
    directory: 'apps/docs/src',
    source: `import { ${hook} } from 'zerodep-js-ui';\nexport const probe = () => ${hook.slice(0, -1)}¦();`,
    expected: hook,
    word: hook.slice(0, -1),
    definition: 'packages/ui/src/provider/context.ts',
  })),
  {
    name: 'UI自动导入-合并包入口',
    directory: 'apps/docs/src',
    source: "import { Provider } from 'zerodep-js-ui'; void Provider; export const hook = useC¦;",
    expected: 'useCss',
    word: 'useC',
    autoImport: true,
    importFrom: 'zerodep-js-ui',
  },
  {
    name: 'UI自动导入-新增包入口',
    directory: 'apps/docs/src',
    source: 'export const hook = useC¦;',
    expected: 'useCss',
    word: 'useC',
    autoImport: true,
    importFrom: 'zerodep-js-ui',
  },

  ...[
    ['borderWidth', '_thin', '细边框'],
    ['borderWidth', '_thick', '粗边框'],
    ['color', '_primary', '主操作颜色'],
    ['backgroundColor', '_surface', '容器表面'],
    ['borderColor', '_border', '边框颜色'],
    ['outlineColor', '_focus', '焦点提示'],
    ['fill', '_text', '主要文字'],
    ['stroke', '_muted', '次要文字'],
    ['fontFamily', '_sans', '无衬线字体'],
    ['fontSize', '_md', '正文字号'],
    ['fontWeight', '_semibold', '半粗字重'],
    ['lineHeight', '_normal', '常规行高'],
    ['height', '_md', '常规控件高度'],
    ['padding', '_md', '常规间距'],
    ['paddingInline', '_md', '常规间距'],
    ['paddingBlock', '_md', '常规间距'],
    ['margin', '_md', '常规间距'],
    ['marginInline', '_md', '常规间距'],
    ['marginBlock', '_md', '常规间距'],
    ['gap', '_md', '常规间距'],
    ['borderRadius', '_full', '胶囊圆角'],
    ['opacity', '_disabled', '禁用状态透明度'],
    ['transitionDuration', '_fast', '快速动效时长'],
    ['animationDuration', '_slow', '缓慢动效时长'],
    ['transitionTimingFunction', '_standard', '标准缓动曲线'],
    ['boxShadow', '_md', '常规阴影'],
  ].map(([property, member, documentation]) => ({
    name: `UI主题定义-${property}.${member}`,
    directory: 'apps/docs/src',
    source: `import { useCss } from 'zerodep-js-ui'; const s = useCss(); s.${property}.${member.slice(0, -1)}¦;`,
    expected: member,
    word: member.slice(0, -1),
    details: true,
    documentation,
    definition: 'packages/css/src/theme/tokens.ts',
  })),
  {
    name: 'CSS说明-display.inlineFlex',
    source: "import { Css } from 'zerodep-js-css'; const s = new Css(); s.display.inlineFle¦;",
    expected: 'inlineFlex',
    word: 'inlineFle',
    details: true,
    documentation: '行内排版',
  },
  {
    name: 'CSS说明-objectFit.cover',
    source: "import { Css } from 'zerodep-js-css'; const s = new Css(); s.objectFit.cove¦;",
    expected: 'cover',
    word: 'cove',
    details: true,
    documentation: '完整',
  },
  {
    name: 'CSS说明-position.sticky',
    source: "import { Css } from 'zerodep-js-css'; const s = new Css(); s.position.stick¦;",
    expected: 'sticky',
    word: 'stick',
    details: true,
    documentation: 'auto',
  },
  {
    name: 'CSS说明-overflow.clip',
    source: "import { Css } from 'zerodep-js-css'; const s = new Css(); s.overflow.cli¦;",
    expected: 'clip',
    word: 'cli',
    details: true,
    documentation: '不建立滚动容器',
  },
  {
    name: 'CSS说明-width.rem',
    source: "import { Css } from 'zerodep-js-css'; const s = new Css(); s.width.re¦;",
    expected: 'rem',
    word: 're',
    details: true,
    documentation: '根元素字号',
  },
  {
    name: 'CSS说明-width.clamp',
    source: "import { Css } from 'zerodep-js-css'; const s = new Css(); s.width.clam¦;",
    expected: 'clamp',
    word: 'clam',
    details: true,
    documentation: '下限和上限',
  },

  {
    name: 'CSS公共关键字语义文档',
    source: `import { Css } from 'zerodep-js-css'; const s = new Css(); s.backgroundColor.inhe¦;`,
    expected: 'inherit',
    word: 'inhe',
    details: true,
    documentation: '使用父元素该属性的计算值',
  },
  {
    name: 'CSS属性用途文档',
    source: `import { Css } from 'zerodep-js-css'; const s = new Css(); s.fontSi¦;`,
    expected: 'fontSize',
    word: 'fontSi',
    details: true,
    documentation: '设置字体大小',
  },
  {
    name: 'CSS主题扩展成员文档',
    source: `import { Css, SystemKeywords, systemKeywords } from 'zerodep-js-css';
class Theme extends SystemKeywords {
  override readonly fontSize = {
    ...systemKeywords.fontSize,
    /** 中号正文字体，主题可覆盖。 */
    _md: '1rem',
  };
}
const s = new Css(new Theme()); s.fontSize._m¦;`,
    expected: '_md',
    word: '_m',
    details: true,
    documentation: '中号正文字体',
  },
  {
    name: '页面元信息字段',
    source:
      header +
      `import { _head } from 'zerodep-js/head';
const App = _component(() => { _head(() => ({ tit¦: '标题' })); return null; });`,
    expected: 'title',
    word: 'tit',
  },
  {
    name: '主题作者方法文档',
    source:
      header +
      `import { Css } from 'zerodep-js-css';
import { createCssContext } from 'zerodep-js-css';
const theme = createCssContext<Css>();
const App = _component(() => { const s = theme.useCss(); s.width.p¦(20); return null; });`,
    expected: 'px',
    word: 'p',
    details: true,
    documentation: 'CSS 像素',
  },
  {
    name: 'DOM 引用绑定',
    source:
      header + `let node: HTMLInputElement | undefined; const view = <input bind:th¦={node} />;`,
    expected: 'bind:this',
    word: 'bind:th',
  },
  {
    name: '具名宏导入',
    source: `import { _sta¦ } from 'zerodep-js';`,
    expected: '_state',
    word: '_sta',
  },
  {
    name: '命名空间导入',
    source: `import * as Z from 'zerodep-js'; Z.¦`,
    expected: '_component',
    word: '',
  },
  {
    name: '浅状态宏成员',
    source: header + `let shallow = _state.ra¦({});`,
    expected: 'raw',
    word: 'ra',
  },
  {
    name: '派生宏成员',
    source: header + `const computed = _derived.b¦(() => count);`,
    expected: 'by',
    word: 'b',
  },
  { name: '状态变量类型', source: header + `count.toFi¦();`, expected: 'toFixed', word: 'toFi' },
  {
    name: '组件 props 读取',
    source:
      header + `const App = _component((props: {label: string}) => <span>{props.la¦}</span>);`,
    expected: 'label',
    word: 'la',
  },
  {
    name: '组件 props 解构',
    source: header + `const App = _component(({ lab¦ }: {label: string}) => <span />);`,
    expected: 'label',
    word: 'lab',
  },
  {
    name: 'HTML 属性',
    source: header + `const view = <input placeh¦="hint" />;`,
    expected: 'placeholder',
    word: 'placeh',
  },
  {
    name: 'HTML 事件',
    source: header + `const view = <button onCl¦={() => {}} />;`,
    expected: 'onClick',
    word: 'onCl',
  },
  {
    name: '事件 currentTarget',
    source: header + `const view = <input onInput={event => { event.currentTarget.val¦; }} />;`,
    expected: 'value',
    word: 'val',
  },
  {
    name: 'ARIA 属性',
    source: header + `const view = <button aria-l¦="label" />;`,
    expected: 'aria-label',
    word: 'aria-l',
  },
  {
    name: 'SVG 属性',
    source: header + `const view = <svg viewB¦="0 0 10 10" />;`,
    expected: 'viewBox',
    word: 'viewB',
  },
  {
    name: 'input bind 前缀',
    source: header + `const view = <input bind¦={text} />;`,
    expected: 'bind:value',
    word: 'bind',
    details: true,
  },
  {
    name: 'input bind 冒号后',
    source: header + `const view = <input bind:¦={text} />;`,
    expected: 'bind:value',
    word: 'bind:',
    edit: true,
    details: true,
  },
  {
    name: 'input bind 局部名',
    source: header + `const view = <input bind:v¦={text} />;`,
    expected: 'bind:value',
    word: 'bind:v',
    edit: true,
  },
  {
    name: '冒号自动触发',
    source: header + `const view = <input bind:¦={text} />;`,
    expected: 'bind:value',
    word: 'bind:',
    edit: true,
    trigger: ':',
  },
  {
    name: 'input bind 名称中间',
    source: header + `const view = <input bind:va¦lue={text} />;`,
    expected: 'bind:value',
    word: 'bind:va',
    suffix: 'lue',
    edit: true,
  },
  {
    name: 'input bind 带空白',
    source: header + `const view = <input bind : v¦={text} />;`,
    expected: 'bind:value',
    word: 'bind : v',
    edit: true,
  },
  {
    name: 'UTF-16 编辑范围',
    source: header + `const view = <>🚀<input bind:v¦={text} /></>;`,
    expected: 'bind:value',
    word: 'bind:v',
    edit: true,
  },
  {
    name: 'checkbox 绑定',
    source: header + `const view = <input bind:ch¦={checked} />;`,
    expected: 'bind:checked',
    word: 'bind:ch',
    edit: true,
  },
  {
    name: 'checkbox 成组绑定',
    source:
      header +
      `let selected = _state<string[]>([]); const view = <input type="checkbox" value="a" bind:gr¦={selected} />;`,
    expected: 'bind:group',
    word: 'bind:gr',
    edit: true,
  },
  {
    name: 'textarea 绑定',
    source: header + `const view = <textarea bind:v¦={text} />;`,
    expected: 'bind:value',
    word: 'bind:v',
    absent: ['bind:checked'],
    edit: true,
  },
  {
    name: 'details 展开绑定',
    source: header + `const view = <details bind:op¦={checked} />;`,
    expected: 'bind:open',
    word: 'bind:op',
    absent: ['bind:value', 'bind:checked'],
    edit: true,
  },
  {
    name: 'select 绑定',
    source: header + `const view = <select bind:v¦={text} />;`,
    expected: 'bind:value',
    word: 'bind:v',
    absent: ['bind:valueAsNumber'],
    edit: true,
  },
  {
    name: '组件属性',
    source:
      header +
      control +
      `const view = <Field value={text} onValueChange={() => {}} lab¦="label" />;`,
    expected: 'label',
    word: 'lab',
  },
  {
    name: '组件双向绑定',
    source: header + control + `const view = <Field bind:v¦={text} />;`,
    expected: 'bind:value',
    word: 'bind:v',
    edit: true,
  },
  {
    name: '绑定值表达式',
    source: header + `const view = <input bind:value={te¦} />;`,
    expected: 'text',
    word: 'te',
    absent: ['bind:value'],
  },
  {
    name: 'For 行参数',
    source:
      header +
      `const view = <For each={rows} keyBy={row => row.id}>{row => <span>{row.tit¦}</span>}</For>;`,
    expected: 'title',
    word: 'tit',
  },
  {
    name: 'For 索引参数',
    source:
      header +
      `const view = <For each={rows} keyBy={row => row.id}>{(row, index) => <span>{index.toFi¦()}</span>}</For>;`,
    expected: 'toFixed',
    word: 'toFi',
  },
  {
    name: '泛型参数成员',
    source: `export function get<T extends { id: string }>(value: T) { return value.i¦; }`,
    expected: 'id',
    word: 'i',
  },
  {
    name: '可选链成员',
    source: `export function get(value: { label: string } | undefined) { return value?.lab¦; }`,
    expected: 'label',
    word: 'lab',
  },
  {
    name: '判别联合收窄',
    source: `export function get(value: {kind:'ready'; result:string} | {kind:'pending'}) { if (value.kind === 'ready') return value.res¦; }`,
    expected: 'result',
    word: 'res',
    absent: ['missing'],
  },
  { name: 'JSX 标签名', source: header + `const view = <in¦ />;`, expected: 'input', word: 'in' },
  {
    name: 'JSX 闭合标签',
    source: header + `const view = <div><span></sp¦></div>;`,
    expected: 'span',
    word: 'sp',
  },
  {
    name: '组件字面量属性',
    source:
      header +
      `const Tone = _component((props: {tone: 'primary' | 'danger'}) => <span>{props.tone}</span>); const view = <Tone tone="pr¦" />;`,
    expected: 'primary',
    word: 'pr',
  },
  {
    name: '泛型组件回调',
    source:
      header +
      `const List = _component(<T,>(props: {items: T[]; label: (item: T) => string}) => <span />); const view = <List items={rows} label={row => row.tit¦} />;`,
    expected: 'title',
    word: 'tit',
  },
  {
    name: 'ref 元素类型',
    source: header + `const view = <input ref={element => { element.val¦; }} />;`,
    expected: 'value',
    word: 'val',
  },
  {
    name: 'class 属性',
    source: header + `const view = <div cla¦="page" />;`,
    expected: 'class',
    word: 'cla',
  },
  {
    name: 'style 属性成员',
    source: header + `const view = <div style={{ backgroundC¦: 'red' }} />;`,
    expected: 'backgroundColor',
    word: 'backgroundC',
  },
  {
    name: '原生 property 指令',
    source: header + `const view = <div prop:scrollT¦={10} />;`,
    expected: 'prop:scrollTop',
    word: 'prop:scrollT',
    edit: true,
  },
  {
    name: 'SVG 命名空间属性',
    source: header + `const view = <svg xml:la¦="zh" />;`,
    expected: 'xml:lang',
    word: 'xml:la',
    edit: true,
  },
  {
    name: '组件命名空间事件',
    source:
      header +
      `const Child = _component((props: {'on:ready': () => void}) => <span />); const view = <Child on:rea¦={() => {}} />;`,
    expected: 'on:ready',
    word: 'on:rea',
    edit: true,
  },
  {
    name: '宏自动导入',
    source: `export const lazy = _laz¦;`,
    expected: '_lazy',
    word: '_laz',
    autoImport: true,
  },
  {
    name: '属性表达式自动加括号',
    source: header + `const view = <input value=te¦ />;`,
    expected: 'text',
    word: 'te',
    replacement: '{text}',
  },
  {
    name: 'MathML 属性',
    source: header + `const view = <math disp¦="block" />;`,
    expected: 'display',
    word: 'disp',
  },
  {
    name: '自定义元素 property',
    source:
      header +
      `class DemoElement extends HTMLElement { payload = {label: ''}; } declare global { interface HTMLElementTagNameMap { 'x-completion-probe': DemoElement; } } const view = <x-completion-probe prop:pay¦={{label: 'ok'}} />;`,
    expected: 'prop:payload',
    word: 'prop:pay',
    edit: true,
  },
  {
    name: 'Unicode 命名空间属性',
    source:
      header +
      `const Child = _component((props: {'绑定:值': string}) => <span />); const view = <Child 绑定:¦值={text} />;`,
    expected: '绑定:值',
    word: '绑定:',
    suffix: '值',
    edit: true,
  },
  {
    name: '连字符命名空间属性',
    source:
      header +
      `const Child = _component((props: {'on-app:event-name': string}) => <span />); const view = <Child on-app:event-n¦ame="ok" />;`,
    expected: 'on-app:event-name',
    word: 'on-app:event-n',
    suffix: 'ame',
    edit: true,
  },
];

const selectedCases = values.case
  ? cases.filter((entry) => entry.name === values.case || entry.name.startsWith(values.case + '-'))
  : cases;
assert(selectedCases.length > 0, '没有匹配的补全用例。');

const created = [];
const failures = [];
const id = randomUUID().replaceAll('-', '');
function offset(text, position) {
  const lines = text.split('\n');
  return (
    lines.slice(0, position.line).reduce((sum, line) => sum + line.length + 1, 0) +
    position.character
  );
}
function name(item) {
  return item.data?.name ?? item.label.replace(/\?$/, '');
}
try {
  const language = await service(
    'typescript',
    values.binary ? { bin: resolve(values.binary), args: ['--lsp', '--stdio'] } : undefined,
  );
  for (const [index, entry] of selectedCases.entries()) {
    const file = resolve(
      root,
      `${entry.directory ?? 'apps/example/src'}/__completion_${id}_${index}.tsx`,
    );
    const cursor = entry.source.indexOf('¦');
    const text = entry.source.replace('¦', '');
    await writeFile(file, text, { flag: 'wx' });
    created.push(file);
    const before = text.slice(0, cursor);
    const position = {
      line: before.split('\n').length - 1,
      character: before.length - before.lastIndexOf('\n') - 1,
    };
    const doc = { uri: pathToFileURL(file).href, languageId: 'typescriptreact', text };
    try {
      await language.run(doc, async () => {
        if (entry.trigger)
          assert(
            language.capabilities.completionProvider.triggerCharacters.includes(entry.trigger),
            '服务未声明触发字符',
          );
        const result = await language.request('textDocument/completion', {
          textDocument: { uri: doc.uri },
          position,
          ...(entry.trigger
            ? { context: { triggerKind: 2, triggerCharacter: entry.trigger } }
            : {}),
        });
        const items = Array.isArray(result) ? result : (result?.items ?? []);
        let item = items.find((item) => name(item) === entry.expected);
        assert(item, '缺少候选 ' + entry.expected);
        for (const absent of entry.absent ?? [])
          assert(!items.some((item) => name(item) === absent), '错误候选 ' + absent);
        if (language.capabilities.completionProvider?.resolveProvider)
          item = { ...item, ...(await language.request('completionItem/resolve', item)) };
        if (entry.details) assert(item.detail && item.documentation, '缺少类型或文档');
        if (entry.documentation) {
          const documentation =
            typeof item.documentation === 'string'
              ? item.documentation
              : (item.documentation?.value ?? '');
          assert(documentation.includes(entry.documentation), '缺少对应语义的中文说明');
        }
        const edit = item.textEdit;
        if (entry.edit) assert(edit, '命名空间补全必须提供明确替换范围');
        const range = edit?.range ?? edit?.replace;
        const start = range ? offset(text, range.start) : cursor - entry.word.length;
        const end = range ? offset(text, range.end) : cursor + (entry.suffix?.length ?? 0);
        const insertion = edit?.newText ?? item.insertText ?? entry.expected;
        let applied = text.slice(0, start) + insertion + text.slice(end);
        const expected =
          text.slice(0, cursor - entry.word.length) +
          (entry.replacement ?? entry.expected) +
          text.slice(cursor + (entry.suffix?.length ?? 0));
        assert.equal(applied, expected, '插入结果不正确');
        const additional = item.additionalTextEdits ?? [];
        if (entry.autoImport) assert(additional.length > 0, '自动导入没有提供 import 编辑');
        if (additional.length) {
          const edits = [
            { start, end, text: insertion },
            ...additional.map((edit) => ({
              start: offset(text, edit.range.start),
              end: offset(text, edit.range.end),
              text: edit.newText,
            })),
          ].sort((a, b) => b.start - a.start);
          applied = text;
          let boundary = text.length;
          for (const edit of edits) {
            assert(edit.end <= boundary, '补全编辑相互重叠');
            applied = applied.slice(0, edit.start) + edit.text + applied.slice(edit.end);
            boundary = edit.start;
          }
        }
        if (entry.importFrom) {
          const imports = [...applied.matchAll(/import\s*\{([^}]+)\}\s*from\s*['"]([^'"]+)['"]/g)];
          assert(
            imports.some(
              (match) =>
                match[2] === entry.importFrom &&
                match[1].split(',').some((name) => name.trim() === entry.expected),
            ),
            '自动导入必须命中公开包入口',
          );
          assert(
            !imports.some((match) => match[2].startsWith(entry.importFrom + '/')),
            '不能自动导入未公开的包内源码',
          );
        }
        await writeFile(file, applied);
      });
      doc.text = await readFile(file, 'utf8');
      const report = await language.run(doc, () =>
        language.request('textDocument/diagnostic', { textDocument: { uri: doc.uri } }),
      );
      assert.equal(report.kind, 'full');
      const errors = report.items.filter((item) => item.severity === 1);
      assert.equal(errors.length, 0, JSON.stringify(errors));
      if (entry.documentation) {
        const hover = await language.run(doc, () =>
          language.request('textDocument/hover', {
            textDocument: { uri: doc.uri },
            position,
          }),
        );
        const documentation =
          typeof hover?.contents === 'string' ? hover.contents : (hover?.contents?.value ?? '');
        assert(documentation.includes(entry.documentation), '悬浮缺少对应语义的中文说明');
      }
      if (entry.definition) {
        const definitions = await language.run(doc, () =>
          language.request('textDocument/definition', {
            textDocument: { uri: doc.uri },
            position,
          }),
        );
        const expectedFile = resolve(root, entry.definition).toLowerCase();
        const match = (definitions ?? []).find(
          (item) => fileURLToPath(item.targetUri ?? item.uri).toLowerCase() === expectedFile,
        );
        assert(match, '定义没有映射到预期源码：' + JSON.stringify(definitions));
        const target = await readFile(resolve(root, entry.definition), 'utf8');
        const range = match.targetSelectionRange ?? match.range;
        assert.equal(
          target.slice(offset(target, range.start), offset(target, range.end)),
          entry.expected,
          '定义未指向正确成员',
        );
      }
      console.log('通过：' + entry.name);
    } catch (error) {
      failures.push({ name: entry.name, error: error.message });
      console.error('失败：' + entry.name + '：' + error.message);
    }
  }
  console.log(
    JSON.stringify(
      {
        server: language.serverInfo,
        total: selectedCases.length,
        passed: selectedCases.length - failures.length,
        failures,
      },
      null,
      2,
    ),
  );
  assert.equal(failures.length, 0, '原生补全矩阵存在失败');
} finally {
  await closeService();
  await removeProbes(created);
}
