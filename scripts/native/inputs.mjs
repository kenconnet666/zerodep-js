import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import { relative, resolve } from 'node:path';

export function nativeInputs(root) {
  const target = JSON.parse(
    readFileSync(resolve(root, 'scripts/language-services/typescript-target.json'), 'utf8'),
  );
  const goSource = resolve(root, 'packages/native/go');
  const patches = [resolve(root, target.patch), resolve(root, 'patches/zerodep-native.patch')];
  const files = [
    ...patches,
    ...readdirSync(goSource, { recursive: true, withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name.endsWith('.go'))
      .map((entry) => resolve(entry.parentPath, entry.name))
      .sort(),
  ];
  const hash = createHash('sha256');
  for (const file of files)
    hash.update(relative(root, file).replaceAll('\\', '/')).update(readFileSync(file));
  const sourceHash = hash.digest('hex');
  return {
    target,
    goSource,
    patches,
    sourceHash,
    version: `${target.version}+zerodep.native.${sourceHash.slice(0, 12)}`,
  };
}
