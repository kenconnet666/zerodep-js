import {
  _component,
  _derived,
  _provideContext,
  _useContext,
  _portalClassContext,
  type JSX,
} from 'zerodep-js';
import { css, Css, bx, _themeStyle, type CssValue } from 'zerodep-js-css';
import { lightTheme } from './theme/light.js';
import type { UiTheme } from './theme/theme.js';
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
export type ProviderProps = Omit<JSX.IntrinsicElements['div'], 'lang' | 'dir' | 'size'> & {
  /** 字号基准；根默认 _md，嵌套未指定时继承 DOM 父级，Portal 需显式桥接。 */
  size?: CssValue<'fontSize', UiTheme>;
  dir?: 'ltr' | 'rtl' | 'auto' | undefined;
  theme?: UiTheme | undefined;
  lang?: UiLanguage | undefined;
  locale?: string | undefined;
  timeZone?: string | undefined;
};
export const Provider = _component(
  ({
    theme,
    lang,
    locale,
    timeZone,
    dir,
    size,
    class: className,
    children,
    ...rest
  }: ProviderProps) => {
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
    _provideContext(_portalClassContext, () => _themeStyle(s));
    const style = _derived([
      _themeStyle(s),
      css(() => {
        // 系统控件使用当前亮/暗配色方案；字体与字号为整棵子树建立排版基准。
        s.colorScheme(s.keywords.name);
        s.fontFamily('_sans');
        // 根 Provider 默认 _md，嵌套 Provider 未传 size 时继承，避免重置局部字号。
        s.fontSize(bx(size ?? (parentTheme ? 'inherit' : '_md')));
        s.fontWeight('_normal').lineHeight('_normal');

        // 前景与背景来自同一主题，通过主题变量更新；子组件仍可各自覆盖。
        s.color('_text').backgroundColor('_background');
      }),
      className,
    ]);
    return (
      <div {...rest} lang={language.code} dir={direction} class={style}>
        {children}
      </div>
    );
  },
);
