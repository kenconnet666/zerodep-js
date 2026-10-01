import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { compile } from 'zerodep-js-compiler';

const source = await readFile('library/Counter.tsx', 'utf8');
const result = compile(source, 'Counter.tsx');
await mkdir('library/dist', { recursive: true });
await writeFile('library/dist/Counter.js', result.code + '\n//# sourceMappingURL=Counter.js.map\n');
await writeFile('library/dist/Counter.js.map', JSON.stringify({ ...result.map, sourceRoot: '..' }));
