import { _component, _state, _effect, ErrorBoundary, type EventHandler } from 'zerodep-js';
import {
  registerPropertyElement,
  type ProbeData,
  type PropertyProbeElement,
} from './property-elements.js';

const invalid: Record<string, unknown> = { 'prop:offsetWidth': 40 };
export const PropertyExample = _component(() => {
  let active = _state(false);
  let top = _state(35);
  let observed = _state('关闭');
  let data = _state<ProbeData>({ label: '应用对象' });
  let handled = _state('');
  let submitted = _state('');
  let allowReadonlyProbe = _state(true);
  let scroller: HTMLDivElement | undefined;
  let stream: MediaStream | undefined;
  const format = (value: string) => `格式化:${value}`;
  const change: EventHandler<PropertyProbeElement, CustomEvent<ProbeData>> = (event) => {
    handled += `目标:${event.detail.label};`;
  };
  _effect(() => {
    observed = active ? `${top}/${scroller?.scrollTop}` : '关闭';
  });
  return (
    <section aria-label="客户端属性与自定义元素">
      <h2>客户端属性与自定义元素</h2>
      <button data-property-toggle onClick={() => (active = !active)}>
        切换 property 绑定
      </button>
      <button
        data-property-update
        onClick={() => {
          top = 90;
          data = { label: '新对象' };
        }}
      >
        更新 property
      </button>
      <div
        data-scroll-probe
        ref={(element) => {
          scroller = element;
        }}
        style={{ height: '40px', overflow: 'auto' }}
        {...(active ? { 'prop:scrollTop': top } : {})}
      >
        <div style={{ height: '240px' }}>可滚动内容</div>
      </div>
      <output data-observed-property>{observed}</output>
      <a data-property-link prop:href={active ? '/property-target' : undefined}>
        客户端链接
      </a>
      <video
        data-media-probe
        prop:volume={active ? 0.25 : undefined}
        prop:srcObject={active ? (stream ??= new MediaStream()) : undefined}
      />

      <div
        oncapture:ValueChanged={(event: CustomEvent<ProbeData>) => {
          handled += `捕获:${event.detail.label};`;
        }}
      >
        <zj-property-probe
          data-property-widget
          prop:format={active ? format : undefined}
          prop:data={active ? data : undefined}
          on:ValueChanged={change}
        />
      </div>
      <output data-property-event>{handled}</output>
      <ErrorBoundary
        fallback={(error, reset) => (
          <button
            data-register-late
            onClick={() => {
              registerPropertyElement('zj-late-probe');
              reset();
            }}
          >
            {String(error)}，注册后重试
          </button>
        )}
      >
        <zj-late-probe data-late-widget prop:data={{ label: '延后注册成功' }} />
      </ErrorBoundary>
      <ErrorBoundary
        fallback={(error, reset) => (
          <button
            data-property-readonly
            onClick={() => {
              allowReadonlyProbe = false;
              reset();
            }}
          >
            {String(error)}，修正后重试
          </button>
        )}
      >
        <span data-readonly-recovered {...(allowReadonlyProbe ? invalid : {})}>
          只读检查
        </span>
      </ErrorBoundary>
      <form
        id="property-form"
        onSubmit={(event) => {
          event.preventDefault();
          const value = new FormData(event.currentTarget).get('external');
          submitted = typeof value === 'string' ? value : (value?.name ?? '');
        }}
      />

      <label for="property-field">外部表单字段</label>
      <input id="property-field" name="external" form="property-form" list="property-suggestions" />
      <datalist id="property-suggestions">
        <option value="选项" />
      </datalist>
      <button data-property-submit form="property-form" type="submit">
        提交外部字段
      </button>
      <output data-property-form for="property-field" form="property-form">
        {submitted}
      </output>
    </section>
  );
});
