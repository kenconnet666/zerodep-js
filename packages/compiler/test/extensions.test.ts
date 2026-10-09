import { expect, it } from 'vitest';
import * as t from '@babel/types';
import { compile, type CompileExtension } from '../src/index.js';

const extension: CompileExtension = {
  name: 'tracked-fixture',
  prepare() {
    return {
      derived(path) {
        return (
          t.isCallExpression(path.node.init) &&
          t.isIdentifier(path.node.init.callee, { name: 'tracked' })
        );
      },
      elementProps(_node, attrs) {
        return t.callExpression(t.identifier('decorate'), [attrs]);
      },
    };
  },
};
it('扩展复用命名派生、JSX 属性与源码映射', () => {
  const source = `import {_component,_state} from 'zerodep-js'; const App=_component(()=>{ let n=_state(1); const text=tracked(n); return <div>{text}</div>; });`;
  const result = compile(source, 'extension.tsx', { extensions: [extension] });
  expect(result.code).toContain('.derived(');
  expect(result.code).toContain('decorate(');
  expect(result.code).toContain('text.read()');
  expect(result.map?.sourcesContent).toContain(source);
  expect(compile(source, 'extension.tsx').code).not.toContain('decorate(');
});
it('扩展声明沿用 const 与只读检查', () => {
  expect(() =>
    compile(
      `import {_component} from 'zerodep-js'; const App=_component(()=>{let x=tracked(1);return <div>{x}</div>;});`,
      'extension.tsx',
      { extensions: [extension] },
    ),
  ).toThrow('ZJ1600');
});
