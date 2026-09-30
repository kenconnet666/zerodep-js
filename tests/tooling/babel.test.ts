import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';
import { transformAsync } from '@babel/core';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import { generate } from '@babel/generator';
import * as t from '@babel/types';
import { describe, expect, it } from 'vitest';

const configFile = fileURLToPath(new URL('../../babel.config.mjs', import.meta.url));

describe('Babel 8 tooling', () => {
  it('removes TypeScript types while preserving JSX, ESM, and source maps', async () => {
    const source = `
type Props = { label: string };
export function Button({ label }: Props) {
  return <button>{label}</button>;
}
`;
    const result = await transformAsync(source, { filename: 'probe.tsx', configFile });
    expect(result?.code).toContain('export function Button');
    expect(result?.code).toContain('<button>{label}</button>');
    expect(result?.code).not.toContain('type Props');
    expect(result?.code).not.toContain(': Props');
    expect(result?.map?.sources).toContain('probe.tsx');
    expect(result?.map?.mappings).not.toBe('');
    expect(result?.map?.sourcesContent).toContain(source);
  });

  it('resolves shadowed bindings and generates executable code after an AST edit', () => {
    const source = `
const count = 1;
function scale(count) { return count * 2; }
const result = count + scale(3);
`;
    const ast = parse(source, { sourceType: 'module', plugins: ['typescript', 'jsx'] });
    traverse(ast, {
      Program(path) {
        const binding = path.scope.getBinding('count');
        if (!binding || !binding.path.isVariableDeclarator()) {
          throw new Error('Missing outer variable binding.');
        }
        expect(binding.referencePaths).toHaveLength(1);
        binding.path.get('init').replaceWith(t.numericLiteral(2));
        path.scope.rename('count', 'outerCount');
      },
    });
    const { code } = generate(ast);
    expect(code).toContain('const outerCount = 2');
    expect(code).toContain('function scale(count)');
    expect(runInNewContext(code + '\nresult;')).toBe(8);
  });
});
