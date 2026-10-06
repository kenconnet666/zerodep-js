import { expect, it } from 'vitest';
import { randomUUID } from 'node:crypto';
import { serviceAddress, workspaceRoot } from '../src/client.js';

it('服务地址使用系统支持的 IPC 命名空间', () => {
  const { endpoint } = serviceAddress(workspaceRoot('.'));
  if (process.platform === 'win32')
    expect([...endpoint.slice(0, 9)].map((c) => c.charCodeAt(0))).toEqual([
      92, 92, 46, 92, 112, 105, 112, 101, 92,
    ]);
});

it('错误的工作目录不能静默扩大为父目录或整个磁盘', () => {
  expect(() => workspaceRoot('package.json')).toThrow('现有目录');
  expect(() => workspaceRoot('.missing-workspace-' + randomUUID())).toThrow();
});
