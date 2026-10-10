import { _createContext, _useContext } from 'zerodep-js';
import { createCssContext, type Css } from 'zerodep-js-css';
import { type UiTheme } from './theme/theme.js';
import type { UiLanguage } from './lang/types.js';
import type { UiLocale } from './locale.js';

// 模块只共享键；值和 CSS 作者由每个 Provider 的组件作用域持有。
export const themeContext = _createContext<() => UiTheme>();
export const languageContext = _createContext<UiLanguage>();
export const localeContext = _createContext<UiLocale>();
export const directionContext = _createContext<() => 'ltr' | 'rtl' | 'auto'>();
const cssContext = createCssContext<Css<UiTheme>>();
export const provideCss = cssContext.provideCss;

export function useCss(): Css<UiTheme> {
  if (!_useContext(themeContext)) throw new Error('useCss 需要上层 Provider。');
  return cssContext.useCss();
}

export function useLang(): UiLanguage {
  const value = _useContext(languageContext);
  if (!value) throw new Error('useLang 需要上层 Provider。');
  return value;
}

export function useLocale(): UiLocale {
  const value = _useContext(localeContext);
  if (!value) throw new Error('useLocale 需要上层 Provider。');
  return value;
}
