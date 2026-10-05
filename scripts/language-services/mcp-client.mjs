import { spawn } from 'node:child_process';
import { jsonLineConnection } from './json-lines.mjs';

/** 本项目验证和检查脚本使用的 stdio 客户端，只协商只读工具能力。 */
export async function connectMcp(config, name, log = () => {}) {
  const child = spawn(config.command, config.args, {
    cwd: config.cwd,
    stdio: ['pipe', 'pipe', 'pipe'],
    windowsHide: true,
  });
  const connection = jsonLineConnection(child.stdout, child.stdin);
  child.stderr.on('data', log);
  const exited = new Promise((resolve) => {
    child.once('exit', resolve);
    child.once('error', resolve);
  });
  child.on('error', () => connection.dispose());
  child.on('exit', () => connection.dispose());
  connection.onClose(() => connection.dispose());
  connection.listen();
  let closed = false;
  const client = {
    async request(method, params = {}, timeout = 90000) {
      let timer;
      try {
        return await Promise.race([
          connection.sendRequest(method, params),
          new Promise((_, reject) => {
            timer = setTimeout(
              () => reject(new Error('MCP request timed out: ' + method)),
              timeout,
            );
          }),
        ]);
      } finally {
        clearTimeout(timer);
      }
    },
    async close() {
      if (closed) return;
      closed = true;
      child.stdin.end();
      const timer = setTimeout(() => child.kill(), 2000);
      try {
        await exited;
      } finally {
        clearTimeout(timer);
        connection.dispose();
      }
    },
  };
  try {
    const initialized = await client.request(
      'initialize',
      {
        protocolVersion: '2025-11-25',
        capabilities: {},
        clientInfo: { name, version: '1' },
      },
      60000,
    );
    if (initialized.protocolVersion !== '2025-11-25' || !initialized.capabilities?.tools)
      throw new Error('MCP server did not negotiate the project tool protocol.');
    await connection.sendNotification('notifications/initialized', {});
    return client;
  } catch (error) {
    await client.close();
    throw error;
  }
}
