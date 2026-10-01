import { describe, expect, it } from 'vitest';
import { execute } from './execute.js';
import { compile } from '../src/index.js';
import { createRoot, Source } from '../../core/src/reactivity.js';
import { setupComponent } from '../../core/src/component.js';
import type { DynamicTemplate, ElementTemplate } from '../../core/src/template.js';
import type { ListTemplate } from '../../core/src/flow.js';

describe('For 的实时参数', () => {
  it('嵌套 For 保持各自参数的词法作用域', () => {
    const view = execute(`
      import { For } from 'zerodep-js';
      const result = <For each={[{ id: 1, rows: [{ id: 2, name: '内层' }] }]} keyBy={(row) => row.id}>
        {(row, index) => <For each={row.rows} keyBy={(row) => row.id}>
          {(row, index) => <span title={row.name + index} />}
        </For>}
      </For>;
    `) as DynamicTemplate;
    createRoot((dispose) => {
      try {
        const outerElement = view.value.read() as ElementTemplate;
        const outer = setupComponent(
          outerElement.tag as Parameters<typeof setupComponent>[0],
          outerElement.props,
        ) as ListTemplate;
        const outerRow = outer.entries.read()[0]!;
        const innerView = outer.render(
          () => outerRow.item,
          () => 9,
        ) as DynamicTemplate;
        const innerElement = innerView.value.read() as ElementTemplate;
        const inner = setupComponent(
          innerElement.tag as Parameters<typeof setupComponent>[0],
          innerElement.props,
        ) as ListTemplate;
        const output = inner.render(
          () => inner.entries.read()[0]!.item,
          () => 3,
        ) as ElementTemplate;
        expect(output.props.title).toBe('内层3');
      } finally {
        dispose();
      }
    });
  });
  it('row/index 跟随替换，普通局部值保留初始化语义', () => {
    const view = execute(`
      import { For as Each } from 'zerodep-js';
      const result = <Each each={[{ id: 1, name: 'A' }]} keyBy={(row) => row.id}>
        {(row, index) => { const initial = row.name; return <input title={row.name} data-index={index} data-initial={initial} />; }}
      </Each>;
    `) as DynamicTemplate;
    createRoot((dispose) => {
      try {
        const element = view.value.read() as ElementTemplate;
        const list = setupComponent(
          element.tag as Parameters<typeof setupComponent>[0],
          element.props,
        ) as ListTemplate;
        const row = new Source({ id: 1, name: 'A' });
        const index = new Source(0);
        const output = list.render(
          () => row.read(),
          () => index.read(),
        ) as ElementTemplate;
        expect(output.props.title).toBe('A');
        row.write({ id: 1, name: 'B' });
        index.write(2);
        expect(output.props.title).toBe('B');
        expect(output.props['data-index']).toBe(2);
        expect(output.props['data-initial']).toBe('A');
      } finally {
        dispose();
      }
    });
  });

  it('普通 render callback children 仍是函数，不被包装成自动执行内容', () => {
    const view = execute(`
      import { component } from 'zerodep-js';
      const Generic = component(({ children }) => children({ name: '真实值' }));
      const result = <Generic>{(row) => <span title={row.name} />}</Generic>;
    `) as DynamicTemplate;
    createRoot((dispose) => {
      try {
        const element = view.value.read() as ElementTemplate;
        const result = setupComponent(
          element.tag as Parameters<typeof setupComponent>[0],
          element.props,
        ) as DynamicTemplate;
        const output = result.value.read() as ElementTemplate;
        expect(output.props.title).toBe('真实值');
      } finally {
        dispose();
      }
    });
  });

  it('重复 key 在创建行之前给出错误，修复数据后可重新读取', () => {
    const result = execute(`
      import { For, $state } from 'zerodep-js';
      let rows = $state([{ id: 1 }, { id: 1 }]);
      const view = <For each={rows} keyBy={(row) => row.id}>{(row) => <b>{row.id}</b>}</For>;
      const result = { view, repair() { rows = [{ id: 2 }]; } };
    `) as { view: DynamicTemplate; repair: () => void };
    createRoot((dispose) => {
      try {
        const element = result.view.value.read() as ElementTemplate;
        const list = setupComponent(
          element.tag as Parameters<typeof setupComponent>[0],
          element.props,
        ) as ListTemplate;
        expect(() => list.entries.read()).toThrow('重复的列表 key');
        result.repair();
        expect(list.entries.read().map((entry) => entry.key)).toEqual([2]);
      } finally {
        dispose();
      }
    });
  });

  it.each([
    ['外部回调', '<For each={[]} keyBy={(x) => x}>{renderer}</For>', 'ZJ1400'],
    ['参数解构', '<For each={[]} keyBy={(x) => x}>{({ id }) => <b>{id}</b>}</For>', 'ZJ1400'],
    [
      '修改 index',
      '<For each={[1]} keyBy={(x) => x}>{(row, index) => { index++; return row; }}</For>',
      'ZJ1401',
    ],
  ])('明确诊断：%s', (_name, source, code) => {
    expect(() =>
      compile(`import { For } from 'zerodep-js'; const result = ${source};`, 'list.tsx'),
    ).toThrow(code);
  });
});
