interface StateMacro {
  <T>(initial: T): T;
  <T = undefined>(): T | undefined;
  raw: {
    <T>(initial: T): T;
    <T = undefined>(): T | undefined;
  };
}

interface DerivedMacro {
  <T>(expression: T): T;
  by<T>(calculate: () => T): T;
}

function requireCompiler(name: string): never {
  throw new Error(`${name} 必须经过 zerodep-js 编译器转换，请检查构建插件是否生效。`);
}

/** 类型入口保持普通值；未编译时立即失败，不能悄悄生成不更新的页面。 */
export const $state: StateMacro = Object.assign(() => requireCompiler('$state'), {
  raw: () => requireCompiler('$state.raw'),
});

export const $derived: DerivedMacro = Object.assign(() => requireCompiler('$derived'), {
  by: () => requireCompiler('$derived.by'),
});
