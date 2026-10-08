import { _component, _state, Portal } from 'zerodep-js';
import { css } from 'zerodep-js/css';
import { addDays } from 'date-fns';
import {
  Provider,
  lightTheme,
  darkTheme,
  zhCN,
  enUS,
  useCss,
  useLang,
  useLocale,
} from 'zerodep-js-ui';

// 纽约进入夏令时前一天的中午，方便直接观察“下一天”并不总是 24 小时。
const instant = Date.UTC(2026, 2, 7, 17);

const Preview = _component(({ name }: { name: string }) => {
  const s = useCss();
  const lang = useLang();
  const locale = useLocale();
  const panel = css(
    s.backgroundColor._surface,
    s.color._text,
    s.padding._md,
    s.borderRadius._md,
    s.borderColor._border,
    s.borderWidth._thin,
    s.borderStyle.solid,
  );
  return (
    <article class={panel} data-preview={name}>
      <h3>{name === 'outer' ? '跟随外层' : name === 'inner' ? '内层独立设置' : 'Portal 区域'}</h3>
      <p>
        主题：<span data-theme>{s.keywords.name}</span>
      </p>
      <p>
        语言：<span data-language>{lang.code}</span> ·{' '}
        <span data-message>{lang.messages.empty}</span>
      </p>
      <p>
        地区：<span data-locale>{locale.locale}</span> ·{' '}
        <span data-number>{locale.formatNumber(1234567.89)}</span>
      </p>
      <p>
        时区：<span data-zone>{locale.timeZone}</span>
      </p>
      <p>
        同一时刻：<span data-date>{locale.formatDate(instant)}</span>
      </p>
      <p>
        下一天：<span data-next-day>{locale.formatDate(addDays(locale.date(instant), 1))}</span>
      </p>
      <p>
        相隔小时：
        <span data-hours>{(addDays(locale.date(instant), 1).getTime() - instant) / 3600000}</span>
      </p>
      <button type="button" data-confirm>
        {lang.messages.confirm}
      </button>
    </article>
  );
});

export const ProviderDemo = _component(() => {
  let dark = _state(false);
  let english = _state(false);
  let usFormat = _state(false);
  let newYork = _state(false);
  let override = _state(true);
  let portal = _state(false);
  let visible = _state(true);
  return (
    <div class="provider-demo">
      <h3>Provider：主题、语言与时区</h3>
      <p>独立切换外层设置；关闭内层覆盖后，它会重新继承外层。输入内容在切换时保留。</p>
      <div class="provider-controls">
        <label>
          <input type="checkbox" bind:checked={dark} />
          暗色
        </label>
        <label>
          <input type="checkbox" bind:checked={english} />
          英文文案
        </label>
        <label>
          <input type="checkbox" bind:checked={usFormat} />
          美国格式
        </label>
        <label>
          <input type="checkbox" bind:checked={newYork} />
          纽约时区
        </label>
        <label>
          <input type="checkbox" bind:checked={override} />
          内层覆盖
        </label>
        <label>
          <input type="checkbox" bind:checked={portal} />
          显示 Portal
        </label>
        <label>
          <input type="checkbox" bind:checked={visible} />
          显示预览
        </label>
      </div>
      {visible && (
        <Provider
          data-provider="outer"
          class="provider-region"
          theme={dark ? darkTheme : lightTheme}
          lang={english ? enUS : zhCN}
          locale={usFormat ? 'en-US' : 'zh-CN'}
          timeZone={newYork ? 'America/New_York' : 'Asia/Shanghai'}
        >
          <label>
            保留输入 <input aria-label="保留输入" />
          </label>
          <div class="provider-grid">
            <Preview name="outer" />
            <Provider
              data-provider="inner"
              theme={override ? darkTheme : undefined}
              lang={override ? enUS : undefined}
              timeZone={override ? 'America/New_York' : undefined}
            >
              <Preview name="inner" />
              {portal && (
                <Portal>
                  <Provider class="provider-portal" data-provider="portal">
                    <Preview name="portal" />
                  </Provider>
                </Portal>
              )}
            </Provider>
          </div>
        </Provider>
      )}
      <pre>
        <code>{`<Provider theme={lightTheme} lang={zhCN} locale="zh-CN" timeZone="Asia/Shanghai">
  <App />
</Provider>`}</code>
      </pre>
    </div>
  );
});
