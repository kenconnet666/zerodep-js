import { describe, expect, it } from 'vitest';
import { compile } from '../src/index.js';
import { execute } from './execute.js';

describe('静态命名空间导入', () => {
  it('命名空间 state/derived、raw/by 和 component 使用同一转换', () => {
    expect(
      execute(`
      import * as Z from 'zerodep-js';
      let count = Z.$state(1);
      const doubled = Z.$derived.by(() => count * 2);
      let raw = Z['$state'].raw({ n: 1 });
      const App = Z.component(() => <span>{doubled}</span>);
      count++; raw = { n: 2 };
      const result = [count, doubled, raw.n, typeof App];
    `),
    ).toEqual([2, 4, 2, 'function']);
  });

  it('For 标签可以使用命名空间，局部遮蔽保持普通 JS', () => {
    const result = compile(
      `
      import * as Z from 'zerodep-js';
      const view = <Z.For each={[1]} keyBy={(n) => n}>{(row, index) => <b>{row + index}</b>}</Z.For>;
      function local(Z) { return Z.$state(2); }
    `,
      'namespace.tsx',
    );
    expect(result.code).toContain('.liveRender');
    expect(result.code).toContain('return Z.$state(2)');
  });
});

describe('实时绑定与控制流收窄', () => {
  it('同步立即调用不会被误当作延后回调', () => {
    expect(() =>
      compile(
        `import { component } from 'zerodep-js'; const App = component(({ user }) => user ? (() => <span>{user.name}</span>)() : null);`,
        'immediate.tsx',
      ),
    ).not.toThrow();
  });
  const prefix = `import { component, $state, $derived } from 'zerodep-js';`;
  it.each([
    [
      '外层 if',
      `const App = component(({ user }) => { if (user) return <button onClick={() => user.name} />; return null; });`,
    ],
    [
      '提前返回',
      `const App = component(({ user }) => { if (!user) return null; return <button onClick={() => user.name} />; });`,
    ],
    [
      'JSX 条件',
      `const App = component(({ user }) => <>{user ? <button onClick={() => user.name} /> : null}</>);`,
    ],
    [
      '初始化提前返回后的动态文本',
      `const App = component(({ user }) => { if (!user) return null; return <span>{user.name}</span>; });`,
    ],
    [
      '初始化分支后的直接返回',
      `const App = component(({ user }) => { if (user) return user.name; return null; });`,
    ],
    [
      '普通局部条件没有持续选择语义',
      `const App = component(({ user }) => { const view = user ? <span>{user.name}</span> : null; return view; });`,
    ],
    ['派生 const', `const user = $derived(source()); if (user) register(() => user.name);`],
    [
      'await 后读取',
      `const App = component(({ user }) => <button onClick={async () => { if (!user) return; await work(); return user.name; }} />);`,
    ],
    [
      '未检查局部别名',
      `const App = component(({ user }) => user ? <button onClick={() => { const current = user; return current.name; }} /> : null);`,
    ],
    [
      '伪装局部检查',
      `const App = component(({ user }) => user ? <button onClick={() => { if (user.name) return user.name; }} /> : null);`,
    ],
    [
      '丢失可辨识联合条件',
      `const App = component(({ item }) => item.kind === 'ready' ? <button onClick={() => { const current = item; if (current) return current.result; }} /> : null);`,
    ],
    [
      'typeof 不能替代判空',
      `const App = component(({ user }) => user ? <button onClick={() => { const current = user; if (typeof current === 'object') return current.name; }} /> : null);`,
    ],
  ])('拒绝 %s', (_name, source) => {
    expect(() => compile(prefix + source, 'unsafe.tsx')).toThrow('ZJ1501');
  });

  it.each([
    [
      '派生布尔值不是其输入的 TypeScript 条件别名',
      `const App = component(({ task }) => { let draft = $state(''); const dirty = $derived(draft !== task.title); return dirty && <button onClick={() => { draft = task.title; }} />; });`,
    ],
    [
      '状态初始化不建立 TypeScript 条件别名',
      `const App = component(({ user }) => { const enabled = $state(Boolean(user)); return enabled && <button onClick={() => user.name} />; });`,
    ],
    [
      '回调内重新读取和检查',
      `const App = component(({ user }) => user ? <button onClick={() => { const current = user; if (current) return current.name; }} /> : null);`,
    ],
    [
      '回调内 guard',
      `const App = component(({ user }) => user ? <button onClick={() => { if (!user) return; return user.name; }} /> : null);`,
    ],
    [
      '显式稳定快照',
      `const App = component(({ user }) => { const current = user; if (!current) return null; return <button onClick={() => current.name} />; });`,
    ],
    [
      '同一渲染表达式',
      `const App = component(({ user }) => user ? <span>{user.name}</span> : null);`,
    ],
    [
      '初始化分支内显式捕获快照',
      `const App = component(({ user }) => { if (!user) return null; const current = user; return <span>{current.name}</span>; });`,
    ],
    [
      '渲染表达式自己重新判空',
      `const App = component(({ user }) => { if (!user) return null; return <span>{user ? user.name : ''}</span>; });`,
    ],
    [
      '不相关分支',
      `const App = component(({ enabled, user }) => enabled ? <button onClick={() => user.name} /> : null);`,
    ],
    [
      'await 后新检查',
      `const App = component(({ user }) => <button onClick={async () => { await work(); const current = user; if (current) return current.name; }} />);`,
    ],
    [
      '局部重新检查判别字段',
      `const App = component(({ item }) => item.kind === 'ready' ? <button onClick={() => { const current = item; if (current.kind === 'ready') return current.result; }} /> : null);`,
    ],
    [
      'props 对象保持原生属性读取规则',
      `const App = component((props) => props.user ? <button onClick={() => { const current = props.user; if (current) return current.name; }} /> : null);`,
    ],
  ])('允许 %s', (_name, source) => {
    expect(() => compile(prefix + source, 'safe.tsx')).not.toThrow();
  });
});
