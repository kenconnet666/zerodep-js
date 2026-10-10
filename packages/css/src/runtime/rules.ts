import { joinFragments, type CssInput } from '../util/author.js';

/** 两路 32 位累积完整 UTF-16 输入；内容确定命名，冲突仍由登记器检查。 */
export function hash(text: string): string {
  let left = 2166136261;
  let right = 0x9e3779b9;
  for (let index = 0; index < text.length; index++) {
    const code = text.charCodeAt(index);
    left = Math.imul(left ^ code, 16777619);
    right = Math.imul(right ^ code, 0x85ebca6b);
  }
  return (left >>> 0).toString(36).padStart(7, '0') + (right >>> 0).toString(36).padStart(7, '0');
}

/** 纯标记，不登记样式；可在模块顶层创建，名称由作者明确分组。 */
export function className(name: string): string {
  const label = name.replace(/[^a-zA-Z0-9_-]+/g, '-').slice(0, 48);
  return `zm-${label || 'part'}-${hash(name)}`;
}

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
    mergeClasses(this: void, ...values: readonly (string | null | undefined | false)[]): string {
      const bodies: string[] = [];
      const external = new Set<string>();
      for (const value of values) {
        if (!value) continue;
        for (const name of value.split(/\s+/).filter(Boolean)) {
          const rule = byName.get(name);
          if (rule && (!rule.kind || rule.kind === 'class')) bodies.push(rule.body);
          else external.add(name);
        }
      }
      // 本宿主生成类按声明顺序合并；外部类名保留原样，遵循普通 CSS 层叠。
      return [bodies.length ? css(...bodies) : '', ...external].filter(Boolean).join(' ');
    },
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

/** 只处理 HTML raw-text 边界，声明的解析与层叠仍由浏览器负责。 */
export function serializeStyleRules(rules: readonly CssRule[]): string {
  return rules
    .map(ruleText)
    .join('')
    .replace(/<\/style/gi, (value) => '<\\/' + value.slice(2))
    .replace(/\r\n?/g, '\n')
    .replace(/\0/g, '\uFFFD');
}

export function serializeCssRules(rules: readonly CssRule[], options: { nonce?: string } = {}) {
  const nonce = options.nonce?.replace(
    /[&"<>]/g,
    (value) => ({ '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;' })[value]!,
  );
  return {
    cssText: serializeStyleRules(rules),
    manifest: JSON.stringify(rules).replace(/</g, '\\u003c'),
    nonceAttribute: nonce === undefined ? '' : ` nonce="${nonce}"`,
  };
}

export interface ServerCssHost {
  mergeClasses(...values: readonly (string | null | undefined | false)[]): string;
  css(...parts: CssInput[]): string;
  keyframes(...parts: CssInput[]): string;
  globalCss(key: string, ...parts: CssInput[]): void;
  readonly nonce?: string;
  rules(): CssRule[];
  cssText(): string;
}

export function createServerCssHost(options: { nonce?: string } = {}): ServerCssHost {
  const registry = createRuleRegistry(() => {});
  return {
    mergeClasses: registry.mergeClasses,
    css: registry.css,
    keyframes: registry.keyframes,
    globalCss: registry.globalCss,
    ...(options.nonce === undefined ? {} : { nonce: options.nonce }),
    rules: registry.rules,
    cssText: () => serializeStyleRules(registry.rules()),
  };
}
