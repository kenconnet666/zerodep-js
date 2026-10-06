import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import { basename, resolve } from 'node:path';

export function nativeInputs(root) {
  const target = JSON.parse(
    readFileSync(resolve(root, 'scripts/language-services/typescript-target.json'), 'utf8'),
  );
  const goSource = resolve(root, 'packages/native/go/zerodep');
  const patches = [resolve(root, target.patch), resolve(root, 'patches/zerodep-native.patch')];
  const files = [
    ...patches,
    ...readdirSync(goSource)
      .sort()
      .map((name) => resolve(goSource, name)),
  ];
  const hash = createHash('sha256');
  for (const file of files) hash.update(basename(file)).update(readFileSync(file));
  const sourceHash = hash.digest('hex');
  return {
    target,
    goSource,
    patches,
    sourceHash,
    version: `${target.version}+zerodep.native.${sourceHash.slice(0, 12)}`,
  };
}
