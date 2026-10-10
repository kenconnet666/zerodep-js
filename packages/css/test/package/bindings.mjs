import { cssBinding } from '../../dist/index.js';

// 调用真实编译器入口，只摘取断言所需结果，不复制绑定实现。
export function bindValue(author, property, member, value, variable) {
  const result = cssBinding(author, property, member, () => value, variable);
  return {
    declaration: result.declaration,
    ...(result.value === undefined ? {} : { value: result.value }),
  };
}
