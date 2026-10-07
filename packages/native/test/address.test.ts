import { expect, it } from 'vitest';
import { randomUUID } from 'node:crypto';
import { workspaceRoot } from '../src/paths.js';

it('错误的工作目录不能静默扩大为父目录或整个磁盘', () => {
  expect(() => workspaceRoot('package.json')).toThrow('现有目录');
  expect(() => workspaceRoot('.missing-workspace-' + randomUUID())).toThrow();
});
