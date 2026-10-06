import { afterAll } from 'vitest';
import { closeCompiler } from '../../packages/native/src/index.js';

// 每个测试文件释放自己使用的单文件编译服务，避免工作进程退出前残留 Go 子进程。
afterAll(() => closeCompiler());
