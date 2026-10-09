import { _component, _derived, _provideContext, _useContext, type JSX } from 'zerodep-js';
import { css, Css, lightTheme, type UiTheme } from 'zerodep-js-css';
import { zhCN } from './lang/zh-CN.js';
import type { UiLanguage } from './lang/types.js';
import { createLocale } from './locale.js';
import {
  directionContext,
  languageContext,
  localeContext,
  provideCss,
  themeContext,
} from './context.js';

export type ProviderProps = Omit<JSX.IntrinsicElements['div'], 'lang' | 'dir'> & {
  dir?: 'ltr' | 'rtl' | 'auto' | undefined;
  theme?: UiTheme | undefined;
  lang?: UiLanguage | undefined;
  locale?: string | undefined;
  timeZone?: string | undefined;
};

export const Provider = _component(
  ({ theme, lang, locale, timeZone, dir, class: className, children, ...rest }: ProviderProps) => {
    const parentTheme = _useContext(themeContext);
    const parentLanguage = _useContext(languageContext);
    const parentLocale = _useContext(localeContext);
    const parentDirection = _useContext(directionContext);
    const readTheme = () => theme ?? parentTheme?.() ?? lightTheme;
    const readLanguage = () => lang ?? parentLanguage ?? zhCN;
    const resolvedLocale = _derived(
      new Intl.Locale(locale ?? parentLocale?.locale ?? 'zh-CN').toString(),
    );
    // 校验并规范化时区，服务端和浏览器使用相同显式默认值。
    const resolvedTimeZone = _derived(
      new Intl.DateTimeFormat('en', {
        timeZone: timeZone ?? parentLocale?.timeZone ?? 'Asia/Shanghai',
      }).resolvedOptions().timeZone,
    );
    const language: UiLanguage = Object.freeze({
      get code() {
        return new Intl.Locale(readLanguage().code).toString();
      },
      get direction() {
        return readLanguage().direction;
      },
      get messages() {
        return readLanguage().messages;
      },
    });
    const direction = _derived(
      dir ?? (lang ? language.direction : (parentDirection?.() ?? language.direction)),
    );
    _provideContext(themeContext, readTheme);
    _provideContext(languageContext, language);
    _provideContext(
      localeContext,
      createLocale(
        () => resolvedLocale,
        () => resolvedTimeZone,
      ),
    );
    // 方向也通过 getter 继承，不能把初始字符串当作后续配置。
    _provideContext(directionContext, () => direction);
    const s = provideCss(new Css<UiTheme>(readTheme));

    return (
      <div
        {...rest}
        lang={language.code}
        dir={direction}
        class={css(
          s.colorScheme.raw(s.keywords.name),
          s.fontFamily._sans,
          s.fontSize._md,
          s.fontWeight._normal,
          s.lineHeight._normal,
          s.color._text,
          s.backgroundColor._background,
          className,
        )}
      >
        {children}
      </div>
    );
  },
);
