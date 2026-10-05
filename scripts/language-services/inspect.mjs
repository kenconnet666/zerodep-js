import { directory, root } from './environment.mjs';
import { resolve } from 'node:path';
import { connectMcp } from './mcp-client.mjs';
const files = process.argv.slice(3);
if (!files.length) throw new Error('Usage: node inspect.mjs <repository> <file> [file...]');
// 只在失败时输出最近服务日志；不把启动日志当作诊断结论。
let log = '';
const client = await connectMcp(
  { command: process.execPath, args: [resolve(directory, 'server.mjs'), root], cwd: root },
  'zerodep-file-inspection',
  (data) => {
    log = (log + data).slice(-8000);
  },
);
try {
  for (const filePath of files) {
    const result = await client.request('tools/call', {
      name: 'diagnostics',
      arguments: { filePath },
    });
    if (result.isError) throw new Error(result.content?.[0]?.text ?? 'Diagnostic request failed');
    const report = JSON.parse(result.content[0].text);
    if (!report.complete) throw new Error('Incomplete diagnostic result: ' + filePath);
    console.log(JSON.stringify(report));
    if (report.errors) process.exitCode = 2;
  }
} catch (error) {
  console.error(log);
  console.error(error);
  process.exitCode = 1;
} finally {
  await client.close();
}
