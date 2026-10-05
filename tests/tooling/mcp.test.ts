import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { resolve } from 'node:path';
import { createInterface } from 'node:readline';
import { expect, it } from 'vitest';

const root = resolve(import.meta.dirname, '../..');

it('真实 stdio 握手、工具发现、输入拒绝和错误帧恢复不依赖 SDK', async () => {
  const child = spawn(process.execPath, ['scripts/language-services/server.mjs', root], {
    cwd: root,
    stdio: ['pipe', 'pipe', 'pipe'],
    windowsHide: true,
  });
  const exited = once(child, 'exit');
  const lines = createInterface({ input: child.stdout });
  const replies = lines[Symbol.asyncIterator]();
  let log = '';
  child.stderr.on('data', (data) => {
    log += data;
  });
  let id = 0;
  async function raw(text: string) {
    child.stdin.write(text + '\n');
    const response = await replies.next();
    expect(response.done, log).not.toBe(true);
    return JSON.parse(response.value!) as {
      jsonrpc: string;
      id: number | null;
      error?: { code: number };
      result?: {
        protocolVersion?: string;
        capabilities?: { tools?: object };
        tools?: { name: string; inputSchema: { required: string[] } }[];
        isError?: boolean;
      };
    };
  }
  async function request(method: string, params: unknown = {}) {
    const requestId = ++id;
    const response = await raw(JSON.stringify({ jsonrpc: '2.0', id: requestId, method, params }));
    expect(response.jsonrpc).toBe('2.0');
    expect(response.id).toBe(requestId);
    return response;
  }
  try {
    expect((await raw('{bad json')).error?.code).toBe(-32700);
    expect((await raw('[]')).error?.code).toBe(-32600);
    expect((await request('tools/list')).error?.code).toBe(-32000);
    const initialized = await request('initialize', {
      protocolVersion: '2025-11-25',
      clientInfo: { name: '协议测试 🚀', version: '1' },
      capabilities: {},
    });
    expect(initialized.result?.protocolVersion).toBe('2025-11-25');
    expect(initialized.result?.capabilities?.tools).toEqual({});
    child.stdin.write(
      JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n',
    );
    const listed = (await request('tools/list')).result?.tools;
    expect(listed?.map((tool) => tool.name).sort()).toEqual([
      'completions',
      'definitions',
      'diagnostics',
      'hover',
      'references',
    ]);
    expect(listed?.find((tool) => tool.name === 'hover')?.inputSchema.required).toEqual([
      'filePath',
      'line',
      'column',
    ]);
    expect((await request('missing-method')).error?.code).toBe(-32601);
    expect((await request('tools/call', { name: 'missing-tool' })).error?.code).toBe(-32602);
    for (const args of [
      {},
      { filePath: 'package.json', line: 0, column: 1 },
      { filePath: 'package.json', line: 1.5, column: 1 },
      { filePath: 'package.json', line: 1, column: 1, unknown: true },
      { filePath: 'package.json', line: '1', column: 1 },
    ]) {
      expect(
        (await request('tools/call', { name: 'hover', arguments: args })).result?.isError,
      ).toBe(true);
    }
    expect((await request('ping')).result).toEqual({});
  } finally {
    child.stdin.end();
    const timer = setTimeout(() => child.kill(), 2000);
    try {
      await exited;
    } finally {
      clearTimeout(timer);
      lines.close();
    }
  }
}, 15000);
