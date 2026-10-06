import { afterAll, vi } from 'vitest';
import { closeCompiler } from '../../packages/native/src/index.js';

// 两种后端运行同一份语义、诊断与映射断言；CLI 另做项目级集成验证。
vi.mock('../../packages/compiler/src/index.js', () => import('../../packages/native/src/index.js'));
afterAll(() => closeCompiler());
