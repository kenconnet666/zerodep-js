import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
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
  {
    name: 'CSS公共关键字语义文档',
    source: `import { Css } from 'zerodep-css'; const s = new Css(); s.backgroundColor.inhe¦;`,
    expected: 'inherit',
    word: 'inhe',
    details: true,
    documentation: '使用父元素该属性的计算值',
  },
  {
    name: 'CSS属性用途文档',
    source: `import { Css } from 'zerodep-css'; const s = new Css(); s.fontSi¦;`,
    expected: 'fontSize',
    word: 'fontSi',
    details: true,
    documentation: '设置字体大小',
  },
  {
    name: 'CSS主题扩展成员文档',
    source: `import { Css, SystemKeywords, systemKeywords } from 'zerodep-css';
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
      `import { Css } from 'zerodep-css';
import { _createCssContext } from 'zerodep-js/css';
const theme = _createCssContext<Css>();
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

const selectedCases = values.case ? cases.filter((entry) => entry.name === values.case) : cases;
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
    const file = resolve(root, `apps/example/src/__completion_${id}_${index}.tsx`);
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
