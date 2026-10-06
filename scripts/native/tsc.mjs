// 工作区自举直接读取可由 Node 24 执行的路径解析器，不依赖已构建的 Node 适配包。
import { spawn } from 'node:child_process';
import { compilerPath } from '../../packages/native/src/binary.ts';

const child = spawn(compilerPath(), process.argv.slice(2), { stdio: 'inherit', windowsHide: true });
child.on('error', (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
child.on('exit', (code) => {
  process.exitCode = code ?? 1;
});
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
