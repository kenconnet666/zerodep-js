interface StateMacro {
  <T>(initial: T): T;
  <T = undefined>(): T | undefined;
  raw: {
    <T>(initial: T): T;
    <T = undefined>(): T | undefined;
  };
}

interface DerivedMacro {
  /** 同步纯计算；可直接解构为只读派生字段，普通函数参数与返回仍按值处理。 */
  <T>(expression: T): T;
  /** 多语句计算与表达式使用相同依赖跟踪；解构结果共享一次计算和原生解构。 */
  by<T>(calculate: () => T): T;
}

function requireCompiler(name: string): never {
  throw new Error(`${name} 必须经过 zerodep-js 编译器转换，请检查构建插件是否生效。`);
}

/** 类型入口保持普通值；未编译时立即失败，不能悄悄生成不更新的页面。 */
export const _state: StateMacro = Object.assign(() => requireCompiler('_state'), {
  raw: () => requireCompiler('_state.raw'),
});

export const _derived: DerivedMacro = Object.assign(() => requireCompiler('_derived'), {
  by: () => requireCompiler('_derived.by'),
});
