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
      options: Omit<Intl.DateTimeFormatOptions, 'timeZone'> = {
        dateStyle: 'medium',
        timeStyle: 'short',
      },
    ): string {
      return new Intl.DateTimeFormat(readLocale(), { ...options, timeZone: readTimeZone() }).format(
        value,
      );
    },
    formatNumber(value: number | bigint, options?: Intl.NumberFormatOptions): string {
      return new Intl.NumberFormat(readLocale(), options).format(value);
    },
  });
}
