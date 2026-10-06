import { expect, it } from 'vitest';
import { compile } from '../src/index.js';

const code = `import { _component, _state } from 'zerodep-js';
export const App = _component(() => {
  let count = _state(0);
  return <button onClick={() => count++}>标签：{count}</button>;
});`;

function fingerprint(source: string): string {
  const result = compile(source, '/app/App.tsx', { development: true }).code;
  return result.match(/"([a-f0-9]{24})"/)![1]!;
}

it('开发转换保留宏和 JSX 语义，生产不注入调试协议', () => {
  const development = compile(code, '/app/App.tsx', { development: true }).code;
  expect(development).toContain('zerodep-js/devtools');
  expect(development).toContain('import.meta.hot.accept(');
  expect(development).toMatch(/\.state\("App", "count",/);
  expect(development).toContain('.update(count, true, false)');
  expect(development).not.toContain('_state(');
  const production = compile(code, '/app/App.tsx').code;
  expect(production).not.toMatch(/devtools|import\.meta\.hot|\.finish\(/);
});

it('文案、格式和注释不重置状态，改变声明名称/类型/初值则重置', () => {
  expect(fingerprint(code.replace('标签', '文案'))).toBe(fingerprint(code));
  expect(fingerprint(code.replace('let count', '// 注释\n  let count'))).toBe(fingerprint(code));
  expect(fingerprint(code.replace('_state(0)', '_state(1)'))).not.toBe(fingerprint(code));
  expect(fingerprint(code.replace('_state(0)', '_state<number | undefined>(0)'))).not.toBe(
    fingerprint(code),
  );
  expect(fingerprint(code.replaceAll('count', 'quantity'))).not.toBe(fingerprint(code));
});

it('混合运行时导出交由导入方处理，default 可接收，类型导出不生成无效值引用', () => {
  expect(
    compile(code + '\nexport const extra=1;', 'mixed.tsx', { development: true }).code,
  ).toMatch(/\.finish\([\s\S]*false\)/);
  expect(compile(code, 'server.tsx', { development: true, hmr: false }).code).not.toContain(
    'import.meta.hot',
  );
  const defaultCode = compile(
    `import {_component,_state} from 'zerodep-js';
    export default _component(() => {let n=_state(0);return <p>{n}</p>;});`,
    'Default.tsx',
    { development: true },
  ).code;
  expect(defaultCode).toContain('import.meta.hot.accept(');
  const typed = compile(code + '\ntype Props = {name:string}; export {Props};', 'typed.tsx', {
    development: true,
  }).code;
  expect(typed).not.toMatch(/"Props": Props/);
  expect(compile('export const answer = 1;', 'plain.ts', { development: true }).code).not.toContain(
    'devtools',
  );
});
