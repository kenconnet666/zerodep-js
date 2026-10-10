import { tz, type TZDate } from '@date-fns/tz';
import { toDate } from 'date-fns';

export interface UiLocale {
  readonly locale: string;
  readonly timeZone: string;
  /** 接受绝对时间；无时区字符串应由业务先明确其含义。返回值可直接交给 date-fns。 */
  date(this: void, value: Date | number): TZDate;
  formatDate(
    this: void,
    value: Date | number,
    options?: Omit<Intl.DateTimeFormatOptions, 'timeZone'>,
  ): string;
  formatNumber(this: void, value: number | bigint, options?: Intl.NumberFormatOptions): string;
}

/** 每次调用读取当前 Provider，不缓存初始地区，不修改 date-fns 或 Intl 全局状态。 */
export function createLocale(readLocale: () => string, readTimeZone: () => string): UiLocale {
  let dateFormat: { locale: string; zone: string; formatter: Intl.DateTimeFormat } | undefined;
  let numberFormat: { locale: string; formatter: Intl.NumberFormat } | undefined;
  return Object.freeze({
    get locale() {
      return readLocale();
    },
    get timeZone() {
      return readTimeZone();
    },
    date(value: Date | number): TZDate {
      return toDate(value, tz(readTimeZone()));
    },
    formatDate(
      value: Date | number,
      options?: Omit<Intl.DateTimeFormatOptions, 'timeZone'>,
    ): string {
      const locale = readLocale();
      // 自定义选项可能变化或包含 getter，保持逐次读取；只复用无选项的常用格式。
      if (options !== undefined)
        return new Intl.DateTimeFormat(locale, { ...options, timeZone: readTimeZone() }).format(
          value,
        );
      const zone = readTimeZone();
      if (!dateFormat || dateFormat.locale !== locale || dateFormat.zone !== zone)
        dateFormat = {
          locale,
          zone,
          formatter: new Intl.DateTimeFormat(locale, {
            dateStyle: 'medium',
            timeStyle: 'short',
            timeZone: zone,
          }),
        };
      return dateFormat.formatter.format(value);
    },
    formatNumber(value: number | bigint, options?: Intl.NumberFormatOptions): string {
      const locale = readLocale();
      if (options !== undefined) return new Intl.NumberFormat(locale, options).format(value);
      if (!numberFormat || numberFormat.locale !== locale)
        numberFormat = { locale, formatter: new Intl.NumberFormat(locale) };
      return numberFormat.formatter.format(value);
    },
  });
}
