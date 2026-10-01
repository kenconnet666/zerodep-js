import { component, $state, $derived } from 'zerodep-js';

// 与编译器的条件别名回归配对，确认 TS7 并未跨宏调用提供收窄。

export const MacroConditions = component(({ user }: { user?: { name: string } }) => {
  const fromState = $state(Boolean(user));
  const fromDerived = $derived(user !== undefined);
  if (fromState) {
    // @ts-expect-error 宏的返回值不会向参数传播条件收窄。
    void user.name;
  }
  if (fromDerived) {
    // @ts-expect-error 派生的依赖关系也不是 TS 条件别名。
    void user.name;
  }
  return null;
});
