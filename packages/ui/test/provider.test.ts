import { lightTheme, darkTheme, UiTheme } from 'zerodep-js-css';
import { describe, expect, it } from 'vitest';
import { _createRoot } from 'zerodep-js';
import { defineComponent, element } from 'zerodep-js/internal';
import { renderToString } from 'zerodep-js-ssr';
import { Css, SystemKeywords, systemKeywords } from 'zerodep-js-css';
import { createServerCssHost, withCssHost } from 'zerodep-js-css/server';
import { addDays } from 'date-fns';
import {
  Provider,
  zhCN,
  enUS,
  useCss,
  useLang,
  useLocale,
  type ProviderProps,
  type UiLanguage,
} from '../dist/index.js';
import { createLocale } from '../src/provider/locale.js';

function render(input: ProviderProps = {}) {
  const records: string[] = [];
  const Probe = defineComponent(() => {
    const css = useCss();
    const lang = useLang();
    const locale = useLocale();
    const text = [
      css.keywords.name,
      lang.code,
      lang.messages.confirm,
      locale.locale,
      locale.timeZone,
    ].join('|');
    records.push(text);
    return element('span', { children: text });
  });
  const App = defineComponent(() =>
    element(Provider, {
      ...input,
      children: [
        element(Probe, {}),
        element(Provider, { theme: darkTheme, children: element(Probe, {}) }),
        element(Probe, {}),
      ],
    }),
  );
  const host = createServerCssHost();
  const html = withCssHost(host, () => renderToString(App));
  return { html, records, rules: host.rules() };
}

describe('Provider 真实构建产物', () => {
  it('根字号使用主题，嵌套字号默认继承，显式字号允许 CSS 表达式', () => {
    const defaults = render();
    expect(defaults.rules.some((rule) => rule.body.includes('font-size:1rem;'))).toBe(true);
    expect(defaults.rules.some((rule) => rule.body.includes('font-size:inherit;'))).toBe(true);
    const custom = render({ size: 'clamp(1rem, 2vw, 2rem)' });
    expect(
      custom.rules.some((rule) => rule.body.includes('font-size:clamp(1rem, 2vw, 2rem);')),
    ).toBe(true);
    expect(custom.html).not.toContain(' size=');
  });
  it('默认值、内层只覆盖主题、兄弟隔离，DOM 属性可透传', () => {
    const result = render({ id: 'provider-root', title: '示例' });
    expect(result.records).toEqual([
      'light|zh-CN|确定|zh-CN|Asia/Shanghai',
      'dark|zh-CN|确定|zh-CN|Asia/Shanghai',
      'light|zh-CN|确定|zh-CN|Asia/Shanghai',
    ]);
    expect(result.html).toContain('id="provider-root"');
    expect(result.html).toContain('title="示例"');
    expect(result.html).toContain('lang="zh-CN"');
    expect(result.html).toContain('dir="ltr"');
    expect(JSON.stringify(result.rules)).toContain('color-scheme:dark');
  });

  it('语言、地区和时区独立选择，不污染下一次 SSR 请求', () => {
    const custom = render({
      theme: darkTheme,
      lang: enUS,
      locale: 'de-DE',
      timeZone: 'America/New_York',
    });
    expect(custom.records[0]).toBe('dark|en-US|OK|de-DE|America/New_York');
    expect(render().records[0]).toBe('light|zh-CN|确定|zh-CN|Asia/Shanghai');
    expect(zhCN.messages.confirm).toBe('确定');
  });

  it('自定义语言与方向可用，显式 dir 向下继承', () => {
    const arabic: UiLanguage = { ...enUS, code: 'ar', direction: 'rtl' };
    expect(render({ lang: arabic }).html.match(/dir="rtl"/g)).toHaveLength(2);
    expect(render({ dir: 'rtl' }).html.match(/dir="rtl"/g)).toHaveLength(2);
  });

  it('缺少 Provider 明确报错，不创建默认全局配置', () => {
    _createRoot((dispose) => {
      try {
        expect(useCss).toThrow('Provider');
        expect(useLang).toThrow('Provider');
        expect(useLocale).toThrow('Provider');
      } finally {
        dispose();
      }
    });
  });

  it('主题保留系统关键字，动态作者读取新主题且支持自定义品牌色', () => {
    let theme: UiTheme = lightTheme;
    const css = new Css(() => theme);
    expect(theme).toBeInstanceOf(SystemKeywords);
    expect(css.display.flex).toBe('display:flex;');
    expect(css.color.red).toBe('color:red;');
    expect(theme.color.red).toBe(systemKeywords.color.red);
    expect(css.color._text).toBe('color:#202a36;');
    theme = darkTheme;
    expect(css.color._text).toBe('color:#edf2f7;');
    // oxlint-disable-next-line typescript/no-misused-spread -- 主题属性组仅包含原始 CSS 值，按公开扩展契约复制。
    theme = new UiTheme('light', { ...lightTheme.color, _primary: '#663399' });
    expect(css.backgroundColor._primary).toBe('background-color:#663399;');
    expect(Object.keys(lightTheme.color)).toEqual(Object.keys(darkTheme.color));
    expect(Object.isFrozen(lightTheme.color)).toBe(true);
  });

  it('非法地区、时区在实际读取时抛错', () => {
    expect(() => render({ locale: 'invalid_locale' })).toThrow(RangeError);
    expect(() => render({ timeZone: 'Mars/Olympus' })).toThrow(RangeError);
  });
});

describe('地区与 date-fns 时区计算', () => {
  it('同一时刻保持时间戳，跨夏令时加一天保持当地钟点', () => {
    const locale = createLocale(
      () => 'en-US',
      () => 'America/New_York',
    );
    const timestamp = Date.UTC(2026, 2, 7, 17);
    const date = locale.date(timestamp);
    const tomorrow = addDays(date, 1);
    expect(date.getTime()).toBe(timestamp);
    expect(date.getHours()).toBe(12);
    expect(tomorrow.getHours()).toBe(12);
    expect(tomorrow.timeZone).toBe('America/New_York');
    expect(tomorrow.getTime() - date.getTime()).toBe(23 * 3600000);
    const autumn = locale.date(Date.UTC(2026, 9, 31, 16));
    expect(addDays(autumn, 1).getTime() - autumn.getTime()).toBe(25 * 3600000);
  });

  it('捕获的格式化方法仍读取最新配置，不依赖进程默认时区', () => {
    let region = 'zh-CN';
    let zone = 'Asia/Shanghai';
    const locale = createLocale(
      () => region,
      () => zone,
    );
    const { formatDate, formatNumber, date } = locale;
    const timestamp = Date.UTC(2026, 0, 1, 0);
    expect(formatDate(timestamp, { hour: '2-digit', hourCycle: 'h23' })).toContain('08');
    region = 'de-DE';
    zone = 'America/New_York';
    expect(formatNumber(1234.5)).toBe('1.234,5');
    expect(formatDate(timestamp, { hour: '2-digit', hourCycle: 'h23' })).toContain('19');
    expect(date(timestamp).getDate()).toBe(31);
    expect(locale.timeZone).toBe(zone);
    const original = new Date(timestamp);
    expect(date(original)).not.toBe(original);
    expect(original.getTime()).toBe(timestamp);
  });
});
