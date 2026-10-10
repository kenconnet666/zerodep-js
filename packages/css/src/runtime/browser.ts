import type { ServerCssHost } from './collector.js';
import { createRuleRegistry, ruleText, type CssRule, type CssInput } from './registry.js';
import { serializeStyleRules } from './serialization.js';

export interface BrowserCssOptions {
  nonce?: string;
  insertionPoint?: HTMLElement;
  /** 可选规则数量提示线；只提示一次，不拒绝登记，也不删除规则。 */
  warnAfter?: number;
}
const options = new WeakMap<Document, BrowserCssOptions>();
const hosts = new WeakMap<Document, ReturnType<typeof createHost>>();

/** 在应用首次登记 / 恢复前配置一次；insertionPoint 指定插在该节点后面。 */
export function configureCss(value: BrowserCssOptions, target: Document = document): void {
  if (hosts.has(target)) throw new Error('Configure CSS before registration or hydration.');
  if (
    value.warnAfter !== undefined &&
    (!Number.isSafeInteger(value.warnAfter) || value.warnAfter < 1)
  )
    throw new Error('CSS warnAfter must be a positive safe integer.');
  if (value.insertionPoint && value.insertionPoint.parentNode !== target.head)
    throw new Error('CSS insertion point must belong to this document head.');
  options.set(target, { ...value });
}

function createHost(target: Document) {
  const config = options.get(target) ?? {};
  let style = target.querySelector<HTMLStyleElement>('style[data-zerodep-css]');
  const nonce = config.nonce ?? style?.nonce;
  const globals = new Map<string, HTMLStyleElement>();
  let warned = false;
  function tag() {
    const node = target.createElement('style');
    if (nonce) node.nonce = nonce;
    return node;
  }
  function main() {
    const node = tag();
    node.dataset.zerodepCss = '';
    const marker = config.insertionPoint;
    target.head.insertBefore(node, marker?.parentNode === target.head ? marker.nextSibling : null);
    return node;
  }
  style ??= main();
  function updateGlobal(key: string, rule?: CssRule) {
    if (!rule) {
      globals.get(key)?.remove();
      globals.delete(key);
      return;
    }
    let node = globals.get(key);
    if (!node?.isConnected) {
      node = tag();
      node.dataset.zerodepGlobal = rule.className;
      target.head.insertBefore(node, style);
      globals.set(key, node);
    }
    node.textContent = rule.body;
  }
  const registry = createRuleRegistry(
    (_name, _body, rule) => {
      const sheet = style!.sheet;
      if (!sheet) throw new Error('CSS stylesheet is unavailable.');
      sheet.insertRule(ruleText(rule), sheet.cssRules.length);
    },
    updateGlobal,
    config.warnAfter === undefined
      ? undefined
      : (size) => {
          if (!warned && size >= config.warnAfter!) {
            warned = true;
            console.warn(
              `[zerodep-css] ${size} rules registered. Inspect cssStats() and use implicit CSS variables for continuously changing values.`,
            );
          }
        },
  );

  function rebuild() {
    if (!style!.isConnected) style = main();
    const rules = registry.rules();
    // 全局块位于普通类之前；更新自身文本不重写普通类所在样式表。
    style!.textContent = serializeStyleRules(rules.filter((rule) => rule.kind !== 'global'));
    for (const node of globals.values()) node.remove();
    globals.clear();
    for (const rule of rules) if (rule.kind === 'global') updateGlobal(rule.key!, rule);
  }
  return {
    registry,
    rebuild,
    globals,
    get style() {
      return style!;
    },
  };
}

function getHost(target: Document) {
  const existing = hosts.get(target);
  if (existing) {
    if (!existing.style.isConnected) existing.rebuild();
    return existing;
  }
  const host = createHost(target);
  hosts.set(target, host);
  return host;
}

/** 浏览器文档共享规则；每次调用只注册尚未出现的声明组合。 */
export function css(...parts: CssInput[]): string {
  if (typeof document === 'undefined') throw new Error('CSS browser host is unavailable.');
  return getHost(document).registry.css(...parts);
}

/** 合并本宿主样式类并保留外部类名；不把外部类名当 CSS 声明。 */
export function _mergeClasses(...values: readonly (string | null | undefined | false)[]): string {
  return getHost(document).registry.mergeClasses(...values);
}

export const keyframes = (...parts: CssInput[]): string =>
  getHost(document).registry.keyframes(...parts);
export function globalCss(key: string, ...parts: CssInput[]): void {
  const host = getHost(document);
  if (host.globals.has(key) && !host.globals.get(key)!.isConnected) host.rebuild();
  host.registry.globalCss(key, ...parts);
}

/** 仅用于整个应用宿主退出；不能在任意子组件卸载时调用。 */
export function disposeCss(target: Document = document): void {
  const host = hosts.get(target);
  host?.style.remove();
  if (host) for (const node of host.globals.values()) node.remove();
  hosts.delete(target);
  options.delete(target);
}
export function cssStats(target: Document = document) {
  const host = hosts.get(target);
  return {
    ...(host?.registry.stats() ?? { rules: 0, classes: 0, animations: 0, globals: 0 }),
    connected: host?.style.isConnected ?? false,
  };
}

/** 必须先把服务端的 style[data-zerodep-css] 放入页面，再登记其规则。 */
export function hydrateCss(rules?: readonly CssRule[], target: Document = document): void {
  const manifest =
    rules === undefined
      ? target.querySelector('script[data-zerodep-css][type="application/json"]')
      : null;
  if (rules === undefined) {
    if (!manifest) return; // 纯客户端页面没有需要恢复的服务端清单。
    const parsed: unknown = JSON.parse(manifest.textContent ?? '');
    if (
      !Array.isArray(parsed) ||
      !parsed.every(
        (rule) => rule && typeof rule.className === 'string' && typeof rule.body === 'string',
      )
    )
      throw new Error('Invalid CSS hydration manifest.');
    rules = parsed;
  }
  if (hosts.has(target)) throw new Error('CSS hydration must precede client registration.');
  const style = target.querySelector('style[data-zerodep-css]');
  if (!style) throw new Error('CSS hydration stylesheet is missing.');
  const expected = serializeStyleRules(rules);
  if (style.textContent !== expected)
    throw new Error('CSS hydration manifest does not match styles.');
  try {
    const host = getHost(target);
    host.registry.hydrate(rules);
    if (rules.some((rule) => rule.kind === 'global')) host.rebuild();
  } catch (error) {
    // 清单校验失败不占用文档宿主，修正清单后仍可重新恢复。
    hosts.delete(target);
    throw error;
  }
  manifest?.remove();
}

/** 请求异步隔离只支持 Node SSR；浏览器直接使用文档宿主。 */
export function withCssHost<T>(_host: ServerCssHost, _render: () => T): T {
  throw new Error('withCssHost requires the Node SSR environment.');
}
