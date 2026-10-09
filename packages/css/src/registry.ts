import { hash } from './names.js';
import { joinFragments, type CssInput } from './fragments.js';
export type { CssInput } from './fragments.js';

export interface CssRule {
  className: string;
  body: string;
  kind?: 'class' | 'keyframes' | 'global';
  key?: string;
}

export function ruleText(rule: CssRule): string {
  if (rule.kind === 'global') return rule.body;

  if (rule.kind === 'keyframes') return `@keyframes ${rule.className}{${rule.body}}`;
  return `.${rule.className}{${rule.body}}`;
}

function ruleName(kind: CssRule['kind'], body: string, key?: string): string {
  return `${kind === 'keyframes' ? 'zk' : kind === 'global' ? 'zg' : 'z'}-${hash(kind === 'global' ? key! : body)}`;
}

/** 普通类与动画内容不可变；全局块按 key 更新，保留 Map 中的原有次序。 */
export function createRuleRegistry(
  insert: (className: string, body: string, rule: CssRule) => void,
  updateGlobal: (key: string, rule?: CssRule) => void = () => {},
  onGrowth?: (size: number) => void,
) {
  let byContent = { class: new Map<string, string>(), keyframes: new Map<string, string>() };
  let byName = new Map<string, CssRule>();
  let globals = new Map<string, CssRule>();
  const grew = () => onGrowth?.(byName.size + globals.size);

  function register(body: string, kind: 'class' | 'keyframes'): string {
    const content = byContent[kind];
    const existing = content.get(body);
    if (existing) return existing;
    const name = ruleName(kind, body);
    if (byName.has(name)) throw new Error('CSS class hash collision.');
    const rule: CssRule =
      kind === 'class' ? { className: name, body } : { className: name, body, kind };
    insert(name, body, rule);

    // 已知名字由上面生成；成功写入后直接登记，不再重复计算哈希。
    content.set(body, name);
    byName.set(name, rule);
    grew();
    return name;
  }

  function resolvePart(input: CssInput): string {
    if (typeof input === 'string') {
      // 仅本库样式类使用 z- 前缀，仍以登记表精确匹配为准。
      return (input.startsWith('z-') ? byName.get(input)?.body : undefined) ?? input;
    }
    return input ? input.map(resolvePart).join('') : '';
  }

  const css = (...parts: CssInput[]) => {
    // rest 数组归本次调用所有；复用它，普通字符串路径不另建展开数组。
    for (let index = 0; index < parts.length; index++) parts[index] = resolvePart(parts[index]);
    const body = parts.join('');
    return register(body, 'class');
  };
  return {
    css,
    keyframes: (...parts: CssInput[]) => register(joinFragments(parts), 'keyframes'),
    globalCss(this: void, key: string, ...parts: CssInput[]): void {
      if (!parts.length) {
        if (globals.has(key)) {
          updateGlobal(key);
          globals.delete(key);
        }
        return;
      }
      const body = joinFragments(parts);
      if (globals.get(key)?.body === body) return;
      const rule: CssRule = { kind: 'global', key, className: ruleName('global', body, key), body };
      updateGlobal(key, rule);
      const added = !globals.has(key);
      globals.set(key, rule);
      if (added) grew();
    },
    hydrate(rules: readonly CssRule[]): void {
      const nextContent = {
        class: new Map(byContent.class),
        keyframes: new Map(byContent.keyframes),
      };
      const nextNames = new Map(byName);
      const nextGlobals = new Map(globals);
      for (const rule of rules) {
        const kind = rule.kind ?? 'class';
        if (
          !['class', 'keyframes', 'global'].includes(kind) ||
          typeof rule.body !== 'string' ||
          (kind === 'global' && typeof rule.key !== 'string') ||
          rule.className !== ruleName(kind, rule.body, rule.key)
        )
          throw new Error('CSS class does not match its body.');
        if (kind === 'global') {
          if (nextGlobals.has(rule.key!) && nextGlobals.get(rule.key!)?.body !== rule.body)
            throw new Error('CSS global key has conflicting content.');
          nextGlobals.set(rule.key!, { ...rule });
        } else {
          if (nextNames.has(rule.className) && nextNames.get(rule.className)?.body !== rule.body)
            throw new Error('CSS class hash collision.');
          nextContent[kind].set(rule.body, rule.className);
          nextNames.set(rule.className, { ...rule });
        }
      }
      byContent = nextContent;
      byName = nextNames;
      globals = nextGlobals;
      grew();
    },
    rules(this: void): CssRule[] {
      return [...globals.values(), ...byName.values()].map((rule) => ({
        ...rule,
      }));
    },
    get size() {
      return byName.size + globals.size;
    },
    stats() {
      return {
        rules: byName.size + globals.size,
        classes: byContent.class.size,
        animations: byContent.keyframes.size,
        globals: globals.size,
      };
    },
  };
}
