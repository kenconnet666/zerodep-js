import { createRuleRegistry, type CssRule, type CssInput } from './registry.js';
import { serializeStyleRules } from './serialization.js';

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
