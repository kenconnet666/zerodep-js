// 独立开发入口：只由开发编译输出引用，core 根入口不引入此模块。
import { createSession, type Session } from './dev/runtime.js';
import { installInspector } from './dev/inspector.js';

export function begin(file: string): Session {
  installInspector();
  return createSession(file);
}
